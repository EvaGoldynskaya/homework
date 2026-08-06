<script setup lang="ts">
import { useCartStore } from '~/store/cart'
import { useProductStore } from '~/store/products'
import type { Product } from '~/types'

const route = useRoute()
const store = useProductStore()
const cart = useCartStore()

const product = ref<Product | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

loading.value = true
product.value = store.getById(Number(route.params.id))

if (!product.value) {
  const loadedProduct = await store.fetchProductById(Number(route.params.id))
  product.value = loadedProduct
}

loading.value = store.loadingItem
error.value = store.error
</script>

<template>
  <section class="page">
    <NuxtLink to="/" class="back-link">← Назад к каталогу</NuxtLink>

    <div v-if="loading" class="state">Загрузка товара...</div>
    <div v-else-if="error || !product" class="state error">Товар не найден</div>
    <div v-else class="product-detail">
      <img :src="product.image" :alt="product.title" />
      <div class="product-content">
        <p class="category">{{ product.category }}</p>
        <h1>{{ product.title }}</h1>
        <p class="description">{{ product.description }}</p>
        <p class="price">${{ product.price }}</p>
        <button class="add-btn" @click="product && cart.addToCart(product)">В корзину</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.page {
  max-width: 1000px;
  margin: 0 auto;
}

.back-link {
  display: inline-block;
  margin-bottom: 20px;
  color: #111;
  text-decoration: none;
  font-weight: 600;
}

.product-detail {
  display: grid;
  grid-template-columns: minmax(240px, 320px) 1fr;
  gap: 24px;
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
}

.product-detail img {
  width: 100%;
  max-height: 320px;
  object-fit: contain;
  background: #fafafa;
  border-radius: 10px;
}

.category {
  text-transform: capitalize;
  color: #777;
  margin: 0 0 6px;
}

.description {
  color: #555;
  line-height: 1.6;
}

.price {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1f8f4f;
}

.state {
  padding: 20px;
  background: white;
  border-radius: 10px;
}

.state.error {
  color: #b42318;
}

@media (max-width: 700px) {
  .product-detail {
    grid-template-columns: 1fr;
  }
}

.add-btn {
  margin-top: 12px;
  color: white;
  background: #111;
  padding: 10px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
</style>
