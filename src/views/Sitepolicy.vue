<template>
<v-container class="pt-0 mt-16 px-2">
  <v-row>
    <v-col
      cols="12"
      class="px-3 mt-15"
    >
      <div class="text-h5 mb-5 font-weight-bold">サイトポリシー</div>
      <div class="text-h7 mb-2 font-weight-bold">
            はじめに
          </div>
      <p class="text">
        サイトポリシーは、サイトの利用規約やプライバシーポリシーとは別に、「Cramel（クラメル）」の利用者、またクリエイターの方々に信頼頂くための約束事、宣言となります。
        「Cramel（クラメル）」の閲覧・利用においては、利用規約やプライバシーポリシーが別途ありますので、そちらをご確認くださいますようお願いいたします。 なお、下記内容につきましては予告なく変更させていただく場合がありますので、あらかじめご了承ください
      </p>
    </v-col>
    <v-col
      cols="12"
      class="px-1 pt-0"
    >
      <v-expansion-panels
        class="px-0"
        v-model="panel"
        multiple
        flat
      >
      <v-expansion-panel
        class="px-0"
        v-for="(item,i) in items"
        :key="i"
      >
        <v-expansion-panel-header
          class="px-3 py-0"
        >
          <div class="text-h7 mb-2 font-weight-bold">
            {{i+1}}.{{item.title}}
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content
          class="px-0"
        >
          <div class="text" v-html="item.text">
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</v-container>
</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
  name: 'Sitepolicy',

  data: () => ({
      panel: [0, 1],
      items: [
        {
          title: 'サービス内のコンテンツ引用について',
          text: `当サービスに掲載しているYouTube動画コンテンツ・画像等は、YouTubeの利用規約を遵守しYouTubeからライセンス付与された上でYouTube Data APIにより収集され、当サイト上で表示・再生されるものです。
                  当サービス内のYouTubeコンテンツへのご不明点に関してはYouTubeの利用規約の閲覧をお願い致します。
                  また、当サイトに掲載されている動画で、他メディアへの埋め込みを制限したいクリエイターは、YouTube Studioのコンテンツマネージャより埋め込み設定の変更が可能です。詳細は<a href="https://support.google.com/youtube#topic=9257498" target=”_blank”>YouTubeヘルプ</a>よりご参照ください。`
        },
        {
          title: 'クリエイターの皆様へ',
          text: ` 過去動画を、動画以上の資産へ転換するのがクラメルの役割です。YouTube内ではあまりサジェストされづらい過去の動画を当サイト内の掲載コスメをもとに当サイト内でサジェストし再生回数増加を促します。現在は、フォロワー数や動画再生回数で評価されてしまっている実情がありますが、クラメルではコンテンツの質でその距離を縮められるような場にしていきたいと考えております。`
        },
        {
          title: '公式クリエイターについて',
          text: `当サービスではYouTube Data APIを利用して掲載しているコンテンツの他に、「公式クリエイター」のみ掲載できる下記の様な独自コンテンツの準備をしています。

                  ・公式クリエイターページを作成し、他プラットフォームへのリンクの設置
                  ・公式クリエイターご自身が管理する購買リンクやプロデュースブランドの販売リンク設置
                  ・公式クリエイター毎の特集や専用コンテンツの作成
                  
                  現在準備中のため、公式クリエイターへの申請については<a href="https://docs.google.com/forms/d/e/1FAIpQLScG_Ci2zP3Fj5adp5u8gF0RMK8oP0HkkNMLthAW3X5GAyT_1w/viewform?usp=sf_link" target=”_blank”>事前申請フォーム</a>をご用意しております。`
        },
        {
          title: '公式クリエイターのメリットについて',
          text: `・クラメル内にご自身の販売先やアフィリエイトリンクを設置し、その場合の手数料は当サービスでは一切かかりません。
                ・当サービス内で発生した収益は当サービスのシステム上で公正に集計しクリエイターに還元致します。
                  ・動画コンテンツの整理やクリエイター側に用意していただいた商品リンク等の設置もすべて当サービスの担当者が行います。
                  ・YouTubeをあまり視聴していない層に向けて掲載コスメを軸としたコンテンツを発信し、該当コスメを紹介している動画の視聴を促します。`
        },
        {
          title: '公式クリエイター申請方法',
          text: `公式クリエイターへの申請については<a href="https://docs.google.com/forms/d/e/1FAIpQLScG_Ci2zP3Fj5adp5u8gF0RMK8oP0HkkNMLthAW3X5GAyT_1w/viewform?usp=sf_link" target=”_blank”>こちらの事前申請フォーム</a>からお願い致します。`
        },
        {
          title: 'Cramel（クラメル）の由来',
          text: `Cram: 詰め込む[英語]＋mel: 蜜[ラテン語]
          の意味をもつ造語です。「良質な知識が詰め込まれてる場」という想いを込めてCramelです。
          `
        },

      ]
    }),

    methods: {
    routerPush(view: string): void {
      this.$router.push({ name: view })
    }
  }
})
</script>

<style scoped>
.text{
  font-size: 14px;
  white-space:pre-line;
  word-wrap:break-word;
}

</style>