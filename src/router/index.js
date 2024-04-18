import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/HomeTela.vue';
import inboxFornecedor from '../views/InboxFornecedor.vue';
import DetalhePedidoFornecedor from "../views/DetalhePedidoFornecedor.vue";
import layout from "../layout/index.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {value:'Home'},
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    meta: {value:'login'},
    component: () => import('../views/LoginView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;