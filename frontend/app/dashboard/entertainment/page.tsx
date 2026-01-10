'use client';

import Link from 'next/link';

export default function EntertainmentDashboard() {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#E5D4CC'}}>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Entertainment Dashboard</h1>
            <p className="text-sm text-gray-600">Manage your entertainment services</p>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Entertainment Manager</h2>
          <p className="text-gray-600 mb-6">
            Dashboard coming soon! Manage DJ services, live bands, and traditional performers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="p-6 border-2 rounded-lg" style={{borderColor: '#D2C8D3'}}>
              <h3 className="font-semibold text-gray-900 mb-2">Performance Packages</h3>
              <p className="text-sm text-gray-500">Create service packages</p>
            </div>
            <div className="p-6 border-2 rounded-lg" style={{borderColor: '#D2C8D3'}}>
              <h3 className="font-semibold text-gray-900 mb-2">Media Library</h3>
              <p className="text-sm text-gray-500">Share samples & videos</p>
            </div>
            <div className="p-6 border-2 rounded-lg" style={{borderColor: '#D2C8D3'}}>
              <h3 className="font-semibold text-gray-900 mb-2">Event Calendar</h3>
              <p className="text-sm text-gray-500">Track bookings & availability</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
