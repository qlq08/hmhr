import request from '@/utils/request'

/**
 * 用户 - 登录
 * @param {*} param0
 * @returns
 */
export function loginAPI (data) {
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
