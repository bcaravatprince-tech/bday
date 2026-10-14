import { useState } from 'react';
import { Plus, X, Images, RotateCcw } from 'lucide-react';
import SunflowerDivider from './SunflowerDivider';
import EditableText from './EditableText';

type Memory = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
};

type MemoriesProps = {
  memories: Memory[];
  onMemoriesChange: (v: Memory[]) => void;
};

const COLOR_OPTIONS = [
  { bg: 'bg-[var(--soft-pink)]', border: 'border-[var(--soft-pink-2)]' },
  { bg: 'bg-[var(--cream)]', border: 'border-[var(--golden)]/40' },
  { bg: 'bg-[var(--beige)]', border: 'border-[var(--golden-deep)]/30' },
  { bg: 'bg-[#f0e6f6]', border: 'border-[#d4b8e8]' },
  { bg: 'bg-[#e6f0fa]', border: 'border-[#b8d4e8]' },
  { bg: 'bg-[#e8f5e9]', border: 'border-[#a5d6a7]' },
];

const EMOJI_OPTIONS = ['🌻', '🌸', '🎈', '🍰', '⭐', '🎁', '🌟', '🦋', '📚', '🎶', '🌈', '💝'];

export default function Memories({ memories, onMemoriesChange }: MemoriesProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newEmoji, setNewEmoji] = useState('🌻');
  const [newColor, setNewColor] = useState(0);

  const addMemory = () => {
    if (!newTitle.trim()) return;
    onMemoriesChange([
      ...memories,
      {
        id: `mem-${Date.now()}`,
        title: newTitle.trim(),
        description: newDesc.trim() || 'A beautiful moment we shared...',
        emoji: newEmoji,
        color: `${newColor}`,
      },
    ]);
    setNewTitle('');
    setNewDesc('');
    setShowAdd(false);
  };

  const updateMemory = (id: string, field: keyof Memory, value: string) => {
    onMemoriesChange(memories.map((m) => (m.id === id ? { ...m, [field]: value } : m)));
  };

  const removeMemory = (id: string) => {
    onMemoriesChange(memories.filter((m) => m.id !== id));
  };

  return (
    <section
      id="memories"
      className="relative py-20 px-4 sm:px-6 paper-bg"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 fade-in">
          <p className="font-parisienne text-lg text-[var(--golden-dark)] mb-2">Chapter Five</p>
          <h2 className="font-script text-4xl sm:text-5xl text-[var(--brown)] mb-4">
            Memory Cards
          </h2>
          <SunflowerDivider />
          <p className="font-body text-[var(--brown-light)] max-w-xl mx-auto leading-relaxed">
            Tap any card to flip it and read the memory behind it. You don't need photos —
            these moments live in words. Add your own too.
          </p>
        </div>

        {/* Add button */}
        <div className="flex justify-center mb-8 fade-in">
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--golden)]/20 text-[var(--golden-deep)] font-body font-medium hover:bg-[var(--golden)]/35 transition-colors"
          >
            <Plus className="w-5 h-5" strokeWidth={2} />
            {showAdd ? 'Cancel' : 'Add a Memory'}
          </button>
        </div>

        {/* Add form */}
        {showAdd && (
          <div className="cream-card rounded-2xl p-5 mb-8 fade-in max-w-lg mx-auto">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Memory title (e.g., 'Our First Day of School')"
              className="w-full bg-[var(--cream)] border border-[var(--golden-dark)]/30 rounded-lg px-4 py-2.5 font-body text-sm text-[var(--brown)] outline-none focus:border-[var(--golden-dark)] mb-3"
            />
            <textarea
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Describe this memory..."
              rows={3}
              className="w-full bg-[var(--cream)] border border-[var(--golden-dark)]/30 rounded-lg px-4 py-2.5 font-hand text-lg text-[var(--brown)] outline-none focus:border-[var(--golden-dark)] mb-3 resize-none"
            />
            <div className="flex flex-wrap gap-1.5 mb-3">
              {EMOJI_OPTIONS.map((em) => (
                <button
                  key={em}
                  onClick={() => setNewEmoji(em)}
                  className={`text-2xl w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    newEmoji === em ? 'bg-[var(--golden)]/30 ring-2 ring-[var(--golden-dark)]' : 'hover:bg-[var(--golden)]/10'
                  }`}
                >
                  {em}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {COLOR_OPTIONS.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setNewColor(i)}
                  className={`w-8 h-8 rounded-full ${c.bg} border-2 ${
                    newColor === i ? 'ring-2 ring-[var(--golden-dark)] ring-offset-2' : c.border
                  }`}
                />
              ))}
            </div>
            <button
              onClick={addMemory}
              className="w-full py-2.5 rounded-lg bg-[var(--golden-dark)] text-[var(--cream)] font-body font-medium hover:bg-[var(--golden-deep)] transition-colors"
            >
              Save Memory
            </button>
          </div>
        )}

        {/* Memory grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {memories.map((mem) => {
            const colorIdx = parseInt(mem.color) || 0;
            const color = COLOR_OPTIONS[colorIdx] || COLOR_OPTIONS[0];
            return (
              <MemoryCard
                key={mem.id}
                memory={mem}
                colorBg={color.bg}
                colorBorder={color.border}
                onTitleChange={(v) => updateMemory(mem.id, 'title', v)}
                onDescChange={(v) => updateMemory(mem.id, 'description', v)}
                onRemove={() => removeMemory(mem.id)}
              />
            );
          })}
        </div>

        {memories.length === 0 && (
          <div className="text-center py-12 fade-in">
            <Images className="w-12 h-12 mx-auto text-[var(--golden-dark)]/40 mb-3" strokeWidth={1.2} />
            <p className="font-hand text-xl text-[var(--brown-light)]">
              No memories yet — add your first one above!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

type MemoryCardProps = {
  memory: Memory;
  colorBg: string;
  colorBorder: string;
  onTitleChange: (v: string) => void;
  onDescChange: (v: string) => void;
  onRemove: () => void;
};

function MemoryCard({ memory, colorBg, colorBorder, onTitleChange, onDescChange, onRemove }: MemoryCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="memory-card group relative cursor-pointer"
      style={{ perspective: '1000px', minHeight: '220px' }}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="memory-card-inner relative h-full" style={{ minHeight: '220px' }}>
        {/* Front */}
        <div className={`memory-card-face absolute inset-0 ${colorBg} border-2 ${colorBorder} rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow`}>
          <span className="text-5xl mb-3">{memory.emoji}</span>
          <h4 className="font-dancing text-xl text-[var(--brown)]">{memory.title}</h4>
          <div className="flex items-center gap-1.5 mt-3 text-[var(--golden-dark)]/50">
            <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="font-body text-xs">Tap to read</span>
          </div>
        </div>

        {/* Back */}
        <div className={`memory-card-face memory-card-back absolute inset-0 ${colorBg} border-2 ${colorBorder} rounded-2xl p-5 shadow-sm overflow-hidden`}>
          <button
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            className="absolute top-2 right-2 text-[var(--brown-light)] hover:text-[var(--brown)] opacity-0 group-hover:opacity-100 transition-opacity z-10 p-1"
            aria-label="Remove memory"
          >
            <X className="w-4 h-4" />
          </button>
          <div onClick={(e) => e.stopPropagation()}>
            <EditableText
              as="h3"
              value={memory.title}
              onChange={onTitleChange}
              className="font-dancing text-lg text-[var(--brown)] text-center mb-2"
            />
            <EditableText
              as="div"
              value={memory.description}
              onChange={onDescChange}
              multiline
              className="font-hand text-base text-[var(--brown)] leading-relaxed text-center whitespace-pre-wrap block"
            />
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[var(--golden-dark)]/50">
            <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="font-body text-xs">Tap to flip back</span>
          </div>
        </div>
      </div>
    </div>
  );
}
