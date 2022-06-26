<template>
  <div class="relative"
       v-click-outside="close"
  >
    <div @click.stop="toggleOpen">
      <slot name="trigger" v-bind:open="open"></slot>
    </div>

    <Transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
    >
      <div v-show="open"
           class="absolute mt-2 rounded-md shadow-lg z-10"
           :class="[widthClasses, alignmentClasses]"
      >
        <div class="rounded-md bg-white ring-1 ring-black ring-opacity-5">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: "VDropdown",
  props: {
    align: {
      type: String,
      default: "right",
      validator(value) {
        return ['left', 'top', 'right'].includes(value);
      },
    },
    width: {
      type: String,
      default: "56",
    },
  },
  data() {
    return {
      open: false,
    }
  },
  computed: {
    alignmentClasses() {
      switch (this.align) {
        case "left":
          return "origin-top-left left-0";
        case "top":
          return "origin-top";
        case "right":
        default:
          return "origin-top-right right-0";
      }
    },
    widthClasses() {
      switch (this.width) {
        case "48":
          return "w-48";
        case "56":
        default:
          return "w-56";
      }
    },
  },
  methods: {
    toggleOpen() {
      this.open = !this.open;
    },
    close() {
      this.open = false;
    },
  },
}
</script>

<style scoped>

</style>
