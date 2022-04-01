import Vue from 'vue';
import VueRouter from 'vue-router';
import SearchList from '../views/SearchList.vue';
// import SearchList from '../components/HelloWorld.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/list',
  },
  {
    path: '/list',
    name: 'List',
    component: SearchList,
  },
];

const router = new VueRouter({
  routes,
  //在此处引入所有页面的路由配置数组routes;
});

export default router;
