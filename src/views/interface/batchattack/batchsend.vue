<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="3"><div class="grid-content bg-purple">
        <el-alert
          type="warning"
          :closable="false">
          <svg-icon icon-class="guide" />
          环境变量
        </el-alert>
      </div></el-col>
      <el-col :span="4">
        <div class="grid-content">
          <el-select v-model="envGroupId" filterable placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in envGroupOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="1">
        <el-button type="primary" @click="run()">Run</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
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
              label="StatusCode"
              prop="statusCode"
            />
            <el-table-column
              label="Time"
              prop="time"
            />
          <el-table-column
            align="right"
          >
            <template slot-scope="scope">
              <el-button type="success" icon="el-icon-check" circle v-if="scope.row.success"></el-button>
              <el-button type="danger" icon="el-icon-close" circle  v-if="scope.row.error"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import {sendInterfaceBatch} from '@/api/interface'
  import {getEnvironmentGroup} from '@/api/environment'
  export default {
    data() {
      return {
        tableData: [],
        search: '',
        envGroupId:'',
        envGroupOptions:[],
        responseValue:'',
        statusCode:'',
        time:'',
        success:false,
        error:false
      }
    },
    mounted() {
      //todo 后期要传入UserId ,不用用户展示不同的环境列表
      getEnvironmentGroup('1').then(response => {
        this.envGroupOptions = response.data
      })
    },
    methods: {
      run(){
        for (let i=0;i<this.tableData.length;i++){
          this.tableData[i].success=false
          this.tableData[i].error=false
        }
        this.send(0)
      },
      send(i){
        if(i<this.tableData.length){
          sendInterfaceBatch(this.tableData[i].id,this.envGroupId).then(response => {
            console.log(response.data)
            if(response.data.statusCode>=200&& response.data.statusCode<300){
              this.tableData[i].success=true
              this.send(i+1)
            }else{
              this.tableData[i].error=true
            }
            this.tableData[i].response=response.data.body
            this.tableData[i].statusCode=response.data.statusCode
            this.tableData[i].time=response.data.time+"ms"
          })
        }
      }
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
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
