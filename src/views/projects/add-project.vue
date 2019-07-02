<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
    >
      <el-form-item label="项目名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          v-model="form.desc"
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="所属分组">
        <el-select
          v-model="form.region"
          placeholder="请选择分组"
        >
          <el-option
            label="个人空间"
            value="个人空间"
          />
          <el-option
            label="其他"
            value="其他"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="权限">
        <el-radio-group v-model="form.resource">
          <el-radio label="私有" />
          <el-radio label="公开" />
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createProject } from '@/api/project'
export default {
  props: ['spaceId'],
  data() {
    return {
      form: {
        name: '',
        region: '',
        type: [],
        resource: '',
        desc: '',
        spacesId:'',
      }
    }
  },
  methods: {
    onSubmit() {
      createProject(JSON.stringify(this.form)).then(response => {
        console.log(response)
      })
      /*  getProject().then(response => {
            console.log(response);
          })  */
      this.$message('创建成功')
      this.$router.push({ path: '/projects/list' })
    },
    onCancel() {
      this.$parent.$parent.showAdd=false
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  },
  mounted() {
    this.form.spacesId=this.spaceId
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

