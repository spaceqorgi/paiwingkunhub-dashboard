<template>
  <div>
    <feather-icon icon="CircleIcon" :svgClasses="['fill-current h-4 w-4', textColor]" /> {{ textValue }}
  </div>
</template>

<script>
export default {
  name: 'CellRendererVerified',
  computed: {
    textColor () {
      return this.params.value ? 'text-success' : ''
    },
    textValue () {
      // TODO: Multiple role 0 1 2 3
      return this.params.value > 0 ? 'แอดมิน' : 'ผู้ใชัทั่วไป'
    }
  }
}

</script>
