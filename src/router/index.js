import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import CpfList from '@/views/CpfList.vue';  // Importe o componente CpfList

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/CpfList',  // Adiciona a rota para a página de CPFs
      name: 'CpfList',
      component: CpfList
    }
  ]
});
