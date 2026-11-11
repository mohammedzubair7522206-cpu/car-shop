export type UserRole = 'Customer' | 'Admin';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  phone?: string;
  address?: string;
  avatar?: string;
  vipTier?: 'Standard' | 'Prestige' | 'Black Card / Private Collector';
  createdAt: string;
}

export type CarAvailability = 'Available' | 'Sold' | 'Reserved' | 'In Transit';

export interface DynamicCar {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: string;
  fuelType: 'Gasoline' | 'Hybrid' | 'Electric';
  transmission: string;
  engine: string;
  horsepower: number;
  torque: string;
  topSpeed: string;
  acceleration: string;
  exteriorColor: string;
  interiorColor: string;
  category: string;
  description: string;
  features: string[];
  image: string;
  gallery: string[];
  heroVideo?: string;
  threeDModelUrl?: string;
  availabilityStatus: CarAvailability;
  isFeatured: boolean;
  soundPreset: 'flat6' | 'v8twin' | 'v10na' | 'inline6' | 'evwhine';
  createdAt: string;
}

export interface Brand {
  id: string;
  name: string;
  country: string;
  founded: number;
  logo: string;
  description: string;
}

export interface CategoryItem {
  id: string;
  title: string;
  description: string;
  accent: string;
  image: string;
}

export interface TestDriveBooking {
  id: string;
  carId: string;
  carName: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  preferredDate: string;
  preferredTime: string;
  location: string;
  conciergeDelivery: boolean;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface CustomerInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  carId?: string;
  carName?: string;
  status: 'New' | 'In Progress' | 'Answered' | 'Archived';
  createdAt: string;
}

export interface GarageConfig {
  selectedCarId: string;
  lightingPreset: 'Studio Neutral' | 'Cyberpunk Crimson' | 'Atmospheric Gold' | 'High-Key White';
  floorReflectivity: number;
  ambientIntensity: number;
  spotlightIntensity: number;
  cameraPreset: 'free' | 'front' | 'rear' | 'side' | 'interior';
  explodedProgress: number;
  activeHotspot: string | null;
}

export interface WebsiteSettings {
  dealershipName: string;
  tagline: string;
  phone: string;
  email: string;
  currencySymbol: string;
  salesTaxPercentage: number;
  bannerAnnouncement: string;
  maintenanceMode: boolean;
}
