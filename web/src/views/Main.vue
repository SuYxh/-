<template>
  <div>
    <!-- top bar -->
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <!-- 左边--logo -->
      <img src="../assets/logo.png" height="30">
      <!-- 中间 -- 信息 -->
      <div class="px-2 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1 fs-xxs">团队成就更多</div>
      </div>
      <!-- 右边 立即下载 -->
      <button type="button" class="btn bg-primary">立即下载</button>
    </div>
    <!-- 导航栏 -->
    <div class="bg-primary pt-3 pb-2">
      <div class="nav nav-inverse jc-around pb-1">
        <!-- 1 -->
        <div class="nav-item active">
          <router-link class="nav-link" tag="div" to="/">首页</router-link>
        </div>
        <!-- 2 -->
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
        </div>
        <!-- 3 -->
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">赛事中心</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.topbar{
  position: sticky;  // 表示吸顶的效果
  top:0;
  z-index: 99;
}
</style>