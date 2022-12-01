import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
//import moment from 'moment'; // 导入模块
//moment.locale('zh-cn'); // 设置语言 或 moment.lang('zh-cn');

const app = createApp(App);

//app.config.globalProperties.$moment = moment;// 赋值使用

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.use(ElementPlus).mount('#app');
