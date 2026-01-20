'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaHeart, FaBell, FaEdit, FaTrash, FaCalendarAlt, FaEye, FaChartBar, FaFileInvoice, FaCog, FaMoon, FaPlus } from 'react-icons/fa';

type PhotoCategory = 'wedding-photography' | 'pre-wedding-shoots' | 'videography';

interface Package {
  id: string;
  category: PhotoCategory;
  title: string;
  pricePerDay: number;
  features: string[];
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

export default function PostedPackagesPage() {
  const router = useRouter();
  const [user, setUser] = useState<VendorUser | null>(null);
  const [activeCategory, setActiveCategory] = useState<PhotoCategory>('wedding-photography');

  const mockPackages: Package[] = [
    {
      id: '1',
      category: 'wedding-photography',
      title: 'Premium Wedding Photography',
      pricePerDay: 75000,
      features: ['HD Photos', 'Album', 'Online Gallery', 'Drone Shots'],
      photos: ['/pack1.png'],
      createdAt: new Date(),
      stock: 3,
      discount: '10%',
      discountType: 'Early Bird'
    },
    {
      id: '2',
      category: 'wedding-photography',
      title: 'Classic Wedding Package',
      pricePerDay: 50000,
      features: ['HD Photos', 'Album', 'Online Gallery'],
      photos: ['/pack2.png'],
      createdAt: new Date(),
      stock: 5
    },
    {
      id: '3',
      category: 'pre-wedding-shoots',
      title: 'Outdoor Pre-Wedding Shoot',
      pricePerDay: 35000,
      features: ['HD Photos', 'Online Gallery', 'Drone Shots'],
      photos: ['/pack3.png'],
      createdAt: new Date(),
      stock: 10,
      discount: '15%',
      discountType: 'Weekend Special'
    },
    {
      id: '4',
      category: 'pre-wedding-shoots',
      title: 'Studio Pre-Wedding Package',
      pricePerDay: 25000,
      features: ['HD Photos', 'Online Gallery'],
      photos: ['/pack4.png'],
      createdAt: new Date(),
      stock: 8
    },
    {
      id: '5',
      category: 'videography',
      title: 'Cinematic Wedding Film',
      pricePerDay: 95000,
      features: ['4K Video', 'Drone Shots', 'Same Day Edit', 'Raw Footage'],
      photos: ['/pack1.png'],
      createdAt: new Date(),
      stock: 2,
      discount: '20%',
      discountType: 'Season Discount'
    },
    {
      id: '6',
      category: 'videography',
      title: 'Highlight Reel Package',
      pricePerDay: 60000,
      features: ['HD Video', 'Highlight Reel', 'Online Sharing'],
      photos: ['/pack2.png'],
      createdAt: new Date(),
      stock: 4
    }
  ];

  const [packages, setPackages] = useState<Package[]>(mockPackages);

  const getCategoryBannerImage = () => {
    switch(activeCategory) {
      case 'wedding-photography':
        return '/ven1.png';
      case 'pre-wedding-shoots':
        return '/ven2.png';
      case 'videography':
        return '/ven3.png';
      default:
        return '/ven1.png';
    }
  };

  const getCategoryBannerText = () => {
    switch(activeCategory) {
      case 'wedding-photography':
        return 'Wedding Photography Packages';
      case 'pre-wedding-shoots':
        return 'Pre-Wedding Shoot Packages';
      case 'videography':
        return 'Videography Packages';
      default:
        return 'Posted Packages';
    }
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
        organizationName: 'Perfect Moments Studio'
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleDeletePackage = (id: string) => {
    if (confirm('Are you sure you want to delete this package?')) {
      setPackages(packages.filter(pkg => pkg.id !== id));
    }
  };

  const filteredPackages = packages.filter(pkg => pkg.category === activeCategory);

  return (
    <div className="flex min-h-screen flex-col md:flex-row" style={{backgroundColor: '#f5f5f7'}}>
      <aside className="w-full md:w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{backgroundColor: '#755A7B'}}>
              P
            </div>
            <div>
              <h2 className="font-bold text-gray-800">Perfect Moments</h2>
              <p className="text-xs text-gray-500">photography & videography</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-400 mb-2 px-3">Main Menu</p>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors text-gray-600 hover:bg-gray-100">
              <FaChartBar /> Overview
            </button>
            <button onClick={() => router.push('/dashboard/photography')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors text-gray-600 hover:bg-gray-100">
              <FaPlus /> Post Package
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors" style={{backgroundColor: '#755A7B', color: 'white'}}>
              <FaFileInvoice /> Posted Packages
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors text-gray-600 hover:bg-gray-100">
              <FaEdit /> Draft Package
            </button>
          </div>

          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-400 mb-2 px-3">Appointment</p>
            <button onClick={() => router.push('/dashboard/photography/place-booking')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-gray-600 hover:bg-gray-100">
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
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-white transition-all" style={{backgroundColor: '#755A7B'}}>
              <FaMoon /> Logout
            </button>
          </div>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="mb-6 md:mb-8 rounded-lg overflow-hidden shadow-lg" style={{backgroundImage: `url(${getCategoryBannerImage()})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '2px solid rgba(117, 90, 123, 0.2)'}}>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-2" style={{textShadow: '3px 3px 6px rgba(0,0,0,0.7)'}}>{getCategoryBannerText()}</h2>
            <p className="text-sm md:text-xl text-white" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>View and manage your posted packages</p>
          </div>

          <div className="mb-6">
            <div className="flex gap-2 md:gap-6 justify-center items-center overflow-x-auto pb-2">
              <button onClick={() => setActiveCategory('wedding-photography')} className="px-4 md:px-8 py-3 font-medium transition-all border-b-4 whitespace-nowrap" style={{borderColor: activeCategory === 'wedding-photography' ? '#755A7B' : 'transparent', color: activeCategory === 'wedding-photography' ? '#755A7B' : '#999', fontWeight: activeCategory === 'wedding-photography' ? 'bold' : 'normal', background: activeCategory === 'wedding-photography' ? 'linear-gradient(to bottom, transparent, rgba(117, 90, 123, 0.05))' : 'transparent'}}>
                Wedding Photography
              </button>
              <button onClick={() => setActiveCategory('pre-wedding-shoots')} className="px-4 md:px-8 py-3 font-medium transition-all border-b-4 whitespace-nowrap" style={{borderColor: activeCategory === 'pre-wedding-shoots' ? '#755A7B' : 'transparent', color: activeCategory === 'pre-wedding-shoots' ? '#755A7B' : '#999', fontWeight: activeCategory === 'pre-wedding-shoots' ? 'bold' : 'normal', background: activeCategory === 'pre-wedding-shoots' ? 'linear-gradient(to bottom, transparent, rgba(117, 90, 123, 0.05))' : 'transparent'}}>
                Pre-Wedding Shoots
              </button>
              <button onClick={() => setActiveCategory('videography')} className="px-4 md:px-8 py-3 font-medium transition-all border-b-4 whitespace-nowrap" style={{borderColor: activeCategory === 'videography' ? '#755A7B' : 'transparent', color: activeCategory === 'videography' ? '#755A7B' : '#999', fontWeight: activeCategory === 'videography' ? 'bold' : 'normal', background: activeCategory === 'videography' ? 'linear-gradient(to bottom, transparent, rgba(117, 90, 123, 0.05))' : 'transparent'}}>
                Videography
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <span>mainmenu</span>
            <span>/</span>
            <span className="font-semibold" style={{color: '#755A7B'}}>posted packages</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 bg-gray-200">
                  <img src={pkg.photos[0]} alt={pkg.title} className="w-full h-full object-cover" />
                  {pkg.discount && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {pkg.discount} OFF
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{pkg.title}</h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-bold" style={{color: '#755A7B'}}>
                      Rs. {pkg.pricePerDay.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">/package</span>
                  </div>

                  {pkg.discountType && (
                    <div className="mb-3">
                      <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {pkg.discountType}
                      </span>
                    </div>
                  )}

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {pkg.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                      {pkg.features.length > 3 && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          +{pkg.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {pkg.stock !== undefined && (
                    <p className="text-sm text-gray-600 mb-4">
                      Stock: <span className="font-semibold">{pkg.stock} available</span>
                    </p>
                  )}

                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-white transition-all" style={{backgroundColor: '#755A7B'}}>
                      <FaEdit /> Edit
                    </button>
                    <button onClick={() => handleDeletePackage(pkg.id)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border-2 rounded-lg font-medium text-red-600 border-red-600 hover:bg-red-50 transition-all">
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPackages.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl text-gray-300 mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No packages found</h3>
              <p className="text-gray-500 mb-6">You haven't posted any packages in this category yet.</p>
              <button onClick={() => router.push('/dashboard/photography')} className="px-6 py-3 rounded-lg font-medium text-white" style={{backgroundColor: '#755A7B'}}>
                <FaPlus className="inline mr-2" /> Create Your First Package
              </button>
            </div>
          )}
        </main>

        <footer className="bg-white border-t" style={{backgroundColor: '#755A7B', width: '100%'}}>
          <div className="px-4 md:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <img src="/logo.png" alt="Wedora Logo" className="h-10 w-10" />
                  <h3 className="text-xl font-bold text-white">Wedora</h3>
                </div>
                <p className="text-purple-100 text-sm">Your trusted partner in creating unforgettable wedding experiences.</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="/" className="text-purple-100 hover:text-white text-sm transition-colors">Home</a></li>
                  <li><a href="/about" className="text-purple-100 hover:text-white text-sm transition-colors">About Us</a></li>
                  <li><a href="/contact" className="text-purple-100 hover:text-white text-sm transition-colors">Contact</a></li>
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
    </div>
  );
}
