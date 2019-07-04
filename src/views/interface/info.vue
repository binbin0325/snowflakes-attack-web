<template>
  <div>
      <el-container>
            <el-aside style="width: 350px">
              <el-tabs type="border-card"@tab-click="handleClick">
                <el-tab-pane label="接口列表" >
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
                <el-tab-pane label="测试集合">
                  <el-tree
                    :data="data"
                    show-checkbox
                    node-key="id"
                    default-expand-all
                    ref="tree"
                    :props="defaultProps"
                    highlight-current
                    @check-change="getCheckedNodes">
                  </el-tree>
                </el-tab-pane>
              </el-tabs>
            </el-aside>
            <el-main>
              <v-list v-if="selectNode && listVisible" :selectNode="selectNode"></v-list>
              <v-detail-menu v-if="selectInterfaceMenuId && interfaceVisible" :selectInterfaceMenuId="selectInterfaceMenuId"></v-detail-menu>
              <v-batch-send ref="child" v-show="batchSend"></v-batch-send>
            </el-main>
      </el-container>
  </div>
</template>

<script>
import { createInterfaceGroup, getMenu } from '@/api/interfacemenu'
import DetailMenu from './detailmenu'
import List from './list'
import Detail from './detail'
import BatchSend from './batchattack/batchsend'
export default {
  components: {
    'v-list': List,
    'v-detail': Detail,
    'v-detail-menu': DetailMenu,
    'v-batch-send':BatchSend
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
      batchSend:false
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.getMenus()
  },
  methods: {
    getMenus(){
      getMenu(this.projectId).then(response => {
        this.data = response.data
      })
    },
    handleClick(tab, event) {
      this.listVisible = false
      this.interfaceVisible = false
      this.batchSend=false
      this.getMenus()
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    onClickNode(node) {
      this.listVisible = false
      this.interfaceVisible = false
      this.batchSend=false
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
    },
    getCheckedNodes() {
      this.listVisible=false
      this.interfaceVisible=false
      this.batchSend=true
      var cz=false
      var nodes=this.$refs.tree.getCheckedNodes()
      if(nodes.length==0){
        this.$refs.child.tableData=[]
      }
      //添加
      for (var i=0;i<nodes.length;i++){
        if(nodes[i].children!=null){
          continue
        }
        for(var j=0;j<this.$refs.child.tableData.length;j++){
          if(nodes[i].id==this.$refs.child.tableData[j].id){
            cz=true
            break
          }
        }
        if(!cz){
          var url = null
          if (nodes[i].item.request.Url.raw == null) {
            url = nodes[i].item.request.Url
          } else {
            url = nodes[i].item.request.Url.raw
          }
          var obj = {'id':nodes[i].id,'name': nodes[i].item.name, 'url': url, 'method': nodes[i].item.request.Method,
            'response':'','statusCode':'','time':'','success':false,'error':false}
          this.$refs.child.tableData.push(obj)
        }
        cz=false
      }
      //删除
      var bcz=false
      for(var j=0;j<this.$refs.child.tableData.length;j++){

        for (var i=0;i<nodes.length;i++){
          if(nodes[i].id==this.$refs.child.tableData[j].id){
            bcz=true
            break
          }
        }
        if(!bcz){
          this.$refs.child.tableData.splice(j,1)
        }
         bcz=false
      }
    },
  }
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

