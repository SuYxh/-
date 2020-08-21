<template>
  <swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide>
      <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt="">
    </swiper-slide>
    <swiper-slide>
      <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt="">
    </swiper-slide>
    <swiper-slide>
      <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt="">
    </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
  </swiper>
</template>

<script>
  export default {
    name: 'carrousel',
    data() {
      return {
        swiperOptions: {
          pagination: {
            el: '.swiper-pagination'
          },
          // Some Swiper option/callback...
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    mounted() {
      console.log('Current Swiper instance object', this.swiper)
      this.swiper.slideTo(3, 1000, false)
    }
  }
</script>


<style lang="scss">
@import "../assets/scss/variables";



.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
</style>