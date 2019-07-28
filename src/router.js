import Vue from 'vue';
import Router from 'vue-router';
import Layout from './components/Layout';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Layout,
      meta: { id: 'home' },
      children: [
        {
          path: '/',
          component: () => import('./views/Home.vue')
        },
        {
          path: '/about',
          meta: { id: 'about' },
          component: () => import('./views/About.vue')

        },
        {
          path: '/orderlist',
          meta: { id: 'orderlist' },
          component: () => import('./views/OrderPage.vue')
        },
        {
          path: '/parking-lots',
          meta: { id: 'parking-lots' },
          component: () => import('./views/ParkingLotsManagement')
        },
        {
          path: '/users',
          meta: { id: 'users' },
          component: () => import('./views/User.vue')
        },
        {
          path: '/parking-boys',
          meta: { id: '停车员管理' },
          component: () => import('./views/ParkingBoysManage')
        }
      ]
    },

  ]
});
