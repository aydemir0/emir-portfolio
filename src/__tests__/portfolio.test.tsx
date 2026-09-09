import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from '../app/page';

describe('Portfolio Requirements', () => {
  it('TEST A - verifies main content', () => {
    const { container } = render(<Home />);
    expect(screen.getAllByText(/Muhammed Emir Aydin/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Computer Engineering/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Hit\.AI/i).length).toBeGreaterThan(0);

    // Accessibility check for SVG icons in ThemeToggle
    const hiddenSvgs = container.querySelectorAll('svg[aria-hidden="true"]');
    expect(hiddenSvgs.length).toBeGreaterThan(0);
  });

  it('TEST G - verifies hero role text from reviewer feedback', () => {
    render(<Home />);
    expect(screen.getAllByText(/I design, build, and ship systems that work beyond the demo/i).length).toBeGreaterThan(0);
  });

  it('TEST B - verifies required links exist', () => {
    render(<Home />);
    const linkedinLinks = screen.getAllByRole('link', { name: /linkedin/i });
    expect(linkedinLinks.some(link => link.getAttribute('href') === 'https://www.linkedin.com/in/muhammed-emir-ayd%C4%B1n-305423200/')).toBe(true);

    const githubLinks = screen.getAllByRole('link', { name: /github/i });
    expect(githubLinks.some(link => link.getAttribute('href') === 'https://github.com/aydemir0')).toBe(true);

    const bookingLinks = screen.getAllByRole('link', { name: /schedule a call/i });
    expect(bookingLinks.some(link => link.getAttribute('href') === 'https://calendar.app.google/bQPjLoWdk7Fq3bHg6')).toBe(true);

    const cvLinks = screen.getAllByRole('link', { name: /resume/i });
    expect(cvLinks.some(link => link.getAttribute('href') === '/Muhammed-Emir-Aydin-CV.pdf')).toBe(true);
  });

  it('TEST C - project integrity', () => {
    render(<Home />);
    // Since hit.ai has a case study link and a github link, search broadly
    const textElements = screen.getAllByText(/Hit\.AI/i);
    expect(textElements.length).toBeGreaterThan(0);
  });

  it('TEST D - FlyRank badge integrity', () => {
    render(<Home />);
    expect(screen.getAllByText(/Completed capstone project — AI Fluency certification awarded/i).length).toBeGreaterThan(0);
  });

  it('TEST F - navigation', () => {
    render(<Home />);
    expect(screen.getAllByRole('link', { name: /^Work$/i })).toHaveLength(1);
    expect(screen.getAllByRole('link', { name: /^About$/i })).toHaveLength(1);
    expect(screen.getAllByRole('link', { name: /^Experience$/i })).toHaveLength(1);
    expect(screen.getAllByRole('link', { name: /Skills/i })).toHaveLength(1);
  });
});
