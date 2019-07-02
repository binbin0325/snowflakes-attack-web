<template>
  <el-form ref="form" :model="currentUser" label-width="80px">
    <el-form-item label="Name">
      <el-input v-model="currentUser.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" >
      <el-input type="password" v-model="currentUser.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="Role">
      <el-select v-model="currentUser.role" placeholder="请选择用户角色">
        <el-option label="admin" value="admin"></el-option>
        <el-option label="dev" value="dev"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {updateUser} from '@/api/user'
  export default {
    props:['currentUser'],
    data() {
      return{

      }
    },
    methods: {
      onSubmit() {
        updateUser(this.currentUser).then(response => {
          this.$message({
            message: '提交成功',
            type: 'success'
          });
        })
      }
    },
    mounted() {
      console.log(this.currentUser)
    }
  }
</script>

<style lang="scss" scoped>

</style>
