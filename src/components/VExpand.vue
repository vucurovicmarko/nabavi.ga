<template>
  <div>
    <div @click.stop="toggleOpen">
      <slot name="trigger" v-bind:open="open"></slot>
    </div>
    <div v-show="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "VExpand",
  props: {
    initialOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      open: null,
    }
  },
  created() {
    this.open = this.initialOpen;
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