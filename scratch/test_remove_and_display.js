import fs from 'fs';

globalThis.localStorage = {
  store: {},
  getItem(key) { return this.store[key] || null; },
  setItem(key, val) { this.store[key] = String(val); },
  removeItem(key) { delete this.store[key]; }
};

const { state } = await import('../js/state.js');
const { HireScoreEngine } = await import('../js/modules/hireScore.js');

console.log('--- 1. Testing Resume State Update & Recalculation ---');
state.updateResumeProfile({
  fileName: 'Sachin_AK_Resume.pdf',
  fileSize: '142 KB',
  fileType: 'PDF Document',
  atsScore: 92,
  extractedText: 'Sachin A K\nReact, Python, Node, SQL\nServed 10,000+ users'
});

let s1 = state.getHireScore();
console.log('Active Resume Score:', s1.totalScore, '/ 100, Resume points:', s1.pillars.resume.score, '/ 15');

console.log('\n--- 2. Testing Remove Resume ---');
state.updateResumeProfile({
  fileName: '',
  fileSize: '',
  fileType: '',
  atsScore: 0,
  extractedText: '',
  highlights: 'No resume uploaded.'
});

let s2 = state.getHireScore();
console.log('Score after Removal:', s2.totalScore, '/ 100, Resume points:', s2.pillars.resume.score, '/ 15');
console.log('Resume summary:', s2.pillars.resume.summary);

if (s2.pillars.resume.score !== 0) {
  console.error('FAILED: Resume score should be 0 after removal!');
  process.exit(1);
}

console.log('\n--- 3. Testing Audit on Empty Text ---');
const emptyAudit = HireScoreEngine.auditResume('');
console.log('Empty text audit ATS Score:', emptyAudit.atsScore + '%');
if (emptyAudit.atsScore !== 0) {
  console.error('FAILED: Empty audit should be 0%');
  process.exit(1);
}

console.log('\n--- 4. Checking index.html and CSS ---');
const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('css/components.css', 'utf8');

console.log('Has #btn-remove-resume:', html.includes('id="btn-remove-resume"'));
console.log('Has #btn-replace-file:', html.includes('id="btn-replace-file"'));
console.log('Has local pdf.min.js:', html.includes('src="js/libs/pdf.min.js"'));
console.log('Has .btn-remove-resume in CSS:', css.includes('.btn-remove-resume'));
console.log('Has .btn-change-file in CSS:', css.includes('.btn-change-file'));

if (
  html.includes('id="btn-remove-resume"') &&
  html.includes('src="js/libs/pdf.min.js"') &&
  css.includes('.btn-remove-resume')
) {
  console.log('\n>>> SUCCESS: All remove resume button & display fixes verified! <<<');
} else {
  console.error('FAILED: Missing elements or styles');
  process.exit(1);
}
