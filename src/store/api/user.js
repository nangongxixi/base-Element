<<<<<<< HEAD
import { axiosPost } from './base'

export default {
  // 用户列表
  getUserList: (params) => {
    return axiosPost('api/bossApi/user/list', params)
  },
  // 启用或禁用用户
  edited: (params) => {
    return axiosPost('api/bossApi/user/edited', params)
  },
  // 删除用户
  deleteUser: (params) => {
    return axiosPost('api/bossApi/user/delete?id=' + params, {})
  }
}
=======
import { axiosPost } from './base'

export default {
  // 用户列表
  getUserList: (params) => {
    return axiosPost('api/bossApi/user/list', params)
  },
  // 启用或禁用用户
  edited: (params) => {
    return axiosPost('api/bossApi/user/edited', params)
  },
  // 删除用户
  deleteUser: (params) => {
    return axiosPost('api/bossApi/user/delete?id=' + params, {})
  }
}
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296
