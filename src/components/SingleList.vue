<template>
  <v-card @dragover="setDroppingList($event, list)"
          :class="{
            'green lighten-4': droppingList == list
          }"
          draggable="true">
    <v-card-title primary-title class="pa-1">
      <v-layout column>
        <v-flex xs12 @dblclick="clickEditList" v-if="editListIndex !== list.id">
          <div class="headline pl-2">{{list.name}}</div>
        </v-flex>
        <v-flex pa-2 v-if="editListIndex === list.id">
          <v-text-field
              @keyup.prevent.enter="editList"
              v-model="editListName"
              label="Name List"
              autofocus
          >
          </v-text-field>
          <v-btn type="submit" color="success" @click="editList">Add List</v-btn>
          <v-icon @click="editListIndex = null" class="pl-5">close</v-icon>
        </v-flex>
        <v-flex xs12
                v-for="(card,index) in cardsByListId"
                :key="card.id"
                class="pa-1">
          <template v-if="card.listId === list.id">
            <v-card draggable="true"
                    @dragstart="startDraggingCard(card)"
                    @dragend="dropCard()"
                    @mouseover="hoverCard = index"
                    @mouseleave="hoverCard = null"
                    class="card-single-list"
            >
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs12>
                    <div class="cardList font-weight-regular" v-if="editTitle !== index">
                      <div @click="clickEditCard(card, index)"
                           v-show="hoverCard === index"
                           class="icon-edit">
                        <v-icon size="15" class="pa-2">edit</v-icon>
                      </div>
                      {{card.title}}
                    </div>
                    <div v-if="editTitle === index">
                      <v-textarea
                          @keyup.prevent.enter="onEditCard"
                          outlined
                          rows="2"
                          row-height="20"
                          v-model="editCard.title"
                          label="Title"
                      >
                      </v-textarea>
                      <v-btn type="submit" color="success" @click="onEditCard">Submit</v-btn>
                      <v-icon @click="editTitle = null" class="pl-5">close</v-icon>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </template>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-card-actions>
      <create-card
          :createCard="createCard"
          :listId="list.id"
          :boardId="$route.params.id">
      </create-card>
    </v-card-actions>
  </v-card>
</template>

<script>
import CreateCard from './CreateCard.vue';

export default {
  name: 'SingleList',
  components: {
    CreateCard,
  },
  props: [
    'list',
    'cardsByListId',
    'startDraggingCard',
    'dropCard',
    'setDroppingList',
    'droppingList',
    'listId',
    'boardId',
  ],
  data: () => ({
    hoverCard: null,
    editTitle: null,
    editListIndex: null,
    editListName: '',
    editCard: {
      id: 0,
      title: '',
      listId: 0,
      boardId: 0,
    },
  }),
  methods: {
    createCard(card) {
      this.cardsByListId.push(card);
    },
    clickEditCard(data, index) {
      this.editTitle = index;
      this.editCard = {
        id: data.id,
        title: data.title,
        listId: data.listId,
        boardId: data.boardId,
      };
    },
    onEditCard() {
      const cardIndex = this.cardsByListId.findIndex(c => c.id === this.editCard.id);
      this.cardsByListId[cardIndex].title = this.editCard.title;
      this.editTitle = null;
    },
    clickEditList() {
      this.editListIndex = this.list.id;
      this.editListName = this.list.name;
    },
    editList() {
      this.list.name = this.editListName;
      this.editListIndex = null;
    },
  },
};
</script>

<style scoped lang="scss">
  .card-single-list {
    position: relative;
    .cardList {
      font-size: 14px;
      line-height: 1.5;
    }
    .icon-edit {
      position: absolute;
      top: 3px;
      right: 3px;
      &:hover {
        background-color: #f1f1f1;
        border-radius: 5px;
      }
    }
  }
</style>
