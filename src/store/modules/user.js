import { getToken, setToken, removeToken } from '@/utils/auth'
import { loginAPI } from '@/api'
const getDefaultState = () => {
  return {
    token: getToken() // 用户token, 默认为''
  }
}
// 状态
const state = getDefaultState()
// 修改状态
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // 设置token
  SET_TOKEN (state, newToken) {
    state.token = newToken
    setToken(newToken)
  },
  // 删除token
  REMOVE_TOKEN (state) {
    state.token = ''
    removeToken()
  }
}
// 执行异步
const actions = {
  // 登录逻辑-封装
  async loginActions ({ commit }, value) {
    try {
      const res = await loginAPI(value)
      // 我们只需要token,保存到上面的vuex中
      commit('SET_TOKEN', res.data)
      // 逻辑页面还在接收数组, 外面写成功/失败的逻辑, 所以这里要把数组返回出去
      // return到actions调用的地方(login/index.vue)
      return res
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

