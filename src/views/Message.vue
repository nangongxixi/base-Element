<<<<<<< HEAD
<template>
  <div>
    <div class="page-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>消息管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <div style="margin:15px 0">
         <el-button v-if="role.add" type="success" size="medium" @click='editMsg()' icon='el-icon-plus'>添加消息</el-button>
      </div>
      <template>
        <el-table
          v-loading="loading"
          :data="msgList"
          stripe
          style="width: 100%"
          header-row-class-name="table-head">
          <el-table-column
            label="编号"
            width="150px"
            align="center"
            prop="sysid">
          </el-table-column>
          <el-table-column
            label="日期"
            width="150px"
            align="center"
            prop="creatatime">
          </el-table-column>
          <el-table-column
            label="名称"
            align="center"
            width="200px"
            prop="title">
          </el-table-column>
          <el-table-column
            label="内容"
            align="center">
             <template slot-scope="scope">
               {{scope.row.content.substr(0, 50) + '...'}}
             </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="250px"
            align="center">
            <template slot-scope="scope">
              <el-button
                v-if="role.edit"
                size="mini"
                type="primary"
                @click="showMsg(scope.row.sysid, scope.$index)">查看</el-button>
              <el-button
                v-if="role.edit"
                size="mini"
                type="success"
                @click="editMsg(scope.row.sysid, scope.$index)">编辑</el-button>
              <el-button
              v-if="role.remove"
              size="mini"
              type="danger"
              @click="deleteMsg(scope.row.sysid, scope.$index)">删除</el-button>
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
    <el-dialog :visible.sync="dialogMsgVisible" width="500px">
      <el-form :model="msgForm" :rules="rules" ref="msgForm" label-width="100px">
        <el-form-item label="消息名称" prop="title">
          <el-input v-model="msgForm.title" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="消息内容" prop="content">
           <el-input type="textarea" v-model="msgForm.content" autosize style="width:300px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('msgForm')">提交</el-button>
          <el-button @click="resetForm('msgForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogDetailVisible"
      width="30%">
      <h3 class="detail-title">{{detail.title}}</h3>
      <div class="content">{{detail.content}}</div>
    </el-dialog>
  </div>
</template>

<script>
import api from '../store/api/message'
export default {
  data () {
    return {
      loading: false,
      dialogMsgVisible: false,
      dialogDetailVisible: false,
      totalpages: 1,
      params: {
        pageindex: 1
      },
      msgList: [],
      msgForm: {
        msgid: '',
        title: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入消息名称', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入消息内容', trigger: 'blur' }
        ]
      },
      roleList: null,
      role: {
        add: false,
        edit: false,
        remove: false
      },
      detail: {}
    }
  },
  mounted () {
    this.getList()
    this.getRoleList()
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
      api.getMsgList(this.params)
      .then((res) => {
        this.msgList = res.datalist
        this.totalpages = res.totalpages
        this.loading = false
      })
    },
    showMsg (id, index) {
      this.dialogDetailVisible = true
      this.detail = this.msgList[index]
    },
    editMsg (id, index) {
      this.dialogMsgVisible = true
      if (id === undefined && index === undefined) {
        this.msgForm = {
          msgid: '',
          title: '',
          content: ''
        }
        return
      }
      this.msgForm = {
        msgid: this.msgList[index].sysid,
        title: this.msgList[index].title,
        content: this.msgList[index].content
      }
      console.log(this.msgList[index])
    },
    deleteMsg (id, index) {
      this.$confirm('此操作将永久删除该消息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteMsg(id)
        .then((res) => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
          api.editMsg(this.msgForm)
          .then((res) => {
            console.log(res)
            this.dialogMsgVisible = false
            this.$message({
              type: 'success',
              message: '提交成功'
            })
            this.getList()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleCurrentChange (val) {
      api.getMsgList({pageindex: val})
      .then((res) => {
        this.msgList = res.datalist
        console.log(this.msgList)
        this.totalpages = res.totalpages
      })
    }
  }
}
</script>

<style lang="less" scoped>
.detail-title {
  text-align: center;
  font-size: 18px;
  color: #333;
}
</style>
=======
<template>
  <div>
    <div class="page-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>消息管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <div style="margin:15px 0">
         <el-button v-if="role.add" type="success" size="medium" @click='editMsg()' icon='el-icon-plus'>添加消息</el-button>
      </div>
      <template>
        <el-table
          v-loading="loading"
          :data="msgList"
          stripe
          style="width: 100%"
          header-row-class-name="table-head">
          <el-table-column
            label="编号"
            width="150px"
            align="center"
            prop="sysid">
          </el-table-column>
          <el-table-column
            label="日期"
            width="150px"
            align="center"
            prop="creatatime">
          </el-table-column>
          <el-table-column
            label="名称"
            align="center"
            width="200px"
            prop="title">
          </el-table-column>
          <el-table-column
            label="内容"
            align="center">
             <template slot-scope="scope">
               {{scope.row.content.substr(0, 50) + '...'}}
             </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="250px"
            align="center">
            <template slot-scope="scope">
              <el-button
                v-if="role.edit"
                size="mini"
                type="primary"
                @click="showMsg(scope.row.sysid, scope.$index)">查看</el-button>
              <el-button
                v-if="role.edit"
                size="mini"
                type="success"
                @click="editMsg(scope.row.sysid, scope.$index)">编辑</el-button>
              <el-button
              v-if="role.remove"
              size="mini"
              type="danger"
              @click="deleteMsg(scope.row.sysid, scope.$index)">删除</el-button>
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
    <el-dialog :visible.sync="dialogMsgVisible" width="500px">
      <el-form :model="msgForm" :rules="rules" ref="msgForm" label-width="100px">
        <el-form-item label="消息名称" prop="title">
          <el-input v-model="msgForm.title" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="消息内容" prop="content">
           <el-input type="textarea" v-model="msgForm.content" autosize style="width:300px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('msgForm')">提交</el-button>
          <el-button @click="resetForm('msgForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogDetailVisible"
      width="30%">
      <h3 class="detail-title">{{detail.title}}</h3>
      <div class="content">{{detail.content}}</div>
    </el-dialog>
  </div>
</template>

<script>
import api from '../store/api/message'
export default {
  data () {
    return {
      loading: false,
      dialogMsgVisible: false,
      dialogDetailVisible: false,
      totalpages: 1,
      params: {
        pageindex: 1
      },
      msgList: [],
      msgForm: {
        msgid: '',
        title: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入消息名称', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入消息内容', trigger: 'blur' }
        ]
      },
      roleList: null,
      role: {
        add: false,
        edit: false,
        remove: false
      },
      detail: {}
    }
  },
  mounted () {
    this.getList()
    this.getRoleList()
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
      api.getMsgList(this.params)
      .then((res) => {
        this.msgList = res.datalist
        this.totalpages = res.totalpages
        this.loading = false
      })
    },
    showMsg (id, index) {
      this.dialogDetailVisible = true
      this.detail = this.msgList[index]
    },
    editMsg (id, index) {
      this.dialogMsgVisible = true
      if (id === undefined && index === undefined) {
        this.msgForm = {
          msgid: '',
          title: '',
          content: ''
        }
        return
      }
      this.msgForm = {
        msgid: this.msgList[index].sysid,
        title: this.msgList[index].title,
        content: this.msgList[index].content
      }
      console.log(this.msgList[index])
    },
    deleteMsg (id, index) {
      this.$confirm('此操作将永久删除该消息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteMsg(id)
        .then((res) => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
          api.editMsg(this.msgForm)
          .then((res) => {
            console.log(res)
            this.dialogMsgVisible = false
            this.$message({
              type: 'success',
              message: '提交成功'
            })
            this.getList()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleCurrentChange (val) {
      api.getMsgList({pageindex: val})
      .then((res) => {
        this.msgList = res.datalist
        console.log(this.msgList)
        this.totalpages = res.totalpages
      })
    }
  }
}
</script>

<style lang="less" scoped>
.detail-title {
  text-align: center;
  font-size: 18px;
  color: #333;
}
</style>
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296
