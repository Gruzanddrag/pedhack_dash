<template>
  <!-- color="grey darken-2" -->
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    style="z-index: 500"
    app
    floating
    mobile-break-point="991"
    persistent
    width="260"
    dark
  >
    <template v-slot:img="attrs">
      <v-img
        v-bind="attrs"
        gradient="to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)"
      />
    </template>

    <v-list-item two-line>
<!--      <v-list-item-avatar color="white">-->
<!--        <v-img-->
<!--          src="https://cdn.vuetifyjs.com/images/logos/v.png"-->
<!--          height="34"-->
<!--          contain-->
<!--        />-->
<!--      </v-list-item-avatar>-->

      <v-list-item-title class="title">
        BruhBot
      </v-list-item-title>
    </v-list-item>

    <v-divider class="mx-3 mb-3" />

    <v-list nav>
      <div
        v-for="(link, i) in links"
        :key="i"
        class="nav-links"
      >
        <v-list-item
          :to="link.to"
          active-class="primary white--text"
        >
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-title v-text="link.text" />
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
  import { mapMutations, mapState } from 'vuex'
  import { mdiDatabaseEdit, mdiFileDocumentBoxMultiple, mdiAlertBox } from '@mdi/js'

  export default {
    props: {
      opened: {
        type: Boolean,
        default: false,
      },
    },
    data: () => ({
      links: [
        {
          to: '/games',
          icon: 'mdi-gamepad-variant-outline',
          text: 'Игры',
        },
      ],
    }),

    computed: {
      ...mapState('app', ['image', 'color']),
      inputValue: {
        get () {
          return this.$store.state.app.drawer
        },
        set (val) {
          this.setDrawer(val)
        },
      },
    },

    methods: {
      ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
      openSubMenu (e) {
        console.log(e)
      },
    },
  }
</script>
