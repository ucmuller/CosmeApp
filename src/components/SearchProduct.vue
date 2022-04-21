<template>
  <v-container class="py-0">
    <v-row class="px-0 py-0">
      <v-col
        cols="12"
        class="px-0 py-1"
        v-for="(product, i) in handleProducts"
        :key="i"
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'


export default Vue.extend({
  name: 'SearchProduct',

  props: {
    handleProducts: [] as any
  },

  // data: () => ({
  // }),
  watch: {
    $route (to, from) {
      this.$emit('parentMethod', to.params.id)
    }
  },

  methods: {
    pushProductPage(v: number) {
      this.$router.push({ name: 'Product', params: { id: v.toString() }})
    }
  }
})
</script>