<template>


  <div>
    <div class="vx-card p-6">
      <div class="flex flex-wrap items-center">
        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          <h4>ถอน เครดิต <small>เติม - ข้างหน้ายอดเงิน</small></h4>
          
          <div class="mt-8">
            <vs-input class="w-full" v-validate="'required|alpha_num'" label-placeholder="ชื่อผู้ใช้"
              v-model="username" name="username" />
            <span class="text-danger text-sm" v-show="errors.has('username')">{{ errors.first('username') }}</span>
          </div>
          <div class="mt-8">
            <vs-input class="w-full" v-validate="'required|decimal'" label-placeholder="จำนวนเงิน" v-model="amount"
              name="amount" />
            <span class="text-danger text-sm" v-show="errors.has('amount')">{{ errors.first('amount') }}</span>
          </div>
          <div class="mt-8">
            <vs-textarea class="w-full" v-validate="'required'" label="หมายเหตุ" v-model="info" name="info" />
            <span class="text-danger text-sm" v-show="errors.has('info')">{{ errors.first('info') }}</span>
          </div>
          <vs-button color="success" type="relief" class="mt-8" @click="submit_credit">เติมเงิน</vs-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {
  Validator
} from 'vee-validate'
import axios from '../axios'
const dict = {
  custom: {
    username: {
      required: 'กรุณากรอกข้อมูล',
      alpha_num: 'ตัวอักษรภาษาอังกฤษและตัวเลขเท่านั้น'
    },
    amount: {
      required: 'กรุณากรอกข้อมูล',
      decimal: 'ต้องเป็นตัวเลขหรือจุดทศนิยมเท่านั้น'
    },
    info: {
      required: 'กรุณากรอกข้อมูล'
    }
  }
}
import log from '../log'
// register custom messages
Validator.localize('en', dict)

export default {
  data () {
    return {
      username: '',
      amount: '',
      info: '',
      agent_error: {}
    }
  },
  computed: {},
  methods: {
    async submit_credit () {
      this.$validator.validateAll().then(async result => {
        if (result) {
          if (this.amount !== '0') {
            if (this.amount > '0') {
              this.$vs.notify({
                time: 10000,
                color: 'danger',
                position: 'top-right',
                icon: 'error',
                title: 'ทำรายการไม่สำเร็จ',
                text: 'User นี้ไม่สามารถเพิ่มเครดิตได้'
              })
            } else {
              await axios.post('/agent/minuscredit', {
                username: this.username,
                balance: this.amount,
                info: this.info
              })
                .then(response => (this.agent_error = response.data))
              if (this.agent_error.status === true) {
                await log.agent(this.username, 'Minus_credit', this.amount, this.info)
                setTimeout(() => { window.location.reload() }, 1500)
                this.$vs.notify({
                  time: 10000,
                  color: 'warning',
                  position: 'top-right',
                  icon: 'error',
                  title: this.agent_error.info.title,
                  text: this.agent_error.info.info
                })
              } else {
                this.$vs.notify({
                  time: 10000,
                  color: 'danger',
                  position: 'top-right',
                  icon: 'error',
                  title: this.agent_error.info.title,
                  text: this.agent_error.info.info
                })

              }
            }
          } else {
            this.$vs.notify({
              time: 3000,
              color: 'danger',
              position: 'top-right',
              icon: 'error',
              title: 'ทำรายการไม่สำเร็จ',
              text: 'จำนวนเงินไม่สามารถเป็น 0 ได้'
            })
          }
          if (this.agent_error.status === true) {
            await axios.post('/line/agent', {
              username: this.username,
              balance: this.amount,
              info: this.info,
              admin:this.$store.state.AppActiveUser.username
            })
          }

        } else {
          this.$vs.notify({
            time: 3000,
            color: 'danger',
            position: 'top-right',
            icon: 'error',
            title: 'ทำรายการไม่สำเร็จ',
            text: 'กรุณากรอกข่อมูลให้ครบ'
          })

        }

        
      })


    }
  }
}

</script>
