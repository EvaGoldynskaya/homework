// src/components/Layout.tsx
import React from "react";
import { Outlet, useNavigation } from "react-router";
import Header from "../Header";
import LoadingFallback from "../LoadingFallback";
import styles from "../../styles/Layout.module.css";

const Layout: React.FC = () => {
  const navigation = useNavigation();

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        {navigation.state === "loading" ? <LoadingFallback /> : <Outlet />}
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>&copy; 2025 Магазин товаров. Все права защищены.</p>
          <p>Создано с ❤️ на OTUS JavaScript Pro</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;