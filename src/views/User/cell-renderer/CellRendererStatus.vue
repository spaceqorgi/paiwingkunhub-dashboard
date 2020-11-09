<template>
  <div><feather-icon icon="CircleIcon" :svgClasses="['fill-current h-4 w-4', textColor]" /> {{ status }}</div>
</template>

<script>
export default {
  name: 'CellRendererRoles',
  computed: {
    textColor () {
      return this.params.value ? 'text-success' : 'text-danger'
    },
    status () {
      return this.params.value ? 'ปกติ' : 'ระงับ'
    }
  }
}
</script>
