'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DigitalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = headingRef.current?.querySelectorAll('.text-line');
      
      if (lines) {
        gsap.fromTo(lines,
          { opacity: 0, y: 150, filter: 'blur(24px)', scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            scale: 1,
            duration: 1.5,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              end: 'top -10%',
              scrub: 2,
            }
          }
        );
      }

      // Parallax for the GIF image
      if (imgRef.current) {
        gsap.fromTo(imgRef.current,
          { y: 100, scale: 1.1 },
          {
            y: -50,
            scale: 1.25,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      }

      // Pin DigitalSection so ServicesSection slides over it like a curtain
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'bottom bottom',
        endTrigger: '#services',
        end: 'top top',
        pin: true,
        pinSpacing: false,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-start overflow-hidden min-h-[100svh] md:min-h-screen"
      style={{ backgroundColor: '#000000', paddingTop: 'clamp(0rem, 5vw, 9rem)', paddingBottom: '2rem', zIndex: 0 }}
      id="digital"
    >
      {/* ── Top blend gradient ── */}
      <div 
        className="absolute top-0 left-0 right-0 h-48 md:h-64 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #000000 0%, rgba(0,0,0,0.8) 25%, transparent 100%)' }}
      />

      {/* ── Ambient color blobs ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Top-left blue blob */}
        <div style={{
          position: 'absolute', top: '-10%', left: '-8%',
          width: '55vw', height: '55vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(45, 120, 255, 0.35) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'blobDrift1 14s ease-in-out infinite alternate',
        }} />
        {/* Top-right dark blue blob */}
        <div style={{
          position: 'absolute', top: '-5%', right: '-10%',
          width: '50vw', height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(15,45,130,0.4) 0%, transparent 70%)',
          filter: 'blur(70px)',
          animation: 'blobDrift2 18s ease-in-out infinite alternate',
        }} />
        {/* Centre radial shine */}
        <div style={{
          position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
          width: '70vw', height: '40vw',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(74,158,255,0.18) 0%, transparent 68%)',
          filter: 'blur(40px)',
        }} />
        {/* Bottom-left primary blob */}
        <div style={{
          position: 'absolute', bottom: '5%', left: '5%',
          width: '40vw', height: '40vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(86,136,201,0.22) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'blobDrift3 20s ease-in-out infinite alternate',
        }} />
        {/* Bottom-right deep blue accent */}
        <div style={{
          position: 'absolute', bottom: '10%', right: '0%',
          width: '45vw', height: '45vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(30, 90, 220, 0.25) 0%, transparent 70%)',
          filter: 'blur(65px)',
          animation: 'blobDrift4 16s ease-in-out infinite alternate',
        }} />
      </div>

      {/* ── Heading ── */}
      <div className="relative z-10 flex flex-col items-center text-center w-full -mt-16 md:-mt-8">
        <h2
          ref={headingRef}
          className="text-[24vw] md:text-[9rem] lg:text-[11rem] leading-[0.92] md:leading-[0.85] font-light tracking-[-0.04em] text-white uppercase flex flex-col items-center w-full"
          style={{ fontFamily: 'var(--font-sevone)', textShadow: '0 2px 40px rgba(74,158,255,0.35)' }}
        >
          <span className="block text-line">DIGITAL</span>
          <span className="block text-line">THAT IGNITES</span>
          <span className="block text-line">INTO</span>
          <span className="block text-line">GROWTH</span>
        </h2>
      </div>

      {/* ── GIF — mobile: large + over text; desktop: original position ── */}
      <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180vw] md:w-[75vw] z-20 pointer-events-none flex justify-center">
        <img
          ref={imgRef}
          src="/hero.gif"
          alt="Digital Growth"
          className="w-full h-auto object-contain scale-100 md:scale-125"
          style={{ filter: 'brightness(1.08) saturate(1.1)' }}
        />
      </div>

      {/* Bottom fade so the section bleeds into black */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 md:h-48 pointer-events-none z-20"
        style={{ background: 'linear-gradient(to top, #000000 0%, transparent 100%)' }}
      />

      {/* ── Blob keyframe animations ── */}
      <style>{`
        @keyframes blobDrift1 {
          0%   { transform: translate(0,    0)    scale(1);    }
          100% { transform: translate(4vw,  6vh)  scale(1.12); }
        }
        @keyframes blobDrift2 {
          0%   { transform: translate(0,    0)    scale(1);    }
          100% { transform: translate(-5vw, 8vh)  scale(1.08); }
        }
        @keyframes blobDrift3 {
          0%   { transform: translate(0,    0)    scale(1);    }
          100% { transform: translate(6vw,  -5vh) scale(1.15); }
        }
        @keyframes blobDrift4 {
          0%   { transform: translate(0,    0)    scale(1);    }
          100% { transform: translate(-4vw, -7vh) scale(1.10); }
        }
      `}</style>
    </section>
  );
}
