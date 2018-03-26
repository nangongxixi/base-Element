<<<<<<< HEAD
<template>
  <div>
    <div class="page-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/opinion' }">民意征集</el-breadcrumb-item>
        <el-breadcrumb-item>编辑</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <div class="title">工单信息</div>
          <el-form-item label="来源">
            <el-select v-model="form.source" size="small">
              <el-option label="官网" :value="1"></el-option>
              <el-option label="APP" :value="2"></el-option>
              <el-option label="微信" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-select v-model="form.type" size="small">
              <el-option label="咨询" :value="10"></el-option>
              <el-option label="建议" :value="15"></el-option>
              <el-option label="求助" :value="20"></el-option>
              <el-option label="表扬" :value="25"></el-option>
              <el-option label="举报" :value="30"></el-option>
              <el-option label="其他" :value="35"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" size="small"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input autosize type="textarea" v-model="form.content" size="small"></el-input>
          </el-form-item>
        <div class="title">工单处理</div>
          <el-form-item label="当前状态" prop="status">
            <el-select v-model="form.status" size="small">
              <el-option label="待处理" :value="0"></el-option>
              <el-option label="已办结" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="处理部门">
            <el-input v-model="form.replyuser" size="small"></el-input>
          </el-form-item>
          <el-form-item label="满意度">
            <el-select v-model="form.satisfaction" size="small">
              <el-option label="非常满意" :value="0"></el-option>
              <el-option label="基本满意" :value="1"></el-option>
              <el-option label="一般" :value="2"></el-option>
              <el-option label="待评价" :value="3"></el-option>
              <el-option label="不满意" :value="4"></el-option>
              <el-option label="非常不满意" :value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="回复意见">
            <el-input autosize type="textarea" v-model="form.replycontent" size="small"></el-input>
          </el-form-item>
        <div class="title">评论</div>
          <el-form-item label="评论人">
            <el-input v-model="form.commentuser" size="small"></el-input>
          </el-form-item>
          <el-form-item label="评论内容">
            <el-input autosize type="textarea" v-model="form.commentcontent" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">提交</el-button>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from '../store/api/opinion'
export default {
  data () {
    return {
      form: {
        source: 1,
        type: 10,
        title: '',
        content: '',
        status: 0,
        replyuser: '',
        satisfaction: 0,
        replycontent: '',
        commentuser: '',
        commentcontent: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请请选择类型', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择工单类型', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      let id = this.$route.params.id
      if (id === 'add') return
      api.getOpinionDetail(id)
      .then((res) => {
        if (res.code === 1) {
          this.form = res.data
        }
        console.log(res)
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.addOpinion(this.form)
          .then((res) => {
            if (res.code === 1) {
              this.$message({
                type: 'success',
                message: res.msg
              })
              this.$router.push('/opinion')
            }
            console.log(res)
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  background: #f0f2f5;
  height: 30px;
  margin-bottom: 10px;
  line-height: 30px;
  padding: 0 10px;
}
.el-form-item {
  margin-bottom: 10px;
}
</style>
=======
<template>
  <div>
    <div class="page-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/opinion' }">民意征集</el-breadcrumb-item>
        <el-breadcrumb-item>编辑</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <div class="title">工单信息</div>
          <el-form-item label="来源">
            <el-select v-model="form.source" size="small">
              <el-option label="官网" :value="1"></el-option>
              <el-option label="APP" :value="2"></el-option>
              <el-option label="微信" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-select v-model="form.type" size="small">
              <el-option label="咨询" :value="10"></el-option>
              <el-option label="建议" :value="15"></el-option>
              <el-option label="求助" :value="20"></el-option>
              <el-option label="表扬" :value="25"></el-option>
              <el-option label="举报" :value="30"></el-option>
              <el-option label="其他" :value="35"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" size="small"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input autosize type="textarea" v-model="form.content" size="small"></el-input>
          </el-form-item>
        <div class="title">工单处理</div>
          <el-form-item label="当前状态" prop="status">
            <el-select v-model="form.status" size="small">
              <el-option label="待处理" :value="0"></el-option>
              <el-option label="已办结" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="处理部门">
            <el-input v-model="form.replyuser" size="small"></el-input>
          </el-form-item>
          <el-form-item label="满意度">
            <el-select v-model="form.satisfaction" size="small">
              <el-option label="非常满意" :value="0"></el-option>
              <el-option label="基本满意" :value="1"></el-option>
              <el-option label="一般" :value="2"></el-option>
              <el-option label="待评价" :value="3"></el-option>
              <el-option label="不满意" :value="4"></el-option>
              <el-option label="非常不满意" :value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="回复意见">
            <el-input autosize type="textarea" v-model="form.replycontent" size="small"></el-input>
          </el-form-item>
        <div class="title">评论</div>
          <el-form-item label="评论人">
            <el-input v-model="form.commentuser" size="small"></el-input>
          </el-form-item>
          <el-form-item label="评论内容">
            <el-input autosize type="textarea" v-model="form.commentcontent" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">提交</el-button>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from '../store/api/opinion'
export default {
  data () {
    return {
      form: {
        source: 1,
        type: 10,
        title: '',
        content: '',
        status: 0,
        replyuser: '',
        satisfaction: 0,
        replycontent: '',
        commentuser: '',
        commentcontent: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请请选择类型', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择工单类型', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      let id = this.$route.params.id
      if (id === 'add') return
      api.getOpinionDetail(id)
      .then((res) => {
        if (res.code === 1) {
          this.form = res.data
        }
        console.log(res)
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.addOpinion(this.form)
          .then((res) => {
            if (res.code === 1) {
              this.$message({
                type: 'success',
                message: res.msg
              })
              this.$router.push('/opinion')
            }
            console.log(res)
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  background: #f0f2f5;
  height: 30px;
  margin-bottom: 10px;
  line-height: 30px;
  padding: 0 10px;
}
.el-form-item {
  margin-bottom: 10px;
}
</style>
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296
