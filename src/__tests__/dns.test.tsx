import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DNSPage from '../app/dns/page';

describe('DNS Page', () => {
  it('TEST E - DNS content', () => {
    render(<DNSPage />);
    const text = screen.getByTestId('dns-content').textContent || '';
    expect(text).toMatch(/DNS/i);
    expect(text).toMatch(/resolver/i);
    expect(text).toMatch(/nameserver/i);
    expect(text).toMatch(/CNAME/i);
    expect(text).toMatch(/HTTPS/i);
  });
});
