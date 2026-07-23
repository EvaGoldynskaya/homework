import Link from "next/link";
import { fetchJson } from "@/app/lib/api";
import { Product } from "@/app/lib/types";
import AddToCartButton from "../AddToCartButton";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

async function getProduct(id: string): Promise<Product> {
  try {
    return await fetchJson<Product>(`https://fakestoreapi.com/products/${id}`);
  } catch (error) {
    console.error(`Ошибка загрузки товара ${id}:`, error);
    throw error;
  }
}

export default async function ProductDetailPage({params,}: {
  params: Promise<{ id: string }>; }) {
  const { id } = await params;
  let product: Product;

  try {
    product = await getProduct(id);
  } catch (error) {
    notFound();
  }

  return (
    <div className="page">
      <Link href="/products" className="card__link">← Назад к товарам</Link>
      <div className="panel">
        <img src={product.image} alt={product.title} className="w-full h-96 object-contain"/>
        <div className="flex flex-col">
          <h1 className="title">{product.title}</h1>
          <span className="text-gray-500 text-sm">⭐ {product.rating.rate} ({product.rating.count} отзывов) - {product.category}</span>
          <p>${product.price.toFixed(2)}</p>
          <p>{product.description}</p>
          <AddToCartButton product={product}/>
        </div>
      </div>
    </div>
  );
}