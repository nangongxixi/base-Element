<<<<<<< HEAD
<template>
  <div>
    <div class="page-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>民意征集</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <div style="margin:15px 0">
         <el-button v-if="role.add" type="success" size="medium" @click='editOpinion("add")' icon='el-icon-plus'>添加</el-button>
      </div>
      <template>
        <el-table
          v-loading="loading"
          :data="opinionList"
          stripe
          style="width: 100%"
          header-row-class-name="table-head">
          <el-table-column
            label="编号"
            width="150px"
            align="center"
            prop="number">
          </el-table-column>
          <el-table-column
            label="标题"
            width="150px"
            align="center"
            prop="title">
          </el-table-column>
          <el-table-column
            label="类型"
            align="center"
            width="200px">
            <template slot-scope="scope">
              {{scope.row.type | _type}}
            </template>
          </el-table-column>
          <el-table-column
            label="来源"
            align="center">
            <template slot-scope="scope">
              {{scope.row.source | _source}}
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            align="center"
            prop="createtime">
          </el-table-column>
          <el-table-column
            label="状态"
            align="center"
            prop="status">
            <template slot-scope="scope">
              {{scope.row.status === 0 ? '待处理' : '已办结'}}
            </template>
          </el-table-column>
          <el-table-column
            label="处理部门"
            align="center"
            prop="replyuser">
          </el-table-column>
          <el-table-column
            label="满意度"
            align="center"
            prop="satisfaction">
            <template slot-scope="scope">
              {{scope.row.satisfaction | _satisfaction}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="250px"
            align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="openOpinion(scope.row.id, scope.$index)">查看</el-button>
              <el-button
                v-if="role.edit"
                size="mini"
                type="success"
                @click="editOpinion(scope.row.id, scope.$index)">编辑</el-button>
              <el-button
              v-if="role.remove"
              size="mini"
              type="danger"
              @click="deleteOpinion(scope.row.id, scope.$index)">删除</el-button>
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
import api from '../store/api/opinion'
export default {
  data () {
    return {
      loading: false,
      totalpages: 1,
      params: {
        pageindex: 1
      },
      opinionList: [],
      roleList: null,
      role: {
        add: false,
        edit: false,
        remove: false
      }
    }
  },
  mounted () {
    this.getList()
    this.getRoleList()
  },
  filters: {
    _type (val) {
      let arr = ['咨询', '投诉', '求助']
      return arr[+val]
    },
    _source (val) {
      let arr = ['官网', 'APP', '微信']
      return arr[+val - 1]
    },
    _satisfaction (val) {
      let arr = ['非常满意', '基本满意', '一般', '待评价', '不满意', '非常不满意']
      return arr[+val]
    }
  },
  methods: {
    getRoleList () {
      this.roleList = JSON.parse(localStorage.getItem('roleList'))
      console.log(this.roleList)
      this.roleList.map((i) => {
        if (i.rightid === 10) {
          this.role.add = true
        }
        if (i.rightid === 11) {
          this.role.edit = true
        }
        if (i.rightid === 12) {
          this.role.remove = true
        }
      })
    },
    getList () {
      this.loading = true
      api.getOpinionList(this.params)
      .then((res) => {
        this.opinionList = res.datalist
        this.totalpages = res.totalpages
        this.loading = false
      })
    },
    openOpinion (id) {
      this.$router.push('/opinion/detail/' + id)
    },
    editOpinion (id, index) {
      this.$router.push('/opinion/edit/' + id)
    },
    deleteOpinion (id, index) {
      this.$confirm('此操作将永久删除该消息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteOpinion(id)
        .then((res) => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getList()
        })
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
          api.editOpinion(this.opinionForm)
          .then((res) => {
            console.log(res)
            this.dialogOpinionVisible = false
            this.$message({
              type: 'success',
              message: '提交成功'
            })
            this.getList()
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleCurrentChange (val) {
      api.getOpinionList({pageindex: val})
      .then((res) => {
        this.opinionList = res.datalist
        console.log(this.opinionList)
        this.totalpages = res.totalpages
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
=======
<template>
  <div>
    <div class="page-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>民意征集</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <div style="margin:15px 0">
         <el-button v-if="role.add" type="success" size="medium" @click='editOpinion("add")' icon='el-icon-plus'>添加</el-button>
      </div>
      <template>
        <el-table
          v-loading="loading"
          :data="opinionList"
          stripe
          style="width: 100%"
          header-row-class-name="table-head">
          <el-table-column
            label="编号"
            width="150px"
            align="center"
            prop="number">
          </el-table-column>
          <el-table-column
            label="标题"
            width="150px"
            align="center"
            prop="title">
          </el-table-column>
          <el-table-column
            label="类型"
            align="center"
            width="200px">
            <template slot-scope="scope">
              {{scope.row.type | _type}}
            </template>
          </el-table-column>
          <el-table-column
            label="来源"
            align="center">
            <template slot-scope="scope">
              {{scope.row.source | _source}}
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            align="center"
            prop="createtime">
          </el-table-column>
          <el-table-column
            label="状态"
            align="center"
            prop="status">
            <template slot-scope="scope">
              {{scope.row.status === 0 ? '待处理' : '已办结'}}
            </template>
          </el-table-column>
          <el-table-column
            label="处理部门"
            align="center"
            prop="replyuser">
          </el-table-column>
          <el-table-column
            label="满意度"
            align="center"
            prop="satisfaction">
            <template slot-scope="scope">
              {{scope.row.satisfaction | _satisfaction}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="250px"
            align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="openOpinion(scope.row.id, scope.$index)">查看</el-button>
              <el-button
                v-if="role.edit"
                size="mini"
                type="success"
                @click="editOpinion(scope.row.id, scope.$index)">编辑</el-button>
              <el-button
              v-if="role.remove"
              size="mini"
              type="danger"
              @click="deleteOpinion(scope.row.id, scope.$index)">删除</el-button>
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
import api from '../store/api/opinion'
export default {
  data () {
    return {
      loading: false,
      totalpages: 1,
      params: {
        pageindex: 1
      },
      opinionList: [],
      roleList: null,
      role: {
        add: false,
        edit: false,
        remove: false
      }
    }
  },
  mounted () {
    this.getList()
    this.getRoleList()
  },
  filters: {
    _type (val) {
      let arr = ['咨询', '投诉', '求助']
      return arr[+val]
    },
    _source (val) {
      let arr = ['官网', 'APP', '微信']
      return arr[+val - 1]
    },
    _satisfaction (val) {
      let arr = ['非常满意', '基本满意', '一般', '待评价', '不满意', '非常不满意']
      return arr[+val]
    }
  },
  methods: {
    getRoleList () {
      this.roleList = JSON.parse(localStorage.getItem('roleList'))
      console.log(this.roleList)
      this.roleList.map((i) => {
        if (i.rightid === 10) {
          this.role.add = true
        }
        if (i.rightid === 11) {
          this.role.edit = true
        }
        if (i.rightid === 12) {
          this.role.remove = true
        }
      })
    },
    getList () {
      this.loading = true
      api.getOpinionList(this.params)
      .then((res) => {
        this.opinionList = res.datalist
        this.totalpages = res.totalpages
        this.loading = false
      })
    },
    openOpinion (id) {
      this.$router.push('/opinion/detail/' + id)
    },
    editOpinion (id, index) {
      this.$router.push('/opinion/edit/' + id)
    },
    deleteOpinion (id, index) {
      this.$confirm('此操作将永久删除该消息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteOpinion(id)
        .then((res) => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getList()
        })
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
          api.editOpinion(this.opinionForm)
          .then((res) => {
            console.log(res)
            this.dialogOpinionVisible = false
            this.$message({
              type: 'success',
              message: '提交成功'
            })
            this.getList()
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleCurrentChange (val) {
      api.getOpinionList({pageindex: val})
      .then((res) => {
        this.opinionList = res.datalist
        console.log(this.opinionList)
        this.totalpages = res.totalpages
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296
