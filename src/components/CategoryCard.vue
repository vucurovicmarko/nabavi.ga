<template>
  <div class="group relative">
    <div
      class="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1"
    >
      <img
        :src="`/images/categories/${category.slug}.jpg`"
        :alt="category.name"
        class="w-full h-full object-center object-cover"
        @error="defaultImg"
      />
    </div>
    <h3 class="mt-6">
      <router-link
        :to="category.get_absolute_url"
        class="text-base font-semibold text-gray-900"
      >
        <span class="absolute inset-0"></span>
        {{ category.name }}
      </router-link>
    </h3>
  </div>
</template>

<script>
export default {
  name: "CategoryCard",
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  methods: {
    defaultImg(e) {
      e.target.src = "/images/categories/default.jpg";
    },
  },
};
</script>

<style scoped></style>
