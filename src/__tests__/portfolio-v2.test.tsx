import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from '../app/page';
import HitAiPage from '../app/projects/hit-ai/page';
import EmirsGalaxyPage from '../app/projects/emirs-galaxy/page';

// Mock matchMedia for ThemeToggle tests if needed
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // Deprecated
    removeListener: () => {}, // Deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

describe('Portfolio V2 Requirements', () => {
  it('TEST 1 — availability', () => {
    render(<Home />);
    expect(screen.getAllByText(/Open to internships & junior software \/ AI opportunities/i).length).toBeGreaterThan(0);
  });

  it('TEST 2 — theme toggle', () => {
    render(<Home />);
    const toggle = screen.getByRole('button', { name: /Toggle theme/i });
    expect(toggle).toBeInTheDocument();
  });

  it('TEST 3 — case-study routing', () => {
    render(<Home />);
    const hitAiLinks = screen.getAllByRole('link', { name: /View Case Study/i });
    expect(hitAiLinks.some(link => link.getAttribute('href') === '/projects/hit-ai')).toBe(true);
    const emirsGalaxyLinks = screen.getAllByRole('link', { name: /Explore the 3D experience/i });
    expect(emirsGalaxyLinks.some(link => link.getAttribute('href') === '/projects/emirs-galaxy')).toBe(true);
  });

  it('TEST 7 — copy email', () => {
    render(<Home />);
    const copyButton = screen.getByRole('button', { name: /Copy email/i });
    expect(copyButton).toBeInTheDocument();
  });

  it('TEST 8 — skill proof', () => {
    render(<Home />);
    // Check that Hit.AI is linked from a proof area
    expect(screen.getAllByText(/Proof, not buzzwords/i).length).toBeGreaterThan(0);
    const hitAiProofLinks = screen.getAllByRole('link', { name: /Hit\.AI/i });
    expect(hitAiProofLinks.length).toBeGreaterThan(0);
  });

  it('TEST 9 — FlyRank integrity', () => {
    render(<Home />);
    expect(screen.getAllByText(/In progress/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/FlyRank completion badge will be added after capstone approval/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/completed.*FlyRank/i)).toBeNull();
  });

  it('TEST 10 — accessibility', () => {
    render(<Home />);
    // Check that we have a main landmark
    expect(screen.getByRole('main')).toBeInTheDocument();
    // Check that standard buttons have aria-labels or text
    const themeToggle = screen.getByRole('button', { name: /Toggle theme/i });
    expect(themeToggle).toHaveAttribute('aria-label');
  });
});

describe('Case Studies V2', () => {
  it('TEST 4 — Hit.AI case study content', () => {
    render(<HitAiPage />);
    const content = screen.getByTestId('case-study-content').textContent || '';
    expect(content).toMatch(/AI SDK/i);
    expect(content).toMatch(/Groq/i);
    expect(content).toMatch(/Anthropic/i);
    expect(content).toMatch(/structured/i);
    expect(content).toMatch(/resilience/i);
    expect(content).toMatch(/Apply \/ Maybe \/ Skip/i);
  });

  it('TEST 5 — case-study guardrails', () => {
    render(<HitAiPage />);
    const content = screen.getByTestId('case-study-content').textContent || '';
    expect(content).not.toMatch(/ATS percentage/i);
    expect(content).not.toMatch(/hiring probability/i);
  });

  it('TEST 6 — Emir\'s Galaxy case study', () => {
    render(<EmirsGalaxyPage />);
    const content = screen.getByTestId('case-study-content').textContent || '';
    expect(content).toMatch(/React Three Fiber/i);
    const githubLink = screen.getByRole('link', { name: /GitHub/i });
    expect(githubLink.getAttribute('href')).toBe('https://github.com/aydemir0/emirin-galaksisi');
  });
});
