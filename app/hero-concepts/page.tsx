'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate, AnimatePresence } from 'framer-motion';

/* ---------------------------------------------------------- */
/* Shared assets pulled from the existing public/ directory    */
/* ---------------------------------------------------------- */
const TILE_IMAGES = [
  '/service-branding.png',
  '/service-business.png',
  '/service-content.png',
  '/service-events.png',
  '/service-performance.png',
  '/service-social.png',
  '/about-1.png',
  '/about-2.png',
  '/about-3.png',
  '/process-discover.png',
  '/process-strategize.png',
  '/process-create.png',
];

const NAV = [
  { id: 'live-feed', label: '01 — Live Feed' },
  { id: 'the-deck', label: '02 — The Deck' },
  { id: 'split-ledger', label: '03 — Split Ledger' },
];

export default function HeroConceptsPage() {
  return (
    <main className="bg-[#05070c] text-[#F2F6FC]">
      <ConceptNav />
      <LiveFeedConcept />
      <DeckConcept />
      <SplitLedgerConcept />
    </main>
  );
}

/* ---------------------------------------------------------- */
/* Sticky nav so the client can jump between concepts          */
/* ---------------------------------------------------------- */
function ConceptNav() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex gap-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-md px-2 py-2">
      {NAV.map((n) => (
        <a
          key={n.id}
          href={`#${n.id}`}
          className="px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          {n.label}
        </a>
      ))}
    </nav>
  );
}

function ConceptLabel({ n, title, blurb }: { n: string; title: string; blurb: string }) {
  return (
    <div className="absolute top-8 left-6 md:left-10 z-[60] max-w-xs">
      <span
        className="text-[10px] uppercase tracking-[0.35em] font-semibold"
        style={{ color: '#7EC1F5' }}
      >
        Concept {n}
      </span>
      <h2 className="mt-1 text-lg font-semibold">{title}</h2>
      <p className="mt-1 text-xs text-white/50 leading-relaxed">{blurb}</p>
    </div>
  );
}

/* ============================================================
   CONCEPT 1 — LIVE FEED
   Grid of client-work tiles cycling like a broadcast wall.
   Headline sits on top with mix-blend-difference so it always
   reads, regardless of what's under it.
============================================================ */
function LiveFeedConcept() {
  const [activeTile, setActiveTile] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveTile((v) => (v + 1) % TILE_IMAGES.length);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="live-feed" className="relative h-screen overflow-hidden border-b border-white/10">
      <ConceptLabel
        n="01"
        title="Live Feed"
        blurb="A wall of real work, always in motion. One tile pulses forward on rotation — proof over mood."
      />

      {/* Tile grid background */}
      <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 grid-rows-4 md:grid-rows-3">
        {TILE_IMAGES.map((src, i) => (
          <div
            key={src}
            className="relative overflow-hidden"
            style={{
              transition: 'transform 0.9s cubic-bezier(0.25,1,0.3,1), filter 0.9s ease',
              transform: activeTile === i ? 'scale(1.08)' : 'scale(1)',
              filter: activeTile === i ? 'brightness(1.1)' : 'brightness(0.55)',
              zIndex: activeTile === i ? 20 : 1,
            }}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              style={{ opacity: 0.9 }}
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
      </div>

      {/* mix-blend headline layer */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <p
          className="uppercase tracking-[0.4em] text-xs mb-6 font-semibold mix-blend-difference"
          style={{ color: '#ffffff' }}
        >
          Full-Spectrum Digital Marketing
        </p>
        <span
          className="uppercase select-none block mix-blend-difference"
          style={{
            fontFamily: 'var(--font-sevone)',
            fontSize: 'clamp(2.5rem, 10vw, 7rem)',
            fontWeight: 500,
            color: '#ffffff',
            lineHeight: 0.9,
            letterSpacing: '0.02em',
          }}
        >
          LS DigitAIze
        </span>
        <p
          className="mt-6 text-sm sm:text-base max-w-md mix-blend-difference"
          style={{ color: '#ffffff' }}
        >
          We build brand identity, content, and performance systems for brands bold enough to matter.
        </p>
      </div>

      {/* Bottom gradient to match existing hero */}
      <div
        className="absolute bottom-0 left-0 right-0 z-40 pointer-events-none"
        style={{
          height: '35vh',
          background: 'linear-gradient(to top, #000000 0%, rgba(0,0,0,0.7) 40%, transparent 100%)',
        }}
      />
    </section>
  );
}

/* ============================================================
   CONCEPT 2 — THE DECK
   Hero framed as the opening slide of the agency's own pitch —
   tilted mockup, slide counter, margin annotations.
============================================================ */
const DECK_SLIDES = [
  { image: '/hero-over.png', note1: 'client loved this ↴', note2: '↳ CTR +34% in wk 2' },
  { image: '/service-branding.png', note1: 'brand system, v3 ↴', note2: '↳ approved on first pass' },
  { image: '/service-content.png', note1: 'content calendar ↴', note2: '↳ 3x output, same team' },
  { image: '/service-performance.png', note1: 'paid spend curve ↴', note2: '↳ CAC down 21%' },
  { image: '/service-social.png', note1: 'launch week reel ↴', note2: '↳ 1.2M organic reach' },
  { image: '/about-2.png', note1: 'the room, mid-pitch ↴', note2: '↳ signed same day' },
];

function DeckConcept() {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % DECK_SLIDES.length), 2600);
    return () => clearInterval(id);
  }, []);
  const current = DECK_SLIDES[slide];

  return (
    <section id="the-deck" className="relative h-screen overflow-hidden bg-[#05070c] border-b border-white/10">
      <ConceptLabel
        n="02"
        title="The Deck"
        blurb="Presented, not published. The headline behaves like slide copy; the work sits mounted at an angle, mid-pitch."
      />

      {/* faint grid backdrop, like a slide canvas */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #F2F6FC 1px, transparent 1px), linear-gradient(to bottom, #F2F6FC 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-20 h-full w-full max-w-screen-2xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center gap-8 md:gap-16">
        {/* Left: slide-style headline block */}
        <div className="w-full md:w-[46%] pt-28 md:pt-0">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[11px] tracking-[0.3em] uppercase text-white/40 font-mono">
              Slide
            </span>
            <span
              className="text-[11px] tracking-[0.3em] uppercase font-mono font-semibold"
              style={{ color: '#7EC1F5' }}
            >
              {String(slide + 1).padStart(2, '0')} / {String(DECK_SLIDES.length).padStart(2, '0')}
            </span>
          </div>

          <span
            className="uppercase select-none block"
            style={{
              fontFamily: 'var(--font-sevone)',
              fontSize: 'clamp(2.25rem, 6.5vw, 4.5rem)',
              fontWeight: 500,
              color: '#F2F6FC',
              lineHeight: 0.95,
              letterSpacing: '0.01em',
            }}
          >
            The Creative
            <br />
            Standard.
          </span>

          <p className="mt-6 text-sm text-white/60 max-w-sm leading-relaxed">
            We build brand identity, content, and performance systems for brands bold enough to matter. A-to-Z, handled.
          </p>

          <div className="mt-10 flex items-center gap-6">
            <button
              className="rounded-full px-7 py-3 text-[10px] uppercase tracking-[0.25em] font-bold"
              style={{ background: '#F2F6FC', color: '#05070c' }}
            >
              Start a Project
            </button>
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-white/50">
              Explore Services
            </span>
          </div>
        </div>

        {/* Right: tilted mounted mockup */}
        <div className="w-full md:w-[54%] h-[55%] md:h-[70%] relative flex items-center justify-center">
          <div
            className="relative w-[85%] max-w-md aspect-[9/13] rounded-xl overflow-hidden border border-white/10 shadow-2xl"
            style={{
              transform: 'perspective(1400px) rotateY(-10deg) rotateX(4deg) rotate(-2deg)',
              boxShadow: '0 40px 80px -20px rgba(0,0,0,0.7)',
            }}
          >
            <AnimatePresence mode="sync">
              <motion.img
                key={current.image}
                src={current.image}
                alt=""
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* annotation marks — swap with the slide */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`note1-${slide}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.5 }}
              className="absolute top-6 left-0 md:left-2 text-xs italic"
              style={{ fontFamily: 'Georgia, serif', color: '#7EC1F5' }}
            >
              {current.note1}
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key={`note2-${slide}`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="absolute bottom-10 right-0 md:right-2 text-xs italic text-right"
              style={{ fontFamily: 'Georgia, serif', color: '#7EC1F5' }}
            >
              {current.note2}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CONCEPT 3 — SPLIT LEDGER
   Left: slow monochrome marquee of the work as texture.
   Right: a live-style ticking stat column.
   Center: headline with a stamp-like underline on load.
============================================================ */
function SplitLedgerConcept() {
  return (
    <section id="split-ledger" className="relative h-screen overflow-hidden bg-[#05070c] border-b border-white/10">
      <ConceptLabel
        n="03"
        title="Split Ledger"
        blurb="The work as texture on the left, the numbers behind it exposed on the right. A ledger, not a mood board."
      />

      <div className="absolute inset-0 flex">
        {/* Left 2/3: marquee texture */}
        <div className="relative w-[68%] h-full overflow-hidden">
          <div className="marquee-track absolute inset-0 flex flex-col">
            {[...TILE_IMAGES, ...TILE_IMAGES].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="w-full h-40 md:h-56 object-cover grayscale opacity-[0.18]"
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#05070c]" />
        </div>

        {/* Divider */}
        <div className="w-px h-full bg-white/15" />

        {/* Right 1/3: ticking ledger stats */}
        <div className="w-[32%] h-full flex flex-col justify-center gap-10 px-6 md:px-10">
          <StatRow label="Projects shipped" value={214} />
          <StatRow label="Industries served" value={12} />
          <StatRow label="Avg. lift in CTR" value={34} suffix="%" />
          <StatRow label="Years running" value={9} />
        </div>
      </div>

      {/* Center headline with stamp underline */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <p
          className="uppercase tracking-[0.4em] text-xs mb-5 font-semibold"
          style={{ color: '#7EC1F5' }}
        >
          Full-Spectrum Digital Marketing
        </p>
        <span
          className="uppercase select-none block relative"
          style={{
            fontFamily: 'var(--font-sevone)',
            fontSize: 'clamp(2.5rem, 9vw, 6.5rem)',
            fontWeight: 500,
            color: '#F2F6FC',
            lineHeight: 0.9,
            letterSpacing: '0.02em',
            textShadow: '0 2px 30px rgba(0,0,0,0.6)',
          }}
        >
          LS DigitAIze
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 1, ease: [0.65, 0, 0.35, 1] }}
            className="absolute left-0 -bottom-2 md:-bottom-3 h-[6px] md:h-[8px] w-full origin-left"
            style={{ background: '#7EC1F5' }}
          />
        </span>
        <p className="mt-8 text-sm sm:text-base max-w-md text-white/70">
          We build brand identity, content, and performance systems for brands bold enough to matter.
        </p>
      </div>

      <style jsx>{`
        .marquee-track {
          animation: ledgerScroll 34s linear infinite;
        }
        @keyframes ledgerScroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
      `}</style>
    </section>
  );
}

function StatRow({ label, value, suffix = '' }: { label: string; value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        if (ref.current) ref.current.textContent = Math.round(v).toString() + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  return (
    <div className="border-t border-white/10 pt-4">
      <span
        ref={ref}
        className="block text-3xl md:text-4xl font-semibold"
        style={{ fontFamily: 'var(--font-sevone)', color: '#F2F6FC' }}
      >
        0{suffix}
      </span>
      <span className="mt-1 block text-[10px] uppercase tracking-[0.25em] text-white/50">
        {label}
      </span>
    </div>
  );
}
