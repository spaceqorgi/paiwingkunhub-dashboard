<template>
  <vs-tabs :position="isSmallerScreen ? 'top' : 'left'" class="tabs-shadow-none" id="profile-tabs" :key="isSmallerScreen">

    <!-- GENERAL -->
    <vs-tab icon-pack="feather" icon="icon-user" :label="!isSmallerScreen ? 'ข้อมูลลูกค้า' : ''">
      <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
        <info />
      </div>
    </vs-tab>
    <vs-tab icon-pack="feather" icon="icon-play" :label="!isSmallerScreen ? 'ประวัติการวิ่ง' : ''">
      <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
        <playgame />
      </div>
    </vs-tab>
        <vs-tab icon-pack="feather" icon="icon-plus-circle" :label="!isSmallerScreen ? 'ประวัติการชำระเงิน' : ''">
      <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
        <topupwd />
      </div>
    </vs-tab>
    <vs-tab icon-pack="feather" icon="icon-edit" :label="!isSmallerScreen ? 'แก้ไขข้อมูล' : ''">
      <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
        <edit />
      </div>
    </vs-tab>
  </vs-tabs>
</template>

<script>
import info from './component/info.vue'
// import topup from './component/topup.vue'
import topupwd from './component/topupwd.vue'
// import withdraw from './component/withdraw.vue'
import playgame from './component/playgame.vue'
import edit from './component/edit.vue'
import Message from './component/Message.vue'

export default {
  components: {
    info,
    // topup,
    topupwd,
    // withdraw,
    playgame,
    edit,
    Message
  },
  data () {
    return {

    }
  },
  computed: {
    isSmallerScreen () {
      return this.$store.state.windowWidth < 768
    }
  }
}
</script>

<style lang="scss">
#profile-tabs {
  .vs-tabs--content {
    padding: 0;
  }
}
</style>
