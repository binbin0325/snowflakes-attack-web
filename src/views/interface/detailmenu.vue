<template>
  <div>
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">编辑</el-menu-item>
          <el-menu-item index="2">运行</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <v-detail v-if="index==1" :selectInterfaceMenuId="selectInterfaceMenuId"></v-detail>
        <v-send v-if="index==2" :selectInterfaceMenuId="selectInterfaceMenuId"></v-send>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import Detail from './detail'
  import Send from './send'
  export default {
    props: ['selectInterfaceMenuId'],
    components: {
      'v-detail': Detail,
      'v-send' : Send
    },
    data() {
      return {
        activeIndex: '1',
        index:'1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        this.index=key
      }
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  .el-header {
    text-align: center;
    line-height: 60px;
  }

  .el-main {
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
</style>
