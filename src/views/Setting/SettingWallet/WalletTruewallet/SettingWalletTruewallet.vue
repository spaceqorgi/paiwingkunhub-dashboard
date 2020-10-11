<template>
  <vs-tabs :position="isSmallerScreen ? 'top' : 'left'" class="tabs-shadow-none" id="profile-tabs" :key="isSmallerScreen">

    <!-- GENERAL -->
    <vs-tab icon-pack="feather" icon="icon-user" :label="!isSmallerScreen ? 'Truewallet' : ''">
      <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
        <truewallet />
      </div>
    </vs-tab>
     <vs-tab icon-pack="feather" icon="icon-lock" :label="!isSmallerScreen ? 'เพิ่มบัญชี Truewallet' : ''">
      <div class="tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0">
        <insertwallet />
      </div>
    </vs-tab>
  </vs-tabs>
    
    
</template>

<script>
import Truewallet from './ListTruewallet.vue'
import Insertwallet from './InsertTruewallet.vue'
export default {
  components: {
    Truewallet,
    Insertwallet
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