# Shaurma Gumry

Direct-ordering website prototype for a local food business in Gyumri.

## Design source

Figma: https://www.figma.com/design/X2Os31gFTJ8oVP3iToHT8b

Direction: Sweetgreen-inspired food-first visual language combined with East West-style ordering UX.

## Implemented

- Responsive desktop/mobile storefront
- Food-first hero and menu cards
- Generated prototype food photography from `/public/images`
- Fast add / quantity controls
- Sticky cart
- Cart and checkout screen
- Delivery / pickup switch
- Customer name, phone, address and comment fields
- Cash / card-at-receipt choice
- Order success state
- Basic interaction tests
- GitHub Actions CI: lint → test → build

## Local run

```bash
npm install
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`.

## Quality checks

```bash
npm run lint
npm test
npm run build
```

## Current prototype limitation

Checkout is UI-only. It does not yet send orders to a backend, payment provider, Telegram, CRM or delivery service. The next implementation stage should define where confirmed orders are sent.

Design handoff, tokens, references and asset mapping live in `/design`.
