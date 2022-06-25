<template>
  <TheNavbar></TheNavbar>
  <RouterView/>
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
