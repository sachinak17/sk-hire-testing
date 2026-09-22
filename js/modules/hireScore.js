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
    const resume = state.resumeProfile || {};
    const atsScore = (resume.fileName && resume.fileName.trim()) ? (resume.atsScore || 0) : 0;
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
        title: 'Complete Core CS & Technical Assessment Quizzes',
        impact: '+4 to 6 pts',
        actionLabel: 'Take Technical Quiz',
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
          name: 'Core CS & Assessment Quizzes',
          score: aptScore,
          max: 15,
          percent: Math.round((aptScore / 15) * 100),
          quizCount: quizHistory.length,
          avgScore: aptAvg,
          icon: '💻',
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
          atsScore,
          fileName: resume.fileName || '',
          fileSize: resume.fileSize || '',
          fileType: resume.fileType || '',
          lastAudited: resume.lastAudited || '',
          icon: '📄',
          summary: (resume.fileName && resume.fileName.trim()) 
            ? `ATS keyword & format index: ${atsScore}%` 
            : 'No resume uploaded yet (0/15 pts)'
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
   * Run automated ATS Resume Audit with deep keyword, metrics, contact, and role alignment
   */
  static auditResume(resumeText, targetRole = 'Software Development Engineer (SDE-1)') {
    const rawText = (resumeText || '').trim();
    if (!rawText) {
      return {
        atsScore: 0,
        tierLabel: 'No Resume Content',
        wordCount: 0,
        contacts: { hasEmail: false, hasPhone: false, hasGithub: false, hasLinkedin: false, hasPortfolio: false },
        contactsCount: 0,
        matchedKeywords: [],
        missingKeywords: ['JavaScript', 'Python', 'React', 'SQL', 'Docker'],
        matchedVerbs: [],
        hasMetrics: false,
        metricCount: 0,
        detectedSections: [],
        feedback: ['No resume uploaded yet. Upload a real PDF or Word resume from your drive to evaluate ATS score.']
      };
    }

    const text = rawText.toLowerCase();
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    
    // 1. Contact & Socials Check
    const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
    const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text) || 
                     /\+?91[\s-]?\d{10}/.test(text) || 
                     /\b[6-9]\d{9}\b/.test(text) || 
                     text.includes('phone') || text.includes('contact');
    const hasGithub = text.includes('github.com') || text.includes('github:') || text.includes('gh/');
    const hasLinkedin = text.includes('linkedin.com') || text.includes('linkedin:') || text.includes('in/');
    const hasPortfolio = text.includes('portfolio') || text.includes('vercel.app') || text.includes('netlify.app') || text.includes('github.io');

    let contactsCount = 0;
    if (hasEmail) contactsCount++;
    if (hasPhone) contactsCount++;
    if (hasGithub) contactsCount++;
    if (hasLinkedin) contactsCount++;
    if (hasPortfolio) contactsCount++;

    // 2. Keyword Dictionaries
    const BASE_TECH_KEYWORDS = [
      'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'sql', 'html', 'css',
      'react', 'node', 'express', 'postgresql', 'mongodb', 'docker', 'aws', 'git', 'github',
      'data structures', 'algorithms', 'system design', 'rest', 'api', 'linux', 'testing'
    ];

    const ROLE_SPECIALIZATIONS = {
      'Frontend': ['react', 'next.js', 'vue', 'angular', 'tailwind', 'typescript', 'redux', 'webpack', 'css3', 'responsive'],
      'Backend': ['node', 'express', 'python', 'django', 'fastapi', 'spring', 'postgresql', 'mongodb', 'redis', 'microservices', 'rest'],
      'Full Stack': ['react', 'node', 'express', 'postgresql', 'mongodb', 'typescript', 'api', 'docker', 'git', 'tailwind'],
      'DevOps': ['docker', 'kubernetes', 'aws', 'ci/cd', 'terraform', 'linux', 'bash', 'jenkins', 'cloud', 'git'],
      'Data': ['python', 'sql', 'machine learning', 'pandas', 'numpy', 'tensorflow', 'pytorch', 'scikit', 'etl', 'deep learning']
    };

    // Determine relevant role keywords
    let roleKeywords = BASE_TECH_KEYWORDS;
    for (const [key, list] of Object.entries(ROLE_SPECIALIZATIONS)) {
      if (targetRole.toLowerCase().includes(key.toLowerCase())) {
        roleKeywords = [...new Set([...BASE_TECH_KEYWORDS, ...list])];
        break;
      }
    }

    const matchedKeywords = roleKeywords.filter(k => text.includes(k));
    const missingKeywords = roleKeywords.filter(k => !text.includes(k)).slice(0, 5);

    // 3. Quantifiable Impact Metrics
    const metricMatches = text.match(/\b\d+(?:\.\d+)?%|\b[\d,]+k\b|\b\d+x\b|\b\$\d+|\b[\d,]+\+?\s*(?:active\s*)?(users|clients|requests|resumes|ms|milliseconds|seconds|stars|downloads|rps|tps|qps|queries|hours|uptime)/gi) || [];
    const hasMetrics = metricMatches.length > 0;

    // 4. Action Verbs
    const ACTION_VERBS = [
      'designed', 'developed', 'implemented', 'optimized', 'architected', 'scaled',
      'built', 'reduced', 'increased', 'automated', 'engineered', 'deployed', 'refactored', 'created'
    ];
    const matchedVerbs = ACTION_VERBS.filter(v => text.includes(v));

    // 5. Sections Detection
    const sections = ['skills', 'experience', 'projects', 'education', 'certifications'];
    const detectedSections = sections.filter(s => text.includes(s));

    // Calculate Balanced Weighted ATS Score (0-100)
    let score = 40; // baseline
    // Contact Info (up to 20 pts)
    if (hasEmail) score += 5;
    if (hasPhone) score += 5;
    if (hasGithub) score += 5;
    if (hasLinkedin) score += 5;

    // Keywords (up to 24 pts)
    score += Math.min(matchedKeywords.length * 2, 24);

    // Impact Metrics (up to 10 pts)
    score += Math.min(metricMatches.length * 3, 10);

    // Action Verbs (up to 6 pts)
    score += Math.min(matchedVerbs.length * 1.5, 6);

    // Sections detected (up to 5 pts)
    score += Math.min(detectedSections.length * 1.25, 5);

    // Length check: ensure resume has enough substance
    if (wordCount >= 70) score += 3;

    const atsScore = Math.min(Math.max(Math.round(score), 35), 98);

    // Tier Label
    let tierLabel = 'Foundation Match (Needs Refinement)';
    if (atsScore >= 85) {
      tierLabel = '💎 Exceptional Recruiter Match (Tier 1 Ready)';
    } else if (atsScore >= 70) {
      tierLabel = '🚀 Strong ATS Compatibility (Tier 2/Unicorn Ready)';
    } else if (atsScore >= 55) {
      tierLabel = '⚡ Moderate Match (Add Metrics & Tech Keywords)';
    }

    // Recruiter Feedback
    const feedback = [];
    if (!hasMetrics) {
      feedback.push('Add quantifiable impact metrics (e.g. "Reduced query latency by 35%", "Served 2,500+ active users").');
    } else {
      feedback.push(`Strong metric attribution detected (${metricMatches.length} quantifiable data points found).`);
    }

    if (!hasGithub) {
      feedback.push('Include a verifiable GitHub profile link showing active commits and repositories.');
    }
    if (!hasLinkedin) {
      feedback.push('Add your LinkedIn profile URL so recruiters can verify credentials and network.');
    }

    if (missingKeywords.length > 0 && matchedKeywords.length < 10) {
      feedback.push(`Increase keyword coverage for ${targetRole}: Consider highlighting ${missingKeywords.slice(0, 4).join(', ')}.`);
    }

    if (matchedVerbs.length < 3) {
      feedback.push('Start bullet points with strong action verbs (e.g., "Architected", "Engineered", "Optimized", "Scaled").');
    }

    if (feedback.length === 0) {
      feedback.push('Exceptional structure, high keyword density, and strong quantifiable achievements!');
    }

    return {
      atsScore,
      tierLabel,
      wordCount,
      contacts: {
        hasEmail,
        hasPhone,
        hasGithub,
        hasLinkedin,
        hasPortfolio
      },
      contactsCount,
      matchedKeywords,
      missingKeywords,
      matchedVerbs,
      hasMetrics,
      metricCount: metricMatches.length,
      detectedSections,
      feedback
    };
  }
}
