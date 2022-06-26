import {defineStore} from 'pinia';

const LOCAL_STORAGE_KEY = 'cart';

export const useCartStore = defineStore("cart", {
    state: () => ({
        products: [],
    }),
    getters: {
        hasProducts: (state) => state.products.length > 0,
        productsInCart: (state) => state.products.length,
        subtotal() {
            return this.products.reduce((memo, {price, quantity}) => {
                return memo + parseInt(price) * quantity;
            }, 0);
        }
    },
    actions: {
        initializeCart() {
            const cart = localStorage.getItem(LOCAL_STORAGE_KEY);

            if (cart) {
                this.products = JSON.parse(cart);
            } else {
                localStorage.setItem(LOCAL_STORAGE_KEY, this.products);
            }
        },
        addProduct(product) {
            const cartProduct = this.products.find(({id}) => product.id === id);

            if (cartProduct) {
                cartProduct.quantity++;
            } else {
                this.products.push({...product, quantity: 1});
            }

            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.products));
        }
    },
});
