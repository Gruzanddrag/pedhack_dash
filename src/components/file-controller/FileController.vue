<template>
  <div class="file-controller">

    <v-row justify="center">
      <v-col cols="6">
        <v-file-input v-model="newFile" label="Загрузить новый файл"></v-file-input>

      </v-col>
      <v-col v-if="newFile" cols="1" class="d-flex align-center justify-center pb-5">
        <v-btn @click="saveFile()" color="primary" >
          <v-icon>mdi-file-upload-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="6" lg="4" cols=12 v-for="(file, i) in files" :key="i">
        <v-hover >
          <template v-slot:default="{ hover }">
            <v-card min-height="280" max-height="280" class="d-flex file flex-column justify-space-between align-center pt-3" :style="{  backgroundImage: `url('${apiuri + file.preview}')`}">
              <div class="file-info">
                <v-card-title class="py-0" v-text="file.name"></v-card-title>
                <v-card-title class=" py-0 subtitle-1" v-text="'Расширение: ' + file.ext"></v-card-title>
              </div>
              <v-fade-transition>
                <v-overlay color="primary" v-if="hover" absolute >
                  <v-btn color="white" v-if="!isChoseMode" @click="delFile(file.id)" text>Удалить</v-btn>
                  <v-btn color="white" @click="chooseFile(file)" v-else text>Выбрать</v-btn>
                  <v-btn :href="apiuri + file.file" icon>
                    <v-icon>mdi-file-outline</v-icon>
                  </v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import Axios from 'axios';
  import { mapState } from 'vuex';
export default {
    props: {
      isChoseMode: {
        type: Boolean,
        default: false
      }
    },
    data: vm => ({
        files:[],
        newFile:null
    }),
    computed: {
      ...mapState(['apiuri'])
    },
    created: function() {
      this.refreshFiles()
    },
  methods: {
    refreshFiles(){
      this.$http(this.apiuri + '/api/files', 'get')
        .then(res => {
          this.files = res
        })
    },
    delFile(id){
      this.$http(this.apiuri + "/api/files/delete/"+id, 'get')
      .then(res =>{
        if(res.status){
          this.refreshFiles()
        }
      })
    },
    chooseFile(file){
      this.$emit('choose-file', file)
    },
    saveFile(){
      if(this.newFile){
        let f = new FormData()
        f.append('file', this.newFile)
        this.$http(this.apiuri + '/api/files', 'post', f)
          .then(res => {
            if(res.id){
              this.$emit('choose-file', res)
            }
          })
      }
    }
  }
}
</script>

<style lang="scss">
.file-img {
  max-width: 60%;
}

.file-info {
  width: 100%;
  text-align: center;
  color: white;
  border-radius: 0 !important;
  backdrop-filter: blur(5px) brightness(70%);
}

.file {
  background-position: center;
  background-size: cover;
}
</style>
