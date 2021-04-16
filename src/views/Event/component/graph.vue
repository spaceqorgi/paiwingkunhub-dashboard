<template>
  <vx-card title="กราฟข้อมูล" no-shadow>
    <div class="">
      <vue-tabs>
        <v-tab title="จำนวนผู้สมัคร">
          <piechart
            class="my-3"
            :url="`/chart/event/${$route.params.id}/gender`"
          />
        </v-tab>

        <v-tab title="อายุ">
          <piechart
            class="my-3"
            :url="`/chart/event/${$route.params.id}/age`"
          />
        </v-tab>

        <v-tab v-for="product in rowData" :key="product.id" :title="product.name">
          <product-piechart
            class="my-3"
            :url="`/chart/event/${$route.params.id}/product/${product.id}`"
          />
        </v-tab>
      </vue-tabs>
    </div>
    <!-- {{ rowData }}
    <p>===============================</p>
    {{ participatorData }} -->
  </vx-card>
</template>

<script>
import axios from '../../../axios'
import { formatDate, formatPhoneNumber } from '@/functions'
import store from '@/store/store.js'
//local registration
import { VueTabs, VTab } from 'vue-nav-tabs'
//you can also import this in your style tag
import 'vue-nav-tabs/themes/vue-tabs.css'
import Piechart from './piechart.vue'
import ProductPiechart from './productPieChart.vue'

export default {
  data () {
    return {
      rowData: {},
      participatorData: {},
      AppActiveUser: store.state.AppActiveUser
    }
  },
  components: {
    VueTabs,
    VTab,
    Piechart,
    ProductPiechart
  },
  computed: {
    imgSrc () {
      return `${process.env.VUE_APP_BASE_URL}/file${this.rowData.event_pic_path}`
    },
    pickupTypeSupport () {
      const pickup = this.rowData.pickup_type
      switch (pickup) {
      case 0:
        return 'รับหน้างาน'
      case 1:
        return 'ส่งไปรษณีย์'
      default:
        return 'รับหน้างาน และส่งไปรษณีย์'
      }
    }
  },
  async mounted () {
    await this.getProducts()
    await this.getParticipators()
  },
  methods: {
    async getProducts () {
      await axios
        .get(`/event/${this.$route.params.id}/product`, {
          params: {
            is_shown_on_graph: true
          }
        })
        .then((response) => (this.rowData = response.data.data.products))
    },
    async getParticipators () {
      await axios
        .get(`/event/${this.$route.params.id}/participator`, {
          params: {
            get_products: 1
          }
        })
        .then((response) => (this.participatorData = response.data.data))
    },
    formatDate (date) {
      const newDate = formatDate(date)
      if (newDate === 'Invalid Date') return '-'
      else return newDate
    },
    formatPhone (phone) {
      return formatPhoneNumber(phone)
    }
  }
}
</script>
<style scoped>
p {
  margin-bottom: 0.8rem;
}

img {
  border-radius: 2%;
  box-shadow: 2px 2px 5px #00000055;
}
</style>

