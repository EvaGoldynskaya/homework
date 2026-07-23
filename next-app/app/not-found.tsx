import Link from "next/link";

export default function NotFound(){
  return (
    <div>
      <h1 className="text-3xl font-bold px-5">404 - Сраница не найдена</h1>
      <p>
        Вернитесь на{" "}
        <Link href="/">главную страницу</Link>.
      </p>
    </div>
  );
}