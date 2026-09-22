// Mock browser localStorage for Node testing
globalThis.localStorage = {
  store: {},
  getItem(key) { return this.store[key] || null; },
  setItem(key, val) { this.store[key] = String(val); },
  removeItem(key) { delete this.store[key]; }
};

const { state } = await import('../js/state.js');

console.log('Testing Student Hire Score Engine...');
const hireScore = state.getHireScore();

console.log('Total Composite Hire Score:', hireScore.totalScore, '/ 100');
console.log('Candidate Tier:', hireScore.tierName);
console.log('Percentile:', hireScore.percentile);
console.log('\n6 Core Pillars Breakdown:');
Object.entries(hireScore.pillars).forEach(([key, p]) => {
  console.log(`- ${p.icon} ${p.name}: ${p.score}/${p.max} pts (${p.percent}%) -> ${p.summary}`);
});

console.log('\nTop Recommendations:');
hireScore.recommendations.forEach((r, i) => {
  console.log(`${i+1}. [${r.pillar.toUpperCase()}] ${r.title} (${r.impact})`);
});
