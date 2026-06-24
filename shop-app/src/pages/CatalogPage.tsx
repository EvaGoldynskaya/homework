// src/pages/CatalogPage.tsx
import { useState } from 'react';
import { useAppSelector } from '../hooks';
import { useFetch } from '../hooks/useFetch';
import { useDebounce } from '../hooks/useDebounce';
import { CategoryFilter } from '../components/CategoryFilter ';
import { ProductCard } from '../components/ProductCard';

export default function CatalogPage() {
  // Загружаем все товары через кастомный хук
  const { data: products, loading, error } = useFetch('https://fakestoreapi.com/products');

  console.log("products", products)

  // Поиск с дебаунсом — фильтрация не дёргается на каждой букве
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);

  // Выбранная категория — из Redux
  const selectedCategory = useAppSelector((state) => state.ui.selectedCategory);

  // Фильтруем на лету: сначала по категории, потом по поиску
  const filtered = (products ?? [])
    .filter((p: any) => selectedCategory ? p.category === selectedCategory : true)
    .filter((p: any) => p.title.toLowerCase().includes(debouncedSearch.toLowerCase()));

  if (loading) return <p>Загрузка каталога...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div>
      <h1>Каталог ({filtered.length})</h1>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Поиск товара..."
        style={{ padding: 8, width: 300, marginBottom: 20 }}
      />
      <CategoryFilter />
      {filtered.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}