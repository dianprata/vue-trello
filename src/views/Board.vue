<template>
  <div>
    <v-flex xs12>
      <v-layout row wrap>
        <v-flex sm3 pa-2 v-for="list in lists" :key="list.id">
          <single-list :cardsByListId="cardsByListId"
                       :list="list"
                       :setDroppingList="onSetDroppingList"
                       :startDraggingCard="startDraggingCard"
                       :dropCard="dropCard"
                       :droppingList="droppingList"
          >
          </single-list>
        </v-flex>
        <new-list
            :createList="createList"
        >
        </new-list>
      </v-layout>
    </v-flex>
  </div>
</template>

<script>
import SingleList from '../components/SingleList.vue';
import NewList from '../components/NewList.vue';

export default {
  name: 'Board',
  components: {
    SingleList,
    NewList,
  },
  data: () => ({
    cardsByListId: [],
    lists: [],
    droppingList: false,
  }),
  methods: {
    onSetDroppingList() {
      this.droppingList = true;
      console.log('onsetDroppingList');
    },
    startDraggingCard(card) {
      console.log('started dragging...', card);
      this.setDraggingCard(card);
    },
    setDraggingCard(card) {
      this.cardsByListId.push(card);
    },
    async dropCard() {
      if (this.droppingList) {
        console.log('set Dragging card', this.cardsByListId);
      }
    },
    async createList(list) {
      this.lists.push(list);
      console.log('list', list);
    },
  },
};
</script>

<style scoped>

</style>
