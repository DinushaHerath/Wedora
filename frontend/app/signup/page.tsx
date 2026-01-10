'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserRole, VENDOR_CATEGORIES } from '@/lib/constants';

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole | ''>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    organizationName: '',
    email: '',
    password: '',
    location: '',
  });
  const [errors, setErrors] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (selectedRole: UserRole | '') => {
    setRole(selectedRole);
    setSelectedCategories([]);
    setFormData({
      name: '',
      organizationName: '',
      email: '',
      password: '',
      location: '',
    });
  };

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!role) {
      setErrors('Please select a role');
      return false;
    }

    if (!formData.email || !formData.password) {
      setErrors('Email and password are required');
      return false;
    }

    if (role === UserRole.USER && !formData.name) {
      setErrors('Name is required');
      return false;
    }

    if (role === UserRole.VENDOR) {
      if (!formData.organizationName || !formData.location) {
        setErrors('Organization name and location are required for vendors');
        return false;
      }
      if (selectedCategories.length === 0) {
        setErrors('Please select at least one vendor category');
        return false;
      }
    }

    if (role === UserRole.ADMIN && !formData.name) {
      setErrors('Name is required');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Mock authentication - works without backend
      const user = {
        id: Date.now().toString(),
        role,
        email: formData.email,
        ...(role === UserRole.USER && { name: formData.name }),
        ...(role === UserRole.ADMIN && { name: formData.name }),
        ...(role === UserRole.VENDOR && {
          organizationName: formData.organizationName,
          location: formData.location,
          categories: selectedCategories,
        }),
      };

      // Check if user already exists (mock validation)
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      if (existingUsers.some((u: any) => u.email === formData.email)) {
        throw new Error('User with this email already exists');
      }

      // Store user in mock database
      existingUsers.push({ ...user, password: formData.password });
      localStorage.setItem('users', JSON.stringify(existingUsers));

      // Store token and user info
      const token = btoa(`${user.id}:${Date.now()}`);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Navigate to appropriate dashboard
      switch (role) {
        case UserRole.USER:
          router.push('/dashboard/user');
          break;
        case UserRole.VENDOR:
          router.push('/dashboard/vendor');
          break;
        case UserRole.ADMIN:
          router.push('/dashboard/admin');
          break;
      }
    } catch (error) {
      setErrors(error instanceof Error ? error.message : 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: 'url(/5.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="max-w-md w-full space-y-8 p-10 rounded-xl shadow-2xl" style={{backgroundColor: 'rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(10px)'}}>
        <div>
          <div className="flex justify-center mb-4">
            <img src="/logo.png" alt="Wedora Logo" className="h-20 w-20" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white" style={{fontFamily: 'var(--font-season)'}}>
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-white">
            Join Wedora - Your Wedding Planning Platform
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Role Selection */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-white">
              Select Role *
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => handleRoleChange(e.target.value as UserRole)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 bg-transparent text-white"
              style={{borderColor: 'rgba(255, 255, 255, 0.5)', color: '#755A7B'}}
              required
            >
              <option value="" style={{color: '#000'}}>Choose a role...</option>
              <option value={UserRole.USER} style={{color: '#000'}}>User</option>
              <option value={UserRole.VENDOR} style={{color: '#000'}}>Vendor</option>
              <option value={UserRole.ADMIN} style={{color: '#000'}}>Admin</option>
            </select>
          </div>

          {/* Vendor Categories */}
          {role === UserRole.VENDOR && (
            <div className="border-t pt-6" style={{borderColor: 'rgba(255, 255, 255, 0.3)'}}>
              <label className="block text-sm font-medium text-white mb-3">
                Select Vendor Categories *
              </label>
              <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto p-2 border rounded-md" style={{borderColor: 'rgba(255, 255, 255, 0.3)', backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
                {VENDOR_CATEGORIES.map((category) => (
                  <div key={category.id} className="flex items-start">
                    <input
                      type="checkbox"
                      id={category.id}
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryToggle(category.id)}
                      className="mt-1 h-4 w-4 border-gray-300 rounded"
                      style={{accentColor: '#755A7B'}}
                    />
                    <label
                      htmlFor={category.id}
                      className="ml-2 text-sm text-white cursor-pointer"
                    >
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                        {category.subcategories.join(', ')}
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dynamic Form Fields */}
          {role && (
            <div className="space-y-4 border-t pt-6" style={{borderColor: 'rgba(255, 255, 255, 0.3)'}}>
              {/* User/Admin Name Field */}
              {(role === UserRole.USER || role === UserRole.ADMIN) && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 bg-transparent text-white"
                    style={{borderColor: 'rgba(255, 255, 255, 0.5)', color: '#755A7B'}}
                    required
                  />
                </div>
              )}

              {/* Vendor Organization Name */}
              {role === UserRole.VENDOR && (
                <>
                  <div>
                    <label
                      htmlFor="organizationName"
                      className="block text-sm font-medium text-white"
                    >
                      Organization Name *
                    </label>
                    <input
                      type="text"
                      id="organizationName"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 bg-transparent text-white"
                      style={{borderColor: 'rgba(255, 255, 255, 0.5)', color: '#755A7B'}}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-white">
                      Location *
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 bg-transparent text-white placeholder-gray-200"
                      style={{borderColor: 'rgba(255, 255, 255, 0.5)', color: '#755A7B'}}
                      placeholder="City, Country"
                      required
                    />
                  </div>
                </>
              )}

              {/* Common Fields */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 bg-transparent text-white"
                  style={{borderColor: 'rgba(255, 255, 255, 0.5)', color: '#755A7B'}}
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 bg-transparent text-white"
                  style={{borderColor: 'rgba(255, 255, 255, 0.5)', color: '#755A7B'}}
                  required
                  minLength={6}
                />
              </div>
            </div>
          )}

          {/* Error Message */}
          {errors && (
            <div className="rounded-md p-4" style={{backgroundColor: 'rgba(239, 68, 68, 0.2)'}}>
              <p className="text-sm text-white">{errors}</p>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading || !role}
              className="w-full flex justify-center py-3 px-4 border-2 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              style={{
                borderColor: '#755A7B',
                color: '#755A7B',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                if (!loading && role) {
                  e.currentTarget.style.backgroundColor = '#755A7B';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(117, 90, 123, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading && role) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#755A7B';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-white">
              Already have an account?{' '}
              <a href="/login" className="font-medium hover:underline" style={{color: '#755A7B'}}>
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
