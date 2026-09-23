# FareRight — Accessibility notes

*From: Nadia (Accessibility Lead). Short, but non-negotiable.*

> ⚠️ Fictional scenario for training.

For a public transport operator, digital accessibility is a **legal requirement** (think
WCAG 2.2 AA / EN 301 549 / Equality Act). The Refunds feature is **public-facing** and deals
with **money** — exactly the kind of thing that gets complained about and audited.

## Must-haves for the Refunds screens (app + web)

- **Screen reader** support: every refund item, amount, reason and the "raise a query" control
  must have a clear accessible name and be announced correctly.
- **Keyboard only:** a user must be able to reach and operate everything (view refunds, open a
  refund, submit a query) without a mouse.
- **Colour & contrast:** don't rely on colour alone to show refund status; meet AA contrast.
- **Content clarity:** plain-language explanations (why was I refunded?). Avoid jargon.
- **Notifications:** any refund notification must be perceivable by assistive tech, not just a
  visual toast.

## Testing expectations

- Automated a11y checks in the pipeline (axe or similar) **and** manual assistive-tech testing.
- Accessibility is **not** something we bolt on at the end. If it's not tested, we're not
  shipping to the public.

> If a test strategy doesn't mention accessibility, it's not a complete strategy for a public
> service. 🙂
