/**
 * SK Hire - Authentication Controller
 * Manages Sign In, Sign Up, Role Selection, Password Strength, Demo Logins, and Social OAuth Simulation.
 */

import { 
  firebaseSignIn, 
  firebaseSignUp, 
  firebaseGoogleSignIn, 
  firebasePasswordReset, 
  firebaseSignOut 
} from './firebase-config.js';

const STORAGE_KEYS = {
  THEME: 'hirecraft_theme',
  AUTH_USER: 'hirecraft_auth_user'
};

class AuthController {
  constructor() {
    this.currentTab = 'login'; // 'login' | 'register'
    this.theme = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
    this.init();
  }

  init() {
    this.applyTheme(this.theme);
    this.bindEvents();
    this.checkInitialState();
  }

  applyTheme(theme) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);

    const themeToggleBtn = document.getElementById('auth-theme-toggle');
    if (themeToggleBtn) {
      themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  toggleTheme() {
    const next = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme(next);
    this.showToast(`Switched to ${next === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
  }

  checkInitialState() {
    // Check if user is already logged in
    const currentUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.AUTH_USER) || 'null');
    if (currentUser) {
      const banner = document.getElementById('already-logged-in-banner');
      if (banner) {
        banner.style.display = 'block';
        const nameEl = document.getElementById('current-logged-user-name');
        if (nameEl) nameEl.textContent = currentUser.name || currentUser.email;
      }
    }

    // Check URL parameters for tab
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'register' || params.get('tab') === 'register') {
      this.switchTab('register');
    } else {
      this.switchTab('login');
    }
  }

  switchTab(tab) {
    this.currentTab = tab;
    const loginTabBtn = document.getElementById('tab-btn-login');
    const registerTabBtn = document.getElementById('tab-btn-register');
    const loginForm = document.getElementById('form-signin');
    const registerForm = document.getElementById('form-signup');
    const titleEl = document.getElementById('auth-title');
    const subtitleEl = document.getElementById('auth-subtitle');

    if (tab === 'login') {
      loginTabBtn?.classList.add('active');
      registerTabBtn?.classList.remove('active');
      if (loginForm) loginForm.style.display = 'flex';
      if (registerForm) registerForm.style.display = 'none';

      if (titleEl) titleEl.textContent = 'Welcome Back';
      if (subtitleEl) subtitleEl.textContent = 'Access your career dashboard, tracked jobs, and interview prep.';
    } else {
      registerTabBtn?.classList.add('active');
      loginTabBtn?.classList.remove('active');
      if (loginForm) loginForm.style.display = 'none';
      if (registerForm) registerForm.style.display = 'flex';

      if (titleEl) titleEl.textContent = 'Create Your Account';
      if (subtitleEl) subtitleEl.textContent = 'Join thousands of engineers accelerating their careers Zero to Hero.';
    }
  }

  bindEvents() {
    // Theme toggle
    const themeBtn = document.getElementById('auth-theme-toggle');
    themeBtn?.addEventListener('click', () => this.toggleTheme());

    // Tab buttons
    document.getElementById('tab-btn-login')?.addEventListener('click', () => this.switchTab('login'));
    document.getElementById('tab-btn-register')?.addEventListener('click', () => this.switchTab('register'));

    // Password Toggles
    document.querySelectorAll('.btn-toggle-pwd').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.dataset.target;
        const input = document.getElementById(targetId);
        if (input) {
          const isPwd = input.type === 'password';
          input.type = isPwd ? 'text' : 'password';
          btn.textContent = isPwd ? '🙈' : '👁️';
        }
      });
    });

    // Password strength calculation on register
    const regPwdInput = document.getElementById('reg-password');
    if (regPwdInput) {
      regPwdInput.addEventListener('input', () => {
        this.evaluatePasswordStrength(regPwdInput.value);
      });
    }

    // Login Form Submit
    const formSignin = document.getElementById('form-signin');
    if (formSignin) {
      formSignin.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSignIn();
      });
    }

    // Register Form Submit
    const formSignup = document.getElementById('form-signup');
    if (formSignup) {
      formSignup.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSignUp();
      });
    }

    // Social login buttons
    document.querySelectorAll('.btn-social').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const provider = btn.dataset.provider;
        this.handleSocialLogin(provider);
      });
    });

    // Forgot Password Modal Triggers
    const forgotLink = document.getElementById('link-forgot-pwd');
    const modalOverlay = document.getElementById('auth-forgot-modal');
    const modalCloseBtn = document.getElementById('modal-close-forgot');

    forgotLink?.addEventListener('click', (e) => {
      e.preventDefault();
      modalOverlay?.classList.add('active');
      const emailInput = document.getElementById('signin-email');
      const resetInput = document.getElementById('forgot-email-input');
      if (emailInput && resetInput && emailInput.value) {
        resetInput.value = emailInput.value;
      }
    });

    modalCloseBtn?.addEventListener('click', () => {
      modalOverlay?.classList.remove('active');
    });

    modalOverlay?.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });

    // Forgot password form submit
    const forgotForm = document.getElementById('forgot-pwd-form');
    forgotForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const resetInput = document.getElementById('forgot-email-input');
      const email = resetInput?.value?.trim();
      if (!email || !email.includes('@')) {
        this.showToast('Please provide a valid email address.', 'error');
        return;
      }
      this.showToast('Sending password reset email via Firebase...', 'info');
      try {
        const result = await firebasePasswordReset(email);
        if (result.success) {
          this.showToast(`Password recovery link sent to ${email} via Firebase!`, 'success');
          modalOverlay?.classList.remove('active');
        } else {
          this.showToast(result.error, 'error');
        }
      } catch (err) {
        this.showToast(err.message || 'Could not send reset email.', 'error');
      }
    });

    // Continue as already logged in button
    document.getElementById('btn-continue-session')?.addEventListener('click', () => {
      window.location.href = 'index.html';
    });

    document.getElementById('btn-logout-current')?.addEventListener('click', async () => {
      try {
        await firebaseSignOut();
      } catch (e) {}
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
      const banner = document.getElementById('already-logged-in-banner');
      if (banner) banner.style.display = 'none';
      this.showToast('Signed out of current session', 'info');
    });
  }

  evaluatePasswordStrength(password) {
    const bars = [
      document.getElementById('pwd-bar-1'),
      document.getElementById('pwd-bar-2'),
      document.getElementById('pwd-bar-3'),
      document.getElementById('pwd-bar-4')
    ];
    const label = document.getElementById('pwd-strength-label');

    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) score++;

    const colors = ['#f43f5e', '#f59e0b', '#06b6d4', '#10b981'];
    const texts = ['Weak', 'Fair', 'Good', 'Strong'];

    bars.forEach((bar, index) => {
      if (bar) {
        if (password.length === 0) {
          bar.style.backgroundColor = 'var(--border-subtle)';
        } else if (index < score) {
          bar.style.backgroundColor = colors[score - 1];
        } else {
          bar.style.backgroundColor = 'var(--border-subtle)';
        }
      }
    });

    if (label) {
      if (password.length === 0) {
        label.textContent = 'None';
        label.style.color = 'var(--text-muted)';
      } else {
        label.textContent = texts[score - 1] || 'Weak';
        label.style.color = colors[score - 1] || '#f43f5e';
      }
    }

    return score;
  }

  async handleSignIn() {
    const email = document.getElementById('signin-email')?.value.trim();
    const password = document.getElementById('signin-password')?.value;
    const rememberMe = document.getElementById('signin-remember')?.checked;
    const submitBtn = document.getElementById('btn-submit-signin');

    if (!email || !email.includes('@')) {
      this.showToast('Please enter a valid email address.', 'error');
      document.getElementById('signin-email')?.focus();
      return;
    }

    if (!password || password.length < 4) {
      this.showToast('Please enter your password.', 'error');
      document.getElementById('signin-password')?.focus();
      return;
    }

    // Button loading state
    submitBtn?.classList.add('loading');
    submitBtn?.setAttribute('disabled', 'true');

    const isDemo = email.includes('candidate@skhire.dev') || email.includes('recruiter@techcorp.io');

    try {
      // 1. Attempt Firebase Authentication
      const result = await firebaseSignIn(email, password);

      if (result.success) {
        this.showToast(`Welcome back, ${result.user.name}! Redirecting...`, 'success');
        setTimeout(() => {
          const params = new URLSearchParams(window.location.search);
          const redirect = params.get('redirect') || 'index.html';
          window.location.href = redirect;
        }, 800);
        return;
      }

      // If it is a demo account and not yet created in Firebase, auto-create in Firebase or use local fallback
      if (isDemo) {
        const isRecruiter = email.includes('recruiter');
        const demoName = isRecruiter ? 'Priya Sharma (Recruiter)' : 'Sachin A K';
        const demoRole = isRecruiter ? 'Recruiter' : 'Candidate';

        const regResult = await firebaseSignUp(demoName, email, password, demoRole);
        if (regResult.success) {
          this.showToast(`Welcome, ${demoName}! (Demo synced with Firebase)`, 'success');
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 800);
          return;
        }

        // Local fallback for demo
        const user = {
          name: demoName,
          email,
          role: demoRole,
          avatar: demoName.slice(0, 2).toUpperCase(),
          rememberMe: Boolean(rememberMe),
          joinedAt: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
        this.showToast(`Welcome back, ${demoName}! Redirecting...`, 'success');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 800);
        return;
      }

      // Real user authentication error
      this.showToast(result.error, 'error');
      submitBtn?.classList.remove('loading');
      submitBtn?.removeAttribute('disabled');
    } catch (err) {
      this.showToast(err.message || 'Authentication error.', 'error');
      submitBtn?.classList.remove('loading');
      submitBtn?.removeAttribute('disabled');
    }
  }

  async handleSignUp() {
    const name = document.getElementById('reg-name')?.value.trim();
    const email = document.getElementById('reg-email')?.value.trim();
    const password = document.getElementById('reg-password')?.value;
    const confirmPassword = document.getElementById('reg-confirm-password')?.value;
    const roleRadio = document.querySelector('input[name="reg-role"]:checked');
    const terms = document.getElementById('reg-terms')?.checked;
    const submitBtn = document.getElementById('btn-submit-signup');

    if (!name) {
      this.showToast('Please enter your full name.', 'error');
      document.getElementById('reg-name')?.focus();
      return;
    }

    if (!email || !email.includes('@')) {
      this.showToast('Please provide a valid email address.', 'error');
      document.getElementById('reg-email')?.focus();
      return;
    }

    if (!password || password.length < 6) {
      this.showToast('Password must be at least 6 characters.', 'error');
      document.getElementById('reg-password')?.focus();
      return;
    }

    if (password !== confirmPassword) {
      this.showToast('Passwords do not match.', 'error');
      document.getElementById('reg-confirm-password')?.focus();
      return;
    }

    if (!terms) {
      this.showToast('Please accept the Terms of Service & Privacy Policy.', 'error');
      return;
    }

    submitBtn?.classList.add('loading');
    submitBtn?.setAttribute('disabled', 'true');

    const role = roleRadio?.value === 'recruiter' ? 'Recruiter' : 'Candidate';

    try {
      const result = await firebaseSignUp(name, email, password, role);

      if (result.success) {
        this.showToast(`Account created in Firebase! Welcome to SK Hire, ${name}.`, 'success');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 900);
      } else {
        this.showToast(result.error, 'error');
        submitBtn?.classList.remove('loading');
        submitBtn?.removeAttribute('disabled');
      }
    } catch (err) {
      this.showToast(err.message || 'Registration failed.', 'error');
      submitBtn?.classList.remove('loading');
      submitBtn?.removeAttribute('disabled');
    }
  }

  async handleSocialLogin(provider) {
    if (provider === 'google') {
      this.showToast('Opening Google Sign-In with Firebase...', 'info');
      try {
        const result = await firebaseGoogleSignIn();
        if (result.success) {
          this.showToast(`Signed in via Google as ${result.user.name}! Redirecting...`, 'success');
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 900);
        } else {
          this.showToast(result.error, 'error');
        }
      } catch (err) {
        console.error('[Auth] Google Sign-In Exception:', err);
        this.showToast(err.message || 'Google Sign-In failed.', 'error');
      }
      return;
    }

    this.showToast(`Connecting to ${provider.toUpperCase()}...`, 'info');

    setTimeout(() => {
      const mockUsers = {
        github: {
          name: 'Dev Rohan',
          email: 'rohan.codes@github.com',
          role: 'Candidate',
          avatar: 'DR'
        },
        linkedin: {
          name: 'Sarah Miller',
          email: 'sarah.talent@linkedin.com',
          role: 'Recruiter',
          avatar: 'SM'
        }
      };

      const user = mockUsers[provider] || {
        name: 'Social User',
        email: `user@${provider}.com`,
        role: 'Candidate',
        avatar: 'SU'
      };

      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify({
        ...user,
        provider,
        joinedAt: new Date().toISOString()
      }));

      this.showToast(`Signed in via ${provider.toUpperCase()} as ${user.name}! Redirecting...`, 'success');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    }, 700);
  }

  showToast(message, type = 'info') {
    let container = document.getElementById('auth-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'auth-toast-container';
      container.style.position = 'fixed';
      container.style.bottom = '24px';
      container.style.right = '24px';
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '10px';
      container.style.zIndex = '9999';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `app-toast toast-${type}`;
    toast.style.padding = '12px 18px';
    toast.style.borderRadius = '10px';
    toast.style.fontSize = '0.88rem';
    toast.style.fontWeight = '600';
    toast.style.color = '#fff';
    toast.style.boxShadow = '0 8px 24px rgba(0,0,0,0.35)';
    toast.style.animation = 'modalPop 0.25s ease';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '10px';

    if (type === 'success') {
      toast.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
    } else if (type === 'error') {
      toast.style.background = 'linear-gradient(135deg, #f43f5e, #e11d48)';
      toast.innerHTML = `<span>⚠️</span> <span>${message}</span>`;
    } else {
      toast.style.background = 'linear-gradient(135deg, #6366f1, #4f46e5)';
      toast.innerHTML = `<span>ℹ️</span> <span>${message}</span>`;
    }

    container.appendChild(toast);

    const duration = type === 'error' ? 7000 : 3500;
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
}

// Instantiate on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.authCtrl = new AuthController();
});
