<<<<<<< HEAD
import api from '../api/column'
import * as types from '../types'

const state = {
  columnList: []
}

const actions = {
  // 获取栏目
  getColumnList: ({commit}, params) => {
    commit(types.COM_LOADING_STATUS, true)
    api.getColumnList(params)
      .then((res) => {
        commit(types.COLUMN_LIST, res)
        commit(types.COM_LOADING_STATUS, false)
      })
  }
}

const getters = {
  columnList: state => state.columnList
}

const mutations = {
  [types.COLUMN_LIST] (state, res) {
    state.columnList = res.datalist
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
=======
import api from '../api/column'
import * as types from '../types'

const state = {
  columnList: []
}

const actions = {
  // 获取栏目
  getColumnList: ({commit}, params) => {
    commit(types.COM_LOADING_STATUS, true)
    api.getColumnList(params)
      .then((res) => {
        commit(types.COLUMN_LIST, res)
        commit(types.COM_LOADING_STATUS, false)
      })
  }
}

const getters = {
  columnList: state => state.columnList
}

const mutations = {
  [types.COLUMN_LIST] (state, res) {
    state.columnList = res.datalist
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296
