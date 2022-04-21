<template>
    <v-container
      class="mt-16"
    >
      <v-row class="mb-5">
        <v-col
          cols="12"
          class="px-0 mt-10"
        >
          <div class="pa-0 pb-0 mt-0">
            <div class="px-2 mb-1 text-h6 font-weight-bold">
              YouTubeコスメ検索
            </div>
          </div>
        </v-col>
        <v-col
          class="mt-0 pt-0 pb-0"
          cols="12"
        >
          <v-radio-group
            v-model="index"
            row
            class="mt-0"
          >
            <v-radio
              v-for="(item, i) in searchCategory"
              :key="i"
              :label="item.name"
              :value="item.categoryIndex"
              color="#19C0C9"
              @click="chanegePlaceholder()"
            ></v-radio>
          </v-radio-group>
          <v-text-field
            @input="onInput"
            v-model="searchWord"
            :label="placeholder"
            filled
            outlined
          ></v-text-field>
        </v-col>
        <SearchProduct
          v-if="index == 'cramel_products'"
          :handle-products="products"
        />
        <SearchChannel
          v-if="index == 'cramel_channels'"
          :handle-channels="channels"
        />
        <SearchVideo
          v-if="index == 'cramel_videos'"
          :handle-videos="videos"
        />
      </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import { DB } from '@/firebase/db'
import algoliasearch from 'algoliasearch'
import SearchProduct from '@/components/SearchProduct.vue'
import SearchChannel from '@/components/SearchChannel.vue'
import SearchVideo from '@/components/SearchVideo.vue'



const client = algoliasearch('C6Y4RWNGUY', '4053f90fa27a6deea5833a5fd9ca1279')
const indexProducts = client.initIndex('cramel_products')
const indexChennels = client.initIndex('cramel_channels')
const indexVideos = client.initIndex('cramel_videos')

export default Vue.extend({
  name: 'Search',

  components: {
    SearchProduct,
    SearchChannel,
    SearchVideo
  },

  data: () => ({
    searchWord: '',
    products: [] as any,
    channels: [] as any,
    videos: [] as any,
    index: 'cramel_products',
    placeholder: '例. 3CE チーク',
    searchCategory: [
      // {
      //   name: 'コスメ動画',
      //   categoryIndex: 'cramel_videos'
      // },
      {
        name: 'コスメ',
        categoryIndex: 'cramel_products'
      },
      // {
      //   name: 'YouTuber',
      //   categoryIndex: 'cramel_channels'
      // }
    ]
  }),

  created: function() {
    window.scrollTo({
      top: 0
    })
  },

  methods: {
    async onInput() {
      if(this.index == 'cramel_products') {
        const searchResult = await indexProducts.search(this.searchWord, { hitsPerPage: 100 })
        this.products = searchResult.hits
      }
      if(this.index == 'cramel_channels') {
        const searchResult = await indexChennels.search(this.searchWord, { hitsPerPage: 100 })
        this.channels = searchResult.hits
      }
      if(this.index == 'cramel_videos') {
        const searchResult = await indexVideos.search(this.searchWord, { hitsPerPage: 100 })
        this.videos = searchResult.hits
      }
    },

    chanegePlaceholder() {
      this.products = []
      this.channels = []
      if(this.searchWord){
        this.onInput()
      }

      if(this.index == 'cramel_products') {
        this.placeholder = '例. 3CE チーク'
      }
      if(this.index == 'cramel_channels') {
        this.placeholder = '例. ゆうこす'
      }
      if(this.index == 'cramel_videos') {
        this.placeholder = '例. ゆうこす リップ'
      }
    }
  }
})
</script>

<style scoped>
.border {
  border-bottom: 8px solid #f5f5f5;
}
.ais-Hits-list{
  list-style: none;
}
</style>