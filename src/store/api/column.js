<<<<<<< HEAD
import { axiosPost, axiosGet } from './base'

export default {
  // 栏目查询
  getColumnList: (params) => {
    return axiosPost('api/bossApi/newstype/typelist', params)
  },
  // 新增栏目
  addColumn: (params) => {
    return axiosPost('api/bossApi/newstype/addorEditType', params)
  },
  // 上传图片
  uploadImg: (params) => {
    return axiosPost('api/files/fileupload', params)
  },
  // 通过GUID获取图片
  getImgUrl: (params) => {
    return axiosPost('api/images/getimgbyguid', params)
  },
  // 获取相应级别栏目
  getLevelList: (params) => {
    return axiosGet('api/bossApi/newstype/typebylevellist?level=' + params)
  },
  // 更新栏目状态
  setColumnStatus: (params) => {
    return axiosPost('api/bossApi/newstype/editTypeStatus', params)
  },
  // 删除栏目
  deleteColumn: (params) => {
    return axiosPost('api/bossApi/newstype/delete?id=' + params, '')
  },
  // 获取栏目详情
  getColumnDetail: (params) => {
    return axiosGet('api/bossApi/newstype/typedetail/' + params)
  },
  // 获取所有等级栏目集合
  getLevelAllList: () => {
    return axiosGet('api/bossApi/newstype/alllist')
  }
}
=======
import { axiosPost, axiosGet } from './base'

export default {
  // 栏目查询
  getColumnList: (params) => {
    return axiosPost('api/bossApi/newstype/typelist', params)
  },
  // 新增栏目
  addColumn: (params) => {
    return axiosPost('api/bossApi/newstype/addorEditType', params)
  },
  // 上传图片
  uploadImg: (params) => {
    return axiosPost('api/files/fileupload', params)
  },
  // 通过GUID获取图片
  getImgUrl: (params) => {
    return axiosPost('api/images/getimgbyguid', params)
  },
  // 获取相应级别栏目
  getLevelList: (params) => {
    return axiosGet('api/bossApi/newstype/typebylevellist?level=' + params)
  },
  // 更新栏目状态
  setColumnStatus: (params) => {
    return axiosPost('api/bossApi/newstype/editTypeStatus', params)
  },
  // 删除栏目
  deleteColumn: (params) => {
    return axiosPost('api/bossApi/newstype/delete?id=' + params, '')
  },
  // 获取栏目详情
  getColumnDetail: (params) => {
    return axiosGet('api/bossApi/newstype/typedetail/' + params)
  },
  // 获取所有等级栏目集合
  getLevelAllList: () => {
    return axiosGet('api/bossApi/newstype/alllist')
  }
}
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296
