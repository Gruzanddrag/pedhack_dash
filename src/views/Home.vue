<template>
  <v-container
    fluid
    class="main-container"
  >
    <div class="welcome-wrapper" v-if="!loading">
      <h1>Добро пожаловать в систему управления сайтом группы компаний "Экспертиза"<br> <b :style="{color: roles[user.role].color}">{{roles[user.role].name}}</b></h1>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    data () {
      return {
      }
    },
    created: function(){
      this.$http(this.apiuri + '/api/auth/me', 'post')
      .then(response => {
        this.user = response
      })
      .catch(_=>{
        this.$router.push('/login')
      })
    },
    methods: {},
    computed:{
      ...mapState(['apiuri','roles', 'loading']),
      user: {
        get: function(){
          return this.$store.state.user
        },
        set: function(val){
          this.$store.commit('SET_USER', val)
        },
      }
    }
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
