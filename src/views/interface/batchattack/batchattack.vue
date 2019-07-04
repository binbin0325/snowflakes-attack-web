<template>
  <div>
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
        </el-table>
      </el-col>
    </el-row>
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
  </div>
</template>

<script>
  let echarts = require('echarts')
  import LatenciesChart from '@/views/interface/Charts/LatenciesChart'
  import BucketsChart from '@/views/interface/Charts/BucketsChart'
  import StatusCode from '@/views/interface/Charts/StatusCode'
  import {getEnvironmentGroup} from '@/api/environment'
  import {attackInterface,getAttackReport} from '@/api/interface'
  export default {
    components:{
      "v-LatenciesChart":LatenciesChart,
      "v-BucketsChart":BucketsChart,
      "v-StatusCode":StatusCode
    },
    data() {
      return {
        tableData: [],
        search: '',
        envGroupId:'',
        envGroupOptions:[],
        attack:{
          rate:30,
          duration:'1s',
          connections:10000,
          maxBody:-1,
          timeout:'30s'
        },
        interfaceAttack:{
          attack:{},
          item:[],
          envGroupId:'',
          menuId:''
        },
        loading:false,
        result:true,
        latenciesKeys:[],
        latenciesValues:[],
        bucketsKeys:[0],
        bucketsValues:[0],
        statusCodes:{},
        total:"",
        attackResult:{},
        bytesIn:"",
        bytesOut:"",
        errors:[],
        mean:"",
        qps:"",
      }
    },
    mounted() {
      //todo 后期要传入UserId ,不用用户展示不同的环境列表
      getEnvironmentGroup('1').then(response => {
        this.envGroupOptions = response.data
      })
    },
    methods: {
      send(){
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
          this.loading=false
        }else{
          this.interfaceAttack.attack=this.attack
          for (let i=0;i<this.tableData.length;i++){
            this.tableData[i].item.request.send=this.tableData[i].url
            this.interfaceAttack.item.push(this.tableData[i].item)
          }
          this.interfaceAttack.envGroupId=this.envGroupId
          this.interfaceAttack.menuId=this.tableData[0].id
          console.log(this.interfaceAttack)
          //发起攻击
          attackInterface(this.interfaceAttack).then(response => {
            getAttackReport(response.data.id).then(response=>{
              this.loading=false
              this.attackResult=response.data
              this.attackResult.duration=this.attackResult.duration/s+"s"
              this.bytesIn=this.attackResult.bytes_out.mean+"/"+this.attackResult.bytes_out.total
              this.bytesOut=this.attackResult.bytes_in.mean+"/"+this.attackResult.bytes_in.total
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
