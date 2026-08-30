import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from '../app/page';

describe('Portfolio Requirements', () => {
  it('TEST A - verifies main content', () => {
    const { container } = render(<Home />);
    expect(screen.getAllByText(/Muhammed Emir Aydın/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Computer Engineering/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Hit\.AI/i).length).toBeGreaterThan(0);

    // Accessibility check for SVG icons in ThemeToggle
    const hiddenSvgs = container.querySelectorAll('svg[aria-hidden="true"]');
    expect(hiddenSvgs.length).toBeGreaterThan(0);
  });

  it('TEST G - verifies hero role text from reviewer feedback', () => {
    render(<Home />);
    expect(screen.getAllByText(/I build AI-assisted web products and turn ideas into working, deployed tools\./i).length).toBeGreaterThan(0);
  });

  it('TEST B - verifies required links exist', () => {
    render(<Home />);
    const linkedinLinks = screen.getAllByRole('link', { name: /linkedin/i });
    expect(linkedinLinks.some(link => link.getAttribute('href') === 'https://www.linkedin.com/in/muhammed-emir-ayd%C4%B1n-305423200/')).toBe(true);

    const githubLinks = screen.getAllByRole('link', { name: /github/i });
    expect(githubLinks.some(link => link.getAttribute('href') === 'https://github.com/aydemir0')).toBe(true);

    const bookingLinks = screen.getAllByRole('link', { name: /book a call/i });
    expect(bookingLinks.some(link => link.getAttribute('href') === 'https://calendar.app.google/bQPjLoWdk7Fq3bHg6')).toBe(true);

    const cvLinks = screen.getAllByRole('link', { name: /cv/i });
    expect(cvLinks.some(link => link.getAttribute('href') === '/Muhammed-Emir-Aydin-CV.pdf')).toBe(true);
  });

  it('TEST C - project integrity', () => {
    render(<Home />);
    const hitAiLinks = screen.getAllByRole('link', { name: /Hit\.AI/i });
    expect(hitAiLinks.some(link => link.getAttribute('href') === '/projects/hit-ai' || link.getAttribute('href') === 'https://github.com/aydemir0/Hit-the-Target---Hit.AI')).toBe(true);
    
    // Master of the sands has no fake external link, only anchor link to #work
    const sandsLinks = screen.queryAllByRole('link', { name: /Master of the Sands/i });
    expect(sandsLinks.length).toBeLessThanOrEqual(1);
    if (sandsLinks.length > 0) {
      expect(sandsLinks[0].getAttribute('href')).toBe('#work');
    }
  });

  it('TEST D - FlyRank badge integrity', () => {
    render(<Home />);
    expect(screen.getAllByText(/Will be added after capstone approval/i).length).toBeGreaterThan(0);
  });

  it('TEST F - navigation', () => {
    render(<Home />);
    expect(screen.getAllByRole('link', { name: /^Work$/i })).toHaveLength(1);
    expect(screen.getAllByRole('link', { name: /^About$/i })).toHaveLength(1);
    expect(screen.getAllByRole('link', { name: /^Experience$/i })).toHaveLength(1);
    expect(screen.getAllByRole('link', { name: /Skills/i })).toHaveLength(1);
  });
});
