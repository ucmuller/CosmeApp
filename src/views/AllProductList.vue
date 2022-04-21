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
            人気コスメランキング
          </div>
        </div>
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
          <div class="pt-0 mb-0 text-small font-weight-bold text-center text-truncate text-border">
            {{product.categoryName}}
          </div>
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
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { DB } from '@/firebase/db'

export default Vue.extend({
  name: 'AllProductList',

  data: () => ({
    categoryName: '',
    videos: {},
    products: [] as any,
    brands: [] as any,
    categoryNames: [] as any,
    categoryIds: [] as any,
    categoryArray: [] as any,
    sortedBrands: '',
    sortedCategory: '',
    tabColor: '#19C0C9',
    tabSliderColor: '#19C0C9',
    params: 'times',
    order: 'desc',
    isFetch: true,
    lastVisible: {} as firebase.firestore.DocumentData,
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
    sortedBrands: function() {
      this.fetchSortedProducts(this.params, this.order, this.categoryArray)
    },
    
    sortedCategory: function() {
      const array = [this.categoryIds[this.categoryNames.indexOf(this.sortedCategory)]]
      this.fetchSortedProducts(this.params, this.order, array)
    }
  },

  methods: {

    fetchProducts (params: string, order: string): any {
      this.products = []
      this.isFetch = false
      this.params = params
      this.order = order
      const products = [] as any
      const brands = [] as any
      const categoryNames = [] as any
      const categoryIds = [] as any
      const option = order == 'desc' ? 'desc' : 'asc'
      DB.collection('products')
      .orderBy(params, option)
      .limit(100)
      .get()
      .then((querySnapshot) => {
        this.lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
        querySnapshot.forEach((doc) => {
          if (doc.data().times != 0) {
            products.push(doc.data())
            brands.push(doc.data().brand)
            categoryNames.push(doc.data().categoryName)
            categoryIds.push(doc.data().categoryId)
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
        this.categoryNames = Array.from(new Set(categoryNames)).sort()
        this.categoryIds = Array.from(new Set(categoryIds)).sort()
        this.isFetch = true
      })
    },

    fetchSortedProducts (params: string, order: string, ids: any): any {
      this.products = []
      this.isFetch = false
      this.params = params
      this.order = order
      const products = [] as any
      const brands = [] as any
      const option = order == 'desc' ? 'desc' : 'asc'
      DB.collection('products')
      .where('categoryId', 'in', ids)
      .orderBy(params, option)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().times != 0) {
            products.push(doc.data())
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
        this.isFetch = true
      })
    },

    initialize() {
      this.sortedBrands = ''
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
.text-border {
  border-bottom: 1px solid #000000;
}
.text-small{
  font-size: 9px;
}
</style>