import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations } from "@/lib/translations";

// Types
export type UserRole = "seeker" | "company" | "admin";
export type Language = "en" | "am"; // Changed from "amh" to "am"
export type RequestStatus = "pending" | "accepted" | "rejected" | "completed";
export type ApplicationStatus = "applied" | "reviewing" | "accepted" | "rejected";
export type CompanyStatus = "pending" | "approved" | "suspended";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  location?: string;
  suspended?: boolean;
}

export interface Company {
  id: string;
  companyName: string;
  ownerName: string;
  email: string;
  password: string;
  category: string;
  location: string;
  description: string;
  status: CompanyStatus;
  rating?: number;
  suspended?: boolean;
  profilePicture?: string;
  subscriptionPlan?: "free" | "monthly" | "sixMonth" | "yearly";
}

export interface Service {
  id: string;
  title: string;
  category: string;
  location: string;
  companyId: string;
  companyName: string;
  description: string;
  price?: string;
  rating?: number;
  photos: string[]; // Array of photo URLs
  completedDate?: string; // When the service was completed
  clientName?: string; // Optional client name
  reviews?: ServiceReview[];
}

export interface ServiceReview {
  id: string;
  serviceId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Job {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  location: string;
  salary: string;
  description: string;
  requirements?: string;
}

export interface ServiceRequest {
  id: string;
  serviceId: string;
  serviceName: string;
  seekerId: string;
  seekerName: string;
  companyId: string;
  companyName: string;
  status: RequestStatus;
  date: string;
  message?: string;
  description?: string; // Service requirements description
  read?: boolean; // Track if company has viewed this request
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  seekerId: string;
  seekerName: string;
  seekerEmail: string;
  companyId: string;
  status: ApplicationStatus;
  date: string;
  coverLetter?: string;
}

interface AppContextType {
  // Auth
  currentUser: User | Company | null;
  login: (email: string, password: string) => { success: boolean; role?: UserRole; message: string };
  logout: () => void;
  registerSeeker: (data: Omit<User, "id" | "role">) => { success: boolean; message: string };
  registerCompany: (data: Omit<Company, "id" | "status" | "subscriptionPlan">) => { success: boolean; message: string; companyId?: string };
  updateCompanySubscription: (companyId: string, plan: "free" | "monthly" | "sixMonth" | "yearly") => void;
  
  // Language
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  
  // Data
  users: User[];
  companies: Company[];
  services: Service[];
  jobs: Job[];
  serviceRequests: ServiceRequest[];
  jobApplications: JobApplication[];
  
  // Actions - Services
  addService: (service: Omit<Service, "id">) => void;
  updateService: (id: string, updates: Partial<Service>) => void;
  deleteService: (id: string) => void;
  searchServices: (keyword: string, location: string, category: string) => Service[];
  addReview: (review: Omit<ServiceReview, "id" | "date">) => void;
  getServiceReviews: (serviceId: string) => ServiceReview[];
  getCompanyReviews: (companyId: string) => ServiceReview[];
  updateCompanyRating: (companyId: string) => void;
  
  // Actions - Jobs
  addJob: (job: Omit<Job, "id">) => void;
  updateJob: (id: string, updates: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  
  // Actions - Service Requests
  createServiceRequest: (request: Omit<ServiceRequest, "id" | "date" | "status" | "read">) => void;
  updateRequestStatus: (id: string, status: RequestStatus) => void;
  markRequestAsRead: (id: string) => void;
  markAllRequestsAsRead: (companyId: string) => void;
  getSeekerRequests: (seekerId: string) => ServiceRequest[];
  getCompanyRequests: (companyId: string) => ServiceRequest[];
  
  // Actions - Job Applications
  applyForJob: (application: Omit<JobApplication, "id" | "date" | "status">) => void;
  updateApplicationStatus: (id: string, status: ApplicationStatus) => void;
  getSeekerApplications: (seekerId: string) => JobApplication[];
  getCompanyApplications: (companyId: string) => JobApplication[];
  
  // Admin Actions
  approveCompany: (companyId: string) => void;
  suspendUser: (userId: string) => void;
  suspendCompany: (companyId: string) => void;
  updateCompanyProfile: (companyId: string, updates: Partial<Company>) => void;
  getStats: () => { totalUsers: number; totalCompanies: number; totalServices: number; totalJobs: number };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Translations import used for t() via @/lib/translations

// Initial admin user
const initialAdmin: User = {
  id: "admin-1",
  name: "Admin",
  email: "admin@ethioworklink.com",
  password: "admin123",
  role: "admin",
};

// Test seeker account
const testSeeker: User = {
  id: "seeker-1",
  name: "Abebe Kebede",
  email: "seeker@test.com",
  password: "seeker123",
  role: "seeker",
  location: "Addis Ababa",
};

// Test company account
const testCompany: Company = {
  id: "company-1",
  companyName: "Test Construction PLC",
  ownerName: "Marta Tesfaye",
  email: "company@test.com",
  password: "company123",
  category: "Construction",
  location: "Addis Ababa",
  description: "Professional construction services with over 10 years of experience",
  status: "approved",
  rating: 4.5,
};

export function AppProvider({ children }: { children: ReactNode }) {
  // Initialize with test accounts if localStorage is empty or doesn't have them
  const initializeUsers = () => {
    const saved = localStorage.getItem("users");
    if (!saved) {
      return [initialAdmin, testSeeker];
    }
    const parsed = JSON.parse(saved);
    // Check if test accounts exist, if not add them
    const hasAdmin = parsed.some((u: User) => u.email === "admin@ethioworklink.com");
    const hasSeeker = parsed.some((u: User) => u.email === "seeker@test.com");
    
    if (!hasAdmin) parsed.push(initialAdmin);
    if (!hasSeeker) parsed.push(testSeeker);
    
    return parsed;
  };

  const initializeCompanies = () => {
    const saved = localStorage.getItem("companies");
    if (!saved) {
      return [testCompany];
    }
    const parsed = JSON.parse(saved);
    // Check if test company exists, if not add it
    const hasTestCompany = parsed.some((c: Company) => c.email === "company@test.com");
    
    if (!hasTestCompany) parsed.push(testCompany);
    
    return parsed;
  };

  // Load from localStorage or use defaults
  const [currentUser, setCurrentUser] = useState<User | Company | null>(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "am"; // Default to Amharic
  });

  const [users, setUsers] = useState<User[]>(initializeUsers);

  const [companies, setCompanies] = useState<Company[]>(initializeCompanies);

  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem("services");
    return saved ? JSON.parse(saved) : [];
  });

  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem("jobs");
    return saved ? JSON.parse(saved) : [];
  });

  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(() => {
    const saved = localStorage.getItem("serviceRequests");
    return saved ? JSON.parse(saved) : [];
  });

  const [jobApplications, setJobApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem("jobApplications");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("companies", JSON.stringify(companies));
  }, [companies]);

  useEffect(() => {
    localStorage.setItem("services", JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem("serviceRequests", JSON.stringify(serviceRequests));
  }, [serviceRequests]);

  useEffect(() => {
    localStorage.setItem("jobApplications", JSON.stringify(jobApplications));
  }, [jobApplications]);

  // Auth functions
  const login = (email: string, password: string) => {
    // Check users
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      if (user.suspended) {
        return { success: false, message: "Your account has been suspended" };
      }
      setCurrentUser(user);
      return { success: true, role: user.role, message: "Login successful" };
    }

    // Check companies
    const company = companies.find((c) => c.email === email && c.password === password);
    if (company) {
      if (company.suspended) {
        return { success: false, message: "Your company has been suspended" };
      }
      setCurrentUser(company);
      return { success: true, role: "company" as UserRole, message: "Login successful" };
    }

    return { success: false, message: "Invalid email or password" };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const registerSeeker = (data: Omit<User, "id" | "role">) => {
    // Check if email exists
    if (users.some((u) => u.email === data.email)) {
      return { success: false, message: "Email already registered" };
    }

    const newUser: User = {
      ...data,
      id: `user-${Date.now()}`,
      role: "seeker",
    };

    setUsers([...users, newUser]);
    return { success: true, message: "Registration successful! Please login." };
  };

  const registerCompany = (data: Omit<Company, "id" | "status" | "subscriptionPlan">) => {
    // Check if email exists
    if (companies.some((c) => c.email === data.email)) {
      return { success: false, message: "Email already registered" };
    }

    const newCompany: Company = {
      ...data,
      id: `company-${Date.now()}`,
      status: "pending",
    };

    setCompanies([...companies, newCompany]);
    setCurrentUser(newCompany); // Auto-login after registration
    return { success: true, message: "Registration successful! Please choose a subscription plan.", companyId: newCompany.id };
  };

  const updateCompanySubscription = (companyId: string, plan: "free" | "monthly" | "sixMonth" | "yearly") => {
    setCompanies(companies.map((c) => (c.id === companyId ? { ...c, subscriptionPlan: plan } : c)));
    
    // Update current user if it's the company being updated
    if (currentUser && 'companyName' in currentUser && currentUser.id === companyId) {
      const updatedUser = { ...currentUser, subscriptionPlan: plan };
      setCurrentUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
  };

  // Language functions
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "am" : "en"));
  };

  const t = (key: string): string => {
    const translationArea = (translations as any)[language];
    if (!translationArea) return key;
    return translationArea[key] || key;
  };

  // Service functions
  const addService = (service: Omit<Service, "id">) => {
    const newService: Service = {
      ...service,
      id: `service-${Date.now()}`,
    };
    setServices([...services, newService]);
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    setServices(services.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const deleteService = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
  };

  const searchServices = (keyword: string, location: string, category: string) => {
    return services.filter((service) => {
      const matchKeyword = !keyword || service.title.toLowerCase().includes(keyword.toLowerCase()) || service.description.toLowerCase().includes(keyword.toLowerCase());
      const matchLocation = !location || service.location === location;
      const matchCategory = !category || service.category === category;
      return matchKeyword && matchLocation && matchCategory;
    });
  };

  // Review functions
  const addReview = (review: Omit<ServiceReview, "id" | "date">) => {
    const newReview: ServiceReview = {
      ...review,
      id: `review-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
    };

    // Add review to service
    setServices(services.map((s) => {
      if (s.id === review.serviceId) {
        const updatedReviews = [...(s.reviews || []), newReview];
        const avgRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
        return { ...s, reviews: updatedReviews, rating: avgRating };
      }
      return s;
    }));

    // Update company rating
    const service = services.find(s => s.id === review.serviceId);
    if (service) {
      updateCompanyRating(service.companyId);
    }
  };

  const getServiceReviews = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    return service?.reviews || [];
  };

  const getCompanyReviews = (companyId: string) => {
    const companyServices = services.filter(s => s.companyId === companyId);
    return companyServices.flatMap(s => s.reviews || []);
  };

  const updateCompanyRating = (companyId: string) => {
    const companyServices = services.filter(s => s.companyId === companyId);
    const allReviews = companyServices.flatMap(s => s.reviews || []);
    
    if (allReviews.length > 0) {
      const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
      setCompanies(companies.map(c => 
        c.id === companyId ? { ...c, rating: avgRating } : c
      ));
    }
  };

  // Job functions
  const addJob = (job: Omit<Job, "id">) => {
    const newJob: Job = {
      ...job,
      id: `job-${Date.now()}`,
    };
    setJobs([...jobs, newJob]);
  };

  const updateJob = (id: string, updates: Partial<Job>) => {
    setJobs(jobs.map((j) => (j.id === id ? { ...j, ...updates } : j)));
  };

  const deleteJob = (id: string) => {
    setJobs(jobs.filter((j) => j.id !== id));
  };

  // Service Request functions
  const createServiceRequest = (request: Omit<ServiceRequest, "id" | "date" | "status" | "read">) => {
    const newRequest: ServiceRequest = {
      ...request,
      id: `request-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      status: "pending",
      read: false, // New requests are unread
    };
    setServiceRequests([...serviceRequests, newRequest]);
  };

  const updateRequestStatus = (id: string, status: RequestStatus) => {
    setServiceRequests(serviceRequests.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const markRequestAsRead = (id: string) => {
    setServiceRequests(serviceRequests.map((r) => (r.id === id ? { ...r, read: true } : r)));
  };

  const markAllRequestsAsRead = (companyId: string) => {
    setServiceRequests(serviceRequests.map((r) => 
      r.companyId === companyId ? { ...r, read: true } : r
    ));
  };

  const getSeekerRequests = (seekerId: string) => {
    return serviceRequests.filter((r) => r.seekerId === seekerId);
  };

  const getCompanyRequests = (companyId: string) => {
    return serviceRequests.filter((r) => r.companyId === companyId);
  };

  // Job Application functions
  const applyForJob = (application: Omit<JobApplication, "id" | "date" | "status">) => {
    const newApplication: JobApplication = {
      ...application,
      id: `application-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      status: "applied",
    };
    setJobApplications([...jobApplications, newApplication]);
  };

  const updateApplicationStatus = (id: string, status: ApplicationStatus) => {
    setJobApplications(jobApplications.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const getSeekerApplications = (seekerId: string) => {
    return jobApplications.filter((a) => a.seekerId === seekerId);
  };

  const getCompanyApplications = (companyId: string) => {
    return jobApplications.filter((a) => a.companyId === companyId);
  };

  // Admin functions
  const approveCompany = (companyId: string) => {
    setCompanies(companies.map((c) => (c.id === companyId ? { ...c, status: "approved" as CompanyStatus } : c)));
  };

  const suspendUser = (userId: string) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, suspended: true } : u)));
  };

  const suspendCompany = (companyId: string) => {
    setCompanies(companies.map((c) => (c.id === companyId ? { ...c, suspended: true } : c)));
  };

  const updateCompanyProfile = (companyId: string, updates: Partial<Company>) => {
    setCompanies(companies.map((c) => (c.id === companyId ? { ...c, ...updates } : c)));
    
    // Update current user if it's the company being updated
    if (currentUser && 'companyName' in currentUser && currentUser.id === companyId) {
      const updatedUser = { ...currentUser, ...updates };
      setCurrentUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
  };

  const getStats = () => ({
    totalUsers: users.filter((u) => u.role !== "admin").length,
    totalCompanies: companies.length,
    totalServices: services.length,
    totalJobs: jobs.length,
  });

  const value: AppContextType = {
    currentUser,
    login,
    logout,
    registerSeeker,
    registerCompany,
    updateCompanySubscription,
    language,
    toggleLanguage,
    t,
    users,
    companies,
    services,
    jobs,
    serviceRequests,
    jobApplications,
    addService,
    updateService,
    deleteService,
    searchServices,
    addReview,
    getServiceReviews,
    getCompanyReviews,
    updateCompanyRating,
    addJob,
    updateJob,
    deleteJob,
    createServiceRequest,
    updateRequestStatus,
    markRequestAsRead,
    markAllRequestsAsRead,
    getSeekerRequests,
    getCompanyRequests,
    applyForJob,
    updateApplicationStatus,
    getSeekerApplications,
    getCompanyApplications,
    approveCompany,
    suspendUser,
    suspendCompany,
    updateCompanyProfile,
    getStats,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
