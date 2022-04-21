<template>
  <v-container
    class="pt-0 mt-16"
  >
    <v-row
      v-if="!product"
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
     v-if="product"
    >
      <v-col
        cols="12"
        class="px-0 mt-13 pb-0 youtube-frame"
        v-if="!isDisplay"
      >
      </v-col>
      <v-col
        cols="12"
        class="mb-1 pb-0 px-2"
      >
        <div class="pt-10 px-0">
          <v-breadcrumbs
            class="px-0 pt-0 pb-0"
            :items="breadcrumbs"
          >
            <template v-slot:divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </div>
      </v-col>

      <v-col
        cols="12"
        class="px-2 py-5"
      >
        <div class="py-0 my-2 px-3 heading text-h7 font-weight-bold">
          レビューされているコスメ
        </div>
        <v-card
          class="mx-auto"
          outlined
          @click="pushToProductPage(product.id)"
        >
          <v-list-item three-line>
            <v-list-item-avatar
              tile
              size="100"
            >
              <v-img
                :src="product.imageUrl"
                contain
              >
              </v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <div class="text-subtitle-2 font-weight-bold">
                {{product.brand}}
              </div>
              <div class="text-h7 font-weight-bold">
                {{product.name}} / {{product.modelNumber}}
              </div>
              <v-list-item-subtitle v-if="product.price != 0">
                参考価格: {{Number(product.price).toLocaleString()}}円
              </v-list-item-subtitle>
              <v-list-item-subtitle v-if="product.volume">
                内容量: {{product.volume}}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <div
          v-if="product.amazonAffiliatelink"
          class="pt-5 px-0 text-center"
        >
          <v-btn
            depressed
            large
            class="white--text my-1"
            block
            color="#FF9900"
            @click.stop.prevent="openWindowAmazon(product.amazonAffiliatelink)"
          >
            <v-icon
              left
            >
              mdi-cart
            </v-icon>
            Amazonで購入
          </v-btn>
        </div>
        <div
          class="pt-1 pb-0 px-0 text-center"
        >
          <v-btn
            depressed
            large
            class="my-1 font-weight-bold cosme-pouch-button"
            block
            outlined
            color="#E2526E"
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
      </v-col>
      <v-col
        cols="12"
        class="pb-0 px-2"
      >
        <div class="py-0 px-3 my-2 heading text-h7 font-weight-bold">
          YouTuberのレビュー
        </div>
        <YoutubePlayer
          :handle-videos="video"
          :handle-time="time"
          :handle-fixed="isFixed"
          :handle-productid="product.id"
        />
        <v-list class="pa-0">
          <v-list-item three-line class="pa-0">
            <v-list-item-content class="px-2 my-0 py-0">
              <v-row align="center">
                <v-col
                  cols="2"
                  class="pa-0 mx-0 text-center"
                >
                  <v-avatar
                  size="40"
                  left
                  @click="pushToYoutubersProduct(video.channelId)"
                >
                  <v-img
                    :src="video.channelThumbnail"
                  >
                  </v-img>
                </v-avatar>
                </v-col>
                <v-col cols="10" class="px-0 mx-0 py-0">
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
                  class="px-0 mx-0 py-0"
                >
                  <v-list-item-subtitle>
                    {{video.viewCount.toLocaleString()}}回視聴・{{publishedAt(video.publishedAt).toLocaleString()}}
                    <v-icon small>
                      mdi-thumb-up
                    </v-icon>
                    {{video.likeCount.toLocaleString()}}
                  </v-list-item-subtitle>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col
        cols="12"
        class="pb-2 pt-0 px-5"
      >
        <v-row
          class="back-ground-grey px-2"
        >
          <v-col
            cols="6"
            class="py-0 px-2 text-vertical-middle text-subtitle-2"
          >
            <div>
              参考になった！
              <span class="link font-weight-bold">
                {{(video.goodCountAtCramel + video.initialgoodCountAtCramel).toLocaleString()}}
              </span>
            </div>
          </v-col>
          <v-col
            cols="6"
            class="py-0 px-2 text-vertical-middle"
          >
            <div class="link text-caption text-right">
              {{numberOfVideoGood.toLocaleString()}}/10
              <v-btn
                class="fav-button"
                color="#E2526E"
                fab
                outlined
                height="25"
                width="25"
              >
                <v-icon
                  :color="goodButtonColor"
                  small
                  @click="incrementNumberOfVideoGood('pushVideoGoodButtonAtVideoDescription')"
                >
                  mdi-heart
                </v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        class="py-0 px-2"
      >
        <v-btn
          depressed
          large
          class="white--text my-1"
          block
          color="#FF9900"
          @click.stop.prevent="openWindowAmazon(product.amazonAffiliatelink)"
        >
          <v-icon
            left
          >
            mdi-cart
          </v-icon>
          Amazonで購入
        </v-btn>
        <v-btn
          depressed
          large
          class="white--text mb-5"
          block
          color="#c4302b"
          @click.stop.prevent="pushToYoutube(video.videoUrl)"
        >
          <v-icon
            left
          >
            mdi-youtube
          </v-icon>
          動画をyoutubeで見る
        </v-btn>
        <div class="border mx-0 px-0 mb-5"></div>
      </v-col>
    </v-row>
    <v-row
      v-if="isFetch"
    >
      <v-col
        cols="12"
        class="mb-0 pb-0 pt-0"
      > 
        <div
          v-if="comments.length != 0"
          class="pb-5 pt-0 px-1"
        >
          <v-list
            three-line
            class="pt-0"
          >
            <template v-for="(item, j) in comments">
              <v-list-item
                :key="item.thumbnail"
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
                    v-if="!isShow[item.videoId]"
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
                    v-if="isShow[item.videoId]"
                    class="mb-0 text-caption"
                  >
                    {{item.comment}}
                  </p>
                </v-list-item-content>
              </v-list-item>
              <v-divider
                :key='j'
              >
              </v-divider>
            </template>
          </v-list>
        </div>
      </v-col>
      <v-col
        cols="12"
        class="px-2 py-5 back-ground-pink"
      >
        <v-card
          class="mx-auto"
          outlined
          @click="pushToProductPage(product.id)"
        >
          <v-list-item three-line>
            <v-list-item-avatar
              tile
              size="100"
            >
              <v-img
                :src="product.imageUrl"
                contain
              >
              </v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <div class="text-subtitle-2 font-weight-bold">
                {{product.brand}}
              </div>
              <div class="text-h7 font-weight-bold">
                {{product.name}} / {{product.modelNumber}}
              </div>
              <v-list-item-subtitle v-if="product.price != 0">
                参考価格: {{Number(product.price).toLocaleString()}}円
              </v-list-item-subtitle>
              <v-list-item-subtitle v-if="product.volume">
                内容量: {{product.volume}}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <div
          class="pt-5 pb-0 px-0 text-center"
        >
          <v-btn
            depressed
            large
            class="my-1 font-weight-bold cosme-pouch-button"
            block
            outlined
            color="#E2526E"
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
      </v-col>
      <v-col
        v-if="sameBrandProduct[0]"
        cols="12"
        class="pt-0 pb-5"
      >
        <div class="py-2 px-1">
          <div class="py-0 px-3 my-2 heading text-h7 font-weight-bold">
            この商品に関連する商品
          </div>
          <SearchProduct
            :handle-products="sameBrandProduct"
            @parentMethod="changeParams"
          />
        </div>
      </v-col>
      <v-col
        v-if="sameCategoryProduct[0]"
        cols="12"
        class="pt-0 pb-5"
      >
        <div class="py-2 px-1">
          <div class="py-0 px-3 my-2 heading text-h7 font-weight-bold">
            類似アイテムの人気商品
          </div>
          <SearchProduct
            :handle-products="sameCategoryProduct"
            @parentMethod="changeParams"
          />
        </div>
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
        :handle-videos="videoUniques"
      />
    </v-row>
    <v-footer
      class="pa-0 mt-5"
      app
    >
      <v-card-text class="fav-button-card pa-2">
        <div
          class="text-caption font-weight-bold good-button-text"
        >
          {{goodButtonText}}
        </div>

      </v-card-text>
    </v-footer>
    <div
      class="pa-0 ma-0 button-bottom"
    >
      <v-fab-transition>
        <v-btn
          class="fav-button"
          color="#E2526E"
          fab
          outlined
          @click="incrementNumberOfVideoGood('pushVideoGoodButtonAtFooter')"
        >
          <v-icon
            :color="goodButtonColor"
          >
            mdi-heart
          </v-icon>
        </v-btn>
      </v-fab-transition>
      <div
        class="text-caption font-weight-bold footer-text"
      >
        {{numberOfVideoGood}}/10
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { DB } from '@/firebase/db'
import firebase from 'firebase'
import axios from 'axios'
import SuggestVideoList from '@/components/SuggestVideoList.vue'
import SearchProduct from '@/components/SearchProduct.vue'
import YoutubePlayer from '@/components/YoutubePlayer.vue'

export default Vue.extend({
  name: 'IndividualProductVideo',

  components: {
    SuggestVideoList,
    SearchProduct,
    YoutubePlayer
  },

  data: () => ({
    video: {} as any,
    videoUniques: [] as any,
    videoId: '',
    time: '',
    timerId: 0,
    product: {} as any,
    productId: '',
    videoModalId: {} as any,
    isShow: {} as any,
    isFixed: false,
    isDisplay: true,
    isFetch: false,
    uid: '',
    commentId: '',
    onAuthState: false,
    existsCosme: false,
    addToCosmePouchButtonLabel: 'コスメポーチに追加',
    comments: [] as any,
    channels: [] as any,
    sameBrandProduct: [] as any,
    sameCategoryProduct: [] as any,
    otherModel: [] as any,
    currentSort: 'popular',
    currentModelNumber: '',
    numberOfVideoGood: 0 as any,
    isAnonymous: false,
    sortItems: [
        {
          title: '人気順',
          value: 'popular',
        },
        {
          title: '名前順',
          value: 'name',
        }
      ],
  }),

  computed: {
    breadcrumbs: function() {
      const breadcrumbs = [
        {
          text: 'TOP',
          disabled: false,
          href: '/'
        },
        {
          text: this.product.brand,
          disabled: false,
          href: `/brandproduct/${this.product.brandId}`
        },
        {
          text: this.product.name,
          disabled: false,
          href: `/product/${this.product.id}`
        },
        {
          text: 'レビュー動画一覧',
          disabled: true
        },
      ]
      return breadcrumbs
    },

    goodButtonColor: function() {
      let color = ''
      if (this.numberOfVideoGood >= 0) {
        color = '#E2526E'
      }
      if (this.numberOfVideoGood == 0) {
        color = '#CCCCCC'
      }
      return color
    },

    goodButtonText: function() {
      let text = ''
      if (this.numberOfVideoGood >= 0) {
        text = `この動画が参考になったら
          いいねを押してYouTuberを応援しよう！`
      }
      if (this.numberOfVideoGood == 10) {
        text = `THANK YOU！`
      }
      return text
    }
  },

  created: function() {
    this.onAuthStateChanged()
    this.fetchVideoData()
    this.fetchProduct()
    this.fetchComments()
    window.scrollTo({
      top: 0
    })
    this.videoId = this.$route.params.id.split('&')[0]
    this.time = this.$route.params.id.split('&')[1]
    this.productId = this.$route.params.id.split('&')[2]
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },

  watch: {
    $route (to, from) {
      this.initialize()
      this.fetchVideoData()
      this.fetchProduct()
      this.fetchComments()
      window.scrollTo({
        top: 0
      })
    },

    currentSort: function(newVal, oldVal) {
      if(newVal == 'popular'){
        this.otherModel.sort((a: any, b: any) => {
          if (a.index < b.index) {
            return -1
          } else {
            return 1
          }
       })
      }
      if(newVal == 'name'){
        this.otherModel.sort((a: any, b: any) => {
          if (a.product.modelNumber < b.product.modelNumber) {
            return -1
          } else {
            return 1
          }
       })
      }
    }
  },

  methods: {
    initialize(){
      this.video = {}
      this.videoUniques = []
      this.otherModel = []
      this.product = ''
    },

    handleScroll() {
      if(window.scrollY>500){
        this.isFixed = true
        this.isDisplay = false
      } else {
        this.isFixed = false
        this.isDisplay = true
      }
    },
    
    fetchVideoData() {
      const videoId = this.$route.params.id.split('&')[0]
      DB.collection('videoUnique')
      .doc(videoId)
      .get()
      .then((doc) => {
        this.video = doc.data()
      })
      .then(() => {
        this.fetchVideoUnique(this.video.personalColorSeason, this.video.id)
      })
    },
    
    fetchProduct (): void {
      const id = this.$route.params.id.split('&')[2]
      DB.collection('products')
      .where('id', '==', id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.product = doc.data()
        })
      })
      .then(() => {
        this.fetchOtherModel(this.product.name)
        this.fetchSameBrandProduct(this.product.brand, this.product.categoryId)
        this.fetchSameCategoryProduct(this.product.brand, this.product.categoryId)
      })
      .then(() => {
        this.isFetch = true
        document.title = `【${this.product.brand}/${this.product.name}/${this.product.modelNumber}】人気YouTuberの動画レビューまとめ｜Cramel（クラメル）`
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

    fetchOtherModel (name: string): void {
      const arr = [] as any
      let index = 0
      DB.collection('products')
      .where('name', '==', name)
      .orderBy('times', 'desc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.otherModel.push(
            {
              product: doc.data(),
              index: index
            }
          )
          index++
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

    fetchVideoUnique (personalColorSeason: string, videoId: string): void {
      const videoUniqueArray = [] as any
      DB.collection('videoUnique')
      .orderBy('publishedAt', 'desc')
      .limit(20)
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

    fetchComments (): void {
      const videoId = this.$route.params.id.split('&')[0]
      const id = this.$route.params.id.split('&')[2]
      const videoArray = [] as any
      const commentArray = [] as any
      const arr = [] as any
      DB.collection('videos')
      .where('productId', '==', id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          videoArray.push(doc.data())
          commentArray.push(doc.data())
          // if(doc.data().comment){
          //    commentArray.push(doc.data())
          // }
        })
        const sortCommentLength = commentArray.sort((a: any, b: any) => {
            if (a.comment.length < b.comment.length) {
              return -1
            } else {
              return 1
            }
          })
        this.comments = sortCommentLength.sort((a: any, b: any) => {
          if ((b.videoId === videoId)) {
            return 1
          } else {
            return -1
          }
        })
      })
      .then(() => {
        videoArray.forEach((e: any) => {
          arr.push(e.channelId)
        })
      })
      .then(() => {
        Array.from(new Set(arr)).forEach((e: any) => {
          this.fetchChannels(e)
        })
      })
      .then(() => {
        this.commentId = this.comments[0].id
        this.toggleShowPost(videoId)
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

    changeVideo(video: any) {
      const videoId = video.videoId
      this.commentId = video.id
      this.videoId = videoId
      this.toggleShowPost(video.videoId)
      DB.collection('videoUnique')
      .doc(videoId)
      .get()
      .then((doc) => {
        this.video = doc.data()
        this.time = video.time
      })
      .then(() => {
        this.checkIfProductDataExistsInUsersGoodVideo(this.uid)
      })
    },

    truncate(str: string, len: number){
      return str.length <= len ? str: (str.substr(0, len)+"...");
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
        .doc(this.productId)
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
          this.checkIfProductDataExistsInUsersCosmepouch(user.uid)
          this.checkIfProductDataExistsInUsersGoodVideo(user.uid)
        } else {
          this.addToCosmePouchButtonLabel = 'コスメポーチに追加'
          firebase.auth().signInAnonymously()
            .then(() => {
              firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                  this.uid = user.uid
                  this.isAnonymous = user.isAnonymous
                }
              })
            })
            .catch((error) => {
            })
        }
      })
    },

    checkIfProductDataExistsInUsersCosmepouch (uid: string): void {
      DB.collection('users')
      .doc(uid)
      .collection('cosmePouch')
      .doc(this.productId)
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

    checkIfProductDataExistsInUsersGoodVideo (uid: string): void {
      DB.collection('users')
      .doc(uid)
      .collection('goodVideo')
      .doc(this.videoId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data: any = doc.data()
          this.numberOfVideoGood = data.goodCount
        } else {
          this.numberOfVideoGood = 0
        }
      })
      .catch(error => {
      })
    },

    changeParams (id: string) {
      this.channels = []
      this.existsCosme = false
      this.sameBrandProduct = []
      this.sameCategoryProduct = []
      this.onAuthStateChanged()
      this.fetchProduct()
      this.fetchComments()
      window.scrollTo({
        top: 0
      })
    },

    toggleShowPost(id: string){
      this.$ga.event('pushReview', 'push')
      this.$set(this.isShow, id, true)
      this.comments.forEach((e: any) => {
        if (e.videoId == id) {
          e['class'] = 'highlight'
        }
        if (e.videoId != id) {
          e['class'] = ''
        }
      })
    },

    incrementNumberOfVideoGood(section: string) {
      if (this.numberOfVideoGood < 10) {
        this.$ga.event(section, 'push')
        this.numberOfVideoGood += 1
        this.video.goodCountAtCramel += 1
        const increment = firebase.firestore.FieldValue.increment(1)
        const docRefUsersGoodVideo = DB.collection('users')
          .doc(this.uid)
          .collection('goodVideo')
          .doc(this.videoId)
        const docRefVideos = DB.collection('videos')
          .doc(String(this.commentId))
        const docRefVideoUnique = DB.collection('videoUnique')
          .doc(this.videoId)
      
        docRefUsersGoodVideo
        .set({
          goodCount: increment
        },
        { 
          merge: true
        })

        docRefVideos
        .set({
          goodCountAtCramel: increment
        },
        { 
          merge: true
        })

        docRefVideoUnique
        .set({
          goodCountAtCramel: increment
        },
        { 
          merge: true
        })

        this.comments.forEach((e: any, i: number) => {
          if(e.id == this.commentId) {
            this.comments[i].goodCountAtCramel += 1
          }
        })
      }
    },

    routerPush(v: number) {
      this.$router.push({ name: 'Product', params: { id: v.toString() }})
    },

    pushToYoutube (url: string) {
      this.$ga.event('pushYoutube', 'push')
      window.open(url, '_blank', 'width=1024,height=768,scrollbars=yes,resizable=yes')
    },

    pushToProductPage(v: number): void {
      this.$router.push({ name: 'Product', params: { id: v.toString() }})
    },

    pushToVideoPage(v: number): void {
      this.$router.push({ name: 'VideoProduct', params: { id: v.toString() }})
    },

    pushToYoutubersProduct(v: number) {
      this.$router.push({ name: 'YoutubersProduct', params: { id: v.toString() }})
    },

    pushToBrandProductPage(v: number): void {
      this.$router.push({ name: 'BrandProduct', params: { id: v.toString() }})
    },

    pushToSignin() {
      this.$router.push({ name: 'Signin' })
    }
  }
})
</script>

<style scoped>
.border {
  border-bottom: 8px solid #f5f5f5;
}
.heading{
  border-left: 4px solid #E2526E;
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
.fixed{
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 1;
}
.youtube-frame{
  width: 100%;
  padding-top: 40%;
}

.link {
  color: #E2526E;
}

.icon-position-top-left{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  color: white;
}
.badge-ranking-0 {
  font-weight: 500;
  height: 18px;
  padding-bottom: 3px;
  background-color: transparent;
  background-image: url("~@/assets/images/first_prize.png");
  background-repeat: no-repeat;
  background-size: contain;
  font-size: 12px;
  line-height: 1;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
}
.badge-ranking-1 {
  font-weight: 500;
  height: 18px;
  padding-bottom: 3px;
  background-color: transparent;
  background-image: url("~@/assets/images/second_prize.png");
  background-repeat: no-repeat;
  background-size: contain;
  font-size: 12px;
  line-height: 1;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
}
.badge-ranking-2 {
  font-weight: 500;
  height: 18px;
  padding-bottom: 3px;
  background-color: transparent;
  background-image: url("~@/assets/images/third_prize.png");
  background-repeat: no-repeat;
  background-size: contain;
  font-size: 12px;
  line-height: 1;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
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

.highlight{
  background-color: #e7e7e7;
}

.back-ground-pink{
 background-color: #FCF5F4;
}

.back-ground-grey{
 background-color: #F5F5F5;
 border-radius: 4px;
 height: 40px;
}

.cosme-pouch-button{
  background-color: white;
}

.fav-button-card{
  height: 60px;
  position: relative;
  max-width: 640px;
  margin: auto;
  background-color: #FAFAFA;
  border-top: 1px solid #DBDBDB;
  line-height: normal;
  display:table;
}

.fav-button{
  background-color: white;
}

.button-bottom{
  height: 50px;
  width: 50px;
  position:fixed;
  right: 20px;
  bottom: 10px;
  text-align: center;
  display: table;
  z-index: 3;
}
.model-number {
  background-color: #F0F0F0;
}

.good-button-text{
  white-space:pre-line;
  word-wrap:break-word;
  display: table-cell;
  vertical-align: middle;
}

.text-vertical-middle{
  margin: auto;
  display: table-cell;
  vertical-align: middle;
}

.v-breadcrumbs>>> .v-breadcrumbs__item {
  font-size: 12px;
}

.v-breadcrumbs>>> .v-breadcrumbs__divider {
  padding-left: 2px;
  padding-right: 2px;
}

.v-footer {
  padding-bottom: env(safe-area-inset-bottom) !important
}

.footer-text {
  padding-bottom: env(safe-area-inset-bottom) !important
}

@media screen and (min-width: 640px){
  .button-bottom{
  height: 50px;
  width: 50px;
  position:fixed;
  right: calc(50% - 300px);
  bottom: 10px;
  text-align: center;
  display: table;
  z-index: 3;
}
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