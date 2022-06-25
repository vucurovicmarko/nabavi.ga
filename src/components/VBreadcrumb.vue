<template>
  <nav aria-label="Breadcrumb">
    <ol role="list" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-2">
      <li v-for="(route, index) in breadcrumbs"
          :key="index"
      >
        <div class="flex items-center">
          <router-link :to="route.to"
                       class="mr-2 text-sm font-medium"
                       :class="index !== lastIndex ? 'text-gray-500 hover:text-gray-600' : 'text-gray-900 pointer-events-none'"
          >
            {{ route.label }}
          </router-link>

          <svg v-if="index !== lastIndex" width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
               aria-hidden="true" class="w-4 h-5 text-gray-300">
            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z"/>
          </svg>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: "VBreadcrumb",
  props: {
    breadcrumbs: {
      type: Array,
      required: true,
    },
  },
  computed: {
    lastIndex() {
      return this.breadcrumbs.length-1;
    },
  },
}
</script>

<style scoped>

</style>
