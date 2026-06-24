// src/App.tsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { CartPage } from './pages/CartPage';

// Ленивая загрузка: эти страницы подгрузятся,
// только когда пользователь на них перейдёт.
// В импортируемом файле должен быть export default
const CatalogPage = lazy(() => import('./pages/CatalogPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <Header />
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}