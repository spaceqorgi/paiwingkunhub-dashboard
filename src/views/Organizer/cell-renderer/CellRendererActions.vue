<template>
  <div class="my-2 inline-flex">
    <router-link :to="`/organizer/crud/${params.value}`">
      <vs-button size="small" color="primary" icon="description">
        ข้อมูล
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
