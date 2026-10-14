import { Flower2, Heart } from 'lucide-react';
import SunflowerDivider from './SunflowerDivider';

type FooterProps = {
  name: string;
};

export default function Footer({ name }: FooterProps) {
  return (
    <footer className="relative py-12 px-4 sm:px-6 paper-bg border-t border-[var(--golden-dark)]/15">
      <div className="max-w-2xl mx-auto text-center">
        <SunflowerDivider />
        <div className="flex justify-center mb-4">
          <Flower2 className="w-8 h-8 text-[var(--golden-dark)] sway" strokeWidth={1.3} />
        </div>
        <p className="font-script text-3xl text-[var(--golden-dark)] mb-2">
          Happy Birthday, {name || 'Sunshine'}
        </p>
        <p className="font-hand text-lg text-[var(--brown-light)] mb-4">
          May your year ahead bloom like a field of sunflowers —
          <br className="hidden sm:block" /> always turning toward the light.
        </p>
        <div className="flex items-center justify-center gap-1.5 text-[var(--brown-light)]">
          <span className="font-body text-sm">Made with</span>
          <Heart className="w-4 h-4 text-[var(--soft-pink-2)] fill-current heartbeat" />
          <span className="font-body text-sm">just for you</span>
        </div>
      </div>
    </footer>
  );
}
