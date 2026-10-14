import { useEffect, useState } from 'react';

type Petal = {
  id: number;
  left: number;
  duration: number;
  delay: number;
  drift: number;
  size: number;
  opacity: number;
};

const PETAL_SVG = (size: number, opacity: number) => (
  <svg width={size} height={size} viewBox="0 0 30 30" style={{ opacity }}>
    <g transform="translate(15 15)">
      <ellipse cx="0" cy="-8" rx="5" ry="10" fill="#f4c430" opacity="0.8" />
      <ellipse cx="0" cy="-8" rx="5" ry="10" fill="#e6a817" opacity="0.4" transform="rotate(72)" />
      <ellipse cx="0" cy="-8" rx="5" ry="10" fill="#f4c430" opacity="0.7" transform="rotate(144)" />
      <ellipse cx="0" cy="-8" rx="5" ry="10" fill="#e6a817" opacity="0.4" transform="rotate(216)" />
      <ellipse cx="0" cy="-8" rx="5" ry="10" fill="#f4c430" opacity="0.7" transform="rotate(288)" />
      <circle cx="0" cy="0" r="4" fill="#5c4423" opacity="0.6" />
    </g>
  </svg>
);

export default function FloatingPetals({ count = 12 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const initial: Petal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 12 + Math.random() * 10,
      delay: Math.random() * 15,
      drift: (Math.random() - 0.5) * 200,
      size: 18 + Math.random() * 16,
      opacity: 0.4 + Math.random() * 0.3,
    }));
    setPetals(initial);
  }, [count]);

  return (
    <>
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ['--drift' as string]: `${p.drift}px`,
          }}
        >
          {PETAL_SVG(p.size, p.opacity)}
        </div>
      ))}
    </>
  );
}
