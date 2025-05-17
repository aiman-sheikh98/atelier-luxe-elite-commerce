export type Product = {
  id: string;
  name: string;
  category: 'bags' | 'wallets' | 'sneakers' | 'clothing' | 'watches' | 'perfumes';
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
      'https://images.unsplash.com/photo-1601388362337-3961ea712be4?q=80&w=987&auto=format&fit=crop'
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
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1035&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1601388362337-3961ea712be4?q=80&w=987&auto=format&fit=crop'
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
      'https://images.unsplash.com/photo-1606503825008-909a67e63c3d?q=80&w=987&auto=format&fit=crop'
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
      'https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=987&auto=format&fit=crop'
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
      'https://images.unsplash.com/photo-1487252665478-49b61b47f302?q=80&w=987&auto=format&fit=crop'
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
      'https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=987&auto=format&fit=crop'
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
      'https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=987&auto=format&fit=crop'
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
      'https://images.unsplash.com/photo-1487252665478-49b61b47f302?q=80&w=987&auto=format&fit=crop'
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
      'https://images.unsplash.com/photo-1487252665478-49b61b47f302?q=80&w=987&auto=format&fit=crop'
    ],
    new: true
  },
  {
    id: 'clothing-007',
    name: 'Luxury Cashmere Coat',
    category: 'clothing',
    price: 3950,
    description: 'Sumptuous double-faced cashmere coat with a minimalist design.',
    details: [
      '100% cashmere',
      'Double-faced construction',
      'Notched lapel collar',
      'Concealed button closure',
      'Belted waist',
      'Side pockets',
      'Made in Italy'
    ],
    colors: ['#21201F', '#8A6D3B', '#0F2C4A'],
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=687&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608234808654-2a8875faa7fd?q=80&w=741&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=987&auto=format&fit=crop'
    ],
    featured: true
  },
  {
    id: 'clothing-008',
    name: 'Embroidered Silk Blouse',
    category: 'clothing',
    price: 1850,
    description: 'Exquisite silk blouse with intricate floral embroidery detail.',
    details: [
      '100% mulberry silk',
      'Hand-embroidered floral details',
      'Relaxed fit',
      'Button closure',
      'Slightly puffed sleeves',
      'Dry clean only'
    ],
    colors: ['#F5F5DC', '#0F2C4A', '#90002D'],
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=662&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560379099-543ab70a2275?q=80&w=387&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1487252665478-49b61b47f302?q=80&w=987&auto=format&fit=crop'
    ],
    new: true
  },
  {
    id: 'watch-001',
    name: 'Platinum Chronograph Watch',
    category: 'watches',
    price: 28500,
    description: 'Premium automatic chronograph watch with platinum case and sapphire crystal.',
    details: [
      'Platinum case with 40mm diameter',
      'Swiss automatic movement',
      'Sapphire crystal with anti-reflective coating',
      'Water resistant to 100 meters',
      'Alligator leather strap with deployment clasp',
      'Power reserve: 60 hours'
    ],
    colors: ['#21201F', '#0F2C4A', '#5B432E'],
    images: [
      'https://images.unsplash.com/photo-1623998021446-45cd9b269c95?q=80&w=1776&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=1770&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=1776&auto=format&fit=crop'
    ],
    bestseller: true
  },
  {
    id: 'watch-002',
    name: 'Rose Gold Skeleton Watch',
    category: 'watches',
    price: 19750,
    description: 'Exquisite rose gold skeleton watch showcasing intricate mechanical craftsmanship.',
    details: [
      '18k rose gold case',
      'Manual-winding mechanical movement',
      'Skeleton dial revealing movement components',
      'Sapphire crystal on front and back',
      'Genuine alligator strap',
      '60-hour power reserve'
    ],
    colors: ['#B76E79', '#21201F'],
    images: [
      'https://images.unsplash.com/photo-1548171915-c39def818307?q=80&w=1770&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=1664&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=1776&auto=format&fit=crop'
    ],
    featured: true
  },
  {
    id: 'watch-003',
    name: 'Limited Edition Tourbillon',
    category: 'watches',
    price: 95000,
    description: 'Limited edition tourbillon masterpiece with hand-finished movement.',
    details: [
      'Platinum 950 case with 41mm diameter',
      'Hand-finished mechanical movement with tourbillon',
      'Limited to 50 pieces worldwide',
      'Power reserve indicator',
      'Hand-stitched alligator strap',
      '72-hour power reserve'
    ],
    colors: ['#21201F', '#424242'],
    images: [
      'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1770&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=1776&auto=format&fit=crop'
    ],
    new: true
  },
  {
    id: 'watch-004',
    name: 'Diamond-Set Diving Watch',
    category: 'watches',
    price: 36900,
    description: 'Professional diving watch with diamond-set bezel and luminescent markers.',
    details: [
      'Stainless steel and 18k gold case with 42mm diameter',
      'Automatic movement with date function',
      'Rotating bezel with 36 diamonds',
      'Blue ceramic dial with luminescent hour markers',
      'Water resistant to 300 meters',
      'Oyster bracelet with secure folding clasp'
    ],
    colors: ['#0F2C4A', '#D4AF37'],
    images: [
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1742&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1887&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=1776&auto=format&fit=crop'
    ],
    featured: true,
    bestseller: true
  },
  {
    id: 'watch-005',
    name: 'Perpetual Calendar Moonphase',
    category: 'watches',
    price: 75800,
    description: 'Sophisticated perpetual calendar watch with moonphase display and annual calendar.',
    details: [
      '18k white gold case with 40mm diameter',
      'Self-winding mechanical movement',
      'Perpetual calendar with day, date, month, and leap year displays',
      'Moonphase indicator at 6 o\'clock',
      'Sapphire crystal case back',
      'Hand-stitched alligator strap',
      'Power reserve: 48 hours'
    ],
    colors: ['#FFFFFF', '#21201F'],
    images: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1827&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1888&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=1776&auto=format&fit=crop'
    ],
    new: true,
    featured: true
  },
  {
    id: 'perfume-001',
    name: 'Signature Amber Oud',
    category: 'perfumes',
    price: 390,
    description: 'Opulent amber and oud fragrance with notes of precious woods and spices.',
    details: [
      '100ml eau de parfum',
      'Top notes: bergamot, pink pepper',
      'Middle notes: rose, cinnamon',
      'Base notes: amber, oud, vanilla',
      'Handcrafted in France',
      'Concentration: 25%'
    ],
    colors: [],
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1780&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1592945403407-9546f1ad764c?q=80&w=1780&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608528577891-eb055944f2e7?q=80&w=1974&auto=format&fit=crop'
    ],
    bestseller: true
  },
  {
    id: 'perfume-002',
    name: 'Exclusive Rose Collection',
    category: 'perfumes',
    price: 450,
    description: 'Exquisite rose fragrance crafted with the rarest flowers from around the world.',
    details: [
      '75ml eau de parfum',
      'Top notes: Bulgarian rose, mandarin',
      'Middle notes: Damascus rose, jasmine',
      'Base notes: patchouli, white musk',
      'Limited annual production',
      'Artisanal French glassware'
    ],
    colors: [],
    images: [
      'https://images.unsplash.com/photo-1615412704911-55d589229864?q=80&w=1780&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1601295452898-78a8dd904ab3?q=80&w=1887&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1648&auto=format&fit=crop'
    ],
    featured: true
  },
  {
    id: 'perfume-003',
    name: 'Precious Iris & Vetiver',
    category: 'perfumes',
    price: 320,
    description: 'A sophisticated blend of noble iris and earthy vetiver for the discerning connoisseur.',
    details: [
      '100ml eau de parfum',
      'Top notes: bergamot, ginger',
      'Middle notes: iris, violet',
      'Base notes: vetiver, cedarwood',
      'Created by master perfumer',
      'Crystal flacon with gold accents'
    ],
    colors: [],
    images: [
      'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608529716866-68988a8d7c09?q=80&w=1976&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563170352-ba53a018aaf0?q=80&w=1769&auto=format&fit=crop'
    ],
    new: true
  },
  {
    id: 'perfume-004',
    name: 'Velvet Midnight Saffron',
    category: 'perfumes',
    price: 580,
    description: 'An opulent blend of precious saffron and rich vanilla, creating a sensual and mysterious aura.',
    details: [
      '100ml eau de parfum',
      'Top notes: saffron, black pepper',
      'Middle notes: rose absolute, cedarwood',
      'Base notes: vanilla, amber, leather',
      'Limited edition crystal bottle',
      'Handcrafted in small batches'
    ],
    colors: [],
    images: [
      'https://images.unsplash.com/photo-1610461888750-10bfc601b874?q=80&w=1887&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616949755610-8c9bbc06f14b?q=80&w=1887&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617129724087-43c74524a775?q=80&w=1887&auto=format&fit=crop'
    ],
    featured: true,
    bestseller: true
  },
  {
    id: 'perfume-005',
    name: 'Private Collection Oud & Sandalwood',
    category: 'perfumes',
    price: 750,
    description: 'An exclusive fragrance combining rare oud and creamy sandalwood for a sophisticated signature scent.',
    details: [
      '75ml eau de parfum',
      'Top notes: cardamom, bergamot',
      'Middle notes: oud wood, papyrus',
      'Base notes: sandalwood, ambergris, musk',
      'Hand-blown glass bottle with 24k gold accents',
      'Presented in a handcrafted wooden box'
    ],
    colors: [],
    images: [
      'https://images.unsplash.com/photo-1622618991746-fe6004db3a47?q=80&w=1887&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594149435368-b2d2d9602dd4?q=80&w=1887&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608528577891-eb055944f2e7?q=80&w=1974&auto=format&fit=crop'
    ],
    new: true,
    featured: true
  }
];

export const getFeaturedProducts = () => products.filter(p => p.featured);
export const getNewArrivals = () => products.filter(p => p.new);
export const getBestsellers = () => products.filter(p => p.bestseller);
export const getProductsByCategory = (category: Product['category']) => 
  products.filter(p => p.category === category);
export const getProductById = (id: string) => 
  products.find(p => p.id === id);
export const getProductsByCollection = (collection: 'featured' | 'new' | 'bestseller') => {
  switch (collection) {
    case 'featured':
      return getFeaturedProducts();
    case 'new':
      return getNewArrivals();
    case 'bestseller':
      return getBestsellers();
    default:
      return [];
  }
};
