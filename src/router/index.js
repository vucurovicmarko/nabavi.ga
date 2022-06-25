import {createRouter, createWebHistory} from 'vue-router';
import StorefrontView from '@/views/StorefrontView.vue';

const routes = [
    {
        path: '/',
        name: 'storefront',
        component: StorefrontView
    },
    {
        path: '/products',
        name: 'products',
        component: () => import(/* webpackChunkName: "products" */ '@/views/ProductsView.vue'),
        meta: {title: 'Products'},
    },
    {
        path: '/products/:product',
        name: 'product',
        component: () => import(/* webpackChunkName: "product" */ '@/views/ProductView.vue'),
        meta: {title: 'Product'},
    },
    {
        path: '/checkout',
        name: 'checkout',
        component: () => import(/* webpackChunkName: "checkout" */ '@/views/CheckoutView.vue'),
        meta: {title: 'Checkout'},
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import(/* webpackChunkName: 'notFound' */ '@/views/404View'),
        meta: {title: 'Not Found'},
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.afterEach((to) => {
    const DEFAULT_TITLE = "nabavi.ga";

    if (to.meta.title) {
        to.meta.title = `${to.meta.title} | ${DEFAULT_TITLE}`;
    }

    document.title = to.meta.title || DEFAULT_TITLE;
});

export default router;
