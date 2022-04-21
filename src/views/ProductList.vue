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
            {{categoryName}}
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        class="pt-0 pb-0"
      >
        <v-select
          v-model="sortedBrands"
          :items="brands"
          label="ブランドを絞り込む"
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
            @click="fetchProducts(tab.params, tab.order)"
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
  name: 'ProductList',

  data: () => ({
    categoryName: '',
    videos: {},
    products: [] as any,
    brands: [] as any,
    sortedBrands: '',
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
    this.fetchCategories()
    this.fetchProducts('times', 'desc')
    window.scrollTo({
      top: 0
    })
  },
  
   watch: {
    sortedBrands: function() {
      this.fetchProducts(this.params, this.order)
    },
  },

  methods: {
    fetchCategories (): void {
      DB.collection('categories')
      .where('id', '==', this.$route.params.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.categoryName = doc.data().categoryName
        })
      })
    },

    fetchProducts (params: string, order: string): any {
      this.products = []
      this.isFetch = false
      this.params = params
      this.order = order
      const products = [] as any
      const brands = [] as any
      const option = order == 'desc' ? 'desc' : 'asc'
      DB.collection('products')
      .where('categoryId', '==', this.$route.params.id)
      .orderBy(params, option)
      .get()
      .then((querySnapshot) => {
        this.lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
        querySnapshot.forEach((doc) => {
          if (doc.data().times != 0 && doc.data().price != 0) {
            products.push(doc.data())
            brands.push(doc.data().brand)
          }
        })
      })
      .then(() => {
        if (this.sortedBrands == ''){
          this.products = products
        }
        if (this.sortedBrands != ''){
          this.products = products.filter((doc: any) => {
            return (doc.brand === this.sortedBrands)
          })
        }
        this.brands = Array.from(new Set(brands)).sort()
        this.isFetch = true
      })
    },

    initialize() {
      this.sortedBrands = ''
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