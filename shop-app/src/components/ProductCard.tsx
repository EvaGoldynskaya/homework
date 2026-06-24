// src/components/ProductCard.tsx
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { addToCart } from '../store/cartSlice';

interface Props {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
}

export const ProductCard = ({ product }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div style={{ border: '1px solid #ddd', padding: 10, marginBottom: 10 }}>
      <img src={product.image} width={100} alt={product.title} />
      {/* Ссылка ведёт на параметризованный маршрут */}
      <h3>
        <Link to={`/products/${product.id}`}>{product.title}</Link>
      </h3>
      <p>{product.price} $</p>
      <button onClick={() => dispatch(addToCart(product))}>
        В корзину
      </button>
    </div>
  );
};