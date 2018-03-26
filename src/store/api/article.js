<<<<<<< HEAD
import { axiosPost, axiosGet } from './base'

export default {
  // 获取文章列表
  getArticleList: (params) => {
    return axiosPost('api/bossApi/news/list', params)
  },
  // 获取文章详情
  getArticleDetail: (params) => {
    return axiosGet('api/bossApi/news/newsdetail/' + params)
  },
  // 更新文章状态
  setArticleStatus: (params) => {
    return axiosPost('api/bossApi/news/editstatus', params)
  },
  // 添加文章
  addArticle: (params) => {
    return axiosPost('api/bossApi/news/addoreditnews', params)
  },
  // 删除文章
  deleteArticle: (params) => {
    return axiosGet('api/bossApi/news/delete?id=' + params)
  },
  // 获取所有等级栏目集合
  getLevelAllList: () => {
    return axiosGet('api/bossApi/newstype/alllist')
  },
  // 获取栏目下子栏目列表
  getSubColumnList: (params) => {
    return axiosGet('api/bossApi/newstype/byparentidlist/' + params)
  }
}
=======
import { axiosPost, axiosGet } from './base'

export default {
  // 获取文章列表
  getArticleList: (params) => {
    return axiosPost('api/bossApi/news/list', params)
  },
  // 获取文章详情
  getArticleDetail: (params) => {
    return axiosGet('api/bossApi/news/newsdetail/' + params)
  },
  // 更新文章状态
  setArticleStatus: (params) => {
    return axiosPost('api/bossApi/news/editstatus', params)
  },
  // 添加文章
  addArticle: (params) => {
    return axiosPost('api/bossApi/news/addoreditnews', params)
  },
  // 删除文章
  deleteArticle: (params) => {
    return axiosGet('api/bossApi/news/delete?id=' + params)
  },
  // 获取所有等级栏目集合
  getLevelAllList: () => {
    return axiosGet('api/bossApi/newstype/alllist')
  },
  // 获取栏目下子栏目列表
  getSubColumnList: (params) => {
    return axiosGet('api/bossApi/newstype/byparentidlist/' + params)
  }
}
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296
