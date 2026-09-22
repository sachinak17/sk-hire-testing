async function verify() {
  const res = await fetch('http://localhost:3000/index.html');
  const html = await res.text();
  const hasHeaderPill = html.includes('header-hire-score-pill');
  const hasNavHireScore = html.includes('data-view="dashboard">🎯 Hire Score<');
  const hasViewDashboard = html.includes('id="view-dashboard"');
  
  console.log('1. Header score pill present:', hasHeaderPill, '(expected: false)');
  console.log('2. Hire Score navigation tab present:', hasNavHireScore, '(expected: true)');
  console.log('3. Hire Score view section present:', hasViewDashboard, '(expected: true)');

  if (hasHeaderPill) {
    throw new Error('Header score pill is still present!');
  }
  if (!hasNavHireScore || !hasViewDashboard) {
    throw new Error('Hire Score navigation or section missing!');
  }
  console.log('ALL CHECKS PASSED: Score pill removed from header; Hire Score only accessible via the 🎯 Hire Score tab!');
}

verify().catch(err => {
  console.error(err);
  process.exit(1);
});
