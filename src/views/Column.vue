<<<<<<< HEAD
<template>
  <div>
    <div class="page-header">
      <el-breadcrumb separator-class='el-icon-arrow-right'>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>栏目管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content" style="padding: 24px 24px 2px 24px">
      <el-form :inline='true' :model='queryColumnParams' :rules='rules1' ref='queryColumnParams'>
        <el-form-item label='栏目名称' label-width='80px' prop='name'>
          <el-input v-model='queryColumnParams.name' size="medium" placeholder='请输入栏目名称'></el-input>
        </el-form-item>
        <el-form-item label='栏目编号' label-width='80px' prop='newstypeid'>
          <el-input v-model.number='queryColumnParams.newstypeid' size="medium" placeholder='请输入栏目编号'></el-input>
        </el-form-item>
        <el-form-item>
            <el-button size="medium" type='primary' icon="el-icon-search" @click='queryColumn'>搜索</el-button>
            <el-button size="medium" @click="resetForm('queryColumnParams')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content">
      <div style="margin-bottom:15px;overflow:hidden">
        <el-radio-group 
          v-model="queryColumnParams.status"
          @change="handleRadio"
          size="medium"
          style="float:left">
          <el-radio-button label="0">已上架</el-radio-button>
          <el-radio-button label="1">已下架</el-radio-button>
        </el-radio-group>
        <el-button v-if="role.add" style='float:left;margin:0 25px 0;' size="medium" @click='newColumn' icon='el-icon-plus'>新建栏目</el-button>
      </div>
      <template>
        <el-table
          :data="columnList"
          stripe
          v-loading="loading"
          style="width: 100%"
          header-row-class-name="table-head">
          <el-table-column
            width="100px"
            align="center"
            label="封面">
            <template slot-scope="scope">
              <div class="poster" v-if="scope.row.imgpath" :style="{ backgroundImage: 'url(' + scope.row.imgpath + ')' }"></div>
              <div class="poster" v-if="!scope.row.imgpath"></div>
            </template>
          </el-table-column>
          <el-table-column
            label="名称"
            width="170px"
            align="center"
            prop="name">
          </el-table-column>
          <el-table-column
            label="编号"
            width="100px"
            align="center"
            prop="typeid">
          </el-table-column>
          <el-table-column
            label="APP展示"
            width="100px">
            <template slot-scope="scope">
              <el-tag 
                size="small"
                :type="scope.row.forapp === 0 ? 'info' : 'success'">
                {{ scope.row.forapp === 0 ? '不展示' : '展示' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="等级"
            width="100px"
            prop="level">
            <template slot-scope="scope">
              <el-tag 
                size="small"
                type="warning">
                {{ scope.row.level }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="备注">
            <template slot-scope="scope">
              {{scope.row.remark === null ? '无' : scope.row.remark}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="250px"
            type="index"
            align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.status === 0">
                <el-button
                size="mini"
                type="primary"
                @click="setStatus(scope.row.typeid, 1)">下架</el-button>
                <el-button
                v-if="role.edit"
                size="mini"
                type="success"
                @click="toedit(scope.row.typeid, scope.$index)">编辑</el-button>
              </div>
              <div v-if="scope.row.status === 1">
                <el-button
                size="mini"
                type="success"
                @click="setStatus(scope.row.typeid, 0)">上架</el-button>
                <el-button
                v-if="role.edit"
                size="mini"
                type="primary"
                @click="toedit(scope.row.typeid, scope.$index)">编辑</el-button>
                <el-button
                v-if="role.remove"
                size="mini"
                type="danger"
                @click="todelete(scope.row.typeid, scope.$index)">删除</el-button>
              </div>
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
    <!-- 新建栏目 -->
    <el-dialog title='新建栏目' :visible.sync='dialogFormVisible' width='700px' :before-close="handleClose">
      <el-form :inline='true' :model='addColumn' :rules='rules' ref='addColumn' class='dialog-form demo-form-inline'>
        <el-form-item label='栏目名称' :label-width='formLabelWidth' prop='name'>
          <el-input size="medium" v-model='addColumn.name' auto-complete='off' placeholder='请输入栏目名称'></el-input>
        </el-form-item>
        <el-form-item label='栏目状态' :label-width='formLabelWidth' prop='status'>
          <el-select size="medium" v-model='addColumn.status' placeholder='请选择栏目状态'>
            <el-option label='上架中' :value='0'></el-option>
            <el-option label='已下架' :value='1'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='APP展示' :label-width='formLabelWidth' prop='forapp'>
          <el-select size="medium" v-model='addColumn.forapp' placeholder='请选择是否展示'>
            <el-option label='是' :value='1'></el-option>
            <el-option label='否' :value='0'></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label='栏目级别' :label-width='formLabelWidth' prop='level'>
          <el-select size="medium" v-model='addColumn.level' placeholder='请选择栏目级别' @change='changeLevel(addColumn.level-1)'>
            <el-option label='1' :value='1'></el-option>
            <el-option label='2' :value='2'></el-option>
            <el-option label='3' :value='3'></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label='父级栏目' :label-width='formLabelWidth' prop='parentid'>
          <el-select size="medium" v-model='addColumn.parentid' placeholder='请先选择栏目级别'>
            <el-option v-for='(i, key) in parentList' v-bind:key='key' :label='i.name' :value='i.typeid'></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item :label-width='formLabelWidth' label="父级栏目" prop="_newstype">
          <el-cascader
            size="medium"
            @change="changeColumn"
            style="width: 500px"
            v-model="addColumn._newstype"
            :options="level"
            :change-on-select="true"
            :props="levelprops">
          </el-cascader>
        </el-form-item>
        <el-form-item label='备注' :label-width='formLabelWidth'>
          <el-input size="medium" type='textarea' v-model='addColumn.remark' style='width:500px'></el-input>
        </el-form-item>
        <el-form-item label='上传封面' :label-width='formLabelWidth' prop='imgpath'>
          <el-upload
            class='avatar-uploader'
            action='http://192.168.0.181:8084/api/files/fileupload'
            :show-file-list='false'
            :before-upload="beforeAvatarUpload"
            :http-request='uploadImg'>
            <img v-if='addColumn.imgpath' :src='addImgUrl' class='avatar'>
            <i v-else class='el-icon-plus avatar-uploader-icon'></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button type='primary' @click="submitForm('addColumn')">确 定</el-button>
        <el-button @click="resetForm('addColumn')">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '../store/api/column'
export default {
  data () {
    return {
      isEdit: false,
      formLabelWidth: '90px',
      dialogFormVisible: false,
      loading: false,
      totalpages: 1,
      columnList: [],
      queryColumnParams: {
        newstypeid: '',
        name: '',
        status: '0',
        pageindex: 1
      },
      rules1: {
        newstypeid: [
        ],
        name: [
        ]
      },
      addColumn: {
        name: '',
        status: 0,
        remark: '',
        parentid: 0,
        forapp: 1,
        level: 1,
        imgpath: '',
        typeid: '',
        _newstype: []
      },
      rules: {
        name: [
          { required: true, message: '请输入栏目名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择栏目状态', trigger: 'change' }
        ],
        isshowapp: [
          { required: true, message: '请选择APP是否展示', trigger: 'change' }
        ],
        _newstype: []
      },
      addImgUrl: '',
      parentList: null,
      tempList: null,
      tempIndex: 0,
      roleList: [],
      role: {
        add: false,
        edit: false,
        remove: false
      },
      level: [],
      levelprops: {
        value: 'label',
        children: 'columns'
      },
      levelSort: null // 处理分层后栏目数据
    }
  },
  mounted () {
    this.queryColumn()
    this.getRoleList()
    api.getLevelAllList()
    .then((res) => {
      this.makeLevelList(res.datalist)
    })
  },
  methods: {
    makeLevelList (data) {
      let templist = {}
      let list = []
      let item = {
        value: '',
        label: ''
      }
      data.map((i) => {
        let simpleItem = Object.assign({}, item)
        simpleItem.value = i.typeid
        simpleItem.label = i.name
        simpleItem.level = i.level
        simpleItem.parentid = i.parentid
        templist[i.level] = templist[i.level] ? templist[i.level] : []
        templist[i.level].push(simpleItem)
      })
      delete templist[3]
      // 分层后数据
      this.levelSort = templist
      console.log(templist)
      let keys = Object.keys(templist).reverse()
      keys.map((key) => {
        let _key = parseInt(key)
        if (_key === 1) return
        let _list = [].concat(templist[(_key - 1) + ''])
        templist[key].map((i) => {
          let _item = Object.assign({}, item)
          _item.value = i.value
          _item.label = i.label
          _item.parentid = i.parentid
          findParent(_list, i)
        })
        console.log(_list)
        list = _list
      })
      this.level = list
      function findParent (fatherArr, son) {
        fatherArr.map((i, idx) => {
          if (i.value === son.parentid) {
            fatherArr[idx].columns = fatherArr[idx].columns ? [].concat(fatherArr[idx].columns) : []
            fatherArr[idx].columns.push(son)
          }
        })
      }
    },
    newstypeToId (typearr) {
      if (!typearr) return
      let temparr = []
      let resarr = []
      for (let v in typearr) {
        temparr.push(typearr[v])
      }
      temparr.map((m, idx) => {
        this.levelSort[idx + 1 + ''].map((n) => {
          if (m === n.label) {
            resarr.push(n.value)
          }
        })
      })
      return resarr.slice(-1)[0]
    },
    getRoleList () {
      this.roleList = JSON.parse(localStorage.getItem('roleList'))
      this.roleList.map((i) => {
        if (i.rightid === 2) {
          this.role.add = true
        }
        if (i.rightid === 3) {
          this.role.edit = true
        }
        if (i.rightid === 4) {
          this.role.remove = true
        }
      })
    },
    queryColumn () {
      this.loading = true
      api.getColumnList(this.queryColumnParams)
      .then((res) => {
        this.totalpages = res.totalpages
        this.columnList = res.datalist
        this.loading = false
      })
    },
    handleCurrentChange (val) {
      console.log(val)
      this.queryColumnParams.pageindex = +val
      this.queryColumn()
    },
    handleRadio (val) {
      this.queryColumn()
    },
    setStatus (key, status) {
      let text = status === 0 ? '上架' : '下架'
      this.$confirm('此操作将' + text + '该栏目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.setColumnStatus({
          'newstypeid': key,
          'status': status
        })
        .then((res) => {
          if (res.code === 0) {
            return this.$message.error(res.msg)
          }
          this.$store.dispatch('getColumnList', this.queryColumnParams)
          this.$message({
            type: 'success',
            message: text + '成功!'
          })
        })
      })
    },
    todelete (id, index) {
      this.$confirm('此操作将永久删除该栏目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteColumn(id)
        .then((res) => {
          if (res.code === 0) {
            return this.$message.error(res.msg)
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.columnList.splice(index, 1)
        })
      })
    },
    changeColumn (val) {
      // if (val && val[val.length - 1] === this.addColumn.name) {
      //   this.addColumn._newstype = []
      //   return false
      // }
    },
    newColumn () {
      this.isEdit = false
      this.dialogFormVisible = true
    },
    handleClose (done) {
      done()
      if (this.isEdit) {
        this.columnList[this.tempIndex] = this.tempList
        setTimeout(() => {
          this.setEmptyForm()
        }, 500)
      }
    },
    toedit (id, index) {
      const that = this
      this.isEdit = true
      console.log(id)
      api.getColumnDetail(id)
      .then((res) => {
        that.addColumn = {
          typeid: res.data.typeid,
          name: res.data.name,
          status: res.data.status,
          remark: res.data.remark,
          parentid: res.data.parentid,
          forapp: res.data.forapp,
          level: res.data.level,
          imgpath: res.data.imgpath
        }
        this.addColumn._newstype = this.reset(res.data.newstype)
        this.addImgUrl = res.data.imgpath ? res.data.imgpath : ''
        if (this.addColumn.level === 1) {
          // this.parentList = [{name: '无父级', typeid: 0}]
          this.addColumn.parentid = 0
        }
        // this.getParentId(level, () => {
        //   that.addColumn.parentid = res.data.parentid
        // })
      })
      this.dialogFormVisible = true
    },
    // getParentId (level, cb) {
    //   const that = this
    //   api.getLevelList(level)
    //   .then((res1) => {
    //     that.parentList = res1.datalist
    //     cb()
    //   })
    // },
    // changeLevel (level) {
    //   if (level === 0) {
    //     this.parentList = [{name: '无父级', typeid: 0}]
    //     this.addColumn.parentid = 0
    //     return
    //   }
    //   this.getParentId(level, () => {
    //     this.addColumn.parentid = null
    //   })
    // },
    uploadImg (f) {
      var imgData = new FormData()
      imgData.append('', f.file)
      api.uploadImg(imgData)
      .then((res) => {
        this.addColumn.imgpath = res.data
        let guid = {
          ImgGuid: res.data
        }
        api.getImgUrl(guid)
        .then((res) => {
          this.addImgUrl = res.data[0].imgminiurl
        })
        this.$message({
          message: '图片上传成功',
          type: 'success'
        })
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let _type = this.addColumn._newstype
          if (_type.length > 0 && _type[_type.length - 1] !== this.addColumn.name) {
            console.log(this.addColumn._newstype)
            this.addColumn.level = _type.length + 1
            this.addColumn.parentid = this.newstypeToId(this.addColumn._newstype)
          } else {
            this.addColumn.level = 1
            this.addColumn.parentid = 0
          }
          api.addColumn(this.addColumn)
          .then((res) => {
            this.dialogFormVisible = false
            this.setEmptyForm()
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.queryColumn()
            return api.getLevelAllList()
          })
          .then((res) => {
            this.makeLevelList(res.datalist)
          })
        }
      })
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      // if (formName === 'addColumn') {
      //   this.changeStatus()
      // }
      if (formName === 'queryColumnParams') {
        this.queryColumn()
      }
    },
    setEmptyForm () {
      this.addColumn = {
        name: '',
        status: 0,
        remark: '',
        parentid: 0,
        forapp: 1,
        level: 1,
        imgpath: '',
        typeid: ''
      }
    },
    reset (newstype) {
      let _newstype = []
      for (let item in newstype) {
        if (!newstype[item].typename) return
        _newstype.push(newstype[item].typename)
      }
      return _newstype.reverse()
    }
  }
}
</script>

<style lang='less' scoped>
.dialog-form {
  width: 100%;
}

.block {
  padding: 10px 30px;
  text-align: right;
}

.poster {
  margin: 0 auto;
  width: 40px;
  height: 40px;
  display: block;
  background: url(../assets/images/default_col_1.png) no-repeat center;
  background-size: 32px;
}

</style>
=======
<template>
  <div>
    <div class="page-header">
      <el-breadcrumb separator-class='el-icon-arrow-right'>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>栏目管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content" style="padding: 24px 24px 2px 24px">
      <el-form :inline='true' :model='queryColumnParams' :rules='rules1' ref='queryColumnParams'>
        <el-form-item label='栏目名称' label-width='80px' prop='name'>
          <el-input v-model='queryColumnParams.name' size="medium" placeholder='请输入栏目名称'></el-input>
        </el-form-item>
        <el-form-item label='栏目编号' label-width='80px' prop='newstypeid'>
          <el-input v-model.number='queryColumnParams.newstypeid' size="medium" placeholder='请输入栏目编号'></el-input>
        </el-form-item>
        <el-form-item>
            <el-button size="medium" type='primary' icon="el-icon-search" @click='queryColumn'>搜索</el-button>
            <el-button size="medium" @click="resetForm('queryColumnParams')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content">
      <div style="margin-bottom:15px;overflow:hidden">
        <el-radio-group 
          v-model="queryColumnParams.status"
          @change="handleRadio"
          size="medium"
          style="float:left">
          <el-radio-button label="0">已上架</el-radio-button>
          <el-radio-button label="1">已下架</el-radio-button>
        </el-radio-group>
        <el-button v-if="role.add" style='float:left;margin:0 25px 0;' size="medium" @click='newColumn' icon='el-icon-plus'>新建栏目</el-button>
      </div>
      <template>
        <el-table
          :data="columnList"
          stripe
          v-loading="loading"
          style="width: 100%"
          header-row-class-name="table-head">
          <el-table-column
            width="100px"
            align="center"
            label="封面">
            <template slot-scope="scope">
              <div class="poster" v-if="scope.row.imgpath" :style="{ backgroundImage: 'url(' + scope.row.imgpath + ')' }"></div>
              <div class="poster" v-if="!scope.row.imgpath"></div>
            </template>
          </el-table-column>
          <el-table-column
            label="名称"
            width="170px"
            align="center"
            prop="name">
          </el-table-column>
          <el-table-column
            label="编号"
            width="100px"
            align="center"
            prop="typeid">
          </el-table-column>
          <el-table-column
            label="APP展示"
            width="100px">
            <template slot-scope="scope">
              <el-tag 
                size="small"
                :type="scope.row.forapp === 0 ? 'info' : 'success'">
                {{ scope.row.forapp === 0 ? '不展示' : '展示' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="等级"
            width="100px"
            prop="level">
            <template slot-scope="scope">
              <el-tag 
                size="small"
                type="warning">
                {{ scope.row.level }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="备注">
            <template slot-scope="scope">
              {{scope.row.remark === null ? '无' : scope.row.remark}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="250px"
            type="index"
            align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.status === 0">
                <el-button
                size="mini"
                type="primary"
                @click="setStatus(scope.row.typeid, 1)">下架</el-button>
                <el-button
                v-if="role.edit"
                size="mini"
                type="success"
                @click="toedit(scope.row.typeid, scope.$index)">编辑</el-button>
              </div>
              <div v-if="scope.row.status === 1">
                <el-button
                size="mini"
                type="success"
                @click="setStatus(scope.row.typeid, 0)">上架</el-button>
                <el-button
                v-if="role.edit"
                size="mini"
                type="primary"
                @click="toedit(scope.row.typeid, scope.$index)">编辑</el-button>
                <el-button
                v-if="role.remove"
                size="mini"
                type="danger"
                @click="todelete(scope.row.typeid, scope.$index)">删除</el-button>
              </div>
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
    <!-- 新建栏目 -->
    <el-dialog title='新建栏目' :visible.sync='dialogFormVisible' width='700px' :before-close="handleClose">
      <el-form :inline='true' :model='addColumn' :rules='rules' ref='addColumn' class='dialog-form demo-form-inline'>
        <el-form-item label='栏目名称' :label-width='formLabelWidth' prop='name'>
          <el-input size="medium" v-model='addColumn.name' auto-complete='off' placeholder='请输入栏目名称'></el-input>
        </el-form-item>
        <el-form-item label='栏目状态' :label-width='formLabelWidth' prop='status'>
          <el-select size="medium" v-model='addColumn.status' placeholder='请选择栏目状态'>
            <el-option label='上架中' :value='0'></el-option>
            <el-option label='已下架' :value='1'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='APP展示' :label-width='formLabelWidth' prop='forapp'>
          <el-select size="medium" v-model='addColumn.forapp' placeholder='请选择是否展示'>
            <el-option label='是' :value='1'></el-option>
            <el-option label='否' :value='0'></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label='栏目级别' :label-width='formLabelWidth' prop='level'>
          <el-select size="medium" v-model='addColumn.level' placeholder='请选择栏目级别' @change='changeLevel(addColumn.level-1)'>
            <el-option label='1' :value='1'></el-option>
            <el-option label='2' :value='2'></el-option>
            <el-option label='3' :value='3'></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label='父级栏目' :label-width='formLabelWidth' prop='parentid'>
          <el-select size="medium" v-model='addColumn.parentid' placeholder='请先选择栏目级别'>
            <el-option v-for='(i, key) in parentList' v-bind:key='key' :label='i.name' :value='i.typeid'></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item :label-width='formLabelWidth' label="父级栏目" prop="_newstype">
          <el-cascader
            size="medium"
            @change="changeColumn"
            style="width: 500px"
            v-model="addColumn._newstype"
            :options="level"
            :change-on-select="true"
            :props="levelprops">
          </el-cascader>
        </el-form-item>
        <el-form-item label='备注' :label-width='formLabelWidth'>
          <el-input size="medium" type='textarea' v-model='addColumn.remark' style='width:500px'></el-input>
        </el-form-item>
        <el-form-item label='上传封面' :label-width='formLabelWidth' prop='imgpath'>
          <el-upload
            class='avatar-uploader'
            action='http://192.168.0.181:8084/api/files/fileupload'
            :show-file-list='false'
            :before-upload="beforeAvatarUpload"
            :http-request='uploadImg'>
            <img v-if='addColumn.imgpath' :src='addImgUrl' class='avatar'>
            <i v-else class='el-icon-plus avatar-uploader-icon'></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button type='primary' @click="submitForm('addColumn')">确 定</el-button>
        <el-button @click="resetForm('addColumn')">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '../store/api/column'
export default {
  data () {
    return {
      isEdit: false,
      formLabelWidth: '90px',
      dialogFormVisible: false,
      loading: false,
      totalpages: 1,
      columnList: [],
      queryColumnParams: {
        newstypeid: '',
        name: '',
        status: '0',
        pageindex: 1
      },
      rules1: {
        newstypeid: [
        ],
        name: [
        ]
      },
      addColumn: {
        name: '',
        status: 0,
        remark: '',
        parentid: 0,
        forapp: 1,
        level: 1,
        imgpath: '',
        typeid: '',
        _newstype: []
      },
      rules: {
        name: [
          { required: true, message: '请输入栏目名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择栏目状态', trigger: 'change' }
        ],
        isshowapp: [
          { required: true, message: '请选择APP是否展示', trigger: 'change' }
        ],
        _newstype: []
      },
      addImgUrl: '',
      parentList: null,
      tempList: null,
      tempIndex: 0,
      roleList: [],
      role: {
        add: false,
        edit: false,
        remove: false
      },
      level: [],
      levelprops: {
        value: 'label',
        children: 'columns'
      },
      levelSort: null // 处理分层后栏目数据
    }
  },
  mounted () {
    this.queryColumn()
    this.getRoleList()
    api.getLevelAllList()
    .then((res) => {
      this.makeLevelList(res.datalist)
    })
  },
  methods: {
    makeLevelList (data) {
      let templist = {}
      let list = []
      let item = {
        value: '',
        label: ''
      }
      data.map((i) => {
        let simpleItem = Object.assign({}, item)
        simpleItem.value = i.typeid
        simpleItem.label = i.name
        simpleItem.level = i.level
        simpleItem.parentid = i.parentid
        templist[i.level] = templist[i.level] ? templist[i.level] : []
        templist[i.level].push(simpleItem)
      })
      delete templist[3]
      // 分层后数据
      this.levelSort = templist
      console.log(templist)
      let keys = Object.keys(templist).reverse()
      keys.map((key) => {
        let _key = parseInt(key)
        if (_key === 1) return
        let _list = [].concat(templist[(_key - 1) + ''])
        templist[key].map((i) => {
          let _item = Object.assign({}, item)
          _item.value = i.value
          _item.label = i.label
          _item.parentid = i.parentid
          findParent(_list, i)
        })
        console.log(_list)
        list = _list
      })
      this.level = list
      function findParent (fatherArr, son) {
        fatherArr.map((i, idx) => {
          if (i.value === son.parentid) {
            fatherArr[idx].columns = fatherArr[idx].columns ? [].concat(fatherArr[idx].columns) : []
            fatherArr[idx].columns.push(son)
          }
        })
      }
    },
    newstypeToId (typearr) {
      if (!typearr) return
      let temparr = []
      let resarr = []
      for (let v in typearr) {
        temparr.push(typearr[v])
      }
      temparr.map((m, idx) => {
        this.levelSort[idx + 1 + ''].map((n) => {
          if (m === n.label) {
            resarr.push(n.value)
          }
        })
      })
      return resarr.slice(-1)[0]
    },
    getRoleList () {
      this.roleList = JSON.parse(localStorage.getItem('roleList'))
      this.roleList.map((i) => {
        if (i.rightid === 2) {
          this.role.add = true
        }
        if (i.rightid === 3) {
          this.role.edit = true
        }
        if (i.rightid === 4) {
          this.role.remove = true
        }
      })
    },
    queryColumn () {
      this.loading = true
      api.getColumnList(this.queryColumnParams)
      .then((res) => {
        this.totalpages = res.totalpages
        this.columnList = res.datalist
        this.loading = false
      })
    },
    handleCurrentChange (val) {
      console.log(val)
      this.queryColumnParams.pageindex = +val
      this.queryColumn()
    },
    handleRadio (val) {
      this.queryColumn()
    },
    setStatus (key, status) {
      let text = status === 0 ? '上架' : '下架'
      this.$confirm('此操作将' + text + '该栏目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.setColumnStatus({
          'newstypeid': key,
          'status': status
        })
        .then((res) => {
          if (res.code === 0) {
            return this.$message.error(res.msg)
          }
          this.$store.dispatch('getColumnList', this.queryColumnParams)
          this.$message({
            type: 'success',
            message: text + '成功!'
          })
        })
      })
    },
    todelete (id, index) {
      this.$confirm('此操作将永久删除该栏目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteColumn(id)
        .then((res) => {
          if (res.code === 0) {
            return this.$message.error(res.msg)
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.columnList.splice(index, 1)
        })
      })
    },
    changeColumn (val) {
      // if (val && val[val.length - 1] === this.addColumn.name) {
      //   this.addColumn._newstype = []
      //   return false
      // }
    },
    newColumn () {
      this.isEdit = false
      this.dialogFormVisible = true
    },
    handleClose (done) {
      done()
      if (this.isEdit) {
        this.columnList[this.tempIndex] = this.tempList
        setTimeout(() => {
          this.setEmptyForm()
        }, 500)
      }
    },
    toedit (id, index) {
      const that = this
      this.isEdit = true
      console.log(id)
      api.getColumnDetail(id)
      .then((res) => {
        that.addColumn = {
          typeid: res.data.typeid,
          name: res.data.name,
          status: res.data.status,
          remark: res.data.remark,
          parentid: res.data.parentid,
          forapp: res.data.forapp,
          level: res.data.level,
          imgpath: res.data.imgpath
        }
        this.addColumn._newstype = this.reset(res.data.newstype)
        this.addImgUrl = res.data.imgpath ? res.data.imgpath : ''
        if (this.addColumn.level === 1) {
          // this.parentList = [{name: '无父级', typeid: 0}]
          this.addColumn.parentid = 0
        }
        // this.getParentId(level, () => {
        //   that.addColumn.parentid = res.data.parentid
        // })
      })
      this.dialogFormVisible = true
    },
    // getParentId (level, cb) {
    //   const that = this
    //   api.getLevelList(level)
    //   .then((res1) => {
    //     that.parentList = res1.datalist
    //     cb()
    //   })
    // },
    // changeLevel (level) {
    //   if (level === 0) {
    //     this.parentList = [{name: '无父级', typeid: 0}]
    //     this.addColumn.parentid = 0
    //     return
    //   }
    //   this.getParentId(level, () => {
    //     this.addColumn.parentid = null
    //   })
    // },
    uploadImg (f) {
      var imgData = new FormData()
      imgData.append('', f.file)
      api.uploadImg(imgData)
      .then((res) => {
        this.addColumn.imgpath = res.data
        let guid = {
          ImgGuid: res.data
        }
        api.getImgUrl(guid)
        .then((res) => {
          this.addImgUrl = res.data[0].imgminiurl
        })
        this.$message({
          message: '图片上传成功',
          type: 'success'
        })
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let _type = this.addColumn._newstype
          if (_type.length > 0 && _type[_type.length - 1] !== this.addColumn.name) {
            console.log(this.addColumn._newstype)
            this.addColumn.level = _type.length + 1
            this.addColumn.parentid = this.newstypeToId(this.addColumn._newstype)
          } else {
            this.addColumn.level = 1
            this.addColumn.parentid = 0
          }
          api.addColumn(this.addColumn)
          .then((res) => {
            this.dialogFormVisible = false
            this.setEmptyForm()
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.queryColumn()
            return api.getLevelAllList()
          })
          .then((res) => {
            this.makeLevelList(res.datalist)
          })
        }
      })
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      // if (formName === 'addColumn') {
      //   this.changeStatus()
      // }
      if (formName === 'queryColumnParams') {
        this.queryColumn()
      }
    },
    setEmptyForm () {
      this.addColumn = {
        name: '',
        status: 0,
        remark: '',
        parentid: 0,
        forapp: 1,
        level: 1,
        imgpath: '',
        typeid: ''
      }
    },
    reset (newstype) {
      let _newstype = []
      for (let item in newstype) {
        if (!newstype[item].typename) return
        _newstype.push(newstype[item].typename)
      }
      return _newstype.reverse()
    }
  }
}
</script>

<style lang='less' scoped>
.dialog-form {
  width: 100%;
}

.block {
  padding: 10px 30px;
  text-align: right;
}

.poster {
  margin: 0 auto;
  width: 40px;
  height: 40px;
  display: block;
  background: url(../assets/images/default_col_1.png) no-repeat center;
  background-size: 32px;
}

</style>
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296
