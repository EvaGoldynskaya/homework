// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
  },
});

// Типы выводим из самого store — обновятся автоматически
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;