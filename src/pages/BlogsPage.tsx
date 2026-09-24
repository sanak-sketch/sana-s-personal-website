import React from 'react';
import { blogs, BlogPost } from '../content';
import { ArrowLeft, ArrowRight, Clock, Tag } from 'lucide-react';

interface BlogsPageProps {
  currentSlug?: string;
  navigate: (route: string) => void;
}

export const BlogsPage: React.FC<BlogsPageProps> = ({ currentSlug, navigate }) => {
  // If a slug is provided, render reading detail view
  if (currentSlug) {
    const currentIndex = blogs.findIndex((b) => b.slug === currentSlug);
    const post = blogs[currentIndex] || blogs[0];
    const nextPost = blogs[(currentIndex + 1) % blogs.length];

    return (
      <main className="max-w-[680px] mx-auto px-4 sm:px-6 py-8 sm:py-14 animate-in fade-in duration-200">
        {/* Back Link */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate('/blogs')}
            className="wavy-link inline-flex items-center gap-1.5 font-heading text-lg text-[#C8674A] hover:text-[#b4563b] transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back to blogs</span>
          </button>
        </div>

        {/* Post Header */}
        <header className="mb-8 pb-6 border-b border-[#E8E8E8]">
          <div className="flex items-center gap-3 text-xs sm:text-sm text-[#6B655E] mb-3">
            <span className="font-heading uppercase tracking-wider text-[#C8674A] bg-[#FAF5F2] px-2.5 py-0.5 rounded-sm border border-[#C8674A]/15">
              {post.category}
            </span>
            <span>·</span>
            <span className="font-body">{post.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1 font-body">
              <Clock size={13} />
              {post.readingTime}
            </span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#1F1F1F] leading-tight mb-4">
            {post.title}
          </h1>

          <p className="font-body italic text-lg sm:text-xl text-[#6B655E] leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* Post Body */}
        <article className="font-body text-[#1F1F1F] text-[18px] leading-[1.7] space-y-6">
          {post.quote && (
            <blockquote className="my-8 pl-5 border-l-2 border-[#C8674A] italic text-[#6B655E] font-body text-xl bg-[#FAF5F2] py-3 pr-4 rounded-r">
              "{post.quote.text}"
              <footer className="not-italic font-hand text-base text-[#1F1F1F] mt-2">
                — {post.quote.author}
              </footer>
            </blockquote>
          )}

          {post.body.map((paragraph, idx) => (
            <p key={idx} className="tracking-normal">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Bottom Navigation */}
        <nav aria-label="Blog post navigation" className="mt-14 pt-8 border-t border-[#E8E8E8] flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate('/blogs')}
            className="wavy-link inline-flex items-center gap-1.5 font-heading text-base text-[#6B655E] hover:text-[#C8674A] cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>All blogs</span>
          </button>

          {nextPost && nextPost.slug !== post.slug && (
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                navigate(`/blogs/${nextPost.slug}`);
              }}
              className="wavy-link inline-flex items-center gap-1.5 font-heading text-base text-[#C8674A] hover:text-[#b4563b] cursor-pointer"
            >
              <span>Next: {nextPost.title}</span>
              <ArrowRight size={16} />
            </button>
          )}
        </nav>
      </main>
    );
  }

  // Otherwise render Blog List View
  return (
    <main className="max-w-[1100px] mx-auto px-4 sm:px-6 py-8 sm:py-14 animate-in fade-in duration-200">
      
      {/* Page Header */}
      <header className="max-w-[680px] mb-12">
        <h1 className="font-heading text-4xl sm:text-5xl text-[#1F1F1F] mb-3">
          Blogs
        </h1>
        <p className="font-body text-lg text-[#6B655E] leading-relaxed">
          Writings on everyday rituals, sketchbooks, slow mornings, and personal observations.
        </p>
      </header>

      {/* Blogs List */}
      <section aria-label="Blog posts list" className="max-w-[840px] space-y-6">
        {blogs.map((post: BlogPost) => (
          <article
            key={post.slug}
            onClick={() => navigate(`/blogs/${post.slug}`)}
            className="sketch-card p-6 sm:p-7 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#6B655E] mb-2.5">
                <span className="font-heading uppercase tracking-wider text-[#C8674A] bg-[#FAF5F2] px-2 py-0.5 rounded-sm border border-[#C8674A]/15 flex items-center gap-1">
                  <Tag size={11} />
                  {post.category}
                </span>
                <span>·</span>
                <span className="font-body">{post.date}</span>
                <span>·</span>
                <span className="flex items-center gap-1 font-body">
                  <Clock size={12} />
                  {post.readingTime}
                </span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl text-[#1F1F1F] group-hover:text-[#C8674A] transition-colors leading-snug mb-2.5">
                {post.title}
              </h2>

              <p className="font-body text-[17px] text-[#6B655E] leading-relaxed mb-4">
                {post.excerpt}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#E8E8E8] text-sm">
              <span className="font-hand text-base text-[#6B655E]">
                {post.category} entry
              </span>
              <span className="font-heading text-[#C8674A] group-hover:translate-x-1.5 transition-transform flex items-center gap-1">
                Read post <ArrowRight size={15} />
              </span>
            </div>
          </article>
        ))}
      </section>

    </main>
  );
};
