// User roles
export enum UserRole {
  USER = 'user',
  VENDOR = 'vendor',
  ADMIN = 'admin',
}

// Vendor categories
export const VENDOR_CATEGORIES = [
  {
    id: 'venue-accommodation',
    name: 'Venue & Accommodation',
    subcategories: [
      'Hotels',
      'Banquet Halls',
      'Outdoor Venues',
      'Destination Resorts',
      'Homestays/Villas',
    ],
  },
  {
    id: 'photography-videography',
    name: 'Photography & Videography',
    subcategories: [
      'Photographers',
      'Videographers',
      'Drones',
      '360° Coverage',
      'Photo Booths',
    ],
  },
  {
    id: 'fashion-beauty',
    name: 'Fashion & Beauty',
    subcategories: [
      'Bridal/Groom Wear',
      'Jewelers',
      'Makeup Artists',
      'Mehendi Artists',
    ],
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    subcategories: [
      'DJs',
      'Live Bands',
      'Traditional Dancers',
    ],
  },
  {
    id: 'transportation',
    name: 'Transportation',
    subcategories: [
      'Bridal Car Rentals',
      'Guest Transport',
      'Horse/Chariot Providers',
    ],
  },
  {
    id: 'ceremonial-services',
    name: 'Ceremonial Services',
    subcategories: [
      'Astrologers',
      'Priests',
      'Marriage Registrars',
      'Traditional Instrumentalists',
    ],
  },
  {
    id: 'cake-decoration',
    name: 'Cake Decoration',
    subcategories: [
      'Wedding Cakes',
      'Custom Designs',
      'Cake Toppers',
    ],
  },
  {
    id: 'gifting-souvenirs',
    name: 'Gifting & Souvenirs',
    subcategories: [
      'Gift Shops',
      'Return Gifts',
      'Custom Merchandise',
    ],
  },
];

export type VendorCategory = typeof VENDOR_CATEGORIES[number];
