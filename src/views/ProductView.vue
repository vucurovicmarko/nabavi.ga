<template>
  <main class="bg-white pt-6">
    <VBreadcrumb></VBreadcrumb>

    <div class="mt-6 max-w-2xl mx-auto lg:max-w-7xl">
      <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 lg:px-8">
        <div class="sm:px-6 lg:px-0">
          <div class="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
            <img class="w-full h-full object-center object-cover"
                 src="https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg"
                 alt="Model wearing plain white basic tee.">
          </div>
        </div>

        <div class="px-4 sm:px-6 lg:px-0">
          <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Basic Tee 6-Pack</h1>
          <p class="mt-2 text-3xl text-gray-900">$192</p>

          <p class="mt-6 text-base text-gray-900">
            The Basic Tee 6-Pack allows you to fully express your vibrant
            personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a
            trendsetter? Try our exclusive colorway: &quot;Black&quot;. Need to add an extra pop of color to your
            outfit? Our white tee has you covered.
          </p>

          <form class="mt-10">
            <button type="submit"
                    class="mt-10 w-full bg-emerald-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Add to bag
            </button>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import VBreadcrumb from "@/components/VBreadcrumb";

export default {
  name: "ProductView",
  components: {
    VBreadcrumb,
  }
}
</script>

<style scoped>

</style>
