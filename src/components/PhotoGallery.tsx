import { useState, useRef, useCallback } from 'react';
import { Upload, X, ImageIcon, ZoomIn } from 'lucide-react';
import SunflowerDivider from './SunflowerDivider';

export type Photo = {
  id: string;
  src: string;
  caption: string;
};

type PhotoGalleryProps = {
  photos: Photo[];
  onPhotosChange: (v: Photo[]) => void;
};

export default function PhotoGallery({ photos, onPhotosChange }: PhotoGalleryProps) {
  const [lightbox, setLightbox] = useState<Photo | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        if (src) {
          onPhotosChange([
            ...photos,
            {
              id: `photo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
              src,
              caption: file.name.replace(/\.[^/.]+$/, ''),
            },
          ]);
        }
      };
      reader.readAsDataURL(file);
    });
  }, [photos, onPhotosChange]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const removePhoto = (id: string) => {
    onPhotosChange(photos.filter((p) => p.id !== id));
    if (lightbox?.id === id) setLightbox(null);
  };

  const updateCaption = (id: string, caption: string) => {
    onPhotosChange(photos.map((p) => (p.id === id ? { ...p, caption } : p)));
  };

  return (
    <section id="gallery" className="relative py-20 px-4 sm:px-6 paper-bg">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 fade-in">
          <p className="font-parisienne text-lg text-[var(--golden-dark)] mb-2">Chapter Nine</p>
          <h2 className="font-script text-4xl sm:text-5xl text-[var(--brown)] mb-4">
            Photo &amp; Memory Gallery
          </h2>
          <SunflowerDivider />
          <p className="font-body text-[var(--brown-light)] max-w-xl mx-auto leading-relaxed">
            Upload your favourite photos and add captions. They'll be saved right in your
            browser. You can also place images in{' '}
            <code className="text-xs bg-[var(--golden)]/15 px-1.5 py-0.5 rounded">
              public/assets/images/
            </code>{' '}
            and add them in the code.
          </p>
        </div>

        {/* Upload zone */}
        <div
          className={`cream-card rounded-2xl p-6 mb-8 fade-in shadow-sm transition-all ${
            dragOver ? 'ring-2 ring-[var(--golden-dark)] bg-[var(--golden)]/10' : ''
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--golden)] to-[var(--golden-dark)] text-[var(--brown)] font-body font-semibold shadow-md hover:scale-105 active:scale-95 transition-transform shrink-0"
            >
              <Upload className="w-5 h-5" strokeWidth={1.8} />
              Choose Photos
            </button>
            <p className="font-hand text-lg text-[var(--brown-light)] text-center sm:text-left">
              or drag and drop image files here
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
            />
          </div>
        </div>

        {/* Photo grid */}
        {photos.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group relative cream-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all fade-in"
              >
                <div
                  className="relative aspect-square overflow-hidden cursor-pointer bg-[var(--beige)]"
                  onClick={() => setLightbox(photo)}
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[var(--brown)]/0 group-hover:bg-[var(--brown)]/20 transition-colors flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-[var(--cream)] opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.3} />
                  </div>
                </div>
                <div className="p-3">
                  <input
                    type="text"
                    value={photo.caption}
                    onChange={(e) => updateCaption(photo.id, e.target.value)}
                    placeholder="Add a caption..."
                    className="w-full bg-transparent border-none outline-none font-hand text-lg text-[var(--brown)] text-center"
                  />
                </div>
                <button
                  onClick={() => removePhoto(photo.id)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[var(--cream)]/90 flex items-center justify-center text-[var(--brown-light)] hover:text-[var(--brown)] shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove photo"
                >
                  <X className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="cream-card rounded-2xl p-10 text-center fade-in shadow-sm">
            <ImageIcon className="w-14 h-14 mx-auto text-[var(--golden-dark)]/40 mb-4" strokeWidth={1.1} />
            <h3 className="font-dancing text-2xl text-[var(--golden-dark)] mb-2">
              No Photos Yet
            </h3>
            <p className="font-hand text-lg text-[var(--brown-light)] max-w-md mx-auto leading-relaxed">
              Upload photos above or add image files to the{' '}
              <code className="text-sm bg-[var(--golden)]/15 px-1.5 py-0.5 rounded">
                public/assets/images/
              </code>{' '}
              folder and list them in the code.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[var(--brown)]/85 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-3xl max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-[var(--cream)]/90 flex items-center justify-center text-[var(--brown)] hover:bg-[var(--cream)] shadow-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>
            <img
              src={lightbox.src}
              alt={lightbox.caption}
              className="max-w-full max-h-[80vh] rounded-xl shadow-2xl object-contain"
            />
            <p className="font-hand text-xl text-[var(--cream)] text-center mt-3">
              {lightbox.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
