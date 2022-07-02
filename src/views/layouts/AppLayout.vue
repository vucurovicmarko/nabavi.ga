<template>
  <TheNavbar></TheNavbar>

  <div class="flex-grow flex flex-col">
    <RouterView />
  </div>

  <TheFooter></TheFooter>
</template>

<script>
import { mapState, mapActions } from "pinia";

import { useAuthStore } from "@/stores/auth";
import { useCategoryStore } from "@/stores/category";
import { useCartStore } from "@/stores/cart";

import AuthService from "@/services/auth.service";

import TheNavbar from "@/views/partials/TheNavbar";
import TheFooter from "@/views/partials/TheFooter";

export default {
  name: "AppLayout",
  components: {
    TheNavbar,
    TheFooter,
  },
  created() {
    if (this.hasAccessToken) {
      this.getUser();
    }

    this.initializeCart();
    this.fetchCategories();
  },
  computed: {
    ...mapState(useAuthStore, ["hasAccessToken"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["setUser"]),
    ...mapActions(useCategoryStore, ["fetchCategories"]),
    ...mapActions(useCartStore, ["initializeCart"]),
    getUser() {
      AuthService.getUser().then(
        ({ data }) => this.setUser(data),
        (error) => console.log(error)
      );
    },
  },
};
</script>

<style scoped></style>
