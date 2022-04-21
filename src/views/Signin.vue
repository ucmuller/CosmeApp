<template>
    <v-container
      class="mt-16 px-8"
    >
      <v-row v-if="!ready">
        <v-col
            cols="12"
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
      </v-row>
      <v-row v-if="ready">
        <v-col
          cols="12"
          class="px-0 mt-10"
        >
          <div class="pa-0 pb-0 mt-0">
            <div class="px-2 mb-1 text-h6 font-weight-bold text-center">
              ログイン
            </div>
          </div>
        </v-col>
        <v-col
          class="mt-0 pt-0 pb-0 text-center"
          cols="12"
        >
        <p
          v-if="errorMessage != ''"
          class="text-subtitle-2 red--text text-left"
        >
          {{errorMessage}}
        </p>
          <v-text-field
            color="#19C0C9"
            v-model="email"
            label="メールアドレス"
            type="email"
            :rules="[rules.required, rules.email]"
          ></v-text-field>
          <v-text-field
            color="#19C0C9"
            v-model="password"
            label="パスワード"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            :rules="[rules.required, rules.min]"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-btn
            class="white--text button font-weight-bold mb-4"
            color="#19C0C9"
            large
            block
            :disabled="!readySigninWithEmail"
            @click="signin('email')"
          >
            ログイン
          </v-btn>
        </v-col>

        <v-col cols="12" class="pa-0 ma-0 spacer"></v-col>

        <v-col
          class="mt-1 pb-0 text-center"
          cols="12"
        >
          <v-btn
            class="white--text button font-weight-bold mb-4"
            color="#00acee"
            large
            block
            @click="signin('twitter')"
          >
            <v-icon
              left
            >
              mdi-twitter
            </v-icon>
            Twitterでログイン
          </v-btn>
          <v-btn
            class="white--text button font-weight-bold mb-4"
            color="#4285f4"
            large
            block
            @click="signin('google')"
          >
            <v-icon
              left
            >
              mdi-google
            </v-icon>
            Googleでログイン
          </v-btn>
          <v-btn
            text
            large
            block
            @click="pushToSignup()"
          >
            アカウントを作成する
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { DB } from '@/firebase/db'
import { Auth } from '@/firebase/auth'
import firebase from 'firebase'

interface User {
  uid: string;
  createdAt: Date;
  thumbnail: string;
  name: string;
  email: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
}

export default Vue.extend({
  name: 'Signin',

  data: () => ({
    user: {} as any,
    readyEmail: false,
    readyPassword: false,
    email: '',
    password: '',
    showPassword: false,
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
    errorMessage: "",
    ready: true
  }),

  created: function () {
    this.ready = true
    this.onAuthStateChanged()
  },

  watch: {
    email: function() {
      if (this.email != '') {
        this.readyEmail = true
      } else {
        this.readyEmail = false
      }
    },
    password: function() {
      if (this.password != '') {
        this.readyPassword = true
      } else {
        this.readyPassword = false
      }
    },
  },

  computed: {
    readySigninWithEmail: function() {
      return this.readyEmail && this.readyPassword ? true : false
    }
  },

  methods: {

    onAuthStateChanged() {
      firebase.auth().onAuthStateChanged( user => {
        if (user) {
          this.user = user
          this.isAnonymous = user.isAnonymous
        } else {
          firebase.auth().signInAnonymously()
          .then(() => {
            firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                this.user = user
                this.isAnonymous = user.isAnonymous
              }
            })
          })
        }
      })
    },

    signin(provider: string) {
      this.ready = false
      const twitterAuthProvider = new firebase.auth.TwitterAuthProvider()
      const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

      if (provider == 'email') {
        Auth.signInWithEmailAndPassword(this.email, this.password)
        .then( result => {
        })
        .catch( error => {
          this.ready = true
          if (error.code == "auth/user-not-found") {
            this.errorMessage = "このメールアドレスではアカウントが登録されていません。"
          }
          if (error.code == "auth/wrong-password") {
            this.errorMessage = "パスワードが間違っているか、アカウント作成の際にSNSでのログインを選択されているので、SNSログインをお試しください。"
          }
          if (error.code == "auth/too-many-requests") {
            this.errorMessage = "このアカウントはログイン試行が上限に達した為一時的に無効化されています。パスワードをリセットするか、時間をおいてから再度ログインして下さい。"
          }
        })
        .finally (() => {
          this.ready = true
        })
      }

      if (provider == 'twitter') {
        Auth.signInWithPopup(twitterAuthProvider)
        .then( result => {
          if (result.user && result.additionalUserInfo) {
            this.checkIfUserDataExistsInFirestore(provider, result.user.uid, result.user, result.additionalUserInfo)
          } else {
            this.ready = true
            alert("ログインエラー。もう一度お試し下さい。")
          }
        })
        .catch( error => {
          this.ready = true
          if (error.code == "auth/account-exists-with-different-credential") {
            this.errorMessage = "同じメールアドレスのアカウントが既に存在しております、SNSでのログインをお試し下さい。"
          }
        })
      }

      if (provider == 'google') {
        Auth.signInWithPopup(googleAuthProvider)
        .then( result => {
          if (result.user && result.additionalUserInfo) {
            this.checkIfUserDataExistsInFirestore(provider, result.user.uid, result.user, result.additionalUserInfo)
          } else {
            this.ready = true
            alert("ログインエラー。もう一度お試し下さい。")
          }
        })
        .catch( error => {
          this.ready = true
          if (error.code == "auth/account-exists-with-different-credential") {
            this.errorMessage = "同じメールアドレスのアカウントが既に存在しております、SNSでのログインをお試し下さい。"
          }
        })
      }

    },

    linkWithCredential(provider: string){
      firebase.auth().onAuthStateChanged( user => {
        if (user) {
          this.user = user
          this.isAnonymous = user.isAnonymous

          this.ready = false
          const twitterAuthProvider = new firebase.auth.TwitterAuthProvider()
          const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
          const emailAuthProvider = new firebase.auth.EmailAuthProvider()

          if (provider == 'email') {
            const credential = firebase.auth.EmailAuthProvider.credential(this.email, this.password);
            Auth.signInWithEmailAndPassword(this.email, this.password)
            .then( result => {
            })
            .catch( error => {
              this.ready = true
              if (error.code == "auth/user-not-found") {
                this.errorMessage = "このメールアドレスではアカウントが登録されていません。"
              }
              if (error.code == "auth/wrong-password") {
                this.errorMessage = "パスワードが間違っているか、アカウント作成の際にSNSでのログインを選択されているので、SNSログインをお試しください。"
              }
              if (error.code == "auth/too-many-requests") {
                this.errorMessage = "このアカウントはログイン試行が上限に達した為一時的に無効化されています。パスワードをリセットするか、時間をおいてから再度ログインして下さい。"
              }
            })
            .finally (() => {
              this.ready = true
            })
          }

          if (provider == 'twitter') {
            user.linkWithPopup(twitterAuthProvider)
            .then( result => {
              if (result.user && result.additionalUserInfo) {
                this.checkIfUserDataExistsInFirestore(provider, result.user.uid, result.user, result.additionalUserInfo)
              } else {
                this.ready = true
                alert("ログインエラー。もう一度お試し下さい。")
              }
            })
            .catch( error => {
              this.ready = true
              if (error.code == "auth/account-exists-with-different-credential") {
                this.errorMessage = "同じメールアドレスのアカウントが既に存在しております、SNSでのログインをお試し下さい。"
              }
            })
          }

          if (provider == 'google') {
            user.linkWithPopup(googleAuthProvider)
            Auth.signInWithPopup(googleAuthProvider)
            .then( result => {
              if (result.user && result.additionalUserInfo) {
                this.checkIfUserDataExistsInFirestore(provider, result.user.uid, result.user, result.additionalUserInfo)
              } else {
                this.ready = true
                alert("ログインエラー。もう一度お試し下さい。")
              }
            })
            .catch( error => {
              this.ready = true
              if (error.code == "auth/account-exists-with-different-credential") {
                this.errorMessage = "同じメールアドレスのアカウントが既に存在しております、SNSでのログインをお試し下さい。"
              }
            })
          }
        }
      })
    },

    checkIfUserDataExistsInFirestore (provider: string, uid: string, data: firebase.User, additionalUserInfo: firebase.auth.AdditionalUserInfo): void {
      DB.collection('users')
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.updateUserImage(data, additionalUserInfo)
          this.pushToUserProduct(doc.id)
        } else {
          if (provider == 'twitter') {
            this.setTwitterUserDataToFirestore(data, additionalUserInfo)
          }
          if (provider == 'google') {
            this.setGoogleUserDataToFirestore(data)
          }
        }
      })
      .catch(error => {
        this.ready = true
      })
    },

    setTwitterUserDataToFirestore(user: firebase.User, additionalUserInfo: firebase.auth.AdditionalUserInfo) {
      const uid = user.uid
      const userData: User = {
        uid: uid,
        createdAt: new Date(),
        thumbnail: (additionalUserInfo as any).profile.profile_image_url_https ? (additionalUserInfo as any).profile.profile_image_url_https.replace('_normal', '') : '',
        name: user.displayName ? user.displayName : '',
        email: (additionalUserInfo as any).profile.email ? (additionalUserInfo as any).profile.email : '',
        birthYear: 1990,
        birthMonth: 1,
        birthDay:1
      }
      DB.collection('users')
      .doc(user.uid)
      .set(userData)
      .then(() => {
        this.ready = true
        this.pushToSignup(uid)
      })
    },

    setGoogleUserDataToFirestore(user: firebase.User) {
      const uid = user.uid
      const userData: User = {
        uid: uid,
        createdAt: new Date(),
        thumbnail: user.photoURL ? user.photoURL : '',
        name: user.displayName ? user.displayName : '',
        email: user.email ? user.email : '',
        birthYear: 1990,
        birthMonth: 1,
        birthDay:1
      }
      DB.collection('users')
      .doc(user.uid)
      .set(userData)
      .then(() => {
        this.ready = true
        this.pushToSignup(uid)
      })
    },

    updateUserImage(user: firebase.User, additionalUserInfo: firebase.auth.AdditionalUserInfo) {
      DB.collection('users')
      .doc(user.uid)
      .update({
        thumbnail: (additionalUserInfo as any).profile.profile_image_url_https ? (additionalUserInfo as any).profile.profile_image_url_https.replace('_normal', '') : '',
      })
    },
    
    pushToUserProduct(v: string) {
      this.ready = true
      this.$router.push({ name: 'UsersProduct' })
    },

    pushToSignup(v: string) {
      if(v){
        this.$router.push({ name: 'Signup', params: { id: v.toString() }})
      }
      if(!v){
        this.$router.push({ name: 'Signup' })
      }
    },
  }
})
</script>

<style scoped>
.button {
  text-transform: none;
}
.spacer {
  border-bottom: 1px solid #E0E0E0
}

</style>