<template>
  <div class="slide">
    <el-menu default-active="$route.name" :router="true" background-color="#2A2D38" text-color="#bfcbd9"
      active-text-color="#049eff" :collapse="isCollapse">
      <el-menu-item index="/home" @click.native="clickMenu({ path: '/home', name: 'home', label: '首页' })">
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </el-menu-item>

      <el-menu-item index="/patient" @click.native="clickMenu({ path: '/patient', name: 'patient', label: '患者' })">
        <i class="el-icon-s-home"></i>
        <span>患者</span>
      </el-menu-item>

      <el-menu-item index="/subscribe" @click.native="clickMenu({ path: '/subscribe', name: 'subscribe', label: '预约' })">
        <i class="el-icon-s-home"></i>
        <span>预约</span>
      </el-menu-item>

 
      <el-menu-item index="/doctorWorkStation" @click.native="clickMenu({ path: '/doctorWorkStation', name: 'doctorWorkStation', label: '医生工作站' })">
        <i class="el-icon-suitcase"></i>
        <span>医生工作站</span>
      </el-menu-item>

      <!-- 诊所管理 -->
      <el-submenu index="consultingroom">
        <template slot="title">
          <i class="el-icon-notebook-2"></i>
          <span>诊所管理</span>
        </template>
        <el-menu-item index="/consultingroom/employee" :to="{ name: 'employee' }"
          @click.native="clickMenu({ path: '/employee', name: 'employee', label: '员工管理' })">
          员工管理 
        </el-menu-item>
        <el-menu-item index="/consultingroom/role" :to="{ name: 'role' }"
          @click.native="clickMenu({ path: '/role', name: 'role', label: '角色信息' })">
          角色管理
        </el-menu-item>
        <el-menu-item index="/consultingroom/finance" :to="{ name: 'finance' }"
          @click.native="clickMenu({ path: '/finance', name: 'finance', label: '营收管理' })">
          营收管理
        </el-menu-item>
      </el-submenu>

      <!-- 系统设置 -->
      <el-submenu index="system">
        <template slot="title">
          <i class="el-icon-notebook-2"></i>
          <span>系统设置</span>
        </template>
        <el-menu-item index="/system/healItem" :to="{ name: 'healItem' }"
          @click.native="clickMenu({ path: '/healItem', name: 'healItem', label: '货品档案' })">
          病历模板
        </el-menu-item>
        <el-menu-item index="/system/healItem" :to="{ name: 'healItem' }"
          @click.native="clickMenu({ path: '/healItem', name: 'healItem', label: '供应商列表' })">
          症状库
        </el-menu-item>
        <el-menu-item index="/system/healItem" :to="{ name: 'healItem' }"
          @click.native="clickMenu({ path: '/healItem', name: 'healItem', label: '医疗项目' })">
          医疗项目
        </el-menu-item>
      </el-submenu>

      <!--库房管理 -->
      <el-submenu index="storehouse">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span>库房管理</span>
        </template>
        <el-menu-item index="/storehouse/storehouseInfo/" :to="{ name: 'storehouseInfo' }"
          @click.native="clickMenu({ path: '/storehouseInfo', name: 'storehouseInfo', label: '库房信息' })">
          库存信息
        </el-menu-item>
      </el-submenu>

    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },
  methods: {
    clickMenu(item) {
      this.$router.push({
        name: item.name,
      });
      this.$store.commit('selectMenu', item);
    },
  },
};
</script>
<style lang="less" scoped>
.slide {
  height: 100%;
  overflow: hidden;

  .el-menu {
    min-height: 100%;
    // color: #bfcbd9;
    background-color: rgb(42, 45, 56);

    text-align: left;
    border-right: none;
  }
}
</style>
