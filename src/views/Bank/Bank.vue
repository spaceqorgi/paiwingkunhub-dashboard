<template>
  <vs-tabs :position="isSmallerScreen ? 'top' : 'left'" class="tabs-shadow-none" id="profile-tabs" :key="isSmallerScreen">

    <!-- GENERAL -->
    <vs-tab icon-pack="feather" icon="icon-user" :label="!isSmallerScreen ? 'SCB' : ''">
      <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
        <bankscb />
      </div>
    </vs-tab>
    <vs-tab icon-pack="feather" icon="icon-lock" :label="!isSmallerScreen ? 'SCB TO SCB' : ''">
      <div class="tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0">
        <bankscbonly />
      </div>
    </vs-tab>
    <vs-tab icon-pack="feather" icon="icon-lock" :label="!isSmallerScreen ? 'KBANK' : ''">
      <div class="tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0">
        <bankkbank />
      </div>
    </vs-tab>
  </vs-tabs>
    
    
</template>

<script>
import Bankscb from './Bankscb.vue'
import Bankscbonly from './Bankscbonly.vue'
import Bankkbank from './Bankkbank.vue'
export default {
  components: {
    Bankscb,
    Bankscbonly,
    Bankkbank
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