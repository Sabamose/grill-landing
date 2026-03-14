import { useState } from 'react';
import { motion } from 'framer-motion';
import Badge from '../ui/Badge';
import { ARCHITECTURE_STEPS } from '../../lib/constants';
import { staggerContainer, fadeUp, drawLine } from '../../lib/animations';

const NODE_W = 130;
const NODE_H = 42;

const NODES = [
  { id: 'pms', label: 'Opera PMS', x: 20, y: 80, logo: '/logos/opera.svg', color: '#C4262E' },
  { id: 'ota', label: 'Booking.com', x: 20, y: 200, logo: '/logos/booking.svg', color: '#003580' },
  { id: 'billing', label: 'Stripe', x: 20, y: 320, logo: '/logos/stripe.svg', color: '#635BFF' },
  { id: 'msg', label: 'WhatsApp', x: 630, y: 80, logo: '/logos/whatsapp.svg', color: '#25D366' },
  { id: 'crm', label: 'Salesforce', x: 630, y: 200, logo: '/logos/salesforce.svg', color: '#00A1E0' },
  { id: 'slack', label: 'Slack', x: 630, y: 320, logo: '/logos/slack.svg', color: '#4A154B' },
];

const CENTER = { x: 390, y: 200 };

function ArchitectureDiagram() {
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <svg viewBox="0 0 780 400" className="w-full h-auto">
        {/* Connection lines */}
        {NODES.map((node) => (
          <motion.line
            key={node.id}
            x1={node.x + NODE_W / 2}
            y1={node.y + NODE_H / 2}
            x2={CENTER.x}
            y2={CENTER.y}
            stroke={hoveredNode === node.id ? '#C77B3C' : 'rgba(255,255,255,0.08)'}
            strokeWidth={hoveredNode === node.id ? 2 : 1}
            variants={drawLine}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
          />
        ))}

        {/* Animated data packets */}
        {NODES.map((node, i) => (
          <motion.circle
            key={`packet-${node.id}`}
            r={3}
            fill="#C77B3C"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0, 1, 1, 0] }}
            viewport={{ once: true }}
            transition={{
              duration: 2,
              delay: 1.5 + i * 0.3,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <animateMotion
              dur="2s"
              begin={`${1.5 + i * 0.3}s`}
              repeatCount="indefinite"
              path={`M${node.x + NODE_W / 2},${node.y + NODE_H / 2} L${CENTER.x},${CENTER.y}`}
            />
          </motion.circle>
        ))}

        {/* Center GRILL node */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        >
          <rect
            x={CENTER.x - 55}
            y={CENTER.y - 28}
            width={110}
            height={56}
            rx={12}
            fill="rgba(199,123,60,0.15)"
            stroke="#C77B3C"
            strokeWidth={2}
          />
          <text
            x={CENTER.x}
            y={CENTER.y + 5}
            textAnchor="middle"
            fill="#C77B3C"
            fontSize={16}
            fontWeight="bold"
          >
            GRILL
          </text>
        </motion.g>

        {/* Integration nodes */}
        {NODES.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.1 }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            style={{ cursor: 'pointer' }}
          >
            <rect
              x={node.x}
              y={node.y}
              width={NODE_W}
              height={NODE_H}
              rx={8}
              fill={hoveredNode === node.id ? 'rgba(199,123,60,0.1)' : 'rgba(42,42,42,0.8)'}
              stroke={hoveredNode === node.id ? '#C77B3C' : 'rgba(255,255,255,0.1)'}
              strokeWidth={1}
              style={{ transition: 'all 0.3s' }}
            />
            <image
              href={node.logo}
              x={node.x + 10}
              y={node.y + 11}
              width={20}
              height={20}
              style={{ filter: hoveredNode === node.id ? 'brightness(0) invert(1)' : 'brightness(0) invert(1) opacity(0.6)' }}
            />
            <text
              x={node.x + 40 + (NODE_W - 40) / 2}
              y={node.y + NODE_H / 2 + 4}
              textAnchor="middle"
              fill={hoveredNode === node.id ? '#C77B3C' : '#9CA3AF'}
              fontSize={11}
              fontWeight="500"
              style={{ transition: 'fill 0.3s' }}
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

export default function Architecture() {
  return (
    <section id="architecture" className="py-24 lg:py-32 bg-charcoal-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="neutral" className="mb-4">How It Works</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            One hub for <span className="text-gradient-copper">everything</span>
          </h2>
        </motion.div>

        <ArchitectureDiagram />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          {ARCHITECTURE_STEPS.map((step, i) => (
            <motion.div key={step.number} variants={fadeUp} className="relative text-center">
              {i < ARCHITECTURE_STEPS.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.3, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-copper/30 to-copper/5 origin-left"
                  />
                </div>
              )}
              <div className="w-16 h-16 rounded-full bg-copper/10 border border-copper/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-copper font-bold text-lg">{step.number}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-slate-light max-w-xs mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
