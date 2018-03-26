<<<<<<< HEAD
<template>
  <div>    
    <el-cascader
      :options="options2"
      :change-on-select="true"
      @change="handleItemChange"
      :props="props"
    ></el-cascader>
  </div>
</template>

<script>
  import api from '../store/api/column'
  export default {
    data () {
      return {
        options2: [{
          label: '1231',
          value: 1,
          cities: []
        }, {
          label: '浙江',
          value: 2,
          cities: []
        }],
        props: {
          value: 'value',
          label: 'name',
          children: 'cities'
        }
      }
    },

    methods: {
      handleItemChange (val) {
        console.log('active item:', val)
        let lens = val.length
        let param = val[lens - 1]
        api.getLevelList(param)
        .then((res) => {
          this.options2[0].cities = res.datalist
        })
      }
    }
  }
</script>

<style lang="less">
.preview-box {
  margin-top: 15px;
  .head {
    margin: 20px auto;
    .title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .source, .createtime {
      font-size: 16px;
      color: #999;
      margin-right: 20px;
      margin-bottom: 30px;
    }
  }
  .content p {
    line-height: 1.5em;
    font-size: 16px;
    color: #666;
    text-indent: 2em;
    margin: 10px 0;
  }
}
</style>
=======
<template>
  <div>    
    <el-cascader
      :options="options2"
      :change-on-select="true"
      @change="handleItemChange"
      :props="props"
    ></el-cascader>
  </div>
</template>

<script>
  import api from '../store/api/column'
  export default {
    data () {
      return {
        options2: [{
          label: '1231',
          value: 1,
          cities: []
        }, {
          label: '浙江',
          value: 2,
          cities: []
        }],
        props: {
          value: 'value',
          label: 'name',
          children: 'cities'
        }
      }
    },

    methods: {
      handleItemChange (val) {
        console.log('active item:', val)
        let lens = val.length
        let param = val[lens - 1]
        api.getLevelList(param)
        .then((res) => {
          this.options2[0].cities = res.datalist
        })
      }
    }
  }
</script>

<style lang="less">
.preview-box {
  margin-top: 15px;
  .head {
    margin: 20px auto;
    .title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .source, .createtime {
      font-size: 16px;
      color: #999;
      margin-right: 20px;
      margin-bottom: 30px;
    }
  }
  .content p {
    line-height: 1.5em;
    font-size: 16px;
    color: #666;
    text-indent: 2em;
    margin: 10px 0;
  }
}
</style>
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296
