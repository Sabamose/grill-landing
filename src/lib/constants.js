export const NAV_LINKS = [
  { label: 'Problem', href: '#problem' },
  { label: 'Solution', href: '#solution' },
  { label: 'Platform', href: '#platform' },
  { label: 'Pricing', href: '#pricing' },
];

export const HERO_WORDS = ['remembered', 'recognized', 'personalized'];

export const CHAT_MESSAGES = [
  {
    role: 'staff',
    name: 'Front Desk',
    text: "Guest arriving: María García, Suite 401. Anything I should know?",
  },
  {
    role: 'grill',
    name: 'Grill',
    text: "María García — VIP returning guest (3rd stay). Prefers high floor, quiet room. Allergic to shellfish ⚠️. Last visit: celebrated anniversary — consider welcome note. Minibar: stock Malbec, remove peanuts. She tipped housekeeping generously last time.",
    tags: ['VIP', 'Shellfish Allergy', 'Anniversary', 'Malbec', 'High Floor'],
    alert: 'Shellfish Allergy',
  },
];

export const FOLLOWUP_PROMPTS = [
  { question: "What did she order at the restaurant last time?", answer: "Last visit (Dec 2024): Grilled salmon with asparagus (night 1), Mushroom risotto (night 2), Room service breakfast both mornings — always black coffee, no sugar." },
  { question: "Any upcoming special dates?", answer: "Anniversary: March 15th (in 2 days!). Consider: complimentary dessert, room upgrade if available, handwritten note from GM." },
  { question: "How does she prefer to communicate?", answer: "WhatsApp (preferred) — responded to pre-arrival message within 10 min last time. Prefers Spanish for casual, English for formal requests." },
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
    description: "PMS, CRM, OTAs, billing, messaging — your guest data is scattered across tools that don't talk to each other.",
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
    title: 'Unified Memory',
    description: 'Every preference, allergy, request, and interaction — in one living profile that grows with each stay.',
  },
  {
    icon: 'MessageSquare',
    title: 'Natural Queries',
    description: 'Ask Grill anything about a guest in plain language. Get instant, contextual answers your staff can act on.',
  },
  {
    icon: 'Zap',
    title: 'Proactive Briefs',
    description: 'Morning briefings that tell each department exactly what they need to know — before the guest even arrives.',
  },
];

export const GUEST_PROFILE = {
  name: 'María García',
  type: 'VIP Returning Guest',
  stays: 3,
  lastVisit: 'December 2024',
  preferences: [
    { tag: 'High Floor', loggedBy: 'Front Desk', date: 'Oct 2024' },
    { tag: 'Quiet Room', loggedBy: 'Front Desk', date: 'Oct 2024' },
    { tag: 'Malbec', loggedBy: 'Minibar', date: 'Dec 2024' },
    { tag: 'Black Coffee', loggedBy: 'Room Service', date: 'Dec 2024' },
    { tag: 'No Peanuts', loggedBy: 'Kitchen', date: 'Oct 2024' },
  ],
  allergies: ['Shellfish'],
  notes: 'Celebrated anniversary on last visit. Very polite, appreciates personal touches.',
  history: [
    { date: 'Oct 2024', duration: '3 nights', room: 'Suite 405', rating: 9.2 },
    { date: 'Jul 2024', duration: '2 nights', room: 'Suite 312', rating: 8.8 },
    { date: 'Mar 2024', duration: '4 nights', room: 'Suite 401', rating: 9.5 },
  ],
};

export const ARCHITECTURE_STEPS = [
  { number: '01', title: 'Connect', description: 'Plug Grill into your existing PMS, OTAs, billing, and messaging tools. No rip-and-replace.' },
  { number: '02', title: 'Remember', description: 'Grill unifies every guest interaction into a single, intelligent profile that learns over time.' },
  { number: '03', title: 'Act', description: 'Staff get proactive briefs, instant answers, and personalized recommendations — before the guest asks.' },
];

export const INTEGRATION_NODES = [
  { name: 'Opera PMS', category: 'PMS', live: true, color: '#C4262E', logoKey: 'opera' },
  { name: 'Cloudbeds', category: 'PMS', live: true, color: '#2B6CB0', logoKey: 'cloudbeds' },
  { name: 'Booking.com', category: 'OTA', live: true, color: '#003580', logoKey: 'booking' },
  { name: 'Expedia', category: 'OTA', live: true, color: '#FBCC33', logoKey: 'expedia' },
  { name: 'Stripe', category: 'Billing', live: true, color: '#635BFF', logoKey: 'stripe' },
  { name: 'WhatsApp', category: 'Messaging', live: true, color: '#25D366', logoKey: 'whatsapp' },
  { name: 'Mews', category: 'PMS', live: false, color: '#2D3748', logoKey: 'mews' },
  { name: 'Airbnb', category: 'OTA', live: false, color: '#FF5A5F', logoKey: 'airbnb' },
  { name: 'Salesforce', category: 'CRM', live: false, color: '#00A1E0', logoKey: 'salesforce' },
  { name: 'HubSpot', category: 'CRM', live: false, color: '#FF7A59', logoKey: 'hubspot' },
  { name: 'Mailchimp', category: 'Marketing', live: false, color: '#FFE01B', logoKey: 'mailchimp' },
  { name: 'Slack', category: 'Messaging', live: false, color: '#4A154B', logoKey: 'slack' },
];

export const MODULES = [
  {
    icon: 'Sun',
    title: 'Morning Briefing',
    description: 'Auto-generated daily briefs for each department with arriving guest profiles, preferences, and action items.',
    demo: 'briefing',
    lines: [
      '☀️ Morning Briefing — March 15, 2025',
      '━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      '🏨 Arrivals Today: 12 guests',
      '',
      '⭐ VIP: María García (Suite 401)',
      '   → Anniversary tomorrow — prep welcome note',
      '   → ⚠️ Shellfish allergy — alert kitchen',
      '   → Stock Malbec in minibar',
      '',
      '👤 New Guest: James Chen (Room 215)',
      '   → First stay — extra welcome attention',
      '   → Requested late checkout (noted via WhatsApp)',
    ],
  },
  {
    icon: 'User',
    title: 'Guest Profiles',
    description: 'Living profiles that unify data from every system and grow smarter with each interaction.',
    demo: 'profiles',
    guests: [
      { name: 'María García', type: 'VIP', stays: 3, tag: 'Anniversary' },
      { name: 'James Chen', type: 'New', stays: 1, tag: 'Business' },
      { name: 'Sophie Laurent', type: 'Regular', stays: 7, tag: 'Spa Lover' },
    ],
  },
  {
    icon: 'RefreshCw',
    title: 'System Sync',
    description: 'Real-time bi-directional sync across all connected platforms. Update once, update everywhere.',
    demo: 'sync',
    systems: ['Opera PMS', 'Booking.com', 'WhatsApp'],
  },
];

export const TRACTION = {
  metrics: [
    { value: 1, label: 'Pilot Hotel', suffix: '' },
    { value: 94, label: 'Staff Satisfaction', suffix: '%' },
    { value: 30, label: 'Admin Time Saved', suffix: '%' },
    { value: 3, label: 'Hotels in Pipeline', suffix: '' },
  ],
  quote: "For the first time, every staff member actually knows the guest before they walk in the door.",
  attribution: "— General Manager, Pilot Hotel (Bogotá)",
};


export const PRICING = [
  {
    name: 'Starter',
    price: 99,
    period: '/room/month',
    description: 'For small boutique hotels getting started with guest intelligence.',
    features: [
      'Up to 30 rooms',
      'Unified guest profiles',
      'Morning briefings',
      '2 system integrations',
      'Email support',
    ],
    cta: 'Join Waitlist',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 199,
    period: '/room/month',
    description: 'For hotels serious about personalized guest experiences.',
    features: [
      'Up to 100 rooms',
      'Everything in Starter',
      'AI-powered insights',
      'Unlimited integrations',
      'Natural language queries',
      'Priority support',
      'Custom briefing templates',
    ],
    cta: 'Join Waitlist',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: null,
    period: '',
    description: 'For hotel groups and chains needing custom solutions.',
    features: [
      'Unlimited rooms',
      'Everything in Pro',
      'Multi-property dashboard',
      'Custom AI training',
      'Dedicated success manager',
      'SLA guarantee',
      'API access',
    ],
    cta: 'Contact Us',
    highlighted: false,
  },
];

export const COMPETITORS = {
  features: [
    'Unified guest profiles',
    'Natural language queries',
    'Proactive morning briefs',
    'Multi-system sync',
    'No rip-and-replace',
    'AI-powered insights',
    'Built for boutique hotels',
    'Affordable pricing',
  ],
  companies: [
    { name: 'Grill', scores: [true, true, true, true, true, true, true, true] },
    { name: 'Revinate', scores: [true, false, false, true, true, false, false, false] },
    { name: 'Cendyn', scores: [true, false, false, true, false, true, false, false] },
    { name: 'MEWS', scores: [false, false, false, true, false, false, false, true] },
  ],
};

export const ROADMAP = [
  { phase: 'Q1 2025', title: 'Foundation', items: ['Core platform build', 'Opera PMS integration', 'Pilot hotel onboarding'], status: 'done' },
  { phase: 'Q2 2025', title: 'Intelligence', items: ['AI guest insights', 'Morning briefing engine', 'WhatsApp integration'], status: 'done' },
  { phase: 'Q3 2025', title: 'Growth', items: ['3 more hotel pilots', 'Booking.com + Expedia sync', 'Mobile staff app'], status: 'current' },
  { phase: 'Q4 2025', title: 'Scale', items: ['LatAm expansion', 'Multi-property dashboard', 'Revenue optimization module'], status: 'upcoming' },
  { phase: '2026', title: 'Global', items: ['Spain & EU markets', 'Enterprise tier launch', 'Channel manager partnerships'], status: 'upcoming' },
];

export const FOOTER_LINKS = [
  { label: 'Problem', href: '#problem' },
  { label: 'Solution', href: '#solution' },
  { label: 'Platform', href: '#platform' },
  { label: 'Pricing', href: '#pricing' },
];

export const FOUNDER = {
  name: 'Juan Lemoine',
  email: 'juan@getgrill.io',
  role: 'Founder & CEO',
};
