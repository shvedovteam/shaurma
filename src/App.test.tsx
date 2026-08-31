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
  })

  it('switches pickup mode and hides address field', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Добавить Шаурма с курицей' }))
    await user.click(screen.getByRole('button', { name: 'Открыть корзину' }))
    await user.click(screen.getByRole('button', { name: 'Заберу сам' }))

    expect(screen.queryByPlaceholderText('Улица, дом, квартира')).not.toBeInTheDocument()
    expect(screen.getByText('~15 минут')).toBeInTheDocument()
  })
})
