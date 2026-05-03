import { motion } from 'framer-motion';
import Logo from '../ui/Logo';
import { FOOTER_LINKS, FOUNDER } from '../../lib/constants';
import { Mail } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../lib/animations';

export default function Footer() {
  return (
    <footer className="bg-cream border-t border-[#EBEBEB] text-ink">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container-editorial py-16 lg:py-20"
      >
        <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Logo className="mb-5" />
            <p className="font-serif text-[20px] leading-[1.35] tracking-[-0.01em] max-w-[420px] text-ink mt-4">
              We make your team unforgettable<br />
              <span className="italic" style={{ color: '#A0734E' }}>— not replaceable.</span>
            </p>
            <a
              href={`mailto:${FOUNDER.email}`}
              className="inline-flex items-center gap-2 text-[13px] mt-6 text-[#6B6B6B] hover:text-ink transition-colors"
            >
              <Mail size={14} />
              {FOUNDER.email}
            </a>
          </div>

          <div>
            <div className="label-mono mb-5" style={{ fontSize: 10 }}>◆ Navigation</div>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[13px] text-[#6B6B6B] hover:text-ink transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="label-mono mb-5" style={{ fontSize: 10 }}>◆ Built for</div>
            <p className="text-[13px] text-[#6B6B6B] leading-[1.6]">
              Boutique &amp; luxury hotels<br />
              who measure stays in moments,<br />
              not transactions.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="border-t border-[#EBEBEB] mt-14 pt-7 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="text-[12px] text-[#A3A3A3]">
            &copy; {new Date().getFullYear()} Grill. All rights reserved.
          </p>
          <p className="label-mono" style={{ fontSize: 10 }}>
            ◇ Made with care, in Tbilisi
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
