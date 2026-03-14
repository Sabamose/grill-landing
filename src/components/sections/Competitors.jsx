import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import Badge from '../ui/Badge';
import { COMPETITORS } from '../../lib/constants';
import { staggerContainer, fadeUp } from '../../lib/animations';

function DesktopTable() {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left py-4 px-4 text-sm font-medium text-slate-light">Feature</th>
            {COMPETITORS.companies.map((company) => (
              <th
                key={company.name}
                className={`py-4 px-4 text-sm font-semibold text-center ${
                  company.name === 'Grill' ? 'text-copper' : 'text-cream/60'
                }`}
              >
                {company.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPETITORS.features.map((feature, fi) => (
            <motion.tr
              key={feature}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: fi * 0.05 }}
              className="border-t border-cream/5"
            >
              <td className="py-4 px-4 text-sm text-cream/80">{feature}</td>
              {COMPETITORS.companies.map((company) => (
                <td key={company.name} className="py-4 px-4 text-center">
                  <div className={`inline-flex ${company.name === 'Grill' ? '' : ''}`}>
                    {company.scores[fi] ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + fi * 0.05, type: 'spring', stiffness: 300 }}
                      >
                        <Check
                          size={18}
                          className={company.name === 'Grill' ? 'text-copper' : 'text-green-400/60'}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + fi * 0.05, type: 'spring', stiffness: 300 }}
                      >
                        <X size={18} className="text-cream/20" />
                      </motion.div>
                    )}
                  </div>
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MobileCards() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="md:hidden space-y-4"
    >
      {COMPETITORS.companies.map((company) => (
        <motion.div
          key={company.name}
          variants={fadeUp}
          className={`p-5 rounded-xl border ${
            company.name === 'Grill'
              ? 'bg-charcoal-light border-copper/20'
              : 'bg-charcoal-light border-cream/5'
          }`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${
            company.name === 'Grill' ? 'text-copper' : 'text-cream/60'
          }`}>
            {company.name}
            {company.name === 'Grill' && (
              <Badge variant="copper" className="ml-2">Us</Badge>
            )}
          </h3>
          <div className="space-y-2">
            {COMPETITORS.features.map((feature, fi) => (
              <div key={feature} className="flex items-center gap-3">
                {company.scores[fi] ? (
                  <Check size={14} className={company.name === 'Grill' ? 'text-copper' : 'text-green-400/60'} />
                ) : (
                  <X size={14} className="text-cream/20" />
                )}
                <span className={`text-sm ${company.scores[fi] ? 'text-cream/80' : 'text-cream/30'}`}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function Competitors() {
  return (
    <section className="py-24 lg:py-32 bg-charcoal-light/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="neutral" className="mb-4">Comparison</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Why <span className="text-gradient-copper">Grill</span>?
          </h2>
        </motion.div>

        <DesktopTable />
        <MobileCards />
      </div>
    </section>
  );
}
