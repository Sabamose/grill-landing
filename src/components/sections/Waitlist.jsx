import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, Shield, Clock } from 'lucide-react';
import { submitWaitlist, validateEmail } from '../../lib/emailService';

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
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
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <section
      id="waitlist"
      className="bg-cream text-ink py-24 lg:py-32 border-t border-[#EBEBEB]"
    >
      <div className="container-editorial">
        <div className="max-w-[680px] mx-auto text-center">
          <div className="label-mono mb-6">◆ Request access</div>

          <h2 className="font-serif text-[40px] sm:text-[48px] lg:text-[56px] leading-[1.06] tracking-[-0.015em] text-balance mb-6">
            Quietly transform<br />
            how your team remembers.
          </h2>

          <p className="text-[16px] sm:text-[17px] leading-[1.7] max-w-[520px] mx-auto mb-10 text-[#6B6B6B]">
            We're onboarding a small group of boutique hotels this season.
            Tell us where you operate and we'll be in touch with a personalised
            demo on your own data.
          </p>

          <div className="relative max-w-[460px] mx-auto">
            <AnimatePresence mode="wait">
              {status !== 'success' ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  animate={status === 'error' ? { x: [0, -6, 6, -6, 6, 0] } : {}}
                  transition={status === 'error' ? { duration: 0.4 } : undefined}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    ref={inputRef}
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setStatus('idle'); setErrorMsg(''); }}
                    placeholder="your@hotel.com"
                    className={`flex-1 px-5 py-3.5 rounded-full bg-white text-ink placeholder:text-[#A3A3A3] text-[14px] outline-none transition-all duration-300 border ${
                      status === 'error'
                        ? 'border-[#D4634B]'
                        : 'border-[#EBEBEB] focus:border-ink'
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-ink text-white text-[14px] font-medium hover:bg-[#2A2A2A] transition-colors disabled:opacity-60 cursor-pointer whitespace-nowrap"
                  >
                    {status === 'loading' ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        <Send size={14} />
                        Request demo
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 280, delay: 0.1 }}
                    className="w-14 h-14 rounded-full bg-[#F3E8DE] flex items-center justify-center mx-auto mb-4"
                  >
                    <Check size={24} className="text-[#A0734E]" />
                  </motion.div>
                  <h3 className="font-serif text-[22px] mb-2">Demo requested</h3>
                  <p className="text-[14px] text-[#6B6B6B]">
                    We'll be in touch within 24 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {errorMsg && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[12px] mt-3 text-[#D4634B] text-center"
              >
                {errorMsg}
              </motion.p>
            )}
          </div>

          {status !== 'success' && (
            <div className="flex items-center justify-center gap-7 mt-8 label-mono" style={{ fontSize: 10 }}>
              <span className="flex items-center gap-1.5">
                <Shield size={11} className="text-[#A0734E]" />
                No spam, ever
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={11} className="text-[#A0734E]" />
                Reply within 24h
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
