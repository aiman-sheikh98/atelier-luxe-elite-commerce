
export type Product = {
  id: string;
  name: string;
  category: 'bags' | 'wallets' | 'sneakers' | 'clothing';
  price: number;
  description: string;
  details: string[];
  colors: string[];
  images: string[];
  featured?: boolean;
  new?: boolean;
  bestseller?: boolean;
};

export const products: Product[] = [
  {
    id: 'bag-001',
    name: 'Monogram Canvas Handbag',
    category: 'bags',
    price: 2490,
    description: 'Iconic monogram canvas handbag with signature gold-tone hardware.',
    details: [
      'Leather trim',
      'Gold-tone hardware',
      'Microfiber lining',
      'Interior flat pocket',
      'Double handles with a 4.5" drop',
      'Dimensions: 11.8" x 6.7" x 4.3"'
    ],
    colors: ['#A1866E', '#21201F', '#90002D'],
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    featured: true,
    bestseller: true
  },
  {
    id: 'bag-002',
    name: 'Embossed Leather Tote',
    category: 'bags',
    price: 3290,
    description: 'Sophisticated tote bag crafted from premium embossed leather.',
    details: [
      'Full-grain embossed leather',
      'Signature logo embossed pattern',
      'Interior zip pocket and smartphone pocket',
      'Protective metal feet',
      'Top handle with 5" drop',
      'Dimensions: 13.4" x 10.2" x 5.9"'
    ],
    colors: ['#F5F5DC', '#21201F', '#5B432E'],
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    new: true
  },
  {
    id: 'bag-003',
    name: 'Classic Quilted Flap Bag',
    category: 'bags',
    price: 5500,
    description: 'Timeless quilted leather flap bag with chain strap.',
    details: [
      'Lambskin leather',
      'Diamond quilting pattern',
      'Signature twist lock closure',
      'Chain and leather strap',
      'Interior zip compartment',
      'Dimensions: 10" x 6" x 2.75"'
    ],
    colors: ['#21201F', '#A52A2A', '#F5F5DC'],
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg']
  },
  {
    id: 'wallet-001',
    name: 'Compact Monogram Wallet',
    category: 'wallets',
    price: 690,
    description: 'Compact bifold wallet in signature monogram canvas.',
    details: [
      'Monogram coated canvas with calfskin leather trim',
      'Grained leather lining',
      '8 card slots',
      '2 bill compartments',
      '2 additional compartments',
      'Dimensions: 3.7" x 7.5" x 0.4"'
    ],
    colors: ['#A1866E', '#21201F'],
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    bestseller: true
  },
  {
    id: 'wallet-002',
    name: 'Long Patent Leather Wallet',
    category: 'wallets',
    price: 950,
    description: 'Elegant long wallet crafted from polished patent leather.',
    details: [
      'Patent leather exterior',
      'Calfskin leather lining',
      '12 card slots',
      'Zippered coin pocket',
      '2 bill compartments',
      'Dimensions: 7.5" x 4" x 1"'
    ],
    colors: ['#21201F', '#8A6D3B', '#FFF8DC'],
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    new: true
  },
  {
    id: 'sneaker-001',
    name: 'Premium Leather Sneakers',
    category: 'sneakers',
    price: 990,
    description: 'Luxurious low-top sneakers crafted from premium leather.',
    details: [
      'Full-grain calfskin upper',
      'Rubber outsole',
      'Padded insole',
      'Embossed logo on tongue and heel',
      'Hand-stitched details',
      'Made in Italy'
    ],
    colors: ['#FFFFFF', '#21201F', '#8A6D3B'],
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    featured: true
  },
  {
    id: 'sneaker-002',
    name: 'Monogram High-Top Sneakers',
    category: 'sneakers',
    price: 1290,
    description: 'Distinctive high-top sneakers featuring monogram details.',
    details: [
      'Canvas and calfskin upper',
      'Rubber outsole',
      'Round toe',
      'Lace-up front',
      'Padded collar',
      'Logo-embossed tongue'
    ],
    colors: ['#A1866E', '#21201F'],
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    new: true
  },
  {
    id: 'clothing-001',
    name: 'Tailored Wool Blazer',
    category: 'clothing',
    price: 2950,
    description: 'Impeccably tailored wool blazer with subtle luxury details.',
    details: [
      '100% virgin wool',
      'Notched lapels',
      'Two-button closure',
      'Four button cuffs',
      'Chest pocket and flap pockets',
      'Double back vent'
    ],
    colors: ['#21201F', '#0F2C4A', '#5B432E'],
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    bestseller: true
  },
  {
    id: 'clothing-002',
    name: 'Silk Blend Knit Dress',
    category: 'clothing',
    price: 2490,
    description: 'Elegant knit dress crafted from a luxurious silk blend.',
    details: [
      '55% silk, 45% wool blend',
      'A-line silhouette',
      'Boat neckline',
      'Three-quarter length sleeves',
      'Side pockets',
      'Signature gold-tone button details'
    ],
    colors: ['#21201F', '#8A6D3B', '#90002D'],
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    featured: true
  },
  {
    id: 'clothing-003',
    name: 'Cashmere Crewneck Sweater',
    category: 'clothing',
    price: 1290,
    description: 'Luxuriously soft cashmere sweater with ribbed trim.',
    details: [
      '100% cashmere',
      'Regular fit',
      'Crew neckline',
      'Ribbed collar, cuffs, and hem',
      'Subtle logo embroidery at chest',
      'Dry clean only'
    ],
    colors: ['#FFF8DC', '#21201F', '#0F2C4A', '#5B432E'],
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    new: true
  }
];

export const getFeaturedProducts = () => products.filter(p => p.featured);
export const getNewArrivals = () => products.filter(p => p.new);
export const getBestsellers = () => products.filter(p => p.bestseller);
export const getProductsByCategory = (category: Product['category']) => 
  products.filter(p => p.category === category);
export const getProductById = (id: string) => 
  products.find(p => p.id === id);
