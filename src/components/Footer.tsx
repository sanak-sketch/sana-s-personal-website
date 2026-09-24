import React from 'react';
import { siteConfig } from '../content';
import { Mail, Instagram, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-[#E8E8E8] bg-white py-12 text-center">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 flex flex-col items-center justify-center space-y-4">
        
        {/* Tiny line in Caveat */}
        <p className="font-hand text-2xl sm:text-3xl text-[#6B655E] tracking-wide select-none">
          {siteConfig.footerQuote}
        </p>

        {/* Links for Instagram and Email */}
        <div className="flex items-center justify-center gap-6 text-sm font-heading text-[#6B655E]">
          <a
            href={`mailto:${siteConfig.email}`}
            className="wavy-link flex items-center gap-1.5 hover:text-[#C8674A] transition-colors py-1"
            aria-label="Send Email to Sana"
          >
            <Mail size={16} strokeWidth={1.8} />
            <span>Email</span>
          </a>

          <span className="text-[#E8E8E8]">·</span>

          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="wavy-link flex items-center gap-1.5 hover:text-[#C8674A] transition-colors py-1"
            aria-label="Instagram Profile"
          >
            <Instagram size={16} strokeWidth={1.8} />
            <span>Instagram</span>
          </a>

          <span className="text-[#E8E8E8]">·</span>

          <button
            type="button"
            onClick={scrollToTop}
            className="wavy-link flex items-center gap-1 hover:text-[#C8674A] transition-colors py-1 cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp size={14} strokeWidth={1.8} />
            <span>Top</span>
          </button>
        </div>

        {/* Copyright notice */}
        <p className="text-xs text-[#6B655E] tracking-wider pt-2">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>

      </div>
    </footer>
  );
};
