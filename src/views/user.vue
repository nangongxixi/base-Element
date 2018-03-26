<<<<<<< HEAD
<template>
  <div>
    <div class="page-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <template>
        <el-table
          :data="userlist"
          stripe
          v-loading="loading"
          style="width: 100%"
          header-row-class-name="table-head">
          <el-table-column
            label="用户ID"
            width="150px"
            align="center"
            prop="userid">
          </el-table-column>
          <el-table-column
            width="150px"
            align="center"
            label="用户头像">
            <template slot-scope="scope">
              <div class="poster" v-if="scope.row.headguid" :style="{ backgroundImage: 'url(' + scope.row.headguid + ')' }"></div>
              <div class="poster" v-if="!scope.row.headguid"></div>
            </template>
          </el-table-column>
          <el-table-column
            label="用户名称"
            align="center"
            prop="name">
          </el-table-column>
          <el-table-column
            label="状态"
            align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.userstatus === 0 ? 'info' : 'success'">
                {{ scope.row.userstatus === 0 ? '已禁用' : '已启用' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="手机号"
            align="center"
            prop="phone">
          </el-table-column>
          <el-table-column
            label="创建时间"
            align="center"
            prop="createtime">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
                <el-button
                v-if="role.edit"
                size="mini"
                :type="scope.row.userstatus === 1 ? 'primary' : 'success'"
                @click="setStatus(scope.$index)">
                  {{ scope.row.userstatus === 1 ? '禁用' : '启用' }}
                </el-button>
                <el-button
                v-if="role.remove"
                size="mini"
                type="danger"
                @click="todelete(scope.row.userid, scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div style="margin:15px 0;text-align:right">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :page-count="totalpages">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../store/api/user'
export default {
  data () {
    return {
      userlist: [],
      loading: false,
      totalpages: 1,
      roleList: null,
      role: {
        edit: false,
        remove: false
      }
    }
  },
  mounted () {
    this.getUserList()
    this.getRoleList()
  },
  methods: {
    getRoleList () {
      this.roleList = JSON.parse(localStorage.getItem('roleList'))
      console.log(this.roleList)
      this.roleList.map((i) => {
        if (i.rightid === 22) {
          this.role.edit = true
        }
        if (i.rightid === 23) {
          this.role.remove = true
        }
      })
    },
    getUserList (page = 1) {
      this.loading = true
      api.getUserList({pageindex: page})
      .then((res) => {
        console.log(res)
        this.userlist = res.datalist
        this.totalpages = res.totalpages
        this.loading = false
      })
    },
    handleCurrentChange (val) {
      console.log(val)
      this.getUserList(val)
    },
    setStatus (index) {
      let params = {
        userid: this.userlist[index].userid,
        status: Math.abs(this.userlist[index].userstatus - 1)
      }
      api.edited(params)
      .then((res) => {
        console.log(res)
        this.userlist[index].userstatus = params.status
      })
    },
    todelete (id, index) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteUser(id)
        .then((res) => {
          if (res.code === 0) {
            return this.$message.error(res.msg)
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.userlist.splice(index, 1)
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.poster {
  margin: 0 auto;
  width: 40px;
  height: 40px;
  display: block;
  background: url(../assets/images/avatar.png) no-repeat center;
  background-size: 32px;
}
</style>
=======
<template>
  <div>
    <div class="page-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <template>
        <el-table
          :data="userlist"
          stripe
          v-loading="loading"
          style="width: 100%"
          header-row-class-name="table-head">
          <el-table-column
            label="用户ID"
            width="150px"
            align="center"
            prop="userid">
          </el-table-column>
          <el-table-column
            width="150px"
            align="center"
            label="用户头像">
            <template slot-scope="scope">
              <div class="poster" v-if="scope.row.headguid" :style="{ backgroundImage: 'url(' + scope.row.headguid + ')' }"></div>
              <div class="poster" v-if="!scope.row.headguid"></div>
            </template>
          </el-table-column>
          <el-table-column
            label="用户名称"
            align="center"
            prop="name">
          </el-table-column>
          <el-table-column
            label="状态"
            align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.userstatus === 0 ? 'info' : 'success'">
                {{ scope.row.userstatus === 0 ? '已禁用' : '已启用' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="手机号"
            align="center"
            prop="phone">
          </el-table-column>
          <el-table-column
            label="创建时间"
            align="center"
            prop="createtime">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
                <el-button
                v-if="role.edit"
                size="mini"
                :type="scope.row.userstatus === 1 ? 'primary' : 'success'"
                @click="setStatus(scope.$index)">
                  {{ scope.row.userstatus === 1 ? '禁用' : '启用' }}
                </el-button>
                <el-button
                v-if="role.remove"
                size="mini"
                type="danger"
                @click="todelete(scope.row.userid, scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div style="margin:15px 0;text-align:right">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :page-count="totalpages">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../store/api/user'
export default {
  data () {
    return {
      userlist: [],
      loading: false,
      totalpages: 1,
      roleList: null,
      role: {
        edit: false,
        remove: false
      }
    }
  },
  mounted () {
    this.getUserList()
    this.getRoleList()
  },
  methods: {
    getRoleList () {
      this.roleList = JSON.parse(localStorage.getItem('roleList'))
      console.log(this.roleList)
      this.roleList.map((i) => {
        if (i.rightid === 22) {
          this.role.edit = true
        }
        if (i.rightid === 23) {
          this.role.remove = true
        }
      })
    },
    getUserList (page = 1) {
      this.loading = true
      api.getUserList({pageindex: page})
      .then((res) => {
        console.log(res)
        this.userlist = res.datalist
        this.totalpages = res.totalpages
        this.loading = false
      })
    },
    handleCurrentChange (val) {
      console.log(val)
      this.getUserList(val)
    },
    setStatus (index) {
      let params = {
        userid: this.userlist[index].userid,
        status: Math.abs(this.userlist[index].userstatus - 1)
      }
      api.edited(params)
      .then((res) => {
        console.log(res)
        this.userlist[index].userstatus = params.status
      })
    },
    todelete (id, index) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteUser(id)
        .then((res) => {
          if (res.code === 0) {
            return this.$message.error(res.msg)
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.userlist.splice(index, 1)
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.poster {
  margin: 0 auto;
  width: 40px;
  height: 40px;
  display: block;
  background: url(../assets/images/avatar.png) no-repeat center;
  background-size: 32px;
}
</style>
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296
