import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../test-utils';
import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  const product = {
    id: 1,
    title: 'Test Book',
    price: 10,
    image: 'https://unsplash.com/photos/book-near-eyeglasses-and-cappuccino-nGrfKmtwv24',
  };

  test('отображает данные товара и ссылку на страницу товара', () => {
    renderWithProviders(<ProductCard product={product} />);

    expect(screen.getByRole('img', { name: /test book/i })).toHaveAttribute(
      'src',
      product.image
    );
    expect(screen.getByRole('link', { name: /test book/i })).toHaveAttribute(
      'href',
      `/products/${product.id}`
    );
    expect(screen.getByText(/10\s*\$/i)).toBeInTheDocument();
  });

  test('клик по кнопке добавляет товар в корзину', async () => {
    const { store } = renderWithProviders(<ProductCard product={product} />);

    expect(store.getState().cart.items).toHaveLength(0);

    await userEvent.click(
      screen.getByRole('button', { name: /в корзину/i })
    );

    expect(store.getState().cart.items).toHaveLength(1);
    expect(store.getState().cart.items[0]).toMatchObject({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
    });
  });
});