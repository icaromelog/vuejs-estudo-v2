import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import { routes } from './routes.js'
import pt_BR from 'vee-validate/dist/locale/pt_BR'
import VeeValidate, { Validator } from 'vee-validate'
import './directives/Transform'

// Importando Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

// Importano jQuery
import $ from "jquery";

Vue.use(VueResource);
// ** Definindo um caminho root para API
Vue.http.options.root = 'http://localhost:3000';

// ** Exemplo de interceptor
// Vue.http.interceptors.push((req, next) => {

//   // é possível colocar informações no header antes do envio da requisição
//   req.headers.set('Authorization', 'informação de segurança aqui');
//   console.log('Lidando com o request');

//   next(res => {
//     console.log('Lidando com a resposta')
//     // é possível acessar os dados da reposta e realizar transformações antes
//     console.log(res.body);
//   });

// });


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
