<template>
  <div id="page-user-list">
    <div class="vx-card p-6">
      <div class="vx-card__header">
        <div class="mb-10 vx-card__title">
          <h3>ข้อมูลงานวิ่ง</h3>
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
                  rowData.length - currentPage * paginationPageSize > 0
                    ? currentPage * paginationPageSize
                    : rowData.length
                }}
                of {{ rowData.length }}</span
              >
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4"/>
            </div>
            <vs-dropdown-menu>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(10)">
                <span>10</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                <span>20</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(30)">
                <span>30</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(40)">
                <span>40</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(50)">
                <span>50</span>
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
        <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()"
        >Export CSV
        </vs-button
        >
        <vs-button
          v-if="selectedRows.length > 0"
          color="success"
          class="mb-4 ml-2 md:mb-0"
          @click="bulkActions"
        >จัดการ {{ selectedRows.length }} แถว
        </vs-button
        >
      </div>

      <!-- AgGrid Table -->
      <ag-grid-vue
        ref="agGridTable"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :components="components"
        :gridOptions="gridOptions"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="rowData"
        rowSelection="multiple"
        colResizeDefault="shift"
        filter="true"
        pivotPanelShow="always"
        :animateRows="true"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
        :enableRtl="$vs.rtl"
      >
      </ag-grid-vue>

      <vs-pagination :total="totalPages" :max="7" v-model="currentPage"/>
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

export default {
  components: {
    AgGridVue,
    CellRendererActions,
    CellRendererRoles
  },
  data () {
    return {
      searchQuery: '',
      // AgGrid
      gridApi: null,
      gridOptions: {
        onSelectionChanged: this.onSelectionChanged
      },
      defaultColDef: {
        sortable: true,
        resizable: true,
        suppressMenu: false
      },
      columnDefs: require('./columnDefs'),
      rowData: [],
      components: '',
      selectedRows: []
    }
  },
  computed: {
    currentPage: {
      get () {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set (val) {
        this.gridApi.paginationGoToPage(val - 1)
      }
    },
    paginationPageSize () {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 10
    },
    totalPages () {
      if (this.gridApi) return this.gridApi.paginationGetTotalPages()
      else return 0
    }
  },
  mounted () {
    axios.get('/user').then(response => (this.rowData = response.data.data))
    this.gridApi = this.gridOptions.api
    this.gridApi.sizeColumnsToFit()
  },
  methods: {
    bulkActions () {
      this.selectedRows.forEach((row) => {

      })
    },
    onSelectionChanged () {
      this.selectedRows = this.gridApi.getSelectedRows()
    },
    updateSearchQuery (val) {
      this.gridApi.setQuickFilter(val)
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
