import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Admin from './Admin'

describe('admin backoffice', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/admin')
  })

  it('renders the approved order board and selected order drawer', () => {
    render(<Admin />)

    expect(screen.getByRole('heading', { name: 'Заказы' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Доска заказов' })).toBeInTheDocument()
    expect(screen.getByText('21 900 ֏')).toBeInTheDocument()
    expect(screen.getAllByText('#1045').length).toBeGreaterThan(0)
    expect(screen.getByText('через 32 мин')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Отметить «Готово»' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Открыть полную карточку →' })).toHaveAttribute('href', '/admin/order/1045')
  })

  it('changes the selected order from the board', async () => {
    const user = userEvent.setup()
    render(<Admin />)

    await user.click(screen.getByRole('button', { name: /#1048/ }))
    expect(screen.getAllByText('#1048').length).toBeGreaterThan(1)
    expect(screen.getAllByText('Абовяна, 18 · кв. 7').length).toBeGreaterThan(1)
    expect(screen.getByRole('link', { name: 'Открыть полную карточку →' })).toHaveAttribute('href', '/admin/order/1048')
  })

  it('renders the full order details route', () => {
    window.history.pushState({}, '', '/admin/order/1045')
    render(<Admin />)

    expect(screen.getByRole('heading', { name: 'Детали заказа' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Доставка к 17:00' })).toBeInTheDocument()
    expect(screen.getByText('Повторный клиент · 4 заказа')).toBeInTheDocument()
    expect(screen.getByDisplayValue('17:00')).toBeInTheDocument()
  })
})
