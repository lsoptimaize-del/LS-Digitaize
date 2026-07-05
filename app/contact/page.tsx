'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SERVICES = [
  'Branding & Identity',
  'Content Strategy',
  'Performance Marketing',
  'Social Media',
  'Event Curation',
  'Business Development',
  'Something Else',
];

type Step = 'service' | 'name' | 'phone' | 'email' | 'message' | 'done';
const STEPS: Step[] = ['service', 'name', 'phone', 'email', 'message', 'done'];

const STEP_META: Record<Exclude<Step, 'done'>, { num: string; question: string; hint?: string }> = {
  service: { num: '01', question: 'What are you looking for?' },
  name:    { num: '02', question: 'What\'s your name?' },
  phone:   { num: '03', question: 'Best number to reach you?', hint: 'Optional — skip if you prefer.' },
  email:   { num: '04', question: 'And your email?' },
  message: { num: '05', question: 'Anything else we should know?', hint: 'Goals, timeline, budget — whatever helps.' },
};

export default function ContactPage() {
  const [step, setStep] = useState<Step>('service');
  const [form, setForm] = useState({ service: '', name: '', phone: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const stepIndex = STEPS.indexOf(step);

  const advance = useCallback(() => {
    const next = STEPS[stepIndex + 1];
    if (next) setStep(next);
  }, [stepIndex]);

  const canAdvance = () => {
    if (step === 'service') return !!form.service;
    if (step === 'name')    return form.name.trim().length > 0;
    if (step === 'phone')   return true; // optional
    if (step === 'email')   return form.email.trim().length > 0;
    if (step === 'message') return form.message.trim().length > 0;
    return false;
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && step !== 'message' && step !== 'service' && canAdvance()) {
      e.preventDefault();
      advance();
    }
  };

  const handleSubmit = async () => {
    setSending(true);
    await new Promise(r => setTimeout(r, 1600));
    setSending(false);
    setStep('done');
  };

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 350);
  }, [step]);

  const inputStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.2)',
    color: '#fff',
    fontFamily: 'var(--font-sevone)',
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    outline: 'none',
    width: '100%',
    padding: '0.5rem 0 0.75rem',
    transition: 'border-color 0.25s',
    lineHeight: 1.1,
  };

  const progressPct = Math.round((stepIndex / (STEPS.length - 1)) * 100);

  return (
    <div style={{ minHeight: '100vh', background: '#05070c', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, paddingTop: 'clamp(7rem, 14vh, 11rem)', paddingBottom: '6rem' }}>
        <div className="contact-grid" style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 5vw, 4rem)',
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: 'clamp(4rem, 10vw, 10rem)',
          alignItems: 'start',
        }}>

          {/* ── LEFT ── */}
          <div className="contact-left-col" style={{ position: 'sticky', top: '9rem' }}>
            <div className="contact-header">
              {/* Status badge */}
              <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.4rem 1rem',
              border: '1px solid rgba(74,158,255,0.3)',
              borderRadius: '99px',
              marginBottom: '2.5rem',
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4A9EFF', display: 'block', boxShadow: '0 0 6px #4A9EFF' }} />
              <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
                Accepting New Projects
              </span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-sevone)',
              fontSize: 'clamp(3rem, 5.5vw, 5.5rem)',
              color: '#F2F6FC',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              marginBottom: '2rem',
            }}>
              Let's Build<br />
              <span style={{ color: '#4A9EFF' }}>Something<br />Great.</span>
            </h1>

            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: '360px', marginBottom: '3.5rem' }}>
              Tell us about your project and we'll get back to you within 24 hours.
            </p>
            </div>

            {/* Contact details */}
            <div className="contact-footer" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <a href="mailto:contact@lsdigitaize.com" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'rgba(255,255,255,0.6)', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: '0 0 0.2rem' }}>Email Us</p>
                  <p style={{ fontSize: '0.95rem', margin: 0 }}>contact@lsdigitaize.com</p>
                </div>
              </a>

              <a href="https://instagram.com/lsdigitaize" target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'rgba(255,255,255,0.6)', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: '0 0 0.2rem' }}>Instagram</p>
                  <p style={{ fontSize: '0.95rem', margin: 0 }}>@lsdigitaize</p>
                </div>
              </a>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'rgba(255,255,255,0.6)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: '0 0 0.2rem' }}>Location</p>
                  <p style={{ fontSize: '0.95rem', margin: 0 }}>Bangalore, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Step-by-step form ── */}
          <div className="contact-right-col">
            <style>{`
              @keyframes slideUp {
                from { opacity: 0; transform: translateY(28px); }
                to   { opacity: 1; transform: translateY(0); }
              }
              .contact-step { animation: slideUp 0.45s cubic-bezier(0.25,1,0.2,1) forwards; }
              input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.18); }
              
              @media (max-width: 900px) {
                .contact-grid {
                  grid-template-columns: 1fr !important;
                  gap: 4rem !important;
                }
                .contact-left-col {
                  display: contents; /* Allows children to become grid items */
                }
                .contact-header {
                  order: 1;
                }
                .contact-right-col {
                  order: 2;
                }
                .contact-footer {
                  order: 3;
                }
              }
            `}</style>

            {/* Thin top progress bar */}
            {step !== 'done' && (
              <div style={{ marginBottom: '3.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                    Step {stepIndex + 1} of {STEPS.length - 1}
                  </span>
                  <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>
                    {progressPct}%
                  </span>
                </div>
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, height: '1px', width: `${progressPct}%`, background: '#4A9EFF', transition: 'width 0.5s ease' }} />
                </div>
              </div>
            )}

            {/* DONE */}
            {step === 'done' ? (
              <div className="contact-step" style={{ paddingTop: '2rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>✦</div>
                <h2 style={{ fontFamily: 'var(--font-sevone)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#F2F6FC', lineHeight: 0.95, marginBottom: '1.5rem' }}>
                  Message<br />Received.
                </h2>
                <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                  Thanks {form.name.split(' ')[0]}. We'll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <div key={step} className="contact-step">
                {/* Step label */}
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.65rem', color: '#4A9EFF', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
                  {STEP_META[step].num}
                </p>

                {/* Question */}
                <h2 style={{ fontFamily: 'var(--font-sevone)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: 'rgba(255,255,255,0.9)', lineHeight: 1.1, marginBottom: '0.6rem' }}>
                  {STEP_META[step].question}
                </h2>
                {STEP_META[step].hint && (
                  <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-geist-mono)', marginBottom: '2rem' }}>
                    {STEP_META[step].hint}
                  </p>
                )}
                {!STEP_META[step].hint && <div style={{ height: '2rem' }} />}

                {/* SERVICE: pill grid */}
                {step === 'service' && (
                  <>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2.5rem' }}>
                      {SERVICES.map(s => (
                        <button key={s} onClick={() => { setForm(p => ({ ...p, service: s })); setTimeout(advance, 250); }}
                          style={{
                            padding: '0.8rem 1.5rem',
                            borderRadius: '99px',
                            border: form.service === s ? '1.5px solid #4A9EFF' : '1px solid rgba(255,255,255,0.15)',
                            background: form.service === s ? 'rgba(74,158,255,0.12)' : 'transparent',
                            color: form.service === s ? '#4A9EFF' : 'rgba(255,255,255,0.6)',
                            fontFamily: 'var(--font-geist-mono)',
                            fontSize: '0.82rem',
                            letterSpacing: '0.04em',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {/* NAME */}
                {step === 'name' && (
                  <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type="text" placeholder="Your full name"
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    onKeyDown={handleKey}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderBottomColor = 'rgba(74,158,255,0.6)')}
                    onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.2)')}
                  />
                )}

                {/* PHONE */}
                {step === 'phone' && (
                  <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type="tel" placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                    onKeyDown={handleKey}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderBottomColor = 'rgba(74,158,255,0.6)')}
                    onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.2)')}
                  />
                )}

                {/* EMAIL */}
                {step === 'email' && (
                  <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type="email" placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    onKeyDown={handleKey}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderBottomColor = 'rgba(74,158,255,0.6)')}
                    onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.2)')}
                  />
                )}

                {/* MESSAGE */}
                {step === 'message' && (
                  <textarea
                    value={form.message}
                    placeholder="Share your vision, goals, timeline..."
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    style={{ ...inputStyle, resize: 'none', minHeight: '160px', lineHeight: 1.6, fontSize: '1.25rem' }}
                    onFocus={e => (e.target.style.borderBottomColor = 'rgba(74,158,255,0.6)')}
                    onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.2)')}
                  />
                )}

                {/* CTA Buttons */}
                {step !== 'service' && (
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', alignItems: 'center' }}>
                    {step === 'message' ? (
                      <button
                        onClick={handleSubmit}
                        disabled={sending || !form.message.trim()}
                        style={{
                          padding: '1rem 3rem',
                          background: 'linear-gradient(135deg, #5BC9E8, #4A9EFF)',
                          color: '#05070c', border: 'none', borderRadius: '99px',
                          fontFamily: 'var(--font-geist-mono)', fontSize: '0.8rem',
                          letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700,
                          cursor: sending || !form.message.trim() ? 'not-allowed' : 'pointer',
                          opacity: sending || !form.message.trim() ? 0.45 : 1,
                          transition: 'transform 0.2s, opacity 0.2s',
                        }}
                        onMouseEnter={e => { if (!sending) e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        {sending ? 'Sending...' : 'Send Message →'}
                      </button>
                    ) : (
                      <button
                        onClick={advance}
                        disabled={step !== 'phone' && !canAdvance()}
                        style={{
                          padding: '1rem 2.5rem',
                          background: canAdvance() || step === 'phone' ? '#4A9EFF' : 'rgba(74,158,255,0.2)',
                          color: '#05070c', border: 'none', borderRadius: '99px',
                          fontFamily: 'var(--font-geist-mono)', fontSize: '0.8rem',
                          letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'background 0.2s, transform 0.2s',
                          opacity: canAdvance() || step === 'phone' ? 1 : 0.4,
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        {step === 'phone' && !form.phone.trim() ? 'Skip →' : 'Continue →'}
                      </button>
                    )}
                    {stepIndex > 0 && (
                      <button
                        onClick={() => setStep(STEPS[stepIndex - 1])}
                        style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-geist-mono)', fontSize: '0.75rem', cursor: 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                      >
                        ← Back
                      </button>
                    )}
                  </div>
                )}
                {step !== 'service' && step !== 'message' && (
                  <p style={{ marginTop: '1rem', fontFamily: 'var(--font-geist-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>
                    Press Enter to continue
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ── FAQ Section ── */}
      <FaqSection />

      <Footer />
    </div>
  );
}

// ── Geo + Conversion FAQ Data ──
const FAQS = [
  {
    q: 'Do you work with brands outside of Bangalore?',
    a: 'Absolutely. While we are based in Bangalore, we work with clients across India and globally. All strategy, creative, and execution is handled remotely without compromising on quality.',
  },
  {
    q: 'How quickly can we get started?',
    a: 'Once we have an initial call and scope alignment, most projects can kick off within 5–7 business days. For time-sensitive campaigns, we can fast-track onboarding.',
  },
  {
    q: 'What does a typical engagement look like?',
    a: 'It starts with a discovery session where we map your brand, goals, and audience. From there we build a strategy, agree on deliverables, and move into execution with weekly check-ins and monthly reviews.',
  },
  {
    q: 'Do you offer performance-based pricing?',
    a: 'For select performance marketing engagements, yes. We structure retainers and performance-linked fees depending on the service scope and brand readiness. Reach out and we can design a model that works for you.',
  },
  {
    q: 'Which industries do you specialize in?',
    a: 'We have deep experience in lifestyle, F&B, wellness, fashion, tech startups, and D2C brands. If your brand has a story to tell and an audience to grow, we are the right fit.',
  },
  {
    q: 'What is the minimum commitment?',
    a: 'Project-based work has no minimums. For retainers, we typically recommend a 3-month initial term so we can show meaningful impact across strategy, content, and growth.',
  },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
          } else {
            (entry.target as HTMLElement).style.opacity = '0';
            (entry.target as HTMLElement).style.transform = 'translateY(40px)';
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    if (headingRef.current) observer.observe(headingRef.current);
    itemRefs.current.forEach(el => { if (el) observer.observe(el); });

    return () => observer.disconnect();
  }, []);

  const initialHidden: React.CSSProperties = {
    opacity: 0,
    transform: 'translateY(40px)',
    transition: 'opacity 0.65s cubic-bezier(0.25,1,0.2,1), transform 0.65s cubic-bezier(0.25,1,0.2,1)',
  };

  return (
    <section ref={sectionRef} style={{ background: '#05070c', borderTop: '1px solid rgba(255,255,255,0.06)', padding: 'clamp(5rem, 10vh, 9rem) 0' }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)' }}>
        {/* Heading */}
        <div ref={headingRef} style={{ ...initialHidden, display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: 'clamp(4rem, 7vh, 6rem)' }}>
          <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#4A9EFF' }}>
            Frequently Asked
          </span>
          <h2 style={{ fontFamily: 'var(--font-sevone)', fontSize: 'clamp(3rem, 6vw, 6rem)', color: '#F2F6FC', lineHeight: 0.9, letterSpacing: '-0.02em', margin: 0 }}>
            Questions.
          </h2>
        </div>

        {/* Accordion */}
        <div>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              ref={el => { itemRefs.current[i] = el; }}
              style={{
                ...initialHidden,
                transitionDelay: `${i * 0.07}s`,
                borderTop: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  padding: 'clamp(1.25rem, 2.5vh, 1.75rem) 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '2rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-sevone)',
                  fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                  color: open === i ? '#fff' : 'rgba(255,255,255,0.7)',
                  lineHeight: 1.25,
                  transition: 'color 0.25s',
                }}>
                  {faq.q}
                </span>
                {/* +/- icon */}
                <div style={{
                  flexShrink: 0,
                  width: '36px', height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.25s, transform 0.35s',
                  transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  background: open === i ? 'rgba(74,158,255,0.15)' : 'transparent',
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <line x1="7" y1="1" x2="7" y2="13" stroke={open === i ? '#4A9EFF' : 'rgba(255,255,255,0.5)'} strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="1" y1="7" x2="13" y2="7" stroke={open === i ? '#4A9EFF' : 'rgba(255,255,255,0.5)'} strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </button>

              {/* Answer — animated height */}
              <div style={{
                overflow: 'hidden',
                maxHeight: open === i ? '500px' : '0',
                transition: 'max-height 0.45s cubic-bezier(0.25,1,0.2,1)',
              }}>
                <p style={{
                  fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.75,
                  paddingBottom: '1.75rem',
                  maxWidth: '680px',
                  margin: 0,
                }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
          {/* Bottom border */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} />
        </div>
      </div>
    </section>
  );
}
