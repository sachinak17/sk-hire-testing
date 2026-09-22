/**
 * HireCraft - Global State Manager
 * Handles local storage persistence, bookmarks, applied jobs, DSA progress, and user notes.
 */

import { HireScoreEngine } from './modules/hireScore.js';

const STORAGE_KEYS = {
  THEME: 'hirecraft_theme',
  SAVED_JOBS: 'hirecraft_saved_jobs',
  APPLICATIONS: 'hirecraft_applications',
  DSA_SOLVED: 'hirecraft_dsa_solved',
  DSA_STARRED: 'hirecraft_dsa_starred',
  DSA_NOTES: 'hirecraft_dsa_notes',
  QUIZ_HISTORY: 'hirecraft_quiz_history',
  CUSTOM_JOBS: 'hirecraft_custom_jobs',
  AUTH_USER: 'hirecraft_auth_user',
  STUDENT_SKILLS: 'hirecraft_student_skills',
  STUDENT_PROJECTS: 'hirecraft_student_projects',
  RESUME_PROFILE: 'hirecraft_resume_profile',
  INTERVIEW_PROFILE: 'hirecraft_interview_profile'
};

const DEFAULT_SKILLS = [
  'JavaScript', 'React', 'Node.js', 'Python', 'SQL & PostgreSQL', 'Data Structures & Algorithms', 'Git & GitHub'
];

const DEFAULT_PROJECTS = [
  {
    id: 'proj_1',
    title: 'DevSphere - Real-time Collaborative Code Editor',
    description: 'Web-based multi-user IDE featuring collaborative editing via WebSockets, syntax highlighting, and isolated code execution sandboxes.',
    techStack: ['React', 'Node.js', 'WebSockets', 'Tailwind', 'Docker'],
    githubUrl: 'https://github.com/developer/devsphere',
    liveUrl: 'https://devsphere-demo.vercel.app'
  },
  {
    id: 'proj_2',
    title: 'HireMatrix - AI Placement & Job Matcher',
    description: 'Career intelligence portal parsing student resumes, scoring ATS compliance, and delivering role recommendations with interview prep pipelines.',
    techStack: ['JavaScript', 'Python', 'FastAPI', 'PostgreSQL', 'CSS3'],
    githubUrl: 'https://github.com/developer/hirematrix',
    liveUrl: 'https://hirematrix-app.net'
  }
];

const DEFAULT_RESUME = {
  fileName: 'Sachin_AK_Software_Engineer_Resume.pdf',
  fileSize: '142 KB',
  fileType: 'PDF Document',
  targetRole: 'Software Development Engineer (SDE-1)',
  atsScore: 84,
  lastAudited: new Date().toISOString(),
  highlights: 'High compatibility match for Software Engineering roles (14 matched keywords, 4 impact metrics).'
};

const DEFAULT_INTERVIEW = {
  starStories: [
    {
      id: 'star_1',
      title: 'Overcoming tight sprint deadline for microservice migration',
      text: 'During our campus capstone project, our microservice faced latency spikes. I took charge of profiling database queries, introducing Redis caching. Result: response times reduced by 42%.'
    },
    {
      id: 'star_2',
      title: 'Resolving team conflict on architectural decision',
      text: 'When choosing between SQL and NoSQL for a student portal, our team was divided. I prepared an objective benchmark matrix and presented the trade-offs, aligning the team.'
    }
  ],
  hrPracticed: ['hr_1', 'hr_2', 'hr_3', 'hr_4']
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
    
    // Hire Score Components State
    this.studentSkills = JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDENT_SKILLS) || JSON.stringify(DEFAULT_SKILLS));
    this.studentProjects = JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDENT_PROJECTS) || JSON.stringify(DEFAULT_PROJECTS));
    this.resumeProfile = JSON.parse(localStorage.getItem(STORAGE_KEYS.RESUME_PROFILE) || JSON.stringify(DEFAULT_RESUME));
    this.interviewProfile = JSON.parse(localStorage.getItem(STORAGE_KEYS.INTERVIEW_PROFILE) || JSON.stringify(DEFAULT_INTERVIEW));
    
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
  // =========================================================================
  // HIRE SCORE & CANDIDATE PROFILE SYSTEM
  // =========================================================================
  getHireScore() {
    return HireScoreEngine.calculate(this);
  }

  updateSkills(skillsList) {
    this.studentSkills = [...skillsList];
    localStorage.setItem(STORAGE_KEYS.STUDENT_SKILLS, JSON.stringify(this.studentSkills));
    this.notify('hire_score_updated', this.getHireScore());
  }

  addProject(project) {
    const newProj = {
      ...project,
      id: 'proj_' + Date.now(),
      createdAt: new Date().toISOString()
    };
    this.studentProjects.unshift(newProj);
    localStorage.setItem(STORAGE_KEYS.STUDENT_PROJECTS, JSON.stringify(this.studentProjects));
    this.notify('hire_score_updated', this.getHireScore());
    return newProj;
  }

  deleteProject(projectId) {
    this.studentProjects = this.studentProjects.filter(p => p.id !== projectId);
    localStorage.setItem(STORAGE_KEYS.STUDENT_PROJECTS, JSON.stringify(this.studentProjects));
    this.notify('hire_score_updated', this.getHireScore());
  }

  updateResumeProfile(resumeData) {
    this.resumeProfile = {
      ...this.resumeProfile,
      ...resumeData,
      lastAudited: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.RESUME_PROFILE, JSON.stringify(this.resumeProfile));
    this.notify('hire_score_updated', this.getHireScore());
  }

  recordStarStory(story) {
    const newStory = {
      ...story,
      id: 'star_' + Date.now(),
      createdAt: new Date().toISOString()
    };
    if (!this.interviewProfile.starStories) this.interviewProfile.starStories = [];
    this.interviewProfile.starStories.unshift(newStory);
    localStorage.setItem(STORAGE_KEYS.INTERVIEW_PROFILE, JSON.stringify(this.interviewProfile));
    this.notify('hire_score_updated', this.getHireScore());
    return newStory;
  }

  toggleHrPracticed(questionId) {
    if (!this.interviewProfile.hrPracticed) this.interviewProfile.hrPracticed = [];
    const set = new Set(this.interviewProfile.hrPracticed);
    if (set.has(questionId)) set.delete(questionId);
    else set.add(questionId);
    this.interviewProfile.hrPracticed = [...set];
    localStorage.setItem(STORAGE_KEYS.INTERVIEW_PROFILE, JSON.stringify(this.interviewProfile));
    this.notify('hire_score_updated', this.getHireScore());
  }

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

    localStorage.removeItem(STORAGE_KEYS.STUDENT_SKILLS);
    localStorage.removeItem(STORAGE_KEYS.STUDENT_PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.RESUME_PROFILE);
    localStorage.removeItem(STORAGE_KEYS.INTERVIEW_PROFILE);

    this.savedJobIds.clear();
    this.applications = [];
    this.solvedDsaIds.clear();
    this.starredDsaIds.clear();
    this.dsaNotes = {};
    this.quizHistory = [];
    this.customJobs = [];
    this.studentSkills = [...DEFAULT_SKILLS];
    this.studentProjects = JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
    this.resumeProfile = JSON.parse(JSON.stringify(DEFAULT_RESUME));
    this.interviewProfile = JSON.parse(JSON.stringify(DEFAULT_INTERVIEW));

    this.notify('state_reset', null);
    this.notify('hire_score_updated', this.getHireScore());
  }
}

export const state = new StateManager();
