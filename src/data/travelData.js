// Core static data used across the app.
// Mock arrays below are used only when VITE_USE_MOCK_DATA=true.
// In production (VITE_USE_MOCK_DATA=false) all data comes from MongoDB.

export const whyChooseUs = [
  { title: "Trusted & Safe",          description: "Your safety is our priority.",              icon: "ShieldCheck"   },
  { title: "Best Price Guarantee",    description: "Get the best value for your money.",        icon: "Tag"           },
  { title: "24/7 Support",            description: "We're always here to help.",               icon: "Headphones"    },
  { title: "Curated Experiences",     description: "Unique trips, not just tourist spots.",    icon: "Sparkles"      },
  { title: "Expert Guides",           description: "Local insights for a richer experience.", icon: "UserCheck"     },
  { title: "Flexible Booking",        description: "Change plans, not your dreams.",           icon: "CalendarClock" },
];

export const curatedExperiences = [
  {
    id: 1,
    title: "Local Food Tours",
    description: "Taste authentic flavors at hidden gems.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Adventure Activities",
    description: "Feel the thrill. Live the adventure.",
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Cultural Immersion",
    description: "Connect with local traditions and people.",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Wellness Retreats",
    description: "Relax, recharge, feel refreshed.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
  },
];

export const itinerarySteps = [
  { step: 1, title: "Choose Destination",        description: "Pick where you want to go."         },
  { step: 2, title: "Customize Your Itinerary",  description: "Select activities, dates & stay."   },
  { step: 3, title: "Pack & Go",                 description: "We'll handle the rest!"             },
];

export const travelTipsList = [
  { id: 1, title: "What should I pack?",                    subtitle: "Essentials, clothing, documents and more."       },
  { id: 2, title: "Do I need a visa?",                      subtitle: "Check visa requirements & travel docs."           },
  { id: 3, title: "What is the best time to visit Bali?",   subtitle: "Find the ideal season for your trip."            },
  { id: 4, title: "How can I find cheap flight tickets?",   subtitle: "Smart booking tips for maximum savings."         },
  { id: 5, title: "Is travel insurance necessary?",         subtitle: "Stay protected during your journey."             },
];

export const faqList = [
  {
    id: 1,
    question: "How do I book a trip on Wanderly?",
    answer: "Browse our destinations or packages, choose your preferred travel dates and traveler count, and click 'Book Now' to complete your reservation in three simple steps."
  },
  {
    id: 2,
    question: "Can I customize my travel package?",
    answer: "Yes, absolutely! All of our packages can be tailored to match your specific preferences, from boutique hotel upgrades to customized private day excursions."
  },
  {
    id: 3,
    question: "What payment methods do you accept?",
    answer: "We support major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and split-payment installment options."
  },
  {
    id: 4,
    question: "Do you offer group discounts?",
    answer: "Yes, groups of 5 or more travelers qualify for exclusive group discounts ranging from 10% to 25% depending on destination and season."
  },
  {
    id: 5,
    question: "What is our cancellation policy?",
    answer: "We provide 100% free cancellation up to 14 days before your scheduled departure date, with full cash refund or flexible rebooking credits."
  },
];

// ─── Mock: Destinations ───────────────────────────────────────────────────────

export const destinationItems = [
  {
    id: 1,
    title: "Santorini",
    country: "Greece",
    category: "Beach",
    badge: "Trending",
    rating: 4.9,
    reviews: 2847,
    price: 1299,
    duration: "7 days",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    description: "Iconic whitewashed cliffside villages, volcanic beaches, and legendary Aegean sunsets.",
  },
  {
    id: 2,
    title: "Kyoto",
    country: "Japan",
    category: "Cultural",
    badge: "Popular",
    rating: 4.8,
    reviews: 3102,
    price: 1599,
    duration: "10 days",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    description: "Ancient temples, bamboo groves, geisha districts and cherry blossoms.",
  },
  {
    id: 3,
    title: "Bali",
    country: "Indonesia",
    category: "Beach",
    badge: "Best Value",
    rating: 4.7,
    reviews: 4210,
    price: 899,
    duration: "8 days",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    description: "Terraced rice paddies, Hindu temples, surf beaches and vibrant nightlife.",
  },
  {
    id: 4,
    title: "Machu Picchu",
    country: "Peru",
    category: "Adventure",
    badge: "Trending",
    rating: 4.9,
    reviews: 1956,
    price: 1799,
    duration: "9 days",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800&q=80",
    description: "The legendary Inca citadel nestled high in the Andes mountains.",
  },
  {
    id: 5,
    title: "Maldives",
    country: "Maldives",
    category: "Beach",
    badge: "Luxury",
    rating: 5.0,
    reviews: 1423,
    price: 2499,
    duration: "6 days",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    description: "Overwater bungalows, crystal-clear lagoons and spectacular coral reefs.",
  },
  {
    id: 6,
    title: "Paris",
    country: "France",
    category: "City",
    badge: "Popular",
    rating: 4.7,
    reviews: 5634,
    price: 1199,
    duration: "5 days",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    description: "The City of Light — art, cuisine, fashion and the iconic Eiffel Tower.",
  },
  {
    id: 7,
    title: "Patagonia",
    country: "Argentina",
    category: "Adventure",
    badge: null,
    rating: 4.8,
    reviews: 987,
    price: 2199,
    duration: "12 days",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    description: "Dramatic glaciers, jagged peaks and wild Andean landscapes.",
  },
  {
    id: 8,
    title: "Serengeti",
    country: "Tanzania",
    category: "Wildlife",
    badge: "Trending",
    rating: 4.9,
    reviews: 1234,
    price: 3299,
    duration: "10 days",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
    description: "Witness the Great Migration across Africa's most iconic safari landscape.",
  },
];

// ─── Mock: Travel Categories ──────────────────────────────────────────────────

export const travelCategories = [
  { id: 1, name: "Beach",     icon: "Waves",       count: 48,  image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" },
  { id: 2, name: "Adventure", icon: "Mountain",    count: 36,  image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80" },
  { id: 3, name: "Cultural",  icon: "Landmark",    count: 52,  image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80" },
  { id: 4, name: "Wildlife",  icon: "Leaf",        count: 24,  image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80" },
  { id: 5, name: "City",      icon: "Building2",   count: 61,  image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80" },
  { id: 6, name: "Luxury",    icon: "Star",        count: 19,  image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80" },
];

// ─── Mock: Travel Packages ────────────────────────────────────────────────────

export const travelPackages = [
  {
    id: 1,
    title: "Greek Island Hopper",
    location: "Greece",
    duration: "10 days",
    groupSize: "2-12",
    rating: 4.9,
    reviews: 312,
    price: 1899,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    description: "Island-hop through Santorini, Mykonos and Crete with handpicked boutique stays.",
    includes: ["Flights", "Hotels", "Guided tours", "Breakfast"],
  },
  {
    id: 2,
    title: "Japan Cherry Blossom Tour",
    location: "Japan",
    duration: "12 days",
    groupSize: "2-10",
    rating: 4.8,
    reviews: 245,
    price: 2299,
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    description: "Experience Japan in full bloom — Tokyo, Kyoto, Osaka and Nara in sakura season.",
    includes: ["Flights", "Hotels", "Rail pass", "Guided tours"],
  },
  {
    id: 3,
    title: "Bali Wellness Retreat",
    location: "Bali, Indonesia",
    duration: "8 days",
    groupSize: "1-8",
    rating: 4.7,
    reviews: 189,
    price: 1299,
    badge: "Best Value",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    description: "Yoga, spa, temple visits and rice terrace treks in the island of the gods.",
    includes: ["Villa stay", "Daily yoga", "Spa sessions", "Airport transfer"],
  },
  {
    id: 4,
    title: "Machu Picchu Explorer",
    location: "Peru",
    duration: "9 days",
    groupSize: "2-14",
    rating: 4.9,
    reviews: 156,
    price: 2099,
    badge: null,
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800&q=80",
    description: "Trek the Inca Trail and explore Sacred Valley with expert local guides.",
    includes: ["Flights", "Hotels", "Guided tours", "All breakfasts"],
  },
  {
    id: 5,
    title: "Maldives Luxury Escape",
    location: "Maldives",
    duration: "6 days",
    groupSize: "2-4",
    rating: 5.0,
    reviews: 98,
    price: 3499,
    badge: "Luxury",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    description: "Private overwater villa, snorkeling, sunset cruises and gourmet dining.",
    includes: ["Seaplane transfer", "All-inclusive", "Water sports", "Spa"],
  },
  {
    id: 6,
    title: "African Safari Adventure",
    location: "Tanzania",
    duration: "10 days",
    groupSize: "2-8",
    rating: 4.9,
    reviews: 203,
    price: 3999,
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
    description: "Witness the Great Migration and Big Five across Serengeti and Ngorongoro.",
    includes: ["Flights", "Lodges", "Game drives", "Full board"],
  },
];

// ─── Mock: Blog Posts ─────────────────────────────────────────────────────────

export const blogPosts = [
  {
    id: 1,
    title: "10 Hidden Gems in Southeast Asia You Must Visit",
    excerpt: "Beyond the tourist trail lies a Southeast Asia few travellers ever see — secret temples, untouched beaches and villages frozen in time.",
    category: "Destinations",
    author: "Sarah Mitchell",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80",
    date: "2024-11-15",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80",
    tags: ["Southeast Asia", "Off the beaten path", "Travel tips"],
  },
  {
    id: 2,
    title: "The Ultimate Packing Guide for Long-Haul Flights",
    excerpt: "Pack smarter, not harder. Our complete checklist for surviving — and thriving on — any flight over 10 hours.",
    category: "Travel Tips",
    author: "James Okafor",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
    date: "2024-10-28",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
    tags: ["Packing", "Long-haul", "Essentials"],
  },
  {
    id: 3,
    title: "Japan in Spring: A Complete Cherry Blossom Guide",
    excerpt: "Timing, top spots, etiquette and insider tips for experiencing hanami — Japan's beloved cherry blossom season.",
    category: "Destinations",
    author: "Yuki Tanaka",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80",
    date: "2024-09-10",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    tags: ["Japan", "Cherry blossoms", "Spring travel"],
  },
  {
    id: 4,
    title: "Budget Travel in Europe: Under €50 a Day",
    excerpt: "Europe on a shoestring is absolutely possible. Here's how to eat, sleep and explore without breaking the bank.",
    category: "Budget Travel",
    author: "Emma Rossi",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80",
    date: "2024-08-22",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80",
    tags: ["Europe", "Budget", "Backpacking"],
  },
  {
    id: 5,
    title: "Solo Female Travel: Safety Tips That Actually Work",
    excerpt: "Practical, no-nonsense advice from experienced solo female travellers who've explored 50+ countries safely.",
    category: "Safety",
    author: "Priya Sharma",
    authorAvatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=80&q=80",
    date: "2024-07-18",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
    tags: ["Solo travel", "Safety", "Women travellers"],
  },
  {
    id: 6,
    title: "The World's Best Street Food Cities Ranked",
    excerpt: "From Bangkok's night markets to Mexico City's tacos al pastor — our definitive ranking of street food capitals.",
    category: "Food & Culture",
    author: "Marco Fernandez",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80",
    date: "2024-06-05",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    tags: ["Food", "Street food", "Culture"],
  },
];

// ─── Mock: Gallery Photos ─────────────────────────────────────────────────────

export const galleryPhotos = [
  { id: 1,  src: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",  alt: "Santorini, Greece",       location: "Santorini, Greece"        },
  { id: 2,  src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",  alt: "Kyoto, Japan",            location: "Kyoto, Japan"             },
  { id: 3,  src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",  alt: "Bali, Indonesia",         location: "Bali, Indonesia"          },
  { id: 4,  src: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800&q=80",  alt: "Machu Picchu, Peru",      location: "Machu Picchu, Peru"       },
  { id: 5,  src: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",  alt: "Maldives",                location: "Maldives"                 },
  { id: 6,  src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",  alt: "Paris, France",           location: "Paris, France"            },
  { id: 7,  src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",  alt: "Serengeti, Tanzania",     location: "Serengeti, Tanzania"      },
  { id: 8,  src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80",  alt: "Southeast Asia",          location: "Southeast Asia"           },
  { id: 9,  src: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80",  alt: "European Old Town",       location: "Prague, Czech Republic"   },
  { id: 10, src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",  alt: "Mountain Road Trip",      location: "Swiss Alps, Switzerland"  },
  { id: 11, src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",    alt: "Street Food Market",      location: "Bangkok, Thailand"        },
  { id: 12, src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80", alt: "Patagonia Mountains",     location: "Patagonia, Argentina"     },
];

// ─── Mock: Testimonials ───────────────────────────────────────────────────────

export const testimonials = [
  {
    id: 1,
    name: "Sarah & Tom Mitchell",
    location: "London, UK",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80",
    rating: 5,
    trip: "Greek Island Hopper",
    review: "Absolutely flawless from start to finish. Wanderly handled every detail — the hotels were stunning, the guides were brilliant, and the itinerary was perfectly paced. We'll be back!",
    date: "November 2024",
  },
  {
    id: 2,
    name: "James Okafor",
    location: "Lagos, Nigeria",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
    rating: 5,
    trip: "African Safari Adventure",
    review: "Witnessing the Great Migration was a dream come true. The lodge was incredible, game drives were world-class, and the team's attention to detail was second to none.",
    date: "October 2024",
  },
  {
    id: 3,
    name: "Yuki Tanaka",
    location: "Tokyo, Japan",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80",
    rating: 5,
    trip: "Japan Cherry Blossom Tour",
    review: "As a Japanese local, I was impressed by how authentically Wanderly curated the experience. The off-the-beaten-path spots they chose were absolutely magical.",
    date: "April 2024",
  },
  {
    id: 4,
    name: "Priya & Arjun Sharma",
    location: "Mumbai, India",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=80&q=80",
    rating: 5,
    trip: "Maldives Luxury Escape",
    review: "Our honeymoon was pure magic. The overwater villa, private snorkelling, sunset dinner on the beach — every moment was perfectly crafted. Thank you Wanderly!",
    date: "February 2024",
  },
  {
    id: 5,
    name: "Emma Rossi",
    location: "Milan, Italy",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80",
    rating: 4,
    trip: "Bali Wellness Retreat",
    review: "Exactly the digital detox I needed. Yoga at sunrise, incredible spa treatments, and the most peaceful villa I've ever stayed in. Fully recharged and already planning my return.",
    date: "September 2024",
  },
  {
    id: 6,
    name: "Marco Fernandez",
    location: "Barcelona, Spain",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80",
    rating: 5,
    trip: "Machu Picchu Explorer",
    review: "The Inca Trail trek was challenging but utterly spectacular. Our guide's knowledge of Incan history made the whole experience come alive. An unforgettable adventure.",
    date: "July 2024",
  },
];
