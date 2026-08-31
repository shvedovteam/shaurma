import { useMemo, useState } from 'react'
import './admin.css'

type OrderStatus = 'new' | 'cooking' | 'ready' | 'delivery' | 'done'
type Fulfillment = 'delivery' | 'pickup'
type OrderFilter = 'active' | 'done' | 'all'

type OrderItem = {
  name: string
  quantity: number
  total?: number
}

type AdminOrder = {
  id: string
  createdAt: string
  scheduledFor?: string
  customer: string
  phone: string
  fulfillment: Fulfillment
  address?: string
  addressDetails?: string
  district?: string
  comment?: string
  total: number
  paid: boolean
  status: OrderStatus
  items: OrderItem[]
  customerNote?: string
}

const initialOrders: AdminOrder[] = [
  {
    id: '1048',
    createdAt: '16:21',
    scheduledFor: '17:15',
    customer: 'Арман',
    phone: '+374 91 555 412',
    fulfillment: 'delivery',
    address: 'Абовяна, 18 · кв. 7',
    comment: 'Позвонить у подъезда',
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
    createdAt: '16:05',
    customer: 'Ани район',
    phone: '+374 96 414 808',
    fulfillment: 'pickup',
    district: 'Ани район',
    total: 3750,
    paid: true,
    status: 'new',
    items: [
      { name: 'Шаурма с курицей', quantity: 1 },
      { name: 'Матнакаш', quantity: 1 },
    ],
  },
  {
    id: '1045',
    createdAt: '15:58',
    scheduledFor: '17:00',
    customer: 'Лилит',
    phone: '+374 93 407 922',
    fulfillment: 'delivery',
    address: 'ул. Горького, 61',
    addressDetails: 'Подъезд 2 · этаж 3',
    comment: 'без лука',
    total: 7800,
    paid: true,
    status: 'cooking',
    items: [
      { name: 'Шаурма с курицей', quantity: 3, total: 5400 },
      { name: 'Матнакаш', quantity: 2, total: 1200 },
    ],
    customerNote: 'Повторный клиент · 4 заказа',
  },
  {
    id: '1044',
    createdAt: '15:42',
    customer: 'Центр',
    phone: '+374 94 220 111',
    fulfillment: 'pickup',
    district: 'Центр',
    total: 4200,
    paid: true,
    status: 'cooking',
    items: [
      { name: 'Шаурма с говядиной', quantity: 2 },
      { name: 'Лаваш', quantity: 1 },
    ],
  },
  {
    id: '1046',
    createdAt: '15:54',
    customer: 'Геворг',
    phone: '+374 77 810 102',
    fulfillment: 'pickup',
    district: 'Геворг',
    total: 3750,
    paid: true,
    status: 'ready',
    items: [
      { name: 'Шаурма острая', quantity: 1 },
      { name: 'Шаурма с курицей', quantity: 1 },
    ],
  },
  {
    id: '1043',
    createdAt: '15:36',
    customer: 'Нарек',
    phone: '+374 99 611 021',
    fulfillment: 'delivery',
    address: 'Ширакаци, 9',
    total: 6250,
    paid: true,
    status: 'delivery',
    items: [
      { name: 'Шаурма с говядиной', quantity: 2 },
      { name: 'Шаурма с курицей', quantity: 1 },
      { name: 'Матнакаш', quantity: 1 },
    ],
  },
]

const statusMeta: Record<OrderStatus, { title: string; action?: string; next?: OrderStatus; tone: string }> = {
  new: { title: 'Новые', action: 'Принять и готовить', next: 'cooking', tone: 'red' },
  cooking: { title: 'Готовим', action: 'Отметить «Готово»', next: 'ready', tone: 'amber' },
  ready: { title: 'Готово', action: 'Передать курьеру', next: 'delivery', tone: 'green' },
  delivery: { title: 'Доставка', action: 'Завершить заказ', next: 'done', tone: 'blue' },
  done: { title: 'Завершённые', tone: 'muted' },
}

const boardStatuses: OrderStatus[] = ['new', 'cooking', 'ready', 'delivery']
const detailSteps = ['Получен', 'Готовим', 'Готово', 'Курьер', 'Завершён']

function formatDram(value: number) {
  return `${new Intl.NumberFormat('ru-RU').format(value)} ֏`
}

function orderLocation(order: AdminOrder) {
  if (order.fulfillment === 'pickup') return order.district ?? order.customer
  return order.address ?? ''
}

function orderTiming(order: AdminOrder) {
  if (order.fulfillment === 'pickup') return order.scheduledFor ? `Самовывоз · ${order.scheduledFor}` : 'Самовывоз · ASAP'
  return order.scheduledFor ? `Доставка · ${order.scheduledFor}` : 'Доставка · ASAP'
}

function stepIndex(status: OrderStatus) {
  if (status === 'new') return 0
  if (status === 'cooking') return 1
  if (status === 'ready') return 2
  if (status === 'delivery') return 3
  return 4
}

export default function Admin() {
  const [orders, setOrders] = useState(initialOrders)
  const [selectedId, setSelectedId] = useState('1045')
  const [activeFilter, setActiveFilter] = useState<OrderFilter>('active')

  const detailMatch = window.location.pathname.match(/^\/admin\/order\/(\d+)/)
  const detailOrder = detailMatch ? orders.find((order) => order.id === detailMatch[1]) ?? orders[0] : undefined

  const visibleOrders = useMemo(() => {
    if (activeFilter === 'active') return orders.filter((order) => order.status !== 'done')
    if (activeFilter === 'done') return orders.filter((order) => order.status === 'done')
    return orders
  }, [orders, activeFilter])

  const selected = orders.find((order) => order.id === selectedId) ?? visibleOrders[0]
  const activeCount = orders.filter((order) => order.status !== 'done').length
  const scheduledCount = orders.filter((order) => order.scheduledFor && order.status !== 'done').length

  const moveNext = (order: AdminOrder) => {
    const next = statusMeta[order.status].next
    if (!next) return
    setOrders((current) => current.map((candidate) => candidate.id === order.id ? { ...candidate, status: next } : candidate))
  }

  if (detailOrder) {
    return <OrderDetails order={detailOrder} onMoveNext={moveNext} />
  }

  return (
    <div className="admin-shell admin-board-shell">
      <Sidebar activeCount={activeCount} />

      <main className="admin-main">
        <AdminHeader kicker="СЕГОДНЯ · 31 АВГУСТА" title="Заказы" subtitle="Оплаченные заказы появляются здесь автоматически после подтверждения платежа." />

        <section className="admin-metrics" aria-label="Показатели смены">
          <article><span>Активные</span><strong>{activeCount}</strong></article>
          <article><span>Ко времени</span><strong>{scheduledCount}</strong></article>
          <article><span>Оплачено сегодня</span><strong>21 900 ֏</strong></article>
        </section>

        <div className="admin-filter-tabs" aria-label="Фильтр заказов">
          <button className={activeFilter === 'active' ? 'active' : ''} onClick={() => setActiveFilter('active')}>В работе</button>
          <button className={activeFilter === 'done' ? 'active' : ''} onClick={() => setActiveFilter('done')}>Завершённые</button>
          <button className={activeFilter === 'all' ? 'active secondary' : 'secondary'} onClick={() => setActiveFilter('all')}>Все</button>
        </div>

        {activeFilter === 'active' ? (
          <section className="order-board" aria-label="Доска заказов">
            {boardStatuses.map((status) => {
              const columnOrders = visibleOrders.filter((order) => order.status === status)
              return (
                <div className="order-column" key={status}>
                  <div className="column-heading">
                    <h2>{statusMeta[status].title}</h2>
                    <span>{columnOrders.length}</span>
                  </div>
                  <div className="column-stack">
                    {columnOrders.map((order) => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        selected={selected?.id === order.id}
                        onSelect={() => setSelectedId(order.id)}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </section>
        ) : (
          <section className="completed-list">
            {visibleOrders.length === 0
              ? <p>Пока нет завершённых заказов.</p>
              : visibleOrders.map((order) => (
                <OrderCard key={order.id} order={order} selected={selected?.id === order.id} onSelect={() => setSelectedId(order.id)} />
              ))}
          </section>
        )}

        <p className="admin-prototype-note">Prototype · Backoffice v1</p>
      </main>

      {selected && <OrderDrawer order={selected} onMoveNext={moveNext} />}
    </div>
  )
}

function Sidebar({ activeCount }: { activeCount: number }) {
  return (
    <aside className="admin-sidebar">
      <div>
        <a className="admin-brand" href="/admin">GUMRI<span>OFFICE</span></a>
        <nav className="admin-nav" aria-label="Backoffice">
          <a className="active" href="/admin">Заказы <span className="nav-count">{activeCount}</span></a>
          <button type="button">Меню</button>
          <button type="button">Доставка</button>
          <button type="button">Промокоды</button>
          <button type="button">Клиенты</button>
          <button type="button">Отчёты</button>
        </nav>
      </div>
      <div className="admin-store-state"><span className="store-dot" /> Принимаем заказы</div>
    </aside>
  )
}

function AdminHeader({ kicker, title, subtitle }: { kicker: string; title: string; subtitle: string }) {
  return (
    <header className="admin-header">
      <div>
        <p className="admin-kicker">{kicker}</p>
        <h1>{title}</h1>
        <p className="admin-subtitle">{subtitle}</p>
      </div>
      <div className="admin-header-actions">
        <span className="open-pill">●&nbsp;&nbsp;OPEN</span>
        <div className="admin-avatar">GS</div>
      </div>
    </header>
  )
}

function OrderCard({ order, selected, onSelect }: { order: AdminOrder; selected: boolean; onSelect: () => void }) {
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0)
  return (
    <button className={`order-card ${selected ? 'selected' : ''}`} onClick={onSelect}>
      <div className="order-card-top"><strong>#{order.id}</strong><span>{order.createdAt}</span></div>
      <h3>{orderTiming(order)}</h3>
      <p>{orderLocation(order)}</p>
      <div className="order-card-bottom">
        <span>{itemCount} поз.</span>
        <strong>{formatDram(order.total)}</strong>
      </div>
      <span className={`order-status-dot ${statusMeta[order.status].tone}`} aria-hidden="true" />
    </button>
  )
}

function OrderDrawer({ order, onMoveNext }: { order: AdminOrder; onMoveNext: (order: AdminOrder) => void }) {
  return (
    <aside className="order-drawer">
      <div className="drawer-topline">
        <div>
          <span>ЗАКАЗ</span>
          <h2><a href={`/admin/order/${order.id}`}>#{order.id}</a></h2>
        </div>
        <span className="paid-badge">✓ Оплачен</span>
      </div>

      <div className="drawer-time">
        <div>
          <span>{order.fulfillment === 'delivery' ? 'Доставить' : 'Самовывоз'}</span>
          <strong>{order.scheduledFor ?? (order.fulfillment === 'delivery' ? '~30–45 мин' : '~15 мин')}</strong>
        </div>
        {order.scheduledFor && <span className="countdown-pill">через 32 мин</span>}
      </div>

      <a
        className="secondary-admin-action"
        href={`/admin/order/${order.id}`}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
      >
        Открыть полную карточку →
      </a>

      <section className="drawer-section">
        <h3>Состав</h3>
        {order.items.map((item) => <p className="drawer-item" key={item.name}>{item.quantity} × {item.name}</p>)}
        <div className="drawer-total"><span>Оплачено</span><strong>{formatDram(order.total)}</strong></div>
      </section>

      <section className="drawer-section">
        <h3>{order.fulfillment === 'delivery' ? 'Доставка' : 'Самовывоз'}</h3>
        {order.address && <p className="address-line">{order.address}</p>}
        <p>{order.customer} · {order.phone}</p>
        {order.comment && <p>Комментарий: {order.comment}</p>}
      </section>

      <section className="drawer-status-section">
        <h3>Статус</h3>
        <span className={`status-pill ${statusMeta[order.status].tone}`}>{statusMeta[order.status].title}</span>
        {statusMeta[order.status].action && (
          <>
            <p className="next-step-label">Следующий шаг</p>
            <button className="primary-admin-action" onClick={() => onMoveNext(order)}>{statusMeta[order.status].action}</button>
          </>
        )}
        <button className="secondary-admin-action">Проблема с заказом</button>
      </section>
    </aside>
  )
}

function OrderDetails({ order, onMoveNext }: { order: AdminOrder; onMoveNext: (order: AdminOrder) => void }) {
  const currentStep = stepIndex(order.status)
  return (
    <div className="admin-shell admin-detail-shell">
      <Sidebar activeCount={initialOrders.filter((item) => item.status !== 'done').length} />
      <main className="admin-detail-main">
        <AdminHeader
          kicker={`ЗАКАЗ #${order.id}`}
          title="Детали заказа"
          subtitle="Полная карточка для спорных ситуаций, изменения времени и связи с клиентом."
        />

        <div className="detail-layout">
          <section className="detail-card">
            <div className="detail-card-head">
              <div>
                <p>#{order.id} · 31 августа, {order.createdAt}</p>
                <h2>{order.fulfillment === 'delivery' ? `Доставка к ${order.scheduledFor ?? 'ASAP'}` : 'Самовывоз'}</h2>
              </div>
              <span className="paid-badge">✓ Оплачен</span>
            </div>

            <div className="detail-steps" aria-label="Этапы заказа">
              {detailSteps.map((step, index) => <span key={step} className={index <= currentStep ? 'active' : ''}>{step}</span>)}
            </div>

            <section className="detail-section">
              <h3>Состав заказа</h3>
              <div className="detail-items">
                {order.items.map((item) => (
                  <div className="detail-item-row" key={item.name}>
                    <span>{item.name}</span>
                    <span>{item.quantity}</span>
                    <strong>{formatDram(item.total ?? Math.round(order.total / Math.max(order.items.length, 1)))}</strong>
                  </div>
                ))}
                {order.fulfillment === 'delivery' && (
                  <div className="detail-item-row">
                    <span>Доставка</span><span>—</span><strong>1 200 ֏</strong>
                  </div>
                )}
              </div>
              <div className="detail-total"><span>Итого оплачено</span><strong>{formatDram(order.total)}</strong></div>
            </section>

            <section className="detail-section customer-section">
              <h3>Клиент и доставка</h3>
              <div className="customer-grid">
                <article>
                  <strong>{order.customer}</strong>
                  <span>{order.phone}</span>
                  <small>{order.customerNote ?? 'Клиент'}</small>
                </article>
                <article>
                  <strong>{order.address ?? 'Самовывоз'}</strong>
                  <span>{order.addressDetails ?? order.district ?? 'Точка в Гюмри'}</span>
                  <small>{order.comment ? `Комментарий: ${order.comment}` : 'Без комментария'}</small>
                </article>
              </div>
            </section>

            <section className="detail-section history-section">
              <h3>История</h3>
              <p>15:58&nbsp;&nbsp;Оплата подтверждена</p>
              <p>16:01&nbsp;&nbsp;Заказ принят кухней</p>
            </section>
          </section>

          <aside className="detail-actions-card">
            <h2>Управление заказом</h2>
            <p className="detail-field-label">Текущее состояние</p>
            <span className={`status-pill ${statusMeta[order.status].tone}`}>{statusMeta[order.status].title}</span>
            <label className="detail-time-field">
              <span>Время доставки</span>
              <input type="time" defaultValue={order.scheduledFor ?? '17:00'} />
            </label>
            {statusMeta[order.status].action && <button className="detail-primary" onClick={() => onMoveNext(order)}>{statusMeta[order.status].action}</button>}
            <div className="detail-secondary-grid">
              <a href={`tel:${order.phone}`}>Позвонить</a>
              <button type="button">Отменить</button>
            </div>
          </aside>
        </div>

        <p className="admin-prototype-note">Prototype · Backoffice v1</p>
      </main>
    </div>
  )
}
