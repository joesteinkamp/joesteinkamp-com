// Rendered resume data. Edit here (or let an agent propose edits via PR);
// the /resume page renders from this and stays in sync with the site.
// TODO: Joe to fill in real history — entries below are scaffolding placeholders.

export interface Role {
  company: string;
  role: string;
  period: string;
  location?: string;
  highlights: string[];
}

export const resume = {
  summary:
    'Product design and design-engineering leader. I lead design teams and ship the code myself — bridging strategy, craft, and engineering to put well-made products in front of people.',
  experience: [
    {
      company: 'TODO — Current Company',
      role: 'Design Leadership Role',
      period: '2021 — Present',
      location: 'St. Louis, MO',
      highlights: [
        'TODO: replace with real accomplishments and outcomes.',
      ],
    },
    {
      company: 'Walgreens',
      role: 'Product Design',
      period: 'TODO — TODO',
      location: 'Chicago, IL',
      highlights: [
        'Led design of the Walgreens mobile app experience across iOS and Android.',
        'TODO: add metrics / scope.',
      ],
    },
  ] satisfies Role[],
  skills: [
    'Product Design',
    'Design Systems',
    'Design Engineering',
    'Prototyping in Code',
    'Team Leadership',
    'Research & Strategy',
  ],
};
