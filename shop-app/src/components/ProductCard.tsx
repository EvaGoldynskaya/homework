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
    <div className="card">
      <img className="image-fluid" src={product.image} alt={product.title} />
      <h3 className="card__title">
        <Link to={`/products/${product.id}`}>{product.title}</Link>
      </h3>
      <p className="card__price">{product.price} $</p>
      <button className="button" onClick={() => dispatch(addToCart(product))}>
        В корзину
      </button>
    </div>
  );
};