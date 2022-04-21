<template>
  <v-container
    class="mt-10"
  >
    <v-row
      v-if="products.length == 0"
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
     v-if="products.length != 0"
    >
      <v-col
        cols="12"
        class="px-0 mt-13 pb-0 youtube-frame"
        v-if="!isDisplay"
      >
      </v-col>
      <v-col
        cols="12"
        class="px-0 mt-10 py-0"
      >
        <YoutubePlayer
        v-if="isReady"
          :handle-videos="video"
          :handle-time="time"
          :handle-fixed="isFixed"
          :handle-productid="currentProduct"
        />
        <v-list class="pa-0">
          <v-list-item three-line class="pa-0">
            <v-list-item-content class="px-2 my-0">
              <v-row align="center">
                <v-col
                  cols="2"
                  class="pa-0 mx-0 text-center"
                >
                  <v-avatar
                  size="40"
                  left
                  @click="pushToChannelPage(currentVideo.channelId)"
                >
                  <v-img
                    :src="currentVideo.channelThumbnail"
                  >
                  </v-img>
                </v-avatar>
                </v-col>
                <v-col cols="10" class="px-0 mx-0 py-0">
                  <p class="my-0 text-subtitle-2">
                    {{currentVideo.title}}
                  </p>
                  <v-list-item-subtitle>
                    {{currentVideo.channelName}}
                  </v-list-item-subtitle>
                </v-col>
                <v-col
                  cols="2"
                  class="pa-0 mx-0 text-center"
                >
                </v-col>
                <v-col
                  cols="10"
                  class="px-0 mx-0 py-0"
                >
                  <v-list-item-subtitle>
                    {{currentVideo.viewCount.toLocaleString()}}回視聴・{{publishedAt(currentVideo.publishedAt).toLocaleString()}}
                    <v-icon small>
                      mdi-thumb-up
                    </v-icon>
                    {{currentVideo.likeCount.toLocaleString()}}
                  </v-list-item-subtitle>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
          <div class="border mx-0 px-0"></div>
        </v-list>
      </v-col>
    </v-row>
    <v-row class="px-0 mt-0 mb-5 pt-0 border">
      <v-col
        cols="12"
        class="mt-0"
      >
        <div class="pa-0 mt-0">
          <div class="py-0 my-2 px-3 heading text-h7 font-weight-bold">
            動画内で使用されているコスメ一覧
          </div>
        </div>
      </v-col>
      <v-col
        class="pb-6 mt-0 text-center"
        cols="4"
        v-for="(product, i) in products"
        :key="i"
      >
        <div
         @click="changeVideoAtProductList(product, currentVideo)"
         :class="product.class"
        >
          <div class="pt-0 mb-0 text-caption font-weight-bold text-center text-truncate text-border">
            {{product.categoryName}}
          </div>
          <div class="pt-0 text-truncate text-caption">
            {{product.brand}}
          </div>
          <div
            v-if="product.modelNumber != ''"
            class="pt-0 text-truncate text-caption"
          >
            {{product.modelNumber}}
          </div>
          <div
            v-if="product.modelNumber == ''"
            class="pt-0 text-truncate text-caption"
          >
            -
          </div>
          <v-img
            :src='product.productImageUrl'
            height="100"
            contain
          >
          </v-img>
        </div>
        <v-btn
          depressed
          outlined
          small
          class="font-weight-bold my-1"
          color="#E2526E"
          @click="pushToProductPage(product.productId)"
        >
          商品詳細
        </v-btn>
      </v-col>
    </v-row>

    <v-row
      v-if="comments.length != 0"
     class="px-0 mt-0 mb-5 pt-0 border"
    >
      <v-col
        cols="12"
        class="mb-0 pb-0 pt-0"
      >
        <div class="py-0 my-2 px-3 heading text-h7 font-weight-bold">
          「{{currentProductName}}」のレビュー
        </div>
        <div
          class="pb-5 pt-0 px-1"
        >
          <v-list
            three-line
            class="pt-0"
          >
            <template v-for="(item, k) in comments">
              <v-list-item
                :key='"first-"+k'
                class="px-0 py-2"
                :class="item.class"
              >
              <div>
                <v-list-item-avatar
                  class="card-icon ma-0 mr-2"
                  tile
                  width="90"
                  height="50"
                  @click="changeVideo(item)"
                >
                  <v-img :src="item.videoThumbnail"></v-img>
                    <p>
                      <v-icon
                        color="white"
                      >
                        mdi-play-circle-outline
                      </v-icon>
                    </p>
                </v-list-item-avatar>
                <div class="text-caption">
                  <v-icon
                    x-small
                  >
                    mdi-heart
                  </v-icon>
                  {{(item.goodCountAtCramel + item.initialgoodCountAtCramel).toLocaleString()}}
                </div>
                </div>
                <v-list-item-content
                  class="py-0"
                >
                  <v-row
                   align="center"
                  >
                    <v-col
                      cols="3"
                      class="pa-0 text-center"
                    >
                      <v-avatar
                        size="30"
                        @click="pushToYoutubersProduct(item.channelId)"
                      >
                      <v-img :src="item.thumbnail"></v-img>
                      </v-avatar>
                    </v-col>
                    <v-col
                      cols="9"
                      class="pa-0"
                    >
                      <a
                        class="text-caption font-weight-bold text-decoration-underline link"
                        @click="pushToYoutubersProduct(item.channelId)"
                      >
                        {{item.channelName}}
                      </a>
                    </v-col>
                  </v-row>
                  <v-list-item-title
                    class="text-subtitle-2"
                    @click="changeVideo(item)"
                    v-if="item.modelNumber != ''"
                  >
                    <span class="model-number text-subtitle-2">{{item.modelNumber}}
                    </span>を使用
                  </v-list-item-title>
                  <p
                    v-if="!isShow[item.id]"
                    class="text-caption ma-0"
                  >
                    {{truncate(item.comment, 30)}}
                    <span
                      class="text-caption ma-0 text--secondary"
                      @click="changeVideo(item)"
                    >
                      続きを見る
                    </span>
                  </p>
                  <p
                    v-if="isShow[item.id]"
                    class="mb-0 text-caption"
                  >
                    {{item.comment}}
                  </p>
                </v-list-item-content>
              </v-list-item>
              <v-divider
                :key='"second-"+k'
              >
              </v-divider>
            </template>
          </v-list>
        </div>
      </v-col>
    </v-row>
    
    <v-row class="px-0 mt-0 mb-5 pt-0 border">
      <v-col
        cols="12"
        class="mt-0"
      >
        <div class="pa-0 mt-0">
          <div class="py-0 my-2 px-3 heading text-h7 font-weight-bold">
            おすすめ動画
          </div>
        </div>
      </v-col>
      <SuggestVideoList
        :handle-videos="videoUniques"
        @parentMethod="changeParams"
      />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { DB } from '@/firebase/db'
import axios from 'axios'
import SuggestVideoList from '@/components/SuggestVideoList.vue'
import YoutubePlayer from '@/components/YoutubePlayer.vue'

export default Vue.extend({
  name: 'VideoProduct',

  components: {
    SuggestVideoList,
    YoutubePlayer
  },

  data: () => ({
    video: {} as any,
    currentVideo: {} as any,
    videoUniques: [] as any,
    products: [] as any,
    comments: [] as any,
    currentProduct: {} as any,
    time: "0:00",
    videoModalId: {} as any,
    isFixed: false,
    isDisplay: true,
    isReady: true,
    isShow: {} as any,
    currentProductName: ''
  }),

  created: function() {
    this.fetchVideoData(this.$route.params.id)
    this.fetchProductData(this.$route.params.id)
    window.scrollTo({
      top: 0
    })
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },

  watch: {
    $route (to, from) {
      this.initialize()
      this.fetchVideoData(to.params.id)
      this.fetchProductData(to.params.id)
      window.scrollTo({
        top: 0
      })
    }
  },

  methods: {
    initialize(){
      this.video = {}
      this.currentVideo = {}
      this.videoUniques = []
      this.products = []
      this.videoModalId = {}
    },

    handleScroll() {
      if(window.scrollY>70){
        this.isFixed = true
        this.isDisplay = false
      } else {
        this.isFixed = false
        this.isDisplay = true
      }
    },
    
    fetchVideoData(id: string) {
      DB.collection('videoUnique')
      .doc(id)
      .get()
      .then((doc) => {
        this.video = doc.data()
        this.currentVideo = doc.data()
      })
      .then(() => {
        this.fetchVideoUnique(this.video.personalColorSeason, this.video.id)
      })
    },
    
    fetchProductData(id: string): any {
      DB.collection('videos')
      .where('videoId','==', id)
      .orderBy('sortId', 'asc')
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach(doc =>{
          this.products.push(doc.data())
        })
      })
      .then(() => {
        this.currentProduct = this.products[0]
      })
    },

    fetchComments (product: any): void {
      const videoArray = [] as any
      const commentArray = [] as any
      const arr = [] as any
      DB.collection('videos')
      .where('productId', '==', product.productId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          videoArray.push(doc.data())
          commentArray.push(doc.data())
        })
      })
      .then(() => {
        const sortCommentLength = commentArray.sort((a: any, b: any) => {
            if (a.comment.length < b.comment.length) {
              return -1
            } else {
              return 1
            }
          })
        this.comments = sortCommentLength.sort((a: any, b: any) => {
          if ((b.videoId === this.currentVideo.id)) {
            return 1
          } else {
            return -1
          }
        })
      })
      .then(() => {
        this.toggleShowPost(this.currentVideo.id, this.comments[0].id)
      }) 
      
    },

    changeVideoAtProductList(product: any, video: any) {
      const currentVideo = video
      this.currentProductName = product.productName
      this.isReady = false
      this.fetchComments(product)
      this.time = product.time
      this.currentProduct = product
      this.products.forEach((e: any) => {
        if (e.id == product.id) {
          e['class'] = 'highlight'
        }
        if (e.id != product.id) {
          e['class'] = ''
        }
      })
      
      setTimeout(() => {
        this.video = currentVideo
        this.isReady = true
      }, 10)
    },

    changeVideo(video: any) {
      const videoId = video.videoId
      this.toggleShowPost(videoId, video.id)
      DB.collection('videoUnique')
      .doc(videoId)
      .get()
      .then((doc) => {
        this.video = doc.data()
        this.time = video.time
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

    convertTime(time: string) {
      const timeArray = time.split(':')
      return Number(timeArray[0]) * 60 + Number(timeArray[1])
    },

    truncate(str: string, len: number){
      return str.length <= len ? str: (str.substr(0, len)+"...");
    },

    fetchVideoUnique (personalColorSeason: string, videoId: string): void {
      const videoUniqueArray = [] as any
      DB.collection('videoUnique')
      .orderBy('publishedAt', 'desc')
      .limit(50)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if(videoId != doc.id){
            videoUniqueArray.push(doc.data())
          }
        })
        this.videoUniques = this.shuffleFisherYates(videoUniqueArray)
      })
    },

    shuffleFisherYates(arr: any[]): any[] {
      const newArray = arr
      for(let i = newArray.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = newArray[i];
        newArray[i] = newArray[j];
        newArray[j] = tmp;
      }
      return newArray
    },

    toggleShowPost(videoId: string, id: number){
      this.$ga.event('pushReview', 'push')
      this.$set(this.isShow, id, true)
      this.comments.forEach((e: any) => {
        if (e.videoId == videoId) {
          e['class'] = 'highlight'
        }
        if (e.videoId != videoId) {
          e['class'] = ''
        }
      })
    },

    ready(youtube: string) {
      const youtubePlayer: any = this.$refs[youtube]
      youtubePlayer[0].player.mute()
      youtubePlayer[0].player.playVideo()
    },

    changeParams() {
      this.comments = []
    },

    routerPush(v: number) {
      this.$router.push({ name: 'Product', params: { id: v.toString() }})
    },

    openWindow (url: string) {
      window.open(url, '_blank', 'width=1024,height=768,scrollbars=yes,resizable=yes')
    },

    pushToProductPage(v: number): void {
      this.$router.push({ name: 'Product', params: { id: v.toString() }})
    },

    pushToVideoPage(v: number): void {
      this.$router.push({ name: 'VideoProduct', params: { id: v.toString() }})
    }
  }
})
</script>

<style scoped>
.border {
  border-bottom: 8px solid #f5f5f5;
}
.youtube-frame{
  width: 100%;
  padding-top: 40%;
}
.heading{
  border-left: 4px solid #E2526E;
}
.link {
  color: #E2526E;
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
.highlight{
  background-color: #e7e7e7;
}
.card-icon {
  position: relative;
}

.card-icon p {
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%,-50%);
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  margin:0;
  padding:0;
  /*文字の装飾は省略*/
}

.v-list-item{
  align-items: end;
}
/* .iframe-responsive {
  width:100%;
  padding-bottom: 56.25%;
  height:0px;
  position: relative;
}
.iframe-responsive iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
} */
</style>