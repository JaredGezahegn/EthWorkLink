export const locations = [
  "Addis Ababa",
  "Dire Dawa",
  "Hawassa",
  "Bahir Dar",
  "Mekelle",
  "Adama",
  "Jimma",
  "Gondar",
];

export const serviceCategories = [
  { id: "electrician", icon: "Zap", label: "electrician" as const },
  { id: "plumbing", icon: "Droplets", label: "plumbing" as const },
  { id: "construction", icon: "HardHat", label: "construction" as const },
  { id: "it", icon: "Monitor", label: "itServices" as const },
  { id: "cleaning", icon: "Sparkles", label: "cleaning" as const },
  { id: "tutoring", icon: "GraduationCap", label: "tutoring" as const },
];

export const featuredCompanies = [
  {
    id: 1,
    name: "Ethio Electric Solutions",
    rating: 4.8,
    location: "Addis Ababa",
    category: "Electrician",
    description: "Leading electrical services provider in Ethiopia with over 10 years of experience in residential and commercial electrical installations.",
    services: ["Wiring Installation", "Electrical Repair", "Solar Panel Setup"],
    jobPosts: [
      { title: "Senior Electrician", salary: "15,000 ETB/month" },
      { title: "Electrical Apprentice", salary: "8,000 ETB/month" },
    ],
    reviews: [
      { user: "Abebe T.", rating: 5, comment: "Excellent work, very professional team." },
      { user: "Sara M.", rating: 4, comment: "Good service, arrived on time." },
    ],
  },
  {
    id: 2,
    name: "Habesha Construction PLC",
    rating: 4.5,
    location: "Dire Dawa",
    category: "Construction",
    description: "Full-service construction company specializing in residential buildings, commercial complexes, and infrastructure projects.",
    services: ["Building Construction", "Road Construction", "Renovation"],
    jobPosts: [
      { title: "Project Manager", salary: "25,000 ETB/month" },
      { title: "Civil Engineer", salary: "20,000 ETB/month" },
    ],
    reviews: [
      { user: "Yonas K.", rating: 5, comment: "Built our house perfectly, very satisfied!" },
      { user: "Hiwot D.", rating: 4, comment: "Great quality work." },
    ],
  },
  {
    id: 3,
    name: "TechHub Ethiopia",
    rating: 4.9,
    location: "Addis Ababa",
    category: "IT Services",
    description: "Premier IT consulting and development firm offering cutting-edge technology solutions for businesses across Ethiopia.",
    services: ["Web Development", "Network Setup", "IT Consulting"],
    jobPosts: [
      { title: "Full Stack Developer", salary: "30,000 ETB/month" },
      { title: "IT Support Specialist", salary: "12,000 ETB/month" },
    ],
    reviews: [
      { user: "Meron A.", rating: 5, comment: "Built our company website beautifully." },
      { user: "Daniel G.", rating: 5, comment: "Best IT team in Addis!" },
    ],
  },
  {
    id: 4,
    name: "Clean & Shine Services",
    rating: 4.3,
    location: "Hawassa",
    category: "Cleaning",
    description: "Professional cleaning services for homes, offices, and commercial spaces. Eco-friendly products and trained staff.",
    services: ["Home Cleaning", "Office Cleaning", "Deep Cleaning"],
    jobPosts: [
      { title: "Cleaning Supervisor", salary: "10,000 ETB/month" },
    ],
    reviews: [
      { user: "Tigist B.", rating: 4, comment: "Very thorough cleaning service." },
    ],
  },
  {
    id: 5,
    name: "AquaFix Plumbing",
    rating: 4.6,
    location: "Bahir Dar",
    category: "Plumbing",
    description: "Expert plumbing solutions for residential and commercial buildings. Emergency services available 24/7.",
    services: ["Pipe Installation", "Leak Repair", "Water Heater Installation"],
    jobPosts: [
      { title: "Master Plumber", salary: "14,000 ETB/month" },
    ],
    reviews: [
      { user: "Lemma H.", rating: 5, comment: "Fixed our pipes quickly and affordably." },
    ],
  },
  {
    id: 6,
    name: "EduBridge Tutoring",
    rating: 4.7,
    location: "Mekelle",
    category: "Tutoring",
    description: "Academic tutoring and mentoring services for students from primary school through university level.",
    services: ["Math Tutoring", "English Language", "Science Courses"],
    jobPosts: [
      { title: "Math Tutor", salary: "12,000 ETB/month" },
      { title: "English Tutor", salary: "11,000 ETB/month" },
    ],
    reviews: [
      { user: "Kedir M.", rating: 5, comment: "My son's grades improved dramatically!" },
    ],
  },
];

export const serviceListings = [
  { id: 1, title: "Residential Wiring", company: "Ethio Electric Solutions", rating: 4.8, category: "Electrician", location: "Addis Ababa" },
  { id: 2, title: "Commercial Plumbing", company: "AquaFix Plumbing", rating: 4.6, category: "Plumbing", location: "Bahir Dar" },
  { id: 3, title: "Home Construction", company: "Habesha Construction PLC", rating: 4.5, category: "Construction", location: "Dire Dawa" },
  { id: 4, title: "Web Development", company: "TechHub Ethiopia", rating: 4.9, category: "IT Services", location: "Addis Ababa" },
  { id: 5, title: "Office Deep Cleaning", company: "Clean & Shine Services", rating: 4.3, category: "Cleaning", location: "Hawassa" },
  { id: 6, title: "Math & Science Tutoring", company: "EduBridge Tutoring", rating: 4.7, category: "Tutoring", location: "Mekelle" },
  { id: 7, title: "Solar Panel Installation", company: "Ethio Electric Solutions", rating: 4.8, category: "Electrician", location: "Addis Ababa" },
  { id: 8, title: "Pipe Leak Repair", company: "AquaFix Plumbing", rating: 4.6, category: "Plumbing", location: "Bahir Dar" },
  { id: 9, title: "Road Construction", company: "Habesha Construction PLC", rating: 4.5, category: "Construction", location: "Dire Dawa" },
  { id: 10, title: "Network Infrastructure", company: "TechHub Ethiopia", rating: 4.9, category: "IT Services", location: "Addis Ababa" },
];

export const jobListings = [
  { id: 1, title: "Senior Electrician", company: "Ethio Electric Solutions", location: "Addis Ababa", salary: "15,000 ETB/month", category: "Electrician" },
  { id: 2, title: "Project Manager", company: "Habesha Construction PLC", location: "Dire Dawa", salary: "25,000 ETB/month", category: "Construction" },
  { id: 3, title: "Full Stack Developer", company: "TechHub Ethiopia", location: "Addis Ababa", salary: "30,000 ETB/month", category: "IT Services" },
  { id: 4, title: "Cleaning Supervisor", company: "Clean & Shine Services", location: "Hawassa", salary: "10,000 ETB/month", category: "Cleaning" },
  { id: 5, title: "Master Plumber", company: "AquaFix Plumbing", location: "Bahir Dar", salary: "14,000 ETB/month", category: "Plumbing" },
  { id: 6, title: "Math Tutor", company: "EduBridge Tutoring", location: "Mekelle", salary: "12,000 ETB/month", category: "Tutoring" },
  { id: 7, title: "Electrical Apprentice", company: "Ethio Electric Solutions", location: "Addis Ababa", salary: "8,000 ETB/month", category: "Electrician" },
  { id: 8, title: "Civil Engineer", company: "Habesha Construction PLC", location: "Dire Dawa", salary: "20,000 ETB/month", category: "Construction" },
];

export const seekerRequests = [
  { id: 1, service: "Residential Wiring", company: "Ethio Electric Solutions", status: "pending" as const, date: "2026-02-10" },
  { id: 2, service: "Office Deep Cleaning", company: "Clean & Shine Services", status: "accepted" as const, date: "2026-02-08" },
  { id: 3, service: "Web Development", company: "TechHub Ethiopia", status: "completed" as const, date: "2026-01-25" },
  { id: 4, service: "Pipe Leak Repair", company: "AquaFix Plumbing", status: "rejected" as const, date: "2026-01-20" },
  { id: 5, service: "Math Tutoring", company: "EduBridge Tutoring", status: "pending" as const, date: "2026-02-15" },
];

export const seekerApplications = [
  { id: 1, job: "Full Stack Developer", company: "TechHub Ethiopia", status: "pending" as const, date: "2026-02-12" },
  { id: 2, job: "Senior Electrician", company: "Ethio Electric Solutions", status: "accepted" as const, date: "2026-02-05" },
  { id: 3, job: "Cleaning Supervisor", company: "Clean & Shine Services", status: "rejected" as const, date: "2026-01-28" },
];

export const companyServiceRequests = [
  { id: 1, seeker: "Abebe Kebede", service: "Residential Wiring", date: "2026-02-10", status: "pending" as const },
  { id: 2, seeker: "Sara Mengistu", service: "Solar Panel Installation", date: "2026-02-08", status: "pending" as const },
  { id: 3, seeker: "Yonas Tadesse", service: "Electrical Repair", date: "2026-02-01", status: "accepted" as const },
];

export const companyJobApplicants = [
  { id: 1, applicant: "Daniel Girma", job: "Senior Electrician", date: "2026-02-12", status: "pending" as const },
  { id: 2, applicant: "Hiwot Desta", job: "Electrical Apprentice", date: "2026-02-10", status: "pending" as const },
  { id: 3, applicant: "Meron Assefa", job: "Senior Electrician", date: "2026-02-05", status: "accepted" as const },
];

export const adminUsers = [
  { id: 1, name: "Abebe Kebede", email: "abebe@email.com", role: "seeker" as const, status: "active" as const, date: "2026-01-15" },
  { id: 2, name: "Sara Mengistu", email: "sara@email.com", role: "seeker" as const, status: "active" as const, date: "2026-01-18" },
  { id: 3, name: "Yonas Tadesse", email: "yonas@email.com", role: "seeker" as const, status: "suspended" as const, date: "2026-01-20" },
  { id: 4, name: "Daniel Girma", email: "daniel@email.com", role: "seeker" as const, status: "active" as const, date: "2026-02-01" },
];

export const adminCompanies = [
  { id: 1, name: "Ethio Electric Solutions", owner: "Tekle Hailu", status: "approved" as const, date: "2026-01-10" },
  { id: 2, name: "Habesha Construction PLC", owner: "Mulugeta Abera", status: "approved" as const, date: "2026-01-12" },
  { id: 3, name: "TechHub Ethiopia", owner: "Frehiwot Yilma", status: "approved" as const, date: "2026-01-14" },
  { id: 4, name: "New Plumbing Co.", owner: "Bereket Teshome", status: "pending" as const, date: "2026-02-14" },
  { id: 5, name: "QuickFix Services", owner: "Almaz Gebru", status: "pending" as const, date: "2026-02-16" },
];
