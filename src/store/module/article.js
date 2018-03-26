<<<<<<< HEAD
import api from '../api/article'
import * as types from '../types'

const state = {
  articleList: []
}

const actions = {
  // 获取栏目
  getArticleList: ({commit}, params) => {
    commit(types.COM_LOADING_STATUS, true)
    api.getArticleList(params)
      .then((res) => {
        commit(types.ARTICLE_LIST, res)
        commit(types.COM_LOADING_STATUS, false)
      })
  }
}

const getters = {
  articleList: state => state.articleList
}

const mutations = {
  [types.ARTICLE_LIST] (state, res) {
    state.articleList = res.datalist
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
=======
import api from '../api/article'
import * as types from '../types'

const state = {
  articleList: []
}

const actions = {
  // 获取栏目
  getArticleList: ({commit}, params) => {
    commit(types.COM_LOADING_STATUS, true)
    api.getArticleList(params)
      .then((res) => {
        commit(types.ARTICLE_LIST, res)
        commit(types.COM_LOADING_STATUS, false)
      })
  }
}

const getters = {
  articleList: state => state.articleList
}

const mutations = {
  [types.ARTICLE_LIST] (state, res) {
    state.articleList = res.datalist
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296
