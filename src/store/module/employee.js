<<<<<<< HEAD
import api from '../api/employee'
import * as types from '../types'
import router from '../../router/index'
import { Message } from 'element-ui'

const state = {
  loginStatus: false,
  employeeInfo: {},
  roleList: {}
}

const actions = {
  // 管理员登录
  login: ({ commit }, params) => {
    commit(types.COM_LOADING_STATUS, true)
    api.login(params)
      .then((res) => {
        if (res.code === 1) {
          commit(types.EMPLOYEE_LOGIN_STSTUS, res)
          commit(types.COM_LOADING_STATUS, false)
        } else {
          commit(types.COM_LOADING_STATUS, false)
          Message({
            type: 'error',
            message: res.msg
          })
        }
      })
  }
}

const getters = {
  loginStatus: state => state.loginStatus,
  employeeInfo: state => state.employeeInfo
}

const mutations = {
  [types.EMPLOYEE_LOGIN_STSTUS] (state, res) {
    state.employeeInfo = res.data
    state.loginStatus = true
    localStorage.setItem('userinfo', JSON.stringify(res.data))
    api.getIdRightList(res.data.roleid)
      .then((res) => {
        if (!res) {
          Message({
            type: 'error',
            message: '登录失败'
          })
          return false
        }
        Message({
          type: 'success',
          message: '登录成功'
        })
        state.roleList = res
        localStorage.setItem('roleList', JSON.stringify(res))
        router.push('/order')
      }).catch(() => {
        Message({
          type: 'error',
          message: '登录失败'
        })
        state.loginStatus = false
      })
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
=======
import api from '../api/employee'
import * as types from '../types'
import router from '../../router/index'
import { Message } from 'element-ui'

const state = {
  loginStatus: false,
  employeeInfo: {},
  roleList: {}
}

const actions = {
  // 管理员登录
  login: ({ commit }, params) => {
    commit(types.COM_LOADING_STATUS, true)
    api.login(params)
      .then((res) => {
        if (res.code === 1) {
          commit(types.EMPLOYEE_LOGIN_STSTUS, res)
          commit(types.COM_LOADING_STATUS, false)
        } else {
          commit(types.COM_LOADING_STATUS, false)
          Message({
            type: 'error',
            message: res.msg
          })
        }
      })
  }
}

const getters = {
  loginStatus: state => state.loginStatus,
  employeeInfo: state => state.employeeInfo
}

const mutations = {
  [types.EMPLOYEE_LOGIN_STSTUS] (state, res) {
    state.employeeInfo = res.data
    state.loginStatus = true
    localStorage.setItem('userinfo', JSON.stringify(res.data))
    api.getIdRightList(res.data.roleid)
      .then((res) => {
        if (!res) {
          Message({
            type: 'error',
            message: '登录失败'
          })
          return false
        }
        Message({
          type: 'success',
          message: '登录成功'
        })
        state.roleList = res
        localStorage.setItem('roleList', JSON.stringify(res))
        router.push('/order')
      }).catch(() => {
        Message({
          type: 'error',
          message: '登录失败'
        })
        state.loginStatus = false
      })
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296
