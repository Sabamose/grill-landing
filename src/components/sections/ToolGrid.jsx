import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  User, CalendarCheck, Bed, Utensils, DollarSign,
  Mail, TrendingUp, Star, Bell, BarChart3, Globe,
  Check, ChevronRight, Sparkles, MessageSquare,
} from 'lucide-react';
import Badge from '../ui/Badge';
import { CAPABILITIES } from '../../lib/constants';

const iconMap = {
  User, CalendarCheck, Bed, Utensils, DollarSign,
  Mail, TrendingUp, Star, Bell, BarChart3, Globe,
};

/* ═══════════════════════════════════════════
   LIVE CONVERSATION DEMO
   Shows real questions hotel staff would ask
   ═══════════════════════════════════════════ */

const DEMO_SCRIPT = [
  { question: '"Tell me about James Richardson"', answer: 'VIP guest, 3rd stay. Vegetarian. Celebrating his 50th birthday. Wife Sarah loves Fendant du Valais.', capability: 'Guest Memory' },
  { question: '"What are competitors charging this weekend?"', answer: 'LeCrans CHF 520 (+8%) · Guarda Golf CHF 480 · Ambassador CHF 450 (-5%). We have a pricing gap on weekends.', capability: 'Competitor Rates' },
  { question: '"What did Pierre order last night?"', answer: 'Dinner at Chetzeron · CHF 185 · Cheese fondue + Fendant du Valais · 2 covers · Left a 20% tip.', capability: 'Restaurant & Bar' },
  { question: '"Any new guest reviews?"', answer: 'New 5-star Google review from Marco Rossi: "Staff remembered our anniversary!" Draft response ready for approval.', capability: 'Review Management' },
  { question: '"Morning briefing"', answer: '26 of 31 rooms occupied. James Richardson birthday today. Press guest on property. 3 arrivals tomorrow need outreach.', capability: 'Morning Briefings' },
  { question: '"Sophie wants to do a glacier hike"', answer: 'Noted for Sophie Muller. Recommended: early morning start with alpine guide. Booking link sent to her WhatsApp.', capability: 'Local Knowledge' },
];

function ConversationDemo() {
  const [activeStep, setActiveStep] = useState(-1);
  const [phase, setPhase] = useState('idle');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isInView) return;
    if (hasStarted.current) return;
    hasStarted.current = true;

    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        for (let i = 0; i < DEMO_SCRIPT.length; i++) {
          if (cancelled) return;

          setActiveStep(i);
          setPhase('asking');
          await wait(900);
          if (cancelled) return;

          setPhase('answering');
          await wait(2200);
          if (cancelled) return;

          setPhase('done');
          await wait(500);
        }

        if (cancelled) return;
        setActiveStep(-1);
        setPhase('idle');
        await wait(1500);
        hasStarted.current = false;
      }
    };

    run();
    return () => { cancelled = true; hasStarted.current = false; };
  }, [isInView]);

  const step = activeStep >= 0 ? DEMO_SCRIPT[activeStep] : null;

  return (
    <div ref={ref} className="relative max-w-3xl mx-auto mb-16">
      <div className="absolute -inset-4 bg-gradient-to-r from-copper/10 via-copper/5 to-copper/10 rounded-3xl blur-2xl pointer-events-none" />

      <div className="relative rounded-xl border border-cream/[0.08] overflow-hidden bg-[#1A1A1A]">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2A2A2A] border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
          </div>
          <div className="flex-1 flex items-center justify-center gap-2">
            <MessageSquare size={11} className="text-copper/60" />
            <span className="text-[10px] text-white/30 tracking-wide">app.getgrill.io</span>
          </div>
        </div>

        {/* Conversation area */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 min-h-[130px] sm:min-h-[150px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {step ? (
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-3"
              >
                {/* Staff question */}
                <div className="flex justify-end">
                  <div className="bg-[#C8956C] text-white rounded-[18px] rounded-br-sm px-4 py-2.5 max-w-[85%]">
                    <p className="text-[13px] sm:text-[14px] leading-relaxed">{step.question}</p>
                  </div>
                </div>

                {/* Grill response */}
                <AnimatePresence>
                  {phase === 'asking' ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-1.5 py-1"
                    >
                      {[0, 150, 300].map(d => (
                        <div
                          key={d}
                          className="w-2 h-2 rounded-full bg-[#A3A3A3] animate-bounce"
                          style={{ animationDelay: `${d}ms` }}
                        />
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-2"
                    >
                      <div className="bg-white/[0.04] rounded-xl px-4 py-3 border border-white/[0.06]">
                        <p className="text-[12px] sm:text-[13px] text-cream/70 leading-relaxed">{step.answer}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 400, delay: 0.1 }}
                          className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center"
                        >
                          <Check size={8} className="text-green-400" />
                        </motion.div>
                        <span className="text-[10px] text-copper/60">{step.capability}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-3"
              >
                <div className="flex items-center justify-center gap-2 text-[13px] text-white/20">
                  <Sparkles size={12} className="text-copper/40" />
                  <span>Ask anything — Grill knows your hotel inside out</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Capability ticker */}
        <div className="px-3 sm:px-5 py-2.5 border-t border-white/[0.05] bg-white/[0.02]">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide">
            <div className="flex gap-1.5 sm:gap-2 flex-nowrap">
              {DEMO_SCRIPT.map((s, i) => (
                <motion.span
                  key={i}
                  animate={{
                    opacity: activeStep === i ? 1 : 0.3,
                    scale: activeStep === i ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`text-[9px] px-2 py-0.5 rounded-full whitespace-nowrap ${
                    activeStep === i
                      ? 'bg-copper/20 text-copper'
                      : 'bg-white/[0.04] text-white/30'
                  }`}
                >
                  {s.capability}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CAPABILITY CARD
   ═══════════════════════════════════════════ */

function CapabilityCard({ capability, index, activeIndex, onHover }) {
  const Icon = iconMap[capability.icon];
  const isActive = activeIndex === index;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(-1)}
      className="group relative cursor-default"
    >
      {isActive && (
        <motion.div
          layoutId="cap-glow"
          className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-copper/30 via-copper/10 to-transparent"
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        />
      )}

      <div className={`relative bg-charcoal-light/50 border rounded-xl p-5 transition-all duration-300 h-full ${
        isActive ? 'border-copper/30 bg-copper/[0.06]' : 'border-cream/[0.06] hover:border-copper/15'
      }`}>
        <motion.div
          animate={isActive ? { scale: 1.1, rotate: [0, -5, 5, 0] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.4 }}
          className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors duration-300 ${
            isActive ? 'bg-copper/25' : 'bg-copper/10'
          }`}
        >
          {Icon && <Icon size={18} className={`transition-colors duration-300 ${isActive ? 'text-copper' : 'text-copper/60'}`} />}
        </motion.div>

        <h3 className={`text-sm font-semibold mb-2 transition-colors duration-300 ${isActive ? 'text-copper' : 'text-cream'}`}>
          {capability.name}
        </h3>

        <p className="text-xs text-slate-light/60 leading-relaxed">
          {capability.description}
        </p>

        {isActive && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: [0, 0.12, 0], x: 200 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-copper to-transparent rounded-xl pointer-events-none"
          />
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN SECTION
   ═══════════════════════════════════════════ */

function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

export default function ToolGrid() {
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <section id="capabilities" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="copper" className="mb-4">
            <Sparkles size={12} />
            What Grill can do
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Ask anything about <span className="text-gradient-copper">your hotel</span>
          </h2>
          <p className="mt-4 text-lg text-slate-light max-w-2xl mx-auto">
            Your staff just chats with Grill in plain language. It pulls from your PMS, POS,
            reviews, and guest history to deliver instant, actionable answers.
          </p>
        </motion.div>

        {/* Live conversation demo */}
        <ConversationDemo />

        {/* Capability grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {CAPABILITIES.map((capability, index) => (
            <CapabilityCard
              key={capability.name}
              capability={capability}
              index={index}
              activeIndex={activeIndex}
              onHover={setActiveIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
