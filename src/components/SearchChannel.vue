<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        v-for="(channel, i) in handleChannels"
        :key="i"
      >
        <v-card
          class="mx-auto"
          outlined
        >
          <v-list-item>
            <v-list-item-avatar
              size="100"
              @click="pushChannelPage(channel.id)"
            >
              <v-img
                :src="channel.thumbnail"
                contain
              >
              </v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <div class="text-h7 font-weight-bold">
                {{channel.name}}
              </div>
              <v-list-item-subtitle>登録者数:{{Number(channel.subscriberCount).toLocaleString()}}人</v-list-item-subtitle>
              <v-list-item-subtitle>総再生回数:{{Number(channel.viewCount).toLocaleString()}}回</v-list-item-subtitle>
              <div
                class="pt-0"
              >
                <v-chip
                  v-for="(tag, j) in channel.tags"
                  :key="j"
                  class="mr-1 mt-1"
                  small
                  @click="changeParms(tag)"
                >
                  {{tag}}
                </v-chip>
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
  name: 'SearchChannel',

  props: {
    handleChannels: [] as any
  },

  data: () => ({
  }),

  methods: {

    changeParms(tag: string) {
      this.$emit('changeParms', tag)
    }
  }
})
</script>