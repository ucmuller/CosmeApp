<template>
  <v-container
    class="mt-14"
  >
    <v-row>
      <v-col
        cols="12"
        class="px-0 py-0 pb-0 mt-10"
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
              class="pl-7 py-0 text-center"
              cols="3"
            >
              <v-avatar
                class="profile"
                size="80"
              >
                <v-icon size="60">
                  mdi-account-circle-outline
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
        <v-icon class="px-1" @click="dialog = true">mdi-dots-vertical-circle-outline</v-icon>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        class="px-0 mt-0 pt-0"
      >
        <div class="pa-0 pb-0 mt-0 border">
          <div class="px-2 mb-1 text-h7 font-weight-bold">
            コスメポーチ
          </div>
        </div>
      </v-col>
      <v-col
        v-if="products.length == 0"
        cols="12"
        class="mt-0 text-center"
      >
        <p class="mt-0 text-left text-subtitle-2">
          自分のお気に入りコスメを登録すると、コスメの新作情報や類似商品のお得情報が手に入るよ！
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
        v-if="products.length != 0"
        cols="12"
        class="ma-0 py-0 text-right"
      >
        <v-btn
          v-if="!isEdit"
          x-small
          @click="editCosmePouch()"
        >
        編集
        </v-btn>
        <v-btn
          v-if="isEdit"
          x-small
          @click="editCosmePouch()"
        >
        完了
        </v-btn>
      </v-col>
      <v-col
        cols="4"
        v-for="(product, i) in products"
        :key="i"
        class="pb-5 pt-0 mt-0"
      >
        <div
          v-if="isEdit"
          class="text-right"
        >
          <v-icon
           small
           @click="updateCosmePouch(product.id)"
          >
            mdi-close-circle
          </v-icon>
        </div>
        <div>
          <div class="pt-0 mb-3 text-caption font-weight-bold text-center text-truncate text-border">
            {{product.categoryName}}
          </div>
          <v-img
            @click="pushToProduct(product.id)"
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
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-toolbar
              dark
              color="#19C0C9"
            >
              <v-btn
                icon
                dark
                @click="dialog = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>変更</v-toolbar-title>
            </v-toolbar>
            <v-col cols="12" class="px-3">
              <v-form
                ref="form"
              >
                <v-text-field
                  color="#19C0C9"
                  v-model="editedName"
                  label="名前"
                  type="text"
                  :rules="[rules.required]"
                >
                </v-text-field>
                <v-text-field
                  color="#19C0C9"
                  v-model="editedEmail"
                  label="メールアドレス"
                  type="email"
                  :rules="[rules.required, rules.email]"
                >
                </v-text-field>
                <v-textarea
                  outlined
                  name="input-7-4"
                  label="自己紹介[任意]"
                  v-model="editedSelfIntroduction"
                >
                </v-textarea>
                <v-btn
                  class="white--text button font-weight-bold"
                  color="#19C0C9"
                  large
                  block
                  :disabled="!readyEdit"
                  @click="updatedUserData()"
                >
                  変更を保存
                </v-btn>
              </v-form>
            </v-col>
            <v-divider></v-divider>
            <v-col cols="12" class="px-3">
            <v-btn
              block
              @click="signout()"
            >
              ログアウト
            </v-btn>
            </v-col>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
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
            <v-subheader id="copy-text" class="display-none">{{this.formattedTitle}}</v-subheader>
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

interface Pouch {
  uid: string;
  thumbnail: string;
  name: string;
  selfIntroduction: string;
  products: number[];
  brands: string[];
  email: string;
}

export default Vue.extend({
  name: 'UsersProduct',

  data: () => ({
    editedName: '',
    editedEmail: '',
    editedSelfIntroduction: '',
    categoryName: '',
    productIdArray: [] as any,
    products: [] as any,
    brands: [] as any,
    userInfo: {},
    existsProduct: true,
    dialog: false,
    isEdit: false,
    isAnonymous: false,
    rules: {
      required: (v: any) => !!v || '未入力です。',
      min: (v: string) => v.length >= 8 || '8文字以上必要です。',
      emailMatch: () => (`The email and password you entered don't match`),
      email: (v: string) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(v) || 'メールアドレスの形式が正しくありません。'
      }
    },
    shareSheet: false,
    userPage: 'https://cramel.jp/cosmepouch/',
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
    //inputで入力した内容ではなく、ここでフォーマットしたテキストがコピー対象
    formattedTitle(): string {
      const uid = (this.userInfo as any).uid
      return `${this.userPage}${uid}`
    },
    readyEdit: function() {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(this.editedEmail) && this.editedName != ''
    }
  },
  created: function() {
    this.onAuthStateChanged()
    window.scrollTo({
      top: 0
    })
  },

  methods: {

    onAuthStateChanged(): void {
      this.products = []
      firebase.auth().onAuthStateChanged( user => {
        if (user && !user.isAnonymous) {
          firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          this.fetchUserData(user.uid)
          this.fetchProductIdInUsersSubCollection(user.uid)
        } else {
          this.pushSignin()
        }
      })
    },

    fetchUserData (uid: string): void {
      DB.collection('users')
        .doc(uid)
        .get()
        .then((doc) => {
          const data = doc.data() as any
          this.userInfo = data
          this.editedName = data.name
          this.editedEmail = data.email
          this.editedSelfIntroduction = data.selfIntroduction
        })
    },

    fetchProductIdInUsersSubCollection (uid: string): void {
      const productIdArray = [] as any
      DB.collection('users')
      .doc(uid)
      .collection('cosmePouch')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          productIdArray.push(doc.data().id)
        })
        this.productIdArray = productIdArray
      })
      .then(() => {
        this.fetchProducts()
        // this.setCosmeDataInFirestore()
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
        .then(() => {
          this.createBrandArray()
        })
        .then(() => {
          this.setCosmeDataInFirestore()
        })
      })
    },

    createBrandArray(): void {
      const array = this.products.map((obj: any) => {
        const brandArray = obj.brand
        return brandArray
      })
      this.brands = Array.from(new Set(array))
    },

    updatedUserData(): void{
      const uid = (this.userInfo as any).uid
      DB.collection('users')
      .doc(uid)
      .update(
        {
          name: this.editedName,
          email: this.editedEmail,
          selfIntroduction: this.editedSelfIntroduction
        }
      ).then(() => {
        this.onAuthStateChanged()
        this.dialog = false
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
      this.setCosmeDataInFirestore()
      const name = (this.userInfo as any).name
      const uid = (this.userInfo as any).uid
      if (button == 'twitter') {
        this.shareByTwitter(name, uid)
      }
      if (button == 'line') {
        this.shareByLine(name, uid)
      }
      if (button == 'copy') {
         this.copyTexts(uid)
      }
      this.shareSheet = false
    },

    shareByTwitter(name: string, uid: string) {
      const url = `https://twitter.com/intent/tweet?text=クラメルで${name}さんのコスメポーチをみてみよう！%20%23クラメル&url=${this.userPage}${uid}`
      window.open(url, '_blank', 'width=1024,height=768,scrollbars=yes,resizable=yes')
    },

    shareByLine(name: string, uid: string) {
      const url = `http://line.me/R/msg/text/?クラメルで${name}さんのコスメポーチをみてみよう！${this.userPage}${uid}`
      window.open(url, '_blank', 'width=1024,height=768,scrollbars=yes,resizable=yes')
    },

    copyTexts(uid: string): void {
      if (this.isIOS()) {
        const doc: HTMLInputElement = document.getElementById(
          "copy-text"
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

    setCosmeDataInFirestore() {
      const uid = (this.userInfo as any).uid
      const thumbnail = (this.userInfo as any).thumbnail
      const name = (this.userInfo as any).name
      const selfIntroduction = (this.userInfo as any).selfIntroduction
      const key = uid.charCodeAt(1)+uid.charCodeAt(5)
      const email = this.caesar((this.userInfo as any).email, key)

      const data: Pouch = {
        uid: uid,
        thumbnail: thumbnail,
        name: name,
        selfIntroduction: selfIntroduction,
        products: this.productIdArray,
        brands: this.brands,
        email: email != '' ? email : ''
      }
      DB.collection('cosmePouch')
      .doc(uid)
      .set(data)
    },

    editCosmePouch() {
      this.isEdit = !this.isEdit
    },

    updateCosmePouch(id: number) {
      this.setCosmePouchDataInFirestore(id)
      this.initializeData(id)
      this.createBrandArray()
    },

    setCosmePouchDataInFirestore(id: number) {
      const uid = (this.userInfo as any).uid
      const array = this.productIdArray.filter((n: any) => n !== id)
      this.products = this.products.filter((n: any) => n.id !== id)
      this.createBrandArray()

      DB.collection('users')
      .doc(uid)
      .collection('cosmePouch')
      .doc(String(id))
      .delete()
      DB.collection('cosmePouch')
      .doc(uid)
      .set(
        {
          products: array,
          brands: this.brands
        },
        {
          merge: true
        }
      )
    },

    initializeData(id: number){
      this.productIdArray = this.productIdArray.filter((n: number) => n !== id)
      this.products = this.products.filter((n: any) => n.id !== id)
    },

    isIOS() {
      const agent = window.navigator.userAgent;
      return agent.indexOf("iPhone") != -1 || agent.indexOf("iPad") != -1 || agent.indexOf("Mac") != -1;
    },

    caesar(val: string, key: number) {
      const encodeURI = encodeURIComponent(val)
      let result = ""
      for (let i = 0; i < encodeURI.length; i++) {
        result += String.fromCharCode(encodeURI.charCodeAt(i) + key)
      }
      return result
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
.display-none{
  color: #00000000;
  height: 1px;
}
</style>