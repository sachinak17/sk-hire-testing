/**
 * HireCraft - Companies Hiring Process Module
 * Detailed company roadmaps, exam patterns, syllabus, eligibility criteria, and CTC breakdown.
 */

import { COMPANIES_DATA } from '../data/companiesData.js';

export class CompaniesModule {
  constructor(app) {
    this.app = app;
    this.activeFilter = 'all';
    this.selectedCompany = null;
    this.activeModalTab = 'pattern'; // 'pattern' | 'syllabus' | 'eligibility' | 'rounds' | 'ctc'
  }

  init() {
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    // Category pill filters
    const filterContainer = document.getElementById('company-category-pills');
    if (filterContainer) {
      filterContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('pill-btn')) {
          filterContainer.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('active'));
          e.target.classList.add('active');
          this.activeFilter = e.target.dataset.cat;
          this.render();
        }
      });
    }

    // Modal Close
    const closeBtn = document.querySelector('[data-close-modal="company-details-modal"]');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        document.getElementById('company-details-modal')?.classList.remove('active');
      });
    }
  }

  getFilteredCompanies() {
    if (this.activeFilter === 'all') return COMPANIES_DATA;
    return COMPANIES_DATA.filter(c => c.category === this.activeFilter);
  }

  render() {
    const container = document.getElementById('companies-grid-container');
    if (!container) return;

    const companies = this.getFilteredCompanies();

    container.innerHTML = companies.map(comp => `
      <div class="company-card" data-company-id="${comp.id}">
        <div class="company-header-top">
          <div class="company-badge-logo">${comp.logo}</div>
          <div class="company-title-info">
            <h3>${comp.name}</h3>
            <span class="company-tier-chip">${comp.tier}</span>
          </div>
        </div>

        <p class="company-tagline">${comp.tagline}</p>

        <div class="company-ctc-box">
          <div class="company-ctc-label">Fresher Compensation Range</div>
          <div class="company-ctc-val">${comp.ctcRange.fresher}</div>
        </div>

        <div class="company-highlights-row">
          <span>📝 ${comp.rounds.length} Hiring Rounds</span>
          <span>⏱️ ${comp.examPattern.duration} Online Test</span>
        </div>

        <button class="btn btn-outline-primary" style="margin-top: 16px; width: 100%; justify-content: center; font-size: 0.88rem;">
          View Hiring Process Guide →
        </button>
      </div>
    `).join('');

    // Attach card click handlers
    container.querySelectorAll('.company-card').forEach(card => {
      card.addEventListener('click', () => {
        const compId = card.dataset.companyId;
        this.openCompanyModal(compId);
      });
    });
  }

  openCompanyModal(compId) {
    const company = COMPANIES_DATA.find(c => c.id === compId);
    if (!company) return;

    this.selectedCompany = company;
    this.activeModalTab = 'pattern';

    const modal = document.getElementById('company-details-modal');
    if (!modal) return;

    document.getElementById('company-modal-title').innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 1.8rem;">${company.logo}</span>
        <div>
          <span style="font-size: 1.3rem; font-weight: 800; color: var(--text-primary);">${company.name} Recruitment Blueprint</span>
          <div style="font-size: 0.82rem; color: var(--secondary); font-weight: 600;">${company.tier}</div>
        </div>
      </div>
    `;

    this.renderModalBody();
    modal.classList.add('active');
  }

  renderModalBody() {
    const container = document.getElementById('company-modal-body');
    if (!container || !this.selectedCompany) return;

    const comp = this.selectedCompany;

    container.innerHTML = `
      <!-- Modal Navigation Tabs -->
      <div class="company-modal-tabs">
        <button class="company-tab-btn ${this.activeModalTab === 'pattern' ? 'active' : ''}" data-modal-tab="pattern">📋 Exam Pattern</button>
        <button class="company-tab-btn ${this.activeModalTab === 'syllabus' ? 'active' : ''}" data-modal-tab="syllabus">📚 Syllabus & Topics</button>
        <button class="company-tab-btn ${this.activeModalTab === 'eligibility' ? 'active' : ''}" data-modal-tab="eligibility">🎓 Eligibility Criteria</button>
        <button class="company-tab-btn ${this.activeModalTab === 'rounds' ? 'active' : ''}" data-modal-tab="rounds">🛣️ Selection Rounds</button>
        <button class="company-tab-btn ${this.activeModalTab === 'ctc' ? 'active' : ''}" data-modal-tab="ctc">💰 Package & CTC</button>
      </div>

      <!-- Tab Content Area -->
      <div id="company-tab-content-area" style="padding-top: 10px;">
        ${this.getTabHtml(comp, this.activeModalTab)}
      </div>
    `;

    // Tab buttons
    container.querySelectorAll('.company-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeModalTab = btn.dataset.modalTab;
        this.renderModalBody();
      });
    });
  }

  getTabHtml(comp, tabKey) {
    switch (tabKey) {
      case 'pattern':
        return `
          <div style="margin-bottom: 16px;">
            <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 16px;">
              <div style="background: var(--bg-surface-elevated); padding: 12px 18px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Assessment Platform</div>
                <div style="font-weight: 700; color: var(--text-primary); font-size: 0.95rem;">${comp.examPattern.platform}</div>
              </div>
              <div style="background: var(--bg-surface-elevated); padding: 12px 18px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Total Duration</div>
                <div style="font-weight: 700; color: var(--text-primary); font-size: 0.95rem;">${comp.examPattern.duration}</div>
              </div>
              <div style="background: var(--bg-surface-elevated); padding: 12px 18px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Negative Marking</div>
                <div style="font-weight: 700; color: ${comp.examPattern.negativeMarking === 'No' ? 'var(--accent-emerald)' : 'var(--accent-rose)'}; font-size: 0.95rem;">${comp.examPattern.negativeMarking}</div>
              </div>
            </div>

            <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 10px;">Section-by-Section Structure</h4>
            <table class="pattern-table">
              <thead>
                <tr>
                  <th>Section Name</th>
                  <th>Section Type</th>
                  <th>Questions</th>
                  <th>Time Allotted</th>
                  <th>Key Focus Areas</th>
                </tr>
              </thead>
              <tbody>
                ${comp.examPattern.sections.map(sec => `
                  <tr>
                    <td style="font-weight: 600; color: var(--text-primary);">${sec.name}</td>
                    <td><span class="skill-tag">${sec.type}</span></td>
                    <td>${sec.questions}</td>
                    <td>${sec.time}</td>
                    <td style="color: var(--text-secondary); font-size: 0.85rem;">${sec.focus}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div style="margin-top: 20px; background: rgba(99, 102, 241, 0.08); border-left: 4px solid var(--primary); padding: 16px; border-radius: var(--radius-md);">
              <h5 style="color: var(--primary); font-size: 0.9rem; font-weight: 700; margin-bottom: 6px;">💡 Pro Exam Strategy:</h5>
              <ul style="padding-left: 18px; font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
                ${comp.tips.map(tip => `<li>${tip}</li>`).join('')}
              </ul>
            </div>
          </div>
        `;

      case 'syllabus':
        return `
          <div>
            <div style="margin-bottom: 24px;">
              <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 12px; color: var(--secondary);">⚡ Data Structures & Algorithmic Focus</h4>
              <div style="display: grid; grid-template-columns: 1fr; gap: 8px;">
                ${comp.syllabus.dsaTopics.map(t => `
                  <div style="background: var(--bg-surface-elevated); padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); display: flex; align-items: center; gap: 10px; font-size: 0.9rem;">
                    <span style="color: var(--accent-emerald);">✔</span> <span>${t}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <div>
              <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 12px; color: var(--primary);">💻 Core CS Subjects & Design Topics</h4>
              <div style="display: grid; grid-template-columns: 1fr; gap: 8px;">
                ${comp.syllabus.coreSubjects.map(cs => `
                  <div style="background: var(--bg-surface-elevated); padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); display: flex; align-items: center; gap: 10px; font-size: 0.9rem;">
                    <span style="color: var(--primary);">✔</span> <span>${cs}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `;

      case 'eligibility':
        return `
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div style="background: var(--bg-surface-elevated); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <div style="font-size: 0.78rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 4px;">Eligible Degrees & Branches</div>
              <div style="font-size: 0.92rem; font-weight: 600; color: var(--text-primary);">${comp.eligibility.degrees}</div>
            </div>

            <div style="background: var(--bg-surface-elevated); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <div style="font-size: 0.78rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 4px;">Minimum CGPA / Percentage</div>
              <div style="font-size: 0.92rem; font-weight: 700; color: var(--accent-emerald);">${comp.eligibility.cgpaCutoff}</div>
            </div>

            <div style="background: var(--bg-surface-elevated); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <div style="font-size: 0.78rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 4px;">Active Backlogs Policy</div>
              <div style="font-size: 0.92rem; font-weight: 600; color: var(--text-primary);">${comp.eligibility.backlogs}</div>
            </div>

            <div style="background: var(--bg-surface-elevated); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <div style="font-size: 0.78rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 4px;">Education Gap Allowed</div>
              <div style="font-size: 0.92rem; font-weight: 600; color: var(--text-primary);">${comp.eligibility.gapYears}</div>
            </div>

            <div style="grid-column: 1 / -1; background: var(--bg-surface-elevated); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <div style="font-size: 0.78rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 4px;">Batch Eligibility</div>
              <div style="font-size: 0.92rem; font-weight: 600; color: var(--text-primary);">${comp.eligibility.batch}</div>
            </div>
          </div>
        `;

      case 'rounds':
        return `
          <div class="round-timeline">
            ${comp.rounds.map(r => `
              <div class="round-item">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary);">
                    Round ${r.roundNumber}: ${r.title}
                  </h4>
                  <span class="skill-tag" style="font-weight: 600;">⏱️ ${r.duration}</span>
                </div>
                <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">${r.description}</p>
              </div>
            `).join('')}
          </div>
        `;

      case 'ctc':
        return `
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div style="background: var(--bg-surface-elevated); padding: 20px; border-radius: var(--radius-md); border-left: 4px solid var(--secondary);">
              <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 4px;">Internship Stipend</div>
              <div style="font-size: 1.3rem; font-weight: 800; color: var(--secondary);">${comp.ctcRange.internship}</div>
            </div>

            <div style="background: var(--bg-surface-elevated); padding: 20px; border-radius: var(--radius-md); border-left: 4px solid var(--accent-emerald);">
              <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 4px;">Fresher / Graduate Package</div>
              <div style="font-size: 1.3rem; font-weight: 800; color: var(--accent-emerald);">${comp.ctcRange.fresher}</div>
            </div>

            <div style="background: var(--bg-surface-elevated); padding: 20px; border-radius: var(--radius-md); border-left: 4px solid var(--accent-purple);">
              <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 4px;">Experienced Engineers (1-3+ yrs)</div>
              <div style="font-size: 1.3rem; font-weight: 800; color: var(--accent-purple);">${comp.ctcRange.experienced}</div>
            </div>
          </div>
        `;

      default:
        return '';
    }
  }
}
