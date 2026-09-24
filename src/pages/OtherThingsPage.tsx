import React, { useState } from 'react';
import { otherThings, OtherThing } from '../content';
import { ArrowLeft, ArrowRight, BookOpen, Film, Newspaper, Star } from 'lucide-react';

interface OtherThingsPageProps {
  currentSlug?: string;
  navigate: (route: string) => void;
}

type FilterType = 'all' | 'blog' | 'book' | 'movie';

export const OtherThingsPage: React.FC<OtherThingsPageProps> = ({
  currentSlug,
  navigate,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Detail reading view if slug is present
  if (currentSlug) {
    const currentIndex = otherThings.findIndex((item) => item.slug === currentSlug);
    const item = otherThings[currentIndex] || otherThings[0];
    const nextItem = otherThings[(currentIndex + 1) % otherThings.length];

    return (
      <main className="max-w-[680px] mx-auto px-4 sm:px-6 py-8 sm:py-14 animate-in fade-in duration-200">
        {/* Back Link */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate('/other-things')}
            className="wavy-link inline-flex items-center gap-1.5 font-heading text-lg text-[#C8674A] hover:text-[#b4563b] transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back to other things</span>
          </button>
        </div>

        {/* Header */}
        <header className="mb-8 pb-6 border-b border-[#E8E8E8]">
          <div className="flex items-center gap-3 text-xs sm:text-sm text-[#6B655E] mb-3">
            <span className="font-heading uppercase tracking-wider text-[#C8674A] bg-[#FAF5F2] px-2.5 py-0.5 rounded-sm border border-[#C8674A]/15 flex items-center gap-1">
              {item.type === 'book' && <BookOpen size={13} />}
              {item.type === 'movie' && <Film size={13} />}
              {item.type === 'blog' && <Newspaper size={13} />}
              {item.type}
            </span>
            <span>·</span>
            <span className="font-body">{item.date}</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#1F1F1F] leading-tight mb-3">
            {item.title}
          </h1>

          {/* Review Details if book or movie */}
          {(item.subject || item.rating) && (
            <div className="p-4 bg-white border border-[#E8E8E8] rounded-md my-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                {item.subject && (
                  <span className="font-heading text-lg text-[#1F1F1F] block">
                    {item.subject}
                  </span>
                )}
                {item.creator && (
                  <span className="font-hand text-base text-[#6B655E]">
                    {item.type === 'book' ? 'Author' : 'Director'}: {item.creator}
                  </span>
                )}
              </div>

              {item.rating && (
                <div className="flex items-center gap-1 text-[#C8674A]" aria-label={`${item.rating} out of 5 stars`}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      className={star <= item.rating! ? 'fill-[#C8674A] text-[#C8674A]' : 'text-[#E8E8E8]'}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          <p className="font-body italic text-lg text-[#6B655E] leading-relaxed">
            {item.excerpt}
          </p>
        </header>

        {/* Body Paragraphs */}
        <article className="font-body text-[#1F1F1F] text-[18px] leading-[1.7] space-y-6">
          {item.body.map((paragraph, idx) => (
            <p key={idx} className="tracking-normal">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Bottom Navigation */}
        <nav aria-label="Other things navigation" className="mt-14 pt-8 border-t border-[#E8E8E8] flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate('/other-things')}
            className="wavy-link inline-flex items-center gap-1.5 font-heading text-base text-[#6B655E] hover:text-[#C8674A] cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>All notes & reviews</span>
          </button>

          {nextItem && nextItem.slug !== item.slug && (
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                navigate(`/other-things/${nextItem.slug}`);
              }}
              className="wavy-link inline-flex items-center gap-1.5 font-heading text-base text-[#C8674A] hover:text-[#b4563b] cursor-pointer"
            >
              <span>Next: {nextItem.title}</span>
              <ArrowRight size={16} />
            </button>
          )}
        </nav>
      </main>
    );
  }

  // Filter items
  const filteredItems =
    activeFilter === 'all'
      ? otherThings
      : otherThings.filter((item) => item.type === activeFilter);

  const filterButtons: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Blog', value: 'blog' },
    { label: 'Book', value: 'book' },
    { label: 'Movie', value: 'movie' },
  ];

  return (
    <main className="max-w-[1100px] mx-auto px-4 sm:px-6 py-8 sm:py-14 animate-in fade-in duration-200">
      
      {/* Page Header */}
      <header className="max-w-[680px] mb-8">
        <h1 className="font-heading text-4xl sm:text-5xl text-[#1F1F1F] mb-3">
          Other Things
        </h1>
        <p className="font-body text-lg text-[#6B655E] leading-relaxed">
          Shorter reflections, personal blogs, and marginalia on books and films.
        </p>
      </header>

      {/* Filter Chips: All · Blog · Book · Movie */}
      <div className="flex flex-wrap items-center gap-2.5 mb-10" role="toolbar" aria-label="Filter content by type">
        {filterButtons.map((btn) => {
          const isActive = activeFilter === btn.value;
          return (
            <button
              key={btn.value}
              type="button"
              onClick={() => setActiveFilter(btn.value)}
              className={`px-4 py-1.5 rounded-full font-heading text-base transition-all cursor-pointer border ${
                isActive
                  ? 'bg-[#C8674A] text-white border-[#C8674A] shadow-xs'
                  : 'bg-white text-[#1F1F1F] border-[#E8E8E8] hover:border-[#C8674A]/60 hover:text-[#C8674A]'
              }`}
            >
              {btn.label}
            </button>
          );
        })}
      </div>

      {/* Cards List */}
      <section aria-label="Notes and reviews list" className="max-w-[840px] space-y-6">
        {filteredItems.length === 0 ? (
          <div className="p-8 border border-dashed border-[#E8E8E8] rounded-md text-center">
            <p className="font-hand text-2xl text-[#6B655E]">
              No entries in this category yet.
            </p>
          </div>
        ) : (
          filteredItems.map((item: OtherThing) => (
            <article
              key={item.slug}
              onClick={() => navigate(`/other-things/${item.slug}`)}
              className="sketch-card p-6 sm:p-7 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#6B655E] mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-heading uppercase tracking-wider text-[#C8674A] bg-[#FAF5F2] px-2 py-0.5 rounded-sm border border-[#C8674A]/15 flex items-center gap-1">
                      {item.type === 'book' && <BookOpen size={11} />}
                      {item.type === 'movie' && <Film size={11} />}
                      {item.type === 'blog' && <Newspaper size={11} />}
                      {item.type}
                    </span>
                    <span>·</span>
                    <span className="font-body">{item.date}</span>
                  </div>

                  {item.rating && (
                    <span className="text-[#C8674A] text-sm tracking-widest select-none">
                      {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                    </span>
                  )}
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl text-[#1F1F1F] group-hover:text-[#C8674A] transition-colors leading-snug mb-1.5">
                  {item.title}
                </h2>

                {item.subject && (
                  <p className="font-hand text-lg text-[#6B655E] mb-2">
                    {item.subject} {item.creator && `· ${item.creator}`}
                  </p>
                )}

                <p className="font-body text-[17px] text-[#6B655E] leading-relaxed mb-4">
                  {item.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#E8E8E8] text-sm">
                <span className="font-hand text-base text-[#6B655E]">
                  {item.type === 'blog' ? 'Journal note' : 'Review & critique'}
                </span>
                <span className="font-heading text-[#C8674A] group-hover:translate-x-1.5 transition-transform flex items-center gap-1">
                  Read note <ArrowRight size={15} />
                </span>
              </div>
            </article>
          ))
        )}
      </section>

    </main>
  );
};
