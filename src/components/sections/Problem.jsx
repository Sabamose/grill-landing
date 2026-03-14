import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useInView } from 'framer-motion';
import { Unplug, UserX, TrendingDown } from 'lucide-react';
import { staggerContainer, fadeUp } from '../../lib/animations';
import Badge from '../ui/Badge';
import { PROBLEMS } from '../../lib/constants';

const iconMap = { Unplug, UserX, TrendingDown };

function TiltCard({ problem, index }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [8, -8]);
  const rotateY = useTransform(mouseX, [0, 1], [-8, 8]);
  const spotlightX = useTransform(mouseX, [0, 1], [0, 100]);
  const spotlightY = useTransform(mouseY, [0, 1], [0, 100]);

  const handleMouse = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const resetMouse = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const Icon = iconMap[problem.icon];

  const isInfinity = problem.number === '∞';

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="relative p-8 rounded-2xl bg-charcoal-light border border-cream/5 overflow-hidden group cursor-default"
    >
      <motion.div
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(199,123,60,0.08) 0%, transparent 60%)`
          ),
        }}
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center mb-6">
          <Icon size={22} className="text-copper" />
        </div>

        <div className="text-5xl font-bold text-copper/80 mb-3">
          {isInfinity ? (
            <svg viewBox="0 0 80 40" className="w-16 h-10">
              <motion.path
                d="M20 20c0-8 6-14 14-14s14 6 14 14-6 14-14 14-14-6-14-14zm26 0c0-8 6-14 14-14s14 6 14 14-6 14-14 14-14-6-14-14z"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-copper"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 + index * 0.2 }}
              />
            </svg>
          ) : (
            problem.number
          )}
        </div>

        <h3 className="text-xl font-semibold text-cream mb-3">{problem.title}</h3>
        <p className="text-sm text-slate-light leading-relaxed">{problem.description}</p>
      </div>
    </motion.div>
  );
}

export default function Problem() {
  return (
    <section id="problem" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="neutral" className="mb-4">The Problem</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Your staff are fighting<br />
            <span className="text-gradient-copper">their own tools.</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {PROBLEMS.map((problem, i) => (
            <TiltCard key={i} problem={problem} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
