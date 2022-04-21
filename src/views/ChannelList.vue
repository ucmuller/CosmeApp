<template>
  <v-container
    class="mt-16 px-0"
  >
    <v-row>
      <v-col
        cols="12"
        class="px-0 mt-10"
      >
        <div class="pa-2 pb-5 mt-0 border">
          <div class="px-2 mb-1 text-h6 font-weight-bold">
            メイク動画をUPしている人気YouTuber
          </div>
          <div class="px-2 text-subtitle-2">
          コスメを紹介しているYouTuberの中から気になる人をタップして、使用しているコスメの一覧とメイク動画を見に行こう！
        </div>
        </div>
      </v-col>
      <v-col
        cols="6"
        v-for="(channel, i) in channels"
        :key="i"
        class="py-0 my-3 text-left"
      >
        <v-icon
          v-if="i < 5"
          class="mx-5"
          color="red"
        >
          mdi-new-box
        </v-icon>
        <div class="py-0 my-0 text-center">
          <v-avatar
            size="100"
            @click="routerPush(channel.id)"
          >
          <img
            :src='channel.thumbnail'
            contain
          >
          </v-avatar>
          <div class="pt-3 mx-0 ellipsis text-caption font-weight-bold">
            {{channel.name}}
          </div>
          <div class="pt-0 text-caption">
            登録者:{{Number(channel.subscriberCount).toLocaleString()}}人
          </div>
          <div
            class="pt-0"
          >
            <v-chip
              v-for="(tag, j) in channel.tags"
              :key="j"
              class="mx-1"
              small
              @click="pushToSortedChannelList(tag)"
            >
              {{tag}}
            </v-chip>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { DB } from '@/firebase/db'
import axios from 'axios'
// import CarouselImage from '@/components/CarouselImage.vue'

interface Channel {
  id: '';
  name: '';
  channelId: '';
  image: '';
  subscriberCount: 0;
  viewCount: 0;
  videoCount: 0;
}

export default Vue.extend({
  name: 'ChannelList',

  // components: {
  //   CarouselImage
  // },

  data: () => ({
    ready: false,
    channels: [] as any
  }),

  created: function() {
    this.fetchChannels()
    // window.scrollTo({
    //   top: 0
    // })
  },

  computed: {
    sortedChannels: function() {
        return this.channels.slice().sort((a: any, b: any) => {
            return b.subscriberCount - a.subscriberCount
        })
    }
  },

  methods: {
    fetchChannels (): any {
      const array = [] as any
      DB.collection('channels')
      .orderBy('likeRate', 'desc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          array.push(doc.data())
        })
        this.channels = array
      })
    },

    pushToSortedChannelList(tag: string) {
      this.$router.push({
        name: 'SortedChannelList',
        params: {
          tag: tag
        }
      })
    },

    routerPush(v: number) {
      this.$router.push({ name: 'YoutubersProduct', params: { id: v.toString() }})
    },

    openWindow (url: string) {
      window.open(url, '_blank', 'width=1024,height=768,scrollbars=yes,resizable=yes')
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
  width: auto;
  text-overflow: ellipsis;
}
.border {
  border-bottom: 8px solid #f5f5f5;
}
</style>