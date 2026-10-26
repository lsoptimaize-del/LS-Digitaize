'use client';

import { useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import MediaSlot from './MediaSlot';

const STEPS = [
  {
    number: '01',
    title: 'Discover',
    category: 'Research',
    description: 'We dig into your brand, market, and goals before touching a single pixel or campaign. No guesswork.',
    accent: '#4A9EFF',
    slot: 'process-discover',
  },
  {
    number: '02',
    title: 'Strategize',
    category: 'Strategy',
    description: 'A roadmap built around what actually moves your numbers. Not trends for their own sake.',
    accent: '#2A7DE1',
    slot: 'process-strategize',
  },
  {
    number: '03',
    title: 'Create',
    category: 'Execution',
    description: 'Identity, content, and campaigns come to life. Crafted to feel inevitable, not generic.',
    accent: '#1F9AB8',
    slot: 'process-create',
  },
  {
    number: '04',
    title: 'Launch & Grow',
    category: 'Growth',
    description: 'We ship, measure, and iterate relentlessly. Growth is a system, not a one-off push.',
    accent: '#5BC9E8',
    slot: 'process-launch',
  },
];

const NOISE_URI =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const NOTE_TILT = [-3, 2.5, -2, 3];
const EASE = [0.22, 1, 0.36, 1] as const;

const subscribeLg = (cb: () => void) => {
  const mq = window.matchMedia('(min-width: 1024px)');
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};

/*
  Four video cards slide in alternately from above and below. Once they've landed, the
  paper notes arrive from the same directions and stick on top of them.
*/
export default function ProcessSection() {
  // On desktop all four cards enter together (staggered); on mobile each enters on its own scroll.
  const isLg = useSyncExternalStore(
    subscribeLg,
    () => window.matchMedia('(min-width: 1024px)').matches,
    () => false,
  );
  const reduceMotion = useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      mq.addEventListener('change', cb);
      return () => mq.removeEventListener('change', cb);
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  );

  return (
    <section className="relative overflow-hidden" style={{ background: '#FAFAF7', padding: 'clamp(4rem, 10vh, 8rem) 0' }}>
      <div className="max-w-screen-xl mx-auto px-5 md:px-12">
        <div className="mb-12 md:mb-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            className="uppercase tracking-[0.4em] mb-5 font-mono text-sm md:text-base"
            style={{ color: '#4A9EFF' }}
          >
            How We Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: [0.25, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-sevone)',
              fontSize: 'clamp(2.8rem, 7vw, 6rem)',
              color: '#0A0A0A',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
            }}
          >
            Four Moves.<br />One Growth Engine.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-24 pb-20">
          {STEPS.map((step, i) => {
            const fromTop = i % 2 === 0;
            const dir = fromTop ? -1 : 1;
            const cardDelay = isLg ? i * 0.18 : 0;
            const noteDelay = isLg ? 1.0 + i * 0.18 : 0.7;

            return (
              // The trigger lives on this wrapper (never translated), so cards/notes that start
              // off-screen below still fire; children animate through variants.
              <motion.div
                key={step.number}
                className="relative"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: isLg ? 0.25 : 0.4 }}
              >
                {/* video card */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: reduceMotion ? 0 : dir * 420, rotate: reduceMotion ? 0 : dir * 6 },
                    show: { opacity: 1, y: 0, rotate: 0, transition: { duration: reduceMotion ? 0.4 : 1.1, delay: cardDelay, ease: EASE } },
                  }}
                  className="rounded-[1.5rem] p-2"
                  style={{
                    background: '#fff',
                    border: `1px solid ${step.accent}33`,
                    boxShadow: `0 30px 70px -28px ${step.accent}99`,
                  }}
                >
                  <MediaSlot slot={step.slot} accent={step.accent} rounded="1.15rem" className="w-full" />
                </motion.div>

                {/* paper note, lands on the card */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: reduceMotion ? 0 : dir * 360, rotate: reduceMotion ? NOTE_TILT[i] : NOTE_TILT[i] + dir * 14, scale: reduceMotion ? 1 : 1.08 },
                    show: { opacity: 1, y: 0, rotate: NOTE_TILT[i], scale: 1, transition: { duration: reduceMotion ? 0.4 : 0.9, delay: noteDelay, ease: EASE } },
                  }}
                  className="absolute z-10 left-[7%] right-[-3%] -bottom-14"
                  style={{ transformOrigin: '50% 0%' }}
                >
                  {/* outer carries the drop-shadow so the clipped (folded) corner still casts one */}
                  <div
                    className="relative"
                    style={{ filter: 'drop-shadow(0 22px 16px rgba(90,64,0,0.22)) drop-shadow(0 3px 3px rgba(90,64,0,0.18))' }}
                  >
                    <div
                      className="relative px-5 pt-7 pb-6 overflow-hidden"
                      style={{
                        background: 'linear-gradient(162deg, #FFF7C9 0%, #FFEFA3 55%, #FBE483 100%)',
                        borderRadius: 2,
                        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%)',
                      }}
                    >
                      {/* paper grain + soft light falloff */}
                      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.22] mix-blend-multiply" style={{ backgroundImage: NOISE_URI, backgroundSize: '180px 180px' }} />
                      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(120% 90% at 15% 0%, rgba(255,255,255,0.55) 0%, transparent 60%)' }} />

                      <div className="relative flex items-baseline justify-between gap-3">
                        <h3
                          className="leading-none"
                          style={{ fontFamily: 'var(--font-caveat)', fontWeight: 700, fontSize: 'clamp(1.9rem, 2.4vw, 2.3rem)', color: '#1B2440' }}
                        >
                          {step.title}
                        </h3>
                        <span className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: 'rgba(27,36,64,0.55)' }}>
                          No. {step.number}
                        </span>
                      </div>
                      {/* hand-drawn underline */}
                      <svg aria-hidden viewBox="0 0 120 8" className="relative mt-1 w-24 h-2" fill="none">
                        <path d="M2 5 C 22 1, 44 7, 66 3 S 105 5, 118 2" stroke={step.accent} strokeWidth="2.2" strokeLinecap="round" />
                      </svg>
                      <p
                        className="relative mt-3 text-[0.8rem]"
                        style={{
                          color: 'rgba(27,36,64,0.82)',
                          lineHeight: '1.5rem',
                          backgroundImage: 'repeating-linear-gradient(transparent 0, transparent calc(1.5rem - 1px), rgba(150,110,0,0.2) calc(1.5rem - 1px), rgba(150,110,0,0.2) 1.5rem)',
                        }}
                      >
                        {step.description}
                      </p>
                    </div>

                    {/* folded corner */}
                    <span
                      aria-hidden
                      className="absolute right-0 bottom-0 w-7 h-7"
                      style={{
                        background: 'linear-gradient(135deg, #D9BE55 0%, #F7E68E 55%, #FFF3B4 100%)',
                        clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                        boxShadow: 'inset 0 0 0 0.5px rgba(120,90,0,0.2)',
                      }}
                    />

                    {/* washi tape */}
                    <span
                      aria-hidden
                      className="absolute -top-3 left-1/2 w-20 h-6"
                      style={{
                        transform: 'translateX(-50%) rotate(-3deg)',
                        background: `repeating-linear-gradient(115deg, ${step.accent}59 0 6px, ${step.accent}40 6px 12px)`,
                        borderLeft: '1px dashed rgba(255,255,255,0.7)',
                        borderRight: '1px dashed rgba(255,255,255,0.7)',
                        backdropFilter: 'blur(1.5px)',
                      }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
