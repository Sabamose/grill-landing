export const NAV_LINKS = [
  { label: 'Problem', href: '#problem' },
  { label: 'Solution', href: '#solution' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Platform', href: '#platform' },
  { label: 'Pricing', href: '#pricing' },
];

export const HERO_WORDS = ['remembered', 'recognized', 'personalized'];

export const CHAT_MESSAGES = [
  {
    role: 'staff',
    name: 'Front Desk',
    text: "Guest arriving: James Richardson, Junior Suite 401. Anything I should know?",
  },
  {
    role: 'grill',
    name: 'Grill',
    text: "James Richardson — VIP returning guest (3rd stay). Prefers high floor with mountain view. Vegetarian. Celebrating 50th birthday this trip. Always requests extra pillows. Wife Sarah prefers white wine.",
    tags: ['VIP', 'Vegetarian', 'Birthday', 'Mountain View', 'High Floor'],
    alert: 'Vegetarian — kitchen alerted',
  },
];

export const FOLLOWUP_PROMPTS = [
  { question: "What did he enjoy most last time?", answer: "Last visit: loved the cheese fondue at Le Bistrot, did the glacier hike with alpine guide. Morning jogs around the golf course. Gave 9.2 rating." },
  { question: "Any special dates coming up?", answer: "50th birthday during this stay! Consider: complimentary dessert at dinner, room upgrade to Panorama Suite 501 if available, handwritten note from GM." },
  { question: "What about his wife Sarah?", answer: "Sarah prefers white wine (Fendant du Valais was a hit last time). She enjoyed the spa — rebook the hot stone massage. Communicates via WhatsApp, responds quickly." },
];

export const STATS = [
  { value: 7, suffix: '+', label: 'Disconnected systems per hotel', prefix: '' },
  { value: 40, suffix: '%', label: 'Staff time spent on admin tasks', prefix: '' },
  { value: 33, suffix: '%', label: 'Guest preferences lost between stays', prefix: '1 in ' },
];

export const PROBLEMS = [
  {
    number: '5-8',
    title: 'Disconnected Systems',
    description: "PMS, POS, OTAs, reviews, email — your guest data is scattered across tools that don't talk to each other.",
    icon: 'Unplug',
  },
  {
    number: '0',
    title: 'Unified Guest Profiles',
    description: "No single source of truth. Staff re-ask preferences every stay. Returning guests feel like strangers.",
    icon: 'UserX',
  },
  {
    number: '∞',
    title: 'Missed Opportunities',
    description: "Without context, every interaction is generic. Personalization is impossible when knowledge walks out with the night shift.",
    icon: 'TrendingDown',
  },
];

export const SOLUTION_FEATURES = [
  {
    icon: 'Brain',
    title: 'Guest Memory',
    description: 'Every preference, allergy, request, and interaction — in one living profile that grows with each stay. Across PMS, POS, and reviews.',
  },
  {
    icon: 'MessageSquare',
    title: '34 Tools, One Chat',
    description: 'Ask Grill anything in plain language. It pulls from Mews PMS, Lightspeed POS, Google Reviews, and guest memory to give instant answers.',
  },
  {
    icon: 'LayoutGrid',
    title: 'Action Cards',
    description: 'Rich interactive cards for guest profiles, arrival prep, competitor rates, and more — not just text responses.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Approval Flows',
    description: 'Sensitive actions like room upgrades, comp amenities, or price adjustments require manager approval before executing.',
  },
  {
    icon: 'Sun',
    title: 'Morning Briefing & Night Audit',
    description: 'Auto-generated daily briefs for each department. Night audit reconciliation with revenue summary and anomaly flags.',
  },
  {
    icon: 'TrendingUp',
    title: 'Competitor Intelligence',
    description: 'Live competitor rates from LeCrans, Guarda Golf, and Crans Ambassador. Spot pricing opportunities before they disappear.',
  },
];

export const GUEST_PROFILE = {
  name: 'James Richardson',
  type: 'VIP Returning Guest',
  stays: 3,
  lastVisit: 'January 2026',
  preferences: [
    { tag: 'High Floor', loggedBy: 'Front Desk', date: 'Sep 2025' },
    { tag: 'Mountain View', loggedBy: 'Front Desk', date: 'Sep 2025' },
    { tag: 'Vegetarian', loggedBy: 'Kitchen', date: 'Jun 2025' },
    { tag: 'Extra Pillows', loggedBy: 'Housekeeping', date: 'Jun 2025' },
    { tag: 'Cheese Fondue', loggedBy: 'Restaurant', date: 'Jan 2026' },
  ],
  allergies: [],
  dietary: ['Vegetarian'],
  notes: 'Celebrating 50th birthday. Wife Sarah prefers white wine. Enjoys morning jogs and skiing.',
  history: [
    { date: 'Jan 2026', duration: '4 nights', room: 'Junior Suite 401', rating: 9.2 },
    { date: 'Sep 2025', duration: '3 nights', room: 'Superior 203', rating: 9.0 },
    { date: 'Jun 2025', duration: '5 nights', room: 'Deluxe 301', rating: 8.8 },
  ],
};

export const ARCHITECTURE_STEPS = [
  { number: '01', title: 'Connect', description: 'Plug Grill into your Mews PMS, Lightspeed POS, and existing tools. No rip-and-replace.' },
  { number: '02', title: 'Remember', description: 'Grill unifies every guest interaction into a single, intelligent profile that learns over time.' },
  { number: '03', title: 'Act', description: 'Staff get proactive briefs, instant answers, action cards, and approval flows — before the guest asks.' },
];

export const INTEGRATION_NODES = [
  { name: 'Mews PMS', category: 'PMS', live: true, color: '#2D3748', logoKey: 'mews' },
  { name: 'Lightspeed POS', category: 'POS', live: true, color: '#E2231A', logoKey: 'lightspeed' },
  { name: 'Google Reviews', category: 'Reviews', live: true, color: '#4285F4', logoKey: 'google-reviews' },
  { name: 'Resend Email', category: 'Email', live: true, color: '#000000', logoKey: 'resend' },
  { name: 'WhatsApp', category: 'Messaging', live: true, color: '#25D366', logoKey: 'whatsapp' },
  { name: 'Booking.com', category: 'OTA', live: true, color: '#003580', logoKey: 'booking' },
  { name: 'Opera PMS', category: 'PMS', live: false, color: '#C4262E', logoKey: 'opera', comingSoon: true },
  { name: 'Cloudbeds', category: 'PMS', live: false, color: '#2B6CB0', logoKey: 'cloudbeds', comingSoon: true },
  { name: 'Stripe', category: 'Billing', live: true, color: '#635BFF', logoKey: 'stripe' },
  { name: 'Expedia', category: 'OTA', live: true, color: '#FBCC33', logoKey: 'expedia' },
  { name: 'Slack', category: 'Messaging', live: false, color: '#4A154B', logoKey: 'slack' },
  { name: 'Airbnb', category: 'OTA', live: false, color: '#FF5A5F', logoKey: 'airbnb' },
];

export const MODULES = [
  {
    icon: 'Sun',
    title: 'Morning Briefing',
    description: 'Auto-generated daily briefs for each department with arriving guest profiles, preferences, and action items.',
    demo: 'briefing',
    lines: [
      '☀️ Morning Briefing — Hotel Panorama',
      '━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      '🏨 Arrivals Today: 8 guests',
      '',
      '⭐ VIP: James Richardson (Suite 401)',
      '   → 50th birthday — prep welcome gesture',
      '   → Vegetarian — alert kitchen',
      '   → Stock Fendant du Valais for wife Sarah',
      '',
      '👤 New Guest: Sophie Muller (Superior 203)',
      '   → First stay — extra welcome attention',
      '   → Interested in glacier hikes',
    ],
  },
  {
    icon: 'Moon',
    title: 'Night Audit',
    description: 'End-of-day reconciliation with revenue summary, occupancy stats, and anomaly flags.',
    demo: 'audit',
    lines: [
      '🌙 Night Audit — Hotel Panorama',
      '━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      '💰 Revenue Today: CHF 8,420',
      '🏨 Occupancy: 26/31 rooms (84%)',
      '🍽️ F&B Revenue: CHF 2,180',
      '',
      '⚠️ Anomaly: Room 302 minibar charge',
      '   reversed twice — needs review',
      '',
      '✅ All folios balanced. No discrepancies.',
    ],
  },
  {
    icon: 'User',
    title: 'Guest Arrival Prep Card',
    description: 'Pre-arrival intelligence cards with guest preferences, room readiness, and suggested actions.',
    demo: 'profiles',
    guests: [
      { name: 'James Richardson', type: 'VIP', stays: 3, tag: 'Birthday' },
      { name: 'Marco Rossi', type: 'Repeat', stays: 2, tag: 'Anniversary' },
      { name: 'Sophie Muller', type: 'New', stays: 1, tag: 'Hiking' },
    ],
  },
  {
    icon: 'TrendingUp',
    title: 'Competitor Intelligence',
    description: 'Live competitor rates from LeCrans, Guarda Golf, and Crans Ambassador with pricing opportunities.',
    demo: 'competitor',
    lines: [
      '📊 Competitor Rates — Crans-Montana',
      '━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      'LeCrans Hotel & Spa',
      '  Superior: CHF 520 (+8% vs last week)',
      '  Suite: CHF 1,350',
      '',
      'Guarda Golf',
      '  Superior: CHF 480 (no change)',
      '  Suite: CHF 1,200',
      '',
      '💡 Weekend gap: competitors add 15-20%,',
      '   we only add 10%. Opportunity to adjust.',
    ],
  },
  {
    icon: 'Star',
    title: 'Review Response',
    description: 'AI-drafted review responses for Google and Booking.com — personalized with guest memory context.',
    demo: 'reviews',
    lines: [
      '⭐ New Google Review — 5 stars',
      '━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      '"Amazing hotel with stunning views.',
      ' The staff remembered our anniversary!"',
      '  — Marco Rossi',
      '',
      '📝 Draft response:',
      '  "Thank you, Marco! It was a pleasure',
      '  celebrating with you and Isabella.',
      '  We look forward to welcoming you back',
      '  to Crans-Montana soon."',
      '',
      '✏️ Edit or approve to publish',
    ],
  },
  {
    icon: 'Bell',
    title: 'Smart Alerts',
    description: 'Real-time alerts for VIP arrivals, special occasions, dietary conflicts, and competitor price changes.',
    demo: 'sync',
    systems: ['Mews PMS', 'Lightspeed POS', 'Google Reviews'],
  },
];

export const TRACTION = {
  metrics: [
    { value: 34, label: 'Tools', suffix: '' },
    { value: 11, label: 'Tool Categories', suffix: '' },
    { value: 1, label: 'Live Pilot Hotel', suffix: '' },
    { value: 31, label: 'Rooms Connected', suffix: '' },
  ],
  quote: "For the first time, every staff member actually knows the guest before they walk in the door.",
  attribution: "— General Manager, Hotel Panorama (Crans-Montana)",
};


export const PRICING = [
  {
    name: 'Starter',
    price: 199,
    annualPrice: 166,
    period: '/mo',
    description: 'Any single property, up to 5 staff',
    setupFee: 750,
    features: [
      '1 hotel property',
      'Up to 5 staff users',
      'AI chat agent',
      'Guest memory system',
      'PMS integration (Mews / Cloudbeds)',
      'Morning briefings',
      'Email support',
    ],
    cta: 'Request Demo',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 449,
    annualPrice: 374,
    period: '/mo',
    description: 'Any single property, up to 20 staff, all features',
    setupFee: 1500,
    features: [
      '1 hotel property',
      'Up to 20 staff users',
      'Everything in Starter',
      'Task & handoff system',
      'Night audit automation',
      'WhatsApp guest messaging',
      'Review response drafts',
      'POS integration (Lightspeed)',
      'Rate intelligence',
      'Priority support',
    ],
    cta: 'Request Demo',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: null,
    annualPrice: null,
    period: '',
    description: 'For hotel groups and chains',
    setupFee: null,
    features: [
      'Multi-property dashboard',
      'Unlimited staff users',
      'Everything in Pro',
      'Custom integrations & API access',
      'SSO / SAML authentication',
      'Dedicated account manager',
      'SLA guarantee',
      'On-premise option',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

export const COMPETITORS = {
  features: [
    'Staff-facing agent (not guest chatbot)',
    'Unified guest memory',
    'Natural language chat (34 tools)',
    'Action cards & approval flows',
    'F&B / POS integration',
    'Competitor rate intelligence',
    'Review response drafting',
    'Built for boutique hotels',
  ],
  companies: [
    { name: 'Grill', scores: [true, true, true, true, true, true, true, true] },
    { name: 'Revinate', scores: [false, true, false, false, false, false, true, false] },
    { name: 'Cendyn', scores: [false, true, false, false, false, false, false, false] },
    { name: 'MEWS', scores: [false, false, false, false, true, false, false, true] },
  ],
};

export const ROADMAP = [
  { phase: 'Q1 2025', title: 'Foundation', items: ['Core platform build', 'Mews PMS integration', 'Guest memory engine'], status: 'done' },
  { phase: 'Q2 2025', title: 'Intelligence', items: ['AI guest insights', 'Morning briefing engine', 'Lightspeed POS integration'], status: 'done' },
  { phase: 'Q3 2025', title: 'Tools Expansion', items: ['34 tools across 11 categories', 'Action cards & approval flows', 'Google Reviews + Resend'], status: 'done' },
  { phase: 'Q4 2025', title: 'Pilot Launch', items: ['Hotel Panorama pilot (Crans-Montana)', 'Night audit & competitor intel', 'Smart alerts system'], status: 'done' },
  { phase: 'Q1 2026', title: 'Refinement', items: ['SPARK Summit demo prep', 'Review response drafting', 'Upsell recommendations'], status: 'done' },
  { phase: 'Q2 2026', title: 'Mobile & Growth', items: ['Mobile staff app', 'Multi-property support', '3 more hotel pilots'], status: 'current' },
];

export const CAPABILITIES = [
  { name: 'Guest Memory', icon: 'User', description: 'Know every guest before they arrive. Preferences, allergies, past visits — all in one place.' },
  { name: 'Reservations', icon: 'CalendarCheck', description: 'Check availability, look up bookings, and manage rates without switching systems.' },
  { name: 'Room Operations', icon: 'Bed', description: 'Room status, housekeeping updates, and assignments — ask and get instant answers.' },
  { name: 'Restaurant & Bar', icon: 'Utensils', description: 'See what guests ordered, manage dietary needs, and handle F&B across POS and kitchen.' },
  { name: 'Revenue & Billing', icon: 'DollarSign', description: 'Folio lookups, night audit summaries, and revenue reporting — no spreadsheets needed.' },
  { name: 'Guest Communication', icon: 'Mail', description: 'Send emails, draft review responses, and message guests — all from the chat.' },
  { name: 'Competitor Rates', icon: 'TrendingUp', description: 'Live rates from nearby hotels. Spot pricing gaps and weekend opportunities instantly.' },
  { name: 'Review Management', icon: 'Star', description: 'New reviews surface automatically. AI drafts personalized responses using guest memory.' },
  { name: 'Tasks & Alerts', icon: 'Bell', description: 'VIP arrivals, dietary flags, special occasions — the right alert to the right person.' },
  { name: 'Morning Briefings', icon: 'BarChart3', description: 'Every department gets a daily brief: arrivals, special requests, revenue highlights.' },
  { name: 'Local Knowledge', icon: 'Globe', description: 'Restaurant tips, activity suggestions, local events — tailored to each guest\'s interests.' },
];

export const FOOTER_LINKS = [
  { label: 'Problem', href: '#problem' },
  { label: 'Solution', href: '#solution' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Platform', href: '#platform' },
  { label: 'Pricing', href: '#pricing' },
];

export const FOUNDER = {
  name: 'Grill Team',
  email: 'sabamoseshvili@trav-nex.com',
  role: 'Founder & CEO',
};
