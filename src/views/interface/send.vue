<template>
  <div>
    <el-container>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="3"><div class="grid-content bg-purple">
            <el-alert
              type="warning"
              :closable="false">
              <svg-icon icon-class="guide" />
              环境变量
            </el-alert>
          </div></el-col>
          <el-col :span="18"><div class="grid-content bg-purple">
            <template>
              <el-select v-model="envGroupId" filterable placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="item in envGroupOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </template>
          </div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3"><div class="grid-content bg-purple">
            <el-alert
              type="success"
              :closable="false">
              <svg-icon icon-class="guide" />
              {{value}}
            </el-alert>
          </div></el-col>
          <el-col :span="18"><div class="grid-content bg-purple">
            <el-alert
              type="info"
              :closable="false">
              {{url}}
            </el-alert>
          </div></el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple1">
              <el-button type="primary" @click="send()">send</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="21">
            <div class="grid-content bg-purple" >
              <el-tabs type="border-card" style="background-color: #8cbda4">
                <el-tab-pane label="Headers">
                  <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                      prop="key"
                      label="key"
                      width="320">
                    </el-table-column>
                    <el-table-column
                      prop="value"
                      label="value"
                      width="320">
                    </el-table-column>
                    <el-table-column
                      prop="description"
                      label="description">
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane label="Per-request Script">
                  <el-input
                    type="textarea"
                    :rows="20"
                    autosize
                    placeholder="请输入内容"
                    v-model="script"
                    :disabled="true"
                  >
                  </el-input>
                </el-tab-pane>
                <el-tab-pane label="Tests">
                  <el-input
                    type="textarea"
                    :rows="20"
                    autosize
                    placeholder="请输入内容"
                    v-model="tests"
                    :disabled="true">
                  </el-input>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="response">
          <el-col :span="13">
            <el-tag>Response</el-tag>
          </el-col>
          <el-col :span="4">
            <el-alert
              type="success"
              :closable="false">
              Staus:{{statusCode}}
            </el-alert>
          </el-col>
          <el-col :span="4">
            <el-alert
              type="success"
              :closable="false">
              Time:{{time}}
            </el-alert>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="21">
            <div class="components-container">
              <div class="editor-container">
                <v-json-editor  v-model="responseValue" v-loading="loading"
                                element-loading-text="拼命加载中"
                                element-loading-spinner="el-icon-loading"
                                element-loading-background="rgba(0, 0, 0, 0.8)"/>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import {sendInterface,getInterfaceForMenuId} from '@/api/interface'
  import {getEnvironmentGroup} from '@/api/environment'
  import JsonEditor from '@/components/JsonEditor'
export default {
  props: ['selectInterfaceMenuId'],
  components: {
    "v-json-editor":JsonEditor
  },
  data() {
    return {
      input: '',
      detail:{},
      value:'',
      url:'',
      interfaceId:'',
      tests:'',
      script:'',
      tableData: [],
      envGroupId:'',
      envGroupOptions:[],
      loading: false,
      responseValue:{},
      statusCode:'',
      time:'',
    }
  },
  methods:{
    send(){
      if(this.envGroupId==''){
        this.$alert('请选择要应用的环境变量', '环境变量', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: '请选择要应用的环境变量'
            });
          }
        });
      }else{
        this.loading=true
        sendInterface(this.selectInterfaceMenuId,this.envGroupId).then(response => {
          this.$message({
            message: '测试成功',
            type: 'success'
          });
          this.loading=false

          this.responseValue=JSON.parse(response.data.body);
          this.statusCode=response.data.statusCode
          this.time=response.data.time+"ms"
        })
      }

    },
    build(){
      getInterfaceForMenuId(this.selectInterfaceMenuId).then(response => {
        this.detail=response.data;
        this.value = this.detail.request.Method
        if (this.detail.request.Url.raw==null){
          this.url=this.detail.request.Url
        }else {
          this.url=this.detail.request.Url.raw
        }
        for (var i=0;i<this.detail.request.Header.length;i++){
          var description =''
          if(this.detail.request.Header[i].Description !=null){
            description=this.detail.request.Header[i].Description
          }
          var obj = { 'key': this.detail.request.Header[i].Key, 'value': this.detail.request.Header[i].Value, 'description': description }
          this.tableData.push(obj)
        }

        for(var i=0;i<this.detail.event.length;i++){
          if(this.detail.event[i].listen=="test"){
            for(var j=0;j<this.detail.event[i].script.Exec.length;j++){
              this.tests=this.tests+"\n"+this.detail.event[i].script.Exec[j]
            }
          }
          if(this.detail.event[i].listen=="prerequest"){
            for(var j=0;j<this.detail.event[i].script.Exec.length;j++){
              this.script=this.script+"\n"+this.detail.event[i].script.Exec[j]
            }
          }
        }
      })

    },

  },
  mounted() {
    this.build();
    //todo 后期要传入UserId ,不用用户展示不同的环境列表
    getEnvironmentGroup('1').then(response => {
      this.envGroupOptions = response.data
    })
  }
}
</script>
<style lang="scss" scoped>
  .el-row {
    margin-bottom: 30px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    background-color: #f9fafc;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
  .editor-container{
    position: relative;
    height: 100%;
    margin: -40px;
    padding: -20px;
  }

  .el-tag{
  }
  .response{
    margin: 3px;
    padding: 8px;

  }
</style>
