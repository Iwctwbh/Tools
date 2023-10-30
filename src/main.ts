import {createApp} from "vue";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import "./style.css";
import App from "./App.vue";
import router from "./router";
//import moment from 'moment'; // 导入模块
//moment.locale('zh-cn'); // 设置语言 或 moment.lang('zh-cn');

import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";
import {fab} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText} from "@fortawesome/vue-fontawesome";
import {CheckUnZipString} from "./utils/pako";

library.add(fas, far, fab);

const app = createApp(App);

//app.config.globalProperties.$moment = moment;// 赋值使用

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.directive("check-unzip", {
  updated(el, binding, vnode) {
    el.querySelector(".el-input__wrapper").style.boxShadow = "";
    if (binding.value !== "" && !CheckUnZipString(binding.value)) {
      el.querySelector(".el-input__wrapper").style.boxShadow = "0 0 0 1px red inset";
    }
  }
});

app.component("font-awesome-icon", FontAwesomeIcon)
  .component("font-awesome-layers", FontAwesomeLayers)
  .component("font-awesome-layers-text", FontAwesomeLayersText)
  .use(router)
  .use(ElementPlus)
  .mount("#app");
