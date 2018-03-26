<<<<<<< HEAD
<template>
  <div class="login-wrap" v-loading="loading">
    <div class="login-box">
      <div>
        <el-form ref="loginForm" :rules="rules" :model="loginForm" width="200px;">
          <el-form-item prop="loginaccount">
            <el-input 
            placeholder="请输入账户名"
            v-model="loginForm.loginaccount"
            auto-complete="off">
            </el-input>
          </el-form-item>
          <el-form-item prop="loginpwd">
            <el-input 
              placeholder="请输入密码" 
              v-model="loginForm.loginpwd"
              type="password"
              auto-complete="off"
              @keyup.enter.native="submitForm('loginForm')">
            </el-input>
          </el-form-item>
          <el-button class="login-btn" type="primary" @click="submitForm('loginForm')">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      loginForm: {
        loginaccount: '',
        loginpwd: ''
      },
      rules: {
        loginaccount: [
          { required: true, message: '请输入账户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        loginpwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'loginStatus',
      'loading'
    ])
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('login', this.loginForm)
        }
      })
    }
  }
}
</script>

<style lang="less">
  .login-wrap {
    height: 100%;
    background: url(../assets/images/login-bg.svg);
  }

  .login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    .login-btn {
      width: 100%;
    }
  }
</style>
=======
<template>
  <div class="login-wrap" v-loading="loading">
    <div class="login-box">
      <div>
        <el-form ref="loginForm" :rules="rules" :model="loginForm" width="200px;">
          <el-form-item prop="loginaccount">
            <el-input 
            placeholder="请输入账户名"
            v-model="loginForm.loginaccount"
            auto-complete="off">
            </el-input>
          </el-form-item>
          <el-form-item prop="loginpwd">
            <el-input 
              placeholder="请输入密码" 
              v-model="loginForm.loginpwd"
              type="password"
              auto-complete="off"
              @keyup.enter.native="submitForm('loginForm')">
            </el-input>
          </el-form-item>
          <el-button class="login-btn" type="primary" @click="submitForm('loginForm')">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      loginForm: {
        loginaccount: '',
        loginpwd: ''
      },
      rules: {
        loginaccount: [
          { required: true, message: '请输入账户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        loginpwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'loginStatus',
      'loading'
    ])
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('login', this.loginForm)
        }
      })
    }
  }
}
</script>

<style lang="less">
  .login-wrap {
    height: 100%;
    background: url(../assets/images/login-bg.svg);
  }

  .login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    .login-btn {
      width: 100%;
    }
  }
</style>
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296
