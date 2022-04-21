<template>
  <v-container
    class="mt-10"
  >
    <v-row
      v-if="!isFetch"
    >
      <v-col
        cols="12"
        class="px-0 mt-15 text-center"
      >
        <v-progress-circular
          :size="100"
          :width="5"
          color="#19C0C9"
          indeterminate
        >
        </v-progress-circular>
      </v-col>
    </v-row>
    <v-row
      v-if="isFetch"
      class="pt-15"
      align="center"
    >
      <v-col
        cols="4"
      >
        <div class="box-border">
          <v-img
            :src='product.imageUrl'
            :title="`${product.name}/${product.modelNumber}/${product.brand}/${product.manufacture}`"
            :alt="`${product.name}/${product.modelNumber}/${product.brand}/${product.manufacture}`"
            max-height="200"
            contain
          >
          </v-img>
        </div>
      </v-col>
      <v-col
        cols="8"
      >
        <div>
          <div class="text-subtitle-2 font-weight-bold">
            {{product.brand}}
          </div>
          <div class="text-subtitle-2 font-weight-bold">
            {{product.name}}
          </div>
          <div v-if="product.modelNumber != ''" class="text-subtitle-2 font-weight-bold">
            色: {{product.modelNumber}}
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
      >
        <div
          class="pb-0 px-0 text-center"
        >
          <v-btn
            depressed
            large
            class="white--text my-1"
            block
            color="#19C0C9"
            :disabled="existsCosme"
            @click.stop.prevent="addToCosmePouch()"
          >
            <v-icon
              left
            >
              mdi-lipstick
            </v-icon>
            {{addToCosmePouchButtonLabel}}
          </v-btn>
        </div>
        <div
          v-if="product.amazon_affiliatelink"
          class="pt-1 px-0 text-center"
        >
          <v-btn
            depressed
            large
            class="white--text my-1"
            block
            color="#FF9900"
            @click.stop.prevent="openWindowAmazon(product.amazon_affiliatelink)"
          >
          <v-icon
            left
          >
              mdi-amazon
            </v-icon>
            Amazonで購入
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        class="mt-0 px-0"
      >
        <v-tabs
          :color="tabColor"
          v-model="activeTab"
        >
          <v-tab
            v-for="(tab, i) in tabs"
            :key="i"
            @click="routerPush(tab.value)"
          >
          {{tab.name}}
          </v-tab>
          <v-tabs-slider :color="tabSliderColor" />
        </v-tabs>
      </v-col>
    </v-row>
    <v-row
      class="px-0 mt-0 mb-5 pt-0"
    >
      <v-col
        cols="6"
        v-for="(video, i) in videos"
        :key="i"
        class="pb-5 mt-0"
      >
        <div
          class="iframe-responsive"
          :ref="`player_${video.videoId}`"
        >
          <youtube
            class="iframe-responsive-youtube"
            :video-id="video.videoId"
            :player-vars="playerVars(video.time)"
            :ref="video.videoId"
            @ready="ready(video.videoId)"
          >
          </youtube>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { DB } from '@/firebase/db'
import firebase from 'firebase'

export default Vue.extend({
  name: 'Swatch',

  data: () => ({
     product: {} as any,
    sameBrandProduct: [] as any,
    sameCategoryProduct: [] as any,
    videos: [] as any,
    comments: [] as any,
    channels: [] as any,
    playerId: [] as any,
    uid: '',
    onAuthState: false,
    existsCosme: false,
    addToCosmePouchButtonLabel: 'コスメポーチに追加',
    isFetch: false,
    scrollY: 0,
    tabColor: '#19C0C9',
    tabSliderColor: '#19C0C9',
    activeTab: 1,
    isAnonymous: false,
    tabs: [
      {
        name: '商品TOP',
        value: 'Product'
      },
      {
        name: '色/画像',
        value: 'Swatch'
      }
    ]
  }),

  created: function() {
    this.fetchVideos(this.$route.params.id)
    this.fetchProduct(this.$route.params.id)
    window.scrollTo({
      top: 0
    })
  },

  methods: {

    fetchVideos (id: string): void {
      const videoArray = [] as any
      const commentAraay = [] as any
      const arr = [] as any
      DB.collection('videos')
      .where('productId', '==', id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          videoArray.push(doc.data())
        })
        this.videos = videoArray
      })
      .then(() => {
        this.videos.forEach((e: any) => {
          arr.push(e.channelId)
          this.playerId.push(
            {
              id: e.videoId,
              isPlay: false
            }
          )
        })
      })
      .then(() => {
        Array.from(new Set(arr)).forEach((e: any) => {
          this.fetchChannels(e)
        })
      })
    },

    fetchProduct (id: string): void {
      DB.collection('products')
      .where('id', '==', id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.product = doc.data()
        })
      })
      .then(() => {
         document.title = `【${this.product.brand}/${this.product.name}/${this.product.modelNumber}】人気YouTuberの動画レビューまとめ｜Cramel（クラメル）`
      })
      .then(() => {
        this.isFetch = true
        this.fetchSameBrandProduct(this.product.brand, this.product.categoryId)
        this.fetchSameCategoryProduct(this.product.brand, this.product.categoryId)
        // this.fetchBrandId()
      })
    },

    fetchChannels (id: string): void {
      DB.collection('channels')
      .where('id', '==', id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.channels.push(doc.data())
        })
      })
    },

    fetchSameBrandProduct(brand: string, categoryId: number): void {
      const sameBrandProductArray = [] as any
      const array = [] as any
      DB.collection('products')
      .where('brand', '==', brand)
      .where('categoryId', '==', categoryId)
      .orderBy('times', 'desc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if(doc.id != this.$route.params.id) {
            array.push(doc.data())
          }
        })
      })
      .then(() => {
        for(let i = 0; i < 3; i++) {
          if (array[i]) {
            sameBrandProductArray.push(array[i])
          }
        }
        this.sameBrandProduct = sameBrandProductArray
      })
    },

    fetchSameCategoryProduct(brand: string, categoryId: number): void {
      const sameCategoryProductArray = [] as any
      const array = [] as any
      DB.collection('products')
      .where('categoryId', '==', categoryId)
      .orderBy('times', 'desc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if(doc.id != this.$route.params.id && doc.data().brand != brand) {
            array.push(doc.data())
          }
        })
      })
      .then(() => {
        for(let i = 0; i < 3; i++) {
          if (array[i]) {
            sameCategoryProductArray.push(array[i])
          }
        }
        this.sameCategoryProduct = sameCategoryProductArray
      })
    },

    fetchBrandId () {
      DB.collection('brands')
      .where('brandName', '==', this.product.brand)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        });
      })
    },

    openWindow (url: string) {
      window.open(url, '_blank', 'width=1024,height=768,scrollbars=yes,resizable=yes')
    },

    openWindowAmazon (url: string) {
      this.$ga.event('amazonAffiliatelink', 'push')
      window.open(url, '_blank', 'width=1024,height=768,scrollbars=yes,resizable=yes')
    },

    addToCosmePouch() {
      if(this.uid && !this.isAnonymous) {
        this.$ga.event('toCosmePouch', 'push')
        DB.collection('users')
        .doc(this.uid)
        .collection('cosmePouch')
        .doc(this.$route.params.id)
        .set(this.product)
        .then(() => {
          this.existsCosme = true
          this.addToCosmePouchButtonLabel = 'コスメポーチに追加済み'
        })
      } else {
        this.$ga.event('toCosmePouchAnonymous', 'push')
        this.pushToSignin()
      }
    },

    onAuthStateChanged() {
      firebase.auth().onAuthStateChanged( user => {
        if (user) {
          this.uid = user.uid
          this.isAnonymous = user.isAnonymous
          this.checkIfProductDataExistsInUsersSubCollection(user.uid)
        } else {
          this.addToCosmePouchButtonLabel = 'コスメポーチに追加'
        }
      })
    },

    checkIfProductDataExistsInUsersSubCollection (uid: string): void {
      DB.collection('users')
      .doc(uid)
      .collection('cosmePouch')
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.existsCosme = true
          this.addToCosmePouchButtonLabel = 'コスメポーチに入っています'
        } else {
          this.addToCosmePouchButtonLabel = 'コスメポーチに追加'
        }
      })
      .catch(error => {
      })
    },

    pushToSignin() {
      this.$router.push({ name: 'Signin' })
    },

    routerPush(view: string) {
      if( view != 'Swatch'){
        this.$router.push({ name: view, params: { id: this.$route.params.id }})
      }
    },

    playerVars(time: string) {
      const convertedTime = this.convertTime(time)
      const playerVars = {
        playsinline: 1,
        autoplay: 1,
        loop: 1,
        start: convertedTime,
        end: convertedTime + 3,
      }
      return playerVars
    },

    convertTime(time: string) {
      const timeArray = time.split(':')
      return Number(timeArray[0]) * 60 + Number(timeArray[1])
    },

    ready(id: string) {
      const youtubePlayer: any = this.$refs[id]
      youtubePlayer[0].player.mute()
      youtubePlayer[0].player.playVideo()
      // youtubePlayer[0].player.paused()
    },

    changeParams (id: string) {
      this.channels = []
      this.existsCosme = false
      this.sameBrandProduct = []
      this.sameCategoryProduct = []
      this.playerId = []
      this.onAuthStateChanged()
      this.fetchVideos(id)
      this.fetchProduct(id)
      window.scrollTo({
        top: 0
      })
    },

    setPlayCountAtCramel(videoid: string) {
      const increment = firebase.firestore.FieldValue.increment(1)
      const docRefProducts = DB.collection('products').doc(String(this.product.id))
      const docRefVideoUnique = DB.collection('videoUnique').doc(videoid)
      docRefProducts
      .set({
        viwesAtCramel: increment
      },
      { 
        merge: true
      })

      docRefVideoUnique
      .set({
        viwesAtCramel: increment
      },
      { 
        merge: true
      })
    }
  }
})
</script>

<style scoped>
.border {
  border-bottom: 8px solid #f5f5f5;
}
.heading{
  padding: 1rem 2rem;
  border-left: 2px solid #19C0C9;
}
.ellipsis{
  overflow: hidden;
  white-space: nowrap;
  width: 120px;
  text-overflow: ellipsis;
}
.border {
  border-bottom: 8px solid #f5f5f5;
}
.text-border {
  border-bottom: 1px solid #000000;
}
</style>