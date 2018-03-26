<<<<<<< HEAD
<template>
  <div>
    <div class="page-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>工单管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <template>
        <el-table
          :data="orderList"
          stripe
          v-loading="loading"
          style="width: 100%"
          header-row-class-name="table-head">
          <el-table-column
            label="工单ID"
            width="170px"
            align="center"
            prop="mailboxid">
          </el-table-column>
          <el-table-column
            label="标题"
            align="center"
            prop="title">
          </el-table-column>
          <el-table-column
            label="类型"
            align="center">
            <template slot-scope="scope">
              {{scope.row.type | _type}}
            </template>
          </el-table-column>
          <el-table-column
            label="来源"
            align="center">
            <template slot-scope="scope">
              {{scope.row.platform | _platform}}
            </template>
          </el-table-column>
          <el-table-column
            label="来信人"
            align="center"
            prop="name">
          </el-table-column>
          <el-table-column
            label="联系电话"
            align="center"
            prop="phone">
          </el-table-column>
          <el-table-column
            label="创建时间"
            align="center"
            prop="createtime">
          </el-table-column>
          <el-table-column
            label="状态"
            align="center">
            <template slot-scope="scope">
              {{scope.row.handlestatus | _handlestatus}}
            </template>
          </el-table-column>
          <el-table-column
            label="评价"
            align="center">
            <template slot-scope="scope">
              {{scope.row.evaluate | _evaluate}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
                <el-button
                size="mini"
                type="primary"
                @click="toDetail(scope.row.mailboxid)">
                  查看
                </el-button>
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
import api from '../store/api/order'
export default {
  data () {
    return {
      totalpages: 1,
      loading: false,
      orderList: [],
      orderForm: {
        urgentlevel: '',
        type: '',
        source: '',
        status: '',
        screatetime: '',
        ecreatetime: '',
        title: '',
        pageindex: 1
      }
    }
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
  mounted () {
    this.getOrderList()
  },
  methods: {
    getOrderList () {
      api.getOrderList(this.orderForm)
      .then((res) => {
        this.orderList = res.datalist
        this.totalpages = res.totalpages
        console.log(res)
      })
    },
    handleCurrentChange (val) {
      this.orderForm.pageindex = +val
      this.getOrderList()
    },
    toDetail (id) {
      this.$router.push({path: `/order/detail/${id}`})
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
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>工单管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <template>
        <el-table
          :data="orderList"
          stripe
          v-loading="loading"
          style="width: 100%"
          header-row-class-name="table-head">
          <el-table-column
            label="工单ID"
            width="170px"
            align="center"
            prop="mailboxid">
          </el-table-column>
          <el-table-column
            label="标题"
            align="center"
            prop="title">
          </el-table-column>
          <el-table-column
            label="类型"
            align="center">
            <template slot-scope="scope">
              {{scope.row.type | _type}}
            </template>
          </el-table-column>
          <el-table-column
            label="来源"
            align="center">
            <template slot-scope="scope">
              {{scope.row.platform | _platform}}
            </template>
          </el-table-column>
          <el-table-column
            label="来信人"
            align="center"
            prop="name">
          </el-table-column>
          <el-table-column
            label="联系电话"
            align="center"
            prop="phone">
          </el-table-column>
          <el-table-column
            label="创建时间"
            align="center"
            prop="createtime">
          </el-table-column>
          <el-table-column
            label="状态"
            align="center">
            <template slot-scope="scope">
              {{scope.row.handlestatus | _handlestatus}}
            </template>
          </el-table-column>
          <el-table-column
            label="评价"
            align="center">
            <template slot-scope="scope">
              {{scope.row.evaluate | _evaluate}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
                <el-button
                size="mini"
                type="primary"
                @click="toDetail(scope.row.mailboxid)">
                  查看
                </el-button>
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
import api from '../store/api/order'
export default {
  data () {
    return {
      totalpages: 1,
      loading: false,
      orderList: [],
      orderForm: {
        urgentlevel: '',
        type: '',
        source: '',
        status: '',
        screatetime: '',
        ecreatetime: '',
        title: '',
        pageindex: 1
      }
    }
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
  mounted () {
    this.getOrderList()
  },
  methods: {
    getOrderList () {
      api.getOrderList(this.orderForm)
      .then((res) => {
        this.orderList = res.datalist
        this.totalpages = res.totalpages
        console.log(res)
      })
    },
    handleCurrentChange (val) {
      this.orderForm.pageindex = +val
      this.getOrderList()
    },
    toDetail (id) {
      this.$router.push({path: `/order/detail/${id}`})
    }
  }
}
</script>

<style lang="less" scoped>

</style>
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296
