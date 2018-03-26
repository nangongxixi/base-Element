<<<<<<< HEAD
import * as types from '../types'

const state = {
  loading: false
}

const action = {

}

const getters = {
  loading: state => state.loading
}

const mutations = {
  [types.COM_LOADING_STATUS] ({commit}, status) {
    state.loading = status
  }
}

export default {
  state,
  action,
  getters,
  mutations
}
=======
import * as types from '../types'

const state = {
  loading: false
}

const action = {

}

const getters = {
  loading: state => state.loading
}

const mutations = {
  [types.COM_LOADING_STATUS] ({commit}, status) {
    state.loading = status
  }
}

export default {
  state,
  action,
  getters,
  mutations
}
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296
