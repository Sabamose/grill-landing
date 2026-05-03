import { motion } from 'framer-motion';
import { IllustrationParagraphToAction } from '../illustrations/Illustrations';
import { fadeUp, blurIn, staggerContainer } from '../../lib/animations';

const TONE = {
  text: '#1A1A1A',
  text2: '#6B6B6B',
  text3: '#A3A3A3',
  border: '#EBEBEB',
  copper: '#C8956C',
  copperText: '#A0734E',
  copperSoft: '#F3E8DE',
};

const viewport = { once: true, amount: 0.25 };

export default function ActionCardCompare() {
  return (
    <section
      id="action-cards"
      className="bg-cream text-ink py-16 sm:py-24 lg:py-32 border-t"
      style={{ borderColor: TONE.border }}
    >
      <div className="container-editorial">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-[760px] mb-12 lg:mb-16"
        >
          <motion.div variants={fadeUp} className="label-mono mb-6">◆ The shape of an answer</motion.div>
          <motion.h2
            variants={blurIn}
            className="font-serif text-[36px] sm:text-[44px] lg:text-[52px] leading-[1.05] tracking-[-0.015em] text-balance mb-6"
          >
            Most agents answer with paragraphs.<br />
            <span className="italic" style={{ color: TONE.copperText }}>
              Grill answers with the next move.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-[16px] sm:text-[17px] leading-[1.7] max-w-[600px]"
            style={{ color: TONE.text2 }}
          >
            Eighty-seven words is a wall, not an answer. Grill distils what
            scattered systems know about a guest into one card your team can
            read in three seconds and act on with one tap. The agent prepares;
            the human approves.
          </motion.p>
        </motion.div>

        {/* Illustration — centerpiece */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="flex justify-center my-8 lg:my-12"
        >
          <IllustrationParagraphToAction size={760} />
        </motion.div>

        {/* Closing caption — quiet manifesto line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 lg:mt-16 pt-10 border-t flex flex-col md:flex-row md:items-end md:justify-between gap-5 max-w-[860px] mx-auto"
          style={{ borderColor: TONE.border }}
        >
          <p
            className="font-serif text-[18px] sm:text-[20px] leading-[1.4] tracking-[-0.005em] max-w-[560px]"
            style={{ color: TONE.text }}
          >
            Sensitive moves — comp amenities, room upgrades, price adjustments —
            stay staged in the card and wait for a manager.
          </p>
          <div
            className="label-mono whitespace-nowrap"
            style={{ fontSize: 10, color: TONE.text3 }}
          >
            ◇ Humans approve
          </div>
        </motion.div>
      </div>
    </section>
  );
}
