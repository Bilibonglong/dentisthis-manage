<template>
  <el-menu router>
    <div v-for="(item, index) in submenuList" :key="index">
      <!-- 一级菜单（没有任何子级菜单）-->
      <el-menu-item :index="item.path" v-if="!item.menuList">{{
        item.title
      }}</el-menu-item>
      <!-- 一级菜单（有子级菜单）-->
      <el-submenu :index="item.path" v-else>
        <template slot="title">{{ item.title }}</template>

        <!-- 遍历二级菜单容器 -->
        <div v-for="(i, index) in item.menuList" :key="index">
          <!-- 判断二级菜单（没有三级菜单）-->
          <el-menu-item :index="i.path" v-if="!i.list">{{
            i.title
          }}</el-menu-item>

          <!-- 判断二级菜单（有三级菜单）-->
          <el-submenu :index="i.path" v-if="i.list">
            <template slot="title">{{ i.title }}</template>
            <el-menu-item
              :index="j.path"
              v-for="(j, index) in i.list"
              :key="index"
              >{{ j.title }}
            </el-menu-item>
          </el-submenu>
        </div>
      </el-submenu>
    </div>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      submenuList: [
        {
          title: "概况",
          path: "/",
          icon: "el-icon-menu",
        },
        {
          title: "商铺",
          path: "/shop",
          icon: "el-icon-menu",
          menuList: [
            {
              title: "商铺设置",
              path: "/shop/overview",
              list: [
                {
                  title: "商铺分类",
                  path: "/",
                },
                {
                  title: "商铺采集",
                  path: "/",
                },
              ],
            },
            {
              title: "标签设置",
              path: "/shop/labels",
            },
          ],
        },
        {
          title: "订单",
          path: "/order",
          icon: "el-icon-menu",
          menuList: [
            {
              title: "订单设置",
              path: "/order/setting",
            },
            {
              title: "列表",
              path: "/order/group",
              list: [
                {
                  title: "团购分类",
                  path: "/",
                },
                {
                  title: "团购采集",
                  path: "/",
                },
              ],
            },
          ],
        },
      ],
    };
  },
};
</script>