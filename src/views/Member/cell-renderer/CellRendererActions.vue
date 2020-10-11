<template>
  <div class="my-2 inline-flex">
    <router-link :to="`/member/${params.value}`">
      <vs-button size="small" color="success" type="border" icon="description">
        ข้อมูลยูสเซอร์
      </vs-button>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'CellRendererActions',
  methods: {
    editRecord () {}
    /*confirmSuspend () {
              this.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: 'Confirm Suspend',
                text: `คุณต้องการระงับ "${this.params.value}"`,
                accept: this.deleteRecord,
                acceptText: 'Suspend'
              })
            },
            deleteRecord () {
              /* Below two lines are just for demo purpose 
              this.showDeleteSuccess()

              /* UnComment below lines for enabling true flow if deleting user 
              this.$store.dispatch("userManagement/removeRecord", this.params.data.id)
                 .then(()   => { this.showDeleteSuccess() })
                 .catch(err => { console.error(err)       })
            },
            showDeleteSuccess () {
              this.$vs.notify({
                color: 'success',
                title: 'User Deleted',
                text: 'The selected user was successfully deleted'
              })
            }*/
  }
}
</script>
