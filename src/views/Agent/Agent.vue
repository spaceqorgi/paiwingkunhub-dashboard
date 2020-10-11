<template>
  <vs-tabs :position="isSmallerScreen ? 'top' : 'left'" class="tabs-shadow-none" id="profile-tabs" :key="isSmallerScreen">

    <!-- GENERAL -->
    <vs-tab icon-pack="feather" icon="icon-user" :label="!isSmallerScreen ? 'เติม-ถอนเครดิต (ปกติ)' : ''">
      <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
        <Agentall />
      </div>
    </vs-tab>
     <vs-tab icon-pack="feather" icon="icon-user" :label="!isSmallerScreen ? 'เติม เครดิต(ธนาคาร SCB)' : ''">
      <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
        <Agentscb />
      </div>
    </vs-tab>
         <vs-tab icon-pack="feather" icon="icon-user" :label="!isSmallerScreen ? 'เติม เครดิต(ธนาคาร SCB TO SCB)' : ''">
      <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
        <Agentscbonly />
      </div>
    </vs-tab>
         <vs-tab icon-pack="feather" icon="icon-user" :label="!isSmallerScreen ? 'เติม เครดิต(ธนาคาร KBANK)' : ''">
      <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
        <Agentkbank />
      </div>
    </vs-tab>
  </vs-tabs>
</template>

<script>
import Agentall from './Agentalll'
import Agentscb from './Agentscb'
import Agentscbonly from './Agentscbonly'
import Agentkbank from './Agentkbank'

export default {
  components: {
    Agentall,
    Agentscb,
    Agentkbank,
    Agentscbonly

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