/**
 * HireCraft - Jobs Dataset
 * Comprehensive tech job listings across top product & service companies and hyper-growth startups.
 */

export const INITIAL_JOBS = [
  {
    id: 'job_1',
    title: 'Software Development Engineer - I (SDE 1)',
    company: 'Google',
    logo: '🔵',
    location: 'Bangalore, India',
    workplaceType: 'Hybrid',
    type: 'Full-time',
    experience: 'Fresher / 0-1 yr',
    experienceLevel: 'fresher',
    domain: 'Software Engineering',
    category: 'sde',
    salary: '₹22,00,000 - ₹32,00,000 / yr',
    stipend: null,
    postedAt: '2 days ago',
    deadline: '2026-10-30',
    applicantsCount: 412,
    rating: 4.6,
    tags: ['C++', 'Java', 'Python', 'Algorithms', 'Distributed Systems'],
    overview: 'Join the Google Core Infrastructure team to build planetary-scale distributed systems that power search, advertising, and cloud platforms.',
    responsibilities: [
      'Design, develop, test, deploy, maintain, and enhance large-scale distributed software solutions.',
      'Manage individual project priorities, deadlines, and deliverables with agile methodologies.',
      'Collaborate with cross-functional teams including product management, UX, and site reliability engineering.',
      'Participate in code reviews, design docs reviews, and mentor intern engineers.'
    ],
    requirements: [
      'B.Tech / M.Tech in Computer Science, Electrical Engineering, or related technical field.',
      'Strong proficiency in C++, Java, or Python with deep understanding of Data Structures & Algorithms.',
      'Solid grasp of Object-Oriented Design, Operating Systems, Computer Networks, and DBMS.',
      'Previous internship experience or notable open-source / competitive programming achievements.'
    ],
    perks: [
      'Comprehensive health, dental, and vision insurance with 100% premium coverage.',
      'Annual equity refresh grants & 401(k) / EPF matching.',
      'Gourmet breakfast, lunch, and dinner on campus.',
      '₹1,20,000 annual learning & education allowance.'
    ]
  },
  {
    id: 'job_2',
    title: 'Software Engineer Intern (Summer 2026)',
    company: 'Amazon',
    logo: '📦',
    location: 'Hyderabad, India',
    workplaceType: 'On-site',
    type: 'Internship',
    experience: 'Fresher (College Students)',
    experienceLevel: 'fresher',
    domain: 'Software Engineering',
    category: 'sde',
    salary: '₹80,000 - ₹1,10,000 / month',
    stipend: '₹1,00,000 / mo',
    postedAt: '1 day ago',
    deadline: '2026-11-15',
    applicantsCount: 890,
    rating: 4.3,
    tags: ['Java', 'AWS', 'Data Structures', 'REST APIs', 'Problem Solving'],
    overview: 'Amazon is hiring SDE Interns for its AWS Core Compute and Prime Video streaming teams. Exceptional interns receive pre-placement offers (PPO).',
    responsibilities: [
      'Build customer-facing web services and microservices running on AWS infrastructure.',
      'Write clean, robust, and well-tested code following best engineering practices.',
      'Implement real-time metric alarms, dashboards, and automated deployment pipelines.',
      'Deliver an end-to-end production feature within the 6-month internship timeline.'
    ],
    requirements: [
      'Currently enrolled in 3rd or 4th year of B.E / B.Tech / M.Tech / MCA with expected graduation in 2026 or 2027.',
      'Strong command over at least one modern programming language (Java, C++, Python).',
      'Solid foundation in CS fundamentals: DSA, OS, Databases, and Networks.',
      'Minimum CGPA of 7.0 / 10.0 with no active backlogs.'
    ],
    perks: [
      'Generous monthly stipend + corporate guest house accommodation for initial 14 days.',
      'Relocation allowance & daily free Amazon cafeteria meals / transport coupons.',
      'Direct mentorship by Principal and Senior SDEs.',
      'Direct pathway to full-time SDE-1 offer.'
    ]
  },
  {
    id: 'job_3',
    title: 'Frontend Engineer (React / Next.js)',
    company: 'Razorpay',
    logo: '💳',
    location: 'Bangalore, India',
    workplaceType: 'Hybrid',
    type: 'Full-time',
    experience: '1-3 years',
    experienceLevel: 'junior',
    domain: 'Frontend Development',
    category: 'frontend',
    salary: '₹16,00,000 - ₹24,00,000 / yr',
    stipend: null,
    postedAt: '3 days ago',
    deadline: '2026-10-15',
    applicantsCount: 245,
    rating: 4.4,
    tags: ['React', 'TypeScript', 'Next.js', 'TailwindCSS', 'Web Performance'],
    overview: 'Shape the future of payments in India. You will build high-conversion checkout flows, merchant dashboards, and banking fintech interfaces used by millions daily.',
    responsibilities: [
      'Develop pixel-perfect, accessible, and high-performance UI components in React and TypeScript.',
      'Optimize Core Web Vitals, load times, and bundle size for lightning-fast checkout experiences.',
      'Collaborate with UI/UX designers, backend engineers, and product managers to launch fintech products.',
      'Maintain and expand Razorpay’s Blade Design System.'
    ],
    requirements: [
      '1+ years of production experience with modern JavaScript / TypeScript and React ecosystem.',
      'Deep understanding of state management (Zustand / Redux / Context), React hooks, and DOM rendering.',
      'Strong mastery of HTML5, CSS3, modern responsive layouts, and cross-browser quirks.',
      'Familiarity with Webpack / Vite, Jest / Vitest, and browser performance profiling.'
    ],
    perks: [
      'Flexible remote work policy with home office setup reimbursement.',
      'Comprehensive wellness cover for employee and immediate family.',
      'ESOP grants with regular liquidity events.',
      'Unlimited book purchasing stipend.'
    ]
  },
  {
    id: 'job_4',
    title: 'TCS Digital / Prime Systems Engineer',
    company: 'Tata Consultancy Services',
    logo: '💼',
    location: 'Multiple Locations (Pan India)',
    workplaceType: 'On-site',
    type: 'Full-time',
    experience: 'Fresher (2025/2026 Batch)',
    experienceLevel: 'fresher',
    domain: 'Software Engineering',
    category: 'sde',
    salary: '₹7,50,000 - ₹9,00,000 / yr',
    stipend: null,
    postedAt: 'Just now',
    deadline: '2026-11-30',
    applicantsCount: 1540,
    rating: 4.1,
    tags: ['Java', 'Python', 'Cloud', 'SQL', 'Aptitude'],
    overview: 'TCS Digital is the premier hiring tier for engineering graduates focusing on NextGen technologies including AI, Cloud Native Engineering, and Cybersecurity.',
    responsibilities: [
      'Develop enterprise-grade cloud applications and microservices for Fortune 500 clients.',
      'Write clean and maintainable code adhering to corporate SDLC and DevOps guidelines.',
      'Troubleshoot technical issues, participate in sprint ceremonies, and write unit test suites.',
      'Undergo specialized certifications in AWS, Azure, or GCP.'
    ],
    requirements: [
      'B.E / B.Tech / M.E / M.Tech / MCA graduates with minimum 65% or 6.5 CGPA throughout 10th, 12th, and UG.',
      'No active backlogs at the time of recruitment process.',
      'Strong problem-solving capability and clear understanding of core programming and SQL.',
      'High performance in TCS National Qualifier Test (NQT) Advanced Section.'
    ],
    perks: [
      'Fast-track career advancement with rapid appraisals.',
      'Health insurance with dependent coverage.',
      'Global deployment opportunities in Europe, US, and APAC regions.',
      'TCS Elevate & Wings certification incentive bonuses.'
    ]
  },
  {
    id: 'job_5',
    title: 'Backend Engineer (Go / Node.js)',
    company: 'Swiggy',
    logo: '🛵',
    location: 'Bangalore, India',
    workplaceType: 'Remote',
    type: 'Full-time',
    experience: '1-3 years',
    experienceLevel: 'junior',
    domain: 'Backend Development',
    category: 'backend',
    salary: '₹18,00,000 - ₹28,00,000 / yr',
    stipend: null,
    postedAt: '4 days ago',
    deadline: '2026-10-25',
    applicantsCount: 310,
    rating: 4.2,
    tags: ['Go', 'Node.js', 'PostgreSQL', 'Redis', 'Kafka', 'System Design'],
    overview: 'Power the delivery engine of India. Work on real-time routing algorithms, high-throughput ordering systems, and sub-second payment confirmation pipelines.',
    responsibilities: [
      'Design and scale microservices handling 250,000+ requests per minute during peak meal hours.',
      'Implement robust message streaming with Apache Kafka and Redis pub/sub.',
      'Optimize database queries, schema designs, and indexing strategies in PostgreSQL and MongoDB.',
      'Ensure 99.99% system availability through automated fault-tolerance and circuit breaking.'
    ],
    requirements: [
      '1 to 3 years of hands-on experience building backend microservices in Golang or Node.js/TypeScript.',
      'Demonstrated understanding of concurrency, event-driven architectures, and caching strategies.',
      'Solid experience with relational databases and query performance tuning.',
      'Bachelor’s or Master’s degree in Computer Science or equivalent practical experience.'
    ],
    perks: [
      '100% remote-first work culture with quarterly in-person offsites.',
      'Food ordering coupons & Swiggy One VIP subscription.',
      'Annual performance bonus & generous ESOP options.',
      'Health insurance including mental wellness counselling.'
    ]
  },
  {
    id: 'job_6',
    title: 'Cloud Solutions & DevOps Engineer',
    company: 'Microsoft',
    logo: '🪟',
    location: 'Noida / Hyderabad',
    workplaceType: 'Hybrid',
    type: 'Full-time',
    experience: '1-3 years',
    experienceLevel: 'junior',
    domain: 'DevOps & Cloud',
    category: 'devops',
    salary: '₹20,00,000 - ₹30,00,000 / yr',
    stipend: null,
    postedAt: '5 days ago',
    deadline: '2026-11-05',
    applicantsCount: 180,
    rating: 4.5,
    tags: ['Azure', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'Linux'],
    overview: 'Join the Azure Developer Experience organization to automate cloud deployments, build resilient Kubernetes clusters, and streamline developer productivity.',
    responsibilities: [
      'Implement Infrastructure as Code (IaC) using Terraform, Bicep, and Azure Resource Manager.',
      'Design and maintain zero-downtime CI/CD deployment pipelines using GitHub Actions.',
      'Manage production Kubernetes (AKS) clusters, ingress controllers, and service meshes.',
      'Monitor telemetry, distributed tracing, and incident response with Azure Monitor and Prometheus.'
    ],
    requirements: [
      '1-3 years of experience managing Linux infrastructure and cloud deployments.',
      'Hands-on proficiency with container orchestration (Docker, Kubernetes) and Terraform.',
      'Scripting capability in Bash, Python, or PowerShell.',
      'Understanding of networking concepts: VPCs, subnets, NAT gateways, DNS, and TLS certificates.'
    ],
    perks: [
      'Annual stock award (RSUs) vesting quarterly.',
      'Tuition reimbursement up to ₹2,50,000 annually.',
      'Gym & wellness reimbursement + on-site sports facilities.',
      'Hybrid flexibility with 2 days work from home.'
    ]
  },
  {
    id: 'job_7',
    title: 'Specialist Programmer (Power Programmer)',
    company: 'Infosys',
    logo: '🏢',
    location: 'Pune / Bangalore / Chennai',
    workplaceType: 'On-site',
    type: 'Full-time',
    experience: 'Fresher (0-1 yr)',
    experienceLevel: 'fresher',
    domain: 'Software Engineering',
    category: 'sde',
    salary: '₹9,50,000 - ₹12,00,000 / yr',
    stipend: null,
    postedAt: '3 days ago',
    deadline: '2026-11-20',
    applicantsCount: 920,
    rating: 4.0,
    tags: ['Python', 'Java', 'Algorithms', 'Full Stack', 'Competitive Programming'],
    overview: 'Specialist Programmer is the elite coding role at Infosys, selected through InfyTQ and HackWithInfy competitions, working on cutting-edge client engineering programs.',
    responsibilities: [
      'Solve complex algorithmic problems and build enterprise core modules.',
      'Design modern microservices architecture and clean APIs.',
      'Lead code refactoring and performance optimization initiatives for strategic accounts.'
    ],
    requirements: [
      'B.E / B.Tech / M.Tech in CS/IT or related branch.',
      'Exceptional competitive programming skills (Codeforces / LeetCode / HackerRank).',
      'Strong knowledge of Advanced DSA (Graphs, DP, Segment Trees) and System Design fundamentals.'
    ],
    perks: [
      'Direct elite compensation bracket for freshers.',
      'Specialized training at the world-renowned Infosys Mysore Global Education Center.',
      'Rapid vertical promotion tracks into Technical Architect roles.'
    ]
  },
  {
    id: 'job_8',
    title: 'Data Science & Machine Learning Intern',
    company: 'Flipkart',
    logo: '🛍️',
    location: 'Bangalore, India',
    workplaceType: 'Hybrid',
    type: 'Internship',
    experience: 'Fresher (Final Year)',
    experienceLevel: 'fresher',
    domain: 'Data Science & AI',
    category: 'data',
    salary: '₹60,000 - ₹85,000 / month',
    stipend: '₹75,000 / mo',
    postedAt: '2 days ago',
    deadline: '2026-10-28',
    applicantsCount: 650,
    rating: 4.3,
    tags: ['Python', 'Machine Learning', 'PyTorch', 'SQL', 'Data Analysis'],
    overview: 'Work with Flipkart Data Science team on product recommendation engines, search rank optimization, fraud detection, and demand forecasting algorithms.',
    responsibilities: [
      'Perform exploratory data analysis (EDA) on terabyte-scale customer purchase datasets.',
      'Build, evaluate, and fine-tune machine learning and deep learning models.',
      'Collaborate with engineering teams to deploy models via lightweight REST endpoints.',
      'Synthesize complex analytical findings into actionable business presentations.'
    ],
    requirements: [
      'Degree in Computer Science, Statistics, Mathematics, or Data Science.',
      'Strong coding skills in Python (NumPy, Pandas, Scikit-Learn, PyTorch or TensorFlow).',
      'Solid grasp of Probability, Linear Algebra, Hypothesis Testing, and SQL.',
      'Prior portfolio projects or Kaggle competition rankings are highly preferred.'
    ],
    perks: [
      'Generous monthly stipend + corporate laptop provided.',
      'Opportunity for full-time conversion based on internship performance.',
      'Subsidized meal plans and office shuttle bus service.'
    ]
  },
  {
    id: 'job_9',
    title: 'Quality Assurance & SDET Engineer',
    company: 'Accenture',
    logo: '🔺',
    location: 'Hyderabad / Gurgaon',
    workplaceType: 'Hybrid',
    type: 'Full-time',
    experience: '1-3 years',
    experienceLevel: 'junior',
    domain: 'Testing & QA',
    category: 'qa',
    salary: '₹8,00,000 - ₹12,00,000 / yr',
    stipend: null,
    postedAt: '6 days ago',
    deadline: '2026-11-10',
    applicantsCount: 190,
    rating: 4.1,
    tags: ['Selenium', 'Java', 'Cypress', 'API Testing', 'Postman', 'Automation'],
    overview: 'Drive quality excellence and test automation for Fortune 500 digital transformation projects. Build end-to-end test suites and automated regression pipelines.',
    responsibilities: [
      'Develop automated UI and API test frameworks using Selenium, Cypress, and RestAssured.',
      'Integrate test suites into Jenkins and Azure DevOps CI/CD pipelines.',
      'Execute load and performance testing with JMeter and analyze response latencies.'
    ],
    requirements: [
      '1 to 3 years experience in software testing and automation engineering.',
      'Hands-on programming knowledge in Java, Python, or JavaScript.',
      'Experience in REST API testing with Postman and Swagger.'
    ],
    perks: [
      'Accenture Learning portal with 20,000+ paid courses and certification sponsorships.',
      'Flexible medical cover & maternity/paternity support.',
      'Employee referral cash bonus programs.'
    ]
  },
  {
    id: 'job_10',
    title: 'Full Stack Engineer (MERN / Next.js)',
    company: 'Atlassian',
    logo: '🔷',
    location: 'Remote (Pan India)',
    workplaceType: 'Remote',
    type: 'Full-time',
    experience: '3+ years',
    experienceLevel: 'mid',
    domain: 'Full Stack Engineering',
    category: 'fullstack',
    salary: '₹30,00,000 - ₹45,00,000 / yr',
    stipend: null,
    postedAt: '1 week ago',
    deadline: '2026-11-25',
    applicantsCount: 160,
    rating: 4.7,
    tags: ['React', 'Node.js', 'GraphQL', 'AWS', 'Micro-frontends', 'TypeScript'],
    overview: 'Join the team building Jira and Confluence, the collaboration tools relied on by over 250,000 organizations and tens of millions of knowledge workers.',
    responsibilities: [
      'Architect robust web applications across frontend React and backend microservices.',
      'Drive technical designs for real-time collaborative editing features and websocket synchronization.',
      'Participate in on-call rotations and champion operational excellence across the squad.'
    ],
    requirements: [
      '3+ years of experience shipping production web applications at scale.',
      'Deep mastery of TypeScript, modern React, Node.js, and relational databases.',
      'Demonstrated experience with AWS or cloud platforms and containerization.'
    ],
    perks: [
      'Anywhere Works policy: Choose to work 100% from home anywhere in India.',
      'Home office allowance and monthly internet reimbursement.',
      'Generous parental leave and dedicated mental health care programs.'
    ]
  }
];
