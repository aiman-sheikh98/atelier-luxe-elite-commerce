
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
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1035&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=987&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1169&auto=format&fit=crop'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1590739293931-a0a507c73077?q=80&w=987&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565315292799-10c3a5723bdf?q=80&w=928&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1057&auto=format&fit=crop'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1171&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1575032617751-6ddec2089882?q=80&w=1074&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1035&auto=format&fit=crop'
    ]
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
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=987&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579437256055-1e90a82f5d72?q=80&w=1074&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559139010-557cb61f64d5?q=80&w=1141&auto=format&fit=crop'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1621260860349-1b5a0e588cd3?q=80&w=1050&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1627394678286-fd8d41a826ec?q=80&w=987&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1601592996763-f05c9c80081c?q=80&w=987&auto=format&fit=crop'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1064&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1170&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1160&auto=format&fit=crop'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1065&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=987&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=1112&auto=format&fit=crop'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1598522140397-c94913554fb9?q=80&w=987&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1060&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598971639058-bb4741e9650b?q=80&w=976&auto=format&fit=crop'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?q=80&w=987&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=987&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=926&auto=format&fit=crop'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1011&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=1074&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=987&auto=format&fit=crop'
    ],
    new: true
  },
  {
    id: 'clothing-004',
    name: 'Signature Leather Jacket',
    category: 'clothing',
    price: 4950,
    description: 'Premium calfskin leather jacket with distinctive design details.',
    details: [
      'Full-grain calfskin leather',
      'Slim fit',
      'Front zip closure',
      'Side zip pockets',
      'Quilted shoulder panels',
      'Signature hardware',
      'Made in Italy'
    ],
    colors: ['#21201F', '#5B432E', '#8A6D3B'],
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=935&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?q=80&w=1036&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1036&auto=format&fit=crop'
    ],
    featured: true
  },
  {
    id: 'clothing-005',
    name: 'Fine Merino Wool Turtleneck',
    category: 'clothing',
    price: 890,
    description: 'Refined turtleneck sweater crafted from Italian merino wool.',
    details: [
      '100% Italian merino wool',
      'Slim fit',
      'Ribbed turtleneck, cuffs and hem',
      'Lightweight and breathable',
      'Hand wash cold'
    ],
    colors: ['#0F2C4A', '#21201F', '#5B432E', '#FFF8DC'],
    images: [
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=987&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1577538928305-3807c3993047?q=80&w=1170&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541346183200-e8e117785358?q=80&w=1010&auto=format&fit=crop'
    ],
    bestseller: true
  },
  {
    id: 'clothing-006',
    name: 'Pleated Silk Maxi Skirt',
    category: 'clothing',
    price: 1890,
    description: 'Elegant pleated maxi skirt in lightweight silk twill.',
    details: [
      '100% silk twill',
      'High waist',
      'Side zip closure',
      'All-around pleats',
      'Full-length',
      'Dry clean only'
    ],
    colors: ['#8A6D3B', '#21201F', '#90002D'],
    images: [
      'https://images.unsplash.com/photo-1590159983013-d4ff5fc71c1d?q=80&w=987&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1577900232427-18219b9166a0?q=80&w=987&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595231776515-ddffb1f4eb73?q=80&w=987&auto=format&fit=crop'
    ],
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
