import { motion } from 'framer-motion';
import { fadeUp, blurIn, staggerContainer } from '../../lib/animations';

const PRINCIPLES = [
  {
    n: 'I',
    title: 'Free staff from system work',
    body: "Less clicking through Mews, Lightspeed, OTAs, spreadsheets, and notes. Staff get back to the work only humans can do.",
  },
  {
    n: 'II',
    title: 'One command layer',
    body: "Every department speaks to the same agent. Rooms, guests, kitchen, F&B, tasks, reviews — one chat instead of seven tabs.",
  },
  {
    n: 'III',
    title: 'Role-aware intelligence',
    body: "Managers see everything. Housekeeping sees rooms. Kitchen sees dietary needs. Everyone gets the signal that matters to them — and nothing else.",
  },
  {
    n: 'IV',
    title: 'Proactive, not reactive',
    body: "Grill notices the dirty room before the arrival, the dietary risk before the seating, the VIP before the bell. Alerts that arrive before the problem does.",
  },
  {
    n: 'V',
    title: 'Humans approve sensitive moves',
    body: "Rate changes, cancellations, review replies, guest sends — staged in a card and held for a manager. The agent prepares; the human confirms.",
  },
  {
    n: 'VI',
    title: 'Memory that’s actually used',
    body: "Preferences, complaints, dietary notes, anniversaries — written by the staff who heard them, surfaced for those who need them, on every future stay.",
  },
];

const viewport = { once: true, amount: 0.15 };

const TONE = {
  text: '#1A1A1A',
  text2: '#6B6B6B',
  text3: '#A3A3A3',
  border: '#EBEBEB',
  border2: '#F2F2F0',
  copperText: '#A0734E',
};

export default function Principles() {
  return (
    <section
      id="principles"
      className="bg-cream text-ink py-24 lg:py-32 border-t"
      style={{ borderColor: TONE.border }}
    >
      <div className="container-editorial">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-16 lg:mb-20 max-w-[760px]"
        >
          <motion.div variants={fadeUp} className="label-mono mb-6">◆ Principles</motion.div>
          <motion.h2
            variants={blurIn}
            className="font-serif text-[36px] sm:text-[44px] lg:text-[56px] leading-[1.04] tracking-[-0.015em] text-balance"
          >
            Six things that<br />
            <em className="not-italic" style={{ fontStyle: 'italic', color: TONE.copperText }}>
              don't move.
            </em>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-7 text-[16px] sm:text-[17px] leading-[1.7] max-w-[560px]"
            style={{ color: TONE.text2 }}
          >
            We're building for hotels that measure stays in moments, not
            transactions. The shape of the work — and the rules around it —
            stays the same regardless of which integrations come online next.
          </motion.p>
        </motion.div>

        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-10 lg:gap-x-14"
        >
          {PRINCIPLES.map((p) => (
            <motion.div key={p.n} variants={fadeUp}>
              <div
                className="font-serif italic mb-3.5"
                style={{ color: TONE.copperText, fontSize: 18 }}
              >
                {p.n}
              </div>
              <h3
                className="font-serif tracking-[-0.01em] mb-3.5"
                style={{ fontSize: 24, lineHeight: 1.18 }}
              >
                {p.title}
              </h3>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                viewport={viewport}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="mb-4"
                style={{ height: 1, background: TONE.copperText, opacity: 0.45 }}
              />
              <p
                className="text-[14.5px] leading-[1.65]"
                style={{ color: TONE.text2 }}
              >
                {p.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
