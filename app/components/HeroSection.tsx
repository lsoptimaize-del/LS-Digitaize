'use client';

import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const GLOW_SIZE = 420;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const chevronRef = useRef<HTMLSpanElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Slow, lagging cursor glow
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const glowX = useSpring(mouseX, { damping: 40, stiffness: 35, mass: 1 });
  const glowY = useSpring(mouseY, { damping: 40, stiffness: 35, mass: 1 });
  const glowLeft = useTransform(glowX, (v) => v - GLOW_SIZE / 2);
  const glowTop = useTransform(glowY, (v) => v - GLOW_SIZE / 2);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (!chevronRef.current) return;
    gsap.to(chevronRef.current, {
      y: 8,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: 'power1.inOut',
    });
  }, []);

  useEffect(() => {
    // Initial entry animations
    const ctx = gsap.context(() => {
      // Background subtle zoom out and unblur
      gsap.fromTo(bgRef.current,
        { scale: 1.05, filter: 'blur(8px)' },
        { scale: 1, filter: 'blur(0px)', duration: 2.5, ease: 'power3.out' }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !bgRef.current || !textRef.current) return;

    const triggerConfig = { trigger: section, start: 'top top', end: 'bottom top', scrub: true };

    const st1 = gsap.to(bgRef.current, { y: -80, ease: 'none', scrollTrigger: triggerConfig });
    const st2 = gsap.to(textRef.current, { y: -60, ease: 'none', scrollTrigger: triggerConfig });

    return () => {
      st1.scrollTrigger?.kill();
      st2.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Layer 1: background */}
      <div ref={bgRef} className="absolute inset-0">
        <video
          src="/herobg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Layer 2: slow cursor-follow glow */}
      <motion.div
        aria-hidden="true"
        className="absolute z-10 pointer-events-none rounded-full"
        style={{
          left: glowLeft,
          top: glowTop,
          width: GLOW_SIZE,
          height: GLOW_SIZE,
          background: 'radial-gradient(circle, rgba(74,158,255,0.20) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Layer 3: display text + supporting content */}
      <div
        ref={textRef}
        className="absolute inset-0 z-50 flex flex-col justify-end px-6 md:px-16 pb-24 md:pb-32 pointer-events-none"
      >
        <div className="w-full max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center md:items-end justify-between gap-10 md:gap-12 text-center md:text-left">
          {/* Left Column: Titles */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.15, ease: [0.25, 1, 0.3, 1] }}
              className="uppercase tracking-[0.35em] sm:tracking-[0.4em] text-[9px] sm:text-xs mb-4 sm:mb-6 font-semibold"
              style={{ color: '#7EC1F5' }}
            >
              Full-Spectrum Digital Marketing
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.25, ease: [0.25, 1, 0.3, 1] }}
            >
              <span
                className="uppercase select-none block"
                style={{
                  fontFamily: 'var(--font-sevone)',
                  fontSize: 'clamp(2.75rem, 12vw, 8rem)',
                  fontWeight: 500,
                  color: '#F2F6FC',
                  lineHeight: 0.9,
                  letterSpacing: '0.02em',
                  textShadow: '0 2px 30px rgba(0,0,0,0.5)',
                }}
              >
                LS DigitAIze
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.35, ease: [0.25, 1, 0.3, 1] }}
              className="mt-3 sm:mt-4 text-xl sm:text-4xl italic font-medium"
              style={{ fontFamily: 'Georgia, serif', color: 'rgba(242,246,252,0.85)' }}
            >
              The creative standard
            </motion.p>
          </div>

          {/* Right Column: Description & CTAs */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right max-w-md w-full mt-6 md:mt-0 mx-auto md:mx-0">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.45, ease: [0.25, 1, 0.3, 1] }}
              className="text-xs sm:text-sm font-medium leading-loose mb-8 md:mb-8 max-w-[280px] md:max-w-none"
              style={{ color: 'rgba(242,246,252,0.85)' }}
            >
              We build brand identity, content, and performance systems for brands bold enough to matter. A-to-Z, handled.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.55, ease: [0.25, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-5 sm:gap-6 pointer-events-auto w-full"
            >
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

      {/* Layer 6: scroll indicator */}
      <div className="hidden md:flex absolute bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-50">
        <span className="text-[10px] tracking-[0.35em] uppercase text-white/50">
          SCROLL DOWN
        </span>
        <span ref={chevronRef} className="text-white/50 text-base inline-block">
          ↓
        </span>
      </div>
    </section>
  );
}
