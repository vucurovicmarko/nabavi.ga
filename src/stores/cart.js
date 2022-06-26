import {defineStore} from 'pinia';
import {useToast} from "vue-toastification";

const LOCAL_STORAGE_CART_KEY = 'cart';
const toast = useToast();

export const useCartStore = defineStore("cart", {
    state: () => ({
        products: [],
    }),
    getters: {
        hasProducts: (state) => state.products.length > 0,
        productsCount: (state) => state.products.length,
        subtotal() {
            return this.products.reduce((memo, {price, quantity}) => {
                return memo + parseInt(price) * quantity;
            }, 0);
        },
    },
    actions: {
        initializeCart() {
            const products = localStorage.getItem(LOCAL_STORAGE_CART_KEY);

            if (products) {
                this.products = JSON.parse(products);
            }
        },
        addProduct(product) {
            const cartProduct = this.products.find(({id}) => id === product.id);

            if (cartProduct) {
                cartProduct.quantity++;
            } else {
                this.products.push({...product, quantity: 1});
            }

            toast.success("Added to cart", {position: "bottom-left", timeout: 3000});
            this.saveCartToLocalStorage();
        },
        removeProduct(productId) {
            const cartProductIndex = this.products.findIndex(({id}) => id === productId);

            if (cartProductIndex !== -1) {
                this.products.splice(cartProductIndex, 1);
            }

            this.saveCartToLocalStorage();
        },
        saveCartToLocalStorage() {
            localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(this.products));
        },
    },
});
