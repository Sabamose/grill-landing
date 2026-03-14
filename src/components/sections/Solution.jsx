import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Brain, MessageSquare, Zap, Star, AlertTriangle,
  Check, Database, ArrowRight, ArrowUp, Sparkles, Gift,
} from 'lucide-react';
import Badge from '../ui/Badge';
import { SOLUTION_FEATURES } from '../../lib/constants';
import { staggerContainer, fadeUp, fadeRight } from '../../lib/animations';

const iconMap = { Brain, MessageSquare, Zap };

/* ═══════════════════════════════════════════
   SOLUTION CHAT SCRIPT
   Each exchange maps to a feature:
   1. Unified Memory — full guest profile recall
   2. Natural Queries — past restaurant orders
   3. Proactive Briefs — upcoming special date alert
   ═══════════════════════════════════════════ */

const SOLUTION_SCRIPT = [
  {
    delay: 1400,
    user: 'Who is the guest checking into Room 312?',
    typingDelay: 900,
    featureIndex: 0,
    response: [
      { type: 'header', name: 'María García', badge: 'VIP · 3rd Stay', rating: '9.5' },
      { type: 'alert', text: 'Shellfish allergy — all departments alerted' },
      { type: 'prefs', items: ['High Floor', 'Quiet Room', 'Malbec', 'Black Coffee', 'No Peanuts'] },
      { type: 'note', text: 'Celebrated anniversary on last visit. Very polite, appreciates personal touches.' },
    ],
    sources: ['Opera PMS', 'Guest History', 'Kitchen Notes'],
  },
  {
    delay: 3800,
    user: 'What did she order at the restaurant last time?',
    typingDelay: 800,
    featureIndex: 1,
    response: [
      { type: 'subheader', text: 'Last visit — December 2024' },
      { type: 'list', items: [
        'Night 1: Grilled salmon with asparagus',
        'Night 2: Mushroom risotto',
        'Room service breakfast both mornings — black coffee, no sugar',
      ] },
      { type: 'insight', text: 'Tip: She avoids shellfish and peanuts. Safe options are already flagged for the kitchen.' },
    ],
    sources: ['Restaurant POS', 'Room Service'],
  },
  {
    delay: 3500,
    user: 'Any special dates coming up?',
    typingDelay: 750,
    featureIndex: 2,
    response: [
      { type: 'highlight', icon: 'gift', text: 'Anniversary — March 15th (in 2 days!)' },
      { type: 'text', text: 'Here\'s what I\'d suggest:' },
      { type: 'actions', items: [
        'Complimentary dessert at dinner',
        'Room upgrade to Suite 401 (her favorite)',
        'Handwritten note from the GM',
      ] },
      { type: 'prompt', text: 'Should I prep these with the team?' },
    ],
    sources: ['Guest Profile', 'Booking History'],
  },
];

function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

/* ═══════════════════════════════════════════
   RESPONSE BLOCK — CASA LEGADO LIGHT THEME
   ═══════════════════════════════════════════ */

function ResponseBlock({ block, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.12 }}
    >
      {block.type === 'header' && (
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <span className="font-serif text-[16px] text-[#1A1A1A]">{block.name}</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F3E8DE] text-[#A0734E] font-medium">
            {block.badge}
          </span>
          {block.rating && (
            <span className="flex items-center gap-0.5 text-[10px] text-[#D4974B] ml-auto">
              <Star size={9} className="fill-[#D4974B]" />
              {block.rating}
            </span>
          )}
        </div>
      )}

      {block.type === 'alert' && (
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#FDF0ED] border border-[#D4634B]/15 mb-2">
          <AlertTriangle size={11} className="text-[#D4634B] shrink-0 animate-pulse" />
          <span className="text-[11px] text-[#D4634B] font-medium">{block.text}</span>
        </div>
      )}

      {block.type === 'prefs' && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {block.items.map((item, i) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.12 + 0.05 + i * 0.08 }}
              className="text-[10px] px-2 py-0.5 rounded-full bg-[#F3E8DE] text-[#A0734E] border border-[#C8956C]/15"
            >
              {item}
            </motion.span>
          ))}
        </div>
      )}

      {block.type === 'note' && (
        <p className="text-[12px] text-[#6B6B6B] leading-relaxed italic">{block.text}</p>
      )}

      {block.type === 'subheader' && (
        <p className="font-serif text-[14px] text-[#1A1A1A] mb-1">{block.text}</p>
      )}

      {block.type === 'list' && (
        <div className="space-y-1 mb-1.5 ml-0.5">
          {block.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.12 + i * 0.1 }}
              className="flex items-start gap-1.5 text-[12px] text-[#6B6B6B]"
            >
              <span className="text-[#A3A3A3] shrink-0 mt-px">•</span>
              <span>{item}</span>
            </motion.div>
          ))}
        </div>
      )}

      {block.type === 'insight' && (
        <div className="flex items-start gap-1.5 text-[11px] text-[#C8956C]">
          <Sparkles size={11} className="shrink-0 mt-0.5" />
          <span>{block.text}</span>
        </div>
      )}

      {block.type === 'highlight' && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#FDF5ED] border border-[#D4974B]/15 mb-2">
          <Gift size={13} className="text-[#D4974B] shrink-0" />
          <span className="text-[13px] text-[#D4974B] font-medium">{block.text}</span>
        </div>
      )}

      {block.type === 'text' && (
        <p className="text-[13px] text-[#6B6B6B] mb-1">{block.text}</p>
      )}

      {block.type === 'actions' && (
        <div className="space-y-1 mb-1.5 ml-0.5">
          {block.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.12 + i * 0.1 }}
              className="flex items-start gap-1.5 text-[12px] text-[#6B6B6B]"
            >
              <ArrowRight size={10} className="text-[#C8956C] shrink-0 mt-0.5" />
              <span>{item}</span>
            </motion.div>
          ))}
        </div>
      )}

      {block.type === 'prompt' && (
        <p className="text-[11px] text-[#A3A3A3] italic mt-0.5">{block.text}</p>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   SOLUTION CHAT — CASA LEGADO UI + BROWSER FRAME
   ═══════════════════════════════════════════ */

function SolutionChat({ onFeatureHighlight }) {
  const [messages, setMessages] = useState([]);
  const [typingText, setTypingText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [fading, setFading] = useState(false);
  const chatRef = useRef(null);
  const containerRef = useRef(null);
  const isVisible = useInView(containerRef, { once: false, amount: 0.3 });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, typingText, isThinking]);

  useEffect(() => {
    if (!isVisible) return;
    if (hasStarted.current) return;
    hasStarted.current = true;

    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        setMessages([]);
        setTypingText('');
        setIsThinking(false);
        setFading(false);
        onFeatureHighlight?.(-1);

        await wait(1000);
        if (cancelled) return;

        for (let i = 0; i < SOLUTION_SCRIPT.length; i++) {
          if (cancelled) return;
          const step = SOLUTION_SCRIPT[i];

          await wait(step.delay);
          if (cancelled) return;

          // Highlight corresponding feature
          onFeatureHighlight?.(step.featureIndex);

          // Type user message
          for (let c = 0; c <= step.user.length; c++) {
            if (cancelled) return;
            setTypingText(step.user.slice(0, c));
            await wait(25 + Math.random() * 35);
          }
          await wait(280);
          if (cancelled) return;

          setTypingText('');
          setMessages(prev => [...prev, { id: `u-${i}`, role: 'user', content: step.user }]);

          setIsThinking(true);
          await wait(step.typingDelay);
          if (cancelled) return;

          setIsThinking(false);
          setMessages(prev => [...prev, {
            id: `r-${i}`,
            role: 'assistant',
            blocks: step.response,
            sources: step.sources,
          }]);

          await wait(900);
        }

        if (cancelled) return;
        await wait(5000);
        if (cancelled) return;

        onFeatureHighlight?.(-1);
        setFading(true);
        await wait(600);
        if (cancelled) return;

        hasStarted.current = false;
      }
    };

    run();
    return () => { cancelled = true; hasStarted.current = false; };
  }, [isVisible, onFeatureHighlight]);

  return (
    <div ref={containerRef} className="w-full max-w-[520px] mx-auto relative">
      {/* Glow */}
      <div className="absolute -inset-3 bg-gradient-to-br from-copper/15 via-copper/8 to-transparent rounded-3xl blur-2xl pointer-events-none" />

      <div className="relative rounded-xl overflow-hidden shadow-[0_25px_60px_-12px_rgba(0,0,0,0.5)] border border-cream/[0.08]">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#2A2A2A] border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
          </div>
          <div className="flex-1 mx-6">
            <div className="bg-[#1A1A1A] rounded-md px-3 py-1 text-center flex items-center justify-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#28CA41]/50" />
              <span className="text-[10px] text-white/30 tracking-wide">app.getgrill.io</span>
            </div>
          </div>
        </div>

        {/* Chat — Casa Legado light theme */}
        <div className="bg-[#FAFAF8] flex flex-col">
          <div
            ref={chatRef}
            className={`px-5 sm:px-6 py-5 space-y-6 h-[380px] sm:h-[430px] overflow-y-auto transition-opacity duration-500 ${fading ? 'opacity-0' : 'opacity-100'}`}
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#EBEBEB transparent' }}
          >
            {/* Empty state */}
            {messages.length === 0 && !typingText && !isThinking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center h-full"
              >
                <div className="text-center">
                  <h3 className="font-serif text-[24px] sm:text-[28px] text-[#1A1A1A] mb-1">Good morning</h3>
                  <p className="text-[14px] text-[#A3A3A3]">What do you need to know?</p>
                </div>
              </motion.div>
            )}

            <AnimatePresence mode="sync">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {msg.role === 'user' ? (
                    <div className="flex justify-end mb-1">
                      <div className="bg-[#C8956C] text-white rounded-[20px] rounded-br-md px-5 py-3 max-w-[80%]">
                        <p className="text-[14px] sm:text-[15px] leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      {msg.blocks.map((block, bi) => (
                        <ResponseBlock key={bi} block={block} index={bi} />
                      ))}
                      {msg.sources && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="flex items-center gap-1.5 pt-1"
                        >
                          <Database className="w-3 h-3 text-[#A3A3A3]" />
                          <span className="text-[11px] text-[#A3A3A3]">
                            {msg.sources.join(' · ')}
                          </span>
                        </motion.div>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {typingText && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end mb-1">
                <div className="bg-[#C8956C]/80 text-white rounded-[20px] rounded-br-md px-5 py-3 max-w-[80%]">
                  <p className="text-[14px] sm:text-[15px] leading-relaxed">
                    {typingText}
                    <span className="inline-block w-[2px] h-4 bg-white/60 ml-0.5 animate-pulse rounded-full" />
                  </p>
                </div>
              </motion.div>
            )}

            {isThinking && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-1.5 py-1">
                {[0, 150, 300].map(d => (
                  <div
                    key={d}
                    className="w-2 h-2 rounded-full bg-[#A3A3A3] animate-bounce"
                    style={{ animationDelay: `${d}ms` }}
                  />
                ))}
              </motion.div>
            )}
          </div>

          {/* Input bar */}
          <div className="border-t border-[#F2F2F0] px-5 sm:px-6 py-3">
            <div className="bg-white border border-[#EBEBEB] rounded-2xl px-5 py-3 flex items-center gap-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <span className="flex-1 text-[14px] sm:text-[15px] text-[#A3A3A3] select-none truncate">
                Ask about any guest...
              </span>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all"
                style={{
                  background: typingText ? '#C8956C' : '#EBEBEB',
                  color: typingText ? 'white' : '#A3A3A3',
                }}
              >
                <ArrowUp className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SOLUTION SECTION
   ═══════════════════════════════════════════ */

export default function Solution() {
  const [highlightedFeature, setHighlightedFeature] = useState(-1);

  return (
    <section id="solution" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="copper" className="mb-4">The Solution</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Meet <span className="text-gradient-copper">the Grill</span>
          </h2>
          <p className="mt-4 text-lg text-slate-light max-w-2xl mx-auto">
            One intelligent profile that unifies every guest interaction across every system —
            so your staff can deliver truly personal experiences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left: Chat demo */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SolutionChat onFeatureHighlight={setHighlightedFeature} />
          </motion.div>

          {/* Right: Features — highlight synced with chat */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {SOLUTION_FEATURES.map((feature, idx) => {
              const Icon = iconMap[feature.icon];
              const active = highlightedFeature === idx;
              return (
                <motion.div
                  key={feature.title}
                  variants={fadeRight}
                  className={`flex gap-4 p-4 -m-4 rounded-xl transition-all duration-500 ${
                    active
                      ? 'bg-copper/[0.06] border border-copper/15'
                      : 'border border-transparent'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ${
                      active ? 'bg-copper/20 scale-110' : 'bg-copper/10'
                    }`}
                  >
                    <Icon size={22} className={`transition-colors duration-500 ${active ? 'text-copper' : 'text-copper/70'}`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold mb-1 transition-colors duration-500 ${active ? 'text-copper' : ''}`}>
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-light leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
