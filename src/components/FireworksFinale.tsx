import { useState, useRef, useEffect, useCallback } from 'react';
import { Heart, Sparkles, Sun, PartyPopper } from 'lucide-react';
import SunflowerDivider from './SunflowerDivider';
import EditableText from './EditableText';

type FireworksFinaleProps = {
  name: string;
  finalWish: { title: string; body: string };
  onFinalWishChange: (v: { title: string; body: string }) => void;
};

type Firework = {
  id: number;
  x: number;
  y: number;
  color: string;
  particles: number;
};

const FIREWORK_COLORS = [
  '#f4c430', '#e6a817', '#f2c4cf', '#fef9e7',
  '#9ab73a', '#ff8c00', '#ffd700', '#f9e0e6',
];

export default function FireworksFinale({ name, finalWish, onFinalWishChange }: FireworksFinaleProps) {
  const [launched, setLaunched] = useState(false);
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const nextId = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const launchOne = useCallback(() => {
    const colors = FIREWORK_COLORS;
    const fw: Firework = {
      id: nextId.current++,
      x: 10 + Math.random() * 80,
      y: 15 + Math.random() * 45,
      color: colors[Math.floor(Math.random() * colors.length)],
      particles: 16 + Math.floor(Math.random() * 12),
    };
    setFireworks((prev) => [...prev, fw]);
    // Remove after animation
    setTimeout(() => {
      setFireworks((prev) => prev.filter((f) => f.id !== fw.id));
    }, 2500);
  }, []);

  const handleLaunch = () => {
    if (launched) {
      // Launch a few more
      for (let i = 0; i < 5; i++) {
        setTimeout(() => launchOne(), i * 200);
      }
      return;
    }
    setLaunched(true);
    // Initial burst
    for (let i = 0; i < 6; i++) {
      setTimeout(() => launchOne(), i * 150);
    }
    // Continuous fireworks
    intervalRef.current = setInterval(launchOne, 1200);
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Stop continuous fireworks after 30 seconds
  useEffect(() => {
    if (launched && intervalRef.current) {
      const stopTimer = setTimeout(() => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }, 30000);
      return () => clearTimeout(stopTimer);
    }
  }, [launched]);

  return (
    <section id="finale" className="relative py-20 px-4 sm:px-6 paper-bg overflow-hidden">
      {/* Fireworks canvas overlay */}
      {launched && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {fireworks.map((fw) => (
            <FireworkBurst key={fw.id} firework={fw} />
          ))}
        </div>
      )}

      <div className="relative z-20 max-w-3xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 fade-in">
          <p className="font-parisienne text-lg text-[var(--golden-dark)] mb-2">Chapter Thirteen</p>
          <h2 className="font-script text-4xl sm:text-5xl text-[var(--brown)] mb-4">
            Fireworks Finale
          </h2>
          <SunflowerDivider />
          <p className="font-body text-[var(--brown-light)] max-w-xl mx-auto leading-relaxed">
            The grand finale! Launch the fireworks and read the final heartfelt wish.
          </p>
        </div>

        {/* Launch button (before launch) */}
        {!launched && (
          <div className="text-center mb-8 fade-in">
            <button
              onClick={handleLaunch}
              className="btn-glow inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[var(--golden)] to-[var(--golden-dark)] text-[var(--brown)] font-body font-semibold text-base sm:text-lg shadow-lg hover:scale-105 active:scale-95 transition-transform"
            >
              <PartyPopper className="w-6 h-6" strokeWidth={1.8} />
              Launch the Fireworks
              <Sparkles className="w-5 h-5" strokeWidth={1.8} />
            </button>
          </div>
        )}

        {/* Finale content (revealed after launch) */}
        {launched && (
          <div className="finale-reveal-anim text-center">
            {/* Big Happy Birthday */}
            <div className="mb-6">
              <Sun className="w-12 h-12 mx-auto text-[var(--golden)] sway mb-3" strokeWidth={1.2} />
              <h3 className="font-script text-4xl sm:text-6xl text-[var(--golden-dark)] leading-tight">
                Happy Birthday
              </h3>
              <p className="font-script text-3xl sm:text-5xl text-[var(--brown)] mt-1">
                {name || 'Sunshine'}!
              </p>
            </div>

            <SunflowerDivider />

            {/* Final wish card */}
            <div className="cream-card rounded-2xl p-6 sm:p-8 shadow-sm text-left max-w-xl mx-auto">
              <EditableText
                as="h3"
                value={finalWish.title}
                onChange={(v) => onFinalWishChange({ ...finalWish, title: v })}
                className="font-dancing text-2xl sm:text-3xl text-[var(--golden-dark)] text-center mb-4"
              />

              <EditableText
                as="div"
                value={finalWish.body}
                onChange={(v) => onFinalWishChange({ ...finalWish, body: v })}
                multiline
                className="font-hand text-lg sm:text-xl text-[var(--brown)] leading-relaxed whitespace-pre-wrap block text-center"
              />

              <div className="flex items-center justify-center gap-1.5 mt-4 text-[var(--soft-pink-2)]">
                <Heart className="w-4 h-4 fill-current heartbeat" />
                <span className="font-body text-xs text-[var(--brown-light)]">Click text to edit your wish</span>
                <Heart className="w-4 h-4 fill-current heartbeat" />
              </div>
            </div>

            {/* More fireworks button */}
            <div className="mt-6">
              <button
                onClick={handleLaunch}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--cream)] border border-[var(--golden-dark)]/30 text-[var(--brown)] font-body font-medium hover:bg-[var(--golden)]/10 transition-colors"
              >
                <Sparkles className="w-5 h-5" strokeWidth={1.8} />
                More Fireworks!
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function FireworkBurst({ firework }: { firework: Firework }) {
  const particles = Array.from({ length: firework.particles }, (_, i) => i);
  const angleStep = (Math.PI * 2) / firework.particles;

  return (
    <div
      className="absolute"
      style={{ left: `${firework.x}%`, top: `${firework.y}%` }}
    >
      {/* Center flash */}
      <div
        className="firework-flash"
        style={{ background: firework.color }}
      />
      {/* Particles */}
      {particles.map((i) => {
        const angle = i * angleStep;
        const distance = 60 + Math.random() * 40;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        return (
          <div
            key={i}
            className="firework-particle"
            style={{
              background: firework.color,
              ['--dx' as string]: `${dx}px`,
              ['--dy' as string]: `${dy}px`,
            }}
          />
        );
      })}
    </div>
  );
}
