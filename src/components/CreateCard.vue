<template>
  <v-flex>
    <v-card class="pa-2" :class="{'add-another-card': !addCardClicked}">
      <v-form
          @submit.prevent="onCreateCard"
          autocomplete="off"
      >
        <div v-if="!addCardClicked"
             @click="addCardClicked = !addCardClicked"
        >
          + Add another card
        </div>
        <div v-else>
          <v-textarea
              @keyup.prevent.enter="onCreateCard"
              outlined
              rows="2"
              row-height="20"
              v-model="card.title"
              label="Title"
              autofocus
          >
          </v-textarea>
          <v-btn type="submit" color="success">Add Card</v-btn>
          <v-icon @click="addCardClicked = !addCardClicked" class="pl-5">close</v-icon>
        </div>
      </v-form>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'CreateCard',
  props: ['listId', 'boardId', 'createCard'],
  data: () => ({
    addCardClicked: false,
    card: {
      id: 0,
      title: '',
      boardId: 0,
      listId: 0,
    },
  }),
  methods: {
    async onCreateCard() {
      const cardId = this.card.id + 1;
      const payload = {
        id: cardId,
        title: this.card.title,
        boardId: this.boardId,
        listId: this.listId,
      };
      console.log('this.card', this.card);
      await this.createCard(payload);
      this.card = {
        id: this.card.id + 1,
        title: '',
        boardId: 0,
        listId: 0,
      };
      this.addCardClicked = false;
    },
  },
};
</script>

<style scoped lang="scss">
  .add-another-card:hover {
    cursor: pointer;
    background-color: #f1f1f1f1;
    transition: ease .5s;
  }
</style>
