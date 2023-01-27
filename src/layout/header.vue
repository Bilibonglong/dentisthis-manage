<template>
  <div class="header-container">
    <div class="l-content">
      <el-button icon="el-icon-menu" size="small" @click="handleMenu">
      </el-button>
      <!-- 面包屑 -->
      <span class="text">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-for="item in tags"
            :key="item.path"
            :to="{ path: item.path }"
            >{{ item.label }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </span>
    </div>

    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },

  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },

  mounted() {
    console.log(this.tags, "tags");
  },
};
</script>

<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text {
  color: white;
  font-size: 14px;
  margin-left: 20px;
}
.r-contetn {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
/deep/ .el-breadcrumb_item {
  .el-breadcrumb_inner {
    font-weight: normal;
    &.is-link {
      color: #666;
    }
  }
  &:last-child {
    .el-breadcrumb_inner {
      color: white;
    }
  }
}
</style>