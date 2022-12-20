<template>
  <div class="departments-container">
    <div class="app-container">
      <!-- 实现页面的基本布局 -->
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <!-- 缺少treeNode -->
        <treeTools :tree-node="company" :is-root="true" />
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <!-- 说明el-tree里面的这个内容 就是插槽内容 => 填坑内容  => 有多少个节点循环多少次 -->
          <!-- scope-scope 是 tree组件传给每个节点的插槽的内容的数据 -->
          <!-- 顺序一定是 执行slot-scope的赋值 才去执行 props的传值 -->
          <treeTools
            slot-scope="obj"
            :tree-node="obj.data"
            @delDepts="getDepartments"
            @addDepts="addDepts"
          />
        </el-tree>
      </el-card>
      <AddDept :show-dialog="showDialog" :tree-node="node" />
    </div>
  </div>
</template>

<script>
import treeTools from './components/tree-tools'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import AddDept from './components/add-dept' // 引入新增部门组件
export default {
  name: 'Departments',
  components: {
    treeTools,
    AddDept
  },
  data () {
    return {
      company: {}, // 头部的数据结构
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      node: null,
      showDialog: false // 显示窗体
    }
  },
  created () {
    this.getDepartments() // 调用自身的方法
  },
  methods: {
    async getDepartments () {
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      // this.departs = result.depts // 需要将其转化成树形结构
      // 这里定义一个空串  因为 它是根 所有的子节点的数据pid 都是 ""
      this.departs = tranListToTreeData(result.depts, '')
      console.log(result)
    },
    addDepts (node) {
      this.showDialog = true // 显示弹层
      // 因为node是当前的点击的部门 ，此时这个部门应该记录下拉
      this.node = node
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
