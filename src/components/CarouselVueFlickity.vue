<template>
  <flickity
    :options="flickityOptions"
  >
    <div
      v-for="(item, index) in handleProducts"
      :key="index"
    >
      <v-card
        class="ma-1 pa-1 text-left"
        width="200"
        outlined
      >
        <v-img
          class="my-2"
          :src='item.imageUrl'
          height="100"
          contain
        >
        </v-img>
        <a
          class="text-subtitle-2 font-weight-bold text-decoration-underline link text-truncate"
          @click="pushToBrandProductPage(item.brandId)"
        >
          {{item.brand}}
        </a>
        <div class="pt-0 ellipsis text-subtitle-2 font-weight-bold text-truncate">
          {{item.name}}
        </div>
        <div
          v-if="item.modelNumber != ''"
          class="pt-0 ellipsis text-subtitle-2 font-weight-bold text-truncate"
        >
          {{item.modelNumber}}
        </div>
        <div
          v-if="item.modelNumber == ''"
          class="pt-0 ellipsis text-subtitle-2 font-weight-bold text-truncate"
        >
        型番: -
        </div>
        <div
          v-if="item.price != 0"
          class="text-caption font-weight-bold"
        >
          参考価格: {{Number(item.price).toLocaleString()}}円
        </div>
        <div
          v-if="item.price == 0"
          class="text-caption font-weight-bold"
        >
          参考価格: - 円
        </div>
        <div class="pt-0 ellipsis text-caption font-weight-bold">
          <v-icon
            small
            color="orange darken-2"
          >
            mdi-star
          </v-icon>
          {{item.review}} ({{item.times}}動画で使用)
        </div>
        <v-btn
          depressed
          class="white--text font-weight-bold my-1"
          block
          color="#19C0C9"
          @click="pushToProduct(item.id)"
        >
          商品レビューを見る
        </v-btn>
      </v-card>
    </div>
  </flickity>
</template>

<script lang="ts">
import Vue from 'vue'
import Flickity from 'vue-flickity-2';
import 'vue-flickity-2/dist/vue-flickity-2.css';


export default Vue.extend({
  name: 'CarouselVueFlickity',

  components: {
    Flickity
  },

  data: () => ({
    flickityOptions: {
      pageDots: true,
      prevNextButtons: false,
      wrapAround: true
    },
  }),

  props: {
    handleProducts: [] as any
  },

  methods: {
    pushToBrandProductPage(v: number): void {
      this.$router.push({ name: 'BrandProduct', params: { id: v.toString() }})
    },
    pushToProduct(v: number) {
      this.$router.push({ name: 'Product', params: { id: v.toString() }})
    },
  }
})
</script>

<style scoped>

.carousel-cell {
  width: 200px;
  height: 150px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border: 2px solid #fff;
  font-size: 30px;
  border-radius: 10px;
  border: 1px solid;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 1px 3px #00000033;
  border: 1px solid #DBDBDB;
  border-radius: 4px;
}

.link{
  color: #19C0C9;
}

</style>

<style>

.v-application ol {
  padding-left: 0px;
}

</style>