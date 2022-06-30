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
        path: '/products/search',
        name: 'products_search',
        component: () => import(/* webpackChunkName: "products_search" */ '@/views/ProductsSearchView.vue'),
    },
    {
        path: '/products/:category_slug',
        name: 'category',
        component: () => import(/* webpackChunkName: "category" */ '@/views/CategoryDetailView.vue'),
    },
    {
        path: '/products/:category_slug/:product_slug',
        name: 'product',
        component: () => import(/* webpackChunkName: "product" */ '@/views/ProductView.vue'),
    },
    {
        path: '/checkout',
        name: 'checkout',
        component: () => import(/* webpackChunkName: "checkout" */ '@/views/CheckoutView.vue'),
        meta: {title: 'Checkout'},
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not_found',
        component: () => import(/* webpackChunkName: 'notFound' */ '@/views/404View'),
        meta: {title: '404'},
    }
];

const router = createRouter({
    scrollBehavior(to, from, savedPosition) {
        return {top: 0}
    },
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.afterEach((to) => {
    if (to.meta.title) {
        to.meta.title = `${to.meta.title} | ${process.env.VUE_APP_TITLE}`;
    }

    document.title = to.meta.title || process.env.VUE_APP_TITLE;
});

export default router;
