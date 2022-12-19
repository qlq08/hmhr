import request from '@/utils/request'

/**
 * 用户 - 登录
 * @param {*} param0
 * @returns
 */
export function login (data) {
  return request({
    url: '/sys/login',
    methods: 'post',
    data
  })
}

export function getInfo (token) {
}

export function logout () {
}
/**
 * 获取用户的基本资料
 * @description: 获取用户资料
 * @param {*}
 * @return {*}
 */
export function getUserInfo () {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
