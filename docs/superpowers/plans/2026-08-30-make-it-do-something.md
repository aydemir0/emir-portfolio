# Plan: Make It Do Something

1. **Setup Environment**: Update `.env.example` with `RESEND_API_KEY` and `CONTACT_TO_EMAIL`.
2. **Backend Route**:
   - Implement `src/app/api/contact/route.ts`.
   - Add input validation.
   - Implement Honeypot trap.
   - Integrate `Resend`.
3. **Component**:
   - Build `src/components/ContactForm.tsx`.
   - Implement accessible form, states, validation.
4. **Integration**: Update `src/app/page.tsx` to include the form in the Contact section.
5. **Testing**: Write Vitest tests for the route (`src/__tests__/contact-route.test.ts`) and the component (`src/__tests__/ContactForm.test.tsx`).
6. **Documentation**: Create `docs/MAKE_IT_DO_SOMETHING.md`.
