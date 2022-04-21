<template>
  <v-container class="wrap pt-0 px-0 pb-0">
    <v-row
      class="px-0"
    >
      <v-col
        cols="12"
        class="px-6 pt-10 pb-10 text-center"
      >
        <p
          class="ma-0 font-weight-bold label-winter"
        >
          # 冬タイプ
        </p>
        <p
          class="ma-0 font-weight-bold button-sub-text-color text-caption"
        >
          Blue base
        </p>
        <v-img
          class="my-5"
          :src="imageWinter"
          :aspect-ratio="343/226"
        >
        </v-img>
        <div
          class="text-h7 font-weight-bold"
        >
          シャープで、クールな雰囲気
        </div>
        <p
          class="pt-4 pb-10 ma-0 text-left description-text"
        >
          冬タイプは青みを含んだ冷たさが感じられる「ブルーベース」の色グループです。個性的でクールな雰囲気を持っていて華やかな存在感が際立つタイプなので、クリアで鮮やかな原色や強くてハードな色が似合いやすいです。
        </p>
        <div
          class="text-h7 font-weight-bold"
        >
          似合うカラー
        </div>
        <v-img
          class="my-0 mx-10"
          :src="imageColorWinter"
          :aspect-ratio="245/94"
        >
        </v-img>
        <p
          class="pt-4 ma-0 text-left description-text"
        >
          鮮やかな原色や、淡いシャーベットカラーが似合うので、青みの強いピンクやロイヤルブルー、ターコイズなどのコントラストのはっきりとした色がおすすめです。
        </p>
      </v-col>
      <v-col
        cols="12"
        class="px-6 pt-10 pb-5 text-center bg-pink"
      >
        <p
          class="ma-0 text-caption font-weight-bold"
        >
          \ 冬タイプの方に似合う /
        </p>
        <div
          class="text-h6 font-weight-bold under-line"
        >
          おすすめコスメ
        </div>
        <p
          class="ma-0 sub-text-color text-caption"
        >
          Recommend
        </p>
        <p
          class="py-4 ma-0 text-left description-text"
        >
          冬タイプの人のメイクのポイントは、リップか目元のどちらかを強調させることなので、鮮やかでハッキリとした色を使い適度にツヤっぽく仕上げると良いです。ローズピンクやショッキングピンク、ワインレッドなどの青や紫の混じったコスメがおすすめです。
        </p>
      </v-col>
      <v-col
        cols="12"
        class="pb-10 text-center bg-pink"
      >
        <div
          class="pb-2 text-h6 font-weight-bold text-pink"
        >
          EYE
        </div>
        <CarouselVueFlickity
          :handle-products="winterCosmeEye"
        />
      </v-col>
      <v-col
        cols="12"
        class="pb-10 text-center bg-pink"
      >
        <div
          class="pb-2 text-h6 font-weight-bold text-pink"
        >
          CHEEK
        </div>
        <CarouselVueFlickity
          :handle-products="winterCosmeCheek"
        />
      </v-col>
      <v-col
        cols="12"
        class="pb-10 text-center bg-pink"
      >
        <div
          class="pb-2 text-h6 font-weight-bold text-pink"
        >
          LIP
        </div>
        <CarouselVueFlickity
          :handle-products="winterCosmelip"
        />
      </v-col>
      <v-col
        cols="12"
        class="pt-5 pb-10 text-center bg-pink"
      >
        <div
          class="text-h7 font-weight-bold"
        >
          冬タイプのYouTuber
        </div>
        <v-slide-group
          class="pt-2"
        >
          <v-slide-item
            v-for="(item, i) in winterYoutuber"
            :key="i"
          >
            <v-card
              class="ma-1 pa-1"
              width="130"
              outlined
            >
              <div class="py-0 my-0 text-center">
                <v-avatar
                  size="100"
                  @click="pushToChannelPage(item.id)"
                >
                  <img
                    :src='item.thumbnail'
                    contain
                  >
                </v-avatar>
                <div class="pt-3 mx-0 text-truncate text-caption font-weight-bold">
                  {{item.name}}
                </div>
                <div class="pt-0 text-caption">
                  登録者:{{Number(item.subscriberCount).toLocaleString()}}人
                </div>
                <div
                  class="pt-0"
                >
                  <v-chip
                    v-for="(tag, j) in item.tags"
                    :key="j"
                    class="mx-1"
                    small
                    @click="pushToSortedChannelList(tag)"
                  >
                    {{tag}}
                  </v-chip>
                </div>
              </div>
            </v-card>
          </v-slide-item>
        </v-slide-group>
        <div class="pr-2 text-right">
          <p
            class="ma-0 link"
            @click="pushToSortedChannelList('冬')"
          >
            冬タイプのYouTuberをもっと見る
            <v-icon
              color="#2A5FA6"
              small
            >
              mdi-chevron-right
            </v-icon>
          </p>
        </div>
      </v-col>

      <v-col
        cols="12"
        class="pt-5 pb-10 text-center bg-pink"
      >
        <div
          class="text-h7 font-weight-bold"
        >
          冬タイプおすすめコスメ動画
        </div>
        <flickity
          :options="flickityOptions"
          class="pt-2"
        >
          <v-card
            class="ma-1 pa-0 text-left"
            width="250"
            height="310"
            outlined
          >
            <v-img
              :src="videos[0].thumbnails"
              :lazy-src="require('@/assets/images/grey.jpeg')"
              :aspect-ratio="16/9"
              @click="pushToVideoPage(videos[0].id)"
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="#19C0C9"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-list class="pa-0">
              <v-list-item three-line class="pa-0">
                <v-list-item-content class="pa-2">
                  <v-row align="center">
                    <v-col
                    cols="2"
                    class="pa-0 pl-3 mx-0 text-center"
                    >
                      <v-avatar
                      size="30"
                      left
                      @click="pushToChannelPage(videos[0].channelId)"
                    >
                      <v-img
                        :src="videos[0].channelThumbnail"
                      >
                      </v-img>
                    </v-avatar>
                    </v-col>
                    <v-col cols="10" class="px-2 mx-0 py-0">
                      <p class="my-0 text-caption">
                        {{truncate(videos[0].title, 25)}}
                      </p>
                      <v-list-item-subtitle class="my-0 text-caption">
                        {{videos[0].channelName}}
                      </v-list-item-subtitle>
                    </v-col>
                    <v-col
                      cols="2"
                      class="pa-0 mx-0 text-center"
                    >
                    </v-col>
                    <v-col
                      cols="10"
                      class="px-2 mx-0 py-0"
                    >
                      <v-list-item-subtitle class="my-0 text-caption">
                        <v-icon small>
                          mdi-eye
                        </v-icon>
                        {{videos[0].viewCount.toLocaleString()}}回視聴
                        <v-icon small>
                          mdi-thumb-up
                        </v-icon>
                        {{videos[0].likeCount.toLocaleString()}}
                      </v-list-item-subtitle>
                      <div
                        class="pt-0"
                      >
                        <v-chip
                          v-for="(tag, j) in videos[0].tags"
                          :key="j"
                          class="mr-1 mt-1"
                          small
                          @click="pushToSortedVideoListlPage(tag)"
                        >
                          {{tag}}
                        </v-chip>
                      </div>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>

          <v-card
            class="ma-1 pa-0 text-left"
            width="250"
            height="310"
            outlined
          >
            <v-img
              :src="videos[1].thumbnails"
              :lazy-src="require('@/assets/images/grey.jpeg')"
              :aspect-ratio="16/9"
              @click="pushToVideoPage(videos[1].id)"
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="#19C0C9"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-list class="pa-0">
              <v-list-item three-line class="pa-0">
                <v-list-item-content class="pa-2">
                  <v-row align="center">
                    <v-col
                    cols="2"
                    class="pa-0 pl-3 mx-0 text-center"
                    >
                      <v-avatar
                      size="30"
                      left
                      @click="pushToChannelPage(videos[1].channelId)"
                    >
                      <v-img
                        :src="videos[1].channelThumbnail"
                      >
                      </v-img>
                    </v-avatar>
                    </v-col>
                    <v-col cols="10" class="px-2 mx-0 py-0">
                      <p class="my-0 text-caption">
                        {{truncate(videos[1].title, 25)}}
                      </p>
                      <v-list-item-subtitle class="my-0 text-caption">
                        {{videos[1].channelName}}
                      </v-list-item-subtitle>
                    </v-col>
                    <v-col
                      cols="2"
                      class="pa-0 mx-0 text-center"
                    >
                    </v-col>
                    <v-col
                      cols="10"
                      class="px-2 mx-0 py-0"
                    >
                      <v-list-item-subtitle class="my-0 text-caption">
                        <v-icon small>
                          mdi-eye
                        </v-icon>
                        {{videos[1].viewCount.toLocaleString()}}回視聴
                        <v-icon small>
                          mdi-thumb-up
                        </v-icon>
                        {{videos[1].likeCount.toLocaleString()}}
                      </v-list-item-subtitle>
                      <div
                        class="pt-0"
                      >
                        <v-chip
                          v-for="(tag, j) in videos[1].tags"
                          :key="j"
                          class="mr-1 mt-1"
                          small
                          @click="pushToSortedVideoListlPage(tag)"
                        >
                          {{tag}}
                        </v-chip>
                      </div>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
          <v-card
            class="ma-1 pa-0 text-left"
            width="250"
            height="310"
            outlined
          >
            <v-img
              :src="videos[2].thumbnails"
              :lazy-src="require('@/assets/images/grey.jpeg')"
              :aspect-ratio="16/9"
              @click="pushToVideoPage(videos[2].id)"
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="#19C0C9"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-list class="pa-0">
              <v-list-item three-line class="pa-0">
                <v-list-item-content class="pa-2">
                  <v-row align="center">
                    <v-col
                    cols="2"
                    class="pa-0 pl-3 mx-0 text-center"
                    >
                      <v-avatar
                      size="30"
                      left
                      @click="pushToChannelPage(videos[2].channelId)"
                    >
                      <v-img
                        :src="videos[2].channelThumbnail"
                      >
                      </v-img>
                    </v-avatar>
                    </v-col>
                    <v-col cols="10" class="px-2 mx-0 py-0">
                      <p class="my-0 text-caption">
                        {{truncate(videos[2].title, 25)}}
                      </p>
                      <v-list-item-subtitle class="my-0 text-caption">
                        {{videos[2].channelName}}
                      </v-list-item-subtitle>
                    </v-col>
                    <v-col
                      cols="2"
                      class="pa-0 mx-0 text-center"
                    >
                    </v-col>
                    <v-col
                      cols="10"
                      class="px-2 mx-0 py-0"
                    >
                      <v-list-item-subtitle class="my-0 text-caption">
                        <v-icon small>
                          mdi-eye
                        </v-icon>
                        {{videos[2].viewCount.toLocaleString()}}回視聴
                        <v-icon small>
                          mdi-thumb-up
                        </v-icon>
                        {{videos[2].likeCount.toLocaleString()}}
                      </v-list-item-subtitle>
                      <div
                        class="pt-0"
                      >
                        <v-chip
                          v-for="(tag, j) in videos[2].tags"
                          :key="j"
                          class="mr-1 mt-1"
                          small
                          @click="pushToSortedVideoListlPage(tag)"
                        >
                          {{tag}}
                        </v-chip>
                      </div>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
          <v-card
            class="ma-1 pa-0 text-left"
            width="250"
            height="310"
            outlined
          >
            <v-img
              :src="videos[3].thumbnails"
              :lazy-src="require('@/assets/images/grey.jpeg')"
              :aspect-ratio="16/9"
              @click="pushToVideoPage(videos[3].id)"
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="#19C0C9"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-list class="pa-0">
              <v-list-item three-line class="pa-0">
                <v-list-item-content class="pa-2">
                  <v-row align="center">
                    <v-col
                    cols="2"
                    class="pa-0 pl-3 mx-0 text-center"
                    >
                      <v-avatar
                      size="30"
                      left
                      @click="pushToChannelPage(videos[3].channelId)"
                    >
                      <v-img
                        :src="videos[3].channelThumbnail"
                      >
                      </v-img>
                    </v-avatar>
                    </v-col>
                    <v-col cols="10" class="px-2 mx-0 py-0">
                      <p class="my-0 text-caption">
                        {{truncate(videos[3].title, 25)}}
                      </p>
                      <v-list-item-subtitle class="my-0 text-caption">
                        {{videos[3].channelName}}
                      </v-list-item-subtitle>
                    </v-col>
                    <v-col
                      cols="2"
                      class="pa-0 mx-0 text-center"
                    >
                    </v-col>
                    <v-col
                      cols="10"
                      class="px-2 mx-0 py-0"
                    >
                      <v-list-item-subtitle class="my-0 text-caption">
                        <v-icon small>
                          mdi-eye
                        </v-icon>
                        {{videos[3].viewCount.toLocaleString()}}回視聴
                        <v-icon small>
                          mdi-thumb-up
                        </v-icon>
                        {{videos[3].likeCount.toLocaleString()}}
                      </v-list-item-subtitle>
                      <div
                        class="pt-0"
                      >
                        <v-chip
                          v-for="(tag, j) in videos[3].tags"
                          :key="j"
                          class="mr-1 mt-1"
                          small
                          @click="pushToSortedVideoListlPage(tag)"
                        >
                          {{tag}}
                        </v-chip>
                      </div>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
          <v-card
            class="ma-1 pa-0 text-left"
            width="250"
            height="310"
            outlined
          >
            <v-img
              :src="videos[4].thumbnails"
              :lazy-src="require('@/assets/images/grey.jpeg')"
              :aspect-ratio="16/9"
              @click="pushToVideoPage(videos[4].id)"
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="#19C0C9"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-list class="pa-0">
              <v-list-item three-line class="pa-0">
                <v-list-item-content class="pa-2">
                  <v-row align="center">
                    <v-col
                    cols="2"
                    class="pa-0 pl-3 mx-0 text-center"
                    >
                      <v-avatar
                      size="30"
                      left
                      @click="pushToChannelPage(videos[4].channelId)"
                    >
                      <v-img
                        :src="videos[4].channelThumbnail"
                      >
                      </v-img>
                    </v-avatar>
                    </v-col>
                    <v-col cols="10" class="px-2 mx-0 py-0">
                      <p class="my-0 text-caption">
                        {{truncate(videos[4].title, 25)}}
                      </p>
                      <v-list-item-subtitle class="my-0 text-caption">
                        {{videos[4].channelName}}
                      </v-list-item-subtitle>
                    </v-col>
                    <v-col
                      cols="2"
                      class="pa-0 mx-0 text-center"
                    >
                    </v-col>
                    <v-col
                      cols="10"
                      class="px-2 mx-0 py-0"
                    >
                      <v-list-item-subtitle class="my-0 text-caption">
                        <v-icon small>
                          mdi-eye
                        </v-icon>
                        {{videos[4].viewCount.toLocaleString()}}回視聴
                        <v-icon small>
                          mdi-thumb-up
                        </v-icon>
                        {{videos[4].likeCount.toLocaleString()}}
                      </v-list-item-subtitle>
                      <div
                        class="pt-0"
                      >
                        <v-chip
                          v-for="(tag, j) in videos[4].tags"
                          :key="j"
                          class="mr-1 mt-1"
                          small
                          @click="pushToSortedVideoListlPage(tag)"
                        >
                          {{tag}}
                        </v-chip>
                      </div>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>

        </flickity>
        <div class="pr-2 text-right">
          <p
            class="ma-0 link"
            @click="pushToSortedVideoListlPage('冬')"
          >
            冬タイプの動画をもっと見る
            <v-icon
              color="#2A5FA6"
              small
            >
              mdi-chevron-right
            </v-icon>
          </p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
// import CarouselImage from '@/components/CarouselImage.vue'
import store from '@/store'
import { DB } from '@/firebase/db'
import firebase from 'firebase'
import CarouselVueFlickity from '@/components/CarouselVueFlickity.vue'
import Flickity from 'vue-flickity-2';
import 'vue-flickity-2/dist/vue-flickity-2.css';

export default Vue.extend({
  name: 'ResultWinter',

  components: {
    CarouselVueFlickity,
    Flickity
  },

  data: () => ({
    imageWinter: require('@/assets/images/img_winter.jpg'),
    imageColorWinter: require('@/assets/images/color_winter_clothes.png'),
    channels: [] as any,
    winterCosmeEye: [] as any,
    winterCosmeCheek: [] as any,
    winterCosmelip: [] as any,
    winterYoutuber: [] as any,
    videos: [] as any,
    flickityOptions: {
      pageDots: false,
      prevNextButtons: false,
      wrapAround: true
    },
  }),

  created: function() {
    // if(window.matchMedia('(display-mode: standalone)').matches){
    // }
    this.fetchAutumnCosmeData()
    this.fetchVideos()
  },

  methods: {
    fetchVideos (): void {
      DB.collection('videoUnique')
      .where('tags', 'array-contains', '冬' )
      .orderBy('publishedAt', 'desc')
      .limit(5)
      .get()
      .then(querySnapShot => {
        querySnapShot.forEach(doc => {
          this.videos.push(doc.data())
        })
      })
    },

    fetchAutumnCosmeData(): void {
      DB.collection('products')
      .where('categoryId', '==', "1" )
      .where('tags', 'array-contains', '冬' )
      .orderBy('times', 'desc')
      .limit(5)
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach(doc =>{
          this.winterCosmeEye.push(doc.data())
        })
      })
      DB.collection('products')
      .where('categoryId', '==', "16" )
      .where('tags', 'array-contains', '冬' )
      .orderBy('times', 'desc')
      .limit(5)
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach(doc =>{
          this.winterCosmeCheek.push(doc.data())
        })
      })
      DB.collection('products')
      .where('categoryId', '==', "57" )
      .where('tags', 'array-contains', '冬' )
      .orderBy('times', 'desc')
      .limit(5)
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach(doc =>{
          this.winterCosmelip.push(doc.data())
        })
      })
      DB.collection('channels')
      .where('tags', 'array-contains', '冬' )
      .orderBy('subscriberCount', 'desc')
      .limit(5)
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach(doc =>{
          this.winterYoutuber.push(doc.data())
        })
      })
    },

    publishedAt(datetime: Date) {
      const from = new Date(datetime);
      const diff = new Date().getTime() - from.getTime();
      const elapsed = new Date(diff);

      if (elapsed.getUTCFullYear() - 1970) {
        return elapsed.getUTCFullYear() - 1970 + '年前';
      } else if (elapsed.getUTCMonth()) {
        return elapsed.getUTCMonth() + 'ヶ月前';
      } else if (elapsed.getUTCDate() - 1) {
        return elapsed.getUTCDate() - 1 + '日前';
      } else if (elapsed.getUTCHours()) {
        return elapsed.getUTCHours() + '時間前';
      } else if (elapsed.getUTCMinutes()) {
        return elapsed.getUTCMinutes() + '分前';
      } else {
        return elapsed.getUTCSeconds() + 'たった今';
      }
    },

    convertTime(time: string) {
      const timeArray = time.split(':')
      return Number(timeArray[0]) * 60 + Number(timeArray[1])
    },

    truncate(str: string, len: number){
        return str.length <= len ? str: (str.substr(0, len)+"...");
    },
 
    openWindow (url: string) {
      window.open(url, '_blank', 'width=1024,height=768,scrollbars=yes,resizable=yes')
    },

    pushToProductPage(v: number): void {
      this.$router.push({ name: 'Product', params: { id: v.toString() }})
    },

    pushToSortedVideoListlPage(v: string): void {
      this.$router.push({ name: 'SortedVideoList', params: { id: v }})
    },

    pushToSortedChannelList(tag: string) {
      this.$router.push({ name: 'SortedChannelList', params: { id: tag }})
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
  font-size: 14px;
  padding-top: 10px;
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

.label-winter{
  font-size: 24px;
  font-family: "Century Gothic", sans-serif;
  letter-spacing: 2.4px;
  color: #FFFFFF;
  text-shadow:
       1px 1px 1px #CB0085,
      -1px 1px 1px #CB0085,
       1px -1px 1px #CB0085,
      -1px -1px 1px #CB0085,
       1px 0px 1px #CB0085,
       0px 1px 1px #CB0085,
      -1px 0px 1px #CB0085,
       0px -1px 1px #CB0085;
}
</style>
