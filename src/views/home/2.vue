<template>
  <el-container>
    <el-header><Homeheader /></el-header>
    <el-container>
      <!-- <el-aside width="200px">
        <HomeAside />
      </el-aside> -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Homeheader from "@/views/home/components/homeheader.vue";
// import HomeAside from "@/views/home/components/homeAside.vue";
export default {
  name: "home",
  components: {
    Homeheader,
    // HomeAside,
  },
};
</script>

<style>
</style>