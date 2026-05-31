const services = [
  { num: '01', label: 'A-Z Branding & Identity' },
  { num: '02', label: 'Content Strategy & Creation' },
  { num: '03', label: 'Performance Marketing' },
  { num: '04', label: 'Social Media Management' },
  { num: '05', label: 'Event Curation & Management' },
  { num: '06', label: 'Business Development' },
];

export default function Footer() {
  return (
    <footer className="bg-navy border-t-2 border-mint">
      <div className="flex flex-wrap justify-between gap-x-4 gap-y-5 px-8 py-8">
        {services.map(({ num, label }) => (
          <div key={num} className="flex items-baseline gap-2">
            <span className="text-primary text-xs font-mono">{num}</span>
            <span className="text-white text-sm tracking-wide">{label}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center px-8 py-4 border-t border-white/10">
        <span className="text-white/40 text-xs tracking-wide">© 2025 LS Digitaize</span>
        <span className="text-white/40 text-xs tracking-wide">contact@lsdigitaize.com</span>
      </div>
    </footer>
  );
}
