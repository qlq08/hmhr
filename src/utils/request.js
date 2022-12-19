import axios from 'axios'
import { Message } from 'element-ui'
// import store from '@/store'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use()

service.interceptors.response.use(
  response => {
    const { success, message, data } = response.data
    // 要根据success的成功与否决定下面的操作
    if (success) {
      return data
    } else {
      // 提示错误消息 业务已经出错了 还能进then? 不能 ! 应该进catch
      Message.error(message) // http状态码2xx, 但是逻辑错误
      // return Promise.reject(new Error(message))
      // 返回Promise错误的对象, 等同reject() -> 自己根据success字段判断逻辑错误(账号密码错误)
    }
  },
  error => {
    Message.error(error.message) // 提示错误信息
    return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功  直接进入 catch
  }
)

export default service
