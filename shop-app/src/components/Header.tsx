// src/components/Header.tsx
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header style={{ display: 'flex', gap: 20, padding: 15, background: '#eee' }}>
      <Link to="/">Каталог</Link>
      <Link to="/cart">Корзина</Link>
    </header>
  );
};