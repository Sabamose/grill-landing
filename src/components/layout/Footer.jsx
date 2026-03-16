import Logo from '../ui/Logo';
import { FOOTER_LINKS, FOUNDER } from '../../lib/constants';
import { Mail, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-cream/5 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Logo className="mb-4" />
            <p className="text-slate-light text-sm max-w-sm mt-4">
              The Guest Intelligence Platform. Every guest remembered, every stay personalized.
            </p>
            <a
              href={`mailto:${FOUNDER.email}`}
              className="inline-flex items-center gap-2 text-sm text-copper hover:text-copper-light transition-colors mt-4"
            >
              <Mail size={14} />
              {FOUNDER.email}
            </a>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-cream mb-4">Navigation</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-light hover:text-copper transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-cream mb-4">Company</h4>
            <p className="text-sm text-slate-light">
              Built for boutique & luxury hotels.
            </p>
          </div>
        </div>

        <div className="border-t border-cream/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate">
            &copy; {new Date().getFullYear()} Grill. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
