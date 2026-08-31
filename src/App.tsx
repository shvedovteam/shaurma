import { FormEvent, useMemo, useState } from 'react'
import { formatDram, menuItems, type MenuItem } from './data/menu'
import './styles.css'

type CartState = Record<string, number>
type Fulfillment = 'delivery' | 'pickup'
type View = 'storefront' | 'checkout' | 'success'

const heroItem = menuItems.find((item) => item.id === 'chicken')!
const shawarmas = menuItems.filter((item) => item.category === 'shawarma')
const bakery = menuItems.filter((item) => item.category === 'bakery')

function App() {
  const [cart, setCart] = useState<CartState>({})
  const [view, setView] = useState<View>('storefront')
  const [fulfillment, setFulfillment] = useState<Fulfillment>('delivery')

  const cartItems = useMemo(
    () =>
      menuItems
        .filter((item) => (cart[item.id] ?? 0) > 0)
        .map((item) => ({ item, quantity: cart[item.id] })),
    [cart],
  )

  const cartCount = cartItems.reduce((sum, entry) => sum + entry.quantity, 0)
  const subtotal = cartItems.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0)

  const add = (item: MenuItem) => {
    setCart((current) => ({ ...current, [item.id]: (current[item.id] ?? 0) + 1 }))
  }

  const decrement = (item: MenuItem) => {
    setCart((current) => {
      const quantity = Math.max(0, (current[item.id] ?? 0) - 1)
      const next = { ...current, [item.id]: quantity }
      if (quantity === 0) delete next[item.id]
      return next
    })
  }

  const submitOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setView('success')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (view === 'checkout') {
    return (
      <Checkout
        cartItems={cartItems}
        subtotal={subtotal}
        fulfillment={fulfillment}
        onFulfillmentChange={setFulfillment}
        onBack={() => setView('storefront')}
        onAdd={add}
        onDecrement={decrement}
        onSubmit={submitOrder}
      />
    )
  }

  if (view === 'success') {
    return (
      <main className="success-page">
        <div className="success-card">
          <div className="success-mark">✓</div>
          <p className="eyebrow">ЗАКАЗ ПРИНЯТ</p>
          <h1>Уже готовим.</h1>
          <p>Мы подтвердим заказ по телефону. Для прототипа оплата и отправка заказа пока не подключены.</p>
          <button className="button button-dark" onClick={() => { setCart({}); setView('storefront') }}>
            Вернуться в меню
          </button>
        </div>
      </main>
    )
  }

  return (
    <div className="site-shell">
      <Header cartCount={cartCount} onOrder={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })} />

      <main>
        <section className="hero section-shell">
          <div className="hero-copy">
            <p className="eyebrow">ГОРЯЧАЯ ЕДА / ГЮМРИ</p>
            <h1>ГОРЯЧЕЕ.<br />СВЕЖЕЕ.<br />СЕЙЧАС.</h1>
            <p className="hero-lead">Шаурма, выпечка, свежий хлеб и лаваш. Закажите доставку или заберите сами.</p>
            <div className="hero-actions">
              <button className="button button-red" onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}>
                Заказать еду
              </button>
              <span>Самовывоз ~15 мин · Доставка от ~30 мин</span>
            </div>
          </div>
          <div className="hero-media">
            <img src="/images/hero-shawarma.webp" alt="Свежая шаурма" />
          </div>
        </section>

        <section className="menu-section section-shell" id="menu">
          <div className="section-heading-row">
            <h2>Что будете есть?</h2>
            <p>Выбирайте — добавим в корзину сразу.</p>
          </div>
          <div className="category-row" aria-label="Категории меню">
            <button className="chip chip-active">Шаурма</button>
            <button className="chip">Пирожки</button>
            <button className="chip">Хлеб и лаваш</button>
            <button className="chip">Напитки</button>
          </div>
          <div className="product-grid">
            {shawarmas.map((item) => (
              <ProductCard key={item.id} item={item} quantity={cart[item.id] ?? 0} onAdd={add} onDecrement={decrement} />
            ))}
          </div>
        </section>

        <section className="bakery section-shell">
          <div className="bakery-media">
            <img src="/images/bread-lavash-matnakash.webp" alt="Свежий лаваш и матнакаш" />
          </div>
          <div className="bakery-copy">
            <p className="eyebrow">ПЕЧЁМ ЗДЕСЬ</p>
            <h2>Свежий хлеб каждый день.</h2>
            <p>Лаваш и матнакаш готовим здесь. Можно добавить к заказу или забрать отдельно.</p>
            <div className="bakery-list">
              {bakery.map((item) => (
                <button key={item.id} className="bakery-row" onClick={() => add(item)}>
                  <span>{item.name}</span>
                  <span>{formatDram(item.price)} <strong>+</strong></span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="ordering section-shell">
          <h2>Заказ — без лишних шагов.</h2>
          <div className="steps-grid">
            <article><span>01</span><h3>Выберите еду</h3><p>Добавляйте позиции прямо из меню.</p></article>
            <article><span>02</span><h3>Доставка или самовывоз</h3><p>Сразу показываем ориентировочное время.</p></article>
            <article><span>03</span><h3>Телефон и адрес</h3><p>Без обязательной регистрации и аккаунта.</p></article>
          </div>
        </section>
      </main>

      <footer className="footer section-shell">
        <strong>GUMRI</strong>
        <span>Гюмри · доставка и самовывоз</span>
        <span>RU · HY</span>
      </footer>

      {cartCount > 0 && (
        <button className="cart-bar" onClick={() => setView('checkout')} aria-label="Открыть корзину">
          <span>Корзина · {cartCount} {pluralPosition(cartCount)}</span>
          <strong>{formatDram(subtotal)} →</strong>
        </button>
      )}
    </div>
  )
}

function Header({ cartCount, onOrder }: { cartCount: number; onOrder: () => void }) {
  return (
    <header className="header section-shell">
      <a href="#" className="brand">GUMRI</a>
      <nav className="desktop-nav" aria-label="Основная навигация">
        <a href="#menu">Меню</a>
        <a href="#delivery">Доставка и самовывоз</a>
        <a href="#contacts">Контакты</a>
      </nav>
      <div className="header-actions">
        <span className="language">RU&nbsp;&nbsp;HY</span>
        <button className="button button-dark header-order" onClick={onOrder}>Заказать{cartCount > 0 ? ` · ${cartCount}` : ''}</button>
      </div>
    </header>
  )
}

function ProductCard({ item, quantity, onAdd, onDecrement }: { item: MenuItem; quantity: number; onAdd: (item: MenuItem) => void; onDecrement: (item: MenuItem) => void }) {
  return (
    <article className="product-card">
      <div className="product-media"><img src={item.image} alt={item.name} /></div>
      <div className="product-body">
        <div>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </div>
        <div className="product-bottom">
          <strong>{formatDram(item.price)}</strong>
          {quantity === 0 ? (
            <button className="round-button" onClick={() => onAdd(item)} aria-label={`Добавить ${item.name}`}>+</button>
          ) : (
            <div className="quantity-control">
              <button onClick={() => onDecrement(item)} aria-label={`Уменьшить ${item.name}`}>−</button>
              <span>{quantity}</span>
              <button onClick={() => onAdd(item)} aria-label={`Добавить еще ${item.name}`}>+</button>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

function Checkout({ cartItems, subtotal, fulfillment, onFulfillmentChange, onBack, onAdd, onDecrement, onSubmit }: {
  cartItems: { item: MenuItem; quantity: number }[]
  subtotal: number
  fulfillment: Fulfillment
  onFulfillmentChange: (value: Fulfillment) => void
  onBack: () => void
  onAdd: (item: MenuItem) => void
  onDecrement: (item: MenuItem) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}) {
  if (cartItems.length === 0) {
    return <main className="empty-cart"><h1>Корзина пустая</h1><button className="button button-dark" onClick={onBack}>Вернуться в меню</button></main>
  }

  return (
    <div className="checkout-page">
      <header className="checkout-header section-shell">
        <button className="text-button" onClick={onBack}>← Назад в меню</button>
        <strong className="brand">GUMRI</strong>
        <span>RU · HY</span>
      </header>
      <main className="checkout-grid section-shell">
        <section className="checkout-cart">
          <p className="eyebrow">ВАШ ЗАКАЗ</p>
          <h1>Корзина</h1>
          <div className="cart-items">
            {cartItems.map(({ item, quantity }) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt="" />
                <div className="cart-item-copy"><strong>{item.name}</strong><span>{formatDram(item.price)}</span></div>
                <div className="quantity-control light">
                  <button onClick={() => onDecrement(item)} aria-label={`Уменьшить ${item.name}`}>−</button>
                  <span>{quantity}</span>
                  <button onClick={() => onAdd(item)} aria-label={`Добавить еще ${item.name}`}>+</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <form className="checkout-form" onSubmit={onSubmit}>
          <div className="fulfillment-tabs" role="tablist" aria-label="Способ получения">
            <button type="button" className={fulfillment === 'delivery' ? 'active' : ''} onClick={() => onFulfillmentChange('delivery')}>Доставка</button>
            <button type="button" className={fulfillment === 'pickup' ? 'active' : ''} onClick={() => onFulfillmentChange('pickup')}>Заберу сам</button>
          </div>

          <div className="eta-box">
            <span>{fulfillment === 'delivery' ? 'Доставка' : 'Самовывоз'}</span>
            <strong>{fulfillment === 'delivery' ? '~30–45 минут' : '~15 минут'}</strong>
          </div>

          <div className="field-grid two">
            <label>Имя<input name="name" autoComplete="name" required placeholder="Ваше имя" /></label>
            <label>Телефон<input name="phone" autoComplete="tel" inputMode="tel" required placeholder="+374" /></label>
          </div>

          {fulfillment === 'delivery' && (
            <label>Адрес<input name="address" autoComplete="street-address" required placeholder="Улица, дом, квартира" /></label>
          )}

          <label>Комментарий к заказу<textarea name="comment" rows={3} placeholder="Например: без лука" /></label>

          <fieldset className="payment-fieldset">
            <legend>Оплата</legend>
            <label><input type="radio" name="payment" value="cash" defaultChecked /> Наличными при получении</label>
            <label><input type="radio" name="payment" value="card" /> Картой при получении</label>
          </fieldset>

          <div className="order-summary">
            <div><span>Еда</span><strong>{formatDram(subtotal)}</strong></div>
            <div><span>Доставка</span><strong>{fulfillment === 'delivery' ? 'по адресу' : '0 ֏'}</strong></div>
            <div className="summary-total"><span>Итого</span><strong>{formatDram(subtotal)}</strong></div>
          </div>

          <button className="button button-red submit-order" type="submit">Оформить заказ →</button>
          <p className="form-note">Никакой регистрации. Подтверждение заказа — по телефону.</p>
        </form>
      </main>
    </div>
  )
}

function pluralPosition(count: number) {
  if (count % 10 === 1 && count % 100 !== 11) return 'позиция'
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return 'позиции'
  return 'позиций'
}

export default App
