import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="card">
      <h1 className="title">Добро пожаловать на главную страницу !</h1>
      <div className="panel">
        <p>
          Это пример приложения Next.js с использованием TypeScript и Tailwind
          CSS.
        </p>
        <Link href="/products" className="text-blue-500 hover:underline mt-4 block">
        Перейти к странице товаров
        </Link>
      </div>
    </div>
  );
}