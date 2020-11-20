const columnDefs = [
  {
    headerName: 'รหัส',
    field: 'id',
    filter: true,
    width: 150,
    sort: 'asc'
  },
  {
    headerName: 'อีเมล',
    field: 'username',
    filter: true
  },
  {
    headerName: 'ประเภท',
    field: 'role',
    filter: false,
    cellRendererFramework: 'CellRendererRoles'
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
