/**
 * HireCraft - Dedicated Student Hire Score Engine
 * Comprehensive multi-dimensional evaluation based on 6 core pillars:
 * 1. Skills & Tech Stack (15 pts)
 * 2. Data Structures & Algorithms (25 pts)
 * 3. Aptitude & Reasoning (15 pts)
 * 4. Real-World Projects (15 pts)
 * 5. Resume & ATS Scorecard (15 pts)
 * 6. Interview & Behavioral Readiness (15 pts)
 * Total: 100 Points
 */

import { DSA_PROBLEMS } from '../data/dsaSheetData.js';

export const SKILL_LIBRARY = [
  { name: 'JavaScript', category: 'Language', icon: '⚡' },
  { name: 'Python', category: 'Language', icon: '🐍' },
  { name: 'Java', category: 'Language', icon: '☕' },
  { name: 'C++', category: 'Language', icon: '⚙️' },
  { name: 'TypeScript', category: 'Language', icon: '🔷' },
  { name: 'React', category: 'Frontend', icon: '⚛️' },
  { name: 'Node.js', category: 'Backend', icon: '🟢' },
  { name: 'Express.js', category: 'Backend', icon: '🚀' },
  { name: 'SQL & PostgreSQL', category: 'Database', icon: '🗄️' },
  { name: 'MongoDB', category: 'Database', icon: '🍃' },
  { name: 'Data Structures & Algorithms', category: 'Core CS', icon: '📊' },
  { name: 'System Design', category: 'Core CS', icon: '🏛️' },
  { name: 'Git & GitHub', category: 'DevOps', icon: '🐙' },
  { name: 'Docker & Containers', category: 'DevOps', icon: '🐳' },
  { name: 'AWS Cloud', category: 'Cloud', icon: '☁️' },
  { name: 'RESTful APIs', category: 'Backend', icon: '🔌' }
];

export class HireScoreEngine {
  /**
   * Calculate comprehensive Hire Score for a student
   */
  static calculate(state) {
    // 1. SKILLS (Max 15 pts)
    const skillsList = state.studentSkills || [];
    // 2.5 pts per verified skill up to 6 skills
    const skillsScore = Math.min(Math.round(skillsList.length * 2.5), 15);

    // 2. DSA (Max 25 pts)
    const solvedDsaIds = state.solvedDsaIds || new Set();
    const totalProblems = DSA_PROBLEMS.length;
    let dsaPointsEarned = 0;
    let easyCount = 0;
    let medCount = 0;
    let hardCount = 0;

    DSA_PROBLEMS.forEach(p => {
      if (solvedDsaIds.has(p.id)) {
        if (p.difficulty === 'Easy') {
          dsaPointsEarned += 1.0;
          easyCount++;
        } else if (p.difficulty === 'Medium') {
          dsaPointsEarned += 1.8;
          medCount++;
        } else if (p.difficulty === 'Hard') {
          dsaPointsEarned += 2.5;
          hardCount++;
        }
      }
    });

    // Maximum achievable points benchmark (~20 pts of weights)
    const maxTheoreticalPoints = 18 * 1.5;
    const dsaScore = Math.min(Math.round((dsaPointsEarned / maxTheoreticalPoints) * 25), 25);

    // 3. APTITUDE (Max 15 pts)
    const quizHistory = state.quizHistory || [];
    let aptScore = 0;
    let aptAvg = 0;
    if (quizHistory.length > 0) {
      const sum = quizHistory.reduce((acc, q) => acc + (q.percentage || 0), 0);
      aptAvg = Math.round(sum / quizHistory.length);
      aptScore = Math.min(Math.round((aptAvg / 100) * 15), 15);
    } else {
      // Baseline if student has not taken a quiz yet
      aptScore = 0;
      aptAvg = 0;
    }

    // 4. PROJECTS (Max 15 pts)
    const projects = state.studentProjects || [];
    let projScore = 0;
    projects.forEach(proj => {
      let pPts = 3.5; // Base project points
      if (proj.githubUrl && proj.githubUrl.includes('github.com')) pPts += 1.0;
      if (proj.liveUrl && proj.liveUrl.length > 5) pPts += 1.0;
      if (proj.techStack && proj.techStack.length >= 3) pPts += 0.5;
      projScore += pPts;
    });
    projScore = Math.min(Math.round(projScore), 15);

    // 5. RESUME / ATS (Max 15 pts)
    const resume = state.resumeProfile || { atsScore: 78 };
    const atsScore = resume.atsScore || 0;
    const resumePoints = Math.min(Math.round((atsScore / 100) * 15), 15);

    // 6. INTERVIEW READINESS (Max 15 pts)
    const interview = state.interviewProfile || { starStories: [], hrPracticed: [] };
    const starCount = interview.starStories ? interview.starStories.length : 0;
    const hrCount = interview.hrPracticed ? interview.hrPracticed.length : 0;
    // Each STAR story = 3.5 pts (up to 3), each HR question practiced = 0.8 pt (up to 6)
    const interviewScore = Math.min(Math.round((starCount * 3.5) + (hrCount * 0.8)), 15);

    // TOTAL COMPOSITE HIRE SCORE
    const totalScore = Math.min(Math.round(skillsScore + dsaScore + aptScore + projScore + resumePoints + interviewScore), 100);

    // TIER & BENCHMARK
    let tierName = 'Foundation Tier 🌱';
    let tierBadgeClass = 'tier-foundation';
    let tierTarget = 'Campus Placement Prep & Fundamentals';
    let percentile = 'Top 65%';

    if (totalScore >= 85) {
      tierName = 'Elite Tier 💎';
      tierBadgeClass = 'tier-elite';
      tierTarget = 'FAANG, Top Tier Product & High-CTC Roles (₹24-50+ LPA)';
      percentile = 'Top 3% of candidates';
    } else if (totalScore >= 70) {
      tierName = 'Advanced Tier 🚀';
      tierBadgeClass = 'tier-advanced';
      tierTarget = 'Tier-1 Tech, Unicorns & High-Growth Scaleups (₹14-24 LPA)';
      percentile = 'Top 12% of candidates';
    } else if (totalScore >= 50) {
      tierName = 'Competitive Tier ⚡';
      tierBadgeClass = 'tier-competitive';
      tierTarget = 'Product Startups & IT Service Giants (₹7-14 LPA)';
      percentile = 'Top 35% of candidates';
    }

    // ACTIONABLE RECOMMENDATIONS TO REACH NEXT TIER
    const recommendations = [];
    if (dsaScore < 20) {
      recommendations.push({
        pillar: 'dsa',
        title: 'Solve 3 More Medium DSA Problems',
        impact: '+5 to 7 pts',
        actionLabel: 'Go to DSA Sheet',
        view: 'dsa'
      });
    }
    if (aptScore < 12) {
      recommendations.push({
        pillar: 'aptitude',
        title: 'Complete Quantitative & Logical Aptitude Quizzes',
        impact: '+4 to 6 pts',
        actionLabel: 'Take Aptitude Quiz',
        view: 'prep'
      });
    }
    if (projScore < 12) {
      recommendations.push({
        pillar: 'projects',
        title: 'Add a Fullstack / GitHub Project with Live Demo',
        impact: '+3 to 5 pts',
        actionLabel: '+ Add Project',
        actionModal: 'project-modal'
      });
    }
    if (skillsScore < 12) {
      recommendations.push({
        pillar: 'skills',
        title: 'Add & Verify 2 More Core Tech Skills',
        impact: '+3 pts',
        actionLabel: 'Manage Skills',
        actionModal: 'skills-modal'
      });
    }
    if (resumePoints < 13) {
      recommendations.push({
        pillar: 'resume',
        title: 'Run ATS Resume Audit & Add Quantifiable Metrics',
        impact: '+2 to 4 pts',
        actionLabel: 'Audit Resume',
        actionModal: 'resume-modal'
      });
    }
    if (interviewScore < 12) {
      recommendations.push({
        pillar: 'interview',
        title: 'Assemble a STAR Story & Review Behavioral Questions',
        impact: '+3 to 5 pts',
        actionLabel: 'Practice Interview',
        view: 'prep'
      });
    }

    return {
      totalScore,
      tierName,
      tierBadgeClass,
      tierTarget,
      percentile,
      recommendations: recommendations.slice(0, 3), // Top 3 highest impact actions
      pillars: {
        skills: {
          name: 'Skills & Tech Stack',
          score: skillsScore,
          max: 15,
          percent: Math.round((skillsScore / 15) * 100),
          count: skillsList.length,
          icon: '🛠️',
          summary: `${skillsList.length} verified technical skills in stack`
        },
        dsa: {
          name: 'DSA Mastery',
          score: dsaScore,
          max: 25,
          percent: Math.round((dsaScore / 25) * 100),
          solvedCount: solvedDsaIds.size,
          totalCount: totalProblems,
          easyCount,
          medCount,
          hardCount,
          icon: '📊',
          summary: `${solvedDsaIds.size}/${totalProblems} problems verified in blank workspace`
        },
        aptitude: {
          name: 'Aptitude & Reasoning',
          score: aptScore,
          max: 15,
          percent: Math.round((aptScore / 15) * 100),
          quizCount: quizHistory.length,
          avgScore: aptAvg,
          icon: '🧠',
          summary: quizHistory.length > 0 ? `${quizHistory.length} quizzes taken (Avg: ${aptAvg}%)` : 'No timed quizzes taken yet'
        },
        projects: {
          name: 'Real-World Projects',
          score: projScore,
          max: 15,
          percent: Math.round((projScore / 15) * 100),
          count: projects.length,
          icon: '🚀',
          summary: `${projects.length} verified showcase projects on profile`
        },
        resume: {
          name: 'Resume & ATS Score',
          score: resumePoints,
          max: 15,
          percent: Math.round((resumePoints / 15) * 100),
          atsScore: resume.atsScore || 78,
          fileName: resume.fileName || 'Candidate_Resume.pdf',
          icon: '📄',
          summary: `ATS keyword & format index: ${resume.atsScore || 78}%`
        },
        interview: {
          name: 'Interview & Soft Skills',
          score: interviewScore,
          max: 15,
          percent: Math.round((interviewScore / 15) * 100),
          starCount,
          hrCount,
          icon: '🎙️',
          summary: `${starCount} STAR stories + ${hrCount} HR questions mastered`
        }
      }
    };
  }

  /**
   * Run automated ATS Resume Audit
   */
  static auditResume(resumeText, targetRole = 'Software Engineer') {
    const text = (resumeText || '').toLowerCase();
    
    // 1. Contact & Socials Check
    const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
    const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text) || text.includes('phone') || text.includes('+91');
    const hasGithub = text.includes('github.com') || text.includes('github:');
    const hasLinkedin = text.includes('linkedin.com') || text.includes('linkedin:');

    // 2. Core CS Keywords
    const KEYWORDS = [
      'javascript', 'python', 'java', 'c++', 'react', 'node', 'express',
      'sql', 'mongodb', 'docker', 'aws', 'git', 'api', 'rest',
      'data structures', 'algorithms', 'agile', 'linux', 'testing'
    ];
    const matchedKeywords = KEYWORDS.filter(k => text.includes(k));

    // 3. Quantifiable Impact Metrics
    const hasMetrics = /\b\d+%\b|\b\d+k\b|\b\d+x\b|\b\$\d+|\b\d+\s*(users|clients|requests|ms|seconds|stars)/i.test(text);

    // 4. Action Verbs
    const ACTION_VERBS = ['designed', 'developed', 'implemented', 'optimized', 'architected', 'scaled', 'built', 'reduced', 'increased'];
    const matchedVerbs = ACTION_VERBS.filter(v => text.includes(v));

    // Calculate ATS Score
    let score = 50; // base score
    if (hasEmail) score += 5;
    if (hasPhone) score += 5;
    if (hasGithub) score += 7;
    if (hasLinkedin) score += 5;
    score += Math.min(matchedKeywords.length * 2, 16);
    if (hasMetrics) score += 8;
    score += Math.min(matchedVerbs.length * 1, 6);

    const atsScore = Math.min(Math.max(score, 40), 98);

    const feedback = [];
    if (!hasMetrics) feedback.push('Add quantifiable impact metrics (e.g. "Reduced load time by 34%", "Served 5,000+ users").');
    if (!hasGithub) feedback.push('Include your GitHub profile link to showcase verifiable source code.');
    if (matchedKeywords.length < 6) feedback.push('Increase keyword density for target role: include technologies like SQL, APIs, Docker, and React.');
    if (feedback.length === 0) feedback.push('Great keyword density, clean structure, and strong metric attribution!');

    return {
      atsScore,
      hasEmail,
      hasPhone,
      hasGithub,
      hasLinkedin,
      matchedKeywords,
      matchedVerbs,
      hasMetrics,
      feedback
    };
  }
}
