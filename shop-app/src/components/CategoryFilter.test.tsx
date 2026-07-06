// src/components/CategoryFilter.test.tsx
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../test-utils';
import { CategoryFilter } from './CategoryFilter ';

describe('CategoryFilter', () => {
  test('отображает кнопки категорий', () => {
    renderWithProviders(<CategoryFilter />);

    expect(screen.getByRole('button', { name: /все/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /electronics/i })).toBeInTheDocument();
  });

  test('клик по категории сохраняет её в store', async () => {
    const { store } = renderWithProviders(<CategoryFilter />);

    // По умолчанию категория не выбрана
    expect(store.getState().ui.selectedCategory).toBeNull();

    // Кликаем как реальный пользователь
    await userEvent.click(screen.getByRole('button', { name: /electronics/i }));

    // Store должен обновиться
    expect(store.getState().ui.selectedCategory).toBe('electronics');
  });
});