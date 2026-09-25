import React from 'react';
import { siteConfig } from '../content';
import { Mail, Instagram, ArrowUpRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <main className="max-w-[680px] mx-auto px-4 sm:px-6 py-8 sm:py-14 animate-in fade-in duration-200">
      
      {/* Header */}
      <header className="mb-8 pb-4">
        <h1 className="font-heading text-4xl sm:text-5xl text-[#1F1F1F] mb-3">
          {siteConfig.aboutTitle}
        </h1>
        <p className="font-hand text-2xl text-[#C8674A]">
          illustrator, slow reader, and tea enthusiast
        </p>
      </header>

      {/* Black Cat Illustration Visual: Undistorted, mix-blend-multiply */}
      <div className="my-8 py-7 px-4 bg-white border border-[#E8E8E8] rounded-lg flex flex-col items-center justify-center text-center shadow-2xs">
        <div className="cat-hover-interactive flex items-center justify-center mb-3">
          <img
            src="/cat-with-tea.png"
            alt="Hand-drawn black cat illustration lounging with a cup of tea"
            className="h-28 sm:h-36 w-auto object-contain mix-blend-multiply"
          />
        </div>
        <p className="font-hand text-xl text-[#6B655E]">
          studio companion: steady, warm, and perpetually unbothered
        </p>
      </div>

      {/* Bio Paragraphs */}
      <article className="font-body text-[#1F1F1F] text-[18px] leading-[1.7] space-y-6">
        {siteConfig.aboutBio.map((paragraph, idx) => (
          <p key={idx} className="tracking-normal">
            {paragraph}
          </p>
        ))}
      </article>

      {/* Contact Section */}
      <section className="mt-12 pt-8 border-t border-[#E8E8E8]">
        <h2 className="font-heading text-2xl sm:text-3xl text-[#1F1F1F] mb-4">
          Say Hello
        </h2>
        <p className="font-body text-[#6B655E] text-[17px] leading-relaxed mb-6">
          I always welcome correspondence regarding book or movie recommendations, interesting thoughts, or notes on sketches.
        </p>

        <div className="space-y-3 font-heading text-lg">
          <a
            href={`mailto:${siteConfig.email}`}
            className="wavy-link flex items-center gap-2 text-[#1F1F1F] hover:text-[#C8674A] py-1 max-w-fit"
          >
            <Mail size={18} className="text-[#C8674A]" />
            <span>{siteConfig.email}</span>
            <ArrowUpRight size={15} className="text-[#6B655E]" />
          </a>

          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="wavy-link flex items-center gap-2 text-[#1F1F1F] hover:text-[#C8674A] py-1 max-w-fit"
          >
            <Instagram size={18} className="text-[#C8674A]" />
            <span>Instagram: @sana_killiyath</span>
            <ArrowUpRight size={15} className="text-[#6B655E]" />
          </a>
        </div>
      </section>

      {/* Colophon Note */}
      <section className="mt-12 pt-6 border-t border-dashed border-[#E8E8E8] text-xs font-body text-[#6B655E] space-y-2">
        <p>
          <strong className="font-heading text-sm text-[#1F1F1F]">Colophon:</strong> Typeset in Patrick Hand SC, Caveat, and Lora. Pure white paper with light-grey borders and warm terracotta accents.
        </p>
      </section>

    </main>
  );
};
