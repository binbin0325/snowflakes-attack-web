<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '300px'
      },
      statusCodes:{
        type:Object
      },

    },
    data() {
      return {
        chart: null,
        statusCodesKey:[],
        statusCodesData:[{
          key:0,
          value:0,
        }]
      }
    },
    mounted() {
      for (var key in this.statusCodes) {
        if(key ==0){
          this.statusCodesKey.push(408)  //如果状态码返回为0,将0改为408
          var obj={'name':408,'value':this.statusCodes[key]}
          this.statusCodesData.push(obj)
        }else {
          this.statusCodesKey.push(key)
          var obj={'name':key,'value':this.statusCodes[key]}
          this.statusCodesData.push(obj)
        }
      }
      console.log(this.statusCodesData)
      this.$nextTick(() => {
        this.initChart()
      })
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')

        this.chart.setOption({
          title : {
            text: 'Status Code',
            subtext: 'Interface returns a result state classification count.',
            x:'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data:this.statusCodesKey
          },
          series: [
            {
              name:'访问来源',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:this.statusCodesData
            }
          ]
        })
      }
    }
  }
</script>
