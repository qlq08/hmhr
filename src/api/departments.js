import request from '@/utils/request'
/** *
*
*获取组织架构数据
*/
export const getDepartments = () => {
  return request({
    url: '/company/department'
  })
}
/** *
 *  根据id根据部门  接口是根据restful的规则设计的   删除 delete  新增 post  修改put 获取 get
 * **/
export const delDepartments = (id) => {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
/**
 *  新增部门接口
 *
 * ****/

export const addDepartments = (data) => {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
/** *
 * 获取部门详情
 * ***/
export const getDepartDetail = (id) => {
  return request({
    url: `/company/department/${id}`
  })
}
