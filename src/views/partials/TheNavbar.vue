<template>
  <div class="bg-white">
    <!--
      Mobile menu

      Off-canvas menu for mobile, show/hide based on off-canvas menu state.
    -->
    <div class="relative z-40 lg:hidden" role="dialog" aria-modal="true">
      <!--
        Off-canvas menu backdrop, show/hide based on off-canvas menu state.

        Entering: "transition-opacity ease-linear duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "transition-opacity ease-linear duration-300"
          From: "opacity-100"
          To: "opacity-0"
      -->
      <div class="fixed inset-0 bg-black bg-opacity-25"></div>

      <div class="fixed inset-0 flex z-40">
        <!--
          Off-canvas menu, show/hide based on off-canvas menu state.

          Entering: "transition ease-in-out duration-300 transform"
            From: "-translate-x-full"
            To: "translate-x-0"
          Leaving: "transition ease-in-out duration-300 transform"
            From: "translate-x-0"
            To: "-translate-x-full"
        -->
        <div class="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
          <div class="px-4 pt-5 pb-2 flex">
            <button type="button" class="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400">
              <span class="sr-only">Close menu</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div class="py-6 px-4 space-y-6">
            <div class="flow-root">
              <a href="#" class="-m-2 p-2 block font-medium text-gray-900">Women</a>
            </div>
            <div class="flow-root">
              <a href="#" class="-m-2 p-2 block font-medium text-gray-900">Men</a>
            </div>
            <div class="flow-root">
              <a href="#" class="-m-2 p-2 block font-medium text-gray-900">Phones</a>
            </div>
            <div class="flow-root">
              <a href="#" class="-m-2 p-2 block font-medium text-gray-900">Sports</a>
            </div>
            <div class="flow-root">
              <a href="#" class="-m-2 p-2 block font-medium text-gray-900">Jewelry</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <header class="relative bg-white">
      <div class="bg-gray-800">
        <div class="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto h-10 flex justify-end items-center">
          <div class="space-x-6">
            <a href="#" class="text-sm font-medium text-gray-200 hover:text-white">Login</a>
            <span class="h-6 w-px bg-gray-200"></span>
            <a href="#" class="text-sm font-medium text-gray-200 hover:text-white">Register</a>
          </div>
        </div>
      </div>

      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="border-b border-gray-200">
          <div class="h-16 flex items-center">
            <button type="button" class="bg-white p-2 rounded-md text-gray-400 lg:hidden">
              <span class="sr-only">Open menu</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>

            <!-- Logo -->
            <div class="ml-4 flex lg:ml-0">
              <a href="#">
                <span class="sr-only">nabavi.ga</span>
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                  <span class="text-xl font-medium text-gray-900 tracking-tighter	ml-1">nabavi.ga</span>
                </div>
              </a>
            </div>

            <div class="hidden lg:ml-8 lg:block lg:self-stretch">
              <div class="h-full flex space-x-8">
                <!-- Item active: "border-orange-600 text-orange-600", Item inactive: "border-transparent text-gray-700 hover:text-gray-800" -->
                <a href="#" class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Women</a>
                <a href="#" class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Men</a>
                <a href="#" class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Phones</a>
                <a href="#" class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Sports</a>
                <a href="#" class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Jewelry</a>
              </div>
            </div>

            <div class="ml-auto flex items-center">
              <!-- Search -->
              <div class="flex">
                <a href="#" class="p-2 text-gray-400 hover:text-gray-500">
                  <span class="sr-only">Search</span>
                  <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                       stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </a>
              </div>

              <!-- Cart -->
              <div class="ml-4 flow-root lg:ml-6">
                <a href="#" class="group -m-2 p-2 flex items-center">
                  <svg class="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                       xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                  </svg>
                  <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                  <span class="sr-only">items in cart, view bag</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>

</template>

<script>
export default {
  name: "TheNavbar"
}
</script>

<style scoped>

</style>