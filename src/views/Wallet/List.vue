<template>

  <div>
    {{checkusewallet}}
    <!-- COMPUTED STORE CHECK USE TRUEWALLET  DO NOT DELETE BY LILSHARK-->
    <div class="vx-card p-6 text-center" v-if="check_login">
      <h3> {{listdata[1].error.title}} {{listdata[1].error.message}} </h3>
    </div>

    <div v-else>

      <div class="vx-row">

        <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
          <statistics-card-line hideChart class="mb-base" icon="PhoneIcon" icon-right :statistic="profile.mobile_number"
            statisticTitle="Phone" />
        </div>

        <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
          <statistics-card-line hideChart class="mb-base" icon="UserIcon" icon-right :statistic="profile.full_name"
            statisticTitle="Name" color="success" />
        </div>

        <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
          <statistics-card-line hideChart class="mb-base" icon="MailIcon" icon-right :statistic="profile.email"
            statisticTitle="E-mail" color="danger" />
        </div>

        <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
          <statistics-card-line hideChart class="mb-base" icon="DollarSignIcon" icon-right
            :statistic="profile.current_balance" statisticTitle="Balance" color="warning" />
        </div>
      </div>

      <div class="vx-card p-6" id="page-user-list">
        <div class="vx-card__header">
          <div class="vx-card__title">
            <h4>ข้อมูล Wallet</h4>
          </div>
        </div>
        <br>
        <flat-pickr v-model="start_date" />
        <p class="mt-4">Selected Date: {{ start_date }}</p>

        <div class="flex flex-wrap items-center">

          <!-- ITEMS PER PAGE -->
          <div class="flex-grow">
            <vs-dropdown vs-trigger-click class="cursor-pointer">
              <div
                class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} -
                  {{ listtruewallet.length - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : listtruewallet.length }}
                  of {{ listtruewallet.length }}</span>
                <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
              </div>
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
          :rowData="listtruewallet" rowSelection="multiple" colResizeDefault="shift" :animateRows="true"
          :pagination="true" :paginationPageSize="paginationPageSize" :suppressPaginationPanel="true"
          :enableRtl="$vs.rtl">
        </ag-grid-vue>

        <vs-pagination :total="totalPages" :max="7" v-model="currentPage" />

      </div>
    </div>
  </div>

</template>

<script>
import {
  AgGridVue
} from 'ag-grid-vue'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

// Cell Renderer
import CellRendererLink from './cell-renderer/CellRendererLink.vue'
import CellRendererStatus from './cell-renderer/CellRendererStatus.vue'
import CellRendererVerified from './cell-renderer/CellRendererVerified.vue'
import CellRendererActions from './cell-renderer/CellRendererActions.vue'

import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'

import axios from '../../axios'
import store from '../../store/store'

function check_user (params) {
  if ('used_by' in params.data) {
    return params.data.used_by
  } else {
    return ''
  }
}

export default {
  components: {
    AgGridVue,
    vSelect,

    // Cell Renderer
    CellRendererLink,
    CellRendererStatus,
    CellRendererVerified,
    CellRendererActions,

    //Date picker
    flatPickr,
    StatisticsCardLine
  },
  data () {
    return {
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
          field: 'date_time',
          filter: true,
          width: 150
        },
        {
          headerName: 'ช่องทาง',
          field: 'title',
          filter: true,
          width: 250
        },
        {
          headerName: 'เบอร์โทร',
          field: 'sub_title',
          filter: true,
          width: 250
        },
        {
          headerName: 'ยอดเงิน',
          field: 'amount',
          filter: true,
          width: 250
        },
        {
          headerName: 'สถานะ',
          field: 'check_use',
          // valueGetter: check_use,
          cellRendererFramework: 'CellRendererActions',
          filter: true,
          width: 200
        },
        {
          headerName: 'ยูสเซอร์เนม',
          field: 'used_by',
          filter: true,
          width: 125,
          valueGetter: check_user,
          cellRenderer: (params) => {
            const link = document.createElement('a')
            link.innerText = params.value
            link.addEventListener('click', e => {
              e.preventDefault()
              this.$router.push(`/member/${params.value}`)
            //window.open(`/member/${params.value}`, '_blank')
            })
            return link
          }
        }
      ],

      // Cell Renderer Components
      components: {},
      listdata: [],
      listtruewallet: [],
      profile: {
        mobile_number: '',
        full_name: '',
        email: '',
        current_balance: ''
      },
      start_date: this.moment().format('YYYY-MM-DD'),
      check_login: false
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
    checkusewallet () {
      if (this.$store.state.StatusTruewallet.status === true) {
        this.select_date()
        store.commit('SET_STATUS_USEWALLET', false)
      }
      return ''
    }
  },
  async mounted () {
    this.gridApi = this.gridOptions.api
    this.gridApi.sizeColumnsToFit()
    if (this.$vs.rtl) {
      const header = this.$refs.agGridTable.$el.querySelector('.ag-header-container')
      header.style.left = `-${  String(Number(header.style.transform.slice(11, -3)) + 9)  }px`
    }
    await this.select_date()

  },
  methods: {
    updateSearchQuery (val) {
      this.gridApi.setQuickFilter(val)
    },
    async select_date () {
      await axios.post('wallet/listdata', {
        wallet_no: this.$route.params.id,
        start_date: this.start_date
      })
        .then(response => (this.listdata = response.data))
      if ('error' in this.listdata[1]) {
        this.check_login = true
      } else {
        this.listtruewallet = this.listdata[0]
        this.check_login = false
        this.profile.mobile_number = this.listdata[1].data.mobile_number
        this.profile.full_name = this.listdata[1].data.full_name
        this.profile.email = this.listdata[1].data.email
        this.profile.current_balance = this.listdata[2].data.current_balance
      }
      //console.log('this.listdata.length ', this.listdata[0].length)
    }
  },
  watch: {
    async start_date (newValue) {
      this.start_date = newValue
      await this.select_date()
    }
  }
}

</script>

<style lang="scss">
  #page-user-list {
    .user-list-filters {
      .vs__actions {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-58%);
      }
    }
  }

  div.ag-root .ag-cell-focus {
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }

</style>
