import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/home.vue'

Vue.use(VueRouter);

const router = new VueRouter({
    base: __dirname,
    routes: [
        { path: '/', component: Home }
    ]
});

export default router;
