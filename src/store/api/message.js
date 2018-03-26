<<<<<<< HEAD
import { axiosPost } from './base'

export default {
  // 列表
  getMsgList: (params) => {
    return axiosPost('api/bossApi/msg/list', params)
  },
  // 编辑
  editMsg: (params) => {
    return axiosPost('api/bossApi/msg/addoredit', params)
  },
  // 删除
  deleteMsg: (params) => {
    return axiosPost('api/bossApi/msg/delete?id=' + params, {})
  }
}
=======
import { axiosPost } from './base'

export default {
  // 列表
  getMsgList: (params) => {
    return axiosPost('api/bossApi/msg/list', params)
  },
  // 编辑
  editMsg: (params) => {
    return axiosPost('api/bossApi/msg/addoredit', params)
  },
  // 删除
  deleteMsg: (params) => {
    return axiosPost('api/bossApi/msg/delete?id=' + params, {})
  }
}
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296
