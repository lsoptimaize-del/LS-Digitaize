'use client';

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
      <div className="flex items-center gap-10">
        <span className="text-xs tracking-[0.3em] uppercase font-semibold text-navy">
          LS DIGITAIZE
        </span>
        <a
          href="#work"
          className="text-xs tracking-[0.25em] uppercase text-navy/60 hover:text-navy transition-colors"
        >
          WORK
        </a>
      </div>
      <div className="flex items-center gap-8">
        <a
          href="#contact"
          className="text-xs tracking-[0.25em] uppercase text-navy/60 hover:text-navy transition-colors"
        >
          CONTACT
        </a>
        <button className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-navy">
          <span className="w-2 h-2 rounded-full bg-primary inline-block" />
          MENU
        </button>
      </div>
    </nav>
  );
}
