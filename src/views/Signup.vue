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
              アカウント作成
            </div>
          </div>
        </v-col>
        <v-col
          v-if="!this.$route.params.id"
          class="mt-0 pt-0 pb-0 text-center"
          cols="12"
        >
          <p
            v-if="errorMessage != ''"
            class="text-subtitle-2 red--text text-left"
          >
            {{errorMessage}}
          </p>
          <v-form
            ref="form"
          >
            <v-text-field
              color="#19C0C9"
              v-model="name"
              label="名前"
              type="text"
              :rules="[rules.required]"
            >
            </v-text-field>
            <v-text-field
              color="#19C0C9"
              v-model="email"
              label="メールアドレス"
              type="email"
              :rules="[rules.required, rules.email]"
            >
            </v-text-field>
            <v-text-field
              color="#19C0C9"
              v-model="password"
              label="パスワード"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              :rules="[rules.required, rules.min, rules.password]"
              @click:append="showPassword = !showPassword"
            >
            </v-text-field>
            <p class="mb-0 text-left text-subtitle-1 text-grey">生年月日</p>
            <v-row>
              <v-col cols="4" class="py-0 px-3">
                <v-select
                  class="pa-0"
                  v-model="birthYear"
                  :items="generateYear"
                  item-text="year"
                  item-value="value"
                  single-line
                  menu-props="auto"
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
              <v-col cols="4" class="py-0 px-3">
                <v-select
                  class="pa-0"
                  v-model="birthMonth"
                  :items="generateMonth"
                  item-text="month"
                  item-value="value"
                  single-line
                  menu-props="auto"
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
              <v-col cols="4" class="py-0 px-3">
                <v-select
                  class="pa-0"
                  v-model="birthDay"
                  :items="generateDay"
                  item-text="day"
                  item-value="value"
                  single-line
                  menu-props="auto"
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
            </v-row>
            <v-textarea
              outlined
              name="input-7-4"
              label="自己紹介[任意]"
              v-model="selfIntroduction"
            ></v-textarea>
            <v-btn
              class="white--text button font-weight-bold mb-4 mt-4"
              color="#19C0C9"
              large
              block
              :disabled="!readySignupWithEmail"
              @click="signup()"
            >
              新規登録
            </v-btn>
          </v-form>
        </v-col>
        <v-form
          ref="form"
        >
          <v-col
            v-if="this.$route.params.id"
            class="mt-0 pt-0 pb-0 text-center"
            cols="12"
          >
            <p class="mb-0 text-left text-subtitle-1 text-grey">生年月日</p>
            <v-row>
              <v-col cols="4" class="py-0 px-3">
                <v-select
                  class="pa-0"
                  v-model="birthYear"
                  :items="generateYear"
                  item-text="year"
                  item-value="value"
                  single-line
                  menu-props="auto"
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
              <v-col cols="4" class="py-0 px-3">
                <v-select
                  class="pa-0"
                  v-model="birthMonth"
                  :items="generateMonth"
                  item-text="month"
                  item-value="value"
                  single-line
                  menu-props="auto"
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
              <v-col cols="4" class="py-0 px-3">
                <v-select
                  class="pa-0"
                  v-model="birthDay"
                  :items="generateDay"
                  item-text="day"
                  item-value="value"
                  single-line
                  menu-props="auto"
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
            </v-row>
            <v-text-field
              color="#19C0C9"
              v-model="email"
              label="メールアドレス"
              type="email"
              :rules="[rules.required, rules.email]"
            >
            </v-text-field>
            <v-textarea
              outlined
              name="input-7-4"
              label="自己紹介[任意]"
              v-model="selfIntroduction"
            ></v-textarea>
            <v-btn
              class="white--text button font-weight-bold mb-4 mt-4"
              color="#19C0C9"
              large
              block
              :disabled="!readyEmail"
              @click="signupBySnsAuth()"
            >
              新規登録
            </v-btn>
          </v-col>
        </v-form>
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
  selfIntroduction: string;
}

export default Vue.extend({
  name: 'Signup',
  data: () => ({
    name: '',
    email: '',
    password: '',
    birthYear: 1990,
    birthMonth: 1,
    birthDay: 1,
    selfIntroduction: '',
    readyEmail: false,
    readyPassword: false,
    showPassword: false,
    rules: {
      required: (v: string) => !!v || '未入力です。',
      min: (v: string) => v.length >= 8 || '8文字以上必要です。',
      emailMatch: () => (`The email and password you entered don't match`),
      email: (v: string) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(v) || 'メールアドレスの形式が正しくありません。'
      },
      password: (v: string) => {
        const pattern = /^[0-9a-zA-Z]*$/
        return pattern.test(v) || '半角英数字で入力して下さい。'
      }
    },
    errorMessage: "",
    ready: true
  }),

  created: function () {
    this.ready = true
  },

  watch: {
    email: function() {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (this.email != '' && pattern.test(this.email)) {
        this.readyEmail = true
      } else {
        this.readyEmail = false
      }
    },
    
    password: function() {
      const pattern = /^[0-9a-zA-Z]*$/
      if (this.password.length >= 8 && pattern.test(this.password)) {
        this.readyPassword = true
      } else {
        this.readyPassword = false
      }
    },
  },

  computed: {
    readySignupWithEmail: function() {
      return this.name && this.readyEmail && this.readyPassword ? true : false
    },

    readyEmail: function() {
      return this.readyEmail
    },

    generateYear(){
      const yearArray: number[] = []
      for (let i = 1940; i <= 2021; i++) {
        const v: any = {
          year: i,
          value: i
        }
        yearArray.push(v)
      }
      return yearArray
    },

    generateMonth(){
      const monthArray: number[] = []
      for (let i = 1; i <= 12; i++) {
        const v: any = {
          month: i,
          value: i
        }
        monthArray.push(v)
      }
      return monthArray
    },

    generateDay(){
      const dayArray: number[] = []
      for (let i = 1; i <= 31; i++) {
        const v: any = {
          day: i,
          value: i
        }
        dayArray.push(v)
      }
      return dayArray
    },
  },

  methods: {
    signup() {
      this.ready = false
      Auth.createUserWithEmailAndPassword(this.email, this.password)
      .then(result => {
        if(result.user){
          this.setUserDataToFirestore(result.user)
        }
      })
      .catch(error => {
        this.ready = true
        if (error.code == "auth/email-already-in-use") {
          this.errorMessage = "このメールアドレスは既に登録されています。別のメールアドレスで再度お試し下さい。"
        }
      }).
      finally(() =>{
        this.ready = true
      })
    },

    signupBySnsAuth() {
      DB.collection('users')
      .doc(this.$route.params.id)
      .update(
        {
          birthDay: this.birthDay,
          birthMonth: this.birthMonth,
          birthYear: this.birthYear,
          email: this.email,
          selfIntroduction: this.selfIntroduction
        }
      ).then(() => {
        this.pushToUserProduct(this.$route.params.id)
      })
    },

    setUserDataToFirestore(data: firebase.User) {
      const uid = data.uid
      const userData: User = {
        uid: uid,
        createdAt: new Date(),
        thumbnail: "",
        name: this.name,
        email: this.email,
        birthYear: this.birthYear,
        birthMonth: this.birthMonth,
        birthDay: this.birthDay,
        selfIntroduction: this.selfIntroduction
      }
      DB.collection('users')
      .doc(data.uid)
      .set(userData)
      .then(() => {
        this.pushToUserProduct(uid)
      })
    },

    pushToUserProduct(v: string) {
      this.$router.push({ name: 'UsersProduct' })
    },
  }
})
</script>

<style scoped>
.button {
  text-transform: none;
}
.text-grey{
  color: #6E6E6E;
}
</style>