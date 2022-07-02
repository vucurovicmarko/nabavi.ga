<template>
  <AppLayout v-if="!authLayout"></AppLayout>
  <RouterView v-else />
</template>

<script>
import axios from "axios";

import { mapState, mapActions } from "pinia";
import { useCategoryStore } from "@/stores/category";
import { useAuthStore } from "./stores/auth";
import { useCartStore } from "@/stores/cart";

import AppLayout from "@/views/layouts/AppLayout";

export default {
  components: {
    AppLayout,
  },
  computed: {
    ...mapState[(useAuthStore, ["accessToken"])],
    authLayout() {
      return this.$route.meta.layout === "auth";
    },
  },
  created() {
    this.initializeAuth();
    this.fetchCategories();
    this.initializeCart();

    if (this.accessToken) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `JWT ${this.accessToken}`;
    }
  },
  methods: {
    ...mapActions(useCategoryStore, ["fetchCategories"]),
    ...mapActions(useCartStore, ["initializeCart"]),
    ...mapActions(useAuthStore, ["initializeAuth"]),
  },
};
</script>

<style scoped></style>
