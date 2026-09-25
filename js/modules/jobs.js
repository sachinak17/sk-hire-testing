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
        const btn = e.target.closest('.pill-btn');
        if (btn) {
          pillContainer.querySelectorAll('.pill-btn').forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-pressed', 'true');
          this.activeFilters.domain = btn.dataset.domain;
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

    // Initialize resume upload from drive / computer
    this.initApplyResumeUpload();

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
            pillContainer.querySelectorAll('.pill-btn').forEach(btn => {
              btn.classList.remove('active');
              btn.setAttribute('aria-pressed', 'false');
            });
            const allBtn = pillContainer.querySelector('[data-domain="all"]');
            if (allBtn) {
              allBtn.classList.add('active');
              allBtn.setAttribute('aria-pressed', 'true');
            }
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
                <h3 class="job-role-title">${job.title}</h3>
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

  initApplyResumeUpload() {
    const dropzone = document.getElementById('apply-resume-dropzone');
    const fileInput = document.getElementById('apply-resume-file-input');
    const changeBtn = document.getElementById('apply-btn-change-file');

    if (dropzone && fileInput) {
      dropzone.addEventListener('click', (e) => {
        if (e.target !== fileInput) {
          fileInput.click();
        }
      });

      ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.add('drag-over');
        });
      });

      ['dragleave', 'dragend'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.remove('drag-over');
        });
      });

      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('drag-over');
        const files = e.dataTransfer?.files;
        if (files && files.length > 0) {
          this.processApplyResumeFile(files[0]);
        }
      });

      fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
          this.processApplyResumeFile(files[0]);
        }
      });
    }

    if (changeBtn && fileInput) {
      changeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        fileInput.click();
      });
    }
  }

  async processApplyResumeFile(file) {
    if (!file) return;

    const progressEl = document.getElementById('apply-resume-progress');
    const statusText = document.getElementById('apply-resume-status-text');
    const fileCard = document.getElementById('apply-file-card');
    const dropzone = document.getElementById('apply-resume-dropzone');
    const nameLabel = document.getElementById('apply-file-card-name');
    const metaLabel = document.getElementById('apply-file-card-meta');
    const formatIcon = document.getElementById('apply-file-format-icon');
    const hiddenName = document.getElementById('apply-resume-name');
    const hiddenSize = document.getElementById('apply-resume-size');
    const hiddenType = document.getElementById('apply-resume-type');

    if (progressEl) progressEl.style.display = 'flex';
    if (statusText) statusText.textContent = `Reading "${file.name}" from your drive...`;

    const sizeStr = this.formatFileSize(file.size);
    const ext = (file.name.split('.').pop() || '').toLowerCase();

    let fileTypeLabel = 'Document';
    if (ext === 'pdf') fileTypeLabel = 'PDF Document';
    else if (ext === 'docx' || ext === 'doc') fileTypeLabel = 'Word Document';
    else if (ext === 'txt') fileTypeLabel = 'Plain Text';

    try {
      let extractedText = '';

      if (ext === 'pdf') {
        if (formatIcon) formatIcon.textContent = '📄 PDF';
        if (statusText) statusText.textContent = 'Parsing PDF layers from drive...';
        const buffer = await file.arrayBuffer();
        extractedText = await this.extractPdfText(buffer);
      } else if (ext === 'docx' || ext === 'doc') {
        if (formatIcon) formatIcon.textContent = '📝 Word';
        if (statusText) statusText.textContent = 'Extracting document text...';
        const buffer = await file.arrayBuffer();
        extractedText = await this.extractDocxText(buffer);
      } else {
        if (formatIcon) formatIcon.textContent = '📃 TXT';
        if (statusText) statusText.textContent = 'Reading text content...';
        const raw = await file.text();
        extractedText = this.sanitizeResumeText(raw);
      }

      this.currentApplyFile = {
        name: file.name,
        size: sizeStr,
        type: fileTypeLabel,
        text: extractedText
      };

      if (hiddenName) hiddenName.value = file.name;
      if (hiddenSize) hiddenSize.value = sizeStr;
      if (hiddenType) hiddenType.value = fileTypeLabel;

      if (nameLabel) nameLabel.textContent = file.name;
      if (metaLabel) metaLabel.textContent = `${sizeStr} • Uploaded from Drive • Attached`;

      if (dropzone) dropzone.style.display = 'none';
      if (fileCard) fileCard.style.display = 'flex';
      if (progressEl) progressEl.style.display = 'none';

      // Automatically sync with candidate profile so Hire Score and ATS stay updated
      state.updateResumeProfile({
        fileName: file.name,
        fileSize: sizeStr,
        fileType: fileTypeLabel,
        extractedText: extractedText || ''
      });

      this.app.showToast(`Real resume "${file.name}" uploaded from drive and attached!`, 'success');
    } catch (err) {
      console.error('Error processing resume file:', err);
      if (progressEl) progressEl.style.display = 'none';
      this.app.showToast(`Error reading file: ${err.message || 'Could not parse document'}`, 'error');
    }
  }

  async extractPdfText(arrayBuffer) {
    if (window.pdfjsLib) {
      try {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'js/libs/pdf.worker.min.js';
        const typedArray = new Uint8Array(arrayBuffer);
        const loadingTask = window.pdfjsLib.getDocument({
          data: typedArray,
          useSystemFonts: true
        });
        const pdf = await loadingTask.promise;
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent({ normalizeWhitespace: true });
          let pageText = textContent.items.map(item => item?.str || '').join(' ');
          fullText += pageText + '\n\n';
        }
        const cleaned = this.sanitizeResumeText(fullText);
        if (cleaned && cleaned.trim().length > 15) return cleaned.trim();
      } catch (err) {
        console.warn('PDF.js parse warning:', err);
      }
    }
    return this.cleanFallbackText(arrayBuffer);
  }

  async extractDocxText(arrayBuffer) {
    if (window.mammoth) {
      try {
        const result = await window.mammoth.extractRawText({ arrayBuffer });
        if (result.value && result.value.trim().length > 15) {
          return this.sanitizeResumeText(result.value.trim());
        }
      } catch (err) {
        console.warn('Mammoth parse warning:', err);
      }
    }
    return this.cleanFallbackText(arrayBuffer);
  }

  sanitizeResumeText(text) {
    if (!text) return '';
    return text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F\uFFFD]/g, '').trim();
  }

  cleanFallbackText(arrayBuffer) {
    const bytes = new Uint8Array(arrayBuffer);
    let extracted = '';
    for (let i = 0; i < bytes.length; i++) {
      const b = bytes[i];
      if ((b >= 32 && b <= 126) || b === 10 || b === 13) {
        extracted += String.fromCharCode(b);
      }
    }
    return this.sanitizeResumeText(extracted);
  }

  formatFileSize(bytes) {
    if (!bytes || bytes === 0) return '0 KB';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  openApplyModal(jobId) {
    const job = this.getAllJobs().find(j => j.id === jobId);
    if (!job) return;

    const modal = document.getElementById('easy-apply-modal');
    if (!modal) return;

    document.getElementById('apply-job-id').value = job.id;
    document.getElementById('apply-modal-title').textContent = `Easy Apply to ${job.company}`;
    document.getElementById('apply-modal-subtitle').textContent = `${job.title} • ${job.location}`;

    // Prefill user details if available
    const nameEl = document.getElementById('apply-name');
    const emailEl = document.getElementById('apply-email');
    if (nameEl && !nameEl.value && state.currentUser?.name) {
      nameEl.value = state.currentUser.name;
    }
    if (emailEl && !emailEl.value && state.currentUser?.email) {
      emailEl.value = state.currentUser.email;
    }

    const dropzone = document.getElementById('apply-resume-dropzone');
    const fileCard = document.getElementById('apply-file-card');
    const nameLabel = document.getElementById('apply-file-card-name');
    const metaLabel = document.getElementById('apply-file-card-meta');
    const formatIcon = document.getElementById('apply-file-format-icon');
    const hiddenName = document.getElementById('apply-resume-name');
    const hiddenSize = document.getElementById('apply-resume-size');
    const hiddenType = document.getElementById('apply-resume-type');

    // Check if user already uploaded a resume in their profile or during current session
    const existingFile = this.currentApplyFile || (state.resumeProfile && state.resumeProfile.fileName ? {
      name: state.resumeProfile.fileName,
      size: state.resumeProfile.fileSize || '142 KB',
      type: state.resumeProfile.fileType || 'PDF Document'
    } : null);

    if (existingFile && existingFile.name) {
      if (hiddenName) hiddenName.value = existingFile.name;
      if (hiddenSize) hiddenSize.value = existingFile.size;
      if (hiddenType) hiddenType.value = existingFile.type;
      if (nameLabel) nameLabel.textContent = existingFile.name;
      if (metaLabel) metaLabel.textContent = `${existingFile.size} • Attached from Profile / Drive`;
      const ext = (existingFile.name.split('.').pop() || '').toLowerCase();
      if (formatIcon) {
        formatIcon.textContent = ext === 'pdf' ? '📄 PDF' : (ext.includes('doc') ? '📝 Word' : '📃 DOC');
      }
      if (dropzone) dropzone.style.display = 'none';
      if (fileCard) fileCard.style.display = 'flex';
    } else {
      if (dropzone) dropzone.style.display = 'block';
      if (fileCard) fileCard.style.display = 'none';
      if (hiddenName) hiddenName.value = '';
    }

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
    const resumeName = document.getElementById('apply-resume-name')?.value?.trim();
    const resumeSize = document.getElementById('apply-resume-size')?.value?.trim() || '142 KB';
    const resumeType = document.getElementById('apply-resume-type')?.value?.trim() || 'PDF Document';

    if (!resumeName) {
      this.app.showToast('Please upload your resume from drive to complete your application!', 'warning');
      const dropzone = document.getElementById('apply-resume-dropzone');
      if (dropzone) {
        dropzone.style.borderColor = 'var(--accent-rose)';
        dropzone.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

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
      resumeName,
      resumeSize,
      resumeType
    });

    this.closeModal('easy-apply-modal');
    this.app.showToast(`Application successfully sent to ${job.company} with resume "${resumeName}"!`, 'success');
    this.render();
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  }
}
