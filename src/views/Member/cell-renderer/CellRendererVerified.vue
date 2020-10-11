<template>
  <div>
    <feather-icon icon="CircleIcon" :svgClasses="['fill-current h-4 w-4', textColor]" /> {{ status }}

  </div>
</template>

<script>
export default {
  name: 'CellRendererVerified',
  computed: {
    textColor () {
      return this.params.value ? 'text-danger' : 'text-success'
    },
    status () {
      return this.params.value ? 'ระงับ' : 'ปกติ'
    }
  }
}

</script>
