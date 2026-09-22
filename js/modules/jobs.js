/**
 * HireCraft - Job Listings & Applications Module
 * Renders job listings, filters, details modal, and easy apply flow.
 */

import { INITIAL_JOBS } from '../data/jobsData.js';
import { state } from '../state.js';

export class JobsModule {
  constructor(app) {
    this.app = app;
    this.jobs = [...state.customJobs, ...INITIAL_JOBS];
    this.activeFilters = {
      search: '',
      type: 'all',
      experience: 'all',
      domain: 'all'
    };
    this.currentJobModal = null;
  }

  init() {
    this.bindEvents();
    this.render();
  }

  getAllJobs() {
    return [...state.customJobs, ...INITIAL_JOBS];
  }

  bindEvents() {
    // Search input
    const searchInput = document.getElementById('job-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.activeFilters.search = e.target.value.toLowerCase().trim();
        this.render();
      });
    }

    // Filter selects
    const typeFilter = document.getElementById('job-type-filter');
    if (typeFilter) {
      typeFilter.addEventListener('change', (e) => {
        this.activeFilters.type = e.target.value;
        this.render();
      });
    }

    const expFilter = document.getElementById('job-exp-filter');
    if (expFilter) {
      expFilter.addEventListener('change', (e) => {
        this.activeFilters.experience = e.target.value;
        this.render();
      });
    }

    // Category pills
    const pillContainer = document.getElementById('job-domain-pills');
    if (pillContainer) {
      pillContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('pill-btn')) {
          pillContainer.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('active'));
          e.target.classList.add('active');
          this.activeFilters.domain = e.target.dataset.domain;
          this.render();
        }
      });
    }

    // Modal close listeners
    const modalCloseButtons = document.querySelectorAll('[data-close-modal]');
    modalCloseButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modalId = e.currentTarget.dataset.closeModal;
        this.closeModal(modalId);
      });
    });

    // Form submissions
    const applyForm = document.getElementById('easy-apply-form');
    if (applyForm) {
      applyForm.addEventListener('submit', (e) => this.handleApplySubmit(e));
    }

    // Subscribe to state changes
    state.subscribe((event) => {
      if (event === 'saved_jobs_change' || event === 'application_submitted' || event === 'custom_job_added' || event === 'state_reset') {
        this.render();
      }
    });
  }

  getFilteredJobs() {
    return this.getAllJobs().filter(job => {
      const matchesSearch = !this.activeFilters.search ||
        job.title.toLowerCase().includes(this.activeFilters.search) ||
        job.company.toLowerCase().includes(this.activeFilters.search) ||
        job.location.toLowerCase().includes(this.activeFilters.search) ||
        job.tags.some(tag => tag.toLowerCase().includes(this.activeFilters.search));

      const matchesType = this.activeFilters.type === 'all' || 
        (this.activeFilters.type === 'Internship' && job.type === 'Internship') ||
        (this.activeFilters.type === 'Full-time' && job.type === 'Full-time') ||
        (this.activeFilters.type === 'Remote' && (job.workplaceType === 'Remote' || job.location.includes('Remote')));

      const matchesExp = this.activeFilters.experience === 'all' || 
        job.experienceLevel === this.activeFilters.experience;

      const matchesDomain = this.activeFilters.domain === 'all' ||
        job.category === this.activeFilters.domain;

      return matchesSearch && matchesType && matchesExp && matchesDomain;
    });
  }

  render() {
    const container = document.getElementById('jobs-grid-container');
    const countBadge = document.getElementById('jobs-count-badge');
    if (!container) return;

    const filtered = this.getFilteredJobs();
    if (countBadge) {
      countBadge.textContent = `${filtered.length} Jobs Available`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px solid var(--border-subtle);">
          <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
          <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 8px;">No matching job openings found</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; max-width: 450px; margin: 0 auto 16px;">Try adjusting your keyword search, clearing experience filters, or exploring all domains.</p>
          <button class="btn btn-secondary" id="btn-reset-filters">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('btn-reset-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.activeFilters = { search: '', type: 'all', experience: 'all', domain: 'all' };
          const searchInput = document.getElementById('job-search-input');
          if (searchInput) searchInput.value = '';
          const typeFilter = document.getElementById('job-type-filter');
          if (typeFilter) typeFilter.value = 'all';
          const expFilter = document.getElementById('job-exp-filter');
          if (expFilter) expFilter.value = 'all';
          const pillContainer = document.getElementById('job-domain-pills');
          if (pillContainer) {
            pillContainer.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('active'));
            pillContainer.querySelector('[data-domain="all"]')?.classList.add('active');
          }
          this.render();
        });
      }
      return;
    }

    container.innerHTML = filtered.map(job => {
      const isSaved = state.isJobSaved(job.id);
      const isApplied = state.isJobApplied(job.id);

      return `
        <div class="job-card" data-job-id="${job.id}">
          <div class="job-card-header">
            <div class="company-badge-box">
              <div class="company-logo">${job.logo || '🏢'}</div>
              <div>
                <span class="job-company-name">${job.company}</span>
                <h4 class="job-role-title">${job.title}</h4>
              </div>
            </div>
            <button class="bookmark-btn ${isSaved ? 'bookmarked' : ''}" title="${isSaved ? 'Remove Bookmark' : 'Save Job'}" data-save-job="${job.id}">
              ${isSaved ? '★' : '☆'}
            </button>
          </div>

          <div class="job-meta-row">
            <span class="job-meta-item">📍 ${job.location}</span>
            <span class="job-meta-item">💼 ${job.type}</span>
            <span class="job-meta-item">🎓 ${job.experience}</span>
            <span class="job-meta-item">⏱️ ${job.postedAt}</span>
          </div>

          <div class="job-tags-row">
            ${job.tags.slice(0, 4).map(t => `<span class="skill-tag">${t}</span>`).join('')}
            ${job.tags.length > 4 ? `<span class="skill-tag">+${job.tags.length - 4}</span>` : ''}
          </div>

          <div class="job-card-footer">
            <div class="salary-tag">${job.salary}</div>
            <div class="job-actions">
              <button class="btn btn-secondary btn-details" data-view-job="${job.id}">Details</button>
              ${isApplied ? `
                <div class="applied-badge">✓ Applied</div>
              ` : `
                <button class="btn btn-primary btn-apply" data-apply-job="${job.id}">Easy Apply</button>
              `}
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach card event listeners
    container.querySelectorAll('[data-save-job]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const jobId = btn.dataset.saveJob;
        const saved = state.toggleSaveJob(jobId);
        this.app.showToast(saved ? 'Job saved to your bookmarks!' : 'Job removed from bookmarks', 'info');
      });
    });

    container.querySelectorAll('[data-view-job]').forEach(btn => {
      btn.addEventListener('click', () => {
        const jobId = btn.dataset.viewJob;
        this.openJobDetailsModal(jobId);
      });
    });

    container.querySelectorAll('[data-apply-job]').forEach(btn => {
      btn.addEventListener('click', () => {
        const jobId = btn.dataset.applyJob;
        this.openApplyModal(jobId);
      });
    });
  }

  openJobDetailsModal(jobId) {
    const job = this.getAllJobs().find(j => j.id === jobId);
    if (!job) return;

    const modal = document.getElementById('job-details-modal');
    const content = document.getElementById('job-details-modal-content');
    if (!modal || !content) return;

    const isApplied = state.isJobApplied(job.id);
    const isSaved = state.isJobSaved(job.id);

    content.innerHTML = `
      <div style="display: flex; align-items: flex-start; gap: 18px; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid var(--border-subtle);">
        <div class="company-logo" style="width: 64px; height: 64px; font-size: 2.2rem;">${job.logo || '🏢'}</div>
        <div style="flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <h3 style="font-size: 1.4rem; font-weight: 800; color: var(--text-primary);">${job.title}</h3>
              <p style="color: var(--text-secondary); font-weight: 600; font-size: 1rem;">${job.company} • ${job.location} (${job.workplaceType})</p>
            </div>
            <div class="salary-tag" style="font-size: 1.25rem;">${job.salary}</div>
          </div>
          <div style="display: flex; gap: 16px; margin-top: 10px; font-size: 0.85rem; color: var(--text-muted);">
            <span>📅 Deadline: ${job.deadline}</span>
            <span>👥 ${job.applicantsCount} Applicants</span>
            <span>⭐ ${job.rating} Company Rating</span>
          </div>
        </div>
      </div>

      <div style="margin-bottom: 24px;">
        <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 8px;">About the Role</h4>
        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">${job.overview}</p>
      </div>

      <div style="margin-bottom: 24px;">
        <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 10px;">Key Responsibilities</h4>
        <ul style="padding-left: 20px; color: var(--text-secondary); font-size: 0.92rem; line-height: 1.7;">
          ${job.responsibilities.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>

      <div style="margin-bottom: 24px;">
        <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 10px;">Requirements & Eligibility</h4>
        <ul style="padding-left: 20px; color: var(--text-secondary); font-size: 0.92rem; line-height: 1.7;">
          ${job.requirements.map(req => `<li>${req}</li>`).join('')}
        </ul>
      </div>

      <div style="margin-bottom: 24px;">
        <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 10px;">Perks & Benefits</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          ${job.perks.map(p => `
            <div style="background: var(--bg-surface-elevated); padding: 12px; border-radius: var(--radius-md); font-size: 0.85rem; color: var(--text-secondary); border: 1px solid var(--border-subtle); display: flex; align-items: center; gap: 8px;">
              <span>🎁</span> <span>${p}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-subtle);">
        <button class="btn btn-secondary" id="modal-save-btn">${isSaved ? '★ Saved' : '☆ Save Job'}</button>
        ${isApplied ? `
          <button class="btn btn-success" disabled>✓ Application Submitted</button>
        ` : `
          <button class="btn btn-primary" id="modal-apply-btn">Apply Now</button>
        `}
      </div>
    `;

    const modalSaveBtn = document.getElementById('modal-save-btn');
    if (modalSaveBtn) {
      modalSaveBtn.addEventListener('click', () => {
        const saved = state.toggleSaveJob(job.id);
        modalSaveBtn.textContent = saved ? '★ Saved' : '☆ Save Job';
        this.app.showToast(saved ? 'Saved job!' : 'Removed from bookmarks', 'info');
      });
    }

    const modalApplyBtn = document.getElementById('modal-apply-btn');
    if (modalApplyBtn) {
      modalApplyBtn.addEventListener('click', () => {
        this.closeModal('job-details-modal');
        this.openApplyModal(job.id);
      });
    }

    modal.classList.add('active');
  }

  openApplyModal(jobId) {
    const job = this.getAllJobs().find(j => j.id === jobId);
    if (!job) return;

    const modal = document.getElementById('easy-apply-modal');
    if (!modal) return;

    document.getElementById('apply-job-id').value = job.id;
    document.getElementById('apply-modal-title').textContent = `Easy Apply to ${job.company}`;
    document.getElementById('apply-modal-subtitle').textContent = `${job.title} • ${job.location}`;

    modal.classList.add('active');
  }

  handleApplySubmit(e) {
    e.preventDefault();
    const jobId = document.getElementById('apply-job-id').value;
    const name = document.getElementById('apply-name').value.trim();
    const email = document.getElementById('apply-email').value.trim();
    const phone = document.getElementById('apply-phone').value.trim();
    const experience = document.getElementById('apply-exp').value;
    const portfolio = document.getElementById('apply-portfolio').value.trim();
    const resumeName = document.getElementById('apply-resume-name').value || 'Resume_Document.pdf';

    const job = this.getAllJobs().find(j => j.id === jobId);
    if (!job) return;

    state.applyJob({
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary,
      candidateName: name,
      email,
      phone,
      experience,
      portfolio,
      resumeName
    });

    this.closeModal('easy-apply-modal');
    this.app.showToast(`Application successfully sent to ${job.company}!`, 'success');
    this.render();
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  }
}
