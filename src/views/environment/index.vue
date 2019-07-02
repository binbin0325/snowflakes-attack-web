<template>
  <div>
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">EnvGroup列表</el-menu-item>
          <el-menu-item index="2" disabled>Env详情</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <v-envGroup v-if="index==1" @showEnvDetail="showEnvDetail"></v-envGroup>
        <v-envDetail v-if="index==2" :group="group"></v-envDetail>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import EnvGroup from './engroup'
  import EnvDetail from './envdetail'
  export default {
    components:{
      'v-envGroup':EnvGroup,
      'v-envDetail':EnvDetail
    },
    data() {
      return {
        activeIndex: '1',
        index:'1',
        group:''
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        if(key==1){
          this.index="1"
        }
      },
      showEnvDetail(row){
        this.activeIndex="2"
        this.index="2"
        this.group=row
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
