<<<<<<< HEAD
import { axiosPost } from './base'

export default {
  // 上传图片
  uploadImg: (params) => {
    return axiosPost('api/files/fileupload', params)
  },
  // 通过GUID获取图片
  getImgUrl: (params) => {
    return axiosPost('api/images/getimgbyguid', params)
  }
}
=======
import { axiosPost } from './base'

export default {
  // 上传图片
  uploadImg: (params) => {
    return axiosPost('api/files/fileupload', params)
  },
  // 通过GUID获取图片
  getImgUrl: (params) => {
    return axiosPost('api/images/getimgbyguid', params)
  }
}
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296
