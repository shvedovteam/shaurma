export type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: 'shawarma' | 'bakery'
  spicy?: boolean
}

export const menuItems: MenuItem[] = [
  {
    id: 'chicken',
    name: 'Шаурма с курицей',
    description: 'Курица, свежие овощи, фирменный соус, лаваш',
    price: 1800,
    image: '/images/shawarma-chicken.webp',
    category: 'shawarma',
  },
  {
    id: 'beef',
    name: 'Шаурма с говядиной',
    description: 'Говядина, овощи, зелень, соус, лаваш',
    price: 2100,
    image: '/images/shawarma-beef.webp',
    category: 'shawarma',
  },
  {
    id: 'spicy',
    name: 'Острая шаурма',
    description: 'Курица, овощи, острый соус, перец чили, лаваш',
    price: 1900,
    image: '/images/shawarma-spicy.webp',
    category: 'shawarma',
    spicy: true,
  },
  {
    id: 'lavash',
    name: 'Лаваш',
    description: 'Свежий, из печи',
    price: 250,
    image: '/images/bread-lavash-matnakash.webp',
    category: 'bakery',
  },
  {
    id: 'matnakash',
    name: 'Матнакаш',
    description: 'Свежий, из печи',
    price: 600,
    image: '/images/bread-lavash-matnakash.webp',
    category: 'bakery',
  },
]

export const formatDram = (value: number) => `${value.toLocaleString('ru-RU')} ֏`
