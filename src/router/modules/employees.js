// 导出属于员工管理的路由规则
import Layout from '@/layout'
export default {
  path: '/employees', // 路径
  // name: 'employees', // 给路由规则加一个name
  component: Layout, // 组件
  // 配置二级路由表
  children: [{
    path: '', // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
    component: () => import('@/views/employees'),
    // 路由元信息 其实就是存储数据的对象 我们可以在这里放置一些信息
    meta: {
      title: '员工管理',
      icon: 'people'
    }
  }]
}
