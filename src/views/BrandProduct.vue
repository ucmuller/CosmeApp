<template>
  <v-container
    class="mt-16 pb-8"
  >
    <v-row>
      <v-col
        cols="12"
        class="px-0 mt-10"
      >
        <div class="pa-0 mt-0">
          <div class="px-2 mb-1 text-h6 font-weight-bold">
            {{products[0].brand}}の商品一覧
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        class="pt-0 pb-0"
      >
        <v-select
          v-model="sortedCategory"
          :items="categoryNames"
          label="カテゴリを絞り込む"
          color="#19C0C9"
          persistent-hint
        ></v-select>
      </v-col>
      <v-col
        cols="12"
        class="mt-0 pt-0 px-4 border"
      >
        <v-btn
          class="pa-2 font-weight-bold"
          style="text-transform: none"
          outlined
          block
          height="40"
          color="#19C0C9"
          @click="initialize()"
        >
          絞り込みをキャンセル
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        class="mt-0 pa-0"
      >
        <v-tabs
          :color="tabColor"
        >
          <v-tab
            v-for="(tab, i) in tabs"
            :key="i"
            @click="sort(tab.params, tab.order, sortedCategory)"
          >
          {{tab.name}}
          </v-tab>
          <v-tabs-slider :color="tabSliderColor" />
        </v-tabs>
      </v-col>
      <v-col
        cols="12"
        v-if="!isFetch"
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
      <v-col
        cols="4"
        v-for="(product, i) in products"
        :key="i"
        class="py-0 mt-5"
      >
        <div @click="routerPush(product.id)">
          <v-badge
            overlap
            :content="i+1"
            color="#19C0C9"
          ></v-badge>
          <v-img
            :src='product.imageUrl'
            height="100"
            contain
          >
          </v-img>
          <div class="pt-3 ellipsis text-caption">
            {{product.brand}}
          </div>
          <div class="pt-0 ellipsis text-caption font-weight-bold">
            {{product.modelNumber}}
          </div>
          <div
            v-if="product.price != 0"
            class="pt-0 text-caption"
          >
            {{Number(product.price).toLocaleString()}}円
          </div>
          <div
            v-if="product.price == 0"
            class="pt-0 text-caption"
          >
            -
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { DB } from '@/firebase/db'

export default Vue.extend({
  name: 'BrandProduct',

  data: () => ({
    videos: {},
    products: [] as any,
    brands: [] as any,
    categoryNames: [] as any,
    categoryIds: [] as any,
    sortedCategory: '',
    tabColor: '#19C0C9',
    tabSliderColor: '#19C0C9',
    lastVisible: {} as firebase.firestore.DocumentData,
    params: 'times',
    order: 'desc',
    isFetch: true,
    tabs: [
      {
        name: '人気順',
        params: 'times',
        order: 'desc'
      },
      {
        name: '安い順',
        params: 'price',
        order: 'asc'
      },
      {
        name: '高い順',
        params: 'price',
        order: 'desc'
      }
    ]
  }),

  created: function() {
    this.fetchProducts('times', 'desc')
    window.scrollTo({
      top: 0
    })
  },
  
   watch: {
    sortedCategory: function() {
      this.sort(this.params, this.order, this.sortedCategory)
    }
  },

  methods: {

    fetchProducts (params: string, order: string): any {
      this.products = []
      this.isFetch = false
      this.params = params
      this.order = order
      const products = [] as any
      const categoryNames = [] as any
      const categoryIds = [] as any
      const option = order == 'desc' ? 'desc' : 'asc'
      DB.collection('products')
      .where('brandId', '==', this.$route.params.id)
      .orderBy(params, option)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().times != 0 && doc.data().price != 0) {
            products.push(doc.data())
            categoryNames.push(doc.data().categoryName)
            categoryIds.push(doc.data().categoryId)
          }
        })
      })
      .then(() => {
        this.products = products
        this.categoryNames = Array.from(new Set(categoryNames)).sort()
        this.categoryIds = Array.from(new Set(categoryIds)).sort()
        this.isFetch = true
      })
    },

    fetchSortedProducts (params: string, order: string, category: any): any {
      this.products = []
      this.isFetch = false
      this.params = params
      this.order = order
      const products = [] as any
      const brands = [] as any
      const option = order == 'desc' ? 'desc' : 'asc'
      DB.collection('products')
      .where('categoryName', '==', category)
      .where('brandId', '==', this.$route.params.id)
      .orderBy(params, option)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().times != 0 && doc.data().price != 0) {
            products.push(doc.data())
          }
        })
      })
      .then(() => {
        this.products = products
        this.isFetch = true
      })
    },

    sort(params: string, order: string, category: string){
      if (category == '') {
        this.fetchProducts(params, order)
      }
      if (category != '') {
        this.fetchSortedProducts(params, order, category)
      }
    },

    initialize() {
      this.sortedCategory = ''
    },

    routerPush(v: number) {
      this.$router.push({ name: 'Product', params: { id: v.toString() }})
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
</style>