import React from 'react';

export default function DigitalSection() {
  return (
    <section
        className="relative flex flex-col items-center justify-start overflow-hidden"
        style={{ backgroundColor: '#B8D4E8', paddingTop: '2rem', paddingBottom: '16rem', minHeight: '150vh' }}
        id="digital"
      >
        {/* ── Ambient color blobs ── */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {/* Top-left warm mint blob */}
          <div style={{
            position: 'absolute', top: '-10%', left: '-8%',
            width: '55vw', height: '55vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,234,221,0.38) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'blobDrift1 14s ease-in-out infinite alternate',
          }} />
          {/* Top-right sky blob */}
          <div style={{
            position: 'absolute', top: '-5%', right: '-10%',
            width: '50vw', height: '50vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(86,136,201,0.28) 0%, transparent 70%)',
            filter: 'blur(70px)',
            animation: 'blobDrift2 18s ease-in-out infinite alternate',
          }} />
          {/* Centre radial shine */}
          <div style={{
            position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
            width: '70vw', height: '40vw',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(200,223,240,0.55) 0%, transparent 68%)',
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
          {/* Bottom-right mint accent */}
          <div style={{
            position: 'absolute', bottom: '10%', right: '0%',
            width: '45vw', height: '45vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,234,221,0.25) 0%, transparent 70%)',
            filter: 'blur(65px)',
            animation: 'blobDrift4 16s ease-in-out infinite alternate',
          }} />
        </div>

        {/* ── Heading ── */}
        <div className="relative z-10 flex flex-col items-center text-center w-full" style={{ paddingTop: '0' }}>
          <h2
            className="text-[12vw] md:text-[9rem] lg:text-[11rem] leading-[0.85] font-light tracking-[-0.04em] text-navy uppercase flex flex-col items-center w-full"
            style={{ fontFamily: 'var(--font-sevone)', textShadow: '0 2px 32px rgba(86,136,201,0.18)' }}
          >
            <span className="block">DIGITAL</span>
            <span className="block">THAT IGNITES</span>
            <span className="block">INTO</span>
            <span className="block">GROWTH</span>
          </h2>
        </div>

        {/* ── GIF ── pushed up: top-[55%] → top-[50%] ── */}
        <div className="absolute top-[52%] md:top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] md:w-[75vw] z-20 pointer-events-none flex justify-center">
          <img
            src="/hero.gif"
            alt="Digital Growth"
            className="w-full h-auto object-contain scale-[1.1] md:scale-125"
          />
        </div>

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
