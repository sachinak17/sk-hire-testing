/**
 * HireCraft - Master Application Entrypoint
 * Coordinates routing, global state, theme toggling, modules, and toast notifications.
 */

import { state } from './state.js';
import { JobsModule } from './modules/jobs.js';
import { PrepModule } from './modules/prep.js';
import { CompaniesModule } from './modules/companies.js';
import { DsaSheetModule } from './modules/dsaSheet.js';
import { DashboardModule } from './modules/dashboard.js';
import { DSA_PROBLEMS } from './data/dsaSheetData.js';
import { COMPANIES_DATA } from './data/companiesData.js';
import { INITIAL_JOBS } from './data/jobsData.js';

class App {
  constructor() {
    this.currentView = 'jobs'; // 'jobs' | 'prep' | 'companies' | 'dsa' | 'dashboard'
    this.modules = {};
  }

  init() {
    // 1. Initialize Theme
    state.setTheme(state.theme);
    this.bindGlobalEvents();

    // 2. Initialize Core Submodules
    this.modules.jobs = new JobsModule(this);
    this.modules.prep = new PrepModule(this);
    this.modules.companies = new CompaniesModule(this);
    this.modules.dsa = new DsaSheetModule(this);
    this.modules.dashboard = new DashboardModule(this);

    this.modules.jobs.init();
    this.modules.prep.init();
    this.modules.companies.init();
    this.modules.dsa.init();
    this.modules.dashboard.init();

    // 3. Update Hero Metrics
    this.updateHeroMetrics();

    // 4. State listeners for dynamic metric updates
    state.subscribe(() => {
      this.updateHeroMetrics();
    });

    // Check if URL hash specifies initial view
    const initialHash = window.location.hash.replace('#', '');
    if (['jobs', 'prep', 'companies', 'dsa', 'dashboard'].includes(initialHash)) {
      this.switchView(initialHash);
    } else {
      this.switchView('jobs');
    }
  }

  bindGlobalEvents() {
    // Theme toggle button
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const nextTheme = state.toggleTheme();
        themeBtn.textContent = nextTheme === 'dark' ? '☀️' : '🌙';
        this.showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
      });
      themeBtn.textContent = state.theme === 'dark' ? '☀️' : '🌙';
    }

    // Navigation buttons
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = item.dataset.view;
        this.switchView(targetView);
      });
    });

    // Brand logo click returns to jobs
    const brandLogo = document.querySelector('.brand-logo');
    if (brandLogo) {
      brandLogo.addEventListener('click', () => {
        this.switchView('jobs');
      });
    }

    // Close any open modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
      }
    });

    // Close modal when clicking outside of modal card
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('active');
        }
      });
    });
  }

  switchView(viewName) {
    this.currentView = viewName;
    window.location.hash = viewName;

    // Update active state in nav
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.view === viewName);
    });

    // Show active section
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.toggle('active', sec.id === `view-${viewName}`);
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Refresh view module data
    if (viewName === 'dsa') {
      this.modules.dsa.render();
    } else if (viewName === 'dashboard') {
      this.modules.dashboard.render();
    } else if (viewName === 'jobs') {
      this.modules.jobs.render();
    }
  }

  updateHeroMetrics() {
    const totalJobs = INITIAL_JOBS.length + state.customJobs.length;
    const totalDsa = DSA_PROBLEMS.length;
    const solvedDsa = DSA_PROBLEMS.filter(p => state.isDsaSolved(p.id)).length;
    const totalCompanies = COMPANIES_DATA.length;

    const metricJobs = document.getElementById('metric-total-jobs');
    const metricCompanies = document.getElementById('metric-total-companies');
    const metricDsa = document.getElementById('metric-dsa-stats');
    const metricSaved = document.getElementById('metric-saved-count');

    if (metricJobs) metricJobs.textContent = `${totalJobs}+ Active Roles`;
    if (metricCompanies) metricCompanies.textContent = `${totalCompanies} Blueprints`;
    if (metricDsa) metricDsa.textContent = `${solvedDsa} / ${totalDsa} Solved`;
    if (metricSaved) metricSaved.textContent = `${state.savedJobIds.size} Saved`;
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'warning') icon = '⚠️';

    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }
}

// Instantiate and start app on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  window.SKHireApp = app;
  window.HireCraftApp = app;
  app.init();
});
