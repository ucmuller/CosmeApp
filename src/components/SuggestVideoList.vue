<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        class="px-0"
        v-for="(video, i) in handleVideos"
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


export default Vue.extend({
  name: 'SuggestVideoList',

  props: {
    handleVideos: [] as any
  },

  data: () => ({
  }),

  watch: {
    $route (to, from) {
      this.$emit('parentMethod', to.params.id)
    }
  },

  methods: {
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
.border-top {
  border-top: 1px solid #E0E0E0;
}
</style>