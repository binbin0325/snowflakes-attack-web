<template>
  <div>
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="22">
            <el-alert
              type="success"
              :closable="false">
              <svg-icon icon-class="excel" /> &nbsp;当前共有&nbsp;{{tableData.length}}&nbsp;个环境变量分组
            </el-alert>
          </el-col>
          <el-col :span="2">
              <el-popover
                placement="right"
                width="360"
                v-model="visible">
                <el-row :gutter="10">
                  <el-col :span="6"><el-tag>Name:</el-tag></el-col>
                  <el-col :span="10"><el-input v-model="envGroup.name" placeholder="请输入内容"></el-input></el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="6"><el-tag>Describe:</el-tag></el-col>
                  <el-col :span="10"><el-input v-model="envGroup.note" placeholder="请输入内容"></el-input></el-col>
                </el-row>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="addEnvGroup()">确定</el-button>
                </div>
                <el-button type="primary" slot="reference">添加分组</el-button>
              </el-popover>
          </el-col>
        </el-row>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            label="Name"
            prop="name">
          </el-table-column>
          <el-table-column
            label="Describe"
            prop="note">
          </el-table-column>
          <el-table-column
            align="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import {getEnvironmentGroup,addEnvironmentGroup,delEnvironmentGroup} from '@/api/environment'
  export default {
    data() {
      return {
        tableData: [],
        search: '',
        visible: false,
        envGroup:{
          name:'',
          note:'',
        }
      }
    },
    methods: {
      handleEdit(index, row) {
        this.$emit('showEnvDetail',row)
      },
      handleDelete(index, row) {
        delEnvironmentGroup(row.id).then(response => {
          console.log(index)
          this.tableData.splice(index,1)
          this.$message({
            message: '删除成功',
            type: 'warning'
          });
        })
      },
      addEnvGroup(){
        this.visible = false
        addEnvironmentGroup(this.envGroup).then(response => {
          this.tableData.push(this.envGroup)
          this.envGroup={}
        })
      }
    },
    mounted() {
      //todo 后期要传入UserId ,不用用户展示不同的环境列表
      getEnvironmentGroup('1').then(response => {
        this.tableData = response.data
      })
    }
  }
</script>
<style lang="scss" scoped>

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    margin: 10px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
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
  .bg-purple {
    background: #d3dce6;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    text-align: center;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
