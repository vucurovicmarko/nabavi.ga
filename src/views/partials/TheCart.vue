<template>
  <TransitionRoot :show="isOpen">
    <div class="relative z-10">
      <TransitionChild
          enter="ease-in-out duration-500"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in-out duration-500"
          leave-from="opacity-100"
          leave-to="opacity-0"
          as="template"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enter-from="translate-x-full"
                enter-to="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leave-from="translate-x-0"
                leave-to="translate-x-full"
                as="template"
            >
              <div v-click-outside="close" class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div class="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                    <div class="flex items-start justify-between">
                      <h2 class="text-lg font-medium text-gray-900">
                        Shopping cart
                      </h2>
                      <div class="ml-3 flex h-7 items-center">
                        <button @click.stop="close"
                                type="button" class="-m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                               stroke-width="2" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div class="mt-8">
                      <div class="flow-root">
                        <ul role="list" class="-my-6 divide-y divide-gray-200">
                          <li v-for="product in products"
                              :key="product.slug"
                              class="flex py-6"
                          >
                            <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                  :src="product.get_thumbnail || product.get_image"
                                  :alt="product.name"
                                  class="h-full w-full object-cover object-center"
                              >
                            </div>

                            <div class="ml-4 flex flex-1 flex-col">
                              <div>
                                <div class="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <router-link
                                        :to="product.get_absolute_url"
                                        @click.stop="close"
                                    >
                                      {{ product.name }}
                                    </router-link>
                                  </h3>
                                  <p class="ml-4 whitespace-nowrap">
                                    {{ product.price }} €
                                  </p>
                                </div>
                                <p class="mt-1 text-sm text-gray-500">
                                  {{ product.get_category }}
                                </p>
                              </div>
                              <div class="flex flex-1 items-end justify-between text-sm">
                                <p class="text-gray-500">Qty {{ product.quantity }}</p>

                                <div class="flex">
                                  <button @click.stop="removeProduct(product.id)"
                                          type="button"
                                          class="font-medium text-emerald-600 hover:text-emerald-500"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{{ subtotal }} €</p>
                    </div>
                    <div class="mt-6">
                      <router-link :to="{name: 'checkout'}"
                                   @click.stop="close"
                                   class="flex items-center justify-center rounded-md border border-transparent bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700"
                      >
                        Checkout
                      </router-link>
                    </div>
                    <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or
                        <router-link :to="{ name: 'products'}"
                                     @click.stop="close"
                                     class="font-medium text-emerald-600 hover:text-emerald-500"
                        >
                          Continue Shopping
                        </router-link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </div>
    </div>
  </TransitionRoot>
</template>

<script>
import {mapState, mapActions} from "pinia";
import {useCartStore} from "@/stores/cart";

import {TransitionRoot, TransitionChild} from '@headlessui/vue';

export default {
  name: "TheCart",
  components: {
    TransitionRoot,
    TransitionChild,
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    ...mapState(useCartStore, ['products', 'hasProducts', 'subtotal']),
  },
  methods: {
    ...mapActions(useCartStore, ['addProduct', 'removeProduct']),
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
  },
}
</script>

<style scoped>

</style>