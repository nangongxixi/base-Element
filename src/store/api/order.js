<<<<<<< HEAD
import { axiosPost, axiosGet } from './base'

export default {
  getOrderList: (params) => {
    return axiosPost('api/bossApi/mailbox/list', params)
  },
  getOrderDetail: (params) => {
    return axiosGet('api/bossApi/mailbox/detail/' + params)
  }
}
=======
import { axiosPost, axiosGet } from './base'

export default {
  getOrderList: (params) => {
    return axiosPost('api/bossApi/mailbox/list', params)
  },
  getOrderDetail: (params) => {
    return axiosGet('api/bossApi/mailbox/detail/' + params)
  }
}
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296
