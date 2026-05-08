import { configureStore, Middleware } from '@reduxjs/toolkit';
import settingsReducer from './settingsSlice';
import catReducer from './catSlice';

// Сохранение в localStorage
const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  
  if (typeof window !== 'undefined') {
    const state = store.getState();
    localStorage.setItem('appSettings', JSON.stringify(state.settings));
  }
  
  return result;
};

// Конфигурация store
export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    cats: catReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch