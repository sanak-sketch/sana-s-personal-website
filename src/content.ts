export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string; // Life, Thoughts, Notes, Books
  excerpt: string;
  readingTime: string;
  body: string[];
  quote?: {
    text: string;
    author: string;
  };
}

export interface ArtPiece {
  slug: string;
  title: string;
  image: string | null; // null represents dashed placeholder frame
  medium: string;
  year: string;
  description?: string;
}

export interface OtherThing {
  slug: string;
  type: 'blog' | 'book' | 'movie';
  title: string;
  subject?: string;
  creator?: string;
  rating?: number;
  date: string;
  excerpt: string;
  body: string[];
}

export interface CurrentlyItem {
  label: 'Reading' | 'Watching' | 'Drawing';
  value: string;
  detail?: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  intro: string;
  aboutTitle: string;
  aboutBio: string[];
  email: string;
  instagram: string;
  github?: string;
  footerQuote: string;
  currently: CurrentlyItem[];
}

export const siteConfig: SiteConfig = {
  name: 'Sana F Killiyath',
  tagline: 'Essays, art, and other things',
  intro: "Hi, I'm Sana. I write, draw when I can, and keep notes on the books and films I love.",
  aboutTitle: 'About Sana',
  aboutBio: [
    "I write, draw when I can, and keep notes on the books, films, and everyday moments I love. When away from my desk, I explore quiet bookshops, experiment with ink and nibs on textured paper, and brew copious cups of tea.",
    "This website is my small, slow-crafted corner of the web — conceived like an open sketchbook and quiet bookshelf rather than a social feed.",
    "If something here resonates or you just want to share a book recommendation, feel free to write to me."
  ],
  email: 'sana.k@example.com',
  instagram: 'https://instagram.com/sana_killiyath',
  github: 'https://github.com',
  footerQuote: 'made with tea and ink',
  currently: [
    {
      label: 'Reading',
      value: "Italo Calvino's Invisible Cities",
      detail: 're-reading slowly by lamplight'
    },
    {
      label: 'Watching',
      value: 'Perfect Days (dir. Wim Wenders)',
      detail: 'observing quiet daily rituals'
    },
    {
      label: 'Drawing',
      value: 'Black cats & ceramic teapots',
      detail: 'ink wash on cold-pressed paper'
    }
  ]
};

export const blogs: BlogPost[] = [
  {
    slug: 'placeholder-notes-on-slow-mornings',
    title: 'Placeholder: Notes on Slow Mornings',
    date: 'March 14, 2026',
    category: 'Life',
    readingTime: '4 min read',
    excerpt: 'On the luxury of unhurried tea, waking before the world starts demanding answers, and the quiet clarity found in 20 minutes of sitting still.',
    quote: {
      text: 'The day belongs to whoever claims its first silent hour.',
      author: 'Morning Notebook'
    },
    body: [
      'There is a brief, tender interval between kettle whistling and the sun clearing the neighboring rooftops. In that window, before notifications begin their insistent pinging, thought feels light and unburdened.',
      'I have come to treasure simple rituals: pouring hot water over loose leaves, feeling the ceramic cup warm between cold palms, watching ink seep across blank paper. No goals, no checklist, no output required.',
      'Slow mornings do not make us less productive; they remind us what we are working for in the first place — a life that feels inhabited rather than rushed.'
    ]
  },
  {
    slug: 'placeholder-on-keeping-a-sketchbook',
    title: 'Placeholder: On Keeping a Sketchbook',
    date: 'February 22, 2026',
    category: 'Notes',
    readingTime: '5 min read',
    excerpt: 'Why imperfect lines and messy ink blots matter more than polished portfolios, and how drawing trains you to truly look.',
    quote: {
      text: 'Drawing is not about creating art; it is simply learning how to look at what is already there.',
      author: 'Studio Notes'
    },
    body: [
      'A sketchbook should never be precious. The moment you treat a blank page as sacred ground, the hand stiffens and fear of a crooked stroke takes over.',
      'My favorite pages are messy: quick gestures of a sleeping cat, a hurried contour of an interesting teapot, an ink blot that turned into an accidental shadow. These pages contain life and attention.',
      'To sketch something is to spend five uninterrupted minutes observing its weight, curves, and posture. In an era of split-second screen glances, drawing remains one of our quietest acts of reverence.'
    ]
  },
  {
    slug: 'placeholder-rainy-afternoons-and-loose-leaves',
    title: 'Placeholder: Rainy Afternoons and Loose Leaves',
    date: 'January 28, 2026',
    category: 'Thoughts',
    readingTime: '4 min read',
    excerpt: 'A rainy window, an unread novel, and the gentle discipline of letting the afternoon slip away without apology.',
    body: [
      'When rain drums steadily against the windowpane, the room closes in like a warm coat. Time seems to stretch out, generous and forgiving.',
      'We rarely give ourselves permission to simply read a chapter without keeping track of pages, or to sit listening to rain without multitasking. Yet these quiet pockets are where imagination quietly refills its reservoir.',
      'Pour another cup of tea. The world can wait an hour.'
    ]
  }
];

// Exactly 3 art pieces: Black Cat with Tea first, followed by ONLY 2 "sketch coming soon" tiles
export const artPieces: ArtPiece[] = [
  {
    slug: 'cat-with-tea',
    title: 'Black Cat with Tea',
    image: '/cat-with-tea.png',
    medium: 'Ink & wash on paper',
    year: '2026',
    description: 'A hand-drawn black cat illustration curled beside a steaming cup of tea.'
  },
  {
    slug: 'sketch-placeholder-1',
    title: 'Sketch Study I',
    image: null,
    medium: 'Pen & ink',
    year: '2026',
    description: 'Upcoming line study on cold-press paper.'
  },
  {
    slug: 'sketch-placeholder-2',
    title: 'Sketch Study II',
    image: null,
    medium: 'Brush & wash',
    year: '2026',
    description: 'Upcoming monochrome wash study.'
  }
];

export const otherThings: OtherThing[] = [
  {
    slug: 'placeholder-monsoon-tea-and-slow-afternoons',
    type: 'blog',
    title: 'Placeholder: Monsoon Tea and Slow Afternoons',
    date: 'March 08, 2026',
    excerpt: 'Reflections on the cadence of rainy days, ceramic cups, and the gentle discipline of sketching without an objective.',
    body: [
      'There is a particular stillness that settles over a room when heavy rain meets hot tea. The outside world recedes to the steady drumming on the windowpane, and the pressure to produce dissolves into vapor.',
      'I keep an unlined notebook by the kettle. Drawing during these afternoons is not about finishing a piece or sharing it online; it is an exercise in tactile attention — watching how ink bleeds into porous paper, following the curve of a sleeping cat, letting the hand wander without an agenda.'
    ]
  },
  {
    slug: 'placeholder-reading-italo-calvino-invisible-cities',
    type: 'book',
    title: "Placeholder: Reading Italo Calvino's 'Invisible Cities'",
    subject: 'Invisible Cities',
    creator: 'Italo Calvino',
    rating: 5,
    date: 'February 15, 2026',
    excerpt: 'Fifty-five poetic cities told through dialogue between Marco Polo and Kublai Khan — an enduring meditation on memory, desire, and signs.',
    body: [
      'Calvino does not describe cities made of brick and mortar so much as cities forged from human longing, regret, and semiotic echoes.',
      'What strikes me most upon rereading is how deeply architectural Calvino is despite his surrealism. A masterpiece of imagination to savor one city at a time.'
    ]
  },
  {
    slug: 'placeholder-wim-wenders-perfect-days',
    type: 'movie',
    title: "Placeholder: Wim Wenders' 'Perfect Days' and the Art of Looking",
    subject: 'Perfect Days',
    creator: 'Wim Wenders',
    rating: 5,
    date: 'January 30, 2026',
    excerpt: 'Following Hirayama through Tokyo with cassettes of classic rock, tending bonsai, and photographing sunlight filtering through leaves.',
    body: [
      'Wim Wenders and Kōji Yakusho craft a quiet celebration of monastic routine. Hirayama cleans Tokyo public spaces with devotional care, drinks canned coffee at dawn, reads William Faulkner by lamplight, and photographs komorebi — the dappled dance of sunlight through tree branches.',
      'The film poses a gentle question: what if a good life is simply the deliberate attention you pay to the world right in front of you?'
    ]
  }
];
