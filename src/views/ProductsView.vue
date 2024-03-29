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
            <div
              v-click-outside="closeMobileFilters"
              class="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto"
            >
              <div class="px-4 flex items-center justify-between">
                <span class="text-lg font-medium text-gray-900">
                  Filters
                  <button class="text-gray-500 ml-4" @click="clearFilters">
                    Clear All
                  </button>
                </span>
                <button
                  @click.stop="closeMobileFilters"
                  type="button"
                  class="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                >
                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <!-- Filters -->
              <form class="mt-4 border-t border-gray-200">
                <div class="px-4 py-6">
                  <ResponsiveFilterExpand label="Categories" :initial-open="true">
                    <div class="pt-6">
                      <div class="space-y-6">
                        <div
                          v-for="category in categories"
                          :key="category.slug"
                          class="flex items-center"
                        >
                          <input
                            :id="`filter-mobile-${category.slug}`"
                            v-model="filters.categories"
                            :value="category.name"
                            type="checkbox"
                            class="h-4 w-4 border-gray-300 rounded text-emerald-600 focus:ring-emerald-500"
                          />
                          <label
                            :for="`filter-mobile-${category.slug}`"
                            class="ml-3 min-w-0 flex-1 text-gray-500"
                          >
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
        <div
          class="relative z-10 pb-6 border-b border-gray-200 lg:flex lg:items-baseline lg:justify-between"
        >
          <h1
            class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 lg:mb-0"
          >
            Products
          </h1>

          <div class="flex items-center justify-end">
            <!-- Search -->
            <div class="mr-6 flex-1 max-w-sm">
              <label for="search" class="sr-only">Searh</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="search"
                  placeholder="Search product"
                  class="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  v-model="filters.query"
                />
              </div>
            </div>

            <VDropdown ref="sortDropdown">
              <template #trigger>
                <button
                  type="button"
                  class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Sort
                  <svg
                    class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </template>

              <div class="py-1">
                <button
                  v-for="option in Object.keys(sortOptions)"
                  class="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  :class="
                    filters.sort === option
                      ? 'font-medium text-gray-900'
                      : 'text-gray-500'
                  "
                  @click.stop="handleSortOptionClick(option)"
                  :key="option"
                >
                  {{ sortOptions[option] }}
                </button>
              </div>
            </VDropdown>

            <button
              type="button"
              class="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500"
              @click="toggleGridView"
            >
              <svg
                class="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
            <button
              @click.stop="openMobileFilters"
              type="button"
              class="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
            >
              <svg
                class="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <section class="pb-16 lg:pb-24">
        <h2 class="sr-only">Products</h2>

        <div class="pt-6 grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
          <!-- Filters -->
          <div class="hidden lg:block lg:col-span-1">
            <div class="mb-6 pb-6 border-b border-gray-200">
              <div class="flex justify-between text-sm">
                <span class="font-medium text-gray-900"> Filters </span>
                <button class="text-gray-500" @click.stop="clearFilters">
                  Clear all
                </button>
              </div>
            </div>
            <form>
              <FilterExpand label="Categories" :initial-open="true">
                <div class="pt-6">
                  <div class="space-y-4">
                    <div
                      v-for="category in categories"
                      :key="category.slug"
                      class="flex items-center"
                    >
                      <input
                        :id="`filter-${category.slug}`"
                        v-model="filters.categories"
                        :value="category.name"
                        type="checkbox"
                        class="h-4 w-4 border-gray-300 rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <label
                        :for="`filter-${category.slug}`"
                        class="ml-3 text-sm text-gray-600"
                      >
                        {{ category.name }}
                      </label>
                    </div>
                  </div>
                </div>
              </FilterExpand>
            </form>
          </div>

          <!-- Product grid -->
          <div class="lg:col-span-3">
            <VLoader v-if="loading" label="Loading products..."></VLoader>

            <div v-else-if="hasProducts && hasFilteredProducts">
              <div
                :class="
                  gridView
                    ? 'grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'
                    : 'space-y-2'
                "
              >
                <component
                  :is="productViewComponent"
                  v-for="product in filteredProducts"
                  :key="product.id"
                  :product="product"
                ></component>
              </div>
            </div>

            <EmptyState v-else label="No products"></EmptyState>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
<script>
import { mapState } from "pinia";
import { useCategoryStore } from "@/stores/category";

import ProductService from "@/services/product.service";

import { TransitionRoot, TransitionChild } from "@headlessui/vue";

import ResponsiveFilterExpand from "@/components/ResponsiveFilterExpand";
import ProductList from "@/components/ProductList.vue";
import FilterExpand from "@/components/FilterExpand";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";

const initialFilters = () => {
  return {
    sort: null,
    categories: [],
    query: "",
  };
};

export default {
  name: "ProductsView",
  components: {
    ResponsiveFilterExpand,
    TransitionChild,
    TransitionRoot,
    FilterExpand,
    ProductList,
    ProductCard,
    EmptyState,
  },
  data() {
    return {
      products: [],
      sortOptions: {
        lowToHigh: "Price: Low to High",
        highToLow: "Price: High to Low",
      },
      mobileFiltersOpen: false,
      loading: false,

      // This is filtering upon fetched products
      filters: initialFilters(),

      gridView: true,
    };
  },
  computed: {
    ...mapState(useCategoryStore, ["categories"]),
    productViewComponent() {
      return this.gridView ? "ProductCard" : "ProductList";
    },
    hasProducts() {
      return this.products.length > 0;
    },
    hasFilteredProducts() {
      return this.filteredProducts.length > 0;
    },
    filteredProducts() {
      // Filter by category and name
      const filteredProducts = this.products.filter((product) => {
        let categoryMatched = true;
        let nameMatched =
          product.name.toLowerCase().indexOf(this.filters.query.toLowerCase()) >
          -1;

        if (this.filters.categories.length > 0) {
          categoryMatched = this.filters.categories.includes(
            product.get_category
          );
        }

        return categoryMatched && nameMatched;
      });

      // Sort
      if (this.filters.sort === "lowToHigh") {
        filteredProducts.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
      }

      if (this.filters.sort === "highToLow") {
        filteredProducts.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
      }

      return filteredProducts;
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
        .then(({ data }) => (this.products = data))
        .finally(() => (this.loading = false));
    },
    handleSortOptionClick(optionKey) {
      this.filters.sort = optionKey;
      this.$refs["sortDropdown"].close();
    },
    clearFilters() {
      this.filters = initialFilters();
    },
    toggleGridView() {
      this.gridView = !this.gridView;
    },
    openMobileFilters() {
      this.mobileFiltersOpen = true;
    },
    closeMobileFilters() {
      this.mobileFiltersOpen = false;
    },
  },
};
</script>

<style scoped></style>
