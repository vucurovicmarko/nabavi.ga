<template>
  <div class="block w-full p-12 text-center">
    <div class="inline-flex flex-col items-center">
      <svg class="animate-spin text-emerald-500"
           :class="sizeComputed"
           xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="mt-4 text-sm text-gray-500">
        {{ label }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "VLoader",
  props: {
    size: {
      type: String,
      default: '48',
      validator(value) {
        return ['32', '48', '64'].includes(value);
      },
    },
    label: {
      type: String,
      default: 'Loading ...'
    }
  },
  computed: {
    sizeComputed() {
      switch (this.size) {
        case '48':
          return 'w-12 h-12';
        case '64':
          return 'w-16 h-16';
        case '32':
        default:
          return 'w-8 h-8';
      }
    },
  }
}
</script>

<style scoped>

</style>