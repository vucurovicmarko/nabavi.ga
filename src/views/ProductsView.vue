<template>
  <main>
    <TransitionRoot :show="mobileFiltersOpen">
      <div class="relative z-40 lg:hidden">
        <TransitionChild
            enter="transition-opacity ease-linear duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
            as="template"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25"></div>
        </TransitionChild>

        <div class="fixed inset-0 flex z-40">
          <TransitionChild
              enter="transition ease-in-out duration-300 transform"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
              as="template"
          >
            <div v-click-outside="closeMobileFilters"
                 class="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto"
            >
              <div class="px-4 flex items-center justify-between">
                <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                <button @click.stop="closeMobileFilters"
                        type="button"
                        class="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                >
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                       stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <!-- Filters -->
              <form class="mt-4 border-t border-gray-200">
                <div class="px-4 py-6">
                  <ResponsiveFilterExpand label="Categories">
                    <div class="pt-6">
                      <div class="space-y-6">
                        <div v-for="category in categories"
                             :key="category.slug"
                             class="flex items-center"
                        >
                          <input :id="`filter-mobile-${category.slug}`"
                                 v-model="filters.categories"
                                 :value="category.slug"
                                 type="checkbox"
                                 class="h-4 w-4 border-gray-300 rounded text-emerald-600 focus:ring-emerald-500"
                          >
                          <label :for="`filter-mobile-${category.slug}`" class="ml-3 min-w-0 flex-1 text-gray-500">
                            {{ category.name }}
                          </label>
                        </div>
                      </div>
                    </div>
                  </ResponsiveFilterExpand>
                </div>
              </form>
            </div>
          </TransitionChild>
        </div>
      </div>
    </TransitionRoot>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="pt-12 lg:pt-16">
        <div class="relative z-10 flex items-baseline justify-between pb-6 border-b border-gray-200">
          <h1 class="text-4xl font-extrabold tracking-tight text-gray-900">
            Products
          </h1>

          <div class="flex items-center">
            <VDropdown ref="sortDropdown">
              <template #trigger>
                <button type="button"
                        class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Sort
                  <svg class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"/>
                  </svg>
                </button>
              </template>

              <div class="py-1">
                <button v-for="option in sortOptions"
                        class="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                        :class="filters.sort === option ? 'font-medium text-gray-900' : 'text-gray-500'"
                        @click.stop="handleSortOptionClick(option)"
                        :key="option"
                >
                  {{ option }}
                </button>
              </div>
            </VDropdown>

            <button type="button" class="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500">
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path
                    d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
              </svg>
            </button>
            <button @click.stop="openMobileFilters"
                    type="button" class="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
            >
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                      clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <section class="pb-16 lg:pb-24">
        <h2 class="sr-only">Products</h2>

        <div class="pt-6 grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
          <!-- Filters -->
          <form class="hidden lg:block">
            <div>
              <FilterExpand label="Categories" :initial-open="true">
                <div class="pt-6">
                  <div class="space-y-4">
                    <div v-for="category in categories"
                         :key="category.slug"
                         class="flex items-center"
                    >
                      <input :id="`filter-${category.slug}`"
                             v-model="filters.categories"
                             :value="category.slug"
                             type="checkbox"
                             class="h-4 w-4 border-gray-300 rounded text-emerald-600 focus:ring-emerald-500"
                      >
                      <label :for="`filter-${category.slug}`" class="ml-3 text-sm text-gray-600">
                        {{ category.name }}
                      </label>
                    </div>
                  </div>
                </div>
              </FilterExpand>
            </div>
          </form>

          <!-- Product grid -->
          <div class="lg:col-span-3">

            <VLoader v-if="loading" label="Loading products..."></VLoader>

            <template v-else>
              <div v-if="hasProducts"
                   class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8"
              >
                <ProductCard v-for="product in products"
                             :key="product.id"
                             :product="product"
                ></ProductCard>
              </div>
              <EmptyState v-else label="No products"></EmptyState>
            </template>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
<script>
import {mapState} from "pinia";
import {useCategoryStore} from "@/stores/category";

import ProductService from "@/services/product.service";

import {TransitionRoot, TransitionChild} from '@headlessui/vue';

import ResponsiveFilterExpand from "@/components/ResponsiveFilterExpand";
import FilterExpand from "@/components/FilterExpand";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";

export default {
  name: "ProductsView",
  components: {
    TransitionRoot,
    TransitionChild,
    ResponsiveFilterExpand,
    FilterExpand,
    ProductCard,
    EmptyState,
  },
  data() {
    return {
      products: [],
      filters: {
        sort: null,
        categories: [],
      },
      sortOptions: ['Newest', 'Price: Low to High', 'Price: High to Low'],
      mobileFiltersOpen: false,
      loading: false,
    }
  },
  computed: {
    ...mapState(useCategoryStore, ['categories']),
    hasProducts() {
      return this.products.length > 0;
    },
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      this.products = [];
      this.loading = true;

      ProductService.query()
          .then(({data}) => this.products = data)
          .finally(() => this.loading = false);
    },
    handleSortOptionClick(option) {
      this.filters.sort = option;
      this.$refs['sortDropdown'].close();
    },
    openMobileFilters() {
      this.mobileFiltersOpen = true;
    },
    closeMobileFilters() {
      this.mobileFiltersOpen = false;
    },
  }
}
</script>

<style scoped>

</style>
