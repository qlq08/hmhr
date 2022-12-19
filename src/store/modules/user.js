import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api'
const getDefaultState = () => {
  return {
    token: getToken() // 设置token为共享状态 初始化vuex的时候 就先从缓存中读取
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
  }
}
// 执行异步
const actions = {
  async login (context, data) {
    // 调用api接口
    const result = await login(data) // 拿到token
    context.commit('setToken', result) // 设置token
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

