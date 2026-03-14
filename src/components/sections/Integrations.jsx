import { motion } from 'framer-motion';
import Badge from '../ui/Badge';
import { INTEGRATION_NODES } from '../../lib/constants';
import { Check } from 'lucide-react';

function MarqueeRow({ items, direction = 'left', speed = 30 }) {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden group">
      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
        style={{ willChange: 'transform' }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-charcoal-light border border-cream/5 hover:border-copper/20 transition-all duration-300 hover:scale-105 shrink-0 group/item"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center p-1.5"
              style={{ background: `${item.color}15` }}
            >
              <img
                src={`/logos/${item.logoKey}.svg`}
                alt={item.name}
                className="w-full h-full object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <div>
              <span className="text-sm font-medium text-cream/80 group-hover/item:text-cream transition-colors">
                {item.name}
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                {item.live ? (
                  <>
                    <Check size={10} className="text-green-400" />
                    <span className="text-xs text-green-400">Live</span>
                  </>
                ) : (
                  <span className="text-xs text-copper">Coming Soon</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Integrations() {
  const row1 = INTEGRATION_NODES.slice(0, 6);
  const row2 = INTEGRATION_NODES.slice(6);

  return (
    <section className="py-24 lg:py-32 bg-charcoal-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="neutral" className="mb-4">Integrations</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Connects to <span className="text-gradient-copper">what you already use</span>
          </h2>
          <p className="mt-4 text-base text-slate-light max-w-xl mx-auto">
            No rip-and-replace. Grill plugs into your existing stack and unifies data from every source.
          </p>
        </motion.div>

        <div className="space-y-4">
          <MarqueeRow items={row1} direction="left" speed={35} />
          <MarqueeRow items={row2} direction="right" speed={40} />
        </div>
      </div>
    </section>
  );
}
