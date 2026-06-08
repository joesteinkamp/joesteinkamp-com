// Rendered resume data. Edit here (or let an agent propose edits via PR);
// the /resume page renders from this and stays in sync with the site.
//
// summary / education / skills are migrated from the real old-site bio.
// EXPERIENCE still needs Joe's confirmation — titles/dates marked TODO are
// placeholders; do not treat them as verified.

export interface Role {
  company: string;
  role: string;
  period: string;
  location?: string;
  highlights: string[];
}

export interface Education {
  school: string;
  degree: string;
  period: string;
}

export const resume = {
  summary:
    "I'm a design and product leader obsessed with making technology work for people. I use design to find the best path to the best solution — establishing a shared vision and a human-centered process, evangelizing design thinking, building deep partnerships, and leading user research. My background pairs a love of technology with a curiosity about human behavior, grounded in a degree in Human-Computer Interaction.",

  experience: [
    {
      company: 'TODO — Current Company',
      role: 'Design Leadership Role',
      period: '20XX — Present',
      location: 'St. Louis, MO',
      highlights: ['TODO: confirm role, dates, and accomplishments.'],
    },
    {
      company: 'Walgreens',
      role: 'Product / UX Design',
      period: 'TODO — TODO',
      location: 'Chicago, IL',
      highlights: [
        'Designed across the Walgreens mobile experience on iOS and Android — app redesign, Rx status, and pill reminder.',
        'TODO: confirm title, dates, scope, and outcomes.',
      ],
    },
  ] satisfies Role[],

  education: [
    {
      school: 'DePaul University',
      degree: 'M.S., Human-Computer Interaction',
      period: '2009 – 2011',
    },
    {
      school: 'DePaul University',
      degree: 'B.S., Psychology (Minors: Information Technology, Interactive Media)',
      period: '2005 – 2009',
    },
  ] satisfies Education[],

  skills: [
    'Product Design',
    'UX Strategy',
    'Interaction Design',
    'Information Architecture',
    'Design Systems',
    'User Research',
    'Service Design',
    'Prototyping',
    'Design Engineering (HTML/CSS/JS)',
    'Team Leadership',
  ],
};
