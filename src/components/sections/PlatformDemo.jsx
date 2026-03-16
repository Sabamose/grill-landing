import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  LayoutDashboard, MessageSquare, CalendarCheck, Sparkles,
  Cloud, Lightbulb, ArrowUp, Database, Circle,
  Send, Clock, AlertTriangle, CheckCircle2, Users,
  Bell, Coffee, Utensils, MapPin,
} from 'lucide-react';
import Badge from '../ui/Badge';
import { fadeUp } from '../../lib/animations';
import { generateResponse } from '../../lib/chat-engine';
import { rooms, guests, serviceRequests, reservations, upcomingGuests } from '../../lib/hotel-data';

/* ═══════════════════════════════════════════
   CONSTANTS & HELPERS
   ═══════════════════════════════════════════ */
const roomStatus = {
  occupied:  { bg: '#F3E8DE', text: '#A0734E', label: 'Occupied' },
  available: { bg: '#EDF7F0', text: '#5CB176', label: 'Available' },
  maintenance: { bg: '#FDF0ED', text: '#D4634B', label: 'Maintenance' },
  'checkout-today': { bg: '#FDF5ED', text: '#D4974B', label: 'Checkout' },
};

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'chat', label: 'Chat', icon: MessageSquare },
  { id: 'prearrivals', label: 'Pre-Arrival', icon: CalendarCheck },
];

/* ─── Get real data ─── */
function getOccupiedGuests() {
  return rooms
    .filter(r => r.currentGuest)
    .map(r => {
      const g = guests.find(g => g.id === r.currentGuest);
      return g ? { ...g, room: r } : null;
    })
    .filter(Boolean);
}

const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;
const pendingServices = serviceRequests.filter(s => s.status === 'pending');
const inProgressServices = serviceRequests.filter(s => s.status === 'in-progress');

/* ═══════════════════════════════════════════
   DASHBOARD TAB — REAL DATA
   ═══════════════════════════════════════════ */
function DashboardTab() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const occupiedGuests = getOccupiedGuests();

  const briefingItems = [
    {
      color: '#5B8BD4', icon: Users,
      title: 'James Richardson — Wedding Anniversary',
      detail: 'The Laura (Suite) · 3rd visit · Prep welcome note + complimentary dessert. Wife Sarah prefers white wine.',
    },
    {
      color: '#D4974B', icon: AlertTriangle,
      title: 'Marie Dubois — Birthday coming up',
      detail: 'The Lucho (Suite) · Cake surprise requested. Vegetarian — confirm with kitchen.',
    },
    {
      color: '#D4634B', icon: Clock,
      title: 'Carlos Mendoza — Checkout today',
      detail: 'The Helen · Airport transfer at 3pm. Interested in 15-person company event — follow up!',
    },
    {
      color: '#5CB176', icon: Coffee,
      title: 'Isabella & Marco — Honeymoon',
      detail: 'The María · Rose petals arranged. Dinner at Andrés Carne de Res Saturday — remind to leave by 5pm.',
    },
  ];

  const guestTips = [
    { guest: 'James Richardson', tip: 'Gluten-free. Loves morning jogs — suggest park route. DO NOT re-recommend Leo Cocina (already been twice).' },
    { guest: 'Yuki Tanaka', tip: 'Dairy-free. Interested in hotel cooking class — confirm kitchen can accommodate. Appreciates written info.' },
    { guest: 'Emma Wilson', tip: 'Vegan (friends are not). Two friends arriving tomorrow — prep rooms. Rebook Thai massage for Wednesday.' },
    { guest: 'Ana García', tip: 'Pescatarian. Writing retreat — needs quiet. Late breakfast ~10am. Recommended Luvina bookshop café.' },
  ];

  return (
    <div className="space-y-4 p-4 sm:p-5">
      {/* Greeting */}
      <div>
        <h3 className="font-serif text-[20px] sm:text-[24px] text-[#1A1A1A]">Good morning, team</h3>
        <p className="text-[12px] text-[#6B6B6B] mt-1 flex items-center gap-1.5 flex-wrap">
          {today} · <span className="font-medium text-[#1A1A1A]">{occupiedRooms} of {rooms.length}</span> rooms occupied ·
          <Cloud className="w-3 h-3 inline" /> 22°C, afternoon rain likely
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { value: occupiedRooms, label: 'Occupied', color: '#A0734E', bg: '#F3E8DE' },
          { value: pendingServices.length, label: 'Pending', color: '#D4974B', bg: '#FDF5ED' },
          { value: rooms.filter(r => r.status === 'available').length, label: 'Available', color: '#5CB176', bg: '#EDF7F0' },
        ].map(s => (
          <div key={s.label} className="rounded-lg p-2.5 text-center" style={{ background: s.bg }}>
            <p className="text-[18px] font-semibold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[10px] text-[#A3A3A3]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Briefing */}
      <Section title="What's special today" icon={Sparkles}>
        <div className="space-y-0">
          {briefingItems.map((item, i) => (
            <div key={i} className="flex gap-2.5 py-2 group hover:bg-[#FAFAF8] -mx-3 px-3 rounded-lg transition-colors">
              <div className="w-1 rounded-full shrink-0 mt-0.5" style={{ background: item.color, minHeight: 32 }} />
              <div className="min-w-0">
                <p className="text-[12px] font-medium text-[#1A1A1A] leading-snug">{item.title}</p>
                <p className="text-[11px] text-[#6B6B6B] mt-0.5 leading-relaxed">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Pending tasks */}
      {pendingServices.length > 0 && (
        <Section title="Don't forget" icon={Clock}>
          <div className="space-y-1.5">
            {pendingServices.map(sr => {
              const g = guests.find(g => g.id === sr.guestId);
              const r = rooms.find(r => r.id === sr.roomId);
              return (
                <div key={sr.id} className="flex items-start gap-2 py-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4974B] shrink-0 mt-1.5" />
                  <div>
                    <p className="text-[12px] text-[#1A1A1A]">
                      <span className="font-medium">{g?.firstName}</span> ({r?.name}) — {sr.description}
                    </p>
                    {sr.notes && <p className="text-[11px] text-[#A3A3A3] italic">{sr.notes}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {/* Guest tips */}
      <Section title="Guest intelligence" icon={Lightbulb}>
        <div className="space-y-1.5">
          {guestTips.map((tip, i) => (
            <div key={i} className="flex items-start gap-2 py-0.5">
              <Lightbulb className="w-3 h-3 text-[#C8956C] shrink-0 mt-0.5" />
              <p className="text-[12px] text-[#6B6B6B] leading-relaxed">
                <span className="font-medium text-[#1A1A1A]">{tip.guest}</span> — {tip.tip}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Room grid */}
      <Section title="Rooms at a glance" icon={MapPin}>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-1">
          {rooms.map((room) => {
            const s = roomStatus[room.status] || roomStatus.available;
            const g = room.currentGuest ? guests.find(g => g.id === room.currentGuest) : null;
            return (
              <div key={room.id} className="rounded-md p-1.5 text-center cursor-default hover:scale-105 transition-transform" style={{ background: s.bg }}>
                <p className="text-[10px] font-semibold" style={{ color: s.text }}>{room.name.replace('The ', '')}</p>
                <p className="text-[9px] truncate" style={{ color: s.text }}>
                  {g ? `${g.firstName.charAt(0)}. ${g.lastName}` : s.label}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex gap-3 mt-2 flex-wrap">
          {Object.entries(roomStatus).map(([key, s]) => (
            <div key={key} className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-sm" style={{ background: s.bg, border: `1px solid ${s.text}40` }} />
              <span className="text-[9px] text-[#A3A3A3]">{s.label}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MARKDOWN RENDERER
   ═══════════════════════════════════════════ */
function MarkdownContent({ content }) {
  return (
    <div className="max-w-none text-[#1A1A1A]">
      {content.split('\n').map((line, li) => {
        if (line.startsWith('## ')) return <h4 key={li} className="font-serif text-[16px] font-normal text-[#1A1A1A] mt-1 mb-1.5">{line.slice(3)}</h4>;
        if (line.startsWith('### ')) return <h5 key={li} className="text-[13px] font-semibold text-[#1A1A1A] mt-2.5 mb-0.5">{line.slice(4)}</h5>;
        if (line.startsWith('- **')) {
          const parts = line.slice(4).split('**');
          return <p key={li} className="text-[12px] text-[#6B6B6B] ml-2.5 my-0.5">{'\u2022 '}<span className="font-medium text-[#1A1A1A]">{parts[0]}</span>{renderInline(parts.slice(1).join('**'))}</p>;
        }
        if (line.startsWith('- ')) return <p key={li} className="text-[12px] text-[#6B6B6B] ml-2.5 my-0.5">{'\u2022 '}{renderInline(line.slice(2))}</p>;
        if (line.startsWith('**')) return <p key={li} className="text-[12px] text-[#6B6B6B] my-0.5">{renderInline(line)}</p>;
        if (line.trim() === '') return <div key={li} className="h-1" />;
        return <p key={li} className="text-[12px] text-[#6B6B6B] my-0.5">{renderInline(line)}</p>;
      })}
    </div>
  );
}

function renderInline(text) {
  if (!text) return text;
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <span key={i} className="font-medium text-[#1A1A1A]">{part.slice(2, -2)}</span>;
    if (part.startsWith('`') && part.endsWith('`')) return <span key={i} className="text-[#A0734E] bg-[#FDF5ED] px-1 py-0.5 rounded text-[11px]">{part.slice(1, -1)}</span>;
    if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) return <em key={i} className="text-[#A3A3A3] text-[11px]">{part.slice(1, -1)}</em>;
    return part;
  });
}

/* ═══════════════════════════════════════════
   CHAT TAB — AUTO-PLAYING DEMO + INTERACTIVE
   ═══════════════════════════════════════════ */

const DEMO_SCRIPT = [
  {
    delay: 1200,
    user: 'Morning briefing',
    typingDelay: 800,
  },
  {
    delay: 4000,
    user: 'Tell me about James Richardson',
    typingDelay: 700,
  },
  {
    delay: 5000,
    user: 'James loved the local coffee tour yesterday',
    typingDelay: 600,
  },
];

const CHAT_SUGGESTIONS = [
  { text: 'Morning briefing', sub: "Today's overview" },
  { text: 'Tell me about James Richardson', sub: 'Guest profile + grill' },
  { text: 'Marie left half the breakfast', sub: 'Log an observation' },
  { text: 'Restaurant recommendations for Emma', sub: 'Based on her history' },
  { text: 'Pre-arrival status', sub: "Who needs outreach" },
  { text: 'Any dietary restrictions?', sub: 'Kitchen prep' },
];

function ChatTab() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [autoPlayDone, setAutoPlayDone] = useState(false);
  const [autoPlayStep, setAutoPlayStep] = useState(-1);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const isVisible = useInView(containerRef, { once: true, amount: 0.3 });
  const autoPlayStarted = useRef(false);

  useEffect(() => {
    const el = messagesEndRef.current;
    if (el) {
      const scrollParent = el.closest('.overflow-y-auto');
      if (scrollParent) {
        scrollParent.scrollTop = scrollParent.scrollHeight;
      }
    }
  }, [messages, typingText]);

  // Auto-play orchestrator
  useEffect(() => {
    if (!isVisible || autoPlayStarted.current) return;
    autoPlayStarted.current = true;

    let cancelled = false;
    const run = async () => {
      for (let i = 0; i < DEMO_SCRIPT.length; i++) {
        if (cancelled) return;
        const step = DEMO_SCRIPT[i];

        // Wait before starting this step
        await wait(step.delay);
        if (cancelled) return;

        // Type out the user message character by character
        setAutoPlayStep(i);
        const text = step.user;
        for (let c = 0; c <= text.length; c++) {
          if (cancelled) return;
          setTypingText(text.slice(0, c));
          await wait(30 + Math.random() * 40);
        }
        await wait(300);
        if (cancelled) return;

        // Send as user message
        setTypingText('');
        setMessages(prev => [...prev, {
          id: `user-${Date.now()}-${i}`,
          role: 'user',
          content: text,
          timestamp: new Date(),
        }]);

        // Show typing indicator
        setIsTyping(true);
        await wait(step.typingDelay + Math.random() * 400);
        if (cancelled) return;

        // Generate and show response
        const response = generateResponse(text);
        setMessages(prev => [...prev, response]);
        setIsTyping(false);
      }

      if (!cancelled) {
        await wait(1000);
        setAutoPlayDone(true);
      }
    };

    run();
    return () => { cancelled = true; };
  }, [isVisible]);

  const handleSend = async (text) => {
    const messageText = text || input.trim();
    if (!messageText || isTyping) return;

    // Stop auto-play if user interacts
    setAutoPlayDone(true);

    setMessages(prev => [...prev, {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    }]);
    setInput('');
    setIsTyping(true);

    await wait(400 + Math.random() * 500);

    const response = generateResponse(messageText);
    setMessages(prev => [...prev, response]);
    setIsTyping(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="flex flex-col h-full">
      {messages.length === 0 && !typingText ? (
        /* ─── EMPTY STATE ─── */
        <div className="flex-1 flex items-center justify-center p-4 sm:p-5">
          <div className="max-w-[460px] w-full">
            <div className="text-center mb-6">
              <h3 className="font-serif text-[22px] sm:text-[26px] text-[#1A1A1A] mb-1">Good morning</h3>
              <p className="text-[13px] text-[#A3A3A3]">What do you need to know?</p>
            </div>
            <div className="grid grid-cols-2 gap-1.5 mb-5">
              {CHAT_SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s.text)}
                  className="text-left px-3 py-2.5 rounded-lg border border-[#EBEBEB] bg-white hover:border-[#C8956C] transition-colors group cursor-pointer"
                >
                  <p className="text-[11px] sm:text-[12px] text-[#1A1A1A] group-hover:text-[#A0734E] transition-colors leading-snug">{s.text}</p>
                  <p className="text-[9px] sm:text-[10px] text-[#A3A3A3] mt-0.5">{s.sub}</p>
                </button>
              ))}
            </div>
            <ChatInput
              input={input}
              setInput={setInput}
              onSend={handleSend}
              isTyping={isTyping}
              inputRef={inputRef}
              placeholder="Talk to me like a colleague..."
            />
            <p className="text-center text-[10px] text-[#A3A3A3] mt-2.5">
              Every guest remembered. Every stay personalized.
            </p>
          </div>
        </div>
      ) : (
        /* ─── CONVERSATION ─── */
        <>
          <div className="flex-1 overflow-y-auto p-4 sm:p-5">
            <div className="max-w-[520px] mx-auto space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {msg.role === 'user' ? (
                    <div className="flex justify-end">
                      <div className="bg-[#C8956C] text-white rounded-[18px] rounded-br-sm px-4 py-2.5 max-w-[80%]">
                        <p className="text-[13px] leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <MarkdownContent content={msg.content} />
                      {msg.dataSources?.length > 0 && (
                        <div className="flex items-center gap-1 pt-0.5">
                          <Database className="w-2.5 h-2.5 text-[#A3A3A3]" />
                          <span className="text-[10px] text-[#A3A3A3]">{msg.dataSources.join(' · ')}</span>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Auto-typing preview */}
              {typingText && (
                <div className="flex justify-end">
                  <div className="bg-[#C8956C]/80 text-white rounded-[18px] rounded-br-sm px-4 py-2.5 max-w-[80%]">
                    <p className="text-[13px] leading-relaxed">
                      {typingText}<span className="animate-pulse">|</span>
                    </p>
                  </div>
                </div>
              )}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-1.5 pl-1">
                  {[0, 150, 300].map(d => (
                    <motion.div
                      key={d}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: d / 1000 }}
                      className="w-1.5 h-1.5 rounded-full bg-[#C8956C]"
                    />
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input bar */}
          <div className="border-t border-[#F2F2F0] p-3">
            <div className="max-w-[520px] mx-auto">
              <ChatInput
                input={input}
                setInput={setInput}
                onSend={handleSend}
                isTyping={isTyping}
                inputRef={inputRef}
                placeholder={autoPlayDone ? "Ask anything or log a guest observation..." : "Watching demo..."}
                disabled={!autoPlayDone}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ChatInput({ input, setInput, onSend, isTyping, inputRef, placeholder, disabled }) {
  return (
    <div className={`bg-white border border-[#EBEBEB] rounded-xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all ${disabled ? 'opacity-60' : 'focus-within:border-[#C8956C] focus-within:shadow-[0_1px_6px_rgba(200,149,108,0.12)]'}`}>
      <input
        ref={inputRef}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); onSend(); } }}
        placeholder={placeholder}
        disabled={isTyping || disabled}
        className="flex-1 bg-transparent outline-none text-[13px] text-[#1A1A1A] placeholder:text-[#A3A3A3] disabled:opacity-50"
      />
      <button
        onClick={() => onSend()}
        disabled={!input.trim() || isTyping || disabled}
        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer disabled:cursor-default"
        style={{
          background: input.trim() && !isTyping && !disabled ? '#C8956C' : '#EBEBEB',
          color: input.trim() && !isTyping && !disabled ? 'white' : '#A3A3A3',
        }}
      >
        <ArrowUp className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PRE-ARRIVAL TAB
   ═══════════════════════════════════════════ */
const PREP_GUESTS = [
  {
    id: 'guest-009', initials: 'SC', name: 'Sophie Clarke', nationality: 'British',
    room: 'The Luisa', source: 'Booking.com', daysUntil: 1,
    tags: ['group', 'first-timer'],
    suggestions: [
      'Friend of Emma Wilson (already checked in at The Valentina)',
      'Group of 3 — coordinate activities with Emma and Rachel',
      'First time visiting — share welcome guide with local tips',
    ],
    whatsappDraft: "Hi Sophie! 👋 This is Camila from Hotel Mirador. We're so excited to welcome you tomorrow! Your friend Emma is already here and loving it. Quick question — any dietary preferences or special requests we should know about?",
  },
  {
    id: 'guest-010', initials: 'RH', name: 'Rachel Hughes', nationality: 'British',
    room: 'The Restrepo', source: 'Booking.com', daysUntil: 1,
    tags: ['group', 'first-timer'],
    suggestions: [
      'Also part of Emma Wilson\'s girls trip',
      'Pre-arrival questionnaire not completed — needs outreach',
    ],
    whatsappDraft: "Hi Rachel! 😊 Camila here from Hotel Mirador. Can't wait to welcome you tomorrow with Sophie and Emma! Is there anything special we can prepare for your stay?",
  },
  {
    id: 'guest-011', initials: 'DH', name: 'David Hoffmann', nationality: 'German',
    room: 'The Helen', source: 'Expedia', daysUntil: 2,
    tags: ['first-timer'],
    suggestions: [
      'Allergic to feather pillows — ensure synthetic pillows in room',
      'OTA booking — may not know much about us. Share what makes us special.',
      'German speaker — consider if language accommodations needed',
    ],
    whatsappDraft: "Hello David! This is Camila from Hotel Mirador. We're looking forward to your visit! I noticed you mentioned a feather pillow allergy — we've already prepared hypoallergenic bedding for you. Is there anything else we can do to make your stay perfect?",
  },
];

function PreArrivalTab() {
  const [whatsappGuest, setWhatsappGuest] = useState(null);
  const incomplete = reservations.filter(r => !r.preArrivalComplete && r.status === 'confirmed');

  return (
    <div className="p-4 sm:p-5 space-y-4">
      <div>
        <h3 className="font-serif text-[20px] sm:text-[24px] text-[#1A1A1A]">Pre-Arrival Board</h3>
        <p className="text-[12px] text-[#A3A3A3] mt-1">
          AI prepares the context. Your team adds the human touch.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { color: '#D4974B', bg: '#FDF5ED', value: PREP_GUESTS.filter(g => g.daysUntil <= 1).length, label: 'Tomorrow' },
          { color: '#5B8BD4', bg: '#EDF2FB', value: PREP_GUESTS.filter(g => g.daysUntil > 1).length, label: 'Upcoming' },
          { color: '#D4634B', bg: '#FDF0ED', value: incomplete.length, label: 'Need outreach' },
        ].map(s => (
          <div key={s.label} className="rounded-lg p-2.5 text-center" style={{ background: s.bg }}>
            <p className="text-[18px] font-semibold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[10px] text-[#A3A3A3]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Warning banner */}
      {incomplete.length > 0 && (
        <div className="flex items-start gap-2 bg-[#FDF5ED] border border-[#D4974B]/20 rounded-lg p-3">
          <AlertTriangle className="w-3.5 h-3.5 text-[#D4974B] shrink-0 mt-0.5" />
          <p className="text-[11px] text-[#D4974B]">
            <span className="font-medium">{incomplete.length} guest(s)</span> arriving soon without complete profiles. Reach out today!
          </p>
        </div>
      )}

      {/* Guest cards */}
      {PREP_GUESTS.map(guest => {
        const isUrgent = guest.daysUntil <= 1;
        return (
          <div
            key={guest.id}
            className="bg-white border rounded-xl overflow-hidden transition-shadow hover:shadow-sm"
            style={{ borderColor: isUrgent ? '#D4974B' : '#EBEBEB' }}
          >
            <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-[#F2F2F0]">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium"
                  style={{ background: isUrgent ? '#FDF5ED' : '#F3E8DE', color: isUrgent ? '#D4974B' : '#A0734E' }}
                >
                  {guest.initials}
                </div>
                <div>
                  <p className="text-[13px] font-medium text-[#1A1A1A]">{guest.name}</p>
                  <p className="text-[10px] text-[#A3A3A3]">
                    {guest.nationality} · {guest.room} · via {guest.source}
                  </p>
                </div>
              </div>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                style={{ background: isUrgent ? '#FDF5ED' : '#EDF2FB', color: isUrgent ? '#D4974B' : '#5B8BD4' }}
              >
                {guest.daysUntil <= 1 ? 'Tomorrow' : `In ${guest.daysUntil} days`}
              </span>
            </div>

            <div className="px-3.5 py-3">
              <p className="text-[10px] text-[#A3A3A3] font-medium uppercase tracking-wide mb-1.5">AI Suggestions</p>
              <div className="space-y-1 mb-3">
                {guest.suggestions.map((s, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <Lightbulb className="w-3 h-3 text-[#C8956C] shrink-0 mt-0.5" />
                    <p className="text-[11px] text-[#6B6B6B] leading-relaxed">{s}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setWhatsappGuest(guest)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] rounded-lg font-medium bg-[#25D366] text-white hover:bg-[#20bd5a] transition-colors cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  Draft WhatsApp
                </button>
                <button className="px-3 py-2 text-[11px] rounded-lg font-medium border border-[#EBEBEB] text-[#6B6B6B] hover:bg-[#F5F4F1] transition-colors cursor-pointer">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* WhatsApp Modal */}
      <AnimatePresence>
        {whatsappGuest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/30 flex items-center justify-center p-4 z-10"
            onClick={() => setWhatsappGuest(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-xl w-full max-w-[360px] overflow-hidden shadow-xl"
            >
              <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-medium">
                    {whatsappGuest.initials}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium">{whatsappGuest.name}</p>
                    <p className="text-[10px] text-white/70">via WhatsApp</p>
                  </div>
                </div>
                <button onClick={() => setWhatsappGuest(null)} className="text-white/70 hover:text-white text-[18px] cursor-pointer">&times;</button>
              </div>

              <div className="p-3 bg-[#ECE5DD] min-h-[160px]">
                <div className="bg-[#FFF3CD] rounded-lg p-2.5 mb-3 border border-[#FFE69C]">
                  <p className="text-[10px] font-medium text-[#856404] mb-0.5">AI Context</p>
                  <p className="text-[10px] text-[#856404] leading-relaxed">
                    {whatsappGuest.suggestions[0]}
                  </p>
                </div>
                <div className="bg-[#DCF8C6] rounded-lg rounded-tr-sm p-2.5 ml-auto max-w-[90%]">
                  <p className="text-[11px] text-[#1A1A1A] leading-relaxed">{whatsappGuest.whatsappDraft}</p>
                  <p className="text-[9px] text-[#6B6B6B] text-right mt-1">Draft</p>
                </div>
              </div>

              <div className="p-3 flex gap-2 border-t border-[#EBEBEB]">
                <button
                  onClick={() => setWhatsappGuest(null)}
                  className="flex-1 px-3 py-2 text-[11px] rounded-lg font-medium border border-[#EBEBEB] text-[#6B6B6B] hover:bg-[#F5F4F1] transition-colors cursor-pointer"
                >
                  Edit First
                </button>
                <button
                  onClick={() => setWhatsappGuest(null)}
                  className="flex-1 px-3 py-2 text-[11px] rounded-lg font-medium bg-[#25D366] text-white hover:bg-[#20bd5a] transition-colors cursor-pointer"
                >
                  Send via WhatsApp
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── REUSABLE SECTION WRAPPER ─── */
function Section({ title, icon: Icon, children }) {
  return (
    <div className="bg-white border border-[#EBEBEB] rounded-xl p-3.5">
      <div className="flex items-center gap-1.5 mb-2.5">
        {Icon && <Icon className="w-3.5 h-3.5 text-[#C8956C]" />}
        <h4 className="font-serif text-[13px] text-[#1A1A1A]">{title}</h4>
      </div>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   SIDEBAR
   ═══════════════════════════════════════════ */
const CONNECTED_SYSTEMS = [
  { name: 'Opera PMS', logo: '/logos/opera.svg' },
  { name: 'Booking.com', logo: '/logos/booking.svg' },
  { name: 'Stripe', logo: '/logos/stripe.svg' },
  { name: 'WhatsApp', logo: '/logos/whatsapp.svg' },
];

function Sidebar({ activeTab, onTabChange }) {
  return (
    <div className="hidden sm:flex h-full w-[170px] lg:w-[190px] flex-col bg-white border-r border-[#EBEBEB] shrink-0">
      <div className="px-3.5 pt-4 pb-3">
        <h1 className="font-serif text-[15px] text-[#1A1A1A]">Hotel Mirador</h1>
        <p className="text-[9px] text-[#A3A3A3] mt-0.5 tracking-wider uppercase">Staff Assistant</p>
      </div>

      <nav className="flex-1 px-2 space-y-0.5">
        {TABS.map(tab => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-[12px] transition-all cursor-pointer ${
                active
                  ? 'bg-[#F3E8DE] text-[#A0734E] font-medium'
                  : 'text-[#6B6B6B] hover:bg-[#F5F4F1] hover:text-[#1A1A1A]'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.id === 'prearrivals' && (
                <span className="ml-auto w-4 h-4 rounded-full bg-[#D4974B] text-white text-[9px] flex items-center justify-center font-medium">3</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-3.5 py-2.5 border-t border-[#F2F2F0]">
        <p className="text-[9px] text-[#A3A3A3] mb-1.5 tracking-wider uppercase font-medium">Connected</p>
        <div className="space-y-1">
          {CONNECTED_SYSTEMS.map(s => (
            <div key={s.name} className="flex items-center gap-1.5">
              <div className="relative">
                <img src={s.logo} alt="" className="w-3 h-3 object-contain" style={{ filter: 'grayscale(0.3)' }} />
                <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#5CB176] border border-white" />
              </div>
              <span className="text-[10px] text-[#6B6B6B]">{s.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-3.5 py-2 border-t border-[#F2F2F0]">
        <span className="text-[9px] text-[#A3A3A3]">Powered by </span>
        <span className="text-[10px] font-semibold text-[#C8956C]">Grill</span>
      </div>
    </div>
  );
}

/* ─── MOBILE TAB BAR ─── */
function MobileTabBar({ activeTab, onTabChange }) {
  return (
    <div className="sm:hidden flex border-b border-[#EBEBEB]">
      {TABS.map(tab => {
        const active = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1 py-2.5 text-[11px] font-medium transition-colors cursor-pointer ${
              active ? 'text-[#A0734E] border-b-2 border-[#C8956C]' : 'text-[#A3A3A3]'
            }`}
          >
            <tab.icon className="w-3 h-3" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

/* ─── UTILITY ─── */
function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

/* ═══════════════════════════════════════════
   MAIN PLATFORM DEMO SECTION
   ═══════════════════════════════════════════ */
export default function PlatformDemo() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <section id="platform" className="py-24 lg:py-32">
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
            Live Platform Preview
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            See <span className="text-gradient-copper">Grill</span> in action
          </h2>
          <p className="mt-4 text-lg text-slate-light max-w-2xl mx-auto">
            Watch how hotel staff interact with Grill — an intelligent assistant that knows every guest,
            every preference, every opportunity.
          </p>
        </motion.div>

        {/* Browser frame */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Glow behind */}
          <div className="absolute -inset-4 bg-gradient-to-r from-copper/10 via-copper/5 to-copper/10 rounded-3xl blur-2xl pointer-events-none" />

          <div className="relative rounded-2xl border border-cream/10 overflow-hidden shadow-2xl shadow-black/40">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2A2A2A] border-b border-cream/5">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-[#1A1A1A] rounded-md px-3 py-1 text-center flex items-center justify-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]/50" />
                  <span className="text-[10px] text-cream/40">app.getgrill.io</span>
                </div>
              </div>
            </div>

            {/* App container */}
            <div className="flex h-[520px] sm:h-[560px] lg:h-[620px] bg-[#FAFAF8] relative">
              <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

              <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <MobileTabBar activeTab={activeTab} onTabChange={setActiveTab} />
                <div className="flex-1 overflow-y-auto relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className={activeTab === 'chat' ? 'flex flex-col h-full' : 'h-full'}
                    >
                      {activeTab === 'dashboard' && <DashboardTab />}
                      {activeTab === 'chat' && <ChatTab />}
                      {activeTab === 'prearrivals' && <PreArrivalTab />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hint text */}
        <p className="text-center text-sm text-slate-light mt-6">
          Try it yourself — click any suggestion or type your own question
        </p>
      </div>
    </section>
  );
}
