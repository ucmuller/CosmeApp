<template>
  <div>
    <div
      v-if="currentRoute != '/biz'"
      class="wrap-sp"
    >
      <v-app>
        <Header v-if="currentRoute != '/personalcoloranalysisquestion'"/>
        <router-view>
        </router-view>
      </v-app>
    </div>

    <div
      v-if="currentRoute == '/biz'"
      class="wrap-pc"
    >
      <v-app>
        <router-view>
        </router-view>
      </v-app>
    </div>
    
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from './components/Header.vue'
// import Banner from './components/Banner.vue'
import { DB } from '@/firebase/db'
import { Auth } from '@/firebase/auth'

export default Vue.extend({
  name: 'App',

  components: {
    Header,
    // Banner
  },

  data: () => ({
    currentRoute: ""
  }),

  created: function(){
    this.existsLogOfPWALaunch()
    this.currentRoute = this.$route.path
  },

  watch: {
    $route (to, from) {
      //遷移先のpathを取得
      this.detectPath(to.path)
    }
  },

  methods: {
    
    detectPath(path: any) {
      //pathの上書き
      this.currentRoute = path
    },

    existsLogOfPWALaunch() {
      const cookie = this.getCookie()
      if (this.$route.query['mode'] == 'standalone') {
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
});
</script>

<style scoped>
.wrap-sp {
  max-width: 640px;
  margin: auto;
  overflow: hidden;
}

.wrap-pc {
  max-width: 1280px;
  margin: auto;
  overflow: hidden;
}
</style>