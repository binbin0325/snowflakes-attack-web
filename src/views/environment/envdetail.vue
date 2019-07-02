<template>
  <div>
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="20">
            <el-alert
              type="success"
              :closable="false">
              <svg-icon icon-class="education" /> {{group.name}}&nbsp;下共有&nbsp;{{envList.length}}&nbsp;个环境变量
            </el-alert>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="addEnv()">Add</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="success" :plain="true" @click="saveEnv()">Save</el-button>
          </el-col>
        </el-row>
        <el-row v-for="(item,index) in envList" :gutter="10">
          <el-col :span="3">
            <el-tag>Key:</el-tag>
          </el-col>
          <el-col :span="4">
            <el-input v-model="item.Key" placeholder="请输入内容"></el-input>
          </el-col>
          <el-col :span="3">
            <el-tag>initialValue:</el-tag>
          </el-col>
          <el-col :span="4">
            <el-input v-model="item.InitialValue" placeholder="请输入内容"></el-input>
          </el-col>
          <el-col :span="3">
            <el-tag>currentValue:</el-tag>
          </el-col>
          <el-col :span="4">
            <el-input v-model="item.CurrentValue" placeholder="请输入内容"></el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="danger" icon="el-icon-delete" circle @click="delEnv(item.Id,index)" :plain="true"></el-button>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import {addEnvironment,getEnvironment,delEnvironment} from '@/api/environment'
  export default {
    props: ['group'],
    data() {
      return {
        search: '',
        visible: false,
        envList: [],
      }
    },
    methods: {
      addEnv(){
        var obj = {
          Key:"",
          InitialValue:"",
          CurrentValue:"",
          GroupId:this.group.id
        }
        console.log(this)
        this.envList.push(obj)
      },
      saveEnv(){
        addEnvironment(this.envList).then(response => {
          this.$message({
            message: '保存成功',
            type: 'success'
          });
        })
      },
      delEnv(id,index){
        delEnvironment(id).then(response => {
          this.envList.splice(index,1)
          this.$message({
            message: '删除成功',
            type: 'warning'
          });
        })
      }
    },
    mounted() {
      getEnvironment(this.group.id).then(response => {
        if(response.data!=null){
          this.envList=response.data
        }

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
  .el-tag{
    height: 35px;
  }
</style>
