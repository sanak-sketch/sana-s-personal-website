# Sana's Personal Website

A small, illustration-led personal website for Sana F Killiyath — a quiet corner of the web for essays, sketches, books, films, and other things worth keeping notes on.

The site is designed to feel more like an open sketchbook and quiet bookshelf than a conventional portfolio or social feed.

## What's inside

- **Home** — Introduction, current reading/watching/drawing, and highlights from the rest of the site.
- **Art & Sketches** — A gallery of drawings and visual studies with a lightbox.
- **Blogs** — Personal writing, observations, and longer-form notes.
- **Other Things** — Notes on books, films, and miscellaneous things.
- **About** — A little more about me and contact information.

## Design

The website uses a quiet paper-and-ink visual language:

- White background with soft grey borders
- Warm terracotta accents
- Handwritten typography alongside Lora
- Sketch-like details and wavy dividers
- Minimal animations and gentle transitions
- Responsive layouts for desktop, tablet, and mobile
- A recurring cat-with-tea illustration as the site's visual companion

The aim is for the site to feel personal and slightly handmade rather than overly corporate.

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Motion
- Google GenAI SDK

The site currently functions primarily as a client-side React application, with content stored locally rather than retrieved from a database or CMS.

## Project structure

```
src/
├── components/
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Lightbox.tsx
│   └── ScrollRow.tsx
│
├── pages/
│   ├── AboutPage.tsx
│   ├── ArtPage.tsx
│   ├── BlogsPage.tsx
│   ├── HomePage.tsx
│   └── OtherThingsPage.tsx
│
├── App.tsx
├── content.ts
├── index.css
└── main.tsx

public/
├── cat-with-tea.png
└── cat-with-tea.svg
```

Most editable content lives in `src/content.ts`.

## Running locally

```bash
npm install
npm run dev
```

The development server runs on port 3000.

For a production build:

```bash
npm run build
npm run preview
```

Type-check the project with:

```bash
npm run lint
```

## Adding content

Most content can be added without changing the page components.

Add artwork to the `artPieces` collection in `src/content.ts`, blog posts to `blogs`, and books, films, or miscellaneous notes to `otherThings`.

Artwork files can be placed in `public/` and referenced from the content data.

## Routing

The site uses lightweight hash-based routing rather than React Router.

Examples:

```
#/
#/art
#/blogs
#/blogs/example-post
#/other-things
#/other-things/example
#/about
```

## Accessibility & interaction

- Keyboard interaction for artwork cards
- Escape and arrow-key controls in the art lightbox
- ARIA labels on interactive elements
- Responsive navigation
- Reduced-motion support
- Body scrolling is disabled while the lightbox is open

## Status

This is an evolving personal website. Some sections currently contain placeholder material, particularly artwork and writing that will be replaced or expanded over time.

The site is intentionally small. New features should preserve the same feeling: personal, quiet, readable, and a little handmade.

---

Made with tea, ink, and too many tabs open.
