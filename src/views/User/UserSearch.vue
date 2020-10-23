<template>
  <div id="page-user-list">
    <div class="vx-card p-6">
      <vx-card>
        <h4 class="mb-4">ค้นหาข้อมูล</h4>
        <div class="vx-row">
          <div class="vx-col md:w-2/5 w-full mt-2">
            <label>กรุณากรอก ชื่อ / นามสกุล / อีเมล์ / เบอร์โทรศัพท์</label>
            <vx-input-group class="mb-base">
              <vs-input
                class="mt-3"
                type="text"
                v-model="search_user"
                placeholder="กรอกข้อมูลเพื่อค้นหา"
              />
              <template slot="append"> </template>
            </vx-input-group>
          </div>
        </div>
        <div class="vx-row"></div>
        <!-- <vs-button color="primary" @click=" searchuser(search_user)">ค้นหา</vs-button> -->
      </vx-card>
      <div class="my-10 vx-card__header">
        <div class="vx-card__title">
          <h3>รายชื่อผู้ใช้</h3>

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
                  userData.length - currentPage * paginationPageSize > 0
                    ? currentPage * paginationPageSize
                    : userData.length
                }}
                of {{ userData.length }}</span
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
          placeholder="ค้นหา..."
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
        :rowData="userData"
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
/* eslint-disable vue/no-unused-components */
import {AgGridVue} from 'ag-grid-vue'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import CellRendererActions from './cell-renderer/CellRendererActions.vue'
import CellRendererRoles from './cell-renderer/CellRendererRoles.vue'

import axios from '../../axios'
import _ from 'lodash'

export default {
  components: {
    AgGridVue,
    CellRendererActions,
    CellRendererRoles
  },
  data () {
    return {
      search_user: '',
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
      columnDefs: require('./columnDefs'),

      userData: [],
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
        .get(`/search/user/${this.search_user}`)
        .then((response) => (this.userData = response.data))
      // this.gridApi = this.gridOptions.api
    }
  },
  watch: {
    search_user (newValue) {
      this.search_user = newValue
      this.debounceGetanswer()
    }
  },
  mounted () {
    this.gridApi = this.gridOptions.api

    if (window.innerWidth > 768) {
      this.gridApi.sizeColumnsToFit()
    }
  }
}
</script>

<style lang="scss" scoped>
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
