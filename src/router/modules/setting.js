// 导出属于公司设置的路由规则
import Layout from '@/layout'
export default {
  path: '/setting', // 路径
  // name: 'setting', // 给路由规则加一个name
  component: Layout, // 组件
  // 配置二级路的路由表
  children: [{
    path: '',
    component: () => import('@/views/setting'),
    meta: {
      title: '公司设置',
      icon: 'setting'
    }
  }]
}
