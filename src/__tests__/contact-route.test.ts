import { describe, test, expect, vi, beforeEach } from 'vitest';
import { POST } from '../app/api/contact/route';

const sendMock = vi.fn();

vi.mock('resend', () => {
  return {
    Resend: class {
      emails = {
        send: sendMock,
      };
    },
  };
});

describe('Contact Route API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.RESEND_API_KEY = 'test_key';
    process.env.CONTACT_TO_EMAIL = 'test@example.com';
  });

  const createRequest = (body: Record<string, unknown>) => {
    return new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  };

  test('1, 2, 3: valid submission calls mocked Resend exactly once to CONTACT_TO_EMAIL and returns success', async () => {
    sendMock.mockResolvedValueOnce({ data: { id: 'test_id' } });
    
    const req = createRequest({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is a valid test message.'
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock.mock.calls[0][0].to).toBe('test@example.com');
  });

  test('4: missing name returns 400', async () => {
    const req = createRequest({
      name: '',
      email: 'john@example.com',
      message: 'This is a valid test message.'
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  test('5: invalid email returns 400', async () => {
    const req = createRequest({
      name: 'John',
      email: 'invalid-email',
      message: 'This is a valid test message.'
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  test('6: short/empty message returns 400', async () => {
    const req = createRequest({
      name: 'John',
      email: 'john@example.com',
      message: 'short'
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  test('7: message over 2000 chars returns 400', async () => {
    const req = createRequest({
      name: 'John',
      email: 'john@example.com',
      message: 'a'.repeat(2001)
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  test('8: honeypot submission does NOT call Resend', async () => {
    const req = createRequest({
      name: 'John',
      email: 'john@example.com',
      message: 'This is a valid test message.',
      website: 'http://spam.com'
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(sendMock).not.toHaveBeenCalled();
  });

  test('9: missing server environment fails safely', async () => {
    delete process.env.RESEND_API_KEY;
    
    const req = createRequest({
      name: 'John',
      email: 'john@example.com',
      message: 'This is a valid test message.'
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
    expect(sendMock).not.toHaveBeenCalled();
  });

  test('10: Resend failure returns controlled error', async () => {
    sendMock.mockResolvedValueOnce({ error: { message: 'Resend failed' } });
    
    const req = createRequest({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is a valid test message.'
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
  });
});
