import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/home.vue'
import SignIn from './components/signin.vue'

Vue.use(VueRouter);

const router = new VueRouter({
    base: __dirname,
    routes: [
      { path: '/', component: Home },
      { path: '/signin', component: SignIn }
    ]
});

export default router;
