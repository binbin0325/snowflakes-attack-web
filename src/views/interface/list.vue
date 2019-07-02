<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;"
      highlight-current-row
    >
      <el-table-column
        label="接口名称"
        prop="name"
      />
      <el-table-column
        label="接口路径"
        prop="url"
      />
      <el-table-column
        label="请求方式"
        prop="method"
      />
      <el-table-column
        align="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ['selectNode'],
  data() {
    return {
      tableData: [],
      search: ''
    }
  },
  mounted() {
    this.buildList(this.selectNode.children)
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    buildList(childs) {
      for (let i = 0; i < childs.length; i++) {
        var obj = null
        if (childs[i].children != null) {
          this.buildList(childs[i].children)
        } else {
          var url = null
          if (childs[i].item.request.Url.raw == null) {
            url = childs[i].item.request.Url
          } else {
            url = childs[i].item.request.Url.raw
          }

          obj = { 'name': childs[i].item.name, 'url': url, 'method': childs[i].item.request.Method }
        }
        if (obj != null) {
          this.tableData.push(obj)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
