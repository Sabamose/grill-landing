import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Database, ArrowUp, Sparkles, Check, Clock, Star } from 'lucide-react';
import { fadeUp, blurIn, staggerContainer } from '../../lib/animations';

/* ─── Tokens — copper-only accent. No red. No tinted alert blocks. ─── */
const T = {
  bg: '#FAFAF8',
  card: '#FFFFFF',
  text: '#1A1A1A',
  text2: '#6B6B6B',
  text3: '#A3A3A3',
  border: '#EBEBEB',
  border2: '#F2F2F0',
  copper: '#C8956C',
  copperText: '#A0734E',
  copperSoft: '#F3E8DE',
  green: '#5CB176',
  greenSoft: '#EDF7F0',
};

const viewport = { once: true, amount: 0.35 };

/* ════════════════════════════════════════════
   ChatScene — shared shell
   Browser chrome → typed user bubble → thinking dots → streamed response
   ════════════════════════════════════════════ */

function ChatScene({ user, response, sources, height = 'auto' }) {
  const ref = useRef(null);
  // Margin-based trigger — only fires when scene is in the central 50% of viewport,
  // so role scenes animate one at a time as user scrolls.
  const inView = useInView(ref, { once: true, margin: '-25% 0px -25% 0px' });

  return (
    <div
      ref={ref}
      className="rounded-xl overflow-hidden"
      style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        boxShadow: '0 26px 60px -22px rgba(15,15,15,0.12)',
      }}
    >
      {/* Browser chrome — clean URL pill, no traffic lights */}
      <div className="px-4 py-2.5 bg-[#F5F4F1] border-b border-[#EBEBEB] flex items-center justify-center">
        <div className="bg-white rounded-md px-3 py-1 flex items-center gap-1.5 border border-[#EBEBEB]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#28CA41]/60" />
          <span className="text-[10px] text-[#A3A3A3] tracking-wide">app.getgrill.io</span>
        </div>
      </div>

      <div
        className="bg-[#FAFAF8] flex flex-col"
        style={{ minHeight: height === 'auto' ? undefined : height }}
      >
        <div className="px-5 sm:px-6 py-5 space-y-4 flex-1">
          <UserBubble text={user} active={inView} />
          {inView && <ResponseStream content={response} sources={sources} />}
        </div>

        {/* Static input bar — matches HeroChat */}
        <div className="border-t border-[#F2F2F0] px-5 sm:px-6 py-3">
          <div className="bg-white border border-[#EBEBEB] rounded-2xl px-5 py-2.5 flex items-center gap-3">
            <span className="flex-1 text-[13px] text-[#A3A3A3] select-none truncate">
              Ask anything...
            </span>
            <div className="w-7 h-7 rounded-full flex items-center justify-center bg-[#EBEBEB]">
              <ArrowUp className="w-3.5 h-3.5 text-[#A3A3A3]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserBubble({ text, active }) {
  // Type the user's question in when in view
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (n >= text.length) return;
    const t = setTimeout(() => setN((x) => x + 1), 22 + Math.random() * 22);
    return () => clearTimeout(t);
  }, [active, n, text.length]);

  // Pre-fade to make it feel arriving even before typing finishes
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35 }}
      className="flex justify-end"
    >
      <div
        style={{
          background: T.copper,
          color: 'white',
          padding: '10px 14px',
          borderRadius: '16px 16px 4px 16px',
          fontSize: 13.5,
          maxWidth: '82%',
          lineHeight: 1.5,
        }}
      >
        {text.slice(0, n)}
        {n < text.length && (
          <span className="inline-block w-[1.5px] h-[14px] align-middle bg-white/70 ml-[1px] animate-pulse rounded-full" />
        )}
      </div>
    </motion.div>
  );
}

function ResponseStream({ content, sources }) {
  // Show thinking dots briefly, then reveal response
  const [phase, setPhase] = useState('typing'); // typing → thinking → response

  // crude estimate of typing duration based on user message length is handled by UserBubble;
  // here we trigger thinking after a short pause
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('thinking'), 1100);
    const t2 = setTimeout(() => setPhase('response'), 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      {phase === 'thinking' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-1.5 py-1">
          {[0, 150, 300].map((d) => (
            <div
              key={d}
              className="w-2 h-2 rounded-full bg-[#A3A3A3] animate-bounce"
              style={{ animationDelay: `${d}ms` }}
            />
          ))}
        </motion.div>
      )}

      {phase === 'response' && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.18, delayChildren: 0.05 } },
          }}
          className="space-y-2.5"
        >
          {content}
          {sources && (
            <motion.div
              variants={streamItem}
              className="flex items-center gap-1.5 pt-1"
            >
              <Database className="w-3 h-3" style={{ color: T.text3 }} />
              <span className="text-[11px]" style={{ color: T.text3 }}>
                {sources.join(' · ')}
              </span>
            </motion.div>
          )}
        </motion.div>
      )}
    </>
  );
}

const streamItem = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

/* ════════════════════════════════════════════
   Chat-native response primitives
   ════════════════════════════════════════════ */

function R_Header({ name, badge, rating }) {
  return (
    <motion.div variants={streamItem} className="flex items-center gap-2 flex-wrap">
      <span className="font-serif text-[16px]" style={{ color: T.text }}>{name}</span>
      {badge && (
        <span
          className="text-[10px] font-medium rounded-full px-2 py-0.5"
          style={{ background: T.copperSoft, color: T.copperText }}
        >
          {badge}
        </span>
      )}
      {rating && (
        <span className="flex items-center gap-0.5 text-[10px] ml-auto" style={{ color: T.copperText }}>
          <Star size={9} className="fill-[#C8956C] text-[#C8956C]" />
          {rating}
        </span>
      )}
    </motion.div>
  );
}

function R_Pills({ items }) {
  return (
    <motion.div variants={streamItem} className="flex flex-wrap gap-1.5">
      {items.map((p, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 + i * 0.06, type: 'spring', stiffness: 360, damping: 22 }}
          className="rounded-full text-[10.5px] inline-block"
          style={{
            padding: '2.5px 9px',
            background: 'transparent',
            color: T.copperText,
            border: `1px solid rgba(200,149,108,0.40)`,
            letterSpacing: '0.01em',
          }}
        >
          {p}
        </motion.span>
      ))}
    </motion.div>
  );
}

function R_Insight({ children }) {
  return (
    <motion.div
      variants={streamItem}
      className="flex items-start gap-1.5 text-[12px]"
      style={{ color: T.copperText }}
    >
      <Sparkles size={11} className="shrink-0 mt-0.5" />
      <span>{children}</span>
    </motion.div>
  );
}

function R_Prompt({ children }) {
  return (
    <motion.p
      variants={streamItem}
      className="text-[11.5px] italic"
      style={{ color: T.text3 }}
    >
      {children}
    </motion.p>
  );
}

function R_Text({ children }) {
  return (
    <motion.p
      variants={streamItem}
      className="text-[13px] leading-[1.6]"
      style={{ color: T.text }}
    >
      {children}
    </motion.p>
  );
}

function R_Bullets({ items }) {
  return (
    <motion.div variants={streamItem} className="space-y-1 ml-0.5">
      {items.map((it, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.06 + i * 0.07 }}
          className="flex items-start gap-1.5 text-[12.5px]"
          style={{ color: T.text2 }}
        >
          <span className="shrink-0 mt-1.5 w-[3px] h-[3px] rounded-full" style={{ background: T.copperText, opacity: 0.6 }} />
          <span>{it}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

function R_Divider() {
  return (
    <motion.div
      variants={streamItem}
      className="h-px"
      style={{ background: T.border2, marginTop: 4, marginBottom: 4 }}
    />
  );
}

function R_GuestRow({ name, room, time, tags }) {
  return (
    <motion.div
      variants={streamItem}
      className="grid grid-cols-[1fr_auto] gap-3 items-start"
    >
      <div className="min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap mb-1">
          <span className="font-serif text-[14px]" style={{ color: T.text }}>{name}</span>
          <span
            className="text-[10px]"
            style={{ color: T.text3, fontFamily: 'JetBrains Mono, monospace' }}
          >
            · {room}
          </span>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((t, i) => (
              <span
                key={i}
                className="text-[10px] rounded-full inline-block"
                style={{
                  padding: '1.5px 7px',
                  border: `1px solid rgba(200,149,108,0.40)`,
                  color: T.copperText,
                  background: 'transparent',
                  letterSpacing: '0.01em',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
      <span
        className="text-[11px] whitespace-nowrap"
        style={{ color: T.text3, fontFamily: 'JetBrains Mono, monospace' }}
      >
        {time}
      </span>
    </motion.div>
  );
}

function R_RoomLine({ room, status, priorityFor }) {
  return (
    <motion.div
      variants={streamItem}
      className="flex items-center gap-2.5 text-[12.5px]"
    >
      <span
        className="font-serif"
        style={{ color: T.text, minWidth: 32, fontSize: 14 }}
      >
        {room}
      </span>
      <span style={{ color: T.text3, fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>
        {status}
      </span>
      {priorityFor && (
        <span
          className="ml-auto text-[10.5px]"
          style={{ color: T.copperText, fontStyle: 'italic' }}
        >
          → {priorityFor}
        </span>
      )}
    </motion.div>
  );
}

function R_RateRow({ name, rate, change, us = false, width }) {
  return (
    <motion.div
      variants={streamItem}
      className="grid grid-cols-[1fr_auto] gap-3 items-center"
    >
      <div>
        <div className="flex items-center justify-between mb-1">
          <span
            className="text-[12px]"
            style={{ color: us ? T.copperText : T.text, fontWeight: us ? 600 : 400 }}
          >
            {name}
          </span>
          {change && (
            <span
              className="text-[10px]"
              style={{
                color: T.text3,
                fontFamily: 'JetBrains Mono, monospace',
                marginLeft: 8,
              }}
            >
              {change}
            </span>
          )}
        </div>
        <div className="h-[3px] rounded-full overflow-hidden" style={{ background: T.border2 }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${width}%` }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full"
            style={{ background: us ? T.copper : T.text3, opacity: us ? 1 : 0.45 }}
          />
        </div>
      </div>
      <div
        className="font-serif text-[14px] tabular-nums"
        style={{
          color: us ? T.copperText : T.text,
          fontWeight: us ? 600 : 400,
          minWidth: 70,
          textAlign: 'right',
        }}
      >
        CHF {rate}
      </div>
    </motion.div>
  );
}

function R_StagedApproval({ children, sub }) {
  return (
    <motion.div
      variants={streamItem}
      className="rounded-lg flex items-center justify-between flex-wrap gap-3"
      style={{
        padding: '10px 12px',
        border: `1px solid ${T.copper}`,
      }}
    >
      <div className="text-[12.5px]" style={{ color: T.text }}>
        {children}
        {sub && <div className="text-[11px] mt-0.5" style={{ color: T.text3 }}>{sub}</div>}
      </div>
      <motion.button
        animate={{
          boxShadow: [
            '0 0 0 0 rgba(26,26,26,0.18)',
            '0 0 0 7px rgba(26,26,26,0)',
            '0 0 0 0 rgba(26,26,26,0.18)',
          ],
        }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="rounded-full font-medium cursor-pointer inline-flex items-center gap-1.5"
        style={{
          padding: '7px 14px',
          background: T.text,
          color: 'white',
          fontSize: 11.5,
          border: 'none',
        }}
      >
        Approve
        <span style={{ fontSize: 8.5, opacity: 0.7, fontFamily: 'JetBrains Mono, monospace' }}>
          GM only
        </span>
      </motion.button>
    </motion.div>
  );
}

function R_Quote({ children }) {
  return (
    <motion.div
      variants={streamItem}
      className="text-[12.5px] italic leading-[1.55] pl-3"
      style={{ color: T.text2, borderLeft: `2px solid ${T.copperSoft}` }}
    >
      {children}
    </motion.div>
  );
}

function R_Confirmed({ children }) {
  return (
    <motion.div
      variants={streamItem}
      className="flex items-center gap-1.5 text-[11.5px]"
      style={{ color: T.green }}
    >
      <Check size={11} />
      <span>{children}</span>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   The 7 role chat scenes
   ════════════════════════════════════════════ */

function SceneManager() {
  return (
    <ChatScene
      user="Morning briefing"
      sources={['Mews PMS', 'Lightspeed', 'Smart Alerts']}
      response={
        <>
          <R_Text>
            <strong>Tuesday 12 May</strong> — 78% occupancy, 8 arrivals, 6 departures,
            CHF 12.4k revenue yesterday.
          </R_Text>
          <R_Bullets
            items={[
              'Room 204 — AC not cooling, guest complained · 3h',
              'LeCrans raised standard rate to CHF 540 (+8%) · 5h',
              '3 vegan covers tonight — confirm with Chef before 17:00',
            ]}
          />
          <R_Prompt>2 items need your approval — review when ready?</R_Prompt>
        </>
      }
    />
  );
}

function SceneFrontDesk() {
  return (
    <ChatScene
      user="Who's arriving today?"
      sources={['Mews PMS', 'Guest Memory']}
      response={
        <>
          <R_Text>
            <strong>4 arrivals</strong> today. 2 rooms not yet ready (108, 206).
          </R_Text>
          <R_GuestRow
            name="James Richardson"
            room="Suite 301"
            time="14:00"
            tags={['VIP · 3rd', 'Vegetarian', 'Mountain view']}
          />
          <R_Divider />
          <R_GuestRow
            name="Marco & Isabella Rossi"
            room="Junior 402"
            time="15:30"
            tags={['Anniversary', 'Gluten-free', 'Italian']}
          />
          <R_Divider />
          <R_GuestRow
            name="Sarah Thompson"
            room="Deluxe 204"
            time="16:00"
            tags={['Press · Condé Nast', 'Vegan']}
          />
          <R_Insight>
            50th birthday during James' stay — consider a welcome gesture?
          </R_Insight>
        </>
      }
    />
  );
}

function SceneHousekeeping() {
  return (
    <ChatScene
      user="Which rooms still need cleaning?"
      sources={['Mews PMS']}
      response={
        <>
          <R_Text>
            <strong>5 dirty rooms</strong>. Two are priority for today's arrivals:
          </R_Text>
          <R_RoomLine room="108" status="Dirty" priorityFor="Vogt 16:00" />
          <R_RoomLine room="206" status="Dirty" priorityFor="Chen 17:00" />
          <R_Divider />
          <R_Text>The other three — no arrivals before tomorrow:</R_Text>
          <R_RoomLine room="102" status="Dirty" />
          <R_RoomLine room="202" status="Dirty" />
          <R_RoomLine room="304" status="Dirty" />
          <R_Prompt>Mark any of these clean from here?</R_Prompt>
        </>
      }
    />
  );
}

function SceneKitchen() {
  return (
    <ChatScene
      user="Tonight's dinner — any dietary I should know about?"
      sources={['Lightspeed POS', 'Guest Memory']}
      response={
        <>
          <R_Text>
            <strong>12 covers</strong> across 8 reservations. Three things worth flagging:
          </R_Text>
          <R_Bullets
            items={[
              '2 gluten-free covers · Rossi anniversary · 12:30',
              '3 vegan covers · Thompson 19:00, Chen 20:00, walk-in',
              'VIP fondue prep · James Richardson · 19:00 — start early',
            ]}
          />
          <R_Insight>
            Brief Chef before 17:00 cutoff — I can draft the WhatsApp now?
          </R_Insight>
        </>
      }
    />
  );
}

function SceneFB() {
  return (
    <ChatScene
      user="Show me dining tonight."
      sources={['Lightspeed POS']}
      response={
        <>
          <R_Text>
            <strong>8 reservations</strong>, 4 tables open. Tonight's flow:
          </R_Text>
          <R_GuestRow
            name="Marco & Isabella Rossi"
            room="Window · 1"
            time="12:30"
            tags={['Anniversary', 'Gluten-free']}
          />
          <R_Divider />
          <R_GuestRow
            name="James Richardson"
            room="Terrace · 8"
            time="19:00"
            tags={['VIP', 'Fondue']}
          />
          <R_Divider />
          <R_GuestRow
            name="Sarah Thompson"
            room="Table 3"
            time="20:00"
            tags={['Vegan', 'Press']}
          />
          <R_Divider />
          <R_GuestRow
            name="Walk-in (4)"
            room="Tables 10–11"
            time="20:30"
            tags={['Tentative']}
          />
          <R_Insight>
            Walk-in availability tonight — tables 4, 7, 9, 12.
          </R_Insight>
        </>
      }
    />
  );
}

function SceneRevenue() {
  return (
    <ChatScene
      user="How are our weekend rates vs the comp set?"
      sources={['Booking.com', 'Mews PMS']}
      response={
        <>
          <R_Text>
            <strong>5 properties</strong> in the comp set. We're 23% below the
            median — Deluxe is the biggest gap:
          </R_Text>
          <R_RateRow name="LeCrans Hotel & Spa" rate={520} change="+8%" width={100} />
          <R_RateRow name="Crans Ambassador" rate={450} change="+3%" width={86} />
          <R_RateRow name="Guarda Golf Hotel" rate={380} change="0%" width={73} />
          <R_RateRow name="Hotel Panorama (us)" rate={285} us width={55} />
          <R_RateRow name="Hôtel du Golf" rate={155} change="-12%" width={30} />
          <R_Insight>
            Worth raising Deluxe std rate this weekend — staged for your call:
          </R_Insight>
          <R_StagedApproval sub="Reverts in 7 days unless you keep it.">
            <strong>Deluxe Room</strong> · CHF 490 → 550
          </R_StagedApproval>
        </>
      }
    />
  );
}

function SceneGuestComm() {
  return (
    <ChatScene
      user="Send pre-arrival to the Rossis in Italian — mention the anniversary."
      sources={['Guest Memory', 'WhatsApp']}
      response={
        <>
          <R_Text>
            Drafted in Italian. Will send via WhatsApp once you approve:
          </R_Text>
          <R_Quote>
            “Ciao Marco, tutto è pronto per il vostro anniversario! Prosecco e
            fiori in camera 402 al vostro arrivo. Tavolo per due alle 19:30,
            finestra. A presto.”
          </R_Quote>
          <R_StagedApproval sub="Recipient · +39 ••• Rossi · WhatsApp">
            Send to <strong>Marco Rossi</strong>
          </R_StagedApproval>
          <R_Prompt>Also queue a follow-up at check-in?</R_Prompt>
        </>
      }
    />
  );
}

/* ════════════════════════════════════════════
   Spread — alternating zigzag layout
   ════════════════════════════════════════════ */

function RoleSpread({ n, role, ask, capabilities, side = 'left', children }) {
  const reverse = side === 'right';
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
      className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 sm:gap-12 lg:gap-16 items-center py-12 sm:py-20 lg:py-32 lg:min-h-[80vh]"
    >
      <motion.div variants={fadeUp} className={reverse ? 'lg:order-2' : ''}>
        <div className="flex items-baseline gap-3 mb-5">
          <span className="font-serif italic" style={{ color: T.copperText, fontSize: 18 }}>{n}</span>
          <span className="label-mono" style={{ fontSize: 9.5 }}>◇ Department</span>
        </div>

        <h3 className="font-serif text-[28px] sm:text-[32px] lg:text-[38px] leading-[1.08] tracking-[-0.015em] mb-5">
          {role}
        </h3>

        <p
          className="font-serif italic mb-5"
          style={{ color: T.copperText, fontSize: 17, lineHeight: 1.4, maxWidth: 380 }}
        >
          “{ask}”
        </p>

        <ul className="space-y-2.5">
          {capabilities.map((c, i) => (
            <li key={i} className="flex gap-2.5 text-[14px] leading-[1.6]" style={{ color: T.text2 }}>
              <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full" style={{ background: T.copperText, opacity: 0.55 }} />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div variants={fadeUp} className={reverse ? 'lg:order-1' : ''}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   SECTION
   ════════════════════════════════════════════ */

export default function ByRole() {
  return (
    <section
      id="by-role"
      className="bg-cream text-ink py-16 sm:py-24 lg:py-32 border-t border-b"
      style={{ borderColor: T.border }}
    >
      <div className="container-editorial">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-20 mb-12 items-end"
        >
          <div>
            <motion.div variants={fadeUp} className="label-mono mb-6">◆ One agent, every role</motion.div>
            <motion.h2
              variants={blurIn}
              className="font-serif text-[36px] sm:text-[44px] lg:text-[52px] leading-[1.05] tracking-[-0.015em] text-balance"
            >
              Same chat.<br />
              <em className="not-italic" style={{ fontStyle: 'italic', color: T.copperText }}>
                Seven views.
              </em>
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="text-[16px] sm:text-[17px] leading-[1.65] max-w-[520px] pb-3"
            style={{ color: T.text2 }}
          >
            Hotels run on seven departments and seven systems. Grill speaks
            to each role in its own vocabulary — every staff question lands
            in the same chat, but the answer is shaped around what matters
            to that role.
          </motion.p>
        </motion.div>

        <div className="divide-y" style={{ borderColor: T.border }}>
          <RoleSpread
            n="I" role="Manager / GM" side="left"
            ask="What needs my attention before 3 PM check-in?"
            capabilities={[
              'Morning briefing — occupancy, arrivals, blocked rooms, staffing',
              'Approve rate changes, cancellations, review replies, guest sends',
              'Track unresolved blockers across every department',
            ]}
          >
            <SceneManager />
          </RoleSpread>

          <RoleSpread
            n="II" role="Front Desk" side="right"
            ask="Which arrivals have rooms not ready?"
            capabilities={[
              'Arrivals with room readiness, VIP notes, dietary flags',
              'Find guests, preferences, memories, special occasions',
              'Create tasks for housekeeping, kitchen, maintenance',
            ]}
          >
            <SceneFrontDesk />
          </RoleSpread>

          <RoleSpread
            n="III" role="Housekeeping" side="left"
            ask="Which rooms still need cleaning — and in what order?"
            capabilities={[
              'Filter dirty, clean, inspected, out-of-order across every floor',
              'Mark rooms clean / dirty / inspected from chat',
              'Priority queue auto-orders by today\'s arrival times',
            ]}
          >
            <SceneHousekeeping />
          </RoleSpread>

          <RoleSpread
            n="IV" role="Kitchen / Chef" side="right"
            ask="How many breakfasts tomorrow — and any dietary alerts?"
            capabilities={[
              'Adult / child counts, dietary alerts, VIP food notes',
              'Afternoon notifications when counts are ready',
              'Create prep tasks straight from chat',
            ]}
          >
            <SceneKitchen />
          </RoleSpread>

          <RoleSpread
            n="V" role="F&B / Restaurant" side="left"
            ask="How many covers tonight, and where?"
            capabilities={[
              'Reservations, tables, timing, dietary notes per cover',
              'Menu items and live sales once Lightspeed is connected',
              'Shift, table, and cover-count reminders',
            ]}
          >
            <SceneFB />
          </RoleSpread>

          <RoleSpread
            n="VI" role="Revenue / Commercial" side="right"
            ask="What are our rates for next weekend versus the comp set?"
            capabilities={[
              'Occupancy, availability, competitor rates, OTA signals',
              'Draft rate-change recommendations with reasoning',
              'Approval-gated rate updates through Mews / SiteMinder',
            ]}
          >
            <SceneRevenue />
          </RoleSpread>

          <RoleSpread
            n="VII" role="Guest Communication" side="left"
            ask="Send the pre-arrival note to the Rossis in Italian."
            capabilities={[
              'Pre-arrival emails and WhatsApp in the guest\'s language',
              'Sent only after a manager signs off',
              'Tracks what was sent, when, by whom, and through which channel',
            ]}
          >
            <SceneGuestComm />
          </RoleSpread>
        </div>
      </div>
    </section>
  );
}
