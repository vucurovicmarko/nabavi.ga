<template>
  <AppLayout v-if="!authLayout"></AppLayout>
  <RouterView v-else />
</template>

<script>
import { mapActions } from "pinia";
import { useAuthStore } from "@/stores/auth";

import AppLayout from "@/views/layouts/AppLayout";

export default {
  components: {
    AppLayout,
  },
  computed: {
    authLayout() {
      return this.$route.meta.layout === "auth";
    },
  },
  created() {
    this.initializeAuth();
  },
  methods: {
    ...mapActions(useAuthStore, ["initializeAuth"]),
  },
};
</script>

<style scoped></style>
