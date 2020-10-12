<template>

  <div>
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="vx-card mb-base">
          <div class="vx-card__header">
            <div class="vx-card__title">
              <h4 class="">ประวัติถอนเงิน 2 เดือนล่าสุด</h4>
              <!---->
            </div>
            <!---->
            <vs-input class="sm:mr-4 mr-0 sm:w-auto w-full sm:order-normal order-3 sm:mt-0 mt-4" v-model="searchQuery"
          @input="updateSearchQuery" placeholder="Search..." />
          </div>
          <div class="vx-card__collapsible-content vs-con-loading__container">
            <div class="vx-card__body">
              <!-- AgGrid Table -->
              <ag-grid-vue ref="agGridTable" :gridOptions="gridOptions"
                class="ag-theme-material w-100 my-4 ag-grid-table" :columnDefs="columnDefs"
                :defaultColDef="defaultColDef" :rowData="userData" rowSelection="multiple" colResizeDefault="shift"
                :animateRows="true" :pagination="true" :paginationPageSize="paginationPageSize"
                :suppressPaginationPanel="true" :enableRtl="$vs.rtl">
              </ag-grid-vue>

              <vs-pagination :total="totalPages" :max="7" v-model="currentPage" />
            </div>
            <!---->
          </div>

        </div>
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

import axios from '../../../axios'
import moment from 'moment'
function currencyFormatter (params) {
  return (params.value).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}
function check_status (params) {
  if (params.data.wd_status === 0) {
    return 'กำลังรอทำรายการ'
  } else if (params.data.wd_status === 1) {
    return 'ทำรายการสำเร็จ'
  } else if (params.data.wd_status === 2) {
    return 'คืนเครดิต'
  } else if (params.data.wd_status === 3) {
    return 'ยกเลิกการถอนเงิน'
  } else if (params.data.wd_status === 4) {
    return 'ทำรายการไม่สำเร็จ'
  }
}
function status_color (params) {
  if (params.data.wd_status === 1) {
    return {color: 'green'}
  } else if (params.data.wd_status === 3) {
    return {color: 'orange'}
  } else if (params.data.wd_status === 4) {
    return {color: 'red'}
  }
}
export default {
  components: {
    AgGridVue,
    vSelect
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
          headerName: 'วัน / เวลา',
          field: 'wd_datetime',
          filter: true,
          width: 250,
          cellRenderer (params) {
            return moment(params.value).format('YYYY-MM-DD HH:mm:ss')
          }
        },
        {
          headerName: 'จำนวนเงิน',
          field: 'wd_amount',
          filter: true,
          valueFormatter: currencyFormatter
        },
        {
          headerName: 'ข้อมูล',
          field: 'wd_info',
          filter: true
        },
        {
          headerName: 'สถานะ',
          field: 'wd_status',
          filter: true,
          valueGetter: check_status,
          cellStyle: status_color
        },
        {
          headerName: 'วัน/เวลา ดำเนินการ',
          field: 'wd_transtime',
          filter: true,
          cellRenderer (params) {
            return moment(params.value).format('YYYY-MM-DD HH:mm:ss')
          }
        }
      ],
      userData: []
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
    }
  },
  methods: {
    updateSearchQuery (val) {
      this.gridApi.setQuickFilter(val)
    }
  },
  mounted () {
    axios
      .get(`/user/${  this.$route.params.username}/withdraw`)
      .then(response => (this.userData = response.data))
    this.gridApi = this.gridOptions.api
    this.gridApi.sizeColumnsToFit()
  }
}

</script>

<style lang="scss" scooped>
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
