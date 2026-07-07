import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { CartItem, CartState } from "~/types";

export const useCartStore = defineStore("cart", () => {
  const state = ref<CartState>({ items: [] })

  const items = computed(() => state.value.items)
  const totalCount = computed(() => state.value.items.reduce((sum, item) => sum + item.quantity, 0))
  const totalPrice = computed(() =>
    state.value.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )

  function addToCart(product: { id: number; title: string; price: number; images?: string[] }) {
    const existingItem = state.value.items.find((item) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
      return
    }

    state.value.items.push({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      images: product.images,
    })
  }

  function removeFromCart(id: number) {
    state.value.items = state.value.items.filter((item) => item.id !== id)
  }

  function clearCart() {
    state.value.items = []
  }

  return {
    items,
    totalCount,
    totalPrice,
    addToCart,
    removeFromCart,
    clearCart,
  }
})