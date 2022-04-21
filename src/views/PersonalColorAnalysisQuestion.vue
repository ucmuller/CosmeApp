<template>
  <v-app class="bg-pink">
    <v-container>
      <v-row
        class="px-5 pt-16"
        v-if="currentPage != 8"
      >
        <v-col
          cols="12"
          class="text-center pt-0"
        >
          <div
            class="text-h6 font-weight-bold"
          >
            Q.{{currentPage}}/7
          </div>
          <div
            class="text-h6 font-weight-bold"
          >
            {{qestions[currentPage-1]}}
          </div>
        </v-col>
        <v-col
          cols="6"
          class="text-center"
          v-for="(item, index) in answers[currentPage-1].text"
          :key="index"
        >
          <div
            v-if="currentPage != 3 && currentPage != 6"
            class="card-border"
            @click="selectAnswer(answers[currentPage-1].value[index])"
          >
            <p
              class="mt-2 mb-0 pb-0 text-caption font-weight-bold"
              style="white-space:pre-line; word-wrap:break-word;"
            >
              {{item}}
            </p>
            <v-img
              class="my-2 px-3"
              :src='answers[currentPage-1].answersImage[index]'
              cover
            >
            </v-img>
          </div>
          <div
            v-if="currentPage == 3 || currentPage == 6"
            class="card-border-no-image"
            @click="selectAnswer(answers[currentPage-1].value[index])"
          >
            <p
              class="mt-0 mb-0 pb-0 text-caption font-weight-bold"
            >
              {{item}}
            </p>
          </div>
        </v-col>
        <v-col
          cols="12"
          class="text-center pt-5"
          v-if="currentPage > 1"
        >
          <p
            class="ma-0 text-caption text-pink"
            @click="gotoPrevious()"
          >
            <v-icon
              color="#E2526E"
              small
            >
              mdi-chevron-left
            </v-icon>
            一つ前の質問に戻る
          </p>
        </v-col>
      </v-row>
      <v-row
        class="px-5 pt-16"
        v-if="currentPage == 8"
      >
        <v-col
          cols="12"
          class="text-center pt-5"
        >
          <div
            class="text-h6 pb-5 font-weight-bold"
          >
            診断中...
          </div>
          <v-progress-circular
            :size="70"
            color="#E2526E"
            indeterminate
          ></v-progress-circular>
        </v-col>
        </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import { DB } from '@/firebase/db'
import firebase from 'firebase'

export default Vue.extend({
  name: 'PersonalcolorAnalysisQuestion',

  data: () => ({
    currentPage: 1,
    currentQuestion: "",
    result: [0, 0, 0, 0],
    currentResult: [] as any,
    qestions: [
      '髪の毛（地毛）に近い色は？',
      '瞳の色に近いのは？',
      '日焼けすると肌色は？',
      'もっともなじむアクセサリーは？',
      '友達からほめられる服の色は？',
      '雰囲気（イメージ）に近いのは？',
      '友達から褒められるリップカラーは？'
    ],
    answers: [
      {
        text: [
          'ブラック',
          'ブラウン',
          'ダークブラウン'
        ],
        value: [
          [0, 1, 0, 1],
          [1, 0, 1, 0],
          [0, 0, 0, 0]
        ],
        answersImage:[
          require('@/assets/images/answersImage/hair_black.png'),
          require('@/assets/images/answersImage/hair_lightBrown.png'),
          require('@/assets/images/answersImage/hair_brown.png')
        ],
      },
      {
        text: [
          'ブラック',
          'ブラウン',
          'ダークブラウン'
        ],
        value: [
          [0, 1, 0, 1],
          [1, 0, 1, 0],
          [0, 0, 0, 0]
        ],
        answersImage:[
          require('@/assets/images/answersImage/eye_black.png'),
          require('@/assets/images/answersImage/eye_lightBrown.png'),
          require('@/assets/images/answersImage/eye_brown.png')
        ],
      },
      {
        text: [
          `日焼けしやすく、
          小麦色になる`,
          '赤くなって元に戻る'
        ],
        value: [
          [0, 1, 0, 1],
          [1, 0, 1, 0]
        ],
        answersImage:[
          require('@/assets/images/answersImage/hair_black.png'),
          require('@/assets/images/answersImage/hair_lightBrown.png'),
        ],
      },
      {
        text: [
          `キラキラ輝きのある
          イエローゴールド`,
          `光沢控えめのシルバー、
          ピンクゴールド`,
          `黄身のゴールドや
          ブロンズ`,
          `キラキラと煌く
          プラチナ・シルバー`
        ],
        value: [
          [1.1, 0, 0, 0],
          [0, 1.1, 0, 0],
          [0, 0, 1.1, 0],
          [0, 0, 0, 1.1]
        ],
        answersImage:[
          require('@/assets/images/answersImage/accessories_4.png'),
          require('@/assets/images/answersImage/accessories_2.png'),
          require('@/assets/images/answersImage/accessories_3.png'),
          require('@/assets/images/answersImage/accessories_1.png')
        ],
      },
      {
        text: [
          `鮮やかで明るい
          ビタミンカラー`,
          `淡く優しい
          パステルカラー`,
          `深みのある
          アースカラー`,
          `コントラストの強い
          ビビットカラー`
        ],
        value: [
          [1.2, 0, 0, 0],
          [0, 1.2, 0, 0],
          [0, 0, 1.2, 0],
          [0, 0, 0, 1.2]
        ],
        answersImage:[
          require('@/assets/images/answersImage/color_spring_clothes_square.png'),
          require('@/assets/images/answersImage/color_summer_clothes_square.png'),
          require('@/assets/images/answersImage/color_autumn_clothes_square.png'),
          require('@/assets/images/answersImage/color_winter_clothes_square.png')
        ],
      },
      {
        text: [
          'キュート・かわいい・元気',
          'エレガント・やさしい・上品',
          'ナチュラル・落ち着いてる・大人っぽい',
          'クール・華やか・印象的・モダン'
        ],
        value: [
          [1.4, 0, 0, 0],
          [0, 1.4, 0, 0],
          [0, 0, 1.4, 0],
          [0, 0, 0, 1.4]
        ],
        answersImage:[
          require('@/assets/images/answersImage/hair_black.png'),
          require('@/assets/images/answersImage/hair_lightBrown.png'),
          require('@/assets/images/answersImage/hair_brown.png'),
          require('@/assets/images/answersImage/hair_brown.png')
        ],
      },
      {
        text: [
          'オレンジ系',
          'ピンク系'
        ],
        value: [
          [1, 0, 1, 0],
          [0, 1, 0, 1]
        ],
        answersImage:[
          require('@/assets/images/answersImage/lip_orange.png'),
          require('@/assets/images/answersImage/lip_pink.png'),
        ],
      }
    ]
  }),

  methods: {
    selectAnswer(value: any){
      this.currentPage++
      if(this.currentPage != 8){
        this.currentResult.push(value)
      }
      if(this.currentPage == 8){
        this.currentResult.push(value)
        setTimeout(() => {
          this.gotoResult()
        }, 3000)
      }

    },
    
    gotoPrevious() {
      this.currentPage--
      this.currentResult.pop()
    },
    
    gotoResult() {
      this.currentResult.forEach((e: any) =>{
        this.result[0] += e[0]
        this.result[1] += e[1]
        this.result[2] += e[2]
        this.result[3] += e[3]
      })

      const max = this.result.reduce(function(a,b){
        return Math.max(a,b)
      })

      const index = this.result.indexOf(max)
      this.pushToResultPage(index)
    },

    pushToResultPage(v: number) {
      if(v == 0){
        this.$router.push({ name: 'PersonalColorResultSpring', params: {from: "question"}})
      }
      if(v == 1){
        this.$router.push({ name: 'PersonalColorResultSummer', params: {from: "question"}})
      }
      if(v == 2){
        this.$router.push({ name: 'PersonalColorResultAutumn', params: {from: "question"}})
      }
      if(v == 3){
        this.$router.push({ name: 'PersonalColorResultWinter', params: {from: "question"}})
      }
    }

  }
})
</script>

<style scoped>
.wrap{
  color: #333333;
  background-color: #FCF5F4;
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

.card-border-no-image{
  width: 100%;
  border: 1px solid #E2526E;
  border-radius: 4px;
  height: 100px;
  background-color: #FFFFFF;
  text-align: center;
  display: table;
}

.card-border-no-image p{
  white-space:pre-line;
  word-wrap:break-word;
  display: table-cell;
  vertical-align: middle;
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
</style>
