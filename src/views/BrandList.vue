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
            ブランド一覧
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
        cols="12"
        v-for="(item, i) in brands"
        :key="i"
        class="py-0 mt-5"
      >
        <v-list-item
          class="pr-0"
          @click="pushToBrandProductPage(item.id)"
        >
          <v-list-item-content>
            <v-list-item-title>{{item.brandName}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-avatar>
          <v-icon>
            mdi-chevron-right
          </v-icon>
        </v-list-item-avatar>
        </v-list-item>
        <v-divider></v-divider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { DB } from '@/firebase/db'

export default Vue.extend({
  name: 'BrandList',

  data: () => ({
    brands: [] as any,
    isFetch: false
  }),

  created: function() {
    this.fetchBrands()
    window.scrollTo({
      top: 0
    })
  },

  methods: {

    fetchBrands (): any {
      const brands = [] as any
      DB.collection('brands')
      .orderBy('brandName', 'asc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().times != 0) {
            brands.push(doc.data())
          }
        })
      })
      .then(() => {
        this.brands = brands
        this.isFetch = true
      })
    },

    pushToBrandProductPage(v: number): void {
      this.isFetch = false
      this.$router.push({ name: 'BrandProduct', params: { id: v.toString() }})
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