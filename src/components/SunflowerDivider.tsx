import { Sun } from 'lucide-react';

export default function SunflowerDivider({ label }: { label?: string }) {
  return (
    <div className="sunflower-divider" aria-hidden={label ? undefined : true}>
      <span className="line" />
      <span className="flex items-center gap-2 text-[var(--golden-dark)]">
        <Sun className="w-5 h-5 sway" strokeWidth={1.5} />
        {label && <span className="font-dancing text-lg sm:text-xl">{label}</span>}
        <Sun className="w-5 h-5 sway" strokeWidth={1.5} style={{ animationDelay: '1.5s' }} />
      </span>
      <span className="line" />
    </div>
  );
}
