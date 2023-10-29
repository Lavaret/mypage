import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView";
import GameView from "@/views/GameView";
import NotFound from "@/views/NotFound";
import HashView from "@/views/HashView";
import BoardView from "@/views/BoardView";
import SolarSystem from "@/boards/SolarSystem";

const routes = [
    { path: '/', name: 'HomeView', component: HomeView},
    { path: '/game', name: 'GameView', component: GameView},
    { path: '/hash', name: 'HashView', component: HashView },
    { path: '/board', name: 'BoardView', component: BoardView },
    { path: '/404', component: NotFound },
    { path: '/board/solar-system', name: 'SolarSystem', component: SolarSystem}
]

const router = createRouter({
    //history: createWebHistory(process.env.BASE_URL),
    history: createWebHistory(),
    routes
})

export default router;