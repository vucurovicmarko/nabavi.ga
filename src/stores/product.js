import {defineStore} from 'pinia';
import ProductService from "@/services/product.service";

export const useProductStore = defineStore("product", {
    state: () => ({
        products: [],
        loading: false,
    }),
    getters: {
        hasProducts: (state) => state.products.length > 0,
    },
    actions: {
        fetchProducts() {
            this.products = [];
            this.loading = true;

            ProductService.query()
                .then(({data}) => this.products = data)
                .finally(() => this.loading = false);
        },
    }
});
