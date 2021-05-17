import Vue from 'vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import VueSocketIOExt from 'vue-socket.io-extended';
import socketio from 'socket.io-client';
import App from './App.vue';
import store from './store';
import Controller from './components/Controller.vue';
import Quizer from './components/Quizer.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


Vue.config.productionTip = false;

const SOCKET_URL = process.env.NODE_ENV === 'production' ? `${window.location.origin}` : 'http://localhost:3000';
const SOCKET_PATH = process.env.NODE_ENV === 'production' ? '/team-quiz/socket.io' : '/socket.io';

export const socket = socketio(SOCKET_URL, {
  path: SOCKET_PATH,
  transports: ['websocket'],
});
Vue.use(VueSocketIOExt, socket, { store });
Vue.use(VueRouter)
Vue.use(BootstrapVue)

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
