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
      <!-- end -of icons -->

      <m-card icon="menu1" title="精彩视频"></m-card>
      <m-card icon="menu1" title="图文攻略"></m-card>
      <m-card icon="menu1" title="美文欣赏">
       <p> 1、人生若没有高度，看到的都是问题…若没有格局，看到的都是鸡毛蒜皮…不要在意眼前的苟且，还有未来的诗与远方。</p>
       <p>2、人生再糟，也应该乐观起来。这世界有朝夕与四季，还有诗与远方!</p>
       <p>3、夜的味道，月的味道，祝福和期待的的味道。最终都汇成诗与远方，化成深深的思念，送给远方的你。</p>
       <p>4、好像一直在迷迷糊糊度日，想起总是无比烦躁，丢失了梦想和激情，就像乌云蔽日，遮盖了初心和信念。本应眼眸清澈，心怀碧海蓝天，走向诗与远方。请助我一臂之力。</p>
       <p>5、毕业了，除了诗与远方，还有眼前的“苟且”。</p>
      </m-card>

      <m-list-card icon="menu1" title="新闻资讯" :categories="newsCats">
        <template #items="{category}">
          <div class="py-2" v-for="(news,i) in category.newsList" :key="i">
            <span>[{{news.categoryName}}]</span>
            <span>|</span>
            <span>{{ news.title }}</span>
            <span>{{ news.date }}</span>
          </div>
        </template>
      </m-list-card>
   

    <!-- <m-list-card icon="menu1" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link 
        tag="div"
        :to="`/articles/${news._id}`"
        class="py-2 fs-lg d-flex" 
        v-for="(news, i) in category.newsList" :key="i">
          <span class="text-info">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card> -->





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
        },
      /**
       * Array(5).fill(1).map( v => ({
            categoryName:'公告',
            title:'6月2日全服不停机公告',
            date:'06/01'
          }))
          解释：将这个对象重复5次放在数组中
          原理 定义一个数组有5个元素，什么样子的元素？用fill() 方法进行填充，
          填充完毕后再使用 map 对填充的数据进行修改
       */
      newsCats: [
        {
          name:'热门',
          newsList:new Array(5).fill(1).map( v => ({
            categoryName:'公告',
            title:'6月2日全服不停机公告',
            date:'06/01'
          }))
        },
        {
          name:'新闻',
          newsList:new Array(5).fill(1).map( v => ({
            categoryName:'公告',
            title:'6月2日全服不停机公告',
            date:'06/01'
          }))
        },
        {
          name:'公告',
          newsList:new Array(5).fill(1).map( v => ({
            categoryName:'公告',
            title:'6月2日全服不停机公告',
            date:'06/01'
          }))
        },
        {
          name:'活动',
          newsList:new Array(5).fill(1).map( v => ({
            categoryName:'公告',
            title:'6月2日全服不停机公告',
            date:'06/01'
          }))
        },
        {
          name:'赛事',
          newsList:new Array(5).fill(1).map( v => ({
            categoryName:'公告',
            title:'6月2日全服不停机公告',
            date:'06/01'
          }))
        }
      ],
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