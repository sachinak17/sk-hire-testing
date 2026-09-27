// Multi-user Resume & ATS Scorecard isolation test
globalThis.localStorage = {
  store: {},
  getItem(key) { return this.store[key] || null; },
  setItem(key, val) { this.store[key] = String(val); },
  removeItem(key) { delete this.store[key]; }
};

const { state, EMPTY_RESUME } = await import('../js/state.js');
const { HireScoreEngine } = await import('../js/modules/hireScore.js');

console.log('=== TEST 1: User 1 Login (Initial Empty State) ===');
state.login({
  name: 'User One',
  email: 'user1@example.com',
  role: 'Candidate'
});

console.log('User 1 active profile resume:', state.resumeProfile);
if (state.resumeProfile.fileName !== '' || state.resumeProfile.atsScore !== 0) {
  console.error('FAIL: User 1 should start with empty resume');
  process.exit(1);
}
const u1InitScore = state.getHireScore();
console.log('User 1 initial resume score:', u1InitScore.pillars.resume.score, '/ 15 (ATS:', u1InitScore.pillars.resume.atsScore + '%)');
if (u1InitScore.pillars.resume.score !== 0) {
  console.error('FAIL: User 1 initial resume points should be 0');
  process.exit(1);
}

console.log('\n=== TEST 2: User 1 Uploads Resume ===');
const u1ResumeText = `User One
Email: user1@example.com | Phone: +91 9876543210
GitHub: https://github.com/userone | LinkedIn: https://linkedin.com/in/userone
Target Role: Software Development Engineer

TECHNICAL SKILLS:
- Languages: JavaScript, Python, TypeScript, SQL, C++
- Frameworks: React, Node.js, Express, Docker, Git, REST APIs

PROJECTS:
- Distributed Code Sandbox: Scaled to 5,000+ users. Reduced response time by 45%.`;

const u1Audit = HireScoreEngine.auditResume(u1ResumeText, 'Software Development Engineer (SDE-1)');
console.log('User 1 ATS score:', u1Audit.atsScore, '%');

state.updateResumeProfile({
  fileName: 'User1_Software_Resume.pdf',
  fileSize: '150 KB',
  fileType: 'PDF Document',
  atsScore: u1Audit.atsScore,
  highlights: `Scored ${u1Audit.atsScore}% ATS score.`,
  extractedText: u1ResumeText
});

const u1UpdatedScore = state.getHireScore();
console.log('User 1 updated resume pillar score:', u1UpdatedScore.pillars.resume.score, '/ 15 (ATS:', u1UpdatedScore.pillars.resume.atsScore + '%)');
if (u1UpdatedScore.pillars.resume.atsScore !== u1Audit.atsScore) {
  console.error('FAIL: User 1 ATS score not updated');
  process.exit(1);
}

console.log('\n=== TEST 3: User 1 Logs Out, User 2 Logs In ===');
state.logout();
state.login({
  name: 'User Two',
  email: 'user2@example.com',
  role: 'Candidate'
});

console.log('User 2 active profile resume:', state.resumeProfile);
if (state.resumeProfile.fileName !== '' || state.resumeProfile.atsScore !== 0) {
  console.error('FAIL: User 2 should NOT see User 1 resume! Must be empty.');
  process.exit(1);
}
const u2InitScore = state.getHireScore();
console.log('User 2 initial resume score:', u2InitScore.pillars.resume.score, '/ 15');
if (u2InitScore.pillars.resume.score !== 0) {
  console.error('FAIL: User 2 initial score should be 0');
  process.exit(1);
}

console.log('\n=== TEST 4: User 2 Uploads Different Resume ===');
const u2ResumeText = `User Two
Email: user2@example.com | Phone: +91 9998887776
Target Role: Frontend Engineer
SKILLS: HTML, CSS, JavaScript, React`;

const u2Audit = HireScoreEngine.auditResume(u2ResumeText, 'Frontend Engineer');
console.log('User 2 ATS score:', u2Audit.atsScore, '%');

state.updateResumeProfile({
  fileName: 'User2_Frontend_Resume.docx',
  fileSize: '95 KB',
  fileType: 'Word Document',
  atsScore: u2Audit.atsScore,
  highlights: `Scored ${u2Audit.atsScore}% ATS score.`,
  extractedText: u2ResumeText
});

console.log('User 2 saved resume:', state.resumeProfile.fileName, 'ATS:', state.resumeProfile.atsScore + '%');

console.log('\n=== TEST 5: Switching back to User 1 ===');
state.logout();
state.login({
  name: 'User One',
  email: 'user1@example.com',
  role: 'Candidate'
});

console.log('User 1 restored resume:', state.resumeProfile.fileName, 'ATS:', state.resumeProfile.atsScore + '%');
if (state.resumeProfile.fileName !== 'User1_Software_Resume.pdf' || state.resumeProfile.atsScore !== u1Audit.atsScore) {
  console.error('FAIL: User 1 resume was corrupted or overwritten by User 2!');
  process.exit(1);
}

console.log('\n=== TEST 6: User 2 Logs back in and removes resume ===');
state.logout();
state.login({
  name: 'User Two',
  email: 'user2@example.com',
  role: 'Candidate'
});

console.log('User 2 restored resume:', state.resumeProfile.fileName, 'ATS:', state.resumeProfile.atsScore + '%');
if (state.resumeProfile.fileName !== 'User2_Frontend_Resume.docx') {
  console.error('FAIL: User 2 resume was not restored correctly');
  process.exit(1);
}

state.removeResumeProfile();
console.log('User 2 removed resume. Now:', state.resumeProfile);
if (state.resumeProfile.fileName !== '') {
  console.error('FAIL: User 2 resume not cleared');
  process.exit(1);
}

console.log('\n=== TEST 7: Confirm User 1 still has their resume untouched ===');
state.logout();
state.login({
  name: 'User One',
  email: 'user1@example.com',
  role: 'Candidate'
});
console.log('User 1 resume after User 2 removed theirs:', state.resumeProfile.fileName, 'ATS:', state.resumeProfile.atsScore + '%');
if (state.resumeProfile.fileName !== 'User1_Software_Resume.pdf') {
  console.error('FAIL: User 1 resume was affected by User 2 removal!');
  process.exit(1);
}

console.log('\n>>> ALL MULTI-USER RESUME & ATS ISOLATION TESTS PASSED! <<<');
