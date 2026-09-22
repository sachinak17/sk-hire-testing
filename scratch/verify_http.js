Promise.all([
  fetch('http://localhost:3000/').then(r => r.text()),
  fetch('http://localhost:3000/js/modules/dsaRunner.js').then(r => r.text()),
  fetch('http://localhost:3000/js/modules/dsaSheet.js').then(r => r.text()),
  fetch('http://localhost:3000/css/components.css').then(r => r.text())
]).then(([html, runner, sheet, css]) => {
  console.log('HTML len:', html.length, 'No intuition spoiler:', !html.includes('id="dsa-solve-intuition"'));
  console.log('Runner len:', runner.length, 'DSA_TEST_SUITES present:', runner.includes('DSA_TEST_SUITES'));
  console.log('Sheet len:', sheet.length, 'btn-solution-locked in sheet:', sheet.includes('btn-solution-locked'));
  console.log('CSS len:', css.length, 'btn-solution-locked in css:', css.includes('btn-solution-locked'));
}).catch(err => {
  console.error('Fetch error:', err);
});
