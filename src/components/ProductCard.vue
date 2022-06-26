<template>
  <div class="flex flex-col">
    <div class="flex-1 group relative">
      <div
          class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
        <img :src="product.get_thumbnail || product.get_image"
             :alt="product.name"
             class="w-full h-full object-center object-cover lg:w-full lg:h-full"
        >
      </div>
      <div class="mt-4 flex justify-between">
        <div>
          <h3 class="text-sm text-gray-700">
            <router-link :to="product.get_absolute_url">
              <span class="absolute inset-0"></span>
              {{ product.name }}
            </router-link>
          </h3>
        </div>
        <p class="whitespace-nowrap ml-2 text-sm font-medium text-gray-900">
          {{ product.price }} €
        </p>
      </div>
    </div>

    <div class="mt-5">
      <button @click.stop="addToCart"
              type="button"
              class="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Add to bag
      </button>
    </div>
  </div>
</template>

<script>
import {mapActions} from "pinia";
import {useCartStore} from "@/stores/cart";

export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(useCartStore, ['addProduct']),
    addToCart() {
      this.addProduct(this.product);
    },
  }
}
</script>

<style scoped>

</style>