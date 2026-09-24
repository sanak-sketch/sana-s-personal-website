import React from 'react';
import { artPieces, ArtPiece } from '../content';

interface ArtPageProps {
  onOpenLightbox: (index: number) => void;
}

export const ArtPage: React.FC<ArtPageProps> = ({ onOpenLightbox }) => {
  return (
    <main className="max-w-[1100px] mx-auto px-4 sm:px-6 py-8 sm:py-14 animate-in fade-in duration-200">
      
      {/* Page Header */}
      <header className="max-w-[680px] mb-10">
        <h1 className="font-heading text-4xl sm:text-5xl text-[#1F1F1F] mb-3">
          Art & Sketches
        </h1>
        <p className="font-body text-lg text-[#6B655E] leading-relaxed">
          Original drawings, ink studies, and visual notes. Click any work to view in full size.
        </p>
      </header>

      {/* Art Gallery Grid: 3 columns desktop, 2 tablet, 1 mobile */}
      <section aria-label="Art gallery" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {artPieces.map((piece: ArtPiece, index: number) => (
          <article
            key={piece.slug}
            onClick={() => onOpenLightbox(index)}
            className="sketch-card p-4 flex flex-col justify-between cursor-pointer group"
            tabIndex={0}
            role="button"
            aria-label={`View ${piece.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenLightbox(index);
              }
            }}
          >
            {/* Artwork Frame: object-contain, mix-blend-multiply, aspect ratio preserved */}
            <div className="w-full h-64 sm:h-72 bg-white rounded-md border border-[#E8E8E8] flex items-center justify-center overflow-hidden mb-4 p-4">
              {piece.image ? (
                <img
                  src={piece.image}
                  alt={piece.title}
                  className="max-h-full max-w-full w-auto h-auto object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105 select-none"
                />
              ) : (
                /* Intentional placeholder frame with 'sketch coming soon' in Caveat */
                <div className="w-full h-full border border-dashed border-[#E8E8E8] rounded flex flex-col items-center justify-center p-4 text-center">
                  <span className="font-hand text-3xl text-[#6B655E] select-none mb-1">
                    sketch coming soon
                  </span>
                  <span className="font-heading text-xs tracking-widest text-[#6B655E]/60 uppercase">
                    {piece.medium}
                  </span>
                </div>
              )}
            </div>

            {/* Artwork Info Underneath */}
            <div className="px-1 flex items-baseline justify-between gap-2">
              <div>
                <h2 className="font-heading text-xl sm:text-2xl text-[#1F1F1F] group-hover:text-[#C8674A] transition-colors leading-snug">
                  {piece.title}
                </h2>
                <p className="font-body text-xs sm:text-sm text-[#6B655E]">
                  {piece.medium}
                </p>
              </div>
              <span className="font-hand text-base text-[#C8674A] shrink-0">
                {piece.year}
              </span>
            </div>
          </article>
        ))}
      </section>

    </main>
  );
};
