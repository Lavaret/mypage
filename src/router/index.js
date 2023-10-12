import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView";
import GameView from "@/views/GameView";

const routes = [
    { path: '/', name: 'HomeView', component: HomeView},
    { path: '/game', name: 'GameView', component: GameView}
]

const router = createRouter({
    //history: createWebHistory(process.env.BASE_URL),
    history: createWebHistory(),
    routes
})

export default router;