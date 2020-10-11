<template>
  <vs-tabs :position="isSmallerScreen ? 'top' : 'left'" class="tabs-shadow-none" id="profile-tabs"
    :key="isSmallerScreen">
    <!-- GENERAL -->
    <vs-tab icon-pack="feather" icon="icon-user" :label="!isSmallerScreen ? 'System' : ''">
      <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
        <vx-card>
          <h6 class="mb-4">Setting System</h6>
          <vs-table stripe :data="system">

            <template slot="thead">
              <vs-th>Name</vs-th>
              <vs-th>setting</vs-th>

            </template>

            <template slot-scope="{data}">
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="tr.setting_name">
                  {{tr.setting_name}}
                </vs-td>
                <vs-td :data="tr.setting_status">
                  <vs-switch v-model="tr.setting_status" @click="update_status(tr.setting_no,tr.setting_status,tr.setting_name,'System')">
                    <span slot="on">เปิด</span>
                    <span slot="off">ปิด</span>
                  </vs-switch>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </vx-card>
      </div>
    </vs-tab>
    <vs-tab icon-pack="feather" icon="icon-lock" :label="!isSmallerScreen ? 'Game' : ''">
      <div class="tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0">
        <vx-card>
          <h6 class="mb-4">Setting Game</h6>
          <vs-table stripe :data="game">

            <template slot="thead">
              <vs-th>Name</vs-th>
              <vs-th>setting</vs-th>
            </template>

            <template slot-scope="{data}">
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="tr.setting_name">
                  {{tr.setting_name}}
                </vs-td>
                <vs-td :data="tr.setting_status">
                  <vs-switch v-model="tr.setting_status" @click="update_status(tr.setting_no,tr.setting_status,tr.setting_name,'Game')">
                    <span slot="on">เปิด</span>
                    <span slot="off">ปิด</span>
                  </vs-switch>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </vx-card>
      </div>
    </vs-tab>
  </vs-tabs>


</template>

<script>
import axios from '../../axios'
import log from '../../log'

export default {
  data () {
    return {
      game: [],
      system: [],
      tset:'',
      onoff_status:{}
    }
  },
  async mounted () {
    await axios
      .get('settingsystem/settingsystem/game')
      .then(response => (this.game = response.data))
    await axios
      .get('settingsystem/settingsystem/system')
      .then(response => (this.system = response.data))
  },
  computed: {
    isSmallerScreen () {
      return this.$store.state.windowWidth < 768
    }
  },
  methods: {
    async update_status (setting_no, setting_status, setting_name, system_name) {
      // console.log('setting_no', setting_no, 'setting_status', setting_status, 'setting_name', setting_name)
      if (setting_status === true) {
        setting_status = false
      } else {
        setting_status = true
      }
      await axios
        .post('settingsystem/systemstatus', {
          no:setting_no,
          status:setting_status,
          name:setting_name
        }).then(response => (this.onoff_status = response.data))
      if (this.onoff_status.status === true) {
        this.$vs.notify({
          time:3000,
          color: setting_status === true ? 'success' : 'warning',
          position:'top-right',
          icon:  setting_status === true ? 'check_box' : 'error',
          title: setting_status === true ? 'เปิด' : 'ปิด',
          text:  setting_status === true ? `ระบบ : ${setting_name}` : `ระบบ : ${setting_name}`
        })
        const text = setting_status === true ? `เปิดระบบ : ${  setting_name}` : `ปิดระบบ : ${  setting_name}`
        await log.agent('', `Status_${system_name}`, 0, text)
      } else {
        this.$vs.notify({
          time:8000,
          color: 'danger',
          position:'top-right',
          icon:  'error',
          title: this.onoff_status.status === false ? 'เปิดระบบ หน้าเว็บไม่สำเร็จ!!' : 'ปิดระบบ หน้าเว็บไม่สำเร็จ!!',
          text: 'กรุณาติดต่อทีมงานโปรแกรมเมอร์'
        })
        if (setting_status === true) {
          setting_status = true
        } else if (setting_status === false) {
          setting_status = false
        }
      }
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
