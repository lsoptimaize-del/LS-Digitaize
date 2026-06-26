'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: '', email: '', company: '', message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 90%',
          }
        }
      );
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulated network request
    await new Promise(r => setTimeout(r, 1500));
    setStatus('sent');
  }, []);

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '0',
    padding: '0.5rem 0',
    fontSize: '0.95rem',
    color: '#fff',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.65rem',
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: '0.2rem',
  };

  return (
    <section
      id="contact"
      style={{
        padding: 'clamp(2rem, 5vw, 4rem) 1rem',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1200px',
        aspectRatio: '16/9',
        minHeight: '680px',
        borderRadius: '32px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        padding: 'clamp(2rem, 5vw, 4rem)',
        boxShadow: '0 20px 80px rgba(26,39,68,0.15)',
      }}>
        {/* ── Background Video ── */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <video
            src="/contact.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* Subtle dark overlay to ensure text readability */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(5, 12, 24, 0.4)',
          }} />
        </div>

        {/* ── Floating Glass Console ── */}
        <div 
          ref={formRef}
          style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '420px',
          padding: 'clamp(1rem, 3vw, 1.5rem)',
        }}>
          {/* Blurred Background Layer that fades out */}
          <div style={{
            position: 'absolute',
            inset: '-15%',
            zIndex: -1,
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          
          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
        {status === 'sent' ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: '#fff' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 2rem', fontSize: '2rem',
            }}>
              ✓
            </div>
            <h3 style={{
              fontFamily: 'var(--font-sevone)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              color: '#fff', marginBottom: '1rem', letterSpacing: '-0.02em',
            }}>
              Message Received
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontSize: '1.1rem' }}>
              We'll be in touch soon.
            </p>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{
                fontFamily: 'var(--font-sevone)',
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                fontWeight: 900,
                color: '#fff',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                marginBottom: '1rem',
              }}>
                LET'S BUILD<br />
                <span style={{ color: '#8BEADD' }}>SOMETHING</span><br />
                WILD.
              </h2>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label htmlFor="name" style={labelStyle}>Your Name</label>
                  <input
                    id="name" name="name" type="text" required
                    placeholder="Jane Doe"
                    value={form.name} onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="email" style={labelStyle}>Email Address</label>
                  <input
                    id="email" name="email" type="email" required
                    placeholder="jane@brand.com"
                    value={form.email} onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="company" style={labelStyle}>Company / Brand</label>
                <input
                  id="company" name="company" type="text"
                  placeholder="Acme Co."
                  value={form.company} onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div className="input-group">
                <label htmlFor="message" style={labelStyle}>Project Details</label>
                <textarea
                  id="message" name="message" required
                  rows={1}
                  placeholder="Tell us what you're looking to achieve..."
                  value={form.message} onChange={handleChange}
                  style={{ ...inputStyle, resize: 'none', minHeight: '40px', overflow: 'hidden' }}
                  onInput={e => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = `${target.scrollHeight}px`;
                  }}
                />
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    padding: '1.2rem 3rem',
                    background: status === 'sending' ? 'rgba(255,255,255,0.1)' : '#fff',
                    color: status === 'sending' ? '#fff' : '#050C18',
                    border: 'none',
                    borderRadius: '99px',
                    fontSize: '0.75rem',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    fontFamily: 'inherit',
                    fontWeight: 600,
                    transition: 'transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
                    boxShadow: status === 'sending' ? 'none' : '0 10px 30px rgba(255,255,255,0.2)',
                  }}
                  className="submit-btn"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message →'}
                </button>
              </div>
            </form>
          </>
        )}
          </div>
        </div>
      </div>

      <style>{`
        .input-group input:focus, .input-group textarea:focus {
          border-bottom-color: #8BEADD !important;
        }
        .input-group input::placeholder, .input-group textarea::placeholder {
          color: rgba(255,255,255,0.2);
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(255,255,255,0.3) !important;
        }
      `}</style>
    </section>
  );
}
