export default function Logo({ className = '' }) {
  return (
    <a href="#" className={`text-2xl font-bold tracking-tight ${className}`}>
      <span className="text-copper">G</span>
      <span className="text-cream">·</span>
      <span className="text-cream">RILL</span>
    </a>
  );
}
