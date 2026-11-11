import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedCars } from './components/FeaturedCars';
import { CarCategories } from './components/CarCategories';
import { CarShowcase } from './components/CarShowcase';
import { WhyChooseUs } from './components/WhyChooseUs';
import { VideoExperience } from './components/VideoExperience';
import { Testimonials } from './components/Testimonials';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';
import { TestDriveModal } from './components/TestDriveModal';
import { CarDetailModal } from './components/CarDetailModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { ContactModal } from './components/ContactModal';
import { ThreeDGarageView } from './components/ThreeDGarage/ThreeDGarageView';
import { AdminPanel } from './components/Admin/AdminPanel';
import { AuthModal } from './components/Auth/AuthModal';
import { PWAInstallButton } from './components/PWAInstallButton';
import { DatabaseService } from './services/db';
import {
  DynamicCar,
  Brand,
  CategoryItem,
  User,
  TestDriveBooking,
  CustomerInquiry,
  WebsiteSettings
} from './types/database';
import { Car, CarCategory } from './types/car';
import { Box, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Download } from 'lucide-react';

export default function App() {
  // Dynamic Database State with immediate initial seed data
  const [cars, setCars] = useState<DynamicCar[]>(() => DatabaseService.getCarsSync());
  const [brands, setBrands] = useState<Brand[]>(() => DatabaseService.getBrandsSync());
  const [categories, setCategories] = useState<CategoryItem[]>(() => DatabaseService.getCategoriesSync());
  const [bookings, setBookings] = useState<TestDriveBooking[]>([]);
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(() => DatabaseService.getCurrentUserSync());
  const [settings, setSettings] = useState<WebsiteSettings | null>(() => DatabaseService.getSettingsSync());
  const [isLoading, setIsLoading] = useState(false);

  // View state: 'home' | 'garage' | 'admin'
  const [currentView, setCurrentView] = useState<'home' | 'garage' | 'admin'>('home');
  const [garageCarId, setGarageCarId] = useState<string | undefined>(undefined);

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('elitedrive_wishlist');
      return saved ? JSON.parse(saved) : ['porsche-911-carrera-gts', 'lamborghini-huracan-tecnica'];
    } catch {
      return ['porsche-911-carrera-gts', 'lamborghini-huracan-tecnica'];
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CarCategory>('All');

  // Modals & Drawers
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);
  const [selectedCarForDrive, setSelectedCarForDrive] = useState<Car | null>(null);
  const [selectedCarForDetail, setSelectedCarForDetail] = useState<Car | null>(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Load all dynamic data from DatabaseService
  const loadDatabaseData = async () => {
    try {
      setIsLoading(true);
      const [c, b, cat, book, inq, u, currUser, s] = await Promise.all([
        DatabaseService.getCars(),
        DatabaseService.getBrands(),
        DatabaseService.getCategories(),
        DatabaseService.getBookings(),
        DatabaseService.getInquiries(),
        DatabaseService.getUsers(),
        DatabaseService.getCurrentUser(),
        DatabaseService.getSettings()
      ]);

      setCars(c);
      setBrands(b);
      setCategories(cat);
      setBookings(book);
      setInquiries(inq);
      setUsers(u);
      setCurrentUser(currUser);
      setSettings(s);
    } catch (err) {
      console.error('Failed to load database:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDatabaseData();
  }, []);

  // Sync wishlist to local storage
  useEffect(() => {
    try {
      localStorage.setItem('elitedrive_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // LocalStorage fallback
    }
  }, [wishlistIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleToggleWishlist = (carId: string) => {
    const car = cars.find((c) => c.id === carId);
    if (wishlistIds.includes(carId)) {
      setWishlistIds((prev) => prev.filter((id) => id !== carId));
      if (car) showToast(`Removed ${car.name} from VIP Garage`);
    } else {
      setWishlistIds((prev) => [...prev, carId]);
      if (car) showToast(`Saved ${car.name} to VIP Garage`);
    }
  };

  const handleBookDriveForCar = (car: Car | DynamicCar) => {
    setSelectedCarForDrive(car as Car);
    setIsTestDriveOpen(true);
  };

  const handleGeneralBookDrive = () => {
    if (cars.length > 0) {
      setSelectedCarForDrive(cars[0] as unknown as Car);
    }
    setIsTestDriveOpen(true);
  };

  const handleConfirmBooking = async (booking: any) => {
    await DatabaseService.saveBooking(booking);
    await loadDatabaseData();
    showToast(`Test drive scheduled for ${booking.carName}!`);
  };

  const handleNavigateSection = (sectionId: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnterGarage = (carId?: string) => {
    setGarageCarId(carId || cars[0]?.id);
    setCurrentView('garage');
  };

  // Convert DynamicCar to compatible legacy Car interface for components
  const compatibleCars: Car[] = (cars || []).filter((c): c is DynamicCar => Boolean(c && c.id)).map((c) => ({
    id: c.id,
    name: c.name || 'Masterpiece',
    brand: c.brand || 'Elite Drive',
    year: c.year || 2025,
    price: c.price || 150000,
    mileage: c.mileage || 'Delivery Miles',
    fuelType: c.fuelType || 'High-Performance',
    transmission: c.transmission || 'Automatic Dual-Clutch',
    category: (c.category || 'Sports Cars') as CarCategory,
    horsepower: c.horsepower || 550,
    topSpeed: c.topSpeed || '195 mph',
    acceleration: c.acceleration || '3.2 s',
    engine: c.engine || 'V8 Bi-Turbo',
    torque: c.torque || '550 lb-ft',
    drivetrain: 'Rear-Wheel Drive / PASM',
    image: c.image || 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
    gallery: (Array.isArray(c.gallery) && c.gallery.length > 0) ? c.gallery : [c.image || 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80'],
    colors: [
      { name: 'GT Silver', hex: '#c0c0c8' },
      { name: 'Nero Black', hex: '#161618' },
      { name: 'Rosso Corsa', hex: '#d11c1c' },
      { name: 'Racing Green', hex: '#1e5039' }
    ],
    interiorFeatures: Array.isArray(c.features) ? c.features.slice(0, 4) : ['Alcantara Trim', 'Carbon Cockpit'],
    exteriorFeatures: Array.isArray(c.features) ? c.features.slice(2, 6) : ['Forged Wheels', 'Active Wing'],
    status: c.availabilityStatus === 'Available' ? 'In Showroom' : 'Exclusive',
    description: c.description || 'High-performance luxury automobile engineered for peak exhilaration.',
    soundPreset: c.soundPreset || 'v8twin'
  }));

  const savedCars = compatibleCars.filter((car) => wishlistIds.includes(car.id));

  // VIEW: 3D GARAGE
  if (currentView === 'garage') {
    return (
      <ThreeDGarageView
        cars={cars}
        selectedCarId={garageCarId}
        onClose={() => setCurrentView('home')}
        onBookDrive={(car) => handleBookDriveForCar(car)}
      />
    );
  }

  // VIEW: ADMIN PANEL
  if (currentView === 'admin') {
    return (
      <AdminPanel
        currentUser={currentUser}
        cars={cars}
        brands={brands}
        categories={categories}
        bookings={bookings}
        inquiries={inquiries}
        users={users}
        settings={settings || {
          dealershipName: 'ELITE DRIVE',
          tagline: 'Find Your Next Drive.',
          phone: '+1 (310) 845-9200',
          email: 'concierge@elitedrive.com',
          currencySymbol: '$',
          salesTaxPercentage: 8.5,
          bannerAnnouncement: 'Private Allocations Open for 2026 Fleet',
          maintenanceMode: false
        }}
        onRefreshData={loadDatabaseData}
        onExitAdmin={() => setCurrentView('home')}
        onOpenGarage={() => setCurrentView('garage')}
      />
    );
  }

  // VIEW: MAIN DYNAMIC SHOWROOM
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Top Notification Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-xl glass-panel border border-red-500/40 text-white shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-3 duration-300">
          <div className="w-7 h-7 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Top Flagship Banner Announcement */}
      {settings?.bannerAnnouncement && (
        <div className="bg-gradient-to-r from-neutral-950 via-red-950/60 to-neutral-950 border-b border-red-500/20 py-2 px-4 text-center text-xs text-neutral-300 z-40 hidden sm:block">
          <span className="font-semibold text-red-400 mr-2 uppercase tracking-wider text-[10px]">
            VIP Dispatch:
          </span>
          <span>{settings.bannerAnnouncement}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        wishlistCount={wishlistIds.length}
        currentUser={currentUser}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAuthOpen(true)}
        onOpenGarage={() => handleEnterGarage()}
        onOpenAdmin={() => setCurrentView('admin')}
        onBookTestDrive={handleGeneralBookDrive}
        onNavigateSection={handleNavigateSection}
      />

      <main className="flex-1">
        {/* Full-Screen Hero Section */}
        <HeroSection
          onExploreCars={() => handleNavigateSection('featured-cars')}
          onBookTestDrive={handleGeneralBookDrive}
        />

        {/* 3D GARAGE HERO PROMOTION BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-16 relative z-20">
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-red-500/30 shadow-2xl relative overflow-hidden bg-gradient-to-r from-neutral-900/95 via-neutral-950/90 to-neutral-900/95">
            <div className="absolute top-0 right-0 w-96 h-full bg-red-600/10 blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/40 text-[11px] font-bold uppercase tracking-wider text-red-400">
                  <Box className="w-3.5 h-3.5" />
                  <span>Next-Generation WebGL Experience</span>
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                  ENTER THE INTERACTIVE 3D GARAGE
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm max-w-xl leading-relaxed">
                  Step inside our futuristic virtual showroom. Rotate in 360°, inspect mechanical hotspots, configure bespoke finishes, and activate the smooth <strong>Exploded View</strong> separating chassis, engine, and carbon aerodynamics.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleEnterGarage()}
                  className="px-6 py-3.5 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-red-950/60 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Box className="w-4 h-4" />
                  <span>Launch 3D Garage</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Collection Grid (Dynamic from Database) */}
        <FeaturedCars
          cars={compatibleCars}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onSelectCar={(car) => setSelectedCarForDetail(car)}
          onBookDrive={(car) => handleBookDriveForCar(car)}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Car Categories */}
        <CarCategories
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
          }}
        />

        {/* Interactive Car Showcase */}
        <CarShowcase
          cars={compatibleCars}
          onBookDrive={(car) => handleBookDriveForCar(car)}
          onOpenDetailModal={(car) => setSelectedCarForDetail(car)}
        />

        {/* Why Choose Elite Drive (6 certified features) */}
        <WhyChooseUs />

        {/* Full-Width Video Experience */}
        <VideoExperience
          onExploreCollection={() => handleNavigateSection('featured-cars')}
        />

        {/* Customer Experience (Testimonials) */}
        <Testimonials />

        {/* PWA Install Ribbon Callout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
          <PWAInstallButton variant="banner" />
        </div>

        {/* Call to Action */}
        <CallToAction
          onExploreCollection={() => handleNavigateSection('featured-cars')}
          onContactUs={() => setIsContactOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenContactModal={() => setIsContactOpen(true)}
      />

      {/* Interactive Modals & Drawers */}
      <TestDriveModal
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
        selectedCar={selectedCarForDrive}
        cars={compatibleCars}
        onConfirmBooking={handleConfirmBooking}
      />

      <CarDetailModal
        car={selectedCarForDetail}
        isOpen={!!selectedCarForDetail}
        onClose={() => setSelectedCarForDetail(null)}
        isWishlisted={selectedCarForDetail ? wishlistIds.includes(selectedCarForDetail.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onBookDrive={(car) => handleBookDriveForCar(car)}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        savedCars={savedCars}
        onRemoveFromWishlist={handleToggleWishlist}
        onSelectCar={(car) => setSelectedCarForDetail(car)}
        onBookDrive={(car) => handleBookDriveForCar(car)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        cars={compatibleCars}
        onSelectCar={(car) => setSelectedCarForDetail(car)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={(u) => {
          setCurrentUser(u);
          showToast(`Logged in as ${u.name} (${u.role})`);
        }}
        onLogout={async () => {
          await DatabaseService.setCurrentUser(null);
          setCurrentUser(null);
          showToast('Signed out of Elite Drive portal');
        }}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
