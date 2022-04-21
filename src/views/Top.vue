<template>
  <v-container class="pt-0 mt-16 px-0 pb-12">
    <CarouselImage/>
    <v-row
      class="px-3"
    >
      <v-col
        cols="12"
        class="px-3 mt-5 text-center"
      >
        <div class="py-2 px-3">
          <div class="py-2">
            <div class="text-h6 font-weight-bold">コスメを探す</div>
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        class="pl-2 py-0 pb-5 text-center"
      >
        <v-sheet
          class="mx-auto"
        >
          <v-slide-group>
            <v-slide-item
              v-for="(item, i) in categories"
              :key="i"
            >
              <v-row
                class="fill-height"
                align="center"
                justify="center"
              >
                <v-scale-transition>
                  <div
                    class="mx-0 icon"
                    @click="pushToSortedProductPage(item.value)"
                  >
                    <v-avatar
                      class="mb-3"
                      size="50"
                      color="#fafafa"
                    >
                      <v-img
                        :src="item.image"
                        contain
                      ></v-img>
                    </v-avatar>
                    <p
                      class="mb-0 text-caption"
                    >
                    {{item.label}}
                    </p>
                  </div>
                </v-scale-transition>
              </v-row>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </v-col>
      <v-col
        cols="12"
        class="px-4 text-center"
      >
        <v-btn
          class="pa-2 font-weight-bold"
          outlined
          block
          height="50"
          color="#19C0C9"
          @click="pushToOtherPage('Category')"
        >
          カテゴリ一覧へ
        </v-btn>
      </v-col>
    </v-row>

    <v-row
      class="px-3"
    >
      <v-col
        cols="12"
        class="px-3 mt-5 text-center"
      >
        <div class="py-2 px-3">
          <div class="py-2">
            <div class="text-h6 font-weight-bold">特集</div>
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        class="pa-0 px-1 text-center"
      >
        <v-card
          class="mx-0 mb-3"
          @click="pushToPersonalcolorAnalysis()"
        >
          <v-img
            :src="personalColormage"
            :aspect-ratio="16/9"
          ></v-img>
        </v-card>
      </v-col>
      <v-col
        cols="6"
        class="pa-0 px-1 pb-1"
        v-for="(item, i) in feature"
        :key="i"
      >
        <v-card
          class="mx-0 mb-2"
          @click="pushToFeatureProduct(item.tag)"
        >
          <v-img
            :src="item.image"
            :aspect-ratio="16/9"
          ></v-img>
        </v-card>
      </v-col>
    </v-row>

    <v-row
      class="px-3"
    >
      <v-col
        cols="12"
        class="px-3 mt-5 text-center"
      >
        <div class="py-2 px-3">
          <div class="py-2">
            <div class="text-h6 font-weight-bold">人気コスメランキング</div>
          </div>
        </div>
      </v-col>
      <v-col
        cols="4"
        v-for="(product, i) in products"
        :key="i"
        class="pb-5 mt-0 px-5"
      >
        <div @click="pushToProductPage(product.id)">
          <div class="pt-0 mb-3 text-caption font-weight-bold text-center text-truncate text-border">
            {{product.categoryName}}
          </div>
          <v-img
            :src='product.imageUrl'
            height="100"
            contain
          >
          </v-img>
          <div class="pt-3 ellipsis text-caption text-truncate">
            {{product.brand}}
          </div>
          <div class="pt-0 ellipsis text-caption text-truncate">
            {{product.modelNumber}}
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        class="px-4 text-center"
      >
        <v-btn
          class="pa-2 font-weight-bold"
          outlined
          block
          height="50"
          color="#19C0C9"
          @click="pushToOtherPage('AllProductList')"
        >
          もっと見る
        </v-btn>
      </v-col>
    </v-row>
    <v-row
      class="px-3"
    >
      <v-col
        cols="12"
        class="px-3 mt-5 text-center"
      >
        <div class="py-2 px-3">
          <div class="py-2">
            <div class="text-h6 font-weight-bold">愛用者の多いブランド</div>
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        class="pl-5 pb-5 py-0 text-center"
      >
        <v-sheet
          class="mx-auto"
        >
          <v-slide-group
            multiple
          >
            <v-slide-item
              v-for="(item, i) in brands"
              :key="i"
            >
              <v-card
                class="ma-2"
                width="150"
                @click="pushToBrandProductPage(item.id)"
              >
                <v-img
                  :src="item.imageUrl"
                  height="100"
                  contain
                ></v-img>
                <div class="pt-3 ellipsis text-caption text-truncate font-weight-bold">
                  {{item.brandName}}
                </div>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </v-col>
      <v-col
        cols="12"
        class="px-4 text-center"
      >
        <v-btn
          class="pa-2 font-weight-bold"
          outlined
          block
          height="50"
          color="#19C0C9"
          @click="pushToOtherPage('BrandList')"
        >
          ブランド一覧へ
        </v-btn>
      </v-col>
    </v-row>
    <v-row
      class="px-3"
    >
      <v-col
        cols="12"
        class="px-3 mt-5 text-center"
      >
        <div class="py-2 px-3">
          <div class="py-2">
            <div class="text-h6 font-weight-bold">人気上昇中のYouTuber</div>
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        class="pl-2 py-0 pb-5 text-center"
      >
        <v-sheet
          class="mx-auto"
        >
          <v-slide-group
            multiple
          >
            <v-slide-item
              v-for="(item, i) in channels"
              :key="i"
            >
              <v-row
                class="fill-height"
                align="center"
                justify="center"
              >
                <v-scale-transition>
                  <div
                    class="px-4 icon"
                    width='20'
                    @click="pushToChannelPage(item.id)"
                  >
                    <v-avatar
                      class="mb-3"
                      size="55"
                      color="#fafafa"
                    >
                      <v-img
                        :src="item.thumbnail"
                        contain
                      ></v-img>
                    </v-avatar>
                    <p
                      class="mb-0 text-caption text-truncate"
                    >
                    {{item.name}}
                    </p>
                  </div>
                </v-scale-transition>
              </v-row>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </v-col>
      <v-col
        cols="6"
        class="pa-0 px-1 pb-1"
        v-for="(item, i) in topChannels"
        :key="i"
      >
        <v-card
          class="mx-0 mb-2"
          @click="pushToVideoPage(item.id)"
        >
          <v-img
            :src="item.thumbnails"
            :aspect-ratio="16/9"
          ></v-img>
          <div class="pt-1 ellipsis text-caption text-truncate">
            {{item.title}}
          </div>
          <div class="pt-0 ellipsis text-caption text-truncate">
            {{item.channelName}}
          </div>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        class="px-4 text-center"
      >
        <v-btn
          class="pa-2 font-weight-bold"
          style="text-transform: none"
          outlined
          block
          height="50"
          color="#19C0C9"
          @click="pushToOtherPage('ChannelList')"
        >
          YouTuber一覧へ
        </v-btn>
      </v-col>
    </v-row>
    <v-row
      class="px-3"
    >
      <v-col
        cols="12"
        class="px-3 mt-5 text-center"
      >
        <div class="py-2 px-3">
          <div class="py-2">
            <div class="text-h6 font-weight-bold">新着動画</div>
          </div>
        </div>
      </v-col>
      <v-col
        cols="6"
        class="pa-0 px-1 pb-1"
        v-for="(item, i) in videos"
        :key="i"
      >
        <v-card
          class="mx-0 mb-2"
          @click="pushToVideoPage(item.id)"
        >
          <div class="text-small">
            <v-icon
              v-if="i < 3"
              small
              color="red"
            >
              mdi-new-box
            </v-icon>
            {{publishedAt(item.publishedAt).toLocaleString()}}
          </div>
          <v-img
            :src="item.thumbnails"
            :aspect-ratio="16/9"
          ></v-img>
          <div class="pt-1 ellipsis text-caption text-truncate">
            {{item.title}}
          </div>
          <div class="pt-0 ellipsis text-caption text-truncate">
            {{item.channelName}}
          </div>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        class="px-4 text-center"
      >
        <v-btn
          class="pa-2 font-weight-bold"
          outlined
          block
          height="50"
          color="#19C0C9"
          @click="pushToOtherPage('VideoList')"
        >
          もっと見る
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import CarouselImage from '@/components/CarouselImage.vue'
import store from '@/store'
import { DB } from '@/firebase/db'
import firebase from 'firebase'

export default Vue.extend({
  name: 'Top',

  components: {
    CarouselImage
  },

  data: () => ({
    topBannerImage: require('@/assets/images/featureCosme.001.jpeg'),
    personalColormage: require('@/assets/images/personalColorImage.jpeg'),
    videos: [] as any,
    channels: [] as any,
    topChannels: [] as any,
    brands: [] as any,
    products: [] as any,
    videoModalId: {} as any,
    playerVars: {
      playsinline: 1,
      autoplay: 1,
      start: 0
    },
    feature: [
      // {
      //   tag: '韓国コスメ',
      //   image: require('@/assets/images/featureCosme.002.jpeg')
      // },
      {
        tag: 'オレンジメイク',
        image: require('@/assets/images/featureCosme.003.jpeg')
      },
      // {
      //   tag: 'デパコス',
      //   image: require('@/assets/images/featureCosme.004.jpeg')
      // },
      {
        tag: 'プチプラ',
        image: require('@/assets/images/featureCosme.005.jpeg')
      },
      {
        tag: 'ベスコス',
        image: require('@/assets/images/featureCosme.006.jpeg')
      },
      {
        tag: '敏感肌',
        image: require('@/assets/images/featureCosme.007.jpeg')
      }
    ],
    categories: [
      {
        label: 'スキンケア',
        value: 'skincare',
        image: require('@/assets/images/cosme/foundationPrimer.png')
      },
      {
        label: '日焼け止め',
        value: 'sunscreenFace',
        image: require('@/assets/images/cosme/sunscreenFace.png')
      },
      {
        label: 'コンシーラー',
        value: 'concealer',
        image: require('@/assets/images/cosme/concealer.png')
      },
      {
        label: 'ファンデ',
        value: 'foundation',
        image: require('@/assets/images/cosme/foundation.png')
      },
      {
        label: 'チーク',
        value: 'blush',
        image: require('@/assets/images/cosme/blush.png')
      },
      {
        label: 'アイシャドウ',
        value: 'eyeshadow',
        image: require('@/assets/images/cosme/eyeshadow.png')
      },
      {
        label: 'マスカラ',
        value: 'mascara',
        image: require('@/assets/images/cosme/mascara.png')
      },
      {
        label: 'アイライナー',
        value: 'eyeliner',
        image: require('@/assets/images/cosme/eyeliner.png')
      },
      {
        label: 'アイブロウ',
        value: 'eyebrow',
        image: require('@/assets/images/cosme/eyebrow.png')
      },
      {
        label: 'リップグロス',
        value: 'lipGloss',
        image: require('@/assets/images/cosme/lipGloss.png')
      },
      {
        label: 'リップ',
        value: 'lipstick',
        image: require('@/assets/images/cosme/lipstick.png')
      },
      {
        label: 'ブラシ',
        value: 'brushes',
        image: require('@/assets/images/cosme/brushes.png')
      },
      {
        label: 'マニキュア',
        value: 'nailPolish',
        image: require('@/assets/images/cosme/nailPolish.png')
      },
      {
        label: '美容グッズ',
        value: 'otherGoods',
        image: require('@/assets/images/cosme/eyelashCurler.png')
      }
    ]
  }),

  created: function() {
    // if(window.matchMedia('(display-mode: standalone)').matches){
    // }
    this.fetchProductData()
    this.fetchVideos()
    this.fetchBrandData()
    this.fetchChannelData()
    // window.scrollTo({
    //   top: 0
    // })
  },

  methods: {
    fetchVideos (): void {
      DB.collection('videoUnique')
      .orderBy('publishedAt', 'desc')
      .limit(6)
      .get()
      .then(querySnapShot => {
        querySnapShot.forEach(doc => {
          this.videos.push(doc.data())
        })
      })
    },

    fetchProductData(): void {
      const productArray = [] as any
      DB.collection('products')
      .orderBy('times', 'desc')
      .limit(9)
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach(doc =>{
          this.products.push(doc.data())
        })
        // this.products = productArray
      })
    },

    fetchBrandData(): void {
      const productArray = [] as any
      DB.collection('brands')
      .orderBy('times', 'desc')
      .limit(100)
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach(doc =>{
          this.brands.push(doc.data())
        })
        // this.products = productArray
      })
    },

    fetchChannelData(): void {
      const productArray = [] as any
      DB.collection('channels')
      .orderBy('subscriberCount', 'desc')
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach(doc =>{
          this.channels.push(doc.data())
        })
        // this.products = productArray
      })
      .then(() => {
        const topChannels = this.channels.slice(0, 6)
        topChannels.forEach((e: any) => {
          DB.collection('videoUnique')
          .where('channelId', '==', e.id)
          .orderBy('publishedAt', 'desc')
          .limit(1)
          .get()
          .then((querySnapShot) => {
            querySnapShot.forEach(doc =>{
              this.topChannels.push(doc.data())
            })
          })
        })
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

    pushToSortedChannelList(tag: string) {
      this.$router.push({
        name: 'SortedChannelList',
        params: {
          tag: tag
        }
      })
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

    pushToPersonalcolorAnalysis() {
      this.$router.push({ name: 'PersonalColorAnalysis'})
    },

    pushToChannelPage(v: number): void {
      this.$router.push({ name: 'YoutubersProduct', params: { id: v.toString() }})
    },

    pushToProductPage(v: number): void {
      this.$router.push({ name: 'Product', params: { id: v.toString() }})
    },

    pushToSortedProductPage(v: string): void {
      this.$router.push({ name: 'SortedProductList', params: { id: v }})
    },

    pushToFeatureProduct(v: string): void {
      this.$router.push({ name: 'FeatureProduct', params: { id: v }})
    },

    pushToVideoPage(v: number): void {
      this.$router.push({ name: 'VideoProduct', params: { id: v.toString() }})
    },

    pushToBrandProductPage(v: number): void {
      this.$router.push({ name: 'BrandProduct', params: { id: v.toString() }})
    },

    pushToOtherPage(name: string): void {
      this.$router.push({ name: name })
    }
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
.icon {
  width: 100px;
}
</style>