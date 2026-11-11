import React, { useState } from 'react';
import {
  LayoutDashboard,
  Car as CarIcon,
  Layers,
  Tag,
  Box,
  Users,
  Calendar,
  MessageSquare,
  Sparkles,
  Image,
  Settings,
  BarChart3,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  Eye,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  Clock,
  ChevronRight,
  ShieldAlert,
  ArrowUpRight,
  Check,
  X
} from 'lucide-react';
import {
  DynamicCar,
  Brand,
  CategoryItem,
  User,
  TestDriveBooking,
  CustomerInquiry,
  WebsiteSettings
} from '../../types/database';
import { DatabaseService } from '../../services/db';

interface AdminPanelProps {
  currentUser: User | null;
  cars: DynamicCar[];
  brands: Brand[];
  categories: CategoryItem[];
  bookings: TestDriveBooking[];
  inquiries: CustomerInquiry[];
  users: User[];
  settings: WebsiteSettings;
  onRefreshData: () => Promise<void>;
  onExitAdmin: () => void;
  onOpenGarage: () => void;
}

type AdminTab =
  | 'dashboard'
  | 'cars'
  | 'brands'
  | 'categories'
  | 'garage'
  | 'customers'
  | 'bookings'
  | 'inquiries'
  | 'featured'
  | 'media'
  | 'settings'
  | 'users'
  | 'analytics';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  currentUser,
  cars,
  brands,
  categories,
  bookings,
  inquiries,
  users,
  settings,
  onRefreshData,
  onExitAdmin,
  onOpenGarage
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal states for CRUD
  const [editingCar, setEditingCar] = useState<Partial<DynamicCar> | null>(null);
  const [isCarModalOpen, setIsCarModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Settings local state
  const [localSettings, setLocalSettings] = useState<WebsiteSettings>(settings);
  const [isConfirmingRestore, setIsConfirmingRestore] = useState(false);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Check RBAC protection
  if (!currentUser || currentUser.role !== 'Admin') {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 text-white">
        <div className="glass-panel p-8 rounded-2xl max-w-md text-center border border-red-500/40">
          <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="font-display font-black text-2xl uppercase tracking-wider mb-2">
            Access Restricted
          </h2>
          <p className="text-sm text-neutral-400 mb-6">
            Administrative credentials are required to enter the Elite Drive Management Console.
          </p>
          <button
            onClick={onExitAdmin}
            className="px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider"
          >
            Return to Showroom
          </button>
        </div>
      </div>
    );
  }

  // Dashboard Stats Calculations
  const totalCars = cars.length;
  const availableCars = cars.filter((c) => c.availabilityStatus === 'Available').length;
  const soldCars = cars.filter((c) => c.availabilityStatus === 'Sold').length;
  const totalUsers = users.length;
  const newInquiries = inquiries.filter((i) => i.status === 'New').length;
  const testDriveRequests = bookings.filter((b) => b.status === 'Pending').length;
  const totalInventoryValue = cars.reduce((acc, c) => acc + c.price, 0);

  // Car Management actions
  const handleSaveCar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCar || !editingCar.name) return;

    await DatabaseService.saveCar(editingCar);
    await onRefreshData();
    setIsCarModalOpen(false);
    setEditingCar(null);
    showToast('Vehicle specification dossier saved successfully.');
  };

  const handleDeleteCar = async (id: string) => {
    if (confirm('Are you sure you want to remove this vehicle from the database?')) {
      await DatabaseService.deleteCar(id);
      await onRefreshData();
      showToast('Vehicle deleted from catalog.');
    }
  };

  const handleToggleSold = async (car: DynamicCar) => {
    const nextStatus = car.availabilityStatus === 'Sold' ? 'Available' : 'Sold';
    await DatabaseService.saveCar({ ...car, availabilityStatus: nextStatus });
    await onRefreshData();
    showToast(`Vehicle marked as ${nextStatus}.`);
  };

  const handleToggleFeatured = async (car: DynamicCar) => {
    await DatabaseService.saveCar({ ...car, isFeatured: !car.isFeatured });
    await onRefreshData();
    showToast(`Vehicle ${car.isFeatured ? 'removed from' : 'added to'} featured showroom.`);
  };

  // Booking actions
  const handleBookingStatus = async (id: string, status: TestDriveBooking['status']) => {
    await DatabaseService.updateBookingStatus(id, status);
    await onRefreshData();
    showToast(`Booking ${id} status updated to ${status}.`);
  };

  // Inquiry actions
  const handleInquiryStatus = async (id: string, status: CustomerInquiry['status']) => {
    await DatabaseService.updateInquiryStatus(id, status);
    await onRefreshData();
    showToast(`Inquiry marked as ${status}.`);
  };

  // Settings save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await DatabaseService.saveSettings(localSettings);
    await onRefreshData();
    showToast('Website configurations and flagship settings deployed.');
  };

  const filteredCars = cars.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.availabilityStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col md:flex-row antialiased">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 glass-panel border border-red-500/50 p-4 rounded-xl text-white shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-red-500" />
          <span className="text-xs font-semibold">{toastMsg}</span>
        </div>
      )}

      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-black border-r border-white/10 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-red-600 flex items-center justify-center font-display font-black text-xs text-white">
                ED
              </div>
              <div>
                <span className="font-display font-black text-sm tracking-[0.2em] text-white">
                  ELITE DRIVE
                </span>
                <span className="block text-[10px] text-red-500 font-mono tracking-wider">
                  ADMIN CONSOLE
                </span>
              </div>
            </div>
          </div>

          {/* User Badge */}
          <div className="px-6 py-4 bg-neutral-900/60 border-b border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-neutral-800 border border-white/15 flex items-center justify-center text-xs font-bold text-red-400">
              AD
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
              <div className="text-[10px] text-neutral-400 truncate">{currentUser.email}</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 text-xs">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'cars', label: 'Cars', icon: CarIcon, badge: totalCars },
              { id: 'brands', label: 'Brands', icon: Tag },
              { id: 'categories', label: 'Categories', icon: Layers },
              { id: 'garage', label: '3D Garage', icon: Box },
              { id: 'bookings', label: 'Test Drive Bookings', icon: Calendar, badge: testDriveRequests },
              { id: 'inquiries', label: 'Inquiries', icon: MessageSquare, badge: newInquiries },
              { id: 'featured', label: 'Featured Cars', icon: Sparkles },
              { id: 'customers', label: 'Customers', icon: Users },
              { id: 'settings', label: 'Website Settings', icon: Settings },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (tab.id === 'garage') {
                      onOpenGarage();
                    } else {
                      setActiveTab(tab.id as AdminTab);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono-numbers ${
                      isActive ? 'bg-black/40 text-white' : 'bg-red-950 text-red-400 border border-red-500/30'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            onClick={onExitAdmin}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-white/15 bg-neutral-900 hover:bg-white/10 text-xs font-semibold text-neutral-300 hover:text-white transition-all cursor-pointer"
          >
            <ArrowUpRight className="w-3.5 h-3.5 text-red-500" />
            <span>Return to Public Site</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Viewport */}
      <main className="flex-1 overflow-y-auto p-6 sm:p-10 no-scrollbar">
        {/* TAB: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                  ADMINISTRATIVE OVERVIEW
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  Real-time inventory metrics, test drive logistics, and private acquisitions.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setEditingCar({});
                    setIsCarModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-red-950/50"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Car</span>
                </button>
                <button
                  onClick={onOpenGarage}
                  className="px-4 py-2.5 rounded-lg border border-white/15 bg-neutral-900 hover:bg-white/10 text-xs font-semibold text-white flex items-center gap-2"
                >
                  <Box className="w-4 h-4 text-red-500" />
                  <span>3D Garage Mode</span>
                </button>
              </div>
            </div>

            {/* Dynamic Statistics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-panel p-5 rounded-xl border border-white/10">
                <div className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider mb-1">
                  Total Showroom Fleet
                </div>
                <div className="font-mono-numbers text-3xl font-black text-white">
                  {totalCars}
                </div>
                <div className="text-[11px] text-neutral-400 mt-2 flex items-center gap-1.5">
                  <span className="text-emerald-400 font-semibold">{availableCars} Available</span>
                  <span>·</span>
                  <span className="text-red-400">{soldCars} Sold</span>
                </div>
              </div>

              <div className="glass-panel p-5 rounded-xl border border-white/10">
                <div className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider mb-1">
                  Active Inquiries
                </div>
                <div className="font-mono-numbers text-3xl font-black text-red-500">
                  {newInquiries}
                </div>
                <div className="text-[11px] text-neutral-400 mt-2">
                  {inquiries.length} total customer leads
                </div>
              </div>

              <div className="glass-panel p-5 rounded-xl border border-white/10">
                <div className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider mb-1">
                  Test Drive Requests
                </div>
                <div className="font-mono-numbers text-3xl font-black text-white">
                  {testDriveRequests}
                </div>
                <div className="text-[11px] text-neutral-400 mt-2">
                  {bookings.length} reservations logged
                </div>
              </div>

              <div className="glass-panel p-5 rounded-xl border border-white/10">
                <div className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider mb-1">
                  Portfolio Valuation
                </div>
                <div className="font-mono-numbers text-2xl font-black text-white truncate">
                  ${(totalInventoryValue / 1000000).toFixed(2)}M
                </div>
                <div className="text-[11px] text-neutral-400 mt-2">
                  Average MSRP: ${Math.round(totalInventoryValue / Math.max(1, totalCars)).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Dual Column: Recent Bookings & Inquiries */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Test Drive Bookings */}
              <div className="glass-panel rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-red-500" />
                    <span>Recent Test Drive Bookings</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="text-xs text-red-400 hover:text-red-300 font-semibold"
                  >
                    View All ({bookings.length})
                  </button>
                </div>

                <div className="space-y-3">
                  {bookings.slice(0, 4).map((b) => (
                    <div
                      key={b.id}
                      className="p-3.5 rounded-xl bg-neutral-900/60 border border-white/5 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-white">{b.carName}</div>
                        <div className="text-neutral-400 text-[11px]">
                          {b.clientName} · {b.preferredDate} ({b.preferredTime})
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          b.status === 'Confirmed'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                            : b.status === 'Pending'
                            ? 'bg-amber-950 text-amber-400 border border-amber-500/30'
                            : 'bg-neutral-800 text-neutral-400'
                        }`}>
                          {b.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Customer Inquiries */}
              <div className="glass-panel rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-red-500" />
                    <span>Recent Private Inquiries</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className="text-xs text-red-400 hover:text-red-300 font-semibold"
                  >
                    View All ({inquiries.length})
                  </button>
                </div>

                <div className="space-y-3">
                  {inquiries.slice(0, 4).map((i) => (
                    <div
                      key={i.id}
                      className="p-3.5 rounded-xl bg-neutral-900/60 border border-white/5 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{i.name}</span>
                        <span className="text-[10px] text-neutral-500 font-mono-numbers">{i.id}</span>
                      </div>
                      <div className="text-neutral-300 text-[11px] line-clamp-1">{i.subject}</div>
                      <div className="text-neutral-500 text-[10px] line-clamp-1 italic">"{i.message}"</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: CARS INVENTORY MANAGEMENT */}
        {activeTab === 'cars' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display font-black text-2xl uppercase tracking-tight text-white">
                  CAR INVENTORY MANAGEMENT
                </h1>
                <p className="text-xs text-neutral-400 mt-1">
                  Dynamic database repository. Add, edit, remove, mark sold, and customize 3D showroom models.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingCar({});
                  setIsCarModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Vehicle</span>
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl glass-panel border border-white/10 text-xs">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by vehicle name, brand, or category..."
                  className="w-full bg-neutral-900 border border-white/15 focus:border-red-500 rounded-lg py-2 pl-8 pr-3 text-white placeholder-neutral-500 focus:outline-none"
                />
                <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-3" />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-neutral-400">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-neutral-900 border border-white/15 text-white rounded px-2.5 py-1.5 focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Available">Available Only</option>
                  <option value="Sold">Sold Only</option>
                  <option value="Reserved">Reserved</option>
                </select>
              </div>
            </div>

            {/* Cars Table */}
            <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-900 text-neutral-400 uppercase tracking-wider border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Vehicle</th>
                      <th className="py-3 px-4">Brand</th>
                      <th className="py-3 px-4">Year</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Power</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Featured</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono-numbers">
                    {filteredCars.map((car) => (
                      <tr key={car.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={car.image || ''}
                              alt={car.name || 'Car'}
                              className="w-12 h-9 object-cover rounded bg-neutral-900 shrink-0"
                            />
                            <div>
                              <div className="font-display font-bold text-sm text-white">
                                {car.name}
                              </div>
                              <div className="text-[11px] text-neutral-400 font-sans">
                                {car.category}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-sans text-neutral-300 font-semibold">{car.brand}</td>
                        <td className="py-3.5 px-4 text-neutral-300">{car.year}</td>
                        <td className="py-3.5 px-4 text-white font-bold">${car.price.toLocaleString()}</td>
                        <td className="py-3.5 px-4 text-red-400 font-bold">{car.horsepower} HP</td>
                        <td className="py-3.5 px-4 font-sans">
                          <button
                            onClick={() => handleToggleSold(car)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-all ${
                              car.availabilityStatus === 'Available'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                                : 'bg-red-950 text-red-400 border border-red-500/30'
                            }`}
                          >
                            {car.availabilityStatus}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 font-sans">
                          <button
                            onClick={() => handleToggleFeatured(car)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              car.isFeatured
                                ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                                : 'bg-neutral-800 text-neutral-400'
                            }`}
                          >
                            {car.isFeatured ? '★ Featured' : 'Standard'}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-right font-sans">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditingCar(car);
                                setIsCarModalOpen(true);
                              }}
                              className="p-1.5 rounded hover:bg-white/10 text-neutral-400 hover:text-white"
                              title="Edit specifications"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteCar(car.id)}
                              className="p-1.5 rounded hover:bg-red-950/60 text-neutral-400 hover:text-red-400"
                              title="Delete from showroom"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: TEST DRIVE BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h1 className="font-display font-black text-2xl uppercase tracking-tight text-white">
                TEST DRIVE RESERVATIONS & LOGISTICS
              </h1>
              <p className="text-xs text-neutral-400 mt-1">
                Manage appointment confirmations, circuit test scheduling, and white-glove transporter deliveries.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="glass-panel p-5 rounded-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-numbers font-bold text-red-500">{booking.id}</span>
                      <span className="text-neutral-500">·</span>
                      <span className="font-bold text-white text-sm">{booking.carName}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                        booking.status === 'Confirmed'
                          ? 'bg-emerald-950 text-emerald-400'
                          : booking.status === 'Pending'
                          ? 'bg-amber-950 text-amber-400'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}>
                        {booking.status}
                      </span>
                    </div>

                    <div className="text-neutral-300">
                      Client: <strong>{booking.clientName}</strong> · Phone: {booking.clientPhone} · Email: {booking.clientEmail}
                    </div>

                    <div className="text-neutral-400 font-mono-numbers">
                      Date: {booking.preferredDate} at {booking.preferredTime} | Hub: {booking.location}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleBookingStatus(booking.id, 'Confirmed')}
                      className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] uppercase tracking-wider"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleBookingStatus(booking.id, 'Completed')}
                      className="px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold text-[11px]"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => handleBookingStatus(booking.id, 'Cancelled')}
                      className="px-3 py-1.5 rounded border border-red-500/40 text-red-400 hover:bg-red-950/40 text-[11px]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h1 className="font-display font-black text-2xl uppercase tracking-tight text-white">
                CLIENT ACQUISITION INQUIRIES
              </h1>
              <p className="text-xs text-neutral-400 mt-1">
                Direct customer purchase requests, consignment questions, and allocation inquiries.
              </p>
            </div>

            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div key={inq.id} className="glass-panel p-5 rounded-xl border border-white/10 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white text-sm">{inq.name}</span>
                      <span className="text-neutral-400 ml-2">({inq.email} · {inq.phone})</span>
                    </div>
                    <span className="font-mono-numbers text-neutral-500">{inq.id}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-neutral-900/80 border border-white/5">
                    <div className="text-red-400 font-semibold mb-1">{inq.subject}</div>
                    <div className="text-neutral-300 leading-relaxed">{inq.message}</div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                      inq.status === 'New' ? 'bg-red-950 text-red-400 border border-red-500/30' : 'bg-neutral-800 text-neutral-400'
                    }`}>
                      {inq.status}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleInquiryStatus(inq.id, 'Answered')}
                        className="px-3 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-[11px]"
                      >
                        Mark Contacted & Answered
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: BRANDS & CATEGORIES */}
        {activeTab === 'brands' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h1 className="font-display font-black text-2xl uppercase tracking-tight text-white">
              MANUFACTURER BRANDS
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {brands.map((b) => (
                <div key={b.id} className="glass-panel p-5 rounded-xl border border-white/10 space-y-2 text-xs">
                  <div className="font-display font-black text-base text-white">{b.name}</div>
                  <div className="text-neutral-400">{b.country} · Founded {b.founded}</div>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: WEBSITE SETTINGS */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="space-y-6 max-w-2xl animate-in fade-in duration-200">
            <h1 className="font-display font-black text-2xl uppercase tracking-tight text-white">
              WEBSITE & DEALERSHIP SETTINGS
            </h1>

            <div className="space-y-4 glass-panel p-6 rounded-2xl border border-white/10 text-xs">
              <div>
                <label className="block text-neutral-400 uppercase font-semibold mb-1">
                  Dealership Brand Name
                </label>
                <input
                  type="text"
                  value={localSettings.dealershipName}
                  onChange={(e) => setLocalSettings({ ...localSettings, dealershipName: e.target.value })}
                  className="w-full bg-neutral-900 border border-white/15 rounded p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-400 uppercase font-semibold mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={localSettings.tagline}
                  onChange={(e) => setLocalSettings({ ...localSettings, tagline: e.target.value })}
                  className="w-full bg-neutral-900 border border-white/15 rounded p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-400 uppercase font-semibold mb-1">
                    Telephone
                  </label>
                  <input
                    type="text"
                    value={localSettings.phone}
                    onChange={(e) => setLocalSettings({ ...localSettings, phone: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/15 rounded p-2.5 text-white font-mono-numbers"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 uppercase font-semibold mb-1">
                    Concierge Email
                  </label>
                  <input
                    type="email"
                    value={localSettings.email}
                    onChange={(e) => setLocalSettings({ ...localSettings, email: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/15 rounded p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 uppercase font-semibold mb-1">
                  Top Announcement Banner
                </label>
                <input
                  type="text"
                  value={localSettings.bannerAnnouncement}
                  onChange={(e) => setLocalSettings({ ...localSettings, bannerAnnouncement: e.target.value })}
                  className="w-full bg-neutral-900 border border-white/15 rounded p-2.5 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider rounded-lg shadow-lg cursor-pointer"
              >
                Save & Deploy Settings
              </button>

              {/* System Data Recovery / Restore */}
              <div className="pt-6 border-t border-white/10 mt-6 space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  System Data Recovery
                </div>
                <p className="text-neutral-500 text-[11px] leading-relaxed">
                  Reset car inventory, brand catalog, category classifications, and dealership settings to factory defaults.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={async () => {
                      if (!isConfirmingRestore) {
                        setIsConfirmingRestore(true);
                        setTimeout(() => setIsConfirmingRestore(false), 5000);
                        return;
                      }
                      DatabaseService.restoreDefaults();
                      await onRefreshData();
                      setLocalSettings(DatabaseService.getSettingsSync());
                      setIsConfirmingRestore(false);
                      showToast('Showroom catalog & settings restored to factory defaults.');
                    }}
                    className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      isConfirmingRestore
                        ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-950/60'
                        : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-white/10 hover:border-white/20'
                    }`}
                  >
                    {isConfirmingRestore ? 'Click again to confirm factory restore' : 'Restore Showroom Defaults'}
                  </button>
                  {isConfirmingRestore && (
                    <button
                      type="button"
                      onClick={() => setIsConfirmingRestore(false)}
                      className="px-3 py-2 text-xs text-neutral-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        )}
      </main>

      {/* CAR ADD/EDIT MODAL */}
      {isCarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-neutral-950 border border-white/20 rounded-2xl p-6 sm:p-8 text-white my-8 max-h-[90vh] overflow-y-auto no-scrollbar">
            <button
              onClick={() => setIsCarModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display font-black text-xl uppercase tracking-wider mb-6">
              {editingCar?.id ? 'Edit Vehicle Specifications' : 'Add New Exotic Vehicle'}
            </h3>

            <form onSubmit={handleSaveCar} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-400 font-semibold mb-1">Model Name *</label>
                  <input
                    type="text"
                    required
                    value={editingCar?.name || ''}
                    onChange={(e) => setEditingCar({ ...editingCar, name: e.target.value })}
                    placeholder="e.g. 911 GT3 RS"
                    className="w-full bg-neutral-900 border border-white/15 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-semibold mb-1">Brand *</label>
                  <select
                    value={editingCar?.brand || 'Porsche'}
                    onChange={(e) => setEditingCar({ ...editingCar, brand: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/15 rounded p-2 text-white"
                  >
                    {brands.map((b) => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-neutral-400 font-semibold mb-1">Year</label>
                  <input
                    type="number"
                    value={editingCar?.year || 2024}
                    onChange={(e) => setEditingCar({ ...editingCar, year: Number(e.target.value) })}
                    className="w-full bg-neutral-900 border border-white/15 rounded p-2 text-white font-mono-numbers"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-semibold mb-1">Price ($)</label>
                  <input
                    type="number"
                    value={editingCar?.price || 150000}
                    onChange={(e) => setEditingCar({ ...editingCar, price: Number(e.target.value) })}
                    className="w-full bg-neutral-900 border border-white/15 rounded p-2 text-white font-mono-numbers"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-semibold mb-1">Horsepower (HP)</label>
                  <input
                    type="number"
                    value={editingCar?.horsepower || 500}
                    onChange={(e) => setEditingCar({ ...editingCar, horsepower: Number(e.target.value) })}
                    className="w-full bg-neutral-900 border border-white/15 rounded p-2 text-white font-mono-numbers"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-400 font-semibold mb-1">Category</label>
                  <select
                    value={editingCar?.category || 'Sports Cars'}
                    onChange={(e) => setEditingCar({ ...editingCar, category: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/15 rounded p-2 text-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.title}>{c.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-400 font-semibold mb-1">Transmission</label>
                  <input
                    type="text"
                    value={editingCar?.transmission || '8-Speed Dual-Clutch'}
                    onChange={(e) => setEditingCar({ ...editingCar, transmission: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/15 rounded p-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 font-semibold mb-1">Primary Image URL</label>
                <input
                  type="text"
                  value={editingCar?.image || ''}
                  onChange={(e) => setEditingCar({ ...editingCar, image: e.target.value })}
                  placeholder="/src/assets/images/... or image URL"
                  className="w-full bg-neutral-900 border border-white/15 rounded p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingCar?.description || ''}
                  onChange={(e) => setEditingCar({ ...editingCar, description: e.target.value })}
                  className="w-full bg-neutral-900 border border-white/15 rounded p-2 text-white resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCarModalOpen(false)}
                  className="px-4 py-2 rounded border border-white/20 text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider"
                >
                  Save to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
