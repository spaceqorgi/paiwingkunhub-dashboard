<template>
  <div><feather-icon icon="CircleIcon" :svgClasses="['fill-current h-4 w-4', textColor]" /> {{ textValue }}</div>
</template>

<script>
export default {
  name: 'CellRendererVerified',
  computed: {
    textColor () {
      switch (this.params.value) {
      case 0:
        return ''
      case 1:
        return 'text-success'
      case 2:
        return 'text-warning'
      case 3:
        return 'text-danger'
      default: return ''
      }
    },
    textValue () {
      switch (this.params.value) {
      case 0: return 'ผู้ใชัทั่วไป'
      case 1: return 'ผู้จัด'
      case 2: return 'สตาฟ'
      case 3: return 'แอดมิน'
      default: return 'ผู้ใชัทั่วไป'
      }
    }
  }
}
</script>
