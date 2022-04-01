import Vue from 'vue';
import App from './App.vue';

import Element from 'element-ui';
import Moment from 'moment';

import router from './router';

import 'element-ui/lib/theme-chalk/index.css';
// 引入自定义文件
import '@/assets/styles/index.scss';

// 定义全局时间戳过滤器
Vue.filter('formatDate', function (value) {
  return Moment(value).format('YYYY-MM-DD HH:mm');
});

Vue.use(Element);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
