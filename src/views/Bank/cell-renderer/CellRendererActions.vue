<template>
  <div class="my-2 inline-flex">
    <router-link :to="`/bank/${params.value}`">
      <vs-button size="small" color="primary" icon="description">
        จัดการ
      </vs-button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'CellRendererActions',
  methods: {
    editRecord () {}
  }
}
</script>
