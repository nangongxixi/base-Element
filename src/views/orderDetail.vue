<<<<<<< HEAD
<template>
  <div>
    <div class="page-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/order' }">工单管理</el-breadcrumb-item>
        <el-breadcrumb-item>详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <el-row>
        <el-col :span="24"><div class="grid-content title">客户信息</div></el-col>
      </el-row>
      <div class="info">
        <el-row>
          <el-col :span="6"><div class="">姓名：{{data.name}}</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple-light">性别：{{data.sex === 0 ? '女' : '男'}}</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">联系电话：{{data.phone}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><div class="grid-content">地址：{{data.address}}</div></el-col>
        </el-row>
      </div>
      <el-row>
        <el-col :span="24"><div class="grid-content title">工单信息</div></el-col>
      </el-row>
      <div class="info">
        <el-row>
          <el-col :span="6"><div class="">编号：{{data.mailboxid}}</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple-light">创建时间：{{data.createtime}}</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">来源：{{data.platform | _platform}}</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple-light">类型：{{data.type | _type}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><div class="grid-content">标题：{{data.title}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><div class="grid-content">身份证号：{{data.idcard}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><div class="grid-content">地址：{{data.openaddress}}</div></el-col>
        </el-row>
        <el-row>
          <div class="grid-content" style="float:left">内容：</div>
          <div class="" style="margin-left:40px" v-html="data.content"></div>
        </el-row>
        <el-row>
          <div class="grid-content" style="float:left">附件：</div>
          <div class="" style="margin-left:40px">
            <template v-for="(item, index) in data.filepath">
              <div class="" v-bind:key="index"><a v-bind:href="item" target="_blank">{{item}}</a></div>
            </template>
          </div>
        </el-row>
      </div>
      <el-row>
        <el-col :span="24"><div class="grid-content title">工单处理</div></el-col>
      </el-row>
      <div class="info">
        <el-row>
          <el-col :span="8"><div class="">当前状态：{{data.handlestatus | _handlestatus}}</div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple">评价：{{data.evaluate | _evaluate}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><div class="grid-content">评价内容：{{data.evaluateconten}}</div></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../store/api/order'
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
      let arr = ['咨询', '建议', '求助', '表扬', '举报', '其他']
      return arr[+val / 5 - 2]
    },
    _platform (val) {
      let arr = ['官网', 'APP', '微信']
      return arr[+val - 1]
    },
    _handlestatus (val) {
      let arr = ['已完结', '待评价', '待处理']
      return arr[+val]
    },
    _evaluate (val) {
      let arr = ['不满意', '满意']
      return val === null ? '未评价' : arr[+val]
    }
  },
  methods: {
    getData () {
      let id = this.$route.params.id
      api.getOrderDetail(id)
      .then((res) => {
        this.data = res
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
        <el-breadcrumb-item :to="{ path: '/order' }">工单管理</el-breadcrumb-item>
        <el-breadcrumb-item>详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <el-row>
        <el-col :span="24"><div class="grid-content title">客户信息</div></el-col>
      </el-row>
      <div class="info">
        <el-row>
          <el-col :span="6"><div class="">姓名：{{data.name}}</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple-light">性别：{{data.sex === 0 ? '女' : '男'}}</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">联系电话：{{data.phone}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><div class="grid-content">地址：{{data.address}}</div></el-col>
        </el-row>
      </div>
      <el-row>
        <el-col :span="24"><div class="grid-content title">工单信息</div></el-col>
      </el-row>
      <div class="info">
        <el-row>
          <el-col :span="6"><div class="">编号：{{data.mailboxid}}</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple-light">创建时间：{{data.createtime}}</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">来源：{{data.platform | _platform}}</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple-light">类型：{{data.type | _type}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><div class="grid-content">标题：{{data.title}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><div class="grid-content">身份证号：{{data.idcard}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><div class="grid-content">地址：{{data.openaddress}}</div></el-col>
        </el-row>
        <el-row>
          <div class="grid-content" style="float:left">内容：</div>
          <div class="" style="margin-left:40px" v-html="data.content"></div>
        </el-row>
        <el-row>
          <div class="grid-content" style="float:left">附件：</div>
          <div class="" style="margin-left:40px">
            <template v-for="(item, index) in data.filepath">
              <div class="" v-bind:key="index"><a v-bind:href="item" target="_blank">{{item}}</a></div>
            </template>
          </div>
        </el-row>
      </div>
      <el-row>
        <el-col :span="24"><div class="grid-content title">工单处理</div></el-col>
      </el-row>
      <div class="info">
        <el-row>
          <el-col :span="8"><div class="">当前状态：{{data.handlestatus | _handlestatus}}</div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple">评价：{{data.evaluate | _evaluate}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><div class="grid-content">评价内容：{{data.evaluateconten}}</div></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../store/api/order'
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
      let arr = ['咨询', '建议', '求助', '表扬', '举报', '其他']
      return arr[+val / 5 - 2]
    },
    _platform (val) {
      let arr = ['官网', 'APP', '微信']
      return arr[+val - 1]
    },
    _handlestatus (val) {
      let arr = ['已完结', '待评价', '待处理']
      return arr[+val]
    },
    _evaluate (val) {
      let arr = ['不满意', '满意']
      return val === null ? '未评价' : arr[+val]
    }
  },
  methods: {
    getData () {
      let id = this.$route.params.id
      api.getOrderDetail(id)
      .then((res) => {
        this.data = res
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
