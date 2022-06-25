<template>
  <VExpand>
    <template #trigger>
      <h3 class="-mx-2 -my-3 flow-root">
        <button type="button"
                class="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
      <span class="font-medium text-gray-900">
        {{ label }}
      </span>
          <div class="ml-6 flex items-center">
            <svg v-if="!open" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                 fill="currentColor">
              <path fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"/>
            </svg>
            <svg v-else class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                 fill="currentColor">
              <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                    clip-rule="evenodd"/>
            </svg>
          </div>
        </button>
      </h3>
    </template>

    <slot></slot>
  </VExpand>
</template>

<script>
import VExpand from "@/components/VExpand";

export default {
  name: "ResponsiveFilterExpand",
  components: {
    VExpand,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
  }
}
</script>

<style scoped>

</style>