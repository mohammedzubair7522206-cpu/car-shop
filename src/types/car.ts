export type CarCategory = 
  | 'All'
  | 'Sports Cars'
  | 'Luxury Cars'
  | 'SUVs'
  | 'Electric Cars'
  | 'Sedans'
  | 'Supercars';

export interface CarColor {
  name: string;
  hex: string;
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  year: number;
  price: number;
  mileage: string;
  fuelType: 'Gasoline' | 'Hybrid' | 'Electric';
  transmission: string;
  category: CarCategory;
  horsepower: number;
  topSpeed: string;
  acceleration: string;
  engine: string;
  torque: string;
  drivetrain: string;
  image: string;
  gallery: string[];
  colors: CarColor[];
  interiorFeatures: string[];
  exteriorFeatures: string[];
  status: 'In Showroom' | 'Just Arrived' | 'Exclusive' | 'Reserved';
  description: string;
  soundPreset: 'flat6' | 'v8twin' | 'v10na' | 'inline6' | 'evwhine';
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
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  carPurchased: string;
  rating: number;
  quote: string;
  verifiedOwner: boolean;
  date: string;
}
