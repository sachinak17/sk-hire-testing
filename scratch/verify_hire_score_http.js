Promise.all([
  fetch('http://localhost:3000/').then(r => r.text()),
  fetch('http://localhost:3000/js/modules/hireScore.js').then(r => r.text()),
  fetch('http://localhost:3000/js/modules/dashboard.js').then(r => r.text()),
  fetch('http://localhost:3000/js/state.js').then(r => r.text()),
  fetch('http://localhost:3000/css/components.css').then(r => r.text()),
  fetch('http://localhost:3000/css/style.css').then(r => r.text())
]).then(([html, hireScore, dashboard, state, compCss, styleCss]) => {
  console.log('HTML len:', html.length);
  console.log('- Has header hire score pill:', html.includes('header-hire-score-pill'));
  console.log('- Post a Job removed from HTML:', !html.includes('Post a Job') && !html.includes('id="post-job-modal"'));
  console.log('- Has skills modal:', html.includes('id="skills-modal"'));
  console.log('- Has project modal:', html.includes('id="project-modal"'));
  console.log('- Has resume modal:', html.includes('id="resume-modal"'));
  console.log('HireScore JS len:', hireScore.length, 'Has calculate:', hireScore.includes('calculate(state)'));
  console.log('Dashboard JS len:', dashboard.length, 'Has 6 pillars:', dashboard.includes('6 Core Evaluation Pillars'));
  console.log('Components CSS len:', compCss.length, 'Has hire-hero-card:', compCss.includes('.hire-hero-card'));
  console.log('Style CSS len:', styleCss.length, 'Has header-hire-score-pill:', styleCss.includes('.header-hire-score-pill'));
  console.log('\nAll assets verified successfully!');
}).catch(err => {
  console.error('Fetch error:', err);
});
