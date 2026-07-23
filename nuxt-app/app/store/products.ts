import { defineStore } from "pinia";
import type { Product } from "~/types";

export const useProductStore = defineStore("products", () => {
  const products = ref<Product[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const categories = computed(() => [
    ...new Set(products.value.map((product) => product.category)),
  ]);

  const getProductsByCategory = computed(
    () => (category: string) =>
      products.value.filter((product) => product.category === category),
  );

  async function fetchProducts() {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<Product[]>("https://fakestoreapi.com/products");
      products.value = response;
    } catch (e) {
      error.value = "Не удалось загрузить товары";
      products.value = [];
    } finally {
      loading.value = false;
    }
  }

  async function fetchProductById(id: number) {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<Product>(`https://fakestoreapi.com/products/${id}`);
      return response;
    } catch (e) {
      error.value = "Не удалось загрузить товар";
      return null;
    } finally {
      loading.value = false;
    }
  }

  function searchByQuery(query: string) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return products.value;
    return products.value.filter((product) =>
      product.title.toLowerCase().includes(normalized),
    );
  }

  function getById(id: number) {
    return products.value.find((product) => product.id === id) || null;
  }

  return {
    products,
    loading,
    error,
    categories,
    getProductsByCategory,
    searchByQuery,
    getById,
    fetchProducts,
    fetchProductById,
  };
});