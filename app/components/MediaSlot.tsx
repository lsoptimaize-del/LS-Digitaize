import { MEDIA } from '../data/media';

type Props = {
  slot: string;
  className?: string;
  /** Tint for the placeholder gradient */
  accent?: string;
  rounded?: string;
};

/** Renders the real media for a slot, or a clearly-labelled placeholder until `src` is set in data/media.ts. */
export default function MediaSlot({ slot, className = '', accent = '#4A9EFF', rounded = '1rem' }: Props) {
  const spec = MEDIA[slot];
  if (!spec) return null;

  const frame = { aspectRatio: spec.ratio, borderRadius: rounded } as const;
  const isVideo = !!spec.src && /\.(mp4|webm|mov)$/i.test(spec.src);

  if (spec.src) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={frame}>
        {isVideo ? (
          <video
            src={spec.src}
            poster={spec.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={spec.src} alt="" className="absolute inset-0 w-full h-full object-cover" />
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden flex flex-col items-center justify-center text-center p-4 ${className}`}
      style={{
        ...frame,
        background: `linear-gradient(135deg, ${accent}26 0%, rgba(250,250,247,0.9) 55%, ${accent}1A 100%)`,
        border: `1.5px dashed ${accent}80`,
      }}
      role="img"
      aria-label={`Placeholder: ${spec.brief}`}
    >
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center mb-3"
        style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}55` }}
      >
        {spec.kind === 'video' ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="m21 16-5-5-9 9" /></svg>
        )}
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: accent }}>
        {spec.kind} · {spec.ratio.replace(' / ', ':')}
      </p>
      <p className="text-[11px] leading-snug max-w-[16rem]" style={{ color: 'rgba(10,10,10,0.55)' }}>
        {spec.brief}
      </p>
      <p className="font-mono text-[9px] mt-2" style={{ color: 'rgba(10,10,10,0.35)' }}>
        slot: {slot}
      </p>
    </div>
  );
}
