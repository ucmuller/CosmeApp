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
    >
      <v-col
        cols="12"
        class="px-0 mt-14 pb-0"
      >
        <v-card
          class="mx-auto"
          tile
          flat
        >
          <v-img
            height="100px"
            :src="channelInfo.bannerExternalUrl"
            v-if="channelInfo.bannerExternalUrl"
          >
          </v-img>
          <v-row
            class="fill-height"
            align="center"
          >
            <v-col
              class="pl-5 text-center"
              cols="3"
            >
              <v-avatar
                class="profile"
                size="80"
              >
                <v-img :src="channelInfo.thumbnail"></v-img>
              </v-avatar>
              <v-btn
                x-small
                color="#FF0000"
                class="white--text px-2 mt-1"
                @click="openYoutube(channelInfo.id)"
              >
                <v-icon
                  small
                >
                  mdi-youtube
                </v-icon>
                YouTube
              </v-btn>
            </v-col>
            <v-col
              class="pa-0"
              cols="9"
            >
              <v-list-item
                color="rgba(0, 0, 0, .4)"
                class="my-0"
              >
                <v-list-item-content
                  class="pb-0"
                >
                  <v-list-item-title
                    class="text-h6 font-weight-bold"
                  >
                    {{channelInfo.name}}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    チャンネル登録者数:{{Number(channelInfo.subscriberCount).toLocaleString()}}人
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    総再生回数:{{Number(channelInfo.viewCount).toLocaleString()}}回
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <div
                class="pt-0 ml-3"
              >
                <v-chip
                  v-for="(tag, j) in channelInfo.tags"
                  :key="j"
                  class="mx-1"
                  small
                  @click="pushToSortedChannelList(tag)"
                >
                  {{tag}}
                </v-chip>
              </div>
            </v-col>
            <v-col
              cols="12"
              class="mt-0"
            >
              <div class="pa-0 mt-0 border">
              </div>
              <v-tabs
                :color="tabColor"
              >
                <v-tab
                  v-for="(tab, i) in tabs"
                  :key="i"
                  @click="currentTab = tab.value"
                >
                {{tab.name}}
                </v-tab>
                <v-tabs-slider :color="tabSliderColor" />
              </v-tabs>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      v-if="currentTab == 'video'"
      class="px-0 mt-0 mb-5 pt-0 border"
    >
      <v-col
        v-if="videoUniques.length"
        cols="12"
        class="pa-0 mt-0"
      >
        <carousel-3d
          class="pa-0 ma-0"
          :width="192"
          :height="208"
          :controls-visible="true"
          :clickable="true"
          @after-slide-change="onAfterSlideChange"
        >
          <slide
            class="white"
            v-for="(video, i) in videoUniques.length"
            :key="i"
            :index="i"
          >
            <figure>
              <p class="my-0 text-caption">
                <v-icon
                  v-if="i < 2"
                  color="red"
                >
                  mdi-new-box
                </v-icon>
                {{convertTimeStamp(videoUniques[i].publishedAt)}}
              </p>
              <v-img
                :src='videoUniques[i].thumbnails'
                :aspect-ratio="16/9"
                @click="pushToVideoPage(videoUniques[i].id)"
              >
              </v-img>
              <p class="my-0 text-caption">{{videoUniques[i].title}}</p>
              <v-list-item-subtitle>
                <v-icon small>
                  mdi-eye
                </v-icon>
                {{videoUniques[i].viewCount.toLocaleString()}}回視聴
                <v-icon small>
                  mdi-thumb-up
                </v-icon>
                {{videoUniques[i].likeCount.toLocaleString()}}
              </v-list-item-subtitle>
            </figure>
          </slide>
        </carousel-3d>
      </v-col>
      <v-col
        cols="12"
        v-for="(product, i) in videoProducts"
        :key="i"
        class="pb-5 mt-3"
      >
        <div>
          <div
            class="pt-0 mb-3 font-weight-bold text-center text-border"
          >
            {{product.categoryName}}
            <span
              class="link"
              @click="pushToIndividualProductVideo(product.videoId, product.time, product.productId)"
            >
              ({{product.time}})
            </span>
          </div>
          <div
            class="pt-0 text-caption"
          >
            {{product.brand}}
          </div>
          <div
            class="pt-0 text-caption"
            v-if="product.modelNumber"
          >
            {{product.productName}}／{{product.modelNumber}}
          </div>
          <div
            class="pt-0 text-caption"
            v-if="!product.modelNumber"
          >
            {{product.productName}}
          </div>
          <v-row>
            <v-col
              cols="12"
              class="pb-5 mt-0"
              @click="pushToProduct(product.productId)"
            >
              <v-img
                :src='product.productImageUrl'
                height="100"
                contain
              >
              </v-img>
            </v-col>
            <div class="pt-0 px-3 text-caption">
              {{product.comment}}
            </div>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-row
      v-if="currentTab == 'cosme'"
      class="px-0 mt-0 mb-5 pt-0 border"
    >
      <v-col
        cols="12"
        v-for="(product, i) in products"
        :key="i"
        class="pb-5 mt-0"
      >
      <div class="pt-0 mb-3 font-weight-bold text-center text-border">
        {{categories[i]}}
      </div>
        <v-slide-group
          class="pa-1"
        >
          <v-slide-item
            v-for="(item, j) in product"
            :key="j"
          >
            <v-card
              class="ma-1 pa-1"
              width="150"
              outlined
              @click="pushToProduct(item.id)"
            >
              <v-img
                :src='item.imageUrl'
                height="100"
                contain
              >
              </v-img>
              <div class="pt-3 ellipsis text-caption">
                <v-icon
                  small
                  color="orange darken-2"
                >
                  mdi-star
                </v-icon>
                {{item.review}} ({{item.times}}動画で使用)
              </div>
              <div class="pt-0 ellipsis text-caption">
                {{item.brand}}
              </div>
              <div class="pt-0 ellipsis text-caption">
                {{item.name}}
              </div>
              <div class="pt-0 ellipsis text-caption">
                {{item.modelNumber}}
              </div>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-col>
    </v-row>
    <v-row class="px-0 mt-0 mb-5 pt-0 border">
      <v-col
        cols="12"
        class="mt-0"
      >
        <div class="pa-0 mt-0">
          <div class="py-2 px-3 heading text-h7 font-weight-bold">
            おすすめ動画
          </div>
        </div>
      </v-col>
      <SuggestVideoList
        :handle-videos="suggestedVideoUniques"
      />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { DB } from '@/firebase/db'
import SuggestVideoList from '@/components/SuggestVideoList.vue'
import { Carousel3d, Slide } from 'vue-carousel-3d'

export default Vue.extend({
  name: 'YoutubersProduct',

  components: {
    SuggestVideoList,
    Carousel3d,
    Slide
  },

  data: () => ({
    productIdArray: [] as any,
    videoUniques: [] as any,
    suggestedVideoUniques: [] as any,
    products: [] as any,
    videoProducts: [] as any,
    categories: [] as any,
    channelInfo: {} as any,
    isFetch: false,
    currentTab: 'cosme',
    tabColor: '#19C0C9',
    tabSliderColor: '#19C0C9',
    tabs: [
      {
        name: 'コスメ一覧',
        value: 'cosme'
      },
      {
        name: '動画',
        value: 'video'
      }
    ],
    playerVars: {
      playsinline: 1,
      autoplay: 0,
      start: 0
    }
  }),

  created: function() {
    this.fetchVideos()
    this.fetchChannels()
    this.fetchVideoUnique()
    this.fetchSuggestedVideoUnique(this.$route.params.id)
    window.scrollTo({
      top: 0
    })
  },

  methods: {

    fetchVideos (): void {
      const productIdArray = [] as any
      const productArray = [] as any
      DB.collection('videos')
      .where('channelId', '==', this.$route.params.id)
      .orderBy('sortId', 'asc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          productIdArray.push(doc.data().productId)
          if(doc.data().comment){
            productArray.push(doc.data())
          }
        })
        this.productIdArray = productIdArray
        // this.videoProducts = productArray
      })
      .then(() => {
        this.fetchProducts()
      })
    },

    fetchVideoUnique (): void {
      const videoUniqueArray = [] as any
      DB.collection('videoUnique')
      .where('channelId', '==', this.$route.params.id)
      .orderBy('publishedAt', 'desc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          videoUniqueArray.push(doc.data())
        })
        this.videoUniques = videoUniqueArray
      })
      .then(() => {
        this.fetchVideoProduct(this.videoUniques[0].id)
      })
    },

    fetchProducts (): void {
      const sortedproductIdArray = Array.from(new Set(this.productIdArray))
      const productArray = [] as any
      const categoryArray = [] as any
      sortedproductIdArray.forEach((v: any) => {
        DB.collection('products')
        .where('id', '==', v)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const categoryName = doc.data().categoryName
            productArray.push(doc.data())
            
            categoryArray.push(categoryName)
          })
        })
        .then(() => {
          this.categories = Array.from(new Set(categoryArray))
          const products = [] as any
          this.categories.forEach(() =>{
            products.push([])
          })
          productArray.forEach((e: any) => {
            products[this.categories.indexOf(e.categoryName)].push(e)
            products[this.categories.indexOf(e.categoryName)].sort((a: any, b: any) => {
              if (a.review > b.review) {
                return -1
              } else {
                return 1
              }
            })
          })
          this.products = products
        })
      })
    },

    fetchVideoProduct (id: number): void {
      const videoId = id
      const videoProductArray = [] as any
      DB.collection('videos')
      .where('videoId', '==', videoId)
      .orderBy('id', 'asc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          videoProductArray.push(doc.data())
        })
        this.videoProducts = videoProductArray
      })
    },

    fetchChannels (): any {
      DB.collection('channels')
      .where('id', '==', this.$route.params.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.channelInfo = doc.data()
        })
      })
      .then(() => {
        document.title = `【${this.channelInfo.name}の紹介コスメ】人気YouTuberの動画レビューまとめ｜Cramel（クラメル）`
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

    convertTimeStamp(date: any) {
      const year = new Date(date).getFullYear()
      const month = new Date(date).getMonth() + 1
      const day = new Date(date).getDate()
      return year + '/' + month + '/' + day
    },


    fetchSuggestedVideoUnique (channelId: string): void {
      const videoUniqueArray = [] as any
      DB.collection('videoUnique')
      .orderBy('publishedAt', 'desc')
      .limit(20)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          videoUniqueArray.push(doc.data())
        })
        this.suggestedVideoUniques = videoUniqueArray
      })
      .then(() => {
        this.isFetch = true
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

    onAfterSlideChange(id: number) {
      this.fetchVideoProduct(this.videoUniques[id].id)
    },

    pushToProduct(v: number) {
      this.$router.push({ name: 'Product', params: { id: v.toString() }})
    },

    pushToIndividualProductVideo(id: string, time: string, productId: string): void {
      const params = `${id}&${time}&${productId}`
      this.$router.push({ name: 'IndividualProductVideo', params: { id: params.toString() }})
    },

    pushToVideoPage(v: number): void {
      this.$router.push({ name: 'VideoProduct', params: { id: v.toString() }})
    },


    pushToSortedChannelList(tag: string) {
      this.$router.push({ name: 'SortedChannelList', params: { id: tag }})
    },

    openYoutube (id: string) {
      const youtubelink = `https://www.youtube.com/channel/${id}`
      window.open(youtubelink, '_blank', 'width=1024,height=768,scrollbars=yes,resizable=yes')
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
.link {
  color: #19C0C9;
}
</style>