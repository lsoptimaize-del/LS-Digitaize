export type Capability = { title: string; description: string; icon: string };
export type ProcessStep = { title: string; description: string };

export type Service = {
  number: string;
  slug: string;
  category: string;
  title: string;
  tagline: string;
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
    illustration: (accent, accent2) => (
      <svg viewBox="0 0 320 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.9" />
            <stop offset="100%" stopColor={accent2} stopOpacity="0.6" />
          </linearGradient>
          <radialGradient id="brandGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <ellipse cx="160" cy="80" rx="150" ry="65" fill="url(#brandGlow)" />
        {[0, 1, 2, 3, 4].map(i => (
          <line key={i} x1={i * 80} y1="0" x2={i * 80} y2="160" stroke={accent} strokeOpacity="0.07" strokeWidth="1" />
        ))}
        {[0, 1, 2, 3].map(i => (
          <line key={i} x1="0" y1={i * 53} x2="320" y2={i * 53} stroke={accent} strokeOpacity="0.07" strokeWidth="1" />
        ))}
        <rect x="95" y="25" width="130" height="110" rx="8" fill="rgba(10,18,48,0.9)" stroke={accent} strokeOpacity="0.35" strokeWidth="1" />
        <path
          d="M115 105L160 45L205 105"
          stroke="url(#brandGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ animation: 'brandDraw 3s ease-in-out infinite alternate' }}
        />
        <path d="M128 88H192" stroke={accent2} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
        <line x1="95" y1="25" x2="225" y2="25" stroke={accent} strokeOpacity="0.5" strokeWidth="1.5" style={{ animation: 'scanMove 4s ease-in-out infinite' }} />
        <circle cx="80" cy="40" r="4" fill={accent} fillOpacity="0.6" style={{ animation: 'floatDot 3s ease-in-out infinite alternate' }} />
        <circle cx="250" cy="115" r="6" fill={accent2} fillOpacity="0.45" style={{ animation: 'floatDot 4s ease-in-out infinite alternate-reverse' }} />
        <circle cx="40" cy="110" r="3" fill={accent} fillOpacity="0.35" style={{ animation: 'floatDot 5s ease-in-out infinite alternate' }} />
        <circle cx="290" cy="45" r="3.5" fill={accent2} fillOpacity="0.4" style={{ animation: 'floatDot 3.5s ease-in-out infinite alternate-reverse' }} />
        {[accent, accent2, '#1a3a8a', '#0a1c50', '#2a5caa'].map((c, i) => (
          <rect key={i} x={65 + i * 16} y="135" width="12" height="12" rx="3" fill={c} fillOpacity="0.85" style={{ animation: `swatchPop 0.4s ${0.1 * i}s both ease-out` }} />
        ))}
        <rect x="95" y="13" width="65" height="8" rx="2" fill={accent} fillOpacity="0.3" style={{ animation: 'pulseOpacity 2.5s ease-in-out infinite alternate' }} />
        <rect x="165" y="13" width="35" height="8" rx="2" fill={accent2} fillOpacity="0.2" style={{ animation: 'pulseOpacity 3s 0.5s ease-in-out infinite alternate' }} />
        <path d="M40 35L30 35L30 45" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
        <path d="M280 35L290 35L290 45" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
        <path d="M40 125L30 125L30 115" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
        <path d="M280 125L290 125L290 115" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
      </svg>
    ),
  },
  {
    number: '02',
    slug: 'organic-marketing',
    category: 'Organic',
    title: 'Organic Marketing',
    tagline: 'Content Strategising, Production & Management',
    description:
      'Content strategising, production, editing, and management, a steady organic engine that keeps your brand present without burning you out.',
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
    illustration: (accent, accent2) => (
      <svg viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <radialGradient id="contentGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.18" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <ellipse cx="110" cy="80" rx="100" ry="60" fill="url(#contentGlow)" />
        <rect x="52" y="28" width="110" height="110" rx="6" fill="rgba(12,18,45,0.6)" stroke={accent2} strokeOpacity="0.15" strokeWidth="1" transform="rotate(-4 107 83)" />
        <rect x="56" y="22" width="110" height="112" rx="6" fill="rgba(10,17,45,0.92)" stroke={accent} strokeOpacity="0.4" strokeWidth="1" />
        <rect x="72" y="40" width="75" height="7" rx="2" fill={accent} fillOpacity="0.55" style={{ animation: 'lineExpand 3s ease-in-out infinite alternate' }} />
        <rect x="72" y="55" width="60" height="5" rx="2" fill="white" fillOpacity="0.12" />
        <rect x="72" y="65" width="68" height="5" rx="2" fill="white" fillOpacity="0.12" />
        <rect x="72" y="75" width="45" height="5" rx="2" fill="white" fillOpacity="0.08" style={{ animation: 'lineExpand 4s 0.5s ease-in-out infinite alternate' }} />
        <rect x="72" y="90" width="78" height="30" rx="4" fill={accent2} fillOpacity="0.12" stroke={accent2} strokeOpacity="0.3" strokeWidth="1" />
        <circle cx="86" cy="105" r="9" fill={accent2} fillOpacity="0.3" stroke={accent2} strokeWidth="1" strokeOpacity="0.5" style={{ animation: 'pulseOpacity 2s ease-in-out infinite alternate' }} />
        <path d="M83 101L91.5 105L83 109Z" fill={accent2} fillOpacity="0.9" />
        <rect x="140" y="30" width="36" height="14" rx="7" fill={accent} fillOpacity="0.18" stroke={accent} strokeOpacity="0.45" strokeWidth="1" style={{ animation: 'floatDot 3s ease-in-out infinite alternate' }} />
        <text x="149" y="41" fontSize="7" fill={accent} fontFamily="monospace" fillOpacity="0.9">BLOG</text>
        <rect x="140" y="51" width="44" height="14" rx="7" fill={accent2} fillOpacity="0.18" stroke={accent2} strokeOpacity="0.4" strokeWidth="1" style={{ animation: 'floatDot 4s ease-in-out infinite alternate-reverse' }} />
        <text x="147" y="62" fontSize="7" fill={accent2} fontFamily="monospace" fillOpacity="0.9">REELS</text>
        <rect x="140" y="72" width="50" height="14" rx="7" fill={accent} fillOpacity="0.15" stroke={accent} strokeOpacity="0.3" strokeWidth="1" style={{ animation: 'floatDot 3.5s 0.5s ease-in-out infinite alternate' }} />
        <text x="146" y="83" fontSize="7" fill={accent} fontFamily="monospace" fillOpacity="0.8">SCRIPTS</text>
        <rect x="138" y="57" width="2" height="12" rx="1" fill={accent} fillOpacity="0.9" style={{ animation: 'blink 1s step-end infinite' }} />
      </svg>
    ),
  },
  {
    number: '03',
    slug: 'performance-marketing',
    category: 'Performance',
    title: 'Performance Marketing',
    tagline: 'Paid Advertising, Funnels & Distribution',
    description:
      'Paid advertising, funnel management, and distribution: data-led campaigns that convert, and keep converting.',
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
    illustration: (accent, accent2) => (
      <svg viewBox="0 0 220 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="perfGrad1" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor={accent} stopOpacity="0.9" />
            <stop offset="100%" stopColor={accent2} stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="perfGrad2" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor={accent} stopOpacity="0.45" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.08" />
          </linearGradient>
          <radialGradient id="perfGlow" cx="50%" cy="90%" r="60%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <ellipse cx="110" cy="230" rx="120" ry="70" fill="url(#perfGlow)" />
        {[0, 1, 2, 3, 4].map(i => (
          <line key={i} x1="18" y1={40 + i * 48} x2="205" y2={40 + i * 48} stroke="white" strokeOpacity="0.05" strokeWidth="1" />
        ))}
        {[
          { x: 18, h: 80, w: 22 },
          { x: 48, h: 110, w: 22 },
          { x: 78, h: 90, w: 22 },
          { x: 108, h: 140, w: 22 },
          { x: 138, h: 120, w: 22 },
          { x: 168, h: 170, w: 22 },
        ].map((b, i) => (
          <rect key={i} x={b.x} y={240 - b.h} width={b.w} height={b.h} rx="4" fill={i === 5 ? 'url(#perfGrad1)' : 'url(#perfGrad2)'} stroke={i === 5 ? accent : 'transparent'} strokeWidth="1" />
        ))}
        <line x1="14" y1="240" x2="200" y2="240" stroke="white" strokeOpacity="0.15" strokeWidth="1" />
        <path
          d="M29 185 L59 148 L89 162 L119 108 L149 125 L179 68"
          stroke={accent}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          strokeOpacity="0.95"
          style={{ animation: 'lineDrawRight 2.5s ease-out both' }}
        />
        <circle cx="179" cy="68" r="8" fill={accent} stroke="white" strokeWidth="2.5" style={{ animation: 'pulseGlow 1.8s ease-in-out infinite' }} />
        <circle cx="179" cy="68" r="18" fill={accent} fillOpacity="0.12" style={{ animation: 'pulseGlow 1.8s ease-in-out infinite' }} />
        <rect x="140" y="40" width="60" height="22" rx="11" fill={accent} fillOpacity="0.22" stroke={accent} strokeWidth="1" strokeOpacity="0.8" />
        <text x="153" y="55" fontSize="11" fill={accent} fontFamily="monospace" fontWeight="bold">+ROI</text>
        <text x="18" y="28" fontSize="9" fill="white" fillOpacity="0.35" fontFamily="monospace">ROAS</text>
        <text x="18" y="42" fontSize="14" fill={accent} fillOpacity="0.9" fontFamily="monospace" fontWeight="bold">4.2x</text>
      </svg>
    ),
  },
  {
    number: '04',
    slug: 'social-media-management',
    category: 'Social',
    title: 'End-to-End Social Media Management',
    tagline: 'Full Management & Scaling Optimisation',
    description:
      'Overall end-to-end social media management plus scaling optimisation, your brand, alive online, and built to grow.',
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
    illustration: (accent, accent2) => (
      <svg viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <radialGradient id="socialGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <ellipse cx="110" cy="80" rx="100" ry="60" fill="url(#socialGlow)" />
        {[
          { x2: 50, y2: 40 },
          { x2: 170, y2: 40 },
          { x2: 55, y2: 125 },
          { x2: 170, y2: 125 },
          { x2: 195, y2: 80 },
          { x2: 25, y2: 80 },
        ].map((l, i) => (
          <line key={i} x1="110" y1="80" x2={l.x2} y2={l.y2} stroke={i % 2 === 0 ? accent : accent2} strokeOpacity="0.3" strokeWidth="1" strokeDasharray="4 3" style={{ animation: `dashAnim ${3 + i * 0.4}s linear infinite` }} />
        ))}
        {[
          { cx: 50, cy: 40 },
          { cx: 170, cy: 40 },
          { cx: 55, cy: 125 },
          { cx: 170, cy: 125 },
          { cx: 195, cy: 80 },
          { cx: 25, cy: 80 },
        ].map((p, i) => (
          <g key={i}>
            <circle cx={p.cx} cy={p.cy} r="14" fill="rgba(10,18,45,0.85)" stroke={i % 2 === 0 ? accent : accent2} strokeWidth="1" strokeOpacity="0.5" />
            <circle cx={p.cx} cy={p.cy} r="5" fill={i % 2 === 0 ? accent : accent2} fillOpacity="0.6" style={{ animation: `pulseOpacity ${2 + i * 0.3}s ease-in-out infinite alternate` }} />
          </g>
        ))}
        <circle cx="110" cy="80" r="20" fill="rgba(10,18,50,0.95)" stroke={accent} strokeWidth="1.5" strokeOpacity="0.8" />
        <circle cx="110" cy="80" r="12" fill={accent} fillOpacity="0.15" style={{ animation: 'pulseGlow 2.5s ease-in-out infinite' }} />
        <path
          d="M103 80C103 76 106 73 110 73C114 73 117 76 117 80C117 83 115 85.5 112 86.5V90H108V86.5C105 85.5 103 83 103 80Z"
          fill={accent}
          fillOpacity="0.9"
        />
        <rect x="143" y="57" width="34" height="18" rx="9" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1" strokeOpacity="0.6" style={{ animation: 'floatDot 3s ease-in-out infinite alternate' }} />
        <text x="152" y="70" fontSize="9" fill={accent} fontFamily="monospace">+99</text>
      </svg>
    ),
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
    illustration: (accent, accent2) => (
      <svg viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <radialGradient id="influGlow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.18" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <ellipse cx="110" cy="80" rx="100" ry="60" fill="url(#influGlow)" />
        {/* Megaphone */}
        <path d="M40 68L85 50V110L40 92V68Z" fill="rgba(10,18,45,0.9)" stroke={accent} strokeWidth="1.5" strokeOpacity="0.7" />
        <path d="M85 50L130 34V126L85 110" fill="rgba(10,18,45,0.9)" stroke={accent2} strokeWidth="1.5" strokeOpacity="0.6" />
        <path d="M52 92V104C52 110 57 115 63 115" stroke={accent} strokeWidth="2" strokeLinecap="round" style={{ animation: 'pulseOpacity 2.4s ease-in-out infinite alternate' }} />
        {/* Broadcast rings */}
        {[26, 40, 54].map((r, i) => (
          <path
            key={i}
            d={`M130 ${80 - r * 0.55} A ${r} ${r} 0 0 1 130 ${80 + r * 0.55}`}
            stroke={accent2}
            strokeOpacity={0.5 - i * 0.13}
            strokeWidth="1.5"
            fill="none"
            style={{ animation: `pulseOpacity ${2 + i * 0.5}s ease-in-out infinite alternate` }}
          />
        ))}
        {/* Satellite avatar nodes (creators) */}
        {[
          { cx: 160, cy: 40 },
          { cx: 190, cy: 80 },
          { cx: 160, cy: 120 },
        ].map((p, i) => (
          <g key={i}>
            <circle cx={p.cx} cy={p.cy} r="13" fill="rgba(10,18,45,0.9)" stroke={accent} strokeWidth="1" strokeOpacity="0.55" />
            <circle cx={p.cx} cy={p.cy} r="5" fill={accent} fillOpacity="0.55" style={{ animation: `floatDot ${3 + i}s ease-in-out infinite alternate` }} />
          </g>
        ))}
        {/* Location pin for offline */}
        <path d="M40 30C40 24 35 20 30 20C25 20 20 24 20 30C20 37 30 45 30 45C30 45 40 37 40 30Z" fill="rgba(10,18,45,0.9)" stroke={accent2} strokeWidth="1.5" />
        <circle cx="30" cy="29" r="4" fill={accent2} fillOpacity="0.7" />
      </svg>
    ),
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
    illustration: (accent, accent2) => (
      <svg viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="eventGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.8" />
            <stop offset="100%" stopColor={accent2} stopOpacity="0.6" />
          </linearGradient>
          <radialGradient id="eventGlow" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <ellipse cx="110" cy="100" rx="100" ry="60" fill="url(#eventGlow)" />
        <path d="M110 30L40 145L180 145Z" fill={accent} fillOpacity="0.05" />
        <path d="M110 30L60 145" stroke={accent} strokeOpacity="0.12" strokeWidth="1" />
        <path d="M110 30L160 145" stroke={accent} strokeOpacity="0.12" strokeWidth="1" />
        <path d="M110 30L85 145" stroke={accent2} strokeOpacity="0.08" strokeWidth="1" />
        <path d="M110 30L135 145" stroke={accent2} strokeOpacity="0.08" strokeWidth="1" />
        <rect x="40" y="133" width="140" height="14" rx="3" fill="rgba(10,18,45,0.85)" stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
          <line
            key={i}
            x1="110"
            y1="62"
            x2={110 + (i % 2 === 0 ? 25 : 15) * Math.cos((deg * Math.PI) / 180)}
            y2={62 + (i % 2 === 0 ? 25 : 15) * Math.sin((deg * Math.PI) / 180)}
            stroke={i % 2 === 0 ? accent : accent2}
            strokeOpacity={i % 2 === 0 ? 0.55 : 0.25}
            strokeWidth={i % 2 === 0 ? 2 : 1}
            style={{ transformOrigin: '110px 62px', animation: `spinStar 12s linear infinite` }}
          />
        ))}
        <circle cx="110" cy="62" r="13" fill="rgba(10,18,45,0.95)" stroke="url(#eventGrad)" strokeWidth="2" />
        <circle cx="110" cy="62" r="5" fill={accent} fillOpacity="0.85" style={{ animation: 'pulseGlow 2s ease-in-out infinite' }} />
        <rect x="45" y="118" width="130" height="4" rx="2" fill="rgba(255,255,255,0.07)" />
        <rect x="45" y="118" width="0" height="4" rx="2" fill="url(#eventGrad)" fillOpacity="0.8" style={{ animation: 'progressFill 3s ease-out 0.5s both' }} />
        {[45, 85, 125, 170].map((x, i) => (
          <circle key={i} cx={x} cy="120" r="5" fill={i < 3 ? accent : 'rgba(255,255,255,0.12)'} stroke="rgba(10,18,45,0.9)" strokeWidth="1.5" style={{ animation: `milestoneIn 0.4s ${i * 0.2}s both ease-out` }} />
        ))}
      </svg>
    ),
  },
  {
    number: '07',
    slug: 'consultation-business-development',
    category: 'Growth',
    title: 'Personalised Content Consultation & Business Development',
    tagline: '1:1 Tailored Strategy & Growth',
    description:
      'Personalised content consultation with 1:1 tailored business development, direct, hands-on strategy for where you want to go next.',
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
    illustration: (accent, accent2) => (
      <svg viewBox="0 0 320 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="bizGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor={accent} stopOpacity="0.8" />
            <stop offset="100%" stopColor={accent2} stopOpacity="0.5" />
          </linearGradient>
          <radialGradient id="bizGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <ellipse cx="160" cy="80" rx="155" ry="65" fill="url(#bizGlow)" />
        {[
          { x: 65, y: 55 },
          { x: 255, y: 55 },
          { x: 65, y: 115 },
          { x: 255, y: 115 },
          { x: 160, y: 130 },
        ].map((n, i) => (
          <line key={i} x1="160" y1="80" x2={n.x} y2={n.y} stroke={i % 2 === 0 ? accent : accent2} strokeOpacity="0.25" strokeWidth="1" strokeDasharray="5 4" style={{ animation: `dashAnim ${4 + i * 0.5}s linear infinite` }} />
        ))}
        {[
          { cx: 65, cy: 55, r: 16 },
          { cx: 255, cy: 55, r: 16 },
          { cx: 65, cy: 115, r: 14 },
          { cx: 255, cy: 115, r: 14 },
          { cx: 160, cy: 130, r: 12 },
        ].map((n, i) => (
          <g key={i}>
            <circle cx={n.cx} cy={n.cy} r={n.r} fill="rgba(8,15,40,0.9)" stroke={i % 2 === 0 ? accent : accent2} strokeWidth="1" strokeOpacity="0.5" />
            <circle cx={n.cx} cy={n.cy} r={Math.round(n.r * 0.4)} fill={i % 2 === 0 ? accent : accent2} fillOpacity="0.55" style={{ animation: `pulseOpacity ${2.5 + i * 0.4}s ease-in-out infinite alternate` }} />
          </g>
        ))}
        <circle cx="160" cy="80" r="25" fill="rgba(8,15,40,0.95)" stroke={accent} strokeWidth="2" strokeOpacity="0.85" />
        <circle cx="160" cy="80" r="14" fill={accent} fillOpacity="0.15" style={{ animation: 'pulseGlow 2s ease-in-out infinite' }} />
        <path d="M150 85L158 75L166 80L174 68" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M170 68L174 68L174 72" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
        <rect x="195" y="25" width="62" height="22" rx="11" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1" strokeOpacity="0.6" style={{ animation: 'floatDot 3.5s ease-in-out infinite alternate' }} />
        <text x="204" y="40" fontSize="10" fill={accent} fontFamily="monospace" fontWeight="bold">+240%</text>
        {[0, 1, 2, 3, 4].map(i => (
          <line key={i} x1={30 + i * 65} y1="10" x2={30 + i * 65} y2="150" stroke={accent} strokeOpacity="0.04" strokeWidth="1" />
        ))}
      </svg>
    ),
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
  @keyframes apertureGlow {
    0%, 100% { opacity: 0.55; transform: scale(1); }
    50%      { opacity: 1; transform: scale(1.12); }
  }
`;
