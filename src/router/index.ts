import {createRouter, createWebHistory} from "vue-router";

// 公共路由
export const constantRoutes = [
    {
        path: "/Tools/Home",
        name: "首页 Home Page",
        component: () => import("../views/Home.vue")
    },
    {
        path: "/Tools/LogFilter",
        name: "日志过滤 LogFilter",
        component: () => import("../views/LogFilter.vue")
    },
    {
        path: "/Tools/JsonFormat",
        name: "Json格式化 JsonFormat",
        component: () => import("../views/JsonFormat.vue")
    },
    {
        path: "/Tools/WordCompare",
        name: "文本对比 WordCompare",
        component: () => import("../views/WordCompare.vue")
    },
    {
        path: "/Tools/UUIDCreate",
        name: "UUID生成 UUIDCreate",
        component: () => import("../views/UUIDCreate.vue")
    },
    {
        path: "/Tools/RegexReplace",
        name: "正则替换 RegexReplace",
        component: () => import("../views/RegexReplace.vue")
    },
    {
        path: "/Tools/CaseConvert",
        name: "大小写转换 CaseConvert",
        component: () => import("../views/CaseConvert.vue")
    },
    {
        path: "/Tools/MdEditor",
        name: "Markdown编辑器 MdEditor",
        component: () => import("../views/MdEditor.vue")
    },
    {
        path: "/Tools/HTMLXMLCompress",
        name: "HTML/XML 压缩/解压 Compress/Decompress",
        component: () => import("../views/HTMLXMLCompress.vue")
    },
    {
        path: "/Tools/NumberGuess",
        name: "猜数游戏 NumberGuess",
        component: () => import("../views/NumberGuess.vue")
    },
    {
        // 非路由节点，重定向至首页
        path: "/:pathMatch(.*)*",
        redirect: "/Tools/Home"
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes
});

export default router;
