<template>
  <div class="bg-white">
    <TransitionRoot :show="mobileNavOpen">
      <div class="relative z-40 lg:hidden" role="dialog">
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
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
            as="template"
          >
            <div
              v-click-outside="closeMobileNav"
              class="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto"
            >
              <div class="px-4 pt-5 pb-2 flex">
                <button
                  @click="closeMobileNav"
                  type="button"
                  class="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                >
                  <span class="sr-only">Close menu</span>
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

              <div class="py-6 px-4 space-y-6">
                <div
                  v-for="category in categories"
                  :key="category.slug"
                  class="flow-root"
                >
                  <router-link
                    :to="{
                      name: 'category',
                      params: { category_slug: category.slug },
                    }"
                    class="-m-2 p-2 block font-medium text-gray-900"
                    active-class="text-emerald-600"
                    @click.stop="closeMobileNav"
                  >
                    {{ category.name }}
                  </router-link>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </TransitionRoot>

    <header class="relative bg-white">
      <div class="bg-gray-800">
        <div
          class="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto h-10 flex justify-end items-center"
        >
          <div class="space-x-6">
            <a
              href="#"
              class="text-sm font-medium text-gray-200 hover:text-white"
              >Login</a
            >
            <span class="h-6 w-px bg-gray-200"></span>
            <a
              href="#"
              class="text-sm font-medium text-gray-200 hover:text-white"
              >Register</a
            >
          </div>
        </div>
      </div>

      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="border-b border-gray-200">
          <div class="h-16 flex items-center">
            <button
              @click.stop="openMobileNav"
              type="button"
              class="bg-white p-2 rounded-md text-gray-400 lg:hidden"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <!-- Logo -->
            <div class="ml-4 flex lg:ml-0">
              <router-link :to="{ name: 'storefront' }">
                <VLogo></VLogo>
              </router-link>
            </div>

            <div class="hidden lg:ml-8 lg:block lg:self-stretch">
              <div class="h-full flex space-x-8">
                <router-link
                  v-for="category in categories"
                  :key="category.slug"
                  :to="{
                    name: 'category',
                    params: { category_slug: category.slug },
                  }"
                  v-slot="{ navigate, href, isActive }"
                  custom
                >
                  <a
                    :href="href"
                    @click="navigate"
                    class="flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2"
                    :class="
                      isActive
                        ? 'border-emerald-600 text-emerald-600'
                        : 'border-transparent text-gray-700 hover:text-gray-800'
                    "
                  >
                    {{ category.name }}
                  </a>
                </router-link>
              </div>
            </div>

            <div class="ml-auto flex items-center">
              <!-- Search -->
              <div class="flex">
                <button
                  @click.stop="openSearchModal = true"
                  class="p-2 text-gray-400 hover:text-gray-500"
                >
                  <svg
                    class="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>

              <!-- Cart -->
              <div class="ml-4 flow-root lg:ml-6">
                <button
                  @click.stop="openCartModal = true"
                  class="group -m-2 p-2 flex items-center"
                >
                  <svg
                    class="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <span
                    class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
                  >
                    {{ productsCount }}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <TheCart
      v-if="openCartModal"
      :trigger-show="openCartModal"
      @close="openCartModal = false"
    ></TheCart>

    <TheSearch
      v-if="openSearchModal"
      :trigger-show="openSearchModal"
      @close="openSearchModal = false"
    ></TheSearch>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useCategoryStore } from "@/stores/category";
import { useCartStore } from "@/stores/cart";

import { TransitionRoot, TransitionChild } from "@headlessui/vue";

import TheSearch from "@/views/partials/TheSearch";
import TheCart from "@/views/partials/TheCart";

export default {
  name: "TheNavbar",
  components: {
    TransitionRoot,
    TransitionChild,
    TheSearch,
    TheCart,
  },
  data() {
    return {
      mobileNavOpen: false,
      openCartModal: false,
      openSearchModal: false,
    };
  },
  computed: {
    ...mapState(useCategoryStore, ["categories"]),
    ...mapState(useCartStore, ["productsCount"]),
  },
  methods: {
    openMobileNav() {
      this.mobileNavOpen = true;
    },
    closeMobileNav() {
      this.mobileNavOpen = false;
    },
  },
};
</script>

<style scoped></style>
