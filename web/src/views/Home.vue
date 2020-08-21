<template>
  <div>
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
      <!-- end -of swiper -->

      <!-- 图标菜单 -->
      <div class="nav-icons bg-white mt-3  text-center pt-3 text-dark-1">
        <!-- 图标 -->
        <div class="d-flex flex-wrap">
          <div class="nav-item mb-3" v-for="n in 10" :key="n">
            <i class="sprite sprite-news"></i>
            <div class="py-2">爆料站</div>
          </div>
        </div>
        <!-- 收起 -->
        <div class="bg-light py-2 fs-sm">
          <i class="sprite sprite-arrow mr-1"></i>
          收起
        </div>
      </div>

  </div>
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

.nav-icons{
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item{
    width: 25%;
    border-right: 1px solid $border-color;
    // 处理某些不需要边框的元素 ，即 每个4的倍数的元素 不加边框
    &:nth-child(4n) {
      border-right: none;
    }
  }
}

</style>