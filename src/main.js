
import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router';
import "@/assets/styles.scss"; // Certifique-se de que o arquivo SCSS está nesse caminho


// Configuração do Axios globalmente
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
