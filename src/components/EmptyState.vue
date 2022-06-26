<template>
  <div class="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center">
    <span class="mt-2 block text-sm font-medium text-gray-900">
      {{ label }}
    </span>
  </div>
</template>

<script>
export default {
  name: "EmptyState",
  props: {
    label: {
      type: String,
      default: "No results",
    },
  },
}
</script>

<style scoped>

</style>