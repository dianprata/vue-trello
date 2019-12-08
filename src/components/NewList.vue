<template>
  <v-flex sm3 pa-2>
    <v-card class="pa-2" :class="{'add-another-list': !addListClicked}">
      <v-form
          @submit.prevent="onCreateList"
          @keyup.prevent.enter="onCreateList"
          autocomplete="off"
      >
        <div v-if="!addListClicked"
             @click="addListClicked = !addListClicked">
          + Add another list
        </div>
        <div v-else>
          <v-text-field
              v-model="list.name"
              label="Name List"
              autofocus
          >
          </v-text-field>
          <v-btn type="submit" color="success">Add List</v-btn>
          <v-icon @click="addListClicked = !addListClicked" class="pl-5">close</v-icon>
        </div>
      </v-form>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'NewList',
  props: ['createList'],
  data: () => ({
    addListClicked: false,
    list: {
      id: 1,
      name: '',
      order: 0,
      archived: false,
    },
  }),
  methods: {
    async onCreateList() {
      const payload = {
        id: this.list.id,
        name: this.list.name,
        order: 0,
        archived: true,
      };
      await this.createList(payload);
      this.list = {
        id: this.list.id + 1,
        name: '',
        order: 0,
        archived: false,
      };
      this.addListClicked = false;
    },
  },
};
</script>

<style scoped>
  .add-another-list:hover {
    cursor: pointer;
    background-color: #f1f1f1f1;
    transition: ease .5s;
  }
</style>
