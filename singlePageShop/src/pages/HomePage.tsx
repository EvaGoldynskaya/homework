// src/pages/HomePage.tsx
import React from "react";
import { useLoaderData, useNavigation } from "react-router";
import { Product } from "../types";
import ProductCatalog from "../components/ProductCatalog";
import LoadingFallback from "../components/LoadingFallback";
import styles from "../styles/App.module.css";

export default function HomePage() {
  const products = useLoaderData() as Product[];
  const navigation = useNavigation();

  // Показываем loader при переходах между страницами
  if (navigation.state === "loading") {
    return <LoadingFallback />;
  }

  return (
    <div className={styles.pageContainer}>
      <ProductCatalog products={products} />
    </div>
  );
}