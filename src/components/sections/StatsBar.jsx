import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '../../lib/animations';
import { STATS } from '../../lib/constants';
import AnimatedCounter from '../ui/AnimatedCounter';

export default function StatsBar() {
  return (
    <section className="py-16 border-y border-cream/5">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="text-center p-6 rounded-xl bg-glass-light cursor-default"
            >
              <div className="text-3xl sm:text-4xl font-bold text-copper mb-2">
                {stat.prefix === '1 in ' ? (
                  <>
                    <span className="text-cream/60 text-xl">1 in </span>
                    <AnimatedCounter target={3} />
                  </>
                ) : (
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                )}
              </div>
              <p className="text-sm text-slate-light">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
