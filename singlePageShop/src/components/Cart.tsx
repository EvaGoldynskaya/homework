import { useSelector } from "react-redux";
import { RootState } from "../store";
import CartItem from "./CartItem";
import styles from "../styles/Cart.module.css";

type CartProps = {
  discountPercentage?: number;
};

const Cart: React.FC<CartProps> = ({ discountPercentage }) => {
  const { items, totalAmount, totalQuantity } = useSelector(
    (state: RootState) => state.cart
  );
  const hasDiscount = typeof discountPercentage === "number" && discountPercentage > 0;
  const discountedTotal = hasDiscount
    ? totalAmount * (1 - discountPercentage / 100)
    : totalAmount;

  if (items.length === 0) {
    return (
      <section className={styles.cart}>
        <h2 className={styles.title}>Корзина</h2>
        <p className={styles.empty}>Корзина пуста</p>
      </section>
    );
  }

  return (
    <section className={styles.cart}>
      <h2 className={styles.title}>Корзина</h2>
      <div className={styles.items}>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Товаров в корзине:</span>
          <span className={styles.summaryValue}>{totalQuantity}</span>
        </div>
        {hasDiscount && (
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Старая цена:</span>
            <span className={`${styles.summaryValue} ${styles.oldPrice}`}>
              {totalAmount.toFixed(2)} ₽
            </span>
          </div>
        )}
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>
            {hasDiscount ? "Цена со скидкой:" : "Общая стоимость:"}
          </span>
          <span className={styles.summaryValue}>
            {discountedTotal.toFixed(2)} ₽
          </span>
        </div>
      </div>
    </section>
  );
};

export default Cart;
