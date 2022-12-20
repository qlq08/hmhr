import store from '@/store'
import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
const Timeout = 3600 // 定义超时时间
const service = axios.create({
  // 当执行 npm run dev  => .evn.development => /api => 跨域代理
  baseURL: process.env.VUE_APP_BASE_API, // npm  run dev  => /api npm run build =>  /prod-api
  timeout: 5000 // 设置超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在这个位置需要统一的去注入token
    if (store.getters.token) {
      if (IsCheckTimeOut()) {
        // 如果它为true表示 过期了
        // token没用了 因为超时了
        store.dispatch('user/logout') // 登出操作
        // 跳转到登录页
        router.push('/login')
        return Promise.reject(new Error('token超时了'))
      }

      // 如果token存在 注入token
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config // 必须返回配置
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const { success, message, data } = response.data
    // 要根据success的成功与否决定下面的操作
    if (success) {
      return data
    } else {
      // 提示错误消息 业务已经出错了 还能进then? 不能 ! 应该进catch
      Message.error(message) // http状态码2xx, 但是逻辑错误
      return Promise.reject(new Error(message))
      // 返回Promise错误的对象, 等同reject() -> 自己根据success字段判断逻辑错误(账号密码错误)
    }
  },
  error => {
    Message.error(error.message) // 提示错误信息
    return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功  直接进入 catch
  }
)

// 是否超时
// 超时逻辑  (当前时间  - 缓存中的时间) 是否大于 时间差
const IsCheckTimeOut = () => {
  const currentTime = Date.now() // 当前时间戳
  const timeStamp = getTimeStamp() // 缓存时间戳
  return (currentTime - timeStamp) / 1000 > Timeout
}
export default service
