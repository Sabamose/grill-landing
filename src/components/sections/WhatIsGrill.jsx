import { motion } from 'framer-motion';
import { IllustrationBell } from '../illustrations/Illustrations';
import { fadeUp, blurIn, staggerContainer, fadeRight } from '../../lib/animations';

const viewport = { once: true, amount: 0.25 };

export default function WhatIsGrill() {
  return (
    <section id="what-is-grill" className="bg-cream text-ink py-24 lg:py-32">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="container-editorial grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-20 items-center"
      >
        <div>
          <motion.div variants={fadeUp} className="label-mono mb-7">◆ What is Grill</motion.div>

          <motion.h2
            variants={blurIn}
            className="font-serif text-[40px] sm:text-[48px] lg:text-[52px] leading-[1.08] tracking-[-0.01em] mb-8 text-balance"
          >
            A second pair of ears for<br />
            every member of your team.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-[17px] sm:text-[18px] leading-[1.7] text-[#6B6B6B] max-w-[540px]"
          >
            Grill is the AI agent that sits quietly behind your front desk.
            It listens to every system you already run — the PMS, the POS, the
            reviews, the messaging — and turns scattered detail into a single,
            attentive memory. When a guest walks in, your team already knows
            their name, their preferences, and the small thing that will make
            this stay feel personal.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 pt-6 border-t border-[#EBEBEB] flex flex-wrap gap-8 items-center"
          >
            <div className="label-mono leading-[1.5]">
              One chat replaces<br />
              <span className="font-serif text-[28px] text-ink tracking-normal normal-case">seven</span> tools
            </div>
            <div className="hidden sm:block h-9 w-px bg-[#EBEBEB]" />
            <div className="label-mono leading-[1.5]">
              Sits on top<br />
              <span className="font-serif text-[28px] text-ink tracking-normal normal-case">not</span> in place of
            </div>
          </motion.div>
        </div>

        <motion.div variants={fadeRight} className="flex justify-center">
          <IllustrationBell size={400} />
        </motion.div>
      </motion.div>
    </section>
  );
}
