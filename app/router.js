import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/home.vue'
import SignIn from './components/signin.vue'
import NewPoll from './components/newpoll.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/signin', component: SignIn },
    { path: '/newpoll', component: NewPoll }
  ]
});

export default router;
