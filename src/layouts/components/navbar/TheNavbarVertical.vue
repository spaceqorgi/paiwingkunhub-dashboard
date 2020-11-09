<!-- =========================================================================================
  File Name: TheNavbar.vue
  Description: Navbar component
  Component Name: TheNavbar
========================================================================================== -->

<template>
  <div class="relative">
    <div class="vx-navbar-wrapper" :class="classObj">
      <vs-navbar class="vx-navbar navbar-custom navbar-skelton" :color="navbarColorLocal" :class="textColor">
        <feather-icon class="sm:inline-flex xl:hidden cursor-pointer p-2" icon="MenuIcon" @click.stop="showSidebar" />

        <feather-icon icon="RssIcon" svgClasses="text-warning h-5 w-5 stroke-current mt-1" />

        <VTextMarquee :content="data" class="w-full" />

        <!-- TODO: use notificatin drop down -->
        <!-- <notification-drop-down /> -->

        <profile-drop-down />
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import NotificationDropDown from './components/NotificationDropDown.vue'
import ProfileDropDown from './components/ProfileDropDown.vue'
import axios from '../../../axios'
import { VTextMarquee } from 'vue-text-marquee'

export default {
  data () {
    return {
      data: ''
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
    // eslint-disable-next-line vue/no-unused-components
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
      return {
        'text-white':
          (this.navbarColor !== '#10163a' && this.$store.state.theme === 'dark') ||
          (this.navbarColor !== '#fff' && this.$store.state.theme !== 'dark')
      }
    },
    windowWidth () {
      return this.$store.state.windowWidth
    },

    // NAVBAR STYLE
    classObj () {
      if (this.verticalNavMenuWidth === 'default') return 'navbar-default'
      else if (this.verticalNavMenuWidth === 'reduced') return 'navbar-reduced'
      else if (this.verticalNavMenuWidth) return 'navbar-full'
      else return 'navbar-default'
    }
  },
  async mounted () {
    await axios.get('/announce').then(response => (this.data = response.data.announce_text))
  },
  methods: {
    showSidebar () {
      this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true)
    }
  }
}
</script>
