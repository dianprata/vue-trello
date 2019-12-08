<template>
  <div>
    <v-row justify="center">
      <v-col md="5">
        <v-card>
          <v-card-title>SignUp</v-card-title>
          <v-form
            ref="form"
            v-model="valid"
            @submit.prevent="signUp"
            @keyup.prevent.enter="signUp"
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
              v-model="user.displayName"
              :rules="notEmptyRules"
              label="Display Name"
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
            <v-text-field
              v-model="user.confirmPassword"
              :rules="confirmPasswordRules"
              label="Confirm Password"
              type="password"
              required
            >
            </v-text-field>
            <v-text-field
              v-model="user.imageUrl"
              label="Image URL"
            >
            </v-text-field>
            <p>Already have an account? <router-link to="/login">Login</router-link></p>
            <v-btn
                :disabled="!valid"
                color="success"
                type="submit"
            >
              SignUp
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
import { RepositoryFactory } from '../repositories/RepositoryFactory';

const UserRepository = RepositoryFactory.get('user');
export default {
  name: 'SignUp',
  data: vm => ({
    valid: false,
    loading: false,
    user: {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      imageUrl: '',
    },
    notEmptyRules: [
      value => !!value || 'Cannot be Empty',
    ],
    confirmPasswordRules: [
      value => value === vm.user.password || 'Password must match',
    ],
  }),
  methods: {
    async signUp() {
      if (this.valid) {
        this.loading = true;
        try {
          await UserRepository.signup(this.user);
          this.loading = false;
          this.$router.push('/login');
          this.$noty.success('SignUp User Success!!');
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
