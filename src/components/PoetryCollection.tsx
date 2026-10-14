import { useState } from 'react';
import { Quote, Heart, Sparkles, Sun } from 'lucide-react';
import SunflowerDivider from './SunflowerDivider';

export type PoemItem = {
  id: string;
  type: 'Shayari' | 'Poetry' | 'Quote' | 'Funny';
  text: string;
};

type PoetryCollectionProps = {
  poems: PoemItem[];
};

const TYPE_STYLES: Record<PoemItem['type'], string> = {
  Shayari: 'bg-[var(--soft-pink)] border-[var(--soft-pink-2)]',
  Poetry: 'bg-[var(--cream)] border-[var(--golden)]/40',
  Quote: 'bg-[var(--beige)] border-[var(--golden-deep)]/30',
  Funny: 'bg-[#f0e6f6] border-[#d4b8e8]',
};

const TYPE_LABELS: Record<PoemItem['type'], string> = {
  Shayari: 'Shayari',
  Poetry: 'Poetry',
  Quote: 'Quote',
  Funny: 'Funny Line',
};

export default function PoetryCollection({ poems }: PoetryCollectionProps) {
  const [revealedCount, setRevealedCount] = useState(1);
  const [justRevealed, setJustRevealed] = useState<string | null>(null);

  const visiblePoems = poems.slice(0, revealedCount);
  const hasMore = revealedCount < poems.length;

  const revealAnother = () => {
    if (!hasMore) return;
    const next = poems[revealedCount];
    setRevealedCount((c) => c + 1);
    setJustRevealed(next?.id || null);
    setTimeout(() => setJustRevealed(null), 600);
  };

  const revealAll = () => {
    setRevealedCount(poems.length);
  };

  return (
    <section id="poetry-collection" className="relative py-20 px-4 sm:px-6 paper-bg">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 fade-in">
          <p className="font-parisienne text-lg text-[var(--golden-dark)] mb-2">Chapter Eight</p>
          <h2 className="font-script text-4xl sm:text-5xl text-[var(--brown)] mb-4">
            Poetry Collection
          </h2>
          <SunflowerDivider />
          <p className="font-body text-[var(--brown-light)] max-w-xl mx-auto leading-relaxed">
            A garden of sunflower poetry, friendship shayari, funny lines, and emotional
            quotes — all original, all for her. Reveal them one by one.
          </p>
        </div>

        {/* Poems */}
        <div className="space-y-5">
          {visiblePoems.map((poem) => (
            <div
              key={poem.id}
              className={`relative rounded-2xl p-6 sm:p-7 border-2 ${TYPE_STYLES[poem.type]} shadow-sm ${
                justRevealed === poem.id ? 'poem-reveal-anim' : ''
              } fade-in visible`}
            >
              <div className="flex items-start gap-3">
                <Quote className="w-7 h-7 text-[var(--golden-dark)]/40 shrink-0 mt-1" strokeWidth={1.3} />
                <div className="flex-1">
                  <span className="inline-block text-xs font-body font-semibold uppercase tracking-wider text-[var(--golden-deep)] mb-3 px-2.5 py-1 rounded-full bg-white/50">
                    {TYPE_LABELS[poem.type]}
                  </span>
                  <p className="font-hand text-lg sm:text-xl text-[var(--brown)] leading-relaxed whitespace-pre-wrap">
                    {poem.text}
                  </p>
                  <div className="flex items-center gap-1 mt-3 text-[var(--soft-pink-2)]">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reveal controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 fade-in">
          {hasMore ? (
            <>
              <button
                onClick={revealAnother}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--golden)] to-[var(--golden-dark)] text-[var(--brown)] font-body font-semibold shadow-md hover:scale-105 active:scale-95 transition-transform"
              >
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" strokeWidth={1.8} />
                Reveal Another Poem
              </button>
              <button
                onClick={revealAll}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--cream)] border border-[var(--golden-dark)]/30 text-[var(--brown)] font-body font-medium hover:bg-[var(--golden)]/10 transition-colors"
              >
                <Sun className="w-5 h-5" strokeWidth={1.8} />
                Reveal All ({poems.length - revealedCount} more)
              </button>
            </>
          ) : (
            <p className="font-hand text-xl text-[var(--golden-dark)]">
              That's all the poems I have for now, sunshine!
              <Heart className="inline w-5 h-5 ml-2 text-[var(--soft-pink-2)] fill-current" />
            </p>
          )}
        </div>

        <p className="text-center font-body text-xs text-[var(--brown-light)] mt-4">
          Showing {visiblePoems.length} of {poems.length}
        </p>
      </div>
    </section>
  );
}
