const columnDefs = [
  {
    headerName: 'รหัส',
    field: 'id',
    filter: true,
    width: 150,
    sort: 'asc'
  },
  {
    headerName: 'ธนาคาร',
    field: 'payment_bank',
    filter: true
  },
  {
    headerName: 'ชื่อบัญชี',
    field: 'payment_account_name',
    filter: true
  },
  {
    headerName: 'เลขบัญชี',
    field: 'payment_account_number',
    filter: true
  },
  {
    headerName: 'สาขา',
    field: 'payment_branch',
    filter: true
  },
  {
    headerName: 'แสดงหน้าเว็บ',
    field: 'is_shown',
    filter: true,
    cellRendererFramework: 'CellRendererPublished'
  },
  {
    headerName: 'จัดการ',
    field: 'id',
    width: 400,
    cellRendererFramework: 'CellRendererActions'
  }
]

module.exports = columnDefs
