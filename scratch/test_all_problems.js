import { DSA_PROBLEMS } from '../js/data/dsaSheetData.js';
import { runJsTestCases, DSA_TEST_SUITES } from '../js/modules/dsaRunner.js';

console.log('Testing all 18 problems with official solutions...');
let passCount = 0;
let failCount = 0;

for (const p of DSA_PROBLEMS) {
  const jsCode = p.code.javascript;
  const res = runJsTestCases(jsCode, p.id);
  if (res.success) {
    passCount++;
    console.log(`✅ ${p.id} (${p.title}): PASSED ${res.passedTests}/${res.totalTests}`);
  } else {
    failCount++;
    console.error(`❌ ${p.id} (${p.title}): FAILED:`, res.error || res.results);
  }
}

console.log(`\nResults: ${passCount} passed, ${failCount} failed.`);

// Now test bad code (should fail and NOT pass)
console.log('\nTesting bad code on Two Sum:');
const badRes = runJsTestCases('function twoSum(nums, target) { return [99, 99]; }', 'dsa_1');
console.log('Bad code success:', badRes.success, '(Should be false)');
console.log('Bad code results:', badRes.results);

console.log('\nTesting empty code on Two Sum:');
const emptyRes = runJsTestCases('   ', 'dsa_1');
console.log('Empty code success:', emptyRes.success, '(Should be false)');
console.log('Empty code error:', emptyRes.error);
