import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, AlertTriangle, Check, Database,
  ArrowRight, ArrowUp, Star,
} from 'lucide-react';
import { blurIn, fadeUp, staggerContainer } from '../../lib/animations';

/* ═══════════════════════════════════════════
   CHAT DEMO SCRIPT — CHECK-IN SCENARIO
   ═══════════════════════════════════════════ */

const HERO_SCRIPT = [
  {
    delay: 1400,
    user: 'Guest arriving — James Richardson, Suite 401',
    typingDelay: 950,
    response: [
      { type: 'header', name: 'James Richardson', badge: 'VIP · 3rd Stay', rating: '9.2' },
      { type: 'alert', text: 'Vegetarian — kitchen alerted' },
      { type: 'prefs', items: ['Mountain View', 'Extra Pillows', 'Fendant du Valais', 'High Floor'] },
      { type: 'insight', text: '50th birthday during this stay — consider a welcome gesture?' },
    ],
    sources: ['Mews PMS', 'Guest Memory'],
  },
  {
    delay: 3800,
    user: 'His wife Sarah loves white wine — anything specific?',
    typingDelay: 850,
    response: [
      { type: 'logged', text: 'Found in guest memory:' },
      { type: 'actions', items: [
        'Fendant du Valais was a hit last visit',
        'Stock minibar with local white wines',
        'She also loved the hot stone massage at the spa',
      ] },
      { type: 'prompt', text: 'Want me to prep the room and notify the team?' },
    ],
    sources: ['Guest Memory', 'Lightspeed POS'],
  },
  {
    delay: 3200,
    user: 'Yes, prep everything',
    typingDelay: 750,
    response: [
      { type: 'text', text: 'Done! Actions taken:' },
      { type: 'checks', items: [
        'Housekeeping — extra pillows + birthday card placed',
        'Kitchen — vegetarian menu flagged for all meals',
        'Minibar — Fendant du Valais stocked, CHF 45',
      ] },
      { type: 'confirmed', text: 'All teams confirmed. Profile updated.' },
    ],
    sources: ['Mews PMS', 'Staff App'],
  },
];

const wait = (ms) => new Promise(r => setTimeout(r, ms));

/* ═══════════════════════════════════════════
   RESPONSE BLOCK
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
            <span className="flex items-center gap-0.5 text-[10px] text-[#A0734E] ml-auto">
              <Star size={9} className="fill-[#C8956C] text-[#C8956C]" />
              {block.rating}
            </span>
          )}
        </div>
      )}

      {block.type === 'alert' && (
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#FDF0ED] border border-[#D4634B]/15 mb-2">
          <AlertTriangle size={11} className="text-[#D4634B] shrink-0" />
          <span className="text-[11px] text-[#D4634B] font-medium">{block.text}</span>
        </div>
      )}

      {block.type === 'prefs' && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {block.items.map((item, i) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.12 + 0.05 + i * 0.08 }}
              className="text-[10px] px-2 py-0.5 rounded-full bg-[#F3E8DE] text-[#A0734E] border border-[#C8956C]/15"
            >
              {item}
            </motion.span>
          ))}
        </div>
      )}

      {block.type === 'insight' && (
        <div className="flex items-start gap-1.5 text-[11px] text-[#C8956C]">
          <Sparkles size={11} className="shrink-0 mt-0.5" />
          <span>{block.text}</span>
        </div>
      )}

      {block.type === 'logged' && (
        <div className="flex items-center gap-1.5 mb-1.5">
          <Check size={12} className="text-[#5CB176]" />
          <span className="text-[13px] text-[#6B6B6B]">{block.text}</span>
        </div>
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

      {block.type === 'text' && (
        <p className="text-[13px] text-[#6B6B6B] mb-1">{block.text}</p>
      )}

      {block.type === 'checks' && (
        <div className="space-y-1 mb-1.5 ml-0.5">
          {block.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.12 + i * 0.13 }}
              className="flex items-start gap-1.5 text-[12px] text-[#6B6B6B]"
            >
              <Check size={10} className="text-[#5CB176] shrink-0 mt-0.5" />
              <span>{item}</span>
            </motion.div>
          ))}
        </div>
      )}

      {block.type === 'confirmed' && (
        <div className="flex items-center gap-1.5 mt-1 px-2.5 py-1.5 rounded-lg bg-[#EDF7F0] border border-[#5CB176]/15">
          <Check size={11} className="text-[#5CB176]" />
          <span className="text-[11px] text-[#5CB176] font-medium">{block.text}</span>
        </div>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   HERO CHAT — light, editorial, browser frame
   ═══════════════════════════════════════════ */

function HeroChat() {
  const [messages, setMessages] = useState([]);
  const [typingText, setTypingText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [fading, setFading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, typingText, isThinking]);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      while (!cancelled) {
        setMessages([]); setTypingText(''); setIsThinking(false); setFading(false);
        await wait(1200); if (cancelled) return;

        for (let i = 0; i < HERO_SCRIPT.length; i++) {
          if (cancelled) return;
          const step = HERO_SCRIPT[i];
          await wait(step.delay); if (cancelled) return;

          for (let c = 0; c <= step.user.length; c++) {
            if (cancelled) return;
            setTypingText(step.user.slice(0, c));
            await wait(25 + Math.random() * 35);
          }
          await wait(280); if (cancelled) return;

          setTypingText('');
          setMessages(prev => [...prev, { id: `u-${i}`, role: 'user', content: step.user }]);
          setIsThinking(true);
          await wait(step.typingDelay); if (cancelled) return;

          setIsThinking(false);
          setMessages(prev => [...prev, {
            id: `r-${i}`, role: 'assistant',
            blocks: step.response, sources: step.sources,
          }]);
          await wait(900);
        }

        if (cancelled) return;
        await wait(5000); if (cancelled) return;
        setFading(true);
        await wait(600);
      }
    };
    run();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="w-full max-w-[540px] mx-auto lg:mx-0 relative">
      <div
        className="relative rounded-xl overflow-hidden"
        style={{
          border: '1px solid #EBEBEB',
          boxShadow: '0 30px 70px -20px rgba(15,15,15,0.18), 0 12px 30px -12px rgba(15,15,15,0.08)',
        }}
      >
        {/* Browser chrome — clean URL pill, no traffic lights */}
        <div className="px-4 py-2.5 bg-[#F5F4F1] border-b border-[#EBEBEB] flex items-center justify-center">
          <div className="bg-white rounded-md px-3 py-1 flex items-center gap-1.5 border border-[#EBEBEB]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#28CA41]/60" />
            <span className="text-[10px] text-[#A3A3A3] tracking-wide">app.getgrill.io</span>
          </div>
        </div>

        <div className="bg-[#FAFAF8] flex flex-col">
          <div
            ref={chatRef}
            className={`px-5 sm:px-6 py-5 space-y-6 h-[360px] sm:h-[420px] overflow-y-auto transition-opacity duration-500 ${fading ? 'opacity-0' : 'opacity-100'}`}
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#EBEBEB transparent' }}
          >
            {messages.length === 0 && !typingText && !isThinking && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
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
                <div className="bg-[#C8956C]/85 text-white rounded-[20px] rounded-br-md px-5 py-3 max-w-[80%]">
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
                  <div key={d} className="w-2 h-2 rounded-full bg-[#A3A3A3] animate-bounce" style={{ animationDelay: `${d}ms` }} />
                ))}
              </motion.div>
            )}
          </div>

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
   HERO SECTION — editorial, cream, no glow
   ═══════════════════════════════════════════ */

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 sm:pt-28 pb-12 sm:pb-16 bg-cream text-ink">
      <div className="container-editorial w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 items-center"
        >
          {/* Left — copy */}
          <div>
            <motion.div variants={fadeUp} className="label-mono mb-7 inline-flex items-center gap-2">
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: '#C8956C' }}
              />
              Grill — for boutique hotels
            </motion.div>

            <motion.h1
              variants={blurIn}
              className="font-serif text-[36px] min-[480px]:text-[44px] sm:text-[56px] lg:text-[64px] xl:text-[72px] leading-[1.05] tracking-[-0.02em] text-balance"
            >
              We make your team<br />
              <span className="italic" style={{ color: '#A0734E' }}>unforgettable</span>,<br />
              not replaceable.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-8 text-[17px] sm:text-[18px] leading-[1.7] text-[#6B6B6B] max-w-[520px]"
            >
              Grill is the AI agent for hotel staff. It listens to every system
              you already run, remembers every guest, and prepares the next move
              — so your team can focus on the moments only humans can give.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#waitlist"
                className="inline-flex items-center justify-center rounded-full px-7 py-3.5 bg-ink text-white text-[14px] font-medium hover:bg-[#2A2A2A] transition-colors"
              >
                Request a demo
              </a>
              <a
                href="#what-is-grill"
                className="inline-flex items-center justify-center rounded-full px-7 py-3.5 bg-transparent border border-[#EBEBEB] text-ink text-[14px] hover:border-ink transition-colors"
              >
                See it in action →
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 pt-7 border-t border-[#EBEBEB] flex flex-wrap items-center gap-x-8 gap-y-3 label-mono"
              style={{ fontSize: 10 }}
            >
              <span>◇ No rip & replace</span>
              <span>◇ Setup in an afternoon</span>
              <span>◇ Humans stay in control</span>
            </motion.div>
          </div>

          {/* Right — chat artifact */}
          <motion.div variants={fadeUp}>
            <HeroChat />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
