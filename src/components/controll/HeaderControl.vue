<template>
  <v-row>
        <v-col class="my-5 cheek-left align-end">
            <slot name="left-cheek">

            </slot>
        </v-col>
        <v-col cols="3" class="d-flex justify-center header-control">
          <button class="white--text title px-4 header-control--main_btn" @click="$emit('mainBtnClick')" :class="{'header-control--main_btn-shadow': shadow}" > 
            <p class="ma-0">{{btnText}}</p> 
          </button>
        </v-col>
        <v-col class="my-5 cheek-right">
            <slot name="right-cheek">

            </slot>
        </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'HeaderControl',
    props: {
      shadow: {
        type: Boolean,
        default: false
      },
      btnText: {
        type: String, 
        default: 'Кнопка'
      }
    },
    metaInfo () {
    },
  }
</script>
<style lang="scss">
  .header-control {
    position: relative;
    z-index: 0;

    &--main_btn {
      background: #444444;
      position: relative;
      height: 250px;
      outline: none;
      width: 250px;
      border-radius: 50%;
      transition: box-shadow ease-in-out 0.2s,  border ease-in-out 0.2s;

      &:hover {
        box-shadow: 0 15px 30px 2px rgba(0, 0, 0, 0.384);
        // text-decoration: underline;
      }
      &:active {
        background: rgba(107, 107, 107, 0.7);
      }

      &-shadow {
        box-shadow: 0 0 2px 10px rgba(0,0,0,0.5);
        &:hover{
          background: linear-gradient(0deg, #BF360C, #FFB300);

          &:before, &:after {
            opacity: 0;
            box-shadow: none;
          }
        }
        &:active {
          background: linear-gradient(0deg, rgb(116, 29, 2), rgb(233, 171, 28));
          box-shadow: 0 15px 30px 2px rgba(0, 0, 0, 0.788);
        }
        &:before, &:after {
          transition: opacity ease-in-out 0.3s;
          content:'';
          position: absolute;
          top:-2px;
          border-radius: 50%;
          left:-2px;
          width:calc(100% + 4px);
          height:calc(100% + 4px);
          background: linear-gradient(45deg, #fb0094, #0000ff, #00ff00, #ffff00, #ff0000, #fb0094, #0000ff, #00ff00, #ffff00, #ff0000);
          background-size: 400%;
          z-index:-1;
          animation: shadow 20s linear infinite;
        }
        &:after {
          top:-8px;
          left:-8px;
          width:calc(100% + 8px);
          height:calc(100% + 8px);    
          filter:blur(24px);
          opacity:0.9;
        }
      }
    }
  }

  .cheek {
    &-left, &-right {
      display: flex;
      flex-direction: column;
      padding: 20px 0px;

      & p, button {
        color: white;
        width: 70%;
        border-bottom: 1px solid #BDBDBD;
        margin: 0;
        padding-bottom: 5px;
      }

    }

    &-left{
      margin-right:  20px;
      justify-content: space-between;
      border-right:  2px solid #BDBDBD;
    }
    &-right{
      margin-left:  20px;
      justify-content: space-between;
      border-left:  2px solid #BDBDBD;
      & p, & button {
        text-align: right;
      }
      & button {
        z-index: 20;
        font-style: italic;
        position:relative;
        color: #BDBDBD;
        outline: 0;

        &:hover {
          color:white;

        }
      }
    }
  }

@keyframes shadow {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 200% 0;
  }
  100% {
    background-position: 0 0;
  }
}
</style>
