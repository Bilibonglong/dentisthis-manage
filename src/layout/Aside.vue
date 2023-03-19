<template>
  <div class="slide">
    <el-menu
      default-active="$route.name"
      :router="true"
      background-color="#2A2D38"
      text-color="#bfcbd9"
      active-text-color="#049eff"
      :collapse="isCollapse"
    >
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

      <!-- 诊所管理 -->
      <el-submenu index="consultingroom">
        <template slot="title">
          <i class="el-icon-notebook-2"></i>
          <span>诊所管理</span>
        </template>
        <el-menu-item index="/consultingroom/employee" :to="{ name: 'employee'}" @click.native="clickMenu({ path: '/employee', name: 'employee', label: '员工管理' })">
          员工管理
        </el-menu-item>
        <el-menu-item index="/consultingroom/supplier/supplierList" :to="{ name: 'supplierList' }" @click.native="clickMenu({ path: '/supplierList', name: 'supplierList', label: '供应商列表' })">
          角色管理
        </el-menu-item>
        <el-menu-item index="/consultingroom/warehouse/warehouseList" :to="{ name: 'warehouseList'}" @click.native="clickMenu({ path: '/warehouseList', name: 'warehouseList', label: '仓库信息' })">
          诊所管理
        </el-menu-item>
      </el-submenu>

      <!-- 系统设置 -->
      <el-submenu index="sysSeting">
        <template slot="title">
          <i class="el-icon-notebook-2"></i>
          <span>系统设置</span>
        </template>
        <el-menu-item index="/baseInfo/goods/spuList" :to="{ name: 'spuList'}" @click.native="clickMenu({ path: '/spuList', name: 'spuList', label: '货品档案' })">
          病历模板
        </el-menu-item>
        <el-menu-item index="/baseInfo/supplier/supplierList" :to="{ name: 'supplierList' }" @click.native="clickMenu({ path: '/supplierList', name: 'supplierList', label: '供应商列表' })">
          症状库
        </el-menu-item>
      </el-submenu>

      <!--库房管理 -->
      <el-submenu index="warehouseManage">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span>库房管理</span>
        </template>
        <el-menu-item index="/warehouseManage/warehouse/warehouseManage" :to="{ name: 'warehouseManage'}" @click.native="clickMenu({ path: '/warehouseManage', name: 'warehouseManage', label: '仓库管理' })">
          药品库存
        </el-menu-item>
        <el-menu-item index="/warehouseManage/storageManage/storageBilling" :to="{ name: 'storageBilling'}" @click.native="clickMenu({ path: '/storageBilling', name: 'storageBilling', label: '入库管理' })">
          耗材库存
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
    background-color:rgb(42, 45, 56);

    text-align: left;
    border-right: none;
  }
}
</style>
