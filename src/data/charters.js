export const CHARTER_TYPES = [
  {
    id: 'skippered',
    featured: true,
    icon: '🎖️',
    title: 'Skippered Charter',
    description:
      'Our most popular option. Relax and enjoy The Solent while one of our RYA-certified, commercially endorsed skippers handles everything. Available on all vessels.',
    items: [
      'Princess V58 — up to 12 passengers',
      'Sealine F42 Flybridge — private groups',
      'Axopar 28 — up to 6 incl. skipper',
      'Highfield RIBs — up to 11–12 guests',
      'Half day or full day options',
      'Fully tailored itinerary',
    ],
    ctaVariant: 'primary',
  },
  {
    id: 'bareboat',
    featured: false,
    icon: '🚤',
    title: 'Bareboat Charter',
    description:
      "Take the helm yourself. Ideal for qualified boaters who want to explore The Solent at their own pace. Available on our Highfield RIBs.",
    items: [
      'Minimum Powerboat Level 2 required',
      '3+ years experience in similar vessel',
      'Up to 12 passengers incl. skipper',
      'Southampton & Portsmouth based boats',
      'Half day or full day',
    ],
    ctaVariant: 'outline',
  },
  {
    id: 'assisted',
    featured: false,
    icon: '🧭',
    title: 'Assisted Bareboat',
    description:
      'The best of both worlds. An experienced skipper accompanies you to guide, advise and help you build confidence — you drive, they coach.',
    items: [
      'Expert skipper on board throughout',
      'Brush up skills & local knowledge',
      'Perfect for returning or newer boaters',
      'Familiarise with The Solent tides & shipping',
      'Flexible duration',
    ],
    ctaVariant: 'outline',
  },
]

export const AREAS = [
  'Southampton', 'Portsmouth', 'The Solent', 'Cowes',
  'Hamble', 'Lymington', 'Yarmouth', 'Isle of Wight',
  'The Needles', 'Gosport', 'Gunwharf Quays',
]
