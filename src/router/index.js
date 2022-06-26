import {createRouter, createWebHistory} from 'vue-router';
import StorefrontView from '@/views/StorefrontView.vue';

const routes = [
    {
        path: '/',
        name: 'storefront',
        component: StorefrontView
    },
    {
        path: '/category/:category',
        name: 'category',
        component: () => import(/* webpackChunkName: "category" */ '@/views/CategoryView.vue'),
        meta: {title: 'Category'}, //ToDo dynamic title
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
        meta: {title: 'Product'}, //ToDo dynamic title
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
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 }
    },
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
