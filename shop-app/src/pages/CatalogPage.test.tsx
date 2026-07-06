import { screen } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import CatalogPage from './CatalogPage';

describe('CatalogPage', () => {
  test('показывает ошибку, если сервер вернул не-OK', async () => {
    // Подменяем глобальный fetch — будто сервер вернул 500
    global.fetch = vi.fn(() =>
      Promise.resolve({ ok: false, status: 500 } as Response)
    );

    renderWithProviders(<CatalogPage />);

    // findBy ждёт появления элемента (до 1 секунды по умолчанию)
    const errorMessage = await screen.findByText(/ошибка/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('показывает товары после успешной загрузки', async () => {
    const products = [{
      id: 1,
      title: 'Test Book',
      price: 10,
      category: 'electronics',
      image: 'https://unsplash.com/photos/black-android-smartphone-beside-black-ceramic-mug-on-brown-wooden-table-ppg7GuXOUYc',
    }];

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(products),
      } as Response)
    );

    renderWithProviders(<CatalogPage />);

    expect(await screen.findByText(/test book/i)).toBeInTheDocument();
  });
});