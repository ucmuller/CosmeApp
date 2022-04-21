<template>
  <v-container
    class="mt-16"
  >
    <v-row class="mb-5">
      <v-col
        cols="12"
        class="px-0 mt-10"
      >
        <div class="py-2 px-3">
          <div class="py-2 px-3 heading">
            <div class="text-h7 font-weight-bold">
              【{{tag}}】のタグの付いている動画
            </div>
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        class="px-0"
        v-for="(video, i) in videoUniques"
        :key="i"
      >
        <v-img
          :src="video.thumbnails"
          :lazy-src="require('@/assets/images/grey.jpeg')"
          :aspect-ratio="16/9"
          @click="pushToVideoPage(video.id)"
        >
        </v-img>
        <v-list class="pa-0">
          <v-list-item class="pa-0">
            <v-list-item-content class="px-2">
              <v-row align="center">
                  <v-col
                    cols="2"
                    class="pa-0 pl-3 mx-0 text-center"
                  >
                    <v-avatar
                      size="40"
                      left
                      @click="pushToChannelPage(video.channelId)"
                    >
                      <v-img
                        :src="video.channelThumbnail"
                      >
                      </v-img>
                    </v-avatar>
                  </v-col>
                  <v-col
                    cols="10"
                    class="px-2 mx-0 py-0"
                  >
                    <p class="my-0 text-subtitle-2">
                      {{video.title}}
                    </p>
                    <v-list-item-subtitle>
                      {{video.channelName}}
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
                    <v-list-item-subtitle>
                      <v-icon small>
                        mdi-eye
                      </v-icon>
                      {{video.viewCount.toLocaleString()}}回視聴・{{publishedAt(video.publishedAt).toLocaleString()}}
                      <v-icon small>
                        mdi-thumb-up
                      </v-icon>
                      {{video.likeCount.toLocaleString()}}
                    </v-list-item-subtitle>
                    <div
                      class="pt-0"
                    >
                      <v-chip
                        v-for="(tag, j) in video.tags"
                        :key="j"
                        class="mr-1 mt-1"
                        small
                        @click="changeParms(tag)"
                      >
                        {{tag}}
                      </v-chip>
                    </div>
                  </v-col>
                </v-row>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { DB } from '@/firebase/db'
export default Vue.extend({
  name: 'SortedVideoList',

  data: () => ({
    videoUniques: [] as any,
    tag: ''
  }),

  created: function() {
    this.tag = this.$route.params.id
    this.fetchVideoUnique(this.$route.params.id)
    window.scrollTo({
      top: 0
    })
  },

  methods: {

    fetchVideoUnique (tag: string): void {
      const videoUniqueArray = [] as any
      DB.collection('videoUnique')
      .where('tags', 'array-contains', tag)
      .orderBy('publishedAt', 'desc')
      .limit(50)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            this.videoUniques.push(doc.data())
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

    changeParms(tag: string) {
      this.tag = tag
      this.videoUniques = []
      this.fetchVideoUnique(tag)
    },
    
    pushToChannelPage(v: number): void {
      this.$router.push({ name: 'YoutubersProduct', params: { id: v.toString() }})
    },

    pushToVideoPage(v: number): void {
      this.$router.push({ name: 'VideoProduct', params: { id: v.toString() }})
    },

    pushToProductPage(v: number): void {
      this.$router.push({ name: 'Product', params: { id: v.toString() }})
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
</style>