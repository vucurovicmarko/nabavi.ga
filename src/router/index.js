import {createRouter, createWebHistory} from 'vue-router';
import StorefrontView from '@/views/StorefrontView.vue';

import { useAuthStore } from '@/stores/auth';

const routes = [
    {
        path: '/',
        name: 'storefront',
        component: StorefrontView
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/LoginView.vue'),
        meta: {title: 'Login', layout: 'auth'},
    },
    {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "register" */ '@/views/RegisterView.vue'),
        meta: {title: 'Register', layout: 'auth'},
    },
    {
        path: '/checkout',
        name: 'checkout',
        component: () => import(/* webpackChunkName: "checkout" */ '@/views/CheckoutView.vue'),
        meta: {title: 'Checkout', requiresAuth: true},
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
        path: '/:pathMatch(.*)*',
        name: 'not_found',
        component: () => import(/* webpackChunkName: 'notFound' */ '@/views/404View'),
        meta: {title: '404', layout: 'auth'},
    }
];

const router = createRouter({
    scrollBehavior(to, from, savedPosition) {
        return {top: 0}
    },
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to) => {
    const {isLoggedIn} = useAuthStore();

    if (to.meta.requiresAuth && !isLoggedIn) {
        return {name: 'login'};
    }
});

router.afterEach((to) => {
    if (to.meta.title) {
        to.meta.title = `${to.meta.title} | ${process.env.VUE_APP_TITLE}`;
    }

    document.title = to.meta.title || process.env.VUE_APP_TITLE;
});

export default router;
