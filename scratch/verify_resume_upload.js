import { HireScoreEngine } from '../js/modules/hireScore.js';

console.log('Testing HireScoreEngine.auditResume with real resume content...');

const sampleResume = `
Sachin A K
Bangalore, India | sachin@candidate.com | +91 9876543210
GitHub: https://github.com/sachinak | LinkedIn: https://linkedin.com/in/sachinak
Portfolio: https://sachinak.dev

PROFESSIONAL SUMMARY
Passionate Software Development Engineer with extensive experience building scalable web applications, microservices, and real-time distributed systems.

TECHNICAL SKILLS
Languages: JavaScript, TypeScript, Python, Java, C++, SQL
Frameworks & Libraries: React, Node.js, Express, Next.js, Tailwind CSS
Databases & Storage: PostgreSQL, MongoDB, Redis
Cloud & DevOps: Docker, AWS, Git, GitHub Actions, Linux
Core Computer Science: Data Structures, Algorithms, System Design, RESTful APIs, OOP

WORK EXPERIENCE / PROJECTS
DevSphere - Collaborative Cloud IDE
- Designed and developed a real-time collaborative code editor serving 10,000+ active users with WebSocket synchronization.
- Optimized database query response times by 42% through Redis caching and PostgreSQL indexing.
- Architected Dockerized microservices deployed on AWS with 99.9% uptime.

HireMatrix - Intelligent ATS & Recruitment Platform
- Engineered automated ATS parser analyzing 5,000+ resumes per day.
- Reduced candidate screening latency by 35% using asynchronous worker pipelines.

EDUCATION
B.Tech in Computer Science & Engineering - 8.8 CGPA
`;

const audit = HireScoreEngine.auditResume(sampleResume, 'Software Development Engineer (SDE-1)');
console.log('Audit Results:');
console.log('- ATS Score:', audit.atsScore, '%');
console.log('- Tier Label:', audit.tierLabel);
console.log('- Contacts Count:', audit.contactsCount);
console.log('- Matched Keywords (' + audit.matchedKeywords.length + '):', audit.matchedKeywords);
console.log('- Missing Keywords (' + audit.missingKeywords.length + '):', audit.missingKeywords);
console.log('- Quantifiable Metrics:', audit.hasMetrics, 'count:', audit.metricCount);
console.log('- Action Verbs (' + audit.matchedVerbs.length + '):', audit.matchedVerbs);
console.log('- Feedback Items:', audit.feedback);

if (audit.atsScore >= 75 && audit.contactsCount >= 4 && audit.hasMetrics) {
  console.log('SUCCESS: Real resume audit engine test passed perfectly!');
} else {
  console.error('FAILURE: Unexpected audit output.');
  process.exit(1);
}
