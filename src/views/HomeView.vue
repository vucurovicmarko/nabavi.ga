<template>
  <main>
    <NewArrivalsPromo></NewArrivalsPromo>
    <CategoriesPreview></CategoriesPreview>
  </main>
</template>

<script>
import CategoriesPreview from "@/views/partials/CategoriesPreview";
import NewArrivalsPromo from "@/views/partials/NewArrivalsPromo";

export default {
  name: 'HomeView',
  components: {
    NewArrivalsPromo,
    CategoriesPreview,
  }
}
</script>
