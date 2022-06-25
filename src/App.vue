<template>
  <TheNavbar></TheNavbar>
  <RouterView/>
</template>

<script>
import TheNavbar from "@/views/partials/TheNavbar";

export default {
  components: {
    TheNavbar,
  }
}
</script>

<style scoped>

</style>
