<template>
  <v-container
    fluid
    style=""
    class="main-container"
  >
    <v-col>
      <v-row>
        <v-col>
          <header-control :shadow="false" btnText="Новая игра">
            <template v-slot:left-cheek>
                <p>Количество завершенных ивентов: <b style="color: #512DA8">{{finishedGames.length}}</b></p>
                <p>Количество запущеных ивентов: <b  style="color: #FF6F00">{{gameInProcessGames.length}}</b></p>
                <p>Количество не начинавшихся ивентов: <b  style="color: #F44336">{{notStartedGames.length}}</b></p>
            </template>
            <template v-slot:right-cheek>
                <p>Имя пользователя: <b style="color: #2962FF">Admin</b></p>
                <button>Общий отчет о прошедших играх</button>
            </template>
          </header-control>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10">
          <v-card>
            <v-card-title class="">
              <v-row>
                <v-col class="d-flex align-end pl-5">
                  <h2 class="ma-0">Доступные игры</h2>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="search_games"
                    append-icon="mdi-magnify"
                    label="Поиск по играм"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-title>
            <v-data-table
              :headers="game_headers"
              :items="games"
              :search="search_games"
              class="elevation-1"
            >
              <template v-slot:item.Status="{ item, value }">
                <v-chip :color="$store.state.statuses[value].color" dark>{{ $store.state.statuses[value].text }}</v-chip>
              </template>
              <template v-slot:item.Id="{ item, value }">
                 <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn v-on="on" icon>
                        <v-icon>
                          mdi-monitor-edit
                        </v-icon>
                    </v-btn>
                  </template>
                  <span>Мониторинг и редактирование</span>
                </v-tooltip> <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn v-on="on" icon @click="deleteGame(item)">
                        <v-icon>
                          mdi-trash-can-outline
                        </v-icon>
                    </v-btn>
                  </template>
                  <span>Удалить игру</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-dialog v-model="deletGameDialog"  max-width="600px">
      <v-card>
        <v-card-title>
          Вы уверены, что хотите удалить мероприятие
        </v-card-title>
        <v-card-text>
        <small>*все данные связанные с ней удаляться</small>
        </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn text color="blue">
          Да, удалить
        </v-btn>
        <v-btn text color="blue" @click="deletGameDialog=false">
          Нет, отмена
        </v-btn>
      </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import HeaderControl from "../components/controll/HeaderControl"
import Axios from 'axios'
  export default {
    components: {
      HeaderControl
    },
    data () {
      return {
        title: '',
        games: [],
        deletGameDialog: false,
        game_headers: [
          { text: 'Наименование игры', value: 'NameGame' },
          { text: 'Статус игры', value: 'Status' },
          { text: 'Наименование босса', value: 'NameBoss' },
          { text: 'Действия', value: 'Id', sortable: false },
        ],
        search_games: '',
        gameToDelete: {}
      }
    },
    computed: {
      finishedGames: function() {
        return this.games.filter(
          x => x.Status == this.$store.state.GAME_FINISHED
        )
      },
      notStartedGames: function() {
        return this.games.filter(
          x => x.Status == this.$store.state.GAME_NOT_STARTED
        )
      },
      gameInProcessGames: function() {
        return this.games.filter(
          x => x.Status == this.$store.state.GAME_IN_PROCESS
        )
      },
    },
    created: function(){
      Axios.get("http://192.168.1.23/api/GetData.php", {
        params: {
          select: "*",
          table: "Game",
          filter: `Where idAdmin = ${this.$store.state.admin_id}`
        }
      }).then(res => {
        console.log(res.data)
        this.games = res.data.data
      })
    },
    methods: {
      deleteGame(game) {
        this.gameToDelete = game
        this.deletGameDialog = true
      }
    },
  }
</script>

<style lang="scss" scoped>
  .main-container {
    height: 100%;
    display: flex;

    & .welcome-wrapper{
      margin: auto;
      max-width: 40%;
      text-align: center;
    }

  }
</style>
