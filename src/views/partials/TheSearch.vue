<template>
  <Teleport to="#modals">
    <TransitionRoot :show="show" appear>
      <div class="relative z-10">
        <TransitionChild
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
          as="template"
          @before-enter="overlayTransitionLeaveFinished = false"
          @after-leave="overlayTransitionLeaveFinished = true"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity"
          ></div>
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <TransitionChild
            enter="ease-out duration-300"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
            as="template"
            @before-enter="panelTransitionLeaveFinished = false"
            @after-leave="panelTransitionLeaveFinished = true"
          >
            <div
              v-click-outside="close"
              class="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
            >
              <div class="relative">
                <svg
                  class="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  />
                </svg>
                <form @submit.prevent="submit">
                  <input
                    ref="searchInput"
                    type="text"
                    v-model="query.q"
                    class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Search products..."
                  />
                </form>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </TransitionRoot>
  </Teleport>
</template>

<script>
import { TransitionChild, TransitionRoot } from "@headlessui/vue";
import modal from "@/mixins/modal";

export default {
  name: "TheSearch",
  mixins: [modal],
  components: {
    TransitionRoot,
    TransitionChild,
  },
  data() {
    return {
      query: {
        q: "",
      },
    };
  },
  mounted() {
    this.$refs.searchInput.focus();
  },
  methods: {
    submit() {
      this.$router.push({
        name: "products_search",
        query: this.query,
      });

      this.close();
    },
  },
};
</script>

<style scoped></style>
