<template>
  <el-row :gutter="20">
    <el-col :span="9">
      <el-tabs type="border-card">
        <el-tab-pane label="数据导入">
          <el-row :gutter="20">
            <el-col :span="15">
              <el-select v-model="value" clearable placeholder="请选择导入数据的格式">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="15">
              <el-select v-model="value1" clearable placeholder="公共分类">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="15">
              <el-upload
                class="upload-demo"
                drag
                :action="action"
                multiple
              >
                <i class="el-icon-upload" />
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              </el-upload>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :span="9">
      <el-tabs type="border-card">
        <el-tab-pane label="数据导出">
          <el-row :gutter="20">
            <el-col :span="15">
              <el-select v-model="value" clearable placeholder="请选择要导出的项目">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>

</template>
<script>
export default {
  props: ['projectId'],
  data() {
    return {
      action: '',
      options: [{
        value: '选项1',
        label: 'postman'
      }],
      value: '',
      options1: [{
        value: '选项1',
        label: '测试文件夹'
      }],
      value1: ''
    }
  },
  mounted() {
    this.action = 'http://127.0.0.1:80/api/v1/import/' + this.projectId
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
