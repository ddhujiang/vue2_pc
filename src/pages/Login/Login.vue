<template>
  <div>
    <div class="leftImage">
      <div class="auth-catchphrase">
        <div style="margin:0 auto">
          <p class="auth-catchphrase-title">
            <span>vvschool</span>
          </p>
          <p class="auth-catchphrase-subTitle">
            <span>vue2</span>
          </p>
        </div>
      </div>
    </div>

    <div class="rightContent">
      <div class="login-container">
        <p class="title">邮箱账号登录</p>
        <el-form :model="auth" ref="loginForm" :rules="rules">
          <el-form-item prop="username">
            <el-input class="input" placeholder="请输入账号" v-model="auth.username" size="large"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input class="input" placeholder="请输入密码" type="password" v-model="auth.password" @keyup.enter.native="login"></el-input>
          </el-form-item>
        </el-form>
        <el-button class="login-btn" type="primary" :loading="submitting" @click="submit">登录</el-button>
      </div>
    </div>

    <div class="clearfloat"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
    name: "Login",
    props: {},
    data() {
        return {
            submitting: false,
            auth: {
                username: "",
                password: ""
            },
            rules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ]
            }
        };
    },
    methods: {
        ...mapActions("admin/account", ["login"]),
        submit() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.login({
                        vm: this,
                        username: this.auth.username,
                        password: this.auth.password
                    }).then(() => {

                    }).catch(()=>{
                      this.$message.error("账号密码错误");
                    });
                } else {
                    this.$message.error("表单校验失败");
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@keyframes blink {
    0%,
    100% {
        color: #aaa;
        background-color: #fff;
    }
    50% {
        background-color: #bbb;
        color: #fff;
    }
}

body {
    margin: 0px !important;
}

.leftImage {
    float: left;
    width: 55vw;
    height: 100vh;
    background: url("../../assets/login/banner.png");
}

.auth-catchphrase {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    height: 100%;
}

.auth-catchphrase-title {
    font-size: 55px;
    font-weight: normal;
    color: #ffffff;
    margin-bottom: 3rem;
    text-align: left;
}
.auth-catchphrase-subTitle {
    font-size: 50px;
    font-weight: lighter;
    color: #ffffff;
    margin-bottom: 3rem;
    margin: 0 auto;
    text-align: center;
}
.rightContent {
    float: left;
    width: 43vw;
    height: 100vh;
}

.login-container {
    width: 250px;
    margin: 300px auto 0;
}

.title {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: lighter;
    text-align: center;
}

.input {
    margin-bottom: 6px;
}

.login-btn {
    width: 100%;
}

.clearfloat {
    clear: both;
}

.forgetPassword {
    float: right;
    cursor: pointer;
    color: #4db3ff;
    text-decoration: none;
}
</style>
