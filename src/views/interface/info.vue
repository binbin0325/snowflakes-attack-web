<template>
  <div>
      <el-container>
            <el-aside style="width: 350px">
              <el-tabs type="border-card">
                <el-tab-pane label="接口列表">
                  <el-row :gutter="20">
                    <el-col :span="15">
                      <div class="grid-content">
                        <el-input
                          v-model="filterText"
                          placeholder="输入关键字进行过滤"
                        />
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content">
                        <el-popover v-model="visible" placement="right-end" >
                          <el-form
                            ref="form"
                            :model="form"
                            label-width="120px"
                          >
                            <el-form-item label="分类名称">
                              <el-input v-model="form.name" />
                            </el-form-item>
                            <el-form-item label="备注">
                              <el-input v-model="form.remark" />
                            </el-form-item>
                          </el-form>
                          <div style="text-align: right; margin: 0">
                            <el-button
                              size="mini"
                              type="text"
                              @click="onCancel()"
                            >取消</el-button>
                            <el-button
                              type="primary"
                              size="mini"
                              @click="onSubmit()"
                            >确定</el-button>
                          </div>

                          <el-button
                            slot="reference"
                            type="primary"
                          >添加分类</el-button>
                        </el-popover>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="23">
                      <div class="grid-content bg-purple">
                        <el-tree
                          ref="tree"
                          class="filter-tree"
                          :data="data"
                          :props="defaultProps"
                          default-expand-all
                          :filter-node-method="filterNode"
                          highlight-current
                          @node-click="onClickNode"
                        />

                      </div>
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane label="测试集合">测试集合</el-tab-pane>
              </el-tabs>
            </el-aside>
            <el-main>
              <v-list v-if="selectNode && listVisible" :selectNode="selectNode"></v-list>
              <v-detail-menu v-if="selectInterfaceMenuId && interfaceVisible" :selectInterfaceMenuId="selectInterfaceMenuId"></v-detail-menu>
            </el-main>
      </el-container>
  </div>
</template>

<script>
import { createInterfaceGroup, getMenu } from '@/api/interfacemenu'
import DetailMenu from './detailmenu'
import List from './list'
import Detail from './detail'
export default {
  components: {
    'v-list': List,
    'v-detail': Detail,
    'v-detail-menu': DetailMenu,
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['projectId'],
  data() {
    return {
      input: '',
      visible: false,
      listVisible: false,
      interfaceVisible: false,
      selectNode: '',
      selectInterfaceMenuId: '',
      form: {
        name: '',
        remark: '',
        pid: ''
      },
      filterText: '',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    getMenu(this.projectId).then(response => {
      this.data = response.data
    })
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    onClickNode(node) {
      this.listVisible = false
      this.interfaceVisible = false
      this.$nextTick(() => {
        if (node.children != null) {
          this.selectNode = node
          this.listVisible = true
        } else {
          this.selectInterfaceMenuId = node.id
          this.interfaceVisible = true
        }
      })
    },
    onSubmit() {
      this.visible = false
      this.form.pid = this.projectId
      createInterfaceGroup(JSON.stringify(this.form)).then(response => {
      })
    },
    onCancel() {
      this.visible = false
    }
  } // 接受父组件的属性或方法
}
</script>

<style lang="scss" scoped>
.el-aside {

}

.el-main {
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
</style>

