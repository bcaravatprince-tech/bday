import { useState } from 'react';
import { Gift, Heart, Sparkles } from 'lucide-react';
import FloatingPetals from './FloatingPetals';
import SunflowerDivider from './SunflowerDivider';

type HeroProps = {
  name: string;
  onNameChange: (v: string) => void;
  onSurprise: () => void;
};

export default function Hero({ name, onNameChange, onSurprise }: HeroProps) {
  const [revealed, setRevealed] = useState(false);

  const handleSurprise = () => {
    setRevealed(true);
    onSurprise();
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center paper-bg overflow-hidden pt-20 pb-12"
    >
      <FloatingPetals count={14} />

      {/* Decorative sunflower corners */}
      <div className="absolute top-20 left-4 sm:left-10 opacity-20 sway hidden sm:block">
        <SunflowerSVG size={80} />
      </div>
      <div className="absolute bottom-10 right-4 sm:right-10 opacity-20 sway hidden sm:block" style={{ animationDelay: '1s' }}>
        <SunflowerSVG size={60} />
      </div>

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Small label */}
        <p className="font-parisienne text-lg sm:text-xl text-[var(--golden-dark)] mb-3 opacity-0 fade-in visible">
          A Sunflower-Inspired Birthday Cover Letter
        </p>

        {/* Name */}
        <div className="mb-6">
          <p className="font-hand text-xl sm:text-2xl text-[var(--brown-light)] mb-2">
            Happy Birthday, my dearest
          </p>
          <EditableName name={name} onNameChange={onNameChange} />
        </div>

        {/* Sunflower icon */}
        <div className="flex justify-center mb-6 heartbeat">
          <SunflowerSVG size={70} />
        </div>

        {/* Subtitle */}
        <p className="font-body text-sm sm:text-base text-[var(--brown-light)] max-w-md mx-auto mb-8 leading-relaxed">
          Press the button below and let a little garden of words, memories, and
          sunshine bloom just for you.
        </p>

        {/* Surprise button */}
        <button
          onClick={handleSurprise}
          className="btn-glow group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[var(--golden)] to-[var(--golden-dark)] text-[var(--brown)] font-body font-semibold text-base sm:text-lg shadow-lg hover:scale-105 active:scale-95 transition-transform"
        >
          <Gift className="w-6 h-6 group-hover:rotate-12 transition-transform" strokeWidth={1.8} />
          {revealed ? 'Open Your Surprise Again' : 'Open Your Birthday Surprise'}
          <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={1.8} />
        </button>

        {revealed && (
          <p className="font-hand text-lg text-[var(--golden-dark)] mt-6 opacity-0 fade-in visible">
            Scroll down to explore your surprise, {name || 'Sunshine'}!
            <Heart className="inline w-4 h-4 ml-1 text-[var(--soft-pink-2)] fill-current" />
          </p>
        )}

        <div className="mt-10 max-w-xs mx-auto">
          <SunflowerDivider />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[var(--golden-dark)] opacity-60">
        <div className="flex flex-col items-center gap-1">
          <span className="font-body text-xs">Scroll to explore</span>
          <div className="w-5 h-8 border-2 border-[var(--golden-dark)] rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-1.5 bg-[var(--golden-dark)] rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}

function EditableName({ name, onNameChange }: { name: string; onNameChange: (v: string) => void }) {
  return (
    <input
      type="text"
      value={name}
      onChange={(e) => onNameChange(e.target.value)}
      placeholder="Her Name"
      className="bg-transparent border-none outline-none text-center font-script text-5xl sm:text-7xl text-[var(--golden-dark)] placeholder-[var(--golden-dark)]/40 w-full focus:bg-[var(--golden)]/10 rounded-xl px-4 py-2 transition-colors"
      style={{ fontWeight: 400 }}
    />
  );
}

function SunflowerSVG({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <g transform="translate(50 50)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((rot) => (
          <ellipse
            key={rot}
            cx="0"
            cy="-22"
            rx="10"
            ry="20"
            fill="#f4c430"
            stroke="#c9971f"
            strokeWidth="0.5"
            transform={`rotate(${rot})`}
          />
        ))}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((rot) => (
          <ellipse
            key={rot}
            cx="0"
            cy="-22"
            rx="8"
            ry="18"
            fill="#e6a817"
            opacity="0.7"
            transform={`rotate(${rot})`}
          />
        ))}
        <circle cx="0" cy="0" r="12" fill="#5c4423" />
        <circle cx="0" cy="0" r="10" fill="#6b4423" />
        <circle cx="-3" cy="-3" r="1.5" fill="#8b5a2b" />
        <circle cx="3" cy="2" r="1.5" fill="#8b5a2b" />
        <circle cx="-2" cy="4" r="1.5" fill="#8b5a2b" />
      </g>
    </svg>
  );
}
