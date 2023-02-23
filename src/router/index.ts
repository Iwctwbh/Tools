import {createRouter, createWebHistory} from "vue-router";

// 公共路由
export const constantRoutes = [
    {
        path: "/Home",
        name: "首页 Home Page",
        component: () => import("../views/Home.vue")
    },
    {
        path: "/LogFilter",
        name: "日志过滤 LogFilter",
        component: () => import("../views/LogFilter.vue")
    },
    {
        path: "/GuessNumber",
        name: "猜数游戏 Guess Number",
        component: () => import("../views/GuessNumber.vue")
    },
    {
        // 非路由节点，重定向至首页
        path: "/:pathMatch(.*)*",
        redirect: "/Home"
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes
});

export default router;
