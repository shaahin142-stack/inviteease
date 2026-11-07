// All invitation categories, templates and editor options live here.
export const CATS = [
  { id: 'baby', n: 'Baby Shower', e: '🍼' },
  { id: 'wedding', n: 'Wedding', e: '💍' },
  { id: 'birthday', n: 'Birthday', e: '🎂' },
  { id: 'engagement', n: 'Engagement', e: '💞' },
  { id: 'house', n: 'Housewarming', e: '🏡' },
  { id: 'anniv', n: 'Anniversary', e: '🥂' },
]

export const DEF = {
  baby: ['Baby Shower', 'Join us to shower the mom-to-be with love, blessings and little wonders.'],
  wedding: ['Our Wedding', 'Together with our families, we joyfully invite you to celebrate our wedding day.'],
  birthday: ['Birthday Party', 'Come laugh, eat cake and make beautiful memories with us!'],
  engagement: ['Engagement Ceremony', 'We said yes! Please join us as we begin our forever together.'],
  house: ['Housewarming', 'Our new home is ready for love, laughter and your blessings.'],
  anniv: ['Anniversary Celebration', 'Celebrating years of love, together. Your presence will make it special.'],
}

const T = (id, cat, name, bg, text, accent, deco, font) => ({ id, cat, name, bg, text, accent, deco, font })

// deco: floral | dots | confetti | stars | hearts | frame | arch
export const TPL = [
  T(1, 'baby', 'Cloud Nine', '#dfeefc', '#4a5d7a', '#f4b6c2', 'dots', 'Dancing Script'),
  T(2, 'baby', 'Little Blossom', '#fde8ef', '#7a4a5e', '#f2a7bd', 'floral', 'Great Vibes'),
  T(3, 'wedding', 'Blush Eternal', '#fbeee9', '#6b4a3d', '#d9a58f', 'frame', 'Great Vibes'),
  T(4, 'wedding', 'Sage Garden', '#e6efe3', '#3f5a46', '#9bb89b', 'arch', 'Playfair Display'),
  T(5, 'birthday', 'Confetti Pop', '#fff1d6', '#7a4b2a', '#f59fb0', 'confetti', 'Dancing Script'),
  T(6, 'birthday', 'Lavender Star', '#ece4fa', '#54407e', '#b79df0', 'stars', 'Playfair Display'),
  T(7, 'engagement', 'Rose Promise', '#fbe4ea', '#7b3a52', '#e58ca6', 'hearts', 'Great Vibes'),
  T(8, 'engagement', 'Golden Ring', '#fff6e0', '#6a5320', '#d8b45a', 'frame', 'Playfair Display'),
  T(9, 'house', 'Mint Home', '#def4ee', '#2f5b53', '#7cc7b5', 'dots', 'Poppins'),
  T(10, 'house', 'Peach Door', '#ffe7da', '#7a4630', '#f2a984', 'arch', 'Dancing Script'),
  T(11, 'anniv', 'Silver Rose', '#eceef6', '#444a68', '#aab3d6', 'floral', 'Playfair Display'),
  T(12, 'anniv', 'Champagne', '#f8efe0', '#66502f', '#cfa86a', 'hearts', 'Great Vibes'),
]

export const FONTS = ['Great Vibes', 'Dancing Script', 'Playfair Display', 'Cormorant Garamond', 'Montserrat', 'Poppins']
export const TXT = ['#4a3b3b', '#6b4a3d', '#7a4a5e', '#3f5a46', '#54407e', '#2b3a55', '#b8860b', '#ffffff']
export const BGS = ['#fde8ef', '#fbeee9', '#fff1d6', '#e6efe3', '#def4ee', '#dfeefc', '#ece4fa', '#ffe7da', '#f8efe0', '#ffffff']

// Starting values for the editor, based on a template
export const baseData = (t) => ({
  host: 'The Sharma Family',
  event: DEF[t.cat][0],
  date: '2026-12-12T17:00',
  venue: 'Rosewood Garden Hall',
  address: '12 Lake View Road, Coimbatore',
  msg: DEF[t.cat][1],
  photo: null,
  font: t.font,
  color: t.text,
  bg: t.bg,
})
