import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ThreeExperience } from '../components/three/ThreeExperience';
import * as ThreeCaps from '../lib/three-capabilities';

vi.mock('../components/three/ThreeCanvas', () => {
  return {
    default: function MockCanvas() {
      return <div data-testid="mock-canvas">Mock Canvas</div>;
    }
  };
});

describe('ThreeExperience Configurator', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders configurator controls and handles interaction', async () => {
    vi.spyOn(ThreeCaps, 'getThreeCapabilities').mockReturnValue({
      reducedMotion: false,
      lowPower: false,
      shouldRender3D: true,
    });

    render(<ThreeExperience />);
    
    // Canvas renders
    expect(await screen.findByTestId('mock-canvas')).toBeInTheDocument();

    // Controls exist
    expect(screen.getByRole('button', { name: /blue/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /violet/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cyan/i })).toBeInTheDocument();

    const blueBtn = screen.getByRole('button', { name: /blue/i });
    const violetBtn = screen.getByRole('button', { name: /violet/i });

    expect(blueBtn).toHaveAttribute('aria-pressed', 'true');
    expect(violetBtn).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(violetBtn);

    expect(blueBtn).toHaveAttribute('aria-pressed', 'false');
    expect(violetBtn).toHaveAttribute('aria-pressed', 'true');

    // Energy button exists and is accessible
    const energyBtn = screen.getByRole('button', { name: /Activate Energy/i });
    expect(energyBtn).toBeInTheDocument();
    
    fireEvent.click(energyBtn);
    expect(screen.getByRole('button', { name: /Active\.\.\./i })).toBeInTheDocument();
  });

  it('renders fallback when reduced motion is true', () => {
    vi.spyOn(ThreeCaps, 'getThreeCapabilities').mockReturnValue({
      reducedMotion: true,
      lowPower: false,
      shouldRender3D: false,
    });

    render(<ThreeExperience />);

    expect(screen.queryByTestId('mock-canvas')).not.toBeInTheDocument();
    expect(screen.getByText(/3D motion is reduced on this device/i)).toBeInTheDocument();
  });

  it('renders fallback when low power is true', () => {
    vi.spyOn(ThreeCaps, 'getThreeCapabilities').mockReturnValue({
      reducedMotion: false,
      lowPower: true,
      shouldRender3D: false,
    });

    render(<ThreeExperience />);

    expect(screen.queryByTestId('mock-canvas')).not.toBeInTheDocument();
    expect(screen.getByText(/3D is disabled to save power\/memory/i)).toBeInTheDocument();
  });
});