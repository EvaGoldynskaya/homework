// src/hooks/useLocalStorage.ts
import { useEffect, useState } from 'react';

export function useLocalStorage(key: string, initialValue: any) {
  // Ленивая инициализация: localStorage читается ОДИН раз при создании
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : initialValue;
  });

  // Сохраняем в localStorage при каждом изменении value
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}