<template>
  <div class="home">
    <CarouselImage/>
    <RankingList/>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
import CarouselImage from '@/components/CarouselImage.vue'
import RankingVList from '@/components/RankingList.vue'

export default Vue.extend ({
  name: 'Home',
  components: {
    CarouselImage,
    RankingList
  },
  
  created: function() {
    window.scrollTo({
      top: 0
    })
  },
})

</script>
