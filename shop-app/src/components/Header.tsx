// src/components/Header.tsx
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="title">
        Shop App
      </Link>
      <nav className="header__nav">
        <Link to="/" className="header__link">
          Каталог
        </Link>
        <Link to="/cart" className="header__link">
          Корзина
        </Link>
      </nav>
    </header>
  );
};