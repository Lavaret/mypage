import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView";
import GameView from "@/views/GameView";
import NotFound from "@/views/NotFound";
import HashView from "@/views/HashView";

const routes = [
    { path: '/', name: 'HomeView', component: HomeView},
    { path: '/game', name: 'GameView', component: GameView},
    { path: '/hash', name: 'HashView', component: HashView },
    { path: '/404', component: NotFound },
    //{ path: '*', redirect: '/404' }
]

const router = createRouter({
    //history: createWebHistory(process.env.BASE_URL),
    history: createWebHistory(),
    routes
})

export default router;