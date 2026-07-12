'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, Variants, useReducedMotion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const NOISE_URI =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* Ported from the LSO hero's DoorParticles — same spawn/drift/decay, recolored blue. */
function DoorParticles({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const ctx = canvas.getContext('2d')!;
    type P = { x: number; y: number; vx: number; vy: number; r: number; life: number; decay: number };
    const particles: P[] = [];
    let raf: number;

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (activeRef.current && Math.random() < 0.5) {
        // spawn from the door's right edge — door sits near the left side of the screen
        particles.push({
          x: 10 + Math.random() * 40,
          y: canvas.height * 0.22 + Math.random() * canvas.height * 0.56,
          vx: Math.random() * 1.4 + 0.35,
          vy: (Math.random() - 0.5) * 0.55,
          r: Math.random() * 1.6 + 0.3,
          life: 1,
          decay: 1 / (65 + Math.random() * 85),
        });
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74,158,255,${(p.life * 0.68).toFixed(3)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 2 }} />;
}

export default function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const prefersReduce = useReducedMotion() ?? false;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setReady(true);
  }, []);

  const reduce = mounted && prefersReduce;

  useEffect(() => {
    if (reduce || !chevronRef.current) return;
    const tween = gsap.to(chevronRef.current, { y: 8, repeat: -1, yoyo: true, duration: 0.8, ease: 'power1.inOut' });
    return () => {
      tween.kill();
    };
  }, [reduce]);

  useEffect(() => {
    const section = sectionRef.current;
    if (reduce || !section || !bgRef.current || !textRef.current) return;
    const triggerConfig = { trigger: section, start: 'top top', end: 'bottom top', scrub: true };
    const st1 = gsap.to(bgRef.current, { y: -30, ease: 'none', scrollTrigger: triggerConfig });
    const st2 = gsap.to(textRef.current, { y: -60, ease: 'none', scrollTrigger: triggerConfig });
    return () => {
      st1.scrollTrigger?.kill();
      st2.scrollTrigger?.kill();
    };
  }, [reduce]);

  const doorVariants: Variants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } }
    : {
        hidden: { rotateY: 90, opacity: 0 },
        visible: { rotateY: 25, opacity: 1, transition: { duration: 1.5, ease: 'easeOut' } },
      };

  const beamVariants: Variants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } }
    : {
        hidden: { opacity: 0, scaleX: 0 },
        visible: { opacity: 1, scaleX: 1, transition: { duration: 1.2, delay: 0.3, ease: 'easeOut' } },
      };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: reduce ? 0 : 0.15, delayChildren: reduce ? 0.2 : 0.8 } },
  };

  const fadeUp: Variants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } }
    : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } } };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen text-white overflow-hidden flex flex-col justify-between"
      style={{ backgroundColor: '#05070c' }}
    >
      {/* Background visuals: door + volumetric beam, ported from the LSO hero */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden flex items-center">
        {/* wide soft beam */}
        <motion.div
          variants={beamVariants}
          initial="hidden"
          animate={ready ? 'visible' : 'hidden'}
          className="absolute left-0 h-[140vh] w-[80vw] origin-left"
          style={{
            background: 'linear-gradient(90deg, rgba(74,158,255,0.4) 0%, rgba(74,158,255,0.1) 40%, transparent 100%)',
            clipPath: 'polygon(0% 35%, 100% 0%, 100% 100%, 0% 65%)',
            filter: 'blur(40px)',
            mixBlendMode: 'screen',
          }}
        />

        {/* core beam */}
        <motion.div
          variants={beamVariants}
          initial="hidden"
          animate={ready ? 'visible' : 'hidden'}
          className="absolute left-0 h-[100vh] w-[60vw] origin-left"
          style={{
            background: 'linear-gradient(90deg, rgba(126,193,245,0.3) 0%, rgba(74,158,255,0.15) 50%, transparent 100%)',
            clipPath: 'polygon(0% 42%, 100% 20%, 100% 80%, 0% 58%)',
            filter: 'blur(20px)',
            mixBlendMode: 'overlay',
          }}
        />

        {/* the door */}
        <div className="absolute left-[-50px] md:left-0 h-full flex items-center" style={{ perspective: '1000px' }}>
          <motion.div
            variants={doorVariants}
            initial="hidden"
            animate={ready ? 'visible' : 'hidden'}
            className="w-[120px] md:w-[200px] h-[60vh] bg-[#d0e6ff] relative"
            style={{
              transformOrigin: 'left center',
              boxShadow: `
                0 0 50px 10px rgba(126,193,245,0.8),
                0 0 100px 20px #7EC1F5,
                0 0 200px 50px rgba(74,158,255,0.6)
              `,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#b0d8ff] via-[#7EC1F5] to-[#4A9EFF] opacity-90" />
          </motion.div>
        </div>

        {/* continuous door particles */}
        {!reduce && <DoorParticles active={ready} />}

        {/* ambient noise */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: NOISE_URI, backgroundSize: '256px 256px' }} />
      </div>

      {/* Hero content */}
      <div
        ref={textRef}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex-grow flex items-end md:items-center justify-start md:justify-end pb-12 md:pb-0"
      >
        {/* mobile dark gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent md:hidden pointer-events-none -z-10" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={ready ? 'visible' : 'hidden'}
          className="max-w-xl text-left md:ml-auto md:w-1/2 pt-10"
        >
          <motion.p
            variants={fadeUp}
            className="uppercase tracking-[0.35em] sm:tracking-[0.4em] text-[9px] sm:text-xs mb-4 sm:mb-6 font-semibold"
            style={{ color: '#7EC1F5' }}
          >
            Full-Spectrum Digital Marketing
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="uppercase select-none mb-6 drop-shadow-xl"
            style={{
              fontFamily: 'var(--font-sevone)',
              fontSize: 'clamp(3rem, 8vw, 6.5rem)',
              fontWeight: 700,
              color: '#F2F6FC',
              lineHeight: 0.95,
              letterSpacing: '0.01em',
            }}
          >
            LS DigitAIze
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-xl sm:text-2xl italic font-medium mb-8"
            style={{ fontFamily: 'Georgia, serif', color: 'rgba(242,246,252,0.85)' }}
          >
            The creative standard
          </motion.p>

          <motion.div variants={fadeUp} className="max-w-md mb-8">
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(242,246,252,0.85)' }}>
              We build brand identity, content, and performance systems for brands bold enough to matter. A-to-Z, handled.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-5 sm:gap-6 justify-start">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-3 sm:px-8 sm:py-4 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-bold transition-all duration-500 hover:scale-105"
              style={{ background: '#F2F6FC', color: '#05070c' }}
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-[#05070c]">Start a Project</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#05070c]">→</span>
              <div className="absolute inset-0 z-0 bg-[#7EC1F5] translate-y-[100%] transition-transform duration-500 ease-in-out group-hover:translate-y-0" />
            </Link>
            <Link
              href="/services"
              className="group inline-flex flex-col items-center gap-1 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-semibold transition-colors duration-300 hover:text-white mt-2 sm:mt-0"
              style={{ color: 'rgba(242,246,252,0.7)' }}
            >
              Explore Services
              <span className="block w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* bottom gradient — fades seamlessly into DigitalSection */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
        style={{
          height: '45vh',
          background: 'linear-gradient(to top, #000000 0%, #000000 8%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0.5) 55%, transparent 100%)',
        }}
      />

      {/* scroll indicator */}
      <div className="hidden md:flex absolute bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-20">
        <span className="text-[10px] tracking-[0.35em] uppercase text-white/50">SCROLL DOWN</span>
        <span ref={chevronRef} className="text-white/50 text-base inline-block">
          ↓
        </span>
      </div>
    </section>
  );
}
