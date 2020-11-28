<template>
  <div><feather-icon icon="CircleIcon" :svgClasses="['fill-current h-4 w-4', textColor]" /> {{ status }}</div>
</template>

<script>
export default {
  name: 'CellRendererStatus',
  computed: {
    textColor () {
      return this.params.value ? 'text-primary' : ''
    },
    status () {
      return this.params.value ? 'ยืนยันแล้ว' : 'ยังไม่ยืนยัน'
    }
  }
}
</script>
