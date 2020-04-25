<template>
  <div class="editor">
    <editor-menu-bubble :editor="editor" :keep-in-bounds="keepInBounds" v-slot="{ commands, isActive, menu }">
      <div
        class="menububble"
        :class="{ 'is-active': menu.isActive }"
        :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
      >
          <button
            :class="{ 'is-active': isActive.bold() }"
            class="menububble__button"
            @click="commands.bold"
          >
            <v-icon dark>mdi-format-bold</v-icon>
          </button>

          <button
            :class="{ 'is-active': isActive.italic() }"
            class="menububble__button"
            @click="commands.italic"
          >
            <v-icon dark>mdi-format-italic</v-icon>
          </button>

          <button
            :class="{ 'is-active': isActive.strike() }"
            class="menububble__button"
            @click="commands.strike"
          >
            <v-icon dark>mdi-format-strikethrough</v-icon>
          </button>

          <button
            :class="{ 'is-active': isActive.underline() }"
            class="menububble__button"
            @click="commands.underline"
          >
            <v-icon dark>mdi-format-underline</v-icon>
          </button>

          <button
            :class="{ 'is-active': isActive.code() }"
            class="menububble__button"
            @click="commands.code"
          >
            <v-icon dark>mdi-xml</v-icon>
          </button>

          <button
            class="menububble__button"
            @click="commands.horizontal_rule"
          >
            <v-icon dark>mdi-minus</v-icon>
          </button>

          <button
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            class="menububble__button"
            @click="commands.heading({ level: 1 })"
          >
            <v-icon dark>mdi-format-header-1</v-icon>
          </button>

          <button
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            class="menububble__button"
            @click="commands.heading({ level: 2 })"
          >
            <v-icon dark>mdi-format-header-2</v-icon>
          </button>

          <button
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            class="menububble__button"
            @click="commands.heading({ level: 3 })"
          >
            <v-icon dark>mdi-format-header-3</v-icon>
          </button>

          <button
            :class="{ 'is-active': isActive.bullet_list() }"
            class="menububble__button"
            @click="commands.bullet_list"
          >
            <v-icon dark>mdi-format-list-bulleted-square</v-icon>
          </button>

          <button
            :class="{ 'is-active': isActive.ordered_list() }"
            class="menububble__button"
            @click="commands.ordered_list"
          >
            <v-icon dark>mdi-format-list-numbered</v-icon>
          </button>

          <button
            :class="{ 'is-active': isActive.blockquote() }"
            class="menububble__button"
            @click="commands.blockquote"
          >
            <v-icon dark>mdi-format-quote-close</v-icon>
          </button>

          <button
            class="menububble__button"
            @click="openModal(commands.iframe)"
          >
            <v-icon dark>mdi-youtube</v-icon>
          </button>

          <button
            class="menububble__button"
            @click="openFiles(commands.img)"
          >
            <v-icon dark>mdi-image-outline</v-icon>
          </button>

          <button
            class="menububble__button"
            @click="commands.undo"
          >
            <v-icon dark>mdi-undo</v-icon>
          </button>

          <button
            class="menububble__button"
            @click="commands.redo"
          >
            <v-icon dark>mdi-redo</v-icon>
          </button>
      </div>
    </editor-menu-bubble>
    <editor-content class="editor__content" :editor="editor" />
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Добавить видео из   <b class="ml-2" style="color: #FF0000"> You</b><b>Tube</b>
        </v-card-title>

        <v-card-text class="py-6">
          <v-text-field
            v-model="youtubeToInsert"
            label="Вставьте ссылку на видео"
            :rules="[urlRuleTextField]"
          >

          </v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="addVideo()"
          >
            Добавить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-fade-transition mode="in-out">
      <v-overlay :dark="false" class="d-flex justify-center" z-index="500" v-if="overlay">
        <div class="files">
          <v-row>
            <v-col class="d-flex justify-space-between">
              <span style="display: inline-block">Выберите файл</span>
              <v-btn color="red" @click="overlay=false" text>Отмена</v-btn>
            </v-col>
          </v-row>
          <file-controller :isChoseMode="true" v-on:choose-file="chooseFile($event)"></file-controller>
        </div>
      </v-overlay>
    </v-fade-transition>
  </div>
</template>

<script>
  import Iframe from '../article/Iframe'
  import Img from '../article/Img'
  import FileController from "../../components/file-controller/FileController";
  import { mapMutations, mapActions  } from 'vuex';
  import {
    Blockquote,
    CodeBlock,
    HardBreak,
    Heading,
    HorizontalRule,
    OrderedList,
    BulletList,
    ListItem,
    TodoItem,
    TodoList,
    Bold,
    Code,
    Italic,
    Link,
    Strike,
    Underline,
    History,
    TrailingNode
  } from 'tiptap-extensions'
  import { Editor, EditorContent, EditorMenuBubble } from 'tiptap'
export default {
    components: {
      EditorMenuBubble,
      FileController,
      EditorContent,
    },
    props: {
      textData: {
        type: String,
        default: ''
      }
    },
    data: vd => ({
        keepInBounds: true,
        editor: new Editor({
          autoFocus: true,
          extensions: [
            new Blockquote(),
            new BulletList(),
            new CodeBlock(),
            new HardBreak(),
            new Heading({ levels: [1, 2, 3] }),
            new HorizontalRule(),
            new ListItem(),
            new OrderedList(),
            new TodoItem(),
            new TodoList(),
            new Link(),
            new Bold(),
            new Code(),
            new Italic(),
            new Strike(),
            new Underline(),
            new History(),
            new TrailingNode(),
            new Iframe(),
            new Img(),
          ],
          content: ''
        }),
        dialog: false,
        overlay: false,
        youtubeToInsert: "",
        youtubeUrlRule: url => {
          const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
          const match = url.match(regExp)
          return match && match[7].length === 11 ? match[7] : false
        },
        iframeCommand: null,
        imgCommand: null,
        urlRuleTextField: url => {
          if(vd.$data.youtubeUrlRule(url)) {
            return true
          } else {
            return 'Пример ссылки: https://www.youtube.com/watch?v=jWOJMokzERw'
          }
        }
      }),
    watch: {
      textData: {
        handler: function (newVal) {
            this.editor.setContent(newVal)
            this.setEditorText(this.textData)
        },
        immediate: true
      }
    },
    created: function() {
      console.log(this.youtubeUrlRule('https://www.youtube.com/watch?v=yYDIMPt4e6o'))
      this.editor.on('update', ({ getHTML }) => {
        this.setEditorText(getHTML())
        this.$emit('input', getHTML())
      })
    },
    beforeDestroy () {
      this.setEditorText("")
      this.editor.destroy()
    },
    methods: {
      ...mapMutations(['setEditorText']),
      openModal(comand){
        this.dialog = true
        this.iframeCommand = comand
      },
      openFiles(comand){
        this.overlay = true
        this.imgCommand = comand
      },
      chooseFile(file){
        if(this.imgCommand){
          this.imgCommand(this.$store.state.apiuri + file.file)
          this.imgCommand = null
          this.overlay = false
        }
      },
      addVideo(){
        if(this.iframeCommand){
          this.iframeCommand(`https://www.youtube.com/embed/${this.youtubeUrlRule(this.youtubeToInsert)}`)
          this.iframeCommand = null
          this.dialog = false
        }
      }
    }
  }
</script>

<style lang="scss">
  .editor__content {
    & p {
      outline: none;
    }
  }

  .ProseMirror {
    outline: none;
  }


  .menububble {
    position: absolute;
    display: flex;
    max-width: 400px;
    z-index: 20;
    flex-wrap: wrap;
    background: black;
    border-radius: 5px;
    padding: 0.3rem;
    margin-bottom: 0.5rem;
    transform: translateX(-50%);
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.2s, visibility 0.2s;

    &.is-active {
      opacity: 1;
      visibility: visible;
    }

    &__button {
      display: inline-flex;
      background: transparent;
      border: 0;
      color: white;
      padding: 0.2rem 0.5rem;
      margin-right: 0.2rem;
      border-radius: 3px;
      cursor: pointer;

      &:last-child {
        margin-right: 0;
      }

      &:hover {
        background-color: rgba(white, 0.1);
      }

      &.is-active {
        background-color: rgba(white, 0.2);
      }
    }

    &__form {
      display: flex;
      align-items: center;
    }

    &__input {
      font: inherit;
      border: none;
      background: transparent;
      color: white;
    }
  }

  .iframe {
    &__embed {
      width: 100%;
      height: 480px;
      border: none;

      &_img {
        max-width: 100%;
      }
    }
    &__input {
      display: block;
      width: 100%;
      font: inherit;
      border: 0;
      border-radius: 5px;
      background-color: rgba(black, 0.1);
      padding: 0.3rem 0.5rem;
    }
  }
</style>
