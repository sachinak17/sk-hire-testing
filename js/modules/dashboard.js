/**
 * HireCraft - User Dashboard Module
 * Analytics, interview readiness score, applications tracker, and saved jobs manager.
 */

import { DSA_PROBLEMS } from '../data/dsaSheetData.js';
import { INITIAL_JOBS } from '../data/jobsData.js';
import { state } from '../state.js';

export class DashboardModule {
  constructor(app) {
    this.app = app;
  }

  init() {
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    state.subscribe((event) => {
      if (
        event === 'saved_jobs_change' ||
        event === 'application_submitted' ||
        event === 'dsa_solved_change' ||
        event === 'quiz_completed' ||
        event === 'state_reset' ||
        event === 'auth_change'
      ) {
        this.render();
      }
    });

    const resetBtn = document.getElementById('btn-reset-data');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all your preparation progress, saved jobs, and applications?')) {
          state.resetAllData();
          this.app.showToast('All progress reset to clean state.', 'info');
          this.render();
        }
      });
    }
  }

  calculateReadinessScore() {
    const totalDsa = DSA_PROBLEMS.length;
    const solvedDsa = DSA_PROBLEMS.filter(p => state.isDsaSolved(p.id)).length;
    const dsaWeight = totalDsa > 0 ? (solvedDsa / totalDsa) * 50 : 0; // 50% weight

    const quizCount = state.quizHistory.length;
    let quizAvg = 0;
    if (quizCount > 0) {
      const sum = state.quizHistory.reduce((acc, q) => acc + (q.percentage || 0), 0);
      quizAvg = sum / quizCount;
    }
    const quizWeight = (quizAvg / 100) * 30; // 30% weight

    const appsCount = state.applications.length;
    const appWeight = Math.min(appsCount * 5, 20); // 20% weight (up to 4 apps)

    const totalReadiness = Math.min(Math.round(dsaWeight + quizWeight + appWeight), 100);
    return {
      totalReadiness,
      solvedDsa,
      totalDsa,
      quizCount,
      quizAvg: Math.round(quizAvg),
      appsCount
    };
  }

  render() {
    const container = document.getElementById('dashboard-content-container');
    if (!container) return;

    const stats = this.calculateReadinessScore();
    const allJobs = [...state.customJobs, ...INITIAL_JOBS];
    const savedJobs = allJobs.filter(j => state.isJobSaved(j.id));
    const applications = state.applications;
    const currentUser = state.getCurrentUser();

    const userBannerHtml = currentUser
      ? `
        <div style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(6, 182, 212, 0.1)); border: 1px solid var(--border-accent); border-radius: var(--radius-lg); padding: 18px 24px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: #fff; font-size: 1.2rem; font-weight: 800; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px var(--primary-glow);">
              ${currentUser.avatar || 'U'}
            </div>
            <div>
              <div style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary);">
                Welcome back, ${currentUser.name}! 👋
              </div>
              <div style="font-size: 0.84rem; color: var(--text-secondary);">
                Active Role: <span style="color: var(--primary); font-weight: 600;">${currentUser.role || 'Candidate'}</span> • ${currentUser.email}
              </div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 0.8rem; background: var(--bg-surface); padding: 6px 14px; border-radius: var(--radius-full); border: 1px solid var(--border-subtle); color: var(--accent-emerald); font-weight: 600;">
              ● Profile Active & Synced
            </span>
          </div>
        </div>
      `
      : `
        <div style="background: var(--bg-surface); border: 1px dashed var(--border-subtle); border-radius: var(--radius-lg); padding: 16px 20px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 1.4rem;">💡</span>
            <div style="font-size: 0.88rem; color: var(--text-secondary);">
              <strong>Browsing as Guest:</strong> Sign in to sync your applications, DSA notes, and bookmarks across devices.
            </div>
          </div>
          <a href="login.html" class="btn btn-primary" style="padding: 6px 16px; font-size: 0.84rem; text-decoration: none;">
            Sign In / Register →
          </a>
        </div>
      `;

    container.innerHTML = `
      ${userBannerHtml}
      <div class="dashboard-grid">
        <!-- Left: Readiness Score Card -->
        <div class="readiness-card">
          <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 6px;">Placement Readiness Score</h3>
          <p style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 20px;">
            Weighted score based on DSA practice, subject quizzes, and job applications.
          </p>

          <div class="readiness-gauge">
            <svg viewBox="0 0 36 36" class="circular-chart">
              <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path class="circle" stroke-dasharray="${stats.totalReadiness}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div class="circle-percentage">${stats.totalReadiness}%</div>
          </div>

          <div style="font-size: 0.95rem; font-weight: 700; color: ${stats.totalReadiness >= 75 ? 'var(--accent-emerald)' : stats.totalReadiness >= 40 ? 'var(--accent-amber)' : 'var(--primary)'};">
            ${stats.totalReadiness >= 75 ? '🔥 High Placement Probability' : stats.totalReadiness >= 40 ? '⚡ Steady Momentum - Keep Going' : '🌱 Early Preparation Phase'}
          </div>

          <div class="readiness-meta-stats">
            <div class="readiness-item">
              <div class="r-val">${stats.solvedDsa} / ${stats.totalDsa}</div>
              <div class="r-lbl">DSA Solved</div>
            </div>
            <div class="readiness-item">
              <div class="r-val">${stats.quizCount}</div>
              <div class="r-lbl">Quizzes Taken</div>
            </div>
            <div class="readiness-item">
              <div class="r-val">${stats.appsCount}</div>
              <div class="r-lbl">Jobs Applied</div>
            </div>
          </div>

          <div style="margin-top: 24px;">
            <button class="btn btn-secondary" id="btn-reset-data" style="font-size: 0.8rem; color: var(--accent-rose); border-color: rgba(244, 63, 94, 0.2);">
              🗑️ Reset All Demo Progress
            </button>
          </div>
        </div>

        <!-- Right: Applications Pipeline & Saved Jobs -->
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <!-- Applications Tracker -->
          <div class="applications-tracker-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <h4 style="font-size: 1.15rem; font-weight: 800;">My Job Applications (${applications.length})</h4>
              <button class="btn btn-secondary" style="font-size: 0.8rem; padding: 6px 12px;" onclick="document.querySelector('[data-view=\\'jobs\\']').click()">
                + Find More Jobs
              </button>
            </div>

            ${applications.length === 0 ? `
              <div style="text-align: center; padding: 32px 16px; background: var(--bg-surface-elevated); border-radius: var(--radius-md);">
                <div style="font-size: 2rem; margin-bottom: 8px;">📬</div>
                <p style="color: var(--text-muted); font-size: 0.9rem;">You haven't submitted any job applications yet.</p>
              </div>
            ` : `
              <div style="display: flex; flex-direction: column; gap: 10px;">
                ${applications.map(app => `
                  <div class="app-tracker-item">
                    <div>
                      <h5 style="font-size: 1rem; font-weight: 700; color: var(--text-primary);">${app.jobTitle}</h5>
                      <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 2px;">
                        ${app.company} • ${app.location} • Applied ${new Date(app.appliedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <span class="stage-pill stage-${app.status}">${app.status}</span>
                  </div>
                `).join('')}
              </div>
            `}
          </div>

          <!-- Saved Jobs -->
          <div class="applications-tracker-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <h4 style="font-size: 1.15rem; font-weight: 800;">Bookmarked Jobs (${savedJobs.length})</h4>
            </div>

            ${savedJobs.length === 0 ? `
              <div style="text-align: center; padding: 32px 16px; background: var(--bg-surface-elevated); border-radius: var(--radius-md);">
                <div style="font-size: 2rem; margin-bottom: 8px;">⭐</div>
                <p style="color: var(--text-muted); font-size: 0.9rem;">No saved jobs yet. Click the star icon on any job card to bookmark it!</p>
              </div>
            ` : `
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                ${savedJobs.map(job => `
                  <div style="background: var(--bg-surface-elevated); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <div style="font-weight: 700; font-size: 0.92rem; color: var(--text-primary);">${job.title}</div>
                      <div style="font-size: 0.8rem; color: var(--text-muted);">${job.company} • ${job.salary}</div>
                    </div>
                    <button class="btn btn-primary" style="padding: 6px 12px; font-size: 0.78rem;" onclick="document.querySelector('[data-view=\\'jobs\\']').click()">
                      View
                    </button>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        </div>
      </div>
    `;

    // Rebind reset button inside rendered markup
    const resetBtn = container.querySelector('#btn-reset-data');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all your preparation progress, saved jobs, and applications?')) {
          state.resetAllData();
          this.app.showToast('All progress reset to clean state.', 'info');
          this.render();
        }
      });
    }
  }
}
