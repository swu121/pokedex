import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Pokedex from '../views/Pokedex.vue'
import Login from '../views/Login.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/', 
        name: 'Pokedex', 
        component: Pokedex
    }, 
    {
        path: '/login', 
        name: 'Login',
        component: Login
    },
    {
        path: '/register', 
        name: 'Register',
        component: () => import('../views/Register.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;