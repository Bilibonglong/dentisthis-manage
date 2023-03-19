import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import router from './routes';
import apis from './apis/index';
import '@/assets/icon/iconfont.css'

Vue.config.productionTip = false
Vue.use(ElementUI);


Object.defineProperty(Vue.prototype, '$api', {
  value: apis,
});


new Vue({
  render: h => h(App),
  store,
  router,

}).$mount('#app') //