<template>
      <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
        <vx-card>
          <h4 class="mb-4">ตั้งค่าระบบถอน</h4>
          <div class="vx-row">
            <div class="vx-col md:w-1/5 w-full mt-2">
            <label>เวลาที่ลูกค้าถอนได้ต่อครั้ง</label>
              <vx-input-group class="mb-base">
                <vs-input type="number" min="15" max="60" v-model="min" placeholder="ใส่จำนวนนาที" />
                <template slot="append">
                  <div class="append-text bg-primary">
                    <span>นาที</span>
                  </div>
                </template>
              </vx-input-group>
              </div>
              <div class="vx-col md:w-1/5 w-full mt-2">
              <label>จำนวนพนักงานถอนเงิน </label>
              <vx-input-group class="mb-base">
                <vs-input type="number" min="1" max="10" v-model="user" placeholder="ใส่จำนวนพนักงาน" />
                <template slot="append">
                  <div class="append-text bg-primary">
                    <span>คน</span>
                  </div>
                </template>
              </vx-input-group>
            </div>
              </div>
              <div class="vx-row">
            </div>
        <vs-button color="primary" @click=" update_status_user()">ยืนยัน</vs-button>
        </vx-card>
      </div>
</template>

<script>
import axios from '../../axios'
import log from '../../log'
const dict = {
  user: {
    username: {
      max_value: 'พนักงานถอนห้ามเกิน 10 คน',
      min_value: 'พนักงานถอนห้ามน้อยกว่า 4 คน'
    },
    time: {
      max_value: 'เวลาในการถอนห้ามเกิน 60 นาที',
      min_value: 'เวลาในการถอนห้ามน้อยกว่า 15 นาที'
    }
  }
}
import {
  Validator
} from 'vee-validate'
Validator.localize('en', dict)
export default {

  data () {
    return {
      datawithdraw: [],
      user: '',
      min: '',
      user_status: '',
      user_min:'',
      status:{},
      bf_user: '',
      bf_min: '',
      log_info: ''
    }
  },
  computed: {
    isSmallerScreen () {
      return this.$store.state.windowWidth < 768
    }
  },
  async mounted () {
    await axios
      .get('settingwithdraw/settingwithdraw')
      .then(response => (this.datawithdraw = response.data))
    this.user = this.datawithdraw[0].setting_data
    this.min = this.datawithdraw[1].setting_data
    this.bf_user = this.datawithdraw[0].setting_data
    this.bf_min = this.datawithdraw[1].setting_data
  },
  methods: {
    async update_status_user () {
      if (this.user <= 10 && this.user >= 1) {
        if (this.min <= 60 && this.min >= 15) {
          await axios
            .post('settingwithdraw/withdrawstatus', {
              user_no: 1,
              min_no: 2,
              user_data: this.user,
              min_data: this.min
            }).then(response => (this.status = response.data))
          if (this.status.status === true) {
            this.$vs.notify({
              time:8000,
              color: 'success',
              position:'top-right',
              icon:  'check_box',
              title: 'ทำรายการสําเร็จ',
              text:  `จำนวนพนักงานถอน : ${this.user} คน | หน่วงเวลาถอน : ${this.min} นาที`
            })
            if (this.user !== this.bf_user && this.min === this.bf_min) {
              this.log_info = `จำนวนพนักงานถอน : ${  this.bf_user  } > ${  this.user} คน` 
            } else if (this.min !== this.bf_min && this.user === this.bf_user) {
              this.log_info = `หน่วงเวลาถอน : ${  this.bf_min  } > ${  this.min} นาที`
            } else if (this.user !== this.bf_user && this.min !== this.bf_min) {
              this.log_info = `จำนวนพนักงานถอน : ${  this.bf_user  } > ${  this.user} คน  หน่วงเวลาถอน : ${  this.bf_min  }>${  this.min} นาที` 
            }
            log.agent('', 'Setting_Withdraw', 0, this.log_info)
            this.refresh_data()
          } else {
            this.$vs.notify({
              time:8000,
              color: 'danger',
              position:'top-right',
              icon:  'error',
              title: 'ไม่สามารถทำรายการได้',
              text: 'กรุณาติดต่อทีมงานโปรแกรมเมอร์'
            })
          }
        } else {
          this.$vs.notify({
            time:8000,
            color: 'danger',
            position:'top-right',
            icon:  'error',
            title: 'ไม่สามารถทำรายการได้',
            text:  'จำนวนเวลาถอน มากสุด 60 นาทีน้อยสุด 15 นาที'
          })
        }
        
      } else {
        this.$vs.notify({
          time:8000,
          color: 'danger',
          position:'top-right',
          icon:  'error',
          title: 'ไม่สามารถทำรายการได้',
          text:  'จำนวนพนักงานถอน มากสุด 10 คนน้อยสุด 1 คน'
        })
      }
      
    },
    async refresh_data () {
      await axios
        .get('settingwithdraw/settingwithdraw')
        .then(response => (this.datawithdraw = response.data))
      this.user = this.datawithdraw[0].setting_data
      this.min = this.datawithdraw[1].setting_data
      this.bf_user = this.datawithdraw[0].setting_data
      this.bf_min = this.datawithdraw[1].setting_data
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
