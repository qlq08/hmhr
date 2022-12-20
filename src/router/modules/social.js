// 导出属于社保的路由规则
import Layout from '@/layout'
export default {
  path: '/social', // 路径
  // name: 'social', // 给路由规则加一个name
  component: Layout, // 组件
  // 配置二级路的路由表
  children: [{
    path: '',
    component: () => import('@/views/social'),
    // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
    meta: {
      title: '社保',
      icon: 'table'
    }
  }]
}
