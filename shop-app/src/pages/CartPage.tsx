// src/pages/CartPage.tsx
import { useAppDispatch, useAppSelector } from '../hooks';
import { removeFromCart } from '../store/cartSlice';

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  // Итоговую сумму считаем на лету — производные значения в store не храним
  const total = items.reduce((sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return <p className="text-muted">Корзина пуста</p>;
  }

  return (
    <div className="page">
      <h1 className="title">Корзина</h1>
      <div className="list">
        {items.map((item) => (
          <div key={item.id} className="panel list-item">
            <div>
              <h3 className="card__title">{item.title}</h3>
              <p className="text-muted">{item.quantity} × {item.price} $</p>
            </div>
            <button className="button" onClick={() => dispatch(removeFromCart(item.id))}>
              Удалить
            </button>
          </div>
        ))}
      </div>
      <h2 className="title">Итого: {total.toFixed(2)} $</h2>
    </div>
  );
};