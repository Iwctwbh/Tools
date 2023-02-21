import {createRouter, createWebHistory} from "vue-router";

// 公共路由
export const constantRoutes = [
    {
        path: "/Tools/LogFilter",
        component: () => import("../views/LogFilter.vue")
    },
    {
        path: "/Tools/GuessNumber",
        component: () => import("../views/GuessNumber.vue")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes
});

export default router;
