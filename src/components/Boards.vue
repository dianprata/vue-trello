<template>
  <div>
    <v-row dense>
        <v-col v-for="board in boards" :key="board.id" md="2" sm="4">
          <v-card @click.prevent="openBoard(board.id)">
            <v-img
                :src="board.background"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="120"
            >
              <v-card-title v-text="board.name"></v-card-title>
            </v-img>
          </v-card>
        </v-col>
        <v-col md="2" sm="4">
          <v-card @click="dialogNewBoard = !dialogNewBoard"
                  color="grey lighten-4"
                  height="120"
                  align="center"
                  class="pt-11"
          >
            <span>Create new board</span>
          </v-card>
        </v-col>
      </v-row>
    <v-dialog v-model="dialogNewBoard" max-width="400">
      <v-card>
        <v-img v-if="backgroundSelected.src !== null"
               :src="backgroundSelected.src"
               height="220">
          <v-card-text class="pt-2 pb-2">
            <v-text-field v-model="boardTitle"
                          label="Add board title"
                          :rules="notEmptyRules"
                          @keyup.prevent.enter="createBoard"
                          dark
            >

            </v-text-field>
          </v-card-text>
          <v-row class="pa-3" dense>
            <v-col v-for="b in backgrounds"
                   :key="b.id"
                   class="pa-1"
            >
              <v-img :src="b.src"
                     height="40"
                     width="40"
                     @click.prevent="changeBackground(b)"
                     class="imgBackground"
              >
                <v-icon dark class="pl-3 pt-2" v-if="backgroundSelected.id === b.id">v</v-icon>
              </v-img>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-btn @click.prevent="createBoard">
              Create Board
              <v-progress-circular
                indeterminate
                size="16"
                v-if="loading"
                class="ml-2"
              >
              </v-progress-circular>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn @click.prevent="closeBoard">
              Close
            </v-btn>
          </v-card-actions>
        </v-img>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  name: 'Boards',
  data: () => ({
    dialogNewBoard: false,
    loading: false,
    boardTitle: '',
    boards: [
      { id: 1, background: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', name: 'iProp.io' },
      { id: 2, background: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', name: 'PKK' },
    ],
    backgrounds: [
      { id: 1, src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg' },
      { id: 2, src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg' },
      { id: 3, src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg' },
      { id: 4, src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg' },
    ],
    backgroundSelected: { id: 1, src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg' },
    notEmptyRules: [
      value => !!value || 'Cannot be Empty',
    ],
  }),
  methods: {
    openBoard(id) {
      this.$router.push(`/board/${id}`);
    },
    changeBackground(data) {
      this.backgroundSelected = data;
    },
    async createBoard() {
      this.loading = true;
      try {
        const payload = {
          name: this.boardTitle,
          background: this.backgroundSelected.src,
        };
        console.log('payload', payload);
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    closeBoard() {
      this.boardTitle = '';
      this.dialogNewBoard = false;
    },
  },
};
</script>

<style scoped>
  .imgBackground:hover {
    cursor: pointer;
  }
</style>
