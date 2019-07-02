<template>
  <div>
    <el-container>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="3"><div class="grid-content bg-purple">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div></el-col>
          <el-col :span="18"><div class="grid-content bg-purple">
            <el-input v-model="url" placeholder="请输入内容"></el-input>
          </div></el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple1">
              <el-button type="primary" :plain="true" @click="save()">save</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="21">
            <div class="grid-content bg-purple" >
              <el-tabs type="border-card">
                <el-tab-pane label="Headers">
                  <el-row>
                    <el-col :span="21">
                      <el-alert
                        type="success"
                        :closable="false">
                        <svg-icon icon-class="education" />
                      </el-alert>
                    </el-col>
                    <el-col :span="2">
                      <el-button type="primary" :plain="true" @click="addHeader()">Add</el-button>
                    </el-col>
                  </el-row>
                  <el-row v-for="(item,index) in tableData" :gutter="5">
                    <el-col :span="2">
                      <el-tag>Key:</el-tag>
                    </el-col>
                    <el-col :span="4">
                      <el-input v-model="item.key" placeholder="请输入内容"></el-input>
                    </el-col>
                    <el-col :span="1">
                      <div class="grid-content "></div>
                    </el-col>
                    <el-col :span="2">
                      <el-tag>Value:</el-tag>
                    </el-col>
                    <el-col :span="4">
                      <el-input v-model="item.value" placeholder="请输入内容"></el-input>
                    </el-col>
                    <el-col :span="1">
                      <div class="grid-content "></div>
                    </el-col>
                    <el-col :span="3">
                      <el-tag>description:</el-tag>
                    </el-col>
                    <el-col :span="4">
                      <el-input v-model="item.description" placeholder="请输入内容"></el-input>
                    </el-col>
                    <el-col :span="2">
                      <el-button type="danger" icon="el-icon-delete" circle @click="delHeader(index)" :plain="true"></el-button>
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane label="Per-request Script">
                  <el-input
                    type="textarea"
                    :rows="20"
                    autosize
                    placeholder="请输入内容"
                    v-model="script"
                  >
                  </el-input>
                </el-tab-pane>
                <el-tab-pane label="Tests">
                  <el-input
                    type="textarea"
                    :rows="20"
                    autosize
                    placeholder="请输入内容"
                    v-model="tests">
                  </el-input>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="21">
            <div class="grid-content bg-purple" style="background-color: #2d2f33">
              <el-tabs type="border-card" >
                <el-tab-pane label="Request Body" >
                  <el-input
                    type="textarea"
                    :rows="20"
                    autosize
                    placeholder="请输入内容"
                    v-model="requestBody"
                  >
                  </el-input>
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
  import {editInterface,getInterfaceForMenuId} from '@/api/interface'
  import JsonEditor from '@/components/JsonEditor'
export default {
  props: ['selectInterfaceMenuId'],
  components: {
    "v-json-editor":JsonEditor
  },
  data() {
    return {
      options: [{
        value: 'GET',
        label: 'GET'
      }, {
        value: 'POST',
        label: 'POST'
      }, {
        value: 'PUT',
        label: 'PUT'
      }, {
        value: 'DELETE',
        label: 'DELETE'
      }],
      value: '',
      input: '',
      detail:{},
      url:'',
      interfaceId:'',
      tests:'',
      script:'',
      tableData: [],
      requestBody:'',
    }
  },
  methods:{
    save(){
      if (this.detail.request.Url.raw==null){
        this.detail.request.Url=this.url
      }else {
        this.detail.request.Url.raw = this.url
      }
      this.detail.request.Method = this.value
      this.detail.request.Header = this.tableData

      for(var i=0;i<this.detail.event.length;i++){
        if(this.detail.event[i].listen=="test"){
          this.detail.event[i].script.Exec=this.tests.split("\n")
        }
        if(this.detail.event[i].listen=="prerequest"){
         this.detail.event[i].script.Exec=this.script.split("\n")
        }
      }
      this.detail.request.Body.Raw=this.requestBody
      editInterface(this.detail,this.selectInterfaceMenuId).then(response => {
        this.$message({
          message: '保存成功',
          type: 'success'
        });
      })
    },
    addHeader(){
      var obj = { 'key': '', 'value': '', 'description': '' }
      this.tableData.push(obj)
    },
    delHeader(index){
      this.tableData.splice(index,1)
    }
  },
  mounted() {
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
      this.requestBody=this.detail.request.Body.Raw
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
    width: 100%;
    margin: -40px;
    padding: -20px;
  }
  .components-container{
    width: 100%;
  }


</style>
