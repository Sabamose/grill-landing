import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Badge from '../ui/Badge';
import { ROADMAP } from '../../lib/constants';
import { fadeLeft, fadeRight } from '../../lib/animations';
import { Check, ArrowRight, Circle } from 'lucide-react';

const statusConfig = {
  done: { color: 'bg-green-400', icon: Check, label: 'Complete' },
  current: { color: 'bg-copper', icon: ArrowRight, label: 'In Progress' },
  upcoming: { color: 'bg-cream/20', icon: Circle, label: 'Upcoming' },
};

export default function Roadmap() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="roadmap" className="py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="copper" className="mb-4">Roadmap</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Where we're <span className="text-gradient-copper">going</span>
          </h2>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Vertical line track */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-cream/5 lg:-translate-x-px">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-copper to-copper/30"
            />
          </div>

          {/* Milestones */}
          <div className="space-y-12">
            {ROADMAP.map((milestone, i) => {
              const isLeft = i % 2 === 0;
              const config = statusConfig[milestone.status];
              const Icon = config.icon;

              return (
                <motion.div
                  key={milestone.phase}
                  variants={isLeft ? fadeLeft : fadeRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  className={`relative grid lg:grid-cols-2 gap-8 ${
                    isLeft ? '' : ''
                  }`}
                >
                  {/* Dot on timeline */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
                    className={`absolute left-6 lg:left-1/2 w-3 h-3 rounded-full ${config.color} -translate-x-1.5 top-6 z-10`}
                  >
                    {milestone.status === 'current' && (
                      <span className="absolute inset-0 rounded-full bg-copper animate-ping opacity-40" />
                    )}
                  </motion.div>

                  {/* Card - always on right for mobile, alternates for desktop */}
                  <div className={`pl-14 lg:pl-0 ${isLeft ? 'lg:pr-12 lg:text-right' : 'lg:col-start-2 lg:pl-12'}`}>
                    <div className={`p-6 rounded-xl bg-charcoal-light border ${
                      milestone.status === 'current' ? 'border-copper/20' : 'border-cream/5'
                    }`}>
                      <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'lg:justify-end' : ''}`}>
                        <span className="text-sm font-bold text-copper">{milestone.phase}</span>
                        <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                          milestone.status === 'done' ? 'bg-green-500/10 text-green-400' :
                          milestone.status === 'current' ? 'bg-copper/10 text-copper' :
                          'bg-cream/5 text-slate-light'
                        }`}>
                          <Icon size={10} />
                          {config.label}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{milestone.title}</h3>
                      <ul className={`space-y-1.5 ${isLeft ? 'lg:text-right' : ''}`}>
                        {milestone.items.map((item) => (
                          <li key={item} className="text-sm text-slate-light flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-copper/50 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Empty spacer for alternating layout on desktop */}
                  {isLeft && <div className="hidden lg:block" />}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
