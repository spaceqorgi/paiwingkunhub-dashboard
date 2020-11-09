<template>
  <div class="my-2 inline-flex">
    <router-link :to="`/user/${params.value}`">
      <vs-button size="small" color="success" type="border" icon="person">
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
