import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
];

// component: () => import(/* webpackChunkName: "about" */ '@/views/SomeComponent.vue')

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
