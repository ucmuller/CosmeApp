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
            【{{this.$route.params.id}}】タグのついた動画で<br>使用されているコスメ一覧
          </div>
        </div>
      </v-col>
      <v-col
        cols="6"
        class="py-0 px-1"
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
        cols="6"
        class="py-0 px-1"
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
            @click="fetchSortedProducts(tab.params, tab.order, feature)"
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
        <div @click="routerPush(product.productId)">
          <v-badge
            overlap
            :content="i+1"
            color="#19C0C9"
          ></v-badge>
          <v-img
            :src='product.productImageUrl'
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
  name: 'FeatureProduct',

  data: () => ({
    categoryName: '',
    videos: {},
    products: [] as any,
    feature: '',
    brands: [] as any,
    categoryNames: [] as any,
    categoryIds: [] as any,
    sortedBrands: '',
    sortedCategory: '',
    tabColor: '#19C0C9',
    tabSliderColor: '#19C0C9',
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

  computed: {
    categoryArray: function() {
      if (this.$route.params.id == 'skincare') {
        return [7, 26, 27, 28, 30, 31, 62, 68, 72]
      }
      if (this.$route.params.id == 'sunscreenFace') {
        return [67, 28, 61]
      }
      if (this.$route.params.id == 'concealer') {
        return [11]
      }
      if (this.$route.params.id == 'foundation') {
        return [21, 25, 29, 35, 60, 61]
      }
      if (this.$route.params.id == 'blush') {
        return [16, 21, 60]
      }
      if (this.$route.params.id == 'eyeshadow') {
        return [1]
      }
      if (this.$route.params.id == 'mascara') {
        return [51, 52]
      }
      if (this.$route.params.id == 'eyeliner') {
        return [3]
      }
      if (this.$route.params.id == 'eyebrow') {
        return [2]
      }
      if (this.$route.params.id == 'lipGloss') {
        return [58, 59]
      }
      if (this.$route.params.id == 'lipstick') {
        return [57, 58, 59]
      }
      if (this.$route.params.id == 'brushes') {
        return [33]
      }
      if (this.$route.params.id == 'nailPolish') {
        return [55]
      }
      if (this.$route.params.id == 'otherGoods') {
        return [10, 24, 32, 54, 66, 71, 76, 77]
      }
      else {
        return [54]
      }
    }
  },

  mounted: function() {
    this.feature = this.$route.params.id
    this.fetchProducts('times', 'desc', this.$route.params.id)
    this.setCategoryName()
    window.scrollTo({
      top: 0
    })
  },
  
   watch: {
    sortedBrands: function() {
      this.fetchSortedProducts(this.params, this.order, this.$route.params.id)
    },
    
    sortedCategory: function() {
      this.fetchSortedProducts(this.params, this.order, this.$route.params.id)
    }
  },

  methods: {

    fetchProducts (params: string, order: string, tag: string): any {
      this.products = []
      this.isFetch = false
      this.params = params
      this.order = order
      const products = [] as any
      const brands = [] as any
      const categoryNames = [] as any
      const categoryIds = [] as any
      const option = order == 'desc' ? 'desc' : 'asc'
      DB.collection('videos')
      .where("tags", "array-contains", tag )
      .orderBy(params, option)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().times > 1) {
            products.push(doc.data())
            brands.push(doc.data().brand)
            categoryNames.push(doc.data().categoryName)
            categoryIds.push(doc.data().categoryId)
          }
        })
      })
      .then(() => {
        if (this.sortedBrands == ''){
          this.products = [...new Map(products.map((v: any) => [v.productId, v])).values()]
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

    fetchSortedProducts (params: string, order: string, tag: string): any {
      this.products = []
      this.isFetch = false
      this.params = params
      this.order = order
      const products = [] as any
      const brands = [] as any
      const categoryNames = [] as any
      const categoryIds = [] as any
      const option = order == 'desc' ? 'desc' : 'asc'
      DB.collection('videos')
      .where("tags", "array-contains", tag )
      .orderBy(params, option)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (this.sortedCategory == '') {
            if (doc.data().times != 0) {
              products.push(doc.data())
              brands.push(doc.data().brand)
              categoryNames.push(doc.data().categoryName)
              categoryIds.push(doc.data().categoryId)
            }
          }
          if (this.sortedCategory != '') {
            if (doc.data().times != 0 && doc.data().categoryName == this.sortedCategory) {
              products.push(doc.data())
              brands.push(doc.data().brand)
              categoryNames.push(doc.data().categoryName)
              categoryIds.push(doc.data().categoryId)
            }
          }
        })
      })
      .then(() => {
        if (this.sortedBrands == ''){
          this.products = [...new Map(products.map((v: any) => [v.productId, v])).values()]
          this.brands = Array.from(new Set(brands)).sort()
          this.categoryNames = Array.from(new Set(categoryNames)).sort()
          this.categoryIds = Array.from(new Set(categoryIds)).sort()
        }

        if (this.sortedBrands != ''){
          const brandArr = [] as any
          const categoryArray = [] as any
          const categoryIds = [] as any
          const sortedBrandsproducts = products.filter((doc: any) => {
            return (doc.brand === this.sortedBrands)
          })
          this.products = [...new Map(sortedBrandsproducts.map((v: any) => [v.productId, v])).values()]
          sortedBrandsproducts.forEach((doc: any) => {
            brandArr.push(doc.brand)
            categoryArray.push(doc.categoryName)
            categoryIds.push(doc.categoryId)
          })
          this.brands = Array.from(new Set(brandArr)).sort()
          this.categoryNames = Array.from(new Set(categoryArray)).sort()
          this.categoryIds = Array.from(new Set(categoryIds)).sort()
        }
        this.isFetch = true
      })
    },

    setCategoryName() {
      if (this.$route.params.id == 'skincare') {
        this.categoryName = 'スキンケア'
      }
      if (this.$route.params.id == 'sunscreenFace') {
        this.categoryName = 'UVケア'
      }
      if (this.$route.params.id == 'concealer') {
        this.categoryName = 'コンシーラー'
      }
      if (this.$route.params.id == 'foundation') {
        this.categoryName = 'ファンデーション'
      }
      if (this.$route.params.id == 'blush') {
        this.categoryName = 'チーク'
      }
      if (this.$route.params.id == 'eyeshadow') {
        this.categoryName = 'アイシャドウ'
      }
      if (this.$route.params.id == 'mascara') {
        this.categoryName = 'マスカラ'
      }
      if (this.$route.params.id == 'eyeliner') {
        this.categoryName = 'アイライナー'
      }
      if (this.$route.params.id == 'eyebrow') {
        this.categoryName = 'アイブロウ'
      }
      if (this.$route.params.id == 'lipGloss') {
        this.categoryName = 'リップグロス'
      }
      if (this.$route.params.id == 'lipstick') {
        this.categoryName = 'リップ'
      }
      if (this.$route.params.id == 'brushes') {
        this.categoryName = 'ブラシ'
      }
      if (this.$route.params.id == 'nailPolish') {
        this.categoryName = 'マニキュア'
      }
      if (this.$route.params.id == 'otherGoods') {
        this.categoryName = '美容グッズ'
      }
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
</style>