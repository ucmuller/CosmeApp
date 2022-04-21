<template>
  <v-container class="pt-0 mt-16">
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
        <div class="pt-5 px-0">
          <a
            class="text-subtitle-2 font-weight-bold text-decoration-underline link"
            @click="pushToBrandProductPage(product.brandId)"
          >
            {{product.brand}}
          </a>
          <div class="text-h6 font-weight-bold product-name">
            {{product.name}} / {{product.modelNumber}}
          </div>
          <div class="d-flex">
            <span class="text-subtitle-2">
              {{Number(product.review).toFixed(1)}} ({{product.times}}動画で紹介)
            </span>
          </div>
          <div
            v-if="product.price != 0"
            class="text-subtitle-2"
          >
            参考価格: {{Number(product.price).toLocaleString()}}円
          </div>
          <div
            v-if="product.price == 0"
            class="text-subtitle-2"
          >
            参考価格: - 円
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        class="mb-0 pb-0 px-2"
      >
        <div class="box-border py-5">
          <v-img
            :src='product.imageUrl'
            :title="`${product.name}/${product.modelNumber}/${product.brand}/${product.manufacture}`"
            :alt="`${product.name}/${product.modelNumber}/${product.brand}/${product.manufacture}`"
            max-height="200"
            contain
          >
          </v-img>
        </div>
        <v-col
          cols="12"
          class="px-0 py-0 text-center"
        >
          <div
            class="d-flex justify-end"
          >
            <v-btn
              class="ma-1 pa-0"
              text
              small
              :color="sortItems[0].color"
              @click="changeSort(sortItems[0].value)"
            >
              人気順
            </v-btn>
            <p class="ma-1">/</p>
            <v-btn
              class="ma-1 pa-0"
              text
              small
              :color="sortItems[1].color"
              @click="changeSort(sortItems[1].value)"
            >
              名前順
            </v-btn>
          </div>
          <v-sheet
            class="mx-auto"
          >
            <v-slide-group show-arrows>
              <v-slide-item
                v-for="(item, i) in otherModel"
                :key="i"
              >
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                >
                  <v-scale-transition>
                    <div
                      class="px-3 avatar-width"
                      @click="changeProductImage(item.product)"
                    >
                      <v-avatar
                        class="my-3 mx-1"
                        size="70"
                        rounded
                        color="#fafafa"
                      >
                        <v-img
                          :src="item.product.imageUrl"
                          contain
                        ></v-img>
                      <div class="icon-position-top-left">
                        <span :class="`badge-ranking-`+item.index">
                          {{item.index+1}}
                        </span>
                      </div>
                      </v-avatar>
                      <p
                        class="px-1 mb-0 text-caption text-truncate"
                        width="30"
                      >
                        {{item.product.modelNumber}}
                      </p>
                    </div>
                  </v-scale-transition>
                </v-row>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-col>
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
        <v-expansion-panels
          class="mt-5"
          flat
        >
          <v-expansion-panel>
            <v-expansion-panel-header class="px-0">
              <div class="mt-0 py-1 px-3 heading expansion-header font-weight-bold">
                商品情報
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="py-0 px-0">
                <v-list class="py-0 px-0">
                  <v-list-item
                    v-if="product.categoryName"
                    class="py-0 px-0"
                  >
                    <v-list-item-content class="py-0">
                      <v-list-item-subtitle>カテゴリ</v-list-item-subtitle>
                      <v-list-item-title
                        class="font-weight-bold"
                      >
                        {{product.categoryName}}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item
                    v-if="product.price != 0"
                    class="py-0 px-0"
                  >
                    <v-list-item-content class="py-0">
                      <v-list-item-subtitle>参考価格(税抜)</v-list-item-subtitle>
                      <v-list-item-title
                        class="font-weight-bold"
                      >
                        {{Number(product.price).toLocaleString()}}円
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item
                    v-if="product.price == 0"
                    class="py-0 px-0"
                  >
                    <v-list-item-content class="py-0">
                      <v-list-item-subtitle>参考価格</v-list-item-subtitle>
                      <v-list-item-title>- 円</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item
                    class="py-0 px-0"
                    v-if="product.volume"
                  >
                    <v-list-item-content class="py-0">
                      <v-list-item-subtitle>容量</v-list-item-subtitle>
                      <v-list-item-title
                        class="font-weight-bold"
                      >
                        {{product.volume}}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item
                    v-if="product.janCode"
                    class="py-0 px-0"
                  >
                    <v-list-item-content class="py-0">
                      <v-list-item-subtitle>JANコード</v-list-item-subtitle>
                      <v-list-item-title
                        class="font-weight-bold"
                      >
                        {{product.janCode}}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>
                </v-list>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <div class="border"></div>

        <div class="pt-5 pb-3 px-0">
          <div class="py-0 my-2 px-3 heading text-h7 font-weight-bold">
            このコスメを使っているYouTuber
          </div>
          <div
            class="pt-2 mx-0"
          >
            <v-sheet
              class="mx-auto"
            >
              <v-slide-group
                v-if="isIcon"
              >
                <v-slide-item
                  v-for="(item, i) in sortIcons(currentModelNumber)"
                  :key="i"
                >
                    <v-scale-transition>
                      <div
                        class="px-1 icon"
                        width='20'
                        @click="scrollToCard(item.channelId)"
                      >
                        <v-avatar
                          class="mb-3"
                          size="40"
                          color="#fafafa"
                        >
                          <v-img
                            :src="item.thumbnail"
                            contain
                          ></v-img>
                        </v-avatar>
                      </div>
                    </v-scale-transition>
                </v-slide-item>
              </v-slide-group>
            </v-sheet>
          </div>
        </div>
        <div class="border"></div>
      </v-col>
      <v-col
        cols="12"
        class="py-5 px-2"
      >
        <div class="py-2">
          <div class="py-0 my-2 px-3 heading">
            <div class="text-h7 font-weight-bold">
              YouTuberのレビュー
              <p class="mb-0 annotation">※各動画内から引用しています。</p>
            </div>
          </div>
        </div>
        <v-row class="py-0 px-2">
          <v-col
            cols="6"
            class="py-1 px-1 flex-grow-0 flex-shrink-0"
            v-for="(video, i) in sortVideos(currentModelNumber)"
            :key="i"
          >
            <v-card
              :id="video.channelId"
              outlined
              :color="video.color"
            >
              <div
                class="card-title"
              >
                <v-icon
                  small
                >
                  mdi-eye
                </v-icon>
                <span
                  class="pr-2 text-caption font-weight-bold"
                >
                  {{video.viewCount.toLocaleString()}}
                </span>
                <v-icon
                  small
                >
                  mdi-heart
                </v-icon>
                <span
                  class="text-caption font-weight-bold"
                >
                  {{(video.goodCountAtCramel + video.initialgoodCountAtCramel).toLocaleString()}}
                </span>
              </div>
              <div
                class="card-icon"
                @click="pushToIndividualProductVideo(video.videoId, video.time, video.productId)"
              >
                <v-img
                  :src='video.videoThumbnail'
                  cover
                >
                </v-img>
                <p>
                  <v-icon
                    color="white"
                    x-large
                  >
                    mdi-play-circle-outline
                  </v-icon>
                </p>
              </div>
              <v-list>
                <v-list-item class="px-2">
                  <v-list-item-avatar
                    size="30"
                    @click="pushToYoutubersProduct(video.channelId)"
                  >
                    <v-img :src="video.thumbnail"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content class="py-0">
                    <a
                      class="text-caption text-truncate font-weight-bold text-decoration-underline link"
                      @click="pushToYoutubersProduct(video.channelId)"
                    >
                      {{video.channelName}}
                    </a>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item class="px-1">
                  <v-list-item-content class="py-0">
                    <p
                      class="mb-0 text-caption"
                      v-if="video.modelNumber != ''"
                    >
                      <span class="model-number text-subtitle-2">{{video.modelNumber}}</span>を使用
                    </p>
                    <p
                      class="mb-0 px-0 text-caption"
                      v-if="video.comment.length <= 30"
                    >
                      {{video.comment}}
                    </p>
                    <p
                      class="mb-0 px-0 text-caption"
                      v-if="video.comment.length > 30 && !isShow[i]"
                    >
                      {{truncate(video.comment, 30)}}
                      <span
                      class="text--secondary"
                      @click="pushToIndividualProductVideo(video.videoId, video.time, video.productId)"
                      >
                        続きを動画で見る
                      </span>
                    </p>
                    <p
                      v-if="isShow[i]"
                      class="mb-0 text-caption"
                    >
                      {{video.comment}}
                      <span
                      class="text--secondary"
                      @click="toggleShowPost(i)"
                      >
                        閉じる
                      </span>
                    </p>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
        <div
          v-if="!isMoreReview && currentVideos.length > 6"
          class="pr-0 pt-1 text-right"
        >
          <v-btn
            class="ma-0 pa-0"
            text
            small
            color="#2A5FA6"
            @click="isMoreReview = true"
          >
            このコスメのレビュー動画をもっと見る
            <v-icon
              color="#2A5FA6"
              small
            >
              mdi-chevron-down
            </v-icon>
          </v-btn>
        </div>
      </v-col>
      <v-col
        cols="12"
        class="px-2 py-5 back-ground-pink"
      >
        <v-card
          class="mx-auto"
          outlined
          @click="pushProductPage(product.id)"
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
              <v-list-item-subtitle v-if="product.price">
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
        class="py-5 pb-5 px-2"
      >
        <div class="py-2 px-0">
          <div class="py-0 my-2 px-3 heading text-h7 font-weight-bold">
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
        class="py-5 pb-5 px-2"
      >
        <div class="py-2 px-0">
          <div class="py-0 my-2 px-3 heading text-h7 font-weight-bold">
            類似アイテムの人気商品
          </div>
          <SearchProduct
            :handle-products="sameCategoryProduct"
            @parentMethod="changeParams"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import { DB } from '@/firebase/db'
import firebase, { functions } from 'firebase'
import SearchProduct from '@/components/SearchProduct.vue'


export default Vue.extend({
  name: 'Product',

  components: {
    SearchProduct
  },

  data: () => ({
    product: {} as any,
    sameBrandProduct: [] as any,
    sameCategoryProduct: [] as any,
    otherModel: [] as any,
    videos: [] as any,
    comments: [] as any,
    channels: [] as any,
    playerId: [] as any,
    isShow: {} as any,
    uid: '',
    onAuthState: false,
    existsCosme: false,
    addToCosmePouchButtonLabel: 'コスメポーチに追加',
    isFetch: false,
    scrollY: 0,
    tabColor: '#19C0C9',
    tabSliderColor: '#19C0C9',
    currentSort: 'popular',
    currentModelNumber: '',
    currentVideos: [] as any,
    isMoreReview: false,
    isIcon: true,
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
    ],
    sortItems: [
        {
          title: '人気順',
          value: 'popular',
          color: '#1976D2'
        },
        {
          title: '名前順',
          value: 'name',
          color: '#333333'
        }
      ],
  }),

  computed: {
    breadcrumbs: function() {
      const breadcrumbs = [
        {
          text: 'TOP',
          disabled: false,
          href: '/',
        },
        {
          text: this.product.brand,
          disabled: false,
          href: `/brandproduct/${this.product.brandId}`,
        },
        {
          text: this.product.name,
          disabled: true
        },
      ]
      return breadcrumbs
    }
  },

  created: function() {
    this.fetchProduct(this.$route.params.id)
    this.onAuthStateChanged(this.$route.params.id)
    window.scrollTo({
      top: 0
    })
  },

  watch: {
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

  mounted() {
    // window.addEventListener('scroll', this.handleScroll)
  },

  updated() {
    this.playerId.forEach((v: any, i: number) => {
      const dom: any = this.$refs[`player_${v.id}`]
      const rect = dom[0].getBoundingClientRect()
      this.playerId[i].top = rect.top
      this.playerId[i].bottom = rect.bottom
    })
  },

  methods: {

    fetchVideos (productName: string): void {
      const videoArray = [] as any
      const commentAraay = [] as any
      const arr = [] as any
      DB.collection('videos')
      .where('productName', '==', productName)
      .orderBy('viewCount', 'desc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          videoArray.push(doc.data())
          if(doc.data().comment != "") {
            commentAraay.push(doc.data())
          }
        })
        this.videos = videoArray
        this.currentVideos = videoArray
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
        this.fetchVideos(this.product.name)
        this.fetchOtherModel(this.product.name)
        this.fetchSameBrandProduct(this.product.brand, this.product.categoryId)
        this.fetchSameCategoryProduct(this.product.brand, this.product.categoryId)
      })
      .then(() => {
        this.isFetch = true
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
        .doc(this.product.id)
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

    onAuthStateChanged(productId: string) {
      firebase.auth().onAuthStateChanged( user => {
        if (user) {
          this.uid = user.uid
          this.isAnonymous = user.isAnonymous
          this.checkIfProductDataExistsInUsersSubCollection(user.uid, productId)
        } else {
          this.addToCosmePouchButtonLabel = 'コスメポーチに追加'
        }
      })
    },

    checkIfProductDataExistsInUsersSubCollection (uid: string, productId: string): void {
      DB.collection('users')
      .doc(uid)
      .collection('cosmePouch')
      .doc(String(productId))
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.existsCosme = true
          this.addToCosmePouchButtonLabel = 'コスメポーチに入っています'
        } else {
          this.existsCosme = false
          this.addToCosmePouchButtonLabel = 'コスメポーチに追加'
        }
      })
      .catch(error => {
      })
    },

    sortVideos(modelNumber: string): any {
      let result: any
      if(modelNumber == ''){
        result = this.videos.filter((element: any, index: number, self: any) =>
          self.findIndex((e: any) =>
            e.channelId === element.channelId
          ) === index
        )
      }
      if(modelNumber != ''){
        result = this.videos.filter((element: any, index: number, self: any) =>
          self.findIndex((e: any) =>
            e.channelId === element.channelId &&
            e.modelNumber === modelNumber
          ) === index
        )
      }
      if (this.isMoreReview) {
        return result
      }
      if (!this.isMoreReview) {
        return result.slice(0,6)
      }
    },

    sortIcons(modelNumber: string): any {
      let result: any
      if(modelNumber == ''){
        result = this.videos.filter((element: any, index: number, self: any) =>
          self.findIndex((e: any) =>
            e.channelId === element.channelId
          ) === index
        )
      }
      if(modelNumber != ''){
        result = this.videos.filter((element: any, index: number, self: any) =>
          self.findIndex((e: any) =>
            e.channelId === element.channelId &&
            e.modelNumber === modelNumber
          ) === index
        )
      }
      return result
    },

    sortVideoCards(modelNumber: string): any {
      let result: any
      if(modelNumber == ''){
        result = this.videos.sort((a: any, b: any) => {
          if (a.viewCount > b.viewCount) {
            return -1
          } else {
            return 1
          }
        })
      }
      if(modelNumber != ''){
        result = this.videos.filter((element: any, index: number, self: any) =>
          element.modelNumber === modelNumber
        )
        .sort((a: any, b: any) => {
          if (a.viewCount > b.viewCount) {
            return -1
          } else {
            return 1
          }
        })
      }
      this.currentVideos = result
      return result
    },

    scrollToCard(id: string) {
      this.isMoreReview = true
      this.sortVideoCards(this.currentModelNumber)
      this.currentVideos.forEach((e: any) => {
        if (e.channelId == id) {
          e['color'] = '#E2526E'
        }
        if (e.channelId != id) {
          e['color'] = ''
        }
      })
      setTimeout(() => {
        const element: any = document.getElementById(id)
        element.scrollIntoView({
          behavior: 'smooth'
        })
      }, 100)
    },


    pushToSignin() {
      this.$router.push({ name: 'Signin' })
    },

    pushToYoutubersProduct(v: number) {
      this.$router.push({ name: 'YoutubersProduct', params: { id: v.toString() }})
    },

    pushToBrandProductPage(v: number): void {
      this.$router.push({ name: 'BrandProduct', params: { id: v.toString() }})
    },

    playerVars(time: string, id: string) {
      const convertedTime = this.convertTime(time)
      const playerVars = {
        playsinline: 1,
        autoplay: 1,
        start: convertedTime,
        end: convertedTime+20
      }
      return playerVars
    },

    convertTime(time: string) {
      const timeArray = time.split(':')
      return Number(timeArray[0]) * 60 + Number(timeArray[1])
    },

    truncate(str: string, len: number){
        return str.length <= len ? str: (str.substr(0, len)+"...");
    },

    changeParams (id: string) {
      this.channels = []
      this.otherModel = []
      this.existsCosme = false
      this.sameBrandProduct = []
      this.sameCategoryProduct = []
      this.isMoreReview = false
      this.playerId = []
      this.onAuthStateChanged(this.$route.params.id)
      this.fetchProduct(id)
      window.scrollTo({
        top: 0
      })
    },

    changeSort(value: string){
      this.currentSort = value
      this.sortItems.map((e: any) => {
        if(e.value == value) {
          e.color = '#1976D2'
        } else {
          e.color = '#333333'
        }
      })
    },

    changeProductImage (product: any){
      this.isIcon = false
      this.product = product
      this.currentModelNumber = product.modelNumber
      this.isMoreReview = false
      this.onAuthStateChanged(product.id)
      this.sortVideoCards(product.modelNumber)
      setTimeout(() => {
        this.isIcon = true
      },100)
    },

    toggleShowPost(key: number){
      this.$set(this.isShow, key, !this.isShow[key])
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
    },

    pushToIndividualProductVideo(id: string, time: string, productId: string): void {
      const params = `${id}&${time}&${productId}`
      this.$router.push({ name: 'IndividualProductVideo', params: { id: params.toString() }})
    },
    
    routerPush(view: string) {
      if( view != 'Product'){
        this.$router.push({ name: view, params: { id: this.$route.params.id }})
      }
    }
  }
})
</script>

<style scoped>
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
.box-border{
  border: 1px solid #E2526E;
}
.heading{
  border-left: 4px solid #E2526E;
}
.border {
  border-bottom: 2px solid #f5f5f5;
}
.grey-title{
  color: #616161;
}
.link{
  color: #E2526E;
}
.avatar-width{
  width: 100px;
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

.card-title {
  width: 100%;
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

.product-name{
  line-height: normal;
}
.annotation{
  font-size: 12px;
  font-weight: normal;
}
.model-number {
  background-color: #F0F0F0;
}
.expansion-header {
  font-size: 16px;
}
.v-expansion-panel-content>>> .v-expansion-panel-content__wrap {
  padding: 0 !important;
}
.back-ground-pink{
  background-color: #FCF5F4;
}

.cosme-pouch-button{
  background-color: white;
}

.v-breadcrumbs>>> .v-breadcrumbs__item {
  font-size: 12px;
}

.v-breadcrumbs>>> .v-breadcrumbs__divider {
  padding-left: 2px;
  padding-right: 2px;
}
</style>
