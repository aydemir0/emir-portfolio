import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import ContactForm from '../components/ContactForm';

// Mock fetch globally
const globalFetch = vi.fn();
global.fetch = globalFetch;

describe('ContactForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('1: renders Name, Email, Message and Send message', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toHaveAttribute('autoComplete', 'name');
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toHaveAttribute('autoComplete', 'email');
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send message/i })).toBeInTheDocument();
  });

  test('2, 4, 5: valid user submission sends expected payload, shows success, and clears fields', async () => {
    globalFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<ContactForm />);
    
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Valid test message' } });

    fireEvent.click(screen.getByRole('button', { name: /Send message/i }));

    await waitFor(() => {
      expect(globalFetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          name: 'John',
          email: 'john@example.com',
          message: 'Valid test message',
          website: ''
        }),
      }));
    });

    // Success feedback
    expect(await screen.findByText(/Message sent successfully/i)).toBeInTheDocument();

    // Fields cleared
    expect(screen.getByLabelText(/Name/i)).toHaveValue('');
    expect(screen.getByLabelText(/Message/i)).toHaveValue('');
  });

  test('3, 8: button shows submitting state, becomes disabled, prevents double submit', async () => {
    let resolveRequest!: (value: unknown) => void;
    globalFetch.mockReturnValueOnce(new Promise(resolve => {
      resolveRequest = resolve;
    }));

    render(<ContactForm />);
    
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Valid test message' } });

    const submitBtn = screen.getByRole('button', { name: /Send message/i });
    fireEvent.click(submitBtn);

    // Should change state and disable
    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
      expect(submitBtn).toHaveTextContent(/Sending\.\.\./i);
    });

    // Double submit attempt
    fireEvent.click(submitBtn);
    
    expect(globalFetch).toHaveBeenCalledTimes(1);

    // Resolve the hanging promise to clean up
    resolveRequest({ ok: true, json: async () => ({ success: true }) });
    await waitFor(() => expect(submitBtn).toBeEnabled());
  });

  test('6, 7: error feedback appears, fields remain populated after error', async () => {
    globalFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Custom server error' }),
    });

    render(<ContactForm />);
    
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Valid test message' } });

    fireEvent.click(screen.getByRole('button', { name: /Send message/i }));

    // Error feedback
    expect(await screen.findByText(/Custom server error/i)).toBeInTheDocument();

    // Fields remain populated
    expect(screen.getByLabelText(/Name/i)).toHaveValue('John');
    expect(screen.getByLabelText(/Message/i)).toHaveValue('Valid test message');
  });
});
