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
        }
      ]
    }
  ]
});
