import Vue from 'vue';
import VueRouter from 'vue-router';
import * as ls from 'local-storage';
import Home from '../views/Home.vue';
import SignUp from '../views/SignUp.vue';
import Login from '../views/Login.vue';
import Board from '../views/Board.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/board/:id',
    name: 'board',
    component: Board,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const appSession = ls.get('app_session');
    if (appSession) {
      next();
    } else {
      next({ name: 'login' });
    }
  }
  next();
});

export default router;
