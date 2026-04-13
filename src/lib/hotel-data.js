// Hotel Panorama — Mock Data Layer for Grill Platform Demo
// Boutique hotel, 31 rooms, Crans-Montana, Switzerland

export const rooms = [
  { id: 'room-401', name: 'Junior Suite 401', type: 'junior-suite', floor: 4, status: 'occupied', currentGuest: 'guest-001', pricePerNight: 650, features: ['mountain view', 'living area', 'king bed', 'balcony'] },
  { id: 'room-203', name: 'Superior 203', type: 'superior', floor: 2, status: 'occupied', currentGuest: 'guest-002', pricePerNight: 380, features: ['mountain view', 'queen bed', 'rainfall shower'] },
  { id: 'room-301', name: 'Deluxe 301', type: 'deluxe', floor: 3, status: 'occupied', currentGuest: 'guest-003', pricePerNight: 490, features: ['king bed', 'sitting area', 'bathtub'] },
  { id: 'room-402', name: 'Junior Suite 402', type: 'junior-suite', floor: 4, status: 'occupied', currentGuest: 'guest-004', pricePerNight: 650, features: ['mountain view', 'living area', 'king bed'] },
  { id: 'room-105', name: 'Superior 105', type: 'superior', floor: 1, status: 'occupied', currentGuest: 'guest-005', pricePerNight: 380, features: ['queen bed', 'garden view'] },
  { id: 'room-501', name: 'Panorama Suite 501', type: 'panorama-suite', floor: 5, status: 'occupied', currentGuest: 'guest-006', pricePerNight: 950, features: ['panoramic alps view', 'king bed', 'living room', 'balcony', 'fireplace'] },
  { id: 'room-302', name: 'Deluxe 302', type: 'deluxe', floor: 3, status: 'occupied', currentGuest: 'guest-007', pricePerNight: 490, features: ['king bed', 'bathtub', 'mountain view'] },
  { id: 'room-204', name: 'Deluxe 204', type: 'deluxe', floor: 2, status: 'occupied', currentGuest: 'guest-008', pricePerNight: 490, features: ['queen bed', 'sitting area'] },
  { id: 'room-101', name: 'Classic 101', type: 'classic', floor: 1, status: 'available', pricePerNight: 280, features: ['queen bed', 'garden view'] },
  { id: 'room-102', name: 'Classic 102', type: 'classic', floor: 1, status: 'available', pricePerNight: 280, features: ['queen bed', 'courtyard view'] },
  { id: 'room-103', name: 'Superior 103', type: 'superior', floor: 1, status: 'available', pricePerNight: 380, features: ['queen bed', 'desk'] },
  { id: 'room-104', name: 'Superior 104', type: 'superior', floor: 1, status: 'maintenance', pricePerNight: 380, features: ['queen bed', 'balcony'] },
  { id: 'room-106', name: 'Classic 106', type: 'classic', floor: 1, status: 'available', pricePerNight: 280, features: ['double bed'] },
  { id: 'room-201', name: 'Classic 201', type: 'classic', floor: 2, status: 'occupied', currentGuest: null, pricePerNight: 280, features: ['queen bed'] },
  { id: 'room-202', name: 'Superior 202', type: 'superior', floor: 2, status: 'available', pricePerNight: 380, features: ['queen bed', 'mountain view'] },
  { id: 'room-303', name: 'Junior Suite 303', type: 'junior-suite', floor: 3, status: 'available', pricePerNight: 650, features: ['king bed', 'living area'] },
  { id: 'room-502', name: 'Panorama Suite 502', type: 'panorama-suite', floor: 5, status: 'available', pricePerNight: 950, features: ['panoramic alps view', 'king bed', 'living room'] },
];

export const guests = [
  {
    id: 'guest-001', firstName: 'James', lastName: 'Richardson',
    nationality: 'British', language: 'English', visitCount: 3,
    communicationPreference: 'whatsapp', tags: ['VIP', 'repeat-guest', 'birthday'],
    lastVisit: '2026-01-15', lifetimeValue: 4200,
    grill: {
      celebrationPurpose: '50th birthday celebration',
      dietaryRestrictions: ['vegetarian'],
      interests: ['skiing', 'wine', 'morning jogs', 'cheese fondue'],
      notes: [
        'Always requests extra pillows and high floor mountain view',
        'Wife Sarah prefers white wine — Fendant du Valais was a hit',
        'Enjoys morning jogs around the golf course',
        'Loved the glacier hike with alpine guide last visit',
      ],
      preferredRestaurants: ['Le Bistrot', 'Chetzeron', 'Cry d\'Er'],
      dislikes: ['loud music', 'early wake-up calls'],
    },
  },
  {
    id: 'guest-002', firstName: 'Sophie', lastName: 'Muller',
    nationality: 'German', language: 'German', visitCount: 1,
    communicationPreference: 'email', tags: ['first-timer', 'hiking'],
    lifetimeValue: 890,
    grill: {
      celebrationPurpose: 'Wellness & hiking getaway',
      dietaryRestrictions: [],
      interests: ['hiking', 'spa', 'morning yoga', 'glacier tours'],
      notes: [
        'Interested in glacier hike — advise early morning start',
        'Prefers quiet room for morning yoga',
        'First time in Crans-Montana — share welcome guide',
      ],
      dislikes: ['crowded restaurants'],
    },
  },
  {
    id: 'guest-003', firstName: 'Marco', lastName: 'Rossi',
    nationality: 'Italian', language: 'Italian', visitCount: 2,
    communicationPreference: 'whatsapp', tags: ['repeat-guest', 'anniversary'],
    lastVisit: '2025-09-20', lifetimeValue: 3100,
    grill: {
      celebrationPurpose: 'Wedding anniversary trip with wife Isabella',
      dietaryRestrictions: ['gluten-free'],
      interests: ['golf', 'fine dining', 'wine tasting'],
      notes: [
        'Strictly gluten-free — kitchen critical flag',
        'Prosecco welcome drink requested',
        'Wife Isabella speaks only Italian and basic French',
        'Booked golf at Crans-sur-Sierre for Saturday',
      ],
      preferredRestaurants: ['Chetzeron', 'Le Mont Blanc'],
    },
  },
  {
    id: 'guest-004', firstName: 'Yuki', lastName: 'Tanaka',
    nationality: 'Japanese', language: 'Japanese', visitCount: 1,
    communicationPreference: 'email', tags: ['corporate', 'first-timer'],
    lifetimeValue: 2800,
    grill: {
      celebrationPurpose: 'Corporate retreat — Senior VP at Tokyo Dynamics',
      dietaryRestrictions: [],
      interests: ['business', 'green tea', 'quiet workspace'],
      notes: [
        'Prefers green tea — stock Japanese green tea in room',
        'Appreciates Japanese hospitality touches',
        'Corporate partnership potential — handle with care',
        'Needs reliable WiFi and quiet workspace',
      ],
    },
  },
  {
    id: 'guest-005', firstName: 'Sarah', lastName: 'Thompson',
    nationality: 'American', language: 'English', visitCount: 1,
    communicationPreference: 'email', tags: ['press', 'first-timer'],
    lifetimeValue: 950,
    grill: {
      celebrationPurpose: 'Travel journalism — Condé Nast Traveler assignment',
      dietaryRestrictions: ['vegan'],
      interests: ['photography', 'local cuisine', 'alpine culture'],
      notes: [
        'Travel journalist for Condé Nast Traveler — media coverage potential',
        'Strict vegan — coordinate with kitchen carefully',
        'Will be photographing the property — ensure rooms are spotless',
        'Interested in behind-the-scenes hotel story',
      ],
    },
  },
  {
    id: 'guest-006', firstName: 'Pierre', lastName: 'Lambert',
    nationality: 'Swiss', language: 'French', visitCount: 5,
    communicationPreference: 'whatsapp', tags: ['VIP', 'repeat-guest', 'local'],
    lastVisit: '2026-02-10', lifetimeValue: 8900,
    grill: {
      celebrationPurpose: 'Regular local guest — vineyard owner from Sion',
      dietaryRestrictions: [],
      interests: ['wine tasting', 'skiing', 'fine dining'],
      notes: [
        'Always books Panorama Suite — consider complimentary upgrade if 502 available',
        'Vineyard owner in Sion — bring his own wine sometimes',
        'Wife Anne\'s birthday is in April — plan something special',
        'Our highest lifetime value guest — VIP treatment always',
      ],
      preferredRestaurants: ['Chetzeron', 'Le Pont de Brent', 'Didier de Courten'],
    },
  },
  {
    id: 'guest-007', firstName: 'Elena', lastName: 'Vogt',
    nationality: 'Austrian', language: 'German', visitCount: 1,
    communicationPreference: 'whatsapp', tags: ['wellness', 'first-timer'],
    lifetimeValue: 560,
    grill: {
      celebrationPurpose: 'Wellness retreat',
      dietaryRestrictions: ['lactose-free'],
      interests: ['wellness', 'yoga', 'hiking'],
      notes: [
        'Lactose-free — ensure breakfast options',
        'Morning yoga enthusiast — share spa schedule',
        'Interested in guided alpine walks',
      ],
    },
  },
  {
    id: 'guest-008', firstName: 'David', lastName: 'Chen',
    nationality: 'Canadian', language: 'English', visitCount: 2,
    communicationPreference: 'whatsapp', tags: ['repeat-guest', 'photography'],
    lastVisit: '2025-11-05', lifetimeValue: 2100,
    grill: {
      celebrationPurpose: 'Photography trip — alpine landscapes',
      dietaryRestrictions: ['vegan'],
      interests: ['hiking', 'photography', 'alpine landscapes'],
      notes: [
        'Ground floor preferred — knee issue',
        'Strict vegan — coordinate with kitchen',
        'Last visit loved the sunrise hike to Plaine Morte glacier',
        'Needs early breakfast (6:30am) for golden hour shoots',
      ],
      preferredRestaurants: ['Le Bistrot', 'Chez Eddy'],
    },
  },
];

const today = new Date();
const fmt = (d) => d.toISOString().split('T')[0];
const addDays = (d, n) => new Date(d.getTime() + n * 86400000);

export const upcomingGuests = [
  { id: 'guest-009', firstName: 'Anna', lastName: 'Bergmann', nationality: 'Swiss', language: 'French', visitCount: 0, communicationPreference: 'email', tags: ['first-timer'], lifetimeValue: 0, grill: { notes: ['Booked via Booking.com — send personalized welcome email'] } },
  { id: 'guest-010', firstName: 'Thomas', lastName: 'Weber', nationality: 'German', language: 'German', visitCount: 0, communicationPreference: 'whatsapp', tags: ['first-timer', 'group'], lifetimeValue: 0, grill: { notes: ['Traveling with family of 4 — needs connecting rooms'] } },
  { id: 'guest-011', firstName: 'Claire', lastName: 'Dubois', nationality: 'French', language: 'French', visitCount: 0, communicationPreference: 'email', tags: ['first-timer'], lifetimeValue: 0, grill: { notes: ['Celebrating retirement — special occasion, plan a surprise'] } },
];

export const reservations = [
  { id: 'res-001', guestId: 'guest-001', roomId: 'room-401', checkIn: fmt(addDays(today, -2)), checkOut: fmt(addDays(today, 3)), status: 'checked-in', source: 'direct', totalAmount: 3250, currency: 'CHF', specialRequests: ['Extra pillows', 'Birthday card in room', 'High floor mountain view'], preArrivalComplete: true, transferBooked: true },
  { id: 'res-002', guestId: 'guest-002', roomId: 'room-203', checkIn: fmt(addDays(today, -1)), checkOut: fmt(addDays(today, 4)), status: 'checked-in', source: 'booking.com', totalAmount: 1900, currency: 'CHF', specialRequests: ['Quiet room', 'Glacier hike info'], preArrivalComplete: true, transferBooked: false },
  { id: 'res-003', guestId: 'guest-003', roomId: 'room-301', checkIn: fmt(addDays(today, -3)), checkOut: fmt(today), status: 'checked-in', source: 'direct', totalAmount: 1470, currency: 'CHF', specialRequests: ['Prosecco welcome', 'Anniversary setup'], preArrivalComplete: true, transferBooked: false },
  { id: 'res-004', guestId: 'guest-004', roomId: 'room-402', checkIn: fmt(addDays(today, -1)), checkOut: fmt(addDays(today, 3)), status: 'checked-in', source: 'direct', totalAmount: 2600, currency: 'CHF', specialRequests: ['Green tea in room', 'Quiet workspace'], preArrivalComplete: true, transferBooked: true },
  { id: 'res-005', guestId: 'guest-005', roomId: 'room-105', checkIn: fmt(addDays(today, -1)), checkOut: fmt(addDays(today, 3)), status: 'checked-in', source: 'expedia', totalAmount: 1520, currency: 'CHF', specialRequests: ['Vegan meals', 'Early breakfast 6:30am'], preArrivalComplete: true, transferBooked: false },
  { id: 'res-006', guestId: 'guest-006', roomId: 'room-501', checkIn: fmt(addDays(today, -2)), checkOut: fmt(addDays(today, 2)), status: 'checked-in', source: 'direct', totalAmount: 3800, currency: 'CHF', specialRequests: ['Panorama Suite always', 'Wine from his vineyard in cellar'], preArrivalComplete: true, transferBooked: false },
  { id: 'res-007', guestId: 'guest-007', roomId: 'room-302', checkIn: fmt(today), checkOut: fmt(addDays(today, 4)), status: 'checked-in', source: 'booking.com', totalAmount: 1960, currency: 'CHF', specialRequests: ['Lactose-free breakfast options', 'Spa schedule'], preArrivalComplete: true, transferBooked: true },
  { id: 'res-008', guestId: 'guest-008', roomId: 'room-204', checkIn: fmt(addDays(today, -1)), checkOut: fmt(addDays(today, 5)), status: 'checked-in', source: 'direct', totalAmount: 2940, currency: 'CHF', specialRequests: ['Ground floor if possible', 'Early breakfast 6:30am'], preArrivalComplete: true, transferBooked: false },
  // Upcoming
  { id: 'res-009', guestId: 'guest-009', roomId: 'room-101', checkIn: fmt(addDays(today, 1)), checkOut: fmt(addDays(today, 4)), status: 'confirmed', source: 'booking.com', totalAmount: 840, currency: 'CHF', specialRequests: [], preArrivalComplete: false, transferBooked: false },
  { id: 'res-010', guestId: 'guest-010', roomId: 'room-102', checkIn: fmt(addDays(today, 1)), checkOut: fmt(addDays(today, 5)), status: 'confirmed', source: 'booking.com', totalAmount: 1120, currency: 'CHF', specialRequests: ['Connecting rooms for family'], preArrivalComplete: false, transferBooked: false },
  { id: 'res-011', guestId: 'guest-011', roomId: 'room-303', checkIn: fmt(addDays(today, 2)), checkOut: fmt(addDays(today, 6)), status: 'confirmed', source: 'expedia', totalAmount: 2600, currency: 'CHF', specialRequests: ['Retirement celebration surprise'], preArrivalComplete: false, transferBooked: false },
];

export const serviceRequests = [
  { id: 'sr-001', guestId: 'guest-001', roomId: 'room-401', type: 'room-service', description: 'Two cappuccinos and fruit platter to room', status: 'completed', assignedTo: 'Marie', notes: 'Reminder: James is vegetarian' },
  { id: 'sr-002', guestId: 'guest-002', roomId: 'room-203', type: 'concierge', description: 'Glacier hike booking for tomorrow 7am', status: 'pending', notes: 'Sophie wants early start — arrange alpine guide' },
  { id: 'sr-003', guestId: 'guest-003', roomId: 'room-301', type: 'transport', description: 'Airport transfer to Geneva — 2pm departure', status: 'pending', notes: 'Checkout guest — ensure folio is finalized. CHF balance.' },
  { id: 'sr-004', guestId: 'guest-004', roomId: 'room-402', type: 'room-service', description: 'Green tea service to Junior Suite 402', status: 'completed', assignedTo: 'Marie' },
  { id: 'sr-005', guestId: 'guest-005', roomId: 'room-105', type: 'concierge', description: 'Photography permit for hotel exterior shots', status: 'in-progress', assignedTo: 'Saba', notes: 'Sarah is from Condé Nast Traveler — facilitate access' },
  { id: 'sr-006', guestId: 'guest-006', roomId: 'room-501', type: 'dining', description: 'Private dinner reservation at Chetzeron for 2, Saturday 8pm', status: 'completed', notes: 'Pierre\'s anniversary dinner — VIP table request' },
  { id: 'sr-007', guestId: 'guest-007', roomId: 'room-302', type: 'spa', description: 'Hot stone massage booking for Tuesday 3pm', status: 'pending', notes: 'Elena is lactose-free — confirm spa products are dairy-free' },
  { id: 'sr-008', guestId: 'guest-008', roomId: 'room-204', type: 'concierge', description: 'Sunrise photography guide to Plaine Morte glacier, 5:30am', status: 'pending', notes: 'David needs early breakfast packed — vegan options only' },
];

export const staff = [
  { id: 'staff-001', name: 'Saba', role: 'Hotel Manager', shift: 'morning' },
  { id: 'staff-002', name: 'Marie', role: 'Front Desk', shift: 'morning' },
  { id: 'staff-003', name: 'Lucas', role: 'Front Desk', shift: 'afternoon' },
  { id: 'staff-004', name: 'Isabelle', role: 'Housekeeping Lead', shift: 'morning' },
  { id: 'staff-005', name: 'Jean-Pierre', role: 'Kitchen / Chef', shift: 'morning' },
  { id: 'staff-006', name: 'Nicolas', role: 'Night Manager', shift: 'night' },
];

export const restaurants = [
  { name: 'Chetzeron', cuisine: 'Alpine gourmet', priceRange: 'CHF $$$', walkingMin: 15, note: 'Former cable car station, stunning views — reservation essential' },
  { name: 'Le Bistrot', cuisine: 'Swiss-French', priceRange: 'CHF $$', walkingMin: 5, note: 'Cozy local favorite, excellent fondue' },
  { name: 'Le Mont Blanc', cuisine: 'Traditional Swiss', priceRange: 'CHF $$', walkingMin: 8, note: 'Classic raclette and regional wines' },
  { name: 'Cry d\'Er', cuisine: 'Mountain dining', priceRange: 'CHF $$', walkingMin: 20, note: 'On the slopes, incredible panorama' },
  { name: 'Chez Eddy', cuisine: 'Contemporary alpine', priceRange: 'CHF $$$', walkingMin: 10, note: 'Creative chef, great vegan options' },
  { name: 'Le Pont de Brent', cuisine: 'Michelin fine dining', priceRange: 'CHF $$$$', walkingMin: 45, note: '1 Michelin star, worth the drive' },
  { name: 'Didier de Courten', cuisine: 'Gastronomic', priceRange: 'CHF $$$$', walkingMin: 40, note: '2 Michelin stars in Sierre, special occasion' },
];

export const competitors = [
  {
    name: 'LeCrans Hotel & Spa',
    stars: 5, distance: '1.2 km',
    rates: { standard: 420, superior: 520, deluxe: 680, suite: 1350 },
    change: '+8%',
    positioning: 'Premium — 30% higher than us',
  },
  {
    name: 'Guarda Golf Hotel',
    stars: 5, distance: '0.8 km',
    rates: { standard: 390, superior: 480, deluxe: 620, suite: 1200 },
    change: '0%',
    positioning: 'Strong brand, steady pricing',
  },
  {
    name: 'Crans Ambassador',
    stars: 5, distance: '0.5 km',
    rates: { standard: 350, superior: 450, deluxe: 580, suite: 1100 },
    change: '-5%',
    positioning: 'More competitive, lower occupancy',
  },
];

export const hotelPolicies = {
  checkIn: '3:00 PM (early check-in upon request, subject to availability)',
  checkOut: '11:00 AM (late checkout upon request, CHF 50 surcharge)',
  breakfast: '7:30 AM - 10:00 AM in the dining room. Special dietary needs accommodated with advance notice.',
  wifi: 'Complimentary throughout. Password available at reception.',
  parking: 'Available, CHF 15/night. Electric vehicle charging available.',
  pets: 'Small dogs allowed, CHF 25/night supplement.',
  smoking: 'Non-smoking property. Designated outdoor area available.',
  spa: 'Open 9:00 AM - 8:00 PM. Advance booking recommended.',
};
