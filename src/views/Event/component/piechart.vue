<template>
  <div>
    <p>{{ url }}</p>
    <e-charts autoresize :options="pie" ref="pie" auto-resize />
  </div>
</template>

<script>
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/pie'

export default {
  props: ['url'],
  data () {
    return {
      pie: {
        tooltip: {
          trigger: 'item',
          formatter: '{b} {c} คน ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['ชาย', 'หญิง', 'เกย์']
        },
        series: [
          {
            name: 'เพศ',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 45, name: 'ชาย' },
              { value: 25, name: 'หญิง' },
              { value: 25, name: 'เกย์' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  components: {
    ECharts
  },
  mounted () {
    /*     let dataIndex = -1
    const pie = this.$refs.pie
    const dataLen = pie.options.series[0].data.length
    setInterval(() => {
      pie.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex
      })
      dataIndex = (dataIndex + 1) % dataLen
      pie.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex
      })
      pie.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex
      })
    }, 1000) */
  }
}
</script>
