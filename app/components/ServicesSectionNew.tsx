'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Service data ─────────────────────────────────────────────── */
const SERVICES = [
  {
    number: '01',
    title: 'A-Z Branding & Identity',
    category: 'Identity',
    description:
      'From logo to language. We create visual systems that make your brand feel inevitable in any room.',
    accent: '#4A9EFF',
    accent2: '#5BC9E8',
    gridClass: '', // Branding: col 1-2, row 1
    illustration: (accent: string, accent2: string) => (
      <svg viewBox="0 0 320 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.9"/>
            <stop offset="100%" stopColor={accent2} stopOpacity="0.6"/>
          </linearGradient>
          <radialGradient id="brandGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.2"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>
        <ellipse cx="160" cy="80" rx="150" ry="65" fill="url(#brandGlow)"/>
        {/* Grid lines */}
        {[0,1,2,3,4].map(i => (
          <line key={i} x1={i*80} y1="0" x2={i*80} y2="160" stroke={accent} strokeOpacity="0.07" strokeWidth="1"/>
        ))}
        {[0,1,2,3].map(i => (
          <line key={i} x1="0" y1={i*53} x2="320" y2={i*53} stroke={accent} strokeOpacity="0.07" strokeWidth="1"/>
        ))}
        {/* Main logo card */}
        <rect x="95" y="25" width="130" height="110" rx="8" fill="rgba(10,18,48,0.9)" stroke={accent} strokeOpacity="0.35" strokeWidth="1"/>
        {/* Animated logo path */}
        <path d="M115 105L160 45L205 105" stroke="url(#brandGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          style={{ animation: 'brandDraw 3s ease-in-out infinite alternate' }}
        />
        <path d="M128 88H192" stroke={accent2} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7"/>
        {/* Scanning line */}
        <line x1="95" y1="25" x2="225" y2="25" stroke={accent} strokeOpacity="0.5" strokeWidth="1.5"
          style={{ animation: 'scanMove 4s ease-in-out infinite' }}
        />
        {/* Orbiting dots */}
        <circle cx="80" cy="40" r="4" fill={accent} fillOpacity="0.6"
          style={{ animation: 'floatDot 3s ease-in-out infinite alternate' }}
        />
        <circle cx="250" cy="115" r="6" fill={accent2} fillOpacity="0.45"
          style={{ animation: 'floatDot 4s ease-in-out infinite alternate-reverse' }}
        />
        <circle cx="40" cy="110" r="3" fill={accent} fillOpacity="0.35"
          style={{ animation: 'floatDot 5s ease-in-out infinite alternate' }}
        />
        <circle cx="290" cy="45" r="3.5" fill={accent2} fillOpacity="0.4"
          style={{ animation: 'floatDot 3.5s ease-in-out infinite alternate-reverse' }}
        />
        {/* Color swatches - animated entry */}
        {[accent, accent2, '#1a3a8a', '#0a1c50', '#2a5caa'].map((c, i) => (
          <rect key={i} x={65 + i * 16} y="135" width="12" height="12" rx="3" fill={c} fillOpacity="0.85"
            style={{ animation: `swatchPop 0.4s ${0.1 * i}s both ease-out` }}
          />
        ))}
        {/* Label bars */}
        <rect x="95" y="13" width="65" height="8" rx="2" fill={accent} fillOpacity="0.3"
          style={{ animation: 'pulseOpacity 2.5s ease-in-out infinite alternate' }}
        />
        <rect x="165" y="13" width="35" height="8" rx="2" fill={accent2} fillOpacity="0.2"
          style={{ animation: 'pulseOpacity 3s 0.5s ease-in-out infinite alternate' }}
        />
        {/* Corner bracket marks */}
        <path d="M40 35L30 35L30 45" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
        <path d="M280 35L290 35L290 45" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
        <path d="M40 125L30 125L30 115" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
        <path d="M280 125L290 125L290 115" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
      </svg>
    ),
    icon: <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7"><circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3"/><path d="M14 34L24 14L34 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 28H31" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  },
  {
    number: '02',
    title: 'Content Strategy & Creation',
    category: 'Content',
    description:
      'Strategy, templates, scripts, visuals. Built as a system that turns ideas into a steady stream of impact.',
    accent: '#5BC9E8',
    accent2: '#4A9EFF',
    gridClass: 'lg:col-span-1',
    illustration: (accent: string, accent2: string) => (
      <svg viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <radialGradient id="contentGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.18"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>
        <ellipse cx="110" cy="80" rx="100" ry="60" fill="url(#contentGlow)"/>
        {/* Doc stack base */}
        <rect x="52" y="28" width="110" height="110" rx="6" fill="rgba(12,18,45,0.6)" stroke={accent2} strokeOpacity="0.15" strokeWidth="1" transform="rotate(-4 107 83)"/>
        {/* Main doc */}
        <rect x="56" y="22" width="110" height="112" rx="6" fill="rgba(10,17,45,0.92)" stroke={accent} strokeOpacity="0.4" strokeWidth="1"/>
        {/* Animated text lines */}
        <rect x="72" y="40" width="75" height="7" rx="2" fill={accent} fillOpacity="0.55"
          style={{ animation: 'lineExpand 3s ease-in-out infinite alternate' }}
        />
        <rect x="72" y="55" width="60" height="5" rx="2" fill="white" fillOpacity="0.12"/>
        <rect x="72" y="65" width="68" height="5" rx="2" fill="white" fillOpacity="0.12"/>
        <rect x="72" y="75" width="45" height="5" rx="2" fill="white" fillOpacity="0.08"
          style={{ animation: 'lineExpand 4s 0.5s ease-in-out infinite alternate' }}
        />
        {/* Media block */}
        <rect x="72" y="90" width="78" height="30" rx="4" fill={accent2} fillOpacity="0.12" stroke={accent2} strokeOpacity="0.3" strokeWidth="1"/>
        <circle cx="86" cy="105" r="9" fill={accent2} fillOpacity="0.3" stroke={accent2} strokeWidth="1" strokeOpacity="0.5"
          style={{ animation: 'pulseOpacity 2s ease-in-out infinite alternate' }}
        />
        <path d="M83 101L91.5 105L83 109Z" fill={accent2} fillOpacity="0.9"/>
        {/* Floating pill tags */}
        <rect x="140" y="30" width="36" height="14" rx="7" fill={accent} fillOpacity="0.18" stroke={accent} strokeOpacity="0.45" strokeWidth="1"
          style={{ animation: 'floatDot 3s ease-in-out infinite alternate' }}
        />
        <text x="149" y="41" fontSize="7" fill={accent} fontFamily="monospace" fillOpacity="0.9">BLOG</text>
        <rect x="140" y="51" width="44" height="14" rx="7" fill={accent2} fillOpacity="0.18" stroke={accent2} strokeOpacity="0.4" strokeWidth="1"
          style={{ animation: 'floatDot 4s ease-in-out infinite alternate-reverse' }}
        />
        <text x="147" y="62" fontSize="7" fill={accent2} fontFamily="monospace" fillOpacity="0.9">REELS</text>
        <rect x="140" y="72" width="50" height="14" rx="7" fill={accent} fillOpacity="0.15" stroke={accent} strokeOpacity="0.3" strokeWidth="1"
          style={{ animation: 'floatDot 3.5s 0.5s ease-in-out infinite alternate' }}
        />
        <text x="146" y="83" fontSize="7" fill={accent} fontFamily="monospace" fillOpacity="0.8">SCRIPTS</text>
        {/* Blinking cursor */}
        <rect x="138" y="57" width="2" height="12" rx="1" fill={accent} fillOpacity="0.9"
          style={{ animation: 'blink 1s step-end infinite' }}
        />
      </svg>
    ),
    icon: <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7"><rect x="8" y="10" width="32" height="28" rx="3" stroke="currentColor" strokeWidth="1.5"/><path d="M14 18H34M14 24H28M14 30H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="37" cy="37" r="7" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5"/><path d="M35 37L37 39L41 35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    number: '03',
    title: 'Performance Marketing',
    category: 'Performance',
    description:
      'Data-led paid campaigns that convert. We test relentlessly and optimise until the numbers sing.',
    accent: '#4A9EFF',
    accent2: '#6B7FFF',
    gridClass: '', // Performance: col 1, rows 2-3 (tall)
    illustration: (accent: string, accent2: string) => (
      <svg viewBox="0 0 220 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="perfGrad1" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor={accent} stopOpacity="0.9"/>
            <stop offset="100%" stopColor={accent2} stopOpacity="0.5"/>
          </linearGradient>
          <linearGradient id="perfGrad2" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor={accent} stopOpacity="0.45"/>
            <stop offset="100%" stopColor={accent} stopOpacity="0.08"/>
          </linearGradient>
          <radialGradient id="perfGlow" cx="50%" cy="90%" r="60%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.25"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>
        <ellipse cx="110" cy="230" rx="120" ry="70" fill="url(#perfGlow)"/>
        {/* Grid lines */}
        {[0,1,2,3,4].map(i=>(
          <line key={i} x1="18" y1={40+i*48} x2="205" y2={40+i*48} stroke="white" strokeOpacity="0.05" strokeWidth="1"/>
        ))}
        {/* Animated bars */}
        {[
          { x: 18,  h: 80,  w: 22 },
          { x: 48,  h: 110, w: 22 },
          { x: 78,  h: 90,  w: 22 },
          { x: 108, h: 140, w: 22 },
          { x: 138, h: 120, w: 22 },
          { x: 168, h: 170, w: 22 },
        ].map((b, i) => (
          <rect key={i} x={b.x} y={240-b.h} width={b.w} height={b.h} rx="4"
            fill={i === 5 ? 'url(#perfGrad1)' : 'url(#perfGrad2)'}
            stroke={i === 5 ? accent : 'transparent'}
            strokeWidth="1"
          />
        ))}
        {/* Baseline */}
        <line x1="14" y1="240" x2="200" y2="240" stroke="white" strokeOpacity="0.15" strokeWidth="1"/>
        {/* Trend line */}
        <path d="M29 185 L59 148 L89 162 L119 108 L149 125 L179 68"
          stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          fill="none" strokeOpacity="0.95"
          style={{ animation: 'lineDrawRight 2.5s ease-out both' }}
        />
        {/* Glowing endpoint */}
        <circle cx="179" cy="68" r="8" fill={accent} stroke="white" strokeWidth="2.5"
          style={{ animation: 'pulseGlow 1.8s ease-in-out infinite' }}
        />
        <circle cx="179" cy="68" r="18" fill={accent} fillOpacity="0.12"
          style={{ animation: 'pulseGlow 1.8s ease-in-out infinite' }}
        />
        {/* ROI badge */}
        <rect x="140" y="40" width="60" height="22" rx="11" fill={accent} fillOpacity="0.22" stroke={accent} strokeWidth="1" strokeOpacity="0.8"/>
        <text x="153" y="55" fontSize="11" fill={accent} fontFamily="monospace" fontWeight="bold">+ROI</text>
        {/* ROAS label */}
        <text x="18" y="28" fontSize="9" fill="white" fillOpacity="0.35" fontFamily="monospace">ROAS</text>
        <text x="18" y="42" fontSize="14" fill={accent} fillOpacity="0.9" fontFamily="monospace" fontWeight="bold">4.2x</text>
      </svg>
    ),
    icon: <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7"><path d="M8 36L18 24L26 30L38 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="38" cy="12" r="4" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"/><path d="M8 40H40" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4"/></svg>,
  },
  {
    number: '04',
    title: 'Social Media Management',
    category: 'Social',
    description:
      'Your brand, alive online every day. Strategy, content, community, all handled.',
    accent: '#5BC9E8',
    accent2: '#4A9EFF',
    gridClass: 'lg:col-span-1',
    illustration: (accent: string, accent2: string) => (
      <svg viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <radialGradient id="socialGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.15"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>
        <ellipse cx="110" cy="80" rx="100" ry="60" fill="url(#socialGlow)"/>
        {/* Animated connection lines */}
        {[
          { x2: 50, y2: 40 }, { x2: 170, y2: 40 }, { x2: 55, y2: 125 },
          { x2: 170, y2: 125 }, { x2: 195, y2: 80 }, { x2: 25, y2: 80 }
        ].map((l, i) => (
          <line key={i} x1="110" y1="80" x2={l.x2} y2={l.y2}
            stroke={i % 2 === 0 ? accent : accent2} strokeOpacity="0.3" strokeWidth="1" strokeDasharray="4 3"
            style={{ animation: `dashAnim ${3 + i * 0.4}s linear infinite` }}
          />
        ))}
        {/* Satellite circles */}
        {[
          { cx: 50, cy: 40 }, { cx: 170, cy: 40 }, { cx: 55, cy: 125 },
          { cx: 170, cy: 125 }, { cx: 195, cy: 80 }, { cx: 25, cy: 80 }
        ].map((p, i) => (
          <g key={i}>
            <circle cx={p.cx} cy={p.cy} r="14" fill="rgba(10,18,45,0.85)"
              stroke={i % 2 === 0 ? accent : accent2} strokeWidth="1" strokeOpacity="0.5"/>
            <circle cx={p.cx} cy={p.cy} r="5" fill={i % 2 === 0 ? accent : accent2} fillOpacity="0.6"
              style={{ animation: `pulseOpacity ${2 + i * 0.3}s ease-in-out infinite alternate` }}
            />
          </g>
        ))}
        {/* Central hub */}
        <circle cx="110" cy="80" r="20" fill="rgba(10,18,50,0.95)" stroke={accent} strokeWidth="1.5" strokeOpacity="0.8"/>
        <circle cx="110" cy="80" r="12" fill={accent} fillOpacity="0.15"
          style={{ animation: 'pulseGlow 2.5s ease-in-out infinite' }}
        />
        <path d="M103 80C103 76 106 73 110 73C114 73 117 76 117 80C117 83 115 85.5 112 86.5V90H108V86.5C105 85.5 103 83 103 80Z"
          fill={accent} fillOpacity="0.9"/>
        {/* Notification badge */}
        <rect x="143" y="57" width="34" height="18" rx="9" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1" strokeOpacity="0.6"
          style={{ animation: 'floatDot 3s ease-in-out infinite alternate' }}
        />
        <text x="152" y="70" fontSize="9" fill={accent} fontFamily="monospace">+99</text>
      </svg>
    ),
    icon: <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7"><circle cx="10" cy="24" r="5" stroke="currentColor" strokeWidth="1.5"/><circle cx="38" cy="10" r="5" stroke="currentColor" strokeWidth="1.5"/><circle cx="38" cy="38" r="5" stroke="currentColor" strokeWidth="1.5"/><path d="M15 21L33 13M15 27L33 35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  },
  {
    number: '05',
    title: 'Event Curation & Management',
    category: 'Events',
    description:
      'Concept to execution. Brand activations and launches that create moments people talk about.',
    accent: '#4A9EFF',
    accent2: '#8B6FFF',
    gridClass: '', // Events: col 2, row 3
    illustration: (accent: string, accent2: string) => (
      <svg viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="eventGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.8"/>
            <stop offset="100%" stopColor={accent2} stopOpacity="0.6"/>
          </linearGradient>
          <radialGradient id="eventGlow" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.2"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>
        <ellipse cx="110" cy="100" rx="100" ry="60" fill="url(#eventGlow)"/>
        {/* Spotlight rays */}
        <path d="M110 30L40 145L180 145Z" fill={accent} fillOpacity="0.05"/>
        <path d="M110 30L60 145" stroke={accent} strokeOpacity="0.12" strokeWidth="1"/>
        <path d="M110 30L160 145" stroke={accent} strokeOpacity="0.12" strokeWidth="1"/>
        <path d="M110 30L85 145" stroke={accent2} strokeOpacity="0.08" strokeWidth="1"/>
        <path d="M110 30L135 145" stroke={accent2} strokeOpacity="0.08" strokeWidth="1"/>
        {/* Platform */}
        <rect x="40" y="133" width="140" height="14" rx="3" fill="rgba(10,18,45,0.85)" stroke={accent} strokeWidth="1" strokeOpacity="0.4"/>
        {/* Star burst with rotation */}
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => (
          <line key={i}
            x1="110" y1="62"
            x2={110 + (i % 2 === 0 ? 25 : 15) * Math.cos(deg * Math.PI/180)}
            y2={62 + (i % 2 === 0 ? 25 : 15) * Math.sin(deg * Math.PI/180)}
            stroke={i % 2 === 0 ? accent : accent2}
            strokeOpacity={i % 2 === 0 ? 0.55 : 0.25}
            strokeWidth={i % 2 === 0 ? 2 : 1}
            style={{ transformOrigin: '110px 62px', animation: `spinStar 12s linear infinite` }}
          />
        ))}
        <circle cx="110" cy="62" r="13" fill="rgba(10,18,45,0.95)" stroke="url(#eventGrad)" strokeWidth="2"/>
        <circle cx="110" cy="62" r="5" fill={accent} fillOpacity="0.85"
          style={{ animation: 'pulseGlow 2s ease-in-out infinite' }}
        />
        {/* Progress bar */}
        <rect x="45" y="118" width="130" height="4" rx="2" fill="rgba(255,255,255,0.07)"/>
        <rect x="45" y="118" width="0" height="4" rx="2" fill="url(#eventGrad)" fillOpacity="0.8"
          style={{ animation: 'progressFill 3s ease-out 0.5s both' }}
        />
        {/* Milestone dots */}
        {[45, 85, 125, 170].map((x, i) => (
          <circle key={i} cx={x} cy="120" r="5"
            fill={i < 3 ? accent : 'rgba(255,255,255,0.12)'}
            stroke="rgba(10,18,45,0.9)" strokeWidth="1.5"
            style={{ animation: `milestoneIn 0.4s ${i * 0.2}s both ease-out` }}
          />
        ))}
      </svg>
    ),
    icon: <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7"><rect x="8" y="14" width="32" height="26" rx="3" stroke="currentColor" strokeWidth="1.5"/><path d="M8 22H40" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5"/><path d="M16 8V14M32 8V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="24" cy="32" r="5" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/><path d="M24 29V32L26 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  },
  {
    number: '06',
    title: 'Business Development',
    category: 'Growth',
    description:
      'Market research, partnerships, and growth roadmaps. We help ambitious brands open new doors, sustainably.',
    accent: '#4A9EFF',
    accent2: '#5BC9E8',
    gridClass: '', // Business: col 3, row 3
    illustration: (accent: string, accent2: string) => (
      <svg viewBox="0 0 320 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="bizGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor={accent} stopOpacity="0.8"/>
            <stop offset="100%" stopColor={accent2} stopOpacity="0.5"/>
          </linearGradient>
          <radialGradient id="bizGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.15"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>
        <ellipse cx="160" cy="80" rx="155" ry="65" fill="url(#bizGlow)"/>
        {/* Animated connection lines */}
        {[
          { x: 65, y: 55 }, { x: 255, y: 55 }, { x: 65, y: 115 },
          { x: 255, y: 115 }, { x: 160, y: 130 }
        ].map((n, i) => (
          <line key={i} x1="160" y1="80" x2={n.x} y2={n.y}
            stroke={i % 2 === 0 ? accent : accent2} strokeOpacity="0.25" strokeWidth="1" strokeDasharray="5 4"
            style={{ animation: `dashAnim ${4 + i * 0.5}s linear infinite` }}
          />
        ))}
        {/* Satellite nodes */}
        {[
          { cx: 65, cy: 55, r: 16 }, { cx: 255, cy: 55, r: 16 }, { cx: 65, cy: 115, r: 14 },
          { cx: 255, cy: 115, r: 14 }, { cx: 160, cy: 130, r: 12 }
        ].map((n, i) => (
          <g key={i}>
            <circle cx={n.cx} cy={n.cy} r={n.r}
              fill="rgba(8,15,40,0.9)"
              stroke={i % 2 === 0 ? accent : accent2}
              strokeWidth="1" strokeOpacity="0.5"/>
            <circle cx={n.cx} cy={n.cy} r={Math.round(n.r * 0.4)} fill={i % 2 === 0 ? accent : accent2} fillOpacity="0.55"
              style={{ animation: `pulseOpacity ${2.5 + i * 0.4}s ease-in-out infinite alternate` }}
            />
          </g>
        ))}
        {/* Central hub */}
        <circle cx="160" cy="80" r="25" fill="rgba(8,15,40,0.95)" stroke={accent} strokeWidth="2" strokeOpacity="0.85"/>
        <circle cx="160" cy="80" r="14" fill={accent} fillOpacity="0.15"
          style={{ animation: 'pulseGlow 2s ease-in-out infinite' }}
        />
        {/* Trend arrow in center */}
        <path d="M150 85L158 75L166 80L174 68" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M170 68L174 68L174 72" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/>
        {/* Floating growth badge */}
        <rect x="195" y="25" width="62" height="22" rx="11" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1" strokeOpacity="0.6"
          style={{ animation: 'floatDot 3.5s ease-in-out infinite alternate' }}
        />
        <text x="204" y="40" fontSize="10" fill={accent} fontFamily="monospace" fontWeight="bold">+240%</text>
        {/* Side grid lines */}
        {[0,1,2,3,4].map(i=>(
          <line key={i} x1={30+i*65} y1="10" x2={30+i*65} y2="150" stroke={accent} strokeOpacity="0.04" strokeWidth="1"/>
        ))}
      </svg>
    ),
    icon: <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7"><path d="M10 38L20 26L28 32L38 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M32 20H38V26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="20" cy="26" r="3" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"/><circle cx="28" cy="32" r="3" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"/></svg>,
  },
];

/* ─── Keyframes ─────────────────────────────────────────────────── */
const KEYFRAMES = `
  @keyframes floatDot {
    from { transform: translateY(0px); }
    to   { transform: translateY(-8px); }
  }
  @keyframes pulseOpacity {
    from { opacity: 0.4; }
    to   { opacity: 1; }
  }
  @keyframes pulseGlow {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50%       { opacity: 1;   transform: scale(1.15); }
  }
  @keyframes brandDraw {
    from { stroke-dashoffset: 200; opacity: 0.6; }
    to   { stroke-dashoffset: 0;   opacity: 1; }
  }
  @keyframes scanMove {
    0%   { transform: translateY(0px);   opacity: 0.6; }
    50%  { transform: translateY(100px); opacity: 0.3; }
    100% { transform: translateY(0px);   opacity: 0.6; }
  }
  @keyframes lineExpand {
    from { width: 30px; }
    to   { width: 80px; }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  @keyframes dashAnim {
    from { stroke-dashoffset: 0; }
    to   { stroke-dashoffset: -50; }
  }
  @keyframes spinStar {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes progressFill {
    from { width: 0; }
    to   { width: 90px; }
  }
  @keyframes milestoneIn {
    from { transform: scale(0); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
  }
  @keyframes swatchPop {
    from { transform: scale(0); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
  }
  @keyframes barRise {
    from { transform: scaleY(0); transform-origin: bottom; }
    to   { transform: scaleY(1); transform-origin: bottom; }
  }
  @keyframes lineDrawRight {
    from { stroke-dasharray: 0 1000; }
    to   { stroke-dasharray: 1000 0; }
  }
`;

/*
  Grid positions (3 cols, 3 rows):
  [0] Branding    → col 1-2, row 1
  [1] Content     → col 3,   row 1
  [2] Performance → col 1,   row 2-3  (tall)
  [3] Social      → col 2-3, row 2
  [4] Events      → col 2,   row 3
  [5] Biz Dev     → col 3,   row 3
*/
const GRID_POSITIONS = [
  'md:col-start-1 md:col-span-2 md:row-start-1 md:row-span-1',  // Branding - wide
  'md:col-start-3 md:col-span-1 md:row-start-1 md:row-span-1',  // Content
  'md:col-start-1 md:col-span-1 md:row-start-2 md:row-span-2',  // Performance - tall
  'md:col-start-2 md:col-span-2 md:row-start-2 md:row-span-1',  // Social - wide
  'md:col-start-2 md:col-span-1 md:row-start-3 md:row-span-1',  // Events
  'md:col-start-3 md:col-span-1 md:row-start-3 md:row-span-1',  // Biz Dev
];

/* ─── Card component ─────────────────────────────────────────────── */
function ServiceCard({ service, index }: { service: typeof SERVICES[number]; index: number }) {
  const isWide = index === 0 || index === 3;
  const isTall = index === 2;

  return (
    <div
      className={`service-card group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer ${GRID_POSITIONS[index]}`}
      style={{
        background: 'rgba(6, 11, 28, 0.9)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(12px)',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.borderColor = `${service.accent}50`;
        el.style.boxShadow = `0 0 50px ${service.accent}15, 0 25px 70px rgba(0,0,0,0.5)`;
        el.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.borderColor = 'rgba(255,255,255,0.07)';
        el.style.boxShadow = 'none';
        el.style.transform = 'translateY(0)';
      }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${service.accent}60, transparent)` }}
      />

      <div className="p-7 flex flex-col flex-1">
        {/* Icon chip */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-6 flex-shrink-0"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${service.accent}15, transparent)`,
            border: `1px solid ${service.accent}30`,
            color: service.accent,
            boxShadow: `0 4px 20px ${service.accent}10`,
          }}
        >
          {service.icon}
        </div>

        {/* Title */}
        <h3
          className="font-bold mb-3 leading-tight tracking-tight"
          style={{
            fontSize: 'clamp(1.2rem, 2vw, 1.45rem)',
            color: '#F2F6FC',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p
          className="leading-relaxed mb-8"
          style={{ 
            color: 'rgba(242,246,252,0.6)', 
            fontSize: '0.95rem', 
            maxWidth: '95%',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          {service.description}
        </p>

        {/* Illustration */}
        <div
          className="mt-auto rounded-xl overflow-hidden relative flex-shrink-0"
          style={{
            background: 'rgba(4,8,22,0.8)',
            border: `1px solid ${service.accent}18`,
            height: isTall ? '16rem' : isWide ? '10rem' : '9rem',
          }}
        >
          <div className="absolute inset-0"
            style={{ background: `radial-gradient(ellipse at 50% 110%, ${service.accent}10, transparent 70%)` }}
          />
          <div className="w-full h-full relative z-10 p-2">
            {service.illustration(service.accent, service.accent2)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main section ───────────────────────────────────────────────── */
export default function ServicesSectionNew() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { y: 60, opacity: 0, filter: 'blur(12px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: titleRef.current, start: 'top 85%' } }
        );
      }
      const cards = gridRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 55, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 82%' } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden"
      style={{ background: '#000000', padding: 'clamp(1rem, 12vh, 9rem) 0 clamp(6rem, 14vh, 10rem)', position: 'relative', zIndex: 30 }}
    >
      <style>{KEYFRAMES}</style>

      {/* Background blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div style={{
          position: 'absolute', top: '-15%', left: '-10%', width: '55vw', height: '55vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(30,80,220,0.18) 0%, transparent 70%)', filter: 'blur(80px)',
        }}/>
        <div style={{
          position: 'absolute', bottom: '-10%', right: '-10%', width: '50vw', height: '50vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(74,158,255,0.12) 0%, transparent 70%)', filter: 'blur(90px)',
        }}/>
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Header - centered */}
        <div className="mb-14 md:mb-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="uppercase tracking-[0.4em] mb-5"
            style={{ color: '#4A9EFF', fontFamily: 'monospace', fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
          >
            What We Do
          </motion.p>
          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: [0.25, 1, 0.3, 1], delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-sevone)',
              fontSize: 'clamp(2.8rem, 7vw, 6rem)',
              color: '#F2F6FC',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
            }}
          >
            Services Built for<br />Brands That<br />Mean Business
          </motion.h2>
        </div>

        <div
          ref={gridRef}
          className="flex flex-col md:grid md:grid-cols-3 md:grid-rows-[auto_auto_auto] gap-6 md:gap-5"
        >
          {SERVICES.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: i * 0.09,
                ease: [0.25, 1, 0.36, 1],
              }}
              style={{ display: 'contents' }}
            >
              <ServiceCard key={i} service={service} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
