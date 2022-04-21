<template>
  <v-container
    class="mt-14"
  >
    <v-row>
      <v-col
        cols="12"
        class="px-0 pb-0 mt-10"
      >
        <v-card
          class="mx-auto"
          tile
          flat
        >
          <v-img
            v-if="userInfo.bannerExternalUrl"
            height="100px"
            :src="userInfo.bannerExternalUrl"
          >
          </v-img>
          <v-row
            class="fill-height"
            align="center"
          >
            <v-col
              class="pl-7 pb-0 text-center"
              cols="3"
            >
              <v-avatar
                v-if="userInfo.thumbnail != ''"
                class="profile"
                size="80"
              >
                <v-img
                  :src="userInfo.thumbnail"
                ></v-img>
              </v-avatar>
              <v-avatar
                v-if="userInfo.thumbnail == ''"
                class="profile"
                size="80"
                color="#19C0C9"
              >
                <v-icon size="60">
                  mdi-account-outline
                </v-icon>
              </v-avatar>
            </v-col>
            <v-col class="pa-0" cols="9">
              <v-list
                three-line
              >
                <v-list-item
                  color="rgba(0, 0, 0, .4)"
                >
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      {{userInfo.name}}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{userInfo.selfIntroduction}}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col class="py-0 text-right" cols="12">
        <v-icon class="px-1" @click="shareSheet = true">mdi-export-variant</v-icon>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        class="px-0 mt-0 pt-0"
      >
        <div class="pa-0 pb-5 mt-0 border">
          <div class="px-2 mb-1 text-h6 font-weight-bold">
            {{userInfo.name}}さんのコスメポーチ
          </div>
        </div>
      </v-col>
      <v-col
        v-if="products.length == 0"
        cols="12"
        class="mt-0 text-center"
      >
        <p class="mt-0 text-left text-subtitle-2">
          各コスメページに用意されている「追加ボタン」をタップして、あなたのお気に入りコスメを増やしましょう！
        </p>
        <v-icon
          color="#d3d3d3"
          size="150"
          @click="pushToRankingList()"
        >
          mdi-plus-circle-outline
        </v-icon>
      </v-col>
      <v-col
        cols="4"
        v-for="(product, i) in products"
        :key="i"
        class="pb-5 mt-0"
      >
        <div @click="pushToProduct(product.id)">
          <div class="pt-0 mb-3 text-caption font-weight-bold text-center text-truncate text-border">
            {{product.categoryName}}
          </div>
          <v-img
            :src='product.imageUrl'
            height="100"
            contain
          >
          </v-img>
          <div class="pt-3 ellipsis text-caption">
            {{product.brand}}
          </div>
          <div class="pt-0 ellipsis text-caption">
            {{product.modelNumber}}
          </div>
        </div>
      </v-col>
    </v-row>
    <template>
      <div class="text-center">
        <v-bottom-sheet v-model="shareSheet">
          <v-list>
            <v-subheader>シェア</v-subheader>
            <v-list-item
              v-for="tile in tiles"
              :key="tile.title"
              @click="shareURL(tile.name)"
            >
              <v-icon large :color="tile.color">
                {{tile.icon}}
              </v-icon>
              <v-list-item-title>{{ tile.title }}</v-list-item-title>
            </v-list-item>
            <v-subheader class="display-none" id="copy-text-pouch">{{this.formattedTitle}}</v-subheader>
          </v-list>
        </v-bottom-sheet>
      </div>
    </template>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { DB } from '@/firebase/db'
import firebase from 'firebase'
import { Auth } from '@/firebase/auth'
// import axios from 'axios'

export default Vue.extend({
  name: 'UsersProduct',

  data: () => ({
    categoryName: '',
    productIdArray: [] as any,
    products: [] as any,
    userInfo: {},
    existsProduct: true,
    shareSheet: false,
    userCosmePage: 'https://cramel.jp',
    tiles: [
      {
        name: 'twitter',
        icon: 'mdi-twitter',
        title: 'コスメポーチをTwitterでシェア',
        color:'#00acee'
      },
      {
        name: 'line',
        icon: 'mdi-chat ',
        title: 'コスメポーチをLINEでシェア',
        color:'#00B900'
      },
      {
        name: 'copy',
        icon: 'mdi-content-copy',
        title: 'コスメポーチのURLをコピー',
        color:'grey'
      },
    ]
  }),

  computed: {
    formattedTitle(): string {
      return `${this.userCosmePage}${this.$route.path}`
    }
  },
  
  created: function() {
    this.existsRouteId()
    window.scrollTo({
      top: 0
    })
  },

  methods: {

    existsRouteId(): void {
      if (this.$route.params.id) {
        this.fetchUserData(this.$route.params.id)
      } else {
        this.pushSignin()
      }
    },

    fetchUserData (v: string): void {
      DB.collection('cosmePouch')
        .doc(v)
        .get()
        .then((doc) => {
          const data = doc.data() as any
          this.userInfo = data
          this.productIdArray = data.products
        })
        .then(() => {
        this.fetchProducts()
      })
    },

    fetchProducts (): void {
      this.productIdArray.forEach((v: number) => {
        DB.collection('products')
        .doc(String(v))
        .get()
        .then((doc) => {
          this.products.push(doc.data())
          this.products.sort((a: any, b: any) => {
            if (a.sortId < b.sortId) {
              return -1
            } else {
              return 1
            }
          })
        })
      })
    },

    signout(): void {
      Auth.signOut()
    },

    pushSignin(): void {
      this.$router.push({ name: 'Signin' })
    },

    pushToProduct(v: number): void {
      this.$router.push({ name: 'Product', params: { id: v.toString() }})
    },

    pushToRankingList(v: number): void {
      this.$router.push({ name: 'RankingList' })
    },

    shareURL(button: string) {
      if (button == 'twitter') {
        this.shareByTwitter(name)
      }
      if (button == 'line') {
        this.shareByLine(name)
      }
      if (button == 'copy') {
         this.copyTexts()
      }
      this.shareSheet = false
    },

    shareByTwitter(name: string) {
      const url = `https://twitter.com/intent/tweet?text=クラメルで${name}さんのコスメポーチをみてみよう！%20%23クラメル&url=${this.userCosmePage}${this.$route.path}`
      window.open(url, '_blank', 'width=1024,height=768,scrollbars=yes,resizable=yes')
    },

    shareByLine(name: string) {
      const url = `http://line.me/R/msg/text/?クラメルで${name}さんのコスメポーチをみてみよう！${this.userCosmePage}${this.$route.path}`
      window.open(url, '_blank', 'width=1024,height=768,scrollbars=yes,resizable=yes')
    },

    copyTexts(): void {
      if (this.isIOS()) {
        const doc: HTMLInputElement = document.getElementById(
          "copy-text-pouch"
        ) as HTMLInputElement;
        const selected = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(doc);
        selected!.removeAllRanges();
        selected!.addRange(range);
        document.execCommand("copy");
      } else {
        const formattedText = `${this.formattedTitle}`;
        navigator.clipboard.writeText(formattedText);
      }
      alert(`URLをクリップボードにコピーしました。`)
    },

    isIOS() {
      const agent = window.navigator.userAgent;
      return agent.indexOf("iPhone") != -1 || agent.indexOf("iPad") != -1 || agent.indexOf("Mac") != -1;
    },
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
.display-none{
  color: #00000000;
  height: 1px;
}
</style>