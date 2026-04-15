import artPaintingImg from '../assets/art_painting.png';
import artPotteryImg from '../assets/art_pottery.png';
import artisanBlockprintImg from '../assets/artisan_blockprint.png';
import auctionPersonImg from '../assets/auction_person.png';

export const MOCK_CATEGORIES = [
  { name: 'Textiles', bg: artisanBlockprintImg },
  { name: 'Paintings', bg: artPaintingImg },
  { name: 'Pottery', bg: artPotteryImg },
  { name: 'Jewellery', bg: artPotteryImg },
  { name: 'Home Decor', bg: artPaintingImg },
  { name: 'Handbags', bg: artisanBlockprintImg },
  { name: 'Stationery', bg: artPaintingImg },
  { name: 'Woodcraft', bg: artPotteryImg }
];

export const MOCK_PRODUCTS = [
  { id: 1, title: 'Handpainted Pataka Tote', category: 'Handbags', artisan: 'Ritu Art', price: 1250, originalPrice: null, img: artPaintingImg, rating: 4.7, reviewCount: 214, express: true },
  { id: 2, title: 'Madhubani Earrings', category: 'Jewellery', artisan: 'Kaveri', price: 899, originalPrice: null, img: artPotteryImg, rating: 4.5, reviewCount: 89, express: true },
  { id: 3, title: 'Terracotta Kulhad Set', category: 'Pottery', artisan: 'Mitti Studio', price: 450, originalPrice: null, img: artPotteryImg, rating: 4.8, reviewCount: 402, express: false },
  { id: 4, title: 'Handloom Dupatta', category: 'Textiles', artisan: 'LoomCraft', price: 1799, originalPrice: null, img: artisanBlockprintImg, rating: 4.6, reviewCount: 156, express: true },
  { id: 5, title: 'Mini Pattachitra', category: 'Paintings', artisan: 'Anjali', price: 1050, originalPrice: null, img: artPaintingImg, rating: 4.9, reviewCount: 67, express: true }
];

export const MOCK_COMPETITIONS = [
  { id: 1, title: 'National Handicraft Awards', org: 'Ministry of Textiles, Govt. of India', date: 'Apply by 31 Oct', prize: '₹2,00,000 + Certificate', img: artisanBlockprintImg, tags: ['Government', 'Weaving', 'Crafts'], btnColor: '#dd4b61' },
  { id: 2, title: 'PM Vishwakarma Toolkit Grant', org: 'MSME', date: 'Rolling Applications', prize: '₹15,000 Toolkit', img: artPotteryImg, tags: ['Tools', 'Government', 'Grant'], btnColor: '#4185f2' },
  { id: 3, title: 'ODOP Craft Innovation Challenge', org: 'Invest India', date: 'Apply by 20 Nov', prize: 'Mentorship + ₹50,000', img: artPaintingImg, tags: ['Innovation', 'Incubation'], btnColor: '#f29c41' },
  { id: 4, title: 'Kala Raksha Women Mentorship', org: 'Kala Raksha Trust', date: 'Apply by 10 Dec', prize: '3 Month Residency', img: artisanBlockprintImg, tags: ['NGO', 'Women Only'], btnColor: '#26384a' },
  { id: 5, title: 'Livelihood Artisan Grant 2026', org: 'Tata Trusts', date: 'Closed', prize: '₹1,00,000 Seed Fund', img: artPaintingImg, tags: ['Corporate', 'Seed Funding'], btnColor: '#8e44ad' }
];

export const MOCK_STORIES = [
  { 
    id: 1, 
    title: 'Suman Devi', 
    subtitle: 'Madhubani Artist', 
    img: auctionPersonImg,
    bio: "Suman Devi belongs to the third generation of esteemed Madhubani painters from the heart of Bihar. Growing up in a household where the mud walls were her first canvas, her entire lifestyle is intertwined with storytelling through natural pigments. Her days begin early, preparing colors derived from turmeric, indigo, and flower extracts. When she isn't creating art, she is actively training young women in her village to ensure this ancient heritage doesn't fade.",
    gallery: [
      artPaintingImg,
      artPaintingImg,
      artPotteryImg
    ]
  },
  { 
    id: 2, 
    title: 'Ramesh Ji', 
    subtitle: 'Pottery Master', 
    img: artPotteryImg,
    bio: "For Ramesh Ji, the spinning wheel is a meditative practice. Based on the outskirts of Rajasthan, he has dedicated the last forty years to molding raw earth into breath-taking sculptural poetry. Using traditional firing techniques passed down from his forefathers, Ramesh focuses heavily on sustainable practices, sourcing organic clay locally and avoiding any modern synthetic glazes. His intricate designs often echo the geometric patterns found in historical Indian architecture.",
    gallery: [
      artPotteryImg,
      artPotteryImg,
      artisanBlockprintImg
    ]
  },
  { 
    id: 3, 
    title: 'Farida Begum', 
    subtitle: 'Block Print Expert', 
    img: artisanBlockprintImg,
    bio: "A true maestro of Kalamkari block printing, Farida Begum seamlessly breathes life into fabric. Operating a small, all-women collective out of Andhra Pradesh, Farida’s lifestyle revolves around the slow-fashion movement. Each wooden block she stamps carries the weight of centuries-old tradition. She insists on only working with organic cottons and natural dyes, transforming mundane textiles into incredibly valuable, heirloom-quality pieces.",
    gallery: [
      artisanBlockprintImg,
      artisanBlockprintImg,
      artPaintingImg
    ]
  }
];

export const MOCK_AUCTIONS = [
  {
    id: 'auc-1',
    title: 'Antique Royal Mughal Vase',
    startingBid: 50000,
    currentBid: 75500,
    bids: 12,
    img: artPotteryImg,
    timeLeft: 3600, // seconds
    era: '18th Century',
    artisan: 'Unknown Royal Potter'
  },
  {
    id: 'auc-2',
    title: 'Heritage Kalamkari Tapestry',
    startingBid: 25000,
    currentBid: 25000,
    bids: 0,
    img: artisanBlockprintImg,
    timeLeft: 86400, // 1 day
    era: 'Vintage',
    artisan: 'Kalamkari Masters'
  },
  {
    id: 'auc-3',
    title: 'Pattachitra Masterpiece Canvas',
    startingBid: 80000,
    currentBid: 120500,
    bids: 34,
    img: artPaintingImg,
    timeLeft: 120, // winding down
    era: 'Contemporary',
    artisan: 'National Awardee Anjali'
  }
];

export const MOCK_GRANTS = [
  {
    id: 'grant-1',
    type: 'Fellowship',
    title: 'INTACH Craft Heritage Fellowship',
    org: 'Indian National Trust for Art and Cultural Heritage',
    amount: '₹3,00,000 / year',
    deadline: 'March 2027',
    description: 'A 12-month fellowship aimed at research, preservation, and innovation in dying traditional crafts of India.',
    img: artPotteryImg,
    color: '#8e44ad'
  },
  {
    id: 'grant-2',
    type: 'Sponsorship',
    title: 'SBI Foundation Artisan Sponsorship',
    org: 'SBI Foundation (Corporate Social Responsibility)',
    amount: '₹5,00,000 Seed Fund',
    deadline: 'Rolling',
    description: 'Corporate sponsorship to help established artisans set up mechanized workshops and scale up production.',
    img: artisanBlockprintImg,
    color: '#27ae60'
  },
  {
    id: 'grant-3',
    type: 'Grant',
    title: 'Paramparagat Karigar Grant',
    org: 'Ministry of Micro, Small and Medium Enterprises',
    amount: '₹50,000 Toolkit',
    deadline: 'October 30, 2026',
    description: 'Immediate financial assistance and advanced toolkits provided to generational craft families.',
    img: artPaintingImg,
    color: '#e67e22'
  },
  {
    id: 'grant-4',
    type: 'Fellowship',
    title: 'Kala Swaraj Women\'s Fellowship',
    org: 'Kala Swaraj Foundation',
    amount: '₹1,20,000 Stipend',
    deadline: 'Closed',
    description: 'A 6-month intensive mentorship for female artisans focusing on digital literacy, e-commerce, and branding.',
    img: artisanBlockprintImg,
    color: '#e84393'
  },
  {
    id: 'grant-5',
    type: 'Incubation',
    title: 'CraftTech Incubation Program',
    org: 'NITI Aayog & IIM-A',
    amount: 'Office Space + Mentorship',
    deadline: 'December 15, 2026',
    description: 'For startups and artisan-collectives trying to innovate the supply chain or tooling of handicrafts.',
    img: artPotteryImg,
    color: '#0984e3'
  }
];

export const MOCK_NGOS = [
  {
    id: 'ngo-1',
    name: 'Dastkar',
    mission: 'A society for crafts and craftspeople, focusing on empowering rural artisans, especially women, through design innovation and market access.',
    region: 'Pan-India',
    focus: 'Market Access & Design',
    established: 1981,
    img: artisanBlockprintImg,
    stats: {
      artisans: '100,000+',
      states: '25+'
    }
  },
  {
    id: 'ngo-2',
    name: 'SEWA (Self Employed Women\'s Association)',
    mission: 'A trade union of poor, self-employed women workers. Helps women artisans achieve full employment and self-reliance.',
    region: 'Gujarat & Others',
    focus: 'Women Empowerment',
    established: 1972,
    img: artPaintingImg,
    stats: {
      artisans: '2 Million+',
      states: '18+'
    }
  },
  {
    id: 'ngo-3',
    name: 'Khamir',
    mission: 'A platform for the crafts, heritage and ecology of the Kachchh region. Dedicated to the preservation of traditional craft techniques.',
    region: 'Kacchh, Gujarat',
    focus: 'Heritage Preservation',
    established: 2005,
    img: artPotteryImg,
    stats: {
      artisans: '1,500+',
      villages: '45'
    }
  },
  {
    id: 'ngo-4',
    name: 'SADHNA',
    mission: 'Providing alternative incomes for women in rural Udaipur through the exquisite craft of applique and running stitch (tanka).',
    region: 'Udaipur, Rajasthan',
    focus: 'Skill Development',
    established: 1988,
    img: artisanBlockprintImg,
    stats: {
      artisans: '700+',
      villages: '15'
    }
  }
];

/** Vertical artisan reels — video files live in `public/reels/` (see LiveReels.jsx list). */
export const MOCK_REELS = [
  {
    id: 'reel-1',
    artisan: 'Ritu Art',
    craft: 'Hand-painted textiles',
    artisanAvatar: auctionPersonImg,
    poster: artPaintingImg,
    videoUrl: '',
    story: 'Every brushstroke on this tote carries a festival memory—watch how the colours are layered before firing.',
    storyHi: 'इस टोट पर हर ब्रशस्ट्रोक एक त्योहार की याद संजोए हुए है। देखिए कैसे इन्हें पकाने से पहले रंगों की परतें चढ़ाई जाती हैं।',
    likes: 1284,
    comments: 42,
    product: { id: 1, title: 'Handcrafted Boho Bag', category: 'Handbags', artisan: 'Ritu Art', price: 1250, originalPrice: null, img: '/bag.jpeg' }
  },
  {
    id: 'reel-2',
    artisan: 'Mitti Studio',
    craft: 'Terracotta & kulhads',
    artisanAvatar: auctionPersonImg,
    poster: artPotteryImg,
    videoUrl: '',
    story: 'From wet clay to the first sip of chai—these kulhads cool your drink and warm the hands that shaped them.',
    storyHi: 'गीली मिट्टी से लेकर चाय की पहली चुस्की तक—ये कुल्हड़ आपके पेय को ठंडा रखते हैं और उन्हें बनाने वाले हाथों को गर्माहट देते हैं।',
    likes: 892,
    comments: 31,
    product: { id: 3, title: 'Oxidized Silver Jhumkas', category: 'Jewellery', artisan: 'Mitti Studio', price: 450, originalPrice: null, img: '/jumkas.jpeg' }
  },
  {
    id: 'reel-3',
    artisan: 'LoomCraft',
    craft: 'Handloom dupatta',
    artisanAvatar: artisanBlockprintImg,
    poster: artisanBlockprintImg,
    videoUrl: '',
    story: 'Four hours on the loom, one dupatta—see the motif emerge row by row, then take the story with you.',
    storyHi: 'करघे पर चार घंटे, एक दुपट्टा—देखिए कैसे एक-एक धागे से डिज़ाइन उभर कर आता है। फिर हमारी यह कहानी अपने साथ ले जाएँ।',
    likes: 2103,
    comments: 88,
    product: { id: 4, title: 'Embroidered Juttis', category: 'Footwear', artisan: 'LoomCraft', price: 1799, originalPrice: null, img: artPotteryImg }
  },
  {
    id: 'reel-4',
    artisan: 'Anjali',
    craft: 'Pattachitra miniatures',
    artisanAvatar: auctionPersonImg,
    poster: artPaintingImg,
    videoUrl: '',
    story: 'A palm-sized canvas, generations of myth—listen while the fine lines are drawn with a single-hair brush.',
    storyHi: 'एक हथेली जितने बड़े कैनवास पर सदियों पुरानी पौराणिक कथाएँ... सुनिए, जब एक बाल वाले ब्रश से ये बारीक रेखाएँ खींची जाती हैं।',
    likes: 756,
    comments: 19,
    product: { id: 5, title: 'Cotton Kurta', category: 'Apparel', artisan: 'Anjali', price: 1050, originalPrice: null, img: '/kurta.jpeg' }
  },
  {
    id: 'reel-5',
    artisan: 'Rajesh',
    craft: 'Metalwork',
    artisanAvatar: auctionPersonImg,
    poster: artPotteryImg,
    videoUrl: '',
    story: 'Watch the intricate process of shaping and detailing traditional metal crafts.',
    storyHi: 'पारंपरिक धातु शिल्प को आकार देने और उसमें बारीक काम करने की जटिल प्रक्रिया को ध्यान से देखिए।',
    likes: 830,
    comments: 24,
    product: { id: 6, title: 'Silk Saree', category: 'Apparel', artisan: 'Rajesh', price: 3050, originalPrice: null, img: '/saree.jpeg' }
  },
  {
    id: 'reel-6',
    artisan: 'Vipin Kumar',
    craft: 'Lac Bangles',
    artisanAvatar: auctionPersonImg,
    poster: artPaintingImg,
    videoUrl: '',
    story: 'Every lac bangle holds a swirl of melted colors, shaped quickly over blazing coals before it hardens forever.',
    storyHi: 'लाख की हर चूड़ी में पिघले रंगों का एक भंवर होता है, जो हमेशा के लिए सख्त होने से पहले सुलगते कोयले पर तेजी से आकार लेता है।',
    likes: 1542,
    comments: 110,
    product: { id: 7, title: 'Handmade Lac Bangles', category: 'Jewellery', artisan: 'Vipin Kumar', price: 650, originalPrice: null, img: '/bag.jpeg' }
  }
];

export const MOCK_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'New Sponsorship Available! 🏆',
    message: 'The Ministry of Textiles just announced a ₹5,00,000 grant for traditional weavers.',
    time: '10 mins ago',
    unread: true
  },
  {
    id: 'notif-2',
    title: 'Upcoming Auction: Royal Artifacts',
    message: 'Register now for the live bidding of the antique Chola bronze collection starting tomorrow.',
    time: '3 hours ago',
    unread: true
  },
  {
    id: 'notif-3',
    title: 'Competition Alert 🎨',
    message: 'The National Pattachitra Art Competition is accepting entries until Friday.',
    time: '1 day ago',
    unread: false
  },
  {
    id: 'notif-4',
    title: 'Order Dispatched 📦',
    message: 'Your Handcrafted Boho Bag is on its way, successfully shipped by Ritu Art.',
    time: '2 days ago',
    unread: false
  }
];
