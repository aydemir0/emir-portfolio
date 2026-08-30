import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import LifecycleButtonPage from '../app/motion-button/page';
import { LifecycleButton } from '../components/LifecycleButton';

// Mock timers for async testing
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
});

describe('LifecycleButton Component', () => {
  it('1. renders idle: Analyze Career', () => {
    render(<LifecycleButton onRun={async () => 'success'} />);
    expect(screen.getByRole('button', { name: /Analyze Career/i })).not.toBeNull();
  });

  it('2. click enters loading: Analyzing', async () => {
    render(<LifecycleButton onRun={async () => new Promise(r => setTimeout(() => r('success'), 1000))} />);
    const button = screen.getByRole('button', { name: /Analyze Career/i });
    
    fireEvent.click(button);
    
    expect(screen.getByRole('button', { name: /Analyzing/i })).not.toBeNull();
  });

  it('3. loading sets: aria-busy="true"', async () => {
    render(<LifecycleButton onRun={async () => new Promise(r => setTimeout(() => r('success'), 1000))} />);
    const button = screen.getByRole('button', { name: /Analyze Career/i });
    
    fireEvent.click(button);
    
    expect(button.getAttribute('aria-busy')).toBe('true');
  });

  it('4. success path: Analyze Career -> Analyzing -> Analysis Ready', async () => {
    render(<LifecycleButton onRun={async () => new Promise(r => setTimeout(() => r('success'), 1000))} />);
    const button = screen.getByRole('button', { name: /Analyze Career/i });
    
    fireEvent.click(button);
    expect(screen.getByRole('button', { name: /Analyzing/i })).not.toBeNull();
    
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });
    
    expect(screen.getByRole('button', { name: /Analysis Ready/i })).not.toBeNull();
  });

  it('5. success eventually returns to: Analyze Career', async () => {
    render(<LifecycleButton onRun={async () => new Promise(r => setTimeout(() => r('success'), 1000))} />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000); // loading finishes
    });
    
    expect(screen.getByRole('button', { name: /Analysis Ready/i })).not.toBeNull();
    
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1500); // wait for success state to clear
    });
    
    expect(screen.getByRole('button', { name: /Analyze Career/i })).not.toBeNull();
  });

  it('6. error path: Analyze Career -> Analyzing -> Try Again', async () => {
    render(<LifecycleButton onRun={async () => new Promise(r => setTimeout(() => r('error'), 1000))} />);
    const button = screen.getByRole('button', { name: /Analyze Career/i });
    
    fireEvent.click(button);
    expect(screen.getByRole('button', { name: /Analyzing/i })).not.toBeNull();
    
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });
    
    expect(screen.getByRole('button', { name: /Try Again/i })).not.toBeNull();
  });

  it('7. retry works after error', async () => {
    const onRun = vi.fn().mockImplementationOnce(async () => new Promise(r => setTimeout(() => r('error'), 1000)))
                         .mockImplementationOnce(async () => new Promise(r => setTimeout(() => r('success'), 1000)));
    
    render(<LifecycleButton onRun={onRun} />);
    const button = screen.getByRole('button');
    
    // First click -> error
    fireEvent.click(button);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });
    expect(screen.getByRole('button', { name: /Try Again/i })).not.toBeNull();
    
    // Second click -> retry -> success
    fireEvent.click(button);
    expect(screen.getByRole('button', { name: /Analyzing/i })).not.toBeNull();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });
    expect(screen.getByRole('button', { name: /Analysis Ready/i })).not.toBeNull();
  });

  it('8. spam clicking while loading runs the action only once', async () => {
    const onRun = vi.fn(async () => new Promise<'success'>(r => setTimeout(() => r('success'), 1000)));
    
    render(<LifecycleButton onRun={onRun} />);
    const button = screen.getByRole('button');
    
    // Spam clicks
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    
    expect(onRun).toHaveBeenCalledTimes(1);
    
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });
  });

  it('9. disabled button cannot run action', () => {
    const onRun = vi.fn();
    render(<LifecycleButton disabled onRun={onRun} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    
    fireEvent.click(button);
    expect(onRun).not.toHaveBeenCalled();
  });

  it('12. button is a native button element', () => {
    render(<LifecycleButton onRun={async () => 'success'} />);
    const button = screen.getByRole('button');
    expect(button.tagName.toLowerCase()).toBe('button');
  });
});

describe('Demo Page (/motion-button)', () => {
  it('10. visible deterministic demo controls exist: Force Success, Force Error', () => {
    render(<LifecycleButtonPage />);
    expect(screen.getByRole('button', { name: /Force Success/i })).not.toBeNull();
    expect(screen.getByRole('button', { name: /Force Error/i })).not.toBeNull();
  });

  it('11. page includes motion explanation note', () => {
    render(<LifecycleButtonPage />);
    expect(screen.getByText(/Why these motion choices\?/i)).not.toBeNull();
  });

  it('13. reduced-motion CSS/support exists in page elements', () => {
    render(<LifecycleButtonPage />);
    // Checking if motion-reduce classes are present in the raw HTML string
    // This is a rough check, but suffices for ensuring it's added.
    expect(document.body.innerHTML).toMatch(/motion-reduce/);
  });
});
