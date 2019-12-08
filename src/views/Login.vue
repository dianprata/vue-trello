<template>
  <div>
    <v-row justify="center">
      <v-col md="5">
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-form
              ref="form"
              v-model="valid"
              @submit.prevent="login"
              @keyup.prevent.enter="login"
              class="px-4 pb-3"
              autocomplete="off"
          >
            <v-text-field
                v-model="user.email"
                :rules="notEmptyRules"
                label="E-mail"
                type="email"
                required
            ></v-text-field>
            <v-text-field
                v-model="user.password"
                :rules="notEmptyRules"
                label="Password"
                type="password"
                required
            >
            </v-text-field>
            <p>Don't have an account? <router-link to="/signup">SignUp</router-link></p>
            <v-btn
                :disabled="!valid"
                color="success"
                type="submit"
            >
              Login
              <v-progress-circular
                  indeterminate
                  size="16"
                  v-if="loading"
                  class="ml-2"
              ></v-progress-circular>
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import * as ls from 'local-storage';
import { RepositoryFactory } from '../repositories/RepositoryFactory';

const UserRepository = RepositoryFactory.get('user');

export default {
  name: 'Login',
  data: () => ({
    valid: false,
    loading: false,
    user: {
      email: '',
      password: '',
    },
    notEmptyRules: [
      value => !!value || 'Cannot be Empty',
    ],
  }),
  methods: {
    setupSession(token, user) {
      ls('app_session', token);
      ls('user_session', user);
    },
    async login() {
      if (this.valid) {
        this.loading = true;
        try {
          const resp = await UserRepository.login(this.user);
          const { data } = resp;
          this.setupSession(data.token, data.user);
          this.loading = false;
          this.$router.push('/');
        } catch (error) {
          this.loading = false;
          throw new Error(error);
        }
      }
    },
  },
};
</script>

<style scoped>

</style>
