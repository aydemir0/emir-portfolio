import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RecruiterPage from '../app/recruiter/page';
import Home from '../app/page';
import HitAiCaseStudy from '../app/projects/hit-ai/page';
import EmirsGalaxyCaseStudy from '../app/projects/emirs-galaxy/page';
import NotFound from '../app/not-found';
import { metadata as hitAiMeta } from '../app/projects/hit-ai/page';
import { metadata as galaxyMeta } from '../app/projects/emirs-galaxy/page';

describe('V2.1 Recruiter Page', () => {
  it('TEST 1 - /recruiter renders expected elements', () => {
    render(<RecruiterPage />);
    expect(screen.getByText('Muhammed Emir Aydın')).toBeInTheDocument();
    expect(screen.getByText(/Open to internships & junior/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Hit\.AI/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: /View CV/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Book a Call/i })).toBeInTheDocument();
  });

  it('TEST 2 - recruiter page does not contain invented metrics', () => {
    render(<RecruiterPage />);
    const html = document.body.innerHTML;
    expect(html).not.toMatch(/years experience/i);
    expect(html).not.toMatch(/user metrics/i);
  });

  it('TEST 13 - recruiter CV path is exactly /Muhammed-Emir-Aydin-CV.pdf', () => {
    render(<RecruiterPage />);
    const cvLink = screen.getByRole('link', { name: /View CV/i });
    expect(cvLink).toHaveAttribute('href', '/Muhammed-Emir-Aydin-CV.pdf');
  });
});

describe('V2.1 Homepage & Core', () => {
  it('TEST 3 & 4 - project filters include exact categories and expose aria-pressed', () => {
    render(<Home />);
    const filters = ['All', 'AI', 'Web', 'Mobile', 'Game', 'Hardware'];
    filters.forEach(f => {
      const btn = screen.getByRole('button', { name: f });
      expect(btn).toBeInTheDocument();
      expect(btn).toHaveAttribute('aria-pressed');
    });
  });

  it('TEST 9 - custom 404 has Back to portfolio', () => {
    render(<NotFound />);
    expect(screen.getByRole('link', { name: /Back to portfolio/i })).toBeInTheDocument();
  });

  it('TEST 10 - strict factual status mapping', () => {
    render(<Home />);
    expect(screen.getByText('Active Development')).toBeInTheDocument(); // Hit.AI
    expect(screen.getByText('Experimental Portfolio')).toBeInTheDocument(); // Emir's Galaxy
  });

  it('TEST 11 - availability text exact match', () => {
    render(<Home />);
    expect(screen.getAllByText(/Open to internships & junior software \/ AI opportunities/i).length).toBeGreaterThan(0);
  });

  it('TEST 12 - mobile action strip contains links', () => {
    render(<Home />);
    // Testing logic assumes they render but are hidden via CSS on desktop
    const mobileStrip = screen.getByTestId('mobile-action-strip');
    expect(mobileStrip).toBeInTheDocument();
    expect(mobileStrip.textContent).toMatch(/CV/i);
    expect(mobileStrip.textContent).toMatch(/GitHub/i);
    expect(mobileStrip.textContent).toMatch(/Book/i);
  });

  it('TEST 15 - How I Work section presence', () => {
    render(<Home />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/How I work/i);
    expect(html).toMatch(/Understand/i);
    expect(html).toMatch(/Build/i);
    expect(html).toMatch(/Verify/i);
  });

  it('TEST 16 - FlyRank is in progress, not completed', () => {
    render(<Home />);
    expect(screen.getAllByText(/In progress/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/completed.*FlyRank/i)).toBeNull();
  });
});

describe('V2.1 Case Studies', () => {
  it('TEST 5 - Hit.AI case study has TOC links', () => {
    render(<HitAiCaseStudy />);
    const toc = screen.getByTestId('case-study-toc');
    expect(toc).toBeInTheDocument();
    expect(toc.textContent).toMatch(/Overview/i);
    expect(toc.textContent).toMatch(/Architecture/i);
  });

  it('TEST 6 - Emir\'s Galaxy case study has TOC links', () => {
    render(<EmirsGalaxyCaseStudy />);
    const toc = screen.getByTestId('case-study-toc');
    expect(toc).toBeInTheDocument();
    expect(toc.textContent).toMatch(/Overview/i);
    expect(toc.textContent).toMatch(/Goal/i);
  });

  it('TEST 7 - copy-case-study-link button exists', () => {
    render(<HitAiCaseStudy />);
    expect(screen.getByRole('button', { name: /Copy case study link/i })).toBeInTheDocument();
  });

  it('TEST 8 - case study contains next/back navigation', () => {
    render(<HitAiCaseStudy />);
    expect(screen.getByText(/Emir's Galaxy/i)).toBeInTheDocument();
  });

  it('TEST 14 - case study metadata is factual', () => {
    expect(hitAiMeta.title).toBe('Hit.AI Case Study | Muhammed Emir Aydın');
    expect(hitAiMeta.description).toMatch(/building an AI career assistant/i);
    expect(galaxyMeta.title).toBe('Emir\'s Galaxy Case Study | Muhammed Emir Aydın');
    expect(galaxyMeta.description).toMatch(/interactive 3D portfolio/i);
  });

  it('TEST 17 & 18 - no fake ATS percentage or hiring probability claims', () => {
    render(<HitAiCaseStudy />);
    const html = document.body.innerHTML;
    expect(html).not.toMatch(/ATS percentage/i);
    expect(html).not.toMatch(/hiring probability/i);
  });
});
