import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'elora-noir',
    name: 'ÉLORA Noir',
    subtitle: 'Extrait de Parfum • Dark Orchid, Smoky Leather & Black Amber',
    category: 'Perfumes',
    price: 180,
    originalPrice: 210,
    rating: 4.9,
    reviewCount: 148,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'An enigmatic, magnetic blend formulated for nocturnal sophistication. ÉLORA Noir opens with velvet plum and spices before deepening into nocturnal orchid, smoky cedarwood, and rich black amber.',
    fragranceFamily: 'Warm & Sensual',
    topNotes: ['Black Plum', 'Pink Peppercorn', 'Bergamot Essence'],
    heartNotes: ['Midnight Orchid', 'Smoked Leather', 'Moroccan Rose'],
    baseNotes: ['Black Amber', 'Patchouli', 'Madagascar Vanilla Bean', 'Cedar'],
    sizes: [
      { size: '50ml Spray', priceMultiplier: 1 },
      { size: '100ml Spray', priceMultiplier: 1.65 },
      { size: '30ml Travel', priceMultiplier: 0.65 }
    ],
    concentration: 'Extrait de Parfum (28% Oil)',
    longevity: '14 – 18 Hours',
    sillage: 'Intense & Magnetic Trail',
    inStock: true,
    isFeatured: true,
    isBestSeller: true,
    reviews: [
      {
        id: 'rev-1',
        author: 'Nana Ama O.',
        rating: 5,
        date: '3 days ago',
        comment: 'ÉLORA Noir is pure magic. I sprayed it in the morning and by midnight people were still asking me what fragrance I was wearing.',
        verified: true
      },
      {
        id: 'rev-2',
        author: 'Kweku B.',
        rating: 5,
        date: '1 week ago',
        comment: 'Deep, rich, and not overpowering. The plum and amber notes harmonize in a very sophisticated way.',
        verified: true
      }
    ]
  },
  {
    id: 'elora-rose',
    name: 'ÉLORA Rose',
    subtitle: 'Eau de Parfum • Damask Rose Petals, Lychee & Champagne Musk',
    category: 'Perfumes',
    price: 160,
    rating: 4.8,
    reviewCount: 112,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A contemporary tribute to Parisian bloom. ÉLORA Rose captures freshly picked morning roses infused with sparkling pink lychee and a whisper of cashmere musk.',
    fragranceFamily: 'Sweet & Floral',
    topNotes: ['Pink Lychee', 'Italian Mandarin', 'Morning Dew'],
    heartNotes: ['Damask Rose Absolute', 'White Peony', 'Magnolia Blossom'],
    baseNotes: ['Cashmere Musk', 'White Amber', 'Clean Cedarwood'],
    sizes: [
      { size: '50ml Spray', priceMultiplier: 1 },
      { size: '100ml Spray', priceMultiplier: 1.65 },
      { size: '30ml Travel', priceMultiplier: 0.65 }
    ],
    concentration: 'Eau de Parfum (22% Oil)',
    longevity: '10 – 14 Hours',
    sillage: 'Radiant & Romantic',
    inStock: true,
    isFeatured: true,
    isNew: true,
    reviews: [
      {
        id: 'rev-3',
        author: 'Afua Mensah',
        rating: 5,
        date: '2 weeks ago',
        comment: 'The freshest rose scent without that powdery vintage feel. Feminine, luxurious, and uplifting.',
        verified: true
      }
    ]
  },
  {
    id: 'elora-oud',
    name: 'ÉLORA Oud',
    subtitle: 'Prestige Fragrance • Royal Agarwood, Saffron & Smoky Cardamom',
    category: 'Perfumes',
    price: 220,
    originalPrice: 260,
    rating: 5.0,
    reviewCount: 96,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'An opulent symphony of aged Cambodian agarwood, golden saffron, and spicy cardamom. Rich, commanding, and timelessly royal.',
    fragranceFamily: 'Woody & Elegant',
    topNotes: ['Golden Saffron', 'Nutmeg', 'Green Cardamom'],
    heartNotes: ['Rare Oud Wood', 'Taif Rose', 'Cistus Labdanum'],
    baseNotes: ['Dark Amber', 'Leather Accord', 'Sandalwood', 'Tonka Bean'],
    sizes: [
      { size: '50ml Spray', priceMultiplier: 1 },
      { size: '100ml Spray', priceMultiplier: 1.65 },
      { size: '30ml Travel', priceMultiplier: 0.65 }
    ],
    concentration: 'Extrait de Parfum (30% Oil)',
    longevity: '18 – 24 Hours',
    sillage: 'Regal Sillage',
    inStock: true,
    isFeatured: true,
    isBestSeller: true,
    reviews: [
      {
        id: 'rev-4',
        author: 'David Quaye',
        rating: 5,
        date: '4 days ago',
        comment: 'Masterpiece level oud. It smells like a 500-dollar niche perfume from London. Extremely long lasting.',
        verified: true
      }
    ]
  },
  {
    id: 'velvet-glow-lotion',
    name: 'Velvet Glow Lotion',
    subtitle: 'Silken Body Hydrator • Raw Shea Butter, Niacinamide & Golden Vanilla',
    category: 'Body Lotions',
    price: 85,
    rating: 4.9,
    reviewCount: 210,
    image: 'https://images.unsplash.com/photo-1608248597359-2917e88b8d9a?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Impart an exquisite satin radiance with our ultra-nourishing body lotion. Whipped with raw Ghanaian shea butter, squalane, and delicate golden vanilla fragrance that lingers on warm skin all day.',
    fragranceFamily: 'Warm & Sensual',
    topNotes: ['Warm Coconut Milk', 'Golden Pear'],
    heartNotes: ['French Vanilla Orchid', 'Honeysuckle'],
    baseNotes: ['Cashmere Amber', 'Whipped Shea Butter'],
    sizes: [
      { size: '250ml Pump Bottle', priceMultiplier: 1 },
      { size: '400ml Luxury Jar', priceMultiplier: 1.5 },
      { size: '100ml Purse Tube', priceMultiplier: 0.55 }
    ],
    benefits: [
      '24-Hour Deep Hydration without greasy residue',
      'Infused with 5% Niacinamide for smooth, radiant skin tone',
      'Pure Ghanaian Shea Butter + Botanical Squalane',
      'Layer perfectly beneath ÉLORA perfumes for double longevity'
    ],
    keyIngredients: ['Unrefined Shea Butter', 'Squalane', 'Niacinamide (Vitamin B3)', 'Vitamin E', 'Jojoba Seed Oil'],
    concentration: 'Velvet Skin Emulsion',
    longevity: '12 Hours Soft Scent',
    inStock: true,
    isFeatured: true,
    isBestSeller: true,
    reviews: [
      {
        id: 'rev-5',
        author: 'Esi Frimpong',
        rating: 5,
        date: '5 days ago',
        comment: 'The glow this lotion gives your skin is unreal. Plus the sweet vanilla aroma layers so nicely with my Noir perfume!',
        verified: true
      }
    ]
  },
  {
    id: 'fresh-bloom-mist',
    name: 'Fresh Bloom Body Mist',
    subtitle: 'All-Day Refreshing Mist • White Tea, Freesia & Sparkling Citrus',
    category: 'Body Mists',
    price: 75,
    rating: 4.7,
    reviewCount: 88,
    image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'An airy, cooling body mist that wraps you in a burst of morning sun and blooming garden botanicals. Alcohol-light formulation infused with aloe vera to keep skin refreshed and delicately scented.',
    fragranceFamily: 'Fresh & Clean',
    topNotes: ['Crisp Green Apple', 'White Tea Leaf', 'Bergamot'],
    heartNotes: ['White Freesia', 'Lily of the Valley', 'Jasmine Petals'],
    baseNotes: ['Clean Musk', 'Blonde Woods', 'Bamboo'],
    sizes: [
      { size: '200ml Fine Mist Bottle', priceMultiplier: 1 },
      { size: '100ml Travel Mist', priceMultiplier: 0.6 }
    ],
    benefits: [
      'Cooling hydration with Aloe Vera extract',
      'Lightweight, non-staining fine atomized spray',
      'Ideal for post-workout, beach days, and daily touch-ups'
    ],
    keyIngredients: ['Aloe Barbadensis Leaf Juice', 'Glycerin', 'Botanical Hydrosol'],
    concentration: 'Gentle Botanical Fragrance Mist (8% Oil)',
    longevity: '6 – 8 Hours',
    sillage: 'Fresh & Breezy',
    inStock: true,
    isFeatured: false,
    reviews: [
      {
        id: 'rev-6',
        author: 'Sena Doe',
        rating: 5,
        date: '1 week ago',
        comment: 'Light, uplifting and so clean. Perfect for our tropical weather in Accra.',
        verified: true
      }
    ]
  },
  {
    id: 'golden-amber-oil',
    name: 'Golden Amber Oil',
    subtitle: 'Artisanal Perfume Oil • Pure Concentrated Ambergris, Vanilla & Myrrh',
    category: 'Fragrance Oils',
    price: 60,
    originalPrice: 75,
    rating: 4.9,
    reviewCount: 134,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A 100% alcohol-free concentrated perfume oil housed in an applicator bottle. Melts upon pulse points with body heat to release an intimate, golden aura of warm resins and amber.',
    fragranceFamily: 'Amber & Oriental',
    topNotes: ['Warm Spices', 'Sweet Orange Blossom'],
    heartNotes: ['Golden Amber Resin', 'Ylang Ylang', 'Myrrh'],
    baseNotes: ['Bourbon Vanilla', 'Sandalwood Oil', 'Soft Musk'],
    sizes: [
      { size: '12ml Crystal Roller', priceMultiplier: 1 },
      { size: '25ml Dropper Bottle', priceMultiplier: 1.8 }
    ],
    benefits: [
      'Alcohol-Free: Gentle on sensitive pulse points',
      'High concentration: 2 drops lasts all day and night',
      'Intimate scent bubble activated by natural skin warmth'
    ],
    keyIngredients: ['Fractionated Coconut Oil', 'Pure Parfum Oil Essence', 'Jojoba Oil'],
    concentration: 'Pure Concentrated Attar Oil (100% Alcohol Free)',
    longevity: '20+ Hours',
    sillage: 'Intimate & Warm',
    inStock: true,
    isFeatured: true,
    isBestSeller: true,
    reviews: [
      {
        id: 'rev-7',
        author: 'Mawuli A.',
        rating: 5,
        date: '3 days ago',
        comment: 'You only need two drops on your wrist and neck. The amber warmth is divine.',
        verified: true
      }
    ]
  },
  {
    id: 'santal-imperial',
    name: 'Santal Impérial',
    subtitle: 'Extrait de Parfum • Australian Sandalwood, Cardamom & Violet Leaf',
    category: 'Perfumes',
    price: 195,
    rating: 4.9,
    reviewCount: 77,
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'An architectural woody fragrance that balances creamy sandalwood with fresh cardamom, iris roots, and rich cedar. The definition of modern understated luxury.',
    fragranceFamily: 'Woody & Elegant',
    topNotes: ['Cardamom', 'Violet Leaf', 'Papyrus'],
    heartNotes: ['Iris Concrete', 'Creamy Sandalwood', 'Cedarwood'],
    baseNotes: ['Leather', 'Golden Amber', 'Vetiver Roots'],
    sizes: [
      { size: '50ml Spray', priceMultiplier: 1 },
      { size: '100ml Spray', priceMultiplier: 1.65 },
      { size: '30ml Travel', priceMultiplier: 0.65 }
    ],
    concentration: 'Extrait de Parfum (25% Oil)',
    longevity: '14 – 16 Hours',
    sillage: 'Sophisticated & Subtle',
    inStock: true,
    isNew: true,
    reviews: [
      {
        id: 'rev-8',
        author: 'Kwame Osei',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Smooth, woody, and creamy. Signature scent material for work and evening galas.',
        verified: true
      }
    ]
  },
  {
    id: 'silk-jasmine-lotion',
    name: 'Silk Jasmine Body Lotion',
    subtitle: 'Intensive Skin Soufflé • Night Blooming Jasmine & Camellia Oil',
    category: 'Body Lotions',
    price: 90,
    rating: 4.8,
    reviewCount: 64,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1608248597359-2917e88b8d9a?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Envelop your body in the intoxicating scent of night-blooming white jasmine. Formulated with Japanese Camellia oil and hyaluronic acid to lock in moisture for 48 hours.',
    fragranceFamily: 'Sweet & Floral',
    topNotes: ['White Peach', 'Neroli Essence'],
    heartNotes: ['Night Blooming Jasmine', 'Tuberose'],
    baseNotes: ['White Musk', 'Silk Tree Bark'],
    sizes: [
      { size: '250ml Pump Bottle', priceMultiplier: 1 },
      { size: '400ml Luxury Jar', priceMultiplier: 1.5 }
    ],
    benefits: [
      'Contains Multi-Molecular Hyaluronic Acid for 48h barrier repair',
      'Camellia Seed Oil restores skin elasticity',
      'Leaves subtle diamond shimmer under natural lighting'
    ],
    keyIngredients: ['Camellia Oleifera Seed Oil', 'Hyaluronic Acid Complex', 'Shea Butter', 'Vitamin C'],
    concentration: 'Ultra-Rich Body Soufflé',
    longevity: '10 Hours Soft Sillage',
    inStock: true,
    reviews: []
  },
  {
    id: 'amber-noir-deodorant',
    name: 'Amber Noir Natural Deodorant',
    subtitle: 'Probiotic Luxury Deodorant • All-Day Odor Protection with Fine Fragrance',
    category: 'Deodorants',
    price: 55,
    rating: 4.7,
    reviewCount: 92,
    image: 'https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Aluminum-free and baking-soda-free luxury deodorant stick formulated with natural enzymes, prebiotic zinc, and the warm ÉLORA Noir signature fragrance notes.',
    fragranceFamily: 'Warm & Sensual',
    topNotes: ['Bergamot', 'Cardamom'],
    heartNotes: ['Black Pepper', 'Smoked Orchid'],
    baseNotes: ['Clean Amber', 'Cedar'],
    sizes: [
      { size: '75g Solid Stick', priceMultiplier: 1 }
    ],
    benefits: [
      '100% Aluminum & Baking Soda Free (No underarm irritation)',
      'Prebiotic Zinc balances skin microbiome for 24h odor control',
      'Glides on clear with zero white marks on dark clothing'
    ],
    keyIngredients: ['Zinc Ricinoleate', 'Arrowroot Powder', 'Coconut Oil', 'Magnesium Hydroxide'],
    concentration: 'Natural Deodorant Balm',
    longevity: '24-Hour Odor Protection',
    inStock: true,
    isFeatured: false,
    reviews: []
  },
  {
    id: 'citrus-bergamot-mist',
    name: 'Citrus Bergamot Body Mist',
    subtitle: 'Energizing Hair & Body Mist • Sicilian Citrus, Mandarin & Green Basil',
    category: 'Body Mists',
    price: 70,
    rating: 4.8,
    reviewCount: 45,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A crisp morning tonic of sun-drenched Italian bergamot, fresh squeezed blood orange, and crushed Mediterranean basil leaves.',
    fragranceFamily: 'Fresh & Clean',
    topNotes: ['Sicilian Bergamot', 'Blood Orange', 'Lime Zest'],
    heartNotes: ['Green Basil', 'Orange Flower', 'Sea Mist'],
    baseNotes: ['White Amber', 'Vetiver Grass'],
    sizes: [
      { size: '200ml Fine Mist Bottle', priceMultiplier: 1 }
    ],
    benefits: [
      'Formulated with Provitamin B5 safe for hair and skin',
      'Instant energizing effect for mornings and hot afternoons'
    ],
    concentration: 'Botanical Hair & Body Mist',
    longevity: '6 Hours Crisp Glow',
    inStock: true,
    reviews: []
  },
  {
    id: 'royal-musk-oil',
    name: 'Royal White Musk Oil',
    subtitle: 'Pure Concentrated Perfume Oil • Velvety Clean Musk, Iris & Lily',
    category: 'Fragrance Oils',
    price: 65,
    rating: 5.0,
    reviewCount: 110,
    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'The epitome of pure elegance. Clean, creamy, skin-scent white musk that smells like luxury linen, warm morning sun, and delicate floral powdery softness.',
    fragranceFamily: 'Fresh & Clean',
    topNotes: ['White Lily', 'Aldehydes', 'Crisp Cotton'],
    heartNotes: ['Florentine Iris', 'Ylang Ylang', 'Rosewater'],
    baseNotes: ['Pure White Musk', 'Tonka Bean', 'Sandalwood'],
    sizes: [
      { size: '12ml Crystal Roller', priceMultiplier: 1 },
      { size: '25ml Dropper Bottle', priceMultiplier: 1.8 }
    ],
    benefits: [
      'Concentrated oil formula that sits close to skin with unforgettable softness',
      'Non-greasy, fast-absorbing botanical carrier oil base'
    ],
    concentration: '100% Pure Attar Oil',
    longevity: '24+ Hours',
    inStock: true,
    isBestSeller: true,
    reviews: []
  }
];
