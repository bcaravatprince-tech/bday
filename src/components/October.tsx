import { Calendar, Cake, Sparkles, Star } from 'lucide-react';
import SunflowerDivider from './SunflowerDivider';
import EditableText from './EditableText';

type OctoberProps = {
  birthDate: string;
  onBirthDateChange: (v: string) => void;
  octoberMessage: { title: string; body: string };
  onOctoberMessageChange: (v: { title: string; body: string }) => void;
  traits: { id: string; text: string }[];
  onTraitsChange: (v: { id: string; text: string }[]) => void;
};

export default function October({
  birthDate,
  onBirthDateChange,
  octoberMessage,
  onOctoberMessageChange,
  traits,
  onTraitsChange,
}: OctoberProps) {
  const updateTrait = (id: string, text: string) => {
    onTraitsChange(traits.map((t) => (t.id === id ? { ...t, text } : t)));
  };

  const formattedDate = (() => {
    if (!birthDate) return '';
    const date = new Date(birthDate);
    if (isNaN(date.getTime())) return birthDate;
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  })();

  const zodiacSign = (() => {
    if (!birthDate) return 'Libra';
    const date = new Date(birthDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
    return 'Scorpio';
  })();

  return (
    <section
      id="october"
      className="relative py-20 px-4 sm:px-6 paper-bg"
    >
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 fade-in">
          <p className="font-parisienne text-lg text-[var(--golden-dark)] mb-2">Chapter Four</p>
          <h2 className="font-script text-4xl sm:text-5xl text-[var(--brown)] mb-4">
            An October-Born Sunshine
          </h2>
          <SunflowerDivider />
        </div>

        {/* Date picker card */}
        <div className="cream-card rounded-2xl p-6 sm:p-8 mb-8 fade-in shadow-sm text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Cake className="w-14 h-14 text-[var(--golden-dark)] heartbeat" strokeWidth={1.3} />
              <Sparkles className="w-5 h-5 text-[var(--golden)] absolute -top-1 -right-1 sway" strokeWidth={1.5} />
            </div>
          </div>

          <p className="font-hand text-xl text-[var(--brown-light)] mb-2">
            Your special day
          </p>

          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 bg-[var(--cream)] rounded-xl px-4 py-3 border border-[var(--golden-dark)]/20">
              <Calendar className="w-5 h-5 text-[var(--golden-dark)]" strokeWidth={1.5} />
              <input
                type="date"
                value={birthDate}
                onChange={(e) => onBirthDateChange(e.target.value)}
                className="bg-transparent border-none outline-none font-body text-lg text-[var(--brown)] cursor-pointer"
              />
            </div>
            {formattedDate && (
              <p className="font-script text-2xl sm:text-3xl text-[var(--golden-dark)]">
                {formattedDate}
              </p>
            )}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--soft-pink)] border border-[var(--soft-pink-2)]/50 font-body text-sm text-[var(--brown)]">
              <Star className="w-3.5 h-3.5 text-[var(--golden-dark)] fill-current" strokeWidth={1.5} />
              Zodiac: {zodiacSign}
            </span>
          </div>
        </div>

        {/* October message */}
        <div className="cream-card rounded-2xl p-6 sm:p-8 mb-8 fade-in shadow-sm">
          <EditableText
            as="h3"
            value={octoberMessage.title}
            onChange={(v) => onOctoberMessageChange({ ...octoberMessage, title: v })}
            className="font-dancing text-2xl sm:text-3xl text-[var(--golden-dark)] text-center mb-4"
          />
          <SunflowerDivider />
          <EditableText
            as="div"
            value={octoberMessage.body}
            onChange={(v) => onOctoberMessageChange({ ...octoberMessage, body: v })}
            multiline
            className="font-hand text-lg sm:text-xl text-[var(--brown)] leading-relaxed whitespace-pre-wrap block text-center"
          />
        </div>

        {/* October traits */}
        <div className="fade-in">
          <h3 className="font-dancing text-2xl text-[var(--golden-dark)] text-center mb-6">
            What Makes October-Born Special
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {traits.map((trait) => (
              <div
                key={trait.id}
                className="flex items-start gap-3 bg-[var(--cream)] rounded-xl p-4 border border-[var(--golden-dark)]/15"
              >
                <Star className="w-5 h-5 text-[var(--golden)] fill-current shrink-0 mt-1" strokeWidth={1.2} />
                <EditableText
                  value={trait.text}
                  onChange={(v) => updateTrait(trait.id, v)}
                  multiline
                  as="div"
                  className="font-hand text-lg text-[var(--brown)] leading-relaxed flex-1"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
