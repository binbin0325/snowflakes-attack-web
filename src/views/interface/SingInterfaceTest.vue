<template>
  <div>
    <el-container>
      <el-aside style="width: 350px">
        <el-tabs type="border-card">
          <el-tab-pane label="接口列表">
            <el-row :gutter="20">
              <el-col :span="23">
                <div class="grid-content">
                  <el-input
                    v-model="filterText"
                    placeholder="输入关键字进行过滤"
                  />
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="23">
                <div class="grid-content bg-purple">
                  <el-tree
                    ref="tree"
                    class="filter-tree"
                    :data="data"
                    :props="defaultProps"
                    default-expand-all
                    :filter-node-method="filterNode"
                    highlight-current
                    @node-click="onClickNode"
                  />

                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-aside>
      <el-main v-if="selectNode!=null">
          <el-row :gutter="20">
            <el-col :span="3"><div class="grid-content bg-purple">
              <el-alert
                type="warning"
                :closable="false">
                <svg-icon icon-class="guide" />
                环境变量
              </el-alert>
            </div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple">
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
            <el-col :span="3"><div class="grid-content bg-purple">
            <el-alert
              type="warning"
              :closable="false">
              <svg-icon icon-class="guide" />
              Rate
            </el-alert>
          </div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple">
              <el-input v-model.number="attack.rate" placeholder="请输入内容" type="number"></el-input>
            </div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple">
              <el-alert
                type="warning"
                :closable="false">
                <svg-icon icon-class="guide" />
                Duration
              </el-alert>
            </div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple">
              <el-input v-model="attack.duration" placeholder="请输入内容"></el-input>
            </div></el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple1">
                <el-button type="primary" @click="send()">send</el-button>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
          <el-col :span="3"><div class="grid-content bg-purple">
            <el-alert
              type="warning"
              :closable="false">
              <svg-icon icon-class="guide" />
              Connections
            </el-alert>
          </div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">
            <el-input v-model.number="attack.connections" placeholder="请输入内容" type="number"></el-input>
          </div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple">
            <el-alert
              type="warning"
              :closable="false">
              <svg-icon icon-class="guide" />
              MaxBody
            </el-alert>
          </div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">
            <el-input v-model.number="attack.maxBody" placeholder="请输入内容" type="number"></el-input>
          </div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple">
            <el-alert
              type="warning"
              :closable="false">
              <svg-icon icon-class="guide" />
              Timeout
            </el-alert>
          </div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">
            <el-input v-model="attack.timeout" placeholder="请输入内容" ></el-input>
          </div></el-col>
        </el-row>
          <el-row :gutter="20">
            <el-col :span="3"><div class="grid-content bg-purple">
              <el-alert
                type="warning"
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
          </el-row>
          <el-row :gutter="20">
          <el-col :span="24">
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
                <el-tab-pane label="Request Body">
                  <el-input
                    type="textarea"
                    :rows="20"
                    autosize
                    placeholder="请输入内容"
                    v-model="requestBody">
                  </el-input>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="24" v-loading="loading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-row  v-if="result">
              <el-col :span="24">
                <el-tabs type="border-card">
                  <el-tab-pane label="Attack Result">
                    <el-row :gutter="20">
                      <el-col :span="4"><div class="grid-content bg-purple">
                        <el-alert
                          type="error"
                          :closable="false">
                          <svg-icon icon-class="message" />
                          TPS
                        </el-alert>
                      </div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">
                        <el-input placeholder="请输入内容" v-model="qps" :disabled="true"></el-input>
                      </div></el-col>
                      <el-col :span="16"><div class="grid-content bg-purple">
                        <el-alert
                          type="error"
                          :closable="false">
                          TPS=并发数/平均响应时间. 服务器每秒处理的事务数,一个事务是指一个客户机向服务器发送请求然后服务器做出反应的过程。客户机在发送请求时开始计时，收到服务器响应后计时结束.
                        </el-alert>
                      </div></el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="4"><div class="grid-content bg-purple">
                        <el-alert
                          type="success"
                          :closable="false">
                          <svg-icon icon-class="message" />
                          Duration
                        </el-alert>
                      </div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">
                        <el-input v-model="attackResult.duration" placeholder="请输入内容" :disabled="true"></el-input>
                      </div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">
                        <el-alert
                          type="success"
                          :closable="false">
                          <svg-icon icon-class="message" />
                          Total
                        </el-alert>
                      </div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">
                        <el-input v-model="total" placeholder="请输入内容" :disabled="true"></el-input>
                      </div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">
                        <el-alert
                          type="success"
                          :closable="false">
                          <svg-icon icon-class="message" />
                          Rate
                        </el-alert>
                      </div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">
                        <el-input v-model="attackResult.rate" placeholder="请输入内容" :disabled="true"></el-input>
                      </div></el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="4"><div class="grid-content bg-purple">
                        <el-alert
                          type="success"
                          :closable="false">
                          <svg-icon icon-class="message" />
                          Earliest
                        </el-alert>
                      </div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">
                        <el-input v-model="attackResult.earliest" placeholder="请输入内容" :disabled="true"></el-input>
                      </div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">
                        <el-alert
                          type="success"
                          :closable="false">
                          <svg-icon icon-class="message" />
                          latest
                        </el-alert>
                      </div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">
                        <el-input v-model="attackResult.latest" placeholder="请输入内容" :disabled="true"></el-input>
                      </div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">
                        <el-alert
                          type="success"
                          :closable="false">
                          <svg-icon icon-class="message" />
                          End
                        </el-alert>
                      </div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">
                        <el-input v-model="attackResult.end" placeholder="请输入内容" :disabled="true"></el-input>
                      </div></el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="4"><div class="grid-content bg-purple">
                        <el-alert
                          type="success"
                          :closable="false">
                          <svg-icon icon-class="message" />
                          Bytes_in(mean/total)
                        </el-alert>
                      </div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">
                        <el-input v-model="bytesIn" placeholder="请输入内容" :disabled="true"></el-input>
                      </div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">
                        <el-alert
                          type="success"
                          :closable="false">
                          <svg-icon icon-class="message" />
                          Bytes_out(mean/total)
                        </el-alert>
                      </div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">
                        <el-input v-model="bytesOut" placeholder="请输入内容" :disabled="true"></el-input>
                      </div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">
                        <el-alert
                          type="success"
                          :closable="false">
                          <svg-icon icon-class="message" />
                          Request
                        </el-alert>
                      </div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">
                        <el-input v-model="attackResult.requests" placeholder="请输入内容" :disabled="true"></el-input>
                      </div></el-col>
                    </el-row>
                  </el-tab-pane>
                </el-tabs>
              </el-col>
            </el-row>
            <el-row :gutter="20" >
              <el-col :span="24">
                <v-LatenciesChart v-if="result" :latenciesKeys="latenciesKeys" :latenciesValues="latenciesValues"></v-LatenciesChart>
              </el-col>
            </el-row >
            <el-row :gutter="20" >
              <el-col :span="24">
                <v-BucketsChart v-if="result" :bucketsKeys="bucketsKeys" :bucketsValues="bucketsValues"></v-BucketsChart>
              </el-col>
            </el-row>
            <el-row :gutter="20" >
              <el-col :span="12">
                <v-StatusCode v-if="result" :statusCodes="statusCodes"></v-StatusCode>
              </el-col>
              <el-col :span="12">
                <el-table v-if="result"
                  :data="errors"
                  style="width: 100%">
                  <el-table-column
                    prop="message"
                    label="Error Message"
                    width="600px">
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  // 按需引入 引入 ECharts 主模块
  let echarts = require('echarts')
  import { getMenu } from '@/api/interfacemenu'
  import {attackInterface,getAttackReport} from '@/api/interface'
  import {getEnvironmentGroup} from '@/api/environment'
  import LatenciesChart from './Charts/LatenciesChart'
  import BucketsChart from './Charts/BucketsChart'
  import StatusCode from './Charts/StatusCode'
  export default {
    components: {
      "v-LatenciesChart":LatenciesChart,
      "v-BucketsChart":BucketsChart,
      "v-StatusCode":StatusCode
    },
    // eslint-disable-next-line vue/require-prop-types
    props: ['projectId'],
    data() {
      return {
        attack:{
          rate:30,
          duration:'1s',
          connections:10000,
          maxBody:0,
          timeout:'30s'
        },
        envGroupId:'',
        envGroupOptions:[],
        input: '',
        selectNode: null,
        filterText: '',
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        value: '',
        detail:{},
        url:'',
        tableData: [],
        requestBody:'',
        result:false,
        tests:'',
        script:'',
        interfaceAttack:{
          attack:{},
          item:[],
          envGroupId:'',
          menuId:''
        },
        latenciesKeys:[],
        latenciesValues:[],
        bucketsKeys:[0],
        bucketsValues:[0],
        statusCodes:{},
        loading:false,
        total:"",
        attackResult:{},
        bytesIn:"",
        bytesOut:"",
        errors:[],
        mean:"",
        qps:"",
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      }
    },
    mounted() {
      getMenu(this.projectId).then(response => {
        this.data = response.data
      })
      //todo 后期要传入UserId ,不用用户展示不同的环境列表
      getEnvironmentGroup('1').then(response => {
        this.envGroupOptions = response.data
      })
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      onClickNode(node) {
        this.$nextTick(() => {
          if (node.children != null) {
          } else {
            this.selectNode = node
            this.tableData=[]
            this.script=""
            this.tests=""
            this.buildData()
            this.result=false
          }
        })
      },
      buildData(){
        this.detail=this.selectNode.item;
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
      },
      send(){
        this.save()
        this.result=false
        this.latenciesKeys=[]
        this.latenciesValues=[]
        this.bucketsKeys=[]
        this.bucketsValues=[]
        this.errors=[]
        this.loading=true
        this.interfaceAttack.item=[]
        var s=1000000000
        var ms=1000000
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
          this.interfaceAttack.attack=this.attack
          this.detail.request.send=this.url
          this.interfaceAttack.item.push(this.detail)
          this.interfaceAttack.envGroupId=this.envGroupId
          this.interfaceAttack.menuId=this.selectNode.id
          console.log(this.interfaceAttack)
          //发起攻击
          attackInterface(this.interfaceAttack).then(response => {
            getAttackReport(response.data.id).then(response=>{
              this.loading=false
              this.attackResult=response.data
              this.attackResult.duration=this.attackResult.duration/s+"s"
              this.bytesIn=this.attackResult.bytes_out.mean+"/"+this.attackResult.bytes_out.total
              this.bytesOut=this.attackResult.bytes_in.mean+"/"+this.attackResult.bytes_in.total
              console.log(response.data)
              //获取latencies
              for (var key in response.data.latencies) {
                if(key!="total"){
                  this.latenciesKeys.push(key)
                  this.latenciesValues.push((response.data.latencies[key]/s))//转换成ms
                  if(key=="mean"){
                    this.qps=this.attack.rate/(response.data.latencies[key]/s)
                  }
                } else{
                  this.total=(response.data.latencies[key]/s)+"s"
                }
              }
              //获取buckets,并按照key排序
              for (var key in response.data.buckets) {
                  this.bucketsKeys.push(parseInt(key))
              }
              this.bucketsKeys=this.bucketsKeys.sort(function(a,b){
                return a-b})
              for (var i=0;i< this.bucketsKeys.length;i++) {
                this.bucketsValues.push(response.data.buckets[this.bucketsKeys[i]])
                this.bucketsKeys[i]=this.bucketsKeys[i]/s //转换成s
              }
              //获取运行结果code
              this.statusCodes=response.data.status_codes
              //获取errors
              for (var i=0;i<this.attackResult.errors.length;i++){
                var obj={'message':this.attackResult.errors[i]}
                this.errors.push(obj)
              }

              //获取攻击report
              this.$message({
                message: '测试成功',
                type: 'success'
              });
              this.result=true

            })
          })
        }
      },
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-aside {

  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .el-main {
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
  .chart-wrapper {
    padding: 16px 16px 0;
    margin-bottom: 32px;
    height: 500px;
  }
</style>

