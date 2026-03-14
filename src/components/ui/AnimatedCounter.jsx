import { useCountUp } from '../../hooks/useCountUp';

export default function AnimatedCounter({ target, prefix = '', suffix = '', className = '' }) {
  const { count, ref } = useCountUp(target);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}
