<<<<<<< HEAD
<template>
  <el-container class="wrapper">
    <el-aside width="256px" class="menu">
      <el-row>
        <div class="logo">射阳政务后台管理系统</div>
      </el-row>
      <el-row class="tac">
        <el-menu
          router
          unique-opened
          :default-active="activeIndex"
          @select="handleSelect"
          class="el-menu-vertical-demo"
          background-color="#5069c4"
          text-color="#f9f9f9"
          ref="nav"
          active-text-color="#ffd04b">
          <el-menu-item index="/order">
            <i class="iconfont icon-order"></i>
            <span slot="title">工单管理</span>
          </el-menu-item>
          <el-menu-item index="/column">
            <i class="iconfont icon-createtask"></i>
            <span slot="title">栏目管理</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <i class="iconfont icon-document"></i>
            <span slot="title">文章管理</span>
          </el-menu-item>
          <el-menu-item index="/message">
            <i class="iconfont icon-interactive"></i>
            <span slot="title">消息管理</span>
          </el-menu-item>
          <el-menu-item index="/user">
            <i class="iconfont icon-group"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-submenu index="">
            <template slot="title">
              <i class="iconfont icon-unlock"></i>
              <span>员工管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/employee">账号管理</el-menu-item>
              <el-menu-item index="/role">角色管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/opinion">
            <i class="iconfont icon-group"></i>
            <span slot="title">民意征集</span>
          </el-menu-item>
        </el-menu>
      </el-row>
    </el-aside>
    <el-container class="main">
      <el-header class="header" height="64px">
        <el-row>
          <el-col :span="24">
            <div class="user-bar">
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  <img v-if="!employeeInfo.imgpath" src="./assets/images/avatar.png" alt="">
                  <img v-if="employeeInfo.imgpath" :src="employeeInfo.imgpath" alt="">{{employeeInfo.name}}
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <transition name="slide-fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data () {
      return {
        activeIndex: this.$route.path.split('/').splice(0, 2).join('/')
      }
    },
    computed: {
      employeeInfo: function () {
        if (localStorage.getItem('userinfo')) {
          return JSON.parse(localStorage.getItem('userinfo'))
        } else {
          return this.$store.state.employeeInfo
        }
      },
      roleList: function () {
        if (localStorage.getItem('roleList')) {
          return JSON.parse(localStorage.getItem('roleList'))
        } else {
          return this.$store.state.roleList
        }
      }
    },
    mounted () {
    },
    methods: {
      handleCommand (command) {
        localStorage.removeItem('userinfo')
        localStorage.removeItem('roleList')
        this.$router.push({path: '/'})
        this.$store.state.com.loading = false
      },
      handleSelect (index) {
        this.activeIndex = index
        console.log(index)
      }
    }
  }
</script>


<style lang="less" scoped>
.wrapper {
  height: 100%;
  display: flex;
}

.menu {
  z-index: 10;
  height: 100%;
  background: #5069c4;
}

.main {
  flex: 1;
  min-height: 100%;
}

.header {
  z-index: 9;
  background-color: #fff;
  color: #000000a6;
  line-height: 64px;
  font-size: 15px;
  padding: 0 20px 0 0;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.header-logo {
  display: inline-block;
  vertical-align: middle;
}

.logo {
  color: #fff;
  background: #5069c4;
  padding: 0 20px;
  height: 64px;
  line-height: 64px;
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  img {
    width: 40px;
  }
}

.user-bar {
  text-align: right;
  font-size: 14px;
  color: #cacaca;
  height: 30px;
  line-height: 30px;
  margin: 15px;
  cursor: pointer;
  img {
    float: left;
    margin: 2px 10px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
}
</style>
=======
<template>
  <el-container class="wrapper">
    <el-aside width="256px" class="menu">
      <el-row>
        <div class="logo">射阳政务后台管理系统</div>
      </el-row>
      <el-row class="tac">
        <el-menu
          router
          unique-opened
          :default-active="activeIndex"
          @select="handleSelect"
          class="el-menu-vertical-demo"
          background-color="#5069c4"
          text-color="#f9f9f9"
          ref="nav"
          active-text-color="#ffd04b">
          <el-menu-item index="/order">
            <i class="iconfont icon-order"></i>
            <span slot="title">工单管理</span>
          </el-menu-item>
          <el-menu-item index="/column">
            <i class="iconfont icon-createtask"></i>
            <span slot="title">栏目管理</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <i class="iconfont icon-document"></i>
            <span slot="title">文章管理</span>
          </el-menu-item>
          <el-menu-item index="/message">
            <i class="iconfont icon-interactive"></i>
            <span slot="title">消息管理</span>
          </el-menu-item>
          <el-menu-item index="/user">
            <i class="iconfont icon-group"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-submenu index="">
            <template slot="title">
              <i class="iconfont icon-unlock"></i>
              <span>员工管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/employee">账号管理</el-menu-item>
              <el-menu-item index="/role">角色管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/opinion">
            <i class="iconfont icon-group"></i>
            <span slot="title">民意征集</span>
          </el-menu-item>
        </el-menu>
      </el-row>
    </el-aside>
    <el-container class="main">
      <el-header class="header" height="64px">
        <el-row>
          <el-col :span="24">
            <div class="user-bar">
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  <img v-if="!employeeInfo.imgpath" src="./assets/images/avatar.png" alt="">
                  <img v-if="employeeInfo.imgpath" :src="employeeInfo.imgpath" alt="">{{employeeInfo.name}}
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <transition name="slide-fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data () {
      return {
        activeIndex: this.$route.path.split('/').splice(0, 2).join('/')
      }
    },
    computed: {
      employeeInfo: function () {
        if (localStorage.getItem('userinfo')) {
          return JSON.parse(localStorage.getItem('userinfo'))
        } else {
          return this.$store.state.employeeInfo
        }
      },
      roleList: function () {
        if (localStorage.getItem('roleList')) {
          return JSON.parse(localStorage.getItem('roleList'))
        } else {
          return this.$store.state.roleList
        }
      }
    },
    mounted () {
    },
    methods: {
      handleCommand (command) {
        localStorage.removeItem('userinfo')
        localStorage.removeItem('roleList')
        this.$router.push({path: '/'})
        this.$store.state.com.loading = false
      },
      handleSelect (index) {
        this.activeIndex = index
        console.log(index)
      }
    }
  }
</script>


<style lang="less" scoped>
.wrapper {
  height: 100%;
  display: flex;
}

.menu {
  z-index: 10;
  height: 100%;
  background: #5069c4;
}

.main {
  flex: 1;
  min-height: 100%;
}

.header {
  z-index: 9;
  background-color: #fff;
  color: #000000a6;
  line-height: 64px;
  font-size: 15px;
  padding: 0 20px 0 0;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.header-logo {
  display: inline-block;
  vertical-align: middle;
}

.logo {
  color: #fff;
  background: #5069c4;
  padding: 0 20px;
  height: 64px;
  line-height: 64px;
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  img {
    width: 40px;
  }
}

.user-bar {
  text-align: right;
  font-size: 14px;
  color: #cacaca;
  height: 30px;
  line-height: 30px;
  margin: 15px;
  cursor: pointer;
  img {
    float: left;
    margin: 2px 10px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
}
</style>
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296
