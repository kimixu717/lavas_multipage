/**
 * @author KimiXu(xuyujin@banggood.cn)
 * @file 此文件为axios ajax的统一设置,包括请求拦截，post处理等
 */
import axios from 'axios'
import { stringify } from 'qs'

/**
 * @instance axios默认设置
 * @type {AxiosInstance}
 */
const http = axios.create({
  baseURL: '',
  timeout: 60000
})

// 对axios发起的post请求进行拦截，对post参数进行修改
http.interceptors.request.use(req => {
  if (req.method === 'post') {
    req.data = stringify(req.data)
  }
  return req
}, err => Promise.reject(err))

// 对数据返回进行拦截，两种情况：
// 1: 对所有的status错误进行统一处理
// 2: 由后端定义的错误进行处理，
// 统一处理所有可toast的错误，与后端商量此类型的错误code
// 其他后端定义的错误进行抛出，在具体的请求中进行catch处理
http.interceptors.response.use(res => {},error => {})

export default http
