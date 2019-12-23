import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '../../utils/token'
import { getAppBaseUrl } from './host'

const service = axios.create({
  baseURL: getAppBaseUrl(),
  timeout: 30000
})

service.interceptors.request.use(
  config => {
    let token = store.getters.token
    if (token) {
      config.headers['token'] = getToken()
    }
    config.headers['Content-Type'] = 'application/json; charset=utf-8'
    // 设置请求的语言
    config.headers['locale'] = 'zh_CN'
    return config
  },
  error => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  res => {
    let data = res.data || {}
    if (data.code === 200 || (!data.code && data)) {
      return data
    } else {
      if (data.code === 510) {
        Message({
          message: '登录超时，请重新登录',
          type: 'error',
          duration: 2 * 1000
        })
        setTimeout(() => {
          store.dispatch('user/logout').then(() => {
            location.reload()
          })
        }, 1000)
      } else {
        Message({
          message: data.msg,
          type: 'error',
          duration: 2 * 1000
        })
      }
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(data)
    }
  },
  error => {
    let msg = ''
    let data = error.data || {}
    console.dir(error)
    if (error == 'Error: timeout of 5000ms exceeded') {
      msg = '无效请求！请求超时！'
    } else {
      msg = data.msg
    }
    Message({
      message: msg,
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
