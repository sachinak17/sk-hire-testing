/**
 * HireCraft - Companies Hiring Process Dataset
 * In-depth recruitment roadmaps, exam patterns, section-wise syllabus, eligibility criteria, and CTC breakdown.
 */

export const COMPANIES_DATA = [
  {
    id: 'google',
    name: 'Google',
    logo: '🔵',
    tier: 'Tier-1 FAANG / Big Tech',
    category: 'product',
    tagline: 'Organize the world’s information and make it universally accessible and useful.',
    ctcRange: {
      internship: '₹1,10,000 - ₹1,30,000 / month',
      fresher: '₹28,00,000 - ₹38,00,000 CTC (Base: ₹16-18L + RSUs: ₹15L/4yrs + Bonus)',
      experienced: '₹45,00,000 - ₹75,00,000+ CTC'
    },
    eligibility: {
      degrees: 'B.E / B.Tech / M.E / M.Tech / MS / Ph.D in CS, IT, ECE, EE or related STEM fields',
      cgpaCutoff: '6.5 / 10.0 or 65% (Google focuses heavily on skill rather than rigid GPA cutoff)',
      backlogs: 'No active backlogs at the time of joining',
      gapYears: 'Gaps permitted with reasonable explanation',
      batch: '2025, 2026 batches & lateral hires'
    },
    examPattern: {
      platform: 'HackerEarth / Google Internal Testing Platform',
      duration: '90 Minutes',
      totalQuestions: '2 Coding Questions',
      negativeMarking: 'No',
      sections: [
        {
          name: 'Problem 1 (Medium - Hard)',
          type: 'Algorithmic Coding',
          questions: 1,
          time: '45 mins',
          focus: 'Arrays, Strings, Two Pointers, Prefix Sums, Binary Search'
        },
        {
          name: 'Problem 2 (Hard)',
          type: 'Advanced DSA',
          questions: 1,
          time: '45 mins',
          focus: 'Dynamic Programming, Trees, Graphs (BFS/DFS, Shortest Path), Trie'
        }
      ]
    },
    syllabus: {
      dsaTopics: [
        'Advanced Dynamic Programming (State compression, DP on trees)',
        'Graph Algorithms (Dijkstra, Topological Sort, Disjoint Set Union / Kruskal)',
        'Binary Search on Answer, Monotonic Stack & Sliding Window',
        'Trie, Segment Tree basics'
      ],
      coreSubjects: [
        'Time & Space Complexity analysis (tight Big-O bounds)',
        'Operating Systems (Concurrency, Mutex, Semaphores, Memory layout)',
        'Object-Oriented Design and clean modular code architecture'
      ]
    },
    rounds: [
      {
        roundNumber: 1,
        title: 'Online Coding Assessment (OA)',
        duration: '90 mins',
        description: '2 algorithmic questions on HackerEarth platform. Passing all visible and hidden test cases is crucial. Code efficiency (O(N) vs O(N^2)) is strictly evaluated.'
      },
      {
        roundNumber: 2,
        title: 'Technical Interview 1 (DSA & Problem Solving)',
        duration: '45-60 mins',
        description: 'Conducted on Google Docs / Google Meet. Live coding with a Google Senior Software Engineer. The interviewer evaluates your problem-solving thought process, clarity of communication, and clean syntax.'
      },
      {
        roundNumber: 3,
        title: 'Technical Interview 2 (Advanced DSA & Edge Cases)',
        duration: '45-60 mins',
        description: 'Focuses on complex data structures (Trees, Graphs, DP). Emphasis on verifying boundary conditions, handling null inputs, and discussing algorithmic trade-offs.'
      },
      {
        roundNumber: 4,
        title: 'Technical Interview 3 (System Architecture & Coding)',
        duration: '45-60 mins',
        description: 'For freshers, deep dive into your academic capstone projects, concurrency challenges, and design choices. For experienced candidates, includes Low-Level Design (LLD).'
      },
      {
        roundNumber: 5,
        title: 'Googliness & Leadership Round',
        duration: '45 mins',
        description: 'Google’s cultural fit interview. Assesses collaboration, intellectual humility, navigating ambiguity, doing the right thing, and pushing boundaries.'
      }
    ],
    tips: [
      'Think out loud: Google interviewers care as much about how you think through an edge case as the final code.',
      'Always start with a brute force approach, analyze its complexity, then optimize systematically.',
      'Practice typing code in plain text editors or Google Docs without syntax highlighting or auto-complete.'
    ]
  },
  {
    id: 'amazon',
    name: 'Amazon',
    logo: '📦',
    tier: 'Tier-1 FAANG / Cloud Giant',
    category: 'product',
    tagline: 'Earth’s most customer-centric company and leading cloud infrastructure provider (AWS).',
    ctcRange: {
      internship: '₹80,000 - ₹1,10,000 / month',
      fresher: '₹28,00,000 - ₹44,00,000 CTC (Base: ₹15-18L + Sign-on Bonus: ₹9L/2yrs + RSUs: ₹15L/4yrs)',
      experienced: '₹40,00,000 - ₹65,00,000+ CTC'
    },
    eligibility: {
      degrees: 'B.E / B.Tech / M.Tech / MCA in CS, IT, ECE, EE',
      cgpaCutoff: '6.5+ CGPA or 65% with no active backlogs',
      backlogs: 'Zero active backlogs allowed during application',
      gapYears: 'Up to 1 year gap allowed between education stages',
      batch: '2025, 2026 Batch Graduates'
    },
    examPattern: {
      platform: 'HackerRank / Mettl',
      duration: '105 Minutes',
      totalQuestions: '2 Coding + Work Style Assessment',
      negativeMarking: 'No',
      sections: [
        {
          name: 'Section 1: Coding Challenge',
          type: 'Algorithmic Coding',
          questions: 2,
          time: '70 mins',
          focus: 'Arrays, Strings, HashMaps, Sliding Window, Trees/Graphs'
        },
        {
          name: 'Section 2: Work Style Simulation',
          type: 'Behavioral & Leadership',
          questions: 35,
          time: '20 mins',
          focus: 'Amazon 16 Leadership Principles (Customer Obsession, Ownership, Bias for Action)'
        },
        {
          name: 'Section 3: Work Life Survey',
          type: 'Survey',
          questions: 20,
          time: '15 mins',
          focus: 'Workplace preferences & situational judgement'
        }
      ]
    },
    syllabus: {
      dsaTopics: [
        'Top Amazon Questions: Two Sum, LRU Cache, Course Schedule, Word Break, Rotten Oranges',
        'Tree Traversals (Level Order, Zigzag, LCA)',
        'Priority Queues / Heaps (Top K Frequent, Merge K Sorted Lists)',
        'Dynamic Programming (Coin Change, Longest Increasing Subsequence)'
      ],
      coreSubjects: [
        'Object Oriented Design (Design Parking Lot, Movie Ticket Booking)',
        'Concurrency & Multithreading (Producer-Consumer, Thread Pool)',
        'SQL vs NoSQL (DynamoDB use cases) and Database Indexing'
      ]
    },
    rounds: [
      {
        roundNumber: 1,
        title: 'Online Assessment (OA 1 & OA 2)',
        duration: '105 mins',
        description: 'Contains 2 medium-level coding questions followed by the Amazon Work Style Assessment. Note: Passing the behavioral section is equally vital as passing test cases!'
      },
      {
        roundNumber: 2,
        title: 'Technical Round 1 (Data Structures & LP)',
        duration: '60 mins',
        description: 'Starts with 15-20 minutes of Amazon Leadership Principle questions using the STAR framework, followed by 1-2 medium DSA problems.'
      },
      {
        roundNumber: 3,
        title: 'Technical Round 2 (Algorithms & Problem Solving)',
        duration: '60 mins',
        description: 'Focuses on optimization, scale, and edge cases. Expected to write clean production-quality code with zero syntax errors.'
      },
      {
        roundNumber: 4,
        title: 'The Bar Raiser Round',
        duration: '60 mins',
        description: 'Conducted by an independent Amazon Bar Raiser from a different team. Rigorously tests cultural alignment, customer obsession, and ability to raise the engineering bar.'
      }
    ],
    tips: [
      'Master Amazon\'s 16 Leadership Principles inside-out. Have 2 real STAR stories prepared for each principle.',
      'In coding rounds, always write modular code with meaningful variable names rather than cryptic shorthand.',
      'Explain Time and Space complexity proactively before the interviewer asks.'
    ]
  },
  {
    id: 'tcs',
    name: 'Tata Consultancy Services (TCS)',
    logo: '💼',
    tier: 'Global IT Services Leader',
    category: 'service',
    tagline: 'Building on belief: India’s largest IT consulting and software services provider.',
    ctcRange: {
      internship: '₹15,000 - ₹25,000 / month',
      fresher: 'TCS Ninja: ₹3.36 - ₹3.60 LPA | TCS Digital: ₹7.0 - ₹7.5 LPA | TCS Prime: ₹9.0 - ₹11.5 LPA',
      experienced: '₹6,00,000 - ₹18,00,000 LPA'
    },
    eligibility: {
      degrees: 'B.E / B.Tech / M.E / M.Tech / MCA / M.Sc (CS/IT)',
      cgpaCutoff: 'Minimum 60% or 6.0 CGPA throughout 10th, 12th, Diploma, and Graduation',
      backlogs: 'Maximum 1 active backlog permitted at the time of appearing for the NQT',
      gapYears: 'Up to 24 months academic gap permitted with valid verification',
      batch: 'Final year college graduates'
    },
    examPattern: {
      platform: 'TCS iON Assessment Platform',
      duration: '165 - 180 Minutes',
      totalQuestions: '82 Questions (Foundation + Advanced Sections)',
      negativeMarking: 'No negative marking (Adaptive interface)',
      sections: [
        {
          name: 'Foundation Section (Ninja Qualifier)',
          type: 'Aptitude & Reasoning',
          questions: 60,
          time: '75 mins',
          focus: 'Numerical Ability (20 Qs), Verbal Ability (20 Qs), Reasoning Ability (20 Qs)'
        },
        {
          name: 'Advanced Section (Digital / Prime Qualifier)',
          type: 'Advanced Quant & Reasoning',
          questions: 20,
          time: '35 mins',
          focus: 'Advanced Quantitative & Advanced Reasoning'
        },
        {
          name: 'Advanced Coding Section',
          type: 'Coding Problems',
          questions: 2,
          time: '55 - 70 mins',
          focus: 'Problem 1 (Standard Ninja/Digital level) + Problem 2 (Advanced Prime level)'
        }
      ]
    },
    syllabus: {
      dsaTopics: [
        'Arrays: Frequency counting, Matrix rotations, Trapping rainwater basics',
        'Strings: Palindromes, Anagrams, Substring problems, Pattern matching',
        'Number Theory: GCD/LCM, Prime Factorization, Sieve of Eratosthenes',
        'Recursion, Greedy scheduling, Sorting algorithms'
      ],
      coreSubjects: [
        'Data Types, Pointers, Memory Management (C/C++ basics)',
        'Object-Oriented Programming (Java / Python classes, inheritance)',
        'SQL queries: GROUP BY, HAVING, INNER/OUTER JOINs'
      ]
    },
    rounds: [
      {
        roundNumber: 1,
        title: 'TCS National Qualifier Test (NQT)',
        duration: '180 mins',
        description: 'TCS iON online exam. Performance determines interview track: Top scorers are invited to Digital / Prime interviews, others to Ninja interviews.'
      },
      {
        roundNumber: 2,
        title: 'Technical Interview (TR)',
        duration: '30-45 mins',
        description: 'Includes code walkthrough of solutions written in NQT, discussion on resume projects, core CS fundamentals (OS, DBMS, SQL), and favorite programming language.'
      },
      {
        roundNumber: 3,
        title: 'Managerial Round (MR)',
        duration: '20-30 mins',
        description: 'Problem-solving under stress, project challenges, teamwork, situational questions, and situational roleplay.'
      },
      {
        roundNumber: 4,
        title: 'HR Interview',
        duration: '15-20 mins',
        description: 'Verification of academic documents, willingness to relocate to any TCS delivery center, night shifts policy, and bond/service agreement confirmation.'
      }
    ],
    tips: [
      'There is sectional time limit in TCS iON: you cannot jump between sections, so pace yourself carefully.',
      'Scoring high on the Advanced Coding questions is the direct golden ticket to the ₹9-11 LPA Prime offer.',
      'Be thoroughly prepared to explain every single line of code in your resume projects.'
    ]
  },
  {
    id: 'infosys',
    name: 'Infosys',
    logo: '🏢',
    tier: 'Global IT & Consulting Giant',
    category: 'service',
    tagline: 'Navigate your next: Global technology consulting and digital services pioneer.',
    ctcRange: {
      internship: '₹15,000 - ₹25,000 / month',
      fresher: 'Systems Engineer: ₹3.6 LPA | Digital Specialist Engineer (DSE): ₹6.25 LPA | Specialist Programmer (SP): ₹9.5 - ₹12.0 LPA',
      experienced: '₹6,50,000 - ₹20,00,000 LPA'
    },
    eligibility: {
      degrees: 'B.E / B.Tech / M.E / M.Tech / MCA / M.Sc',
      cgpaCutoff: 'Minimum 60% or 6.0 CGPA in 10th, 12th, and throughout degree',
      backlogs: 'No active backlogs allowed at recruitment stage',
      gapYears: 'Up to 1-2 years allowed with valid reasons',
      batch: '2025, 2026 Batch Graduates'
    },
    examPattern: {
      platform: 'Infosys Assessment Platform (InfyTQ / HackWithInfy)',
      duration: '100 - 180 Minutes',
      totalQuestions: 'Varies by track (Aptitude + Technical MCQs or Direct Coding)',
      negativeMarking: 'No',
      sections: [
        {
          name: 'Section 1: Reasoning Ability',
          type: 'Logical Reasoning',
          questions: 15,
          time: '25 mins',
          focus: 'Critical reasoning, data sufficiency, syllogisms'
        },
        {
          name: 'Section 2: Technical Ability (Math)',
          type: 'Mathematical Ability',
          questions: 10,
          time: '35 mins',
          focus: 'Permutation/Combination, Probability, Speed-Time, Algebra'
        },
        {
          name: 'Section 3: Verbal Ability',
          type: 'Verbal English',
          questions: 20,
          time: '20 mins',
          focus: 'Reading comprehension, error spotting, sentence correction'
        },
        {
          name: 'Section 4: Pseudo-code & Puzzle Solving',
          type: 'Coding Logic',
          questions: 9,
          time: '20 mins',
          focus: 'Bitwise operations, loop execution tracing, algorithmic puzzles'
        }
      ]
    },
    syllabus: {
      dsaTopics: [
        'For SP/DSE: Dynamic Programming, Graph Traversals, Greedy, Disjoint Sets',
        'For SE: Arrays, Strings, Sorting, Searching, Bit Manipulation',
        'Complex recursive relations and backtracking (N-Queens, Sudoku solver concepts)'
      ],
      coreSubjects: [
        'Data Structures: Stacks, Queues, Binary Trees, Linked Lists',
        'DBMS: SQL Subqueries, Joins, Normalization 1NF to 3NF',
        'OOP: Inheritance, Polymorphism, Method Overriding vs Overloading'
      ]
    },
    rounds: [
      {
        roundNumber: 1,
        title: 'Online Assessment / HackWithInfy',
        duration: '100 - 180 mins',
        description: 'Aptitude test for Systems Engineer; 3 intense algorithmic coding challenges for HackWithInfy (Specialist Programmer track).'
      },
      {
        roundNumber: 2,
        title: 'Technical Interview',
        duration: '30-50 mins',
        description: 'Focuses on pseudo-code analysis, writing live algorithms in C++/Java/Python, project architecture, and core CS questions.'
      },
      {
        roundNumber: 3,
        title: 'HR Interview',
        duration: '15-20 mins',
        description: 'Culture fit, communication skills, readiness for Mysore training campus, and career goals.'
      }
    ],
    tips: [
      'Infosys verbal section has tight timing: 20 questions in 20 minutes. Practice speed reading.',
      'HackWithInfy is the premier hackathon to crack ₹9.5 LPA SP role without the traditional aptitude hurdle.',
      'Understand time complexity of standard library functions (e.g. Java Collections and C++ STL).'
    ]
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    logo: '🪟',
    tier: 'Tier-1 FAANG / Tech Titan',
    category: 'product',
    tagline: 'Empower every person and every organization on the planet to achieve more.',
    ctcRange: {
      internship: '₹1,00,000 - ₹1,25,000 / month',
      fresher: '₹40,00,000 - ₹50,00,000 CTC (Base: ₹16-18L + RSUs: $40,000/4yrs + Sign-on: ₹5L)',
      experienced: '₹55,00,000 - ₹90,00,000+ CTC'
    },
    eligibility: {
      degrees: 'B.E / B.Tech / M.Tech / MS in CS / IT / ECE',
      cgpaCutoff: '7.5+ CGPA or 75% in undergraduate degree',
      backlogs: 'Zero active backlogs allowed',
      gapYears: 'Up to 1 year permitted',
      batch: 'Pre-final year (Interns) and Final year (Graduates)'
    },
    examPattern: {
      platform: 'Codility / HackerRank',
      duration: '90 - 105 Minutes',
      totalQuestions: '2 - 3 Coding Problems',
      negativeMarking: 'No',
      sections: [
        {
          name: 'Codility Online Assessment',
          type: 'Coding Problems',
          questions: 3,
          time: '90 mins',
          focus: 'DSA: Arrays, Linked Lists, Trees, Dynamic Programming'
        }
      ]
    },
    syllabus: {
      dsaTopics: [
        'Binary Trees & BSTs (Inorder, Preorder, Boundary Traversal, Diameter, LCA)',
        'Linked Lists (Detect Cycle, Reverse in K-group, Copy with Random Pointer)',
        'Dynamic Programming (Partition Equal Subset Sum, Edit Distance)',
        'Graphs (Bipartite Graph, Word Ladder, Clone Graph)'
      ],
      coreSubjects: [
        'Operating Systems (Virtual Memory, Threads vs Processes, Inter-Process Communication)',
        'Low-Level Design (Design an LRU cache, Rate Limiter, File System)',
        'Clean Code principles, unit testing habits'
      ]
    },
    rounds: [
      {
        roundNumber: 1,
        title: 'Codility Online Test',
        duration: '90 mins',
        description: '2 to 3 coding problems. Tests algorithmic correctness, memory constraints, and handling tricky corner cases.'
      },
      {
        roundNumber: 2,
        title: 'Technical Round 1 (Data Structures)',
        duration: '45-60 mins',
        description: 'Deep focus on Tree, Graph, and Linked List problems. Clean pointer manipulation and space complexity discussion.'
      },
      {
        roundNumber: 3,
        title: 'Technical Round 2 (Algorithms & Problem Solving)',
        duration: '45-60 mins',
        description: 'Challenging DP or Graph scenario. Candidates are expected to explain multiple alternative designs and reason through trade-offs.'
      },
      {
        roundNumber: 4,
        title: 'Technical Round 3 (Design & Projects)',
        duration: '45-60 mins',
        description: 'Discussion of project architecture, concurrency, database schema design, and object-oriented modeling.'
      },
      {
        roundNumber: 5,
        title: 'AA Round (As Appropriate / Partner Director)',
        duration: '45 mins',
        description: 'Interview with a Partner or Director. Combines complex technical discussions with cultural fit, curiosity, and growth mindset.'
      }
    ],
    tips: [
      'Microsoft places immense weight on clean, readable code and unit test coverage.',
      'Demonstrate a Growth Mindset—be receptive to interviewer hints and show eagerness to learn from mistakes.'
    ]
  },
  {
    id: 'accenture',
    name: 'Accenture',
    logo: '🔺',
    tier: 'Global Management & Technology Consulting',
    category: 'service',
    tagline: 'Let there be change: Global professional services company with leading capabilities in digital, cloud, and security.',
    ctcRange: {
      internship: '₹15,000 - ₹25,000 / month',
      fresher: 'Associate Software Engineer (ASE): ₹4.5 LPA | Advanced ASE (AASE): ₹6.5 LPA',
      experienced: '₹7,00,000 - ₹18,00,000 LPA'
    },
    eligibility: {
      degrees: 'B.E / B.Tech / M.E / M.Tech / MCA / M.Sc',
      cgpaCutoff: '65% or 6.5 CGPA in current degree with no active backlogs',
      backlogs: 'Zero active backlogs at assessment time',
      gapYears: 'Up to 11 months gap allowed',
      batch: '2025, 2026 Batch Graduates'
    },
    examPattern: {
      platform: 'Wheebox / CoCubes',
      duration: '135 Minutes (Multi-stage Elimination)',
      totalQuestions: 'Cognitive & Technical (90 Qs) + Coding (2 Qs) + Communication',
      negativeMarking: 'No',
      sections: [
        {
          name: 'Stage 1: Cognitive Assessment',
          type: 'Aptitude & Analytical',
          questions: 50,
          time: '50 mins',
          focus: 'Critical Reasoning, Abstract Reasoning, English Ability'
        },
        {
          name: 'Stage 2: Technical Assessment',
          type: 'Technical MCQs',
          questions: 40,
          time: '40 mins',
          focus: 'Common Applications & MS Office, Pseudo-code, Networking & Cloud Security'
        },
        {
          name: 'Stage 3: Coding Assessment (Elimination)',
          type: 'Coding',
          questions: 2,
          time: '45 mins',
          focus: 'Language of choice (C, C++, Java, Python, .NET)'
        },
        {
          name: 'Stage 4: Communication Assessment',
          type: 'Voice Assessment',
          questions: 'Multiple Modules',
          time: '20 mins',
          focus: 'Pronunciation, fluency, sentence construction, listening'
        }
      ]
    },
    syllabus: {
      dsaTopics: [
        'Array manipulation: Binary array sorting, Pair sums, Subarray sums',
        'String manipulations: Vowel counts, Reverse words, String matching',
        'Basic recursion, Mathematical series, Bitwise XOR operations'
      ],
      coreSubjects: [
        'Cloud basics (SaaS, IaaS, PaaS, Public vs Private Cloud)',
        'Computer Networks: Subnetting, Firewalls, Protocols',
        'Software Engineering: Agile, Scrum, Testing methodologies'
      ]
    },
    rounds: [
      {
        roundNumber: 1,
        title: 'Cognitive + Technical Assessment (Stage 1 & 2)',
        duration: '90 mins',
        description: '90 MCQs. Elimination round: Must clear overall and sectional cutoff to immediately unlock the coding test.'
      },
      {
        roundNumber: 2,
        title: 'Coding Assessment (Stage 3)',
        duration: '45 mins',
        description: '2 coding problems. High score qualifies you for the higher Advanced ASE (₹6.5 LPA) role.'
      },
      {
        roundNumber: 3,
        title: 'Communication Assessment (Stage 4)',
        duration: '20 mins',
        description: 'Automated AI voice tool testing spoken English proficiency, listening recall, and impromptu storytelling.'
      },
      {
        roundNumber: 4,
        title: 'Technical & HR Composite Interview',
        duration: '25-35 mins',
        description: 'Single comprehensive panel interview testing resume projects, technical foundations, adaptability, and shift willingness.'
      }
    ],
    tips: [
      'Do not skip pseudo-code preparation—Accenture tests tricky bitwise and recursion tracing questions.',
      'Use a quality noise-canceling headset for the communication assessment to avoid microphone noise penalties.'
    ]
  },
  {
    id: 'goldman_sachs',
    name: 'Goldman Sachs',
    logo: '💰',
    tier: 'Tier-1 Global Investment Bank',
    category: 'fintech',
    tagline: 'Leading global financial institution that delivers a broad range of financial services.',
    ctcRange: {
      internship: '₹1,00,000 - ₹1,50,000 / month',
      fresher: '₹24,00,000 - ₹34,00,000 CTC (Base: ₹18-20L + Performance Bonus: ₹4-6L + Relocation)',
      experienced: '₹35,00,000 - ₹60,00,000+ CTC'
    },
    eligibility: {
      degrees: 'B.E / B.Tech / M.Tech / Dual Degree in any engineering stream',
      cgpaCutoff: '7.0+ CGPA or 70%',
      backlogs: 'Zero active backlogs',
      gapYears: 'Up to 1 year gap permitted',
      batch: 'Final and pre-final year campus candidates'
    },
    examPattern: {
      platform: 'HackerRank (Aptitude + Math + Coding + CS)',
      duration: '135 Minutes',
      totalQuestions: 'Aptitude (20 Qs) + Math/Stats (10 Qs) + Coding (2 Qs) + CS MCQs (10 Qs)',
      negativeMarking: 'Yes (-1 for wrong MCQs, +5 for correct)',
      sections: [
        {
          name: 'Section 1: Numerical Computations',
          type: 'Math & Quantitative',
          questions: 8,
          time: '25 mins',
          focus: 'Advanced math, Permutations, Probability, Calculus'
        },
        {
          name: 'Section 2: Reasoning & Logic',
          type: 'Analytical',
          questions: 10,
          time: '25 mins',
          focus: 'Logical deductions, pattern series, brain teasers'
        },
        {
          name: 'Section 3: Coding Challenge',
          type: 'Algorithmic Coding',
          questions: 2,
          time: '60 mins',
          focus: 'Arrays, Strings, HashMaps, Dynamic Programming, Graphs'
        },
        {
          name: 'Section 4: Computer Science MCQs',
          type: 'CS Fundamentals',
          questions: 7,
          time: '25 mins',
          focus: 'OS, DBMS, Data Structures, OOP'
        }
      ]
    },
    syllabus: {
      dsaTopics: [
        'HashMaps & Frequency Tables (High frequency in GS)',
        'Math & Number Theory (Prime factorizations, modular arithmetic)',
        'Dynamic Programming & Matrix Traversals',
        'Tree Traversals and Heaps'
      ],
      coreSubjects: [
        'Probability, Statistics, Expectation values',
        'Operating Systems (Threads, Sockets, Locks, Race conditions)',
        'Database transaction isolation levels & query indexing'
      ]
    },
    rounds: [
      {
        roundNumber: 1,
        title: 'Aptitude & Technical OA',
        duration: '135 mins',
        description: 'Comprehensive test on HackerRank with negative marking. High emphasis on probability and mathematical logic.'
      },
      {
        roundNumber: 2,
        title: 'Technical Round 1 (Math & DSA)',
        duration: '45-60 mins',
        description: 'DSA coding plus probability puzzles (e.g. Monty Hall problem, expected coin flips).'
      },
      {
        roundNumber: 3,
        title: 'Technical Round 2 (System Design & Code Optimization)',
        duration: '45-60 mins',
        description: 'Focus on low-latency systems, memory optimization, data structures, and edge-case handling.'
      },
      {
        roundNumber: 4,
        title: 'Hiring Manager & Leadership Round',
        duration: '45 mins',
        description: 'Behavioral, integrity, teamwork under pressure, and alignment with Goldman Sachs core principles.'
      }
    ],
    tips: [
      'Practice probability and mathematical expectation questions alongside standard LeetCode DSA.',
      'Be cautious of negative marking in the Online Assessment—skip uncertain MCQs.'
    ]
  }
];
