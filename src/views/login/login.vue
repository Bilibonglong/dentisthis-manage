<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>牙医后台管理系统</span>
      </div>
      <el-form label-width="80px" :model="form" ref="form" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginform.userid"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginform.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      loginform: {
        userid: "",
        password: "",
      },
      rules: {
        username: [
          { required: false, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },

  methods: {
    ///mapMutations是vuex的mutation的辅助函数，用于在组件中映射mutation内的方法，以便在该组件中直接使用mutation里的方法
    ...mapMutations({
      setTokenInfo: "token/setTokenInfo",
      setUserInfo: "userInfo/setUserInfo",
    }),
    login() {
      //.then((data)=>{ })里的data是指接口成功返回的数据,包含请求头,请求体,等信息;
        this.$api.login.login(this.loginform.userid, this.loginform.password).then((res) => {
          console.log(res);
          const { response, success, msg } = res.data;
          if (success) {
            try {
              this.setTokenInfo(response);
              this.setUserInfo(response.userInfo);
            } catch (err) {
              console.log(err);
            }
          } else {
            this.$message({
              message: msg,
              type: "error",
              center: true,
            });
          }
        });
    },
  },
};
</script>

<style lang="less">
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: cover;
  // background: url('../assets/bg.jpg') center no-repeat;
  background: url('../../assets/pexels-david-mceachan-91413.jpg') no-repeat;
  .el-card {
      background: #65768557;
  }
  .box-card {
    width: 450px;
    margin: 200px auto;
    color: #fff;
    .el-form .el-form-item__label {
        color: #fff;
    }
    .el-card__header {
      font-size: 34px;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>