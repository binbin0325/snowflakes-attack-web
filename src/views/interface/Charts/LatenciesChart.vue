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
      latenciesValues:{
        type:Array
      },
      latenciesKeys:{
        type:Array
      },
    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {
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
          color: ['#3398DB'],
          title:{
            text:"Latency",
            subtext: 'Latency is the amount of time taken for a response to a request to be read (including the -max-body bytes from the response body).'
          },
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : this.latenciesKeys,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis : [
            {
              type : 'value',
              axisLabel: {
                formatter: '{value} s'
              }
            }
          ],
          series : [
            {
              name:'响应时间',
              type:'bar',
              barWidth: '60%',
              data:this.latenciesValues
            }
          ]
        })
      }
    }
  }
</script>
