import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import router from './routes';
import '@/routes/routerGuard'
import apis from './apis/index';
import '@/assets/icon/iconfont.css'
import * as echarts from 'echarts'
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$echarts=echarts

Object.defineProperty(Vue.prototype, '$api', {
  value: apis,
});


new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app') //