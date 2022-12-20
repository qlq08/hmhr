<template>
  <div class="departments-container">
    <div class="app-container">
      <!-- 实现页面的基本布局 -->
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          style="height: 40px"
        >
          <el-col>
            <span>江苏传智播客教育科技股份有限公司</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <!-- 两个内容 -->
              <el-col>负责人</el-col>
              <el-col>
                <!-- 下拉菜单 element -->
                <el-dropdown>
                  <span> 操作<i class="el-icon-arrow-down" /> </span>
                  <!-- 下拉菜单 -->
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
      <!-- 用了一个行列布局 -->
      <!-- 缺少treeNode -->
      <treeToos :tree-node="company" :is-root="true" />
      <el-tree :data="departs" :props="defaultProps" default-expand-all>
        <!-- 说明el-tree里面的这个内容 就是插槽内容 => 填坑内容  => 有多少个节点循环多少次 -->
        <!-- scope-scope 是 tree组件传给每个节点的插槽的内容的数据 -->
        <!-- 顺序一定是 执行slot-scope的赋值 才去执行 props的传值 -->
        <treeToos slot-scope="{ data }" :tree-node="data" />
      </el-tree>
    </div>
  </div>
</template>

<script>
import treeToos from './components/tree-tools'
export default {
  name: 'Departments',
  components: {
    treeToos
  },
  data () {
    return {
      departs: [
        {
          name: '总裁办', manager: '曹操',
          children: [
            { name: '董事会', manager: '曹丕' }
          ]
        },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' }
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px 40px;
  font-size: 14px;
}
</style>
