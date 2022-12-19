import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api'

// 状态
const state = {
  token: getToken(), // 设置token为共享状态 初始化vuex的时候 就先从缓存中读取
  userInfo: {} // 定义一个空的对象 不是null 因为后边要开发userInfo的属性给别人用 userInfo.name
}
// 修改状态
const mutations = {
  // 设置token
  setToken (state, token) {
    state.token = token // 将数据设置给vuex
    setToken(token) // vuex和缓存数据的同步
  },
  // 删除token
  removeToken (state) {
    state.token = null // 将vuex的数据置空
    removeToken() // 同步到缓存
  },
  // 设置用户信息
  setUserInfo (state, userInfo) {
    state.userInfo = { ...userInfo } // 用浅拷贝的方式去赋值对象  因为这样数据更新之后，才会触发组件的更新
  },
  // 删除用户信息
  removeUserInfo (state) {
    state.token = ''
  }
}
// 执行异步
const actions = {
  // 用户登录
  async login (context, data) {
    // 调用api接口
    const result = await login(data) // 拿到token
    context.commit('setToken', result) // 设置token
  },
  // 获取用户资料action
  async getUserInfo (context) {
    const result = await getUserInfo() // result就是用户的基本资料
    const baseInfo = await getUserDetailById(result.userId) // 为了获取头像
    const baseResult = { ...result, ...baseInfo } // 将两个接口结果合并
    // 此时已经获取到了用户的所有基本资料 迫不得已 为了头像再调一个接口
    context.commit('setUserInfo', baseResult) // 将整个的个人信息设置到用户的vuex数据中
    return baseResult // 这里为什么要返回  为后面埋下伏笔
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

