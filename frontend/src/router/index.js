import { createRouter, createWebHistory } from "vue-router";
import PageHome from "@/views/PageHome.vue";
import ProductList from "@/views/production/ProductList";

const routes = [
    {
        path: '/',
        name: 'PageHome',
        component: PageHome
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/PageAbout.vue')
    },
    {
        path: '/product/list',
        name: 'Product',
        component: ProductList
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
