import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, Shield, Clock } from 'lucide-react';
import Button from '../ui/Button';
import { submitWaitlist, validateEmail } from '../../lib/emailService';
import { fadeUp } from '../../lib/animations';

function ConfettiParticle({ index }) {
  const angle = (index / 20) * Math.PI * 2;
  const distance = 80 + Math.random() * 80;
  const size = 4 + Math.random() * 6;
  const colors = ['#C77B3C', '#D4924F', '#A8652F', '#FAF7F2', '#F0EBE3'];
  const color = colors[index % colors.length];

  return (
    <motion.div
      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      animate={{
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 40,
        scale: 0,
        opacity: 0,
        rotate: Math.random() * 720,
      }}
      transition={{ duration: 0.8 + Math.random() * 0.4, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
        backgroundColor: color,
      }}
    />
  );
}

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address');
      inputRef.current?.focus();
      return;
    }

    setStatus('loading');

    try {
      await submitWaitlist(email);
      setStatus('success');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1500);
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <section id="waitlist" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-copper/3 to-transparent pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Ready to give your hotel<br />
            <span className="text-gradient-copper">a memory?</span>
          </h2>
          <p className="text-lg text-slate-light mb-10 max-w-lg mx-auto">
            Join the waitlist and be among the first hotels to transform guest experiences with Grill.
          </p>

          <div className="relative max-w-md mx-auto">
            <AnimatePresence mode="wait">
              {status !== 'success' ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  animate={status === 'error' ? { x: [0, -8, 8, -8, 8, 0] } : {}}
                  transition={status === 'error' ? { duration: 0.4 } : undefined}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    ref={inputRef}
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setStatus('idle'); setErrorMsg(''); }}
                    placeholder="your@email.com"
                    className={`flex-1 px-5 py-3.5 rounded-lg bg-charcoal-light text-cream placeholder:text-slate text-sm outline-none transition-all duration-300 border ${
                      status === 'error'
                        ? 'border-red-500/50 focus:border-red-500'
                        : 'border-cream/10 focus:border-copper/50'
                    }`}
                  />
                  <Button
                    type="submit"
                    disabled={status === 'loading'}
                    glow={status === 'idle'}
                    className="px-8 py-3.5 whitespace-nowrap"
                  >
                    {status === 'loading' ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        <Send size={16} />
                        Join Waitlist
                      </>
                    )}
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 relative"
                >
                  {/* Confetti burst */}
                  {showConfetti && (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <ConfettiParticle key={i} index={i} />
                      ))}
                    </div>
                  )}

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-copper/20 flex items-center justify-center mx-auto mb-4"
                  >
                    <Check size={28} className="text-copper" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">You're on the list!</h3>
                  <p className="text-sm text-slate-light">
                    We'll be in touch soon. Get ready to transform your guest experience.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {errorMsg && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-400 mt-2 text-left sm:text-center"
              >
                {errorMsg}
              </motion.p>
            )}
          </div>

          {/* Trust signals */}
          {status !== 'success' && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-6 mt-6"
            >
              <span className="flex items-center gap-1.5 text-xs text-slate-light">
                <Shield size={12} className="text-copper/50" />
                No spam, ever
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-light">
                <Clock size={12} className="text-copper/50" />
                Response within 24h
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
