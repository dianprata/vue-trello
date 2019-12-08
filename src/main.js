import Vue from 'vue';
import VueNoty from 'vuejs-noty';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'vuejs-noty/dist/vuejs-noty.css';

Vue.use(VueNoty);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
