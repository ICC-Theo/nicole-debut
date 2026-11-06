// Single source for every event detail shown on the site.
// Leave `dateTime` empty until confirmed: dates show "To be announced" and the countdown hides.

export const EVENT = {
  celebrant: 'Nicole',
  age: 18,
  occasionTitle: 'Debut',
  tagline: 'Eighteen, in Full Bloom',

  // ISO local time, e.g. '2027-01-23T17:00:00'
  dateTime: '2026-12-19T14:30:00',
  endTime: '7:00 PM',

  venueName: 'AHF 77 Westside Private Resort',
  venueAddress: 'Sitio Lagundi, Banaba West, Batangas City',
  mapsQuery: 'AHF 77 Westside Private Resort, Banaba West, Batangas City',

  theme: 'Floral Paintings',
  dressCode: 'Pastel colors except pink',

  // Storage namespace so RSVPs never mix with another event served from the same domain.
  storageKey: 'nicole18',
};

// Debut program; leave `time` blank to hide it.
export const PROGRAM = [
  { icon: '🌷', time: '', title: 'Arrival & Cocktails', description: 'Settle in among the blooms with light refreshments' },
  { icon: '👑', time: '', title: 'Grand Entrance', description: 'Welcome the debutante as she makes her entrance' },
  { icon: '🌹', time: '', title: '18 Roses & 18 Candles', description: 'Dances and heartfelt wishes from her loved ones' },
  { icon: '🍽️', time: '', title: 'Dinner', description: 'A garden feast shared with family and friends' },
  { icon: '🎁', time: '', title: '18 Treasures', description: 'Keepsakes and blessings for the years ahead' },
  { icon: '💃', time: '', title: 'Party & Dancing', description: 'Dance the afternoon into the evening with Nicole' },
];

// Accepted pastel shades for guests (pink is reserved for the celebrant).
export const DRESS_CODE_SWATCHES = [
  { color: '#C8B6E2', name: 'Lavender' },
  { color: '#B8D8F0', name: 'Baby Blue' },
  { color: '#BFE3C9', name: 'Mint' },
  { color: '#D3DDB0', name: 'Pale Sage' },
  { color: '#FBEBA8', name: 'Butter Yellow' },
  { color: '#FFF8EC', name: 'Cream' },
];

const eventDate = EVENT.dateTime ? new Date(EVENT.dateTime) : null;

export const hasDate = eventDate !== null && !isNaN(eventDate.getTime());

const fmt = (opts: Intl.DateTimeFormatOptions) =>
  hasDate ? eventDate!.toLocaleString('en-US', opts) : '';

export const DATE = {
  date: eventDate,
  long: hasDate ? fmt({ month: 'long', day: 'numeric', year: 'numeric' }) : 'Date to be announced',
  short: hasDate
    ? `${fmt({ month: '2-digit' })}.${fmt({ day: '2-digit' })}.${fmt({ year: 'numeric' })}`
    : 'Save the Date',
  month: fmt({ month: 'long' }),
  weekday: fmt({ weekday: 'long' }),
  day: fmt({ day: '2-digit' }),
  year: fmt({ year: 'numeric' }),
  time: hasDate && eventDate!.getHours() + eventDate!.getMinutes() > 0
    ? fmt({ hour: 'numeric', minute: '2-digit' })
    : '',
  timeRange: '',
};
DATE.timeRange = DATE.time && EVENT.endTime ? `${DATE.time} – ${EVENT.endTime}` : DATE.time;

export const asset = (path: string) => `${process.env.PUBLIC_URL}/${path.replace(/^\//, '')}`;

export const GALLERY = [1, 2, 3, 4, 5, 6].map((n) => asset(`Gallery/Photo${n}.jpg`));
