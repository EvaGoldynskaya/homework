<template>
  <section class="page">
    <div class="page-header">
      <h1>Корзина</h1>
      <p>Товары, которые вы добавили</p>
    </div>

    <div v-if="!cart.items.length" class="empty-state">
      <p>Корзина пуста</p>
      <NuxtLink to="/" class="details-link">Перейти в каталог</NuxtLink>
    </div>

    <div v-else class="cart-list">
      <div v-for="item in cart.items" :key="item.id" class="cart-item">
        <div class="cart-info">
          <h2>{{ item.title }}</h2>
          <p class="price">${{ item.price }} × {{ item.quantity }} = ${{ (item.price * item.quantity).toFixed(2) }}</p>
        </div>
        <button class="remove-btn" @click="cart.removeFromCart(item.id)">Удалить</button>
      </div>
      <div class="cart-summary">
        <p>Всего товаров: <strong>{{ cart.totalCount }}</strong></p>
        <p>Итоговая сумма: <strong>${{ cart.totalPrice.toFixed(2) }}</strong></p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useCartStore } from '~/store/cart'

const cart = useCartStore()
</script>

<style scoped>
.page {
  max-width: 900px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  margin: 0 0 8px;
}

.page-header p {
  color: #666;
}

.empty-state {
  background: white;
  padding: 24px;
  border-radius: 12px;
  text-align: center;
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
}

.cart-info h2 {
  margin: 0 0 6px;
  font-size: 1rem;
}

.price {
  margin: 0;
  font-weight: 700;
  color: #1f8f4f;
}

.remove-btn,
.details-link {
  display: inline-block;
  color: white;
  background: #111;
  padding: 8px 12px;
  border-radius: 8px;
  text-decoration: none;
  border: none;
  cursor: pointer;
}
</style>
