import Vue from 'vue';
import VueRouter from 'vue-router'
import VueSocketIOExt from 'vue-socket.io-extended';
import socketio from 'socket.io-client';
import App from './App.vue';
import store from './store';
import Controller from './components/Controller.vue'
import Quizer from './components/Quizer.vue'


Vue.config.productionTip = false;

export const socket = socketio(window.location.origin, {
  transports: ['websocket'],
});
Vue.use(VueSocketIOExt, socket, { store });
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Quizer },
    { path: '/controller', component: Controller }
  ]
})

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app');
