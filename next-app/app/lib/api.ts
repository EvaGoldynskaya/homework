import { mockProducts } from './mockProducts';

export async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    if (res.status === 403) {
      console.warn(`Error 403 from ${url}. Use mock`);
      if (url.includes('/products') && !url.includes('/products/')) {
        return mockProducts as T;
      }
      
      if (url.includes('/products/')) {
        const id = parseInt(url.split('/products/')[1]);
        const product = mockProducts.find(p => p.id === id);
        if (product) {
          return product as T;
        }
        throw new Error(`Товар с ID ${id} не найден в мок-данных`);
      }
    }
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  
  const text = await res.text();
  if (!text) {
    throw new Error(`Empty response body for ${url}`);
  }
  try {
    return JSON.parse(text) as T;
  } catch (error) {
    throw new Error(`Failed to parse JSON from ${url}: ${error}`);
  }
}