// src/test-utils.tsx
import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import uiReducer from './store/uiSlice';
import cartReducer from './store/cartSlice';

// Рендерит компонент со свежим store и роутером.
// route — начальный URL, нужен для тестов параметризованных маршрутов
export function renderWithProviders(ui: ReactElement, route = '/') {
  const store = configureStore({
    reducer: { ui: uiReducer, cart: cartReducer },
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </Provider>
    ),
  };
}