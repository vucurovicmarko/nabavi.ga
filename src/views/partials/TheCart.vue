<template>
  <Teleport to="#modals">
    <TransitionRoot :show="show" appear>
      <div class="relative z-10">
        <TransitionChild
          enter="ease-in-out duration-500"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in-out duration-500"
          leave-from="opacity-100"
          leave-to="opacity-0"
          as="template"
          @before-enter="overlayTransitionLeaveFinished = false"
          @after-leave="overlayTransitionLeaveFinished = true"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          ></div>
        </TransitionChild>

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div
              class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
            >
              <TransitionChild
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enter-from="translate-x-full"
                enter-to="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leave-from="translate-x-0"
                leave-to="translate-x-full"
                as="template"
                @before-enter="panelTransitionLeaveFinished = false"
                @after-leave="panelTransitionLeaveFinished = true"
              >
                <div
                  v-click-outside="close"
                  class="pointer-events-auto w-screen max-w-md"
                >
                  <div
                    class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
                  >
                    <div class="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div class="flex items-start justify-between">
                        <h2 class="text-lg font-medium text-gray-900">
                          Shopping cart
                        </h2>
                        <div class="ml-3 flex h-7 items-center">
                          <button
                            @click.stop="close"
                            type="button"
                            class="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          >
                            <svg
                              class="h-6 w-6"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="2"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div class="mt-8">
                        <div v-if="hasProducts" class="flow-root">
                          <ul
                            role="list"
                            class="-my-6 divide-y divide-gray-200"
                          >
                            <li
                              v-for="product in products"
                              :key="product.slug"
                              class="flex py-6"
                            >
                              <div
                                class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                              >
                                <img
                                  :src="
                                    product.get_thumbnail || product.get_image
                                  "
                                  :alt="product.name"
                                  class="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div class="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div
                                    class="flex justify-between text-base font-medium text-gray-900"
                                  >
                                    <h3>
                                      <router-link
                                        :to="product.get_absolute_url"
                                        @click.stop="close"
                                      >
                                        {{ product.name }}
                                      </router-link>
                                    </h3>
                                    <p class="ml-4 whitespace-nowrap">
                                      {{ formatPrice(product.price) }}
                                    </p>
                                  </div>
                                  <p class="mt-1 text-sm text-gray-500">
                                    {{ product.get_category }}
                                  </p>
                                </div>
                                <div
                                  class="mt-4 flex flex-1 items-end justify-between text-sm"
                                >
                                  <div
                                    class="flex-shrink-0 flex items-center space-x-4"
                                  >
                                    <button
                                      @click.stop="decreaseQuantity(product)"
                                      type="button"
                                      class="inline-flex items-center p-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M18 12H6"
                                        />
                                      </svg>
                                    </button>

                                    <p
                                      class="text-gray-500 text-center min-w-[4rem]"
                                    >
                                      Qty: {{ product.quantity }}
                                    </p>

                                    <button
                                      @click.stop="increaseQuantity(product)"
                                      type="button"
                                      class="inline-flex items-center p-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                      </svg>
                                    </button>
                                  </div>

                                  <div class="flex">
                                    <button
                                      @click.stop="removeProduct(product.id)"
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
                        <div v-else class="text-center py-12">
                          <p class="text-2xl font-semibold">Nothing here yet</p>
                          <router-link
                            :to="{ name: 'products' }"
                            @click.stop="close"
                            class="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                          >
                            See products
                          </router-link>
                        </div>
                      </div>
                    </div>

                    <div
                      v-if="hasProducts"
                      class="border-t border-gray-200 py-6 px-4 sm:px-6"
                    >
                      <div
                        class="flex justify-between text-base font-medium text-gray-900"
                      >
                        <p>Subtotal</p>
                        <p>{{ formatPrice(subtotal) }}</p>
                      </div>
                      <div class="mt-6">
                        <router-link
                          :to="{ name: 'checkout' }"
                          @click.stop="close"
                          class="flex items-center justify-center rounded-md border border-transparent bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700"
                        >
                          Checkout
                        </router-link>
                      </div>
                      <div
                        class="mt-6 flex justify-center text-center text-sm text-gray-500"
                      >
                        <p>
                          or
                          <router-link
                            :to="{ name: 'products' }"
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
  </Teleport>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useCartStore } from "@/stores/cart";

import { TransitionRoot, TransitionChild } from "@headlessui/vue";

import formatPrice from "@/mixins/formatPrice";
import modal from "@/mixins/modal";

export default {
  name: "TheCart",
  mixins: [formatPrice, modal],
  components: {
    TransitionRoot,
    TransitionChild,
  },
  computed: {
    ...mapState(useCartStore, ["products", "hasProducts", "subtotal"]),
  },
  methods: {
    ...mapActions(useCartStore, [
      "addProduct",
      "removeProduct",
      "increaseQuantity",
      "decreaseQuantity",
    ]),
  },
};
</script>

<style scoped></style>
