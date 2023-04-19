import axios from 'axios'
import type { Method } from 'axios'
const baseURL = 'http://localhost:3000/'
const instance = axios.create({
  baseURL,
  timeout: 10000
})






type Data<T> = {
  status: number
  statusText: string
  data: T
}
// 4. 请求工具函数
const request = <T>(
  url: string,
  method: Method = 'get',
  submitData?: object
) => {
  return instance.request<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
export { baseURL, instance, request }