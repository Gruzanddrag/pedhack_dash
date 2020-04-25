import { exception } from "vue-analytics";

// https://vuex.vuejs.org/en/state.html

export default {
    app_state: "dev",
    authenticated: true,
    admin_id: 1,
    GAME_FINISHED: 3,
    GAME_IN_PROCESS: 2,
    GAME_NOT_STARTED: 1,
    statuses: {
      1:{
        color: '#F44336',
        text: 'Не запущена'
      },
      2: {
        color:'#FF6F00',
        text: 'Запущена',
      },
      3:{
        color:'#512DA8',
        text:'Закончена'
      }
    }
}
