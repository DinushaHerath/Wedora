'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FaUsers, FaUserTie, FaCalendarCheck, FaDollarSign, FaChartLine, 
  FaSearch, FaEllipsisV, FaBars, FaTimes, FaHome, FaUserShield,
  FaClipboardList, FaBoxes, FaCog, FaSignOutAlt, FaEdit, FaTrash,
  FaBan, FaCheck, FaChevronDown
} from 'react-icons/fa';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'vendor' | 'admin';
  status: 'active' | 'inactive';
  joinedDate: string;
  totalSpent?: number;
  totalBookings?: number;
}

interface Stats {
  totalUsers: number;
  totalVendors: number;
  totalBookings: number;
  totalRevenue: number;
  userGrowth: string;
  vendorGrowth: string;
  bookingGrowth: string;
  revenueGrowth: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminUser] = useState({name: 'Admin', email: 'admin@wedora.com'});
  const [activeTab, setActiveTab] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'user' | 'vendor' | 'admin'>('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Dummy stats data
  const [stats] = useState<Stats>({
    totalUsers: 11580,
    totalVendors: 8580,
    totalBookings: 45580,
    totalRevenue: 51580000,
    userGrowth: '+5.9%',
    vendorGrowth: '-3.9%',
    bookingGrowth: '+10.9%',
    revenueGrowth: '+5.9%'
  });

  // Dummy users data
  const [users] = useState<User[]>([
    { id: '1', name: 'Dinusha Herath', email: 'dinusha@gmail.com', role: 'admin', status: 'active', joinedDate: '2024-01-15', totalSpent: 250000, totalBookings: 1 },
    { id: '2', name: 'Kamal Silva', email: 'kamal@gmail.com', role: 'user', status: 'active', joinedDate: '2024-02-20', totalSpent: 450000, totalBookings: 3 },
    { id: '3', name: 'Nimal Perera', email: 'nimal@gmail.com', role: 'user', status: 'active', joinedDate: '2024-03-10', totalSpent: 325000, totalBookings: 2 },
    { id: '4', name: 'Saman Fernando', email: 'saman@vendor.com', role: 'vendor', status: 'active', joinedDate: '2024-01-05', totalSpent: 0, totalBookings: 45 },
    { id: '5', name: 'Priya Jayawardena', email: 'priya@gmail.com', role: 'user', status: 'inactive', joinedDate: '2024-04-12', totalSpent: 150000, totalBookings: 1 },
    { id: '6', name: 'Ruwan Photography', email: 'ruwan@vendor.com', role: 'vendor', status: 'active', joinedDate: '2024-02-01', totalSpent: 0, totalBookings: 78 },
    { id: '7', name: 'Amara Wijesinghe', email: 'amara@gmail.com', role: 'user', status: 'active', joinedDate: '2024-05-08', totalSpent: 520000, totalBookings: 4 },
    { id: '8', name: 'Royal Venues', email: 'royal@vendor.com', role: 'vendor', status: 'active', joinedDate: '2024-01-20', totalSpent: 0, totalBookings: 92 },
  ]);

  const handleLogout = () => {
    router.push('/');
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-40 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Wedora" className="h-10 w-10" />
              <span className="text-xl font-bold" style={{color: '#755A7B', fontFamily: 'var(--font-season)'}}>Wedora</span>
            </div>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            style={{color: '#755A7B'}}
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <Link 
            href="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-white"
            style={{backgroundColor: '#755A7B'}}
          >
            <FaHome className="text-lg" />
            {sidebarOpen && <span className="font-medium">Dashboard</span>}
          </Link>
          
          <Link 
            href="/admin/users"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-50 transition-colors"
            style={{color: '#755A7B'}}
          >
            <FaUsers className="text-lg" />
            {sidebarOpen && <span className="font-medium">User Management</span>}
          </Link>

          <Link 
            href="/admin/vendors"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-50 transition-colors"
            style={{color: '#755A7B'}}
          >
            <FaUserTie className="text-lg" />
            {sidebarOpen && <span className="font-medium">Vendor Management</span>}
          </Link>

          <Link 
            href="/admin/bookings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-50 transition-colors"
            style={{color: '#755A7B'}}
          >
            <FaCalendarCheck className="text-lg" />
            {sidebarOpen && <span className="font-medium">Bookings</span>}
          </Link>

          <Link 
            href="/admin/services"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-50 transition-colors"
            style={{color: '#755A7B'}}
          >
            <FaBoxes className="text-lg" />
            {sidebarOpen && <span className="font-medium">Services</span>}
          </Link>

          <Link 
            href="/admin/analytics"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-50 transition-colors"
            style={{color: '#755A7B'}}
          >
            <FaChartLine className="text-lg" />
            {sidebarOpen && <span className="font-medium">Analytics</span>}
          </Link>

          <Link 
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-50 transition-colors"
            style={{color: '#755A7B'}}
          >
            <FaCog className="text-lg" />
            {sidebarOpen && <span className="font-medium">Settings</span>}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header */}
        <header className="shadow-sm sticky top-0 z-30" style={{backgroundColor: '#755A7B'}}>
          <div className="px-6 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Good morning, {adminUser.name}!</h1>
              <p className="text-sm text-purple-200">Here's what's happening with your platform today</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-200" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-white bg-opacity-20 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-purple-200 w-64"
                />
              </div>
              
              <div className="flex items-center gap-3 pl-4 border-l border-purple-400">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-lg font-bold" style={{color: '#755A7B'}}>
                  {adminUser.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{adminUser.name}</p>
                  <p className="text-xs text-purple-200">Admin</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg hover:bg-white hover:bg-opacity-20 text-white transition-colors"
                  title="Logout"
                >
                  <FaSignOutAlt />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Users */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Users</p>
                  <h3 className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</h3>
                  <div className="mt-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600 font-semibold">
                      {stats.userGrowth}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: '#E3F2FD'}}>
                  <FaUsers className="text-2xl" style={{color: '#2196F3'}} />
                </div>
              </div>
            </div>

            {/* Total Bookings */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Bookings</p>
                  <h3 className="text-3xl font-bold text-gray-900">{stats.totalBookings.toLocaleString()}</h3>
                  <div className="mt-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600 font-semibold">
                      {stats.bookingGrowth}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: '#F3E5F5'}}>
                  <FaCalendarCheck className="text-2xl" style={{color: '#9C27B0'}} />
                </div>
              </div>
            </div>

            {/* Total Vendors */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Vendors</p>
                  <h3 className="text-3xl font-bold text-gray-900">{stats.totalVendors.toLocaleString()}</h3>
                  <div className="mt-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-600 font-semibold">
                      {stats.vendorGrowth}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: '#FFF3E0'}}>
                  <FaUserTie className="text-2xl" style={{color: '#FF9800'}} />
                </div>
              </div>
            </div>

            {/* Total Revenue */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
                  <h3 className="text-3xl font-bold text-gray-900">Rs {(stats.totalRevenue / 1000).toFixed(0)}k</h3>
                  <div className="mt-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600 font-semibold">
                      {stats.revenueGrowth}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: '#FEE2E2'}}>
                  <FaDollarSign className="text-2xl" style={{color: '#EF4444'}} />
                </div>
              </div>
            </div>
          </div>

          {/* User Management Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">User Management</h2>
                <div className="flex gap-3">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
                    />
                  </div>
                  
                  <div className="relative">
                    <button
                      onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <span className="text-sm font-medium text-gray-700">
                        {filterRole === 'all' ? 'All Roles' : filterRole.charAt(0).toUpperCase() + filterRole.slice(1)}
                      </span>
                      <FaChevronDown className="text-xs text-gray-500" />
                    </button>
                    
                    {showFilterDropdown && (
                      <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-10">
                        <button onClick={() => { setFilterRole('all'); setShowFilterDropdown(false); }} className="block w-full text-left px-4 py-2 hover:bg-purple-50 text-sm">All Roles</button>
                        <button onClick={() => { setFilterRole('user'); setShowFilterDropdown(false); }} className="block w-full text-left px-4 py-2 hover:bg-purple-50 text-sm">User</button>
                        <button onClick={() => { setFilterRole('vendor'); setShowFilterDropdown(false); }} className="block w-full text-left px-4 py-2 hover:bg-purple-50 text-sm">Vendor</button>
                        <button onClick={() => { setFilterRole('admin'); setShowFilterDropdown(false); }} className="block w-full text-left px-4 py-2 hover:bg-purple-50 text-sm">Admin</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold" style={{backgroundColor: '#755A7B'}}>
                            {user.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                          user.role === 'vendor' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.joinedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.totalBookings || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Rs {(user.totalSpent || 0).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors" title="Edit">
                            <FaEdit />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-yellow-50 text-yellow-600 transition-colors" title={user.status === 'active' ? 'Deactivate' : 'Activate'}>
                            {user.status === 'active' ? <FaBan /> : <FaCheck />}
                          </button>
                          <button className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors" title="Delete">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Showing {filteredUsers.length} of {users.length} users
              </p>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700">
                  Previous
                </button>
                <button className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{backgroundColor: '#755A7B'}}>
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white mt-16" style={{backgroundColor: '#755A7B'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                  <li><Link href="/" className="text-purple-100 hover:text-white text-sm transition-colors">Home</Link></li>
                  <li><Link href="/about" className="text-purple-100 hover:text-white text-sm transition-colors">About Us</Link></li>
                  <li><Link href="/contact" className="text-purple-100 hover:text-white text-sm transition-colors">Contact</Link></li>
                  <li><Link href="/signup" className="text-purple-100 hover:text-white text-sm transition-colors">Sign Up</Link></li>
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
      </main>
    </div>
  );
}
