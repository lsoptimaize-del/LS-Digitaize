'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useScroll } from 'framer-motion';
import type { Service } from '../../data/services';
import type { ServiceContent } from '../../data/serviceContent';
import { HERO_ICONS } from '../../data/heroIcons';

const MONO = 'var(--font-geist-mono), ui-monospace, monospace';
const DISPLAY = 'var(--font-sevone), serif';
const EASE = [0.22, 1, 0.36, 1] as const;
const GRAD = 'linear-gradient(120deg, #2A7DE1 0%, #4A9EFF 55%, #5BC9E8 100%)';

const gradText: React.CSSProperties = {
  background: GRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
};

const secStyle: React.CSSProperties = { position: 'relative', padding: 'clamp(4.5rem, 9vw, 7.5rem) clamp(1.25rem, 4vw, 4rem)', overflow: 'hidden' };

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 999, background: 'rgba(74,158,255,0.10)',
        border: '1px solid rgba(74,158,255,0.30)', fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#2A7DE1',
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: 999, background: '#4A9EFF', boxShadow: '0 0 10px rgba(74,158,255,0.9)' }} />
      {children}
    </span>
  );
}

function SectionHead({ eyebrow, heading, highlight, body }: { eyebrow: string; heading: string; highlight?: string; body?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7, ease: EASE }}
      style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto clamp(2.5rem, 5vw, 4rem)' }}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(2rem, 4.6vw, 3.8rem)', lineHeight: 1.05, letterSpacing: '-0.012em', margin: '20px 0 0', color: '#0A0A0A' }}>
        {heading}{highlight && <> <span style={gradText}>{highlight}</span></>}
      </h2>
      {body && <p style={{ margin: '18px auto 0', fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', lineHeight: 1.7, color: 'rgba(10,10,10,0.62)', maxWidth: 640 }}>{body}</p>}
    </motion.div>
  );
}

/* ───────────────────────────── 2. WHY IT WORKS ───────────────────────────── */
export function ServiceUsps({ content }: { content: ServiceContent }) {
  return (
    <section style={{ ...secStyle, background: '#FAFAF7', borderTop: '1px solid rgba(74,158,255,0.18)' }}>
      <style>{`
        .svd-usp { position: relative; overflow: hidden; border-radius: 16px; padding: 28px; min-height: 270px; display: flex; flex-direction: column; justify-content: space-between; background: linear-gradient(160deg, #FFFFFF 0%, #F1F6FF 100%); border: 1px solid rgba(74,158,255,0.28); box-shadow: 0 12px 34px rgba(42,125,225,0.08); transition: transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s ease, border-color .4s ease; }
        .svd-usp:hover { transform: translateY(-6px); border-color: rgba(42,125,225,0.7); box-shadow: 0 28px 60px rgba(42,125,225,0.2); }
        .svd-usp .ln { position: absolute; background: #2A7DE1; transition: transform .5s ease; }
        .svd-usp .ln.t { top: 0; left: 0; right: 0; height: 2px; transform: scaleX(0); transform-origin: left; }
        .svd-usp .ln.r { top: 0; right: 0; bottom: 0; width: 2px; transform: scaleY(0); transform-origin: top; transition-delay: .1s; }
        .svd-usp .ln.b { bottom: 0; left: 0; right: 0; height: 2px; transform: scaleX(0); transform-origin: right; transition-delay: .2s; }
        .svd-usp .ln.l { top: 0; left: 0; bottom: 0; width: 2px; transform: scaleY(0); transform-origin: bottom; transition-delay: .3s; }
        .svd-usp:hover .ln { transform: none; }
        .svd-usp .orb { position: absolute; right: -40px; bottom: -40px; width: 160px; height: 160px; border-radius: 50%; background: radial-gradient(circle, rgba(74,158,255,0.22), transparent 70%); transition: transform .6s ease; }
        .svd-usp:hover .orb { transform: scale(1.5); }
      `}</style>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <SectionHead eyebrow="Why It Works" heading="What Sets This" highlight="Apart" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {content.usps.map((u, i) => (
            <motion.div
              key={u.title}
              className="svd-usp"
              initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
            >
              <span className="ln t" /><span className="ln r" /><span className="ln b" /><span className="ln l" /><span className="orb" />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
                <span style={{ width: 46, height: 46, borderRadius: 12, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(42,125,225,0.10)', border: '1px solid rgba(42,125,225,0.25)', color: '#2A7DE1' }}>
                  {HERO_ICONS[u.icon]?.({ size: 22 })}
                </span>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: DISPLAY, fontSize: '1.7rem', color: '#0A0A0A', lineHeight: 1.1 }}>{u.val}</div>
                  <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.42)', marginTop: 4 }}>{u.sub}</div>
                </div>
              </div>
              <div style={{ position: 'relative', marginTop: 28 }}>
                <h3 style={{ margin: '0 0 10px', fontSize: '1.25rem', fontWeight: 700, color: '#0A0A0A', letterSpacing: '-0.01em' }}>{u.title}</h3>
                <p style={{ margin: 0, fontSize: '0.96rem', lineHeight: 1.65, color: 'rgba(10,10,10,0.62)' }}>{u.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── 3. EXPLAINER ───────────────────────────── */
export function ServiceExplainer({ content }: { content: ServiceContent }) {
  const e = content.explainer;
  return (
    <section style={{ ...secStyle, background: 'linear-gradient(180deg, #F3F8FF 0%, #EAF2FF 100%)', borderTop: '1px solid rgba(74,158,255,0.18)' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(74,158,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(74,158,255,0.08) 1px, transparent 1px)', backgroundSize: '56px 56px', maskImage: 'radial-gradient(ellipse at 50% 40%, black 0%, transparent 72%)', WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, black 0%, transparent 72%)' }} />
      <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto' }}>
        <SectionHead eyebrow={e.eyebrow} heading={e.heading} highlight={e.highlight} body={e.body} />

        <div className="grid md:grid-cols-2 gap-6" style={{ position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: EASE }}
            style={{ borderRadius: 20, padding: 'clamp(1.6rem, 3vw, 2.4rem)', background: 'rgba(255,255,255,0.65)', border: '1px dashed rgba(10,10,10,0.22)' }}
          >
            <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.4)', marginBottom: 6 }}>The old way</div>
            <h3 style={{ margin: '0 0 22px', fontSize: '1.6rem', fontWeight: 700, color: 'rgba(10,10,10,0.5)' }}>{e.oldTitle}</h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {e.oldPoints.map(pt => (
                <li key={pt} style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(10,10,10,0.5)', fontSize: '0.98rem' }}>
                  <span style={{ width: 22, height: 22, borderRadius: 999, flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(10,10,10,0.07)', fontSize: 12, color: 'rgba(10,10,10,0.45)' }}>&times;</span>
                  {pt}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            style={{ position: 'relative', overflow: 'hidden', borderRadius: 20, padding: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#fff', background: 'linear-gradient(135deg, #1F5FBF 0%, #2A7DE1 55%, #4A9EFF 100%)', boxShadow: '0 30px 70px rgba(42,125,225,0.35)' }}
          >
            <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#CFE6FF', marginBottom: 6 }}>The LS Digitaize way</div>
              <h3 style={{ margin: '0 0 22px', fontSize: '1.6rem', fontWeight: 700 }}>{e.newTitle}</h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {e.newPoints.map(pt => (
                  <li key={pt} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.98rem' }}>
                    <span style={{ width: 22, height: 22, borderRadius: 999, flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.22)', fontSize: 12 }}>&#10003;</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <span aria-hidden className="hidden md:flex" style={{ position: 'absolute', left: '50%', top: '50%', width: 46, height: 46, marginLeft: -23, marginTop: -23, borderRadius: 999, alignItems: 'center', justifyContent: 'center', background: '#fff', border: '1px solid rgba(74,158,255,0.4)', fontFamily: MONO, fontSize: 12, fontWeight: 700, color: '#2A7DE1', boxShadow: '0 10px 26px rgba(42,125,225,0.25)', zIndex: 3 }}>VS</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginTop: 28 }}>
          {e.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ borderRadius: 14, padding: '20px 18px', background: '#fff', border: '1px solid rgba(74,158,255,0.25)', boxShadow: '0 10px 26px rgba(42,125,225,0.07)' }}
            >
              <div style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.5rem, 2.4vw, 2rem)', color: '#2A7DE1', lineHeight: 1.1 }}>{s.val}</div>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.5)', marginTop: 6 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── 4a. WHAT WE DO ───────────────────────────── */
function Motif({ i }: { i: number }) {
  const k = i % 4;
  return (
    <svg aria-hidden viewBox="0 0 200 120" style={{ position: 'absolute', right: 6, top: 6, width: '40%', height: '44%', opacity: 0.85, pointerEvents: 'none' }} fill="none">
      {k === 0 && (
        <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'hs-spin 30s linear infinite' } as React.CSSProperties}>
          <circle cx="130" cy="80" r="62" stroke="#9CCBFF" strokeWidth="1.2" strokeDasharray="3 7" />
          <circle cx="130" cy="80" r="40" stroke="#6BB0FF" strokeWidth="1.2" />
          <circle cx="130" cy="18" r="4" fill="#2A7DE1" /><circle cx="170" cy="80" r="3" fill="#4A9EFF" />
        </g>
      )}
      {k === 1 && [22, 38, 30, 52, 44, 66].map((h, j) => (
        <rect key={j} x={70 + j * 20} y={112 - h} width="11" height={h} rx="3" fill={j === 5 ? '#2A7DE1' : '#9CCBFF'} style={{ transformBox: 'fill-box', transformOrigin: '50% 100%', animation: `hs-rise ${1.8 + (j % 3) * 0.5}s ease-in-out ${j * 0.15}s infinite alternate` } as React.CSSProperties} />
      ))}
      {k === 2 && (
        <g>
          {[0, 1, 2, 3, 4].map(j => <line key={j} x1="60" y1={30 + j * 18} x2="190" y2={30 + j * 18} stroke="#C9E0FF" strokeWidth="1.4" />)}
          <rect x="60" y="0" width="130" height="4" fill="#4A9EFF" fillOpacity="0.5" style={{ animation: 'svd-scan 3.2s ease-in-out infinite alternate' }} />
        </g>
      )}
      {k === 3 && [[110, 30], [150, 60], [126, 92], [178, 96], [92, 76]].map(([x, y], j) => (
        <g key={j} style={{ animation: `hs-float ${3 + j * 0.5}s ease-in-out ${j * 0.3}s infinite` }}>
          <circle cx={x} cy={y} r={j % 2 ? 6 : 9} fill={j % 2 ? '#4A9EFF' : '#C9E0FF'} stroke="#fff" strokeWidth="2" />
        </g>
      ))}
    </svg>
  );
}

export function ServiceCapabilities({ service }: { service: Service }) {
  const caps = service.capabilities;
  const spans = caps.length === 3 ? ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-12'] : ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7'];
  return (
    <section style={{ ...secStyle, background: '#FAFAF7', borderTop: '1px solid rgba(74,158,255,0.18)' }}>
      <style>{`
        @keyframes svd-scan { from { transform: translateY(0); } to { transform: translateY(88px); } }
        .svd-cap { position: relative; overflow: hidden; border-radius: 18px; padding: 28px; min-height: 230px; background: #fff; border: 1px solid rgba(74,158,255,0.25); box-shadow: 0 12px 34px rgba(42,125,225,0.07); transition: transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s ease, border-color .4s ease; }
        .svd-cap:hover { transform: translateY(-5px); border-color: rgba(42,125,225,0.65); box-shadow: 0 26px 56px rgba(42,125,225,0.18); }
      `}</style>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <SectionHead eyebrow="What We Do" heading="The Work," highlight="In Detail" body={service.whatItIs} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {caps.map((c, i) => (
            <motion.div
              key={c.title}
              className={`svd-cap ${spans[i] ?? 'lg:col-span-6'}`}
              initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: EASE }}
              style={i === caps.length - 1 && caps.length === 3 ? { background: 'linear-gradient(135deg, #F3F8FF, #E6F0FF)' } : undefined}
            >
              <Motif i={i} />
              <div style={{ position: 'relative', maxWidth: 380 }}>
                <span style={{ width: 46, height: 46, borderRadius: 12, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #4A9EFF, #2A7DE1)', color: '#fff', boxShadow: '0 10px 24px rgba(42,125,225,0.35)' }}>
                  {HERO_ICONS[c.icon]?.({ size: 22 })}
                </span>
                <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em', color: 'rgba(10,10,10,0.38)', margin: '20px 0 6px' }}>0{i + 1}</div>
                <h3 style={{ margin: '0 0 10px', fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(1.3rem, 1.9vw, 1.7rem)', lineHeight: 1.15, color: '#0A0A0A' }}>{c.title}</h3>
                <p style={{ margin: 0, fontSize: '0.96rem', lineHeight: 1.65, color: 'rgba(10,10,10,0.62)' }}>{c.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── 4b. HOW WE DO IT ───────────────────────────── */
const PHASES = ['Discover', 'Plan', 'Build', 'Launch', 'Grow'];

function TimelineNode({ step, i }: { step: { title: string; description: string }; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { margin: '-38% 0px -38% 0px' });
  const even = i % 2 === 0;
  return (
    <div ref={ref} className={`relative flex flex-col md:flex-row ${even ? 'md:flex-row-reverse' : ''} items-start md:items-center`}>
      <div className="absolute left-[18px] md:left-1/2 top-2 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10" style={{ width: 22, height: 22 }}>
        <motion.span
          animate={{ scale: on ? 1.25 : 1, backgroundColor: on ? '#2A7DE1' : '#FFFFFF', borderColor: on ? '#2A7DE1' : '#9CCBFF' }}
          style={{ display: 'block', width: 22, height: 22, borderRadius: 999, border: '3px solid #9CCBFF', boxShadow: on ? '0 0 0 8px rgba(74,158,255,0.22)' : 'none', transition: 'box-shadow .4s ease' }}
        />
      </div>
      <div className="w-full md:w-1/2 pl-14 md:pl-0" style={{ padding: undefined }}>
        <motion.div
          initial={{ opacity: 0, x: even ? -24 : 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, ease: EASE }}
          className={`md:px-12 ${even ? 'md:text-left' : 'md:text-right'}`}
        >
          <div style={{ padding: '22px 24px', borderRadius: 16, background: on ? '#fff' : 'rgba(255,255,255,0.7)', border: `1px solid ${on ? 'rgba(42,125,225,0.55)' : 'rgba(74,158,255,0.25)'}`, boxShadow: on ? '0 24px 54px rgba(42,125,225,0.18)' : '0 8px 22px rgba(42,125,225,0.05)', transition: 'all .45s ease' }}>
            <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#2A7DE1', fontWeight: 700 }}>
              {String(i + 1).padStart(2, '0')}{' // '}{PHASES[i] ?? 'Ongoing'}
            </span>
            <h3 style={{ margin: '10px 0 8px', fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(1.35rem, 2vw, 1.8rem)', color: '#0A0A0A', lineHeight: 1.15 }}>{step.title}</h3>
            <p style={{ margin: 0, fontSize: '0.96rem', lineHeight: 1.65, color: 'rgba(10,10,10,0.62)' }}>{step.description}</p>
          </div>
        </motion.div>
      </div>
      <div className="hidden md:block w-1/2" />
    </div>
  );
}

export function ServiceTimeline({ service }: { service: Service }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 60%'] });
  return (
    <section style={{ ...secStyle, background: 'linear-gradient(180deg, #F3F8FF 0%, #EAF2FF 100%)', borderTop: '1px solid rgba(74,158,255,0.18)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionHead eyebrow="Engineered For Excellence" heading="How We" highlight="Do It" />
        <div ref={ref} style={{ position: 'relative' }}>
          <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 -translate-x-1/2" style={{ width: 2, background: 'rgba(74,158,255,0.22)' }} />
          <motion.div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 -translate-x-1/2" style={{ width: 3, background: 'linear-gradient(180deg, #4A9EFF, #2A7DE1)', boxShadow: '0 0 16px rgba(42,125,225,0.55)', scaleY: scrollYProgress, transformOrigin: 'top' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2.2rem, 5vw, 4rem)' }}>
            {service.process.map((s, i) => <TimelineNode key={s.title} step={s} i={i} />)}
          </div>
        </div>

      </div>
    </section>
  );
}

/* ───────────────────────────── 4c. WHAT YOU GET ───────────────────────────── */
export function ServiceValue({ service }: { service: Service }) {
  return (
    <section style={{ ...secStyle, background: '#FAFAF7', borderTop: '1px solid rgba(74,158,255,0.18)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <SectionHead eyebrow="Value Proposition" heading="Rather Than What We Do," highlight="This Is What You Get" />

        <div className="grid md:grid-cols-[1.35fr_1fr] gap-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: EASE }}
            style={{ position: 'relative', overflow: 'hidden', borderRadius: 20, padding: 'clamp(2rem, 4vw, 3.2rem)', display: 'flex', alignItems: 'center', minHeight: 270, color: '#fff', background: 'linear-gradient(140deg, #1F5FBF 0%, #2A7DE1 55%, #4A9EFF 100%)', boxShadow: '0 34px 70px rgba(42,125,225,0.3)' }}
          >
            <span aria-hidden style={{ position: 'absolute', top: -26, left: 10, fontFamily: DISPLAY, fontSize: 'clamp(7rem,15vw,12rem)', lineHeight: 1, color: 'rgba(255,255,255,0.16)' }}>&ldquo;</span>
            <p style={{ position: 'relative', margin: 0, fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(1.5rem,2.9vw,2.4rem)', lineHeight: 1.22, letterSpacing: '-0.01em' }}>
              {service.values[0]}
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {service.values.slice(1).map((v, i) => (
              <motion.div
                key={v}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: EASE }}
                style={{ flex: 1, borderRadius: 16, padding: '24px 26px', background: '#fff', border: '1px solid rgba(74,158,255,0.25)', boxShadow: '0 12px 32px rgba(42,125,225,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
              >
                <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em', color: '#2A7DE1', marginBottom: 10 }}>0{i + 2}</span>
                <p style={{ margin: 0, fontSize: '1.02rem', lineHeight: 1.55, color: '#0A0A0A', fontWeight: 500 }}>{v}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: EASE }}
          style={{ marginTop: 20, borderRadius: 20, padding: 'clamp(1.6rem, 3vw, 2.4rem)', background: 'linear-gradient(135deg, #F3F8FF, #E8F1FF)', border: '1px solid rgba(74,158,255,0.3)' }}
        >
          <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#2A7DE1', marginBottom: 18 }}>Delivered to you</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {service.deliverables.map(d => (
              <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.98rem', color: '#0A0A0A' }}>
                <span style={{ width: 24, height: 24, borderRadius: 999, flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#fff', border: '1px solid rgba(42,125,225,0.3)', color: '#2A7DE1', fontSize: 12, fontWeight: 700 }}>&#10003;</span>
                {d}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────────── 5. CTA ───────────────────────────── */
export function ServiceCta({ content }: { content: ServiceContent }) {
  const c = content.cta;
  return (
    <section style={{ ...secStyle, background: '#FAFAF7', borderTop: '1px solid rgba(74,158,255,0.18)', padding: 'clamp(5rem, 11vw, 9rem) clamp(1.25rem, 4vw, 4rem)' }}>
      <style>{`@keyframes svd-ring { 0% { transform: scale(0.6); opacity: .5; } 100% { transform: scale(2.4); opacity: 0; } }`}</style>
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: '70%', height: '90%', transform: 'translate(-50%,-50%)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,158,255,0.26), transparent 65%)', filter: 'blur(50px)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(74,158,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(74,158,255,0.09) 1px, transparent 1px)', backgroundSize: '48px 48px', maskImage: 'radial-gradient(ellipse at 50% 50%, black 0%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 0%, transparent 70%)' }} />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.8, ease: EASE }}
        style={{ position: 'relative', textAlign: 'center', maxWidth: 820, margin: '0 auto' }}
      >
        <Eyebrow>We do this for you</Eyebrow>
        <h2 style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(2.4rem, 6.4vw, 5.4rem)', lineHeight: 1.02, letterSpacing: '-0.014em', margin: '22px 0 0', color: '#0A0A0A' }}>
          {c.heading}<br /><span style={gradText}>{c.highlight}</span>
        </h2>
        <p style={{ margin: '24px auto 0', maxWidth: 560, fontSize: 'clamp(1rem, 1.35vw, 1.15rem)', lineHeight: 1.7, color: 'rgba(10,10,10,0.62)' }}>{c.subtext}</p>
        <div style={{ position: 'relative', display: 'inline-block', marginTop: 40 }}>
          {[0, 1].map(k => (
            <span key={k} aria-hidden style={{ position: 'absolute', inset: 0, borderRadius: 999, border: '2px solid #4A9EFF', animation: `svd-ring 2.6s ease-out ${k * 1.3}s infinite` }} />
          ))}
          <Link href="/contact" className="svd-btn pri" style={{ position: 'relative', padding: '18px 40px', fontSize: 12 }}>{c.button} <span>&rarr;</span></Link>
        </div>
      </motion.div>
    </section>
  );
}
