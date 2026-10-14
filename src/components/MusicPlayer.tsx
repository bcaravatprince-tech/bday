import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Volume1, Music, Disc3,
} from 'lucide-react';
import SunflowerDivider from './SunflowerDivider';

export type Song = {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover?: string;
};

type MusicPlayerProps = {
  songs: Song[];
  onPlayStateChange?: (isPlaying: boolean) => void;
  registerPauseFn?: (fn: () => void) => void;
};

export default function MusicPlayer({ songs, onPlayStateChange, registerPauseFn }: MusicPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const currentSong = songs[currentIndex];

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
    onPlayStateChange?.(false);
  }, [onPlayStateChange]);

  // Register pause function with parent so videos can pause music
  useEffect(() => {
    if (registerPauseFn) registerPauseFn(() => pause());
  }, [registerPauseFn, pause]);

  const play = useCallback(() => {
    if (!audioRef.current || !currentSong) return;
    audioRef.current.play().then(() => {
      setIsPlaying(true);
      onPlayStateChange?.(true);
    }).catch(() => {
      setIsPlaying(false);
      onPlayStateChange?.(false);
    });
  }, [currentSong, onPlayStateChange]);

  const togglePlay = () => {
    if (!currentSong) return;
    if (isPlaying) pause();
    else play();
  };

  const goNext = () => {
    if (songs.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % songs.length);
  };

  const goPrev = () => {
    if (songs.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const selectSong = (idx: number) => {
    setCurrentIndex(idx);
    setIsPlaying(false);
    onPlayStateChange?.(false);
  };

  // Auto-play when currentIndex changes if was playing
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    setCurrentTime(0);
    setDuration(0);
    if (isPlaying) {
      audioRef.current.load();
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        onPlayStateChange?.(true);
      }).catch(() => {
        setIsPlaying(false);
        onPlayStateChange?.(false);
      });
    } else {
      audioRef.current.load();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // Volume control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  const formatTime = (s: number) => {
    if (!s || isNaN(s)) return '0:00';
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (v > 0) setMuted(false);
  };

  const VolumeIcon = muted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section id="music" className="relative py-20 px-4 sm:px-6 paper-bg">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 fade-in">
          <p className="font-parisienne text-lg text-[var(--golden-dark)] mb-2">Chapter Six</p>
          <h2 className="font-script text-4xl sm:text-5xl text-[var(--brown)] mb-4">
            Her Little Melody Collection
          </h2>
          <SunflowerDivider />
          <p className="font-body text-[var(--brown-light)] max-w-xl mx-auto leading-relaxed">
            Songs that remind me of you. Add your own audio files to{' '}
            <code className="text-xs bg-[var(--golden)]/15 px-1.5 py-0.5 rounded">
              public/assets/songs/
            </code>{' '}
            and list them in the songs array.
          </p>
        </div>

        {songs.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="cream-card rounded-2xl p-5 sm:p-7 fade-in shadow-sm">
            {/* Audio element */}
            <audio
              ref={audioRef}
              src={currentSong?.src}
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              onEnded={() => {
                setIsPlaying(false);
                onPlayStateChange?.(false);
                goNext();
              }}
              onPlay={() => {
                setIsPlaying(true);
                onPlayStateChange?.(true);
              }}
              onPause={() => {
                setIsPlaying(false);
                onPlayStateChange?.(false);
              }}
            />

            {/* Now playing display */}
            <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start mb-5">
              {/* Cover art */}
              <div className="shrink-0">
                {currentSong?.cover ? (
                  <img
                    src={currentSong.cover}
                    alt={currentSong.title}
                    className={`w-32 h-32 sm:w-28 sm:h-28 rounded-xl object-cover shadow-md border-2 border-[var(--golden)]/30 ${isPlaying ? 'sway' : ''}`}
                  />
                ) : (
                  <div className={`w-32 h-32 sm:w-28 sm:h-28 rounded-xl bg-gradient-to-br from-[var(--golden)] to-[var(--golden-dark)] flex items-center justify-center shadow-md border-2 border-[var(--golden)]/30 ${isPlaying ? 'sway' : ''}`}>
                    <Disc3 className="w-12 h-12 text-[var(--brown)]" strokeWidth={1.2} />
                  </div>
                )}
              </div>

              {/* Track info + controls */}
              <div className="flex-1 w-full">
                <div className="text-center sm:text-left mb-3">
                  <p className="font-body text-xs text-[var(--brown-light)] uppercase tracking-wider mb-1">
                    Now Playing
                  </p>
                  <h3 className="font-dancing text-2xl text-[var(--brown)] leading-tight">
                    {currentSong?.title}
                  </h3>
                  <p className="font-hand text-lg text-[var(--golden-dark)]">
                    {currentSong?.artist}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-body text-xs text-[var(--brown-light)] w-10 text-right tabular-nums">
                    {formatTime(currentTime)}
                  </span>
                  <div className="relative flex-1 group">
                    <input
                      type="range"
                      min={0}
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      step={0.1}
                      className="audio-seek-bar w-full"
                      style={{ ['--progress' as string]: `${progressPct}%` }}
                      aria-label="Seek"
                    />
                  </div>
                  <span className="font-body text-xs text-[var(--brown-light)] w-10 tabular-nums">
                    {formatTime(duration)}
                  </span>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center sm:justify-start gap-3 mt-4">
                  <button
                    onClick={goPrev}
                    disabled={songs.length < 2}
                    className="p-2 rounded-full text-[var(--brown)] hover:bg-[var(--golden)]/15 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    aria-label="Previous song"
                  >
                    <SkipBack className="w-5 h-5" fill="currentColor" strokeWidth={1.5} />
                  </button>

                  <button
                    onClick={togglePlay}
                    className="p-3.5 rounded-full bg-gradient-to-r from-[var(--golden)] to-[var(--golden-dark)] text-[var(--brown)] shadow-md hover:scale-110 active:scale-95 transition-transform"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" fill="currentColor" strokeWidth={1.5} />
                    ) : (
                      <Play className="w-6 h-6" fill="currentColor" strokeWidth={1.5} />
                    )}
                  </button>

                  <button
                    onClick={goNext}
                    disabled={songs.length < 2}
                    className="p-2 rounded-full text-[var(--brown)] hover:bg-[var(--golden)]/15 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    aria-label="Next song"
                  >
                    <SkipForward className="w-5 h-5" fill="currentColor" strokeWidth={1.5} />
                  </button>

                  {/* Volume */}
                  <div className="flex items-center gap-1.5 ml-2">
                    <button
                      onClick={() => setMuted(!muted)}
                      className="p-1.5 rounded-full text-[var(--brown)] hover:bg-[var(--golden)]/15 transition-colors"
                      aria-label={muted ? 'Unmute' : 'Mute'}
                    >
                      <VolumeIcon className="w-4 h-4" strokeWidth={1.8} />
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      value={muted ? 0 : volume}
                      onChange={handleVolume}
                      step={0.01}
                      className="audio-volume-bar w-16 sm:w-20"
                      style={{ ['--progress' as string]: `${(muted ? 0 : volume) * 100}%` }}
                      aria-label="Volume"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Playlist */}
            <div className="border-t border-[var(--golden-dark)]/15 pt-4 mt-2">
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-[var(--golden-deep)] mb-3">
                Playlist ({songs.length})
              </p>
              <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
                {songs.map((song, idx) => (
                  <button
                    key={song.id}
                    onClick={() => selectSong(idx)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                      idx === currentIndex
                        ? 'bg-[var(--golden)]/20 ring-1 ring-[var(--golden)]/40'
                        : 'hover:bg-[var(--golden)]/10'
                    }`}
                  >
                    <span className="shrink-0 w-8 flex justify-center">
                      {idx === currentIndex && isPlaying ? (
                        <div className="flex items-end gap-0.5 h-4">
                          <span className="w-0.5 bg-[var(--golden-dark)] rounded-full" style={{ height: '60%', animation: 'eq-bar 0.6s ease-in-out infinite alternate' }} />
                          <span className="w-0.5 bg-[var(--golden-dark)] rounded-full" style={{ height: '100%', animation: 'eq-bar 0.4s ease-in-out infinite alternate', animationDelay: '0.1s' }} />
                          <span className="w-0.5 bg-[var(--golden-dark)] rounded-full" style={{ height: '40%', animation: 'eq-bar 0.5s ease-in-out infinite alternate', animationDelay: '0.2s' }} />
                        </div>
                      ) : (
                        <Music className="w-4 h-4 text-[var(--brown-light)]" strokeWidth={1.5} />
                      )}
                    </span>
                    {song.cover ? (
                      <img src={song.cover} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--golden)] to-[var(--golden-dark)] flex items-center justify-center shrink-0">
                        <Disc3 className="w-5 h-5 text-[var(--brown)]" strokeWidth={1.2} />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className={`font-body text-sm truncate ${idx === currentIndex ? 'text-[var(--golden-deep)] font-semibold' : 'text-[var(--brown)]'}`}>
                        {song.title}
                      </p>
                      <p className="font-body text-xs text-[var(--brown-light)] truncate">
                        {song.artist}
                      </p>
                    </div>
                    {idx === currentIndex && (
                      <span className="font-body text-xs text-[var(--golden-deep)] shrink-0">
                        {isPlaying ? 'Playing' : 'Selected'}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="cream-card rounded-2xl p-10 text-center fade-in shadow-sm">
      <Disc3 className="w-14 h-14 mx-auto text-[var(--golden-dark)]/40 mb-4" strokeWidth={1.1} />
      <h3 className="font-dancing text-2xl text-[var(--golden-dark)] mb-2">
        No Songs Yet
      </h3>
      <p className="font-hand text-lg text-[var(--brown-light)] max-w-md mx-auto leading-relaxed">
        Add audio files to the <code className="text-sm bg-[var(--golden)]/15 px-1.5 py-0.5 rounded">public/assets/songs/</code> folder
        and add entries to the songs array in the code. The player will appear here automatically.
      </p>
    </div>
  );
}
