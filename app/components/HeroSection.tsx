'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useReducedMotion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

/*
 * Lamp-head anchor. The StreetLamp SVG (viewBox 0 0 360 900) places its bulb at
 * fraction (0.783, 0.122) of the viewBox. The SVG is vh-sized and bottom-anchored,
 * so the bulb lands at:
 *   desktop (h-[86vh], left-[2vw]): x = 2vw + 0.783*(0.4*86vh) = 2vw + 26.9vh, y = 14vh + 10.5vh = 24.5vh
 *   mobile  (h-[74vh], left-[1vw]): x = 1vw + 23.2vh,                          y = 26vh + 9vh    = 35vh
 * Beam divs and the particle spawner both derive from these values — change them together.
 */
const BEAM_ANCHOR_CLASS =
  'left-[calc(1vw+23.2vh)] top-[35vh] md:left-[calc(2vw+26.9vh)] md:top-[24.5vh]';

const NOISE_URI =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* Dust motes sinking through the lamplight, along the cone axis (down-right). */
function ConeParticles({ lit }: { lit: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!lit) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let raf = 0;
    type Mote = { x: number; y: number; vx: number; vy: number; r: number; life: number; decay: number };
    const motes: Mote[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawn = () => {
      const W = canvas.width;
      const H = canvas.height;
      const md = W >= 768;
      // mirror of BEAM_ANCHOR_CLASS in canvas pixels
      const bx = md ? 0.02 * W + 0.269 * H : 0.01 * W + 0.232 * H;
      const by = md ? 0.245 * H : 0.35 * H;
      motes.push({
        x: bx + Math.random() * W * 0.04,
        y: by + Math.random() * H * 0.03,
        vx: 0.3 + Math.random() * 0.9,
        vy: 0.5 + Math.random() * 1.1,
        r: 0.3 + Math.random() * 1.5,
        life: 1,
        decay: 0.003 + Math.random() * 0.006,
      });
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (Math.random() < 0.35 && motes.length < 90) spawn();
      for (let i = motes.length - 1; i >= 0; i--) {
        const p = motes[i];
        p.x += p.vx + (Math.random() - 0.5) * 0.3;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0 || p.y > canvas.height) {
          motes.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(126,193,245,${(p.life * 0.6).toFixed(3)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [lit]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />;
}

/* Flat-vector street lamp: dark silhouette lit only by its own bulb. */
function StreetLamp({ reduce }: { reduce: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 360 900"
      className="absolute bottom-0 left-[1vw] md:left-[2vw] h-[74vh] md:h-[86vh] w-auto overflow-visible"
      aria-hidden="true"
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.6 : 0.9, ease: 'easeOut' }}
    >
      <defs>
        <radialGradient id="lampHalo">
          <stop offset="0%" stopColor="#F2F6FC" stopOpacity="1" />
          <stop offset="35%" stopColor="#7EC1F5" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#4A9EFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bulbGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#BFE0FF" />
        </linearGradient>
        <filter id="haloBlur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      {/* pole + base */}
      <rect x="52" y="120" width="14" height="716" rx="4" fill="#111c33" />
      <rect x="30" y="822" width="58" height="14" rx="4" fill="#111c33" />
      <rect x="18" y="836" width="82" height="18" rx="5" fill="#111c33" />

      {/* curved arm sweeping right */}
      <path d="M59 132 Q59 58 152 56 L246 64" fill="none" stroke="#111c33" strokeWidth="14" strokeLinecap="round" />

      {/* hood, mouth facing down-right at the beam angle */}
      <path d="M238 48 L326 74 L306 120 L250 100 Z" fill="#111c33" />
      <path d="M238 48 L326 74" stroke="#22314f" strokeWidth="3" fill="none" />

      {/* bulb + halo: flicker on as one unit */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: reduce ? 1 : [0, 1, 0.2, 1, 0.1, 0.85, 1] }}
        transition={
          reduce
            ? { delay: 0.3, duration: 0.6 }
            : { delay: 0.9, duration: 0.9, times: [0, 0.12, 0.2, 0.35, 0.45, 0.7, 1], ease: 'linear' }
        }
      >
        <motion.ellipse
          cx="284"
          cy="118"
          rx="150"
          ry="112"
          fill="url(#lampHalo)"
          filter="url(#haloBlur)"
          animate={reduce ? undefined : { opacity: [1, 0.93, 1] }}
          transition={reduce ? undefined : { delay: 3, duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <ellipse cx="282" cy="110" rx="20" ry="12" fill="url(#bulbGrad)" />
      </motion.g>
    </motion.svg>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const chevronRef = useRef<HTMLSpanElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(false);
  // useReducedMotion is false during SSR; only honor it after mount so the
  // first client render matches the server HTML (avoids hydration mismatch).
  const prefersReduce = useReducedMotion() ?? false;
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const reduce = mounted && prefersReduce;

  useEffect(() => {
    if (reduce || !chevronRef.current) return;
    const tween = gsap.to(chevronRef.current, {
      y: 8,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: 'power1.inOut',
    });
    return () => {
      tween.kill();
    };
  }, [reduce]);

  useEffect(() => {
    const section = sectionRef.current;
    if (reduce || !section || !lightRef.current || !textRef.current) return;

    const triggerConfig = { trigger: section, start: 'top top', end: 'bottom top', scrub: true };

    const st1 = gsap.to(lightRef.current, { y: -30, ease: 'none', scrollTrigger: triggerConfig });
    const st2 = gsap.to(textRef.current, { y: -60, ease: 'none', scrollTrigger: triggerConfig });

    return () => {
      st1.scrollTrigger?.kill();
      st2.scrollTrigger?.kill();
    };
  }, [reduce]);

  // Entry choreography: lamp resolves out of darkness, flickers on, the cone
  // pours out, light pools on the ground, then the text steps into the light.
  const beamTransition = reduce
    ? { delay: 0.3, duration: 0.6 }
    : { delay: 1.6, duration: 1.0, ease: 'easeOut' as const };

  const fadeUp = (delay: number) =>
    reduce
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.6, delay: 0.3 },
        }
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: [0.25, 1, 0.3, 1] as const },
        };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
      style={{ backgroundColor: '#05070c' }}
    >
      {/* Layer 0: night backdrop — vignette + film grain */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 90% at 20% 20%, #060a14 0%, #05070c 55%, #04060a 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
          style={{ backgroundImage: NOISE_URI, backgroundSize: '256px 256px' }}
        />
      </div>

      {/* Layer 1: the light scene */}
      <div ref={lightRef} className="absolute inset-0 z-10 pointer-events-none">
        {/* wide soft cone */}
        <motion.div
          className={`absolute w-[96vw] h-[78vh] md:w-[86vw] md:h-[100vh] ${BEAM_ANCHOR_CLASS}`}
          initial={{ opacity: 0, scale: 0.25 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={beamTransition}
          style={{
            transformOrigin: 'top left',
            background:
              'linear-gradient(140deg, rgba(74,158,255,0.55) 0%, rgba(74,158,255,0.20) 45%, transparent 82%)',
            clipPath: 'polygon(0% 0%, 10% 0%, 100% 70%, 100% 100%, 38% 100%)',
            filter: 'blur(44px)',
            mixBlendMode: 'screen',
          }}
        />
        {/* hot core */}
        <motion.div
          className={`absolute w-[74vw] h-[68vh] md:w-[66vw] md:h-[88vh] ${BEAM_ANCHOR_CLASS}`}
          initial={{ opacity: 0, scale: 0.25 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={beamTransition}
          onAnimationComplete={() => setLit(true)}
          style={{
            transformOrigin: 'top left',
            background:
              'linear-gradient(140deg, rgba(242,246,252,0.34) 0%, rgba(74,158,255,0.18) 50%, transparent 90%)',
            clipPath: 'polygon(0% 0%, 5% 0%, 96% 78%, 78% 100%, 48% 100%)',
            filter: 'blur(22px)',
            mixBlendMode: 'screen',
          }}
        />
        {/* bright bloom at the bulb — carries the "shiny" white core into the cone */}
        <motion.div
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full w-[40vw] h-[38vh] md:w-[32vw] md:h-[44vh] ${BEAM_ANCHOR_CLASS}`}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={beamTransition}
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(191,224,255,0.4) 32%, rgba(74,158,255,0.2) 58%, transparent 78%)',
            filter: 'blur(46px)',
            mixBlendMode: 'screen',
          }}
        />
        {/* pool of light where the cone lands */}
        <motion.div
          className="absolute left-[2vw] bottom-[-4vh] w-[76vw] h-[40vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduce ? { delay: 0.3, duration: 0.6 } : { delay: 2.0, duration: 0.8, ease: 'easeOut' }}
          style={{
            background:
              'radial-gradient(ellipse at 35% 55%, rgba(74,158,255,0.26) 0%, rgba(74,158,255,0.09) 45%, transparent 74%)',
            filter: 'blur(32px)',
            mixBlendMode: 'screen',
          }}
        />
        <StreetLamp reduce={reduce} />
        {!reduce && <ConeParticles lit={lit} />}
      </div>

      {/* Layer 3: display text + supporting content — left column, hero-scale headline */}
      <div
        ref={textRef}
        className="absolute inset-0 z-50 flex flex-col justify-center px-8 md:px-16 pointer-events-none"
      >
        <div className="w-full max-w-screen-2xl mx-auto flex justify-start md:justify-end">
          <div className="flex flex-col items-start text-left max-w-2xl w-full mt-24 md:mt-0 md:pl-12 lg:pl-24">
            <motion.p
              {...fadeUp(2.3)}
              className="uppercase tracking-[0.35em] sm:tracking-[0.4em] text-[9px] sm:text-xs mb-2 sm:mb-3 font-semibold"
              style={{ color: '#7EC1F5' }}
            >
              Full-Spectrum Digital Marketing
            </motion.p>

            <motion.div {...fadeUp(2.4)}>
              <motion.span
                className="uppercase select-none block"
                initial={{
                  textShadow:
                    '0 0 40px rgba(74,158,255,0), 0 0 90px rgba(74,158,255,0), 0 2px 30px rgba(0,0,0,0.5)',
                }}
                animate={{
                  textShadow:
                    '0 0 40px rgba(74,158,255,0.35), 0 0 90px rgba(74,158,255,0.15), 0 2px 30px rgba(0,0,0,0.5)',
                }}
                transition={reduce ? { delay: 0.3, duration: 0.6 } : { delay: 2.6, duration: 0.8, ease: 'easeOut' }}
                style={{
                  fontFamily: 'var(--font-sevone)',
                  fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                  fontWeight: 700,
                  color: '#F2F6FC',
                  lineHeight: 0.92,
                  letterSpacing: '0.01em',
                }}
              >
                LS DigitAIze
              </motion.span>
            </motion.div>

            <motion.h2
              {...fadeUp(2.5)}
              className="mt-2 sm:mt-3 text-lg sm:text-2xl font-bold uppercase tracking-wide leading-relaxed max-w-md"
              style={{ color: '#F2F6FC' }}
            >
              We can make your <br />
              <span style={{ color: '#7EC1F5' }}>business stand out</span> <br />
              even in the dark.
            </motion.h2>

            <motion.p
              {...fadeUp(2.6)}
              className="mt-3 sm:mt-4 text-xs sm:text-sm font-medium leading-loose max-w-[280px] md:max-w-sm"
              style={{ color: 'rgba(242,246,252,0.85)' }}
            >
              We build brand identity, content, and performance systems for brands bold enough to matter. A-to-Z, handled.
            </motion.p>

            <motion.div
              {...fadeUp(2.7)}
              className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-start gap-5 sm:gap-6 pointer-events-auto w-full"
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-3 sm:px-8 sm:py-4 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-bold transition-all duration-500 hover:scale-105"
                style={{ background: '#F2F6FC', color: '#05070c' }}
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-[#05070c]">Start a Project</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#05070c]">→</span>
                <div className="absolute inset-0 z-0 bg-[#7EC1F5] translate-y-[100%] transition-transform duration-500 ease-in-out group-hover:translate-y-0" />
              </Link>
              <Link
                href="/services"
                className="group inline-flex flex-col items-start gap-1 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-semibold transition-colors duration-300 hover:text-white mt-2 sm:mt-0"
                style={{ color: 'rgba(242,246,252,0.7)' }}
              >
                Explore Services
                <span className="block w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Layer 4: bottom gradient — fades seamlessly into DigitalSection */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-40"
        style={{
          height: '45vh',
          background: 'linear-gradient(to top, #000000 0%, #000000 8%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0.5) 55%, transparent 100%)',
        }}
      />


    </section>
  );
}
