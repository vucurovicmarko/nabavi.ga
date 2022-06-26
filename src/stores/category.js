import {defineStore} from 'pinia';
import CategoryService from "@/services/category.service";

export const useCategoryStore = defineStore("category", {
    state: () => ({
        categories: [],
    }),
    actions: {
        fetchCategories() {
            CategoryService.query()
                .then(({data}) => this.categories = data);
        },
    },
});
