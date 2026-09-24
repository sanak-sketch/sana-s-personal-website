import React, { useEffect } from 'react';
import { ArtPiece } from '../content';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  pieces: ArtPiece[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  pieces,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + pieces.length) % pieces.length);
      } else if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % pieces.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, currentIndex, pieces.length, onClose, onNavigate]);

  if (!isOpen || pieces.length === 0) return null;

  const currentPiece = pieces[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + pieces.length) % pieces.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % pieces.length);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={currentPiece.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F1F1F]/75 backdrop-blur-xs p-4 sm:p-6 transition-opacity duration-200"
      onClick={onClose}
    >
      {/* Lightbox Modal Content - Pure White Background */}
      <div
        className="relative max-w-4xl w-full bg-white border border-[#E8E8E8] rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar with close button & count */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-[#E8E8E8] bg-white">
          <span className="font-heading text-sm text-[#6B655E] tracking-wider">
            {currentIndex + 1} of {pieces.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#1F1F1F] hover:text-[#C8674A] hover:bg-[#E8E8E8]/50 rounded-full transition-colors cursor-pointer"
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>
        </div>

        {/* Artwork Display Area */}
        <div className="relative flex-1 min-h-[280px] sm:min-h-[440px] max-h-[65vh] flex items-center justify-center p-6 bg-white">
          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white hover:bg-[#FAF5F2] text-[#1F1F1F] hover:text-[#C8674A] border border-[#E8E8E8] shadow-xs transition-all cursor-pointer"
            aria-label="Previous artwork"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white hover:bg-[#FAF5F2] text-[#1F1F1F] hover:text-[#C8674A] border border-[#E8E8E8] shadow-xs transition-all cursor-pointer"
            aria-label="Next artwork"
          >
            <ChevronRight size={22} />
          </button>

          {/* Art Piece Content: Aspect Ratio Preserved, mix-blend-multiply */}
          {currentPiece.image ? (
            <div className="flex items-center justify-center p-4">
              <img
                src={currentPiece.image}
                alt={currentPiece.title}
                className="max-h-[55vh] max-w-full w-auto h-auto object-contain mix-blend-multiply select-none"
              />
            </div>
          ) : (
            <div className="w-full max-w-md h-64 sm:h-80 border-2 border-dashed border-[#E8E8E8] rounded-md flex flex-col items-center justify-center p-8 text-center bg-white">
              <span className="font-hand text-3xl sm:text-4xl text-[#6B655E] mb-2 select-none">
                sketch coming soon
              </span>
              <span className="text-xs text-[#6B655E]/70 font-heading tracking-widest uppercase">
                {currentPiece.medium} · {currentPiece.year}
              </span>
            </div>
          )}
        </div>

        {/* Artwork details footer */}
        <div className="px-6 py-4 border-t border-[#E8E8E8] bg-white flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h3 className="font-heading text-2xl text-[#1F1F1F]">
              {currentPiece.title}
            </h3>
            {currentPiece.description && (
              <p className="text-sm font-body text-[#6B655E] mt-1">
                {currentPiece.description}
              </p>
            )}
          </div>
          <div className="font-hand text-lg text-[#C8674A] shrink-0">
            {currentPiece.medium} · {currentPiece.year}
          </div>
        </div>
      </div>
    </div>
  );
};
