const columnDefs = [
  {
    headerName: 'รหัส',
    field: 'id',
    filter: true,
    width: 150,
    sort: 'asc'
  },
  {
    headerName: 'ชื่องาน',
    field: 'name',
    filter: true,
    width: 300
  },
  {
    headerName: 'ผู้จัด',
    field: 'organizer_name',
    filter: true
  },
  {
    headerName: 'สถานที่จัด',
    field: 'location',
    filter: true
  },
  {
    headerName: 'เว็บไซต์',
    field: 'website',
    filter: true
  },
  {
    headerName: 'แสดงในเว็บไซต์',
    field: 'is_published',
    filter: false,
    cellRendererFramework: 'CellRendererPublished'
  },
  {
    headerName: 'จัดการ',
    field: 'id',
    width: 400,
    filter: false,
    cellRendererFramework: 'CellRendererActions'
  }
]

module.exports = columnDefs
