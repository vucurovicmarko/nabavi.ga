<template>
  <TheNavbar></TheNavbar>

  <div class="flex-grow flex flex-col">
    <RouterView/>
  </div>

  <TheFooter></TheFooter>
</template>

<script>
import TheNavbar from "@/views/partials/TheNavbar";
import TheFooter from "@/views/partials/TheFooter";

export default {
  components: {
    TheNavbar,
    TheFooter,
  }
}
</script>

<style scoped>

</style>
