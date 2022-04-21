<template>
  <v-container class="mt-16">
    <v-row v-if="count != categories.length">
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
      v-if="count == categories.length"
    >
      <v-col
        cols="12"
        class="px-0 mt-10"
      >
        <div class="pa-0 pb-5 mt-0 border">
          <div class="px-2 mb-1 text-h6 font-weight-bold">
            YouTubeコスメランキング
          </div>
          <div class="px-2 text-subtitle-2">
            YouTuberに使っているコスメの使用数ランキングです。
          </div>
          <div class="px-2 text-subtitle-2">
            商品をクリックするとYouTuberがそのコスメを使用している時間から再生される動画を用意しています。
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        class="py-0"
        v-for="(category, i) in categories"
        :key="i"
      >
        <div class="py-0 mt-5">
          <div class="py-1 px-3 heading text-h7 font-weight-bold">
            {{category.categoryName}}
          </div>
        </div>
        <v-row>
          <v-col
            cols="4"
            v-for="(product, i) in category.products"
            :key="i"
            class="py-0 mt-5"
          >
            <div @click="routerPush(product.id, 'Product')">
              <v-badge
                left
                overlap
                tile
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
                {{product.manufacture}}
              </div>
              <div class="pt-0 ellipsis text-caption font-weight-bold">
                {{product.name}}
              </div>
              <div
                v-if="product.price != 0"
                class="pt-0 text-caption"
              >
                {{Number(product.price).toLocaleString()}}円
              </div>
            </div>
          </v-col>
          <v-col class="pa-0 text-end">
            <v-btn
              class="mt-1 font-weight-bold border-bottom"
              text
              color="#19C0C9"
              small
              @click="routerPush(category.id, 'ProductList')"
            >
              <span class="under">
                {{category.categoryName}}のランキングを見る
              </span>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { DB } from '@/firebase/db'

export default Vue.extend({
  name: 'RankingList',

  data: () => ({
      count: 0,
      categories: [] as any
  }),

  created: function () {
    this.fetchCategories()
  },

  methods: {
    fetchProducts (): void {
      this.categories.forEach((e: any, i: number)=> {
        const array = [] as any
        DB.collection('products')
        .where('categoryId', '==', e.id)
        .orderBy('times', 'desc')
        .limit(3)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            array.push(doc.data())
          })
          this.$set(this.categories[i], "products", array)
          this.count++
        })
      })
    },

    fetchCategories (): void {
      const array = [] as any
      DB.collection('categories')
      .orderBy('time', 'desc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          array.push(doc.data())
        })
        this.categories = array
      })
      .then(() => {
        this.fetchProducts()
      })
    },

    routerPush(v: number, name: string) {
      this.$router.push({ name: name, params: { id: v.toString() }})
    }

  }
})
</script>

<style scoped>
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
.under {
  text-decoration: underline;
}
</style>