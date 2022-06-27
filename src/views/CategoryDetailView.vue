<template>
  <main>
    <VLoader v-if="loading"></VLoader>
    <div v-else-if="!error"
         class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div class="pt-12 lg:pt-16">
        <h1 class="text-4xl font-extrabold tracking-tight text-gray-900">
          {{ category.name }}
        </h1>
      </div>

      <section class="pb-16 lg:pb-24">
        <h2 class="sr-only">Products</h2>

        <!-- Product grid -->
        <div class="mt-12 lg:col-span-3">
          <div v-if="hasProducts"
               class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
          >
            <ProductCard v-for="product in category.products"
                         :key="product.id"
                         :product="product"
            ></ProductCard>
          </div>
          <EmptyState v-else :label="`No products in ${category.name} category`"></EmptyState>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import CategoryService from "@/services/category.service";

import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";

export default {
  name: "CategoryDetailView",
  components: {
    ProductCard,
    EmptyState,
  },
  data() {
    return {
      category: null,
      loading: false,
      error: false,
    }
  },
  created() {
    this.fetchProducts();
  },
  computed: {
    hasProducts() {
      return this.category.products.length > 0;
    },
  },
  watch: {
    $route(to, from) {
      if (to.name === 'category') this.fetchProducts();
    }
  },
  methods: {
    fetchProducts() {
      this.loading = true;

      CategoryService.get(this.$route.params.category_slug)
          .then(
              ({data}) => {
                this.category = data;
                document.title = `${this.category.name} | ${process.env.VUE_APP_TITLE}`;
              },
              error => this.error = true
          )
          .finally(() => this.loading = false);
    }
  },
}
</script>

<style scoped>

</style>