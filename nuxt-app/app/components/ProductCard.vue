<template>
  <article class="product-card">
    <img :src="product.image" :alt="product.title" />
    <div class="product-info">
      <NuxtLink :to="`/products/${product.id}`">{{ product.title }}</NuxtLink>
      <p class="price">${{ product.price }}</p>
      <p class="category">{{ product.category }}</p>
      <div class="actions">
        <button class="add-btn" @click="cart.addToCart(product)">В корзину</button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useCartStore } from '~/store/cart'
import type { Product } from '~/types'

const props = defineProps<{
  product: Product
}>()

const cart = useCartStore()
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.product-card img {
  width: 100%;
  height: 220px;
  object-fit: contain;
  border-radius: 8px;
  background: #fafafa;
}

.product-info h2 {
  font-size: 1rem;
  margin: 0 0 8px;
}

.price {
  font-weight: 700;
  color: #1f8f4f;
  margin: 0 0 6px;
}

.category {
  color: #777;
  text-transform: capitalize;
  margin: 0 0 10px;
}

.actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.details-link,
.add-btn {
  display: inline-block;
  color: white;
  background: #111;
  padding: 8px 12px;
  border-radius: 8px;
  text-decoration: none;
  width: fit-content;
  border: none;
  cursor: pointer;
}
</style>