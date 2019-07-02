<template>
      <el-tabs v-model="activeIndex" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="空间管理">
          <el-row :gutter="20">
            <el-col :span="22">
              <el-alert
                type="success"
                :closable="false">
                <svg-icon icon-class="excel" /> &nbsp;当前用户共有&nbsp;{{tableData.length}}&nbsp;个空间
              </el-alert>
            </el-col>
            <el-col :span="1">
              <el-button type="primary" @click="createSpaces()">创建空间</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
                <el-table-column
                  label="Name"
                  prop="name">
                </el-table-column>
                <el-table-column
                  label="Describes"
                  prop="describes">
                </el-table-column>
                <el-table-column
                  label="Public"
                  prop="publics">
                </el-table-column>
                <el-table-column
                  align="right">
                  <template slot="header" slot-scope="scope">
                    <el-input
                      v-model="search"
                      size="mini"
                      placeholder="输入关键字搜索"/>
                  </template>
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
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="空间信息" v-if="edit">
          <v-edit :currentSpace="currentSpace"></v-edit>
        </el-tab-pane>
      </el-tabs>

</template>

<script>
  import {getSpaces,delSpaces} from '@/api/spaces'
  import storage from '@/store/storage'
  import Edit from './edit'
  export default {
    components:{
      "v-edit":Edit
    },
    data() {
      return {
        tableData: [],
        search: '',
        edit:false,
        activeIndex: "0",
        currentSpace:null,
      }
    },
    methods: {
      handleEdit(index, row) {
        this.edit=true
        this.activeIndex="1"
        this.currentSpace=row
        this.currentSpace.user=storage.get("user")
      },
      handleDelete(index, row) {
        delSpaces(row.id).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
         this.tableData.splice(index,1)
        })
      },
      handleClick(tab, event) {
        console.log(tab)
        this.initSpaces()
      },
      initSpaces(){
        getSpaces(storage.get("user"),"私有").then(response => {
          this.tableData=response.data
        })
      },
      createSpaces(){
        this.edit=true
        this.activeIndex="1"
        this.currentSpace=new Object()
        this.currentSpace.user=storage.get("user")
      }
    },
    mounted() {
      this.initSpaces()
    }
  }
</script>

<style lang="scss" scoped>
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
