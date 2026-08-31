import { useMemo, useState } from 'react'
import './admin.css'

type OrderStatus = 'new' | 'cooking' | 'ready' | 'delivery' | 'done'
type Fulfillment = 'delivery' | 'pickup'

type AdminOrder = {
  id: string
  createdAt: string
  scheduledFor?: string
  customer: string
  phone: string
  fulfillment: Fulfillment
  address?: string
  comment?: string
  total: number
  paid: boolean
  status: OrderStatus
  items: { name: string; quantity: number }[]
}

const initialOrders: AdminOrder[] = [
  {
    id: '1048',
    createdAt: '16:21',
    customer: 'Арман',
    phone: '+374 91 555 412',
    fulfillment: 'delivery',
    address: 'ул. Абовяна, 18, кв. 7',
    comment: 'Без лука. Позвонить у подъезда.',
    total: 5950,
    paid: true,
    status: 'new',
    items: [
      { name: 'Шаурма с курицей', quantity: 2 },
      { name: 'Лаваш', quantity: 1 },
      { name: 'Матнакаш', quantity: 1 },
    ],
  },
  {
    id: '1047',
    createdAt: '16:08',
    scheduledFor: '17:00',
    customer: 'Мариам',
    phone: '+374 98 201 544',
    fulfillment: 'delivery',
    address: 'пр. Ширака, 44',
    total: 4400,
    paid: true,
    status: 'cooking',
    items: [
      { name: 'Шаурма с говядиной', quantity: 2 },
    ],
  },
  {
    id: '1046',
    createdAt: '15:54',
    customer: 'Геворг',
    phone: '+374 77 810 102',
    fulfillment: 'pickup',
    total: 3750,
    paid: true,
    status: 'ready',
    items: [
      { name: 'Шаурма острая', quantity: 1 },
      { name: 'Шаурма с курицей', quantity: 1 },
    ],
  },
  {
    id: '1045',
    createdAt: '15:41',
    customer: 'Лилит',
    phone: '+374 93 407 922',
    fulfillment: 'delivery',
    address: 'ул. Горького, 61',
    total: 7800,
    paid: true,
    status: 'delivery',
    items: [
      { name: 'Шаурма с курицей', quantity: 3 },
      { name: 'Матнакаш', quantity: 2 },
    ],
  },
]

const statusMeta: Record<OrderStatus, { title: string; action?: string; next?: OrderStatus }> = {
  new: { title: 'Новые', action: 'Принять и готовить', next: 'cooking' },
  cooking: { title: 'Готовим', action: 'Готово', next: 'ready' },
  ready: { title: 'Готово', action: 'Передать курьеру', next: 'delivery' },
  delivery: { title: 'Доставка', action: 'Завершить', next: 'done' },
  done: { title: 'Завершённые' },
}

function formatDram(value: number) {
  return `${new Intl.NumberFormat('ru-RU').format(value)} ֏`
}

export default function Admin() {
  const [orders, setOrders] = useState(initialOrders)
  const [selectedId, setSelectedId] = useState(initialOrders[0]?.id ?? '')
  const [activeFilter, setActiveFilter] = useState<'active' | 'done'>('active')

  const visibleOrders = useMemo(
    () => orders.filter((order) => (activeFilter === 'active' ? order.status !== 'done' : order.status === 'done')),
    [orders, activeFilter],
  )

  const selected = orders.find((order) => order.id === selectedId) ?? visibleOrders[0]
  const todayRevenue = orders.filter((order) => order.paid).reduce((sum, order) => sum + order.total, 0)
  const activeCount = orders.filter((order) => order.status !== 'done').length
  const scheduledCount = orders.filter((order) => order.scheduledFor && order.status !== 'done').length

  const moveNext = (order: AdminOrder) => {
    const next = statusMeta[order.status].next
    if (!next) return
    setOrders((current) => current.map((candidate) => candidate.id === order.id ? { ...candidate, status: next } : candidate))
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div>
          <a className="admin-brand" href="/">GUMRI <span>office</span></a>
          <nav className="admin-nav" aria-label="Backoffice">
            <button className="active">Заказы <span>{activeCount}</span></button>
            <button>Меню</button>
            <button>Доставка</button>
            <button>Промокоды</button>
            <button>Клиенты</button>
            <button>Отчёты</button>
          </nav>
        </div>
        <div className="admin-store-state"><span className="store-dot" /> Принимаем заказы</div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <p>ВОСКРЕСЕНЬЕ · 31 АВГУСТА</p>
            <h1>Заказы</h1>
          </div>
          <div className="admin-header-actions">
            <button className="icon-button" aria-label="Уведомления">●</button>
            <div className="admin-avatar">GS</div>
          </div>
        </header>

        <section className="admin-metrics" aria-label="Показатели смены">
          <article><span>Активных заказов</span><strong>{activeCount}</strong></article>
          <article><span>К определённому времени</span><strong>{scheduledCount}</strong></article>
          <article><span>Оплачено сегодня</span><strong>{formatDram(todayRevenue)}</strong></article>
        </section>

        <div className="admin-tabs">
          <button className={activeFilter === 'active' ? 'active' : ''} onClick={() => setActiveFilter('active')}>В работе</button>
          <button className={activeFilter === 'done' ? 'active' : ''} onClick={() => setActiveFilter('done')}>Завершённые</button>
        </div>

        {activeFilter === 'active' ? (
          <section className="order-board">
            {(['new', 'cooking', 'ready', 'delivery'] as OrderStatus[]).map((status) => {
              const columnOrders = visibleOrders.filter((order) => order.status === status)
              return (
                <div className="order-column" key={status}>
                  <div className="column-heading">
                    <h2>{statusMeta[status].title}</h2>
                    <span>{columnOrders.length}</span>
                  </div>
                  <div className="column-stack">
                    {columnOrders.map((order) => (
                      <OrderCard key={order.id} order={order} selected={selected?.id === order.id} onSelect={() => setSelectedId(order.id)} />
                    ))}
                    {columnOrders.length === 0 && <div className="empty-column">Нет заказов</div>}
                  </div>
                </div>
              )
            })}
          </section>
        ) : (
          <section className="completed-list">
            {visibleOrders.length === 0 ? <p>Пока нет завершённых заказов.</p> : visibleOrders.map((order) => <OrderCard key={order.id} order={order} selected={selected?.id === order.id} onSelect={() => setSelectedId(order.id)} />)}
          </section>
        )}
      </main>

      {selected && (
        <aside className="order-drawer">
          <div className="drawer-topline">
            <div><span>ЗАКАЗ</span><h2>#{selected.id}</h2></div>
            <span className="paid-badge">✓ Оплачен</span>
          </div>

          <div className="drawer-time">
            <span>{selected.scheduledFor ? 'Ко времени' : selected.fulfillment === 'delivery' ? 'Доставить' : 'Самовывоз'}</span>
            <strong>{selected.scheduledFor ?? (selected.fulfillment === 'delivery' ? '~30–45 мин' : '~15 мин')}</strong>
          </div>

          <section className="drawer-section">
            <h3>Состав</h3>
            {selected.items.map((item) => <div className="drawer-row" key={item.name}><span>{item.quantity} × {item.name}</span></div>)}
            <div className="drawer-total"><span>Оплачено</span><strong>{formatDram(selected.total)}</strong></div>
          </section>

          <section className="drawer-section">
            <h3>{selected.fulfillment === 'delivery' ? 'Доставка' : 'Самовывоз'}</h3>
            {selected.address && <p className="address-line">{selected.address}</p>}
            <p>{selected.customer} · {selected.phone}</p>
            {selected.comment && <div className="order-comment">{selected.comment}</div>}
          </section>

          {statusMeta[selected.status].action && (
            <button className="primary-admin-action" onClick={() => moveNext(selected)}>{statusMeta[selected.status].action} →</button>
          )}
          <button className="secondary-admin-action">Проблема с заказом</button>
        </aside>
      )}
    </div>
  )
}

function OrderCard({ order, selected, onSelect }: { order: AdminOrder; selected: boolean; onSelect: () => void }) {
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0)
  return (
    <button className={`order-card ${selected ? 'selected' : ''}`} onClick={onSelect}>
      <div className="order-card-top"><strong>#{order.id}</strong><span>{order.createdAt}</span></div>
      {order.scheduledFor && <div className="scheduled-badge">К {order.scheduledFor}</div>}
      <h3>{order.fulfillment === 'delivery' ? 'Доставка' : 'Самовывоз'}</h3>
      <p>{order.customer}{order.address ? ` · ${order.address}` : ''}</p>
      <div className="order-card-bottom"><span>{itemCount} поз. · {formatDram(order.total)}</span><span className="mini-paid">✓ paid</span></div>
    </button>
  )
}
