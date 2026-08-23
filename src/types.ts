export interface Project {
  id: string;
  title: string;
  slug: string;
  location: string;
  country: string;
  category: 'Commercial' | 'Infrastructure' | 'Residential' | 'Civic' | 'Industrial' | string;
  client: string;
  status: 'Completed' | 'In Progress' | 'Under Construction' | 'Planning' | string;
  completionYear: number | string;
  projectValue: string;
  projectSize: string;
  description: string;
  challenge?: string;
  approach?: string;
  results?: string;
  sustainabilityFeatures?: string[];
  featuredImage: string;
  gallery: string[];
  isFeatured?: boolean;
  featured?: boolean;
  published: boolean;
  architect?: string;
  structuralEngineer?: string;
  awards?: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  excerpt?: string;
  content: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  featuredImage: string;
  readingTime?: string;
  readTime?: string;
  publishedAt?: string;
  date?: string;
  tags: string[];
  isFeatured?: boolean;
  featured?: boolean;
  published: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Job {
  id: string;
  title: string;
  slug?: string;
  department: string;
  location: string;
  country?: string;
  type: 'Full-Time' | 'Contract' | 'Executive' | string;
  experienceLevel: string;
  salaryRange?: string;
  overview?: string;
  description?: string;
  responsibilities: string[];
  requirements: string[];
  preferredQualifications?: string[];
  benefits: string[];
  status: 'Open' | 'Closed' | 'Draft' | string;
  deadline?: string;
  postedAt?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ContactInquiry {
  id: string;
  fullName: string;
  name?: string;
  company: string;
  email: string;
  phone: string;
  country?: string;
  projectType: string;
  estimatedBudget: string;
  expectedTimeline: string;
  projectDescription: string;
  description?: string;
  attachments?: string[];
  status: 'Unread' | 'In Discussion' | 'Pending' | 'Resolved' | string;
  assignedTo?: string;
  internalNotes?: string;
  createdAt: string;
}

export type Inquiry = ContactInquiry;

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateName: string;
  name?: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  portfolioUrl?: string;
  experienceYears?: string;
  coverLetter: string;
  resumeFileName?: string;
  resumeUrl?: string;
  resumeData?: string;
  status: 'New' | 'Under Review' | 'Interview Scheduled' | 'Rejected' | 'Hired' | string;
  notes?: string;
  createdAt: string;
}

export interface MediaItem {
  id: string;
  name: string;
  title?: string;
  url: string;
  type?: string;
  category: 'Projects' | 'Architecture' | 'Site' | 'Team' | string;
  size: string;
  dimensions?: string;
  uploadedAt?: string;
  createdAt?: string;
}

export interface OfficeLocation {
  city: string;
  country?: string;
  role?: string;
  address: string;
  phone: string;
  email: string;
  hours?: string;
  coordinates?: { lat: number; lng: number };
  image?: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  subheadline?: string;
  headquarters?: string;
  phone?: string;
  email?: string;
  contactEmail?: string;
  contactPhone?: string;
  stats?: {
    yearsExperience?: string | number;
    countriesServed?: string | number;
    projectsDelivered?: string | number;
    areaDelivered?: string | number;
    activeWorkforce?: string | number;
    safetyScore?: string;
    countriesActive?: number;
    workforceTotal?: number;
    sustainabilityScore?: string;
    totalProjectValueBillions?: number;
  };
  globalOffices?: OfficeLocation[];
  offices?: OfficeLocation[];
  socials?: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    facebook?: string;
  };
}

export interface AdminUser {
  id: string;
  email: string;
  username?: string;
  name: string;
  role: 'Super Admin' | 'Executive Director' | 'Editor' | string;
  avatar?: string;
}

// Auxiliary pizza / store types
export interface MenuItem {
  id: string;
  name: string;
  urduName?: string;
  description: string;
  category: string;
  price: number;
  image: string;
  spicyLevel?: number;
  isPopular?: boolean;
  isChefSpecial?: boolean;
  tags?: string[];
  sizes?: any;
}

export interface DealItem {
  id: string;
  name?: string;
  title?: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  includes?: string[];
  items?: string[];
}

export interface StoreInfo {
  name: string;
  tagline: string;
  phone1: string;
  phone2?: string;
  whatsapp: string;
  address: string;
  city: string;
  freeDeliveryAbove: number;
}

export interface CustomerReview {
  id: string;
  name: string;
  location?: string;
  rating: number;
  comment: string;
  date: string;
}

export type ItemSize = any;
export type CrustOption = any;
export type ToppingOption = any;
export type SpiceLevel = 'Mild' | 'Medium' | 'Hot' | 'Extra Hot' | string;
export type OrderType = 'delivery' | 'takeaway' | 'dine-in';
export type PaymentMethod = 'cash' | 'card' | 'easypaisa' | 'jazzcash';
export type OrderStatus = 'pending' | 'preparing' | 'on-the-way' | 'delivered';

export interface CartItem {
  id: string;
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  size?: any;
  crust?: any;
  toppings?: any[];
  spiceLevel?: any;
  notes?: string;
}

export interface CustomPizzaCraft {
  size: any;
  crust: any;
  sauce: string;
  cheese: string;
  toppings: any[];
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  orderType: OrderType;
  paymentMethod: PaymentMethod;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}
