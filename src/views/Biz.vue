<template>
  <v-container fluid class="pt-16 px-0">
    <v-app-bar
      app
      flat
      fixed
      color="rgba(255, 255, 255, 0.4)"
    >
      <div class="d-flex align-center">
        <div class="my-2" @click="routerPush('Top')">
          <v-img
            :src="require('@/assets/images/cramel_logo.png')"
            max-width="150"
            contain
          ></v-img>
        </div>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-row
      class="mx-2"
      no-gutters
      justify="center"
      align="center"
    >
      <v-col
        cols="5"
        class="text-left"
      >
      <div
        class="fv-section"
      >
        <div
          class="fv-title font-weight-bold"
        >
          {{fvTitle}}
        </div>
        <div
          class="pt-8 fv-subtitle font-weight-bold"
        >
          {{fvSubTitle}}
        </div>

        <div
          class="pt-3 fv-description font-weight-bold"
        >
          {{fvDescription}}
        </div>
        <button
          class="mt-8 font-weight-bold button-green"
        >
          公式クリエイター申請をする
        </button>
        </div>
      </v-col>
      <v-col
        cols="7"
      >
        <v-img
          src="https://firebasestorage.googleapis.com/v0/b/cramel-74866.appspot.com/o/lp%2Fmain_sm.jpg?alt=media&token=f1a4daa6-a8bc-4e08-93c6-289c37a48313"
          height="100%"
        ></v-img>
      </v-col>
    </v-row>

    <v-row
      class="mx-2 py-16 bg-blue"
      no-gutters
      justify="center"
      align="center"
    >
      <v-col
        cols="12"
        class="text-center mb-14"
      >
        <div
          class="pb-5 text-h6 font-weight-bold text-green"
        >
          cramel(クラメル)とは？
        </div>
        <div
          class="text-h6 font-weight-bold text-black"
        >
          インフルエンサーが本当に使うベスコスがまとまっているレビューサイト
        </div>
      </v-col>
      <v-col
        class="card-section"
      >
        <div
          v-for="(card, i) in descriptionCards"
          :key="i"
          class="mx-5 card text-center"
          outlined
          tile
        >
          <v-img
            class="ma-3"
            :src="card.image"
            aspect-ratio="1"
            height="70"
            contain
          >
          </v-img>
          <div
            class="mb-3 text-h7 font-weight-bold text-black"
          >
            {{card.title}}
          </div>
          <div
            class="mb-3 text-small font-weight-bold text-black"
          >
            {{card.label}}
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row
      class="mx-2 py-16"
      no-gutters
      justify="center"
      align="center"
    >
      <v-col
        cols="12"
        class="text-center mb-14"
      >
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Top',


  data: () => ({
    fvTitle: `インフルエンサーが
              本当に使うものだけ`,
    fvSubTitle: `クラメル公式クリエイターのご提案`,
    fvDescription: `YouTubeのUSEDコンテンツをフル活用
                    過去動画の資産化を支援します。`,
    descriptionCards: [
      {
        image: 'https://firebasestorage.googleapis.com/v0/b/cramel-74866.appspot.com/o/lp%2Fsearch.png?alt=media&token=d3491d8c-f7b1-4d66-b65b-0845f313c572',
        title: '見つかる',
        label: `商品名やカテゴリ名で
                検索できる逆引き検索が便利`
      },
      {
        image: 'https://firebasestorage.googleapis.com/v0/b/cramel-74866.appspot.com/o/lp%2Fheart.png?alt=media&token=46aa982b-c47c-4121-90fe-98dbaa96c3b7',
        title: '信頼できる',
        label: `動画で利用を確認が出来るため
                ステマなどの心配は不要`
      },
      {
        image: 'https://firebasestorage.googleapis.com/v0/b/cramel-74866.appspot.com/o/lp%2Fyoutube.png?alt=media&token=485b331e-3022-4175-8472-697656076930',
        title: '短縮視聴できる',
        label: `紹介秒数から視聴出来るため
                時間が無い方も視聴可能`
      },
    ]

  }),
})
</script>

<style scoped>
.header {
  background-color: #FFFFFF;
  opacity: 0.4;
}
.fv-section {
  width: 80%;
  margin: auto;
}
.fv-title{
  font-size: 40px;
  color: #333333;
  white-space: pre-line;
  word-wrap: break-word;
  line-height: 70px;
}
.fv-subtitle{
  font-size: 23px;
  color: #00A0A8;
}
.fv-description{
  font-size: 18px;
  color: #333333;
  white-space: pre-line;
  word-wrap: break-word;
}
.button-green {
  background-color: #00A0A8;
  opacity: 1;
  color: #FFFFFF;
  width: 300px;
  height: 40px;
  font-size: 16px;
  border: 2px solid #00A0A8;
  border-radius: 6px;
}
.button-green:hover {
  background: #FFFFFF;
  color: #00A0A8;
}
.bg-blue {
  background-color: rgba(25, 192, 201, 0.06);
}
.text-green {
  color: #00A0A8;
}
.text-black {
  color: #333333;
}
.card-section{
  display: flex;
  justify-content: center;
  margin: auto;
  width: 100%;
}
.card{
  background: #FFFFFF;
  color: #333333;
  width: 180px;
  border: 1px solid #00A0A8;
  border-radius: 4px;
}
.text-small{
  font-size: 12px;
  white-space: pre-line;
  word-wrap: break-word;
}
</style>