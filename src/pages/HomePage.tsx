import React from 'react';
import { siteConfig, blogs, artPieces, otherThings, ArtPiece, BlogPost } from '../content';
import { Palette, Feather, Sparkles, BookOpen, Film, Newspaper, Clock, ArrowRight } from 'lucide-react';

interface HomePageProps {
  navigate: (route: string) => void;
  onOpenArtLightbox: (index: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate, onOpenArtLightbox }) => {
  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-8 sm:py-14 animate-in fade-in duration-300">
      
      {/* Hero Section: Two columns on desktop */}
      <section className="mb-14 sm:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Intro text and handwritten welcome */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-4">
            <h1 className="sr-only">{siteConfig.name} - Personal Site</h1>
            <p className="font-body text-2xl sm:text-3xl text-[#1F1F1F] leading-relaxed font-normal">
              {siteConfig.intro}
            </p>
            <div className="pt-2">
              <span className="font-hand text-2xl sm:text-3xl text-[#C8674A] inline-block">
                welcome to my corner of the web ~
              </span>
            </div>
          </div>

          {/* Right Column: Cat sketch large (320-400px wide), gentle floating animation, undistorted */}
          <div className="md:col-span-5 flex items-center justify-center md:justify-end">
            <div className="relative group p-2">
              <img
                src="/cat-with-tea.png"
                alt="Line drawing of a cat lounging with a warm cup of tea"
                className="hero-cat-float w-72 sm:w-80 md:w-[360px] h-auto object-contain mix-blend-multiply select-none"
              />
            </div>
          </div>

        </div>
      </section>

      {/* "Currently" Strip: 3 items (Reading, Watching, Drawing) with Caveat */}
      <section aria-label="Currently active projects and media" className="mb-16">
        <div className="border border-[#E8E8E8] rounded-lg p-5 sm:p-6 bg-white shadow-2xs">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#E8E8E8]">
            <span className="w-2 h-2 rounded-full bg-[#C8674A]"></span>
            <h2 className="font-heading text-lg sm:text-xl text-[#1F1F1F] tracking-wide">
              Currently
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {siteConfig.currently.map((item) => (
              <div key={item.label} className="flex flex-col">
                <span className="font-heading text-xs tracking-widest text-[#6B655E] uppercase mb-1">
                  {item.label}
                </span>
                <span className="font-body text-base text-[#1F1F1F] font-medium leading-snug">
                  {item.value}
                </span>
                {item.detail && (
                  <span className="font-hand text-lg text-[#C8674A] mt-0.5">
                    {item.detail}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wavy Section Divider */}
      <div className="wavy-section-divider my-14 sm:my-18" role="separator" />

      {/* SECTION 1: ART (Responsive Grid: 3 cols desktop, 2 tablet, 1 mobile) */}
      <section className="my-14 sm:my-18">
        <div className="flex items-center justify-between pb-3 mb-8 border-b border-[#E8E8E8]">
          <div className="flex items-center gap-2.5">
            <Palette size={22} className="text-[#C8674A]" strokeWidth={1.8} />
            <h2 className="font-heading text-2xl sm:text-3xl text-[#1F1F1F] tracking-wide">
              Art
            </h2>
          </div>

          <a
            href="#/art"
            onClick={(e) => {
              e.preventDefault();
              navigate('/art');
            }}
            className="wavy-link font-heading text-base sm:text-lg text-[#C8674A] hover:text-[#b4563b] transition-colors"
          >
            View all →
          </a>
        </div>

        {/* 3-column grid for Art cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {artPieces.map((piece: ArtPiece, index: number) => (
            <article
              key={piece.slug}
              onClick={() => onOpenArtLightbox(index)}
              className="sketch-card p-4 flex flex-col justify-between cursor-pointer group"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenArtLightbox(index);
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
                  /* Two intentionally styled "sketch coming soon" tiles with dashed borders */
                  <div className="w-full h-full border border-dashed border-[#E8E8E8] rounded flex flex-col items-center justify-center p-4 text-center">
                    <span className="font-hand text-3xl text-[#6B655E] mb-1 select-none">
                      sketch coming soon
                    </span>
                    <span className="font-heading text-xs uppercase tracking-widest text-[#6B655E]/60">
                      {piece.medium}
                    </span>
                  </div>
                )}
              </div>

              {/* Title and metadata */}
              <div className="px-1 flex items-baseline justify-between gap-2">
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl text-[#1F1F1F] group-hover:text-[#C8674A] transition-colors leading-tight">
                    {piece.title}
                  </h3>
                  <p className="font-body text-xs text-[#6B655E]">
                    {piece.medium}
                  </p>
                </div>
                <span className="font-hand text-base text-[#C8674A] shrink-0">
                  {piece.year}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Wavy Section Divider */}
      <div className="wavy-section-divider my-14 sm:my-18" role="separator" />

      {/* SECTION 2: BLOGS (3-column grid with soft hover lift) */}
      <section className="my-14 sm:my-18">
        <div className="flex items-center justify-between pb-3 mb-8 border-b border-[#E8E8E8]">
          <div className="flex items-center gap-2.5">
            <Feather size={20} className="text-[#C8674A]" strokeWidth={1.8} />
            <h2 className="font-heading text-2xl sm:text-3xl text-[#1F1F1F] tracking-wide">
              Blogs
            </h2>
          </div>

          <a
            href="#/blogs"
            onClick={(e) => {
              e.preventDefault();
              navigate('/blogs');
            }}
            className="wavy-link font-heading text-base sm:text-lg text-[#C8674A] hover:text-[#b4563b] transition-colors"
          >
            View all →
          </a>
        </div>

        {/* 3-column grid for Blogs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {blogs.map((post: BlogPost) => (
            <article
              key={post.slug}
              onClick={() => navigate(`/blogs/${post.slug}`)}
              className="sketch-card p-6 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#6B655E] mb-3">
                  <span className="font-heading uppercase tracking-wider text-[#C8674A] bg-[#FAF5F2] px-2.5 py-0.5 rounded-sm border border-[#C8674A]/15">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 font-body text-xs">
                    <Clock size={12} />
                    {post.readingTime}
                  </span>
                </div>

                <h3 className="font-heading text-2xl text-[#1F1F1F] group-hover:text-[#C8674A] transition-colors leading-snug line-clamp-2 mb-2.5">
                  {post.title}
                </h3>

                <p className="font-body text-[15px] text-[#6B655E] line-clamp-3 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8E8E8] flex items-center justify-between text-xs">
                <span className="text-[#6B655E] font-body">{post.date}</span>
                <span className="font-heading text-[#C8674A] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read <ArrowRight size={13} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Wavy Section Divider */}
      <div className="wavy-section-divider my-14 sm:my-18" role="separator" />

      {/* SECTION 3: OTHER THINGS (3-column grid) */}
      <section className="my-14 sm:my-18">
        <div className="flex items-center justify-between pb-3 mb-8 border-b border-[#E8E8E8]">
          <div className="flex items-center gap-2.5">
            <Sparkles size={20} className="text-[#C8674A]" strokeWidth={1.8} />
            <h2 className="font-heading text-2xl sm:text-3xl text-[#1F1F1F] tracking-wide">
              Other Things
            </h2>
          </div>

          <a
            href="#/other-things"
            onClick={(e) => {
              e.preventDefault();
              navigate('/other-things');
            }}
            className="wavy-link font-heading text-base sm:text-lg text-[#C8674A] hover:text-[#b4563b] transition-colors"
          >
            View all →
          </a>
        </div>

        {/* 3-column grid for Other Things */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {otherThings.map((item) => (
            <article
              key={item.slug}
              onClick={() => navigate(`/other-things/${item.slug}`)}
              className="sketch-card p-6 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#6B655E] mb-3">
                  <span className="font-heading uppercase tracking-wider text-[#C8674A] bg-[#FAF5F2] px-2.5 py-0.5 rounded-sm border border-[#C8674A]/15 flex items-center gap-1">
                    {item.type === 'book' && <BookOpen size={12} />}
                    {item.type === 'movie' && <Film size={12} />}
                    {item.type === 'blog' && <Newspaper size={12} />}
                    {item.type}
                  </span>

                  {item.rating && (
                    <span className="text-[#C8674A] text-sm tracking-widest select-none">
                      {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                    </span>
                  )}
                </div>

                <h3 className="font-heading text-2xl text-[#1F1F1F] group-hover:text-[#C8674A] transition-colors leading-snug line-clamp-2 mb-1.5">
                  {item.title}
                </h3>

                {item.subject && (
                  <p className="font-hand text-lg text-[#6B655E] mb-2">
                    {item.subject} {item.creator && `· by ${item.creator}`}
                  </p>
                )}

                <p className="font-body text-[15px] text-[#6B655E] line-clamp-3 leading-relaxed mb-4">
                  {item.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8E8E8] flex items-center justify-between text-xs">
                <span className="text-[#6B655E] font-body">{item.date}</span>
                <span className="font-heading text-[#C8674A] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read note <ArrowRight size={13} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
};
