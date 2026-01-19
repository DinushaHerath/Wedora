'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaHeart, FaBell, FaEdit, FaTrash, FaCalendarAlt, FaEye, FaUpload, FaUserCircle, FaChartBar, FaMoneyBillWave, FaFileInvoice, FaUndo, FaCog, FaMoon, FaPlus, FaBuilding, FaHotel, FaTree } from 'react-icons/fa';

type VenueCategory = 'hotel-rooms' | 'banquet-halls' | 'outdoor-venues';

interface Package {
  id: string;
  category: VenueCategory;
  title: string;
  pricePerDay: number;
  facilities: string[];
  photos: string[];
  createdAt: Date;
  stock?: number;
  discount?: string;
  discountType?: string;
}

interface VendorUser {
  name: string;
  email: string;
  role: string;
  organizationName?: string;
}

export default function VenueAccommodationDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<VendorUser | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const [activeCategory, setActiveCategory] = useState<VenueCategory>('hotel-rooms');
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedRoomType, setSelectedRoomType] = useState<string>('');
  const [newPackage, setNewPackage] = useState({
    title: '',
    pricePerDay: '',
    facilities: '',
    stock: '',
    discount: '',
    discountType: '',
    photos: [] as File[],
  });

  const getCategoryBannerText = () => {
    switch(activeCategory) {
      case 'hotel-rooms':
        return 'Manage Hotel Rooms';
      case 'banquet-halls':
        return 'Manage Banquet Hall';
      case 'outdoor-venues':
        return 'Manage Outdoor Venue';
      default:
        return 'Venue Package Manager';
    }
  };

  const toggleFacility = (facility: string) => {
    setSelectedFacilities(prev => 
      prev.includes(facility) 
        ? prev.filter(f => f !== facility)
        : [...prev, facility]
    );
  };

  const selectRoomType = (roomType: string) => {
    setSelectedRoomType(roomType);
  };

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    
    if (userStr) {
      const userData = JSON.parse(userStr);
      setUser(userData);
    } else {
      setUser({
        name: 'Demo Vendor',
        email: 'demo@wedora.com',
        role: 'vendor',
        organizationName: 'Demo Venue Company'
      });
    }
    
    const savedPackages = localStorage.getItem('venuePackages');
    if (savedPackages) {
      setPackages(JSON.parse(savedPackages));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewPackage({
        ...newPackage,
        photos: Array.from(e.target.files),
      });
    }
  };

  const handleSubmitPackage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const packageData: Package = {
      id: Date.now().toString(),
      category: activeCategory,
      title: newPackage.title,
      pricePerDay: parseFloat(newPackage.pricePerDay),
      facilities: newPackage.facilities.split(',').map(f => f.trim()),
      photos: newPackage.photos.map(f => URL.createObjectURL(f)),
      createdAt: new Date(),
      stock: newPackage.stock ? parseInt(newPackage.stock) : undefined,
      discount: newPackage.discount || undefined,
      discountType: newPackage.discountType || undefined,
    };

    const updatedPackages = [...packages, packageData];
    setPackages(updatedPackages);
    localStorage.setItem('venuePackages', JSON.stringify(updatedPackages));

    setNewPackage({
      title: '',
      pricePerDay: '',
      facilities: '',
      stock: '',
      discount: '',
      discountType: '',
      photos: [],
    });
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row" style={{backgroundColor: '#f5f5f7'}}>
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{backgroundColor: '#755A7B'}}>
              C
            </div>
            <div>
              <h2 className="font-bold text-gray-800">Cinderella Hotel</h2>
              <p className="text-xs text-gray-500">venue and accommodation</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-400 mb-2 px-3">Main Menu</p>
            <button 
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors text-gray-600 hover:bg-gray-100"
            >
              <FaChartBar /> Overview
            </button>
            <button 
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors"
              style={{backgroundColor: '#755A7B', color: 'white'}}
            >
              <FaPlus /> Post Package
            </button>
            <button 
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors text-gray-600 hover:bg-gray-100"
            >
              <FaFileInvoice /> Posted Packages
            </button>
          </div>

          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-400 mb-2 px-3">Appointment</p>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-gray-600 hover:bg-gray-100">
              <FaCalendarAlt /> Place a Booking
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-gray-600 hover:bg-gray-100">
              <FaEye /> Accept Booking
            </button>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-400 mb-2 px-3">General</p>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-gray-600 hover:bg-gray-100">
              <FaBell /> Notifications
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-gray-600 hover:bg-gray-100">
              <FaHeart /> Feedback
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-gray-600 hover:bg-gray-100">
              <FaCog /> Setting
            </button>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-white transition-all"
              style={{backgroundColor: '#755A7B'}}
            >
              <FaMoon /> Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* Banner Section */}
          <div 
            className="mb-6 md:mb-8 rounded-lg overflow-hidden shadow-lg" 
            style={{
              backgroundImage: 'url(/roombanner.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '150px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              border: '2px solid rgba(117, 90, 123, 0.2)'
            }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-2" style={{textShadow: '3px 3px 6px rgba(0,0,0,0.7)'}}>{getCategoryBannerText()}</h2>
            <p className="text-sm md:text-xl text-white" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>Create and manage your venue packages</p>
          </div>

          {/* Category Tabs */}
          <div className="mb-6">
            <div className="flex gap-2 md:gap-6 justify-center items-center overflow-x-auto pb-2">
              <button
                onClick={() => setActiveCategory('hotel-rooms')}
                className="px-4 md:px-8 py-3 font-medium transition-all border-b-4 whitespace-nowrap"
                style={{
                  borderColor: activeCategory === 'hotel-rooms' ? '#755A7B' : 'transparent',
                  color: activeCategory === 'hotel-rooms' ? '#755A7B' : '#999',
                  fontWeight: activeCategory === 'hotel-rooms' ? 'bold' : 'normal',
                  background: activeCategory === 'hotel-rooms' ? 'linear-gradient(to bottom, transparent, rgba(117, 90, 123, 0.05))' : 'transparent'
                }}
              >
                Hotel Rooms
              </button>
              <button
                onClick={() => setActiveCategory('banquet-halls')}
                className="px-4 md:px-8 py-3 font-medium transition-all border-b-4 whitespace-nowrap"
                style={{
                  borderColor: activeCategory === 'banquet-halls' ? '#755A7B' : 'transparent',
                  color: activeCategory === 'banquet-halls' ? '#755A7B' : '#999',
                  fontWeight: activeCategory === 'banquet-halls' ? 'bold' : 'normal',
                  background: activeCategory === 'banquet-halls' ? 'linear-gradient(to bottom, transparent, rgba(117, 90, 123, 0.05))' : 'transparent'
                }}
              >
                Banquet Hall
              </button>
              <button
                onClick={() => setActiveCategory('outdoor-venues')}
                className="px-4 md:px-8 py-3 font-medium transition-all border-b-4 whitespace-nowrap"
                style={{
                  borderColor: activeCategory === 'outdoor-venues' ? '#755A7B' : 'transparent',
                  color: activeCategory === 'outdoor-venues' ? '#755A7B' : '#999',
                  fontWeight: activeCategory === 'outdoor-venues' ? 'bold' : 'normal',
                  background: activeCategory === 'outdoor-venues' ? 'linear-gradient(to bottom, transparent, rgba(117, 90, 123, 0.05))' : 'transparent'
                }}
              >
                Outdoor Venue
              </button>
            </div>
          </div>

          {/* Breadcrumb and Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span>mainmenu</span>
                <span>/</span>
                <span className="font-semibold" style={{color: '#755A7B'}}>add new package</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">Add New Package</h2>
            </div>
            <div className="flex gap-3">
              <button 
                className="px-4 md:px-6 py-2.5 border-2 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm md:text-base"
                style={{borderColor: '#e5e7eb'}}
              >
                <FaFileInvoice /> Save Draft
              </button>
              <button 
                onClick={() => handleSubmitPackage()}
                className="px-4 md:px-6 py-2.5 rounded-lg font-medium text-white hover:opacity-90 transition-opacity flex items-center gap-2 text-sm md:text-base"
                style={{backgroundColor: '#755A7B'}}
              >
                ✓ Add Package
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Package Information */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Package Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name of Package</label>
                    <input
                      type="text"
                      required
                      value={newPackage.title}
                      onChange={(e) => setNewPackage({...newPackage, title: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                      placeholder="Deluxe Wedding Package"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description of Package</label>
                    <textarea
                      required
                      value={newPackage.facilities}
                      onChange={(e) => setNewPackage({...newPackage, facilities: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                      rows={5}
                      placeholder="Luxurious wedding package with premium amenities. Includes spacious ballroom, elegant decorations, catering services, and dedicated event coordinator. Perfect for weddings, receptions, and special celebrations."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Facilities</label>
                      <p className="text-xs text-gray-500 mb-2">Select Available Facilities</p>
                      <div className="grid grid-cols-2 gap-2">
                        {['WiFi', 'AC', 'Parking', 'Catering'].map((facility) => (
                          <button
                            key={facility}
                            type="button"
                            onClick={() => toggleFacility(facility)}
                            className="px-4 py-2 rounded-lg font-medium transition-all text-sm"
                            style={{
                              backgroundColor: selectedFacilities.includes(facility) ? '#755A7B' : '#f3f4f6',
                              color: selectedFacilities.includes(facility) ? 'white' : '#6b7280'
                            }}
                          >
                            {facility}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
                      <p className="text-xs text-gray-500 mb-2">Select Room Type</p>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {[
                          { value: 'single', label: 'Single Room', desc: 'For one person, usually one bed', icon: FaHotel },
                          { value: 'double', label: 'Double Room', desc: 'For two people, one double/queen bed', icon: FaHotel },
                          { value: 'twin', label: 'Twin Room', desc: 'Two single beds', icon: FaHotel },
                          { value: 'triple', label: 'Triple Room', desc: 'For three people, often one double + one single', icon: FaHotel },
                          { value: 'quadruple', label: 'Quadruple Room', desc: 'For four, often two double beds', icon: FaHotel },
                          { value: 'king-queen', label: 'King/Queen Room', desc: 'Defined by bed size (King or Queen)', icon: FaHotel }
                        ].map((room) => (
                          <button
                            key={room.value}
                            type="button"
                            onClick={() => selectRoomType(room.value)}
                            className="w-full text-left px-3 py-2 rounded-lg transition-all"
                            style={{
                              backgroundColor: selectedRoomType === room.value ? '#755A7B' : '#f3f4f6',
                              color: selectedRoomType === room.value ? 'white' : '#6b7280'
                            }}
                          >
                            <div className="flex items-start gap-2">
                              <room.icon className="mt-1 shrink-0" />
                              <div>
                                <div className="text-sm font-medium">{room.label}</div>
                                <div className="text-xs opacity-80">{room.desc}</div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing of Package */}
              <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Pricing of Package</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Package Price</label>
                    <input
                      type="number"
                      required
                      value={newPackage.pricePerDay}
                      onChange={(e) => setNewPackage({...newPackage, pricePerDay: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                      placeholder="Rs. 125,000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Discount</label>
                    <input
                      type="text"
                      value={newPackage.discount}
                      onChange={(e) => setNewPackage({...newPackage, discount: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                      placeholder="10%"
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Discount Type</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={newPackage.discountType}
                        onChange={(e) => setNewPackage({...newPackage, discountType: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                        placeholder="Early Bird Discount"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gray-800"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Upload Images & Category */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Img</h3>
                
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 md:p-6 mb-4">
                  <div className="aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden">
                    {newPackage.photos.length > 0 ? (
                      <img 
                        src={URL.createObjectURL(newPackage.photos[0])} 
                        alt="Main" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-24 md:w-32 h-24 md:h-32 bg-purple-100 rounded-lg"></div>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {[0, 1, 2].map((idx) => (
                      <div key={idx} className="aspect-square bg-purple-100 rounded-lg overflow-hidden">
                        {newPackage.photos[idx + 1] && (
                          <img 
                            src={URL.createObjectURL(newPackage.photos[idx + 1])} 
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => document.getElementById('photo-upload')?.click()}
                      className="aspect-square bg-purple-100 rounded-lg flex items-center justify-center text-2xl"
                      style={{color: '#755A7B'}}
                    >
                      +
                    </button>
                  </div>
                  
                  <input
                    id="photo-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Category</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Package Category</label>
                  <div className="relative mb-4">
                    <select
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50 appearance-none"
                      defaultValue="hotel-room"
                    >
                      <option value="banquet-hall">Banquet Hall</option>
                      <option value="hotel-room">Hotel Room</option>
                      <option value="outdoor-venue">Outdoor Venue</option>
                      <option value="full-package">Full Wedding Package</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gray-800"></div>
                  </div>
                  
                  <button
                    type="button"
                    className="w-full py-3 rounded-lg font-medium text-white hover:opacity-90 transition-opacity"
                    style={{backgroundColor: '#755A7B'}}
                  >
                    Add Category
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-8" style={{backgroundColor: '#755A7B'}}>
          <div className="px-4 md:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* About Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <img src="/logo.png" alt="Wedora Logo" className="h-10 w-10" />
                  <h3 className="text-xl font-bold text-white" style={{fontFamily: 'var(--font-season)'}}>Wedora</h3>
                </div>
                <p className="text-purple-100 text-sm">
                  Your trusted partner in creating unforgettable wedding experiences.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-white font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="/" className="text-purple-100 hover:text-white text-sm transition-colors">Home</a></li>
                  <li><a href="/about" className="text-purple-100 hover:text-white text-sm transition-colors">About Us</a></li>
                  <li><a href="/contact" className="text-purple-100 hover:text-white text-sm transition-colors">Contact</a></li>
                  <li><a href="/signup" className="text-purple-100 hover:text-white text-sm transition-colors">Sign Up</a></li>
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-white font-bold mb-4">Services</h4>
                <ul className="space-y-2">
                  <li><span className="text-purple-100 text-sm">Venue & Accommodation</span></li>
                  <li><span className="text-purple-100 text-sm">Photography</span></li>
                  <li><span className="text-purple-100 text-sm">Fashion & Beauty</span></li>
                  <li><span className="text-purple-100 text-sm">Entertainment</span></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-white font-bold mb-4">Contact Us</h4>
                <ul className="space-y-2">
                  <li className="text-purple-100 text-sm">Email: info@wedora.com</li>
                  <li className="text-purple-100 text-sm">Phone: +94 77 123 4567</li>
                  <li className="text-purple-100 text-sm">Address: Colombo, Sri Lanka</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-purple-400 pt-8">
              <div className="text-center text-purple-100">
                <p>&copy; 2026 Wedora. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
