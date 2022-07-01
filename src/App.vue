<template>
  <TheNavbar v-if="!authLayout"></TheNavbar>

  <div class="flex-grow flex flex-col">
    <RouterView />
  </div>

  <TheFooter v-if="!authLayout"></TheFooter>
</template>

<script>
import { mapActions } from "pinia";
import { useCategoryStore } from "@/stores/category";
import { useCartStore } from "@/stores/cart";

import TheNavbar from "@/views/partials/TheNavbar";
import TheFooter from "@/views/partials/TheFooter";

export default {
  components: {
    TheNavbar,
    TheFooter,
  },
  computed: {
    authLayout() {
      return this.$route.meta.layout === 'auth';
    }
  },
  created() {
    this.fetchCategories();
    this.initializeCart();
  },
  methods: {
    ...mapActions(useCategoryStore, ["fetchCategories"]),
    ...mapActions(useCartStore, ["initializeCart"]),
  },
};
</script>

<style scoped></style>
