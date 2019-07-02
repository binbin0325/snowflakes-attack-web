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
      bucketsKeys:{
        type:Array
      },
      bucketsValues:{
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
          title : {
            text: 'Bucket',
            subtext: 'The values are counts of how many requests fell into that particular bucket.',
            x:'left'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            feature: {
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          xAxis: [
            {
              type: 'category',
              data: this.bucketsKeys,
              axisPointer: {
                type: 'shadow'
              },
              axisLabel: {
                formatter: '{value} s'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: ''
            }
          ],
          series: [
            {
              name:'Request counts',
              type:'bar',
              data:this.bucketsValues
            },
            {
              name:'Request counts',
              type:'line',
              yAxisIndex: 0,
              data:this.bucketsValues
            }
          ]
        })
      }
    }
  }
</script>
