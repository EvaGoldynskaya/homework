import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { renderWithProviders } from '../test-utils';
import ProductPage from './ProductPage';

function renderProductPage(route = '/products/1') {
  return renderWithProviders(
    <Routes>
      <Route path="/products/:id" element={<ProductPage />} />
    </Routes>,
    route
  );
}

describe('ProductPage', () => {
  test('показывает состояние загрузки перед ответом сервера', () => {
    global.fetch = vi.fn(() => new Promise(() => {}));

    renderProductPage();

    expect(screen.getByText(/загрузка/i)).toBeInTheDocument();
  });

  test('показывает ошибку, если сервер вернул не-OK', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({ ok: false, status: 500 } as Response)
    );

    renderProductPage();

    const errorMessage = await screen.findByText(/ошибка/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('отображает данные товара и добавляет его в корзину', async () => {
    const product = {
      id: 1,
      title: 'Test Book',
      price: 10,
      category: 'electronics',
      image: 'https://unsplash.com/photos/book-near-eyeglasses-and-cappuccino-nGrfKmtwv24',
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(product),
      } as Response)
    );

    const { store } = renderProductPage('/products/1');

    expect(await screen.findByText(/test book/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /test book/i })).toHaveAttribute('src',product.image);

    await userEvent.click(screen.getByRole('button', { name: /добавить в корзину/i }));

    expect(store.getState().cart.items).toHaveLength(1);
    expect(store.getState().cart.items[0]).toMatchObject({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
    });
  });
});
