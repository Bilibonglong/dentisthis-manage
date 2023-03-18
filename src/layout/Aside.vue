<template>
  <div class="aside">
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
      <h3 style="height: auto">牙医管家</h3>
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
        <el-menu-item-group
          v-for="subItem in item.children"
          :key="subItem.path"
        >
          <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{
            subItem.label
          }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<style lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
  min-height: 400px;
}
.aside {
  height: 100vh;
  width: 150px;
  background-color: #545c64;
}

.el-menu {
  height: auto;
  /* -webkit-overflow-scrolling: display: none;; */
  border: none;
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
          label: "患者",
          icon: "video-play",
          url: "mall/index",
        },
        {
          path: "/subscribe",
          name: "subscribe",
          label: "预约",
          icon: "user",
          url: "User/index",
        },
        {
          label: "诊所管理",
          icon: "location",
          children: [
            {
              label: "员工管理",
              icon: "setting",
              url: "system/employee",
            },
            {
              label: "角色设置",
              icon: "setting",
              url: "storehouse/index",
            },
            {
              label: "诊所设置",
              icon: "setting",
              url: "storehouse/index",
            },
          ],
        },
        {
          label: "库房管理",
          icon: "location",
          children: [
            {
              label: "药品库存",
              icon: "setting",
              url: "system/employee",
            },
            {
              label: "耗材库存",
              icon: "setting",
              url: "storehouse/index",
            }
          ],
        },
        {
          label: "系统设置",
          icon: "location",
          children: [
            {
              label: "病例模板",
              icon: "setting",
              url: "system/employee",
            },
            {
              label: "症状库",
              icon: "setting",
              url: "storehouse/index",
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

    //二级菜单
    hasChildren() {
      console.log("asd");
      console.log(this.menu);
      return this.menu.filter((item) => item.children);
    },

    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },
};
</script>
