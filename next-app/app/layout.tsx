import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fake Store",
  description: "Next.js приложение с Fake Store API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <header className="header">
          <nav className="header__nav">
          <Link href="/" className="header__link">Home</Link>
          <Link href="/products" className="header__link">Товары</Link>
          <Link href="/cart" className="header__link">Корзина</Link>
          </nav>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}