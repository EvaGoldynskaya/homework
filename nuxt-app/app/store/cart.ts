import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { CartItem } from "~/types";


type AddCart = Pick<CartItem, "id" | "title" | "price" | "images">;

export const useCartStore = defineStore("cart", () => {
  const items = ref<CartItem[]>([])
  const totalCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )

  function addToCart(product: AddCart) {
    const existingItem = items.value.find((item) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
      return
    }

    items.value.push({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      images: product.images,
    })
  }

  function removeFromCart(id: number) {
    items.value = items.value.filter((item) => item.id !== id)
  }

  function clearCart() {
    items.value = []
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