/**
 * HireCraft - Dedicated Topic-Wise DSA Sheet Module
 * Comprehensive problem list, progress tracking, solution code viewer, and personal notes.
 */

import { DSA_TOPICS, DSA_PROBLEMS } from '../data/dsaSheetData.js';
import { state } from '../state.js';

export class DsaSheetModule {
  constructor(app) {
    this.app = app;
    this.activeDifficulty = 'all'; // 'all' | 'Easy' | 'Medium' | 'Hard'
    this.activeStatus = 'all';     // 'all' | 'solved' | 'pending' | 'starred'
    this.searchQuery = '';
    this.openTopicIds = new Set(['arrays_hashing', 'two_pointers_sliding']);
    this.currentSolutionProblem = null;
    this.activeCodeLang = 'cpp';
  }

  init() {
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    // Search input
    const searchInput = document.getElementById('dsa-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.render();
      });
    }

    // Difficulty filter
    const diffFilter = document.getElementById('dsa-diff-filter');
    if (diffFilter) {
      diffFilter.addEventListener('change', (e) => {
        this.activeDifficulty = e.target.value;
        this.render();
      });
    }

    // Status filter
    const statusFilter = document.getElementById('dsa-status-filter');
    if (statusFilter) {
      statusFilter.addEventListener('change', (e) => {
        this.activeStatus = e.target.value;
        this.render();
      });
    }

    // Modal Close
    const closeSolutionBtn = document.querySelector('[data-close-modal="dsa-solution-modal"]');
    if (closeSolutionBtn) {
      closeSolutionBtn.addEventListener('click', () => {
        document.getElementById('dsa-solution-modal')?.classList.remove('active');
      });
    }

    const closeNotesBtn = document.querySelector('[data-close-modal="dsa-notes-modal"]');
    if (closeNotesBtn) {
      closeNotesBtn.addEventListener('click', () => {
        document.getElementById('dsa-notes-modal')?.classList.remove('active');
      });
    }

    // Copy Code Button
    const copyCodeBtn = document.getElementById('btn-copy-dsa-code');
    if (copyCodeBtn) {
      copyCodeBtn.addEventListener('click', () => {
        if (!this.currentSolutionProblem) return;
        const code = this.currentSolutionProblem.code[this.activeCodeLang];
        navigator.clipboard.writeText(code);
        this.app.showToast('Code copied to clipboard!', 'success');
      });
    }

    // Save Notes Button
    const saveNoteBtn = document.getElementById('btn-save-dsa-note');
    if (saveNoteBtn) {
      saveNoteBtn.addEventListener('click', () => {
        const problemId = document.getElementById('dsa-note-problem-id').value;
        const noteText = document.getElementById('dsa-note-textarea').value;
        state.saveDsaNote(problemId, noteText);
        document.getElementById('dsa-notes-modal')?.classList.remove('active');
        this.app.showToast('Personal notes saved!', 'success');
      });
    }

    // Subscribe to state updates
    state.subscribe((event) => {
      if (event === 'dsa_solved_change' || event === 'dsa_starred_change' || event === 'state_reset') {
        this.render();
      }
    });
  }

  getFilteredProblems() {
    return DSA_PROBLEMS.filter(p => {
      const isSolved = state.isDsaSolved(p.id);
      const isStarred = state.isDsaStarred(p.id);

      const matchesSearch = !this.searchQuery ||
        p.title.toLowerCase().includes(this.searchQuery) ||
        p.companies.some(c => c.toLowerCase().includes(this.searchQuery));

      const matchesDiff = this.activeDifficulty === 'all' || p.difficulty === this.activeDifficulty;

      const matchesStatus = this.activeStatus === 'all' ||
        (this.activeStatus === 'solved' && isSolved) ||
        (this.activeStatus === 'pending' && !isSolved) ||
        (this.activeStatus === 'starred' && isStarred);

      return matchesSearch && matchesDiff && matchesStatus;
    });
  }

  render() {
    this.renderHeaderStats();
    this.renderTopics();
  }

  renderHeaderStats() {
    const totalProblems = DSA_PROBLEMS.length;
    const solvedCount = DSA_PROBLEMS.filter(p => state.isDsaSolved(p.id)).length;
    const percentage = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;

    const easySolved = DSA_PROBLEMS.filter(p => p.difficulty === 'Easy' && state.isDsaSolved(p.id)).length;
    const easyTotal = DSA_PROBLEMS.filter(p => p.difficulty === 'Easy').length;

    const medSolved = DSA_PROBLEMS.filter(p => p.difficulty === 'Medium' && state.isDsaSolved(p.id)).length;
    const medTotal = DSA_PROBLEMS.filter(p => p.difficulty === 'Medium').length;

    const hardSolved = DSA_PROBLEMS.filter(p => p.difficulty === 'Hard' && state.isDsaSolved(p.id)).length;
    const hardTotal = DSA_PROBLEMS.filter(p => p.difficulty === 'Hard').length;

    const statsContainer = document.getElementById('dsa-header-stats-container');
    if (!statsContainer) return;

    statsContainer.innerHTML = `
      <div class="dsa-overall-stats">
        <div class="progress-circle-wrap">
          <svg viewBox="0 0 36 36" class="circular-chart">
            <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path class="circle" stroke-dasharray="${percentage}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
          <div class="circle-percentage">${percentage}%</div>
        </div>

        <div class="dsa-stats-numbers">
          <h4>${solvedCount} / ${totalProblems} Solved</h4>
          <p>Master these core patterns to conquer top company interviews.</p>
        </div>
      </div>

      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <div style="background: var(--bg-surface-elevated); padding: 10px 18px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); text-align: center;">
          <div style="font-size: 0.75rem; color: var(--accent-emerald); font-weight: 700; text-transform: uppercase;">Easy</div>
          <div style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary);">${easySolved} / ${easyTotal}</div>
        </div>

        <div style="background: var(--bg-surface-elevated); padding: 10px 18px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); text-align: center;">
          <div style="font-size: 0.75rem; color: var(--accent-amber); font-weight: 700; text-transform: uppercase;">Medium</div>
          <div style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary);">${medSolved} / ${medTotal}</div>
        </div>

        <div style="background: var(--bg-surface-elevated); padding: 10px 18px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); text-align: center;">
          <div style="font-size: 0.75rem; color: var(--accent-rose); font-weight: 700; text-transform: uppercase;">Hard</div>
          <div style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary);">${hardSolved} / ${hardTotal}</div>
        </div>
      </div>
    `;
  }

  renderTopics() {
    const container = document.getElementById('dsa-topics-container');
    if (!container) return;

    const filteredProblems = this.getFilteredProblems();

    // Group problems by topic
    const topicCardsHtml = DSA_TOPICS.map(topic => {
      const topicProblems = filteredProblems.filter(p => p.topicId === topic.id);
      const allTopicProblems = DSA_PROBLEMS.filter(p => p.topicId === topic.id);
      if (allTopicProblems.length === 0) return '';

      const solvedInTopic = allTopicProblems.filter(p => state.isDsaSolved(p.id)).length;
      const isComplete = solvedInTopic === allTopicProblems.length && allTopicProblems.length > 0;
      const isOpen = this.openTopicIds.has(topic.id) || this.searchQuery.length > 0;

      return `
        <div class="dsa-topic-card ${isOpen ? 'open' : ''}" data-topic-id="${topic.id}">
          <div class="dsa-topic-header" data-toggle-topic="${topic.id}">
            <div class="topic-title-group">
              <span class="topic-icon">${topic.icon}</span>
              <div>
                <span class="topic-name">${topic.name}</span>
                <div style="font-size: 0.8rem; color: var(--text-muted);">${topic.description}</div>
              </div>
            </div>

            <div class="topic-header-right">
              <span class="topic-progress-pill ${isComplete ? 'completed' : ''}">
                ${solvedInTopic} / ${allTopicProblems.length} ${isComplete ? '✓ Complete' : ''}
              </span>
              <span class="accordion-arrow">▼</span>
            </div>
          </div>

          <table class="dsa-problems-table">
            <thead>
              <tr>
                <th style="width: 44px; text-align: center;">Status</th>
                <th style="width: 44px; text-align: center;">★</th>
                <th>Problem Title</th>
                <th style="width: 100px;">Difficulty</th>
                <th>Target Companies</th>
                <th style="width: 180px; text-align: right;">Resources</th>
              </tr>
            </thead>
            <tbody>
              ${topicProblems.length === 0 ? `
                <tr>
                  <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 20px;">
                    No problems matching current filters in this topic.
                  </td>
                </tr>
              ` : topicProblems.map(p => {
                const isSolved = state.isDsaSolved(p.id);
                const isStarred = state.isDsaStarred(p.id);
                const hasNote = Boolean(state.getDsaNote(p.id));

                return `
                  <tr data-problem-row="${p.id}">
                    <td style="text-align: center;">
                      <input type="checkbox" class="custom-checkbox" ${isSolved ? 'checked' : ''} data-toggle-solved="${p.id}" />
                    </td>
                    <td style="text-align: center;">
                      <button class="star-btn ${isStarred ? 'starred' : ''}" data-toggle-starred="${p.id}" title="${isStarred ? 'Starred for revision' : 'Star problem'}">
                        ${isStarred ? '★' : '☆'}
                      </button>
                    </td>
                    <td>
                      <a href="${p.leetcodeUrl}" target="_blank" rel="noopener noreferrer" style="font-weight: 600; color: var(--text-primary); text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                        <span>${p.title}</span>
                        <span style="font-size: 0.75rem; color: var(--text-muted);">↗</span>
                      </a>
                    </td>
                    <td>
                      <span class="diff-badge ${p.difficulty}">${p.difficulty}</span>
                    </td>
                    <td>
                      ${p.companies.slice(0, 3).map(c => `<span class="company-mini-tag">${c}</span>`).join('')}
                      ${p.companies.length > 3 ? `<span class="company-mini-tag">+${p.companies.length - 3}</span>` : ''}
                    </td>
                    <td style="text-align: right;">
                      <div style="display: inline-flex; gap: 8px;">
                        <button class="btn btn-secondary" style="padding: 5px 10px; font-size: 0.78rem;" data-view-solution="${p.id}">
                          💡 Solution
                        </button>
                        <button class="btn btn-secondary" style="padding: 5px 10px; font-size: 0.78rem; ${hasNote ? 'border-color: var(--primary); color: var(--primary);' : ''}" data-open-notes="${p.id}">
                          ${hasNote ? '📝 Note' : '+ Note'}
                        </button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      `;
    }).join('');

    container.innerHTML = topicCardsHtml;

    // Accordion toggle
    container.querySelectorAll('[data-toggle-topic]').forEach(header => {
      header.addEventListener('click', () => {
        const topicId = header.dataset.toggleTopic;
        const card = header.closest('.dsa-topic-card');
        if (this.openTopicIds.has(topicId)) {
          this.openTopicIds.delete(topicId);
          card.classList.remove('open');
        } else {
          this.openTopicIds.add(topicId);
          card.classList.add('open');
        }
      });
    });

    // Solved checkbox
    container.querySelectorAll('[data-toggle-solved]').forEach(cb => {
      cb.addEventListener('change', () => {
        const pid = cb.dataset.toggleSolved;
        const solved = state.toggleDsaSolved(pid);
        this.app.showToast(solved ? 'Problem marked as Solved! 🎉' : 'Marked as Pending', 'info');
        this.render();
      });
    });

    // Star button
    container.querySelectorAll('[data-toggle-starred]').forEach(btn => {
      btn.addEventListener('click', () => {
        const pid = btn.dataset.toggleStarred;
        const starred = state.toggleDsaStarred(pid);
        this.app.showToast(starred ? 'Saved to revision list' : 'Removed from revision', 'info');
        this.render();
      });
    });

    // View solution
    container.querySelectorAll('[data-view-solution]').forEach(btn => {
      btn.addEventListener('click', () => {
        const pid = btn.dataset.viewSolution;
        this.openSolutionModal(pid);
      });
    });

    // Open notes
    container.querySelectorAll('[data-open-notes]').forEach(btn => {
      btn.addEventListener('click', () => {
        const pid = btn.dataset.openNotes;
        this.openNotesModal(pid);
      });
    });
  }

  openSolutionModal(problemId) {
    const p = DSA_PROBLEMS.find(prob => prob.id === problemId);
    if (!p) return;

    this.currentSolutionProblem = p;
    const modal = document.getElementById('dsa-solution-modal');
    if (!modal) return;

    document.getElementById('dsa-solution-title').textContent = `${p.title} - Solution & Complexity`;
    document.getElementById('dsa-solution-diff').innerHTML = `<span class="diff-badge ${p.difficulty}">${p.difficulty}</span>`;

    document.getElementById('dsa-solution-intuition').textContent = p.intuition;
    document.getElementById('dsa-time-complexity').textContent = p.timeComplexity;
    document.getElementById('dsa-space-complexity').textContent = p.spaceComplexity;

    this.renderCodeSnippet();
    modal.classList.add('active');

    // Language switch buttons
    const langTabContainer = document.getElementById('solution-lang-tabs');
    if (langTabContainer) {
      langTabContainer.querySelectorAll('.lang-tab-btn').forEach(btn => {
        btn.onclick = () => {
          langTabContainer.querySelectorAll('.lang-tab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.activeCodeLang = btn.dataset.lang;
          this.renderCodeSnippet();
        };
      });
    }
  }

  renderCodeSnippet() {
    const pre = document.getElementById('dsa-code-display');
    if (!pre || !this.currentSolutionProblem) return;
    const code = this.currentSolutionProblem.code[this.activeCodeLang] || '// Solution not available in this language';
    pre.textContent = code;
  }

  openNotesModal(problemId) {
    const p = DSA_PROBLEMS.find(prob => prob.id === problemId);
    if (!p) return;

    const modal = document.getElementById('dsa-notes-modal');
    if (!modal) return;

    document.getElementById('dsa-note-problem-id').value = problemId;
    document.getElementById('dsa-notes-title').textContent = `Personal Notes: ${p.title}`;
    document.getElementById('dsa-note-textarea').value = state.getDsaNote(problemId);

    modal.classList.add('active');
  }
}
