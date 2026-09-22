const http = require('http');

http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status code:', res.statusCode);
    const hasAptitudeTab = data.includes('data-tab="aptitude"');
    const hasTechnicalTab = data.includes('data-tab="technical"');
    const hasHrTab = data.includes('data-tab="hr"');
    console.log('Has aptitude tab button in HTML:', hasAptitudeTab);
    console.log('Has technical tab button in HTML:', hasTechnicalTab);
    console.log('Has HR tab button in HTML:', hasHrTab);
    if (!hasAptitudeTab && hasTechnicalTab && hasHrTab) {
      console.log('ALL CHECKS PASSED: Aptitude tab is removed; Technical and HR tabs are present.');
    } else {
      console.error('CHECKS FAILED');
      process.exit(1);
    }
  });
}).on('error', err => {
  console.error('Fetch error:', err.message);
  process.exit(1);
});
