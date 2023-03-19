<template>
  <div class="content">
    <div class="header_tab">
      <!-- 标签区 -->
      <el-tag
        v-for="(item, index) in tags"
        :key="item.path"
        :closable="item.name !== 'home'"
        :effect="activeName === item.name ? 'light' : 'plain'"
        @click="changMenu(item)"
        @close="handleClose(item, index)"
      >
        {{ item.label }}
      </el-tag>
    </div>

    <!-- 面包屑 -->
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
        <span v-if="index !== 0"> {{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <RouterView />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {},
  data() {
    return {
      breadcrumbList: [],
    };
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
      activeName: (state) => state.tab.activeName,
    }),
  },

  methods: {
    ...mapMutations(['closeTag', 'updateActiveName']),

    //点击tag跳转对应路由
    changMenu(item) {
      this.updateActiveName(item);
      this.$router.push({ name: item.name });
    },

    //点击删除tag标签
    handleClose(item, index) {
      //调用store中的methods
      this.closeTag(item);
      //获取tag标签的长度
      const length = this.tags.length;
      //输出后的跳转逻辑
      if (this.activeName !== this.$router.name) {
        this.$router.push({ name: this.activeName });
      }
    },
  },
  created() {
    //获取路由内的全部信息
    this.breadcrumbList = this.$route.matched;
  },
  watch: {
    //监听，实时获取路由变动信息
    $route(to, from) {
      this.breadcrumbList = to.matched;
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  width: auto;
  height: 100%;
  .header_tab {
    display: flex;
    .el-tag {
      justify-content: flex-start;
      font-size: 14px;
      cursor: pointer;
      margin: 4px 1px;
    }
  }
  .breadcrumb {
    margin: 12px 0px;
    font-size: 15px;
    cursor: pointer;
  }
}
</style>
