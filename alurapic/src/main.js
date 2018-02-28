import Vue from 'vue'
import App from './App.vue'

import VueResource from 'vue-resource'

import VueRouter from 'vue-router'
import { routes } from './routes.js'

import pt_BR from 'vee-validate/dist/locale/pt_BR';
import VeeValidate, { Validator } from 'vee-validate';

import './directives/Transform'

Vue.use(VueResource);
// ** Definindo um caminho root para API
Vue.http.options.root = 'http://localhost:3000';

Vue.use(VueRouter);

Validator.localize('pt_BR', pt_BR);
Vue.use(VeeValidate);

const router = new VueRouter({ 
  routes,
  mode: 'history' 
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
