/**
 * HireCraft - Preparation Hub Dataset
 * Notes, formula cheatsheets, MCQs with instant explanations, and HR interview guides.
 */

export const PREP_DATA = {
  aptitude: {
    title: 'Aptitude & Reasoning',
    description: 'Master quantitative aptitude, logical reasoning, and verbal ability with high-yield formulas and practice tests.',
    subcategories: [
      {
        id: 'quant',
        name: 'Quantitative Aptitude',
        icon: '📐',
        notes: [
          {
            topic: 'Percentages & Profit/Loss',
            summary: 'Core formulas for rapid mental calculation in placement exams.',
            formulas: [
              'Profit % = (Profit / CP) × 100',
              'Loss % = (Loss / CP) × 100',
              'SP = CP × (100 + Gain%) / 100',
              'Single equivalent discount of d1% and d2% = (d1 + d2 - (d1 × d2)/100)%',
              'If Price rises by R%, Consumption must decrease by [R / (100 + R)] × 100%'
            ],
            keyPoints: [
              'Always calculate Profit and Loss with respect to Cost Price (CP) unless explicitly stated otherwise.',
              'Use fractional equivalents for speed: 12.5% = 1/8, 16.67% = 1/6, 33.33% = 1/3, 37.5% = 3/8.'
            ]
          },
          {
            topic: 'Time & Work, Pipes & Cisterns',
            summary: 'The Unit Work / LCM method simplifies almost any time-and-work problem in seconds.',
            formulas: [
              'If A can do a work in x days and B in y days, together they take (x × y) / (x + y) days.',
              'Work Done = Rate × Time. Rate = Total Work / Total Time.',
              'M1 × D1 × H1 / W1 = M2 × D2 × H2 / W2 (Men-Day-Hour work equivalence formula).'
            ],
            keyPoints: [
              'Always assume Total Work as LCM of individual time periods to work with whole numbers instead of fractions.',
              'Inlet pipes have positive rate (+), while outlet/leak pipes have negative rate (-).'
            ]
          },
          {
            topic: 'Speed, Time & Distance (Trains & Boats)',
            summary: 'Relative speed principles and conversion shortcuts.',
            formulas: [
              '1 km/hr = 5/18 m/s | 1 m/s = 18/5 km/hr',
              'Average Speed (equal distances) = 2xy / (x + y)',
              'Relative Speed (Opposite directions) = S1 + S2',
              'Relative Speed (Same direction) = |S1 - S2|',
              'Boat in Stream: Downstream = u + v, Upstream = u - v. Speed of boat in still water = (Downstream + Upstream)/2.'
            ],
            keyPoints: [
              'When a train crosses a pole or standing man, Distance = Length of Train.',
              'When a train crosses a platform or bridge, Distance = Length of Train + Length of Platform.'
            ]
          },
          {
            topic: 'Permutations, Combinations & Probability',
            summary: 'Arrangements vs selections and classical probability models.',
            formulas: [
              'nPr = n! / (n - r)! (Arrangement where order matters)',
              'nCr = n! / [r! × (n - r)!] (Selection where order does NOT matter)',
              'P(Event) = Favorable Outcomes / Total Sample Space',
              'P(A ∪ B) = P(A) + P(B) - P(A ∩ B)',
              'Circular permutation of n distinct items = (n - 1)!'
            ],
            keyPoints: [
              'AND condition = Multiplication principle; OR condition = Addition principle.',
              'Complementary probability: P(At least one) = 1 - P(None).'
            ]
          }
        ],
        quizQuestions: [
          {
            id: 'q_quant_1',
            question: 'A can complete a piece of work in 12 days and B in 18 days. If they work together for 4 days, what fraction of work is left unfinished?',
            options: ['5/12', '7/18', '11/36', '4/9'],
            correctIndex: 3,
            explanation: 'LCM of 12 and 18 is 36 units (Total Work). A’s daily rate = 36/12 = 3 units/day. B’s daily rate = 36/18 = 2 units/day. Combined rate = 3 + 2 = 5 units/day. In 4 days, work done = 4 × 5 = 20 units. Remaining work = 36 - 20 = 16 units. Fraction left = 16 / 36 = 4/9.'
          },
          {
            id: 'q_quant_2',
            question: 'A train 180 meters long is traveling at 72 km/hr. How much time will it take to pass an electric pole completely?',
            options: ['9 seconds', '12 seconds', '8 seconds', '10 seconds'],
            correctIndex: 0,
            explanation: 'Speed in m/s = 72 × (5/18) = 20 m/s. Distance to cover = length of train = 180 m. Time = Distance / Speed = 180 / 20 = 9 seconds.'
          },
          {
            id: 'q_quant_3',
            question: 'An item is marked 40% above cost price and sold at a 20% discount. What is the net profit percentage?',
            options: ['12%', '20%', '16%', '10%'],
            correctIndex: 0,
            explanation: 'Let CP = 100. Marked Price = 140. Discount = 20% of 140 = 28. Selling Price (SP) = 140 - 28 = 112. Profit = SP - CP = 112 - 100 = 12%.'
          },
          {
            id: 'q_quant_4',
            question: 'In how many different ways can the letters of the word "LEADER" be arranged?',
            options: ['720', '360', '180', '120'],
            correctIndex: 1,
            explanation: 'The word "LEADER" has 6 letters, where \'E\' is repeated 2 times. Total permutations = 6! / 2! = 720 / 2 = 360.'
          },
          {
            id: 'q_quant_5',
            question: 'Two dice are rolled simultaneously. What is the probability of getting a sum divisible by 4?',
            options: ['1/4', '1/6', '7/36', '5/36'],
            correctIndex: 0,
            explanation: 'Total outcomes = 6 × 6 = 36. Sums divisible by 4 are 4, 8, 12. Sum 4: (1,3),(2,2),(3,1) = 3 ways. Sum 8: (2,6),(3,5),(4,4),(5,3),(6,2) = 5 ways. Sum 12: (6,6) = 1 way. Total favorable = 3 + 5 + 1 = 9 ways. Probability = 9 / 36 = 1/4.'
          }
        ]
      },
      {
        id: 'logical',
        name: 'Logical Reasoning',
        icon: '🧩',
        notes: [
          {
            topic: 'Blood Relations & Direction Sense',
            summary: 'Diagramming family trees and compass cartesian grids.',
            formulas: [
              'Standard Directions: North (Up), South (Down), East (Right), West (Left)',
              'Displacement = √(Δx² + Δy²) using Pythagoras theorem',
              'Family tree symbols: Square = Male, Circle = Female, Horizontal line = Siblings, Double line = Couple, Vertical line = Generation'
            ],
            keyPoints: [
              'Do not assume gender purely based on names unless indicated by pronouns or relationship keywords.',
              'Remember sun rises in East (shadow points West in morning) and sets in West (shadow points East in evening).'
            ]
          },
          {
            topic: 'Syllogisms & Venn Diagrams',
            summary: 'Rules for categorical propositions and deduction.',
            formulas: [
              'Universal Affirmative: "All A are B" -> If true, "Some A are B" is also true.',
              'Universal Negative: "No A is B" -> Disjoint sets.',
              'Particular Affirmative: "Some A are B" -> Overlapping sets.'
            ],
            keyPoints: [
              'A conclusion is valid ONLY if it follows in ALL possible Venn diagram representations.',
              '"Either / Or" rule applies when: (1) Same subjects/predicates, (2) Both conclusions individually false, (3) One positive and one negative pair (Some + No or All + Some Not).'
            ]
          }
        ],
        quizQuestions: [
          {
            id: 'q_log_1',
            question: 'Pointing to a photograph, Rohit said, "She is the daughter of the only son of my grandfather." How is Rohit related to the girl in the photograph?',
            options: ['Father', 'Brother', 'Uncle', 'Cousin'],
            correctIndex: 1,
            explanation: '"Only son of my grandfather" is Rohit’s father. The girl is the daughter of Rohit’s father, making her Rohit’s sister. Therefore, Rohit is her Brother.'
          },
          {
            id: 'q_log_2',
            question: 'A man walks 5 km South, then turns right and walks 3 km. He turns right again and walks 5 km, then finally turns left and walks 2 km. How far is he from his starting point?',
            options: ['3 km', '5 km', '7 km', '10 km'],
            correctIndex: 1,
            explanation: 'Starts at (0,0). Goes South to (0, -5). Turns right (West) and walks 3 km to (-3, -5). Turns right (North) and walks 5 km to (-3, 0). Turns left (West) and walks 2 km to (-5, 0). Total distance from starting point (0,0) = 5 km West.'
          },
          {
            id: 'q_log_3',
            question: 'Statements: (1) All mangoes are golden in color. (2) No golden colored things are cheap. Conclusions: I. All mangoes are cheap. II. Golden colored mangoes are not cheap.',
            options: ['Only conclusion I follows', 'Only conclusion II follows', 'Both follow', 'Neither follows'],
            correctIndex: 1,
            explanation: 'All mangoes are golden, and no golden things are cheap. Thus, mangoes cannot be cheap. Conclusion I is false. Conclusion II ("Golden colored mangoes are not cheap") directly follows from statement 2.'
          }
        ]
      },
      {
        id: 'verbal',
        name: 'Verbal Ability & English',
        icon: '📖',
        notes: [
          {
            topic: 'Subject-Verb Agreement & Error Spotting',
            summary: 'Golden rules of English grammar frequently tested in campus recruitment.',
            formulas: [
              'Neither/Either of + Plural Noun + Singular Verb (e.g., Neither of the boys is here)',
              'Collective nouns take singular verbs unless individuals act separately.',
              'If subjects are connected by "as well as", "along with", "with", verb agrees with FIRST subject.'
            ],
            keyPoints: [
              'Beware of intervening prepositional phrases between subject and verb.',
              'Words like "Everyone, Somebody, Anybody, Each" are always singular.'
            ]
          }
        ],
        quizQuestions: [
          {
            id: 'q_verb_1',
            question: 'Identify the grammatically correct sentence:',
            options: [
              'The team are playing their best match today.',
              'Neither the manager nor his assistants was present at the conference.',
              'The CEO, along with the directors, is attending the annual summit.',
              'Every student must submit their project tomorrow.'
            ],
            correctIndex: 2,
            explanation: 'When subjects are joined by "along with", the verb agrees with the primary subject ("The CEO" - singular), so "is attending" is grammatically sound.'
          },
          {
            id: 'q_verb_2',
            question: 'Choose the antonym of the word "EPHEMERAL":',
            options: ['Fleeting', 'Transient', 'Permanent', 'Fragile'],
            correctIndex: 2,
            explanation: '"Ephemeral" means lasting for a very short time. The opposite (antonym) is "Permanent".'
          }
        ]
      }
    ]
  },
  technical: {
    title: 'Technical Core CS Subjects',
    description: 'Crisp notes, architecture diagrams, and MCQs for Operating Systems, DBMS, Computer Networks, and OOP / System Design.',
    subcategories: [
      {
        id: 'os',
        name: 'Operating Systems (OS)',
        icon: '💻',
        notes: [
          {
            topic: 'Process vs Thread & CPU Scheduling',
            summary: 'Core execution units, state transitions, and scheduling algorithms.',
            keyPoints: [
              'Process is an executing instance of a program with its own private address space (code, data, heap, stack). Threads share code and heap but have private stacks and registers.',
              'Context switching between threads is faster than processes due to shared memory space and no TLB flush.',
              'CPU Scheduling algorithms: FCFS (Convoy effect), SJF / SRTF (Optimal average waiting time, suffers from starvation), Round Robin (Time quantum based, fair, used in time-sharing systems), Priority Scheduling.'
            ]
          },
          {
            topic: 'Deadlocks & Coffman Conditions',
            summary: 'Conditions necessary for deadlock and avoidance strategies.',
            keyPoints: [
              'All 4 Coffman Conditions must hold simultaneously for deadlock: 1) Mutual Exclusion, 2) Hold and Wait, 3) No Preemption, 4) Circular Wait.',
              'Deadlock Prevention: Invalidate at least one of the four Coffman conditions (e.g. impose total ordering on resources).',
              'Deadlock Avoidance: Banker\'s Algorithm (maintains safe state check before allocating resources).'
            ]
          },
          {
            topic: 'Memory Management & Paging',
            summary: 'Virtual memory, translation lookaside buffer (TLB), and page replacement.',
            keyPoints: [
              'Paging divides virtual memory into fixed-size pages and physical memory into frames. Eliminates external fragmentation, but internal fragmentation may occur in the last page.',
              'Page Replacement Algorithms: FIFO, LRU (Least Recently Used), Optimal (Belady’s optimal - benchmark), LFU.',
              'Belady\'s Anomaly: In FIFO page replacement, increasing page frames can paradoxically increase page faults.'
            ]
          }
        ],
        quizQuestions: [
          {
            id: 'q_os_1',
            question: 'Which of the following page replacement algorithms suffers from Belady’s Anomaly?',
            options: ['LRU', 'Optimal Page Replacement', 'FIFO', 'Clock (Second Chance)'],
            correctIndex: 2,
            explanation: 'FIFO (First-In, First-Out) can exhibit Belady’s Anomaly, where increasing the number of page frames leads to an increase in the number of page faults for certain reference strings.'
          },
          {
            id: 'q_os_2',
            question: 'What is the primary benefit of multithreading over multiprocessing?',
            options: [
              'Complete memory isolation between execution units',
              'Lower context-switch overhead and shared memory space',
              'Immunity to race conditions and deadlocks',
              'Automatic distribution across multiple machines'
            ],
            correctIndex: 1,
            explanation: 'Threads within the same process share the same virtual address space, data, and heap. This avoids TLB flushes and makes thread context-switching significantly faster and lighter than process context switching.'
          },
          {
            id: 'q_os_3',
            question: 'In the Banker’s Algorithm for deadlock avoidance, a state is considered "Safe" if:',
            options: [
              'Deadlocks can never occur in the operating system',
              'The OS can allocate resources to each process in some sequence and still prevent deadlock',
              'All resources are currently completely free',
              'CPU utilization is maintained above 90%'
            ],
            correctIndex: 1,
            explanation: 'A safe state guarantees that there exists at least one safe sequence <P1, P2, ..., Pn> of process execution such that each process can satisfy its maximum resource claims without causing a deadlock.'
          }
        ]
      },
      {
        id: 'dbms',
        name: 'DBMS & SQL',
        icon: '🗄️',
        notes: [
          {
            topic: 'ACID Properties & Transactions',
            summary: 'Guarantees of relational database transactions.',
            keyPoints: [
              'Atomicity: All-or-nothing execution. Handled by Transaction Manager / Rollback logs (WAL - Write-Ahead Logging).',
              'Consistency: Database transitions from one valid state to another, preserving integrity constraints.',
              'Isolation: Concurrent transactions execute without interfering with each other. Levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable.',
              'Durability: Committed changes survive system crashes (stored in non-volatile storage / disk).'
            ]
          },
          {
            topic: 'Normalization (1NF to BCNF)',
            summary: 'Eliminating data redundancy and update/insert/delete anomalies.',
            keyPoints: [
              '1NF: Each cell contains atomic (indivisible) values, no repeating groups.',
              '2NF: Must be in 1NF + No partial functional dependency (non-prime attributes must fully depend on entire Candidate Key).',
              '3NF: Must be in 2NF + No transitive dependency (non-prime attributes cannot depend on other non-prime attributes).',
              'BCNF (Boyce-Codd): For every non-trivial functional dependency X -> Y, X must be a Super Key.'
            ]
          },
          {
            topic: 'Indexing & B+ Trees',
            summary: 'Fast query lookups and storage mechanisms.',
            keyPoints: [
              'B+ Trees keep all actual data pointers at leaf nodes linked in a doubly linked list, enabling rapid range scans and O(log N) point queries.',
              'Clustered Index: Determines physical order of data on disk (only 1 per table). Secondary/Non-Clustered Index: Separate structure containing pointers to table rows.'
            ]
          }
        ],
        quizQuestions: [
          {
            id: 'q_db_1',
            question: 'Which normal form strictly requires that for every functional dependency X -> Y, X must be a super key?',
            options: ['1NF', '2NF', '3NF', 'BCNF'],
            correctIndex: 3,
            explanation: 'BCNF (Boyce-Codd Normal Form) enforces that in every functional dependency X -> Y, the determinant X must be a candidate/super key. It is stricter than 3NF.'
          },
          {
            id: 'q_db_2',
            question: 'Which transaction isolation level prevents Dirty Reads and Non-Repeatable Reads, but allows Phantom Reads?',
            options: ['Read Uncommitted', 'Read Committed', 'Repeatable Read', 'Serializable'],
            correctIndex: 2,
            explanation: 'Repeatable Read locks the rows that are read, preventing dirty reads and non-repeatable reads. However, newly inserted rows (phantoms) matching the query criteria can still appear on subsequent range queries unless Serializable is used.'
          }
        ]
      },
      {
        id: 'cn',
        name: 'Computer Networks (CN)',
        icon: '🌐',
        notes: [
          {
            topic: 'OSI 7 Layers & TCP/IP Model',
            summary: 'Standardized communication stack functions and protocols.',
            keyPoints: [
              'Application Layer: HTTP, HTTPS, FTP, DNS, SMTP (Data)',
              'Transport Layer: TCP (reliable, connection-oriented), UDP (unreliable, low-latency) (Segments/Datagrams)',
              'Network Layer: IP (IPv4, IPv6), ICMP, Routing protocols (Packets)',
              'Data Link Layer: MAC addressing, Ethernet, Switches (Frames)',
              'Physical Layer: Cables, Hubs, Signal transmission (Bits)'
            ]
          },
          {
            topic: 'TCP 3-Way Handshake & Teardown',
            summary: 'Establishing and terminating reliable connections.',
            keyPoints: [
              'Connection Setup: 1) Client -> SYN, 2) Server -> SYN-ACK, 3) Client -> ACK. Connection established.',
              'Connection Teardown (4-Way): 1) Client -> FIN, 2) Server -> ACK, 3) Server -> FIN, 4) Client -> ACK with TIME_WAIT state (2MSL).'
            ]
          },
          {
            topic: 'HTTP vs HTTPS & DNS Resolution',
            summary: 'Web protocols and encryption.',
            keyPoints: [
              'HTTPS runs HTTP over TLS/SSL (port 443 vs 80), providing encryption, data integrity, and server authentication.',
              'DNS resolution hierarchy: Browser cache -> OS resolver -> Recursive Resolver (ISP) -> Root Nameserver (.) -> TLD Nameserver (.com) -> Authoritative Nameserver.'
            ]
          }
        ],
        quizQuestions: [
          {
            id: 'q_cn_1',
            question: 'What is the purpose of the TIME_WAIT state during TCP connection termination?',
            options: [
              'To wait for any retransmitted FIN-ACK packet and ensure the remote host closed properly',
              'To allow more data transfer while closing',
              'To renegotiate encryption keys',
              'To test packet drop rates'
            ],
            correctIndex: 0,
            explanation: 'TIME_WAIT (lasting 2 × Maximum Segment Lifetime) ensures that the final ACK was received by the server. If the final ACK was lost, the server will retransmit FIN, and the client in TIME_WAIT can resend the ACK.'
          },
          {
            id: 'q_cn_2',
            question: 'Which protocol operates on UDP port 53 for standard queries?',
            options: ['HTTP', 'DNS', 'SSH', 'SMTP'],
            correctIndex: 1,
            explanation: 'DNS (Domain Name System) uses UDP port 53 for standard name queries due to UDP’s fast, low-overhead nature (TCP port 53 is used for zone transfers and responses exceeding 512 bytes).'
          }
        ]
      },
      {
        id: 'oop_system',
        name: 'OOP & System Design Basics',
        icon: '🏗️',
        notes: [
          {
            topic: 'Core OOP Pillars & SOLID Principles',
            summary: 'Object-oriented programming and clean software architecture.',
            keyPoints: [
              'Encapsulation (data hiding), Abstraction (hiding implementation details), Inheritance (code reuse), Polymorphism (Compile-time overloading & Runtime overriding).',
              'Single Responsibility Principle: A class should have one, and only one, reason to change.',
              'Open/Closed Principle: Open for extension, closed for modification.',
              'Liskov Substitution: Derived types must be completely substitutable for their base types.',
              'Interface Segregation: Clients should not be forced to depend on interfaces they do not use.',
              'Dependency Inversion: High-level modules should depend on abstractions, not concrete implementations.'
            ]
          },
          {
            topic: 'High-Level System Design Core Building Blocks',
            summary: 'Scaling web applications from 1 to 10M users.',
            keyPoints: [
              'Load Balancers (Nginx, HAProxy, AWS ALB): Distributes incoming traffic using Round Robin, Least Connections, or Consistent Hashing.',
              'Caching (Redis, Memcached): Read-through, Write-through, Write-back caching strategies. Eviction policies: LRU, LFU.',
              'Database Sharding & Replication: Master-Slave for read scaling; Horizontal partitioning (sharding) for write scaling.',
              'Message Queues (Kafka, RabbitMQ): Asynchronous background processing, decoupled services, rate-smoothing.'
            ]
          }
        ],
        quizQuestions: [
          {
            id: 'q_oop_1',
            question: 'Which SOLID principle states that "Subtypes must be substitutable for their base types without altering correctness"?',
            options: ['Single Responsibility', 'Open-Closed', 'Liskov Substitution', 'Interface Segregation'],
            correctIndex: 2,
            explanation: 'Liskov Substitution Principle (LSP) ensures that any child class can replace its parent class without breaking client expectations.'
          }
        ]
      }
    ]
  },
  hr: {
    title: 'HR & Behavioral Interview Prep',
    description: 'Master behavioral questions using the STAR framework, view winning sample responses, and practice your answers.',
    questions: [
      {
        id: 'hr_1',
        category: 'Personal & Introduction',
        question: 'Tell me about yourself / Walk me through your resume.',
        purpose: 'Assesses communication clarity, career trajectory, core strengths, and culture alignment.',
        strategy: 'Use the Present-Past-Future framework: 1) Who you are now & current role/studies, 2) Key academic/project highlights & achievements, 3) Why you are excited about this specific company and role.',
        sampleGoodAnswer: 'I am a final-year Computer Science student at XYZ University with a strong passion for scalable web platforms. Over the past two years, I have built several full-stack projects, including a collaborative code editor using WebSockets and React. Last summer, I interned at ABC Tech, where I optimized backend database queries, cutting endpoint response times by 35%. I am passionate about engineering reliability and cloud infrastructure, which is why I am thrilled to interview for this SDE role at your company.',
        sampleBadAnswer: 'My name is Rahul. I was born in Delhi and did my schooling there. My hobbies are playing cricket and watching movies. I know C, C++, and Java. Looking forward to getting a job here.',
        starExample: null
      },
      {
        id: 'hr_2',
        category: 'Company Alignment',
        question: 'Why do you want to work for our company?',
        purpose: 'Tests whether you have done your research or are just sending mass applications.',
        strategy: 'Reference specific products, engineering culture, technical challenges, or recent company initiatives. Connect them to your personal career aspirations.',
        sampleGoodAnswer: 'I have followed your engineering blog closely, particularly your recent migration to distributed event-driven microservices handling billions of transactions. Having worked with Kafka and Go in my capstone project, the scale and reliability challenges your engineering team solves daily resonate deeply with where I want to grow as an engineer.',
        sampleBadAnswer: 'Because your company is very famous and offers a very good salary package and good brand name.',
        starExample: null
      },
      {
        id: 'hr_3',
        category: 'Behavioral & Conflict',
        question: 'Describe a situation where you had a conflict with a teammate and how you resolved it.',
        purpose: 'Tests emotional intelligence, maturity, communication, and collaborative mindset.',
        strategy: 'Follow the STAR method. Focus on the objective technical disagreement, not personal grudges. Emphasize open communication, data-driven decisions, and a positive team outcome.',
        sampleGoodAnswer: 'During our final semester capstone project, my teammate and I disagreed on whether to use MongoDB or PostgreSQL for our healthcare database. He preferred MongoDB for schema flexibility, while I advocated for Postgres due to ACID compliance and strict patient record relationships. I suggested we benchmark both with sample queries and list pros/cons against project requirements. The benchmark proved Postgres provided better relational integrity for medical histories. We agreed on Postgres, met our sprint milestone on time, and achieved the highest project grade in our department.',
        sampleBadAnswer: 'My teammate was lazy and didn’t write good code. I argued with him and complained to our professor so that he wouldn’t ruin my grade.',
        starExample: {
          situation: 'Developing a multi-user healthcare platform for our college capstone project with a 4-member team.',
          task: 'Select the optimal database architecture while team opinions were split between NoSQL and SQL.',
          action: 'Scheduled a data-driven discussion, created prototype schema benchmarks for query latency, and evaluated ACID transaction requirements.',
          result: 'Achieved consensus on PostgreSQL, eliminated data inconsistency bugs, and successfully delivered the project ahead of deadline.'
        }
      },
      {
        id: 'hr_4',
        category: 'Self-Awareness',
        question: 'What is your greatest strength and your greatest weakness?',
        purpose: 'Evaluates honesty, self-awareness, and whether you take proactive steps to improve.',
        strategy: 'For strengths: Give a relevant technical or interpersonal strength backed by an example. For weakness: Mention a genuine work-related area you have actively been improving with concrete steps.',
        sampleGoodAnswer: 'My greatest strength is my persistence in debugging and root-cause analysis—I enjoy diving into system telemetry to fix elusive bottlenecks. My weakness used to be hesitating to delegate or ask for help early when stuck, which sometimes caused unnecessary stress. Over the past year, I instituted a 30-minute rule: if I cannot make meaningful progress after 30 minutes of deep research, I reach out to mentors with a concise summary of what I tried, which has drastically improved my velocity.',
        sampleBadAnswer: 'My strength is I am a perfectionist. My weakness is I work too hard and care too much about my work.',
        starExample: null
      },
      {
        id: 'hr_5',
        category: 'Long-Term Vision',
        question: 'Where do you see yourself in 5 years?',
        purpose: 'Assesses career commitment, realistic goal-setting, and ambition.',
        strategy: 'Focus on skill depth, engineering ownership, domain expertise, and mentoring junior engineers.',
        sampleGoodAnswer: 'In the next 2-3 years, my goal is to become an indispensable core contributor to the product team, mastering system architecture and deployment lifecycles. By year 5, I aspire to lead technical initiatives as a Senior Engineer, mentoring junior teammates, making key architectural decisions, and driving product roadmaps.',
        sampleBadAnswer: 'I want to be the CEO of this company or start my own startup in 2 years.',
        starExample: null
      }
    ],
    starMethodGuide: {
      title: 'Mastering the STAR Method',
      subtitle: 'The gold standard framework used by Amazon, Google, and top recruiters for behavioral interviews.',
      steps: [
        {
          letter: 'S',
          word: 'Situation',
          description: 'Set the context. Briefly explain who, when, where, and the specific challenge or business context.',
          tip: 'Keep it concise (15-20% of your answer). Avoid excessive background story.'
        },
        {
          letter: 'T',
          word: 'Task',
          description: 'Define your exact role and responsibility in addressing that challenge.',
          tip: 'Clarify what YOU were personally responsible for versus the wider team.'
        },
        {
          letter: 'A',
          word: 'Action',
          description: 'Detail the concrete steps YOU took. Explain why you made those decisions.',
          tip: 'This is the most critical part (50-60% of your response). Use "I", not "We". Show initiative and technical depth.'
        },
        {
          letter: 'R',
          word: 'Result',
          description: 'Quantify the outcome. What happened? What did you learn?',
          tip: 'Use numbers, metrics, percentages, or cost/time savings whenever possible (e.g., "reduced latency by 40%").'
        }
      ]
    }
  }
};
