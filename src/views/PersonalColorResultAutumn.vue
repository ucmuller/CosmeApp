<template>
  <v-container class="wrap pt-5 mt-16 px-0 pb-0">
    <v-row
      class="px-0"
    >
      <v-col
        v-if="from"
        cols="12"
        class="px-6 pt-16 text-center"
      >
      <div
        class="text-h6 font-weight-bold"
      >
        あなたのパーソナルカラーは...
      </div>
    </v-col>
      <ResultAutumn
        id="autumn"
        class="px-3"
      />
    </v-row>
    <v-row
      class="px-0"
    >
      <v-col
          cols="12"
          class="px-6 pt-10 text-center"
        >
          <v-btn
            class="font-weight-bold"
            outlined
            x-large
            style="border-width: 2px;"
            block
            height="50"
            color="#E2526E"
            @click="pushToPersonalcolorAnalysis()"
          >
            診断TOPへ戻る
          </v-btn>
          <div
            class="pt-10 text-h7 font-weight-bold"
          >
            他のタイプの結果を見る
          </div>
      </v-col>
      <v-row
        class="px-6 pt-1 pb-10"
      >
        <v-col
          cols="6"
          class="px-0 pt-0 text-center"
          v-for="(item, index) in personelColorItems"
          :key="index"
        >
          <div
            :class="item.cardClass"
            @click="scrollToSection(item.id)"
          >
            <p
              :class="item.textClass"
            >
              {{item.name}}
            </p>
            <p
              class="ma-0 font-weight-bold button-sub-text-color text-caption"
            >
              {{item.base}}
            </p>
            <v-icon
              color="#E2526E"
            >
              mdi-chevron-down
            </v-icon>
          </div>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
// import CarouselImage from '@/components/CarouselImage.vue'
import store from '@/store'
import { DB } from '@/firebase/db'
import firebase from 'firebase'
import ResultAutumn from '@/components/ResultAutumn.vue'

export default Vue.extend({
  name: 'PersonalColorResultAutumn',

  components: {
    ResultAutumn
  },

  props:['from'],

  data: () => ({
    topBannerimage: require('@/assets/images/mv.jpg'),
    personelColorItems: [
      {
        name: '# 春タイプ',
        id: 'spring',
        base: 'Yelow base',
        cardClass: 'pt-5 ml-2 mr-1 card-border',
        textClass: 'text-h7 font-weight-bold text-spring mb-0'
      },
      {
        name: '# 夏タイプ',
        id: 'summer',
        base: 'Blue base',
        cardClass: 'pt-5 ml-1 mr-2 card-border',
        textClass: 'text-h7 font-weight-bold text-summer mb-0'
      },
      {
        name: '# 秋タイプ',
        id: 'autumn',
        base: 'Yelow base',
        cardClass: 'pt-5 ml-2 mr-1 card-border',
        textClass: 'text-h7 font-weight-bold text-autumn mb-0'
      },
      {
        name: '# 冬タイプ',
        id: 'winter',
        base: 'Blue base',
        cardClass: 'pt-5 ml-1 mr-2 card-border',
        textClass: 'text-h7 font-weight-bold text-winter mb-0'
      }
    ]
  }),

  methods: {

    scrollToSection(id: string) {
      if(id == 'autumn'){
        const element: any = document.getElementById(id)
        element.scrollIntoView({
          behavior: 'smooth'
        })
      }
      if(id == 'spring'){
        this.$router.push({ name: 'PersonalColorResultSpring'})
      }
      if(id == 'summer'){
        this.$router.push({ name: 'PersonalColorResultSummer'})
      }
      if(id == 'winter'){
        this.$router.push({ name: 'PersonalColorResultWinter'})
      }
    },
 
    openWindow (url: string) {
      window.open(url, '_blank', 'width=1024,height=768,scrollbars=yes,resizable=yes')
    },

    pushToPersonalcolorAnalysis() {
      this.$router.push({ name: 'PersonalColorAnalysis'})
    },

    pushToChannelPage(v: number): void {
      this.$router.push({ name: 'YoutubersProduct', params: { id: v.toString() }})
    },

    pushToProductPage(v: number): void {
      this.$router.push({ name: 'Product', params: { id: v.toString() }})
    },

    pushToSortedProductPage(v: string): void {
      this.$router.push({ name: 'SortedProductList', params: { id: v }})
    },

    pushToFeatureProduct(v: string): void {
      this.$router.push({ name: 'FeatureProduct', params: { id: v }})
    },

    pushToVideoPage(v: number): void {
      this.$router.push({ name: 'VideoProduct', params: { id: v.toString() }})
    },

    pushToBrandProductPage(v: number): void {
      this.$router.push({ name: 'BrandProduct', params: { id: v.toString() }})
    },

    pushToOtherPage(name: string): void {
      this.$router.push({ name: name })
    },

    pushToSortedChannelList(tag: string) {
      this.$router.push({
        name: 'SortedChannelList',
        params: {
          tag: tag
        }
      })
    }
  }
})
</script>

<style scoped>
.wrap{
  color: #333333;
}
.br::before {
  content: "\A" ;
  white-space: pre ;
}
.mv-btn {
  position: absolute;
  top: 90%;
  left: 50%;
  -ms-transform: translate(-50%,-50%);
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  margin:0;
  padding:0;
  width: 100%;
}
.under-line {
  text-decoration: underline;
  text-decoration-color: #FDE52C;
  text-decoration-thickness: 3px;
}

.sub-text-color{
  font-family: Montserrat;
  font-weight: bold;
  letter-spacing: 0px;
  color: #E2526E;
  opacity: 1;
}

.bg-pink{
  background-color: #FCF5F4;
}

.description-text{
  font: normal normal normal 14px/24px Roboto;
  opacity: 1;
}

.card-border{
  border: 1px solid #E2526E;
  border-radius: 4px;
  background-color: #FFFFFF;
}

.button-sub-text-color{
  font-family: Montserrat;
  letter-spacing: 0px;
  color: #808080;
  opacity: 1;
}

.link{
  color: #2A5FA6;
}

.text-pink{
  color: #E2526E;
}

.text-spring{
  color: #E8565C;
}

.text-summer{
  color: #7761F0;
}

.text-autumn{
  color: #C43D0B;
}

.text-winter{
  color: #CB0085;
}

.button-bottom{
  height: 50px;
  width: 50px;
  position:fixed;
  right:10px;
  bottom:10px;
  text-align: center;
  border: 1px solid #C43D0B;
  border-radius: 10%;
  background-color: #FFFFFF;
  display: table;
}

.button-bottom p{
  white-space:pre-line;
  word-wrap:break-word;
  display: table-cell;
  vertical-align: middle;
  font-size: 10px;
}
</style>
