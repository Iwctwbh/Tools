import {createRouter, createWebHistory} from "vue-router";
import check_update from "../libs/check_update";

// 公共路由
export const constantRoutes = [
  {
    path: "/Tools/Home",
    name: "首页 Home Page",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/Tools/LogFilter",
    name: "日志过滤 LogFilter",
    component: () => import("@/views/LogFilter.vue")
  },
  {
    path: "/Tools/JsonFormat",
    name: "Json格式化 JsonFormat",
    component: () => import("@/views/JsonFormat.vue")
  },
  {
    path: "/Tools/WordCompare",
    name: "文本对比 WordCompare",
    component: () => import("@/views/WordCompare.vue")
  },
  {
    path: "/Tools/UUIDCreate",
    name: "UUID生成 UUIDCreate",
    component: () => import("@/views/UUIDCreate.vue")
  },
  {
    path: "/Tools/RegexReplace",
    name: "正则替换 RegexReplace",
    component: () => import("@/views/RegexReplace.vue")
  },
  {
    path: "/Tools/CaseConvert",
    name: "大小写转换 CaseConvert",
    component: () => import("@/views/CaseConvert.vue")
  },
  {
    path: "/Tools/MdEditor",
    name: "Markdown编辑器 MdEditor",
    component: () => import("@/views/MdEditor.vue")
  },
  {
    path: "/Tools/HTMLXMLCompress",
    name: "HTML/XML 压缩/解压 Compress/Decompress",
    component: () => import("@/views/HTMLXMLCompress.vue")
  },
  {
    path: "/Tools/TimeCalculate",
    name: "时间计算 Time Calculate",
    component: () => import("@/views/TimeCalculate.vue")
  },
  {
    path: "/Tools/Crypto",
    name: "加密/解密 Encrypt/Decrypt",
    component: () => import("@/views/Crypto.vue")
  },
  {
    path: "/Tools/Hash",
    name: "哈希 Hash",
    component: () => import("@/views/Hash.vue")
  },
  {
    path: "/Tools/NumberGuess",
    name: "猜数游戏 NumberGuess",
    component: () => import("@/views/NumberGuess.vue")
  },
  {
    path: "/Tools/Test",
    name: "Test 测试",
    component: () => import("@/views/Test.vue")
  },
  {
    // 非路由节点，重定向至首页
    path: "/:pathMatch(.*)*",
    redirect: "/Tools/Home"
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
});

router.beforeEach((to, from, next) => {
  // 检查更新
  check_update.CheckUpdate();
  next();
});

export default router;
