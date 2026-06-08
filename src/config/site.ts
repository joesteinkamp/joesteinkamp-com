export const site = {
  name: 'Joe Steinkamp',
  tagline: 'Product Design × Design Engineering',
  location: 'St. Louis, MO',
  url: 'https://joesteinkamp.com',
  github: 'joesteinkamp',
  social: {
    github: 'https://github.com/joesteinkamp',
    linkedin: 'https://linkedin.com/in/joesteinkamp',
    // TODO: confirm the public-facing contact address.
    email: 'mailto:joe@joesteinkamp.com',
  },
  nav: [
    { label: 'Now', href: '/' },
    { label: 'Work', href: '/work' },
    { label: 'Writing', href: '/writing' },
    { label: 'HHMM', href: '/hhmm' },
    { label: 'About', href: '/about' },
  ],
} as const;
