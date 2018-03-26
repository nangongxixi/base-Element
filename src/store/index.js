<<<<<<< HEAD
import Vue from 'vue'
import Vuex from 'vuex'
import com from './module/com'
import column from './module/column'
import article from './module/article'
import employee from './module/employee'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    com,
    employee,
    column,
    article
  }
})

export default store
=======
import Vue from 'vue'
import Vuex from 'vuex'
import com from './module/com'
import column from './module/column'
import article from './module/article'
import employee from './module/employee'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    com,
    employee,
    column,
    article
  }
})

export default store
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296
