<template>
  <el-container>
    <el-aside width="auto">
      <Aside />
    </el-aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <!--路由出口-->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "@/layout/Aside.vue";
import Header from "@/layout/header.vue";
export default {
  data() {},
  components: {
    Aside,
    Header,
  },
};
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
}

.el-aside {
  .element::-webkit-scrollbar {
    width: 0 !important;
  }

  .element {
    -ms-overflow-style: none;
  }

  .element {
    overflow: -moz-scrollbars-none;
  }
}
</style>