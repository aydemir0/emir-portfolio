'use client';

import React, { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '', website: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left w-full max-w-md mx-auto mt-8">
      {status === 'success' && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 rounded-md" aria-live="polite">
          Message sent successfully.
        </div>
      )}
      
      {status === 'error' && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-md" aria-live="polite">
          {errorMessage}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          minLength={1}
          maxLength={100}
          value={formData.name}
          onChange={handleChange}
          disabled={status === 'submitting'}
          className="px-3 py-2 bg-background border border-card-border rounded-md text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50 transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          maxLength={254}
          value={formData.email}
          onChange={handleChange}
          disabled={status === 'submitting'}
          className="px-3 py-2 bg-background border border-card-border rounded-md text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50 transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
        <textarea
          id="message"
          name="message"
          required
          minLength={1}
          maxLength={5000}
          rows={4}
          value={formData.message}
          onChange={handleChange}
          disabled={status === 'submitting'}
          className="px-3 py-2 bg-background border border-card-border rounded-md text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50 resize-none transition-colors"
        />
      </div>

      {/* Honeypot field - visually hidden, removed from tab order */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-2 px-6 py-3 bg-accent text-white dark:text-slate-900 font-medium rounded-md hover:bg-accent/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending...' : 'Send message'}
      </button>
    </form>
  );
}
