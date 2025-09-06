import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView";
import GameView from "@/views/GameView";
import NotFound from "@/views/NotFound";
import HashView from "@/views/HashView";
import BoardView from "@/views/BoardView";
import SolarSystem from "@/boards/SolarSystem";
import ThreeDimensionView from "@/views/ThreeDimensionView"
import CellularAutomaton from "@/boards/CellularAutomaton";
import Finance from "@/views/FinanceView";
import MemoryView from "@/views/MemoryView";

const routes = [
    { path: '/', name: 'HomeView', component: HomeView},
    { path: '/game', name: 'GameView', component: GameView},
    { path: '/3d', name: 'ThreeDimensionView', component: ThreeDimensionView},
    { path: '/hash', name: 'HashView', component: HashView },
    { path: '/board', name: 'BoardView', component: BoardView },
    { path: '/404', component: NotFound },
    { path: '/board/solar-system', name: 'SolarSystem', component: SolarSystem},
    { path: '/board/cellular-automaton', name: 'CellularAutomaton', component: CellularAutomaton},
    { path: '/finance', name: 'Finance', component: Finance},
    { path: '/memory', name: 'Memory', component: MemoryView}
]

const router = createRouter({
    //history: createWebHistory(process.env.BASE_URL),
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router;