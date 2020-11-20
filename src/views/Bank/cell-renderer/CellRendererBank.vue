<template>
  <div>{{ bankInfo.acronym }}</div>
</template>

<script>
import { thaiBankInfo } from '@/functions'

export default {
  name: 'CellRendererPublished',
  computed: {
    bankInfo () {
      const BANK_INFO = thaiBankInfo[this.params.value]
      return BANK_INFO ? BANK_INFO : thaiBankInfo['-999']
    }
  }
}
</script>
