'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VisionScreen from "../components/VisionScreen";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const VALUES = [
  {
    symbol: '✦',
    title: 'Curated Over Crowded',
    body: 'We choose clients like we choose ideas — with intention. A smaller roster means every brand gets our full creative firepower.',
  },
  {
    symbol: '◈',
    title: 'Bold Over Safe',
    body: 'Safe is forgettable. We push until it feels like something — then we push a little more. The brands we work with deserve nothing less.',
  },
  {
    symbol: '⬡',
    title: 'Full-Spectrum Thinking',
    body: 'We don\'t silo. Brand, content, performance, social — they feed each other. We see the whole picture so nothing falls between the cracks.',
  },
  {
    symbol: '◎',
    title: 'Growth With Roots',
    body: 'Viral moments are fun. Sustainable growth is the point. We build ecosystems, not just campaigns.',
  },
];


// Corner portraits that fan out around Tejas. Last one is a placeholder until a photo exists.
const CORNERS = [
  { pos: 'tl', name: 'Bharath', role: 'Creative Director', image: '/team/bharath.jpg', tilt: 0 },
  { pos: 'tr', name: 'Prayansh', role: 'Marketing Strategist', image: '/team/prayansh.jpg', tilt: 0 },
  { pos: 'bl', name: 'Sahil', role: 'Lead Developer', image: '/team/sahil.jpg', tilt: 0 },
  { pos: 'br', name: 'Your name here', role: 'Photo coming soon', image: '', tilt: 0 },
];

export default function AboutPage() {
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const videoLayerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  // No carousel state needed for the static 3-column layout

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero cutout animation
      if (heroWrapperRef.current && maskRef.current) {
        gsap.to(maskRef.current, {
          y: '-100%',
          ease: 'none',
          scrollTrigger: {
            trigger: heroWrapperRef.current,
            start: 'top top',
            end: '+=100%', // Completes animation during the first 100vh of scroll
            scrub: true,
          }
        });
      }

      // Once the white card has fully cleared, the video layer lifts away in ~1s (time-based, reversible).
      if (heroWrapperRef.current && videoLayerRef.current) {
        const layer = videoLayerRef.current;
        const video = layer.querySelector('video');
        const lift = gsap.to(layer, {
          yPercent: -100,
          duration: 1,
          ease: 'power3.inOut',
          paused: true,
          onComplete: () => {
            gsap.set(layer, { visibility: 'hidden' });
            video?.pause();
          },
        });
        ScrollTrigger.create({
          trigger: heroWrapperRef.current,
          start: 'top -100%',
          onEnter: () => lift.play(),
          onLeaveBack: () => {
            gsap.set(layer, { visibility: 'visible' });
            video?.play().catch(() => {});
            lift.reverse();
          },
        });
      }

      // Team scene: Tejas eases down in size while the four portraits fan out from behind him into the corners.
      if (heroWrapperRef.current && sceneRef.current) {
        const scene = sceneRef.current;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroWrapperRef.current,
            start: 'top -100%',
            end: 'top -250%',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo('.scene-tejas', { scale: 1.16 }, { scale: 0.8, ease: 'power2.inOut', duration: 1 }, 0);

        gsap.utils.toArray<HTMLElement>('.corner-card').forEach((el, i) => {
          // offset* ignore transforms, so these stay correct across refreshes
          const toCenter = () => ({
            x: scene.offsetWidth / 2 - (el.offsetLeft + el.offsetWidth / 2),
            y: scene.offsetHeight / 2 - (el.offsetTop + el.offsetHeight / 2),
          });
          tl.fromTo(
            el,
            { x: () => toCenter().x, y: () => toCenter().y, scale: 0.4, opacity: 0 },
            { x: 0, y: 0, scale: 1, opacity: 1, rotate: CORNERS[i].tilt, ease: 'power3.out', duration: 0.85 },
            0.12 + i * 0.09,
          );
        });
        tl.fromTo('.corner-label', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.05 }, 0.95);
      }

    }); // removed scope so it searches the whole page

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ minHeight: '100dvh', background: '#FAFAF7' }}>
      <Navbar />

      {/* ── Scroll-Linked Video Cutout Hero ── */}
      <div ref={heroWrapperRef} style={{ position: 'relative', height: '350vh' }}>
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100dvh',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: '#FAFAF7', // Fallback color before video loads
        }}>
          {/* ── Team scene (underneath) ── */}
          <div
            ref={sceneRef}
            className="team-scene"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: [
                'radial-gradient(45% 50% at 50% 48%, rgba(74,158,255,0.38) 0%, rgba(74,158,255,0.12) 55%, transparent 100%)',
                'radial-gradient(40% 45% at 0% 0%, rgba(126,193,245,0.55) 0%, transparent 100%)',
                'radial-gradient(40% 45% at 100% 100%, rgba(42,125,225,0.32) 0%, transparent 100%)',
                'radial-gradient(35% 40% at 100% 0%, rgba(126,193,245,0.35) 0%, transparent 100%)',
                'linear-gradient(180deg, #EAF3FF 0%, #D9E9FB 100%)',
              ].join(', '),
            }}
          >
            {CORNERS.map((m) => (
              <div key={m.pos} className={`corner-card corner-${m.pos}`} style={{ opacity: 0, willChange: 'transform, opacity' }}>
                {m.image ? (
                  <img src={m.image} alt={m.name} className="corner-img" />
                ) : (
                  <div className="corner-placeholder">
                    <span className="corner-plus">+</span>
                  </div>
                )}
                <div className="corner-label">
                  <p className="corner-name">{m.name}</p>
                  <p className="corner-role">{m.role}</p>
                </div>
              </div>
            ))}

            <div className="scene-tejas" style={{ position: 'relative', zIndex: 5, willChange: 'transform' }}>
              <div className="tejas-frame">
                <img src="/Tejas.png" alt="Tejas G., Founder & CEO" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div className="tejas-caption">
                <p className="corner-name" style={{ color: '#0d1e38' }}>Tejas G.</p>
                <p className="corner-role" style={{ color: '#2A7DE1' }}>Founder &amp; CEO</p>
              </div>
            </div>
          </div>

          {/* ── Video layer: lifts away after the white card clears ── */}
          <div ref={videoLayerRef} style={{ position: 'absolute', inset: 0, zIndex: 10, willChange: 'transform' }}>
          {/* Background Video */}
          <video
            src="/thrid.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
            }}
          />

          {/* Light Theme Mask with Screen Blend Mode */}
          <div
            ref={maskRef}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#FAFAF7',
              mixBlendMode: 'screen',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingTop: '72px', // clear the fixed navbar
              boxSizing: 'border-box',
              willChange: 'transform',
            }}
          >
            {/* ABOUT US */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '1.5rem 0' }}>
              <p style={{
                fontFamily: 'inherit',
                fontSize: '1rem',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: '#000',
                margin: 0,
                fontWeight: 700,
              }}>
                ABOUT US
              </p>
            </div>

            {/* Row 1: WE EXIST */}
            <div style={{
              borderTop: '1px solid rgba(0,0,0,0.12)',
              borderBottom: '1px solid rgba(0,0,0,0.12)',
              display: 'flex',
              justifyContent: 'center',
              padding: '0.5rem 0',
              width: '100%',
            }}>
              <h1 style={{
                fontFamily: 'var(--font-sevone)',
                fontSize: 'clamp(3rem, min(16vw, 24vh), 15rem)',
                fontWeight: 900,
                color: '#000',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                margin: 0,
              }}>
                WE EXIST
              </h1>
            </div>

            {/* Row 2: TO */}
            <div style={{
              borderBottom: '1px solid rgba(0,0,0,0.12)',
              display: 'flex',
              justifyContent: 'center',
              padding: '0.5rem 0',
              width: '100%',
            }}>
              <h1 style={{
                fontFamily: 'var(--font-sevone)',
                fontSize: 'clamp(2.5rem, min(12vw, 18vh), 11rem)',
                fontWeight: 900,
                color: '#000',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                margin: 0,
              }}>
                TO
              </h1>
            </div>

            {/* Row 3: IGNITE BRANDS */}
            <div className="hero-row-3" style={{
              borderBottom: '1px solid rgba(0,0,0,0.12)',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.5rem clamp(1rem, 4vw, 2rem)',
              width: '100%',
            }}>
              <h1 className="hero-text-split" style={{
                fontFamily: 'var(--font-sevone)',
                fontWeight: 900,
                color: '#000',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                margin: 0,
              }}>
                IGNITE
              </h1>
              <h1 className="hero-text-split" style={{
                fontFamily: 'var(--font-sevone)',
                fontWeight: 900,
                color: '#000',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                margin: 0,
              }}>
                BRANDS
              </h1>
            </div>
          </div>

          </div>
        </div>
      </div>


      <style>{`
          /* --- Hero Section & CEO Section Restored Styles --- */
          .hero-text-split {
            font-size: clamp(3rem, min(10.5vw, 24vh), 15rem) !important;
          }

          @media (max-width: 768px) {
            .ceo-section {
              flex-direction: column !important;
              text-align: center;
              padding: 1.5rem !important;
              gap: 0.5rem !important;
            }
            .ceo-photo {
              width: 70vw !important;
              max-width: 320px !important; 
              padding: 0.5rem !important;
              margin-bottom: 1rem !important;
            }
            .ceo-text h2 {
              font-size: clamp(2.5rem, 10vw, 3.5rem) !important;
              margin-bottom: 0.5rem !important;
              line-height: 0.9 !important;
            }
            .ceo-text p {
              font-size: clamp(0.95rem, 4vw, 1.15rem) !important;
              line-height: 1.45 !important;
            }
            .ceo-text p:last-child {
              margin-top: 1rem !important;
            }
            .hero-row-3 {
              flex-direction: column !important;
              align-items: center !important;
            }
            .hero-text-split {
              font-size: clamp(5rem, 22vw, 15rem) !important;
            }
          }
          /* --- Team scene --- */
          .tejas-frame {
            width: clamp(13rem, 28vw, 26rem);
            aspect-ratio: 3 / 4;
            padding: 10px;
            background: linear-gradient(145deg, #1a1a1a 0%, #050505 100%);
            box-shadow: 0 45px 90px -25px rgba(8,20,50,0.6), 0 6px 14px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.16);
          }
          .tejas-frame img { background: #dfe8f5; outline: 1px solid rgba(255,255,255,0.14); outline-offset: -1px; }
          .tejas-caption { text-align: center; margin-top: 1rem; }
          .corner-name {
            font-family: var(--font-sevone);
            font-size: clamp(1rem, 1.5vw, 1.35rem);
            font-weight: 900;
            line-height: 1;
            margin: 0;
            color: #fff;
          }
          .corner-role {
            font-family: var(--font-geist-mono);
            font-size: clamp(0.55rem, 0.75vw, 0.7rem);
            letter-spacing: 0.18em;
            text-transform: uppercase;
            font-weight: 700;
            margin: 0.35rem 0 0;
            color: #7EC1F5;
          }
          .corner-card {
            position: absolute;
            z-index: 3;
            width: clamp(7.5rem, 17vw, 16rem);
            aspect-ratio: 4 / 5;
            padding: 8px;
            background: linear-gradient(145deg, #1a1a1a 0%, #050505 100%);
            box-shadow: 0 32px 64px -22px rgba(8,20,50,0.6), 0 4px 10px rgba(0,0,0,0.28), inset 0 0 0 1px rgba(255,255,255,0.16);
          }
          .corner-tl { top: clamp(5.5rem, 16vh, 9rem); left: clamp(0.75rem, 5vw, 6rem); }
          .corner-tr { top: clamp(5.5rem, 16vh, 9rem); right: clamp(0.75rem, 5vw, 6rem); }
          .corner-bl { bottom: clamp(1.5rem, 7vh, 4rem); left: clamp(0.75rem, 5vw, 6rem); }
          .corner-br { bottom: clamp(1.5rem, 7vh, 4rem); right: clamp(0.75rem, 5vw, 6rem); }
          .corner-img { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; outline: 1px solid rgba(255,255,255,0.14); outline-offset: -1px; }
          .corner-label {
            position: absolute;
            left: 8px; right: 8px; bottom: 8px;
            padding: 2.2rem 0.75rem 0.7rem;
            background: linear-gradient(to top, rgba(5,10,24,0.88) 0%, rgba(5,10,24,0.45) 55%, transparent 100%);
          }
          .corner-placeholder {
            width: 100%; height: 100%;
            display: flex; align-items: center; justify-content: center;
            background: linear-gradient(135deg, rgba(74,158,255,0.18) 0%, rgba(250,250,247,0.9) 60%, rgba(74,158,255,0.12) 100%);
            border: 1.5px dashed rgba(74,158,255,0.6);
          }
          .corner-placeholder .corner-plus { font-size: clamp(2rem, 4vw, 3.5rem); color: #4A9EFF; font-weight: 300; line-height: 1; }
          .corner-br .corner-label { background: linear-gradient(to top, rgba(5,10,24,0.72) 0%, rgba(5,10,24,0.3) 60%, transparent 100%); }
          /* --------------------------------------------------- */
      `}</style>
          



      <VisionScreen />

      <Footer />
    </div>
  );
}
