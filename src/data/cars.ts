import { Car, Testimonial } from '../types/car';

export const CARS_DATA: Car[] = [
  {
    id: 'porsche-911-carrera-gts',
    name: '911 Carrera GTS',
    brand: 'Porsche',
    year: 2024,
    price: 152000,
    mileage: 'Delivery Mi (18 mi)',
    fuelType: 'Gasoline',
    transmission: '8-Speed Porsche Doppelkupplung (PDK)',
    category: 'Sports Cars',
    horsepower: 473,
    topSpeed: '193 mph / 311 km/h',
    acceleration: '3.2s (0-60 mph)',
    engine: '3.0L Twin-Turbo Boxer-6',
    torque: '420 lb-ft / 570 Nm',
    drivetrain: 'Rear-Wheel Drive with PASM Sport',
    image: '/src/assets/images/car_porsche_911_1794232800353.jpg',
    gallery: [
      '/src/assets/images/car_porsche_911_1794232800353.jpg',
      '/src/assets/images/hero_porsche_cinematic_1794232747528.jpg'
    ],
    colors: [
      { name: 'GT Silver Metallic', hex: '#C0C0C8' },
      { name: 'Chalk Grey', hex: '#D8D8D4' },
      { name: 'Guards Red', hex: '#D11C1C' },
      { name: 'Jet Black Metallic', hex: '#111215' }
    ],
    interiorFeatures: [
      'Race-Tex and Black Smooth-Finish Leather Interior',
      'Adaptive Sports Seats Plus (18-way, electric) with memory',
      'Burmester® High-End Surround Sound System (855 Watts)',
      'Sport Chrono Package with analog stopwatch dial',
      'Carbon Fiber Interior Trim with contrast Carmine Red stitching'
    ],
    exteriorFeatures: [
      '20/21-inch Turbo S Center-Lock Satin Black Forged Wheels',
      'SportDesign Package with unique front fascia & rear diffuser',
      'LED Matrix Headlights with Porsche Dynamic Light System Plus (PDLS+)',
      'Sport Exhaust System with dual central twin tailpipes in Black Chrome',
      'Porsche Ceramic Composite Brakes (PCCB) with Red Calipers'
    ],
    status: 'In Showroom',
    description: 'The pinnacle of naturally athletic everyday performance. The 911 Carrera GTS merges razor-sharp chassis dynamics with iconic German engineering.',
    soundPreset: 'flat6'
  },
  {
    id: 'bmw-m4-competition',
    name: 'M4 Competition Coupé',
    brand: 'BMW M',
    year: 2024,
    price: 86300,
    mileage: '940 mi',
    fuelType: 'Gasoline',
    transmission: '8-Speed M Steptronic with Drivelogic',
    category: 'Sports Cars',
    horsepower: 503,
    topSpeed: '180 mph / 290 km/h (M Driver\'s)',
    acceleration: '3.4s (0-60 mph)',
    engine: '3.0L BMW M TwinPower Turbo S58 Inline-6',
    torque: '479 lb-ft / 650 Nm',
    drivetrain: 'M xDrive Intelligent All-Wheel Drive',
    image: '/src/assets/images/car_bmw_m4_1794232764604.jpg',
    gallery: [
      '/src/assets/images/car_bmw_m4_1794232764604.jpg'
    ],
    colors: [
      { name: 'Isle of Man Green Metallic', hex: '#1E5039' },
      { name: 'Frozen Brilliant White', hex: '#ECEEF2' },
      { name: 'Black Sapphire Metallic', hex: '#131416' },
      { name: 'Toronto Red', hex: '#BF1E1E' }
    ],
    interiorFeatures: [
      'M Carbon Bucket Seats with illuminated M badge',
      'BMW Curved Display with M-specific telemetry screens',
      'Harman Kardon® Surround Sound System',
      'Extended Merino Leather upholstery in Silverstone/Black',
      'Full Head-Up Display with track shift lights'
    ],
    exteriorFeatures: [
      'Carbon Fiber Reinforced Plastic (CFRP) Contoured Roof',
      '19"/20" M Double-spoke style 826M forged black wheels',
      'Shadowline Laserlight Headlights with blue accent strips',
      'Quad 100mm M Sport exhaust system with electronic flaps',
      'M Carbon Exterior Package (front air curtains, mirror caps, spoiler)'
    ],
    status: 'Exclusive',
    description: 'An aggressive track-bred predator. The BMW M4 Competition provides relentless twin-turbo acceleration and laser-precise handling.',
    soundPreset: 'inline6'
  },
  {
    id: 'mercedes-amg-c63-s',
    name: 'C63 S E-Performance',
    brand: 'Mercedes-AMG',
    year: 2024,
    price: 91500,
    mileage: '420 mi',
    fuelType: 'Hybrid',
    transmission: 'AMG SPEEDSHIFT MCT 9-Speed Dual-Clutch',
    category: 'Sedans',
    horsepower: 671,
    topSpeed: '174 mph / 280 km/h',
    acceleration: '3.3s (0-60 mph)',
    engine: '2.0L Turbocharged 4-Cyl + High-Output Rear Electric Motor',
    torque: '752 lb-ft / 1020 Nm',
    drivetrain: 'AMG Performance 4MATIC+ All-Wheel Drive with Drift Mode',
    image: '/src/assets/images/car_amg_c63_1794232835158.jpg',
    gallery: [
      '/src/assets/images/car_amg_c63_1794232835158.jpg'
    ],
    colors: [
      { name: 'Satin Obsidian Black', hex: '#1B1C1F' },
      { name: 'Selenite Grey Magno', hex: '#58595D' },
      { name: 'Manufaktur Opalite White', hex: '#EBEBEB' },
      { name: 'Patagonia Red', hex: '#9E1C1C' }
    ],
    interiorFeatures: [
      'AMG Performance Nappa Leather seats with yellow contrast stitching',
      'AMG Performance steering wheel with dynamic rotary selectors',
      'Burmester® 3D High-End 15-speaker audio',
      'Augmented Reality Navigation with Head-Up Display',
      '64-Color Ambient Lighting with active dynamic driving modes'
    ],
    exteriorFeatures: [
      'Vertical Panamericana AMG grille with illuminated star',
      '20-inch AMG cross-spoke forged matte black wheels',
      'AMG Aerodynamics Package with gloss carbon splitter & boot lip',
      'Digital Light Headlights with 1.3 million micro-mirrors per lamp',
      'AMG High-Performance Composite Braking System'
    ],
    status: 'In Showroom',
    description: 'Formula 1 hybrid power translated directly into road legal dominance. Unleashes an incredible 752 lb-ft of instant torque.',
    soundPreset: 'v8twin'
  },
  {
    id: 'lamborghini-huracan-tecnica',
    name: 'Huracán Tecnica',
    brand: 'Lamborghini',
    year: 2023,
    price: 249000,
    mileage: '1,890 mi',
    fuelType: 'Gasoline',
    transmission: '7-Speed Dual-Clutch LDF (Lamborghini Doppia Frizione)',
    category: 'Supercars',
    horsepower: 631,
    topSpeed: '202 mph / 325 km/h',
    acceleration: '2.9s (0-60 mph)',
    engine: '5.2L Naturally Aspirated V10 (Mid-Engine)',
    torque: '417 lb-ft / 565 Nm @ 6,500 rpm',
    drivetrain: 'Rear-Wheel Drive with Rear-Wheel Steering & Torque Vectoring',
    image: '/src/assets/images/car_lambo_huracan_1794232848403.jpg',
    gallery: [
      '/src/assets/images/car_lambo_huracan_1794232848403.jpg'
    ],
    colors: [
      { name: 'Nero Nemesis Matte', hex: '#161618' },
      { name: 'Rosso Mars Crimson', hex: '#C21010' },
      { name: 'Verde Mantis Pearl', hex: '#31A334' },
      { name: 'Giallo Inti Metallic', hex: '#E8B923' }
    ],
    interiorFeatures: [
      'Lightweight Carbon Fiber Sport Seats in Alcantara®',
      'Lamborghini Infotainment System (LIS) with telemetry recorder',
      'Sensonum® 390W Audio System with active cabin acoustics',
      'Laser-etched hexagonal design motif throughout cabin',
      'Carbon skin door panels with pull-straps'
    ],
    exteriorFeatures: [
      'Fixed rear wing delivering +35% downforce improvement',
      '20-inch Damiso diamond-cut center-lock wheels',
      'Hexagonal dual exhaust tips with tuned sport acoustic chambers',
      'Carbon fiber front bonnet & engine louvre cover',
      'Carbon Ceramic Brakes (CCB) with Monobloc 6-piston calipers'
    ],
    status: 'In Showroom',
    description: 'The purest acoustic symphony in the supercar universe. A screaming 5.2-liter naturally aspirated V10 revving freely past 8,500 RPM.',
    soundPreset: 'v10na'
  },
  {
    id: 'ferrari-roma-spider',
    name: 'Roma Spider',
    brand: 'Ferrari',
    year: 2024,
    price: 277000,
    mileage: '630 mi',
    fuelType: 'Gasoline',
    transmission: '8-Speed F1 Dual-Clutch Gearbox',
    category: 'Supercars',
    horsepower: 612,
    topSpeed: '199 mph / 320 km/h',
    acceleration: '3.1s (0-60 mph)',
    engine: '3.9L 90° Twin-Turbocharged V8',
    torque: '561 lb-ft / 760 Nm',
    drivetrain: 'Rear-Wheel Drive with E-Diff 3 & Side Slip Control (SSC 6.0)',
    image: '/src/assets/images/car_ferrari_roma_1794232819867.jpg',
    gallery: [
      '/src/assets/images/car_ferrari_roma_1794232819867.jpg'
    ],
    colors: [
      { name: 'Grigio Silverstone', hex: '#4B4D52' },
      { name: 'Rosso Corsa Heritage', hex: '#D40000' },
      { name: 'Blu Pozzi Navy', hex: '#162238' },
      { name: 'Nero Daytona', hex: '#141416' }
    ],
    interiorFeatures: [
      'Dual Cockpit architecture with dedicated passenger display',
      'Poltrona Frau® full-grain Italian leather with hand-finished piping',
      '16-inch curved digital instrument cluster with classic yellow tachometer',
      'Touch capacitive haptic steering wheel with iconic red Manettino dial',
      'High-grade machined aluminum F1 shift paddles'
    ],
    exteriorFeatures: [
      'Tailored bespoke 5-layer fabric soft top (deploys in 13.5s at up to 37 mph)',
      'Monolithic minimal grille with color-matched perforated mesh',
      '20-inch forged diamond-polished wheels with titanium studs',
      'Mobile active rear spoiler integrated cleanly into rear screen',
      'Carbon-ceramic brakes with iconic Scuderia Ferrari shield inlays'
    ],
    status: 'Just Arrived',
    description: 'La Nuova Dolce Vita. A contemporary representation of the carefree Italian lifestyle of the 1950s and 60s, matched with peerless twin-turbo Ferrari V8 ferocity.',
    soundPreset: 'v8twin'
  },
  {
    id: 'audi-rs7-sportback',
    name: 'RS7 Sportback Performance',
    brand: 'Audi Sport',
    year: 2024,
    price: 128500,
    mileage: '1,120 mi',
    fuelType: 'Gasoline',
    transmission: '8-Speed Tiptronic with DSP & Sport Mode',
    category: 'Luxury Cars',
    horsepower: 621,
    topSpeed: '190 mph / 305 km/h (Dynamic Plus)',
    acceleration: '3.3s (0-60 mph)',
    engine: '4.0L Twin-Turbocharged V8 with 48V Mild Hybrid',
    torque: '627 lb-ft / 850 Nm',
    drivetrain: 'quattro Permanent AWD with Sport Differential',
    image: '/src/assets/images/hero_porsche_cinematic_1794232747528.jpg',
    gallery: [
      '/src/assets/images/hero_porsche_cinematic_1794232747528.jpg'
    ],
    colors: [
      { name: 'Nardo Grey', hex: '#777B80' },
      { name: 'Mythos Black Metallic', hex: '#101114' },
      { name: 'Sebring Black Crystal', hex: '#171B24' },
      { name: 'Tango Red Metallic', hex: '#A81D1D' }
    ],
    interiorFeatures: [
      'Valcona Leather Sport Seats with honeycomb stitching and RS embossing',
      'Bang & Olufsen® Advanced Sound System with 3D Sound (1,820W, 19 speakers)',
      'Audi Virtual Cockpit Plus with RS-exclusive runway display',
      'Matte Carbon Twill inlays with illuminated RS door sills',
      'Panoramic acoustic glass sunroof with power sunshade'
    ],
    exteriorFeatures: [
      '22-inch lightweight matte titanium 5-Y-spoke forged wheels',
      'HD Matrix-design LED headlights with Audi laser light',
      'Gloss black RS exterior package with wide-body flares (+40mm)',
      'RS sport exhaust with oval black chrome finishers',
      'Dynamic all-wheel steering for effortless high-speed lane shifts'
    ],
    status: 'In Showroom',
    description: 'Breathtaking 5-door gran turismo silhouette wrapped around a savage 621 HP twin-turbo V8. The quintessential daily supercar.',
    soundPreset: 'v8twin'
  },
  {
    id: 'porsche-taycan-turbo-s',
    name: 'Taycan Turbo S Cross',
    brand: 'Porsche',
    year: 2024,
    price: 198000,
    mileage: '490 mi',
    fuelType: 'Electric',
    transmission: '2-Speed Automatic on Rear Axle, 1-Speed Front',
    category: 'Electric Cars',
    horsepower: 750,
    topSpeed: '162 mph / 260 km/h',
    acceleration: '2.6s (0-60 mph with Launch Control)',
    engine: 'Permanent Magnet Synchronous Motors (Dual e-Motors)',
    torque: '774 lb-ft / 1,050 Nm',
    drivetrain: 'Porsche Traction Management (PTM) Intelligent AWD',
    image: '/src/assets/images/car_porsche_911_1794232800353.jpg',
    gallery: [
      '/src/assets/images/car_porsche_911_1794232800353.jpg'
    ],
    colors: [
      { name: 'Frozen Blue Metallic', hex: '#6D8DA6' },
      { name: 'Volcano Grey Metallic', hex: '#484B50' },
      { name: 'Carrara White Metallic', hex: '#F0F0F2' },
      { name: 'Black', hex: '#0C0D0F' }
    ],
    interiorFeatures: [
      'Olea Club Leather interior in Basalt Black',
      'Passenger Display with dedicated infotainment control',
      'Porsche Electric Sport Sound with acoustic chassis modulation',
      'Advanced 4-Zone Climate Control with touch air vents',
      'Panoramic glass roof with Variable Light Control liquid crystal film'
    ],
    exteriorFeatures: [
      '21-inch Mission E Design wheels painted in High Gloss Black',
      'Porsche Ceramic Composite Brakes (PCCB) with Acid Green calipers',
      'LED Matrix Headlights in Glacier Ice Blue with PDLS+',
      'Off-Road Design Package with carbon fiber aerodynamic blades',
      'Rear light bar with 3D glass "PORSCHE" logo'
    ],
    status: 'Exclusive',
    description: 'Electric propulsion redefined by Weissach. Rocket from 0 to 60 mph in 2.6 seconds with neck-snapping 774 lb-ft of instantaneous torque.',
    soundPreset: 'evwhine'
  },
  {
    id: 'aston-martin-db12',
    name: 'DB12 Super Tourer',
    brand: 'Aston Martin',
    year: 2024,
    price: 245000,
    mileage: '310 mi',
    fuelType: 'Gasoline',
    transmission: '8-Speed Automatic with Electronic Rear Diff',
    category: 'Luxury Cars',
    horsepower: 671,
    topSpeed: '202 mph / 325 km/h',
    acceleration: '3.5s (0-60 mph)',
    engine: '4.0L Hand-Built Twin-Turbo V8',
    torque: '590 lb-ft / 800 Nm',
    drivetrain: 'Rear-Wheel Drive with Electronic Limited Slip Differential (E-diff)',
    image: '/src/assets/images/hero_porsche_cinematic_1794232747528.jpg',
    gallery: [
      '/src/assets/images/hero_porsche_cinematic_1794232747528.jpg'
    ],
    colors: [
      { name: 'Aston Martin Racing Green', hex: '#1C3A27' },
      { name: 'Satin Titanium Grey', hex: '#5E6066' },
      { name: 'Hyper Red', hex: '#BA1717' },
      { name: 'Onyx Black', hex: '#111214' }
    ],
    interiorFeatures: [
      'Hand-stitched Bridge of Weir aromatic semi-aniline leather',
      'Bowers & Wilkins 1,170W 15-speaker Surround Sound System',
      'Next-generation 10.25-inch pure capacitive touchscreen with Apple CarPlay',
      'Solid knurled metal rotary gear selector and tactile controls',
      'Satin carbon fiber center console bridge'
    ],
    exteriorFeatures: [
      'Enlarged iconic Aston Martin vane grille (+56% cooling aperture)',
      '21-inch forged alloy wheels with Michelin Pilot Sport 5S (AML spec)',
      'New hand-enameled Aston Martin wings badge at front and rear',
      'Frameless aerodynamic side mirrors with auto-dimming glass',
      'Quad stainless steel active exhaust with deep British baritone rumble'
    ],
    status: 'In Showroom',
    description: 'Not merely a GT, but the world\'s first Super Tourer. Hand-assembled British grandeur combined with brutal twin-turbo power.',
    soundPreset: 'v8twin'
  }
];

export const CATEGORIES_DATA = [
  {
    id: 'Sports Cars',
    title: 'Sports Cars',
    count: 24,
    description: 'Precision-tuned handling, lightweight agility, and pure mechanical connection with the road.',
    accent: 'From 473 HP',
    image: '/src/assets/images/car_porsche_911_1794232800353.jpg'
  },
  {
    id: 'Supercars',
    title: 'Supercars',
    count: 12,
    description: 'Exotic mid-engine architecture, aerodynamic extremes, and sub-3-second acceleration.',
    accent: 'Up to 202 MPH',
    image: '/src/assets/images/car_lambo_huracan_1794232848403.jpg'
  },
  {
    id: 'Luxury Cars',
    title: 'Luxury Cars',
    count: 18,
    description: 'Hand-crafted grand tourers with acoustic glass, acoustic damping, and executive tranquility.',
    accent: 'V8 & V12 Grand Tourers',
    image: '/src/assets/images/hero_porsche_cinematic_1794232747528.jpg'
  },
  {
    id: 'Electric Cars',
    title: 'Electric Cars',
    count: 9,
    description: 'Instantaneous electric torque, zero emissions, and cutting-edge 800V charging architectures.',
    accent: 'Up to 750 HP EV',
    image: '/src/assets/images/car_bmw_m4_1794232764604.jpg'
  },
  {
    id: 'Sedans',
    title: 'Sedans',
    count: 15,
    description: 'High-performance four-door executive missiles delivering track capability with daily utility.',
    accent: 'Sub-3.5s 0-60',
    image: '/src/assets/images/car_amg_c63_1794232835158.jpg'
  },
  {
    id: 'SUVs',
    title: 'SUVs',
    count: 14,
    description: 'Uncompromising high-riding power with all-terrain all-wheel drive stability and commanding presence.',
    accent: 'Twin-Turbo V8 AWD',
    image: '/src/assets/images/car_ferrari_roma_1794232819867.jpg'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-1',
    name: 'Julian Vance-Moreau',
    role: 'Private Equity Partner',
    city: 'Zurich / London',
    carPurchased: '2024 Porsche 911 Carrera GTS',
    rating: 5,
    quote: 'Elite Drive delivers what traditional franchised dealers fail at: absolute transparency, bespoke white-glove transport, and automotive passion that matches our own. The car arrived immaculate with complete documentation in 48 hours.',
    verifiedOwner: true,
    date: 'October 2024'
  },
  {
    id: 't-2',
    name: 'Elena Rostova',
    role: 'Tech Founder & Collector',
    city: 'Monaco / Milan',
    carPurchased: '2024 Ferrari Roma Spider',
    rating: 5,
    quote: 'The private concierge test drive session on closed mountain roads convinced me immediately. The vehicle was configured to bespoke perfection. Their inspection team pointed out details even Ferrari factory inspectors might overlook.',
    verifiedOwner: true,
    date: 'November 2024'
  },
  {
    id: 't-3',
    name: 'Marcus Sterling',
    role: 'Architectural Director',
    city: 'Los Angeles, CA',
    carPurchased: '2024 BMW M4 Competition',
    rating: 5,
    quote: 'From custom lease structuring to doorstep enclosed trailer delivery in Beverly Hills, the Elite Drive team operates at the standard of private aviation. Exceptional experience.',
    verifiedOwner: true,
    date: 'December 2024'
  }
];

export const SHOWROOM_LOCATIONS = [
  {
    city: 'Beverly Hills',
    address: '9600 Wilshire Boulevard, Beverly Hills, CA 90212',
    phone: '+1 (310) 845-9200',
    email: 'beverlyhills@elitedrive.com',
    hours: 'Mon – Sat: 09:00 – 19:00'
  },
  {
    city: 'London Mayfair',
    address: '42 Berkeley Square, Mayfair, London W1J 5AW',
    phone: '+44 20 7946 0912',
    email: 'mayfair@elitedrive.com',
    hours: 'Mon – Sat: 09:30 – 18:30'
  },
  {
    city: 'Stuttgart',
    address: 'Königstraße 18, 70173 Stuttgart, Germany',
    phone: '+49 711 9283 04',
    email: 'stuttgart@elitedrive.com',
    hours: 'Mon – Fri: 09:00 – 19:00'
  },
  {
    city: 'Dubai DIFC',
    address: 'Gate Precinct 4, DIFC, Dubai, UAE',
    phone: '+971 4 362 7000',
    email: 'dubai@elitedrive.com',
    hours: 'Sun – Thu: 10:00 – 21:00'
  }
];
