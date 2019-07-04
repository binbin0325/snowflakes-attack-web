<template>
    <div>
        <el-container>
            <el-header>
                <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="1">&nbsp;接口管理</el-menu-item>
                <el-menu-item index="2">&nbsp;数据管理&nbsp;</el-menu-item>
                  <el-menu-item index="3">&nbsp;接口压力测试&nbsp;</el-menu-item>
                  <el-menu-item index="4">&nbsp;链路压力测试&nbsp;</el-menu-item>
                </el-menu>
            </el-header>
            <el-container>
                <el-main v-if="flag">
                  <v-info :projectId="projectId" v-if="index==1"></v-info>
                  <v-manager :projectId="projectId" v-if="index==2"></v-manager>
                  <v-singInterfaceTest :projectId="projectId" v-if="index==3"></v-singInterfaceTest>
                  <v-batchInterfaceTest :projectId="projectId" v-if="index==4"></v-batchInterfaceTest>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Info from './info'
import Manager from './manager'
import SingInterfaceTest from './SingInterfaceTest'
import BatchInterfaceTest from './batchattack/BatchInterfaceTest'
export default {
  components: {
    'v-info': Info,
    'v-manager': Manager,
    'v-singInterfaceTest':SingInterfaceTest,
    'v-batchInterfaceTest':BatchInterfaceTest
  },
  data() {
    return {
      activeIndex: '1',
      projectId: '',
      index: '1',
      flag: false
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.index = key
    }
  },
  mounted() {
    this.projectId = this.$route.params.projectId
    this.flag = true
  }
}
</script>

<style lang="scss" scoped>
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
