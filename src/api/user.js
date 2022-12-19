import request from '@/utils/request'

/**
 * 用户 - 登录
 * @param {*} param0
 * @returns
 */

export const login = (data) => {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
export const getInfo = (token) => { }

export const logout = () => { }

/**
 * 获取用户的基本资料
 * @description: 获取用户资料
 * @param {*}
 * @return {*}
 */

export const getUserInfo = () => {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
/** *
 * 获取用户的基本信息 现在写它 完全是为了显示头像
 *
 * ***/
export const getUserDetailById = (id) => {
  return request({
    url: `/sys/user/${id}`
  })
}
