import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../test-utils';
import { addToCart } from '../store/cartSlice';
import { CartPage } from './CartPage';

describe('CartPage', () => {
  test('показывает сообщение, если корзина пуста', () => {
    renderWithProviders(<CartPage />);

    expect(screen.getByText(/корзина пуста/i)).toBeInTheDocument();
  });

  test('показывает товары из корзины и позволяет удалить их', async () => {
    const product = {
      id: 1,
      title: 'Test Book',
      price: 10,
      category: 'electronics',
      image: 'https://unsplash.com/photos/black-android-smartphone-beside-black-ceramic-mug-on-brown-wooden-table-ppg7GuXOUYc',
    };

    const { store } = renderWithProviders(<CartPage />);

    store.dispatch(addToCart(product));

    expect(await screen.findByRole('heading', { name: /корзина/i })).toBeInTheDocument();
    expect(await screen.findByText(/test book/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /удалить/i }));

    expect(await screen.findByText(/корзина пуста/i)).toBeInTheDocument();
  });
});