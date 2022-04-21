<template>
  <v-carousel
    cycle
    :show-arrows="false"
    hide-delimiters
    class="mt-0"
    height="auto"
  >
    <v-carousel-item
      class="mt-7"
      contain
      v-for="(image, i) in images"
      :key="i"
    >
      <v-col
        cols="12"
        class="mt-0 px-0 text-center"
      >
        <v-img
          :src="image"
          :aspect-ratio="16/9"
          @click="pushToPersonalcolorAnalysis(i)"
        >
        </v-img>
      </v-col>
    </v-carousel-item>
  </v-carousel>
</template>

<script lang="ts">
import Vue from 'vue'


export default Vue.extend({
  name: 'CarouselImage',

  data: () => ({
      images: [
        require('@/assets/images/featureCosme.001.jpeg'),
        require('@/assets/images/personalColorImage.jpeg'),
        // require('@/assets/images/IMG_1528.png')
      ]
  }),

  methods: {
    pushToPersonalcolorAnalysis(i: number) {
      if(i == 1) {
        this.$router.push({ name: 'PersonalColorAnalysis'})
      }
    }
  }
})
</script>