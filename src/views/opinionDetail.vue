<<<<<<< HEAD
<template>
  <div>
    <div class="page-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/opinion' }">民意征集</el-breadcrumb-item>
        <el-breadcrumb-item>详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <el-row>
        <el-col :span="24"><div class="grid-content title">工单信息</div></el-col>
      </el-row>
      <div class="info">
        <el-row>
          <el-col :span="6"><div class="">编号：{{data.number}}</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple-light">创建时间：{{data.createtime}}</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">来源：{{data.source | _source}}</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple-light">类型：{{data.type | _type}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><div class="grid-content">标题：{{data.title}}</div></el-col>
        </el-row>
        <el-row>
          <div class="grid-content" style="float:left">内容：</div>
          <div class="" style="margin-left:40px">{{data.content}}</div>
        </el-row>
      </div>
      <el-row>
        <el-col :span="24"><div class="grid-content title">处理情况</div></el-col>
      </el-row>
      <div class="info">
        <el-row>
          <el-col :span="8"><div class="">当前状态： {{data.status | _status}}</div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple-light">处理部门： {{data.replyuser}}</div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple">满意度： {{data.satisfaction | _satisfaction}}</div></el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="24"><div class="grid-content">领导批示：</div></el-col>
        </el-row> -->
        <el-row>
          <div class="grid-content" style="float:left">回复意见：</div>
          <div class="" style="margin-left:40px">{{data.replycontent}}</div>
        </el-row>
      </div>
      <el-row>
        <el-col :span="24"><div class="grid-content title">评论</div></el-col>
      </el-row>
      <div class="info">
        <el-row>
          <el-col :span="24"><div class="grid-content">评论人：{{data.commentuser}}</div></el-col>
        </el-row>
        <el-row>
          <div class="grid-content" style="float:left">评论内容：</div>
          <div class="" style="margin-left:40px">{{data.commentcontent}}</div>
        </el-row>
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
      data: {}
    }
  },
  mounted () {
    this.getData()
  },
  filters: {
    _type (val) {
      var arr = ['咨询', '建议', '求助', '表扬', '举报', '其他']
      val = parseInt(val) / 5 - 2
      return arr[val]
    },
    _source (val) {
      let arr = ['官网', 'APP', '微信']
      return arr[+val - 1]
    },
    _satisfaction (val) {
      let arr = ['非常满意', '基本满意', '一般', '待评价', '不满意', '非常不满意']
      return arr[+val]
    },
    _status (val) {
      let arr = ['待处理', '已完结']
      return arr[+val]
    }
  },
  methods: {
    getData () {
      let id = this.$route.params.id
      api.getOpinionDetail(id)
      .then((res) => {
        if (res.code === 1) {
          this.data = res.data
        }
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  background: #f0f2f5;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
}

.info {
  padding: 15px 10px;
}

.el-row {
  padding: 10px 0;
}
</style>
=======
<template>
  <div>
    <div class="page-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/opinion' }">民意征集</el-breadcrumb-item>
        <el-breadcrumb-item>详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <el-row>
        <el-col :span="24"><div class="grid-content title">工单信息</div></el-col>
      </el-row>
      <div class="info">
        <el-row>
          <el-col :span="6"><div class="">编号：{{data.number}}</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple-light">创建时间：{{data.createtime}}</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">来源：{{data.source | _source}}</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple-light">类型：{{data.type | _type}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><div class="grid-content">标题：{{data.title}}</div></el-col>
        </el-row>
        <el-row>
          <div class="grid-content" style="float:left">内容：</div>
          <div class="" style="margin-left:40px">{{data.content}}</div>
        </el-row>
      </div>
      <el-row>
        <el-col :span="24"><div class="grid-content title">处理情况</div></el-col>
      </el-row>
      <div class="info">
        <el-row>
          <el-col :span="8"><div class="">当前状态： {{data.status | _status}}</div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple-light">处理部门： {{data.replyuser}}</div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple">满意度： {{data.satisfaction | _satisfaction}}</div></el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="24"><div class="grid-content">领导批示：</div></el-col>
        </el-row> -->
        <el-row>
          <div class="grid-content" style="float:left">回复意见：</div>
          <div class="" style="margin-left:40px">{{data.replycontent}}</div>
        </el-row>
      </div>
      <el-row>
        <el-col :span="24"><div class="grid-content title">评论</div></el-col>
      </el-row>
      <div class="info">
        <el-row>
          <el-col :span="24"><div class="grid-content">评论人：{{data.commentuser}}</div></el-col>
        </el-row>
        <el-row>
          <div class="grid-content" style="float:left">评论内容：</div>
          <div class="" style="margin-left:40px">{{data.commentcontent}}</div>
        </el-row>
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
      data: {}
    }
  },
  mounted () {
    this.getData()
  },
  filters: {
    _type (val) {
      var arr = ['咨询', '建议', '求助', '表扬', '举报', '其他']
      val = parseInt(val) / 5 - 2
      return arr[val]
    },
    _source (val) {
      let arr = ['官网', 'APP', '微信']
      return arr[+val - 1]
    },
    _satisfaction (val) {
      let arr = ['非常满意', '基本满意', '一般', '待评价', '不满意', '非常不满意']
      return arr[+val]
    },
    _status (val) {
      let arr = ['待处理', '已完结']
      return arr[+val]
    }
  },
  methods: {
    getData () {
      let id = this.$route.params.id
      api.getOpinionDetail(id)
      .then((res) => {
        if (res.code === 1) {
          this.data = res.data
        }
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  background: #f0f2f5;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
}

.info {
  padding: 15px 10px;
}

.el-row {
  padding: 10px 0;
}
</style>
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296
