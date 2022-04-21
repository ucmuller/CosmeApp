<template>
  <v-container class="pt-0 mt-16 px-0">
    <v-row>
      <v-col
        cols="12"
        class="px-3 mt-10"
      >
        <div class="py-2 px-3">
          <div class="py-2 px-3 heading">
            <div class="text-h7 font-weight-bold">新着コスメ動画</div>
          </div>
        </div>
        <div
          class="my-5"
          v-for="(video, i) in videos"
          :key="i"
        >
          <div>
            <v-icon
              v-if="i < 5"
              large
              color="red"
            >
              mdi-new-box
            </v-icon>
            {{publishedAt(video.publishedAt).toLocaleString()}}
          </div>
          <v-img
            :src="video.thumbnails"
            :lazy-src="require('@/assets/images/grey.jpeg')"
            :aspect-ratio="16/9"
            @click="pushToVideoPage(video.id)"
          >
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="#19C0C9"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-list class="pa-0">
            <v-list-item three-line class="pa-0">
              <v-list-item-content class="px-2">
                <v-row align="center">
                  <v-col
                  cols="2"
                  class="pa-0 pl-3 mx-0 text-center"
                  >
                    <v-avatar
                    size="40"
                    left
                    @click="pushToChannelPage(video.channelId)"
                  >
                    <v-img
                      :src="video.channelThumbnail"
                    >
                    </v-img>
                  </v-avatar>
                  </v-col>
                  <v-col cols="10" class="px-2 mx-0 py-0">
                    <p class="my-0 text-subtitle-2">
                      {{video.title}}
                    </p>
                    <v-list-item-subtitle>
                      {{video.channelName}}
                    </v-list-item-subtitle>
                  </v-col>
                  <v-col
                    cols="2"
                    class="pa-0 mx-0 text-center"
                  >
                  </v-col>
                  <v-col
                    cols="10"
                    class="px-2 mx-0 py-0"
                  >
                    <v-list-item-subtitle>
                      <v-icon small>
                        mdi-eye
                      </v-icon>
                      {{video.viewCount.toLocaleString()}}回視聴
                      <v-icon small>
                        mdi-thumb-up
                      </v-icon>
                      {{video.likeCount.toLocaleString()}}
                    </v-list-item-subtitle>
                    <div
                      class="pt-0"
                    >
                      <v-chip
                        v-for="(tag, j) in video.tags"
                        :key="j"
                        class="mr-1 mt-1"
                        small
                        @click="pushToSortedVideoListlPage(tag)"
                      >
                        {{tag}}
                      </v-chip>
                    </div>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <p class="px-2 mt-3 mb-0 text-h7 font-weight-bold">
              動画内で使用されているコスメ
            </p>
            <p class="px-2 mb-2 caption">
              時間ボタンをタップすると、その商品のレビューをしている時間から動画が再生されます。
            </p>
            <v-row justfy="center" class="px-2">
              <v-col
                cols="3"
                v-for="(product, j) in products[i]"
                :key="j"
                class="pb-0 mt-0 text-center"
              >
                <div @click="pushToProductPage(product.productId)">
                  <div class="pt-0 mb-0 text-small font-weight-bold text-center text-truncate text-border">
                    {{product.categoryName}}
                  </div>
                  <p class="pt-1 pb-0 mb-0 text-small text-truncate">
                    {{product.brand}}
                  </p>
                  <p
                    v-if="!product.modelNumber ==''"
                    class="pt-0 pb-0 mb-0 text-small text-truncate"
                  >
                    {{product.modelNumber}}
                  </p>
                  <p
                    v-if="product.modelNumber ==''"
                    class="pt-4 pb-0 mb-0 text-small text-truncate"
                  >
                  </p>
                  <v-img
                    class="mb-2 mt-0"
                    :lazy-src="require('@/assets/images/grey.jpeg')"
                    :src="product.productImageUrl"
                    height="80"
                    contain
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          size="10"
                          width="1"
                          color="#19C0C9"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                  <v-dialog
                    v-model="videoModalId[`${product.productId}${i}`]"
                    width="500"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="#19C0C9"
                        dark
                        line
                        small
                        v-bind="attrs"
                        v-on="on"
                        @click="openVideoModal(product.time)"
                      >
                        <v-icon
                          left
                        >
                          mdi-play
                        </v-icon>
                        視聴
                      </v-btn>
                    </template>
                    <v-card>
                      <v-row>
                        <v-col
                          cols="12"
                          class="px-0 mt-0 pb-0"
                        >
                          <div class="box-border py-0">
                            <div class="iframe-responsive">
                              <youtube
                                class="iframe-responsive-youtube"
                                :video-id="product.videoId"
                                :player-vars="playerVars"
                                :ref="`youtube_${product.id}`"
                                @ready="ready(`youtube_${product.id}`)"
                                @ended="ended"
                              >
                              </youtube>
                            </div>
                          </div>
                        </v-col>
                      </v-row>

                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="#19C0C9"
                          text
                          @click="closeVideoModal(`${product.productId}${i}`, `youtube_${product.id}`)"
                        >
                          閉じる
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
              </v-col>
            </v-row>
            <v-col class="pt-2 pb-2 px-0 text-end">
              <v-btn
                class="mt-0 font-weight-bold border-bottom"
                text
                color="#19C0C9"
                small
                @click="pushToVideoPage(video.id)"
              >
                <span class="under-line">
                  この動画内のコスメをもっとみる
                </span>
              </v-btn>
            </v-col>
            <v-divider></v-divider>
            <div class="border mx-0 px-0"></div>
          </v-list>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
// import CarouselImage from '@/components/CarouselImage.vue'
import store from '@/store'
import { DB } from '@/firebase/db'
import firebase from 'firebase'

export default Vue.extend({
  name: 'VideoList',

  data: () => ({
    videos: [] as any,
    channel: [] as any,
    products: [] as any,
    videoModalId: {} as any,
    playerVars: {
      playsinline: 1,
      autoplay: 1,
      start: 0
    }
  }),

  created: function() {
    this.fetchVideos()
  },


  methods: {
    fetchVideos (): void {
      const videoArray = [] as any
      const arr = [] as any
      DB.collection('videoUnique')
      .orderBy('publishedAt', 'desc')
      .limit(30)
      .get()
      .then(querySnapShot => {
        querySnapShot.forEach(doc => {
          videoArray.push(doc.data())
        })
      })
      .then(() => {
        this.videos = videoArray
        videoArray.forEach((e: any) => {
          this.fetchProductData(e.id)
          this.existsLogOfPWALaunch()
        })
      })
    },

    fetchProductData(id: string): any {
      const productArray = [] as any
      DB.collection('videos')
      .where('videoId','==', id)
      .limit(4)
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach(doc =>{
          productArray.push(doc.data())
        })
        this.products.push(productArray)
      })
    },

    publishedAt(datetime: Date) {
      const from = new Date(datetime);
      const diff = new Date().getTime() - from.getTime();
      const elapsed = new Date(diff);

      if (elapsed.getUTCFullYear() - 1970) {
        return elapsed.getUTCFullYear() - 1970 + '年前';
      } else if (elapsed.getUTCMonth()) {
        return elapsed.getUTCMonth() + 'ヶ月前';
      } else if (elapsed.getUTCDate() - 1) {
        return elapsed.getUTCDate() - 1 + '日前';
      } else if (elapsed.getUTCHours()) {
        return elapsed.getUTCHours() + '時間前';
      } else if (elapsed.getUTCMinutes()) {
        return elapsed.getUTCMinutes() + '分前';
      } else {
        return elapsed.getUTCSeconds() + 'たった今';
      }
    },

    closeVideoModal (index: number, youtube: any) {
      const youtubePlayer: any = this.$refs[youtube]
      youtubePlayer[0].player.stopVideo()
      if (!this.videoModalId[index]) {
        this.$set(this.videoModalId, index, true)
      } else {
        this.videoModalId[index] = !this.videoModalId[index]
      }
    },

    convertTime(time: string) {
      const timeArray = time.split(':')
      return Number(timeArray[0]) * 60 + Number(timeArray[1])
    },

    openVideoModal (time: string) {
      this.playerVars.start = this.convertTime(time)
      this.$ga.event('openVideoModalAtVideoList', 'push')
    },

    ready(youtube: string) {
      const youtubePlayer: any = this.$refs[youtube]
      youtubePlayer[0].player.mute()
      youtubePlayer[0].player.playVideo()
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
    },
 
    openWindow (url: string) {
      window.open(url, '_blank', 'width=1024,height=768,scrollbars=yes,resizable=yes')
    },

    pushToProductPage(v: number): void {
      this.$router.push({ name: 'Product', params: { id: v.toString() }})
    },

    pushToVideoPage(v: number): void {
      this.$router.push({ name: 'VideoProduct', params: { id: v.toString() }})
    },

    pushToSortedVideoListlPage(v: string): void {
      this.$router.push({ name: 'SortedVideoList', params: { id: v }})
    },
  }
})
</script>

<style scoped>
.iframe-responsive {
  width:100%;
  padding-bottom: 56.25%;
  height:0px;
  position: relative;
}
.iframe-responsive-youtube {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
/* .iframe-responsive {
  position: relative;
  width: 100%;
  margin: 0 auto;
  height: 0;
  padding-bottom: 56.25%;
  overflow: hidden;
  background: #aaa;
}

.iframe-responsive iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
} */

.box-border{
  border: 1px solid #19C0C9;
}
.heading{
  padding: 1rem 2rem;
  border-left: 2px solid #19C0C9;
}
.border {
  border-bottom: 8px solid #f5f5f5;
}
.grey-title{
  color: #616161;
}
.text-small{
  font-size: 9px;
}
.text-border {
  border-bottom: 1px solid #000000;
}
.under-line {
  text-decoration: underline;
}
</style>