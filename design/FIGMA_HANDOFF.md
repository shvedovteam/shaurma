# Figma handoff — Shaurma Gumry

## Product goal

Direct-ordering website for a local food business in Gyumri. The website must convert traffic from social media, maps and direct visits into delivery or pickup orders with minimal friction.

## Design status

The current visual direction is **approved**.

Implementation should preserve the established visual language, spacing logic, typography hierarchy, warm palette, food-first composition and direct-ordering UX. Do not redesign the product during frontend implementation without an explicit design change.

## Design direction

Primary benchmark: Sweetgreen — food-first composition, large product photography, restrained interface chrome, strong typography, generous whitespace.

Local UX benchmark: East West — menu-first ordering, clear ETA, straightforward delivery flow.

Target synthesis: **Sweetgreen visual language × East West ordering UX × local Gyumri food identity**.

Avoid generic restaurant landing-page patterns: hero copy about "unique taste", feature grids, decorative gradients, glassmorphism, generic AI illustrations, excessive rounded cards, fake reviews and unnecessary company-story sections before the menu.

## Desktop / Home + Menu

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

## Mobile / Home + Menu

Figma node: `1:78`
Canvas: 390 × 2420

### Mobile principles

- Food image and order CTA above the fold
- Category controls immediately before the menu
- Single-column product cards
- Persistent sticky cart near the bottom of the viewport
- Checkout should prioritize one-handed use and minimal fields

## Desktop / Cart + Checkout

Figma node: `6:2`
Canvas: 1440 × 1700

### Structure

1. Header with return-to-menu action and current cart count
2. Cart review
   - Product thumbnail
   - Product name and short description
   - Quantity control `− / count / +`
   - Price
   - Remove action
3. Fulfilment choice
   - `Доставка`
   - `Заберу сам`
   - Delivery ETA shown immediately
4. Customer details
   - Name
   - Phone
   - Address for delivery
   - Optional comment
5. Payment choice
   - Cash
   - Card on receipt / pickup for MVP placeholder
6. Sticky-style order summary on desktop
   - Food subtotal
   - Delivery fee shown as address-dependent until calculated
   - Total
   - Primary CTA `Оформить заказ →`
7. No forced registration
   - Phone number is enough for MVP checkout

## Mobile / Cart + Checkout

Figma node: `6:90`
Canvas: 390 × 2050

### Mobile checkout principles

- Cart items remain editable directly on the checkout page
- Delivery / pickup selector is large enough for one-handed use
- Form is single-column
- No login/account step
- Summary and order CTA appear after essential fields
- Confirmation state should return order number and estimated readiness/delivery time

## Checkout behavior

First decision after cart: `Доставка` or `Заберу сам`.

### Delivery

- Ask for name, phone, delivery address and optional comment
- Show estimated delivery time before final confirmation
- Delivery fee can be calculated after address selection in implementation
- Final amount must be visible before order submission

### Pickup

- Hide delivery address and delivery fee
- Show estimated ready time, target around 15–20 minutes when operationally valid
- Customer still provides phone for confirmation

### Order confirmation

After successful submission, show:

- `Заказ принят`
- Order number
- Estimated ready/delivery time
- Short instruction about how confirmation will be received

No mandatory account creation for MVP.

## Photography direction

Use real food photography before production launch. Desired treatment:

- close crops
- visible texture, steam, bread, meat, sauce and hands
- warm natural or direct-light photography
- consistent framing across menu items
- no mixed stock-photo styles
- no isolated PNG food floating on decorative backgrounds

## Current status

Core visual direction, Home/Menu layout, Cart and Checkout UX are approved. Food-photo areas are intentionally placeholders until real or approved temporary imagery is selected.
