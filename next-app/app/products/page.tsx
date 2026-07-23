import Link from "next/link";
import { fetchJson } from "@/app/lib/api";
import { Product } from "@/app/lib/types";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await fetchJson<Product[]>("https://fakestoreapi.com/products");

  return (
    <div className="page">
      <h2 className="title">Список товаров</h2>
      <ul className="list">
        {products.map((product: Product) => (
          <li key={product.id} className="list-item">
            <div className="card">
              <img src={product.image} alt={product.title} className="card__image"/>
              <h3 className="card__title">{product.title}</h3>
              <p className="card__price">${product.price.toFixed(2)}</p>
              <Link href={`/products/${product.id}`} className="card__link">Подробнее →</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}