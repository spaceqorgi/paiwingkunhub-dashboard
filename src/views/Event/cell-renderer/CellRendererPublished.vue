<template>
  <div><feather-icon icon="CircleIcon" :svgClasses="['fill-current h-4 w-4', textColor]" /> {{ status }}</div>
</template>

<script>
export default {
  name: 'CellRendererPublished',
  computed: {
    textColor () {
      return this.params.value ? 'text-success' : ''
    },
    status () {
      return this.params.value ? 'แสดง' : 'ไม่แสดง'
    }
  }
}
</script>
