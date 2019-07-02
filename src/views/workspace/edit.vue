<template>
  <el-form ref="form" :model="currentSpace" label-width="80px">
    <el-form-item label="Name">
      <el-input v-model="currentSpace.name"></el-input>
    </el-form-item>
    <el-form-item label="Describe" >
      <el-input  v-model="currentSpace.describes" ></el-input>
    </el-form-item>
    <el-form-item label="User" >
      <el-input  v-model="currentSpace.user" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="Role">
      <el-select v-model="currentSpace.publics" placeholder="请选择空间可见权限">
        <el-option label="私有" value="私有"></el-option>
        <el-option label="公有" value="公有"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {updateSpaces} from '@/api/spaces'
  export default {
    props:['currentSpace'],
    data() {
      return{

      }
    },
    methods: {
      onSubmit() {
        updateSpaces(this.currentSpace).then(response => {
          this.$message({
            message: '提交成功',
            type: 'success'
          });
        })
      }
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>

</style>
