<template>
  <div>
    <p>{{ url }}</p>
    <div v-for="pie in chartList" :key="pie.id">
    <e-charts autoresize :options="pie.data" ref="pie" auto-resize />
    {{ pie.data }}
    </div>
    {{ chartList }}
  </div>
</template>

<script>
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/pie'

import axios from '../../../axios'

export default {
  props: ['url'],
  data () {
    return {
      chartList: []
    }
  },
  components: {
    ECharts
  },
  async mounted () {
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
    await this.getData()
  },
  methods: {
    async getData () {
      return await axios
        .get(this.url)
        .then((response) => (this.chartList = response.data))
    }
  }
}
</script>
