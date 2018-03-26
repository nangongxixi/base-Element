<<<<<<< HEAD
<template>
  <div>
    <div class="page-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/article' }">文章管理</el-breadcrumb-item>
        <el-breadcrumb-item>编辑文章</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="title">编辑文章</div>
    </div>
    <div class="content addarticle" v-loading="loading">
      <el-form ref="articleForm" :rules="rules" :model="articleForm" label-width="100px">
        <el-form-item label="文章标题" prop="title">
          <el-input class="input" v-model="articleForm.title" size="medium" style="width:600px;"></el-input>
        </el-form-item>
        <el-form-item label="文章出处" prop="source">
          <el-input class="input" v-model="articleForm.source" size="medium" style="width:600px;"></el-input>
        </el-form-item>
        <el-form-item label="选取栏目" prop="_newstype">
          <el-cascader
            size="medium"
            style="width: 600px"
            v-model="articleForm._newstype"
            :options="level"
            @change="handleLevelChange"
            :props="levelprops">
          </el-cascader>
        </el-form-item>
        <el-form-item label="是否Banner" prop="isbanner">
          <el-radio-group size="medium" v-model="articleForm.isbanner" :disabled="articleForm.model === 3 || articleForm.model === 2">
            <el-radio border :label="1">是</el-radio>
            <el-radio border :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否上架" prop="status">
          <el-radio-group size="medium" v-model="articleForm.status">
            <el-radio border :label="0">是</el-radio>
            <el-radio border :label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文章摘要" prop="remark">
          <el-input type="textarea" v-model="articleForm.remark" autosize></el-input>
        </el-form-item>
        <el-form-item label="封面模式" prop="model">
          <el-select size="medium" v-model="articleForm.model" placeholder="请选择活动区域" @change="handleChangeModel">
            <el-option label="多图" :value="0"></el-option>
            <el-option label="单图" :value="1"></el-option>
            <el-option label="文字" :value="2"></el-option>
            <el-option label="外链" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-show="articleForm.model !== 2" label="封面图片" prop="imgguid">
          <el-upload
            class="upload-img"
            ref="uploadImg"
            action=""
            :limit="3"
            multiple
            accept="image/*"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
            list-type="picture">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传图片</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb。（多图模式最多上传三张图片）</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章外链" prop="linkurl" v-show="articleForm.model === 3">
          <el-input v-model="articleForm.linkurl" size="medium" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="文章内容" prop="content" v-show="articleForm.model < 3">
          <quill-editor
            v-model="articleForm.content"
            ref="quillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)">
          </quill-editor>
          <!-- <div class="content ql-editor" v-html="content"></div> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('articleForm')">保存</el-button>
          <el-button type="warning"  @click="dialogTableVisible = true">预览</el-button>
          <el-button @click="resetForm('articleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog :visible.sync="dialogTableVisible">
     <div class="preview-article">
        <div class="title">{{articleForm.title}}</div>
        <div class="source">来源：{{articleForm.source}}</div>
        <div class="content" v-html="articleForm.content"></div>
     </div>
  </el-dialog>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import api from '../store/api/article'
import com from '../store/api/com'
import _ from 'lodash'
export default {
  data () {
    let validateLink = (rule, value, callback) => {
      if (!value) {
        return callback()
      }
      let reg = /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/g
      if (value.match(reg)) {
        callback()
      } else {
        callback(new Error('外链地址不合法'))
      }
    }
    return {
      loading: false,
      dialogTableVisible: false,
      fileList: [], // 图片信息回填
      uploadImgList: new FormData(),
      imgTotal: 0,
      level: [], // 栏目级联数据
      imgCount: null, // 上传图片数量
      levelprops: {
        value: 'label',
        children: 'columns'
      },
      levelSort: null, // 处理分层后栏目数据
      articleForm: {
        newsid: null,
        title: '',
        remark: '',
        source: '',
        newstype: null,
        _newstype: null,
        content: '',
        imgguid: '',
        isbanner: 0,
        linkurl: '',
        status: 0,
        model: 0
      },
      rules: {
        remark: [],
        isbanner: [],
        model: [],
        status: [],
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        source: [
          { required: true, message: '请填写文章来源', trigger: 'blur' }
        ],
        _newstype: [
          { required: true, message: '请选择所属栏目', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章正文', trigger: 'blur' }
        ],
        imgguid: [
          { required: true, message: '请上传封面图片', trigger: 'blur' }
        ],
        linkurl: [
          { required: false, message: '请输入活动名称', trigger: 'blur' },
          { validator: validateLink, trigger: 'blur' }
        ]
      },
      editorOption: {
        placeholder: '输入文章正文...',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'image', 'video']
          ]
        },
        theme: 'snow'
      }
    }
  },
  components: {
    quillEditor
  },
  computed: {
    editor () {
      return this.$refs.quillEditor.quill
    }
  },
  watch: {
    articleForm: {
      handler: function (newval) {
        this.getArticleForm(newval)
      },
      deep: true
    }
  },
  mounted () {
    this.init()
    api.getLevelAllList()
    .then((res) => {
      this.makeLevelList(res.datalist)
    })
  },
  methods: {
    init () {
      const newsid = this.$route.params.id
      if (newsid === 'add') return
      api.getArticleDetail(newsid)
      .then((res) => {
        this.articleForm = res.data
        this.articleForm._newstype = reset(this.articleForm.newstype)
      })
      function reset (newstype) {
        let _newstype = []
        for (let item in newstype) {
          if (!newstype[item].typename) return
          _newstype.push(newstype[item].typename)
        }
        return _newstype
      }
    },
    getArticleForm: _.debounce(
      function (newval) {
        localStorage.setItem('articleForm', JSON.stringify(newval))
      },
    500),
    // 构造级联栏目数据
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
      this.levelSort = templist  // 分层后数据
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
    // 选中的文字栏目集合转为ID
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
    handleChangeModel (val) {
      // 图片
      console.log(val)
      if (val === 0 || val === 1) {
        this.rules.linkurl[0].required = false
        this.rules.content[0].required = true
        this.rules.imgguid[0].required = true
        console.log(this.rules.content[0].required)
      }
      // 文字
      if (val === 2) {
        this.rules.imgguid[0].required = false
        this.rules.content[0].required = true
        this.articleForm.isbanner = 0
      }
      // 外链
      if (val === 3) {
        this.rules.content[0].required = false
        this.rules.imgguid[0].required = true
        this.rules.linkurl[0].required = true
        this.articleForm.isbanner = 0
      }
    },
    handleChange (file, fileList) {
      this.uploadImgList.append(file.name, file.raw)
      this.imgTotal++
      if (this.articleForm.model === 3) return
      this.articleForm.model = this.handleImgTotal(this.imgTotal)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
      this.uploadImgList.delete(file.name)
      this.imgTotal--
      if (this.articleForm.model === 3) return
      this.articleForm.model = this.handleImgTotal(this.imgTotal)
    },
    handleImgTotal (imgTotal) {
      return imgTotal > 1 ? 0 : 1
    },
    handlePreview () {

    },
    submitUpload () {
      if (this.imgTotal === 0) {
        return this.$message.error('请先选取要上传的图片')
      }
      com.uploadImg(this.uploadImgList)
      .then((res) => {
        this.articleForm.imgguid = res.data
        this.$message({
          message: '上传成功',
          type: 'success'
        })
      })
    },
    onEditorBlur (quill) {
    },
    onEditorFocus (quill) {
    },
    onEditorReady (quill) {
    },
    handleLevelChange (val) {
      console.log('active item:', val)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    beforeSubmitForm () {
      let model = this.articleForm.model
      if (model === 0 || model === 1) {
        this.articleForm.linkurl = ''
      }
      if (model === 2) {
        this.articleForm.imgguid = ''
      }
      if (model === 3) {
        this.articleForm.content = ''
      }
    },
    submitForm (formName) {
      this.handleChangeModel(this.articleForm.model)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('111')
          this.loading = true
          this.articleForm.newstype = this.newstypeToId(this.articleForm._newstype)
          this.beforeSubmitForm()
          api.addArticle(this.articleForm)
            .then((res) => {
              if (res.code === 1) {
                localStorage.removeItem('articleForm')
                this.loading = false
                this.$message({
                  message: '提交成功',
                  type: 'success'
                })
                this.$router.push({path: '/article'})
              }
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>


<style lang="less" scpoed>
.addarticle .el-form textarea {
  width: 600px;
  min-height: 200px;
}

.addarticle .input {
  width: 600px
}

.ql-editor {
  min-height: 300px;
}

.ql-toolbar.ql-snow {
  line-height: 1;
}

.upload-img {
  width: 400px;
  img {
    width: auto;
  }
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
</style>
=======
<template>
  <div>
    <div class="page-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/article' }">文章管理</el-breadcrumb-item>
        <el-breadcrumb-item>编辑文章</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="title">编辑文章</div>
    </div>
    <div class="content addarticle" v-loading="loading">
      <el-form ref="articleForm" :rules="rules" :model="articleForm" label-width="100px">
        <el-form-item label="文章标题" prop="title">
          <el-input class="input" v-model="articleForm.title" size="medium" style="width:600px;"></el-input>
        </el-form-item>
        <el-form-item label="文章出处" prop="source">
          <el-input class="input" v-model="articleForm.source" size="medium" style="width:600px;"></el-input>
        </el-form-item>
        <el-form-item label="选取栏目" prop="_newstype">
          <el-cascader
            size="medium"
            style="width: 600px"
            v-model="articleForm._newstype"
            :options="level"
            @change="handleLevelChange"
            :props="levelprops">
          </el-cascader>
        </el-form-item>
        <el-form-item label="是否Banner" prop="isbanner">
          <el-radio-group size="medium" v-model="articleForm.isbanner" :disabled="articleForm.model === 3 || articleForm.model === 2">
            <el-radio border :label="1">是</el-radio>
            <el-radio border :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否上架" prop="status">
          <el-radio-group size="medium" v-model="articleForm.status">
            <el-radio border :label="0">是</el-radio>
            <el-radio border :label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文章摘要" prop="remark">
          <el-input type="textarea" v-model="articleForm.remark" autosize></el-input>
        </el-form-item>
        <el-form-item label="封面模式" prop="model">
          <el-select size="medium" v-model="articleForm.model" placeholder="请选择活动区域" @change="handleChangeModel">
            <el-option label="多图" :value="0"></el-option>
            <el-option label="单图" :value="1"></el-option>
            <el-option label="文字" :value="2"></el-option>
            <el-option label="外链" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-show="articleForm.model !== 2" label="封面图片" prop="imgguid">
          <el-upload
            class="upload-img"
            ref="uploadImg"
            action=""
            :limit="3"
            multiple
            accept="image/*"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
            list-type="picture">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传图片</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb。（多图模式最多上传三张图片）</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章外链" prop="linkurl" v-show="articleForm.model === 3">
          <el-input v-model="articleForm.linkurl" size="medium" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="文章内容" prop="content" v-show="articleForm.model < 3">
          <quill-editor
            v-model="articleForm.content"
            ref="quillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)">
          </quill-editor>
          <!-- <div class="content ql-editor" v-html="content"></div> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('articleForm')">保存</el-button>
          <el-button type="warning"  @click="dialogTableVisible = true">预览</el-button>
          <el-button @click="resetForm('articleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog :visible.sync="dialogTableVisible">
     <div class="preview-article">
        <div class="title">{{articleForm.title}}</div>
        <div class="source">来源：{{articleForm.source}}</div>
        <div class="content" v-html="articleForm.content"></div>
     </div>
  </el-dialog>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import api from '../store/api/article'
import com from '../store/api/com'
import _ from 'lodash'
export default {
  data () {
    let validateLink = (rule, value, callback) => {
      if (!value) {
        return callback()
      }
      let reg = /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/g
      if (value.match(reg)) {
        callback()
      } else {
        callback(new Error('外链地址不合法'))
      }
    }
    return {
      loading: false,
      dialogTableVisible: false,
      fileList: [], // 图片信息回填
      uploadImgList: new FormData(),
      imgTotal: 0,
      level: [], // 栏目级联数据
      imgCount: null, // 上传图片数量
      levelprops: {
        value: 'label',
        children: 'columns'
      },
      levelSort: null, // 处理分层后栏目数据
      articleForm: {
        newsid: null,
        title: '',
        remark: '',
        source: '',
        newstype: null,
        _newstype: null,
        content: '',
        imgguid: '',
        isbanner: 0,
        linkurl: '',
        status: 0,
        model: 0
      },
      rules: {
        remark: [],
        isbanner: [],
        model: [],
        status: [],
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        source: [
          { required: true, message: '请填写文章来源', trigger: 'blur' }
        ],
        _newstype: [
          { required: true, message: '请选择所属栏目', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章正文', trigger: 'blur' }
        ],
        imgguid: [
          { required: true, message: '请上传封面图片', trigger: 'blur' }
        ],
        linkurl: [
          { required: false, message: '请输入活动名称', trigger: 'blur' },
          { validator: validateLink, trigger: 'blur' }
        ]
      },
      editorOption: {
        placeholder: '输入文章正文...',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'image', 'video']
          ]
        },
        theme: 'snow'
      }
    }
  },
  components: {
    quillEditor
  },
  computed: {
    editor () {
      return this.$refs.quillEditor.quill
    }
  },
  watch: {
    articleForm: {
      handler: function (newval) {
        this.getArticleForm(newval)
      },
      deep: true
    }
  },
  mounted () {
    this.init()
    api.getLevelAllList()
    .then((res) => {
      this.makeLevelList(res.datalist)
    })
  },
  methods: {
    init () {
      const newsid = this.$route.params.id
      if (newsid === 'add') return
      api.getArticleDetail(newsid)
      .then((res) => {
        this.articleForm = res.data
        this.articleForm._newstype = reset(this.articleForm.newstype)
      })
      function reset (newstype) {
        let _newstype = []
        for (let item in newstype) {
          if (!newstype[item].typename) return
          _newstype.push(newstype[item].typename)
        }
        return _newstype
      }
    },
    getArticleForm: _.debounce(
      function (newval) {
        localStorage.setItem('articleForm', JSON.stringify(newval))
      },
    500),
    // 构造级联栏目数据
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
      this.levelSort = templist  // 分层后数据
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
    // 选中的文字栏目集合转为ID
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
    handleChangeModel (val) {
      // 图片
      console.log(val)
      if (val === 0 || val === 1) {
        this.rules.linkurl[0].required = false
        this.rules.content[0].required = true
        this.rules.imgguid[0].required = true
        console.log(this.rules.content[0].required)
      }
      // 文字
      if (val === 2) {
        this.rules.imgguid[0].required = false
        this.rules.content[0].required = true
        this.articleForm.isbanner = 0
      }
      // 外链
      if (val === 3) {
        this.rules.content[0].required = false
        this.rules.imgguid[0].required = true
        this.rules.linkurl[0].required = true
        this.articleForm.isbanner = 0
      }
    },
    handleChange (file, fileList) {
      this.uploadImgList.append(file.name, file.raw)
      this.imgTotal++
      if (this.articleForm.model === 3) return
      this.articleForm.model = this.handleImgTotal(this.imgTotal)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
      this.uploadImgList.delete(file.name)
      this.imgTotal--
      if (this.articleForm.model === 3) return
      this.articleForm.model = this.handleImgTotal(this.imgTotal)
    },
    handleImgTotal (imgTotal) {
      return imgTotal > 1 ? 0 : 1
    },
    handlePreview () {

    },
    submitUpload () {
      if (this.imgTotal === 0) {
        return this.$message.error('请先选取要上传的图片')
      }
      com.uploadImg(this.uploadImgList)
      .then((res) => {
        this.articleForm.imgguid = res.data
        this.$message({
          message: '上传成功',
          type: 'success'
        })
      })
    },
    onEditorBlur (quill) {
    },
    onEditorFocus (quill) {
    },
    onEditorReady (quill) {
    },
    handleLevelChange (val) {
      console.log('active item:', val)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    beforeSubmitForm () {
      let model = this.articleForm.model
      if (model === 0 || model === 1) {
        this.articleForm.linkurl = ''
      }
      if (model === 2) {
        this.articleForm.imgguid = ''
      }
      if (model === 3) {
        this.articleForm.content = ''
      }
    },
    submitForm (formName) {
      this.handleChangeModel(this.articleForm.model)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('111')
          this.loading = true
          this.articleForm.newstype = this.newstypeToId(this.articleForm._newstype)
          this.beforeSubmitForm()
          api.addArticle(this.articleForm)
            .then((res) => {
              if (res.code === 1) {
                localStorage.removeItem('articleForm')
                this.loading = false
                this.$message({
                  message: '提交成功',
                  type: 'success'
                })
                this.$router.push({path: '/article'})
              }
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>


<style lang="less" scpoed>
.addarticle .el-form textarea {
  width: 600px;
  min-height: 200px;
}

.addarticle .input {
  width: 600px
}

.ql-editor {
  min-height: 300px;
}

.ql-toolbar.ql-snow {
  line-height: 1;
}

.upload-img {
  width: 400px;
  img {
    width: auto;
  }
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
</style>
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296
