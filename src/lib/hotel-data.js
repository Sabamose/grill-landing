// Hotel Mirador — Mock Data Layer for Grill Platform Demo
// Boutique hotel, 13 rooms, Bogotá, Colombia

export const rooms = [
  { id: 'room-laura', name: 'The Laura', type: 'suite', floor: 2, status: 'occupied', currentGuest: 'guest-001', pricePerNight: 380, features: ['living area', 'fireplace', 'bathtub', 'balcony', 'king bed'] },
  { id: 'room-lucho', name: 'The Lucho', type: 'suite', floor: 2, status: 'occupied', currentGuest: 'guest-002', pricePerNight: 310, features: ['balcony', 'king bed', 'rainfall shower'] },
  { id: 'room-helen', name: 'The Helen', type: 'deluxe', floor: 2, status: 'checkout-today', currentGuest: 'guest-003', pricePerNight: 270, features: ['king bed', 'fireplace', 'bathtub'] },
  { id: 'room-natalia', name: 'The Natalia', type: 'superior', floor: 1, status: 'occupied', currentGuest: 'guest-004', pricePerNight: 220, features: ['queen bed', 'rainfall shower'] },
  { id: 'room-alejandro', name: 'The Alejandro', type: 'superior', floor: 1, status: 'available', pricePerNight: 240, features: ['king bed', 'sitting area'] },
  { id: 'room-anamaria', name: 'The Anamaría', type: 'superior', floor: 1, status: 'occupied', currentGuest: 'guest-005', pricePerNight: 230, features: ['queen bed', 'courtyard view'] },
  { id: 'room-santiago', name: 'The Santiago', type: 'standard', floor: 1, status: 'available', pricePerNight: 180, features: ['queen bed', 'garden view'] },
  { id: 'room-paula', name: 'The Paula', type: 'standard', floor: 1, status: 'occupied', currentGuest: 'guest-006', pricePerNight: 180, features: ['queen bed', 'shower'] },
  { id: 'room-tito', name: 'The Tito', type: 'standard', floor: 1, status: 'maintenance', pricePerNight: 170, features: ['double bed', 'compact'] },
  { id: 'room-restrepo', name: 'The Restrepo', type: 'standard', floor: 1, status: 'available', pricePerNight: 185, features: ['queen bed', 'desk'] },
  { id: 'room-maria', name: 'The María', type: 'standard', floor: 2, status: 'occupied', currentGuest: 'guest-007', pricePerNight: 180, features: ['queen bed', 'street view'] },
  { id: 'room-luisa', name: 'The Luisa', type: 'standard', floor: 2, status: 'available', pricePerNight: 175, features: ['double bed'] },
  { id: 'room-valentina', name: 'The Valentina', type: 'standard', floor: 2, status: 'occupied', currentGuest: 'guest-008', pricePerNight: 195, features: ['queen bed', 'courtyard view'] },
];

export const guests = [
  {
    id: 'guest-001', firstName: 'James', lastName: 'Richardson',
    nationality: 'American', language: 'English', visitCount: 3,
    communicationPreference: 'whatsapp', tags: ['VIP', 'repeat-guest', 'anniversary'],
    lastVisit: '2025-06-15', lifetimeValue: 4850,
    grill: {
      celebrationPurpose: 'Wedding anniversary (10 years)',
      dietaryRestrictions: ['gluten-free'],
      interests: ['coffee tours', 'fine dining', 'art galleries'],
      notes: [
        'Always requests extra pillows',
        'Wife Sarah prefers white wine, he drinks aguardiente',
        'Enjoys morning jogs — suggest park route nearby',
      ],
      preferredRestaurants: ['Leo Cocina', 'Criterion', 'El Cielo'],
      dislikes: ['loud music', 'early wake-up calls'],
    },
  },
  {
    id: 'guest-002', firstName: 'Marie', lastName: 'Dubois',
    nationality: 'French', language: 'French', visitCount: 1,
    communicationPreference: 'whatsapp', tags: ['first-timer', 'birthday'],
    lifetimeValue: 1240,
    grill: {
      celebrationPurpose: 'Birthday trip (turning 40)',
      dietaryRestrictions: ['vegetarian'],
      childrenInfo: 'No children, traveling with partner',
      interests: ['museums', 'local food', 'photography'],
      notes: [
        'Very interested in street art tour',
        'Partner has mild knee issues — avoid steep walks',
        'Requested birthday cake surprise for tomorrow',
      ],
      dislikes: ['spicy food'],
    },
  },
  {
    id: 'guest-003', firstName: 'Carlos', lastName: 'Mendoza',
    nationality: 'Colombian', language: 'Spanish', visitCount: 2,
    communicationPreference: 'email', tags: ['domestic', 'potential-event', 'repeat-guest'],
    lastVisit: '2024-11-20', lifetimeValue: 2100,
    grill: {
      celebrationPurpose: 'Business retreat with wife',
      dietaryRestrictions: [],
      interests: ['fine dining', 'wine', 'cigars'],
      notes: [
        'Checking out today — had excellent stay',
        'Loved the breakfast coconut yogurt',
        'Left half the sandwich at lunch — prefers smaller portions',
        'Interested in returning for company event (15 people)',
      ],
      preferredRestaurants: ['Andrés Carne de Res', 'Harry Sasson'],
    },
  },
  {
    id: 'guest-004', firstName: 'Yuki', lastName: 'Tanaka',
    nationality: 'Japanese', language: 'English', visitCount: 1,
    communicationPreference: 'email', tags: ['long-stay', 'first-timer'],
    lifetimeValue: 1760,
    grill: {
      celebrationPurpose: 'Sabbatical travel — 3 months in South America',
      dietaryRestrictions: ['no dairy'],
      interests: ['hiking', 'coffee', 'local markets', 'cooking classes'],
      notes: [
        'Very quiet and respectful, appreciates detailed written info',
        'Interested in hotel cooking class',
        'Asked about mountain hike — advised early morning',
      ],
    },
  },
  {
    id: 'guest-005', firstName: 'Ana', lastName: 'García',
    nationality: 'Spanish', language: 'Spanish', visitCount: 1,
    communicationPreference: 'whatsapp', tags: ['solo-traveler', 'literary'],
    lifetimeValue: 920,
    grill: {
      celebrationPurpose: 'Solo travel — writing retreat',
      dietaryRestrictions: ['pescatarian'],
      interests: ['bookshops', 'writing cafés', 'literature tours'],
      notes: [
        'Needs quiet room — confirmed courtyard side',
        'Recommended local bookshop café',
        'Prefers late breakfast around 10am',
      ],
    },
  },
  {
    id: 'guest-006', firstName: 'Michael', lastName: 'Thompson',
    nationality: 'American', language: 'English', visitCount: 1,
    communicationPreference: 'whatsapp', tags: ['business', 'first-timer'],
    lifetimeValue: 540,
    grill: {
      celebrationPurpose: 'Business trip + extended weekend',
      interests: ['craft beer', 'nightlife', 'football'],
      notes: [
        'Has meetings in business district — arrange taxi for 8am daily',
        'Asked about local football match this Saturday',
        'Enjoys craft beer — recommend local breweries',
      ],
    },
  },
  {
    id: 'guest-007', firstName: 'Isabella', lastName: 'Rossi',
    nationality: 'Italian', language: 'Italian', visitCount: 1,
    communicationPreference: 'whatsapp', tags: ['honeymoon', 'romantic'],
    lifetimeValue: 1650,
    grill: {
      celebrationPurpose: 'Honeymoon',
      childrenInfo: 'No children',
      interests: ['romantic dinners', 'coffee region', 'architecture'],
      notes: [
        'Arranged rose petals and champagne in room for arrival',
        'Husband Marco speaks only Italian and basic English',
        'Booked dinner at Andrés Carne de Res for Saturday',
      ],
    },
  },
  {
    id: 'guest-008', firstName: 'Emma', lastName: 'Wilson',
    nationality: 'British', language: 'English', visitCount: 2,
    communicationPreference: 'whatsapp', tags: ['repeat-guest', 'group', 'social'],
    lastVisit: '2025-03-10', lifetimeValue: 2340,
    grill: {
      celebrationPurpose: "Girls trip (group of 3)",
      dietaryRestrictions: ['vegan (Emma only)'],
      interests: ['salsa dancing', 'shopping', 'spa', 'food tours'],
      notes: [
        'Two friends arriving tomorrow',
        'Last visit she loved the Thai massage — rebook for Wednesday',
        'Group wants salsa lesson recommendation',
        'Emma is vegan but friends are not — suggest restaurants with both options',
      ],
      preferredRestaurants: ['Salvo Patria', 'Prudencia'],
    },
  },
];

const today = new Date();
const fmt = (d) => d.toISOString().split('T')[0];
const addDays = (d, n) => new Date(d.getTime() + n * 86400000);

export const reservations = [
  { id: 'res-001', guestId: 'guest-001', roomId: 'room-laura', checkIn: fmt(addDays(today, -2)), checkOut: fmt(addDays(today, 3)), status: 'checked-in', source: 'direct', totalAmount: 1900, specialRequests: ['Extra pillows', 'Anniversary card in room'], preArrivalComplete: true, transferBooked: true },
  { id: 'res-002', guestId: 'guest-002', roomId: 'room-lucho', checkIn: fmt(addDays(today, -1)), checkOut: fmt(addDays(today, 4)), status: 'checked-in', source: 'booking.com', totalAmount: 1550, specialRequests: ['Birthday cake surprise', 'Quiet room'], preArrivalComplete: true, transferBooked: false },
  { id: 'res-003', guestId: 'guest-003', roomId: 'room-helen', checkIn: fmt(addDays(today, -3)), checkOut: fmt(today), status: 'checked-in', source: 'direct', totalAmount: 810, specialRequests: [], preArrivalComplete: true, transferBooked: false },
  { id: 'res-004', guestId: 'guest-004', roomId: 'room-natalia', checkIn: fmt(addDays(today, -5)), checkOut: fmt(addDays(today, 2)), status: 'checked-in', source: 'expedia', totalAmount: 1540, specialRequests: ['Written info about local attractions'], preArrivalComplete: true, transferBooked: true },
  { id: 'res-005', guestId: 'guest-005', roomId: 'room-anamaria', checkIn: fmt(addDays(today, -1)), checkOut: fmt(addDays(today, 6)), status: 'checked-in', source: 'booking.com', totalAmount: 1610, specialRequests: ['Quiet room', 'Late breakfast'], preArrivalComplete: true, transferBooked: false },
  { id: 'res-006', guestId: 'guest-006', roomId: 'room-paula', checkIn: fmt(addDays(today, -1)), checkOut: fmt(addDays(today, 4)), status: 'checked-in', source: 'tripadvisor', totalAmount: 900, specialRequests: ['Daily taxi at 8am'], preArrivalComplete: true, transferBooked: true },
  { id: 'res-007', guestId: 'guest-007', roomId: 'room-maria', checkIn: fmt(addDays(today, -1)), checkOut: fmt(addDays(today, 3)), status: 'checked-in', source: 'booking.com', totalAmount: 720, specialRequests: ['Honeymoon setup: rose petals, champagne'], preArrivalComplete: true, transferBooked: true },
  { id: 'res-008', guestId: 'guest-008', roomId: 'room-valentina', checkIn: fmt(today), checkOut: fmt(addDays(today, 5)), status: 'checked-in', source: 'direct', totalAmount: 975, specialRequests: ['Friends arriving tomorrow'], preArrivalComplete: true, transferBooked: false },
  // Upcoming
  { id: 'res-009', guestId: 'guest-009', roomId: 'room-luisa', checkIn: fmt(addDays(today, 1)), checkOut: fmt(addDays(today, 5)), status: 'confirmed', source: 'booking.com', totalAmount: 700, specialRequests: ['Friend of Emma Wilson'], preArrivalComplete: false, transferBooked: false },
  { id: 'res-010', guestId: 'guest-010', roomId: 'room-restrepo', checkIn: fmt(addDays(today, 1)), checkOut: fmt(addDays(today, 5)), status: 'confirmed', source: 'booking.com', totalAmount: 740, specialRequests: ['Friend of Emma Wilson'], preArrivalComplete: false, transferBooked: false },
  { id: 'res-011', guestId: 'guest-011', roomId: 'room-helen', checkIn: fmt(addDays(today, 2)), checkOut: fmt(addDays(today, 6)), status: 'confirmed', source: 'expedia', totalAmount: 1080, specialRequests: ['Allergic to feather pillows'], preArrivalComplete: false, transferBooked: false },
];

export const upcomingGuests = [
  { id: 'guest-009', firstName: 'Sophie', lastName: 'Clarke', nationality: 'British', language: 'English', visitCount: 0, communicationPreference: 'whatsapp', tags: ['group', 'first-timer'], lifetimeValue: 0, grill: { notes: ['Friend of Emma Wilson — arriving together for girls trip'] } },
  { id: 'guest-010', firstName: 'Rachel', lastName: 'Hughes', nationality: 'British', language: 'English', visitCount: 0, communicationPreference: 'whatsapp', tags: ['group', 'first-timer'], lifetimeValue: 0, grill: { notes: ['Friend of Emma Wilson — arriving together for girls trip'] } },
  { id: 'guest-011', firstName: 'David', lastName: 'Hoffmann', nationality: 'German', language: 'German', visitCount: 0, communicationPreference: 'email', tags: ['first-timer'], lifetimeValue: 0, grill: { notes: ['Allergic to feather pillows — ensure synthetic available'] } },
];

export const serviceRequests = [
  { id: 'sr-001', guestId: 'guest-001', roomId: 'room-laura', type: 'room-service', description: 'Two cappuccinos and fruit platter to room', status: 'completed', assignedTo: 'Diego', notes: 'Reminder: James is gluten-free' },
  { id: 'sr-002', guestId: 'guest-002', roomId: 'room-lucho', type: 'tour', description: 'Street art tour — 2pm pickup', status: 'in-progress', assignedTo: 'External tour company' },
  { id: 'sr-003', guestId: 'guest-004', roomId: 'room-natalia', type: 'concierge', description: 'Cooking class booking for tomorrow 4pm', status: 'pending', notes: 'Yuki is dairy-free — confirm kitchen can accommodate' },
  { id: 'sr-004', guestId: 'guest-006', roomId: 'room-paula', type: 'transport', description: 'Daily taxi to business district — 8:00am pickup', status: 'completed', assignedTo: 'Taxi service' },
  { id: 'sr-005', guestId: 'guest-007', roomId: 'room-maria', type: 'concierge', description: 'Dinner reservation at Andrés Carne de Res for Saturday, 8pm, 2 people', status: 'completed', notes: 'Honeymoon couple — ask restaurant for special table' },
  { id: 'sr-006', guestId: 'guest-008', roomId: 'room-valentina', type: 'spa', description: 'Thai massage for Wednesday 3pm', status: 'pending', notes: 'Repeat service — Emma loved it on her last visit' },
  { id: 'sr-007', guestId: 'guest-005', roomId: 'room-anamaria', type: 'laundry', description: '3 blouses, 1 dress — standard service', status: 'in-progress', assignedTo: 'Housekeeping' },
  { id: 'sr-008', guestId: 'guest-003', roomId: 'room-helen', type: 'transport', description: 'Airport transfer — 3pm departure', status: 'pending', notes: 'Checkout guest — ensure bill is finalized before departure' },
];

export const staff = [
  { id: 'staff-001', name: 'Camila', role: 'Pre-arrival Concierge', shift: 'morning' },
  { id: 'staff-002', name: 'Diego', role: 'Reception / Host', shift: 'morning' },
  { id: 'staff-003', name: 'Valentina', role: 'Reception / Host', shift: 'afternoon' },
  { id: 'staff-004', name: 'Andrés', role: 'Housekeeping Lead', shift: 'morning' },
  { id: 'staff-005', name: 'Lucía', role: 'Kitchen / Breakfast', shift: 'morning' },
  { id: 'staff-006', name: 'Sebastián', role: 'Night Manager', shift: 'night' },
];

export const restaurants = [
  { name: 'Leo Cocina y Cava', cuisine: 'Colombian avant-garde', priceRange: '$$$', walkingMin: 20, note: 'Michelin-starred, reservation essential' },
  { name: 'Criterion', cuisine: 'French-Colombian', priceRange: '$$$', walkingMin: 15, note: 'Elegant, great wine list' },
  { name: 'El Cielo', cuisine: 'Molecular Colombian', priceRange: '$$$', walkingMin: 25, note: 'Sensory dining experience' },
  { name: 'Salvo Patria', cuisine: 'Colombian contemporary', priceRange: '$$', walkingMin: 8, note: 'Casual, great brunch too' },
  { name: 'Prudencia', cuisine: 'Farm-to-table', priceRange: '$$', walkingMin: 10, note: 'Vegetarian-friendly, beautiful garden' },
  { name: 'Harry Sasson', cuisine: 'International fusion', priceRange: '$$$', walkingMin: 18, note: 'Celebrity chef, great steaks' },
  { name: 'Mini-Mal', cuisine: 'Colombian ingredients, minimal style', priceRange: '$$', walkingMin: 12, note: 'Great lunch spot' },
];

export const hotelPolicies = {
  checkIn: '3:00 PM (early check-in upon request, subject to availability)',
  checkOut: '12:00 PM (late checkout upon request, subject to availability)',
  breakfast: '7:30 AM - 10:30 AM in the dining room. Special dietary needs accommodated with advance notice.',
  wifi: 'Complimentary throughout. Network: HotelMirador-Guest',
  parking: 'Free private parking. Notify reception for gate access.',
  bikes: 'Complimentary bikes at reception. Helmets and locks provided.',
  pets: 'Not permitted.',
  smoking: 'Non-smoking property. Designated area in the garden.',
};
