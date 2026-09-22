globalThis.localStorage = {
  store: {},
  getItem(key) { return this.store[key] || null; },
  setItem(key, val) { this.store[key] = String(val); },
  removeItem(key) { delete this.store[key]; }
};

const { state } = await import('../js/state.js');
const { HireScoreEngine } = await import('../js/modules/hireScore.js');

console.log('--- 1. Testing Default Resume Profile in State ---');
console.log('Current resume profile:', state.resumeProfile);
if (!state.resumeProfile.fileName || !state.resumeProfile.atsScore) {
  console.error('FAILED: Invalid resume profile in state');
  process.exit(1);
}

console.log('\n--- 2. Testing HireScore Calculation with Baseline Resume ---');
const baselineScore = state.getHireScore();
console.log('Total Composite Hire Score:', baselineScore.totalScore, '/ 100');
console.log('Candidate Tier:', baselineScore.tierName);
console.log('Resume Pillar Score:', baselineScore.pillars.resume.score, '/ 15 (ATS:', baselineScore.pillars.resume.atsScore + '%)');

console.log('\n--- 3. Testing Upload Simulation of Real Resume from Drive ---');
const realUploadedResumeText = `
Sachin A K
Email: sachin@candidate.com | Phone: +91 9876543210
GitHub: https://github.com/sachinak | LinkedIn: https://linkedin.com/in/sachinak
Portfolio: https://sachin-dev.vercel.app

TECHNICAL EXPERTISE:
Languages: JavaScript, TypeScript, Python, Java, C++, SQL
Libraries & Frameworks: React, Next.js, Node.js, Express, Tailwind CSS
Databases & Cloud: PostgreSQL, MongoDB, Redis, Docker, AWS, Git, Linux
Core Computer Science: Data Structures, Algorithms, System Design, REST APIs, Microservices

WORK EXPERIENCE & PROJECTS:
Lead Engineer - DevSphere Collaborative IDE
- Architected distributed WebSocket code editor serving 25,000+ active developers with sub-50ms latency.
- Reduced database load by 48% by implementing Redis multi-level caching strategies and connection pooling.
- Engineered automated CI/CD pipeline reducing release cycle times by 65%.

HireMatrix Placement System
- Developed real-time resume parser analyzing 10,000+ resumes monthly.
- Optimized query execution by 38% on PostgreSQL database cluster.
`;

const audit = HireScoreEngine.auditResume(realUploadedResumeText, 'Software Development Engineer (SDE-1)');
console.log('ATS Audit Recruiter Scan:');
console.log('- ATS Score:', audit.atsScore, '%');
console.log('- Tier Label:', audit.tierLabel);
console.log('- Contacts Count:', audit.contactsCount, '/ 4');
console.log('- Matched Keywords count:', audit.matchedKeywords.length);
console.log('- Impact Metrics detected count:', audit.metricCount);
console.log('- Action Verbs detected count:', audit.matchedVerbs.length);

console.log('\n--- 4. Updating State with Real Uploaded Resume ---');
state.updateResumeProfile({
  fileName: 'Sachin_AK_Senior_SDE_Resume.pdf',
  fileSize: '154 KB',
  fileType: 'PDF Document',
  atsScore: audit.atsScore,
  highlights: `Scored ${audit.atsScore}% ATS index with ${audit.matchedKeywords.length} verified keywords.`,
  extractedText: realUploadedResumeText
});

const updatedScore = state.getHireScore();
console.log('\n--- 5. Recalculated Hire Score ---');
console.log('Previous Total:', baselineScore.totalScore, '-> New Total:', updatedScore.totalScore);
console.log('Previous Resume Pillar:', baselineScore.pillars.resume.score, '-> New Resume Pillar:', updatedScore.pillars.resume.score, '/ 15');
console.log('Pillar File Name:', updatedScore.pillars.resume.fileName);
console.log('Pillar File Size:', updatedScore.pillars.resume.fileSize);
console.log('Pillar ATS Score:', updatedScore.pillars.resume.atsScore + '%');

if (updatedScore.pillars.resume.atsScore === audit.atsScore && updatedScore.pillars.resume.fileName === 'Sachin_AK_Senior_SDE_Resume.pdf') {
  console.log('\n>>> SUCCESS: Full real resume flow from Drive upload to HireScore calculation works flawlessly! <<<');
} else {
  console.error('\nFAILED: State update mismatch.');
  process.exit(1);
}
