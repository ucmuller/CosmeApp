<template>
  <v-footer
    class="pa-0 mt-5"
    app
    color="#00000000"
  >
    <transition name="fade">
      <v-col
        v-if="!isBaloonOfPWA"
        cols="12"
        class="pa-0"
        @click="openWindow('https://docs.google.com/forms/d/e/1FAIpQLScG_Ci2zP3Fj5adp5u8gF0RMK8oP0HkkNMLthAW3X5GAyT_1w/viewform?usp=sf_link')"
      >
        <v-img
          contain
          max-height="85"
          :src="require('@/assets/images/banner003.jpeg')"
        ></v-img>
      </v-col>
    </transition>
    <transition name="fade">
      <v-col
        v-if="isBaloonOfPWA"
        cols="12"
        class="pa-0 text-center"
        @click="isBalloon = false"
      >
        <div
          class="balloon"
        >
          <v-card
            class="mx-auto"
            color="#00000000"
            outlined
          >
            <div
              class="text-right icon-height"
            >
              <v-icon
                small
                right
              >
                mdi-close-circle
              </v-icon>
            </div>
            <v-list-item three-line class="ma-0 pa-0">
              <v-list-item-avatar
                rounded
                size="40"
              >
                <v-img :src="require('@/assets/images/icon.jpg')"></v-img>
              </v-list-item-avatar>
              <v-list-item-content
                class="ma-0 pa-0 small-text"
              >
                ホーム画面にインストールしましょう！矢印をタップして「ホーム画面に追加」で完了です。
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </div>
      </v-col>
    </transition>
  </v-footer>
</template>

<script lang="ts">
import Vue from 'vue'
import { DB } from '@/firebase/db'
import { Auth } from '@/firebase/auth'
import firebase from 'firebase'

export default Vue.extend({
  name: 'Banner',
  
  data: () => ({
    scrollY: 0,
    isBalloon: true,
    isDispalyStandalone: false,
    userAgent: ''
  }),

  created() {
    this.pecificBrowserName()
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.existsLogOfPWALaunch()
    // const description = "説明文"
    // document.querySelector("meta[property='og:title']").setAttribute('content', 'title')
    // document.querySelector("meta[name='description']").setAttribute('content', description)
    // document.querySelector("meta[property='og:description']").setAttribute('content', description)
  },

  computed: {
    isBaloonOfPWA: function() {
      return this.isBalloon && this.isDispalyStandalone == false && this.userAgent == 'safari' ? true : false
    }
  },

  methods: {
    handleScroll() {
      this.scrollY = window.scrollY
    },

    pecificBrowserName() {
      const ua = window.navigator.userAgent.toLowerCase();
      if(ua.indexOf("edge") !== -1 || ua.indexOf("edga") !== -1 || ua.indexOf("edgios") !== -1) {
        this.userAgent = 'edge'
      } else if (ua.indexOf("opera") !== -1 || ua.indexOf("opr") !== -1) {
        this.userAgent = 'opera'
      } else if (ua.indexOf("samsungbrowser") !== -1) {
        this.userAgent = 'samsungbrowser'
      } else if (ua.indexOf("ucbrowser") !== -1) {
        this.userAgent = 'ucbrowser'
      } else if(ua.indexOf("chrome") !== -1 || ua.indexOf("crios") !== -1) {
        this.userAgent = 'chrome'
      } else if(ua.indexOf("firefox") !== -1 || ua.indexOf("fxios") !== -1) {
        this.userAgent = 'firefox'
      } else if(ua.indexOf("safari") !== -1) {
        this.userAgent = 'safari'
      } else if (ua.indexOf("msie") !== -1 || ua.indexOf("trident") !== -1) {
        this.userAgent = 'msie'
      } else {
        this.userAgent = 'opera'
      }
    },

    openWindow (url: string) {
      this.$ga.event('bannerYoutube', 'push')
      window.open(url, '_blank', 'width=1024,height=768,scrollbars=yes,resizable=yes')
    },

    existsLogOfPWALaunch() {
      this.isDispalyStandalone = this.$route.query['mode'] == 'standalone' ? true : false
      const cookie = this.getCookie()
      if (this.isDispalyStandalone) {
        const docRef = DB.collection('cookies').doc(cookie)
        docRef.get()
        .then((doc) => {
          if (!doc.exists) {
            docRef
            .set({
              cookie: cookie,
              createdAt: new Date(),
            })
            .then(() => {
              this.$ga.event('launchPWA', 'launch')
            })
          }
          if (doc.exists) {
            docRef
            .set({
              updatedAt: new Date()
            },
            { 
              merge: true
            })
          }
        })
      }
    },

    getCookie(): string {
      const cookies = document.cookie
      const cookiesArray = cookies.split(';')
      let cookie = ''
      cookiesArray.forEach((c: any) => {
        const cArray = c.split('=')
          if( cArray[0] == '_ga'){
            cookie = cArray[1]
          }
      })
      return cookie
    }
  }
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.balloon {
  position: relative;
  display: inline-block;
  margin-bottom: 1em;
  padding: 0px 10px;
  min-width: 120px;
  max-width: 60%;
  font-size: 16px;
  background: #F5F5F5;
  border-radius: 15px;
}

.balloon:before {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -10px;
  border: 7px solid transparent;
  border-top: 10px solid #F5F5F5;
}
.small-text {
  font-size: 11px;
}
.icon-height {
  height: 12px;
}
</style>