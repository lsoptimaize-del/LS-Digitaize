'use client';

import { useState, useCallback } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SERVICES = [
  'A-Z Branding & Identity',
  'Content Strategy & Creation',
  'Performance Marketing',
  'Social Media Management',
  'Event Curation',
  'Business Development',
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    await new Promise(r => setTimeout(r, 1800));
    setStatus('sent');
  }, []);

  const inlineInputStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(139,234,221,0.3)',
    color: '#8BEADD', // Cyan accent color for inputs
    fontFamily: 'inherit',
    fontSize: 'inherit',
    outline: 'none',
    margin: '0 0.5rem',
    padding: '0 0.5rem',
    minWidth: '200px',
    maxWidth: '400px',
    textAlign: 'center',
    transition: 'border-color 0.3s',
  };

  const selectStyle: React.CSSProperties = {
    ...inlineInputStyle,
    appearance: 'none',
    cursor: 'pointer',
    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'7\' viewBox=\'0 0 12 7\'%3E%3Cpath d=\'M1 1l5 5 5-5\' stroke=\'%238BEADD\' stroke-opacity=\'0.6\' stroke-width=\'1.5\' fill=\'none\'/%3E%3C/svg%3E")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.5rem center',
    paddingRight: '2rem',
  };

  const blockInputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '1.5rem',
    color: '#fff',
    fontFamily: 'inherit',
    fontSize: '1.2rem',
    outline: 'none',
    marginTop: '2rem',
    resize: 'vertical',
    minHeight: '150px',
    transition: 'border-color 0.3s, background 0.3s',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a1224', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ 
        flex: 1, 
        paddingTop: 'clamp(8rem, 15vh, 12rem)', 
        paddingBottom: 'clamp(4rem, 10vh, 8rem)',
        position: 'relative',
        zIndex: 10,
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(4rem, 8vw, 8rem)',
          alignItems: 'start',
        }}>
          {/* ── Left Column: Mad-Libs Form ── */}
          <div style={{ flex: '2 1 600px' }}>
            {status === 'sent' ? (
              <div style={{ paddingTop: '10vh' }}>
                <h1 style={{ fontFamily: 'var(--font-sevone)', fontSize: 'clamp(3rem, 5vw, 4.5rem)', color: '#fff', marginBottom: '1rem' }}>
                  Message Received.
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                  Thank you for reaching out. We will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{
                fontFamily: 'var(--font-sevone)', // Elegant serif/display font
                fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)',
                lineHeight: 1.8,
                color: '#fff',
                fontWeight: 400,
              }}>
                <div style={{ marginBottom: '1rem' }}>
                  Hello! My name is
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    placeholder="Your full name" 
                    value={form.name} 
                    onChange={handleChange} 
                    style={inlineInputStyle}
                    onFocus={e => e.target.style.borderBottomColor = '#8CCDE9'}
                    onBlur={e => e.target.style.borderBottomColor = 'rgba(139,234,221,0.3)'}
                  />
                  and my email address is
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    placeholder="your@email.com" 
                    value={form.email} 
                    onChange={handleChange} 
                    style={inlineInputStyle}
                    onFocus={e => e.target.style.borderBottomColor = '#8CCDE9'}
                    onBlur={e => e.target.style.borderBottomColor = 'rgba(139,234,221,0.3)'}
                  />
                  . I am reaching out regarding
                  <select 
                    name="service" 
                    required 
                    value={form.service} 
                    onChange={handleChange} 
                    style={selectStyle}
                    onFocus={e => e.target.style.borderBottomColor = '#8CCDE9'}
                    onBlur={e => e.target.style.borderBottomColor = 'rgba(139,234,221,0.3)'}
                  >
                    <option value="" disabled style={{ background: '#0a1224', color: 'rgba(255,255,255,0.5)' }}>your subject</option>
                    {SERVICES.map(s => <option key={s} value={s} style={{ background: '#0a1224', color: '#fff' }}>{s}</option>)}
                  </select>
                  . Here are the details:
                </div>

                <textarea 
                  name="message" 
                  required 
                  placeholder="Tell us everything..." 
                  value={form.message} 
                  onChange={handleChange} 
                  style={blockInputStyle}
                  onFocus={e => {
                    e.target.style.borderColor = 'rgba(139,234,221,0.5)';
                    e.target.style.background = 'rgba(255,255,255,0.05)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.target.style.background = 'rgba(255,255,255,0.03)';
                  }}
                />

                <div style={{ marginTop: '3rem' }}>
                  <button type="submit" disabled={status === 'sending'} style={{
                    padding: '1.2rem 3.5rem',
                    background: 'linear-gradient(135deg, #8BEADD 0%, #5688C9 100%)',
                    color: '#0a1224',
                    border: 'none',
                    borderRadius: '99px',
                    fontSize: '0.85rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    fontFamily: 'Helvetica Neue, Arial, sans-serif',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    opacity: status === 'sending' ? 0.7 : 1,
                  }}
                  onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* ── Right Column: Sidebar ── */}
          <div style={{ flex: '1 1 300px', maxWidth: '400px', marginLeft: 'auto' }}>
            <div style={{
              width: '100%',
              aspectRatio: '4/3',
              borderRadius: '24px',
              overflow: 'hidden',
              marginBottom: '3rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}>
              <img 
                src="/bg_service_2.png" 
                alt="Workspace" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div>
                <h4 style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8BEADD', marginBottom: '0.75rem' }}>
                  Locate Us
                </h4>
                <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, margin: 0 }}>
                  Dubai Design District<br />
                  Dubai - UAE<br />
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8BEADD', marginBottom: '0.75rem' }}>
                  Email Us
                </h4>
                <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, margin: 0 }}>
                  contact@lsdigitaize.com
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8BEADD', marginBottom: '0.75rem' }}>
                  Socials
                </h4>
                <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, margin: 0 }}>
                  @lsdigitaize
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
