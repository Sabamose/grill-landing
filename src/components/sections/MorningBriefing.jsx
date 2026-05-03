import { motion } from 'framer-motion';
import { IllustrationMorningBriefingScene } from '../illustrations/Illustrations';
import { fadeUp, blurIn, staggerContainer } from '../../lib/animations';

const TONE = {
  text: '#1A1A1A',
  text2: '#6B6B6B',
  text3: '#A3A3A3',
  border: '#EBEBEB',
  copperText: '#A0734E',
};

const viewport = { once: true, amount: 0.25 };

export default function MorningBriefing() {
  return (
    <section id="day-in-the-life" className="bg-cream text-ink py-24 lg:py-32">
      <div className="container-editorial">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-[760px] mb-12 lg:mb-16"
        >
          <motion.div variants={fadeUp} className="label-mono mb-6">◆ A day in the life · 07:30</motion.div>
          <motion.h2
            variants={blurIn}
            className="font-serif text-[36px] sm:text-[44px] lg:text-[52px] leading-[1.05] tracking-[-0.015em] text-balance mb-6"
          >
            Before the first guest stirs,<br />
            <span className="italic" style={{ color: TONE.copperText }}>
              your team already knows the day.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-[16px] sm:text-[17px] leading-[1.7] max-w-[600px]"
            style={{ color: TONE.text2 }}
          >
            Each morning, every department receives a brief shaped around the
            day ahead — VIP arrivals, dietary flags, milestones, and the small
            details that make a stay feel known. Not a dashboard. Not an
            inbox. A short, human note.
          </motion.p>
        </motion.div>

        {/* Illustration — centerpiece */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="flex justify-center my-8 lg:my-12"
        >
          <IllustrationMorningBriefingScene size={760} />
        </motion.div>

        {/* Closing — three quiet labels */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 lg:mt-14 pt-8 border-t flex flex-wrap items-center gap-x-10 gap-y-3 max-w-[860px] mx-auto justify-center"
          style={{ borderColor: TONE.border }}
        >
          <span className="label-mono" style={{ fontSize: 10 }}>◇ Per department</span>
          <span className="label-mono" style={{ fontSize: 10 }}>◇ Auto-delivered</span>
          <span className="label-mono" style={{ fontSize: 10 }}>◇ One-tap actions</span>
        </motion.div>
      </div>
    </section>
  );
}
