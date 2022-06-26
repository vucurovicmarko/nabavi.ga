<template>
  <TheNavbar></TheNavbar>

  <div class="flex-grow flex flex-col">
    <RouterView/>
  </div>

  <TheFooter></TheFooter>
</template>

<script>
import {mapActions} from "pinia";
import {useCategoryStore} from "@/stores/category";

import TheNavbar from "@/views/partials/TheNavbar";
import TheFooter from "@/views/partials/TheFooter";

export default {
  components: {
    TheNavbar,
    TheFooter,
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    ...mapActions(useCategoryStore, ['fetchCategories']),
  },
}
</script>

<style scoped>

</style>
