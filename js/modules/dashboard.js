/**
 * HireCraft - Student Hire Score Hub & Placement Command Center
 * Comprehensive multi-dimensional evaluation based on 6 core pillars:
 * 1. Skills & Tech Stack (15 pts)
 * 2. Data Structures & Algorithms (25 pts)
 * 3. Aptitude & Reasoning (15 pts)
 * 4. Real-World Projects (15 pts)
 * 5. Resume & ATS Scorecard (15 pts)
 * 6. Interview & Behavioral Readiness (15 pts)
 */

import { INITIAL_JOBS } from '../data/jobsData.js';
import { SKILL_LIBRARY, HireScoreEngine } from './hireScore.js';
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
        event === 'hire_score_updated' ||
        event === 'state_reset' ||
        event === 'auth_change'
      ) {
        this.render();
      }
    });

    // Reset All Data button
    // Modal Close Listeners for Hire Score Modals
    document.querySelectorAll('[data-close-modal="skills-modal"]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById('skills-modal')?.classList.remove('active');
      });
    });

    document.querySelectorAll('[data-close-modal="project-modal"]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById('project-modal')?.classList.remove('active');
      });
    });

    document.querySelectorAll('[data-close-modal="resume-modal"]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById('resume-modal')?.classList.remove('active');
      });
    });

    // 1. Skills Form Submit
    const skillsForm = document.getElementById('skills-form');
    if (skillsForm) {
      skillsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const checked = Array.from(document.querySelectorAll('#skills-checkboxes-container .skill-checkbox-input:checked'))
          .map(cb => cb.value);
        state.updateSkills(checked);
        document.getElementById('skills-modal')?.classList.remove('active');
        this.app.showToast(`Updated verified skills (${checked.length} skills in stack)!`, 'success');
        this.render();
      });
    }

    // 2. Project Form Submit
    const projectForm = document.getElementById('project-form');
    if (projectForm) {
      projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('project-title').value.trim();
        const description = document.getElementById('project-desc').value.trim();
        const techStack = document.getElementById('project-tech').value.split(',').map(s => s.trim()).filter(Boolean);
        const githubUrl = document.getElementById('project-github').value.trim();
        const liveUrl = document.getElementById('project-live').value.trim();

        if (!title || !description) {
          this.app.showToast('Please provide project title and description.', 'warning');
          return;
        }

        state.addProject({ title, description, techStack, githubUrl, liveUrl });
        document.getElementById('project-modal')?.classList.remove('active');
        this.app.showToast(`Project "${title}" added to portfolio!`, 'success');
        projectForm.reset();
        this.render();
      });
    }

    // 3. Resume ATS Audit Button
    const runAuditBtn = document.getElementById('btn-run-resume-audit');
    if (runAuditBtn) {
      runAuditBtn.addEventListener('click', () => {
        const text = document.getElementById('resume-paste-text').value;
        const role = document.getElementById('resume-target-role').value;
        const audit = HireScoreEngine.auditResume(text, role);

        const scoreEl = document.getElementById('resume-ats-score-display');
        if (scoreEl) scoreEl.textContent = `${audit.atsScore}%`;

        const feedbackEl = document.getElementById('resume-feedback-list');
        if (feedbackEl) {
          feedbackEl.innerHTML = `
            <div style="color: var(--accent-emerald); font-weight: 600; margin-bottom: 4px;">
              ✓ Contacts: ${audit.hasEmail ? 'Email, ' : ''}${audit.hasPhone ? 'Phone, ' : ''}${audit.hasGithub ? 'GitHub, ' : ''}${audit.hasLinkedin ? 'LinkedIn' : ''} detected
            </div>
            <div style="color: var(--primary); font-weight: 600; margin-bottom: 4px;">
              ✓ Matched ${audit.matchedKeywords.length} Tech Keywords: ${audit.matchedKeywords.slice(0, 6).join(', ')}...
            </div>
            ${audit.feedback.map(f => `<div style="color: var(--accent-amber); margin-bottom: 2px;">• ${f}</div>`).join('')}
          `;
        }

        this.app.showToast(`ATS Scan Complete: Score is ${audit.atsScore}%!`, 'info');
      });
    }

    // 4. Resume Form Submit
    const resumeForm = document.getElementById('resume-audit-form');
    if (resumeForm) {
      resumeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const targetRole = document.getElementById('resume-target-role').value.trim();
        const fileName = document.getElementById('resume-filename').value.trim();
        const text = document.getElementById('resume-paste-text').value;
        const audit = HireScoreEngine.auditResume(text, targetRole);

        state.updateResumeProfile({
          targetRole,
          fileName,
          atsScore: audit.atsScore,
          highlights: `Scored ${audit.atsScore}% ATS compatibility with ${audit.matchedKeywords.length} verified keywords.`
        });

        document.getElementById('resume-modal')?.classList.remove('active');
        this.app.showToast('Resume ATS audit scorecard updated!', 'success');
        this.render();
      });
    }
  }

  render() {
    const container = document.getElementById('dashboard-content-container');
    if (!container) return;

    const hireScore = state.getHireScore();
    const currentUser = state.getCurrentUser() || {
      name: 'Sachin A K',
      role: 'Aspiring Software Development Engineer',
      email: 'sachin@candidate.com'
    };
    const allJobs = [...state.customJobs, ...INITIAL_JOBS];
    const savedJobs = allJobs.filter(j => state.isJobSaved(j.id));
    const applications = state.applications;
    const p = hireScore.pillars;

    container.innerHTML = `
      <!-- Candidate Profile Top Strip -->
      <div class="hire-profile-strip">
        <div class="profile-info-group">
          <div class="candidate-avatar-badge">
            ${currentUser.avatar || currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div class="candidate-name-row">
              <h3>${currentUser.name}</h3>
              <span class="hire-tier-badge ${hireScore.tierBadgeClass}">${hireScore.tierName}</span>
            </div>
            <div class="candidate-subtitle">
              <span>🎯 ${currentUser.role || 'Aspiring Software Engineer'}</span> • 
              <span>${currentUser.email}</span> • 
              <span style="color: var(--accent-emerald);">● Profile Active & Synced</span>
            </div>
          </div>
        </div>

        <div class="profile-score-quickpill" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
          <div class="quickpill-num">${hireScore.totalScore}</div>
          <div class="quickpill-meta">
            <span style="font-weight: 800; font-size: 0.8rem; color: var(--accent-cyan);">HIRE SCORE</span>
            <span style="font-size: 0.72rem; color: var(--text-muted);">${hireScore.percentile}</span>
          </div>
        </div>
      </div>

      <!-- Hero Hire Score Showcase Card -->
      <div class="hire-hero-card">
        <div class="hire-gauge-col">
          <div class="hire-gauge-wrap">
            <svg viewBox="0 0 36 36" class="hire-gauge-svg">
              <path class="gauge-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path class="gauge-fill" stroke-dasharray="${hireScore.totalScore}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div class="gauge-inner-label">
              <span class="gauge-score-val">${hireScore.totalScore}</span>
              <span class="gauge-score-max">/ 100</span>
            </div>
          </div>
          <div class="gauge-tier-pill ${hireScore.tierBadgeClass}">
            ${hireScore.tierName}
          </div>
        </div>

        <div class="hire-benchmark-col">
          <div style="font-size: 0.82rem; text-transform: uppercase; font-weight: 700; color: var(--primary); letter-spacing: 0.5px; margin-bottom: 4px;">
            Standardized Placement Index
          </div>
          <h2 style="font-size: 1.55rem; font-weight: 800; margin-bottom: 8px;">
            Comprehensive Candidate Hire Score
          </h2>
          <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6; margin-bottom: 16px;">
            A verified 360° benchmark evaluated across <strong>Skills, DSA Sheet, Aptitude, Projects, ATS Resume</strong>, and <strong>Behavioral Interviews</strong>. Used by tech recruiters to shortlist candidates.
          </p>

          <div class="hire-meta-grid">
            <div class="hire-meta-box">
              <div class="h-lbl">Percentile Rank</div>
              <div class="h-val" style="color: var(--accent-cyan);">${hireScore.percentile}</div>
            </div>
            <div class="hire-meta-box">
              <div class="h-lbl">Target Companies</div>
              <div class="h-val" style="color: var(--accent-emerald); font-size: 0.95rem;">${hireScore.tierTarget.split('(')[0]}</div>
            </div>
            <div class="hire-meta-box">
              <div class="h-lbl">Estimated CTC</div>
              <div class="h-val" style="color: var(--accent-amber); font-weight: 800;">₹12 - 28 LPA</div>
            </div>
          </div>
        </div>

        <div class="hire-boost-col">
          <div style="font-size: 0.82rem; font-weight: 800; color: var(--text-primary); margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
            <span>⚡</span> Priority Score Boosters:
          </div>
          <div class="boost-list">
            ${hireScore.recommendations.map(r => `
              <div class="boost-item">
                <div style="flex: 1;">
                  <div class="boost-title">${r.title}</div>
                  <div class="boost-impact">${r.impact}</div>
                </div>
                <button class="btn btn-secondary btn-boost-action" 
                  ${r.view ? `data-jump-view="${r.view}"` : ''} 
                  ${r.actionModal ? `data-open-modal="${r.actionModal}"` : ''}>
                  ${r.actionLabel} →
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Section Title: 6 Score Pillars -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin: 32px 0 16px;">
        <div>
          <h3 style="font-size: 1.35rem; font-weight: 800;">6 Core Evaluation Pillars</h3>
          <p style="color: var(--text-muted); font-size: 0.85rem;">Click any pillar to manage credentials, solve problems, or audit assets.</p>
        </div>
        <button class="btn btn-secondary" id="btn-print-candidate-card" style="font-size: 0.8rem; padding: 6px 14px;">
          🖨️ Candidate Hire Card
        </button>
      </div>

      <!-- 6 Pillars Grid -->
      <div class="pillars-grid">
        <!-- 1. Skills -->
        <div class="pillar-card">
          <div class="pillar-header">
            <div class="pillar-title-group">
              <span class="pillar-icon">${p.skills.icon}</span>
              <div>
                <h4 class="pillar-title">${p.skills.name}</h4>
                <div class="pillar-sub">${p.skills.summary}</div>
              </div>
            </div>
            <div class="pillar-pts-badge">
              <span class="pts-val">${p.skills.score}</span> / ${p.skills.max} pts
            </div>
          </div>

          <div class="pillar-bar-wrap">
            <div class="pillar-bar-fill" style="width: ${p.skills.percent}%; background: var(--gradient-primary);"></div>
          </div>

          <div class="pillar-content-tags">
            ${state.studentSkills.map(s => `<span class="skill-cloud-tag">✓ ${s}</span>`).join('')}
          </div>

          <div class="pillar-footer-action">
            <button class="btn btn-secondary btn-full" id="btn-open-skills-modal">
              🛠️ Manage & Verify Skills
            </button>
          </div>
        </div>

        <!-- 2. DSA Mastery -->
        <div class="pillar-card">
          <div class="pillar-header">
            <div class="pillar-title-group">
              <span class="pillar-icon">${p.dsa.icon}</span>
              <div>
                <h4 class="pillar-title">${p.dsa.name}</h4>
                <div class="pillar-sub">${p.dsa.summary}</div>
              </div>
            </div>
            <div class="pillar-pts-badge">
              <span class="pts-val">${p.dsa.score}</span> / ${p.dsa.max} pts
            </div>
          </div>

          <div class="pillar-bar-wrap">
            <div class="pillar-bar-fill" style="width: ${p.dsa.percent}%; background: linear-gradient(90deg, #10b981, #06b6d4);"></div>
          </div>

          <div style="display: flex; gap: 8px; margin: 12px 0;">
            <span style="font-size: 0.78rem; background: rgba(16, 185, 129, 0.15); color: #34d399; padding: 4px 10px; border-radius: var(--radius-sm); font-weight: 700;">
              Easy: ${p.dsa.easyCount}
            </span>
            <span style="font-size: 0.78rem; background: rgba(245, 158, 11, 0.15); color: #fbbf24; padding: 4px 10px; border-radius: var(--radius-sm); font-weight: 700;">
              Medium: ${p.dsa.medCount}
            </span>
            <span style="font-size: 0.78rem; background: rgba(244, 63, 94, 0.15); color: #f43f5e; padding: 4px 10px; border-radius: var(--radius-sm); font-weight: 700;">
              Hard: ${p.dsa.hardCount}
            </span>
          </div>

          <div class="pillar-footer-action">
            <button class="btn btn-primary btn-full" onclick="window.SKHireApp ? window.SKHireApp.switchView('dsa') : window.HireCraftApp.switchView('dsa')">
              ⚡ Open Blank DSA Solver
            </button>
          </div>
        </div>

        <!-- 3. Aptitude -->
        <div class="pillar-card">
          <div class="pillar-header">
            <div class="pillar-title-group">
              <span class="pillar-icon">${p.aptitude.icon}</span>
              <div>
                <h4 class="pillar-title">${p.aptitude.name}</h4>
                <div class="pillar-sub">${p.aptitude.summary}</div>
              </div>
            </div>
            <div class="pillar-pts-badge">
              <span class="pts-val">${p.aptitude.score}</span> / ${p.aptitude.max} pts
            </div>
          </div>

          <div class="pillar-bar-wrap">
            <div class="pillar-bar-fill" style="width: ${p.aptitude.percent}%; background: linear-gradient(90deg, #3b82f6, #8b5cf6);"></div>
          </div>

          <p style="font-size: 0.82rem; color: var(--text-secondary); margin: 12px 0 16px;">
            Timed assessments covering Quantitative Math, Logical Deduction, Verbal Ability, and Core CS.
          </p>

          <div class="pillar-footer-action">
            <button class="btn btn-secondary btn-full" onclick="window.SKHireApp ? window.SKHireApp.switchView('prep') : window.HireCraftApp.switchView('prep')">
              🧠 Take Aptitude Assessment
            </button>
          </div>
        </div>

        <!-- 4. Projects -->
        <div class="pillar-card">
          <div class="pillar-header">
            <div class="pillar-title-group">
              <span class="pillar-icon">${p.projects.icon}</span>
              <div>
                <h4 class="pillar-title">${p.projects.name}</h4>
                <div class="pillar-sub">${p.projects.summary}</div>
              </div>
            </div>
            <div class="pillar-pts-badge">
              <span class="pts-val">${p.projects.score}</span> / ${p.projects.max} pts
            </div>
          </div>

          <div class="pillar-bar-wrap">
            <div class="pillar-bar-fill" style="width: ${p.projects.percent}%; background: linear-gradient(90deg, #f59e0b, #ef4444);"></div>
          </div>

          <div style="font-size: 0.82rem; color: var(--text-secondary); margin: 12px 0;">
            ${state.studentProjects.slice(0, 2).map(proj => `
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="font-weight: 700; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 220px;">
                  🚀 ${proj.title}
                </span>
                <span style="color: var(--accent-emerald); font-size: 0.75rem;">Verified</span>
              </div>
            `).join('')}
          </div>

          <div class="pillar-footer-action">
            <button class="btn btn-secondary btn-full" id="btn-open-project-modal">
              🚀 + Add / Manage Projects
            </button>
          </div>
        </div>

        <!-- 5. Resume / ATS -->
        <div class="pillar-card">
          <div class="pillar-header">
            <div class="pillar-title-group">
              <span class="pillar-icon">${p.resume.icon}</span>
              <div>
                <h4 class="pillar-title">${p.resume.name}</h4>
                <div class="pillar-sub">${p.resume.summary}</div>
              </div>
            </div>
            <div class="pillar-pts-badge">
              <span class="pts-val">${p.resume.score}</span> / ${p.resume.max} pts
            </div>
          </div>

          <div class="pillar-bar-wrap">
            <div class="pillar-bar-fill" style="width: ${p.resume.percent}%; background: linear-gradient(90deg, #06b6d4, #3b82f6);"></div>
          </div>

          <div style="background: var(--bg-surface-elevated); padding: 10px 14px; border-radius: var(--radius-md); margin: 12px 0; border: 1px solid var(--border-subtle); font-size: 0.82rem;">
            <div style="color: var(--text-primary); font-weight: 700;">📄 ${state.resumeProfile.fileName || 'Sachin_Resume.pdf'}</div>
            <div style="color: var(--text-muted); font-size: 0.76rem; margin-top: 2px;">ATS Scanner Score: <strong style="color: var(--accent-emerald);">${state.resumeProfile.atsScore || 84}%</strong></div>
          </div>

          <div class="pillar-footer-action">
            <button class="btn btn-secondary btn-full" id="btn-open-resume-modal">
              📄 Run ATS Resume Audit
            </button>
          </div>
        </div>

        <!-- 6. Interview Readiness -->
        <div class="pillar-card">
          <div class="pillar-header">
            <div class="pillar-title-group">
              <span class="pillar-icon">${p.interview.icon}</span>
              <div>
                <h4 class="pillar-title">${p.interview.name}</h4>
                <div class="pillar-sub">${p.interview.summary}</div>
              </div>
            </div>
            <div class="pillar-pts-badge">
              <span class="pts-val">${p.interview.score}</span> / ${p.interview.max} pts
            </div>
          </div>

          <div class="pillar-bar-wrap">
            <div class="pillar-bar-fill" style="width: ${p.interview.percent}%; background: linear-gradient(90deg, #8b5cf6, #ec4899);"></div>
          </div>

          <p style="font-size: 0.82rem; color: var(--text-secondary); margin: 12px 0 16px;">
            STAR behavioral narratives, situational conflict handling, and technical CS interview question bank.
          </p>

          <div class="pillar-footer-action">
            <button class="btn btn-secondary btn-full" onclick="window.SKHireApp ? window.SKHireApp.switchView('prep') : window.HireCraftApp.switchView('prep')">
              🎙️ Practice STAR Method
            </button>
          </div>
        </div>
      </div>

      <!-- Student Showcase Projects Gallery -->
      <div class="dashboard-projects-section" style="margin-top: 36px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <h4 style="font-size: 1.2rem; font-weight: 800;">My Verified Projects (${state.studentProjects.length})</h4>
            <p style="font-size: 0.84rem; color: var(--text-muted);">Real-world systems boosting your Hire Score portfolio points.</p>
          </div>
          <button class="btn btn-primary" id="btn-add-project-quick" style="padding: 6px 14px; font-size: 0.8rem;">
            + Add Project
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px;">
          ${state.studentProjects.map(proj => `
            <div class="student-project-card">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <h5 style="font-size: 1rem; font-weight: 800; color: var(--text-primary);">${proj.title}</h5>
                <button class="btn-delete-proj" data-delete-project="${proj.id}" title="Delete project" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 0.9rem;">✕</button>
              </div>
              <p style="font-size: 0.84rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 12px;">
                ${proj.description}
              </p>
              <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px;">
                ${(proj.techStack || []).map(t => `<span class="company-mini-tag">${t}</span>`).join('')}
              </div>
              <div style="display: flex; gap: 10px; font-size: 0.78rem;">
                ${proj.githubUrl ? `
                  <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="padding: 4px 10px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
                    <span>🐙</span> GitHub
                  </a>
                ` : ''}
                ${proj.liveUrl ? `
                  <a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="padding: 4px 10px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; color: var(--primary);">
                    <span>🌐</span> Live Demo ↗
                  </a>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Application Pipeline Tracker & Saved Jobs -->
      <div style="display: grid; grid-template-columns: 1.4fr 1fr; gap: 20px; margin-top: 36px;">
        <!-- Applications -->
        <div class="applications-tracker-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h4 style="font-size: 1.15rem; font-weight: 800;">My Job Applications (${applications.length})</h4>
            <button class="btn btn-secondary" style="font-size: 0.8rem; padding: 6px 12px;" onclick="window.SKHireApp ? window.SKHireApp.switchView('jobs') : window.HireCraftApp.switchView('jobs')">
              + Browse Open Jobs
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
                    <h5 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">${app.jobTitle}</h5>
                    <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">
                      ${app.company} • ${app.location} • Applied ${new Date(app.appliedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <span class="stage-pill stage-${app.status}">${app.status}</span>
                </div>
              `).join('')}
            </div>
          `}
        </div>

        <!-- Bookmarked Jobs -->
        <div class="applications-tracker-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h4 style="font-size: 1.15rem; font-weight: 800;">Bookmarked Jobs (${savedJobs.length})</h4>
          </div>

          ${savedJobs.length === 0 ? `
            <div style="text-align: center; padding: 32px 16px; background: var(--bg-surface-elevated); border-radius: var(--radius-md);">
              <div style="font-size: 2rem; margin-bottom: 8px;">⭐</div>
              <p style="color: var(--text-muted); font-size: 0.9rem;">No saved jobs yet. Click the star on any job to bookmark it!</p>
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${savedJobs.map(job => `
                <div style="background: var(--bg-surface-elevated); padding: 12px 14px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <div style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary);">${job.title}</div>
                    <div style="font-size: 0.78rem; color: var(--text-muted);">${job.company} • ${job.salary}</div>
                  </div>
                  <button class="btn btn-primary" style="padding: 4px 10px; font-size: 0.75rem;" onclick="window.SKHireApp ? window.SKHireApp.switchView('jobs') : window.HireCraftApp.switchView('jobs')">
                    View
                  </button>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>

      <!-- Reset Demo Data Section -->
      <div style="margin-top: 40px; text-align: right;">
        <button class="btn btn-secondary" id="btn-reset-data" style="font-size: 0.8rem; color: var(--accent-rose); border-color: rgba(244, 63, 94, 0.2);">
          🗑️ Reset Demo Data & Recalculate
        </button>
      </div>
    `;

    this.bindDynamicListeners(container);
  }

  bindDynamicListeners(container) {
    // Jump view buttons
    container.querySelectorAll('[data-jump-view]').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.jumpView;
        if (window.SKHireApp) window.SKHireApp.switchView(view);
        else if (window.HireCraftApp) window.HireCraftApp.switchView(view);
      });
    });

    // Open modal buttons
    container.querySelectorAll('[data-open-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.dataset.openModal;
        document.getElementById(modalId)?.classList.add('active');
      });
    });

    // Manage Skills button
    const openSkillsBtn = container.querySelector('#btn-open-skills-modal');
    if (openSkillsBtn) {
      openSkillsBtn.addEventListener('click', () => {
        this.openSkillsModal();
      });
    }

    // Add Project buttons
    const addProjBtn = container.querySelector('#btn-open-project-modal');
    const addProjQuick = container.querySelector('#btn-add-project-quick');
    [addProjBtn, addProjQuick].filter(Boolean).forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById('project-modal')?.classList.add('active');
      });
    });

    // Delete project buttons
    container.querySelectorAll('[data-delete-project]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.deleteProject;
        if (confirm('Are you sure you want to remove this project?')) {
          state.deleteProject(id);
          this.app.showToast('Project removed from portfolio.', 'info');
          this.render();
        }
      });
    });

    // Resume modal button
    const resumeBtn = container.querySelector('#btn-open-resume-modal');
    if (resumeBtn) {
      resumeBtn.addEventListener('click', () => {
        this.openResumeModal();
      });
    }

    // Candidate card print/preview
    const printBtn = container.querySelector('#btn-print-candidate-card');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    // Reset button
    const resetBtn = container.querySelector('#btn-reset-data');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all progress and reinitialize standard baseline data?')) {
          state.resetAllData();
          this.app.showToast('Demo data successfully reset.', 'info');
          this.render();
        }
      });
    }
  }

  openSkillsModal() {
    const modal = document.getElementById('skills-modal');
    if (!modal) return;

    const listContainer = document.getElementById('skills-checkboxes-container');
    if (listContainer) {
      const currentSkills = new Set(state.studentSkills || []);
      listContainer.innerHTML = SKILL_LIBRARY.map(skill => {
        const checked = currentSkills.has(skill.name);
        return `
          <label class="skill-picker-item ${checked ? 'selected' : ''}">
            <input type="checkbox" value="${skill.name}" ${checked ? 'checked' : ''} class="skill-checkbox-input" />
            <span class="skill-picker-icon">${skill.icon}</span>
            <div style="flex: 1;">
              <div class="skill-picker-name">${skill.name}</div>
              <div class="skill-picker-cat">${skill.category}</div>
            </div>
          </label>
        `;
      }).join('');

      listContainer.querySelectorAll('.skill-picker-item').forEach(label => {
        const input = label.querySelector('input');
        input.addEventListener('change', () => {
          label.classList.toggle('selected', input.checked);
        });
      });
    }

    modal.classList.add('active');
  }

  openResumeModal() {
    const modal = document.getElementById('resume-modal');
    if (!modal) return;

    const resume = state.resumeProfile;
    const atsScoreDisplay = document.getElementById('resume-ats-score-display');
    if (atsScoreDisplay) {
      atsScoreDisplay.textContent = `${resume.atsScore || 84}%`;
    }

    modal.classList.add('active');
  }
}
