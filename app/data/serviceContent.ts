export type Usp = { title: string; val: string; sub: string; desc: string; icon: string };

export type ServiceContent = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  heroCopy: string;
  heroStats: [{ label: string; value: string }, { label: string; value: string }];
  usps: Usp[];
  explainer: {
    eyebrow: string;
    heading: string;
    highlight: string;
    body: string;
    oldTitle: string;
    oldPoints: string[];
    newTitle: string;
    newPoints: string[];
    stats: { val: string; label: string }[];
  };
  cta: { heading: string; highlight: string; subtext: string; button: string };
};

export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  'branding-identity': {
    eyebrow: 'Brand Architecture',
    titleLine1: 'A brand people',
    titleLine2: 'remember.',
    heroCopy:
      'Logo, language and look, built as one system so your brand feels inevitable everywhere it shows up.',
    heroStats: [
      { label: 'Touchpoints', value: 'Consistent' },
      { label: 'Delivery', value: 'A to Z' },
    ],
    usps: [
      { title: 'One System, Not Loose Assets', val: '1 Source', sub: 'Of Truth', desc: 'Logo, colour, type and voice are built together, so every touchpoint feels like the same brand.', icon: 'layers' },
      { title: 'Strategy Before Style', val: 'First', sub: 'Positioning', desc: 'We define who you are for and why you are different before a single logo sketch is drawn.', icon: 'target' },
      { title: 'Built To Be Used', val: 'Editable', sub: 'Asset Library', desc: 'Your team gets a living guide and ready templates, so consistency survives without us in the room.', icon: 'grid' },
    ],
    explainer: {
      eyebrow: 'The Difference',
      heading: 'A Logo Is Not',
      highlight: 'A Brand',
      body: 'Most identities stop at a mark and a colour. We carry the idea through voice, rollout and everyday assets, so people recognise you before they read your name.',
      oldTitle: 'A Logo Job',
      oldPoints: ['A mark and two colours', 'No rules for using them', 'Every designer reinterprets it', 'Looks different on every platform'],
      newTitle: 'A Brand System',
      newPoints: ['Strategy, mark, type and voice as one', 'Guidelines anyone can follow', 'Templates for every touchpoint', 'Recognisable at a glance, everywhere'],
      stats: [
        { val: 'A–Z', label: 'Scope' },
        { val: '1', label: 'Source of truth' },
        { val: '100%', label: 'Consistent' },
        { val: 'Day 1', label: 'Team-ready' },
      ],
    },
    cta: {
      heading: 'Let\'s build the brand',
      highlight: 'they remember.',
      subtext: 'We do this for you. Tell us about your business and we will build the identity around it.',
      button: 'Start My Brand',
    },
  },

  'organic-marketing': {
    eyebrow: 'Content Engine',
    titleLine1: 'Content that',
    titleLine2: 'compounds.',
    heroCopy:
      'A steady organic engine, from strategy to publishing, so your brand stays present without burning you out.',
    heroStats: [
      { label: 'Cadence', value: 'Always on' },
      { label: 'Production', value: 'In-house' },
    ],
    usps: [
      { title: 'Always On', val: 'Steady', sub: 'Cadence', desc: 'A production pipeline, not a heroic sprint, so posting never depends on one person’s energy.', icon: 'calendar' },
      { title: 'Strategy Behind Every Post', val: 'Goal-led', sub: 'Planning', desc: 'Every piece maps to an audience and an outcome instead of just filling a calendar.', icon: 'target' },
      { title: 'Platform-Native Craft', val: 'In-house', sub: 'Production', desc: 'Shoots, edits and copy made for each platform, so quality holds as volume grows.', icon: 'camera' },
    ],
    explainer: {
      eyebrow: 'The Shift',
      heading: 'Posting Is Not',
      highlight: 'A Strategy',
      body: 'Consistent posting without direction just makes noise. We connect the calendar to a narrative, so the audience you build is one you own.',
      oldTitle: 'Random Posting',
      oldPoints: ['Ideas the night before', 'Inconsistent look and tone', 'Gaps whenever the team is busy', 'Likes with no direction'],
      newTitle: 'Content Engine',
      newPoints: ['A plan tied to real goals', 'One narrative across channels', 'A pipeline that never goes quiet', 'An owned, growing audience'],
      stats: [
        { val: 'Plan', label: 'Strategised' },
        { val: 'Shoot', label: 'Produced in-house' },
        { val: 'Cut', label: 'Platform-native' },
        { val: 'Post', label: 'Managed daily' },
      ],
    },
    cta: {
      heading: 'Hand us the calendar.',
      highlight: 'We\'ll keep it full.',
      subtext: 'We do this for you. Share your goals and we will keep your brand present every single week.',
      button: 'Start My Engine',
    },
  },

  'performance-marketing': {
    eyebrow: 'Paid Growth',
    titleLine1: 'Ads that',
    titleLine2: 'earn their spend.',
    heroCopy:
      'Data-led paid acquisition plus the funnels behind it, so every click has somewhere profitable to go.',
    heroStats: [
      { label: 'Focus', value: 'Unit economics' },
      { label: 'Reporting', value: 'Transparent' },
    ],
    usps: [
      { title: 'Funnel, Not Just Ads', val: 'End-to-end', sub: 'Click to customer', desc: 'We build the landing pages and journeys that turn clicks into customers, not only the ads that buy them.', icon: 'funnel' },
      { title: 'Budget Follows Proof', val: 'Data-led', sub: 'Reallocation', desc: 'Spend moves toward what converts and away from what does not, week after week.', icon: 'chart' },
      { title: 'Numbers You Can Read', val: 'Clear', sub: 'Reporting', desc: 'Plain-language reports tied to cost per acquisition and revenue, not vanity metrics.', icon: 'target' },
    ],
    explainer: {
      eyebrow: 'The Difference',
      heading: 'Spending Is Not',
      highlight: 'Performing',
      body: 'Boosting posts and hoping is not a strategy. We test, measure and scale, so paid becomes a predictable pipeline instead of a monthly gamble.',
      oldTitle: 'Boost & Hope',
      oldPoints: ['Broad targeting, wide guesses', 'Traffic sent to a homepage', 'Reports full of impressions', 'Budget stuck on what is not working'],
      newTitle: 'Performance System',
      newPoints: ['Tight audiences and creative tests', 'Purpose-built landing funnels', 'Reports tied to revenue', 'Budget moved to the winners'],
      stats: [
        { val: 'Test', label: 'Creative & audience' },
        { val: 'Track', label: 'Every conversion' },
        { val: 'Scale', label: 'What works' },
        { val: 'Report', label: 'In plain words' },
      ],
    },
    cta: {
      heading: 'Put the budget',
      highlight: 'where it performs.',
      subtext: 'We do this for you. Tell us your target and your budget, and we will build the funnel around them.',
      button: 'Start Growing',
    },
  },

  'social-media-management': {
    eyebrow: 'Social Command',
    titleLine1: 'Always on,',
    titleLine2: 'always growing.',
    heroCopy:
      'A complete, always-on social presence: content, community and reporting, tuned continuously as the numbers move.',
    heroStats: [
      { label: 'Presence', value: 'Always on' },
      { label: 'Optimisation', value: 'Continuous' },
    ],
    usps: [
      { title: 'One Team, Every Platform', val: 'Unified', sub: 'Presence', desc: 'Calendars, posting and replies handled together, so your brand sounds like one voice everywhere.', icon: 'grid' },
      { title: 'A Community That Answers', val: 'Fast', sub: 'Response', desc: 'Comments and DMs handled quickly and on-brand, turning followers into advocates.', icon: 'chat' },
      { title: 'Optimised As We Go', val: 'Always', sub: 'Scaling', desc: 'We read the numbers every month and adjust the plan, instead of setting it and forgetting it.', icon: 'chart' },
    ],
    explainer: {
      eyebrow: 'The Shift',
      heading: 'Managing Pages Is Not',
      highlight: 'Building A Community',
      body: 'Scheduling posts keeps a page alive. Growing one takes listening, replying and improving every month. We handle the whole loop.',
      oldTitle: 'Page Upkeep',
      oldPoints: ['Posts on a schedule', 'Comments left unanswered', 'Reports once a quarter', 'The same plan all year'],
      newTitle: 'Social Command Centre',
      newPoints: ['Content tuned to each platform', 'Community replied to promptly', 'Monthly performance reviews', 'Plan adjusted as the data moves'],
      stats: [
        { val: 'Plan', label: 'Calendar per platform' },
        { val: 'Post', label: 'Published for you' },
        { val: 'Engage', label: 'Community handled' },
        { val: 'Scale', label: 'Optimised monthly' },
      ],
    },
    cta: {
      heading: 'Give the feed',
      highlight: 'a full-time team.',
      subtext: 'We do this for you. Hand over the feed and we will run it, grow it and report back.',
      button: 'Start My Social',
    },
  },

  'influencer-offline-marketing': {
    eyebrow: 'Reach Beyond The Feed',
    titleLine1: 'Voices people',
    titleLine2: 'already trust.',
    heroCopy:
      'Creator partnerships and offline activations run as one connected push, on the screen and off it.',
    heroStats: [
      { label: 'Channels', value: 'On + offline' },
      { label: 'Approach', value: 'One story' },
    ],
    usps: [
      { title: 'Creators That Fit', val: 'Vetted', sub: 'Sourcing', desc: 'We shortlist voices your audience actually follows and negotiate the deal end to end.', icon: 'handshake' },
      { title: 'Managed, Not Just Booked', val: 'Tracked', sub: 'Deliverables', desc: 'Briefs, approvals and posting handled, so campaigns land on time and on message.', icon: 'users' },
      { title: 'Online Meets Offline', val: 'One story', sub: 'Both worlds', desc: 'Print, outdoor and ground activations planned alongside the digital push.', icon: 'pin' },
    ],
    explainer: {
      eyebrow: 'The Difference',
      heading: 'A Shoutout Is Not',
      highlight: 'A Campaign',
      body: 'One creator post fades in a day. A connected campaign, with the right voices online and a real presence offline, keeps compounding.',
      oldTitle: 'One-off Shoutout',
      oldPoints: ['Random creator picks', 'Loose verbal agreements', 'Nothing linked to offline', 'No report afterward'],
      newTitle: 'Connected Campaign',
      newPoints: ['Creators matched to your audience', 'Clear contracts and deliverables', 'Offline placements that echo online', 'A post-campaign report'],
      stats: [
        { val: 'Source', label: 'Right creators' },
        { val: 'Manage', label: 'Briefs & approvals' },
        { val: 'Extend', label: 'OOH & ground' },
        { val: 'Report', label: 'What moved' },
      ],
    },
    cta: {
      heading: 'Borrow the trust',
      highlight: 'you haven\'t built yet.',
      subtext: 'We do this for you. Tell us who you want to reach and we will find the voices and the places.',
      button: 'Start A Campaign',
    },
  },

  'events-photography-videography': {
    eyebrow: 'Moments, Captured',
    titleLine1: 'Events people',
    titleLine2: 'talk about.',
    heroCopy:
      'Concept-to-execution event management with in-house photo and video, so every moment is documented as well as it was run.',
    heroStats: [
      { label: 'Coverage', value: 'Photo + video' },
      { label: 'Execution', value: 'Start to finish' },
    ],
    usps: [
      { title: 'Run And Recorded', val: 'In-house', sub: 'Coverage', desc: 'The same team plans the event and captures it, so there is no separate vendor to brief.', icon: 'camera' },
      { title: 'Concept To Curtain', val: 'End-to-end', sub: 'Management', desc: 'Run-of-show, vendors and logistics handled so you can be present at your own event.', icon: 'calendar' },
      { title: 'Content That Keeps Working', val: 'Reused', sub: 'Assets', desc: 'Edited photos and films delivered ready for social, press and your organic calendar.', icon: 'video' },
    ],
    explainer: {
      eyebrow: 'The Shift',
      heading: 'An Event Is Not',
      highlight: 'Just A Day',
      body: 'The best events keep giving long after the lights go down. We plan, run and capture them as one system, so the moment becomes months of content.',
      oldTitle: 'One Day, Then Gone',
      oldPoints: ['Photos nobody edits', 'Vendors who do not talk to each other', 'Coverage bought separately', 'Content that dies after the day'],
      newTitle: 'Moment Engine',
      newPoints: ['One team from plan to post-production', 'Logistics handled end to end', 'Photo and film built into the plan', 'Assets fed into your content calendar'],
      stats: [
        { val: 'Plan', label: 'Concept & run-of-show' },
        { val: 'Run', label: 'Vendors & logistics' },
        { val: 'Capture', label: 'Photo & video' },
        { val: 'Deliver', label: 'Edited assets' },
      ],
    },
    cta: {
      heading: 'Run the room.',
      highlight: 'We\'ll capture it.',
      subtext: 'We do this for you. Tell us the occasion and we will run it and capture every moment.',
      button: 'Plan My Event',
    },
  },

  'consultation-business-development': {
    eyebrow: '1:1 Strategy',
    titleLine1: 'Clear thinking,',
    titleLine2: 'no agency fluff.',
    heroCopy:
      'One-on-one sessions and a tailored roadmap, built around your brand, your market and your goals.',
    heroStats: [
      { label: 'Access', value: 'Direct' },
      { label: 'Output', value: 'Your roadmap' },
    ],
    usps: [
      { title: 'Built Around You', val: '1:1', sub: 'Tailored', desc: 'No template playbook. The strategy starts from your business, your market and your goals.', icon: 'compass' },
      { title: 'Direct Access', val: 'No layers', sub: 'Account management', desc: 'You talk to the people doing the thinking, not a chain of coordinators.', icon: 'users' },
      { title: 'A Plan You Can Act On', val: 'Roadmap', sub: 'Actionable', desc: 'You leave with a growth plan and clear priorities you can start on immediately.', icon: 'target' },
    ],
    explainer: {
      eyebrow: 'The Difference',
      heading: 'Advice Is Not',
      highlight: 'A Plan',
      body: 'Generic tips are everywhere. What moves a business is a plan built on its own numbers, with someone accountable for making it real.',
      oldTitle: 'Generic Advice',
      oldPoints: ['Templates from other industries', 'Layers between you and strategists', 'Ideas without priorities', 'Slides that get filed away'],
      newTitle: 'Tailored Roadmap',
      newPoints: ['Strategy from your own numbers', 'Direct access to strategists', 'Clear priorities and next steps', 'A roadmap you can act on now'],
      stats: [
        { val: 'Audit', label: 'Content & channels' },
        { val: '1:1', label: 'Sessions with strategists' },
        { val: 'Roadmap', label: 'Tailored growth plan' },
        { val: 'Check-ins', label: 'Ongoing' },
      ],
    },
    cta: {
      heading: 'One hour with us,',
      highlight: 'one clear plan.',
      subtext: 'We do this for you. Book a session and leave with a plan you can start on tomorrow.',
      button: 'Book A Session',
    },
  },
};
