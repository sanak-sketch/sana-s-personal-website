import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScrollRowProps {
  title: string;
  viewAllHref: string;
  onViewAllClick: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const ScrollRow: React.FC<ScrollRowProps> = ({
  title,
  viewAllHref,
  onViewAllClick,
  icon,
  children,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="my-14 sm:my-18">
      {/* Row Header */}
      <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#E7E1D9]">
        <div className="flex items-center gap-2.5">
          {icon && <span className="text-[#C8674A]">{icon}</span>}
          <h2 className="font-heading text-2xl sm:text-3xl text-[#1F1F1F] tracking-wide">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={viewAllHref}
            onClick={(e) => {
              e.preventDefault();
              onViewAllClick();
            }}
            className="wavy-link font-heading text-base sm:text-lg text-[#C8674A] hover:text-[#b4563b] transition-colors"
          >
            View all →
          </a>

          {/* Desktop Left/Right Arrow Buttons */}
          <div className="hidden sm:flex items-center gap-1">
            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`p-1.5 rounded-full border border-[#E7E1D9] transition-all cursor-pointer ${
                canScrollLeft
                  ? 'text-[#1F1F1F] hover:bg-[#E7E1D9]/40 hover:text-[#C8674A]'
                  : 'text-[#6B655E]/30 border-[#E7E1D9]/50 cursor-not-allowed'
              }`}
              aria-label={`Scroll ${title} left`}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`p-1.5 rounded-full border border-[#E7E1D9] transition-all cursor-pointer ${
                canScrollRight
                  ? 'text-[#1F1F1F] hover:bg-[#E7E1D9]/40 hover:text-[#C8674A]'
                  : 'text-[#6B655E]/30 border-[#E7E1D9]/50 cursor-not-allowed'
              }`}
              aria-label={`Scroll ${title} right`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontally scrollable row */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-1 px-1 -mx-1"
        style={{ scrollSnapType: 'x proximity' }}
      >
        {children}
      </div>
    </section>
  );
};
