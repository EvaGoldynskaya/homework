'use client';
import { useEffect } from 'react';

import Link from 'next/link';
import { useCart } from '@/app/hooks/useCart';

export default function CartPage() {
  const { items, isLoading, totalItems, totalPrice, clearCart, updateQuantity, removeItem } = useCart();

  const handleDecrement = (quantity:number, productId:number) => {
    if (quantity > 1) {
      updateQuantity(productId, quantity - 1);
    } else {
      removeItem(productId);
    }
  };

  const handleIncrement = (quantity:number, productId:number) => {
    updateQuantity(productId, quantity + 1);
  };

  const handleRemove = (productId:number) => {
    removeItem(productId);
  };

  console.log("items", items)
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-gray-500">Загрузка корзины...</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-4">Корзина пуста</h1>
        <p className="text-gray-500 mb-6">Добавьте товары из каталога</p>
        <Link href="/products" className="card__link">
          Перейти к покупкам
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <div>
        <h1 className="title">Корзина</h1>
        <div className="flex items-center gap-4">
          <span>Кол-во товаров: {totalItems}</span>
          <button
            onClick={() => {
              if (confirm('Очистить корзину?')) {
                clearCart();
              }}}
            >
            Очистить всё
          </button>
        </div>
      </div>
      
      <div >
        {items.map((item) => (
          <div key={item.id} className="card">
            <div >
              <h3 className="card__title">{item.title}</h3>
              <p className="card__price">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-5 m-t-4">
              <button onClick={() => handleDecrement(item.quantity, item.id)} aria-label="Уменьшить количество">-</button>
              <span >{item.quantity}</span>
              <button onClick={() => handleIncrement(item.quantity, item.id)}  aria-label="Увеличить количество">+</button>
              <button onClick={() => handleRemove(item.id)} aria-label="Удалить товар">✕ Удалить</button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div>
          <span>Итого: ${totalPrice.toFixed(2)}</span>
        </div>
        <button 
          onClick={() => {
            alert(`✅ Заказ оформлен! Сумма: $${totalPrice.toFixed(2)}`);
            clearCart();
          }}
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
}