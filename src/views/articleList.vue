<<<<<<< HEAD
<template>
  <div>
    <div class="page-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <el-form :inline='true' :model='queryArticleParams' :rules='rules' ref='queryArticleParams'>
        <el-form-item label='文章标题' label-width='80px' prop='title'>
          <el-input v-model='queryArticleParams.title' size="medium" placeholder='请输入栏目名称'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type='primary' icon="el-icon-search" @click='queryArticle'>搜索</el-button>
          <el-button size="medium" @click="resetForm('queryArticleParams')">重置</el-button>
        </el-form-item>
      </el-form>
      <div style="margin-bottom:15px;overflow:hidden">
        <el-radio-group
          v-model="queryArticleParams.status"
          @change="handleRadio"
          style="float:left">
          <el-radio-button :label="0">已上架</el-radio-button>
          <el-radio-button :label="1">已下架</el-radio-button>
        </el-radio-group>
        <el-button v-if="role.add" style="float:left;margin:0 25px 0;" @click="toedit('add')" icon="el-icon-plus">新建文章</el-button>
      </div>
      <template>
        <el-table
          :data="articleList"
          stripe
          v-loading="loading"
          style="width: 100%"
          header-row-class-name="table-head">
          <el-table-column
            label="编号"
            width="100px"
            align="center">
            <template slot-scope="scope">
              <el-tag 
                size="small">
                {{scope.row.newsid}}
                </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="标题"
            width="170px"
            align="center"
            prop="title">
          </el-table-column>
          <el-table-column
            label="来源"
            width="100px"
            align="center"
            prop="source">
          </el-table-column>
          <el-table-column
            label="是否Banner"
            align="center"
            width="100px">
            <template slot-scope="scope">
              <el-tag 
                size="small"
                :type="scope.row.isbanner === 0 ? 'info' : 'success'">
                {{ scope.row.isbanner === 0 ? '否' : '是' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="所属栏目"
            align="center"
            width="200px">
            <template slot-scope="scope">
              <el-tag 
                size="small"
                type="warning">
                {{ scope.row.newstype.length !== 0 ? scope.row.newstype.slice(-1)[0].typename : '无' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            width="120px"
            align="center"
            label="封面">
            <template slot-scope="scope">
              <div class="poster" v-if="scope.row.imgpath[0]" :style="{ backgroundImage: 'url(' + scope.row.imgpath[0] + ')' }"></div>
              <div class="poster" v-if="!scope.row.imgpath[0]"></div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="备注">
            <template slot-scope="scope">
              {{scope.row.remark === null ? '无' : scope.row.remark.substr(0,50)}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="300px"
            type="index"
            align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.status === 0">
                <el-button
                size="mini"
                @click="toDetail(scope.$index)">详情</el-button>
                <el-button
                size="mini"
                type="success"
                @click="setStatus(scope.row.newsid, 1)">下架</el-button>
                <el-button
                v-if="role.remove"
                size="mini"
                type="danger"
                @click="todelete(scope.row.newsid, scope.$index)">删除</el-button>
              </div>
              <div v-if="scope.row.status === 1">
                <el-button
                size="mini"
                @click="toDetail(scope.$index)">详情</el-button>
                <el-button
                size="mini"
                type="success"
                @click="setStatus(scope.row.newsid, 0)">上架</el-button>
                <el-button
                v-if="role.edit"
                size="mini"
                type="primary"
                @click="toedit(scope.row.newsid, scope.$index)">编辑</el-button>
                <el-button
                v-if="role.remove"
                size="mini"
                type="danger"
                @click="todelete(scope.row.newsid, scope.$index)">删除</el-button>
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
    <el-dialog title="" :visible.sync="dialogArticleVisible">
     <div class="preview-article">
        <div class="title">{{previewArticle.title}}</div>
        <div class="source">{{previewArticle.source}}</div>
        <div class="content" v-html="previewArticle.content"></div>
     </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '../store/api/article'
export default {
  data () {
    return {
      totalpages: 1,
      loading: false,
      articleList: [],
      dialogArticleVisible: false,
      previewArticle: {
        newsid: null,
        title: '',
        remark: '',
        source: '',
        newstype: [],
        content: '',
        imgguid: '',
        isbanner: 0,
        linkurl: '',
        status: 0,
        model: 0
      },
      queryArticleParams: {
        newsid: null,
        title: '',
        status: 0,
        newstypeid: null,
        typename: '',
        pageindex: 1
      },
      rules: {
        title: []
      },
      roleList: null,
      role: {
        add: false,
        edit: false,
        remove: false
      }
    }
  },
  mounted () {
    this.queryArticle()
    this.getRoleList()
  },
  methods: {
    getRoleList () {
      this.roleList = JSON.parse(localStorage.getItem('roleList'))
      console.log(this.roleList)
      this.roleList.map((i) => {
        if (i.rightid === 6) {
          this.role.add = true
        }
        if (i.rightid === 7) {
          this.role.edit = true
        }
        if (i.rightid === 8) {
          this.role.remove = true
        }
      })
    },
    queryArticle () {
      this.loading = true
      api.getArticleList(this.queryArticleParams)
      .then((res) => {
        this.articleList = res.datalist
        this.totalpages = res.totalpages
        this.loading = false
      })
    },
    handleCurrentChange (val) {
      this.queryArticleParams.pageindex = +val
      this.queryArticle()
    },
    handleRadio (val) {
      this.queryArticle()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.queryArticle()
    },
    toDetail (index) {
      console.log('1')
      if (!this.articleList[index]) return
      this.previewArticle = this.articleList[index]
      this.dialogArticleVisible = true
    },
    setStatus (id, status) {
      let text = status === 0 ? '上架' : '下架'
      this.$confirm('此操作将' + text + '该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        return api.setArticleStatus({
          'newsid': id,
          'status': status
        })
      })
      .then((res) => {
        if (res.code === 0) {
          return this.$message.error(res.msg)
        }
        this.queryArticle()
        this.$message({
          type: 'success',
          message: text + '成功!'
        })
      })
    },
    toedit (id, index) {
      this.$router.push({path: `/article/edit/${id}`})
    },
    todelete (id, index) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        return api.deleteArticle(id)
      })
      .then((res) => {
        if (res.code === 0) {
          return this.$message.error(res.msg)
        }
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.articleList.splice(index, 1)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.poster {
  margin: 0 auto;
  width: 80px;
  height: 80px;
  display: block;
  background: url(../assets/images/default_news.png) no-repeat center;
  background-size: 80px;
}

.preview-article {
  .title {
    font-size: 24px;
    color: #333;
    line-height: 1.5;
    font-weight: bold;
    text-align: center;
  }
  .source {
    margin-top: 10px;
    font-size: 16px;
    color: #666;
    text-align: center
  }
}
=======
<template>
  <div>
    <div class="page-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <el-form :inline='true' :model='queryArticleParams' :rules='rules' ref='queryArticleParams'>
        <el-form-item label='文章标题' label-width='80px' prop='title'>
          <el-input v-model='queryArticleParams.title' size="medium" placeholder='请输入栏目名称'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type='primary' icon="el-icon-search" @click='queryArticle'>搜索</el-button>
          <el-button size="medium" @click="resetForm('queryArticleParams')">重置</el-button>
        </el-form-item>
      </el-form>
      <div style="margin-bottom:15px;overflow:hidden">
        <el-radio-group
          v-model="queryArticleParams.status"
          @change="handleRadio"
          style="float:left">
          <el-radio-button :label="0">已上架</el-radio-button>
          <el-radio-button :label="1">已下架</el-radio-button>
        </el-radio-group>
        <el-button v-if="role.add" style="float:left;margin:0 25px 0;" @click="toedit('add')" icon="el-icon-plus">新建文章</el-button>
      </div>
      <template>
        <el-table
          :data="articleList"
          stripe
          v-loading="loading"
          style="width: 100%"
          header-row-class-name="table-head">
          <el-table-column
            label="编号"
            width="100px"
            align="center">
            <template slot-scope="scope">
              <el-tag 
                size="small">
                {{scope.row.newsid}}
                </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="标题"
            width="170px"
            align="center"
            prop="title">
          </el-table-column>
          <el-table-column
            label="来源"
            width="100px"
            align="center"
            prop="source">
          </el-table-column>
          <el-table-column
            label="是否Banner"
            align="center"
            width="100px">
            <template slot-scope="scope">
              <el-tag 
                size="small"
                :type="scope.row.isbanner === 0 ? 'info' : 'success'">
                {{ scope.row.isbanner === 0 ? '否' : '是' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="所属栏目"
            align="center"
            width="200px">
            <template slot-scope="scope">
              <el-tag 
                size="small"
                type="warning">
                {{ scope.row.newstype.length !== 0 ? scope.row.newstype.slice(-1)[0].typename : '无' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            width="120px"
            align="center"
            label="封面">
            <template slot-scope="scope">
              <div class="poster" v-if="scope.row.imgpath[0]" :style="{ backgroundImage: 'url(' + scope.row.imgpath[0] + ')' }"></div>
              <div class="poster" v-if="!scope.row.imgpath[0]"></div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="备注">
            <template slot-scope="scope">
              {{scope.row.remark === null ? '无' : scope.row.remark.substr(0,50)}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="300px"
            type="index"
            align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.status === 0">
                <el-button
                size="mini"
                @click="toDetail(scope.$index)">详情</el-button>
                <el-button
                size="mini"
                type="success"
                @click="setStatus(scope.row.newsid, 1)">下架</el-button>
                <el-button
                v-if="role.remove"
                size="mini"
                type="danger"
                @click="todelete(scope.row.newsid, scope.$index)">删除</el-button>
              </div>
              <div v-if="scope.row.status === 1">
                <el-button
                size="mini"
                @click="toDetail(scope.$index)">详情</el-button>
                <el-button
                size="mini"
                type="success"
                @click="setStatus(scope.row.newsid, 0)">上架</el-button>
                <el-button
                v-if="role.edit"
                size="mini"
                type="primary"
                @click="toedit(scope.row.newsid, scope.$index)">编辑</el-button>
                <el-button
                v-if="role.remove"
                size="mini"
                type="danger"
                @click="todelete(scope.row.newsid, scope.$index)">删除</el-button>
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
    <el-dialog title="" :visible.sync="dialogArticleVisible">
     <div class="preview-article">
        <div class="title">{{previewArticle.title}}</div>
        <div class="source">{{previewArticle.source}}</div>
        <div class="content" v-html="previewArticle.content"></div>
     </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '../store/api/article'
export default {
  data () {
    return {
      totalpages: 1,
      loading: false,
      articleList: [],
      dialogArticleVisible: false,
      previewArticle: {
        newsid: null,
        title: '',
        remark: '',
        source: '',
        newstype: [],
        content: '',
        imgguid: '',
        isbanner: 0,
        linkurl: '',
        status: 0,
        model: 0
      },
      queryArticleParams: {
        newsid: null,
        title: '',
        status: 0,
        newstypeid: null,
        typename: '',
        pageindex: 1
      },
      rules: {
        title: []
      },
      roleList: null,
      role: {
        add: false,
        edit: false,
        remove: false
      }
    }
  },
  mounted () {
    this.queryArticle()
    this.getRoleList()
  },
  methods: {
    getRoleList () {
      this.roleList = JSON.parse(localStorage.getItem('roleList'))
      console.log(this.roleList)
      this.roleList.map((i) => {
        if (i.rightid === 6) {
          this.role.add = true
        }
        if (i.rightid === 7) {
          this.role.edit = true
        }
        if (i.rightid === 8) {
          this.role.remove = true
        }
      })
    },
    queryArticle () {
      this.loading = true
      api.getArticleList(this.queryArticleParams)
      .then((res) => {
        this.articleList = res.datalist
        this.totalpages = res.totalpages
        this.loading = false
      })
    },
    handleCurrentChange (val) {
      this.queryArticleParams.pageindex = +val
      this.queryArticle()
    },
    handleRadio (val) {
      this.queryArticle()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.queryArticle()
    },
    toDetail (index) {
      console.log('1')
      if (!this.articleList[index]) return
      this.previewArticle = this.articleList[index]
      this.dialogArticleVisible = true
    },
    setStatus (id, status) {
      let text = status === 0 ? '上架' : '下架'
      this.$confirm('此操作将' + text + '该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        return api.setArticleStatus({
          'newsid': id,
          'status': status
        })
      })
      .then((res) => {
        if (res.code === 0) {
          return this.$message.error(res.msg)
        }
        this.queryArticle()
        this.$message({
          type: 'success',
          message: text + '成功!'
        })
      })
    },
    toedit (id, index) {
      this.$router.push({path: `/article/edit/${id}`})
    },
    todelete (id, index) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        return api.deleteArticle(id)
      })
      .then((res) => {
        if (res.code === 0) {
          return this.$message.error(res.msg)
        }
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.articleList.splice(index, 1)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.poster {
  margin: 0 auto;
  width: 80px;
  height: 80px;
  display: block;
  background: url(../assets/images/default_news.png) no-repeat center;
  background-size: 80px;
}

.preview-article {
  .title {
    font-size: 24px;
    color: #333;
    line-height: 1.5;
    font-weight: bold;
    text-align: center;
  }
  .source {
    margin-top: 10px;
    font-size: 16px;
    color: #666;
    text-align: center
  }
}
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296
</style>