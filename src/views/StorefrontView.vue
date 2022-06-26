<template>
  <main>
    <!--    New Arrivals-->
    <section class="relative bg-white overflow-hidden">
      <div class="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
          <div class="sm:max-w-lg">
            <h1 class="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl">
              New arrivals are here
            </h1>
            <p class="mt-4 text-xl text-gray-500">
              The new arrivals have, well, newly arrived. Check out the latest options from our products while they're
              still in stock.
            </p>
          </div>
          <div>
            <div class="mt-10">
              <div aria-hidden="true"
                   class="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full">
                <div
                    class="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div class="flex items-center space-x-6 lg:space-x-8">
                    <div class="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div class="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100">
                        <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
                             alt="" class="w-full h-full object-center object-cover">
                      </div>
                      <div class="w-44 h-64 rounded-lg overflow-hidden">
                        <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                             alt="" class="w-full h-full object-center object-cover">
                      </div>
                    </div>
                    <div class="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div class="w-44 h-64 rounded-lg overflow-hidden">
                        <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
                             alt="" class="w-full h-full object-center object-cover">
                      </div>
                      <div class="w-44 h-64 rounded-lg overflow-hidden">
                        <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                             alt="" class="w-full h-full object-center object-cover">
                      </div>
                      <div class="w-44 h-64 rounded-lg overflow-hidden">
                        <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
                             alt="" class="w-full h-full object-center object-cover">
                      </div>
                    </div>
                    <div class="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div class="w-44 h-64 rounded-lg overflow-hidden">
                        <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                             alt="" class="w-full h-full object-center object-cover">
                      </div>
                      <div class="w-44 h-64 rounded-lg overflow-hidden">
                        <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
                             alt="" class="w-full h-full object-center object-cover">
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <router-link :to="{ name: 'products' }"
                           class="inline-block text-center bg-emerald-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-emerald-700"
              >
                Shop Products
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--    Categories-->
    <section class="bg-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none">
          <h2 class="text-2xl font-extrabold text-gray-900">
            Categories
          </h2>

          <div class="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-14">
            <CategoryCard
                v-for="category in categories"
                :key="category.slug"
                :category="category"
            ></CategoryCard>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import {mapState} from "pinia";
import {useCategoryStore} from "@/stores/category";

import CategoryCard from "@/components/CategoryCard";

export default {
  name: 'StorefrontView',
  components: {
    CategoryCard,
  },
  computed: {
    ...mapState(useCategoryStore, ['categories']),
  },
}
</script>
