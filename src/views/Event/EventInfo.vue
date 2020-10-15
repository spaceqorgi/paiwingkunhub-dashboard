<template>
  <vs-tabs
    :position="isSmallerScreen ? 'top' : 'left'"
    class="tabs-shadow-none"
    id="profile-tabs"
    :key="isSmallerScreen"
  >
    <!--=========TAB=========-->
    <vs-tab
      icon-pack="feather"
      icon="icon-heart"
      :label="!isSmallerScreen ? 'ข้อมูลงานวิ่ง' : ''"
    >
      <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
        <info />
      </div>
    </vs-tab>
    <!--=========END=========-->
    <!--=========TAB=========-->
    <vs-tab
      icon-pack="feather"
      icon="icon-edit"
      :label="!isSmallerScreen ? 'แก้ไขข้อมูล' : ''"
    >
      <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
        <info />
      </div>
    </vs-tab>
    <!--=========END=========-->
    <!--=========TAB=========-->
    <vs-tab
      icon-pack="feather"
      icon="icon-list"
      :label="!isSmallerScreen ? 'รายชืี่อผู้เข้าร่วม' : ''"
    >
      <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
        <activity />
      </div>
    </vs-tab>
    <!--=========END=========-->
    <!--=========TAB=========-->
    <vs-tab
      icon-pack="feather"
      icon="icon-award"
      :label="!isSmallerScreen ? 'รายการสินค้า/ของที่ระลึก' : ''"
    >
      <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
        <activity />
      </div>
    </vs-tab>
    <!--=========END=========-->
  </vs-tabs>
</template>

<script>
import info from './component/info.vue'
import activity from './component/activity.vue'

export default {
  components: {
    info,
    activity
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
