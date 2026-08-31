# Backoffice / Order Operations

## Goal

The backoffice is the operational screen where paid online orders arrive and move through preparation, pickup, and delivery.

The prototype UI is available at `/admin`.

## Order lifecycle

```text
Customer checkout
  -> payment provider
  -> payment success webhook
  -> backend validates payment
  -> order persisted as PAID / NEW
  -> backoffice receives order
  -> COOKING
  -> READY
  -> DELIVERY or PICKUP
  -> DONE
```

Unpaid or failed-payment orders must not enter the kitchen's active queue.

## Main backoffice screen

The first operational screen is a Kanban-like order board with four active columns:

1. `Новые` — successfully paid orders that still require acceptance.
2. `Готовим` — accepted by the kitchen.
3. `Готово` — prepared and waiting for courier/customer.
4. `Доставка` — handed to courier and in delivery.

A separate `Завершённые` view stores completed orders.

## Order card

Each card should show only information required for fast decision-making:

- order number;
- created time;
- scheduled delivery time when applicable;
- delivery / pickup;
- customer name;
- short address;
- total amount;
- paid status.

Selecting a card opens full order details.

## Order details

The detail pane contains:

- payment status;
- order items and quantities;
- total paid amount;
- requested delivery time (`ASAP` or scheduled time);
- delivery address;
- customer phone;
- order comment;
- primary status transition button;
- problem/cancellation action.

## Recommended production behaviour

### Real-time updates

The admin UI should not rely on manual refresh. New orders should be pushed through WebSocket or Server-Sent Events. Polling is an acceptable MVP fallback.

When a new paid order arrives:

- play a short sound;
- highlight the `Новые` column;
- show a browser notification if permission is granted;
- keep the order visually prominent until accepted.

### Backend API draft

```text
POST /api/checkout
POST /api/payments/webhook
GET  /api/admin/orders
GET  /api/admin/orders/:id
PATCH /api/admin/orders/:id/status
POST /api/admin/orders/:id/cancel
```

### Suggested statuses

```text
PAYMENT_PENDING
NEW_PAID
COOKING
READY
OUT_FOR_DELIVERY
COMPLETED
CANCELLED
REFUND_PENDING
REFUNDED
```

The UI prototype currently groups `NEW_PAID` as `Новые` and uses the shorter visual states `new -> cooking -> ready -> delivery -> done`.

## Roles for first production version

- **Owner / Administrator** — all orders, menu, delivery settings, reports.
- **Operator / Manager** — orders, customers, cancellations/refunds.
- **Kitchen** — only active order queue and preparation status.

For a single-location MVP these roles can initially share one admin application while permissions are enforced on the backend.

## What is mocked now

The `/admin` screen currently uses local mock orders so the full sales demo can be shown without a backend.

Production still requires:

- database;
- authenticated admin access;
- payment-provider integration;
- payment webhook processing;
- order API;
- real-time order delivery;
- cancellation/refund integration;
- delivery pricing and courier workflow.
