export default function Badge({ children, variant = 'copper', className = '' }) {
  const styles = {
    copper: 'bg-copper/10 text-copper border-copper/20',
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
    neutral: 'bg-cream/5 text-slate-light border-cream/10',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
