import { motion } from 'framer-motion';
import { IllustrationConnect, IllustrationRemember, IllustrationAct } from '../illustrations/Illustrations';
import { fadeUp, blurIn, staggerContainer, staggerContainerSlow } from '../../lib/animations';

const PILLARS = [
  {
    n: 'I',
    title: 'Connect',
    Illu: IllustrationConnect,
    body: 'Plug into the systems your hotel already runs — Mews, Lightspeed, Google Reviews, WhatsApp. We sit on top, never in place of.',
    foot: 'Setup in a single afternoon',
  },
  {
    n: 'II',
    title: 'Remember',
    Illu: IllustrationRemember,
    body: 'Every preference, allergy, and small offhand comment becomes structured memory — written by the staff who heard it, surfaced for those who need it.',
    foot: 'A profile that grows with each stay',
  },
  {
    n: 'III',
    title: 'Act',
    Illu: IllustrationAct,
    body: 'Briefings before shift. Action cards mid-shift. Approval flows for sensitive moves. The agent prepares — your manager confirms.',
    foot: 'Humans stay in control',
  },
];

const viewport = { once: true, amount: 0.15 };

export default function ThreePillars() {
  return (
    <section id="how-it-works" className="bg-cream text-ink py-24 lg:py-32 border-t border-b border-[#EBEBEB]">
      <div className="container-editorial">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 mb-16 items-end"
        >
          <div>
            <motion.div variants={fadeUp} className="label-mono mb-6">◆ How it works</motion.div>
            <motion.h2
              variants={blurIn}
              className="font-serif text-[36px] sm:text-[44px] lg:text-[48px] leading-[1.08] tracking-[-0.01em] text-balance"
            >
              A new layer between<br />
              <em className="text-[#A0734E] not-italic font-normal" style={{ fontStyle: 'italic' }}>your team</em> and<br />
              <em className="text-[#A0734E] not-italic font-normal" style={{ fontStyle: 'italic' }}>everything else.</em>
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="text-[16px] sm:text-[17px] leading-[1.65] text-[#6B6B6B] max-w-[520px] pb-3"
          >
            Three quiet movements — connect to what you have, remember every
            guest, act through one calm chat. Nothing replaced. Nothing
            thrown away.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-3 border-t border-[#EBEBEB]"
        >
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.n}
              variants={fadeUp}
              className={`px-6 sm:px-8 lg:px-9 py-10 lg:py-12 flex flex-col items-start ${
                i < 2 ? 'md:border-r border-b md:border-b-0 border-[#EBEBEB]' : ''
              }`}
            >
              <div className="font-serif italic text-[28px] text-copper mb-7">{p.n}</div>

              <div className="self-center mb-8">
                <p.Illu size={220} />
              </div>

              <h3 className="font-serif text-[28px] sm:text-[32px] tracking-[-0.015em] mb-3.5">
                {p.title}
              </h3>

              <p className="text-[15px] leading-[1.65] text-[#6B6B6B] mb-7">
                {p.body}
              </p>

              <div className="label-mono pt-4 border-t border-[#EBEBEB] w-full" style={{ color: '#A0734E', fontSize: '10px' }}>
                ◇ {p.foot}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
