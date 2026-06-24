// src/pages/CartPage.tsx
import { useAppDispatch, useAppSelector } from '../hooks';
import { removeFromCart } from '../store/cartSlice';

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  // Итоговую сумму считаем на лету — производные значения в store не храним
  const total = items.reduce((sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return <p>Корзина пуста</p>;
  }

  return (
    <div>
      <h1>Корзина</h1>
      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: 10 }}>
          <h3>{item.title}</h3>
          <p>{item.quantity} × {item.price} $</p>
          <button onClick={() => dispatch(removeFromCart(item.id))}>
            Удалить
          </button>
        </div>
      ))}
      <h2>Итого: {total.toFixed(2)} $</h2>
    </div>
  );
};