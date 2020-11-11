<template>
  <div>
    {{ date }}
  </div>
</template>

<script>
import { formatDateTime } from '@/functions'

export default {
  name: 'CellRendererDate',
  computed: {
    date () {
      return formatDateTime(this.params.value)
    }
  }
}
</script>
