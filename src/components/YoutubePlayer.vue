<template>
  <v-col
    cols="12"
    class="px-0 mt-0 pb-0"
  >
    <div class="box-border py-0">
      <div class="iframe-responsive"
        v-if="width>768"
        v-bind:class="{pcFixed: handleFixed}"
      >
        <youtube
          class="iframe-responsive-youtube"
          :video-id="handleVideos.id"
          :player-vars="playerVars()"
          ref="youtube"
          @ready="ready()"
        >
        </youtube>
      </div>
      <div class="iframe-responsive"
        v-if="width<768"
        v-bind:class="{spFixed: handleFixed}"
      >
        <youtube
          class="iframe-responsive-youtube"
          :video-id="handleVideos.id"
          :player-vars="playerVars()"
          ref="youtube"
          @ready="ready()"
        >
        </youtube>
      </div>
    </div>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue'
import { DB } from '@/firebase/db'
import firebase from 'firebase'


export default Vue.extend({
  name: 'YoutubePlayer',

  props: {
    handleVideos: {} as any,
    handleTime: String,
    handleFixed: Boolean,
    handleProductid: String
  },

  data: () => ({
    timerId: 0,
    width: window.innerWidth,
    height: window.innerHeight
  }),

  watch: {
    handleVideos: function(newVal, oldVal){
      setTimeout(()=> {
        this.ready()
      },400)
    }
  },

  mounted: function () {
    window.addEventListener('resize', this.handleResize)
  },

  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    handleResize: function() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    },

    playerVars() {
      const convertedTime = this.convertTime(this.handleTime)
      const playerVars = {
        playsinline: 1,
        autoplay: 1,
        start: convertedTime,
        // end: convertedTime+30,
        enablejsapi: 1,
        modestbranding: 1,
        fs: 0,
        controls: 1,
        origin: 'https://cramel.jp'
      }
      return playerVars
    },

    convertTime(time: string) {
      const timeArray = time.split(':')
      return Number(timeArray[0]) * 60 + Number(timeArray[1])
    },

    ready() {
      const youtubePlayer: any = this.$refs.youtube
      this.setPlayCountAtCramel(this.handleVideos)
      this.$ga.event('playVideoAtYoutubePlayer', 'push')
      youtubePlayer.player.mute()
      youtubePlayer.player.seekTo(this.playerVars().start)
      youtubePlayer.player.playVideo()
    },

    setPlayCountAtCramel(video: any) {
      const increment = firebase.firestore.FieldValue.increment(1)
      const docRefProducts = DB.collection('products').doc(String(this.handleProductid))
      const docRefVideoUnique = DB.collection('videoUnique').doc(String(video.id))
      docRefProducts
      .set({
        viwesAtCramel: increment
      },
      { 
        merge: true
      })

      docRefVideoUnique
      .set({
        viwesAtCramel: increment
      },
      { 
        merge: true
      })
    },
  }
})
</script>

<style scoped>
.iframe-responsive {
  width:100%;
  padding-bottom: 56.25%;
  height:0px;
  position: relative;
}
.iframe-responsive-youtube {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.fixed{
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 1;
}

.pcFixed{
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 40%;
  width: 640px;
  padding: 0px;
  margin: auto;
  z-index: 1;
}

.spFixed{
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 1;
}
</style>