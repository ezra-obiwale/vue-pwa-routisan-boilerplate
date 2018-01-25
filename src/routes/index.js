import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './web';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  routes: routes
});

export default router;
