import {
  DynamicCar,
  Brand,
  CategoryItem,
  User,
  TestDriveBooking,
  CustomerInquiry,
  WebsiteSettings,
  GarageConfig
} from '../types/database';

const DB_KEYS = {
  CARS: 'elitedrive_db_cars',
  BRANDS: 'elitedrive_db_brands',
  CATEGORIES: 'elitedrive_db_categories',
  USERS: 'elitedrive_db_users',
  CURRENT_USER: 'elitedrive_db_current_user',
  BOOKINGS: 'elitedrive_db_bookings',
  INQUIRIES: 'elitedrive_db_inquiries',
  FAVORITES: 'elitedrive_db_favorites',
  SETTINGS: 'elitedrive_db_settings',
  GARAGE: 'elitedrive_db_garage_config',
};

// Initial Seed Data
const INITIAL_CARS: DynamicCar[] = [
  {
    id: 'porsche-911-carrera-gts',
    name: '911 Carrera GTS',
    brand: 'Porsche',
    model: '911 (992.1)',
    year: 2024,
    price: 152000,
    mileage: 'Delivery Mi (18 mi)',
    fuelType: 'Gasoline',
    transmission: '8-Speed Porsche Doppelkupplung (PDK)',
    category: 'Sports Cars',
    horsepower: 473,
    topSpeed: '193 mph / 311 km/h',
    acceleration: '3.2s',
    engine: '3.0L Twin-Turbo Boxer-6',
    torque: '420 lb-ft / 570 Nm',
    exteriorColor: 'GT Silver Metallic',
    interiorColor: 'Race-Tex & Carmine Red Leather',
    description: 'The pinnacle of naturally athletic everyday performance. Merges razor-sharp chassis dynamics with iconic German engineering.',
    features: [
      'Sport Chrono Package with analog dial',
      '20/21-inch Turbo S Center-Lock Satin Black Wheels',
      'Burmester® High-End Surround Sound System',
      'Porsche Ceramic Composite Brakes (PCCB)',
      'Adaptive Sports Seats Plus (18-way)'
    ],
    image: '/src/assets/images/car_porsche_911_1794232800353.jpg',
    gallery: [
      '/src/assets/images/car_porsche_911_1794232800353.jpg',
      '/src/assets/images/hero_porsche_cinematic_1794232747528.jpg'
    ],
    heroVideo: 'https://assets.mixkit.co/videos/preview/mixkit-car-driving-on-a-road-at-night-4247-large.mp4',
    availabilityStatus: 'Available',
    isFeatured: true,
    soundPreset: 'flat6',
    createdAt: '2026-01-10T10:00:00Z'
  },
  {
    id: 'bmw-m4-competition',
    name: 'M4 Competition Coupé',
    brand: 'BMW M',
    model: 'M4 G82',
    year: 2024,
    price: 86300,
    mileage: '940 mi',
    fuelType: 'Gasoline',
    transmission: '8-Speed M Steptronic with Drivelogic',
    category: 'Sports Cars',
    horsepower: 503,
    topSpeed: '180 mph / 290 km/h',
    acceleration: '3.4s',
    engine: '3.0L BMW M TwinPower Turbo S58 Inline-6',
    torque: '479 lb-ft / 650 Nm',
    exteriorColor: 'Isle of Man Green Metallic',
    interiorColor: 'Silverstone & Black Merino Leather',
    description: 'An aggressive track-bred predator. Relentless twin-turbo acceleration and laser-precise handling.',
    features: [
      'M Carbon Bucket Seats',
      'Shadowline Laserlight Headlights',
      'Quad 100mm M Sport exhaust system',
      'Carbon Fiber Reinforced Plastic Roof',
      'M Drive Professional with Drift Analyser'
    ],
    image: '/src/assets/images/car_bmw_m4_1794232764604.jpg',
    gallery: ['/src/assets/images/car_bmw_m4_1794232764604.jpg'],
    availabilityStatus: 'Available',
    isFeatured: true,
    soundPreset: 'inline6',
    createdAt: '2026-01-12T11:00:00Z'
  },
  {
    id: 'mercedes-amg-c63-s',
    name: 'C63 S E-Performance',
    brand: 'Mercedes-AMG',
    model: 'C63 S',
    year: 2024,
    price: 91500,
    mileage: '420 mi',
    fuelType: 'Hybrid',
    transmission: 'AMG SPEEDSHIFT MCT 9-Speed Dual-Clutch',
    category: 'Sedans',
    horsepower: 671,
    topSpeed: '174 mph / 280 km/h',
    acceleration: '3.3s',
    engine: '2.0L Turbocharged + Rear High-Output Electric Motor',
    torque: '752 lb-ft / 1020 Nm',
    exteriorColor: 'Satin Obsidian Black',
    interiorColor: 'Titanium Grey Nappa Leather',
    description: 'Formula 1 hybrid power translated directly into road legal dominance with 752 lb-ft of instantaneous torque.',
    features: [
      'AMG Performance 4MATIC+ with Drift Mode',
      'Vertical Panamericana AMG grille with illuminated star',
      'Burmester® 3D High-End 15-speaker audio',
      'Digital Light Headlights with 1.3M micro-mirrors',
      'Active rear-axle steering'
    ],
    image: '/src/assets/images/car_amg_c63_1794232835158.jpg',
    gallery: ['/src/assets/images/car_amg_c63_1794232835158.jpg'],
    availabilityStatus: 'Available',
    isFeatured: true,
    soundPreset: 'v8twin',
    createdAt: '2026-01-15T12:00:00Z'
  },
  {
    id: 'lamborghini-huracan-tecnica',
    name: 'Huracán Tecnica',
    brand: 'Lamborghini',
    model: 'Huracán LP 640-2',
    year: 2023,
    price: 249000,
    mileage: '1,890 mi',
    fuelType: 'Gasoline',
    transmission: '7-Speed Dual-Clutch LDF',
    category: 'Supercars',
    horsepower: 631,
    topSpeed: '202 mph / 325 km/h',
    acceleration: '2.9s',
    engine: '5.2L Naturally Aspirated Mid-Engine V10',
    torque: '417 lb-ft / 565 Nm',
    exteriorColor: 'Nero Nemesis Matte',
    interiorColor: 'Nero Ade Alcantara with Rosso stitching',
    description: 'The purest acoustic symphony in the supercar universe. Screaming 5.2-liter naturally aspirated V10 revving freely past 8,500 RPM.',
    features: [
      'Rear-Wheel Steering with LDVI torque vectoring',
      'Carbon Ceramic Brakes (CCB) with Monobloc 6-piston calipers',
      'Fixed aerodynamic rear wing (+35% downforce)',
      'Lightweight carbon skin door panels',
      'Hexagonal tuned sport exhaust pipes'
    ],
    image: '/src/assets/images/car_lambo_huracan_1794232848403.jpg',
    gallery: ['/src/assets/images/car_lambo_huracan_1794232848403.jpg'],
    availabilityStatus: 'Available',
    isFeatured: true,
    soundPreset: 'v10na',
    createdAt: '2026-01-18T14:00:00Z'
  },
  {
    id: 'ferrari-roma-spider',
    name: 'Roma Spider',
    brand: 'Ferrari',
    model: 'Roma Spider',
    year: 2024,
    price: 277000,
    mileage: '630 mi',
    fuelType: 'Gasoline',
    transmission: '8-Speed F1 Dual-Clutch Gearbox',
    category: 'Supercars',
    horsepower: 612,
    topSpeed: '199 mph / 320 km/h',
    acceleration: '3.1s',
    engine: '3.9L 90° Twin-Turbocharged V8',
    torque: '561 lb-ft / 760 Nm',
    exteriorColor: 'Grigio Silverstone Metallic',
    interiorColor: 'Bordeaux Poltrona Frau® Leather',
    description: 'La Nuova Dolce Vita. Timeless Italian elegance and contemporary open-air GT ferocity.',
    features: [
      '5-Layer Tailored Acoustic Soft Top (opens in 13.5s)',
      'Side Slip Control 6.0 (SSC 6.0) with Ferrari Dynamic Enhancer',
      'Passenger 8.8-inch full HD touchscreen',
      'Mobile active rear spoiler',
      'Carbon-ceramic brakes with Scuderia Ferrari shields'
    ],
    image: '/src/assets/images/car_ferrari_roma_1794232819867.jpg',
    gallery: ['/src/assets/images/car_ferrari_roma_1794232819867.jpg'],
    availabilityStatus: 'Available',
    isFeatured: true,
    soundPreset: 'v8twin',
    createdAt: '2026-01-20T16:00:00Z'
  },
  {
    id: 'audi-rs7-sportback',
    name: 'RS7 Sportback Performance',
    brand: 'Audi Sport',
    model: 'RS7 C8',
    year: 2024,
    price: 128500,
    mileage: '1,120 mi',
    fuelType: 'Gasoline',
    transmission: '8-Speed Tiptronic with DSP',
    category: 'Luxury Cars',
    horsepower: 621,
    topSpeed: '190 mph / 305 km/h',
    acceleration: '3.3s',
    engine: '4.0L Twin-Turbocharged V8 with 48V Mild Hybrid',
    torque: '627 lb-ft / 850 Nm',
    exteriorColor: 'Nardo Grey',
    interiorColor: 'Valcona Leather with Honeycomb Red Stitching',
    description: 'Breathtaking 5-door gran turismo silhouette wrapped around a savage 621 HP twin-turbo V8.',
    features: [
      'quattro Permanent AWD with Sport Differential',
      'Bang & Olufsen® 3D Advanced 1,820W Sound System',
      '22-inch lightweight forged titanium wheels',
      'Dynamic all-wheel steering',
      'RS sport exhaust with oval black finishers'
    ],
    image: '/src/assets/images/hero_porsche_cinematic_1794232747528.jpg',
    gallery: ['/src/assets/images/hero_porsche_cinematic_1794232747528.jpg'],
    availabilityStatus: 'Available',
    isFeatured: true,
    soundPreset: 'v8twin',
    createdAt: '2026-01-22T17:00:00Z'
  }
];

const INITIAL_BRANDS: Brand[] = [
  { id: 'porsche', name: 'Porsche', country: 'Germany', founded: 1931, logo: 'PORSCHE', description: 'Stuttgart excellence in sports cars and endurance racing dominance.' },
  { id: 'ferrari', name: 'Ferrari', country: 'Italy', founded: 1939, logo: 'FERRARI', description: 'Maranello passion, F1 heritage, and peerless Italian design.' },
  { id: 'bmw-m', name: 'BMW M', country: 'Germany', founded: 1972, logo: 'BMW M', description: 'The most powerful letter in the world. High-performance precision.' },
  { id: 'mercedes-amg', name: 'Mercedes-AMG', country: 'Germany', founded: 1967, logo: 'MERCEDES-AMG', description: 'Affalterbach hand-crafted performance driving dominance.' },
  { id: 'lamborghini', name: 'Lamborghini', country: 'Italy', founded: 1963, logo: 'LAMBORGHINI', description: 'Sant\'Agata Bolognese visionary super sports cars.' },
  { id: 'audi-sport', name: 'Audi Sport', country: 'Germany', founded: 1983, logo: 'AUDI SPORT', description: 'Neckarsulm engineering and quattro all-wheel drive mastery.' },
  { id: 'aston-martin', name: 'Aston Martin', country: 'United Kingdom', founded: 1913, logo: 'ASTON MARTIN', description: 'British luxury grand tourers and hand-crafted motorsport elegance.' }
];

const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: 'sports-cars', title: 'Sports Cars', description: 'Precision-tuned handling, agility, and mechanical connection.', accent: 'From 473 HP', image: '/src/assets/images/car_porsche_911_1794232800353.jpg' },
  { id: 'supercars', title: 'Supercars', description: 'Exotic mid-engine architecture and sub-3-second acceleration.', accent: 'Up to 202 MPH', image: '/src/assets/images/car_lambo_huracan_1794232848403.jpg' },
  { id: 'luxury-cars', title: 'Luxury Cars', description: 'Hand-crafted grand tourers with acoustic executive tranquility.', accent: 'V8 & V12 Tourers', image: '/src/assets/images/hero_porsche_cinematic_1794232747528.jpg' },
  { id: 'electric-cars', title: 'Electric Cars', description: 'Instantaneous electric torque, zero emissions, and 800V architectures.', accent: 'Up to 750 HP EV', image: '/src/assets/images/car_bmw_m4_1794232764604.jpg' },
  { id: 'sedans', title: 'Sedans', description: 'High-performance four-door executive missiles delivering track capability.', accent: 'Sub-3.5s 0-60', image: '/src/assets/images/car_amg_c63_1794232835158.jpg' },
  { id: 'suvs', title: 'SUVs', description: 'Uncompromising high-riding power with all-terrain stability.', accent: 'Twin-Turbo AWD', image: '/src/assets/images/car_ferrari_roma_1794232819867.jpg' }
];

const INITIAL_USERS: User[] = [
  {
    id: 'user_admin',
    name: 'Chief Automotive Director',
    email: 'admin@elitedrive.com',
    password: 'admin',
    role: 'Admin',
    phone: '+1 (310) 845-9200',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    vipTier: 'Black Card / Private Collector',
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'user_client',
    name: 'Julian Vance-Moreau',
    email: 'client@elitedrive.com',
    password: 'client',
    role: 'Customer',
    phone: '+44 20 7946 0912',
    address: 'Berkeley Square, Mayfair, London',
    vipTier: 'Prestige',
    createdAt: '2026-01-15T00:00:00Z'
  }
];

const INITIAL_BOOKINGS: TestDriveBooking[] = [
  {
    id: 'ED-TD-902148',
    carId: 'porsche-911-carrera-gts',
    carName: 'Porsche 911 Carrera GTS',
    clientName: 'Julian Vance-Moreau',
    clientEmail: 'client@elitedrive.com',
    clientPhone: '+44 20 7946 0912',
    preferredDate: '2026-11-24',
    preferredTime: '11:30 AM',
    location: 'Beverly Hills Showroom Circuit',
    conciergeDelivery: false,
    status: 'Confirmed',
    createdAt: '2026-11-08T14:30:00Z'
  },
  {
    id: 'ED-TD-902189',
    carId: 'lamborghini-huracan-tecnica',
    carName: 'Lamborghini Huracán Tecnica',
    clientName: 'Marcus Sterling',
    clientEmail: 'marcus@sterlingarch.com',
    clientPhone: '+1 (310) 555-0199',
    preferredDate: '2026-11-28',
    preferredTime: '04:30 PM',
    location: 'Private Closed Course',
    conciergeDelivery: true,
    status: 'Pending',
    createdAt: '2026-11-09T02:15:00Z'
  }
];

const INITIAL_INQUIRIES: CustomerInquiry[] = [
  {
    id: 'INQ-7021',
    name: 'Elena Rostova',
    email: 'elena.rostova@monaco-invest.mc',
    phone: '+377 98 98 00 00',
    subject: 'Ferrari Roma Spider Allocation',
    message: 'Requesting allocation status for the 2024 Roma Spider with immediate European closed-transport delivery to Monaco.',
    carId: 'ferrari-roma-spider',
    carName: 'Ferrari Roma Spider',
    status: 'New',
    createdAt: '2026-11-09T03:00:00Z'
  },
  {
    id: 'INQ-7020',
    name: 'David K. Harrison',
    email: 'david@harrisoncorp.com',
    phone: '+1 (415) 880-9211',
    subject: 'Fleet Lease Structure',
    message: 'Inquiring regarding corporate multi-vehicle lease structures for C63 S E-Performance and RS7 Sportback.',
    status: 'In Progress',
    createdAt: '2026-11-08T18:20:00Z'
  }
];

const INITIAL_SETTINGS: WebsiteSettings = {
  dealershipName: 'ELITE DRIVE',
  tagline: 'Find Your Next Drive.',
  phone: '+1 (310) 845-9200',
  email: 'concierge@elitedrive.com',
  currencySymbol: '$',
  salesTaxPercentage: 8.5,
  bannerAnnouncement: 'Private Viewing Appointments Available for 2026 Supercar Allocations',
  maintenanceMode: false
};

const INITIAL_GARAGE: GarageConfig = {
  selectedCarId: 'porsche-911-carrera-gts',
  lightingPreset: 'Studio Neutral',
  floorReflectivity: 0.85,
  ambientIntensity: 0.7,
  spotlightIntensity: 1.5,
  cameraPreset: 'front',
  explodedProgress: 0,
  activeHotspot: null
};

// Safe LocalStorage Helper
function getStored<T>(key: string, defaultVal: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultVal));
      return defaultVal;
    }
    return JSON.parse(raw);
  } catch {
    return defaultVal;
  }
}

function setStored<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (err) {
    console.error('Storage write error', err);
  }
}

export { INITIAL_CARS, INITIAL_BRANDS, INITIAL_CATEGORIES, INITIAL_SETTINGS, INITIAL_USERS };

export const DatabaseService = {
  // Synchronous immediate getters for zero-delay initial state
  getCarsSync(): DynamicCar[] {
    return getStored<DynamicCar[]>(DB_KEYS.CARS, INITIAL_CARS);
  },

  getBrandsSync(): Brand[] {
    return getStored<Brand[]>(DB_KEYS.BRANDS, INITIAL_BRANDS);
  },

  getCategoriesSync(): CategoryItem[] {
    return getStored<CategoryItem[]>(DB_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  },

  getSettingsSync(): WebsiteSettings {
    return getStored<WebsiteSettings>(DB_KEYS.SETTINGS, INITIAL_SETTINGS);
  },

  getCurrentUserSync(): User | null {
    return getStored<User | null>(DB_KEYS.CURRENT_USER, INITIAL_USERS[0]);
  },

  // Cars CRUD
  async getCars(): Promise<DynamicCar[]> {
    return this.getCarsSync();
  },

  async getCarById(id: string): Promise<DynamicCar | null> {
    const cars = await this.getCars();
    return cars.find((c) => c.id === id) || null;
  },

  async saveCar(carData: Partial<DynamicCar> & { id?: string }): Promise<DynamicCar> {
    const cars = await this.getCars();
    let updated: DynamicCar;

    if (carData.id && cars.some((c) => c.id === carData.id)) {
      // Edit
      updated = {
        ...cars.find((c) => c.id === carData.id)!,
        ...carData
      };
      const nextCars = cars.map((c) => (c.id === updated.id ? updated : c));
      setStored(DB_KEYS.CARS, nextCars);
    } else {
      // Create new
      const newId = carData.id || `car-${Date.now()}`;
      updated = {
        id: newId,
        name: carData.name || 'New Supercar',
        brand: carData.brand || 'Porsche',
        model: carData.model || '',
        year: carData.year || 2024,
        price: carData.price || 150000,
        mileage: carData.mileage || 'Delivery Mi',
        fuelType: carData.fuelType || 'Gasoline',
        transmission: carData.transmission || 'Automatic',
        engine: carData.engine || 'Twin-Turbo V8',
        horsepower: carData.horsepower || 500,
        torque: carData.torque || '500 lb-ft',
        topSpeed: carData.topSpeed || '190 mph',
        acceleration: carData.acceleration || '3.5s',
        exteriorColor: carData.exteriorColor || 'Obsidian Black',
        interiorColor: carData.interiorColor || 'Black Leather',
        category: carData.category || 'Sports Cars',
        description: carData.description || 'Pristine high-performance vehicle.',
        features: carData.features || ['Sport Chrono', 'Active Exhaust', 'Carbon Trim'],
        image: carData.image || '/src/assets/images/car_porsche_911_1794232800353.jpg',
        gallery: carData.gallery || ['/src/assets/images/car_porsche_911_1794232800353.jpg'],
        availabilityStatus: carData.availabilityStatus || 'Available',
        isFeatured: carData.isFeatured ?? true,
        soundPreset: carData.soundPreset || 'v8twin',
        createdAt: new Date().toISOString()
      };
      setStored(DB_KEYS.CARS, [updated, ...cars]);
    }
    return updated;
  },

  async deleteCar(id: string): Promise<boolean> {
    const cars = await this.getCars();
    const filtered = cars.filter((c) => c.id !== id);
    setStored(DB_KEYS.CARS, filtered);
    return true;
  },

  // Brands
  async getBrands(): Promise<Brand[]> {
    return getStored<Brand[]>(DB_KEYS.BRANDS, INITIAL_BRANDS);
  },

  async saveBrand(brand: Brand): Promise<Brand> {
    const brands = await this.getBrands();
    const idx = brands.findIndex((b) => b.id === brand.id);
    let updatedList: Brand[];
    if (idx >= 0) {
      updatedList = brands.map((b) => (b.id === brand.id ? brand : b));
    } else {
      updatedList = [...brands, brand];
    }
    setStored(DB_KEYS.BRANDS, updatedList);
    return brand;
  },

  async deleteBrand(brandId: string): Promise<boolean> {
    const brands = await this.getBrands();
    setStored(DB_KEYS.BRANDS, brands.filter((b) => b.id !== brandId));
    return true;
  },

  // Categories
  async getCategories(): Promise<CategoryItem[]> {
    return getStored<CategoryItem[]>(DB_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  },

  async saveCategory(cat: CategoryItem): Promise<CategoryItem> {
    const categories = await this.getCategories();
    const idx = categories.findIndex((c) => c.id === cat.id);
    let updatedList: CategoryItem[];
    if (idx >= 0) {
      updatedList = categories.map((c) => (c.id === cat.id ? cat : c));
    } else {
      updatedList = [...categories, cat];
    }
    setStored(DB_KEYS.CATEGORIES, updatedList);
    return cat;
  },

  // Bookings
  async getBookings(): Promise<TestDriveBooking[]> {
    return getStored<TestDriveBooking[]>(DB_KEYS.BOOKINGS, INITIAL_BOOKINGS);
  },

  async saveBooking(booking: TestDriveBooking): Promise<TestDriveBooking> {
    const bookings = await this.getBookings();
    const existing = bookings.findIndex((b) => b.id === booking.id);
    let updated: TestDriveBooking[];
    if (existing >= 0) {
      updated = bookings.map((b) => (b.id === booking.id ? booking : b));
    } else {
      updated = [booking, ...bookings];
    }
    setStored(DB_KEYS.BOOKINGS, updated);
    return booking;
  },

  async updateBookingStatus(id: string, status: TestDriveBooking['status']): Promise<boolean> {
    const bookings = await this.getBookings();
    const updated = bookings.map((b) => (b.id === id ? { ...b, status } : b));
    setStored(DB_KEYS.BOOKINGS, updated);
    return true;
  },

  // Inquiries
  async getInquiries(): Promise<CustomerInquiry[]> {
    return getStored<CustomerInquiry[]>(DB_KEYS.INQUIRIES, INITIAL_INQUIRIES);
  },

  async saveInquiry(inquiry: Omit<CustomerInquiry, 'id' | 'createdAt' | 'status'>): Promise<CustomerInquiry> {
    const inquiries = await this.getInquiries();
    const newInq: CustomerInquiry = {
      ...inquiry,
      id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    setStored(DB_KEYS.INQUIRIES, [newInq, ...inquiries]);
    return newInq;
  },

  async updateInquiryStatus(id: string, status: CustomerInquiry['status']): Promise<boolean> {
    const inqs = await this.getInquiries();
    const updated = inqs.map((i) => (i.id === id ? { ...i, status } : i));
    setStored(DB_KEYS.INQUIRIES, updated);
    return true;
  },

  // Users & Auth
  async getUsers(): Promise<User[]> {
    return getStored<User[]>(DB_KEYS.USERS, INITIAL_USERS);
  },

  async getCurrentUser(): Promise<User | null> {
    return getStored<User | null>(DB_KEYS.CURRENT_USER, INITIAL_USERS[0]); // default logged in as admin for immediate exploration
  },

  async setCurrentUser(user: User | null): Promise<void> {
    setStored(DB_KEYS.CURRENT_USER, user);
  },

  async saveUser(user: User): Promise<User> {
    const users = await this.getUsers();
    const existingIdx = users.findIndex((u) => u.id === user.id);
    let updated: User[];
    if (existingIdx >= 0) {
      updated = users.map((u) => (u.id === user.id ? user : u));
    } else {
      updated = [...users, user];
    }
    setStored(DB_KEYS.USERS, updated);
    return user;
  },

  // Settings
  async getSettings(): Promise<WebsiteSettings> {
    return getStored<WebsiteSettings>(DB_KEYS.SETTINGS, INITIAL_SETTINGS);
  },

  async saveSettings(settings: WebsiteSettings): Promise<WebsiteSettings> {
    setStored(DB_KEYS.SETTINGS, settings);
    return settings;
  },

  // 3D Garage Config
  async getGarageConfig(): Promise<GarageConfig> {
    return getStored<GarageConfig>(DB_KEYS.GARAGE, INITIAL_GARAGE);
  },

  async saveGarageConfig(config: Partial<GarageConfig>): Promise<GarageConfig> {
    const current = await this.getGarageConfig();
    const next = { ...current, ...config };
    setStored(DB_KEYS.GARAGE, next);
    return next;
  },

  // Reset / Restore all data to factory initial state
  restoreDefaults(): void {
    setStored(DB_KEYS.CARS, INITIAL_CARS);
    setStored(DB_KEYS.BRANDS, INITIAL_BRANDS);
    setStored(DB_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    setStored(DB_KEYS.USERS, INITIAL_USERS);
    setStored(DB_KEYS.CURRENT_USER, INITIAL_USERS[0]);
    setStored(DB_KEYS.SETTINGS, INITIAL_SETTINGS);
    setStored(DB_KEYS.GARAGE, INITIAL_GARAGE);
    setStored(DB_KEYS.BOOKINGS, []);
    setStored(DB_KEYS.INQUIRIES, []);
  }
};
