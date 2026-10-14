import { useState, useRef } from 'react';
import { Heart, Upload, X, Sparkles } from 'lucide-react';
import SunflowerDivider from './SunflowerDivider';
import EditableText from './EditableText';

type SurpriseGiftProps = {
  gift: { title: string; message: string; image: string };
  onGiftChange: (v: { title: string; message: string; image: string }) => void;
};

export default function SurpriseGift({ gift, onGiftChange }: SurpriseGiftProps) {
  const [opened, setOpened] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      if (src) onGiftChange({ ...gift, image: src });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    onGiftChange({ ...gift, image: '' });
  };

  return (
    <section id="gift" className="relative py-20 px-4 sm:px-6 paper-bg">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 fade-in">
          <p className="font-parisienne text-lg text-[var(--golden-dark)] mb-2">Chapter Eleven</p>
          <h2 className="font-script text-4xl sm:text-5xl text-[var(--brown)] mb-4">
            A Surprise Gift
          </h2>
          <SunflowerDivider />
          <p className="font-body text-[var(--brown-light)] max-w-xl mx-auto leading-relaxed">
            Tap the gift box to open your surprise. You can customize the message and
            add a photo inside.
          </p>
        </div>

        {/* Gift box scene */}
        <div className="cream-card rounded-3xl p-8 sm:p-12 fade-in shadow-sm text-center">
          {/* Gift box */}
          <div className="relative inline-block mb-6" style={{ perspective: '600px' }}>
            <button
              onClick={() => setOpened(!opened)}
              className="relative block focus:outline-none"
              aria-label={opened ? 'Close gift' : 'Open gift'}
            >
              {/* Box body */}
              <div
                className={`gift-box-body transition-all duration-500 ${opened ? 'gift-box-open' : ''}`}
              >
                <svg width="180" height="160" viewBox="0 0 180 160" className="max-w-full h-auto">
                  {/* Box bottom */}
                  <rect x="30" y="70" width="120" height="80" rx="4" fill="#f4c430" stroke="#c9971f" strokeWidth="2" />
                  {/* Box pattern dots */}
                  <circle cx="60" cy="100" r="3" fill="#fef9e7" opacity="0.6" />
                  <circle cx="90" cy="110" r="3" fill="#fef9e7" opacity="0.6" />
                  <circle cx="120" cy="100" r="3" fill="#fef9e7" opacity="0.6" />
                  <circle cx="60" cy="125" r="3" fill="#fef9e7" opacity="0.6" />
                  <circle cx="120" cy="125" r="3" fill="#fef9e7" opacity="0.6" />
                  {/* Vertical ribbon */}
                  <rect x="84" y="70" width="12" height="80" fill="#f2c4cf" />
                  {/* Horizontal ribbon */}
                  <rect x="30" y="100" width="120" height="10" fill="#f2c4cf" />
                </svg>

                {/* Lid (separate element for animation) */}
                <div
                  className={`gift-lid absolute top-0 left-0 right-0 transition-all duration-700 ${opened ? 'gift-lid-open' : ''}`}
                >
                  <svg width="180" height="50" viewBox="0 0 180 50" className="max-w-full h-auto">
                    {/* Lid */}
                    <rect x="20" y="10" width="140" height="35" rx="4" fill="#e6a817" stroke="#c9971f" strokeWidth="2" />
                    {/* Ribbon vertical on lid */}
                    <rect x="84" y="10" width="12" height="35" fill="#f2c4cf" />
                    {/* Bow */}
                    <g transform="translate(90 8)">
                      <ellipse cx="-12" cy="0" rx="14" ry="10" fill="#f2c4cf" stroke="#d4a0a8" strokeWidth="1" />
                      <ellipse cx="12" cy="0" rx="14" ry="10" fill="#f2c4cf" stroke="#d4a0a8" strokeWidth="1" />
                      <circle cx="0" cy="0" r="5" fill="#e8a0b0" />
                    </g>
                  </svg>
                </div>

                {/* Sparkles when opened */}
                {opened && (
                  <>
                    <Sparkles className="absolute -top-4 -left-4 w-6 h-6 text-[var(--golden)] sparkle-anim" strokeWidth={1.5} />
                    <Sparkles className="absolute -top-2 right-0 w-5 h-5 text-[var(--soft-pink-2)] sparkle-anim" strokeWidth={1.5} style={{ animationDelay: '0.2s' }} />
                    <Sparkles className="absolute top-4 -right-6 w-7 h-7 text-[var(--golden)] sparkle-anim" strokeWidth={1.5} style={{ animationDelay: '0.4s' }} />
                  </>
                )}
              </div>
            </button>
          </div>

          {/* Gift content (revealed when opened) */}
          {opened && (
            <div className="gift-content-anim max-w-lg mx-auto">
              <SunflowerDivider />

              <EditableText
                as="h3"
                value={gift.title}
                onChange={(v) => onGiftChange({ ...gift, title: v })}
                className="font-dancing text-2xl sm:text-3xl text-[var(--golden-dark)] mb-4"
              />

              {/* Image */}
              {gift.image ? (
                <div className="group relative mb-4 rounded-xl overflow-hidden shadow-md inline-block">
                  <img src={gift.image} alt="Gift" className="max-w-full max-h-64 rounded-xl object-cover" />
                  <button
                    onClick={removeImage}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[var(--cream)]/90 flex items-center justify-center text-[var(--brown-light)] hover:text-[var(--brown)] shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove image"
                  >
                    <X className="w-4 h-4" strokeWidth={2} />
                  </button>
                </div>
              ) : (
                <div className="mb-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--golden)]/15 text-[var(--golden-deep)] font-body text-sm font-medium hover:bg-[var(--golden)]/25 transition-colors"
                  >
                    <Upload className="w-4 h-4" strokeWidth={1.8} />
                    Add a Photo (optional)
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              )}

              <EditableText
                as="div"
                value={gift.message}
                onChange={(v) => onGiftChange({ ...gift, message: v })}
                multiline
                className="font-hand text-lg sm:text-xl text-[var(--brown)] leading-relaxed whitespace-pre-wrap block"
              />

              <div className="flex items-center justify-center gap-1.5 mt-4 text-[var(--soft-pink-2)]">
                <Heart className="w-4 h-4 fill-current" />
                <span className="font-body text-xs text-[var(--brown-light)]">Click text to edit • Click the box to close</span>
                <Heart className="w-4 h-4 fill-current" />
              </div>
            </div>
          )}

          {!opened && (
            <p className="font-hand text-xl text-[var(--golden-dark)] mt-2">
              Tap the gift box to open it!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
