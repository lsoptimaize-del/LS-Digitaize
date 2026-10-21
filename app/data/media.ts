/*
  Media slots for the landing page.
  Every slot renders a placeholder until `src` is set. To swap one in:
    1. drop the file in /public/media/
    2. set `src` below (e.g. '/media/hero-reel.mp4')
  Video files (.mp4/.webm) autoplay muted + looped. Anything else is treated as an image.
*/
export type MediaSpec = {
  kind: 'video' | 'image';
  /** CSS aspect-ratio, e.g. '4 / 5' */
  ratio: string;
  /** What to generate for this slot — shown on the placeholder */
  brief: string;
  /** Poster / still shown for videos, optional */
  poster?: string;
  src?: string;
};

export const MEDIA: Record<string, MediaSpec> = {
  'hero-reel': {
    kind: 'video', ratio: '9 / 16',
    brief: 'Hero brand reel. Vertical 9:16, 8-12s loop, plays inside a phone',
  },
  'hero-card-a': {
    kind: 'image', ratio: '1 / 1',
    brief: 'Ad creative still: product / brand shot',
  },
  'hero-card-b': {
    kind: 'video', ratio: '1 / 1',
    brief: 'Short social-style clip, 5s loop',
  },

  'service-branding-identity': {
    kind: 'video', ratio: '4 / 5', brief: 'Logo + brand book flat-lay, slow motion',
  },
  'service-organic-marketing': {
    kind: 'video', ratio: '4 / 5', brief: 'Content shoot behind-the-scenes',
  },
  'service-performance-marketing': {
    kind: 'video', ratio: '4 / 5', brief: 'Ad dashboard / growth graph motion',
  },
  'service-social-media-management': {
    kind: 'video', ratio: '4 / 5', brief: 'Feed scroll with branded posts',
  },
  'service-influencer-offline-marketing': {
    kind: 'video', ratio: '4 / 5', brief: 'Creator + offline activation footage',
  },
  'service-events-photography-videography': {
    kind: 'video', ratio: '4 / 5', brief: 'Event highlight cut, camera in motion',
  },
  'service-consultation-business-development': {
    kind: 'video', ratio: '4 / 5', brief: '1:1 strategy session, whiteboard',
  },

  'process-discover': {
    kind: 'video', ratio: '3 / 4', brief: 'Research: notes, moodboards, audit screens',
    src: '/media/process-discover.mp4',
  },
  'process-strategize': {
    kind: 'video', ratio: '3 / 4', brief: 'Roadmap being sketched / mapped',
    src: '/media/process-strategize.mp4',
  },
  'process-create': {
    kind: 'video', ratio: '3 / 4', brief: 'Design + production in progress',
    src: '/media/process-create.mp4',
  },
  'process-launch': {
    kind: 'video', ratio: '3 / 4', brief: 'Launch moment, numbers climbing',
    src: '/media/process-launch.mp4',
  },
};
