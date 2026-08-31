# Figma handoff — Shaurma Gumry

## Product goal

Direct-ordering website for a local food business in Gyumri. The website must convert traffic from social media, maps and direct visits into delivery or pickup orders with minimal friction.

## Design direction

Primary benchmark: Sweetgreen — food-first composition, large product photography, restrained interface chrome, strong typography, generous whitespace.

Local UX benchmark: East West — menu-first ordering, clear ETA, straightforward delivery flow.

Target synthesis: **Sweetgreen visual language × East West ordering UX × local Gyumri food identity**.

Avoid generic restaurant landing-page patterns: hero copy about "unique taste", feature grids, decorative gradients, glassmorphism, generic AI illustrations, excessive rounded cards, fake reviews and unnecessary company-story sections before the menu.

## Desktop frame

Figma node: `1:2`
Canvas: 1440 × 2700

### Structure

1. Header
   - Brand: GUMRI
   - Menu
   - Delivery and pickup
   - Contacts
   - RU / HY
   - Primary CTA: Order

2. Hero
   - Eyebrow: HOT FOOD / GYUMRI
   - Headline: `ГОРЯЧЕЕ. СВЕЖЕЕ. СЕЙЧАС.`
   - Supporting copy about shawarma, pies, fresh bread and lavash
   - CTA: `Заказать еду`
   - ETA line: pickup ~15 min, delivery from ~30 min
   - Large real-food image area

3. Menu
   - Heading: `Что будете есть?`
   - Categories: shawarma, pies, bread & lavash, drinks
   - Product cards with image, title, short composition, price and quick-add `+`

4. Bakery / bread story
   - Large bread/lavash photo
   - Headline: `Свежий хлеб каждый день.`
   - Fast-add rows for lavash and matnakash

5. Ordering explanation
   - Choose food
   - Delivery or pickup
   - Phone and address
   - Explicitly no forced registration

## Mobile frame

Figma node: `1:78`
Canvas: 390 × 2420

### Mobile principles

- Food image and order CTA above the fold
- Category controls immediately before the menu
- Single-column product cards
- Persistent sticky cart near the bottom of the viewport
- Checkout should prioritize one-handed use and minimal fields

## Checkout direction

First decision after cart: `Доставка` or `Заберу сам`.

Pickup should show estimated ready time. Delivery should request address, phone and payment/confirmation details only as needed. No account creation is required for MVP.

## Photography direction

Use real food photography before production launch. Desired treatment:

- close crops
- visible texture, steam, bread, meat, sauce and hands
- warm natural or direct-light photography
- consistent framing across menu items
- no mixed stock-photo styles
- no isolated PNG food floating on decorative backgrounds

## Current status

The current Figma is a structural visual concept. Food-photo areas are intentionally placeholders until real or approved temporary imagery is selected.
