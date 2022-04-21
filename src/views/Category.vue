<template>
  <v-container
    class="mt-16"
  >
    <v-row>
      <v-col
        cols="12"
        class="px-0 mt-10"
      >
        <div class="pa-0 pb-5 mt-0 border">
          <div class="px-2 mb-1 text-h6 font-weight-bold">
            カテゴリー
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        v-for="(largeCategory, i) in largeCategories"
        :key="i"
        class="border pb-3"
      >
        <v-list>
          <v-list-group
            :value="false"
                          color="#19C0C9"
          >
            <template v-slot:activator>
              <v-list-item-title
                class="py-1 px-3 heading text-h7 font-weight-bold"
              >
                {{largeCategory.name}}
              </v-list-item-title>
            </template>
            <template
              v-for="(category, index) in largeCategories[i].categories"
            >
              <v-list-item :key="index+0.1">
                <template>
                  <v-list-item-content class="mt-0 px-5">
                    <v-list-item-title
                      class="font-weight-medium"
                      @click="routerPush(category.id)"
                      v-text="category.categoryName">
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-list-item>
              <v-divider
                :key="index+0.01"
              ></v-divider>
            </template>
          </v-list-group>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang='ts'>

import Vue from 'vue'
import store from '@/store'
import { DB } from '@/firebase/db'

export default Vue.extend({
  name: 'Category',

  data: () => ({
    ready: false,
    largeCategories: [
      {
        name: 'メイクアップ',
        id: "1",
        categories: [] as any
      },
      {
        name: 'ベースメイク',
        id: "2",
        categories: [] as any
      },
      {
        name: 'リップ・グロス',
        id: "3",
        categories: [] as any
      },
      {
        name: 'ヘアケア',
        id: "7",
        categories: [] as any
      },
      {
        name: 'ネイル・ネイルケア',
        id: "4",
        categories: [] as any
      },
      {
        name: 'スキンケア・基礎化粧品',
        id: "5",
        categories: [] as any
      },
      {
        name: 'ボディケア',
        id: "6",
        categories: [] as any
      },
      {
        name: '香水',
        id: "8",
        categories: [] as any
      },
      {
        name: '美容グッズ',
        id: "9",
        categories: [] as any
      }
    ]
  }),

  created: function () {
    this.fetchProducts()
    window.scrollTo({
      top: 0
    })
  },

  methods: {
    fetchProducts (): void {
      this.largeCategories.forEach((largeCategory) => {
        DB.collection('categories')
        .where('largeCategoryId', '==', largeCategory.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            largeCategory.categories.push(doc.data())
          })
        })
      })
    },

    routerPush(v: number) {
      this.$router.push({ name: 'ProductList', params: { id: v.toString() }})
    }
  }
})
</script>

<style scoped>
.heading{
  padding: 1rem 2rem;
  border-left: 2px solid #19C0C9;
}
.border {
  border-bottom: 8px solid #f5f5f5;
}
</style>