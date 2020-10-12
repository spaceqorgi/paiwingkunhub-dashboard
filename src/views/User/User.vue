<template>

  <div id="page-user-list">
    <div class="vx-card p-6">
      <div class="vx-card__header">
        <div class="vx-card__title">
          <h4>User Account</h4>
          <br>
        </div>
      </div>
      <div class="flex flex-wrap items-center">

        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <div
              class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
              <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} -
                {{ userData.length - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : userData.length }}
                of {{ userData.length }}</span>
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
          </vs-dropdown>
        </div>

        <!-- TABLE ACTION COL-2: SEARCH & EXPORT AS CSV -->
        <vs-input class="sm:mr-4 mr-0 sm:w-auto w-full sm:order-normal order-3 sm:mt-0 mt-4" v-model="searchQuery"
          @input="updateSearchQuery" placeholder="Search..." />
        <!-- <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()">Export as CSV</vs-button> -->

      </div>


      <!-- AgGrid Table -->
      <ag-grid-vue ref="agGridTable"
      :components="components"
      :gridOptions="gridOptions"
      class="ag-theme-material w-100 my-4 ag-grid-table" 
      :columnDefs="columnDefs" :defaultColDef="defaultColDef"
      :rowData="memberData" 
      rowSelection="multiple" 
      colResizeDefault="shift" 
      :animateRows="true" 
      :pagination="true"
      :paginationPageSize="paginationPageSize" 
      :suppressPaginationPanel="true" 
      :enableRtl="$vs.rtl">
      </ag-grid-vue>

      <vs-pagination :total="totalPages" :max="7" v-model="currentPage" />

    </div>
  </div>

</template>

<script>
import {
  AgGridVue
} from 'ag-grid-vue'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import vSelect from 'vue-select'

// Cell Renderer
import CellRendererVerified from './cell-renderer/CellRendererVerified.vue'
import CellRendererActions from './cell-renderer/CellRendererActions.vue'

import axios from '../../axios'


export default {
  components: {
    AgGridVue,
    vSelect,

    // Cell Renderer
    CellRendererVerified,
    CellRendererActions
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
          headerName: 'ชื่อผู้ใช้',
          field: 'username',
          filter: true
        },
        {
          headerName: 'ชื่อ',
          field: 'first_name',
          filter: true
        },
        {
          headerName: 'นามสกุล',
          field: 'last_name',
          filter: true
        },
        {
          headerName: 'ที่อยู่',
          field: 'address',
          filter: true
        },
        {
          headerName: 'ประเภท',
          field: 'role',
          filter: true
        },
        // {
        //   headerName: 'สถานะ',
        //   field: 'status',
        //   filter: true,
        //   cellRendererFramework: 'CellRendererVerified'
        // },
        {
          headerName: 'จัดการ',
          field: 'username',
          width:400,
          cellRendererFramework: 'CellRendererActions'
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
    }
  },
  methods: {
    updateSearchQuery (val) {
      this.gridApi.setQuickFilter(val)
    }
  },
  mounted () {
    axios
      .get('/user')
      .then(response => (this.memberData = response.data.data))

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