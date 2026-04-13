import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import AnimatedCounter from '../ui/AnimatedCounter';
import { PRICING } from '../../lib/constants';
import { staggerContainer, fadeUp, checkmarkPop } from '../../lib/animations';

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Choose your plan
          </h2>

          {/* Monthly / Annual toggle */}
          <div className="inline-flex items-center bg-charcoal-light border border-cream/10 rounded-full p-1 mt-4">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                !annual ? 'bg-cream text-charcoal' : 'text-slate-light hover:text-cream'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                annual ? 'bg-cream text-charcoal' : 'text-slate-light hover:text-cream'
              }`}
            >
              Annual
              <span className="text-xs text-copper font-semibold">Save 2 months</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {PRICING.map((tier) => {
            const displayPrice = annual ? tier.annualPrice : tier.price;

            return (
              <motion.div
                key={tier.name}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className={`relative p-8 rounded-2xl border ${
                  tier.highlighted
                    ? 'bg-charcoal-light border-copper/30 scale-[1.02] md:scale-105 shadow-lg shadow-copper/5'
                    : 'bg-charcoal-light border-cream/5'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="copper">Recommended</Badge>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
                  <p className="text-sm text-slate-light">{tier.description}</p>
                </div>

                <div className="mb-2">
                  {displayPrice !== null ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm text-slate-light">$</span>
                      <span className="text-4xl font-bold text-copper">
                        <AnimatedCounter target={displayPrice} />
                      </span>
                      <span className="text-sm text-slate-light">{tier.period}</span>
                    </div>
                  ) : (
                    <span className="text-4xl font-bold text-copper">Custom</span>
                  )}
                </div>

                {tier.setupFee && (
                  <p className="text-xs text-slate-light/60 mb-6">
                    + ${tier.setupFee.toLocaleString()} one-time setup fee
                  </p>
                )}
                {!tier.setupFee && displayPrice === null && (
                  <p className="text-xs text-slate-light/60 mb-6">
                    Custom onboarding & setup
                  </p>
                )}

                <motion.ul
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-3 mb-8"
                >
                  {tier.features.map((feature) => (
                    <motion.li key={feature} variants={checkmarkPop} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-copper/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} className="text-copper" />
                      </div>
                      <span className="text-sm text-cream/80">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <Button
                  href="#waitlist"
                  variant={tier.highlighted ? 'primary' : 'outline'}
                  className="w-full"
                >
                  {tier.cta}
                </Button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
