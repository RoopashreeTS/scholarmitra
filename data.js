// ==========================================================================
// ScholarMitra - Comprehensive Verified Indian Scholarship Database
// Production-Grade Dataset with Structured Criteria & Verification Metadata
// ==========================================================================

const SCHOLARSHIPS_DATA = [
  {
    id: "aicte-pragati-girls",
    title: "AICTE Pragati Scholarship for Girl Students",
    provider: "All India Council for Technical Education (AICTE)",
    providerType: "Government",
    amount: 50000,
    amountDisplay: "₹50,000 / year",
    amountNote: "Covers college tuition, exam fees, and annual contingency books allowance",
    deadline: "2026-09-30",
    verified: true,
    lastVerified: "August 2026",
    officialDomain: "aicte-india.org",
    portalName: "AICTE / National Scholarship Portal (NSP)",
    officialUrl: "https://www.aicte-india.org/schemes/students-development-schemes/Pragati",
    category: ["General", "OBC", "SC", "ST", "EWS", "Minority", "Single Girl Child"],
    eligibleCourses: ["B.Tech / BE", "Diploma", "BCA", "MCA"],
    eligibleStates: ["All India"],
    minPercentage: 60,
    maxIncome: 800000,
    maxIncomeDisplay: "Below ₹8,00,000 / year",
    gender: "Female",
    yearOfStudy: ["1st Year", "2nd Year"],
    overview: "A flagship Government of India scheme designed to empower young women pursuing technical degrees and diploma programs at AICTE-approved institutions across India. Awards ₹50,000 annually for up to 4 years.",
    criteriaComparison: {
      course: { required: "B.Tech / BE, Diploma, BCA, or MCA in AICTE-approved institution", minVal: "Technical Degree" },
      academics: { required: "Minimum 60% marks in Class 12 / qualifying diploma exam", minVal: 60 },
      income: { required: "Annual family income not exceeding ₹8,00,000", maxVal: 800000 },
      category: { required: "All social categories eligible (Max 2 girls per family)", special: "Max 2 girl children per family" },
      gender: { required: "Female students only", val: "Female" },
      domicile: { required: "Citizen of India (All States)", val: "All India" }
    },
    requiredDocs: [
      "10th & 12th Standard Marksheet (Min 60%)",
      "AICTE-approved College Admission Allotment Letter",
      "Family Income Certificate (Issued by Tahsildar or higher)",
      "Aadhaar Card & Bank Account linked with NPCI mapper",
      "Tuition Fee Receipt of Current Academic Year",
      "Parents' declaration stating maximum 2 girls in family"
    ],
    timeline: {
      openDate: "01 August 2026",
      lastDate: "30 September 2026",
      verificationWindow: "October 2026",
      disbursement: "Direct Benefit Transfer (DBT) by December 2026"
    },
    tags: ["Government", "Women in STEM", "Technical", "AICTE"]
  },
  {
    id: "ssp-karnataka-postmatric",
    title: "Karnataka SSP Post-Matric Scholarship Scheme",
    provider: "Social Welfare & Backward Classes Dept, Govt. of Karnataka",
    providerType: "Government",
    amount: 45000,
    amountDisplay: "₹25,000 - ₹45,000 / year",
    amountNote: "100% Tuition fee reimbursement + monthly maintenance allowance",
    deadline: "2026-09-12",
    verified: true,
    lastVerified: "August 2026",
    officialDomain: "ssp.postmatric.karnataka.gov.in",
    portalName: "Karnataka State Scholarship Portal (SSP)",
    officialUrl: "https://ssp.postmatric.karnataka.gov.in",
    category: ["SC", "ST", "OBC", "EWS"],
    eligibleCourses: ["B.Tech / BE", "BCA", "B.Sc", "B.Com", "Diploma", "MBBS", "MCA", "Postgraduate", "BA"],
    eligibleStates: ["Karnataka"],
    minPercentage: 50,
    maxIncome: 250000,
    maxIncomeDisplay: "Below ₹2,50,000 / year (OBC) / ₹2.5L-10L (SC/ST)",
    gender: "Any",
    yearOfStudy: ["1st Year", "2nd Year", "3rd Year", "4th Year", "Final Year"],
    overview: "Flagship scholarship initiative by the Government of Karnataka offering full tuition fee waivers, hostel fee subsidies, and monthly maintenance stipends for resident students pursuing higher education.",
    criteriaComparison: {
      course: { required: "Any recognised Undergraduate, Engineering, Medical, or Diploma program in Karnataka", minVal: "Any Degree" },
      academics: { required: "Minimum 50% in previous qualifying examination with no active backlogs", minVal: 50 },
      income: { required: "Family income under ₹2,50,000/year (OBC/EWS) or ₹2.5L-10L (SC/ST)", maxVal: 250000 },
      category: { required: "SC, ST, OBC (Cat-1, 2A, 2B, 3A, 3B), or EWS with valid RD barcode certificate", special: "Valid RD Certificate" },
      gender: { required: "Open to all genders", val: "Any" },
      domicile: { required: "Permanent resident / Domicile of Karnataka", val: "Karnataka" }
    },
    requiredDocs: [
      "Aadhaar Card & Student RD Number",
      "Valid Caste & Income Certificate (RD Number barcode)",
      "SSLC / 10th & PUC / 12th Marks Card",
      "College Admission Allotment & Paid Fee Receipt",
      "Bonafide Study Certificate from Principal / Dean",
      "Aadhaar-seeded Bank Account linked to NPCI mapper"
    ],
    timeline: {
      openDate: "15 July 2026",
      lastDate: "12 September 2026",
      verificationWindow: "September 2026",
      disbursement: "Direct DBT into Aadhaar-seeded account"
    },
    tags: ["Karnataka", "State Quota", "Fee Reimbursement", "Government"]
  },
  {
    id: "reliance-foundation-ug",
    title: "Reliance Foundation Undergraduate Scholarship",
    provider: "Reliance Foundation",
    providerType: "Corporate CSR",
    amount: 200000,
    amountDisplay: "Up to ₹2,00,000 Total",
    amountNote: "Disbursed across the entire course duration + mentorship and leadership programs",
    deadline: "2026-09-30",
    verified: true,
    lastVerified: "August 2026",
    officialDomain: "scholarships.reliancefoundation.org",
    portalName: "Reliance Foundation Portal",
    officialUrl: "https://www.scholarships.reliancefoundation.org",
    category: ["General", "OBC", "SC", "ST", "EWS", "Minority", "PwD"],
    eligibleCourses: ["B.Tech / BE", "BCA", "B.Sc", "B.Com", "BA", "MBBS"],
    eligibleStates: ["All India"],
    minPercentage: 60,
    maxIncome: 1500000,
    maxIncomeDisplay: "Below ₹15,00,000 / year (Priority to < ₹2.5L)",
    gender: "Any",
    yearOfStudy: ["1st Year"],
    overview: "A premier national undergraduate grant supporting 5,000 first-year college students across all streams. Offers financial grants, digital leadership training, and peer network opportunities throughout their degree.",
    criteriaComparison: {
      course: { required: "Full-time 1st year Undergraduate degree in any stream at a recognized Indian college", minVal: "1st Year UG" },
      academics: { required: "Minimum 60% aggregate score in Class 12 Board examinations", minVal: 60 },
      income: { required: "Family income under ₹15,00,000/year (Highest priority to income under ₹2.5L)", maxVal: 1500000 },
      category: { required: "Open to all social categories & backgrounds", special: "Open Merit" },
      gender: { required: "Open to all genders", val: "Any" },
      domicile: { required: "Indian citizen (All States)", val: "All India" }
    },
    requiredDocs: [
      "Passport Size Photograph",
      "Aadhaar Card / Government Photo ID",
      "Class 12th Board Official Marksheet",
      "Bonafide College Enrollment Letter / Student ID Card",
      "Family Income Proof (ITR / Salary Certificate / Tahsildar Certificate)",
      "Online Aptitude Test Completion Record"
    ],
    timeline: {
      openDate: "01 August 2026",
      lastDate: "30 September 2026",
      verificationWindow: "October 2026",
      disbursement: "November 2026"
    },
    tags: ["Corporate CSR", "Merit-cum-Means", "Leadership", "First Year"]
  },
  {
    id: "nsp-post-matric",
    title: "NSP Post-Matric Scholarship for Minorities",
    provider: "Ministry of Minority Affairs (Govt. of India)",
    providerType: "Government",
    amount: 30000,
    amountDisplay: "₹30,000 / year + Admission Fees",
    amountNote: "Maintenance stipend + actual tuition fees subject to scheme ceilings",
    deadline: "2026-09-20",
    verified: true,
    lastVerified: "August 2026",
    officialDomain: "scholarships.gov.in",
    portalName: "National Scholarship Portal (NSP)",
    officialUrl: "https://scholarships.gov.in",
    category: ["Minority", "OBC", "General", "EWS"],
    eligibleCourses: ["B.Tech / BE", "BCA", "B.Sc", "B.Com", "BA", "MBBS", "Diploma", "MCA", "MBA"],
    eligibleStates: ["All India"],
    minPercentage: 50,
    maxIncome: 200000,
    maxIncomeDisplay: "Below ₹2,00,000 / year",
    gender: "Any",
    yearOfStudy: ["1st Year", "2nd Year", "3rd Year", "4th Year", "Final Year"],
    overview: "Provides financial aid to meritorious students belonging to economically weaker sections of notified minority communities (Muslim, Christian, Sikh, Buddhist, Jain, Parsi) for higher education.",
    criteriaComparison: {
      course: { required: "Post-matriculation or technical / professional graduation courses in govt or recognized colleges", minVal: "Post-Matric" },
      academics: { required: "Minimum 50% marks in the previous final examination", minVal: 50 },
      income: { required: "Annual family income not exceeding ₹2,00,000 from all sources", maxVal: 200000 },
      category: { required: "Minority community status (Muslim, Christian, Sikh, Buddhist, Jain, Parsi)", special: "Minority Community" },
      gender: { required: "Open to all genders (30% earmarked for female students)", val: "Any" },
      domicile: { required: "Indian citizen (All States & UTs)", val: "All India" }
    },
    requiredDocs: [
      "Aadhaar Card",
      "Self-Declaration / Certificate of Minority Community",
      "Income Certificate from Competent Revenue Authority",
      "Previous Academic Year Marksheet (Min 50%)",
      "Bonafide Student Certificate from Institution",
      "Fee Receipt of Current Year",
      "Bank Account seeded with Aadhaar (DBT active)"
    ],
    timeline: {
      openDate: "10 July 2026",
      lastDate: "20 September 2026",
      verificationWindow: "October 2026",
      disbursement: "Direct DBT into Aadhaar linked account"
    },
    tags: ["Government", "Minority", "Undergraduate", "Postgraduate"]
  },
  {
    id: "hdfc-parivartan-ecss",
    title: "HDFC Bank Parivartan’s ECSS Programme",
    provider: "HDFC Bank CSR",
    providerType: "Corporate CSR",
    amount: 75000,
    amountDisplay: "₹35,000 - ₹75,000 / year",
    amountNote: "Merit-cum-means assistance covering tuition and educational equipment",
    deadline: "2026-09-18",
    verified: true,
    lastVerified: "August 2026",
    officialDomain: "buddy4study.com",
    portalName: "HDFC Parivartan / Buddy4Study Portal",
    officialUrl: "https://www.buddy4study.com/page/hdfc-bank-parivartans-ecss-programme",
    category: ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    eligibleCourses: ["B.Tech / BE", "BCA", "B.Sc", "B.Com", "BA", "Diploma", "Postgraduate"],
    eligibleStates: ["All India"],
    minPercentage: 55,
    maxIncome: 250000,
    maxIncomeDisplay: "Below ₹2,50,000 / year",
    gender: "Any",
    yearOfStudy: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    overview: "Aims to support students from underprivileged sections who are at risk of dropping out due to financial hardship or sudden personal crises, ensuring uninterrupted completion of degrees.",
    criteriaComparison: {
      course: { required: "Enrolled in standard Undergraduate, Technical, Professional, or Diploma degree", minVal: "Any Degree" },
      academics: { required: "Minimum 55% marks in previous academic year", minVal: 55 },
      income: { required: "Annual family income equal to or less than ₹2,50,000", maxVal: 250000 },
      category: { required: "All categories eligible; priority to students facing personal or economic crisis", special: "Crisis & Low Income" },
      gender: { required: "Open to all genders", val: "Any" },
      domicile: { required: "Indian national residing in India", val: "All India" }
    },
    requiredDocs: [
      "Previous Academic Year Marksheet",
      "Current Year Admission Proof (ID Card / Admission Letter / Fee Receipt)",
      "Income Proof (Govt Issued Certificate / BPL Card / Salary Slip)",
      "Applicant Bank Account Passbook",
      "Aadhaar Card / Government Photo ID",
      "Proof of Family Crisis (if applying under crisis category)"
    ],
    timeline: {
      openDate: "15 July 2026",
      lastDate: "18 September 2026",
      verificationWindow: "October 2026",
      disbursement: "Direct transfer via bank NEFT"
    },
    tags: ["Corporate CSR", "Crisis Relief", "Undergraduate", "Merit-cum-Means"]
  },
  {
    id: "kotak-kanya-scholarship",
    title: "Kotak Kanya Scholarship for Girl Students",
    provider: "Kotak Education Foundation",
    providerType: "Trust / Foundation",
    amount: 150000,
    amountDisplay: "₹1,50,000 / year",
    amountNote: "Continuous annual grant until graduation covering tuition, hostel & study expenses",
    deadline: "2026-09-10",
    verified: true,
    lastVerified: "August 2026",
    officialDomain: "kotakeducation.org",
    portalName: "Kotak Education Foundation Portal",
    officialUrl: "https://kotakeducation.org/kotak-kanya-scholarship/",
    category: ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    eligibleCourses: ["B.Tech / BE", "MBBS", "BCA", "Architecture", "Design", "Integrated Law (LLB)"],
    eligibleStates: ["All India"],
    minPercentage: 75,
    maxIncome: 600000,
    maxIncomeDisplay: "Below ₹6,00,000 / year",
    gender: "Female",
    yearOfStudy: ["1st Year"],
    overview: "Provides substantial financial assistance of ₹1.5 Lakhs per year to meritorious girl students from low-income families pursuing professional degrees in top institutes.",
    criteriaComparison: {
      course: { required: "First-year admission to professional graduation programs (Engineering, MBBS, Law, Design)", minVal: "Professional Degree" },
      academics: { required: "Minimum 75% aggregate marks in Class 12 board examination", minVal: 75 },
      income: { required: "Annual family income not exceeding ₹6,00,000", maxVal: 600000 },
      category: { required: "Open to all social categories", special: "Open Merit" },
      gender: { required: "Female students only", val: "Female" },
      domicile: { required: "Indian citizen (All States)", val: "All India" }
    },
    requiredDocs: [
      "Class 12 Marksheet (Min 75% score)",
      "College Admission Allotment Letter / Entrance Rank Card (JEE, NEET, CET)",
      "Income Certificate / ITR / Form 16",
      "Aadhaar Card",
      "Bank Account Details",
      "Fee Receipt from NAAC/NIRF accredited institution"
    ],
    timeline: {
      openDate: "01 July 2026",
      lastDate: "10 September 2026",
      verificationWindow: "September 2026",
      disbursement: "October 2026"
    },
    tags: ["Foundation", "Women in STEM", "Professional Degree", "High Grant"]
  },
  {
    id: "tata-pankh-scholarship",
    title: "Tata Capital Pankh Scholarship Programme",
    provider: "Tata Capital Limited",
    providerType: "Corporate CSR",
    amount: 50000,
    amountDisplay: "Up to ₹50,000 / year",
    amountNote: "Covers up to 80% of annual course tuition fees",
    deadline: "2026-09-25",
    verified: true,
    lastVerified: "August 2026",
    officialDomain: "tatacapital.com",
    portalName: "Tata Capital CSR Portal",
    officialUrl: "https://www.tatacapital.com/csr",
    category: ["General", "OBC", "SC", "ST", "EWS"],
    eligibleCourses: ["B.Tech / BE", "BCA", "B.Sc", "B.Com", "BA", "Diploma"],
    eligibleStates: ["All India"],
    minPercentage: 60,
    maxIncome: 400000,
    maxIncomeDisplay: "Below ₹4,00,000 / year",
    gender: "Any",
    yearOfStudy: ["1st Year", "2nd Year", "3rd Year"],
    overview: "Tata Capital CSR initiative supporting deserving students pursuing general graduation, technical degrees, and diploma courses to ensure uninterrupted completion of their education.",
    criteriaComparison: {
      course: { required: "Enrolled in Undergraduate (BCA, B.Tech, B.Sc, B.Com) or Diploma courses", minVal: "UG / Diploma" },
      academics: { required: "Minimum 60% marks in the qualifying previous year examination", minVal: 60 },
      income: { required: "Annual family income not exceeding ₹4,00,000", maxVal: 400000 },
      category: { required: "Open to all social categories", special: "Open Merit" },
      gender: { required: "Open to all genders", val: "Any" },
      domicile: { required: "Indian citizen (All States)", val: "All India" }
    },
    requiredDocs: [
      "Photo Identity Proof (Aadhaar Card)",
      "Income Proof issued by competent govt authority",
      "Previous Qualifying Exam Marksheet (Min 60%)",
      "Current Academic Year Fee Receipt",
      "Bank Account Details of Applicant"
    ],
    timeline: {
      openDate: "15 July 2026",
      lastDate: "25 September 2026",
      verificationWindow: "October 2026",
      disbursement: "November 2026"
    },
    tags: ["Corporate CSR", "Tata Group", "Undergraduate", "Fee Assistance"]
  },
  {
    id: "infosys-stem-stars",
    title: "Infosys Foundation STEM Stars Scholarship",
    provider: "Infosys Foundation",
    providerType: "Corporate CSR",
    amount: 100000,
    amountDisplay: "Up to ₹1,00,000 / year",
    amountNote: "Covers tuition, living expenses, and laptop / study materials",
    deadline: "2026-09-28",
    verified: true,
    lastVerified: "August 2026",
    officialDomain: "infosys.com",
    portalName: "Infosys Foundation Portal",
    officialUrl: "https://www.infosys.com/infosys-foundation/stem-stars.html",
    category: ["General", "OBC", "SC", "ST", "EWS"],
    eligibleCourses: ["B.Tech / BE", "BCA", "MBBS", "B.Sc"],
    eligibleStates: ["All India"],
    minPercentage: 70,
    maxIncome: 800000,
    maxIncomeDisplay: "Below ₹8,00,000 / year",
    gender: "Female",
    yearOfStudy: ["1st Year"],
    overview: "Encourages young women to excel in Science, Technology, Engineering, and Mathematics (STEM) by covering tuition, living expenses, and essential study equipment throughout their collegiate degree.",
    criteriaComparison: {
      course: { required: "First-year admission to STEM fields (Engineering, Computer Science, Medicine, Pure Science)", minVal: "STEM Fields" },
      academics: { required: "Minimum 70% in Class 12 with PCM/PCB subjects", minVal: 70 },
      income: { required: "Annual family income not exceeding ₹8,00,000", maxVal: 800000 },
      category: { required: "Open to all categories", special: "Open Merit" },
      gender: { required: "Female students only", val: "Female" },
      domicile: { required: "Indian citizen (All States)", val: "All India" }
    },
    requiredDocs: [
      "Class 12 Passing Certificate & Scorecard",
      "JEE / State CET Scorecard & College Allotment letter",
      "Income Certificate issued by authorized govt officer",
      "Government Photo ID & Address proof",
      "College Fee Structure document"
    ],
    timeline: {
      openDate: "01 August 2026",
      lastDate: "28 September 2026",
      verificationWindow: "October 2026",
      disbursement: "Direct payment to student account"
    },
    tags: ["Infosys", "STEM", "Women in Tech", "Excellence"]
  },
  {
    id: "aicte-saksham-pwd",
    title: "AICTE Saksham Scholarship for Differently-Abled",
    provider: "AICTE, Ministry of Education",
    providerType: "Government",
    amount: 50000,
    amountDisplay: "₹50,000 / year",
    amountNote: "Continuous grant for up to 4 years for technical degree / diploma",
    deadline: "2026-09-15",
    verified: true,
    lastVerified: "August 2026",
    officialDomain: "aicte-india.org",
    portalName: "AICTE National Portal",
    officialUrl: "https://www.aicte-india.org/schemes/students-development-schemes/Saksham",
    category: ["PwD", "General", "OBC", "SC", "ST", "EWS"],
    eligibleCourses: ["B.Tech / BE", "Diploma", "BCA", "MCA"],
    eligibleStates: ["All India"],
    minPercentage: 50,
    maxIncome: 800000,
    maxIncomeDisplay: "Below ₹8,00,000 / year",
    gender: "Any",
    yearOfStudy: ["1st Year", "2nd Year"],
    overview: "Dedicated central government scheme to encourage differently-abled students with not less than 40% disability to pursue technical education with independence and confidence.",
    criteriaComparison: {
      course: { required: "Enrolled in 1st/2nd year Technical Degree or Diploma at AICTE approved college", minVal: "Technical Degree" },
      academics: { required: "Minimum 50% in qualifying previous examination", minVal: 50 },
      income: { required: "Annual family income under ₹8,00,000", maxVal: 800000 },
      category: { required: "Differently-abled students (PwD with min 40% certified disability)", special: "PwD ≥ 40%" },
      gender: { required: "Open to all genders", val: "Any" },
      domicile: { required: "Indian citizen (All States)", val: "All India" }
    },
    requiredDocs: [
      "Disability Certificate (Min 40% disability certified by competent medical authority)",
      "10th & 12th Marksheets",
      "AICTE Institute Admission Letter",
      "Family Income Certificate (< ₹8 LPA)",
      "Aadhaar Card & Bank Passbook"
    ],
    timeline: {
      openDate: "01 August 2026",
      lastDate: "15 September 2026",
      verificationWindow: "September 2026",
      disbursement: "Direct DBT transfer"
    },
    tags: ["Government", "Differently-Abled (PwD)", "Technical", "Empowerment"]
  },
  {
    id: "ongc-merit-scholarship",
    title: "ONGC Merit Scholarship for SC/ST & OBC",
    provider: "Oil and Natural Gas Corporation (ONGC)",
    providerType: "Government PSU",
    amount: 48000,
    amountDisplay: "₹48,000 / year",
    amountNote: "₹4,000 per month stipend throughout standard degree duration",
    deadline: "2026-10-15",
    verified: true,
    lastVerified: "August 2026",
    officialDomain: "ongcscholar.org",
    portalName: "ONGC Scholar Portal",
    officialUrl: "https://ongcscholar.org",
    category: ["SC", "ST", "OBC"],
    eligibleCourses: ["B.Tech / BE", "MBBS", "MBA", "M.Sc"],
    eligibleStates: ["All India"],
    minPercentage: 60,
    maxIncome: 200000,
    maxIncomeDisplay: "Below ₹2,00,000 / year",
    gender: "Any",
    yearOfStudy: ["1st Year"],
    overview: "ONGC Foundation grants financial support to meritorious students from marginalized communities enrolled in full-time engineering, medicine, and management programs across India.",
    criteriaComparison: {
      course: { required: "First-year full-time Engineering (B.Tech), MBBS, MBA, or Master in Geosciences", minVal: "Professional Degree" },
      academics: { required: "Minimum 60% marks in Class 12 / qualifying graduation", minVal: 60 },
      income: { required: "Annual family income not exceeding ₹2,00,000", maxVal: 200000 },
      category: { required: "Must belong to SC, ST, or OBC category with valid certificate", special: "SC / ST / OBC" },
      gender: { required: "Open to all genders (50% earmarked for female students)", val: "Any" },
      domicile: { required: "Indian citizen (All States)", val: "All India" }
    },
    requiredDocs: [
      "Certified copy of Caste Certificate",
      "Proof of Annual Family Income",
      "Class 12th / Graduation Marksheet",
      "Proof of Admission to Professional Degree",
      "Bank Account Details (ECS Mandate Form)",
      "PAN Card / Aadhaar Card"
    ],
    timeline: {
      openDate: "15 August 2026",
      lastDate: "15 October 2026",
      verificationWindow: "November 2026",
      disbursement: "Direct ECS transfer"
    },
    tags: ["PSU", "Merit-cum-Means", "SC/ST/OBC", "Engineering & Medicine"]
  },
  {
    id: "central-sector-csss",
    title: "Central Sector Scheme of Scholarships (CSSS)",
    provider: "Department of Higher Education (MHRD)",
    providerType: "Government",
    amount: 20000,
    amountDisplay: "₹12,000 - ₹20,000 / year",
    amountNote: "₹12,000/yr for 3 years UG, ₹20,000/yr for PG studies",
    deadline: "2026-10-05",
    verified: true,
    lastVerified: "August 2026",
    officialDomain: "scholarships.gov.in",
    portalName: "National Scholarship Portal",
    officialUrl: "https://scholarships.gov.in",
    category: ["General", "OBC", "SC", "ST", "EWS"],
    eligibleCourses: ["B.Tech / BE", "BCA", "B.Sc", "B.Com", "BA", "MBBS", "MCA", "MBA"],
    eligibleStates: ["All India"],
    minPercentage: 80,
    maxIncome: 450000,
    maxIncomeDisplay: "Below ₹4,50,000 / year",
    gender: "Any",
    yearOfStudy: ["1st Year", "2nd Year", "3rd Year", "4th Year", "Final Year"],
    overview: "For meritorious students scoring above the 80th percentile in their relevant stream in Class 12 board examinations to support their day-to-day college expenses.",
    criteriaComparison: {
      course: { required: "Regular full-time undergraduate or postgraduate degree in recognized college", minVal: "Regular Degree" },
      academics: { required: "Above 80th percentile in relevant stream in Class 12 Board exam", minVal: 80 },
      income: { required: "Annual family income not exceeding ₹4,50,000", maxVal: 450000 },
      category: { required: "All categories eligible (50% reservation as per national norms)", special: "Top 20th Percentile" },
      gender: { required: "Open to all genders (50% earmarked for girls)", val: "Any" },
      domicile: { required: "Indian national", val: "All India" }
    },
    requiredDocs: [
      "Class 12th Board Scorecard (Top 20th percentile)",
      "Income Certificate by Revenue Official",
      "College Admission Bonafide",
      "Aadhaar Card",
      "Aadhaar-seeded Bank Account Passbook"
    ],
    timeline: {
      openDate: "01 August 2026",
      lastDate: "05 October 2026",
      verificationWindow: "October 2026",
      disbursement: "Direct DBT payment"
    },
    tags: ["Central Govt", "Top Percentile", "Board Toppers", "All Streams"]
  },
  {
    id: "santoor-womens-scholarship",
    title: "Santoor Women’s Scholarship Programme",
    provider: "Wipro Consumer Care and Wipro Cares",
    providerType: "Corporate CSR",
    amount: 24000,
    amountDisplay: "₹24,000 / year",
    amountNote: "Total ₹72,000 for 3 years standard undergraduate graduation",
    deadline: "2026-09-05",
    verified: true,
    lastVerified: "August 2026",
    officialDomain: "santoorscholarship.com",
    portalName: "Santoor Official Portal",
    officialUrl: "https://www.santoorscholarship.com",
    category: ["General", "OBC", "SC", "ST", "EWS"],
    eligibleCourses: ["BCA", "B.Sc", "B.Com", "BA", "B.Tech / BE", "Diploma"],
    eligibleStates: ["Karnataka", "Andhra Pradesh", "Telangana", "Chhattisgarh"],
    minPercentage: 60,
    maxIncome: 300000,
    maxIncomeDisplay: "Below ₹3,00,000 / year",
    gender: "Female",
    yearOfStudy: ["1st Year"],
    overview: "Dedicated to young women from underprivileged backgrounds who have completed schooling from government schools/colleges to pursue higher graduation.",
    criteriaComparison: {
      course: { required: "Enrolled in 1st year full-time undergraduate degree program", minVal: "1st Year UG" },
      academics: { required: "Passed 10th & 12th from government school/college with min 60%", minVal: 60 },
      income: { required: "Annual family income not exceeding ₹3,00,000", maxVal: 300000 },
      category: { required: "All categories eligible; must have govt school background", special: "Govt School Alum" },
      gender: { required: "Female students only", val: "Female" },
      domicile: { required: "Resident of Karnataka, Andhra Pradesh, Telangana, or Chhattisgarh", val: "Karnataka / AP / TS" }
    },
    requiredDocs: [
      "10th Standard Marks Card (State Board)",
      "12th Standard / Inter Marks Card",
      "College ID / Bonafide Certificate",
      "Aadhaar Card / Voter ID",
      "Bank Account Details"
    ],
    timeline: {
      openDate: "01 July 2026",
      lastDate: "05 September 2026",
      verificationWindow: "September 2026",
      disbursement: "Direct bank transfer"
    },
    tags: ["Wipro Cares", "Women Empowerment", "State Specific", "Undergraduate"]
  },
  {
    id: "keep-india-smiling-colgate",
    title: "Keep India Smiling Foundational Scholarship",
    provider: "Colgate-Palmolive (India) Limited",
    providerType: "Corporate CSR",
    amount: 30000,
    amountDisplay: "₹30,000 / year",
    amountNote: "Annual grant for 3-4 years for undergraduate and professional courses",
    deadline: "2026-09-22",
    verified: false,
    lastVerified: "Verification In Progress",
    officialDomain: "colgate.com",
    portalName: "Colgate CSR Portal",
    officialUrl: "https://www.colgate.com/en-in/scholarship",
    category: ["General", "OBC", "SC", "ST", "EWS"],
    eligibleCourses: ["B.Tech / BE", "BCA", "B.Sc", "B.Com", "BDS", "Diploma"],
    eligibleStates: ["All India"],
    minPercentage: 60,
    maxIncome: 500000,
    maxIncomeDisplay: "Below ₹5,00,000 / year",
    gender: "Any",
    yearOfStudy: ["1st Year"],
    overview: "Aims to provide foundational support to individuals who are deserving and meritorious but may lack the financial resources to pursue their educational dreams.",
    criteriaComparison: {
      course: { required: "Enrolled in 1st year Undergraduate / Vocational degree", minVal: "1st Year UG" },
      academics: { required: "Minimum 60% in Class 12 board examination", minVal: 60 },
      income: { required: "Annual family income not exceeding ₹5,00,000", maxVal: 500000 },
      category: { required: "Open to all categories", special: "Open Merit" },
      gender: { required: "Open to all genders", val: "Any" },
      domicile: { required: "Indian national", val: "All India" }
    },
    requiredDocs: [
      "Passport size photo",
      "Valid ID proof (Aadhaar / PAN)",
      "Income proof (ITR / BPL card / Salary certificate)",
      "Class 12th scorecard (Min 60%)",
      "Fee receipt / College admission letter"
    ],
    timeline: {
      openDate: "15 July 2026",
      lastDate: "22 September 2026",
      verificationWindow: "October 2026",
      disbursement: "Direct payment to student"
    },
    tags: ["Corporate CSR", "Undergraduate", "Under Verification", "Colgate"]
  }
];

// Document master reference for checklist
const REQUIRED_DOCUMENTS_MASTER = [
  {
    id: "doc-aadhaar",
    name: "Aadhaar Card (NPCI Bank-Seeded)",
    category: "Identity & Verification",
    description: "Active Aadhaar with linked mobile number and NPCI mapper mapping for Direct Benefit Transfer (DBT).",
    tips: "Ensure student name and Date of Birth match Class 10 records exactly.",
    requiredBy: "All Government & CSR Schemes",
    officialCheck: "Verify via UIDAI Portal"
  },
  {
    id: "doc-income",
    name: "Family Income Certificate",
    category: "Income Verification",
    description: "Valid certificate issued by Tahsildar / Revenue Authority (RD Number in Karnataka).",
    tips: "Must be within validity period (usually 1-3 years from date of issuance).",
    requiredBy: "SSP, NSP, HDFC, AICTE, Tata Pankh",
    officialCheck: "Check RD / Barcode validity"
  },
  {
    id: "doc-caste",
    name: "Caste / Category / Minority Certificate",
    category: "Category Proof",
    description: "SC, ST, OBC, EWS, or Minority certificate issued by competent state authority.",
    tips: "Ensure digital barcode or certificate number is clearly visible on the scan.",
    requiredBy: "SSP Karnataka, MahaDBT, NSP Minority, ONGC",
    officialCheck: "Digital barcode required"
  },
  {
    id: "doc-marks",
    name: "Previous Year Marks Card / Grade Sheet",
    category: "Academic Records",
    description: "10th, 12th (PUC) or latest semester marks sheet stamped/attested by college authority.",
    tips: "Clear scan of original marksheet; avoid photocopies without college stamp.",
    requiredBy: "All Merit & Central Sector Schemes",
    officialCheck: "Minimum marks threshold"
  },
  {
    id: "doc-bonafide",
    name: "Bonafide Student Certificate",
    category: "College Records",
    description: "Study certificate signed by Principal/Dean certifying current academic enrollment for 2026-27.",
    tips: "Ensure current academic year (2026-27) is explicitly printed.",
    requiredBy: "NSP, SSP Karnataka, AICTE Pragati, Reliance",
    officialCheck: "College seal & Principal signature"
  },
  {
    id: "doc-feereceipt",
    name: "College Fee Structure & Paid Fee Receipt",
    category: "Financial Proof",
    description: "Official fee breakdown with challan number or online payment transaction reference ID.",
    tips: "Required for fee reimbursement claims and tuition grants.",
    requiredBy: "SSP Karnataka, HDFC Parivartan, AICTE",
    officialCheck: "Transaction ID / Challan No"
  },
  {
    id: "doc-bank",
    name: "Aadhaar-Seeded Bank Passbook",
    category: "Disbursement Details",
    description: "Passbook front page showing Account No, IFSC code, and student's full name.",
    tips: "Account MUST be in the student's own name and active on NPCI DBT mapper.",
    requiredBy: "All Government & Trust Schemes",
    officialCheck: "Account in student's name"
  },
  {
    id: "doc-photo",
    name: "Passport-Size Photograph & Signature",
    category: "Identity & Verification",
    description: "Recent color photograph on light background (< 200KB) and clear signature scan.",
    tips: "Maintain standard passport 35mm x 45mm proportions in JPG format.",
    requiredBy: "All Application Portals",
    officialCheck: "< 200KB JPG format"
  }
];

// Conversational AI Knowledge Base with Known / Verified / Source structure
const ASSISTANT_KNOWLEDGE_BASE = [
  {
    keywords: ["bca", "computer", "b.tech", "engineering", "tech", "cs", "it"],
    title: "Scholarships for BCA & B.Tech Students",
    knownFacts: [
      "AICTE Pragati provides ₹50,000/yr for female technical students.",
      "Reliance Foundation offers up to ₹2,00,000 for 1st-year students with min 60% in Class 12.",
      "Karnataka SSP provides full/partial tuition fee reimbursement for Karnataka residents (SC/ST/OBC/EWS).",
      "HDFC Parivartan ECSS offers up to ₹75,000 for family income under ₹2.5 Lakhs."
    ],
    needsVerification: "Check whether your institution is AICTE-approved for government schemes.",
    officialSource: "AICTE Portal (aicte-india.org) & NSP (scholarships.gov.in)",
    suggestedAction: "Go to Explorer and filter by course 'BCA' or 'B.Tech'."
  },
  {
    keywords: ["ssp", "karnataka", "state scholarship portal", "rd number"],
    title: "Karnataka State Scholarship Portal (SSP) Guidance",
    knownFacts: [
      "Open for 2026-27 academic year for Karnataka domicile students.",
      "Requires a valid RD Number for Caste and Income certificates (< ₹2.5L).",
      "Disbursement is made directly through Aadhaar-seeded bank accounts (DBT).",
      "Covers tuition fee reimbursement plus annual maintenance stipend."
    ],
    needsVerification: "Verify your bank account is mapped on the NPCI Aadhaar mapper.",
    officialSource: "Karnataka SSP Portal (ssp.postmatric.karnataka.gov.in)",
    suggestedAction: "Check our Document Checklist to ensure your RD Number is ready."
  },
  {
    keywords: ["documents", "doc", "checklist", "certificate", "aadhaar", "income cert"],
    title: "Mandatory Document Checklist for Scholarship Applications",
    knownFacts: [
      "Aadhaar Card with active mobile link & NPCI bank seeding.",
      "Current valid Income Certificate issued by Revenue Authority.",
      "Caste / Category Certificate with digital barcode (if claiming reservation).",
      "Previous year original marks card attested by college.",
      "College Bonafide Certificate for 2026-27."
    ],
    needsVerification: "Ensure Income Certificate is not older than allowed validity (usually 1-3 years).",
    officialSource: "National Scholarship Portal Guidelines (scholarships.gov.in)",
    suggestedAction: "Open 'My Documents' in the top menu to track your 8-document readiness."
  },
  {
    keywords: ["income", "2.5", "below 2.5", "low income", "poor", "financial", "family income"],
    title: "Scholarships for Family Income Below ₹2.5 Lakhs",
    knownFacts: [
      "Karnataka SSP Post-Matric: Max tuition fee reimbursement for OBC/SC/ST/EWS.",
      "NSP Post-Matric for Minorities: ₹30,000/yr + fee aid.",
      "HDFC Bank Parivartan ECSS: Up to ₹75,000/yr for underprivileged students.",
      "Tata Capital Pankh Scholarship: Up to ₹50,000/yr (80% fee coverage)."
    ],
    needsVerification: "Income certificate must be in parents' name with student listed as dependent.",
    officialSource: "Revenue Department State Portals",
    suggestedAction: "Select Income 'Under ₹2.5L' in Explorer to see all qualifying schemes."
  },
  {
    keywords: ["girls", "women", "female", "girl child", "stem"],
    title: "Dedicated Scholarships for Female Students",
    knownFacts: [
      "Kotak Kanya Scholarship: ₹1,50,000/year for professional degrees (Min 75% in 12th).",
      "AICTE Pragati: ₹50,000/year for girls in engineering and technical programs.",
      "Infosys Foundation STEM Stars: ₹1,00,000/year covering tuition, living & books.",
      "Santoor Women’s Scholarship: ₹24,000/year for girls from government schools."
    ],
    needsVerification: "Some schemes require declaration that there are no more than 2 girl beneficiaries in the family.",
    officialSource: "AICTE & Corporate Foundation Guidelines",
    suggestedAction: "Filter by Category 'Female Only Schemes' in Explorer."
  },
  {
    keywords: ["multiple", "two scholarships", "can i apply for both"],
    title: "Rules on Applying for Multiple Scholarships",
    knownFacts: [
      "You can apply for multiple scholarships during the discovery phase.",
      "Government + Government: You can accept only ONE government tuition scholarship at a time (DBT Aadhaar duplicate check).",
      "Government + Private CSR: Most CSR scholarships (Tata, HDFC, Reliance) allow combining with non-conflicting government aid, provided total funding does not exceed actual tuition and educational expenses."
    ],
    needsVerification: "Always check the specific terms on the official application portal before final acceptance.",
    officialSource: "Ministry of Education DBT Guidelines",
    suggestedAction: "Apply to multiple schemes and choose the highest-value award if selected."
  }
];
