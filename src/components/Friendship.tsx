import { useState } from 'react';
import { Heart, Plus, X } from 'lucide-react';
import SunflowerDivider from './SunflowerDivider';
import EditableText from './EditableText';

type FriendshipProps = {
  nicknames: string[];
  onNicknamesChange: (v: string[]) => void;
  messages: { id: string; text: string }[];
  onMessagesChange: (v: { id: string; text: string }[]) => void;
};

export default function Friendship({
  nicknames,
  onNicknamesChange,
  messages,
  onMessagesChange,
}: FriendshipProps) {
  const [newNickname, setNewNickname] = useState('');

  const addNickname = () => {
    const trimmed = newNickname.trim();
    if (trimmed && !nicknames.includes(trimmed)) {
      onNicknamesChange([...nicknames, trimmed]);
      setNewNickname('');
    }
  };

  const removeNickname = (idx: number) => {
    onNicknamesChange(nicknames.filter((_, i) => i !== idx));
  };

  const updateMessage = (id: string, text: string) => {
    onMessagesChange(messages.map((m) => (m.id === id ? { ...m, text } : m)));
  };

  const addMessage = () => {
    onMessagesChange([
      ...messages,
      { id: `msg-${Date.now()}`, text: 'Write your own lovely message here...' },
    ]);
  };

  const removeMessage = (id: string) => {
    onMessagesChange(messages.filter((m) => m.id !== id));
  };

  return (
    <section
      id="friendship"
      className="relative py-20 px-4 sm:px-6 paper-bg"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-12 fade-in">
          <p className="font-parisienne text-lg text-[var(--golden-dark)] mb-2">Chapter One</p>
          <h2 className="font-script text-4xl sm:text-5xl text-[var(--brown)] mb-4">
            Our Childhood Friendship
          </h2>
          <SunflowerDivider />
          <p className="font-body text-[var(--brown-light)] max-w-xl mx-auto leading-relaxed">
            From scraped knees to shared secrets, from classroom giggles to endless
            phone calls — here's to the friendship that grew up with us.
          </p>
        </div>

        {/* Nicknames */}
        <div className="cream-card rounded-2xl p-6 sm:p-8 mb-8 fade-in shadow-sm">
          <h3 className="font-dancing text-2xl sm:text-3xl text-[var(--golden-dark)] mb-2 text-center">
            Nicknames I've Called You
          </h3>
          <p className="font-body text-sm text-[var(--brown-light)] text-center mb-6">
            Every name holds a memory. Add or remove your favourites below.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {nicknames.map((name, idx) => (
              <span
                key={idx}
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--soft-pink)] border border-[var(--soft-pink-2)]/50 text-[var(--brown)] font-hand text-lg transition-all hover:scale-105 hover:shadow-md"
              >
                <Heart className="w-3.5 h-3.5 text-[var(--soft-pink-2)] fill-current" />
                {name}
                <button
                  onClick={() => removeNickname(idx)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--brown-light)] hover:text-[var(--brown)]"
                  aria-label={`Remove ${name}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2">
            <input
              type="text"
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addNickname()}
              placeholder="Add a new nickname..."
              className="bg-[var(--cream)] border border-[var(--golden-dark)]/30 rounded-full px-4 py-2 font-body text-sm text-[var(--brown)] outline-none focus:border-[var(--golden-dark)] focus:ring-2 focus:ring-[var(--golden)]/20 transition-all w-48 sm:w-56"
            />
            <button
              onClick={addNickname}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--golden)]/20 text-[var(--golden-deep)] font-body text-sm font-medium hover:bg-[var(--golden)]/35 transition-colors"
            >
              <Plus className="w-4 h-4" strokeWidth={2} />
              Add
            </button>
          </div>
        </div>

        {/* Personal messages */}
        <div className="cream-card rounded-2xl p-6 sm:p-8 fade-in shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-dancing text-2xl sm:text-3xl text-[var(--golden-dark)]">
              Lovely Messages For You
            </h3>
            <button
              onClick={addMessage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--golden)]/20 text-[var(--golden-deep)] font-body text-sm font-medium hover:bg-[var(--golden)]/35 transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" strokeWidth={2} />
              <span className="hidden sm:inline">Add Message</span>
            </button>
          </div>

          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="group relative bg-[var(--cream)] rounded-xl p-4 pl-6 border-l-4 border-[var(--golden)]/40"
              >
                <span className="absolute top-2 left-2 text-[var(--golden-dark)]/30 font-dancing text-3xl leading-none select-none">
                  "
                </span>
                <EditableText
                  value={msg.text}
                  onChange={(v) => updateMessage(msg.id, v)}
                  multiline
                  className="font-hand text-lg sm:text-xl text-[var(--brown)] leading-relaxed block"
                />
                <button
                  onClick={() => removeMessage(msg.id)}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--brown-light)] hover:text-[var(--brown)] p-1"
                  aria-label="Remove message"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <p className="font-body text-xs text-[var(--brown-light)] mt-4 text-center italic">
            Click on any message to edit it in place.
          </p>
        </div>
      </div>
    </section>
  );
}
