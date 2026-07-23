<template>
  <div class="app-shell">
    <NuxtRouteAnnouncer />
    <header class="app-header">
      <NuxtLink to="/" class="brand">Fake Store</NuxtLink>
      <nav class="nav-links">
        <NuxtLink to="/">Каталог</NuxtLink>
        <NuxtLink to="/cart">
          Корзина (
          <span v-if="cart.totalCount" class="cart-badge">{{ cart.totalCount }}</span>
          )
        </NuxtLink>
      </nav>
    </header>
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/store/cart'

const cart = useCartStore()
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  background: #f7f7f7;
  color: #222;
  font-family: Arial, sans-serif;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #e5e5e5;
}

.brand {
  font-size: 1.2rem;
  font-weight: 700;
  color: #111;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 16px;
}

.nav-links a {
  color: #333;
  text-decoration: none;
  font-weight: 600;
}

main {
  padding: 24px;
}
</style>
