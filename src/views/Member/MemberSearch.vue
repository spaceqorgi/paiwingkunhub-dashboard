<template>
  <div id="page-user-list">
    <div class="vx-card p-6">
      <vx-card>
        <h4 class="mb-4">ค้นหาข้อมูล</h4>
        <div class="vx-row">
          <div class="vx-col md:w-2/5 w-full mt-2">
            <label>กรุณากรอก ยูสเซอร์เนม / เบอร์โทรศัพท์ / ชื่อ / นามสกุล / เลขบัญชี</label>
            <vx-input-group class="mb-base">
              <vs-input
                class="mt-3"
                type="text"
                v-model="searchmember"
                placeholder="กรอกข้อมูลเพื่อค้นหา"
              />
              <template slot="append"> </template>
            </vx-input-group>
          </div>
        </div>
        <div class="vx-row"></div>
        <!-- <vs-button color="primary" @click=" searchuser(searchmember)">ค้นหา</vs-button> -->
      </vx-card>
      <div class="vx-card__header">
        <div class="vx-card__title">
          <h4>User Account</h4>
          <br />
        </div>
      </div>
      <div class="flex flex-wrap items-center">
        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <div
              class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
            >
              <span class="mr-2"
                >{{
                  currentPage * paginationPageSize - (paginationPageSize - 1)
                }}
                -
                {{
                  memberData.length - currentPage * paginationPageSize > 0
                    ? currentPage * paginationPageSize
                    : memberData.length
                }}
                of {{ memberData.length }}</span
              >
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
        <vs-input
          class="sm:mr-4 mr-0 sm:w-auto w-full sm:order-normal order-3 sm:mt-0 mt-4"
          v-model="searchQuery"
          @input="updateSearchQuery"
          placeholder="Search..."
        />
        <!-- <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()">Export as CSV</vs-button> -->
      </div>

      <!-- AgGrid Table -->
      <ag-grid-vue
        ref="agGridTable"
        :components="components"
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="memberData"
        rowSelection="multiple"
        colResizeDefault="shift"
        :animateRows="true"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
        :enableRtl="$vs.rtl"
      >
      </ag-grid-vue>

      <vs-pagination :total="totalPages" :max="7" v-model="currentPage" />
    </div>
  </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import vSelect from 'vue-select'

// Cell Renderer
import CellRendererVerified from './cell-renderer/CellRendererVerified.vue'
import CellRendererActions from './cell-renderer/CellRendererActions.vue'

import axios from '../../axios'
import _ from 'lodash'

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
      searchmember: '',
      awaitingSearch: false,
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
          headerName: 'Username',
          field: 'member_username',
          filter: true
        },
        {
          headerName: 'Phone',
          field: 'member_phone',
          filter: true
        },
        {
          headerName: 'Bank Account',
          field: 'member_bank_number',
          filter: true
        },
        {
          headerName: 'Name',
          field: 'member_name',
          filter: true
        },
        {
          headerName: 'Surname',
          field: 'member_surname',
          filter: true
        },
        {
          headerName: 'Status',
          field: 'member_locked',
          filter: true,
          cellRendererFramework: 'CellRendererVerified'
        },
        {
          headerName: 'Actions',
          field: 'member_username',
          width: 400,
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
  created () {
    this.debounceGetanswer = _.debounce(this.searchuser, 700)
  },
  methods: {
    updateSearchQuery (val) {
      this.gridApi.setQuickFilter(val)
    },
    searchuser () {
      axios
        .get(`member/searchmember/${this.searchmember}`)
        .then((response) => (this.memberData = response.data))
      // this.gridApi = this.gridOptions.api
    }
  },
  watch: {
    searchmember (newValue) {
      this.searchmember = newValue
      this.debounceGetanswer()

      // this.searchuser()
    }
  },
  mounted () {
    // axios
    //   .get('/member')
    //   .then(response => (this.memberData = response.data))

    this.gridApi = this.gridOptions.api

    if (window.innerWidth > 768) {
      this.gridApi.sizeColumnsToFit()
    }
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
