/* ─────────────────────────────────────────────
   Grill — Logo system
   Two marks lifted from the design bundle:
     · MarkBell — Concierge Bell (primary)
     · MarkArch — Architectural G (alternate / favicon)
   Wordmark in Prata.
   ───────────────────────────────────────────── */

const INK = '#1A1A1A';
const COPPER = '#C8956C';
const PAPER = '#FAFAF8';

/* ── Concierge Bell ──
   Solid bell silhouette with the "G" set in negative space.
   Holds up at small sizes (favicon) and reads as a hospitality mark. */
export function MarkBell({ size = 28, color = INK, accent = COPPER, mono = false }) {
  const c = color;
  const a = mono ? color : accent;
  return (
    <svg
      viewBox="16 16 88 88"
      width={size}
      height={size}
      style={{ display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Grill"
      role="img"
    >
      <path d="M28,86 q0,-50 32,-50 q32,0 32,50 z" fill={c} />
      <rect x="22" y="86" width="76" height="6" rx="1" fill={c} />
      <circle cx="60" cy="32" r="3.5" fill={a} />
      <line x1="60" y1="28" x2="60" y2="22" stroke={a} strokeWidth="1.5" strokeLinecap="round" />
      <text
        x="60" y="78" textAnchor="middle"
        fontFamily="Prata, serif" fontSize="40"
        fill={PAPER} letterSpacing="-0.02em"
      >
        G
      </text>
      <ellipse cx="60" cy="98" rx="42" ry="2" fill={c} opacity="0.25" />
    </svg>
  );
}

/* ── Architectural G ──
   G drawn as a doorway / arch with a copper keystone.
   The most modernist of the marks; great for app icon / favicon. */
export function MarkArch({ size = 28, color = INK, accent = COPPER, mono = false }) {
  const c = color;
  const a = mono ? color : accent;
  return (
    <svg
      viewBox="14 16 92 92"
      width={size}
      height={size}
      style={{ display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Grill"
      role="img"
    >
      <path
        d="M22,98 L22,58 Q22,22 60,22 Q98,22 98,58 L98,98"
        fill="none" stroke={c} strokeWidth="6" strokeLinecap="butt"
      />
      <path d="M70,72 L98,72" stroke={c} strokeWidth="6" strokeLinecap="butt" />
      <path d="M98,72 L98,98" stroke={c} strokeWidth="6" strokeLinecap="butt" />
      <rect x="56" y="20" width="8" height="8" fill={a} />
      <path d="M16,102 L104,102" stroke={c} strokeWidth="1" />
    </svg>
  );
}

/* ── Lockup: mark + Prata wordmark ──
   Wordmark scales proportionally to the mark size so the lockup
   reads correctly at any size (favicon → hero). */
export default function Logo({ className = '', mark = 'bell', size = 28 }) {
  const Mark = mark === 'arch' ? MarkArch : MarkBell;
  const wordmarkSize = Math.round(size * 0.62);
  const gap = Math.round(size * 0.26);
  return (
    <a
      href="#"
      className={`flex items-center ${className}`}
      style={{ gap }}
    >
      <Mark size={size} />
      <span
        className="font-serif tracking-[-0.01em] text-ink leading-none"
        style={{ fontSize: wordmarkSize }}
      >
        Grill
      </span>
    </a>
  );
}
