<<<<<<< HEAD
<template>
  <div>
    <div class="page-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>账号管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <el-form :inline='true' :model='employeeForm' :rules='rules1' ref='employeeForm'>
        <el-form-item label="员工角色" prop="roleid">
          <el-select size="medium" v-model='employeeForm.roleid' placeholder='请选择员工角色' @change="handleChangeRoleid">
            <el-option v-for='(i, key) in roleList' v-bind:key='key' :label='i.name' :value='i.roleid'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='栏目名称' label-width='80px' prop='name'>
          <el-input size="medium" v-model='employeeForm.name' placeholder='请输入员工姓名'></el-input>
        </el-form-item>
        <el-form-item>
            <el-button size="medium" type='primary' icon="el-icon-search" @click='getEmployeeList'>搜索</el-button>
            <el-button size="medium" @click="resetForm('employeeForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <div style="margin:0 0 15px 0">
         <el-button v-if="role.add" type="primary" size="medium" @click='add()' icon='el-icon-plus'>新增账号</el-button>
      </div>
      <template>
        <el-table
          :data="employeeList"
          stripe
          v-loading="loading"
          style="width: 100%"
          header-row-class-name="table-head">
          <el-table-column
            label="员工ID"
            width="120px"
            align="center"
            prop="account">
          </el-table-column>
          <el-table-column
            label="名称"
            width="100px"
            align="center"
            prop="name">
          </el-table-column>
          <el-table-column
            label="性别"
            width="50px"
            align="center">
            <template slot-scope="scope">
              {{scope.row.sex === 1 ? '男' : '女'}}
            </template>
          </el-table-column>
          <el-table-column
            width="150px"
            align="center"
            label="头像">
            <template slot-scope="scope">
              <div class="poster" v-if="scope.row.imgpath" :style="{ backgroundImage: 'url(' + scope.row.imgpath + ')' }"></div>
              <div class="poster" v-if="!scope.row.imgpath"></div>
            </template>
          </el-table-column>
          <el-table-column
            label="手机号"
            width="150px"
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
                type="primary"
                @click="changePwd(scope.row.staffid, scope.$index)">修改密码</el-button>
                <el-button
                v-if="role.edit"
                size="mini"
                type="success"
                @click="toEdit(scope.row.staffid, scope.$index)">编辑</el-button>
                <el-button
                v-if="role.remove"
                size="mini"
                type="danger"
                @click="todelete(scope.row.staffid, scope.$index)">删除</el-button>
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
      <el-dialog :visible.sync="dialogFormVisible" class="user-form" width="500px" :before-close="handleClose">
        <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="员工姓名" prop="name">
            <el-input size="medium" v-model="userForm.name"></el-input>
          </el-form-item>
          <el-form-item label="员工账号" prop="account">
            <el-input size="medium" v-model="userForm.account"></el-input>
          </el-form-item>
          <el-form-item label="员工手机" prop="phone">
            <el-input size="medium" v-model="userForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="员工角色" prop="roleid">
            <el-select size="medium" v-model='userForm.roleid' placeholder='请选择员工角色'>
              <el-option v-for='(i, key) in roleList' v-bind:key='key' :label='i.name' :value='i.roleid'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="员工性别" prop="sex">
            <el-radio-group v-model="userForm.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注" autosize>
            <el-input type="textarea" v-model="userForm.remark"></el-input>
          </el-form-item>
          <el-form-item label='上传封面' prop='imgguid'>
            <el-upload
              class='avatar-uploader'
              action='http://192.168.0.181:8084/api/files/fileupload'
              :show-file-list='false'
              accept="image/*"
              :before-upload="beforeAvatarUpload"
              :http-request='uploadImg'>
              <img v-if='userForm.imgguid' :src='addImgUrl' class='avatar'>
              <i v-else class='el-icon-plus avatar-uploader-icon'></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('userForm')">立即创建</el-button>
            <el-button @click="resetForm('userForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="dialogPwdVisible" width="500px" :before-close="psdhandleClose">
        <el-form :model="pwdForm" :rules="rules_pwd" ref="pwdForm" label-width="100px">
          <el-form-item label="原密码" prop="oldPwd">
            <el-input type="password" size="medium" v-model="pwdForm.oldPwd"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd">
            <el-input type="password" size="medium" v-model="pwdForm.newPwd"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="rppwd">
            <el-input type="password" size="medium" v-model="pwdForm.rppwd"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitPwdForm('pwdForm')">立即创建</el-button>
            <el-button @click="resetForm('pwdForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import api from '../store/api/employee'
import com from '../store/api/com'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.pwdForm.rppwd !== '') {
          this.$refs.pwdForm.validateField('rppwd')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.pwdForm.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      totalpages: 1,
      isEdit: false,
      dialogFormVisible: false,
      dialogPwdVisible: false,
      loading: false,
      addImgUrl: '',
      roleList: [],
      employeeList: [],
      employeeForm: {
        roleid: 1,
        name: '',
        pageindex: 1
      },
      userForm: {
        staffid: null,
        name: '',
        account: '',
        phone: '',
        imgguid: '',
        sex: 1,
        roleid: '',
        remark: ''
      },
      pwdForm: {
        staffid: '',
        oldPwd: '',
        newPwd: '',
        rppwd: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入员工账号', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        roleid: [
          { required: true, message: '请选择角色', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请填写员工电话', trigger: 'blur' }
        ]
      },
      rules_pwd: {
        oldPwd: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 6, message: '不少于6个字符', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, message: '不少于6个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        rppwd: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { min: 6, message: '不少于6个字符', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      rules1: {},
      _roleList: null,
      role: {
        add: false,
        edit: false,
        remove: false
      }
    }
  },
  mounted () {
    this.getEmployeeList()
    this.getRoleList()
    api.getAllRoleList()
    .then((res) => {
      console.log(res)
      this.roleList = res.datalist
    })
  },
  methods: {
    getRoleList () {
      this._roleList = JSON.parse(localStorage.getItem('roleList'))
      console.log(this._roleList)
      this._roleList.map((i) => {
        if (i.rightid === 14) {
          this.role.add = true
        }
        if (i.rightid === 15) {
          this.role.edit = true
        }
        if (i.rightid === 16) {
          this.role.remove = true
        }
      })
    },
    getEmployeeList () {
      this.loading = true
      api.getEmployeeList(this.employeeForm)
      .then((res) => {
        this.loading = false
        this.totalpages = res.totalpages
        this.employeeList = res.datalist
      })
      .catch(() => {
        this.loading = false
      })
    },
    handleCurrentChange (val) {
      this.employeeForm.pageindex = +val
      this.getEmployeeList()
    },
    add () {
      this.dialogFormVisible = true
      api.getRoleList({
        pageindex: -1
      })
      .then((res) => {
        console.log(res)
        this.roleList = res.datalist
      })
    },
    toEdit (id, index) {
      this.dialogFormVisible = true
      this.isEdit = true
      api.getAllRoleList()
      .then((res) => {
        console.log(res)
        this.roleList = res.datalist
        this.userForm = Object.assign({}, this.employeeList[index])
        this.addImgUrl = this.userForm.imgpath
      })
    },
    todelete (id, index) {
      this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(id)
        return api.todeleteUser(id)
      })
      .then((res) => {
        if (res.code === 1) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getEmployeeList(this.employeeList)
        }
      })
    },
    changePwd (id) {
      this.dialogPwdVisible = true
      this.pwdForm.staffid = id
    },
    psdhandleClose (done) {
      done()
      this.$refs['pwdForm'].resetFields()
    },
    handleChangeRoleid () {
      this.getEmployeeList()
    },
    handleClose (done) {
      done()
      if (this.isEdit) {
        this.userForm = {
          staffid: null,
          name: '',
          account: '',
          phone: '',
          headimgguid: '',
          sex: 1,
          roleid: '',
          remark: ''
        }
      }
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    uploadImg (f) {
      var imgData = new FormData()
      imgData.append('', f.file)
      com.uploadImg(imgData)
      .then((res) => {
        this.userForm.imgguid = res.data
        let guid = {
          ImgGuid: res.data
        }
        return com.getImgUrl(guid)
      })
      .then((res) => {
        this.addImgUrl = res.data[0].imgurl
        console.log(this.addImgUrl)
      })
      this.$message({
        message: '图片上传成功',
        type: 'success'
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.addOrEditStaff(this.userForm)
          .then((res) => {
            console.log(res)
            if (res.code === 1) {
              this.dialogFormVisible = false
              this.getEmployeeList(this.employeeList)
              this.totalpages = 1
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitPwdForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.changePwd(this.pwdForm)
          .then((res) => {
            console.log(res)
            if (res.code === 1) {
              this.$message('修改成功')
              this.dialogPwdVisible = false
            } else {
              this.$message(res.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      if (formName === 'employeeForm') {
        this.getEmployeeList(this.employeeForm)
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
  background-image: url(../assets/images/avatar.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
}
</style>
=======
<template>
  <div>
    <div class="page-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>账号管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <el-form :inline='true' :model='employeeForm' :rules='rules1' ref='employeeForm'>
        <el-form-item label="员工角色" prop="roleid">
          <el-select size="medium" v-model='employeeForm.roleid' placeholder='请选择员工角色' @change="handleChangeRoleid">
            <el-option v-for='(i, key) in roleList' v-bind:key='key' :label='i.name' :value='i.roleid'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='栏目名称' label-width='80px' prop='name'>
          <el-input size="medium" v-model='employeeForm.name' placeholder='请输入员工姓名'></el-input>
        </el-form-item>
        <el-form-item>
            <el-button size="medium" type='primary' icon="el-icon-search" @click='getEmployeeList'>搜索</el-button>
            <el-button size="medium" @click="resetForm('employeeForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <div style="margin:0 0 15px 0">
         <el-button v-if="role.add" type="primary" size="medium" @click='add()' icon='el-icon-plus'>新增账号</el-button>
      </div>
      <template>
        <el-table
          :data="employeeList"
          stripe
          v-loading="loading"
          style="width: 100%"
          header-row-class-name="table-head">
          <el-table-column
            label="员工ID"
            width="120px"
            align="center"
            prop="account">
          </el-table-column>
          <el-table-column
            label="名称"
            width="100px"
            align="center"
            prop="name">
          </el-table-column>
          <el-table-column
            label="性别"
            width="50px"
            align="center">
            <template slot-scope="scope">
              {{scope.row.sex === 1 ? '男' : '女'}}
            </template>
          </el-table-column>
          <el-table-column
            width="150px"
            align="center"
            label="头像">
            <template slot-scope="scope">
              <div class="poster" v-if="scope.row.imgpath" :style="{ backgroundImage: 'url(' + scope.row.imgpath + ')' }"></div>
              <div class="poster" v-if="!scope.row.imgpath"></div>
            </template>
          </el-table-column>
          <el-table-column
            label="手机号"
            width="150px"
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
                type="primary"
                @click="changePwd(scope.row.staffid, scope.$index)">修改密码</el-button>
                <el-button
                v-if="role.edit"
                size="mini"
                type="success"
                @click="toEdit(scope.row.staffid, scope.$index)">编辑</el-button>
                <el-button
                v-if="role.remove"
                size="mini"
                type="danger"
                @click="todelete(scope.row.staffid, scope.$index)">删除</el-button>
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
      <el-dialog :visible.sync="dialogFormVisible" class="user-form" width="500px" :before-close="handleClose">
        <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="员工姓名" prop="name">
            <el-input size="medium" v-model="userForm.name"></el-input>
          </el-form-item>
          <el-form-item label="员工账号" prop="account">
            <el-input size="medium" v-model="userForm.account"></el-input>
          </el-form-item>
          <el-form-item label="员工手机" prop="phone">
            <el-input size="medium" v-model="userForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="员工角色" prop="roleid">
            <el-select size="medium" v-model='userForm.roleid' placeholder='请选择员工角色'>
              <el-option v-for='(i, key) in roleList' v-bind:key='key' :label='i.name' :value='i.roleid'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="员工性别" prop="sex">
            <el-radio-group v-model="userForm.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注" autosize>
            <el-input type="textarea" v-model="userForm.remark"></el-input>
          </el-form-item>
          <el-form-item label='上传封面' prop='imgguid'>
            <el-upload
              class='avatar-uploader'
              action='http://192.168.0.181:8084/api/files/fileupload'
              :show-file-list='false'
              accept="image/*"
              :before-upload="beforeAvatarUpload"
              :http-request='uploadImg'>
              <img v-if='userForm.imgguid' :src='addImgUrl' class='avatar'>
              <i v-else class='el-icon-plus avatar-uploader-icon'></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('userForm')">立即创建</el-button>
            <el-button @click="resetForm('userForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="dialogPwdVisible" width="500px" :before-close="psdhandleClose">
        <el-form :model="pwdForm" :rules="rules_pwd" ref="pwdForm" label-width="100px">
          <el-form-item label="原密码" prop="oldPwd">
            <el-input type="password" size="medium" v-model="pwdForm.oldPwd"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd">
            <el-input type="password" size="medium" v-model="pwdForm.newPwd"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="rppwd">
            <el-input type="password" size="medium" v-model="pwdForm.rppwd"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitPwdForm('pwdForm')">立即创建</el-button>
            <el-button @click="resetForm('pwdForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import api from '../store/api/employee'
import com from '../store/api/com'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.pwdForm.rppwd !== '') {
          this.$refs.pwdForm.validateField('rppwd')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.pwdForm.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      totalpages: 1,
      isEdit: false,
      dialogFormVisible: false,
      dialogPwdVisible: false,
      loading: false,
      addImgUrl: '',
      roleList: [],
      employeeList: [],
      employeeForm: {
        roleid: 1,
        name: '',
        pageindex: 1
      },
      userForm: {
        staffid: null,
        name: '',
        account: '',
        phone: '',
        imgguid: '',
        sex: 1,
        roleid: '',
        remark: ''
      },
      pwdForm: {
        staffid: '',
        oldPwd: '',
        newPwd: '',
        rppwd: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入员工账号', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        roleid: [
          { required: true, message: '请选择角色', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请填写员工电话', trigger: 'blur' }
        ]
      },
      rules_pwd: {
        oldPwd: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 6, message: '不少于6个字符', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, message: '不少于6个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        rppwd: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { min: 6, message: '不少于6个字符', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      rules1: {},
      _roleList: null,
      role: {
        add: false,
        edit: false,
        remove: false
      }
    }
  },
  mounted () {
    this.getEmployeeList()
    this.getRoleList()
    api.getAllRoleList()
    .then((res) => {
      console.log(res)
      this.roleList = res.datalist
    })
  },
  methods: {
    getRoleList () {
      this._roleList = JSON.parse(localStorage.getItem('roleList'))
      console.log(this._roleList)
      this._roleList.map((i) => {
        if (i.rightid === 14) {
          this.role.add = true
        }
        if (i.rightid === 15) {
          this.role.edit = true
        }
        if (i.rightid === 16) {
          this.role.remove = true
        }
      })
    },
    getEmployeeList () {
      this.loading = true
      api.getEmployeeList(this.employeeForm)
      .then((res) => {
        this.loading = false
        this.totalpages = res.totalpages
        this.employeeList = res.datalist
      })
      .catch(() => {
        this.loading = false
      })
    },
    handleCurrentChange (val) {
      this.employeeForm.pageindex = +val
      this.getEmployeeList()
    },
    add () {
      this.dialogFormVisible = true
      api.getRoleList({
        pageindex: -1
      })
      .then((res) => {
        console.log(res)
        this.roleList = res.datalist
      })
    },
    toEdit (id, index) {
      this.dialogFormVisible = true
      this.isEdit = true
      api.getAllRoleList()
      .then((res) => {
        console.log(res)
        this.roleList = res.datalist
        this.userForm = Object.assign({}, this.employeeList[index])
        this.addImgUrl = this.userForm.imgpath
      })
    },
    todelete (id, index) {
      this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(id)
        return api.todeleteUser(id)
      })
      .then((res) => {
        if (res.code === 1) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getEmployeeList(this.employeeList)
        }
      })
    },
    changePwd (id) {
      this.dialogPwdVisible = true
      this.pwdForm.staffid = id
    },
    psdhandleClose (done) {
      done()
      this.$refs['pwdForm'].resetFields()
    },
    handleChangeRoleid () {
      this.getEmployeeList()
    },
    handleClose (done) {
      done()
      if (this.isEdit) {
        this.userForm = {
          staffid: null,
          name: '',
          account: '',
          phone: '',
          headimgguid: '',
          sex: 1,
          roleid: '',
          remark: ''
        }
      }
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    uploadImg (f) {
      var imgData = new FormData()
      imgData.append('', f.file)
      com.uploadImg(imgData)
      .then((res) => {
        this.userForm.imgguid = res.data
        let guid = {
          ImgGuid: res.data
        }
        return com.getImgUrl(guid)
      })
      .then((res) => {
        this.addImgUrl = res.data[0].imgurl
        console.log(this.addImgUrl)
      })
      this.$message({
        message: '图片上传成功',
        type: 'success'
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.addOrEditStaff(this.userForm)
          .then((res) => {
            console.log(res)
            if (res.code === 1) {
              this.dialogFormVisible = false
              this.getEmployeeList(this.employeeList)
              this.totalpages = 1
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitPwdForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.changePwd(this.pwdForm)
          .then((res) => {
            console.log(res)
            if (res.code === 1) {
              this.$message('修改成功')
              this.dialogPwdVisible = false
            } else {
              this.$message(res.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      if (formName === 'employeeForm') {
        this.getEmployeeList(this.employeeForm)
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
  background-image: url(../assets/images/avatar.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
}
</style>
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296
