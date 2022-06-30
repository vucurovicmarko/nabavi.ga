<template>
  <main>
    <VLoader v-if="loading"></VLoader>

    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="pt-12 lg:pt-16">
        <h1 class="text-4xl font-extrabold tracking-tight text-gray-900">
          Search results for: <span class="italic">{{ query.q }}</span>
        </h1>
      </div>

      <div class="mt-12">
        <div
          v-if="hasProducts"
          class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
        >
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
          ></ProductCard>
        </div>
        <EmptyState v-else :label="`No products for term ${query.q}`"></EmptyState>
      </div>
    </div>
  </main>
</template>

<script>
import ProductService from "@/services/product.service";
import ProductCard from "@/components/ProductCard.vue";
import EmptyState from "@/components/EmptyState.vue";

export default {
  name: "ProductsSearchView",
  components: {
    ProductCard,
    EmptyState,
  },
  data() {
    return {
      query: {
        q: "",
      },
      products: [],
      loading: false,
    };
  },
  watch: {
    $route(to, from) {
      if (to.name === "products_search") this.performSearch();
    },
  },
  computed: {
    hasProducts() {
      return this.products.length > 0;
    },
  },
  created() {
    this.performSearch();
  },
  methods: {
    performSearch() {
      this.getQuery();
      this.searchProducts();
    },
    getQuery() {
      const uri = window.location.search.substring(1);
      const params = new URLSearchParams(uri);

      this.query.q = params.get("q");
    },
    searchProducts() {
      this.loading = true;

      ProductService.search(this.query)
        .then(({ data }) => (this.products = data))
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style scoped></style>
