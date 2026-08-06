import { defineStore } from "pinia";
import type { Product } from "~/types";

export const useProductStore = defineStore("products", () => {
  const products = ref<Product[]>([]);
  const loadingList = ref(false);
  const loadingItem = ref(false);
  const error = ref<string | null>(null);

  const categories = computed(() => [
    ...new Set(products.value.map((product) => product.category)),
  ]);

  const getProductsByCategory = computed(
    () => (category: string) =>
      products.value.filter((product) => product.category === category),
  );

  async function fetchProducts() {
    loadingList.value = true;
    error.value = null;

    try {
      const response = await $fetch<Product[]>("https://fakestoreapi.com/products");
      products.value = response;
    } catch () {
      error.value = "Не удалось загрузить товары";
      products.value = [];
    } finally {
      loadingList.value = false;
    }
  }

  async function fetchProductById(id: number) {
    loadingItem.value = true;
    error.value = null;

    try {
      const response = await $fetch<Product>(`https://fakestoreapi.com/products/${id}`);
      return response;
    } catch () {
      error.value = "Не удалось загрузить товар";
      return null;
    } finally {
      loadingItem.value = false;
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
    loadingList,
    loadingItem,
    error,
    categories,
    getProductsByCategory,
    searchByQuery,
    getById,
    fetchProducts,
    fetchProductById,
  };
});