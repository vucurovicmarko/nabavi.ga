<template>
  <div class="group relative">
    <div
        class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
      <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
           alt="Front of men&#039;s Basic Tee in black."
           class="w-full h-full object-center object-cover lg:w-full lg:h-full">
    </div>
    <div class="mt-4 flex justify-between">
      <div>
        <h3 class="text-sm text-gray-700">
          <router-link :to="{ name: 'product', params: { product: '1' }}">
            <span aria-hidden="true" class="absolute inset-0"></span>
            Basic Tee
          </router-link>
        </h3>
      </div>
      <p class="text-sm font-medium text-gray-900">$35</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
    },
  }
}
</script>

<style scoped>

</style>