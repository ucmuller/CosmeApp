<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        class="px-0"
      >
        <div class="pa-0 pb-5 mt-0 border">
          <div class="px-2 mb-1 text-h6 font-weight-bold">
            YouTubeコスメランキング
          </div>
          <div class="px-2 text-subtitle-1">
            商品をクリックして気になるコスメ情報をYouTubeで見つけよう！
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        v-for="(category, i) in categories"
        :key="i"
      >
        <div class="py-0 mt-5">
          <div class="py-1 px-3 heading text-h7 font-weight-bold">
            {{category.name}}
          </div>
        </div>
        <v-row>
          <v-col
            cols="4"
            v-for="(product, i) in productArray[i]"
            :key="i"
            class="py-0 mt-5"
          >
            <div @click="routerPush(product.id)">
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
              <div class="pt-0 text-caption">
                {{Number(product.price).toLocaleString()}}円
              </div>
            </div>
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
      categories: [
        {
          name: 'アウトバストリートメント',
          id: 5
        },
        {
          name: 'シャンプー',
          id: 14
        },
        {
          name: 'トリートメント',
          id: 19
        },
        {
          name: 'ヘアパック',
          id: 42
        },
        {
          name: '化粧下地',
          id: 61
        }
      ],
      productArray: [
        [] as any,
        [] as any,
        [] as any,
        [] as any,
        [] as any
      ]
  }),

  created: function () {
    this.fetchProducts(this.categories)
  },

  methods: {
    fetchProducts (categories: any[]): any {
      categories.forEach((e, i)=> {
        DB.collection('products')
        .where('categoryId', '==', e.id)
        .orderBy('times', 'desc')
        .limit(3)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (e.id == 5) {
              this.productArray[i].push(doc.data())
            }
            if (e.id == 14) {
              this.productArray[i].push(doc.data())
            }
            if (e.id == 19) {
              this.productArray[i].push(doc.data())
            }
            if (e.id == 42) {
              this.productArray[i].push(doc.data())
            }
            if (e.id == 61) {
              this.productArray[i].push(doc.data())
            }
          })
        })
      })
    },

    routerPush(v: number) {
      this.$router.push({ name: 'Product', params: { id: v.toString() }})
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
</style>