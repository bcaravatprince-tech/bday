import { useEffect, useState } from 'react';
import { Flower2, Home, Mail, PenTool, Calendar, Images, Music, Video, BookOpen, Camera, Cake, Gift, Lock, PartyPopper, Menu, X } from 'lucide-react';

const links = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'friendship', label: 'Friendship', icon: Flower2 },
  { id: 'letter', label: 'Letter', icon: Mail },
  { id: 'poetry', label: 'Shayari', icon: PenTool },
  { id: 'october', label: 'October', icon: Calendar },
  { id: 'memories', label: 'Memories', icon: Images },
  { id: 'music', label: 'Music', icon: Music },
  { id: 'stage', label: 'Stage', icon: Video },
  { id: 'poetry-collection', label: 'Poems', icon: BookOpen },
  { id: 'gallery', label: 'Gallery', icon: Camera },
  { id: 'cake', label: 'Cake', icon: Cake },
  { id: 'gift', label: 'Gift', icon: Gift },
  { id: 'secret', label: 'Secret', icon: Lock },
  { id: 'finale', label: 'Finale', icon: PartyPopper },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = links.map((l) => document.getElementById(l.id));
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.offsetTop <= scrollPos) {
          setActive(links[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[var(--cream)]/95 backdrop-blur-md shadow-md py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <button
            onClick={() => handleClick('hero')}
            className="flex items-center gap-2 font-dancing text-xl sm:text-2xl text-[var(--golden-dark)] hover:text-[var(--golden-deep)] transition-colors"
          >
            <Flower2 className="w-6 h-6" strokeWidth={1.5} />
            <span className="hidden sm:inline">Sunflower Surprise</span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
            {links.map((l) => {
              const Icon = l.icon;
              return (
                <button
                  key={l.id}
                  onClick={() => handleClick(l.id)}
                  className={`flex items-center gap-1.5 px-2 lg:px-3 py-2 rounded-lg font-body text-xs lg:text-sm font-medium transition-all ${
                    active === l.id
                      ? 'bg-[var(--golden)]/30 text-[var(--golden-deep)]'
                      : 'text-[var(--brown)] hover:bg-[var(--golden)]/15'
                  }`}
                  title={l.label}
                >
                  <Icon className="w-4 h-4 shrink-0" strokeWidth={1.8} />
                  <span className="hidden lg:inline">{l.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-[var(--brown)] hover:bg-[var(--golden)]/15"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-[var(--brown)]/30 backdrop-blur-sm" />
          <div
            className="absolute top-16 right-0 left-0 bg-[var(--cream)] shadow-xl rounded-b-2xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-1">
              {links.map((l) => {
                const Icon = l.icon;
                return (
                  <button
                    key={l.id}
                    onClick={() => handleClick(l.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-body text-base font-medium transition-all ${
                      active === l.id
                        ? 'bg-[var(--golden)]/30 text-[var(--golden-deep)]'
                        : 'text-[var(--brown)] hover:bg-[var(--golden)]/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                    {l.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
