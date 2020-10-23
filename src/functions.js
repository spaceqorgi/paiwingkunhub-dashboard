import * as dayjs from 'dayjs'

export function formatDate (date) {
  return dayjs(date).format('DD/MM/YYYY')
}

export function formatDateTime (date) {
  return dayjs(date).format('DD/MM/YYYY HH:mm:ss')
}
