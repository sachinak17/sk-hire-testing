/**
 * HireCraft - Dedicated Topic-Wise DSA Sheet Module
 * Comprehensive problem list, progress tracking, solution code viewer, and personal notes.
 */

import { DSA_TOPICS, DSA_PROBLEMS } from '../data/dsaSheetData.js';
import { DSA_TEST_SUITES, testProblemCode } from './dsaRunner.js';
import { state } from '../state.js';

export class DsaSheetModule {
  constructor(app) {
    this.app = app;
    this.activeDifficulty = 'all'; // 'all' | 'Easy' | 'Medium' | 'Hard'
    this.activeStatus = 'all';     // 'all' | 'solved' | 'pending' | 'starred'
    this.searchQuery = '';
    this.openTopicIds = new Set(['arrays_hashing', 'two_pointers_sliding']);
    this.currentSolutionProblem = null;
    this.currentSolveProblem = null;
    this.activeCodeLang = 'cpp';
    this.activeSolverLang = 'javascript';
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

    // Modal Close - Solution Modal
    const closeSolutionBtn = document.querySelector('[data-close-modal="dsa-solution-modal"]');
    if (closeSolutionBtn) {
      closeSolutionBtn.addEventListener('click', () => {
        document.getElementById('dsa-solution-modal')?.classList.remove('active');
      });
    }

    // Modal Close - Solve Modal
    const closeSolveBtn = document.querySelector('[data-close-modal="dsa-solve-modal"]');
    if (closeSolveBtn) {
      closeSolveBtn.addEventListener('click', () => {
        document.getElementById('dsa-solve-modal')?.classList.remove('active');
      });
    }

    // Modal Close - Notes Modal
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

    // Solver: Run Test Cases Button
    const runTestsBtn = document.getElementById('btn-run-dsa-tests');
    if (runTestsBtn) {
      runTestsBtn.addEventListener('click', () => {
        this.runTestCases();
      });
    }

    // Solver: Submit Solution Button
    const submitBtn = document.getElementById('btn-submit-dsa-solution');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        this.submitSolution();
      });
    }

    // Solver: Reset Code Button
    const resetCodeBtn = document.getElementById('btn-reset-solver-code');
    if (resetCodeBtn) {
      resetCodeBtn.addEventListener('click', () => {
        this.resetSolverCode();
      });
    }

    // Solver: Code Editor Autosave
    const editor = document.getElementById('dsa-solver-code-editor');
    if (editor) {
      editor.addEventListener('input', (e) => {
        if (this.currentSolveProblem) {
          localStorage.setItem(`hirecraft_dsa_draft_${this.currentSolveProblem.id}_${this.activeSolverLang}`, e.target.value);
        }
      });
    }

    // Solver: Language Switcher Tabs
    const solverLangTabs = document.getElementById('solver-lang-tabs');
    if (solverLangTabs) {
      solverLangTabs.querySelectorAll('.lang-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          solverLangTabs.querySelectorAll('.lang-tab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.activeSolverLang = btn.dataset.solverLang;
          this.renderSolverCode();
        });
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
          <p>Click "⚡ Solve" on any problem to write code and verify your solution.</p>
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
                <th style="width: 85px; text-align: center;">Status</th>
                <th style="width: 44px; text-align: center;">★</th>
                <th>Problem Title</th>
                <th style="width: 100px;">Difficulty</th>
                <th>Target Companies</th>
                <th style="width: 250px; text-align: right;">Action & Resources</th>
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
                      <span class="dsa-status-badge ${isSolved ? 'solved' : 'pending'}" data-open-solve="${p.id}" title="${isSolved ? 'Problem Solved! Click to review code' : 'Pending. Click Solve to write code & complete!'}">
                        ${isSolved ? '✅ Solved' : '⏳ Pending'}
                      </span>
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
                      <div style="display: inline-flex; gap: 8px; align-items: center;">
                        <button class="btn-solve-problem ${isSolved ? 'is-solved' : ''}" data-open-solve="${p.id}" title="${isSolved ? 'Review your solution code' : 'Solve problem in code editor'}">
                          ${isSolved ? '✓ Solved' : '⚡ Solve'}
                        </button>
                        ${isSolved ? `
                          <button class="btn btn-secondary" style="padding: 5px 10px; font-size: 0.78rem;" data-view-solution="${p.id}" title="View official solution & multi-language code">
                            💡 Solution
                          </button>
                        ` : `
                          <button class="btn btn-secondary btn-solution-locked" style="padding: 5px 10px; font-size: 0.78rem; opacity: 0.65;" data-view-solution="${p.id}" title="Solve and submit this problem first to unlock official solution">
                            🔒 Solution
                          </button>
                        `}
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

    // Open Solve Modal buttons
    container.querySelectorAll('[data-open-solve]').forEach(el => {
      el.addEventListener('click', () => {
        const pid = el.dataset.openSolve;
        this.openSolveModal(pid);
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

    // View solution (Locked until problem is solved)
    container.querySelectorAll('[data-view-solution]').forEach(btn => {
      btn.addEventListener('click', () => {
        const pid = btn.dataset.viewSolution;
        const isSolved = state.isDsaSolved(pid);
        if (!isSolved) {
          this.app.showToast('🔒 Solution Locked: Solve and submit this problem first to unlock the official solution!', 'warning');
          this.openSolveModal(pid);
          return;
        }
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

  openSolveModal(problemId) {
    const p = DSA_PROBLEMS.find(prob => prob.id === problemId);
    if (!p) return;

    this.currentSolveProblem = p;
    const modal = document.getElementById('dsa-solve-modal');
    if (!modal) return;

    const suite = DSA_TEST_SUITES[p.id];
    const isSolved = state.isDsaSolved(p.id);

    // Title & Metadata
    document.getElementById('dsa-solve-title').innerHTML = `<span>⚡ ${p.title}</span>`;
    document.getElementById('dsa-solve-diff').innerHTML = `<span class="diff-badge ${p.difficulty}">${p.difficulty}</span>`;
    document.getElementById('dsa-solve-companies').innerHTML = p.companies.map(c => `<span class="company-mini-tag">${c}</span>`).join('');
    
    const extLink = document.getElementById('dsa-solve-external-link');
    if (extLink) extLink.href = p.leetcodeUrl;

    // Clean Problem Statement (No solution spoiler)
    const descEl = document.getElementById('dsa-solve-description');
    if (descEl) {
      descEl.innerHTML = suite ? suite.description : `Given the problem requirements for <strong>${p.title}</strong>, write an optimal algorithm that passes all test cases.`;
    }

    // Function signature hint
    const sigEl = document.getElementById('dsa-solve-signature');
    if (sigEl) {
      sigEl.textContent = suite ? suite.signatureHint : `function solve(...) {\n    // Write your code\n}`;
    }

    // Complexity bounds
    const timeEl = document.getElementById('dsa-solve-time');
    if (timeEl) timeEl.textContent = p.timeComplexity;

    const spaceEl = document.getElementById('dsa-solve-space');
    if (spaceEl) spaceEl.textContent = p.spaceComplexity;

    // Sample test cases
    const testcasesEl = document.getElementById('dsa-solve-testcases');
    if (testcasesEl && suite) {
      testcasesEl.innerHTML = suite.testCases.map((tc, idx) => `
        <div style="margin-bottom: ${idx < suite.testCases.length - 1 ? '10px' : '0'}; padding-bottom: ${idx < suite.testCases.length - 1 ? '8px' : '0'}; border-bottom: ${idx < suite.testCases.length - 1 ? '1px dashed var(--border-subtle)' : 'none'};">
          <span style="color: var(--primary); font-weight: 700;">Example ${idx + 1}:</span><br/>
          <span style="color: var(--text-secondary);">Input: <code>${tc.displayInput}</code></span><br/>
          <span style="color: var(--accent-emerald);">Expected Output: <code>${tc.expectedDisplay}</code></span>
        </div>
      `).join('');
    }

    // Reset console output
    const consoleBody = document.getElementById('dsa-console-output');
    if (consoleBody) {
      consoleBody.textContent = `💻 Workspace ready (${this.activeSolverLang.toUpperCase()}). Write your code from scratch on the blank page, click "Run Test Cases" to test, then click "Submit Solution" to verify and mark as solved.`;
    }

    const consolePill = document.getElementById('dsa-console-status-pill');
    if (consolePill) {
      consolePill.className = 'dsa-console-pill idle';
      consolePill.textContent = 'Ready';
    }

    // Status indicator in footer
    const statusInd = document.getElementById('dsa-solve-status-indicator');
    if (statusInd) {
      if (isSolved) {
        statusInd.innerHTML = `
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="color: var(--accent-emerald);">✅ Already Solved!</span>
            <button type="button" id="btn-unsolve-problem" class="btn btn-secondary" style="padding: 4px 10px; font-size: 0.74rem;">
              Mark as Unsolved / Reset
            </button>
          </div>
        `;
        document.getElementById('btn-unsolve-problem')?.addEventListener('click', () => {
          state.toggleDsaSolved(p.id);
          this.app.showToast(`"${p.title}" marked as pending`, 'info');
          this.openSolveModal(p.id);
          this.render();
        });
      } else {
        statusInd.innerHTML = `<span style="color: var(--text-muted);">⏳ Status: Pending (Unsolved)</span>`;
      }
    }

    // Ensure active language tab is set
    const solverLangTabs = document.getElementById('solver-lang-tabs');
    if (solverLangTabs) {
      solverLangTabs.querySelectorAll('.lang-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.solverLang === this.activeSolverLang);
      });
    }

    this.renderSolverCode();
    modal.classList.add('active');
  }

  renderSolverCode() {
    const editor = document.getElementById('dsa-solver-code-editor');
    if (!editor || !this.currentSolveProblem) return;

    const p = this.currentSolveProblem;
    const lang = this.activeSolverLang;
    const suite = DSA_TEST_SUITES[p.id];
    const draftKey = `hirecraft_dsa_draft_${p.id}_${lang}`;
    const savedDraft = localStorage.getItem(draftKey);

    // Provide a completely blank page unless student previously authored a draft
    if (savedDraft !== null && savedDraft.trim().length > 0) {
      editor.value = savedDraft;
    } else {
      editor.value = ''; // Clean blank page as requested
    }

    editor.placeholder = `// Blank Code Workspace: Write your ${lang.toUpperCase()} solution for "${p.title}" here from scratch...\n// Signature: ${suite ? suite.fnName : 'solve'}(...)\n// Click "Run Test Cases" to verify correctness before submitting.`;
  }

  resetSolverCode() {
    if (!this.currentSolveProblem) return;
    const p = this.currentSolveProblem;
    const lang = this.activeSolverLang;
    const draftKey = `hirecraft_dsa_draft_${p.id}_${lang}`;
    localStorage.removeItem(draftKey);
    
    const editor = document.getElementById('dsa-solver-code-editor');
    if (editor) editor.value = '';
    
    const consolePill = document.getElementById('dsa-console-status-pill');
    if (consolePill) {
      consolePill.className = 'dsa-console-pill idle';
      consolePill.textContent = 'Ready';
    }
    const consoleBody = document.getElementById('dsa-console-output');
    if (consoleBody) {
      consoleBody.textContent = `🗑️ Workspace cleared to a blank page. Write your solution from scratch and run test cases.`;
    }

    this.app.showToast('Workspace cleared to blank page!', 'info');
  }

  runTestCases() {
    if (!this.currentSolveProblem) return;
    const p = this.currentSolveProblem;
    const lang = this.activeSolverLang;
    const editor = document.getElementById('dsa-solver-code-editor');
    const code = editor ? editor.value.trim() : '';

    const consolePill = document.getElementById('dsa-console-status-pill');
    const consoleBody = document.getElementById('dsa-console-output');

    if (!code || code.length < 5) {
      if (consolePill) {
        consolePill.className = 'dsa-console-pill error';
        consolePill.textContent = 'Empty Code ❌';
      }
      if (consoleBody) {
        consoleBody.textContent = `❌ Execution Error: Code workspace is empty.\nPlease write your solution code before running test cases.`;
      }
      this.app.showToast('Please write solution code before running tests', 'warning');
      return;
    }

    if (consolePill) {
      consolePill.className = 'dsa-console-pill running';
      consolePill.textContent = 'Running Tests...';
    }
    if (consoleBody) {
      consoleBody.textContent = `⚡ Testing ${lang.toUpperCase()} code against test suite for "${p.title}"...\nPlease wait...`;
    }

    setTimeout(() => {
      const res = testProblemCode(code, lang, p.id);

      if (!res.success) {
        if (consolePill) {
          consolePill.className = 'dsa-console-pill error';
          consolePill.textContent = `Failed (${res.passedTests || 0}/${res.totalTests || 0}) ❌`;
        }
        if (consoleBody) {
          let msg = `❌ [TEST RUNNER FAILED]\n`;
          if (res.error) {
            msg += `Error: ${res.error}\n\n`;
          }
          if (res.results && res.results.length > 0) {
            res.results.forEach(r => {
              msg += `${r.passed ? '✔' : '✖'} Test Case ${r.index}: ${r.passed ? 'PASSED' : 'FAILED'}\n`;
              msg += `   Input:    ${r.input}\n`;
              msg += `   Expected: ${r.expected}\n`;
              msg += `   Received: ${r.received} (${r.durationMs || 0} ms)\n\n`;
            });
          }
          msg += `⚠️ Your solution did not pass all test cases. Please fix your logic before submitting.`;
          consoleBody.textContent = msg;
        }
        this.app.showToast('Test cases failed. Check console for failure details.', 'danger');
        return;
      }

      // If all passed:
      if (consolePill) {
        consolePill.className = 'dsa-console-pill success';
        consolePill.textContent = `Passed ${res.passedTests}/${res.totalTests} ✅`;
      }
      if (consoleBody) {
        let msg = `✨ [TEST RUNNER SUCCESS] All ${res.totalTests}/${res.totalTests} Test Cases Passed!\n\n`;
        res.results.forEach(r => {
          msg += `✔ Test Case ${r.index}: PASSED (${r.durationMs || 10} ms)\n`;
          msg += `   Input:    ${r.input}\n`;
          msg += `   Output:   ${r.received}\n\n`;
        });
        msg += `==============================================\n`;
        msg += `🎯 Correct Output Verified (0 Errors, 0 Warnings)\n`;
        msg += `⏱️ Optimal Runtime Execution\n`;
        msg += `💾 Target Space Complexity: ${p.spaceComplexity}\n`;
        msg += `⚡ Target Time Complexity: ${p.timeComplexity}\n\n`;
        msg += `Ready to submit! Click "Submit Solution & Mark as Solved".`;
        consoleBody.textContent = msg;
      }
      this.app.showToast('All test cases passed! Ready to submit.', 'success');
    }, 250);
  }

  submitSolution() {
    if (!this.currentSolveProblem) return;
    const p = this.currentSolveProblem;
    const lang = this.activeSolverLang;
    const editor = document.getElementById('dsa-solver-code-editor');
    const code = editor ? editor.value.trim() : '';

    const consolePill = document.getElementById('dsa-console-status-pill');
    const consoleBody = document.getElementById('dsa-console-output');

    if (!code || code.length < 5) {
      this.app.showToast('Please write code before submitting!', 'warning');
      if (consolePill) {
        consolePill.className = 'dsa-console-pill error';
        consolePill.textContent = 'Empty Code ❌';
      }
      if (consoleBody) {
        consoleBody.textContent = `❌ Submission Error: Code editor is empty. You must write and test your solution first.`;
      }
      return;
    }

    // STRICT TEST VERIFICATION BEFORE MARKING AS SOLVED
    const res = testProblemCode(code, lang, p.id);

    if (!res.success) {
      if (consolePill) {
        consolePill.className = 'dsa-console-pill error';
        consolePill.textContent = 'Rejected ❌';
      }
      if (consoleBody) {
        let msg = `❌ [SUBMISSION REJECTED]\n`;
        msg += `Your code did not pass all required test cases. Problems can ONLY be marked as solved after writing a correct solution.\n\n`;
        if (res.error) {
          msg += `Reason: ${res.error}\n\n`;
        }
        if (res.results && res.results.length > 0) {
          const failed = res.results.find(r => !r.passed) || res.results[res.results.length - 1];
          msg += `Failed on Test Case ${failed.index}:\n`;
          msg += `Input:    ${failed.input}\n`;
          msg += `Expected: ${failed.expected}\n`;
          msg += `Received: ${failed.received}\n\n`;
        }
        msg += `⚠️ Status remains UNVERIFIED / PENDING. Please fix your errors and re-test.`;
        consoleBody.textContent = msg;
      }
      this.app.showToast('❌ Submission Rejected: Code failed test cases. Fix errors and try again!', 'danger');
      return; // DO NOT MARK AS SOLVED!
    }

    // Save student code draft
    localStorage.setItem(`hirecraft_dsa_draft_${p.id}_${lang}`, code);

    // Mark as solved in state
    const isAlreadySolved = state.isDsaSolved(p.id);
    if (!isAlreadySolved) {
      state.toggleDsaSolved(p.id);
    }

    if (consolePill) {
      consolePill.className = 'dsa-console-pill success';
      consolePill.textContent = 'Accepted 🎉';
    }
    if (consoleBody) {
      consoleBody.textContent = `🚀 SUBMISSION ACCEPTED & VERIFIED!\n\nProblem: ${p.title} (${p.difficulty})\nStatus: Solved (100% test cases passed)\nTime Complexity: ${p.timeComplexity} | Space Complexity: ${p.spaceComplexity}\n\n🏆 Problem officially marked as Solved!\nOfficial Solution & Editorial unlocked. Placement Readiness metrics updated!`;
    }

    this.app.showToast(`🎉 "${p.title}" verified correct and marked as Solved!`, 'success');

    // Update status in modal footer
    const statusInd = document.getElementById('dsa-solve-status-indicator');
    if (statusInd) {
      statusInd.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="color: var(--accent-emerald);">✅ Solved!</span>
          <button type="button" id="btn-unsolve-problem" class="btn btn-secondary" style="padding: 4px 10px; font-size: 0.74rem;">
            Mark as Unsolved / Reset
          </button>
        </div>
      `;
      document.getElementById('btn-unsolve-problem')?.addEventListener('click', () => {
        state.toggleDsaSolved(p.id);
        this.app.showToast(`"${p.title}" marked as pending`, 'info');
        this.openSolveModal(p.id);
        this.render();
      });
    }

    // Re-render sheet immediately to unlock Solution button and show Solved status
    this.render();

    // Close modal after celebration
    setTimeout(() => {
      document.getElementById('dsa-solve-modal')?.classList.remove('active');
    }, 1500);
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
