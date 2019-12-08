<template>
  <div :is="activeLayout"></div>
</template>

<script>
import BlankLayout from './layouts/BlankLayout.vue';
import DefaultLayout from './layouts/DefaultLayout.vue';

export default {
  name: 'App',
  components: {
    BlankLayout,
    DefaultLayout,
  },
  computed: {
    activeLayout() {
      if (this.$route.path === '/login' || this.$route.path === '/signup') {
        return 'BlankLayout';
      }
      return 'DefaultLayout';
    },
  },
};
</script>
