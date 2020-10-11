<template>


  <div id="page-user-list">
    <div class="vx-row">

      <div class="vx-col w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3">
        <statistics-card-line hideChart class="mb-base" icon="UserIcon" icon-right statistic="ชื่อบัญชี"
          :statisticTitle="profile.full_name" color="success" />
      </div>

      <div class="vx-col w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3">
        <statistics-card-line hideChart class="mb-base" icon="ListIcon" icon-right statistic="เลขบัญชี"
          :statisticTitle="profile.bank_number" color="success" />
      </div>
      

      <div class="vx-col w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3">
        <statistics-card-line hideChart class="mb-base" icon="DollarSignIcon" icon-right statistic="ยอดเงินออก"
          :statisticTitle="profile.sum_withdraw" color="danger" />
      </div>

     
    </div>
    <div class="vx-card p-6">
      <div class="flex flex-wrap items-center">

        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          {{checkusebank}}
          <!-- COMPUTED STORE CHECK USE BANK  DO NOT DELETE BY LILSHARK-->
          <div class="vx-card__title">
            <h4>เลือกวันที่</h4>
            <br>
          </div>
          <flat-pickr v-model="date" />
          <p class="mt-4">Selected Date: {{ date }}</p>
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <br>
            
            <div
              class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">

              <span class="mr-1">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} -
                {{ memberData.length - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : memberData.length }}
                of {{ memberData.length }}</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>
            <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
            <vs-dropdown-menu>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(10)">
                <span>10</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                <span>20</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(25)">
                <span>25</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(30)">
                <span>30</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
            <br>
          </vs-dropdown>

        </div>
         

        <!-- TABLE ACTION COL-2: SEARCH & EXPORT AS CSV -->
        <vs-input class="sm:mr-4 mr-0 sm:w-auto w-full sm:order-normal order-3 sm:mt-0 mt-4" v-model="searchQuery"
          @input="updateSearchQuery" placeholder="Search..." />
        <!-- <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()">Export as CSV</vs-button> -->

      </div>


      <!-- AgGrid Table -->
      <ag-grid-vue ref="agGridTable" :components="components" :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table" :columnDefs="columnDefs" :defaultColDef="defaultColDef"
        :rowData="memberData" rowSelection="multiple" colResizeDefault="shift" :animateRows="true" :pagination="true"
        :paginationPageSize="paginationPageSize" :suppressPaginationPanel="true" :enableRtl="$vs.rtl">
      </ag-grid-vue>

      <vs-pagination :total="totalPages" :max="7" v-model="currentPage" />

    </div>
  </div>

</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import {
  AgGridVue
} from 'ag-grid-vue'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import vSelect from 'vue-select'
import CellRendererActions from './cell-renderer/CellRendererActions.vue'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'

import axios from '../../axios'

import moment from 'moment'
import store from '../../store/store'


export default {
  components: {
    AgGridVue,
    vSelect,
    flatPickr,
    CellRendererActions,
    StatisticsCardLine
  },
  data () {
    return {
      date: moment.tz('Asia/Bangkok').format('YYYY-MM-DD'),
      listdata: [],
      status:'',
      profile: {
        full_name: '',
        bank_number: '',
        sum_deposit: '',
        sum_withdraw: '',
        balance: ''
      },
      events: ['onChange'],
      config: {},
      searchQuery: '',
      // AgGrid
      gridApi: null,
      gridOptions: {},
      defaultColDef: {
        sortable: true,
        resizable: true,
        suppressMenu: true
      },
      columnDefs: [
        {
          headerName: 'วัน/เวลา',
          field: 'trans_datetime',
          cellRenderer (params) {
            return moment(params.value).format('YYYY-MM-DD HH:mm:ss')
          },
          width: 210
        },
        {
          headerName: 'ช่องทาง',
          field: 'trans_type',
          filter: true,
          width: 100
        },
        {
          headerName: 'ยอดเงิน',
          field: 'trans_amount',
          filter: true,
          width: 110

        },
        {
          headerName: 'ข้อมูล',
          field: 'trans_info',
          filter: true,
          width: 200
        }
      ],
      memberData: [],
      components: ''
    }
  },
  computed: {
    paginationPageSize () {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 10
    },
    totalPages () {
      if (this.gridApi) return this.gridApi.paginationGetTotalPages()
      else return 0
    },
    currentPage: {
      get () {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set (val) {
        this.gridApi.paginationGoToPage(val - 1)
      }
    },
    checkusebank () {
      if (this.$store.state.StatusBank.status === true) {
        this.selectdate()
        store.commit('SET_STATUS_USEBANK', false)
      }
      return ''
    }
  },
  watch: {
    date (newValue) {
      this.date = newValue
      this.selectdate()
    }
  },
  async mounted () {
    this.gridApi = this.gridOptions.api
    if (window.innerWidth > 768) {
      this.gridApi.sizeColumnsToFit()
    }
    await this.selectdate()
  },
  methods: {
    currency (amount) {
      if (amount >= 0) {
        if (typeof amount === 'number') {
          amount = String(Math.abs(amount))
        }
        return (amount).replace(/\d(?=(\d{3})+\.)/g, '$&,')
      } else {
        return `${(amount).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
      }
      
    },
    
    updateSearchQuery (val) {
      this.gridApi.setQuickFilter(val)
    },
    async white () {
      await axios
        .post('bank/white', {
          bank: this.$route.params.bank,
          id: this.$route.params.id
        })
        .then(response => (this.status = response.data))
      if (this.status.status === true) {
        this.$vs.notify({
          time: 3000,
          color: 'success',
          position: 'top-right',
          icon: 'check_box',
          title: this.status.info
        })
      } else {
        this.$vs.notify({
          time: 8000,
          color: 'danger',
          position: 'top-right',
          icon: 'error',
          title: 'แก้ไขยอดขาวไม่สำเร็จ',
          text: this.status.info
        })
      }
    },
    async red () {
      await axios
        .post('bank/red', {
          bank: this.$route.params.bank,
          id: this.$route.params.id
        })
        .then(response => (this.status = response.data))
      if (this.status.status === true) {
        this.$vs.notify({
          time: 3000,
          color: 'success',
          position: 'top-right',
          icon: 'check_box',
          title: this.status.info
        })
      } else {
        this.$vs.notify({
          time: 8000,
          color: 'danger',
          position: 'top-right',
          icon: 'error',
          title: 'แก้ไขยอดแดงไม่สำเร็จ',
          text: this.status.info
        })
      }
    },
    async selectdate () {
      await axios
        .get(
          `bank/listout/${this.$route.params.bank}/${this.$route.params.id}/${this.$route.params.bankfor}/${this.date}`
        )
        .then(response => (this.memberData = response.data))
      this.gridApi = this.gridOptions.api
      // this.gridApi = this.gridOptions.api
      await axios
        .get(
          `bank/list/profile/${this.$route.params.bank}/${this.$route.params.id}/${this.$route.params.bankfor}/${this.date}`
        )
        .then(response => (this.listdata = response.data))
      this.profile.full_name = this.listdata.fullname
      this.profile.bank_number = this.currency(this.listdata.bank_number)
      this.profile.sum_deposit = this.currency(this.listdata.sum_deposit)
      this.profile.sum_withdraw = this.currency(this.listdata.sum_withdraw)
      this.profile.balance = this.currency(this.listdata.balance)
    }

  }
}

</script>
