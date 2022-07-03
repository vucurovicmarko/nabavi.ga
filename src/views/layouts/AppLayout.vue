<template>
  <TheNavbar></TheNavbar>

  <div class="flex-grow flex flex-col">
    <RouterView />
  </div>

  <TheFooter></TheFooter>
</template>

<script>
import { mapActions } from "pinia";

import { useCategoryStore } from "@/stores/category";
import { useCartStore } from "@/stores/cart";

import TheNavbar from "@/views/partials/TheNavbar";
import TheFooter from "@/views/partials/TheFooter";

export default {
  name: "AppLayout",
  components: {
    TheNavbar,
    TheFooter,
  },
  created() {
    this.initializeCart();
    this.fetchCategories();
  },
  methods: {
    ...mapActions(useCategoryStore, ["fetchCategories"]),
    ...mapActions(useCartStore, ["initializeCart"]),
  },
};
</script>

<style scoped></style>
