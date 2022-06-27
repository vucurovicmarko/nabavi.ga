<template>
  <main>
    <VLoader v-if="loading" label="Loading product..."></VLoader>
    <div v-else
         class="max-w-7xl mx-auto"
    >
      <div class="pt-12 lg:pt-16">
        <VBreadcrumb :breadcrumbs="breadcrumbs"></VBreadcrumb>
      </div>

      <section class="max-w-2xl mx-auto lg:max-w-7xl">
        <div class="mt-6 pb-16 lg:pb-24">
          <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 lg:px-8">
            <div class="sm:px-6 lg:px-0">
              <div class="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
                <img class="w-full h-full object-center object-cover"
                     :src="product.get_image"
                     :alt="product.name"
                >
              </div>
            </div>

            <div class="px-4 sm:px-6 lg:px-0">
              <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                {{ product.name }}
              </h1>
              <p class="mt-2 text-3xl text-gray-900">
                {{ product.price }} €
              </p>

              <p v-if="product.description"
                 class="mt-6 text-base text-gray-900"
              >
                {{ product.description }}
              </p>

              <button @click="addProduct(product)"
                      class="mt-10 w-full bg-emerald-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Add to bag
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import {mapActions} from "pinia";
import {useCartStore} from "@/stores/cart";

import ProductService from "@/services/product.service";

import VBreadcrumb from "@/components/VBreadcrumb";

export default {
  name: "ProductView",
  components: {
    VBreadcrumb,
  },
  data() {
    return {
      product: null,
      loading: false,
    }
  },
  computed: {
    breadcrumbs() {
      return [
        {
          label: 'Products',
          to: {name: 'products'},
        },
        {
          label: this.product.get_category,
          to: {name: 'category', params: {category_slug: this.$route.params.category_slug}},
        },
        {
          label: this.product.name,
          to: this.product.get_absolute_url,
        }
      ]
    }
  },
  watch: {
    $route(to, from) {
      if (to.name === 'product') this.fetchProduct();
    }
  },
  created() {
    this.fetchProduct();
  },
  methods: {
    ...mapActions(useCartStore, ['addProduct']),
    fetchProduct() {
      this.loading = true;

      ProductService.get(this.$route.params.category_slug, this.$route.params.product_slug)
          .then(({data}) => {
            this.product = data;
            document.title = `${this.product.name} | ${process.env.VUE_APP_TITLE}`;
          })
          .finally(() => this.loading = false);
    }
  }
}
</script>

<style scoped>

</style>
