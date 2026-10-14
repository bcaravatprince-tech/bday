import { useState } from 'react';
import { Quote, Heart, Shuffle, Plus, X, PenTool } from 'lucide-react';
import SunflowerDivider from './SunflowerDivider';
import EditableText from './EditableText';

type Poem = {
  id: string;
  type: 'Shayari' | 'Poetry' | 'Quote';
  text: string;
  translation?: string;
};

type PoetryProps = {
  poems: Poem[];
  onPoemsChange: (v: Poem[]) => void;
};

const TYPES: Poem['type'][] = ['Shayari', 'Poetry', 'Quote'];

const TYPE_STYLES: Record<Poem['type'], string> = {
  Shayari: 'bg-[var(--soft-pink)] border-[var(--soft-pink-2)]',
  Poetry: 'bg-[var(--cream)] border-[var(--golden)]/40',
  Quote: 'bg-[var(--beige)] border-[var(--golden-deep)]/30',
};

export default function Poetry({ poems, onPoemsChange }: PoetryProps) {
  const [filter, setFilter] = useState<'All' | Poem['type']>('All');
  const [newText, setNewText] = useState('');
  const [newType, setNewType] = useState<Poem['type']>('Shayari');
  const [showAdd, setShowAdd] = useState(false);

  const filtered = filter === 'All' ? poems : poems.filter((p) => p.type === filter);

  const shuffle = () => {
    const shuffled = [...poems].sort(() => Math.random() - 0.5);
    onPoemsChange(shuffled);
  };

  const addPoem = () => {
    const trimmed = newText.trim();
    if (!trimmed) return;
    onPoemsChange([
      ...poems,
      { id: `poem-${Date.now()}`, type: newType, text: trimmed },
    ]);
    setNewText('');
    setShowAdd(false);
  };

  const updatePoem = (id: string, text: string) => {
    onPoemsChange(poems.map((p) => (p.id === id ? { ...p, text } : p)));
  };

  const removePoem = (id: string) => {
    onPoemsChange(poems.filter((p) => p.id !== id));
  };

  const filters: ('All' | Poem['type'])[] = ['All', ...TYPES];

  return (
    <section
      id="poetry"
      className="relative py-20 px-4 sm:px-6 paper-bg"
    >
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 fade-in">
          <p className="font-parisienne text-lg text-[var(--golden-dark)] mb-2">Chapter Three</p>
          <h2 className="font-script text-4xl sm:text-5xl text-[var(--brown)] mb-4">
            Shayari, Poetry & Friendship Quotes
          </h2>
          <SunflowerDivider />
          <p className="font-body text-[var(--brown-light)] max-w-xl mx-auto leading-relaxed">
            A little garden of words — some emotional, some funny, all written for you.
            Filter, shuffle, or add your own.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 fade-in">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full font-body text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-[var(--golden-dark)] text-[var(--cream)] shadow-md'
                  : 'bg-[var(--cream)] text-[var(--brown)] border border-[var(--golden-dark)]/20 hover:border-[var(--golden-dark)]/50'
              }`}
            >
              {f === 'All' ? 'All' : f + 's'}
            </button>
          ))}
          <button
            onClick={shuffle}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--soft-pink)] border border-[var(--soft-pink-2)] text-[var(--brown)] font-body text-sm font-medium hover:scale-105 transition-transform"
          >
            <Shuffle className="w-4 h-4" strokeWidth={1.8} />
            Shuffle
          </button>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--golden)]/20 text-[var(--golden-deep)] font-body text-sm font-medium hover:bg-[var(--golden)]/35 transition-colors"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            Add Your Own
          </button>
        </div>

        {/* Add form */}
        {showAdd && (
          <div className="cream-card rounded-2xl p-5 mb-6 fade-in">
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as Poem['type'])}
                className="bg-[var(--cream)] border border-[var(--golden-dark)]/30 rounded-lg px-3 py-2 font-body text-sm text-[var(--brown)] outline-none focus:border-[var(--golden-dark)]"
              >
                {TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <textarea
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Write your shayari, poem, or quote..."
                rows={2}
                className="flex-1 bg-[var(--cream)] border border-[var(--golden-dark)]/30 rounded-lg px-3 py-2 font-hand text-lg text-[var(--brown)] outline-none focus:border-[var(--golden-dark)] resize-none"
              />
              <button
                onClick={addPoem}
                className="px-5 py-2 rounded-lg bg-[var(--golden-dark)] text-[var(--cream)] font-body font-medium hover:bg-[var(--golden-deep)] transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Poems grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((poem) => (
            <div
              key={poem.id}
              className={`group relative rounded-2xl p-6 border-2 ${TYPE_STYLES[poem.type]} shadow-sm hover:shadow-md transition-shadow fade-in`}
            >
              <div className="flex items-start gap-3">
                <Quote className="w-6 h-6 text-[var(--golden-dark)]/40 shrink-0 mt-1" strokeWidth={1.5} />
                <div className="flex-1">
                  <span className="inline-block text-xs font-body font-semibold uppercase tracking-wider text-[var(--golden-deep)] mb-2 px-2 py-0.5 rounded-full bg-white/50">
                    {poem.type}
                  </span>
                  <EditableText
                    value={poem.text}
                    onChange={(v) => updatePoem(poem.id, v)}
                    multiline
                    as="div"
                    className="font-hand text-lg sm:text-xl text-[var(--brown)] leading-relaxed whitespace-pre-wrap block"
                  />
                  {poem.translation && (
                    <p className="font-body text-sm text-[var(--brown-light)] italic mt-2">
                      {poem.translation}
                    </p>
                  )}
                  <div className="flex items-center gap-1 mt-3 text-[var(--soft-pink-2)]">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>
              </div>
              <button
                onClick={() => removePoem(poem.id)}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--brown-light)] hover:text-[var(--brown)] p-1"
                aria-label="Remove"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 fade-in">
            <PenTool className="w-10 h-10 mx-auto text-[var(--golden-dark)]/40 mb-3" strokeWidth={1.2} />
            <p className="font-hand text-xl text-[var(--brown-light)]">
              No {filter.toLowerCase()} yet — add your own above!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
