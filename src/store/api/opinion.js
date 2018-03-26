<<<<<<< HEAD
import { axiosPost, axiosGet } from './base'

export default {
  getOpinionList: (params) => {
    return axiosPost('api/bossApi/appeal/getlist', params)
  },
  addOpinion: (params) => {
    return axiosPost('api/bossApi/appeal/addoredit', params)
  },
  deleteOpinion: (params) => {
    return axiosPost('api/bossApi/appeal/delete?id=' + params)
  },
  getOpinionDetail: (params) => {
    return axiosGet('api/bossApi/appeal/detail/' + params)
  }
}
=======
import { axiosPost, axiosGet } from './base'

export default {
  getOpinionList: (params) => {
    return axiosPost('api/bossApi/appeal/getlist', params)
  },
  addOpinion: (params) => {
    return axiosPost('api/bossApi/appeal/addoredit', params)
  },
  deleteOpinion: (params) => {
    return axiosPost('api/bossApi/appeal/delete?id=' + params)
  },
  getOpinionDetail: (params) => {
    return axiosGet('api/bossApi/appeal/detail/' + params)
  }
}
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296
