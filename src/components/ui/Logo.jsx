export default function Logo({ className = '' }) {
  return (
    <a href="#" className={`flex items-center gap-2 text-2xl font-bold tracking-tight ${className}`}>
      <img src="/grill-flame-white.png" alt="Grill" className="w-7 h-7" />
      <span>
        <span className="text-copper">G</span>
        <span className="text-cream">RILL</span>
      </span>
    </a>
  );
}
