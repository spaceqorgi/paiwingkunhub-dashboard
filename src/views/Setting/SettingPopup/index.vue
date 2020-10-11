<template>
<div :key="forceRender">
  {{checkpopup}} <!-- COMPUTED STORE CHECK POPUP  DO NOT DELETE BY LILSHARK-->
  <vs-tabs :position="isSmallerScreen ? 'top' : 'left'" class="tabs-shadow-none" id="profile-tabs"
    :key="isSmallerScreen">

    <!-- GENERAL -->
    <vs-tab icon-pack="feather" v-for="(item, index) in popup_data" :key="index" v-bind:icon="item.popup_icon"
      v-bind:label="!isSmallerScreen ? item.popup_name : ''">
      <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
        <vx-card no-shadow>
          <editor :name="item.popup_name" :content="item.popup_text"
            :status="item.popup_status" :url="item.popup_url" />
        </vx-card>
      </div>
    </vs-tab>
  </vs-tabs></div>
</template>

<script>
import editor from '@/layouts/components/editor/editorbox.vue'
import axios from '../../../axios'
import store from '../../../store/store'

export default {
  components: {
    editor
  },
  data () {
    return {
      popup_data: [],
      forceRender:0,
      val:0
    }
  },
  async mounted () {
    await this.get_popup()
  },
  computed: {
    isSmallerScreen () {
      return this.$store.state.windowWidth < 768
    },
    checkpopup () {
      if (this.$store.state.StatusPopup.status === true) {
        this.get_popup()
        store.commit('SET_STATUS_POPUP', false)
      }
      return ''
    }
  },
  watch: {
    popup_data (val) {
      this.val = val
      this.$nextTick(() => {
        this.forceRender += 1
        val = 0
      })
    }
  },
  methods: {
    async get_popup () {
      await axios
        .get('settingpopup/popup')
        .then(response => (this.popup_data = response.data))
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
