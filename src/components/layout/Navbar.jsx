import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from '../ui/Logo';
import { NAV_LINKS } from '../../lib/constants';
import { fadeDown, staggerContainer } from '../../lib/animations';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-cream/85 backdrop-blur-md border-b border-[#EBEBEB]'
            : 'bg-transparent'
        }`}
      >
        <div className="container-editorial">
          <div className="flex items-center justify-between h-20 lg:h-24">
            <Logo size={48} />

            <div className="hidden md:flex items-center gap-9">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[13px] text-[#6B6B6B] hover:text-ink transition-colors"
                  style={{ letterSpacing: '0.01em' }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden md:block">
              <a
                href="#waitlist"
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 bg-ink text-white text-[13px] font-medium hover:bg-[#2A2A2A] transition-colors"
              >
                Request Demo
              </a>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-ink p-2 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-cream flex flex-col items-center justify-center"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center gap-7"
            >
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.href}
                  variants={fadeDown}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-serif text-[28px] text-ink hover:text-[#A0734E] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                variants={fadeDown}
                href="#waitlist"
                onClick={() => setMobileOpen(false)}
                className="mt-4 inline-flex items-center justify-center rounded-full px-7 py-3 bg-ink text-white text-[14px] font-medium"
              >
                Request Demo
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
