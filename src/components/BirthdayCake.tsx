import { useState, useRef } from 'react';
import { Cake, Sparkles, Flame } from 'lucide-react';
import SunflowerDivider from './SunflowerDivider';

type BirthdayCakeProps = {
  name: string;
};

const CANDLE_COUNT = 5;

export default function BirthdayCake({ name }: BirthdayCakeProps) {
  const [cut, setCut] = useState(false);
  const [candlesLit, setCandlesLit] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCut = () => {
    if (!candlesLit) {
      setCut(true);
      launchCakeConfetti();
    }
  };

  const blowCandles = () => {
    setCandlesLit(false);
  };

  const relightCandles = () => {
    setCandlesLit(true);
    setCut(false);
  };

  return (
    <section id="cake" className="relative py-20 px-4 sm:px-6 paper-bg overflow-hidden">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 fade-in">
          <p className="font-parisienne text-lg text-[var(--golden-dark)] mb-2">Chapter Ten</p>
          <h2 className="font-script text-4xl sm:text-5xl text-[var(--brown)] mb-4">
            Birthday Cake
          </h2>
          <SunflowerDivider />
          <p className="font-body text-[var(--brown-light)] max-w-xl mx-auto leading-relaxed">
            Make a wish, blow out the candles, and cut the cake to celebrate {name || 'Sunshine'}!
          </p>
        </div>

        {/* Cake scene */}
        <div ref={containerRef} className="relative cream-card rounded-3xl p-8 sm:p-12 fade-in shadow-sm text-center overflow-hidden">
          {/* Cake SVG */}
          <div className="relative inline-block">
            <CakeSVG cut={cut} candlesLit={candlesLit} candleCount={CANDLE_COUNT} />
          </div>

          {/* Name banner on cake */}
          <div className="mt-4 mb-6">
            <p className="font-script text-3xl text-[var(--golden-dark)]">
              {name || 'Happy Birthday'}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {candlesLit ? (
              <button
                onClick={blowCandles}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--soft-pink-2)] to-[#e8a0b0] text-white font-body font-semibold shadow-md hover:scale-105 active:scale-95 transition-transform"
              >
                <Flame className="w-5 h-5" strokeWidth={1.8} />
                Blow Out Candles
              </button>
            ) : !cut ? (
              <button
                onClick={handleCut}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--golden)] to-[var(--golden-dark)] text-[var(--brown)] font-body font-semibold shadow-md hover:scale-105 active:scale-95 transition-transform"
              >
                <Cake className="w-5 h-5" strokeWidth={1.8} />
                Cut the Cake
              </button>
            ) : null}

            {cut && (
              <button
                onClick={relightCandles}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--cream)] border border-[var(--golden-dark)]/30 text-[var(--brown)] font-body font-medium hover:bg-[var(--golden)]/10 transition-colors"
              >
                <Sparkles className="w-5 h-5" strokeWidth={1.8} />
                Start Over
              </button>
            )}
          </div>

          {/* Status messages */}
          {candlesLit && (
            <p className="font-hand text-lg text-[var(--brown-light)] mt-4">
              The candles are glowing — make a wish and blow them out!
            </p>
          )}
          {!candlesLit && !cut && (
            <p className="font-hand text-lg text-[var(--brown-light)] mt-4">
              Wishes made! Now cut the cake to reveal the surprise.
            </p>
          )}
          {cut && (
            <p className="font-hand text-xl text-[var(--golden-dark)] mt-4">
              Happy Birthday, {name || 'Sunshine'}! The cake is served!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function CakeSVG({ cut, candlesLit, candleCount }: { cut: boolean; candlesLit: boolean; candleCount: number }) {
  const candles = Array.from({ length: candleCount }, (_, i) => i);

  return (
    <svg width="280" height="220" viewBox="0 0 280 220" className="max-w-full h-auto">
      {/* Candles */}
      {candles.map((i) => {
        const x = 50 + i * 45;
        const candleH = 35;
        const flameY = 50 - candleH - 15;
        return (
          <g key={i}>
            {/* Candle body */}
            <rect
              x={x - 4}
              y={50 - candleH}
              width="8"
              height={candleH}
              rx="2"
              fill={i % 2 === 0 ? '#f2c4cf' : '#f4c430'}
              stroke="#c9971f"
              strokeWidth="0.5"
            />
            {/* Wick */}
            <line x1={x} y1={50 - candleH - 3} x2={x} y2={50 - candleH} stroke="#5c4423" strokeWidth="1.5" />
            {/* Flame */}
            {candlesLit && (
              <g className={candlesLit ? 'flame-flicker' : ''} style={{ transformOrigin: `${x}px ${flameY + 8}px` }}>
                <ellipse cx={x} cy={flameY} rx="5" ry="9" fill="#ff8c00" opacity="0.9" />
                <ellipse cx={x} cy={flameY + 1} rx="3" ry="6" fill="#ffd700" opacity="0.95" />
                <ellipse cx={x} cy={flameY + 2} rx="1.5" ry="3" fill="#fff8dc" opacity="0.8" />
              </g>
            )}
          </g>
        );
      })}

      {/* Top tier */}
      <g className={`cake-top-tier ${cut ? 'cake-top-cut' : ''}`} style={{ transformOrigin: '140px 80px' }}>
        <path d="M 80 80 Q 140 65 200 80 L 200 130 L 80 130 Z" fill="#fef9e7" stroke="#e6a817" strokeWidth="2" />
        {/* Frosting drips */}
        <path d="M 80 80 Q 85 90 90 82 Q 95 92 100 82 Q 105 90 110 82 Q 115 92 120 82 Q 125 90 130 82 Q 135 92 140 82 Q 145 90 150 82 Q 155 92 160 82 Q 165 90 170 82 Q 175 92 180 82 Q 185 90 190 82 Q 195 92 200 80"
          fill="none" stroke="#f2c4cf" strokeWidth="4" strokeLinecap="round" />
        {/* Decorations */}
        <circle cx="110" cy="105" r="3" fill="#f4c430" />
        <circle cx="140" cy="100" r="3" fill="#e6a817" />
        <circle cx="170" cy="105" r="3" fill="#f4c430" />
      </g>

      {/* Bottom tier */}
      <g className={`cake-bottom-tier ${cut ? 'cake-bottom-cut' : ''}`} style={{ transformOrigin: '140px 130px' }}>
        <path d="M 40 130 Q 140 115 240 130 L 240 190 L 40 190 Z" fill="#f4c430" stroke="#c9971f" strokeWidth="2" />
        {/* Frosting drips */}
        <path d="M 40 130 Q 48 145 56 132 Q 64 148 72 132 Q 80 145 88 132 Q 96 148 104 132 Q 112 145 120 132 Q 128 148 136 132 Q 144 145 152 132 Q 160 148 168 132 Q 176 145 184 132 Q 192 148 200 132 Q 208 145 216 132 Q 224 148 232 132 Q 240 145 240 130"
          fill="none" stroke="#fef9e7" strokeWidth="5" strokeLinecap="round" />
        {/* Sunflower decoration on bottom */}
        <g transform="translate(140 160)">
          {[0, 72, 144, 216, 288].map((rot) => (
            <ellipse key={rot} cx="0" cy="-8" rx="3.5" ry="7" fill="#fef9e7" transform={`rotate(${rot})`} />
          ))}
          <circle cx="0" cy="0" r="4" fill="#5c4423" />
        </g>
      </g>

      {/* Cake slice (appears when cut) */}
      {cut && (
        <g className="cake-slice-anim" style={{ transformOrigin: '140px 160px' }}>
          <path d="M 125 130 L 155 130 L 150 190 L 130 190 Z" fill="#fef9e7" stroke="#e6a817" strokeWidth="1.5" />
          <path d="M 125 130 L 155 130 L 155 135 L 125 135 Z" fill="#f2c4cf" />
        </g>
      )}

      {/* Plate */}
      <ellipse cx="140" cy="195" rx="115" ry="8" fill="#e6a817" opacity="0.3" />
    </svg>
  );
}

function launchCakeConfetti() {
  const colors = ['#f4c430', '#e6a817', '#f2c4cf', '#fef9e7', '#9ab73a', '#ff8c00'];
  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:100;overflow:hidden;';
  document.body.appendChild(container);

  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const isCircle = Math.random() > 0.5;
    piece.className = 'confetti-piece';
    piece.style.cssText = `
      left: ${Math.random() * 100}%;
      background: ${color};
      width: ${8 + Math.random() * 8}px;
      height: ${8 + Math.random() * 8}px;
      ${isCircle ? 'border-radius: 50%;' : 'border-radius: 2px;'}
      animation-duration: ${2 + Math.random() * 2}s;
      animation-delay: ${Math.random() * 0.5}s;
    `;
    container.appendChild(piece);
  }

  setTimeout(() => container.remove(), 5000);
}
