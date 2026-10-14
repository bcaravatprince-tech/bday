import { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Friendship from '@/components/Friendship';
import Letter from '@/components/Letter';
import Poetry from '@/components/Poetry';
import October from '@/components/October';
import Memories from '@/components/Memories';
import MusicPlayer, { type Song } from '@/components/MusicPlayer';
import VideoStage, { type Video } from '@/components/VideoStage';
import PoetryCollection, { type PoemItem } from '@/components/PoetryCollection';
import PhotoGallery, { type Photo } from '@/components/PhotoGallery';
import BirthdayCake from '@/components/BirthdayCake';
import SurpriseGift from '@/components/SurpriseGift';
import SecretMessage from '@/components/SecretMessage';
import FireworksFinale from '@/components/FireworksFinale';
import Footer from '@/components/Footer';

type Poem = { id: string; type: 'Shayari' | 'Poetry' | 'Quote'; text: string; translation?: string };
type Memory = { id: string; title: string; description: string; emoji: string; color: string };
type Message = { id: string; text: string };
type Trait = { id: string; text: string };

// ---------- Default content ----------
const DEFAULTS = {
  name: 'Aarohi',
  nicknames: ['Chinu', 'Gudia', 'Pari', 'Chutki', 'Sunshine'],
  messages: [
    { id: 'msg-1', text: 'Tu sirf meri best friend nahi hai, tu meri behen jaisi hai. Bachpan se aaj tak, har khushi, har gham mein tu mere saath rehti hai.' },
    { id: 'msg-2', text: 'Yaad hai jab hum school mein ek dusre ka tiffin khaate the aur phir bacha hua le jaate the ghar? Wahi toh yaad hai mujhe.' },
    { id: 'msg-3', text: 'Tera hasna, tera dimaag, tera pyaar — sab kuch mere liye special hai. Tu meri duniya ki sabse pyaari ladki hai.' },
  ] as Message[],
  letter: {
    greeting: 'My Dearest Aarohi,',
    body: `On this golden October day, I want to tell you something I probably don't say enough — you are one of the most beautiful souls I have ever known.

From the scraped knees we got playing in the street, to the secrets we whispered under blankets at midnight sleepovers, every memory with you is etched in my heart like pressed flowers in a book.

You light up every room you walk into, just like a sunflower turns to face the sun. Your laughter is my favourite song, your kindness is my safe place, and your friendship is the gift I never knew I needed but now can't live without.

Today the world got a little brighter because on this day, it got you. Happy Birthday, my forever friend.`,
    closing: 'With all my love and a thousand sunflowers,',
    signature: 'Your Best Friend Forever',
  },
  poems: [
    { id: 'p1', type: 'Shayari' as const, text: 'Dosti ka rishta nibhaana aasaan nahi,\nHar mod pe tujhe paana aasaan nahi.\nPar tu hai toh sab kuch mumkin hai,\nTere bina zindagi kaaza aasaan nahi.' },
    { id: 'p2', type: 'Shayari' as const, text: 'October ka mahina aur tu aayi,\nDuniya mein phir se khushiyaan laayi.\nSunflower jaisi muskaan teri,\nHar dil ko apne rang mein sulaayi.' },
    { id: 'p3', type: 'Poetry' as const, text: 'Bachpan ki wo shaam ki chai,\nKachchi pakki dosti ki pyaali.\nBarson guzar gaye, par yaadein,\nAaj bhi waisi hi taza rehti hain.' },
    { id: 'p4', type: 'Poetry' as const, text: 'Tu chand si, tu sitaaron jaisi,\nDoston mein sabse nyaro hai tu.\nGham ho ya khushi, paas rehna,\nYahi toh tera tareeka hai, pyaaro hai tu.' },
    { id: 'p5', type: 'Quote' as const, text: 'A true friend is someone who knows your past, believes in your future, and accepts you just the way you are — today, tomorrow, and always.' },
    { id: 'p6', type: 'Quote' as const, text: 'Dosti ka matlab kya hai? Ek aisi bandagi jisme koi shart nahi, koi labh nahi — bas pyaar hai, bas bharosa hai.' },
    { id: 'p7', type: 'Shayari' as const, text: 'Gudiya jaisi tu, Pyaari si tu,\nDoston mein sabse nyari si tu.\nJanamdin ki hardik shubhkamnayein,\nKhushiyon se bhara kal tere liye hai.' },
    { id: 'p8', type: 'Poetry' as const, text: 'Tere naam ki har alphabet mein,\nEk dosti ka kissa chhupa hai.\nA to Z tak likhoon, phir bhi,\nMeri dosti ka intezaam nahi hota.' },
  ] as Poem[],
  birthDate: '2002-10-15',
  octoberMessage: {
    title: "October's Child, Sunflower's Smile",
    body: `October-born are special — they carry the warmth of autumn leaves and the golden glow of harvest sun. You, my dear, are the brightest sunflower in the October field.

Libra by heart, balanced and fair, you bring harmony wherever you go. Your smile can turn a cloudy day golden, and your heart holds enough love to fill an entire season.

This October, as you turn a year older, know that you also turn a year brighter, a year kinder, and a year more loved. The world is luckier because you're in it.`,
  },
  traits: [
    { id: 't1', text: 'Balanced and diplomatic — they bring peace wherever they go' },
    { id: 't2', text: 'Warm and affectionate — like a cup of chai on a cold October evening' },
    { id: 't3', text: "Loyal friends — once they love you, it's forever" },
    { id: 't4', text: 'Creative and charming — they see beauty in everything' },
    { id: 't5', text: 'Optimistic — always looking for the silver lining, like a sunflower chasing the sun' },
    { id: 't6', text: 'Romantic at heart — they believe in fairy tales and forever friendships' },
  ] as Trait[],
  memories: [
    { id: 'm1', title: 'Our First Day of School', description: 'We cried together on the bus. By recess, we were best friends sharing one tiffin. That was the day everything began.', emoji: '📚', color: '1' },
    { id: 'm2', title: 'Midnight Phone Calls', description: 'Hours of talking about nothing and everything. Our parents never understood why the phone bill was so high!', emoji: '🎶', color: '4' },
    { id: 'm3', title: 'The Rain Dance', description: 'That monsoon when we danced in the rain like nobody was watching. Our clothes were soaked but our hearts were full.', emoji: '🌈', color: '5' },
    { id: 'm4', title: 'Birthday Cake Disaster', description: 'I dropped the cake. You laughed so hard you cried. We ate it off the floor anyway — best cake ever.', emoji: '🍰', color: '0' },
    { id: 'm5', title: 'The Promise', description: 'Under the stars that night, we promised to be friends forever. Some promises are meant to be kept.', emoji: '⭐', color: '2' },
    { id: 'm6', title: 'Our Secret Language', description: 'We had our own code words that nobody understood. We still use them, and they still make us giggle.', emoji: '🌟', color: '3' },
  ] as Memory[],
  // ---------- Phase 2: Media collections ----------
  // Add your songs here. Place audio files in public/assets/songs/
  songs: [] as Song[],
  // Add your videos here. Place video files in public/assets/videos/
  videos: [] as Video[],
  // Poetry collection — original sunflower poems, shayari, funny lines, emotional quotes
  // The "Reveal Another Poem" button shows these one at a time
  poemCollection: [
    { id: 'pc1', type: 'Poetry' as const, text: 'Surajmukhi jaisi tu, aur bhi pyaari hai,\nHar subah ki roshni mein, tu hi sabse nyari hai.\nPankhdiyaan jaise sooraj ki khilti hain,\nWaise hi tu doston ke dil mein basi rehti hai.' },
    { id: 'pc2', type: 'Shayari' as const, text: 'Tu surajmukhi hai, roshni phailati hai,\nHar muskuraahat se dilon ko jeeti hai.\nDosti ka phool jo khilta hai tere saath,\nWo mahakta hamesha, sooraj ke raastey.' },
    { id: 'pc3', type: 'Funny' as const, text: 'Tu meri best friend hai, yeh sabko pata hai,\nTere dimaag ka haal, sirf mujhe pata hai!\nGussa karti hai toh suraj bhi chhup jaata,\nPhir has deti hai toh duniya roshan ho jaata.' },
    { id: 'pc4', type: 'Quote' as const, text: 'A sunflower doesn\'t compete with the flower next to it — it just blooms. That\'s you, my friend: blooming beautifully without ever dimming anyone else\'s light.' },
    { id: 'pc5', type: 'Poetry' as const, text: 'Pyaar bhara hai tere har shabd mein,\nDilon ko choo jaata hai tera izhaar.\nDosti ka rang jo tune chuna,\nWo fade nahi hota, chahe ho kitna bhi saal.' },
    { id: 'pc6', type: 'Shayari' as const, text: 'Zindagi ki raah mein jab kaante mile,\nTere saath chalna aasaan ho gaya.\nSurajmukhi ka rang, dosti ki khushboo,\nTere aane se sab kuch mehka gaya.' },
    { id: 'pc7', type: 'Funny' as const, text: 'Jab tu gaati hai toh pardesi bolte hain,\n"Yeh kaunsa naya raag hai?"\nMain bolta hoon — yeh meri dosti ki duniya hai,\nYahan sur aur taal se zyada pyaar bolta hai!' },
    { id: 'pc8', type: 'Quote' as const, text: 'Some friendships are like sunflowers — they always find the light, even on the cloudiest days. Thank you for being my sunflower.' },
    { id: 'pc9', type: 'Poetry' as const, text: 'Surajmukhi ka beej, zameen mein tha dabba,\nTune dekha, tune paani diya, tune pyaar kiya.\nAaj wo khil kar, poora garden bhar diya,\nYahi hai dosti teri — sabko mehka rahi hai.' },
    { id: 'pc10', type: 'Shayari' as const, text: 'Saawan ke baadal jab baraste hain,\nSurajmukhi aur bhi khil uthti hai.\nWaise hi gham ke pal mein tu mere paas,\nAati hai muskuraati, aur sab theek kar jaati hai.' },
    { id: 'pc11', type: 'Funny' as const, text: 'Diet pe baithi hai, aur chocolate chhupa ke kha rahi hai,\nMaine pakda usse, boli — "Yeh protein bar hai!" \nBest friend ka dimaag, best friend hi samajh sakta hai!' },
    { id: 'pc12', type: 'Quote' as const, text: 'In a world full of roses, be a sunflower — tall, bright, and always turning toward the sun. That\'s exactly what you are to me.' },
  ] as PoemItem[],
  photos: [] as Photo[],
  // ---------- Phase 3: Birthday surprises ----------
  gift: {
    title: 'A Gift From My Heart',
    message: "This gift doesn't come in a box — it comes in every memory we've shared, every laugh we've cracked, and every tear we've wiped together.\n\nYou are the most precious gift life has given me. Happy Birthday!",
    image: '',
  },
  secretMessage: {
    title: 'A Secret Only For You',
    body: 'I never said this out loud, but you are the reason I believe in forever friendships. Before you, friends came and went. After you, I understood what it means to have someone who stays — through every season, every storm, every sunflower field.\n\nThank you for being my person. Always.',
    password: '',
  },
  finalWish: {
    title: 'My Final Wish For You',
    body: "May your life bloom like a sunflower field — golden, bright, and always facing the sun. May October bring you everything your heart whispers for, and may our friendship remain the constant in every changing season.\n\nHappy Birthday, my dearest friend. Here's to many more years of laughter, love, and sunflowers.",
  },
};

// ---------- localStorage helpers ----------
const STORAGE_KEY = 'sunflower-birthday-data-v2';

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Merge: for arrays/objects, prefer stored value if present
      return { ...DEFAULTS, ...parsed };
    }
  } catch {
    // ignore
  }
  return DEFAULTS;
}

// ---------- Confetti ----------
function launchConfetti() {
  const colors = ['#f4c430', '#e6a817', '#f2c4cf', '#fef9e7', '#9ab73a'];
  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:100;overflow:hidden;';
  document.body.appendChild(container);

  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const isCircle = Math.random() > 0.5;
    piece.className = 'confetti-piece';
    piece.style.cssText = `
      left: ${Math.random() * 100}%;
      background: ${color};
      width: ${8 + Math.random() * 8}px;
      height: ${8 + Math.random() * 8}px;
      ${isCircle ? 'border-radius: 50%;' : 'border-radius: 2px;'}
      animation-duration: ${2 + Math.random() * 2}s;
      animation-delay: ${Math.random() * 0.5}s;
    `;
    container.appendChild(piece);
  }

  setTimeout(() => container.remove(), 5000);
}

// ---------- App ----------
export default function App() {
  const [state, setState] = useState(loadState);
  const pauseMusicRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  // Scroll-triggered fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [state]);

  const update = useCallback(<K extends keyof typeof state>(key: K, value: (typeof state)[K]) => {
    setState((prev: typeof state) => ({ ...prev, [key]: value }));
  }, []);

  const handleSurprise = () => {
    launchConfetti();
    setTimeout(() => {
      document.getElementById('friendship')?.scrollIntoView({ behavior: 'smooth' });
    }, 800);
  };

  // Cross-component: pause music when a video opens
  const pauseMusic = useCallback(() => {
    pauseMusicRef.current?.();
  }, []);

  return (
    <div className="paper-bg min-h-screen">
      <Navbar />
      <Hero
        name={state.name}
        onNameChange={(v) => update('name', v)}
        onSurprise={handleSurprise}
      />
      <Friendship
        nicknames={state.nicknames}
        onNicknamesChange={(v) => update('nicknames', v)}
        messages={state.messages}
        onMessagesChange={(v) => update('messages', v)}
      />
      <Letter
        letter={state.letter}
        onLetterChange={(v) => update('letter', v)}
      />
      <Poetry
        poems={state.poems}
        onPoemsChange={(v) => update('poems', v)}
      />
      <October
        birthDate={state.birthDate}
        onBirthDateChange={(v) => update('birthDate', v)}
        octoberMessage={state.octoberMessage}
        onOctoberMessageChange={(v) => update('octoberMessage', v)}
        traits={state.traits}
        onTraitsChange={(v) => update('traits', v)}
      />
      <Memories
        memories={state.memories}
        onMemoriesChange={(v) => update('memories', v)}
      />
      <MusicPlayer
        songs={state.songs}
        registerPauseFn={(fn) => { pauseMusicRef.current = fn; }}
      />
      <VideoStage
        videos={state.videos}
        onPauseAudio={pauseMusic}
      />
      <PoetryCollection
        poems={state.poemCollection}
      />
      <PhotoGallery
        photos={state.photos}
        onPhotosChange={(v) => update('photos', v)}
      />
      <BirthdayCake name={state.name} />
      <SurpriseGift
        gift={state.gift}
        onGiftChange={(v) => update('gift', v)}
      />
      <SecretMessage
        secretMessage={state.secretMessage}
        onSecretMessageChange={(v) => update('secretMessage', v)}
      />
      <FireworksFinale
        name={state.name}
        finalWish={state.finalWish}
        onFinalWishChange={(v) => update('finalWish', v)}
      />
      <Footer name={state.name} />
    </div>
  );
}
