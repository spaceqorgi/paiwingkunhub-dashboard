<template>

  <div>
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="vx-card mb-base">
          <div class="vx-card__header">
            <div class="vx-card__title">
              <h4 class="">ประวัติแนะนำเพื่อนขั้น 1</h4>
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
                :defaultColDef="defaultColDef" :rowData="memberData" rowSelection="multiple" colResizeDefault="shift"
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
          headerName: 'ลำดับ',
          filter: true,
          width: 250,
          cellRenderer (params) {
            return parseFloat(params.node.id) + 1 
          }
        },
        {
          headerName: 'ชื่อผู้ใช้',
          field: 'member_username',
          filter: true,
          cellRenderer: (params) => {
            const link = document.createElement('a')
            link.innerText = params.value
            link.addEventListener('click', e => {
              e.preventDefault()
              this.$router.push(`/user/${params.value}`)
              setTimeout(() => { window.location.reload() }, 100)
            })
            return link
          }
        },
        {
          headerName: 'วัน / เวลาที่สมัคร',
          field: 'member_register_date',
          filter: true,
          cellRenderer (params) {
            return moment(params.value).format('YYYY-MM-DD HH:mm:ss')
          }
 
        },
        {
          headerName: 'สถานะ',
          field: 'member_level',
          filter: true,
          cellRenderer (params) {
            return (params.value === 0 ? 'ยังไม่ได้เติมเงิน' : '<span class="text-success">เติมเงินแล้ว</span>')
          }
        }
      ],
      memberData: []
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
      .get(`/user/${  this.$route.params.username}/aff`)
      .then(response => (this.memberData = response.data))
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
