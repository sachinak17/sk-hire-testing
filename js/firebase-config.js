/**
 * SK Hire - Firebase SDK v10 Modular Integration
 * Connects directly to Firebase Project: hire-dd76e
 */

import { initializeApp, getApps, getApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  sendPasswordResetEmail, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

export const firebaseConfig = {
  apiKey: "AIzaSyDwWCYdqydd3HedFK_8Wz3Sy9zFfwNrR0M",
  authDomain: "hire-dd76e.firebaseapp.com",
  projectId: "hire-dd76e",
  storageBucket: "hire-dd76e.firebasestorage.app",
  messagingSenderId: "652815425819",
  appId: "1:652815425819:web:55742e758e42f13223b3be",
  measurementId: "G-MGSD4D1VPM"
};

// Initialize Firebase App
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Friendly error messages for common Firebase Auth error codes
export function formatFirebaseError(error) {
  const code = error?.code || '';
  switch (code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please check your credentials.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Try signing in instead.';
    case 'auth/invalid-email':
      return 'Please provide a valid email address.';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters.';
    case 'auth/popup-closed-by-user':
      return 'Sign in popup was closed before completing.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    case 'auth/too-many-requests':
      return 'Access temporarily disabled due to many failed attempts. Try again later.';
    default:
      return error.message || 'Authentication error. Please try again.';
  }
}

/**
 * Sign In with Email & Password
 */
export async function firebaseSignIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const fbUser = userCredential.user;
    
    // Map Firebase User to SK Hire User State
    const role = localStorage.getItem(`user_role_${fbUser.uid}`) || 'Candidate';
    const user = {
      uid: fbUser.uid,
      name: fbUser.displayName || email.split('@')[0],
      email: fbUser.email,
      role: role,
      avatar: (fbUser.displayName || email).slice(0, 2).toUpperCase(),
      joinedAt: fbUser.metadata.creationTime || new Date().toISOString()
    };

    localStorage.setItem('hirecraft_auth_user', JSON.stringify(user));
    return { success: true, user };
  } catch (error) {
    return { success: false, error: formatFirebaseError(error) };
  }
}

/**
 * Register New Account with Email, Password, Name, and Role
 */
export async function firebaseSignUp(name, email, password, role = 'Candidate') {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const fbUser = userCredential.user;

    // Update display name in Firebase Auth
    if (name) {
      await updateProfile(fbUser, { displayName: name });
    }

    // Persist custom role for this user
    localStorage.setItem(`user_role_${fbUser.uid}`, role);

    const user = {
      uid: fbUser.uid,
      name: name,
      email: fbUser.email,
      role: role,
      avatar: name.slice(0, 2).toUpperCase(),
      joinedAt: new Date().toISOString()
    };

    localStorage.setItem('hirecraft_auth_user', JSON.stringify(user));
    return { success: true, user };
  } catch (error) {
    return { success: false, error: formatFirebaseError(error) };
  }
}

/**
 * Sign in with Google Popup
 */
export async function firebaseGoogleSignIn() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const fbUser = result.user;
    const name = fbUser.displayName || fbUser.email.split('@')[0];
    const role = localStorage.getItem(`user_role_${fbUser.uid}`) || 'Candidate';

    const user = {
      uid: fbUser.uid,
      name: name,
      email: fbUser.email,
      role: role,
      avatar: name.slice(0, 2).toUpperCase(),
      joinedAt: fbUser.metadata.creationTime || new Date().toISOString()
    };

    localStorage.setItem('hirecraft_auth_user', JSON.stringify(user));
    return { success: true, user };
  } catch (error) {
    return { success: false, error: formatFirebaseError(error) };
  }
}

/**
 * Send Password Reset Email
 */
export async function firebasePasswordReset(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return { success: false, error: formatFirebaseError(error) };
  }
}

/**
 * Sign Out from Firebase
 */
export async function firebaseSignOut() {
  try {
    await signOut(auth);
    localStorage.removeItem('hirecraft_auth_user');
    return { success: true };
  } catch (error) {
    localStorage.removeItem('hirecraft_auth_user');
    return { success: false, error: error.message };
  }
}

/**
 * Real-time Auth State Subscription
 */
export function subscribeToAuth(callback) {
  return onAuthStateChanged(auth, (fbUser) => {
    if (fbUser) {
      const role = localStorage.getItem(`user_role_${fbUser.uid}`) || 'Candidate';
      const user = {
        uid: fbUser.uid,
        name: fbUser.displayName || fbUser.email.split('@')[0],
        email: fbUser.email,
        role: role,
        avatar: (fbUser.displayName || fbUser.email).slice(0, 2).toUpperCase()
      };
      callback(user);
    } else {
      callback(null);
    }
  });
}

// Global window bridge for easy access across vanilla components
window.FirebaseBridge = {
  app,
  auth,
  firebaseSignIn,
  firebaseSignUp,
  firebaseGoogleSignIn,
  firebasePasswordReset,
  firebaseSignOut,
  subscribeToAuth
};
