import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../app/page';

describe('V2.1 Bug Fixes - Navigation & Selected Work', () => {
  it('TEST A - Navigation hashes correspond to actual DOM section IDs', () => {
    render(<Home />);
    
    const workLink = screen.getAllByRole('link', { name: /^work$/i })[0];
    const aboutLink = screen.getAllByRole('link', { name: /^about$/i })[0];
    const experienceLink = screen.getAllByRole('link', { name: /^experience$/i })[0];
    const skillsLink = screen.getAllByRole('link', { name: /^skills$/i })[0];
    const contactLink = screen.getAllByRole('link', { name: /^contact$/i })[0];

    // Ensure links actually point to hashes
    expect(workLink.getAttribute('href')).toBe('#work');
    expect(aboutLink.getAttribute('href')).toBe('#about');
    expect(experienceLink.getAttribute('href')).toBe('#experience');
    expect(skillsLink.getAttribute('href')).toBe('#skills-map');
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
    
    // Check links
    const links = Array.from(hitAiCard.querySelectorAll('a'));
    expect(links.some(l => l.textContent?.match(/Case Study/i))).toBe(true);
    expect(links.some(l => l.textContent?.match(/GitHub/i))).toBe(true);
  });

  it('TEST C - Emir\'s Galaxy visual hierarchy', () => {
    render(<Home />);
    
    const emirsGalaxyCard = screen.getByTestId('project-emirs-galaxy');
    
    // Copy and links
    expect(emirsGalaxyCard.textContent).toMatch(/View Case Study/i);
    expect(emirsGalaxyCard.textContent).toMatch(/React Three Fiber/i);
  });

});
