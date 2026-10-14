import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, X, Video, Film } from 'lucide-react';
import SunflowerDivider from './SunflowerDivider';

export type Video = {
  id: string;
  title: string;
  src: string;
  thumbnail?: string;
};

type VideoStageProps = {
  videos: Video[];
  onPauseAudio?: () => void;
};

export default function VideoStage({ videos, onPauseAudio }: VideoStageProps) {
  const [selected, setSelected] = useState<Video | null>(null);
  const modalRef = useRef<HTMLVideoElement>(null);

  const openVideo = useCallback((video: Video) => {
    onPauseAudio?.();
    setSelected(video);
  }, [onPauseAudio]);

  const closeVideo = useCallback(() => {
    if (modalRef.current) {
      modalRef.current.pause();
    }
    setSelected(null);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!selected) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeVideo();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [selected, closeVideo]);

  return (
    <section id="stage" className="relative py-20 px-4 sm:px-6 paper-bg">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 fade-in">
          <p className="font-parisienne text-lg text-[var(--golden-dark)] mb-2">Chapter Seven</p>
          <h2 className="font-script text-4xl sm:text-5xl text-[var(--brown)] mb-4">
            Her Little Stage
          </h2>
          <SunflowerDivider />
          <p className="font-body text-[var(--brown-light)] max-w-xl mx-auto leading-relaxed">
            A collection of her singing videos. Add video files to{' '}
            <code className="text-xs bg-[var(--golden)]/15 px-1.5 py-0.5 rounded">
              public/assets/videos/
            </code>{' '}
            and list them in the videos array.
          </p>
        </div>

        {videos.length === 0 ? (
          <div className="cream-card rounded-2xl p-10 text-center fade-in shadow-sm">
            <Film className="w-14 h-14 mx-auto text-[var(--golden-dark)]/40 mb-4" strokeWidth={1.1} />
            <h3 className="font-dancing text-2xl text-[var(--golden-dark)] mb-2">
              No Videos Yet
            </h3>
            <p className="font-hand text-lg text-[var(--brown-light)] max-w-md mx-auto leading-relaxed">
              Add video files to the{' '}
              <code className="text-sm bg-[var(--golden)]/15 px-1.5 py-0.5 rounded">
                public/assets/videos/
              </code>{' '}
              folder and add entries to the videos array. The gallery will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <button
                key={video.id}
                onClick={() => openVideo(video)}
                className="group cream-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:scale-[1.02] fade-in text-left"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-[var(--golden)]/30 to-[var(--golden-dark)]/30 overflow-hidden">
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Video className="w-12 h-12 text-[var(--golden-dark)]/40" strokeWidth={1.1} />
                    </div>
                  )}
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-[var(--brown)]/0 group-hover:bg-[var(--brown)]/25 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-[var(--cream)]/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-[var(--golden-dark)] ml-1" fill="currentColor" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
                {/* Title */}
                <div className="p-4">
                  <h3 className="font-dancing text-xl text-[var(--brown)] leading-tight">
                    {video.title}
                  </h3>
                  <p className="font-body text-xs text-[var(--brown-light)] mt-1">
                    Click to play
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal player */}
      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[var(--brown)]/80 backdrop-blur-sm"
          onClick={closeVideo}
        >
          <div
            className="relative w-full max-w-3xl cream-card rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeVideo}
              className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-[var(--cream)]/90 flex items-center justify-center text-[var(--brown)] hover:bg-[var(--cream)] shadow-lg transition-colors"
              aria-label="Close video"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>

            {/* Video */}
            <div className="bg-[var(--brown)]">
              <video
                ref={modalRef}
                src={selected.src}
                controls
                autoPlay
                className="w-full max-h-[70vh]"
              />
            </div>

            {/* Title bar */}
            <div className="p-4 sm:p-5">
              <h3 className="font-dancing text-2xl text-[var(--brown)]">
                {selected.title}
              </h3>
              <p className="font-hand text-base text-[var(--brown-light)] mt-1">
                Press ESC or click outside to close
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
