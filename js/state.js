/**
 * HireCraft - Global State Manager
 * Handles local storage persistence, bookmarks, applied jobs, DSA progress, and user notes.
 */

const STORAGE_KEYS = {
  THEME: 'hirecraft_theme',
  SAVED_JOBS: 'hirecraft_saved_jobs',
  APPLICATIONS: 'hirecraft_applications',
  DSA_SOLVED: 'hirecraft_dsa_solved',
  DSA_STARRED: 'hirecraft_dsa_starred',
  DSA_NOTES: 'hirecraft_dsa_notes',
  QUIZ_HISTORY: 'hirecraft_quiz_history',
  CUSTOM_JOBS: 'hirecraft_custom_jobs',
  AUTH_USER: 'hirecraft_auth_user'
};

class StateManager {
  constructor() {
    this.theme = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
    this.savedJobIds = new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED_JOBS) || '[]'));
    this.applications = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || '[]');
    this.solvedDsaIds = new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.DSA_SOLVED) || '[]'));
    this.starredDsaIds = new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.DSA_STARRED) || '[]'));
    this.dsaNotes = JSON.parse(localStorage.getItem(STORAGE_KEYS.DSA_NOTES) || '{}');
    this.quizHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY) || '[]');
    this.customJobs = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_JOBS) || '[]');
    this.currentUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.AUTH_USER) || 'null');
    this.listeners = [];
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify(event, payload) {
    this.listeners.forEach(cb => cb(event, payload));
  }

  // Theme
  setTheme(theme) {
    this.theme = theme;
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    document.documentElement.setAttribute('data-theme', theme);
    this.notify('theme_change', theme);
  }

  toggleTheme() {
    const next = this.theme === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
    return next;
  }

  // Saved Jobs
  toggleSaveJob(jobId) {
    if (this.savedJobIds.has(jobId)) {
      this.savedJobIds.delete(jobId);
    } else {
      this.savedJobIds.add(jobId);
    }
    localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify([...this.savedJobIds]));
    this.notify('saved_jobs_change', this.savedJobIds);
    return this.savedJobIds.has(jobId);
  }

  isJobSaved(jobId) {
    return this.savedJobIds.has(jobId);
  }

  // Job Applications
  applyJob(application) {
    const existingIndex = this.applications.findIndex(a => a.jobId === application.jobId);
    const newApp = {
      ...application,
      appliedAt: new Date().toISOString(),
      status: 'Applied' // 'Applied', 'Screening', 'Interview', 'Offered'
    };

    if (existingIndex >= 0) {
      this.applications[existingIndex] = newApp;
    } else {
      this.applications.unshift(newApp);
    }

    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(this.applications));
    this.notify('application_submitted', newApp);
  }

  isJobApplied(jobId) {
    return this.applications.some(a => a.jobId === jobId);
  }

  getApplication(jobId) {
    return this.applications.find(a => a.jobId === jobId);
  }

  // Custom Job Posting
  addCustomJob(job) {
    this.customJobs.unshift(job);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_JOBS, JSON.stringify(this.customJobs));
    this.notify('custom_job_added', job);
  }

  // DSA Solved & Starred
  toggleDsaSolved(problemId) {
    const isSolved = this.solvedDsaIds.has(problemId);
    if (isSolved) {
      this.solvedDsaIds.delete(problemId);
    } else {
      this.solvedDsaIds.add(problemId);
    }
    localStorage.setItem(STORAGE_KEYS.DSA_SOLVED, JSON.stringify([...this.solvedDsaIds]));
    this.notify('dsa_solved_change', { problemId, isSolved: !isSolved });
    return !isSolved;
  }

  isDsaSolved(problemId) {
    return this.solvedDsaIds.has(problemId);
  }

  toggleDsaStarred(problemId) {
    const isStarred = this.starredDsaIds.has(problemId);
    if (isStarred) {
      this.starredDsaIds.delete(problemId);
    } else {
      this.starredDsaIds.add(problemId);
    }
    localStorage.setItem(STORAGE_KEYS.DSA_STARRED, JSON.stringify([...this.starredDsaIds]));
    this.notify('dsa_starred_change', { problemId, isStarred: !isStarred });
    return !isStarred;
  }

  isDsaStarred(problemId) {
    return this.starredDsaIds.has(problemId);
  }

  // DSA Notes
  saveDsaNote(problemId, noteText) {
    if (!noteText.trim()) {
      delete this.dsaNotes[problemId];
    } else {
      this.dsaNotes[problemId] = noteText;
    }
    localStorage.setItem(STORAGE_KEYS.DSA_NOTES, JSON.stringify(this.dsaNotes));
    this.notify('dsa_note_saved', { problemId, noteText });
  }

  getDsaNote(problemId) {
    return this.dsaNotes[problemId] || '';
  }

  // Quiz History
  recordQuizResult(result) {
    const record = {
      ...result,
      id: 'quiz_' + Date.now(),
      date: new Date().toISOString()
    };
    this.quizHistory.unshift(record);
    if (this.quizHistory.length > 20) this.quizHistory.pop();
    localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(this.quizHistory));
    this.notify('quiz_completed', record);
    return record;
  }

  // Authentication
  getCurrentUser() {
    return this.currentUser;
  }

  isAuthenticated() {
    return Boolean(this.currentUser);
  }

  login(userData) {
    this.currentUser = {
      ...userData,
      lastLogin: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(this.currentUser));
    this.notify('auth_change', this.currentUser);
    return this.currentUser;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    this.notify('auth_change', null);
  }

  // Reset demo data
  resetAllData() {
    localStorage.removeItem(STORAGE_KEYS.SAVED_JOBS);
    localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
    localStorage.removeItem(STORAGE_KEYS.DSA_SOLVED);
    localStorage.removeItem(STORAGE_KEYS.DSA_STARRED);
    localStorage.removeItem(STORAGE_KEYS.DSA_NOTES);
    localStorage.removeItem(STORAGE_KEYS.QUIZ_HISTORY);
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_JOBS);

    this.savedJobIds.clear();
    this.applications = [];
    this.solvedDsaIds.clear();
    this.starredDsaIds.clear();
    this.dsaNotes = {};
    this.quizHistory = [];
    this.customJobs = [];

    this.notify('state_reset', null);
  }
}

export const state = new StateManager();
