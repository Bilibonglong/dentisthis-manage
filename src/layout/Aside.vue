<template>
  <el-menu
    default-active="$route.path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3 style="height:auto">牙医管家</h3>
    <el-menu-item
      @click="clickMenu(item)"
      v-for="item in noChildren"
      :key="item.name"
      :index="item.name"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      v-for="item in hasChildren"
      :key="item.label"
      :index="item.label"
    >
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{
          subItem.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<style lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  height: 100vh;
  /* -webkit-overflow-scrolling: display: none;; */
  h3 {
    text-align: center;
  }
}
</style>

<script>
export default {
  data() {
    return {
      menu: [
        {
          path: "/home",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "home/index",
        },
        {
          path: "/patient",
          name: "patient",
          label: "患者管理",
          icon: "video-play",
          url: "mall/index",
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user",
          url: "User/index",
        },
        {
          label: "其他",
          icon: "location",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "页面1",
              icon: "setting",
              url: "other/pageOne.vue",
            },
            {
              path: "/page2",
              name: "page2",
              label: "页面2",
              icon: "setting",
              url: "other/pageTwo.vue",
            },
          ],
        },
      ],
      // isCollapse: false,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    clickMenu(item) {
      //当页面的路由与跳转路由不一致才允许跳转
      if (this.$route.path != item.path) {
        this.$router.push(item.path);
      }

      this.$store.commit("setBreadcrumb", item);
    },
  },
  //计算属性
  computed: {
    //没有子菜单
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },

    //有子菜单
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },

    
    isCollapse()
    {
      return this.$store.state.tab.isCollapse
    }
  },
};
</script>


<style lang="less" scoped>

.el-menu{
  border-right: none;
}
.el-menu-vertical-demo {
  .el-menu-vertical-demo::-webkit-scrollbar {
    width: 0 !important;
  }

  .el-menu-vertical-demo {
    -ms-overflow-style: none;
  }

  .el-menu-vertical-demo {
    overflow: -moz-scrollbars-none;
  }
}
</style>