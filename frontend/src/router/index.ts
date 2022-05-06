import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Pokedex from '../views/Pokedex.vue'
import Login from '../views/Login.vue'
import myTeam from "../views/Team.vue"
import search from "../views/search.vue"


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
    }, 
    {
        path: '/myteam',
        name: 'Team',
        component: myTeam
    },
    {
        path: '/search:id',
        name: 'Search', 
        component: search
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;