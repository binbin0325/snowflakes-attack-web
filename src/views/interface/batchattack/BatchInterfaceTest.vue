<template>
  <div>
    <el-container>
      <el-aside style="width: 350px">
        <el-tabs type="border-card"@tab-click="handleClick">
          <el-tab-pane label="接口列表">
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
        <v-batch-attack ref="child" v-show="batchSend"></v-batch-attack>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import { getMenu } from '@/api/interfacemenu'
  import BatchAttack from './batchattack'
  export default {
    components: {
      'v-batch-attack':BatchAttack
    },
    // eslint-disable-next-line vue/require-prop-types
    props: ['projectId'],
    data() {
      return {
        batchSend:false,
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
      this.getMenus()
    },
    methods: {
      getMenus(){
        getMenu(this.projectId).then(response => {
          this.data = response.data
        })
      },
      handleClick(tab, event) {
        this.getMenus()
        this.batchSend=false
      },
      getCheckedNodes() {
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
              'item':nodes[i].item}
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
