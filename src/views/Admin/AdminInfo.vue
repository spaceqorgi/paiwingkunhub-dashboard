<template>
  <vs-tabs
    :position="isSmallerScreen ? 'top' : 'left'"
    class="tabs-shadow-none"
    id="profile-tabs"
    :key="isSmallerScreen"
  >
    <!-- GENERAL -->
    <vs-tab icon-pack="feather" icon="icon-user" :label="!isSmallerScreen ? 'ข้อมูลแอดมิน' : ''">
      <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
        <info />
      </div>
    </vs-tab>

    <!-- Change password -->
    <vs-tab icon-pack="feather" icon="icon-user" :label="!isSmallerScreen ? 'รหัสผ่าน' : ''">
      <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
        <changePassword />
      </div>
    </vs-tab>
  </vs-tabs>
</template>

<script>
import info from './component/info.vue'
import changePassword from './component/changePassword.vue'

export default {
  components: {
    info,
    changePassword
  },
  data () {
    return {}
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
