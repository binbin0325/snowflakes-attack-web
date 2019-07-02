<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="20">
        <el-alert title="" type="success" :closable="false">当前空间 共({{projectList.length}})个项目</el-alert>
      </el-col>
      <el-col :span="2">
        <!--<router-link class="pan-btn light-blue-btn" to="/project/add">创建项目</router-link>-->
        <el-button type="primary" @click="createProject()">创建项目</el-button>
      </el-col>
      <el-col :span="2">
        <!--<router-link class="pan-btn light-blue-btn" to="/project/add">创建项目</router-link>-->
        <el-button type="success" @click="close()">退出空间</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="0">
      <el-col :span="20">
        <el-alert title="我的项目" type="info" :closable="false" show-icon></el-alert>
      </el-col>
    </el-row>
    <el-row :gutter="50">
      <el-col :span="3" v-for="item in projectList"v-if="!showAdd">
          <svg-icon icon-class="tab" @click="iconClick(item.id)"></svg-icon><br/>
          <div style="text-align:center">{{item.name}}</div>
      </el-col>
      <v-add v-if="showAdd" :spaceId="spaceId"></v-add>
    </el-row>
  </div>
</template>

<script>
  import { getAllProject } from '@/api/project'
  import AddProject from './add-project'
  export default {
    props: ['spaceId'],
    components:{
      "v-add":AddProject
    },
    data() {
      return {
        projectList: [],
        showAdd:false
      }
    },
    methods: {
      // 点击图片跳转到详情
      iconClick(id) {
        this.$router.push({ path: '/interface/info/' + id })
      },
      createProject(){
        this.showAdd=true
      },
      close(){
        console.log(this.$parent)
      }
    },
    mounted() {
      getAllProject(this.spaceId).then(response => {
        this.projectList = response.data
      })
    },
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
  .row-bg {
    padding: 10px 0;
    background-color: #d8dadb;
  }
  .svg-icon {
    fill: burlywood;
    width: 200px;
    height: 100px;
  }
  .autocomplete {
    margin: 0px;
    padding: 1px 10px;
    width: 80%;
  }
  .namespaces {
    background-color: white;
    border-style: outset;
    border-radius: 4px;
  }
</style>
