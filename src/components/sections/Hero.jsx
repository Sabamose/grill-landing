import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useTypewriter } from '../../hooks/useTypewriter';
import { HERO_WORDS } from '../../lib/constants';
import { blurIn, staggerContainer, fadeUp } from '../../lib/animations';
import {
  Sparkles, AlertTriangle, Check, Database,
  ArrowRight, ArrowUp, Star,
} from 'lucide-react';

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

function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

/* ═══════════════════════════════════════════
   RESPONSE BLOCK — CASA LEGADO LIGHT THEME
   Colors: #1A1A1A text, #6B6B6B secondary,
   #C8956C accent, #A0734E accent-text,
   #F3E8DE accent-soft, #A3A3A3 muted
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
   HERO CHAT — CASA LEGADO UI, BROWSER FRAME
   Light theme (#FAFAF8), only chat, no sidebar
   ═══════════════════════════════════════════ */

function HeroChat() {
  const [messages, setMessages] = useState([]);
  const [typingText, setTypingText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [activeSources, setActiveSources] = useState(null);
  const [fading, setFading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, typingText, isThinking]);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        setMessages([]);
        setTypingText('');
        setIsThinking(false);
        setActiveSources(null);
        setFading(false);

        await wait(1200);
        if (cancelled) return;

        for (let i = 0; i < HERO_SCRIPT.length; i++) {
          if (cancelled) return;
          const step = HERO_SCRIPT[i];

          await wait(step.delay);
          if (cancelled) return;

          // Type user message char by char
          for (let c = 0; c <= step.user.length; c++) {
            if (cancelled) return;
            setTypingText(step.user.slice(0, c));
            await wait(25 + Math.random() * 35);
          }
          await wait(280);
          if (cancelled) return;

          // Send
          setTypingText('');
          setMessages(prev => [...prev, { id: `u-${i}`, role: 'user', content: step.user }]);

          // Thinking
          setIsThinking(true);
          await wait(step.typingDelay);
          if (cancelled) return;

          // Response
          setIsThinking(false);
          setMessages(prev => [...prev, {
            id: `r-${i}`,
            role: 'assistant',
            blocks: step.response,
            sources: step.sources,
          }]);
          setActiveSources(step.sources);

          await wait(900);
        }

        if (cancelled) return;
        await wait(5000);
        if (cancelled) return;

        setFading(true);
        await wait(600);
      }
    };

    run();
    return () => { cancelled = true; };
  }, []);

  return (
    <motion.div variants={fadeUp} className="w-full max-w-[540px] mx-auto lg:mx-0 relative">
      {/* Glow behind browser */}
      <div className="absolute -inset-4 bg-gradient-to-br from-copper/15 via-copper/8 to-transparent rounded-3xl blur-2xl pointer-events-none" />

      <div className="relative rounded-xl overflow-hidden shadow-[0_25px_60px_-12px_rgba(0,0,0,0.5)] border border-cream/[0.08]">
        {/* ─── Browser Chrome ─── */}
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

        {/* ─── Chat App — Casa Legado Light Theme ─── */}
        <div className="bg-[#FAFAF8] flex flex-col">
          {/* Messages */}
          <div
            ref={chatRef}
            className={`px-5 sm:px-6 py-5 space-y-6 h-[360px] sm:h-[420px] overflow-y-auto transition-opacity duration-500 ${fading ? 'opacity-0' : 'opacity-100'}`}
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#EBEBEB transparent' }}
          >
            {/* Empty state greeting (shows at start of each loop) */}
            {messages.length === 0 && !typingText && !isThinking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
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
                    /* ─── User bubble — exact Casa Legado ─── */
                    <div className="flex justify-end mb-1">
                      <div className="bg-[#C8956C] text-white rounded-[20px] rounded-br-md px-5 py-3 max-w-[80%]">
                        <p className="text-[14px] sm:text-[15px] leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  ) : (
                    /* ─── AI response — structured blocks ─── */
                    <div className="space-y-1.5">
                      {msg.blocks.map((block, bi) => (
                        <ResponseBlock key={bi} block={block} index={bi} />
                      ))}
                      {/* Data sources — inline Casa Legado style */}
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

            {/* User typing preview */}
            {typingText && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-end mb-1"
              >
                <div className="bg-[#C8956C]/80 text-white rounded-[20px] rounded-br-md px-5 py-3 max-w-[80%]">
                  <p className="text-[14px] sm:text-[15px] leading-relaxed">
                    {typingText}
                    <span className="inline-block w-[2px] h-4 bg-white/60 ml-0.5 animate-pulse rounded-full" />
                  </p>
                </div>
              </motion.div>
            )}

            {/* AI thinking dots — Casa Legado bounce style */}
            {isThinking && (
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
            )}
          </div>

          {/* ─── Input Bar — exact Casa Legado ─── */}
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
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════ */

export default function Hero() {
  const typedWord = useTypewriter(HERO_WORDS);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const orb1X = useTransform(mouseX, [0, window.innerWidth], [-25, 25]);
  const orb1Y = useTransform(mouseY, [0, window.innerHeight], [-20, 20]);
  const orb2X = useTransform(mouseX, [0, window.innerWidth], [20, -20]);
  const orb2Y = useTransform(mouseY, [0, window.innerHeight], [15, -15]);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden"
    >
      {/* Ambient orbs */}
      <motion.div
        style={{ x: orb1X, y: orb1Y }}
        className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-copper/8 blur-[120px] pointer-events-none"
      />
      <motion.div
        style={{ x: orb2X, y: orb2Y }}
        className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] rounded-full bg-copper/5 blur-[100px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-20 items-center"
        >
          {/* ─── Left: Text ─── */}
          <div className="text-center lg:text-left">
            <motion.div variants={blurIn}>
              <Badge variant="copper" className="mb-6">
                <Sparkles size={12} />
                Guest Intelligence Platform
              </Badge>
            </motion.div>

            <motion.h1
              variants={blurIn}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold leading-[1.1] tracking-tight"
            >
              Every guest{' '}
              <br className="hidden sm:block" />
              <span className="text-gradient-copper italic">
                {typedWord}
                <span className="animate-pulse">|</span>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg sm:text-xl text-slate-light max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              The AI staff agent for boutique hotels. 34 tools in one chat — from
              guest memory to competitor rates. Your team knows every guest before
              they walk in the door.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button href="#waitlist" glow className="text-base px-8 py-3.5">
                Request Demo
              </Button>
              <Button href="#platform" variant="ghost" className="text-base px-8 py-3.5">
                See it in action
              </Button>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex items-center gap-6 justify-center lg:justify-start text-[13px] text-slate-light/60"
            >
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-copper" />
                No rip &amp; replace
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-copper" />
                Setup in hours
              </span>
            </motion.div>
          </div>

          {/* ─── Right: Live Chat Demo ─── */}
          <HeroChat />
        </motion.div>
      </div>
    </section>
  );
}
