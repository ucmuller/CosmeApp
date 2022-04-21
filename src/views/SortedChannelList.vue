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
                【{{tag}}】のタグの付いているYouTuber
              </div>
            </div>
          </div>
        </v-col>
        <SearchChannel
          :handle-channels="channel"
          @changeParms="changeParms"
        />
      </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { DB } from '@/firebase/db'
import SearchChannel from '@/components/SearchChannel.vue'

export default Vue.extend({
  name: 'SortedChannelList',

  data: () => ({
    channel: [] as any,
    tag: ''
  }),

  components: {
    SearchChannel
  },

  created: function() {
    this.tag = this.$route.params.id
    if(this.tag) {
      this.fetchSortedVideoData(this.tag)
    }
    window.scrollTo({
      top: 0
    })
  },

  methods: {
    fetchSortedVideoData(tag: string) {
      const channelArray = [] as any
      const arr = [] as any
      DB.collection('channels')
      .where("tags", "array-contains", tag )
      .orderBy('subscriberCount', 'desc')
      .get()
      .then(querySnapShot => {
        querySnapShot.forEach(doc => {
          channelArray.push(doc.data())
        })
      })
      .then(() => {
        this.channel = channelArray
      })
    },

    changeParms(tag: string) {
      this.channel = []
      this.tag = tag
      this.fetchSortedVideoData(tag)
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
</style>