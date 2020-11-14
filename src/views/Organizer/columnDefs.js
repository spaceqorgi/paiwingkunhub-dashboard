const columnDefs = [
  {
    headerName: 'รหัส',
    field: 'organizer_id',
    filter: true,
    width: 150,
    sort: 'asc'
  },
  {
    headerName: 'ชื่อผู้จัด',
    field: 'organizer_name',
    filter: true
  },
  {
    headerName: 'เว็บไซต์ผู้จัด',
    field: 'organizer_website',
    filter: true
  },
  {
    headerName: 'โซเชียลมีเดีย',
    field: 'organizer_social',
    filter: true
  },
  {
    headerName: 'อีเมล',
    field: 'organizer_email',
    filter: true
  },
  {
    headerName: 'โทรศัพท์',
    field: 'organizer_phone',
    filter: true
  },
  {
    headerName: 'จัดการ',
    field: 'organizer_id',
    width: 400,
    cellRendererFramework: 'CellRendererActions'
  }
]

module.exports = columnDefs
