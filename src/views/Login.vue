<template>
  <v-container
    fluid
    class="login-container"
  >
      <v-row class="justify-center flex-column align-center">
        <v-col lg="4" xl="3" cols="12">
          <h2 class="mb-4">Добро пожаловать в систему управления телеграмм бота <b style="color: #1976D2">"BossFight"</b></h2>
          <v-card class="pa-12 auth-card">
            <v-card-title>Вход</v-card-title>
            <v-form class="ma-auto"
                    ref="form"
                    v-model="valid"
                    lazy-validation>

              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passRules"
                :type="showPass ? 'text' : 'password'"
                name="input-10-1"
                label="Пароль"
                @click:append="showPass = !showPass"
              ></v-text-field>

              <v-btn
                :disabled="!valid"
                color="success"
                @click="submit"
              >
                Войти
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
  import Axios from 'axios'
  import {mapState, mapMutations} from "vuex";
  export default {
    data () {
      return {
        valid: false,
        showPass: false,
        snackbar: false,
        password: '',
        passRules: [
          v => !!v || 'Необходимо ввести пароль',
        ],
        email: '',
        emailRules: [
          v => !!v || 'Необходимо ввести email',
          v => /.+@.+\..+/.test(v) || 'Неккоректный email',
        ],
      }
    },
    computed: {
      ...mapState(['apiuri']),
    },
    methods: {
      submit () {
        this.$store.authenticated = true
        this.$router.push("/games")
      },
      ...mapMutations(['THROW_POPUP'])
    },
  }
</script>

<style lang="scss" scoped>
  .login-container{
    height: 100vh;
    width: 100vw;
    flex-direction: column;
    display: flex;
    justify-content: center;
  }

  .auth-card{
    text-align: center !important;
  }

  h2 {
    color: #818181;
    text-align: center;
    & .v-card__title{
      text-align: center !important;
    }

  }
</style>
