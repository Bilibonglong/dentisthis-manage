<template>
  <div class="container">
    <!-- 头部 -->
    <Header class="header" />
    <!-- 主内容区 -->
    <div class="main">
      <!-- 导航栏 -->
      <Aside class="slider" />
      <!-- 动态组件内容区 -->
      <Content class="content" />
    </div>
  </div>
</template>

<script>
import Header from "./header.vue";
import Aside from "./aside.vue";
import Content from "./content.vue";
export default {
  components: {
    Header,
    Aside,
    Content,
  },
  data() {
    return {
      dynamicTags: [],
      thisRouterName: "",
    };
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  .header {
    background-color:rgb(42, 45, 56);
    height: 70px;
  }
  .main {
    width: 100%;
    height: 100%;
    // position:absolute;
    display: grid;
    grid-template-columns: 10% 1fr;
    .slider{
      height: 100%;
    }
    .content {
      border: 1px solid whitesmoke;
      border-radius: 5px;
      padding: 5px 5px;
      margin-bottom: 0px;
    }
  }
}
</style>
