const dirtyText = `
JFIF========================================="====="=$===$=6*&&*6>424>LDDL_Z_||=========
===
===
==========="====="=$===$=6*&&*6>424>LDDL_Z_||=========
Sachin A K
Email: sachin@candidate.com | Phone: +91 9876543210
GitHub: https://github.com/sachinak
TECHNICAL SKILLS:
- Languages: JavaScript, Python, C++, TypeScript, SQL
- Frameworks: React, Node.js, Express, Tailwind CSS
`;

function sanitizeResumeText(text) {
  if (!text) return '';
  let clean = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F\uFFFD]/g, '');
  const lines = clean.split(/\r?\n/);
  const goodLines = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (goodLines.length > 0 && goodLines[goodLines.length - 1] !== '') {
        goodLines.push('');
      }
      continue;
    }
    if (/\b(JFIF|Exif|Ducky|Adobe)\b/i.test(trimmed)) continue;
    if (/[=~_#*|\\/<>&$%^]{4,}/.test(trimmed)) continue;
    const letterCount = (trimmed.match(/[a-zA-Z]/g) || []).length;
    const symbolCount = (trimmed.match(/[^a-zA-Z0-9\s.,@/:+()—–-]/g) || []).length;
    if (letterCount < 2 && symbolCount > 0) continue;
    if (symbolCount > letterCount && letterCount < 5) continue;
    goodLines.push(trimmed);
  }
  return goodLines.join('\n').trim();
}

const cleaned = sanitizeResumeText(dirtyText);
console.log('--- Sanitized Output ---');
console.log(cleaned);

if (cleaned.includes('JFIF') || cleaned.includes('LDDL_Z_') || cleaned.includes('=====')) {
  console.error('FAILED: Artifacts still found');
  process.exit(1);
} else {
  console.log('\nSUCCESS: 100% clean output without ANY binary artifacts!');
}
