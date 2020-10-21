const columnDefs = [
  {
    headerName: 'อีเมลล์',
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
    headerName: 'เบอร์โทรศัพท์',
    field: 'phone',
    filter: true
  },
  {
    headerName: 'ประเภท',
    field: 'role',
    filter: true,
    cellRendererFramework: 'CellRendererRoles'
  },
  {
    headerName: 'จัดการ',
    field: 'id',
    width: 400,
    cellRendererFramework: 'CellRendererActions'
  }
]

module.exports = columnDefs
