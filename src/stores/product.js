import {defineStore} from 'pinia';
import ProductService from "@/services/product.service";

export const useProductStore = defineStore("product", {
    state: () => ({
        products: [],
        loading: false,
        error: null,
    }),
    actions: {
        fetchProducts() {
            this.products = [];
            this.loading = true;

            ProductService.query()
                .then(
                    ({data}) => this.products = data,
                    error => this.error = error
                )
                .finally(() => this.loading = false);
        },
    }
});
