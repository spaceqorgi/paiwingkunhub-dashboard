<!-- =========================================================================================
  File Name: TheNavbar.vue
  Description: Navbar component
  Component Name: TheNavbar
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="relative">

    <div class="vx-navbar-wrapper" :class="classObj">

      <vs-navbar class="vx-navbar navbar-custom navbar-skelton" :color="navbarColorLocal" :class="textColor">

        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon class="sm:inline-flex xl:hidden cursor-pointer p-2" icon="MenuIcon" @click.stop="showSidebar" />

        <feather-icon icon="RssIcon"  svgClasses="text-warning h-5 w-5 stroke-current mt-1"/>
        
        <vs-spacer />
        <VTextMarquee :content="data" class="w-9/12"/>
        <!-- <a v-bind:href="www.google.com"> ... </a>     -->
        <!-- <notification-drop-down /> -->

        <profile-drop-down />

      </vs-navbar>
    </div>
  </div>
</template>


<script>
import NotificationDropDown from './components/NotificationDropDown.vue'
import ProfileDropDown      from './components/ProfileDropDown.vue'
import axios from '../../../axios'
import { VTextMarquee } from 'vue-text-marquee'
export default {
  data () {
    return {
      memberData:'',
      data:''
    }
  },
  name: 'the-navbar-vertical',
  props: {
    navbarColor: {
      type: String,
      default: '#fff'
    }
  },
  components: {
    NotificationDropDown,
    ProfileDropDown,
    VTextMarquee
  },
  computed: {
    navbarColorLocal () {
      return this.$store.state.theme === 'dark' && this.navbarColor === '#fff' ? '#10163a' : this.navbarColor
    },
    verticalNavMenuWidth () {
      return this.$store.state.verticalNavMenuWidth
    },
    textColor () {
      return {'text-white': (this.navbarColor !== '#10163a' && this.$store.state.theme === 'dark') || (this.navbarColor !== '#fff' && this.$store.state.theme !== 'dark')}
    },
    windowWidth () {
      return this.$store.state.windowWidth
    },

    // NAVBAR STYLE
    classObj () {
      if      (this.verticalNavMenuWidth === 'default') return 'navbar-default'
      else if (this.verticalNavMenuWidth === 'reduced') return 'navbar-reduced'
      else if (this.verticalNavMenuWidth)               return 'navbar-full'
    }
  },
  async mounted () {
    await axios
      .get('announce/announce')
      .then(response => (this.memberData = response.data))
    this.data = this.memberData[0].announce_text
  },
  methods: {
    showSidebar () {
      this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true)
    }
  }
}
</script>

