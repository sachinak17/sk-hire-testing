// Mock browser localStorage for Node testing
globalThis.localStorage = {
  store: {},
  getItem(key) { return this.store[key] || null; },
  setItem(key, val) { this.store[key] = String(val); },
  removeItem(key) { delete this.store[key]; }
};

const { state } = await import('../js/state.js');

console.log('--- Initial State ---');
let s1 = state.getHireScore();
console.log(`Initial Score: ${s1.totalScore}/100 (${s1.tierName})`);

console.log('\n--- Student Solves 3 DSA Problems ---');
state.toggleDsaSolved('dsa_1'); // Two Sum (Easy)
state.toggleDsaSolved('dsa_3'); // Kadane's (Medium)
state.toggleDsaSolved('dsa_6'); // 3Sum (Medium)
let s2 = state.getHireScore();
console.log(`Updated Score: ${s2.totalScore}/100 (${s2.tierName})`);
console.log(`DSA Pillar: ${s2.pillars.dsa.score}/25 pts (${s2.pillars.dsa.summary})`);

console.log('\n--- Student Takes Aptitude Quiz (Score: 85%) ---');
state.recordQuizResult({
  subject: 'Quantitative Aptitude',
  score: 9,
  total: 10,
  percentage: 90,
  timeSeconds: 120
});
let s3 = state.getHireScore();
console.log(`Updated Score: ${s3.totalScore}/100 (${s3.tierName})`);
console.log(`Aptitude Pillar: ${s3.pillars.aptitude.score}/15 pts (${s3.pillars.aptitude.summary})`);

console.log('\n--- Student Adds 1 More Project ---');
state.addProject({
  title: 'CloudFlow - Serverless Event Pipeline',
  description: 'High-throughput event streamer deployed on AWS Lambda with DynamoDB and SQS.',
  techStack: ['Node.js', 'AWS', 'TypeScript', 'Docker'],
  githubUrl: 'https://github.com/developer/cloudflow',
  liveUrl: 'https://cloudflow.io'
});
let s4 = state.getHireScore();
console.log(`Updated Score: ${s4.totalScore}/100 (${s4.tierName})`);
console.log(`Projects Pillar: ${s4.pillars.projects.score}/15 pts (${s4.pillars.projects.summary})`);
