import Vue from 'vue'
import bus from './bus'
import router from './router'
import App from './App.vue'

//bus getter
Object.defineProperties(Vue.prototype, {
    $bus: {
        get: function(){
            return bus;
        }
    }
});

window.votingApp = new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
