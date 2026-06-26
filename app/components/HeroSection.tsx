'use client';

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Ripple = { x: number; y: number; r: number; alpha: number };

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const chevronRef = useRef<HTMLSpanElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const textInnerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const cubeInnerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    ripplesRef.current = [
      ...ripplesRef.current.slice(-7),
      { x: e.clientX - rect.left, y: e.clientY - rect.top, r: 0, alpha: 0.35 },
    ];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const resize = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const ctx = canvas.getContext('2d')!;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ripplesRef.current = ripplesRef.current.filter(rip => rip.alpha > 0);
      for (const rip of ripplesRef.current) {
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${rip.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        rip.r += 2.5;
        rip.alpha -= 0.008;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

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
      
      // Text letters appearing from left to right
      const chars = textInnerRef.current?.querySelectorAll('.hero-char');
      if (chars) {
        gsap.fromTo(chars,
          { opacity: 0, x: -30, filter: 'blur(10px)' },
          { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
        );
      }

      // Cube dropping in and settling
      gsap.fromTo(cubeInnerRef.current,
        { opacity: 0, y: -80 },
        { opacity: 1, y: 0, duration: 2.5, ease: 'power3.out', delay: 0.5, onComplete: () => {
          // Start continuous floating
          gsap.to(cubeInnerRef.current, {
            y: -15,
            repeat: -1,
            yoyo: true,
            duration: 3,
            ease: 'sine.inOut'
          });
        }}
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !bgRef.current || !textRef.current || !cubeRef.current) return;

    const triggerConfig = { trigger: section, start: 'top top', end: 'bottom top', scrub: true };

    const st1 = gsap.to(bgRef.current, { y: -80, ease: 'none', scrollTrigger: triggerConfig });
    const st2 = gsap.to(textRef.current, { y: -60, ease: 'none', scrollTrigger: triggerConfig });
    const st3 = gsap.to(cubeRef.current, { y: -40, ease: 'none', scrollTrigger: triggerConfig });

    return () => {
      st1.scrollTrigger?.kill();
      st2.scrollTrigger?.kill();
      st3.scrollTrigger?.kill();
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
        <Image
          src="/landing.png"
          alt="LS Digitaize"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Layer 1.5: The Floating Cube */}
      <div ref={cubeRef} className="absolute inset-0 z-[5] pointer-events-none">
        <div ref={cubeInnerRef} className="absolute inset-0">
          <Image
            src="/hero-over.png"
            alt="Cube Overlay"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Layer 2: canvas ripple */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none"
      />

      {/* Layer 3: display text */}
      <div
        ref={textRef}
        className="absolute left-0 right-0 z-20 text-center pointer-events-none"
        style={{ bottom: '30vh' }}
      >
        <div ref={textInnerRef}>
          <span
            className="uppercase tracking-[0.22em] select-none"
          style={{
            fontFamily: 'var(--font-sevone)',
            fontSize: 'clamp(3rem, 9vw, 11rem)',
            fontWeight: 900,
            color: 'var(--brand-navy)',
            textShadow: '0 2px 40px rgba(26,39,68,0.18), 0 1px 0 rgba(255,255,255,0.25)',
            letterSpacing: '0.22em',
          }}
        >
          {"LS DigitAIze".split('').map((char, i) => (
            <span key={i} className="hero-char inline-block opacity-0" style={{ whiteSpace: 'pre' }}>
              {char}
            </span>
          ))}
        </span>
        </div>
      </div>

      {/* Layer 4: bottom gradient — fades seamlessly into DigitalSection */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-40"
        style={{
          height: '45vh',
          background: 'linear-gradient(to top, #B8D4E8 0%, #B8D4E8 8%, #C8DFF0cc 35%, #C8DFF088 55%, transparent 100%)',
        }}
      />

      {/* Layer 6: scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-50">
        <span className="text-[10px] tracking-[0.35em] uppercase text-navy/50">
          SCROLL DOWN
        </span>
        <span ref={chevronRef} className="text-navy/50 text-base inline-block">
          ↓
        </span>
      </div>
    </section>
  );
}
