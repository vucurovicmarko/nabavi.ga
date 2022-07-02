<template>
  <main
    class="flex-grow mx-auto max-w-7xl w-full flex flex-col px-4 sm:px-6 lg:px-8"
  >
    <div class="flex-shrink-0 my-auto py-16 sm:py-32">
      <router-link :to="{ name: 'storefront' }">
        <VLogo></VLogo>
      </router-link>

      <p
        class="mt-16 text-sm font-semibold text-emerald-600 uppercase tracking-wide"
      >
        404 error
      </p>
      <h1
        class="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl"
      >
        Page not found
      </h1>
      <p class="mt-2 text-base text-gray-500">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div class="mt-6">
        <router-link
          :to="{ name: 'storefront' }"
          class="text-base font-medium text-emerald-600 hover:text-emerald-500"
        >
          <div class="inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Go back on storefront
          </div>
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "404View",
};
</script>

<style scoped></style>
