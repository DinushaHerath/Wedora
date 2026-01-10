export enum UserRole {
  USER = 'user',
  VENDOR = 'vendor',
  ADMIN = 'admin',
}

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
    id: 'food-beverages',
    name: 'Food & Beverages',
    subcategories: ['Caterers', 'Bakers/Cake Designers', 'Beverage Services'],
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
    id: 'decoration-ambience',
    name: 'Decoration & Ambience',
    subcategories: [
      'Decorators',
      'Florists',
      'Lighting & Sound',
      'Furniture Rentals',
    ],
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    subcategories: ['DJs', 'Live Bands', 'Traditional Dancers'],
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
    id: 'planning-management',
    name: 'Planning & Management',
    subcategories: [
      'Wedding Planners',
      'Coordinators',
      'Invitation Designers',
      'E-invites',
    ],
  },
  {
    id: 'hospitality-guest-services',
    name: 'Hospitality & Guest Services',
    subcategories: [
      'Accommodation Management',
      'Guest Welcoming',
      'Security',
    ],
  },
  {
    id: 'gifting-souvenirs',
    name: 'Gifting & Souvenirs',
    subcategories: ['Gift Shops', 'Return Gifts', 'Custom Merchandise'],
  },
];
