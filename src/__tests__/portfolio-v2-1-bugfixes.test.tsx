import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../app/page';

describe('V2.1 Bug Fixes - Navigation & Selected Work', () => {
  it('TEST A - Navigation hashes correspond to actual DOM section IDs', () => {
    render(<Home />);
    
    const workLink = screen.getByRole('link', { name: /^work$/i });
    const aboutLink = screen.getByRole('link', { name: /^about$/i });
    const experienceLink = screen.getByRole('link', { name: /^experience$/i });
    const skillsLink = screen.getByRole('link', { name: /^skills$/i });
    const contactLink = screen.getByRole('link', { name: /^contact$/i });

    // Ensure links actually point to hashes
    expect(workLink.getAttribute('href')).toBe('#work');
    expect(aboutLink.getAttribute('href')).toBe('#about');
    expect(experienceLink.getAttribute('href')).toBe('#experience');
    expect(skillsLink.getAttribute('href')).toBe('#skills');
    expect(contactLink.getAttribute('href')).toBe('#contact');

    // Ensure those IDs actually exist in the document
    expect(document.getElementById('work')).not.toBeNull();
    expect(document.getElementById('about')).not.toBeNull();
    expect(document.getElementById('experience')).not.toBeNull();
    expect(document.getElementById('skills')).not.toBeNull();
    expect(document.getElementById('contact')).not.toBeNull();
  });
  
  it('TEST B - Hit.AI visual hierarchy and capability groups', () => {
    render(<Home />);
    
    const hitAiCard = screen.getByTestId('project-hit-ai');
    
    // Check for capabilities
    expect(hitAiCard.textContent).toMatch(/Streaming AI Chat/i);
    expect(hitAiCard.textContent).toMatch(/Structured Analysis/i);
    expect(hitAiCard.textContent).toMatch(/Resilience/i);
    expect(hitAiCard.textContent).toMatch(/Prioritizer Agent/i);

    // Keep Built/Learned/Next
    expect(hitAiCard.textContent).toMatch(/Built/i);
    expect(hitAiCard.textContent).toMatch(/Learned/i);
    expect(hitAiCard.textContent).toMatch(/Next/i);
    
    // Check links
    const links = Array.from(hitAiCard.querySelectorAll('a'));
    expect(links.some(l => l.textContent?.match(/View Case Study/i))).toBe(true);
    expect(links.some(l => l.textContent?.match(/View GitHub/i))).toBe(true);
  });

  it('TEST C - Emir\'s Galaxy visual hierarchy and orbit animation', () => {
    render(<Home />);
    
    const emirsGalaxyCard = screen.getByTestId('project-emirs-galaxy');
    
    // Copy and links
    expect(emirsGalaxyCard.textContent).toMatch(/Explore the 3D experience/i);
    expect(emirsGalaxyCard.textContent).toMatch(/React Three Fiber/i);

    // Ensure orbit element exists (decorative)
    const orbitVisual = emirsGalaxyCard.querySelector('[data-testid="orbit-visual"]');
    expect(orbitVisual).not.toBeNull();
    expect(orbitVisual?.getAttribute('aria-hidden')).toBe('true');
  });

  it('TEST D - Orbit animation respects prefers-reduced-motion', () => {
    render(<Home />);
    
    const orbitVisual = document.querySelector('[data-testid="orbit-visual"]');
    // We expect it to have the tailwind class for reduced motion
    expect(orbitVisual?.className).toMatch(/motion-reduce:animate-none/);
  });
});
