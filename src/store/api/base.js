<<<<<<< HEAD
import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'

const url = 'http://112.25.171.120:8044/'
// const url = 'http://192.168.0.181:8084/'
function axiosPost (api, params) {
  return new Promise((resolve, reject) => {
    let par = toString.call(params) === '[object FormData]' ? params : qs.stringify(params)
    axios.post(url + api, par)
    .then(function (res) {
      if (res.status >= 200 && res.status <= 300) {
        resolve(res.data)
      }
    })
    .catch((error) => {
      console.log(error)
      reject(error)
      Message({
        showClose: true,
        type: 'error',
        message: '网络错误'
      })
    })
  })
}
function axiosGet (api, cb) {
  return new Promise((resolve, reject) => {
    axios.get(url + api)
    .then(function (res) {
      if (res.status >= 200 && res.status <= 300) {
        resolve(res.data)
      }
    })
    .catch((error) => {
      console.log(error)
      reject(error)
      Message({
        showClose: true,
        type: 'error',
        message: '网络错误'
      })
    })
  })
}

export { axiosPost, axiosGet }
=======
import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'

const url = 'http://112.25.171.120:8044/'
// const url = 'http://192.168.0.181:8084/'
function axiosPost (api, params) {
  return new Promise((resolve, reject) => {
    let par = toString.call(params) === '[object FormData]' ? params : qs.stringify(params)
    axios.post(url + api, par)
    .then(function (res) {
      if (res.status >= 200 && res.status <= 300) {
        resolve(res.data)
      }
    })
    .catch((error) => {
      console.log(error)
      reject(error)
      Message({
        showClose: true,
        type: 'error',
        message: '网络错误'
      })
    })
  })
}
function axiosGet (api, cb) {
  return new Promise((resolve, reject) => {
    axios.get(url + api)
    .then(function (res) {
      if (res.status >= 200 && res.status <= 300) {
        resolve(res.data)
      }
    })
    .catch((error) => {
      console.log(error)
      reject(error)
      Message({
        showClose: true,
        type: 'error',
        message: '网络错误'
      })
    })
  })
}

export { axiosPost, axiosGet }
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296
