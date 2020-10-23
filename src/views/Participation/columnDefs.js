const columnDefs = [
  {
    headerName: 'ชื่องาน',
    field: 'name',
    filter: true
  },
  {
    headerName: 'คำอธิบาย',
    field: 'description',
    filter: true
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
    headerName: 'จัดการ',
    field: 'id',
    width: 400,
    cellRendererFramework: 'CellRendererActions'
  }
]

module.exports = columnDefs
