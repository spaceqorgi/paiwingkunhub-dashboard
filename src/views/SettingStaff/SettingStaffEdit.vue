<template>
  <div class="vx-col w-full">
    <vx-card title="แก้ไขข้อมูลพนักงาน">
      <div class="vx-row">
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <vs-input v-validate="'required|alpha_num'" class="w-full" label-placeholder="Username" name="username"
            v-model="new_data.user" />
          <span class="text-danger text-sm" v-show="errors.has('username')">{{ errors.first('username') }}</span>
        </div>
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <vs-input v-validate="'required'" class="w-full" label-placeholder="Name" name="name"
            v-model="new_data.name" />
          <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <vs-input v-validate="'required|alpha_num'" class="w-full" label-placeholder="Password" name="password"
            v-model="new_data.pass" />
          <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>
        </div>
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <vs-select class="w-full mt-4" v-model="new_data.group">
            <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in datagroups" />
          </vs-select>
        </div>
      </div>
      
      <div class="vx-row">
        <div class="vx-col w-full mb-6">
          <p>สถานะ Login</p>
          <br>
          <vs-switch v-model="new_data.status">
            <span slot="on">On</span>
            <span slot="off">Off</span>
          </vs-switch>
        </div>
      </div>


      <vx-card class="mt-base" no-shadow card-border>

        <div class="vx-row">
          <div class="vx-col w-full">
            <div class="flex items-end px-3">
              <feather-icon svgClasses="w-6 h-6" icon="LockIcon" class="mr-2" />
              <span class="font-medium text-lg leading-none">Permissions</span>
            </div>
            <vs-divider />
          </div>
        </div>

        <div class="block overflow-x-auto">
          <vs-table :data="datapermission">
            <template slot="thead">
              <vs-th>Name</vs-th>
              <vs-th></vs-th>
            </template>

            <template slot-scope="{data}">
              <vs-tr :data="tr" :key="indextr" v-for="(tr,indextr) in data">
                 <vs-td :data="tr.permissions_info">
                  {{tr.permissions_info}}
                </vs-td>
                <vs-td>
                  <vs-checkbox v-model="old_permission[indextr]" />
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>

      </vx-card>
      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="mt-8 flex flex-wrap items-center justify-end">
            <vs-button class="ml-auto mt-2" @click="edit_staff">แก้ไขยูสเซอร์</vs-button>
          </div>
        </div>
      </div>
    </vx-card>
  </div>
</template>

<script>
import axios from '../../axios'
import log from '../../log'
import vSelect from 'vue-select'
import {
  Validator
} from 'vee-validate'

const dict = {
  custom: {
    name: {
      required: 'กรุณากรอกข้อมูล'
    },
    username: {
      required: 'กรุณากรอกข้อมูล',
      alpha_num: 'ตัวอักษรภาษาอังกฤษและตัวเลขเท่านั้น'
    },
    password: {
      required: 'กรุณากรอกข้อมูล',
      alpha_num: 'ตัวอักษรภาษาอังกฤษและตัวเลขเท่านั้น'
    },
    permission: {
      required: 'กรุณากรอกข้อมูล'
    }

  }
}

// register custom messages
Validator.localize('en', dict)

export default {
  components: {
    vSelect
  },
  data () {
    return {
      datastaff: [],
      datapermission: [],
      old_permission: '',
      permission: [],
      new_permission: [],
      groups: 0,
      datagroups: [
        {
          value: 0,
          text: 'ตลอดเวลา'
        },
        {
          value: 1,
          text: 'กะเช้า'
        },
        {
          value: 2,
          text: 'กะดึก'
        },
        {
          value: 3,
          text: 'ชั่วคราว'
        }
      ],
      new_data: {
        user: '',
        name: '',
        pass: '',
        status: false,
        level: 0,
        group: 0,
        permission: []
      },
      log_info: ''
    }
  },
  async mounted () {
    await axios
      .get('settingstaff/getpermission')
      .then(response => (this.datapermission = response.data))
    await axios
      .get(`settingstaff/getstaff/${this.$route.params.id}`)
      .then(response => (this.datastaff = response.data))
    this.new_data.user = this.datastaff[0].admin_user
    this.new_data.name = this.datastaff[0].admin_name
    this.new_data.pass = this.datastaff[0].admin_pass
    this.new_data.status = this.datastaff[0].admin_status
    this.new_data.group = this.datastaff[0].admin_group
    //this.permission.length = this.datapermission.length
    this.new_permission.length = this.datapermission.length
    // for (let i = 0; i < this.permission.length; i++) {
    //   this.permission[i] = false
    // }
    this.permission.length = this.datapermission.length

    this.old_permission = this.datastaff[0].admin_level
    this.old_permission = this.old_permission.toString(2)
    let i = 0
    const cal_length = this.permission.length - this.old_permission.length
    for (i = 0; i < cal_length; i++) {
      this.old_permission = 0 + this.old_permission
    }
    this.old_permission = this.old_permission.split('')
    for (let p = 0; p < this.permission.length; p++) {
      if (this.old_permission[p] === '0') {
        this.old_permission[p] = false
      } else if (this.old_permission[p] === '1') {
        this.old_permission[p] = true
      }
    }
    this.old_permission = this.old_permission.reverse()
  },
  methods: {
    async edit_staff () {
      this.$validator.validateAll().then(async result => {
        if (result) {
          for (let i = 0; i < this.old_permission.length; i++) {
            this.new_permission[i] = (Number(this.old_permission[i]))
          }
          this.new_permission = this.new_permission.reverse().join('')
          this.new_permission = parseInt(this.new_permission, 2)
          await axios
            .post('settingstaff/editstaff', {
              id: this.$route.params.id,
              name: this.new_data.name,
              username: this.new_data.user,
              password: this.new_data.pass,
              level: this.new_permission,
              groups: this.new_data.group,
              status: this.new_data.status
            }).then(response => (this.check_added = response.data))
          if (this.check_added.status === true) {
            this.$vs.notify({
              time: 5000,
              color: 'success',
              position: 'top-right',
              icon: 'checkbox',
              title: 'แก้ไขยูสเซอร์เสร็จสิ้น',
              text: 'ทำรายการสำเร็จ'
            })
            await this.comparedata()
            await log.agent('', 'Edit_Staff', 0, this.log_info)
            this.$router.push('/settingstaff')
          } else {
            this.$vs.notify({
              time: 5000,
              color: 'danger',
              position: 'top-right',
              icon: 'error',
              title: 'แก้ไขยูสเซอร์ไม่สำเร็จ',
              text: 'กรุณาติดต่อทีมงานโปรแกรมเมอร์'
            })
          }
        } else {
          this.$vs.notify({
            time: 2000,
            color: 'danger',
            position: 'top-right',
            icon: 'error',
            title: 'ไม่สามารถแก้ยูสเซอร์ได้',
            text: 'กรุณากรอกข้อมูลให้ครบ'
          })
        }
      })

    },
    async comparedata () {
      if (this.datastaff[0].admin_name !== this.new_data.name) {
        this.log_info += `ชื่อ : ${  this.datastaff[0].admin_name  } > ${  this.new_data.name} `
      }
      if (this.datastaff[0].admin_user !== this.new_data.user) {
        this.log_info += `ยูสเซอร์เนม : ${  this.datastaff[0].admin_user  } > ${  this.new_data.user} `
      }
      if (this.datastaff[0].admin_pass !== this.new_data.pass) {
        this.log_info += `พาสเวิร์ด : ${  this.datastaff[0].admin_pass  } > ${  this.new_data.pass} `
      }
      if (this.datastaff[0].admin_group !== this.new_data.group) {
        this.log_info += `เวลาทำงาน : ${  this.datastaff[0].admin_group  } > ${  this.new_data.group} `
      }
      if (this.datastaff[0].admin_status !== this.new_data.status) {
        this.log_info += `สถานะล็อกอิน : ${  this.datastaff[0].admin_status  } > ${  this.new_data.status} `
      }
      if (this.new_permission !== this.datastaff[0].admin_level) {
        this.log_info += `สิทธิ์การเข้าถึง : ${  this.datastaff[0].admin_level  } > ${  this.new_permission} `
      }
    }
  }
}

</script>

<style>

</style>
