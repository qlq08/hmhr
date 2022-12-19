import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api'
const getDefaultState = () => {
  return {
    token: getToken(), // 设置token为共享状态 初始化vuex的时候 就先从缓存中读取
    userInfo: {} // 定义一个空的对象 不是null 因为后边要开发userInfo的属性给别人用 userInfo.name
  }
}
// 状态
const state = getDefaultState()
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
  async login (context, data) {
    // 调用api接口
    const result = await login(data) // 拿到token
    context.commit('setToken', result) // 设置token
  },
  // 获取用户资料action
  async getUserInfo (context) {
    const result = await getUserInfo() // 获取返回值
    context.commit('setUserInfo', result) // 将整个的个人信息设置到用户的vuex数据中
    return result // 这里为什么要返回  为后面埋下伏笔
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

