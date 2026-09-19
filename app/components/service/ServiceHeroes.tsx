'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Service } from '../../data/services';
import type { ServiceContent } from '../../data/serviceContent';

const MONO = 'var(--font-geist-mono), ui-monospace, monospace';
const DISPLAY = 'var(--font-sevone), serif';

type HeroProps = { service: Service; content: ServiceContent };

export const HERO_CSS = `
.sh{position:relative;width:100%;min-height:100dvh;overflow:hidden;background:#FAFAF7;display:flex}
.sh-eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:${MONO};font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#2A7DE1}
.sh-eyebrow i{width:7px;height:7px;border-radius:999px;background:#4A9EFF;box-shadow:0 0 12px rgba(74,158,255,.9);font-style:normal}
.sh-h1{font-family:${DISPLAY};font-weight:400;margin:0;color:#0A0A0A;line-height:.98;letter-spacing:-.018em}
.sh-grad{background:linear-gradient(120deg,#2A7DE1 0%,#4A9EFF 55%,#5BC9E8 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.sh-lede{font-size:clamp(1rem,1.3vw,1.16rem);line-height:1.7;color:rgba(10,10,10,.64)}
.sh-btns{display:flex;flex-wrap:wrap;gap:14px;justify-content:inherit}
.sh-b{display:inline-flex;align-items:center;gap:10px;padding:15px 28px;border-radius:999px;text-decoration:none;font-family:${MONO};font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;transition:transform .3s ease,box-shadow .3s ease,background .3s ease,color .3s ease,border-color .3s ease}
.sh-b.p{background:#2A7DE1;color:#fff;box-shadow:0 10px 28px rgba(42,125,225,.38)}
.sh-b.p:hover{background:#1F5FBF;transform:translateY(-2px);box-shadow:0 16px 36px rgba(42,125,225,.5)}
.sh-b.s{color:#0A0A0A;border:1px solid rgba(10,10,10,.2);background:rgba(255,255,255,.6)}
.sh-b.s:hover{border-color:#2A7DE1;color:#2A7DE1;transform:translateY(-2px)}
.sh-b.w{background:#fff;color:#1F5FBF;box-shadow:0 10px 28px rgba(10,30,80,.3)}
.sh-b.o{color:#fff;border:1px solid rgba(255,255,255,.55)}
.sh-in{animation:sh-in .95s cubic-bezier(.16,1,.3,1) both}
@keyframes sh-in{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
.sh-clip{overflow:hidden;display:inline-block;vertical-align:top;padding-bottom:.1em}
.sh-clip>span{display:inline-block;animation:sh-rise 1.05s cubic-bezier(.16,1,.3,1) both}
@keyframes sh-rise{from{transform:translateY(108%)}to{transform:none}}
.sh-marq{display:flex;flex-direction:column;gap:18px;animation:sh-up var(--t,34s) linear infinite}
@keyframes sh-up{to{transform:translateY(-50%)}}
.sh-marq.d{animation-direction:reverse}
.sh-row{display:flex;gap:20px;width:max-content;animation:sh-left var(--t,40s) linear infinite}
.sh-row.r{animation-direction:reverse}
@keyframes sh-left{to{transform:translateX(-50%)}}
.sh-float{animation:sh-fl var(--t,7s) ease-in-out var(--dl,0s) infinite}
@keyframes sh-fl{0%,100%{transform:translateY(0) rotate(var(--r,0deg))}50%{transform:translateY(-14px) rotate(calc(var(--r,0deg) + 1deg))}}
.sh-blink{animation:sh-bl 1s steps(1) infinite}@keyframes sh-bl{50%{opacity:0}}
.sh-ring{animation:sh-rg 2.4s ease-out infinite}@keyframes sh-rg{0%{transform:scale(.7);opacity:.6}100%{transform:scale(2);opacity:0}}
.sh-draw{stroke-dasharray:1;stroke-dashoffset:1;animation:sh-dw 4.5s cubic-bezier(.65,0,.35,1) .4s forwards}
@keyframes sh-dw{to{stroke-dashoffset:0}}
.sh-dash{animation:sh-dsh 1.6s linear infinite}@keyframes sh-dsh{to{stroke-dashoffset:-28}}
.sh-tick{display:flex;width:max-content;animation:sh-left 26s linear infinite}
.sh-sweep{animation:sh-sw 6s ease-in-out infinite}@keyframes sh-sw{0%,100%{transform:translateX(-12%)}50%{transform:translateX(12%)}}
.sh-pop{animation:sh-pp .7s cubic-bezier(.34,1.56,.64,1) both}
@keyframes sh-pp{from{transform:scale(.6) rotate(var(--r,0deg));opacity:0}to{transform:scale(1) rotate(var(--r,0deg));opacity:1}}
.sh-scrim{position:absolute;inset:0;pointer-events:none}
@media (prefers-reduced-motion:reduce){.sh-marq,.sh-row,.sh-float,.sh-tick,.sh-sweep,.sh-ring{animation:none!important}}
`;

function Eyebrow({ service, content }: HeroProps) {
  return (
    <span className="sh-eyebrow">
      <i />{service.number} &middot; {content.eyebrow}
    </span>
  );
}

function Headline({ lines, size, className }: { lines: [string, string]; size: string; className?: string }) {
  const words = (t: string, base: number, hot?: boolean) =>
    t.split(' ').map((w, i) => (
      <span key={w + i} className="sh-clip" style={{ marginRight: '0.22em' }}>
        <span className={hot ? 'sh-grad' : undefined} style={{ animationDelay: `${base + i * 0.07}s` }}>{w}</span>
      </span>
    ));
  return (
    <h1 className={`sh-h1 ${className ?? ''}`} style={{ fontSize: size }}>
      <span style={{ display: 'block' }}>{words(lines[0], 0.25)}</span>
      <span style={{ display: 'block' }}>{words(lines[1], 0.45, true)}</span>
    </h1>
  );
}

function Buttons({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  return (
    <div className="sh-btns">
      <Link href="/contact" className={`sh-b ${variant === 'dark' ? 'w' : 'p'}`}>Start this service <span>&rarr;</span></Link>
      <Link href="/services" className={`sh-b ${variant === 'dark' ? 'o' : 's'}`}>All services</Link>
    </div>
  );
}

function Img({ src, alt, ...rest }: { src: string; alt: string; style?: React.CSSProperties; sizes?: string }) {
  return <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 50vw, 33vw" style={{ objectFit: 'cover', ...rest.style }} />;
}


/* Compact art shown only below lg, so phones keep each hero's character. */
function MobileArt({ variant }: { variant: string }) {
  const wrap: React.CSSProperties = { position: 'relative', zIndex: 2, marginTop: 34, width: '100%', maxWidth: '100%' };

  if (variant === 'branding') {
    return (
      <div className="lg:hidden" style={{ ...wrap, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ position: 'relative', width: 128, height: 96, borderRadius: 12, overflow: 'hidden', flexShrink: 0, boxShadow: '0 18px 36px rgba(31,95,191,.24)' }}>
          <Img src="/services/brand-book.jpg" alt="Brand guidelines" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {['#0B2A66', '#1F5FBF', '#2A7DE1', '#4A9EFF', '#9CCBFF'].map((c, i) => (
              <span key={c} className="sh-pop" style={{ flex: 1, height: 34, borderRadius: 7, background: c, animationDelay: `${0.6 + i * 0.08}s` }} />
            ))}
          </div>
          <div style={{ marginTop: 8, fontFamily: MONO, fontSize: 11, letterSpacing: '.14em', color: '#2A7DE1' }}>PALETTE &middot; TYPE &middot; VOICE</div>
        </div>
      </div>
    );
  }

  if (variant === 'organic') {
    const imgs = ['/services/organic-1.jpg', '/services/organic-2.jpg', '/services/organic-3.jpg'];
    return (
      <div className="lg:hidden" aria-hidden style={{ ...wrap, overflow: 'hidden', maskImage: 'linear-gradient(90deg,transparent,black 10%,black 90%,transparent)', WebkitMaskImage: 'linear-gradient(90deg,transparent,black 10%,black 90%,transparent)' }}>
        <div className="sh-row" style={{ ['--t' as string]: '30s', gap: 12 }}>
          {[...imgs, ...imgs, ...imgs, ...imgs].map((src, i) => (
            <div key={i} style={{ position: 'relative', width: 96, aspectRatio: '4/5', flexShrink: 0, borderRadius: 10, overflow: 'hidden', background: '#E3EEFF', boxShadow: '0 12px 26px rgba(31,95,191,.16)' }}>
              <Img src={src} alt="" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'performance') {
    return (
      <div className="lg:hidden" style={{ ...wrap, display: 'flex', gap: 12, alignItems: 'stretch' }}>
        <div style={{ flex: 1, padding: '12px 14px', borderRadius: 14, background: 'rgba(255,255,255,.88)', border: '1px solid rgba(74,158,255,.3)', boxShadow: '0 14px 32px rgba(42,125,225,.14)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '.14em', color: 'rgba(10,10,10,.5)' }}>ROAS</span>
            <span style={{ fontFamily: DISPLAY, fontSize: 20, color: '#2A7DE1' }}>4.2&times;</span>
          </div>
          <svg viewBox="0 0 150 44" width="100%" height="44" style={{ marginTop: 6, display: 'block' }} fill="none">
            <path d="M2 38 L28 32 L54 35 L80 22 L106 18 L148 4" stroke="#2A7DE1" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="sh-draw" />
            <circle cx="148" cy="4" r="3.4" fill="#fff" stroke="#2A7DE1" strokeWidth="2" />
          </svg>
        </div>
        <div style={{ position: 'relative', width: 104, borderRadius: 14, overflow: 'hidden', flexShrink: 0, boxShadow: '0 16px 34px rgba(31,95,191,.22)' }}>
          <Img src="/services/perf-1.jpg" alt="Ad creative" />
        </div>
      </div>
    );
  }

  if (variant === 'social') {
    const imgs = ['/services/social-1.jpg', '/services/social-2.jpg', '/services/social-3.jpg'];
    return (
      <div className="lg:hidden" style={{ ...wrap, display: 'flex', justifyContent: 'center', gap: 12 }}>
        {imgs.map((src, i) => (
          <div key={src} className="sh-float" style={{ width: 84, ['--r' as string]: `${(i - 1) * 6}deg`, ['--t' as string]: `${6 + i}s`, ['--dl' as string]: `${-i * 0.7}s` }}>
            <div style={{ position: 'relative', aspectRatio: '9/17', borderRadius: 14, overflow: 'hidden', border: '3px solid #fff', background: '#E3EEFF', boxShadow: '0 18px 36px rgba(31,95,191,.26)' }}>
              <Img src={src} alt="" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'consultation') {
    return (
      <div className="lg:hidden" style={{ ...wrap, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        {[{ t: 'Audit first', c: '#DCEBFF', r: -5 }, { t: 'Ship weekly', c: '#CFE4FF', r: 4 }].map((n, i) => (
          <span key={n.t} style={{ padding: '14px 12px', background: n.c, borderRadius: 4, transform: `rotate(${n.r}deg)`, fontFamily: 'var(--font-caveat), cursive', fontSize: 18, color: '#0B2A66', boxShadow: '0 12px 24px rgba(31,95,191,.16)' }}>{n.t}</span>
        ))}
        <span style={{ position: 'relative', width: 96, padding: 6, paddingBottom: 18, background: '#fff', borderRadius: 3, transform: 'rotate(3deg)', boxShadow: '0 16px 32px rgba(31,95,191,.22)' }}>
          <span style={{ position: 'relative', display: 'block', aspectRatio: '4/3', overflow: 'hidden', background: '#E3EEFF' }}>
            <Img src="/services/session.jpg" alt="" />
          </span>
        </span>
      </div>
    );
  }
  return null;
}

/* ══════════ 01 · BRANDING — identity board, giant wordmark, swatch rail ══════════ */
function BrandingHero({ service, content }: HeroProps) {
  return (
    <section className="sh" style={{ alignItems: 'center', padding: 'clamp(7rem,14vh,9rem) 0 clamp(4rem,8vh,6rem)' }}>
      <span aria-hidden style={{ position: 'absolute', right: '-6%', top: '6%', fontFamily: DISPLAY, fontSize: 'clamp(12rem,30vw,28rem)', lineHeight: .8, color: 'rgba(42,125,225,0.07)', userSelect: 'none', whiteSpace: 'nowrap' }}>Aa</span>
      <div aria-hidden className="sh-scrim" style={{ backgroundImage: 'linear-gradient(rgba(74,158,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(74,158,255,.08) 1px,transparent 1px)', backgroundSize: '64px 64px', maskImage: 'radial-gradient(ellipse at 30% 40%,black,transparent 72%)', WebkitMaskImage: 'radial-gradient(ellipse at 30% 40%,black,transparent 72%)' }} />

      <div className="hidden lg:flex" aria-hidden style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 26, flexDirection: 'column' }}>
        {['#0B2A66', '#1F5FBF', '#2A7DE1', '#4A9EFF', '#9CCBFF', '#E3EEFF'].map((c, i) => (
          <div key={c} className="sh-pop" style={{ flex: 1, background: c, animationDelay: `${0.5 + i * 0.09}s` }} />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1400, margin: '0 auto', padding: '0 clamp(1.25rem,5vw,5rem)' }}>
        <div className="sh-in" style={{ animationDelay: '.1s' }}><Eyebrow service={service} content={content} /></div>
        <Headline lines={[content.titleLine1, content.titleLine2]} size="clamp(3rem,9.5vw,9rem)" />

        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 items-end" style={{ marginTop: 'clamp(2rem,4vw,3.5rem)' }}>
          <div>
            <p className="sh-lede sh-in" style={{ maxWidth: 440, margin: 0, animationDelay: '.9s' }}>{content.heroCopy}</p>
            <div className="sh-in" style={{ marginTop: 32, animationDelay: '1.05s' }}><Buttons /></div>
            <MobileArt variant="branding" />
          </div>

          <div className="hidden lg:block" style={{ position: 'relative', height: 300 }}>
            <div className="sh-float sh-in" style={{ position: 'absolute', right: 70, bottom: 0, width: 300, height: 226, borderRadius: 14, overflow: 'hidden', boxShadow: '0 40px 80px rgba(31,95,191,.3)', transform: 'rotate(-5deg)', animationDelay: '.7s', ['--r' as string]: '-5deg', ['--t' as string]: '9s' }}>
              <Img src="/services/brand-book.jpg" alt="Brand guidelines in use" />
            </div>
            <div className="sh-float sh-in" style={{ position: 'absolute', right: 0, bottom: 96, width: 156, padding: 16, background: '#fff', borderRadius: 14, boxShadow: '0 26px 54px rgba(31,95,191,.22)', transform: 'rotate(4deg)', animationDelay: '.95s', ['--r' as string]: '4deg', ['--t' as string]: '7s' }}>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '.16em', color: '#2A7DE1' }}>LOGO / MARK</div>
              <svg viewBox="0 0 120 90" style={{ width: '100%', marginTop: 8 }} fill="none">
                <path d="M60 18L92 36v36L60 90 28 72V36Z" fill="url(#bhG)" />
                <path d="M60 34l16 22-16 22-16-22Z" fill="#fff" fillOpacity=".95" />
                <defs><linearGradient id="bhG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4A9EFF" /><stop offset="1" stopColor="#12388A" /></linearGradient></defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════ 02 · ORGANIC — full-bleed feed wall behind centred type ══════════ */
function OrganicHero({ service, content }: HeroProps) {
  const cols = [
    { imgs: ['/services/organic-1.jpg', '/services/organic-2.jpg'], t: '38s', d: false },
    { imgs: ['/services/organic-3.jpg', '/services/organic-1.jpg'], t: '30s', d: true },
    { imgs: ['/services/organic-2.jpg', '/services/organic-3.jpg'], t: '44s', d: false },
    { imgs: ['/services/organic-1.jpg', '/services/organic-3.jpg'], t: '34s', d: true },
  ];
  return (
    <section className="sh" style={{ alignItems: 'center', justifyContent: 'center', padding: 'clamp(7rem,14vh,9rem) 1.25rem 4rem' }}>
      <div aria-hidden className="hidden md:flex" style={{ position: 'absolute', inset: '-12% -14%', gap: 22, transform: 'rotate(-7deg) scale(1.12)' }}>
        {cols.map((c, i) => (
          <div key={i} style={{ flex: 1, overflow: 'hidden', maskImage: 'linear-gradient(transparent,black 18%,black 82%,transparent)', WebkitMaskImage: 'linear-gradient(transparent,black 18%,black 82%,transparent)' }}>
            <div className={`sh-marq${c.d ? ' d' : ''}`} style={{ ['--t' as string]: c.t }}>
              {[...c.imgs, ...c.imgs, ...c.imgs, ...c.imgs].map((src, k) => (
                <div key={k} style={{ position: 'relative', width: '100%', aspectRatio: '4/5', borderRadius: 14, overflow: 'hidden', background: '#E3EEFF', boxShadow: '0 18px 44px rgba(31,95,191,.16)' }}>
                  <Img src={src} alt="" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div aria-hidden className="sh-scrim" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(250,250,247,.99) 30%, rgba(250,250,247,.93) 48%, rgba(250,250,247,.62) 68%, rgba(250,250,247,.2) 86%)' }} />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%', maxWidth: 940 }}>
        <div className="sh-in" style={{ animationDelay: '.1s' }}><Eyebrow service={service} content={content} /></div>
        <div style={{ marginTop: 20 }}>
          <Headline lines={[content.titleLine1, content.titleLine2]} size="clamp(2.8rem,7.6vw,7rem)" />
        </div>
        <p className="sh-lede sh-in" style={{ maxWidth: 520, margin: '26px auto 0', animationDelay: '.9s' }}>{content.heroCopy}</p>
        <div className="sh-in" style={{ marginTop: 32, display: 'flex', justifyContent: 'center', animationDelay: '1.05s' }}><Buttons /></div>
        <div className="sh-in" style={{ marginTop: 34, display: 'inline-flex', alignItems: 'center', gap: 12, padding: '9px 18px', borderRadius: 999, background: 'rgba(255,255,255,.85)', border: '1px solid rgba(74,158,255,.3)', boxShadow: '0 12px 30px rgba(42,125,225,.12)', animationDelay: '1.2s' }}>
          <span style={{ position: 'relative', width: 8, height: 8 }}>
            <span style={{ position: 'absolute', inset: 0, borderRadius: 999, background: '#2A7DE1' }} />
            <span className="sh-ring" style={{ position: 'absolute', inset: 0, borderRadius: 999, background: '#2A7DE1' }} />
          </span>
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '.14em', color: '#1F5FBF' }}>PUBLISHING TODAY &middot; 3 POSTS &middot; 2 REELS</span>
        </div>
        <MobileArt variant="organic" />
      </div>
    </section>
  );
}

/* ══════════ 03 · PERFORMANCE — results board, chart bleeding off, live ticker ══════════ */
function PerformanceHero({ service, content }: HeroProps) {
  const ticks = ['ROAS 4.2×', 'CPA ▼ 32%', 'CTR 3.8%', 'SPEND OPTIMISED', 'CVR ▲ 18%', 'REVENUE ▲ 2.4×'];
  return (
    <section className="sh" style={{ alignItems: 'flex-end', padding: 'clamp(7rem,14vh,9rem) 0 0' }}>
      <svg aria-hidden viewBox="0 0 900 500" preserveAspectRatio="none" className="hidden md:block" style={{ position: 'absolute', right: 0, top: 0, width: '68%', height: '74%' }} fill="none">
        <defs>
          <linearGradient id="phA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4A9EFF" stopOpacity=".34" /><stop offset="1" stopColor="#4A9EFF" stopOpacity="0" /></linearGradient>
        </defs>
        <path d="M0 470 L130 430 L250 448 L380 360 L500 322 L640 214 L770 150 L900 40 L900 500 L0 500Z" fill="url(#phA)" />
        <path d="M0 470 L130 430 L250 448 L380 360 L500 322 L640 214 L770 150 L900 40" stroke="#2A7DE1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="sh-draw" />
      </svg>
      <div aria-hidden className="sh-scrim" style={{ background: 'radial-gradient(ellipse at 20% 80%, rgba(74,158,255,.22), transparent 62%)' }} />

      <div className="hidden lg:block sh-float sh-in" style={{ position: 'absolute', right: '7%', top: '26%', width: 190, height: 190, borderRadius: 16, overflow: 'hidden', boxShadow: '0 34px 70px rgba(31,95,191,.28)', transform: 'rotate(4deg)', animationDelay: '.8s', ['--r' as string]: '4deg', ['--t' as string]: '8s' }}>
        <Img src="/services/perf-1.jpg" alt="Ad creative" />
        <span style={{ position: 'absolute', left: 10, top: 10, padding: '3px 9px', borderRadius: 999, background: 'rgba(255,255,255,.92)', fontFamily: MONO, fontSize: 11, letterSpacing: '.14em', color: '#1F5FBF' }}>WINNER</span>
      </div>
      <div className="hidden lg:block sh-float sh-in" style={{ position: 'absolute', right: '25%', top: '14%', width: 140, height: 140, borderRadius: 16, overflow: 'hidden', boxShadow: '0 26px 56px rgba(31,95,191,.22)', transform: 'rotate(-6deg)', opacity: .92, animationDelay: '1s', ['--r' as string]: '-6deg', ['--t' as string]: '6.5s' }}>
        <Img src="/services/perf-2.jpg" alt="Ad creative variant" />
      </div>

      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1400, margin: '0 auto', padding: '0 clamp(1.25rem,5vw,5rem) clamp(5rem,9vh,7rem)' }}>
        <div className="sh-in" style={{ animationDelay: '.1s' }}><Eyebrow service={service} content={content} /></div>
        <div style={{ marginTop: 18 }}>
          <Headline lines={[content.titleLine1, content.titleLine2]} size="clamp(2.9rem,8.6vw,8rem)" />
        </div>
        <div className="grid md:grid-cols-[minmax(0,1fr)_auto] gap-8 items-end" style={{ marginTop: 'clamp(1.5rem,3vw,2.5rem)' }}>
          <p className="sh-lede sh-in" style={{ maxWidth: 440, margin: 0, animationDelay: '.9s' }}>{content.heroCopy}</p>
          <div className="sh-in" style={{ animationDelay: '1.05s' }}><Buttons /></div>
        </div>
        <MobileArt variant="performance" />
      </div>

      <div aria-hidden style={{ position: 'absolute', left: 0, right: 0, bottom: 0, borderTop: '1px solid rgba(74,158,255,.28)', background: 'rgba(255,255,255,.7)', backdropFilter: 'blur(8px)', overflow: 'hidden', padding: '13px 0' }}>
        <div className="sh-tick">
          {[0, 1].map(k => (
            <div key={k} style={{ display: 'flex', flexShrink: 0 }}>
              {ticks.map(t => (
                <span key={t + k} style={{ display: 'inline-flex', alignItems: 'center', fontFamily: MONO, fontSize: 11, letterSpacing: '.18em', color: '#1F5FBF', whiteSpace: 'nowrap' }}>
                  {t}<span style={{ margin: '0 26px', color: '#9CCBFF' }}>/</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════ 04 · SOCIAL — phone wall collage, centred type ══════════ */
function SocialHero({ service, content }: HeroProps) {
  const phones = [
    { src: '/services/social-1.jpg', l: '3%', t: '16%', r: -9, w: 190, d: '0s' },
    { src: '/services/social-2.jpg', l: '19%', t: '46%', r: 5, w: 168, d: '.15s' },
    { src: '/services/social-3.jpg', l: '69%', t: '12%', r: 7, w: 178, d: '.3s' },
    { src: '/services/social-4.jpg', l: '82%', t: '52%', r: -6, w: 160, d: '.45s' },
  ];
  return (
    <section className="sh" style={{ alignItems: 'center', justifyContent: 'center', padding: 'clamp(7rem,14vh,9rem) 1.25rem 4rem' }}>
      <div aria-hidden className="sh-scrim" style={{ background: 'radial-gradient(circle at 50% 45%, rgba(74,158,255,.18), transparent 60%)' }} />
      {phones.map((p, i) => (
        <div key={i} className="hidden lg:block sh-float sh-in" style={{ position: 'absolute', left: p.l, top: p.t, width: p.w, animationDelay: p.d, ['--r' as string]: `${p.r}deg`, ['--t' as string]: `${7 + i}s` }}>
          <div style={{ position: 'relative', aspectRatio: '9/17', borderRadius: 26, overflow: 'hidden', background: '#fff', border: '5px solid #fff', boxShadow: '0 34px 70px rgba(31,95,191,.3)' }}>
            <Img src={p.src} alt="" />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '38%', background: 'linear-gradient(transparent, rgba(11,42,102,.55))' }} />
            <div style={{ position: 'absolute', left: 12, bottom: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
              <svg width="15" height="14" viewBox="0 0 15 14"><path d="M7.5 13C7.5 13 1 8.8 1 4.6C1 2.6 2.5 1.2 4.3 1.2C5.7 1.2 6.9 2 7.5 3.2C8.1 2 9.3 1.2 10.7 1.2C12.5 1.2 14 2.6 14 4.6C14 8.8 7.5 13 7.5 13Z" fill="#fff" /></svg>
              <span style={{ fontFamily: MONO, fontSize: 11, color: '#fff' }}>{['2.4K', '860', '1.1K', '312'][i]}</span>
            </div>
          </div>
        </div>
      ))}

      <div style={{ position: 'relative', zIndex: 3, textAlign: 'center', width: '100%', maxWidth: 800 }}>
        <div className="sh-in" style={{ animationDelay: '.1s' }}><Eyebrow service={service} content={content} /></div>
        <div style={{ marginTop: 20 }}>
          <Headline lines={[content.titleLine1, content.titleLine2]} size="clamp(2.8rem,7.4vw,6.6rem)" />
        </div>
        <p className="sh-lede sh-in" style={{ maxWidth: 470, margin: '24px auto 0', animationDelay: '.9s' }}>{content.heroCopy}</p>
        <div className="sh-in" style={{ marginTop: 32, display: 'flex', justifyContent: 'center', animationDelay: '1.05s' }}><Buttons /></div>
        <MobileArt variant="social" />
      </div>
    </section>
  );
}

/* ══════════ 05 · INFLUENCER — creator marquee rows under the headline ══════════ */
function InfluencerHero({ service, content }: HeroProps) {
  const people = [
    { src: '/services/creator-1.jpg', h: '@nova.lens', f: '12.4K' },
    { src: '/services/creator-2.jpg', h: '@kite.run', f: '8.1K' },
    { src: '/services/creator-3.jpg', h: '@pixel.jo', f: '21.0K' },
  ];
  const row = [...people, ...people, ...people, ...people];
  return (
    <section className="sh" style={{ flexDirection: 'column', justifyContent: 'center', gap: 'clamp(1.5rem,3vw,2.4rem)', padding: 'clamp(6.5rem,12vh,8rem) 0 clamp(3.5rem,7vh,5.5rem)' }}>
      <div aria-hidden className="sh-scrim" style={{ background: 'radial-gradient(ellipse at 50% 22%, rgba(74,158,255,.2), transparent 58%)' }} />
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 1.25rem', maxWidth: 900, margin: '0 auto' }}>
        <div className="sh-in" style={{ animationDelay: '.1s' }}><Eyebrow service={service} content={content} /></div>
        <div style={{ marginTop: 18 }}>
          <Headline lines={[content.titleLine1, content.titleLine2]} size="clamp(2.5rem,6.4vw,5.8rem)" />
        </div>
        <p className="sh-lede sh-in" style={{ maxWidth: 500, margin: '22px auto 0', animationDelay: '.9s' }}>{content.heroCopy}</p>
        <div className="sh-in" style={{ marginTop: 28, display: 'flex', justifyContent: 'center', animationDelay: '1.05s' }}><Buttons /></div>
      </div>

      <div aria-hidden style={{ position: 'relative', zIndex: 2, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16, overflow: 'hidden', maskImage: 'linear-gradient(90deg,transparent,black 12%,black 88%,transparent)', WebkitMaskImage: 'linear-gradient(90deg,transparent,black 12%,black 88%,transparent)' }}>
        {[{ r: false, t: '48s' }, { r: true, t: '58s' }].map((cfg, ri) => (
          <div key={ri} className={`sh-row${cfg.r ? ' r' : ''}`} style={{ ['--t' as string]: cfg.t }}>
            {row.map((p, i) => (
              <div key={i} style={{ position: 'relative', width: 108, flexShrink: 0 }}>
                <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 14, overflow: 'hidden', background: '#E3EEFF', boxShadow: '0 18px 40px rgba(31,95,191,.18)' }}>
                  <Img src={p.src} alt="" />
                </div>
                <div style={{ position: 'absolute', left: 8, bottom: 8, right: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, padding: '5px 9px', borderRadius: 999, background: 'rgba(255,255,255,.93)', backdropFilter: 'blur(6px)' }}>
                  <span style={{ fontFamily: MONO, fontSize: 11, color: '#0B2A66' }}>{p.h}</span>
                  <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, color: '#2A7DE1' }}>{p.f}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div aria-hidden className="hidden lg:flex" style={{ position: 'absolute', left: '6%', bottom: '9%', alignItems: 'center', gap: 10, padding: '9px 16px', borderRadius: 999, background: '#fff', border: '1px solid rgba(74,158,255,.3)', boxShadow: '0 16px 36px rgba(42,125,225,.16)' }}>
        <svg width="14" height="16" viewBox="0 0 14 16"><path d="M7 0C3 0 0 3 0 6.4 0 11 7 16 7 16s7-5 7-9.6C14 3 11 0 7 0Z" fill="#2A7DE1" /><circle cx="7" cy="6.2" r="2.6" fill="#fff" /></svg>
        <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '.14em', color: '#1F5FBF' }}>+ OOH, PRINT &amp; ACTIVATIONS</span>
      </div>
    </section>
  );
}

/* ══════════ 06 · EVENTS — cinematic full-bleed frame with film title ══════════ */
function EventsHero({ service, content }: HeroProps) {
  return (
    <section className="sh" style={{ alignItems: 'flex-end', background: '#071C44' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0 }}>
        <Image src="/services/event-wide.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(7,28,68,.94) 0%, rgba(13,52,124,.72) 42%, rgba(42,125,225,.34) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 38%, rgba(5,20,52,.86))' }} />
      </div>

      <svg aria-hidden viewBox="0 0 100 60" preserveAspectRatio="none" className="hidden md:block sh-sweep" style={{ position: 'absolute', top: 0, left: '18%', width: '64%', height: '76%', opacity: .5 }}>
        <defs><linearGradient id="ehB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8FD8F5" stopOpacity=".55" /><stop offset="1" stopColor="#8FD8F5" stopOpacity="0" /></linearGradient></defs>
        <path d="M22 0h8L58 60H2Z" fill="url(#ehB)" /><path d="M68 0h8l14 60H48Z" fill="url(#ehB)" />
      </svg>

      <div aria-hidden className="hidden md:block" style={{ position: 'absolute', top: 'clamp(6rem,12vh,8rem)', left: 'clamp(1.5rem,5vw,5rem)', right: 'clamp(1.5rem,5vw,5rem)', display: 'flex', justifyContent: 'space-between', fontFamily: MONO, fontSize: 11, letterSpacing: '.18em', color: 'rgba(255,255,255,.82)' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <span className="sh-blink" style={{ width: 9, height: 9, borderRadius: 999, background: '#FF6B6B' }} />REC &middot; 00:12:08:14
        </span>
        <span>4K &middot; 60FPS &middot; f/2.8</span>
      </div>

      <div aria-hidden className="hidden lg:flex" style={{ position: 'absolute', right: 'clamp(1.5rem,5vw,5rem)', bottom: 'clamp(3rem,7vh,5rem)', gap: 14 }}>
        {['/services/event-1.jpg', '/services/event-2.jpg'].map((src, i) => (
          <div key={src} className="sh-in" style={{ position: 'relative', width: 150, height: 100, borderRadius: 10, overflow: 'hidden', border: '2px solid rgba(255,255,255,.65)', boxShadow: '0 20px 44px rgba(0,0,0,.4)', animationDelay: `${1.1 + i * 0.15}s` }}>
            <Img src={src} alt="" />
          </div>
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1400, margin: '0 auto', padding: '0 clamp(1.25rem,5vw,5rem) clamp(3.5rem,8vh,6rem)' }}>
        <span className="sh-eyebrow sh-in" style={{ color: '#9EDBFF', animationDelay: '.1s' }}><i style={{ background: '#8FD8F5' }} />{service.number} &middot; {content.eyebrow}</span>
        <h1 className="sh-h1" style={{ fontSize: 'clamp(2.9rem,8.4vw,7.6rem)', color: '#fff', marginTop: 16 }}>
          <span style={{ display: 'block' }}>{content.titleLine1.split(' ').map((w, i) => <span key={i} className="sh-clip" style={{ marginRight: '.22em' }}><span style={{ animationDelay: `${0.25 + i * 0.07}s` }}>{w}</span></span>)}</span>
          <span style={{ display: 'block', color: '#8FD8F5' }}>{content.titleLine2.split(' ').map((w, i) => <span key={i} className="sh-clip" style={{ marginRight: '.22em' }}><span style={{ animationDelay: `${0.45 + i * 0.07}s` }}>{w}</span></span>)}</span>
        </h1>
        <p className="sh-lede sh-in" style={{ maxWidth: 440, marginTop: 22, color: 'rgba(255,255,255,.78)', animationDelay: '.9s' }}>{content.heroCopy}</p>
        <div className="sh-in" style={{ marginTop: 30, animationDelay: '1.05s' }}><Buttons variant="dark" /></div>
      </div>
    </section>
  );
}

/* ══════════ 07 · CONSULTATION — whiteboard desk with notes and a drawn plan ══════════ */
function ConsultationHero({ service, content }: HeroProps) {
  const notes = [
    { t: 'Audit first', c: '#DCEBFF', r: -6, l: '4%', tp: '20%' },
    { t: 'Own the niche', c: '#CFE4FF', r: 5, l: '11%', tp: '58%' },
    { t: 'Ship weekly', c: '#E2F1FF', r: -3, l: '84%', tp: '24%' },
    { t: 'Then scale', c: '#D6E9FF', r: 7, l: '79%', tp: '62%' },
  ];
  return (
    <section className="sh" style={{ alignItems: 'center', justifyContent: 'center', padding: 'clamp(7rem,14vh,9rem) 1.25rem 4rem', background: '#FBFBF8' }}>
      <div aria-hidden className="sh-scrim" style={{ backgroundImage: 'radial-gradient(rgba(42,125,225,.2) 1.1px, transparent 1.2px)', backgroundSize: '26px 26px', maskImage: 'radial-gradient(ellipse at 50% 50%,black,transparent 72%)', WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%,black,transparent 72%)' }} />

      <svg aria-hidden viewBox="0 0 1200 700" preserveAspectRatio="none" className="hidden md:block" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} fill="none">
        <path d="M110 640C300 640 300 580 480 556S820 500 980 452" stroke="#4A9EFF" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 12" className="sh-dash" opacity=".65" />
        <circle cx="110" cy="640" r="9" fill="#fff" stroke="#2A7DE1" strokeWidth="3" />
        <circle cx="480" cy="556" r="9" fill="#fff" stroke="#2A7DE1" strokeWidth="3" />
        <path d="M980 452l34-18-8 34Z" fill="#2A7DE1" />
      </svg>

      {notes.map((n, i) => (
        <div key={n.t} className="hidden lg:block sh-float sh-in" aria-hidden style={{ position: 'absolute', left: n.l, top: n.tp, width: 138, padding: '16px 14px', background: n.c, borderRadius: 4, boxShadow: '0 16px 34px rgba(31,95,191,.18)', fontFamily: 'var(--font-caveat), cursive', fontSize: 21, color: '#0B2A66', animationDelay: `${0.6 + i * 0.12}s`, ['--r' as string]: `${n.r}deg`, ['--t' as string]: `${7 + i}s` }}>
          {n.t}
        </div>
      ))}

      <div className="hidden lg:block sh-in" aria-hidden style={{ position: 'absolute', right: '6%', bottom: '10%', width: 208, padding: 10, paddingBottom: 34, background: '#fff', borderRadius: 3, transform: 'rotate(4deg)', boxShadow: '0 28px 60px rgba(31,95,191,.26)', animationDelay: '1.15s' }}>
        <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: '#E3EEFF' }}>
          <Img src="/services/session.jpg" alt="" />
        </div>
        <span style={{ position: 'absolute', left: 14, bottom: 9, fontFamily: 'var(--font-caveat), cursive', fontSize: 17, color: '#2A7DE1' }}>session 01</span>
      </div>

      <div style={{ position: 'relative', zIndex: 3, textAlign: 'center', width: '100%', maxWidth: 760 }}>
        <div className="sh-in" style={{ animationDelay: '.1s' }}><Eyebrow service={service} content={content} /></div>
        <div style={{ marginTop: 20, position: 'relative', display: 'inline-block' }}>
          <Headline lines={[content.titleLine1, content.titleLine2]} size="clamp(2.7rem,7vw,6.4rem)" />
          <svg aria-hidden viewBox="0 0 400 16" preserveAspectRatio="none" style={{ position: 'absolute', left: '6%', right: '6%', bottom: -20, width: '88%', height: 14 }}>
            <path d="M4 10c90-8 200-9 392-4" stroke="#4A9EFF" strokeWidth="5" strokeLinecap="round" fill="none" pathLength={1} className="sh-draw" opacity=".55" />
          </svg>
        </div>
        <p className="sh-lede sh-in" style={{ maxWidth: 480, margin: '30px auto 0', animationDelay: '.9s' }}>{content.heroCopy}</p>
        <div className="sh-in" style={{ marginTop: 32, display: 'flex', justifyContent: 'center', animationDelay: '1.05s' }}><Buttons /></div>
        <MobileArt variant="consultation" />
      </div>
    </section>
  );
}

export const SERVICE_HEROES: Record<string, (p: HeroProps) => ReactNode> = {
  'branding-identity': BrandingHero,
  'organic-marketing': OrganicHero,
  'performance-marketing': PerformanceHero,
  'social-media-management': SocialHero,
  'influencer-offline-marketing': InfluencerHero,
  'events-photography-videography': EventsHero,
  'consultation-business-development': ConsultationHero,
};
