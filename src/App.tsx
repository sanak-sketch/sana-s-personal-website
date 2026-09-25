/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Lightbox } from './components/Lightbox';
import { HomePage } from './pages/HomePage';
import { BlogsPage } from './pages/BlogsPage';
import { ArtPage } from './pages/ArtPage';
import { OtherThingsPage } from './pages/OtherThingsPage';
import { AboutPage } from './pages/AboutPage';
import { AuthPage } from './pages/AuthPage';
import { artPieces } from './content';

export default function App() {
  // Current route parsed from hash (e.g. '/', '/art', '/blogs', '/blogs/slug', '/other-things', '/about')
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  // Sync route with hash
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace(/^#/, '');
      const path = rawHash.startsWith('/') ? rawHash : '/' + rawHash;
      setCurrentRoute(path === '' ? '/' : path);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    if (window.location.hash) {
      handleHashChange();
    } else {
      window.location.hash = '#/';
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Navigation helper
  const navigate = (route: string) => {
    if (route === currentRoute) return;
    setIsTransitioning(true);
    setTimeout(() => {
      window.location.hash = `#${route}`;
      window.scrollTo({ top: 0, behavior: 'instant' });
      setIsTransitioning(false);
    }, 120);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Route matching
  const renderCurrentPage = () => {
    // Check for /blogs/:slug (or legacy /essays/:slug)
    if (currentRoute.startsWith('/blogs/')) {
      const slug = currentRoute.replace('/blogs/', '');
      return <BlogsPage currentSlug={slug} navigate={navigate} />;
    }
    if (currentRoute.startsWith('/essays/')) {
      const slug = currentRoute.replace('/essays/', '');
      return <BlogsPage currentSlug={slug} navigate={navigate} />;
    }

    // Check for /other-things/:slug
    if (currentRoute.startsWith('/other-things/')) {
      const slug = currentRoute.replace('/other-things/', '');
      return <OtherThingsPage currentSlug={slug} navigate={navigate} />;
    }

    switch (currentRoute) {
      case '/art':
        return <ArtPage onOpenLightbox={openLightbox} />;
      case '/blogs':
      case '/essays':
        return <BlogsPage navigate={navigate} />;
      case '/other-things':
        return <OtherThingsPage navigate={navigate} />;
      case '/about':
        return <AboutPage />;
      case '/auth':
        return <AuthPage />;
      case '/':
      default:
        return <HomePage navigate={navigate} onOpenArtLightbox={openLightbox} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1F1F1F]">
      {/* Signature Header */}
      <Header currentRoute={currentRoute} navigate={navigate} />

      {/* Main Page Content with gentle fade on transition */}
      <div
        className={`flex-1 transition-opacity duration-150 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {renderCurrentPage()}
      </div>

      {/* Footer */}
      <Footer />

      {/* Shared Lightbox for Artwork */}
      <Lightbox
        pieces={artPieces}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
}
