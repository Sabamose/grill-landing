import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import AnimatedCounter from '../ui/AnimatedCounter';
import { PRICING } from '../../lib/constants';
import { staggerContainer, fadeUp, checkmarkPop } from '../../lib/animations';

export default function Pricing() {
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
          <Badge variant="copper" className="mb-4">Pricing</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Simple, <span className="text-gradient-copper">transparent</span> pricing
          </h2>
          <p className="mt-4 text-lg text-slate-light max-w-xl mx-auto">
            Start small, scale as you grow. No hidden fees.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {PRICING.map((tier) => (
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
                  <Badge variant="copper">Most Popular</Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
                <p className="text-sm text-slate-light">{tier.description}</p>
              </div>

              <div className="mb-6">
                {tier.price !== null ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-slate-light">$</span>
                    <span className="text-4xl font-bold text-copper">
                      <AnimatedCounter target={tier.price} />
                    </span>
                    <span className="text-sm text-slate-light">{tier.period}</span>
                  </div>
                ) : (
                  <span className="text-4xl font-bold text-copper">Custom</span>
                )}
              </div>

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
          ))}
        </motion.div>
      </div>
    </section>
  );
}
