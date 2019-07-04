<template>
  <div>
    <el-container>
      <br>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-tabs type="border-card"   @tab-click="handleClick">
                <el-tab-pane label="个人空间">
                  <el-table
                    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%" v-if="!showList">
                    <el-table-column
                      label="Name"
                      prop="name">
                    </el-table-column>
                    <el-table-column
                      label="Describes"
                      prop="describes">
                    </el-table-column>
                    <el-table-column
                      label="Public"
                      prop="publics">
                    </el-table-column>
                    <el-table-column
                      align="right">
                      <template slot="header" slot-scope="scope">
                        <el-input
                          v-model="search"
                          size="mini"
                          placeholder="输入关键字搜索"/>
                      </template>
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="primary"
                          @click="handleEdit(scope.$index, scope.row)">分享空间</el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          @click="handleEdit(scope.$index, scope.row)">进入项目</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <v-list v-if="showList" :spaceId="spaceId"></v-list>
                </el-tab-pane>
                <el-tab-pane label="公共空间">
                  <el-table
                    :data="publicTableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%" v-if="!showList">
                    <el-table-column
                      label="Name"
                      prop="name">
                    </el-table-column>
                    <el-table-column
                      label="Describes"
                      prop="describes">
                    </el-table-column>
                    <el-table-column
                      label="Public"
                      prop="publics">
                    </el-table-column>
                    <el-table-column
                      align="right">
                      <template slot="header" slot-scope="scope">
                        <el-input
                          v-model="search"
                          size="mini"
                          placeholder="输入关键字搜索"/>
                      </template>
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="danger"
                          @click="handleEdit(scope.$index, scope.row)">进入项目</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <v-list v-if="showList" :spaceId="spaceId"></v-list>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {getSpaces} from '@/api/spaces'
import storage from '@/store/storage'
import List from './list'
export default {
  components:{
    "v-list":List
  },
  data() {
    return {
      tableData: [],
      publicTableData:[],
      search: '',
      showList:false,
      spaceId:''
    }
  },
  methods: {
    handleEdit(index, row) {
      this.showList=true
      this.spaceId=row.id
    },
    handleClick(tab, event) {
      this.initSpaces(tab.index)
      this.showList=false
    },
    initSpaces(index){
      if(index==0){
        getSpaces(storage.get("user"),"私有").then(response => {
          this.tableData=response.data
        })
      }else{
        getSpaces(storage.get("user"),"公有").then(response => {
          this.publicTableData=response.data
        })
      }

    },
  },
  mounted() {
    this.initSpaces(0)
  },
}
</script>

<style lang="scss" scoped>
.el-header,
.el-footer {
  background-color: #5a6470;
  color: rgb(178, 190, 182);
  text-align: center;
  line-height: 60px;
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
  background: #d8dadb;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #d8dadb;
}
.bg-purple h2 {
  margin: 0px;
  padding: 15px 10px;
  color: #606266;
}
.bg-purple ul li {
  margin: 0px;
  padding: 15px 0px 0px 0px;
  list-style-type: none;
}
.bg-purple1 {
  background: #d8dadb;
  height: 50px;
  text-align: center;
}
.bg-purple1 span {
  float: left;
  margin: 8px;
  padding: 10px;
  font-size: 10%;
  color: #606266;
}
.light-blue-btn {
  float: right;
  margin: 10px;
  padding: 10px;
  font-size: 15%;
}
.bg-purple2 {
  background-color: white;
}
.bg-purple3 {
  height: 160px;
  border-radius: 30px;
  text-align: center;
}
.bg-purple3 div {
  width: 100%;
  text-align: center;
}
.svg-icon {
  fill: burlywood;
  width: 200px;
  height: 100px;
}
.el-button {
  float: right;
  margin: 8px;
  padding: 10px;
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
