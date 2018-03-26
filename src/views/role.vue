<<<<<<< HEAD
<template>
  <div>
    <div class="page-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <div style="margin:0 0 15px 0">
         <el-button v-if="role.add" type="primary" size="medium" @click='add()' icon='el-icon-plus'>新增角色</el-button>
      </div>
      <template>
        <el-table
          :data="roleList"
          stripe
          v-loading="loading"
          style="width: 100%"
          header-row-class-name="table-head">
          <el-table-column
            label="员工ID"
            width="170px"
            align="center"
            prop="roleid">
          </el-table-column>
          <el-table-column
            label="名称"
            align="center"
            prop="name">
          </el-table-column>
          <el-table-column
            label="描述"
            align="center"
            prop="describe">
          </el-table-column>
          <el-table-column
            label="备注"
            align="center"
            prop="remark">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
                <el-button
                v-if="role.edit"
                size="mini"
                type="success"
                @click="toEdit(scope.row.roleid, scope.$index)">编辑</el-button>
                <el-button
                v-if="role.remove"
                size="mini"
                type="danger"
                @click="todelete(scope.row.roleid, scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin:15px 0;text-align:right">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :page-count="totalpages">
          </el-pagination>
        </div>
      </template>
      <el-dialog :visible.sync="dialogVisible" width="900px" :before-close="handleBeforeClose">
        <el-form :model="roleForm" :rules="rules" ref="roleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="角色名称" prop="name">
            <el-input size="medium" v-model="roleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="describe">
            <el-input size="medium" v-model="roleForm.describe"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input size="medium" type="textarea" aotusize v-model="roleForm.remark"></el-input>
          </el-form-item>
          <el-form-item label="权限集合" prop="checkedItem">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="roleForm.checkedItem" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="item in items" :label="item.rightid" :key="item.rightid">{{item.rightname}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('roleForm')">立即创建</el-button>
            <el-button @click="resetForm('roleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import api from '../store/api/employee'
export default {
  data () {
    return {
      totalpages: 1,
      dialogVisible: false,
      loading: false,
      roleList: [],
      pageindex: 1,
      roleForm: {
        roleid: '',
        name: '',
        describe: '',
        remark: '',
        status: 0,
        jurisdictions: [],
        checkedItem: []
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        describe: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ],
        checkedItem: [
          { type: 'array', required: true, message: '请至少选择一个栏目', trigger: 'change' }
        ]
      },
      checkAll: false,
      items: [],
      isIndeterminate: true,
      _roleList: null,
      role: {
        add: false,
        edit: false,
        remove: false
      }
    }
  },
  mounted () {
    this.getRoleList()
    this.getAllRightList()
    this._getRoleList()
  },
  methods: {
    _getRoleList () {
      this._roleList = JSON.parse(localStorage.getItem('roleList'))
      console.log(this._roleList)
      this._roleList.map((i) => {
        if (i.rightid === 18) {
          this.role.add = true
        }
        if (i.rightid === 19) {
          this.role.edit = true
        }
        if (i.rightid === 20) {
          this.role.remove = true
        }
      })
    },
    getRoleList () {
      this.loading = true
      api.getRoleList({pageindex: this.pageindex})
      .then((res) => {
        this.totalpages = res.totalpages
        this.roleList = res.datalist
        this.loading = false
      })
    },
    handleCurrentChange (val) {
      this.pageindex = +val
      this.getRoleList()
    },
    add () {
      this.dialogVisible = true
    },
    toEdit (id, index) {
      this.dialogVisible = true
      api.getIdRightList(id)
      .then((res) => {
        this.roleForm = {
          roleid: this.roleList[index].roleid,
          name: this.roleList[index].name,
          describe: this.roleList[index].describe,
          remark: this.roleList[index].remark,
          status: this.roleList[index].status,
          jurisdictions: [],
          checkedItem: []
        }
        this.roleForm.checkedItem = []
        res.map((i) => {
          this.roleForm.checkedItem.push(i.rightid)
        })
      })
    },
    todelete (id, index) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return api.todeleteRole(id)
      }).then((res) => {
        if (res.code === 1) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          return api.getRoleList({pageindex: 1})
        }
      }).then((res) => {
        this.roleList = res.datalist
        this.totalpages = 1
      })
    },
    getAllRightList () {
      api.getAllRightList()
      .then((res) => {
        this.items = res
      })
    },
    handleBeforeClose (done) {
      done()
      this.$refs['roleForm'].resetFields()
      this.roleForm.checkedItem = []
    },
    handleCheckAllChange (val) {
      console.log(val)
      this.roleForm.checkedItem = []
      if (val) {
        this.items.map((i) => {
          this.roleForm.checkedItem.push(i.rightid)
        })
      }
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      console.log(value)
      let checkedCount = value.length
      this.checkAll = checkedCount === this.items.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.items.length
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.roleForm.jurisdictions = this.roleForm.checkedItem.join()
          api.addOrEditRole(this.roleForm)
          .then((res) => {
            this.$message({
              message: res.msg,
              type: res.code === 0 ? 'error' : 'success'
            })
            if (res.code === 1) {
              this.dialogVisible = false
              this.totalpages = 1
              this.resetForm('roleForm')
              return api.getRoleList({pageindex: 1})
            }
          })
          .then((res) => {
            this.roleList = res.datalist
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      if (formName === 'roleForm') {
        this.checkAll = false
      }
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
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <div style="margin:0 0 15px 0">
         <el-button v-if="role.add" type="primary" size="medium" @click='add()' icon='el-icon-plus'>新增角色</el-button>
      </div>
      <template>
        <el-table
          :data="roleList"
          stripe
          v-loading="loading"
          style="width: 100%"
          header-row-class-name="table-head">
          <el-table-column
            label="员工ID"
            width="170px"
            align="center"
            prop="roleid">
          </el-table-column>
          <el-table-column
            label="名称"
            align="center"
            prop="name">
          </el-table-column>
          <el-table-column
            label="描述"
            align="center"
            prop="describe">
          </el-table-column>
          <el-table-column
            label="备注"
            align="center"
            prop="remark">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
                <el-button
                v-if="role.edit"
                size="mini"
                type="success"
                @click="toEdit(scope.row.roleid, scope.$index)">编辑</el-button>
                <el-button
                v-if="role.remove"
                size="mini"
                type="danger"
                @click="todelete(scope.row.roleid, scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin:15px 0;text-align:right">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :page-count="totalpages">
          </el-pagination>
        </div>
      </template>
      <el-dialog :visible.sync="dialogVisible" width="900px" :before-close="handleBeforeClose">
        <el-form :model="roleForm" :rules="rules" ref="roleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="角色名称" prop="name">
            <el-input size="medium" v-model="roleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="describe">
            <el-input size="medium" v-model="roleForm.describe"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input size="medium" type="textarea" aotusize v-model="roleForm.remark"></el-input>
          </el-form-item>
          <el-form-item label="权限集合" prop="checkedItem">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="roleForm.checkedItem" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="item in items" :label="item.rightid" :key="item.rightid">{{item.rightname}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('roleForm')">立即创建</el-button>
            <el-button @click="resetForm('roleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import api from '../store/api/employee'
export default {
  data () {
    return {
      totalpages: 1,
      dialogVisible: false,
      loading: false,
      roleList: [],
      pageindex: 1,
      roleForm: {
        roleid: '',
        name: '',
        describe: '',
        remark: '',
        status: 0,
        jurisdictions: [],
        checkedItem: []
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        describe: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ],
        checkedItem: [
          { type: 'array', required: true, message: '请至少选择一个栏目', trigger: 'change' }
        ]
      },
      checkAll: false,
      items: [],
      isIndeterminate: true,
      _roleList: null,
      role: {
        add: false,
        edit: false,
        remove: false
      }
    }
  },
  mounted () {
    this.getRoleList()
    this.getAllRightList()
    this._getRoleList()
  },
  methods: {
    _getRoleList () {
      this._roleList = JSON.parse(localStorage.getItem('roleList'))
      console.log(this._roleList)
      this._roleList.map((i) => {
        if (i.rightid === 18) {
          this.role.add = true
        }
        if (i.rightid === 19) {
          this.role.edit = true
        }
        if (i.rightid === 20) {
          this.role.remove = true
        }
      })
    },
    getRoleList () {
      this.loading = true
      api.getRoleList({pageindex: this.pageindex})
      .then((res) => {
        this.totalpages = res.totalpages
        this.roleList = res.datalist
        this.loading = false
      })
    },
    handleCurrentChange (val) {
      this.pageindex = +val
      this.getRoleList()
    },
    add () {
      this.dialogVisible = true
    },
    toEdit (id, index) {
      this.dialogVisible = true
      api.getIdRightList(id)
      .then((res) => {
        this.roleForm = {
          roleid: this.roleList[index].roleid,
          name: this.roleList[index].name,
          describe: this.roleList[index].describe,
          remark: this.roleList[index].remark,
          status: this.roleList[index].status,
          jurisdictions: [],
          checkedItem: []
        }
        this.roleForm.checkedItem = []
        res.map((i) => {
          this.roleForm.checkedItem.push(i.rightid)
        })
      })
    },
    todelete (id, index) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return api.todeleteRole(id)
      }).then((res) => {
        if (res.code === 1) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          return api.getRoleList({pageindex: 1})
        }
      }).then((res) => {
        this.roleList = res.datalist
        this.totalpages = 1
      })
    },
    getAllRightList () {
      api.getAllRightList()
      .then((res) => {
        this.items = res
      })
    },
    handleBeforeClose (done) {
      done()
      this.$refs['roleForm'].resetFields()
      this.roleForm.checkedItem = []
    },
    handleCheckAllChange (val) {
      console.log(val)
      this.roleForm.checkedItem = []
      if (val) {
        this.items.map((i) => {
          this.roleForm.checkedItem.push(i.rightid)
        })
      }
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      console.log(value)
      let checkedCount = value.length
      this.checkAll = checkedCount === this.items.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.items.length
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.roleForm.jurisdictions = this.roleForm.checkedItem.join()
          api.addOrEditRole(this.roleForm)
          .then((res) => {
            this.$message({
              message: res.msg,
              type: res.code === 0 ? 'error' : 'success'
            })
            if (res.code === 1) {
              this.dialogVisible = false
              this.totalpages = 1
              this.resetForm('roleForm')
              return api.getRoleList({pageindex: 1})
            }
          })
          .then((res) => {
            this.roleList = res.datalist
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      if (formName === 'roleForm') {
        this.checkAll = false
      }
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
