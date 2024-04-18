import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/HomeTela.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {value:'Home'},
    component: Home
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;