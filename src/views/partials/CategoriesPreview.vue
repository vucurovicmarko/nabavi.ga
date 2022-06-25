<template>
  <section class="bg-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none">
        <h2 class="text-2xl font-extrabold text-gray-900">
          Categories
        </h2>

        <div class="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-14">
          <CategoryPreview></CategoryPreview>
          <CategoryPreview></CategoryPreview>
          <CategoryPreview></CategoryPreview>
          <CategoryPreview></CategoryPreview>
          <CategoryPreview></CategoryPreview>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CategoryPreview from "@/components/CategoryPreview";

export default {
  name: "CategoriesPreview",
  components: {
    CategoryPreview,
  }
}
</script>

<style scoped>

</style>