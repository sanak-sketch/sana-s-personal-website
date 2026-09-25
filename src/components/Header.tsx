import React, { useState, useEffect } from 'react';
import { siteConfig } from '../content';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentRoute: string;
  navigate: (route: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, navigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Updated navigation order: Art · Blogs · Other Things · About
  const navItems = [
    { label: 'Art', route: '/art' },
    { label: 'Blogs', route: '/blogs' },
    { label: 'Other Things', route: '/other-things' },
    { label: 'About', route: '/about' },
    { label: 'Log in', route: '/auth' },
  ];

  const handleNavClick = (route: string) => {
    navigate(route);
    setMobileMenuOpen(false);
  };

  const isActive = (route: string) => {
    if (route === '/') return currentRoute === '/';
    return currentRoute.startsWith(route);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm py-2.5 border-[#E8E8E8] shadow-2xs'
          : 'bg-white py-4 sm:py-5 border-[#E8E8E8]'
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Signature Header Brand - Clickable to Home */}
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('/');
          }}
          className="group flex items-center gap-3 sm:gap-4 select-none cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#C8674A]/40 rounded-lg p-1 -m-1"
          aria-label="Sana F Killiyath - Home"
        >
          {/* Text: Title and Tagline */}
          <div className="flex flex-col justify-center">
            <span
              className={`font-heading tracking-wide text-[#1F1F1F] group-hover:text-[#C8674A] transition-colors duration-200 ${
                isScrolled
                  ? 'text-xl sm:text-2xl leading-none'
                  : 'text-2xl sm:text-3xl leading-tight'
              }`}
            >
              {siteConfig.name}
            </span>
            <span
              className={`font-hand text-[#6B655E] tracking-wide transition-all duration-300 origin-top ${
                isScrolled
                  ? 'h-0 opacity-0 -translate-y-1 overflow-hidden pointer-events-none'
                  : 'h-auto opacity-100 text-base sm:text-lg mt-0.5'
              }`}
            >
              {siteConfig.tagline}
            </span>
          </div>

          {/* Black Cat Illustration: Undistorted, single dimension specified, mix-blend-multiply */}
          <div className="cat-hover-interactive flex items-center justify-center shrink-0">
            <img
              src="/cat-with-tea.png"
              alt="Hand-drawn black cat illustration"
              className={`w-auto object-contain mix-blend-multiply transition-all duration-300 ${
                isScrolled ? 'h-10 sm:h-12' : 'h-14 sm:h-18'
              }`}
            />
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-7 lg:gap-8 font-heading text-lg tracking-wide"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => {
            const active = isActive(item.route);
            return (
              <a
                key={item.route}
                href={`#${item.route}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.route);
                }}
                className={`wavy-link py-1 transition-colors ${
                  active
                    ? 'text-[#C8674A] font-semibold active'
                    : 'text-[#1F1F1F] hover:text-[#C8674A]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1F1F1F] hover:text-[#C8674A] focus:outline-hidden focus:ring-2 focus:ring-[#C8674A]/30 rounded-md transition-colors"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Full-width Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E8E8] bg-white px-6 py-4 shadow-sm transition-all duration-200">
          <nav className="flex flex-col space-y-3 font-heading text-xl">
            {navItems.map((item) => {
              const active = isActive(item.route);
              return (
                <a
                  key={item.route}
                  href={`#${item.route}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.route);
                  }}
                  className={`py-2 px-1 border-b border-[#E8E8E8]/70 transition-colors flex items-center justify-between ${
                    active
                      ? 'text-[#C8674A] font-semibold'
                      : 'text-[#1F1F1F] hover:text-[#C8674A]'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && <span className="font-hand text-sm text-[#C8674A]">●</span>}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
