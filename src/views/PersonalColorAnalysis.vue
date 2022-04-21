<template>
  <v-container class="wrap pt-0 mt-16 px-0 pb-0">
    <v-row
      class="px-0"
    >
      <v-col
        cols="12"
        class="px-3 mt-7 pb-0 text-center"
      >
        <v-img
          :src="topBannerimage"
          :aspect-ratio="25/29"
        >
          <div class="mv-btn font-weight-bold px-3">
            <v-btn
              class="font-weight-bold"
              outlined
              x-large
              style="border-width: 2px;"
              block
              height="50"
              color="#E2526E"
              @click="pushToPersonalcolorAnalysisQuestion()"
            >
              診断する
            </v-btn>
          </div>
        </v-img>
      </v-col>
      <v-col
        cols="12"
        class="px-6 pt-10 pb-5 text-center bg-pink"
      >
        <div
          class="text-h6 font-weight-bold under-line"
        >
          # パーソナルカラーって？
        </div>
        <p
          class="ma-0 sub-text-color text-caption"
        >
          What's Personal Color?
        </p>
        <p
          class="py-4 ma-0 text-left description-text"
        >
          パーソナルカラーとは、人それぞれがもつボディカラー「髪の色、瞳の色、肌の色」などとうまく調和のとれる色(＝似合う色)の事です。
          <br>
          色相をもとに「イエローベース・ブルーベース」に分類され、明度・彩度・清濁をもとに「春・夏・秋・冬」の4つのグループに分類されています。
          <br>
          これをもとに似合いやすい色をみつけることで自分の求める印象や好感度の印象を作りやすくなります。
        </p>
        <v-btn
          class="font-weight-bold"
          outlined
          x-large
          style="border-width: 2px;"
          block
          height="50"
          color="#E2526E"
          @click="pushToPersonalcolorAnalysisQuestion()"
        >
          診断する
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        class="px-6 pt-5 pb-10 text-center bg-pink"
      >
        <p
          class="ma-0 text-caption font-weight-bold"
        >
          \ おすすめアイテムも分かる！ /
        </p>
        <div
          class="text-h6 font-weight-bold under-line"
        >
          # 4つのカラータイプ
        </div>
        <p
          class="ma-0 sub-text-color text-caption"
        >
          Color Type
        </p>
        <v-row
          class="px-0 pt-5"
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
      </v-col>
      <!-- 春タイプ -->
      <ResultSpring
        id="spring"
        class="px-3"
      />
      <ResultSummer
        id="summer"
        class="px-3"
      />
      <ResultAutumn
        id="autumn"
        class="px-3"
      />
      <ResultWinter
        id="winter"
        class="px-3"
      />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
// import CarouselImage from '@/components/CarouselImage.vue'
import store from '@/store'
import { DB } from '@/firebase/db'
import firebase from 'firebase'
import ResultSpring from '@/components/ResultSpring.vue'
import ResultSummer from '@/components/ResultSummer.vue'
import ResultAutumn from '@/components/ResultAutumn.vue'
import ResultWinter from '@/components/ResultWinter.vue'

export default Vue.extend({
  name: 'PersonalColorAnalysis',

  components: {
    ResultSpring,
    ResultSummer,
    ResultAutumn,
    ResultWinter
  },

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

  created: function() {
    window.scrollTo({
      top: 0
    })
  },

  methods: {

    scrollToSection(id: string) {
      const element: any = document.getElementById(id)
      element.scrollIntoView({
        behavior: 'smooth'
      })
    },

    pushToPersonalcolorAnalysisQuestion() {
      this.$router.push({ name: 'PersonalColorAnalysisQuestion'})
    },
 
    openWindow (url: string) {
      window.open(url, '_blank', 'width=1024,height=768,scrollbars=yes,resizable=yes')
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
</style>
