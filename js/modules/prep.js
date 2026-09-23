/**
 * HireCraft - Preparation Hub Module
 * Interactive notes, formula sheets, timed quiz engine, and HR STAR answer builder.
 */

import { PREP_DATA } from '../data/prepData.js';
import { state } from '../state.js';

export class PrepModule {
  constructor(app) {
    this.app = app;
    this.activeTab = 'technical'; // 'technical' | 'hr'
    this.activeSubcatId = 'os';
    this.currentQuiz = null;
    this.quizState = {
      questions: [],
      currentIndex: 0,
      score: 0,
      answers: [], // { questionId, selectedIndex, isCorrect }
      isCompleted: false,
      timerSeconds: 0,
      timerInterval: null
    };
  }

  init() {
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    // Primary Tab buttons (Tech CS, HR)
    const tabNav = document.getElementById('prep-tabs-nav');
    if (tabNav) {
      tabNav.addEventListener('click', (e) => {
        const btn = e.target.closest('.prep-tab-btn');
        if (!btn) return;
        tabNav.querySelectorAll('.prep-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeTab = btn.dataset.tab;
        
        // Default subcat
        if (this.activeTab === 'technical') this.activeSubcatId = 'os';
        else if (this.activeTab === 'aptitude') this.activeSubcatId = 'quant';

        this.render();
      });
    }

    // Modal close listeners
    const modalCloseButtons = document.querySelectorAll('[data-close-modal]');
    modalCloseButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modalId = e.currentTarget.dataset.closeModal;
        if (modalId === 'quiz-modal') this.stopQuizTimer();
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('active');
      });
    });
  }

  render() {
    const container = document.getElementById('prep-content-container');
    if (!container) return;

    if (this.activeTab === 'technical') {
      this.renderStudyAndQuizHub(container, PREP_DATA.technical);
    } else if (this.activeTab === 'aptitude') {
      this.renderStudyAndQuizHub(container, PREP_DATA.aptitude);
    } else if (this.activeTab === 'hr') {
      this.renderHrHub(container, PREP_DATA.hr);
    }
  }

  renderStudyAndQuizHub(container, moduleData) {
    const subcats = moduleData.subcategories;
    const currentSubcat = subcats.find(s => s.id === this.activeSubcatId) || subcats[0];

    container.innerHTML = `
      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 6px;">${moduleData.title}</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">${moduleData.description}</p>
      </div>

      <!-- Subcategory Pills -->
      <div class="prep-subcat-selector">
        ${subcats.map(sub => `
          <button class="subcat-pill ${sub.id === currentSubcat.id ? 'active' : ''}" data-subcat-id="${sub.id}">
            ${sub.icon} ${sub.name}
          </button>
        `).join('')}
      </div>

      <!-- Interactive Quiz Launch Banner -->
      <div class="quiz-launch-card">
        <div class="quiz-launch-info">
          <h4>Test Your Knowledge: ${currentSubcat.name}</h4>
          <p>Sharpen your problem-solving accuracy with ${currentSubcat.quizQuestions.length} curated, timed exam questions.</p>
        </div>
        <button class="btn btn-primary" id="btn-start-quiz" style="padding: 12px 24px; font-weight: 700;">
          ⚡ Start Practice Quiz
        </button>
      </div>

      <!-- Notes and Key Formulas / Concepts -->
      <h4 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
        <span>📝</span> Revision Notes & Cheat Sheets
      </h4>

      <div class="notes-grid">
        ${currentSubcat.notes.map(note => `
          <div class="note-card">
            <h4 class="note-card-title">${note.topic}</h4>
            <p class="note-card-summary">${note.summary}</p>

            ${note.formulas ? `
              <div class="formulas-box">
                <h5>Key Formulas & Shortcuts</h5>
                ${note.formulas.map(f => `<div class="formula-item">• ${f}</div>`).join('')}
              </div>
            ` : ''}

            ${note.keyPoints ? `
              <div style="margin-top: 12px;">
                <h5 style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px;">Core Concepts</h5>
                <ul class="keypoints-list">
                  ${note.keyPoints.map(kp => `<li>${kp}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;

    // Attach subcat click
    container.querySelectorAll('.subcat-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        this.activeSubcatId = pill.dataset.subcatId;
        this.render();
      });
    });

    // Start Quiz button
    const startQuizBtn = container.querySelector('#btn-start-quiz');
    if (startQuizBtn) {
      startQuizBtn.addEventListener('click', () => {
        this.launchQuiz(currentSubcat);
      });
    }
  }

  renderHrHub(container, hrData) {
    container.innerHTML = `
      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 6px;">${hrData.title}</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">${hrData.description}</p>
      </div>

      <!-- STAR Method Guide & Interactive Builder -->
      <div class="star-builder-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 14px;">
          <div>
            <h4 style="font-size: 1.25rem; font-weight: 800; color: var(--primary);">⭐ ${hrData.starMethodGuide.title}</h4>
            <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 4px;">${hrData.starMethodGuide.subtitle}</p>
          </div>
          <button class="btn btn-outline-primary" id="btn-toggle-star-builder" style="font-size: 0.85rem;">
            🛠️ Open Interactive STAR Answer Builder
          </button>
        </div>

        <div class="star-grid">
          ${hrData.starMethodGuide.steps.map(s => `
            <div class="star-step-card">
              <div class="star-step-letter">${s.letter}</div>
              <div class="star-step-name">${s.word}</div>
              <p class="star-step-desc">${s.description}</p>
              <div style="margin-top: 10px; font-size: 0.76rem; color: var(--secondary); font-weight: 600;">Tip: ${s.tip}</div>
            </div>
          `).join('')}
        </div>

        <!-- Hidden by default interactive workspace -->
        <div id="star-interactive-workspace" style="display: none; margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--border-subtle);">
          <h5 style="font-size: 1rem; font-weight: 700; margin-bottom: 12px; color: var(--text-primary);">Construct Your STAR Answer:</h5>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px;">
            <div>
              <label style="font-size: 0.82rem; font-weight: 600; color: var(--text-secondary);">1. Situation (Context & Challenge):</label>
              <textarea id="star-input-s" rows="2" class="search-input" style="padding: 10px; font-size: 0.88rem; margin-top: 4px;" placeholder="e.g. During our college capstone project with 4 teammates..."></textarea>
            </div>
            <div>
              <label style="font-size: 0.82rem; font-weight: 600; color: var(--text-secondary);">2. Task (Your exact goal/responsibility):</label>
              <textarea id="star-input-t" rows="2" class="search-input" style="padding: 10px; font-size: 0.88rem; margin-top: 4px;" placeholder="e.g. I was responsible for fixing the slow database queries..."></textarea>
            </div>
            <div>
              <label style="font-size: 0.82rem; font-weight: 600; color: var(--text-secondary);">3. Action (What YOU specifically did):</label>
              <textarea id="star-input-a" rows="3" class="search-input" style="padding: 10px; font-size: 0.88rem; margin-top: 4px;" placeholder="e.g. I analyzed slow query logs, added composite B+ Tree indices, and implemented Redis caching..."></textarea>
            </div>
            <div>
              <label style="font-size: 0.82rem; font-weight: 600; color: var(--text-secondary);">4. Result (Quantified impact & learnings):</label>
              <textarea id="star-input-r" rows="3" class="search-input" style="padding: 10px; font-size: 0.88rem; margin-top: 4px;" placeholder="e.g. Reduced API latency from 450ms to 65ms and received the best engineering grade..."></textarea>
            </div>
          </div>
          <button class="btn btn-primary" id="btn-generate-star-answer">Generate & Preview Polished Answer</button>

          <div id="star-generated-output" style="display: none; margin-top: 16px; padding: 16px; background: var(--bg-surface-elevated); border-radius: var(--radius-md); border-left: 4px solid var(--accent-emerald);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-weight: 700; color: var(--accent-emerald); font-size: 0.9rem;">✓ Assembled STAR Response:</span>
              <button class="btn btn-secondary" id="btn-copy-star-response" style="padding: 4px 10px; font-size: 0.78rem;">Copy Response</button>
            </div>
            <p id="star-assembled-text" style="font-size: 0.92rem; line-height: 1.6; color: var(--text-primary);"></p>
          </div>
        </div>
      </div>

      <!-- Top HR Questions with Sample Good vs Bad Answers -->
      <h4 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 16px;">Top Behavioral & HR Questions</h4>
      <div class="hr-questions-grid">
        ${hrData.questions.map(q => `
          <div class="hr-question-card">
            <span class="hr-q-badge">${q.category}</span>
            <h4 class="hr-q-title">${q.question}</h4>
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 10px;">
              <strong style="color: var(--secondary);">Why recruiters ask this:</strong> ${q.purpose}
            </div>
            <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 14px; background: var(--bg-surface-elevated); padding: 10px; border-radius: var(--radius-sm);">
              <strong style="color: var(--primary);">Winning Strategy:</strong> ${q.strategy}
            </div>

            <div class="hr-answer-comparison">
              <div class="answer-box good-answer-box">
                <div class="answer-header good">✓ Recommended Sample Answer</div>
                <div>${q.sampleGoodAnswer}</div>
              </div>
              <div class="answer-box bad-answer-box">
                <div class="answer-header bad">✗ Red Flag / Avoid Saying</div>
                <div>${q.sampleBadAnswer}</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Interactive STAR builder toggle
    const toggleBtn = container.querySelector('#btn-toggle-star-builder');
    const workspace = container.querySelector('#star-interactive-workspace');
    if (toggleBtn && workspace) {
      toggleBtn.addEventListener('click', () => {
        const isHidden = workspace.style.display === 'none';
        workspace.style.display = isHidden ? 'block' : 'none';
        toggleBtn.textContent = isHidden ? '✕ Close STAR Builder' : '🛠️ Open Interactive STAR Answer Builder';
      });
    }

    // Generate STAR response
    const genBtn = container.querySelector('#btn-generate-star-answer');
    if (genBtn) {
      genBtn.addEventListener('click', () => {
        const s = document.getElementById('star-input-s').value.trim();
        const t = document.getElementById('star-input-t').value.trim();
        const a = document.getElementById('star-input-a').value.trim();
        const r = document.getElementById('star-input-r').value.trim();

        if (!s || !t || !a || !r) {
          this.app.showToast('Please fill out all 4 STAR components (Situation, Task, Action, Result)', 'warning');
          return;
        }

        const fullAnswer = `${s} In that situation, my primary task was to ${t}. To achieve this, I took action: ${a}. As a result of these efforts, ${r}`;
        const outputDiv = document.getElementById('star-generated-output');
        const textElem = document.getElementById('star-assembled-text');
        if (outputDiv && textElem) {
          textElem.textContent = fullAnswer;
          outputDiv.style.display = 'block';
        }

        const copyBtn = document.getElementById('btn-copy-star-response');
        if (copyBtn) {
          copyBtn.onclick = () => {
            navigator.clipboard.writeText(fullAnswer);
            this.app.showToast('STAR answer copied to clipboard!', 'success');
          };
        }
      });
    }
  }

  /* ==========================================================================
     QUIZ RUNNER ENGINE
     ========================================================================== */
  launchQuiz(subcat) {
    if (!subcat.quizQuestions || subcat.quizQuestions.length === 0) {
      this.app.showToast('No questions currently available for this section.', 'warning');
      return;
    }

    const modal = document.getElementById('quiz-modal');
    if (!modal) return;

    this.currentQuiz = subcat;
    this.quizState = {
      questions: subcat.quizQuestions,
      currentIndex: 0,
      score: 0,
      answers: [],
      isCompleted: false,
      timerSeconds: 0,
      timerInterval: null
    };

    document.getElementById('quiz-modal-title').textContent = `${subcat.name} Practice Quiz`;
    modal.classList.add('active');

    this.startQuizTimer();
    this.renderCurrentQuizQuestion();
  }

  startQuizTimer() {
    this.stopQuizTimer();
    const timerElem = document.getElementById('quiz-timer-display');
    this.quizState.timerInterval = setInterval(() => {
      this.quizState.timerSeconds++;
      if (timerElem) {
        const mins = Math.floor(this.quizState.timerSeconds / 60).toString().padStart(2, '0');
        const secs = (this.quizState.timerSeconds % 60).toString().padStart(2, '0');
        timerElem.textContent = `⏱️ ${mins}:${secs}`;
      }
    }, 1000);
  }

  stopQuizTimer() {
    if (this.quizState.timerInterval) {
      clearInterval(this.quizState.timerInterval);
      this.quizState.timerInterval = null;
    }
  }

  renderCurrentQuizQuestion() {
    const container = document.getElementById('quiz-modal-body');
    if (!container) return;

    const { questions, currentIndex, answers } = this.quizState;
    const q = questions[currentIndex];
    const total = questions.length;
    const progressPercent = Math.round((currentIndex / total) * 100);

    const isAnswered = answers.some(a => a.questionId === q.id);
    const existingAnswer = answers.find(a => a.questionId === q.id);

    container.innerHTML = `
      <div class="quiz-progress-bar-bg">
        <div class="quiz-progress-fill" style="width: ${progressPercent}%;"></div>
      </div>

      <div class="quiz-question-header">
        <span>Question ${currentIndex + 1} of ${total}</span>
        <span>Score: ${this.quizState.score}</span>
      </div>

      <div class="quiz-question-text">${q.question}</div>

      <div class="quiz-options-grid">
        ${q.options.map((opt, idx) => {
          let btnClass = 'quiz-option-btn';
          if (isAnswered) {
            btnClass += ' disabled';
            if (idx === q.correctIndex) {
              btnClass += ' correct';
            } else if (existingAnswer && existingAnswer.selectedIndex === idx && !existingAnswer.isCorrect) {
              btnClass += ' wrong';
            }
          }
          return `
            <button class="${btnClass}" data-option-idx="${idx}">
              <span style="font-weight: 700; width: 24px; height: 24px; border-radius: 50%; background: var(--bg-surface); display: inline-flex; align-items: center; justify-content: center; font-size: 0.8rem; border: 1px solid var(--border-subtle);">
                ${String.fromCharCode(65 + idx)}
              </span>
              <span>${opt}</span>
            </button>
          `;
        }).join('')}
      </div>

      ${isAnswered ? `
        <div class="quiz-explanation-card">
          <strong style="color: ${existingAnswer.isCorrect ? 'var(--accent-emerald)' : 'var(--accent-rose)'}; display: block; margin-bottom: 4px;">
            ${existingAnswer.isCorrect ? '✓ Correct Answer!' : '✗ Incorrect Answer'}
          </strong>
          ${q.explanation}
        </div>

        <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
          <button class="btn btn-primary" id="btn-next-quiz-q">
            ${currentIndex + 1 < total ? 'Next Question →' : 'View Final Score 🏆'}
          </button>
        </div>
      ` : ''}
    `;

    // Option buttons click
    if (!isAnswered) {
      container.querySelectorAll('.quiz-option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const selectedIdx = parseInt(btn.dataset.optionIdx, 10);
          const isCorrect = selectedIdx === q.correctIndex;
          if (isCorrect) this.quizState.score += 1;

          this.quizState.answers.push({
            questionId: q.id,
            selectedIndex: selectedIdx,
            isCorrect
          });

          this.renderCurrentQuizQuestion();
        });
      });
    } else {
      const nextBtn = container.querySelector('#btn-next-quiz-q');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          if (currentIndex + 1 < total) {
            this.quizState.currentIndex++;
            this.renderCurrentQuizQuestion();
          } else {
            this.finishQuiz();
          }
        });
      }
    }
  }

  finishQuiz() {
    this.stopQuizTimer();
    const container = document.getElementById('quiz-modal-body');
    if (!container) return;

    const total = this.quizState.questions.length;
    const score = this.quizState.score;
    const percentage = Math.round((score / total) * 100);

    // Record in state
    state.recordQuizResult({
      subject: this.currentQuiz.name,
      score,
      total,
      percentage,
      timeSeconds: this.quizState.timerSeconds
    });

    container.innerHTML = `
      <div style="text-align: center; padding: 30px 10px;">
        <div style="font-size: 3.5rem; margin-bottom: 12px;">${percentage >= 70 ? '🎉' : '💡'}</div>
        <h3 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 8px;">Quiz Completed!</h3>
        <p style="color: var(--text-secondary); font-size: 1rem; margin-bottom: 24px;">
          ${percentage >= 70 
            ? 'Outstanding performance! You have a solid grasp of this topic.' 
            : 'Good effort! Review the study notes to strengthen your conceptual foundation.'}
        </p>

        <div style="display: flex; justify-content: center; gap: 32px; margin-bottom: 30px;">
          <div style="background: var(--bg-surface-elevated); padding: 18px 28px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <div style="font-size: 2rem; font-weight: 800; color: var(--accent-emerald);">${score} / ${total}</div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">Total Score (${percentage}%)</div>
          </div>
          <div style="background: var(--bg-surface-elevated); padding: 18px 28px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <div style="font-size: 2rem; font-weight: 800; color: var(--primary);">${this.quizState.timerSeconds}s</div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">Time Taken</div>
          </div>
        </div>

        <div style="display: flex; justify-content: center; gap: 14px;">
          <button class="btn btn-secondary" data-close-modal="quiz-modal">Close</button>
          <button class="btn btn-primary" id="btn-retake-quiz">Retake Quiz</button>
        </div>
      </div>
    `;

    const closeBtn = container.querySelector('[data-close-modal="quiz-modal"]');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        document.getElementById('quiz-modal')?.classList.remove('active');
      });
    }

    const retakeBtn = container.querySelector('#btn-retake-quiz');
    if (retakeBtn) {
      retakeBtn.addEventListener('click', () => {
        this.launchQuiz(this.currentQuiz);
      });
    }
  }
}
