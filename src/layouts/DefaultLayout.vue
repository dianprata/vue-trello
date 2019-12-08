<template>
  <v-app>
    <v-app-bar
        app
        color="dark"
        dark
    >
      <div class="d-flex align-center">
        <router-link to="/" class="white--text" style="text-decoration: none">
          <h3 class="shrink" contain>Vue-Trello</h3>
        </router-link>
      </div>

      <v-spacer></v-spacer>
      <div>
        <v-btn text @click.prevent="logout">Logout</v-btn>
      </div>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app color="grey darken-3" style="justify-content: center">
      <span class="white--text">&copy; 2019 - Dian Pratama</span>
    </v-footer>
  </v-app>
</template>

<script>
import * as ls from 'local-storage';

export default {
  name: 'DefaultLayout',
  methods: {
    logout() {
      ls.remove('app_session');
      ls.remove('user_session');
      this.$router.push('/login');
    },
    middleware() {
      const appSession = ls.get('app_session');
      if (!appSession) {
        this.$router.push('/login');
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
