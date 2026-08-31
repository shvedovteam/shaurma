import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('ordering flow', () => {
  it('adds a product and opens checkout', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Добавить Шаурма с курицей' }))
    expect(screen.getByRole('button', { name: 'Открыть корзину' })).toHaveTextContent('1 позиция')

    await user.click(screen.getByRole('button', { name: 'Открыть корзину' }))
    expect(screen.getByRole('heading', { name: 'Корзина' })).toBeInTheDocument()
    expect(screen.getByText('Шаурма с курицей')).toBeInTheDocument()
    expect(screen.getByText('Оплата онлайн')).toBeInTheDocument()
    expect(screen.queryByText('Наличными при получении')).not.toBeInTheDocument()
  })

  it('allows scheduled delivery time', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Добавить Шаурма с курицей' }))
    await user.click(screen.getByRole('button', { name: 'Открыть корзину' }))
    await user.click(screen.getByLabelText('Ко времени'))

    const timeInput = screen.getByLabelText('Время доставки')
    expect(timeInput).toBeInTheDocument()
    await user.type(timeInput, '19:30')
    expect(timeInput).toHaveValue('19:30')
  })

  it('switches pickup mode and hides delivery-only fields', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Добавить Шаурма с курицей' }))
    await user.click(screen.getByRole('button', { name: 'Открыть корзину' }))
    await user.click(screen.getByRole('button', { name: 'Заберу сам' }))

    expect(screen.queryByPlaceholderText('Улица, дом, квартира')).not.toBeInTheDocument()
    expect(screen.queryByText('Когда доставить?')).not.toBeInTheDocument()
    expect(screen.getByText('~15 минут')).toBeInTheDocument()
  })
})
