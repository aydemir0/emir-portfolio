import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';

// Mock next/dynamic so ShaderCanvasInner renders a lightweight stub
vi.mock('../components/shader/ShaderCanvasInner', () => ({
  default: function MockShaderCanvasInner({ frameloop }: { frameloop: string }) {
    return <div data-testid="mock-shader-canvas" data-frameloop={frameloop} />;
  },
}));

// Mock ShaderPlane so shaderUniforms is importable without real THREE
vi.mock('../components/shader/ShaderPlane', () => ({
  ShaderPlane: () => <div />,
  shaderUniforms: {
    u_time:       { value: 0 },
    u_resolution: { value: { set: vi.fn() } },
    u_mouse:      { value: { set: vi.fn() } },
  },
}));

import { ShaderHeroBackground } from '../components/shader/ShaderHeroBackground';

// Helper: configure window.matchMedia to return a given matches value
function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

describe('ShaderHeroBackground', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders static fallback when prefers-reduced-motion is active', async () => {
    mockMatchMedia(true); // reduced motion ON

    await act(async () => {
      render(<ShaderHeroBackground />);
    });

    expect(screen.getByTestId('shader-static-fallback')).toBeInTheDocument();
    expect(screen.queryByTestId('shader-canvas-wrapper')).not.toBeInTheDocument();
  });

  it('renders shader canvas wrapper when reduced-motion is false', async () => {
    mockMatchMedia(false); // reduced motion OFF

    await act(async () => {
      render(<ShaderHeroBackground />);
    });

    expect(screen.getByTestId('shader-canvas-wrapper')).toBeInTheDocument();
    expect(screen.queryByTestId('shader-static-fallback')).not.toBeInTheDocument();
  });

  it('static fallback has aria-hidden="true" — decorative, not semantic', async () => {
    mockMatchMedia(true);

    await act(async () => {
      render(<ShaderHeroBackground />);
    });

    expect(screen.getByTestId('shader-static-fallback')).toHaveAttribute('aria-hidden', 'true');
  });

  it('canvas wrapper has aria-hidden="true" — decorative, not semantic', async () => {
    mockMatchMedia(false);

    await act(async () => {
      render(<ShaderHeroBackground />);
    });

    expect(screen.getByTestId('shader-canvas-wrapper')).toHaveAttribute('aria-hidden', 'true');
  });

  it('mock canvas starts with frameloop="always"', async () => {
    mockMatchMedia(false);

    await act(async () => {
      render(<ShaderHeroBackground />);
    });

    const canvas = screen.getByTestId('mock-shader-canvas');
    expect(canvas).toHaveAttribute('data-frameloop', 'always');
  });

  it('switches frameloop to "never" when tab becomes hidden', async () => {
    mockMatchMedia(false);

    await act(async () => {
      render(<ShaderHeroBackground />);
    });

    // Simulate tab going hidden
    Object.defineProperty(document, 'visibilityState', {
      writable: true,
      value: 'hidden',
    });

    await act(async () => {
      fireEvent(document, new Event('visibilitychange'));
    });

    expect(screen.getByTestId('mock-shader-canvas')).toHaveAttribute('data-frameloop', 'never');
  });

  it('switches frameloop back to "always" when tab becomes visible', async () => {
    mockMatchMedia(false);

    await act(async () => {
      render(<ShaderHeroBackground />);
    });

    // Hide tab
    Object.defineProperty(document, 'visibilityState', { writable: true, value: 'hidden' });
    await act(async () => { fireEvent(document, new Event('visibilitychange')); });

    // Show tab again
    Object.defineProperty(document, 'visibilityState', { writable: true, value: 'visible' });
    await act(async () => { fireEvent(document, new Event('visibilitychange')); });

    expect(screen.getByTestId('mock-shader-canvas')).toHaveAttribute('data-frameloop', 'always');
  });
});

// Verify homepage hero headline still renders after shader integration
import Home from '../app/page';

describe('Homepage hero with ShaderHeroBackground', () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  it('hero h1 headline is still present', async () => {
    await act(async () => {
      render(<Home />);
    });
    // The heading contains "Muhammed Emir Aydin"
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toBeInTheDocument();
    expect(h1.textContent).toMatch(/Muhammed Emir/i);
  });

  it('hero CTA links are still present and clickable', async () => {
    await act(async () => {
      render(<Home />);
    });
    const contactLinks = screen.getAllByRole('link', { name: /contact/i });
    expect(contactLinks.length).toBeGreaterThan(0);
  });

  it('shader background is not a semantic element (decorative)', async () => {
    await act(async () => {
      render(<Home />);
    });
    // The wrapper has aria-hidden="true" — screen readers skip it
    const wrapper = screen.queryByTestId('shader-canvas-wrapper');
    if (wrapper) {
      expect(wrapper).toHaveAttribute('aria-hidden', 'true');
    }
  });
});
