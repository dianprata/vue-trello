<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer app color="grey darken-3" style="justify-content: center">
      <span class="white--text">&copy; 2019 - Dian Pratama</span>
    </v-footer>
  </v-app>
</template>

<script>
import * as ls from 'local-storage';

export default {
  name: 'BlankLayout',
  methods: {
    middleware() {
      const appSession = ls.get('app_session');
      if (appSession) {
        this.$router.push('/');
      }
    },
  },
  created() {
    this.middleware();
  },
};
</script>

<style scoped>

</style>
