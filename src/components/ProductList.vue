<template>
  <div
    class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 flex items-center space-x-6"
  >
    <div class="flex-shrink-0">
      <img
        class="h-32 w-32"
        :src="product.get_thumbnail || product.get_image"
        :alt="product.name"
      />
    </div>
    <div class="flex-1 min-w-0">
      <p class="text-lg font-medium text-gray-900">
        <router-link :to="product.get_absolute_url">
          <span class="absolute inset-0"></span>
          {{ product.name }}
        </router-link>
      </p>
      <p class="text-sm text-gray-500 truncate">
        {{ product.description }}
      </p>
      <p class="mt-4 text-lg font-medium text-gray-900">
        {{ formatPrice(product.price) }}
      </p>
    </div>
    <button
      type="button"
      title="Add to Bag"
      class="relative inline-flex items-center p-3 border border-transparent rounded-md shadow-sm text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      @click.stop="addProduct(product)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useCartStore } from "@/stores/cart";

import formatPrice from "@/mixins/formatPrice"

export default {
  name: "ProductList",
  mixins: [formatPrice],
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(useCartStore, ["addProduct"]),
  },
};
</script>

<style scoped></style>
