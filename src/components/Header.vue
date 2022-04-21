<template>
  <v-app-bar
    color="grey lighten-4"
    light
    flat
    absolute
  >
    <div class="d-flex align-center">
      <div class="my-2" @click="routerPush('Top')">
        <v-img
          :src="require('@/assets/images/cramel_logo.png')"
          max-width="100"
          contain
        ></v-img>
      </div>
    </div>
    <v-spacer></v-spacer>
    <v-btn
      class="mx-3"
      outlined
      x-small
      @click="onAuthStateChanged()"
    >
      マイページ
    </v-btn>
    <v-btn
      icon
      @click="routerPush('Search')"
    >
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          @click="routerPush(item.to)"
        >
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <template
      v-slot:extension
    >
      <v-icon
        @click="$router.back()"
      >
        mdi-chevron-left
      </v-icon>
      <v-tabs
        :color="tabColor"
      >
        <v-tab
          v-for="(tab, i) in tabs"
          :key="i"
          @click="routerPush(tab.route)"
        >
        {{tab.name}}
        </v-tab>
        <v-tabs-slider :color="tabSliderColor" />
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import firebase from 'firebase'
// import colors from 'vuetify/es5/util/colors'

export default Vue.extend({
  name: 'Header',

  data: () => ({
    tabColor: '#8c8c8c',
    tabSliderColor: '#00000000',
    isAnonymous: false,
    tabs: [
      {
        name: 'トップ',
        route: 'Top'
      },
      {
        name: 'コスメ動画',
        route: 'VideoList'
      },
      // {
      //   name: 'YouTuber',
      //   route: 'ChannelList'
      // },
      {
        name: 'ランキング',
        route: 'RankingList'
      },
      {
        name: 'コスメ',
        route: 'Category'
      }
    ],
    menuItems: [
      {
        name: 'サイトポリシー',
        to: 'Sitepolicy'
      },
      {
        name: '利用規約',
        to: 'TermsOfService'
      },
      {
        name: 'プライバシーポリシー',
        to: 'PrivacyPolicy'
      }
    ],
  }),

  methods: {
    routerPush(view: string): void {
      this.tabColor = '#19C0C9'
      this.tabSliderColor = '#19C0C9'
      if (view == 'TermsOfService' ||
          view == 'PrivacyPolicy' ||
          view == 'Top' ||
          view == 'Search'
          ) {
        this.tabColor = '#8c8c8c'
        this.tabSliderColor = '#00000000'
      }
      this.$router.push({ name: view })
    },

    onAuthStateChanged(): void {
      firebase.auth().onAuthStateChanged( user => {
        if (user && !user.isAnonymous) {
          this.routerPush('UsersProduct')
          this.tabColor = '#8c8c8c'
          this.tabSliderColor = '#00000000'
        } else {
          this.routerPush('Signin')
          this.tabColor = '#8c8c8c'
          this.tabSliderColor = '#00000000'
        }
      })
    }
  }
})
</script>
