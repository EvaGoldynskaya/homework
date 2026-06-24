// src/hooks/useDebounce.ts
import { useEffect, useState } from 'react';

export function useDebounce(value: string, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    // Запускаем таймер на обновление значения
    const id = setTimeout(() => setDebounced(value), delay);

    // Если value изменилось раньше — старый таймер отменяется,
    // отсчёт начинается заново
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}