import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Background Image */}
        <img 
          src="/4.jpg" 
          alt="Wedding background"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-red bg-opacity-40" style={{ zIndex: 1 }}></div>
        
        {/* Header */}
        <header className="relative bg-transparent" style={{ zIndex: 10 }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Wedora Logo" className="h-12 w-12" />
              <h1 className="text-2xl font-bold text-white" style={{fontFamily: 'var(--font-season)'}}>Wedora</h1>
            </div>
            <nav className="flex items-center gap-6">
              <Link
                href="/about"
                className="px-4 py-2 font-medium text-white transition-colors hover:opacity-80"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 font-medium text-white transition-colors hover:opacity-80"
              >
                Contact
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 text-white rounded-md font-medium border-2 border-white transition-all hover:bg-white hover:text-black"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-white rounded-md font-medium border-2 border-white transition-all hover:bg-white hover:text-black"
              >
                Sign Up
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero Content */}
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-white sm:text-6xl md:text-7xl" style={{fontFamily: 'var(--font-season)'}}>
              Plan Your Dream
              <span className="block text-white">Wedding</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-white">
              Connect with the best wedding vendors in your area. From venues to photographers, 
              we have everything you need to make your special day unforgettable.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/signup"
                className="px-8 py-4 text-lg font-medium rounded-md border-2 border-white text-white transition-all hover:bg-white hover:text-black"
              >
                Get Started
              </Link>
              <Link
                href="#features"
                className="px-8 py-4 text-lg font-medium rounded-md border-2 border-white text-white transition-all hover:bg-white hover:text-black"
              >
                Learn More
              </Link>
            </div>
          </div>
        </main>
      </div>

      {/* Features Section */}
      <div className="bg-white">
        <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12" style={{fontFamily: 'var(--font-season)'}}>
            Why Choose Wedora?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{backgroundColor: '#D2C8D3'}}>
                <svg className="w-6 h-6" style={{color: '#755A7B'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2" style={{fontFamily: 'var(--font-season)'}}>Find Vendors</h3>
              <p className="text-gray-600">
                Browse through hundreds of verified vendors across 11 categories
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{backgroundColor: '#E5D4CC'}}>
                <svg className="w-6 h-6" style={{color: '#755A7B'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2" style={{fontFamily: 'var(--font-season)'}}>Easy Booking</h3>
              <p className="text-gray-600">
                Book and manage all your wedding services in one place
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{backgroundColor: '#D2C8D3'}}>
                <svg className="w-6 h-6" style={{color: '#A495A8'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2" style={{fontFamily: 'var(--font-season)'}}>Trusted Reviews</h3>
              <p className="text-gray-600">
                Read authentic reviews from couples who've used our vendors
              </p>
            </div>
          </div>
        </div>

        {/* Vendor Categories */}
        <div className="py-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6" style={{fontFamily: 'var(--font-season)'}}>
            Vendor Dashboards
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Click on any category to access the vendor management dashboard (Dev Mode - No Authentication)
          </p>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
            {[
              { name: 'Venue & Accommodation', route: '/dashboard/venue-accommodation' },
              { name: 'Photography & Videography', route: '/dashboard/photography' },
              { name: 'Fashion & Beauty', route: '/dashboard/fashion-beauty' },
              { name: 'Entertainment', route: '/dashboard/entertainment' },
              { name: 'Transportation', route: '/dashboard/transportation' },
              { name: 'Ceremonial Services', route: '/dashboard/ceremonial' },
              { name: 'Cake Decoration', route: '/dashboard/cake-decoration' },
              { name: 'Gifting & Souvenirs', route: '/dashboard/gifting' }
            ].map((category) => (
              <Link
                key={category.name}
                href={category.route}
                className="text-center transition-all transform hover:scale-105 hover:shadow-2xl rounded-xl shadow-lg"
                style={{
                  backgroundColor: '#755A7B',
                  padding: '24px 16px',
                  borderRadius: '12px',
                  border: '2px solid #5a4463'
                }}
              >
                <p className="font-bold text-white text-sm leading-tight">{category.name}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section with Background Image */}
        <div className="pb-20 px-4">
          <div 
            className="relative rounded-2xl shadow-2xl overflow-hidden"
            style={{
              backgroundImage: 'url(/15.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '400px'
            }}
          >
            {/* Transparent overlay container */}
            <div 
              className="relative z-10 p-12 text-center flex flex-col items-center justify-center"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                minHeight: '400px'
              }}
            >
              <h2 className="text-4xl font-bold text-white mb-4" style={{fontFamily: 'var(--font-season)'}}>
                Ready to Plan Your Perfect Wedding?
              </h2>
              <p className="text-white text-lg mb-8 max-w-2xl">
                Join thousands of couples who have found their perfect vendors on Wedora
              </p>
              <Link
                href="/signup"
                className="inline-block px-10 py-4 text-lg font-medium rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105"
                style={{backgroundColor: '#FFFFFF', color: '#755A7B'}}
              >
                Create Your Free Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white" style={{backgroundColor: '#755A7B'}}>
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
    </div>
  );
}
