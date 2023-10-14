import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView";
import GameView from "@/views/GameView";
import NotFound from "@/views/NotFound";

const routes = [
    { path: '/', name: 'HomeView', component: HomeView},
    { path: '/game', name: 'GameView', component: GameView},
    { path: '/404', component: NotFound },
    //{ path: '*', redirect: '/404' }
]

const router = createRouter({
    //history: createWebHistory(process.env.BASE_URL),
    history: createWebHistory(),
    routes
})

export default router;