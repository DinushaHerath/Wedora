'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaHeart, FaSearch, FaFilter, FaMapMarkerAlt, FaStar, FaShoppingCart, FaCalculator, FaChevronDown, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

type PhotoCategory = 'wedding-photography' | 'pre-wedding-shoots' | 'videography';

interface Vendor {
  id: string;
  name: string;
  organizationName: string;
  category: PhotoCategory[];
  location: string;
  rating: number;
  reviewCount: number;
  minPrice: number;
  maxPrice: number;
  image: string;
  packageCount: number;
  features: string[];
}

export default function PhotographyVideographyServices() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<PhotoCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150000]);
  const [showFilters, setShowFilters] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [user, setUser] = useState<{name: string; email: string} | null>(null);

  // Mock vendor data
  const mockVendors: Vendor[] = [
    {
      id: '1',
      name: 'Lens & Light Studios',
      organizationName: 'Lens & Light Studios',
      category: ['wedding-photography', 'videography'],
      location: 'Colombo, Sri Lanka',
      rating: 4.9,
      reviewCount: 156,
      minPrice: 50000,
      maxPrice: 95000,
      image: '/ven1.png',
      packageCount: 6,
      features: ['HD Photos', 'Album', 'Online Gallery', '4K Video']
    },
    {
      id: '2',
      name: 'Moments Photography',
      organizationName: 'Moments Photography',
      category: ['wedding-photography', 'pre-wedding-shoots'],
      location: 'Kandy, Sri Lanka',
      rating: 4.8,
      reviewCount: 124,
      minPrice: 25000,
      maxPrice: 75000,
      image: '/ven2.png',
      packageCount: 5,
      features: ['HD Photos', 'Drone Shots', 'Online Gallery']
    },
    {
      id: '3',
      name: 'Cinematic Films',
      organizationName: 'Cinematic Films',
      category: ['videography'],
      location: 'Galle, Sri Lanka',
      rating: 4.7,
      reviewCount: 98,
      minPrice: 60000,
      maxPrice: 120000,
      image: '/ven3.png',
      packageCount: 4,
      features: ['4K Video', 'Drone Shots', 'Same Day Edit']
    },
    {
      id: '4',
      name: 'Perfect Frames',
      organizationName: 'Perfect Frames',
      category: ['wedding-photography', 'pre-wedding-shoots', 'videography'],
      location: 'Negombo, Sri Lanka',
      rating: 4.6,
      reviewCount: 89,
      minPrice: 35000,
      maxPrice: 95000,
      image: '/ven1.png',
      packageCount: 8,
      features: ['HD Photos', '4K Video', 'Album', 'Drone Shots']
    }
  ];

  const [vendors, setVendors] = useState<Vendor[]>(mockVendors);

  const features = ['HD Photos', 'Album', 'Online Gallery', 'Drone Shots', '4K Video', 'Same Day Edit', 'Raw Footage'];

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const userData = JSON.parse(userStr);
      setUser(userData);
    } else {
      setUser({
        name: 'Demo User',
        email: 'demo@wedora.com'
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const filteredVendors = vendors.filter(vendor => {
    if (selectedCategory !== 'all' && !vendor.category.includes(selectedCategory)) {
      return false;
    }
    if (searchQuery && !vendor.organizationName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !vendor.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedFeatures.length > 0 && !selectedFeatures.every(f => vendor.features.includes(f))) {
      return false;
    }
    if (vendor.minPrice > priceRange[1] || vendor.maxPrice < priceRange[0]) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="shadow-sm sticky top-0 z-50" style={{backgroundColor: '#755A7B'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Wedora Logo" className="h-10 w-10" />
            <h1 className="text-xl font-bold text-white" style={{fontFamily: 'var(--font-season)'}}>Wedora</h1>
          </Link>
          <nav className="flex items-center gap-4">
            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowServicesDropdown(!showServicesDropdown)}
                className="px-4 py-2 font-medium text-white transition-colors hover:opacity-80 flex items-center gap-2"
              >
                Services <FaChevronDown className="text-sm" />
              </button>
              
              {showServicesDropdown && (
                <>
                  <div className="fixed inset-0" style={{ zIndex: 999 }} onClick={() => setShowServicesDropdown(false)} />
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2" style={{ zIndex: 1000 }}>
                    <Link href="/services/venue-accommodation" onClick={() => setShowServicesDropdown(false)} className="block px-4 py-2 hover:bg-purple-50 transition-colors" style={{color: '#755A7B'}}>Venue & Accommodation</Link>
                    <Link href="/services/photography-videography" onClick={() => setShowServicesDropdown(false)} className="block px-4 py-2 hover:bg-purple-50 transition-colors" style={{color: '#755A7B'}}>Photography & Videography</Link>
                    <Link href="/services/fashion-beauty" onClick={() => setShowServicesDropdown(false)} className="block px-4 py-2 hover:bg-purple-50 transition-colors" style={{color: '#755A7B'}}>Fashion & Beauty</Link>
                    <Link href="/services/entertainment" onClick={() => setShowServicesDropdown(false)} className="block px-4 py-2 hover:bg-purple-50 transition-colors" style={{color: '#755A7B'}}>Entertainment</Link>
                    <Link href="/services/transportation" onClick={() => setShowServicesDropdown(false)} className="block px-4 py-2 hover:bg-purple-50 transition-colors" style={{color: '#755A7B'}}>Transportation</Link>
                    <Link href="/services/ceremonial" onClick={() => setShowServicesDropdown(false)} className="block px-4 py-2 hover:bg-purple-50 transition-colors" style={{color: '#755A7B'}}>Ceremonial Services</Link>
                    <Link href="/services/cake-decoration" onClick={() => setShowServicesDropdown(false)} className="block px-4 py-2 hover:bg-purple-50 transition-colors" style={{color: '#755A7B'}}>Cake Decoration</Link>
                    <Link href="/services/gifting-souvenirs" onClick={() => setShowServicesDropdown(false)} className="block px-4 py-2 hover:bg-purple-50 transition-colors" style={{color: '#755A7B'}}>Gifting & Souvenirs</Link>
                  </div>
                </>
              )}
            </div>

            <Link href="/budget-calculator" className="p-2 rounded-full hover:bg-purple-700" title="Budget Calculator">
              <FaCalculator className="text-xl text-white" />
            </Link>
            <Link href="/cart" className="p-2 rounded-full hover:bg-purple-700 relative" title="Cart">
              <FaShoppingCart className="text-xl text-white" />
              <span className="absolute -top-1 -right-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" style={{backgroundColor: '#ff4444'}}>0</span>
            </Link>

            {user && (
              <div className="flex items-center gap-3 ml-2 pl-3 border-l border-purple-400">
                <FaUserCircle className="text-3xl text-white" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">{user.name}</p>
                  <p className="text-xs text-purple-200">{user.email}</p>
                </div>
                <button onClick={handleLogout} className="px-3 py-2 rounded-lg border-2 border-white hover:bg-white hover:bg-opacity-20 flex items-center gap-2 font-medium transition-colors text-white">
                  <FaSignOutAlt className="text-lg" /> Logout
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative h-64 overflow-hidden">
        <img src="/photography.png" alt="Photography & Videography" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4" style={{fontFamily: 'var(--font-season)'}}>Photography & Videography</h1>
            <p className="text-lg">Capture your precious moments with professional photographers</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search by photographer name or location..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="px-6 py-3 rounded-lg font-medium flex items-center gap-2 text-white transition-colors" style={{backgroundColor: '#755A7B'}}>
              <FaFilter /> Filters
            </button>
          </div>

          {/* Category Tabs */}
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
            <button onClick={() => setSelectedCategory('all')} className="px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all" style={{backgroundColor: selectedCategory === 'all' ? '#755A7B' : '#f3f4f6', color: selectedCategory === 'all' ? 'white' : '#6b7280'}}>All Services</button>
            <button onClick={() => setSelectedCategory('wedding-photography')} className="px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all" style={{backgroundColor: selectedCategory === 'wedding-photography' ? '#755A7B' : '#f3f4f6', color: selectedCategory === 'wedding-photography' ? 'white' : '#6b7280'}}>Wedding Photography</button>
            <button onClick={() => setSelectedCategory('pre-wedding-shoots')} className="px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all" style={{backgroundColor: selectedCategory === 'pre-wedding-shoots' ? '#755A7B' : '#f3f4f6', color: selectedCategory === 'pre-wedding-shoots' ? 'white' : '#6b7280'}}>Pre-Wedding Shoots</button>
            <button onClick={() => setSelectedCategory('videography')} className="px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all" style={{backgroundColor: selectedCategory === 'videography' ? '#755A7B' : '#f3f4f6', color: selectedCategory === 'videography' ? 'white' : '#6b7280'}}>Videography</button>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {features.map(feature => (
                      <label key={feature} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={selectedFeatures.includes(feature)} onChange={() => toggleFeature(feature)} className="rounded" style={{accentColor: '#755A7B'}} />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Price Range</h3>
                  <div className="space-y-3">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="text-sm text-gray-600">Min Price</label>
                        <input type="number" value={priceRange[0]} onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                      </div>
                      <div className="flex-1">
                        <label className="text-sm text-gray-600">Max Price</label>
                        <input type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 150000])} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setSelectedFeatures([]); setPriceRange([0, 150000]); }} className="mt-4 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800">Clear All Filters</button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">Showing <span className="font-semibold">{filteredVendors.length}</span> photographer{filteredVendors.length !== 1 ? 's' : ''}</p>
        </div>

        {/* Vendor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map(vendor => (
            <div key={vendor.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer" onClick={() => router.push(`/services/photography-videography/${vendor.id}`)}>
              <div className="relative h-48">
                <img src={vendor.image} alt={vendor.organizationName} className="w-full h-full object-cover" />
                <button onClick={(e) => { e.stopPropagation(); }} className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                  <FaHeart className="text-gray-400 hover:text-red-500" />
                </button>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{vendor.organizationName}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <FaMapMarkerAlt className="text-gray-400 text-sm" />
                  <span className="text-sm text-gray-600">{vendor.location}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <FaStar style={{color: '#FFD700'}} />
                    <span className="font-semibold text-gray-800">{vendor.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({vendor.reviewCount} reviews)</span>
                </div>
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {vendor.features.slice(0, 3).map(feature => (
                      <span key={feature} className="px-2 py-1 text-xs rounded-full" style={{backgroundColor: '#f3e8ff', color: '#755A7B'}}>{feature}</span>
                    ))}
                    {vendor.features.length > 3 && <span className="px-2 py-1 text-xs text-gray-500">+{vendor.features.length - 3} more</span>}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500">Starting from</p>
                    <p className="text-lg font-bold" style={{color: '#755A7B'}}>Rs {vendor.minPrice.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{vendor.packageCount} packages</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVendors.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 mb-4">No photographers found matching your criteria</p>
            <button onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setSelectedFeatures([]); setPriceRange([0, 150000]); }} className="px-6 py-3 rounded-lg font-medium text-white" style={{backgroundColor: '#755A7B'}}>Clear Filters</button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white" style={{backgroundColor: '#755A7B'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="Wedora Logo" className="h-10 w-10" />
                <h3 className="text-xl font-bold text-white" style={{fontFamily: 'var(--font-season)'}}>Wedora</h3>
              </div>
              <p className="text-purple-100 text-sm">Your trusted partner in creating unforgettable wedding experiences.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-purple-100 hover:text-white text-sm transition-colors">Home</Link></li>
                <li><Link href="/about" className="text-purple-100 hover:text-white text-sm transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-purple-100 hover:text-white text-sm transition-colors">Contact</Link></li>
                <li><Link href="/signup" className="text-purple-100 hover:text-white text-sm transition-colors">Sign Up</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><span className="text-purple-100 text-sm">Venue & Accommodation</span></li>
                <li><span className="text-purple-100 text-sm">Photography</span></li>
                <li><span className="text-purple-100 text-sm">Fashion & Beauty</span></li>
                <li><span className="text-purple-100 text-sm">Entertainment</span></li>
              </ul>
            </div>
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
  );
}
