import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import router from './routes';
import apis from './apis/index';

Vue.use(ElementUI);


Object.defineProperty(Vue.prototype, '$api', {
  value: apis,
});
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app') //