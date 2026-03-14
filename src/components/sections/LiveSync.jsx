import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  DollarSign, UserPlus, Bell, Check, ArrowRight,
  RefreshCw, Sparkles, Building2, Globe, CreditCard,
} from 'lucide-react';
import Badge from '../ui/Badge';
import { staggerContainer, fadeUp } from '../../lib/animations';

function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

/* ═══════════════════════════════════════════
   CARD 1 — RATE SYNC
   A room price updates and propagates to OTAs
   ═══════════════════════════════════════════ */

function RateSyncCard() {
  const [phase, setPhase] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.4 });
  const started = useRef(false);

  useEffect(() => {
    if (!inView) return;
    if (started.current) return;
    started.current = true;

    let cancelled = false;
    const run = async () => {
      while (!cancelled) {
        setPhase(0);
        await wait(1500);
        if (cancelled) return;
        setPhase(1); // price changes
        await wait(1200);
        if (cancelled) return;
        setPhase(2); // syncing
        await wait(800);
        if (cancelled) return;
        setPhase(3); // opera done
        await wait(600);
        if (cancelled) return;
        setPhase(4); // booking done
        await wait(600);
        if (cancelled) return;
        setPhase(5); // expedia done
        await wait(4000);
        if (cancelled) return;
        started.current = false;
      }
    };
    run();
    return () => { cancelled = true; started.current = false; };
  }, [inView]);

  const systems = [
    { name: 'Opera PMS', doneAt: 3 },
    { name: 'Booking.com', doneAt: 4 },
    { name: 'Expedia', doneAt: 5 },
  ];

  return (
    <div ref={ref} className="bg-[#FAFAF8] rounded-xl border border-[#EBEBEB] overflow-hidden shadow-lg">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#F2F2F0] flex items-center gap-2">
        <div className="w-6 h-6 rounded-md bg-[#EDF2FB] flex items-center justify-center">
          <DollarSign size={13} className="text-[#5B8BD4]" />
        </div>
        <span className="text-[12px] font-medium text-[#1A1A1A]">Rate Update</span>
        {phase >= 2 && phase < 5 && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-auto text-[10px] text-[#D4974B] flex items-center gap-1"
          >
            <RefreshCw size={9} className="animate-spin" />
            Syncing…
          </motion.span>
        )}
        {phase >= 5 && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-auto text-[10px] text-[#5CB176] flex items-center gap-1"
          >
            <Check size={9} />
            All synced
          </motion.span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Room + price */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-serif text-[14px] text-[#1A1A1A]">Suite 401</p>
            <p className="text-[11px] text-[#A3A3A3]">Peak season · March 14–20</p>
          </div>
          <div className="text-right">
            <AnimatePresence mode="wait">
              {phase < 1 ? (
                <motion.p
                  key="old"
                  exit={{ opacity: 0, y: -8 }}
                  className="text-[20px] font-semibold text-[#1A1A1A]"
                >
                  $320
                </motion.p>
              ) : (
                <motion.p
                  key="new"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[20px] font-semibold text-[#5CB176]"
                >
                  $380
                </motion.p>
              )}
            </AnimatePresence>
            {phase >= 1 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] text-[#5CB176]"
              >
                +$60 per night
              </motion.p>
            )}
          </div>
        </div>

        {/* Propagation */}
        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-1.5 pt-2 border-t border-[#F2F2F0]"
          >
            {systems.map((sys) => {
              const done = phase >= sys.doneAt;
              const syncing = phase >= 2 && !done;
              return (
                <div key={sys.name} className="flex items-center justify-between py-1">
                  <span className="text-[12px] text-[#6B6B6B]">{sys.name}</span>
                  {done ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-1 text-[10px] text-[#5CB176]"
                    >
                      <Check size={10} />
                      <span>$380</span>
                    </motion.div>
                  ) : syncing ? (
                    <span className="text-[10px] text-[#D4974B] flex items-center gap-1">
                      <RefreshCw size={9} className="animate-spin" />
                      Updating
                    </span>
                  ) : null}
                </div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CARD 2 — PROFILE UPDATE
   A new preference is added and syncs
   ═══════════════════════════════════════════ */

function ProfileUpdateCard() {
  const [phase, setPhase] = useState(0);
  const [noteText, setNoteText] = useState('');
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.4 });
  const started = useRef(false);

  useEffect(() => {
    if (!inView) return;
    if (started.current) return;
    started.current = true;

    let cancelled = false;
    const fullNote = 'Prefers room near elevator';

    const run = async () => {
      while (!cancelled) {
        setPhase(0);
        setNoteText('');
        await wait(2500);
        if (cancelled) return;

        // Type the note
        setPhase(1);
        for (let c = 0; c <= fullNote.length; c++) {
          if (cancelled) return;
          setNoteText(fullNote.slice(0, c));
          await wait(35 + Math.random() * 30);
        }
        await wait(400);
        if (cancelled) return;

        // Saved
        setPhase(2);
        await wait(800);
        if (cancelled) return;

        // Tag appears
        setPhase(3);
        await wait(800);
        if (cancelled) return;

        // Systems synced
        setPhase(4);
        await wait(4000);
        if (cancelled) return;
        started.current = false;
      }
    };
    run();
    return () => { cancelled = true; started.current = false; };
  }, [inView]);

  const existingTags = ['High Floor', 'Quiet Room', 'Malbec'];

  return (
    <div ref={ref} className="bg-[#FAFAF8] rounded-xl border border-[#EBEBEB] overflow-hidden shadow-lg">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#F2F2F0] flex items-center gap-2">
        <div className="w-6 h-6 rounded-md bg-[#F3E8DE] flex items-center justify-center">
          <UserPlus size={13} className="text-[#A0734E]" />
        </div>
        <span className="text-[12px] font-medium text-[#1A1A1A]">Guest Profile</span>
      </div>

      <div className="p-4 space-y-3">
        {/* Guest name */}
        <div>
          <p className="font-serif text-[14px] text-[#1A1A1A]">María García</p>
          <p className="text-[11px] text-[#C8956C]">VIP · 3rd Stay</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {existingTags.map(tag => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full bg-[#F3E8DE] text-[#A0734E] border border-[#C8956C]/15"
            >
              {tag}
            </span>
          ))}
          {phase >= 3 && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[10px] px-2 py-0.5 rounded-full bg-[#EDF7F0] text-[#5CB176] border border-[#5CB176]/20 font-medium"
            >
              Near Elevator ✓
            </motion.span>
          )}
        </div>

        {/* Note input */}
        {phase >= 1 && phase < 2 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-white border border-[#C8956C]/30 rounded-lg px-3 py-2"
          >
            <p className="text-[12px] text-[#1A1A1A]">
              {noteText}
              <span className="inline-block w-[2px] h-3.5 bg-[#C8956C] ml-0.5 animate-pulse rounded-full" />
            </p>
          </motion.div>
        )}

        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#EDF7F0] border border-[#5CB176]/15 rounded-lg px-3 py-2 flex items-center gap-2"
          >
            <Check size={12} className="text-[#5CB176] shrink-0" />
            <p className="text-[11px] text-[#5CB176]">
              Preference saved — synced to all departments
            </p>
          </motion.div>
        )}

        {/* System propagation */}
        {phase >= 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 pt-1 text-[10px] text-[#A3A3A3]"
          >
            {['Front Desk', 'Housekeeping', 'Concierge'].map(dept => (
              <span key={dept} className="flex items-center gap-1">
                <Check size={8} className="text-[#5CB176]" />
                {dept}
              </span>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CARD 3 — SMART BOOKING ALERT
   New booking auto-enriched with guest intel
   ═══════════════════════════════════════════ */

function SmartAlertCard() {
  const [phase, setPhase] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.4 });
  const started = useRef(false);

  useEffect(() => {
    if (!inView) return;
    if (started.current) return;
    started.current = true;

    let cancelled = false;
    const run = async () => {
      while (!cancelled) {
        setPhase(0);
        await wait(3500);
        if (cancelled) return;
        setPhase(1); // notification arrives
        await wait(1200);
        if (cancelled) return;
        setPhase(2); // enriching
        await wait(1400);
        if (cancelled) return;
        setPhase(3); // enriched with data
        await wait(1000);
        if (cancelled) return;
        setPhase(4); // suggestions
        await wait(4000);
        if (cancelled) return;
        started.current = false;
      }
    };
    run();
    return () => { cancelled = true; started.current = false; };
  }, [inView]);

  return (
    <div ref={ref} className="bg-[#FAFAF8] rounded-xl border border-[#EBEBEB] overflow-hidden shadow-lg">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#F2F2F0] flex items-center gap-2">
        <div className="w-6 h-6 rounded-md bg-[#FDF5ED] flex items-center justify-center">
          <Bell size={13} className="text-[#D4974B]" />
        </div>
        <span className="text-[12px] font-medium text-[#1A1A1A]">Smart Alert</span>
        {phase >= 1 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="ml-auto w-2 h-2 rounded-full bg-[#D4974B] animate-pulse"
          />
        )}
      </div>

      <div className="p-4 space-y-3">
        {phase < 1 && (
          <div className="text-center py-4">
            <p className="text-[12px] text-[#A3A3A3]">Listening for events…</p>
          </div>
        )}

        {/* Notification */}
        {phase >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#FDF5ED] border border-[#D4974B]/15 rounded-lg px-3 py-2.5"
          >
            <div className="flex items-center gap-2 mb-1">
              <Globe size={11} className="text-[#D4974B]" />
              <span className="text-[11px] font-medium text-[#D4974B]">New booking — Booking.com</span>
            </div>
            <p className="text-[12px] text-[#6B6B6B]">
              James Richardson · Suite 305 · Mar 18–21
            </p>
          </motion.div>
        )}

        {/* Enriching */}
        {phase >= 2 && phase < 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-[11px] text-[#C8956C]"
          >
            <Sparkles size={11} className="animate-pulse" />
            Enriching with guest history…
          </motion.div>
        )}

        {/* Enriched data */}
        {phase >= 3 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-2"
          >
            <div className="bg-white border border-[#EBEBEB] rounded-lg px-3 py-2.5">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-serif text-[13px] text-[#1A1A1A]">James Richardson</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#F3E8DE] text-[#A0734E]">
                  Returning · 3rd visit
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {['Gluten-free', 'Morning jogger', 'Anniversary'].map(tag => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#F3E8DE] text-[#A0734E] border border-[#C8956C]/10"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Auto suggestions */}
            {phase >= 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-1"
              >
                <p className="text-[10px] text-[#A3A3A3] font-medium uppercase tracking-wide">Auto-generated prep</p>
                {[
                  'Welcome note drafted — pending GM approval',
                  'Kitchen notified — gluten-free menu prepped',
                  'Pre-arrival WhatsApp scheduled for Mar 17',
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="flex items-start gap-1.5 text-[11px] text-[#6B6B6B]"
                  >
                    <Check size={9} className="text-[#5CB176] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   LIVE SYNC SECTION
   ═══════════════════════════════════════════ */

export default function LiveSync() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <Badge variant="copper" className="mb-4">
            <RefreshCw size={12} />
            Real-Time Sync
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Update once, <span className="text-gradient-copper">update everywhere</span>
          </h2>
          <p className="mt-4 text-lg text-slate-light max-w-2xl mx-auto">
            Every change ripples across your entire stack in real time — rates, profiles,
            alerts. No double entry, no missed updates.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div variants={fadeUp}>
            <RateSyncCard />
          </motion.div>
          <motion.div variants={fadeUp}>
            <ProfileUpdateCard />
          </motion.div>
          <motion.div variants={fadeUp}>
            <SmartAlertCard />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
