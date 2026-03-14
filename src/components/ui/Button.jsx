import { motion } from 'framer-motion';
import { glowPulse } from '../../lib/animations';

const variants = {
  primary:
    'bg-copper hover:bg-copper-light text-white font-semibold shadow-lg hover:shadow-xl',
  ghost:
    'bg-transparent border border-cream/20 text-cream hover:border-copper hover:text-copper',
  outline:
    'bg-transparent border border-copper/40 text-copper hover:bg-copper/10',
};

export default function Button({
  children,
  variant = 'primary',
  glow = false,
  className = '',
  href,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm transition-all duration-300 cursor-pointer';

  const Component = href ? motion.a : motion.button;
  const linkProps = href ? { href } : {};

  return (
    <Component
      className={`${base} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      {...(glow ? { animate: glowPulse.animate } : {})}
      {...linkProps}
      {...props}
    >
      {children}
    </Component>
  );
}
