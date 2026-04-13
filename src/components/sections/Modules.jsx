import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Sun, Moon, User, RefreshCw, TrendingUp, Star, Bell, Check } from 'lucide-react';
import Badge from '../ui/Badge';
import { MODULES } from '../../lib/constants';
import { staggerContainer, fadeUp } from '../../lib/animations';

const iconMap = { Sun, Moon, User, RefreshCw, TrendingUp, Star, Bell };

function BriefingDemo({ lines }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= lines.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [isInView, lines.length]);

  return (
    <div ref={ref} className="font-mono text-xs space-y-0.5 p-4 rounded-lg bg-charcoal border border-cream/5 max-h-60 overflow-y-auto">
      {lines.slice(0, visibleLines).map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-cream/70"
        >
          {line || '\u00A0'}
        </motion.div>
      ))}
      {visibleLines < lines.length && (
        <span className="inline-block w-2 h-3 bg-copper animate-pulse" />
      )}
    </div>
  );
}

function ProfilesDemo({ guests }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % guests.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [guests.length]);

  return (
    <div className="relative h-40">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 p-4 rounded-lg bg-charcoal border border-cream/5"
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-sm">{guests[activeIndex].name}</h4>
              <Badge variant={guests[activeIndex].type === 'VIP' ? 'copper' : guests[activeIndex].type === 'New' ? 'green' : 'neutral'} className="mt-1">
                {guests[activeIndex].type}
              </Badge>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-copper">{guests[activeIndex].stays}</span>
              <p className="text-xs text-slate-light">stays</p>
            </div>
          </div>
          <div className="mt-3">
            <span className="px-2 py-0.5 rounded-full text-xs bg-copper/10 text-copper border border-copper/20">
              {guests[activeIndex].tag}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {guests.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-colors cursor-pointer ${
              i === activeIndex ? 'bg-copper' : 'bg-cream/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function SyncDemo({ systems }) {
  const [synced, setSynced] = useState([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    systems.forEach((_, i) => {
      setTimeout(() => setSynced((prev) => [...prev, i]), 800 + i * 600);
    });
  }, [isInView, systems]);

  return (
    <div ref={ref} className="space-y-3 p-4 rounded-lg bg-charcoal border border-cream/5">
      <div className="text-xs text-copper mb-2">Propagating update...</div>
      {systems.map((system, i) => (
        <div key={system} className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
            synced.includes(i) ? 'bg-green-500/15' : 'bg-cream/5'
          }`}>
            {synced.includes(i) ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Check size={14} className="text-green-400" />
              </motion.div>
            ) : (
              <RefreshCw size={14} className="text-slate-light animate-spin" />
            )}
          </div>
          <span className="text-sm text-cream/70">{system}</span>
          {synced.includes(i) && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-green-400 ml-auto"
            >
              Synced
            </motion.span>
          )}
        </div>
      ))}
    </div>
  );
}

const demoComponents = {
  briefing: BriefingDemo,
  audit: BriefingDemo,
  competitor: BriefingDemo,
  reviews: BriefingDemo,
  profiles: ProfilesDemo,
  sync: SyncDemo,
};

export default function Modules() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="modules" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="copper" className="mb-4">Product Modules</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Intelligence in <span className="text-gradient-copper">action</span>
          </h2>
        </motion.div>

        {/* Mobile tabs */}
        <div className="flex gap-2 mb-8 lg:hidden overflow-x-auto pb-2">
          {MODULES.map((mod, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === i
                  ? 'bg-copper text-white'
                  : 'bg-cream/5 text-slate-light'
              }`}
            >
              {mod.title}
            </button>
          ))}
        </div>

        {/* Desktop grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden lg:grid grid-cols-3 gap-6"
        >
          {MODULES.map((mod) => {
            const Icon = iconMap[mod.icon];
            const Demo = demoComponents[mod.demo];
            const demoProps = mod.lines ? { lines: mod.lines }
              : mod.demo === 'profiles' ? { guests: mod.guests }
              : { systems: mod.systems };

            return (
              <motion.div
                key={mod.title}
                variants={fadeUp}
                className="p-6 rounded-2xl bg-charcoal-light border border-cream/5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-copper/10 flex items-center justify-center">
                    <Icon size={18} className="text-copper" />
                  </div>
                  <h3 className="font-semibold">{mod.title}</h3>
                </div>
                <p className="text-sm text-slate-light mb-6">{mod.description}</p>
                <Demo {...demoProps} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile single card */}
        <div className="lg:hidden">
          <AnimatePresence mode="wait">
            {MODULES.map((mod, i) => {
              if (i !== activeTab) return null;
              const Icon = iconMap[mod.icon];
              const Demo = demoComponents[mod.demo];
              const demoProps = mod.demo === 'briefing' ? { lines: mod.lines }
                : mod.demo === 'profiles' ? { guests: mod.guests }
                : { systems: mod.systems };

              return (
                <motion.div
                  key={mod.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-6 rounded-2xl bg-charcoal-light border border-cream/5"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-copper/10 flex items-center justify-center">
                      <Icon size={18} className="text-copper" />
                    </div>
                    <h3 className="font-semibold">{mod.title}</h3>
                  </div>
                  <p className="text-sm text-slate-light mb-6">{mod.description}</p>
                  <Demo {...demoProps} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
