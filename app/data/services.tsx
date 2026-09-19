import { BrandingArt, OrganicArt, PerformanceArt, SocialArt, InfluencerArt, EventsArt, ConsultationArt } from './serviceArt';
export type Capability = { title: string; description: string; icon: string };
export type ProcessStep = { title: string; description: string };

export type Service = {
  number: string;
  slug: string;
  category: string;
  title: string;
  tagline: string;
  /** Long-form keyword phrase shown as the H1 on the homepage service card instead of `title`. Falls back to `title` when absent. */
  cardHeading?: string;
  description: string;
  whatItIs: string;
  capabilities: Capability[];
  process: ProcessStep[];
  deliverables: string[];
  values: string[];
  metric: string;
  image: string;
  accent: string;
  accent2: string;
  icon: React.ReactNode;
  illustration: (accent: string, accent2: string) => React.ReactNode;
};

export const SERVICES: Service[] = [
  {
    number: '01',
    slug: 'branding-identity',
    category: 'Identity',
    title: 'A-Z Branding & Digital Identity Development',
    tagline: 'Brand Architecture & Visual Systems',
    description:
      'From logo to language, full brand and digital identity systems that make your brand feel inevitable everywhere it shows up.',
    whatItIs:
      'A complete visual and verbal identity system: logo, guidelines, tone of voice, digital presence, and every asset that carries your name, built end-to-end, A to Z.',
    capabilities: [
      { title: 'Brand Strategy & Positioning', description: "Where you sit in the market, who you're for, and why you're different, written down so every future decision has something to check against.", icon: 'target' },
      { title: 'Logo & Visual Identity', description: 'Primary and secondary marks, a colour and type system, and usage rules that hold up from a business card to a billboard.', icon: 'layers' },
      { title: 'Guidelines & Tone of Voice', description: 'A living brand guide covering visual rules and how the brand actually talks, so anyone writing for you sounds like you.', icon: 'chat' },
      { title: 'Digital Identity Rollout', description: 'Every profile, template, and touchpoint updated to match, from social headers to email signatures.', icon: 'grid' },
    ],
    process: [
      { title: 'Discovery & Audit', description: 'Where the brand stands today: existing assets, competitors, and what\'s actually working.' },
      { title: 'Strategy & Positioning', description: 'Define the point of view, tone, and market position everything else builds on.' },
      { title: 'Design & System Build', description: 'Logo, colour, type, and the guidelines that keep it consistent as the brand scales.' },
      { title: 'Rollout & Handover', description: "Every touchpoint updated, plus a guide your team can run with independently." },
    ],
    deliverables: [
      'Logo suite & usage guidelines',
      'Colour & typography system',
      'Brand voice & messaging guide',
      'Updated social and digital touchpoints',
      'Editable brand asset library',
    ],
    values: [
      'Consistent recognition across every touchpoint',
      'Faster onboarding for new hires, vendors, and partners',
      'Premium positioning that justifies premium pricing',
    ],
    metric: '100% Brand Consistency',
    image: '/service-branding.png',
    accent: '#4A9EFF',
    accent2: '#5BC9E8',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
        <path d="M14 34L24 14L34 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 28H31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    illustration: BrandingArt,
  },
  {
    number: '02',
    slug: 'organic-marketing',
    category: 'Organic',
    title: 'Organic Marketing',
    tagline: 'Content Strategising, Production & Management',
    cardHeading: 'Content Strategising, Production, Editing & Management',
    description:
      'A steady organic engine that keeps your brand present without burning you out.',
    whatItIs:
      "An end-to-end organic content engine: strategy, production, editing, and day-to-day management, so output never depends on one person's bandwidth.",
    capabilities: [
      { title: 'Content Strategising', description: 'A content plan tied to actual goals: what to post, where, and why, not just a calendar to fill.', icon: 'target' },
      { title: 'Production', description: 'Shoots, edits, graphics, and copy produced in-house so quality doesn\'t dip when volume goes up.', icon: 'camera' },
      { title: 'Editing', description: 'Every piece polished to platform-native standards before it goes anywhere near a post button.', icon: 'scissors' },
      { title: 'Management', description: 'Scheduling, posting, and day-to-day upkeep handled, so the calendar never goes quiet.', icon: 'calendar' },
    ],
    process: [
      { title: 'Audit & Research', description: 'What\'s already working, what isn\'t, and where the gaps in the current content are.' },
      { title: 'Content Strategy & Calendar', description: 'A themed, scheduled plan built around your goals, not just a stream of one-off posts.' },
      { title: 'Production & Editing', description: 'Content shot, written, and edited in-house to a consistent, on-brand standard.' },
      { title: 'Publish & Report', description: 'Posted on schedule, with a regular recap on what moved the needle.' },
    ],
    deliverables: [
      'Monthly content calendar',
      'Platform-native short-form & long-form content',
      'Caption & copywriting',
      'Scheduling & publishing',
      'Monthly performance recap',
    ],
    values: [
      'Steady publishing cadence without burnout',
      'Content that compounds into an owned audience',
      'One clear narrative across every channel',
    ],
    metric: 'Always-On Output Engine',
    image: '/service-content.png',
    accent: '#5BC9E8',
    accent2: '#4A9EFF',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <rect x="8" y="10" width="32" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 18H34M14 24H28M14 30H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="37" cy="37" r="7" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        <path d="M35 37L37 39L41 35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    illustration: OrganicArt,
  },
  {
    number: '03',
    slug: 'performance-marketing',
    category: 'Performance',
    title: 'Performance Marketing',
    tagline: 'Paid Advertising, Funnels & Distribution',
    cardHeading: 'Paid Advertising: Funnel Management & Distribution',
    description:
      'Data-led campaigns that convert, and keep converting.',
    whatItIs:
      'Data-led paid acquisition across search, social, and programmatic, plus the funnels and distribution that carry a click all the way to a customer.',
    capabilities: [
      { title: 'Paid Advertising', description: 'Campaigns built and run across the platforms your customers actually use, not just the ones that are easiest to set up.', icon: 'megaphone' },
      { title: 'Funnels Management', description: 'Landing pages and offer sequences built to hold attention from click to conversion, not just collect it.', icon: 'funnel' },
      { title: 'Distribution', description: "Budget placed where it's earning, and pulled from where it isn't, reviewed on a real cadence, not set-and-forget.", icon: 'share' },
    ],
    process: [
      { title: 'Audit & Benchmarking', description: 'Current spend, channels, and conversion points reviewed against realistic targets.' },
      { title: 'Campaign & Funnel Build', description: 'Ad creative, targeting, and landing pages built around a single clear offer.' },
      { title: 'Launch & Optimise', description: 'Live campaigns tested and refined against real performance data, not assumptions.' },
      { title: 'Scale & Report', description: 'What\'s working gets more budget, with clear reporting on where it went.' },
    ],
    deliverables: [
      'Campaign strategy & targeting',
      'Ad creative & copy',
      'Landing page / funnel build',
      'Ongoing optimisation',
      'Performance reporting',
    ],
    values: [
      'Lower cost-per-acquisition over time',
      "Budget reallocated toward what's proven to work",
      'Forecastable, repeatable pipeline growth',
    ],
    metric: 'Proven Unit Economics',
    image: '/service-performance.png',
    accent: '#4A9EFF',
    accent2: '#6B7FFF',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <path d="M8 36L18 24L26 30L38 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="38" cy="12" r="4" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 40H40" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      </svg>
    ),
    illustration: PerformanceArt,
  },
  {
    number: '04',
    slug: 'social-media-management',
    category: 'Social',
    title: 'End-to-End Social Media Management',
    tagline: 'Full Management & Scaling Optimisation',
    cardHeading: 'Overall End-to-End Social Media Management + Scaling Optimisation',
    description:
      'Your brand, alive online, and built to grow.',
    whatItIs:
      'Complete, always-on social presence: content calendars, community, and reporting, paired with continuous scaling optimisation as the numbers move.',
    capabilities: [
      { title: 'End-to-End Management', description: 'Strategy, content, posting, and community run as one connected system, not separate hand-offs.', icon: 'grid' },
      { title: 'Community & Response', description: 'Comments and messages answered like a person is actually behind the account, because one is.', icon: 'chat' },
      { title: 'Scaling Optimisation', description: "What's working gets more of the budget and calendar; what isn't gets changed, on a regular review cycle.", icon: 'chart' },
    ],
    process: [
      { title: 'Platform Audit', description: 'Where each platform stands today, and which ones actually deserve the effort.' },
      { title: 'Content & Community Strategy', description: 'A plan for what gets posted, how the account responds, and the voice behind both.' },
      { title: 'Daily Management', description: 'Posting, monitoring, and responding, handled every day, not in batches.' },
      { title: 'Review & Scale', description: 'Regular check-ins on what\'s working, with the calendar and budget adjusted accordingly.' },
    ],
    deliverables: [
      'Platform-specific content calendar',
      'Community management & response',
      'Profile & bio optimisation',
      'Monthly performance review',
      'Scaling recommendations',
    ],
    values: [
      'Always-on brand presence across platforms',
      'Faster response to trends and culture moments',
      'A community that converts into advocates',
    ],
    metric: 'Built to Scale',
    image: '/service-social.png',
    accent: '#5BC9E8',
    accent2: '#4A9EFF',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <circle cx="10" cy="24" r="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="38" cy="10" r="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="38" cy="38" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15 21L33 13M15 27L33 35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    illustration: SocialArt,
  },
  {
    number: '05',
    slug: 'influencer-offline-marketing',
    category: 'Influencer',
    title: 'Influencer & Offline Marketing',
    tagline: 'Creator Partnerships & Real-World Reach',
    description:
      'Influencer marketing and offline marketing, extending your brand past the feed and into rooms, streets, and screens people actually trust.',
    whatItIs:
      "Creator partnerships and offline marketing (print, OOH, ground activations) run as one connected push, not two separate efforts.",
    capabilities: [
      { title: 'Influencer Sourcing & Deals', description: 'Creators shortlisted for actual audience fit, not just follower count, with terms negotiated on your behalf.', icon: 'handshake' },
      { title: 'Creator Campaign Management', description: 'Briefs, timelines, and approvals handled so creators deliver on-brand content without back-and-forth on your end.', icon: 'users' },
      { title: 'Offline & OOH Marketing', description: 'Print, out-of-home, and ground activations planned and run alongside the digital push, not as an afterthought.', icon: 'pin' },
    ],
    process: [
      { title: 'Audience & Creator Mapping', description: 'Who your audience actually follows and trusts, matched against your brand.' },
      { title: 'Outreach & Deal Structuring', description: 'Creators approached, briefed, and contracted on clear, fair terms.' },
      { title: 'Campaign Execution', description: 'Content reviewed and approved before it goes live, on-brand every time.' },
      { title: 'Offline Extension & Reporting', description: 'Offline placements coordinated alongside it, with a clear recap of reach and results.' },
    ],
    deliverables: [
      'Creator shortlist & outreach',
      'Contract & deliverable management',
      'Campaign brief & content approval',
      'Offline / OOH placement planning',
      'Post-campaign report',
    ],
    values: [
      "Trust borrowed from voices your audience already follows",
      "Reach beyond platforms your paid budget can't buy",
      'One brand story told consistently on and offline',
    ],
    metric: 'On & Offline Reach',
    image: '/bg_service_5.png',
    accent: '#4A9EFF',
    accent2: '#8B6FFF',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <path d="M8 22L30 10V38L8 26V22Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M30 16L40 12V36L30 32" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M14 26V32C14 34.2 15.8 36 18 36" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    illustration: InfluencerArt,
  },
  {
    number: '06',
    slug: 'events-photography-videography',
    category: 'Events',
    title: 'Events Management, Photography & Videography',
    tagline: 'Experiential Activations & Production',
    description:
      'Events management, photography, and videography, concept to execution, and every moment captured properly.',
    whatItIs:
      'Concept-to-execution event management paired with in-house photography and videography, so every activation is documented at the same quality it was run.',
    capabilities: [
      { title: 'Events Management', description: 'Venue, run-of-show, vendors, and logistics handled end to end, from first concept to load-out.', icon: 'calendar' },
      { title: 'Photography', description: 'In-house coverage of the event itself, shot for both immediate use and long-term brand assets.', icon: 'camera' },
      { title: 'Videography', description: 'Recap edits, social cuts, and raw footage delivered so the event keeps working long after it\'s over.', icon: 'video' },
    ],
    process: [
      { title: 'Concept & Planning', description: 'The brief, the venue, and the shape of the event, locked in early.' },
      { title: 'Vendor & Logistics Coordination', description: 'Every moving piece, catering, staging, permits, managed so nothing is a surprise on the day.' },
      { title: 'Live Execution & Coverage', description: 'The event run on-site, with photo and video coverage happening in real time.' },
      { title: 'Edit & Delivery', description: 'Footage and photos edited and delivered, ready for social, press, or internal use.' },
    ],
    deliverables: [
      'Event concept & run-of-show',
      'Vendor & logistics management',
      'On-site photography',
      'Event video coverage & edits',
      'Edited asset delivery for social & press',
    ],
    values: [
      'Memorable, shareable brand moments',
      'Professional coverage without a separate vendor',
      'Content pipeline fed straight back into organic & social',
    ],
    metric: 'High-Impact Moments',
    image: '/service-events.png',
    accent: '#4A9EFF',
    accent2: '#90CDF4',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <rect x="8" y="14" width="32" height="26" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 22H40" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
        <path d="M16 8V14M32 8V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="32" r="5" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M24 29V32L26 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    illustration: EventsArt,
  },
  {
    number: '07',
    slug: 'consultation-business-development',
    category: 'Growth',
    title: 'Personalised Content Consultation & Business Development',
    tagline: '1:1 Tailored Strategy & Growth',
    cardHeading: '1:1 Personalised Content Consultation & Business Development',
    description:
      'Direct, hands-on strategy for where you want to go next.',
    whatItIs:
      'One-on-one consultation sessions and tailored business development roadmaps, built around your specific brand, market, and goals, not a template.',
    capabilities: [
      { title: 'Personalised Content Consultation', description: 'Sessions built around your actual content, not a generic framework applied to everyone.', icon: 'chat' },
      { title: '1:1 Strategy Sessions', description: 'Direct time with someone who knows your account, not a rotating account manager.', icon: 'users' },
      { title: 'Tailored Business Development', description: 'Market and partnership opportunities researched and sequenced specifically for where your business is right now.', icon: 'compass' },
    ],
    process: [
      { title: 'Discovery Session', description: 'A direct conversation about where the business is and where it wants to go.' },
      { title: 'Diagnostic & Opportunity Mapping', description: 'Content, channels, and market position reviewed for where the real openings are.' },
      { title: 'Roadmap Delivery', description: 'A specific, sequenced plan handed over, not a generic slide deck.' },
      { title: 'Ongoing 1:1 Check-ins', description: 'Regular sessions to adjust the plan as the business actually moves.' },
    ],
    deliverables: [
      '1:1 consultation sessions',
      'Content & channel audit',
      'Tailored growth roadmap',
      'Partnership & market opportunity research',
      'Ongoing strategy check-ins',
    ],
    values: [
      'Guidance built around your business, not a generic playbook',
      'Direct access instead of layers of account management',
      'A growth roadmap you can act on immediately',
    ],
    metric: '1:1 Tailored Strategy',
    image: '/service-business.png',
    accent: '#4A9EFF',
    accent2: '#5BC9E8',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <path d="M10 38L20 26L28 32L38 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 20H38V26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="26" r="3" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="28" cy="32" r="3" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    illustration: ConsultationArt,
  },
];

export const SERVICE_KEYFRAMES = `
  @keyframes floatDot {
    from { transform: translateY(0px); }
    to   { transform: translateY(-8px); }
  }
  @keyframes pulseOpacity {
    from { opacity: 0.4; }
    to   { opacity: 1; }
  }
  @keyframes pulseGlow {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50%       { opacity: 1;   transform: scale(1.15); }
  }
  @keyframes brandDraw {
    from { stroke-dashoffset: 200; opacity: 0.6; }
    to   { stroke-dashoffset: 0;   opacity: 1; }
  }
  @keyframes scanMove {
    0%   { transform: translateY(0px);   opacity: 0.6; }
    50%  { transform: translateY(100px); opacity: 0.3; }
    100% { transform: translateY(0px);   opacity: 0.6; }
  }
  @keyframes lineExpand {
    from { width: 30px; }
    to   { width: 80px; }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  @keyframes dashAnim {
    from { stroke-dashoffset: 0; }
    to   { stroke-dashoffset: -50; }
  }
  @keyframes spinStar {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes progressFill {
    from { width: 0; }
    to   { width: 90px; }
  }
  @keyframes milestoneIn {
    from { transform: scale(0); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
  }
  @keyframes swatchPop {
    from { transform: scale(0); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
  }
  @keyframes barRise {
    from { transform: scaleY(0); transform-origin: bottom; }
    to   { transform: scaleY(1); transform-origin: bottom; }
  }
  @keyframes lineDrawRight {
    from { stroke-dasharray: 0 1000; }
    to   { stroke-dasharray: 1000 0; }
  }
  @keyframes shardInTL {
    from { transform: translate(-46px, -34px) scale(0.55); opacity: 0; }
    to   { transform: translate(0, 0) scale(1); opacity: 1; }
  }
  @keyframes shardInTR {
    from { transform: translate(46px, -34px) scale(0.55); opacity: 0; }
    to   { transform: translate(0, 0) scale(1); opacity: 1; }
  }
  @keyframes shardInB {
    from { transform: translate(0, 56px) scale(0.55); opacity: 0; }
    to   { transform: translate(0, 0) scale(1); opacity: 1; }
  }
  @keyframes leafSway {
    from { transform: rotate(-4deg); }
    to   { transform: rotate(4deg); }
  }
  @keyframes ringPulse {
    0%   { transform: scale(0.55); opacity: 0.65; }
    100% { transform: scale(1.7); opacity: 0; }
  }
  @keyframes barGrowX {
    from { transform: scaleX(0); opacity: 0; }
    to   { transform: scaleX(1); opacity: 1; }
  }
  @keyframes playheadMove {
    from { transform: translateX(0px); }
    to   { transform: translateX(52px); }
  }
  @keyframes apertureGlow {
    0%, 100% { opacity: 0.55; transform: scale(1); }
    50%      { opacity: 1; transform: scale(1.12); }
  }
`;
