<template>
  <div class="homeAsideContainer">
    <div>
      <el-menu default-active="2" class="el-menu-vertical-demo">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">今日就诊 &nbsp;<el-tag type="success">0</el-tag></span>          

        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">明日预约</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-menu"></i>
          <span slot="title">今日结算</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-menu"></i>
          <span slot="title">今日代缴费</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-menu"></i>
          <span slot="title">库存低量警报 &nbsp;<el-tag type="success">0</el-tag></span>
        </el-menu-item>
      </el-menu>

      <!-- <el-button type="success">成功按钮</el-button> -->
    </div>

    <div>
        <el-button type="success">新建患者+</el-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
// .homeAsideContainer{
//     background-color: red;
// }
.el-menu-vertical-demo{
    height: 75vh;
    width: 200px;

}
</style>