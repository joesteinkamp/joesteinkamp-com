// Rendered resume data. Edit here (or let an agent propose edits via PR);
// the /resume page renders from this and stays in sync with the site.
//
// summary / education / skills are migrated from the real old-site bio.
// EXPERIENCE: titles and dates confirmed by Joe (2026-06).

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
      company: 'AlphaSense',
      role: 'Senior Director, Product Design',
      period: '2024 — Present',
      location: 'Remote · St. Louis, MO',
      highlights: [
        'Lead product design for the market-intelligence and search platform.',
        'Joined through AlphaSense’s acquisition of Tegus.',
      ],
    },
    {
      company: 'Tegus',
      role: 'Head of Design',
      period: '2019 — 2024',
      location: 'Chicago, IL',
      highlights: [
        'Built and led the design function for the market-intelligence platform serving institutional investors, corporations, and consultancies.',
      ],
    },
    {
      company: 'Shiftgig',
      role: 'Director, Design',
      period: '2017 — 2019',
      location: 'Chicago, IL',
      highlights: [
        'Led design for the on-demand staffing marketplace connecting gig workers with employers — worker scheduling, shift requests, and the marketplace experience.',
      ],
    },
    {
      company: 'Walgreens',
      role: 'Senior User Experience Designer',
      period: '2011 — 2017',
      location: 'Deerfield, IL',
      highlights: [
        'Designed Walgreens mobile experiences across iOS and Android — app redesign, Rx status, and pill reminder — and consulted on Walgreens.com.',
        'Defined product vision, requirements, and success metrics, and established design guidelines for mobile.',
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
