<template>
  <div class=" header">
    <!-- 基本信息区 -->
    <div class="header_info">
      <div class="title">
        <p>口腔诊所管理系统</p>
      </div>
      <div class="l-content">
        <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini"></el-button>
      </div>
      <div class="user">
        <!-- <el-avatar :size="40" shape="circle"></el-avatar> -->
        <el-dropdown>
          <span>{{this.userInfo.userName}}</span>
          <span class="el-dropdown-link">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="exitLogin()">退出登录</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header {
  height: 60px;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .header_info {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;

    .title {
      flex-grow: 30;

      p {
        margin-top: 22px;
        font-size: 22px;
        color: rgb(194, 189, 189);
        width: 220px;
      }
    }

    .l-content {
      display: flex;
      align-items: center;
      width: 100%;

      .el-button {
        margin-left: 5px;
      }
    }

    .user {
      // flex-grow: 1;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      grid-gap: 13px;
      padding-right: 5px;
    }
  }
}
</style>


<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
  data() {
    return {
      usreInfo:{},
    }
  },
  computed: {
    //将this.getDynamicTags 映射为 this.$store.getters.getDynamicTags
    ...mapGetters({ getDynamicTags: 'tagsView/getDynamicTags', userInfo: 'userInfo/getUserInfo' }),
    ...mapState("userInfo")
  },
  mounted(){
    this.userInfo=this.userInfo;
  },
  methods: {
    handleMenu() {
      this.$store.commit('collapseMenu')
    },

    ...mapMutations({
      clearUserInfo: 'userInfo/clearUserInfo',
      clearToken: 'token/clearToken',
      // clearRouters: 'routers/clearRouters',
      // closeAllTags: 'tagsView/closeAllTags',
    }),

    //退出登入、跳转登入页
    //退出登入(清除Token、断开signalR连接、清除所有标签页、跳转登入页)
    exitLogin() {
      this.clearUserInfo();
      // this.closeAllTags();
      this.clearToken();
      // this.clearRouters();
      this.$router.push({ name: 'login' });
    },
  },
}
</script>
