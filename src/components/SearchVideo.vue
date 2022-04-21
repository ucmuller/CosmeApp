<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        v-for="(video, i) in handleVideos"
        :key="i"
      >
        <v-card
          class="mx-auto"
          outlined
        >
          <v-list-item>
            <v-list-item-avatar
              tile
              size="100"
            >
              <v-img
                :src="video.productImageUrl"
                contain
                @click="pushProductPage(video.productId)"
              >
              </v-img>
            </v-list-item-avatar>
            <v-list-item-content
              class="py-0"
            >
              <div class="text-caption font-weight-bold">
                {{video.productName}}
              </div>
              <v-divider></v-divider>
              <div class="mb-0 pt-1 text-caption border-top">
                紹介動画
              </div>
              <avatar
              tile
              >
                <v-img
                  :src="video.videoThumbnail"
                  width="100"
                  cover
                  @click="pushVideoPage(video.videoId)"
                >
                </v-img>
              </avatar>
              <div class="text-caption">
                {{video.channelName}}
              </div>
              <div class="text-caption text-truncate">
                {{video.title}}
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'


export default Vue.extend({
  name: 'SearchVideo',

  props: {
    handleVideos: [] as any
  },

  data: () => ({
  }),

  methods: {
    pushVideoPage(v: number) {
      this.$router.push({ name: 'VideoProduct', params: { id: v.toString() }})
    },

    pushProductPage(v: number) {
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