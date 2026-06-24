// src/pages/ProductPage.tsx
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useAppDispatch } from '../hooks';
import { addToCart } from '../store/cartSlice';

export default function ProductPage() {
  // Получаем id из URL — например, для /products/5 это '5'
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { data: product, loading, error } = useFetch(
    `https://fakestoreapi.com/products/${id}`
  );

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;
  if (!product) return null;

  return (
    <div className="panel">
      <img className="image-fluid" src={product.image} alt={product.title} />
      <h1 className="title">{product.title}</h1>
      <p className="card__price">{product.price} $</p>
      <p className="text-muted">{product.description}</p>
      <button className="button" onClick={() => dispatch(addToCart(product))}>
        Добавить в корзину
      </button>
    </div>
  );
}