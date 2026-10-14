import { useState } from 'react';
import { MailOpen, Heart, Download } from 'lucide-react';
import SunflowerDivider from './SunflowerDivider';
import EditableText from './EditableText';

type LetterProps = {
  letter: { greeting: string; body: string; closing: string; signature: string };
  onLetterChange: (v: { greeting: string; body: string; closing: string; signature: string }) => void;
};

export default function Letter({ letter, onLetterChange }: LetterProps) {
  const [open, setOpen] = useState(false);

  const downloadLetter = () => {
    const text = `${letter.greeting}\n\n${letter.body}\n\n${letter.closing}\n${letter.signature}`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'birthday-letter.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="letter"
      className="relative py-20 px-4 sm:px-6 paper-bg"
    >
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 fade-in">
          <p className="font-parisienne text-lg text-[var(--golden-dark)] mb-2">Chapter Two</p>
          <h2 className="font-script text-4xl sm:text-5xl text-[var(--brown)] mb-4">
            A Letter Sealed With Sunshine
          </h2>
          <SunflowerDivider />
          <p className="font-body text-[var(--brown-light)] max-w-xl mx-auto leading-relaxed">
            Tap the golden envelope to open a letter written straight from the heart.
            You can edit any part of it before sharing.
          </p>
        </div>

        {/* Envelope */}
        <div className="envelope-wrapper fade-in">
          <div className={`envelope ${open ? 'open' : ''}`}>
            {/* Letter inside */}
            <div className="envelope-letter">
              <div className="text-center mb-4">
                <EditableText
                  as="h3"
                  value={letter.greeting}
                  onChange={(v) => onLetterChange({ ...letter, greeting: v })}
                  className="font-script text-2xl sm:text-3xl text-[var(--golden-dark)]"
                />
              </div>
              <SunflowerDivider />
              <EditableText
                as="div"
                value={letter.body}
                onChange={(v) => onLetterChange({ ...letter, body: v })}
                multiline
                className="font-hand text-base sm:text-lg text-[var(--brown)] leading-relaxed whitespace-pre-wrap block"
              />
              <div className="mt-6 text-right">
                <EditableText
                  as="p"
                  value={letter.closing}
                  onChange={(v) => onLetterChange({ ...letter, closing: v })}
                  className="font-body text-sm text-[var(--brown-light)]"
                />
                <EditableText
                  as="p"
                  value={letter.signature}
                  onChange={(v) => onLetterChange({ ...letter, signature: v })}
                  className="font-script text-xl text-[var(--golden-dark)] mt-1"
                />
              </div>
            </div>

            {/* Envelope body */}
            <div className="envelope-body">
              <div className="envelope-pocket" />
              <div className="envelope-flap" />
              <div className="envelope-seal" onClick={() => setOpen(true)}>
                <Heart className="w-5 h-5 text-[var(--cream)] fill-current" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 mt-8 fade-in">
          {!open ? (
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--golden)] to-[var(--golden-dark)] text-[var(--brown)] font-body font-semibold shadow-md hover:scale-105 active:scale-95 transition-transform"
            >
              <MailOpen className="w-5 h-5" strokeWidth={1.8} />
              Open The Letter
            </button>
          ) : (
            <button
              onClick={downloadLetter}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--soft-pink)] border border-[var(--soft-pink-2)] text-[var(--brown)] font-body font-semibold shadow-md hover:scale-105 active:scale-95 transition-transform"
            >
              <Download className="w-5 h-5" strokeWidth={1.8} />
              Download Letter
            </button>
          )}
          {open && (
            <button
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--cream)] border border-[var(--golden-dark)]/30 text-[var(--brown)] font-body font-medium hover:bg-[var(--golden)]/10 transition-colors"
            >
              Close Envelope
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
