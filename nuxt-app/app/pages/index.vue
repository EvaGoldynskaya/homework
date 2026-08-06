<template>
  <section class="page">
    <div class="page-header">
      <h1>Каталог товаров</h1>
    </div>
    <div v-if="store.loadingList" class="state">Загрузка товаров...</div>
    <div v-else-if="store.error" class="state error">{{ store.error }}</div>
    <div v-else class="products-grid">
      <ProductCard v-for="product in store.products" :key="product.id" :product="product" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useProductStore } from '~/store/products'
import ProductCard from '~/components/ProductCard.vue'

const store = useProductStore()
await useAsyncData('products', () => store.fetchProducts())
</script>


<style scoped>
.page {
  max-width: 1200px;
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

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.state {
  padding: 20px;
  background: white;
  border-radius: 10px;
}

.state.error {
  color: #b42318;
}
</style>
