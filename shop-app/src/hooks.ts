// src/app/hooks.ts
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store/store';

// Используйте эти хуки вместо обычных useSelector/useDispatch —
// они уже знают типы вашего store
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();