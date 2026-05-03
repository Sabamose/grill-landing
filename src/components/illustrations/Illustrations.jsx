/* ─────────────────────────────────────────────
   GRILL — Hand-drawn illustration set
   Single ink weight, slightly imperfect strokes,
   generous whitespace, single copper accent.
   ───────────────────────────────────────────── */
import { motion } from 'framer-motion';

const INK = '#1A1A1A';
const COPPER = '#C8956C';
const COPPER_SOFT = '#F3E8DE';

const stroke = {
  stroke: INK,
  strokeWidth: 1.4,
  fill: 'none',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};
const strokeCopper = { ...stroke, stroke: COPPER, strokeWidth: 1.6 };
const strokeThin = { ...stroke, strokeWidth: 1.1 };

/* 1. What is Grill — concierge bell at the front desk */
export function IllustrationBell({ size = 320 }) {
  return (
    <svg viewBox="0 0 320 240" width={size} style={{ display: 'block', maxWidth: '100%', height: 'auto' }} xmlns="http://www.w3.org/2000/svg">
      <g {...strokeCopper} opacity="0.75">
        <path d="M82,46 q-8,-14 8,-22 q4,-12 22,-10 q8,-12 26,-6 q14,-10 28,2 q14,-4 22,8 q14,2 12,16 q8,8 -2,18 q-2,12 -16,10 q-8,8 -22,4 q-10,8 -22,2 q-12,6 -22,-2 q-14,2 -22,-8 q-12,-2 -12,-12 z" fill={COPPER_SOFT} fillOpacity="0.4" />
      </g>
      {/* memory dots — breathing out of phase, like memories drifting in */}
      <g fill={COPPER}>
        <motion.circle
          cx="120" cy="34" r="1.6"
          animate={{ opacity: [0.25, 0.85, 0.25] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
        />
        <motion.circle
          cx="148" cy="28" r="1.4"
          animate={{ opacity: [0.25, 0.85, 0.25] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
        />
        <motion.circle
          cx="170" cy="36" r="1.2"
          animate={{ opacity: [0.25, 0.85, 0.25] }}
          transition={{ duration: 4.0, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
        />
        <motion.circle
          cx="138" cy="44" r="1.3"
          animate={{ opacity: [0.25, 0.85, 0.25] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 2.1 }}
        />
      </g>
      {/* rays from cloud to bell — also breathe gently */}
      <motion.g
        {...strokeThin} stroke={COPPER}
        animate={{ opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M118,72 L132,98" />
        <path d="M156,76 L160,100" />
        <path d="M192,72 L184,98" />
      </motion.g>
      <g {...stroke}>
        <path d="M104,170 q0,-66 56,-66 q56,0 56,66" />
        <path d="M96,170 q64,8 128,0" />
        <path d="M96,170 q64,12 128,0" />
        <path d="M86,178 L234,178" />
        <ellipse cx="160" cy="178" rx="74" ry="3.5" fill={INK} fillOpacity="0.04" />
        <circle cx="160" cy="98" r="6" fill={COPPER_SOFT} />
        <path d="M160,92 L160,84" />
      </g>
      <path d="M58,196 L262,196" {...stroke} strokeWidth="1" />
      <path d="M68,202 L252,202" {...strokeThin} opacity="0.4" />
      <g {...strokeThin} transform="translate(232,156) rotate(-8)">
        <rect x="0" y="0" width="34" height="22" rx="2" />
        <path d="M4,6 L18,6" stroke={COPPER} />
        <path d="M4,11 L14,11" />
      </g>
      <g {...strokeThin} opacity="0.35">
        <path d="M122,150 q4,-30 16,-46" />
        <path d="M132,156 q4,-32 16,-50" />
      </g>
    </svg>
  );
}

/* 2a. Connect — three lines converging on a central node */
export function IllustrationConnect({ size = 220 }) {
  return (
    <svg viewBox="0 0 200 160" width={size} style={{ display: 'block', maxWidth: '100%', height: 'auto' }} xmlns="http://www.w3.org/2000/svg">
      <g {...stroke}>
        <rect x="14" y="22" width="46" height="22" rx="2" />
        <rect x="14" y="68" width="46" height="22" rx="2" />
        <rect x="14" y="114" width="46" height="22" rx="2" />
      </g>
      <g fill={INK} fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="0.5">
        <text x="22" y="36">PMS</text>
        <text x="22" y="82">POS</text>
        <text x="22" y="128">REVIEWS</text>
      </g>
      <g {...strokeCopper}>
        <path d="M62,33 q30,-4 50,18 q14,18 28,28" />
        <path d="M62,79 q30,2 50,4 q14,0 28,0" />
        <path d="M62,125 q30,4 50,-18 q14,-18 28,-28" />
      </g>
      <g {...stroke}>
        <circle cx="156" cy="80" r="20" fill="white" />
        <circle cx="156" cy="80" r="20" fill={COPPER_SOFT} fillOpacity="0.6" />
      </g>
      <text x="156" y="84" textAnchor="middle" fontFamily="Prata, serif" fontSize="13" fill={INK}>G</text>
      <g {...strokeThin} opacity="0.3">
        <path d="M148,62 q4,-4 8,-2" />
        <path d="M168,98 q-4,4 -8,2" />
      </g>
    </svg>
  );
}

/* 2b. Remember — open ledger with preference tags + feather pen */
export function IllustrationRemember({ size = 220 }) {
  return (
    <svg viewBox="0 0 200 160" width={size} style={{ display: 'block', maxWidth: '100%', height: 'auto' }} xmlns="http://www.w3.org/2000/svg">
      <g {...stroke}>
        <path d="M28,38 L28,134 q40,-8 72,0 q32,-8 72,0 L172,38 q-40,-8 -72,0 q-32,-8 -72,0 z" fill="white" />
        <path d="M100,38 q0,48 0,96" />
      </g>
      <g {...strokeThin} opacity="0.55">
        <path d="M40,56 L88,55" />
        <path d="M40,66 L78,66" />
        <path d="M40,76 L86,76" />
        <path d="M40,86 L72,86" />
      </g>
      <g {...stroke}>
        <rect x="110" y="52" width="44" height="10" rx="5" stroke={COPPER} fill={COPPER_SOFT} fillOpacity="0.5" />
        <rect x="110" y="68" width="36" height="10" rx="5" stroke={COPPER} fill={COPPER_SOFT} fillOpacity="0.5" />
        <rect x="110" y="84" width="50" height="10" rx="5" stroke={COPPER} fill={COPPER_SOFT} fillOpacity="0.5" />
        <rect x="110" y="100" width="30" height="10" rx="5" stroke={COPPER} fill="white" strokeDasharray="2 2" />
      </g>
      <g fontFamily="Inter, sans-serif" fontSize="6" fill={COPPER} opacity="0.85">
        <text x="116" y="60">Mountain View</text>
        <text x="116" y="76">Vegetarian</text>
        <text x="116" y="92">Fendant du Valais</text>
      </g>
      <g {...stroke} transform="translate(36,108) rotate(-18)">
        <path d="M0,0 L40,-12" />
        <path d="M0,0 L4,-3" />
        <path d="M40,-12 q8,-2 12,2" stroke={COPPER} />
        <path d="M40,-12 q4,-6 10,-6" {...strokeThin} stroke={COPPER} />
        <path d="M40,-12 q2,-10 8,-12" {...strokeThin} stroke={COPPER} />
      </g>
    </svg>
  );
}

/* 2c. Act — speech bubble with checkmark + APPROVED stamp */
export function IllustrationAct({ size = 220 }) {
  return (
    <svg viewBox="0 0 200 160" width={size} style={{ display: 'block', maxWidth: '100%', height: 'auto' }} xmlns="http://www.w3.org/2000/svg">
      <g {...stroke}>
        <path d="M28,30 q72,-12 144,0 q12,40 -2,68 q-30,2 -56,2 l-14,18 l-4,-18 q-46,-2 -68,-4 q-14,-30 0,-66 z" fill="white" />
      </g>
      <g {...strokeCopper} strokeWidth="2.2">
        <path d="M70,70 L92,90 L132,52" />
      </g>
      <g {...strokeThin} stroke={COPPER} transform="translate(150,118) rotate(-10)" opacity="0.85">
        <rect x="0" y="0" width="42" height="20" rx="2" />
        <text x="21" y="13" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7" letterSpacing="0.5" fill={COPPER}>APPROVED</text>
      </g>
      <g {...strokeThin} opacity="0.4">
        <path d="M14,52 L22,52" />
        <path d="M10,62 L24,62" />
        <path d="M14,72 L22,72" />
      </g>
    </svg>
  );
}

/* 3. Morning briefing — sun rising over a hotel */
export function IllustrationBriefing({ size = 380 }) {
  return (
    <svg viewBox="0 0 320 240" width={size} style={{ display: 'block', maxWidth: '100%', height: 'auto' }} xmlns="http://www.w3.org/2000/svg">
      <g {...strokeCopper}>
        <circle cx="160" cy="130" r="28" fill={COPPER_SOFT} fillOpacity="0.5" />
        <path d="M160,86 L160,72" />
        <path d="M188,98 L198,90" />
        <path d="M132,98 L122,90" />
        <path d="M204,128 L218,128" />
        <path d="M116,128 L102,128" />
      </g>
      <path d="M28,158 q40,-2 80,1 q40,3 80,-1 q40,-2 80,1 q12,1 24,0" {...stroke} />
      <g {...stroke}>
        <path d="M100,158 L100,108 L160,82 L220,108 L220,158" fill="white" />
        <path d="M100,108 L160,82 L220,108" />
        <rect x="114" y="120" width="10" height="12" />
        <rect x="132" y="120" width="10" height="12" fill={COPPER_SOFT} />
        <rect x="150" y="120" width="10" height="12" />
        <rect x="168" y="120" width="10" height="12" />
        <rect x="186" y="120" width="10" height="12" fill={COPPER_SOFT} />
        <rect x="114" y="138" width="10" height="12" fill={COPPER_SOFT} />
        <rect x="132" y="138" width="10" height="12" />
        <rect x="150" y="138" width="10" height="12" />
        <rect x="168" y="138" width="10" height="12" fill={COPPER_SOFT} />
        <rect x="186" y="138" width="10" height="12" />
        <path d="M154,158 L154,144 q6,-2 12,0 L166,158" />
      </g>
      <g {...strokeThin} opacity="0.5">
        <path d="M40,158 L80,124 L116,148" />
        <path d="M210,158 L246,118 L286,158" />
      </g>
      <g {...stroke} transform="translate(232,176) rotate(4)">
        <rect x="0" y="0" width="68" height="34" fill="white" />
        <path d="M0,0 L68,0 M0,34 L68,34" />
      </g>
      <g fontFamily="JetBrains Mono, monospace" fontSize="7" fill={INK} opacity="0.85">
        <text x="240" y="190">07:30</text>
        <text x="240" y="202">brief ready</text>
      </g>
      <g {...strokeThin} opacity="0.4">
        <path d="M40,166 L46,162" />
        <path d="M58,168 L64,164" />
        <path d="M260,166 L266,162" />
        <path d="M278,168 L284,164" />
      </g>
    </svg>
  );
}

/* ──────────── 4. Paragraph → Next move ────────────
   Wide editorial illustration: a long messy scroll on the left,
   a wavy copper arrow distilling its essence, and a small elegant
   card on the right with a copper check + sparkles around it.
   Used in the ActionCard section. */
export function IllustrationParagraphToAction({ size = 720 }) {
  const COPPER_TEXT = '#A0734E';
  return (
    <svg viewBox="0 0 720 320" width={size} style={{ display: 'block', maxWidth: '100%', height: 'auto' }} xmlns="http://www.w3.org/2000/svg">
      {/* ─── label: PARAGRAPH ─── */}
      <text
        x="100" y="22"
        fontFamily="JetBrains Mono, monospace" fontSize="9"
        fill={INK} opacity="0.5" textAnchor="middle" letterSpacing="2"
      >
        PARAGRAPH
      </text>

      {/* ─── label: ACTION ─── */}
      <text
        x="560" y="22"
        fontFamily="JetBrains Mono, monospace" fontSize="9"
        fill={COPPER_TEXT} opacity="0.85" textAnchor="middle" letterSpacing="2"
      >
        NEXT MOVE
      </text>

      {/* ═══ LEFT — the unfurling scroll ═══ */}

      {/* scroll roll at top — a slight cylinder */}
      <g {...stroke}>
        <ellipse cx="100" cy="48" rx="78" ry="6" fill="white" />
        <path d="M22,48 q78,8 156,0" />
      </g>

      {/* scroll body */}
      <g {...stroke}>
        <path d="M28,50 L28,266 q72,-4 144,0 L172,50" fill="white" />
      </g>

      {/* crinkled bottom edge — wobble */}
      <g {...stroke}>
        <path d="M28,266 q12,10 24,4 q12,-6 24,4 q12,10 24,2 q12,-6 24,8 q12,-4 24,-12" />
      </g>

      {/* wavy text lines — sparse opacity, slightly off-axis */}
      <g {...strokeThin} opacity="0.45">
        <path d="M40,72 q24,-2 48,1 q24,2 44,-1 q12,1 16,0" />
        <path d="M40,84 q24,-1 48,1 q24,2 40,-1" />
        <path d="M40,96 q24,-2 48,1 q24,2 44,-1 q10,0 12,1" />
        <path d="M40,108 q24,-1 48,1 q24,1 38,-1" />
        <path d="M40,120 q24,-2 48,1 q24,1 44,-1" />
        <path d="M40,132 q24,-1 48,1 q24,2 36,-1" />
        <path d="M40,144 q24,-2 48,1 q24,2 44,-1" />
        <path d="M40,156 q24,-1 48,1 q24,1 38,-1" />
        <path d="M40,168 q24,-1 48,1 q24,2 44,-1" />
        <path d="M40,180 q24,-2 48,1 q24,2 40,-1" />
        <path d="M40,192 q24,-1 48,1 q24,1 44,-1" />
        <path d="M40,204 q24,-2 48,1 q24,2 38,-1" />
        <path d="M40,216 q24,-1 48,1 q24,1 44,-1" />
        <path d="M40,228 q24,-2 48,1 q24,2 36,-1" />
        <path d="M40,240 q24,-1 48,1 q24,2 44,-1" />
        <path d="M40,252 q24,-2 48,1 q24,1 38,-1" />
      </g>

      {/* tiny exhausted face peeking from upper right of scroll */}
      <g {...stroke} transform="translate(190,200)">
        <circle r="14" fill="white" />
        {/* X-ish eyes */}
        <path d="M-7,-3 L-3,-3" {...strokeThin} />
        <path d="M-5,-5 L-5,-1" {...strokeThin} />
        <path d="M3,-3 L7,-3" {...strokeThin} />
        <path d="M5,-5 L5,-1" {...strokeThin} />
        {/* flat tired mouth */}
        <path d="M-5,5 L5,5" {...strokeThin} />
      </g>

      {/* sweat drops near face */}
      <g fill={INK} opacity="0.35">
        <path d="M210,178 q-1.6,3.5 0,4.4 q2.4,0.8 1.4,-4.4 z" />
        <path d="M216,186 q-1,3 0,3.6 q2,0.6 1,-3.6 z" />
      </g>

      {/* "87 words" footer — mono, very small */}
      <text
        x="100" y="290"
        fontFamily="JetBrains Mono, monospace" fontSize="8.5"
        fill={INK} opacity="0.4" textAnchor="middle" letterSpacing="1.4"
      >
        87 WORDS · NO ACTIONS
      </text>

      {/* ═══ MIDDLE — transformation arrow ═══ */}

      {/* wavy hand-drawn copper arrow */}
      <g {...strokeCopper} strokeWidth="1.8">
        <path d="M250,162 q40,-32 84,-32 q44,0 80,32" />
        <path d="M408,154 L416,162 L408,170" />
      </g>

      {/* "becomes" — italic Prata in copper */}
      <text
        x="332" y="116"
        fontFamily="Prata, serif" fontStyle="italic" fontSize="14"
        fill={COPPER} textAnchor="middle"
      >
        becomes
      </text>

      {/* essence particles flowing along arrow — copper dots, varied size */}
      <g fill={COPPER}>
        <circle cx="270" cy="146" r="1.6" opacity="0.55" />
        <circle cx="294" cy="138" r="1.3" opacity="0.7" />
        <circle cx="320" cy="132" r="1.6" opacity="0.85" />
        <circle cx="346" cy="130" r="1.2" opacity="0.7" />
        <circle cx="372" cy="134" r="1.5" opacity="0.85" />
        <circle cx="394" cy="142" r="1.3" opacity="0.7" />
      </g>

      {/* ═══ RIGHT — the elegant card ═══ */}

      {/* faint card shadow/glow underneath */}
      <ellipse cx="560" cy="270" rx="120" ry="6" fill={INK} fillOpacity="0.04" />

      {/* card body */}
      <g {...stroke}>
        <rect x="448" y="76" width="224" height="172" rx="12" fill="white" />
      </g>

      {/* name line */}
      <g {...strokeThin}>
        <path d="M468,108 L562,108" />
      </g>

      {/* VIP pill — copper-soft */}
      <g {...strokeCopper}>
        <rect x="568" y="100" width="50" height="14" rx="7" fill={COPPER_SOFT} fillOpacity="0.6" />
      </g>

      {/* alert/insight strip */}
      <g {...strokeThin}>
        <rect x="468" y="124" width="184" height="18" rx="3" fill={COPPER_SOFT} fillOpacity="0.35" />
      </g>
      <circle cx="478" cy="133" r="2" fill={COPPER} />
      <g {...strokeThin} stroke={COPPER} opacity="0.65">
        <path d="M488,133 L630,133" />
      </g>

      {/* preference pills row */}
      <g {...strokeThin} stroke={COPPER}>
        <rect x="468" y="156" width="40" height="13" rx="6.5" fill={COPPER_SOFT} fillOpacity="0.45" />
        <rect x="514" y="156" width="46" height="13" rx="6.5" fill={COPPER_SOFT} fillOpacity="0.45" />
        <rect x="566" y="156" width="52" height="13" rx="6.5" fill={COPPER_SOFT} fillOpacity="0.45" />
      </g>

      {/* insight ✦ + line */}
      <g {...strokeCopper}>
        <path d="M468,186 L478,186 M473,181 L473,191 M469.5,182.5 L476.5,189.5 M476.5,182.5 L469.5,189.5" />
      </g>
      <g {...strokeThin} opacity="0.55">
        <path d="M484,186 L626,186" />
      </g>

      {/* approve button — solid ink */}
      <g {...stroke}>
        <rect x="468" y="206" width="106" height="24" rx="12" fill={INK} />
      </g>
      <text x="521" y="221" fontFamily="Inter, sans-serif" fontSize="9" fill="white" textAnchor="middle" fontWeight="500">
        Stage action →
      </text>

      {/* dismiss button — outline */}
      <g {...strokeThin}>
        <rect x="582" y="206" width="64" height="24" rx="12" fill="white" />
      </g>
      <text x="614" y="221" fontFamily="Inter, sans-serif" fontSize="9" fill={INK} textAnchor="middle">
        Dismiss
      </text>

      {/* sparkles around the card — copper */}
      <g {...strokeCopper}>
        <path d="M428,82 L428,94 M422,88 L434,88" />
        <path d="M698,104 L698,114 M693,109 L703,109" />
        <path d="M422,238 L422,246" />
        <path d="M696,246 L696,254" />
        <path d="M558,58 L558,70" />
        <path d="M484,68 L484,74" />
        <path d="M652,68 L652,74" />
      </g>

      {/* extra copper dots floating */}
      <g fill={COPPER} opacity="0.5">
        <circle cx="700" cy="172" r="1.6" />
        <circle cx="420" cy="172" r="1.6" />
        <circle cx="450" cy="60" r="1.2" />
        <circle cx="678" cy="58" r="1.2" />
      </g>

      {/* footer label — "1 staged action" */}
      <text
        x="560" y="296"
        fontFamily="JetBrains Mono, monospace" fontSize="8.5"
        fill={COPPER_TEXT} opacity="0.85" textAnchor="middle" letterSpacing="1.4"
      >
        1 STAGED ACTION · 4 PREFS · KITCHEN PRE-NOTIFIED
      </text>
    </svg>
  );
}

/* ──────────── 5. Morning Briefing — full editorial scene ────────────
   Wide composition: dawn over hotel + mountains, with a front-desk
   foreground (briefing paper with copper paperclip, coffee cup with
   steam, pen, concierge bell). Replaces the dashboard mock in the
   "day in the life" section. */
export function IllustrationMorningBriefingScene({ size = 760 }) {
  return (
    <svg
      viewBox="0 0 760 340"
      width={size}
      style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ═══ BACKGROUND — dawn sky + mountains + hotel ═══ */}

      {/* sun — copper, soft fill */}
      <circle cx="540" cy="98" r="34" fill={COPPER_SOFT} fillOpacity="0.55" />
      <circle cx="540" cy="98" r="34" fill="none" {...strokeCopper} />

      {/* sun rays */}
      <g {...strokeCopper}>
        <path d="M540,50 L540,36" />
        <path d="M572,66 L582,56" />
        <path d="M508,66 L498,56" />
        <path d="M584,98 L598,98" />
        <path d="M496,98 L482,98" />
      </g>

      {/* horizon — slightly wobbly */}
      <path
        d="M40,178 q60,-2 120,1 q60,3 120,-1 q60,-2 120,1 q60,3 120,-1 q60,-2 120,1 q40,1 80,0"
        {...stroke}
      />

      {/* distant mountains — faint */}
      <g {...strokeThin} opacity="0.45">
        <path d="M60,178 L122,128 L172,166" />
        <path d="M180,178 L228,140 L278,174" />
        <path d="M610,178 L660,124 L716,178" />
      </g>

      {/* hotel silhouette — small, between mountains */}
      <g {...stroke}>
        <path d="M380,178 L380,148 L410,128 L440,148 L440,178" fill="white" />
        <path d="M380,148 L410,128 L440,148" />
        <rect x="395" y="153" width="6" height="8" />
        <rect x="409" y="153" width="6" height="8" fill={COPPER_SOFT} />
        <rect x="423" y="153" width="6" height="8" />
        <rect x="395" y="165" width="6" height="8" fill={COPPER_SOFT} />
        <rect x="409" y="165" width="6" height="8" />
        <rect x="423" y="165" width="6" height="8" fill={COPPER_SOFT} />
      </g>

      {/* light rays from sun reaching down to desk — diagonal */}
      <g {...strokeThin} stroke={COPPER} opacity="0.35">
        <path d="M540,134 q-50,40 -120,80" />
        <path d="M540,134 q40,42 100,80" />
      </g>

      {/* ═══ FOREGROUND — desk scene ═══ */}

      {/* desk top edge — wobbly hairline */}
      <path
        d="M20,232 q70,-2 140,1 q70,3 140,-1 q70,-2 140,1 q70,3 140,-1 q70,-2 140,1"
        {...stroke}
      />

      {/* faint shadow under desk objects */}
      <ellipse cx="80" cy="244" rx="22" ry="2" fill={INK} fillOpacity="0.05" />
      <ellipse cx="298" cy="252" rx="84" ry="2" fill={INK} fillOpacity="0.05" />
      <ellipse cx="464" cy="266" rx="44" ry="1.5" fill={INK} fillOpacity="0.04" />
      <ellipse cx="620" cy="252" rx="32" ry="2" fill={INK} fillOpacity="0.05" />

      {/* ── LEFT: coffee cup with steam ── */}
      <g transform="translate(80,210)">
        {/* steam — copper, gently waving */}
        <g {...strokeThin} stroke={COPPER} opacity="0.55">
          <path d="M-6,-6 q4,-4 0,-10 q-4,-6 0,-12" />
          <path d="M2,-8 q4,-4 0,-10 q-4,-6 0,-12" />
          <path d="M10,-6 q4,-4 0,-10 q-4,-6 0,-12" />
        </g>
        {/* cup body */}
        <g {...stroke}>
          <path d="M-14,0 L-12,22 q0,4 4,4 L10,26 q4,0 4,-4 L16,0 z" fill="white" />
          <path d="M-14,0 L16,0" />
          {/* coffee surface */}
          <ellipse cx="1" cy="0" rx="14" ry="2.5" fill={COPPER_SOFT} fillOpacity="0.6" />
          {/* handle */}
          <path d="M16,4 q8,0 8,8 q0,8 -8,8" fill="none" />
        </g>
      </g>

      {/* ── CENTER: briefing paper with copper paperclip ── */}
      <g transform="translate(218,196) rotate(-2)">
        {/* paper body */}
        <g {...stroke}>
          <rect x="0" y="0" width="160" height="100" rx="2" fill="white" />
        </g>
        {/* mono header label */}
        <text
          x="14" y="18"
          fontFamily="JetBrains Mono, monospace"
          fontSize="7" fill={COPPER}
          letterSpacing="1.2"
        >
          MORNING BRIEFING
        </text>
        {/* tiny copper dot beside header */}
        <circle cx="9" cy="14" r="1.5" fill={COPPER} />
        {/* date in serif */}
        <text x="14" y="34" fontFamily="Prata, serif" fontSize="11" fill={INK}>
          Tuesday, 12 May
        </text>
        {/* hairline divider */}
        <path d="M14,42 L146,42" {...strokeThin} opacity="0.45" />
        {/* wavy "handwritten" content lines */}
        <g {...strokeThin} opacity="0.55">
          <path d="M14,54 q40,-1 80,1 q30,1 50,-1" />
          <path d="M14,64 q40,-2 80,1 q30,2 46,-1" />
          <path d="M14,74 q40,-1 80,1 q30,1 50,-1" />
          <path d="M14,84 q40,-2 60,1 q20,1 30,-1" />
        </g>
        {/* paperclip — copper */}
        <g {...strokeCopper} strokeWidth="1.6" fill="none" transform="translate(70,-8)">
          <path d="M0,0 q-6,0 -6,6 L-6,18 q0,5 5,5 q5,0 5,-5 L4,4" />
          <path d="M0,0 L0,16" />
        </g>
      </g>

      {/* ── small "07:30" stamp at top-right of paper ── */}
      <g transform="translate(360,200) rotate(6)">
        <rect x="0" y="0" width="40" height="18" rx="2" {...strokeThin} stroke={COPPER} fill="white" />
        <text
          x="20" y="12" textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="8" fill={COPPER} letterSpacing="1"
        >
          07:30
        </text>
      </g>

      {/* ── pen lying diagonally across desk ── */}
      <g transform="translate(420,266) rotate(-10)">
        <g {...stroke}>
          <rect x="0" y="-3" width="78" height="5" rx="1" fill="white" />
          <path d="M74,-3 L84,0 L74,2 z" fill={COPPER} stroke="none" />
          <path d="M0,-3 L0,2" />
          <path d="M28,-3 L28,2" />
        </g>
      </g>

      {/* ── RIGHT: concierge bell ── */}
      <g transform="translate(620,200)" {...stroke}>
        <path d="M-22,40 q0,-32 22,-32 q22,0 22,32 z" fill="white" />
        <path d="M-26,40 q26,3 52,0" />
        <path d="M-26,40 q26,5 52,0" />
        <path d="M-30,46 L30,46" />
        <ellipse cx="0" cy="46" rx="28" ry="1.5" fill={INK} fillOpacity="0.04" />
        <circle cx="0" cy="14" r="3" fill={COPPER_SOFT} />
        <path d="M0,11 L0,6" />
        {/* hatching lines on dome */}
        <g {...strokeThin} opacity="0.35">
          <path d="M-12,32 q2,-12 6,-18" />
          <path d="M-6,36 q2,-14 6,-22" />
        </g>
      </g>

      {/* ── ground / lower texture ── */}
      <path d="M40,316 L720,316" {...strokeThin} opacity="0.3" />
      <path d="M60,324 L700,324" {...strokeThin} opacity="0.18" />

      {/* ── label across bottom ── */}
      <text
        x="380" y="338"
        fontFamily="JetBrains Mono, monospace"
        fontSize="9" fill={INK} opacity="0.5"
        letterSpacing="2" textAnchor="middle"
      >
        BEFORE THE FIRST GUEST STIRS
      </text>
    </svg>
  );
}

/* Spot marks — small inline decorations for the doc */
export function SpotFlame({ size = 28 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} style={{ display: 'block' }} xmlns="http://www.w3.org/2000/svg">
      <path d="M16,3 q-2,8 -6,12 q-4,4 -4,9 q0,5 4,7 q4,2 6,-2 q-2,-4 0,-7 q2,3 4,2 q4,-2 4,-7 q0,-5 -4,-9 q-2,-3 -4,-5 z" {...strokeCopper} fill={COPPER_SOFT} fillOpacity="0.5" />
    </svg>
  );
}

export function SpotArrow({ size = 36 }) {
  return (
    <svg viewBox="0 0 40 16" width={size} style={{ display: 'block' }} xmlns="http://www.w3.org/2000/svg">
      <path d="M2,8 q12,-4 32,0" {...stroke} />
      <path d="M30,3 L36,8 L30,13" {...stroke} />
    </svg>
  );
}
