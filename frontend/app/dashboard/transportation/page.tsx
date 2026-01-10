'use client';

import Link from 'next/link';

export default function TransportationDashboard() {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#E5D4CC'}}>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Transportation Dashboard</h1>
            <p className="text-sm text-gray-600">Manage your transportation services</p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 text-white rounded-md transition-colors hover:opacity-90"
            style={{backgroundColor: '#755A7B'}}
          >
            Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Transportation Manager</h2>
          <p className="text-gray-600 mb-6">
            Dashboard coming soon! Manage bridal cars, guest transport, and vehicle rentals.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="p-6 border-2 rounded-lg" style={{borderColor: '#D2C8D3'}}>
              <h3 className="font-semibold text-gray-900 mb-2">Vehicle Fleet</h3>
              <p className="text-sm text-gray-500">Manage your vehicles</p>
            </div>
            <div className="p-6 border-2 rounded-lg" style={{borderColor: '#D2C8D3'}}>
              <h3 className="font-semibold text-gray-900 mb-2">Rental Packages</h3>
              <p className="text-sm text-gray-500">Set pricing & packages</p>
            </div>
            <div className="p-6 border-2 rounded-lg" style={{borderColor: '#D2C8D3'}}>
              <h3 className="font-semibold text-gray-900 mb-2">Reservations</h3>
              <p className="text-sm text-gray-500">Manage bookings</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
