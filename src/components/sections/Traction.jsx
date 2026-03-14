import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Badge from '../ui/Badge';
import AnimatedCounter from '../ui/AnimatedCounter';
import { TRACTION } from '../../lib/constants';
import { staggerContainer, fadeUp } from '../../lib/animations';
import { Quote } from 'lucide-react';

function WordRevealQuote({ text, attribution }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const words = text.split(' ');
  const [visibleWords, setVisibleWords] = useState(0);
  const [showAttribution, setShowAttribution] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setVisibleWords((prev) => {
        if (prev >= words.length) {
          clearInterval(interval);
          setTimeout(() => setShowAttribution(true), 400);
          return prev;
        }
        return prev + 1;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [isInView, words.length]);

  return (
    <div ref={ref} className="max-w-3xl mx-auto text-center">
      <Quote size={32} className="text-copper/30 mx-auto mb-6" />
      <p className="text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed">
        {words.map((word, i) => (
          <span
            key={i}
            className={`inline-block mr-[0.3em] transition-all duration-300 ${
              i < visibleWords ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            } ${
              (word === 'actually' || word === 'knows') ? 'text-copper italic' : ''
            }`}
          >
            {word}
          </span>
        ))}
      </p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={showAttribution ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="mt-6 text-sm text-slate-light"
      >
        {attribution}
      </motion.p>
    </div>
  );
}

export default function Traction() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="green" className="mb-4">Traction</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Already making <span className="text-gradient-copper">an impact</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {TRACTION.metrics.map((metric, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="text-center p-6 rounded-xl bg-charcoal-light border border-cream/5"
            >
              <div className="text-3xl font-bold text-copper mb-1">
                <AnimatedCounter target={metric.value} suffix={metric.suffix} />
              </div>
              <p className="text-sm text-slate-light">{metric.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <WordRevealQuote text={TRACTION.quote} attribution={TRACTION.attribution} />
      </div>
    </section>
  );
}
