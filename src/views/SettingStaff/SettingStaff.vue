<template>
  <vs-tabs :position="isSmallerScreen ? 'top' : 'left'" class="tabs-shadow-none" id="profile-tabs"
    :key="isSmallerScreen">
    <!-- GENERAL -->
    <vs-tab icon-pack="feather" icon="icon-user" :label="!isSmallerScreen ? 'Staff List' : ''">
      <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
        <vs-table :data="datastaff">
          <template slot="thead">
            <vs-th>Name</vs-th>
            <vs-th>Username</vs-th>
            <!-- <vs-th>Password</vs-th> -->
            <vs-th>Type</vs-th>
            <vs-th>login</vs-th>
            <vs-th></vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr,indextr) in data">
              <vs-td :data="tr.admin_name">
                {{tr.admin_name}}
              </vs-td>
              <vs-td :data="tr.admin_user">
                {{tr.admin_user}}
              </vs-td>
              <!-- <vs-td :data="tr.admin_pass">
                {{tr.admin_pass}}
              </vs-td> -->
              <vs-td :data="typename[tr.admin_group]" v-if="tr.admin_group == 0" class="text-success">
                {{typename[tr.admin_group]}}
              </vs-td>
              <vs-td :data="typename[tr.admin_group]" v-else-if="tr.admin_group == 1" class="text-warning">
                {{typename[tr.admin_group]}}
              </vs-td>
               <vs-td :data="typename[tr.admin_group]" v-else-if="tr.admin_group == 2" class="text-danger">
                {{typename[tr.admin_group]}}
              </vs-td>
               <vs-td :data="typename[tr.admin_group]" v-else-if="tr.admin_group == 3">
                {{typename[tr.admin_group]}}
              </vs-td>
              <vs-td>
                <vs-switch v-model="tr.admin_status" @click="status_login(tr.admin_id,tr.admin_status,tr.admin_name)">
                  <span slot="on">เปิด</span>
                  <span slot="off">ปิด</span>
                </vs-switch>
              </vs-td>
              <div class="flex">
                <vs-button type="border" size="small" icon-pack="feather" icon="icon-edit" color="warning" class="mr-2"
                  @click="$router.push('/settingstaff/edit/'+ tr.admin_id)">แก้ไขข้อมูล</vs-button>

                <vs-button type="border" size="small" icon-pack="feather" icon="icon-trash" color="danger" class="mr-2" @click="popup_delstaff(tr.admin_id,tr.admin_user)">
                  ลบผู้ใช้</vs-button>
              </div>
            </vs-tr>
          </template>
        </vs-table>
      </div>

      <vs-popup classContent="popup-example" title="ลบผู้ใช้พนักงาน" :active.sync="popup_del_staff">
      <h4> คุณกำลังจะลบผู้ใช้: <b style="color:#F61340">{{delete_user}}</b></h4> <small >กรุณายืนยันตัวตน โปรดยืนยัน <b>Password</b> ของคุณ</small> 
      
      <vx-input-group class="mb-base">
        <template slot="prepend">
          <div class="prepend-text bg-primary">
            <span>Username</span>
          </div>
        </template>
        <vs-input placeholder="Username" v-model="admin_user.username" disabled/>
      </vx-input-group>

      <vx-input-group class="mb-base">
        <template slot="prepend">
          <div class="prepend-text bg-primary">
            <span>Password</span>
          </div>
        </template>

        <vs-input ref="inputPassword" placeholder="Password" v-model="admin_pass" />
      </vx-input-group>
      <vs-button @click="del_staff()" color="primary" type="filled">ยืนยัน</vs-button>
    </vs-popup>


    </vs-tab>
    <vs-tab icon-pack="feather" icon="icon-settings" :label="!isSmallerScreen ? 'Add Staff' : ''">
      <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
        <h4>เพิ่มข้อมูลพนักงาน</h4>
        <!-- Content Row -->
        <form>
          <div class="vx-row">
            <div class="vx-col md:w-1/2 w-full">
              <vs-input v-validate="'required|alpha_num'" class="w-full mt-4" label-placeholder="ชื่อผู้ใช้"
                name="username" v-model="username" />
              <span class="text-danger text-sm" v-show="errors.has('username')">{{ errors.first('username') }}</span>

              <vs-input v-validate="'required|alpha_num'" class="w-full mt-4" label-placeholder="password"
                name="password" v-model="password" />
              <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>

              
              <p>สถานะ Login</p>
              
              <vs-switch v-model="status_staff">
                <span slot="on">On</span>
                <span slot="off">Off</span>
              </vs-switch>

            </div>
            <div class="vx-col md:w-1/2 w-full">
              <vs-input v-validate="'required'" class="w-full mt-4" label-placeholder="ชื่อ" name="name"
                v-model="name" />
              <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>

              <vs-select class="w-full mt-4" v-model="groups">
                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in datagroups" />
              </vs-select>
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
                      <vs-checkbox v-model="permission[indextr]" />
                    </vs-td>
                  </vs-tr>
                </template>
              </vs-table>
            </div>

          </vx-card>


          <div class="vx-row">
            <div class="vx-col w-full">
              <div class="mt-8 flex flex-wrap items-center justify-end">
                <vs-button class="ml-auto mt-2" @click.prevent="add_staff">เพิ่มผู้ใช้</vs-button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </vs-tab>
    <vs-tab icon-pack="feather" icon="icon-clock" :label="!isSmallerScreen ? 'Setting Staff' : ''">
      <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
        <h4>ปรับกะพนักงาน</h4>
        <vx-card class="mt-base" no-shadow card-border>
        <div class="vx-row">
            <div class="vx-col md:w-1/6 w-full">
            <label>กรุณาเลือกช่วงเวลา</label>  
            <vs-select class="w-full" v-model="selecttime">
                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in groupworktotime" />
            </vs-select>
            </div>
            <div class="vx-col md:w-1/6 w-full">
            <label>กรุณาเลือกเปิด/ปิด</label>  
            <vs-select class="w-full" v-model="selectlcloseoropen">
                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in closeoropen" />
            </vs-select>
            </div>
        </div>
        
        <vs-button type="border" color="success" class="mr-2" @click="timetowork(selecttime,selectlcloseoropen)">ยืนยัน</vs-button>
     </vx-card>
      </div>
    </vs-tab>

  </vs-tabs>
  

</template>

<script>
import vSelect from 'vue-select'
import axios from '../../axios'
import log from '../../log'
// For custom error message
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
    // eslint-disable-next-line vue/no-unused-components
    vSelect
  },
  data () {
    return {
      test: '',
      datastaff: [],
      typename: ['ตลอดเวลา', 'กะเช้า', 'กะดึก', 'ชั่วคราว'],
      datapermission: [],
      name: '',
      password: '',
      username: '',
      permission: [],
      new_permission: [],
      groups: 0,
      status_staff: true,
      check_added: false,
      groupworktotime: [
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
      closeoropen:[
        {
          value: true,
          text: 'เปิด'
        },
        {
          value: false,
          text: 'ปิด'
        }
      ],
      selecttime : 1,
      selectlcloseoropen : true,
      check_statuslogin: false,
      popup_del_staff: false,
      admin_user: this.$store.state.AppActiveUser,
      admin_pass: '',
      delete_user: '',
      delete_id: '',
      delete_status: false,
      infotimetowork: ''
    }
  },
  async mounted () {
    await axios
      .get('settingstaff/getstaff')
      .then(response => (this.datastaff = response.data))
    await axios
      .get('settingstaff/getpermission')
      .then(response => (this.datapermission = response.data))
    this.permission.length = this.datapermission.length
    this.new_permission.length = this.datapermission.length
    for (let i = 0; i < this.permission.length; i++) {
      this.permission[i] = false
    }
  },
  methods: {
    async status_login (id, status, name) {
      this.check_statuslogin = false
      if (status === true) {
        status = false
      } else {
        status = true
      }
      await axios
        .post('settingstaff/setlogin', {
          admin_id: id,
          admin_status: status
        }).then(response => (this.check_statuslogin = response.data))
      if (this.check_statuslogin.status === true) {
        this.$vs.notify({
          time:3000,
          color: status === true ? 'success' : 'warning',
          position:'top-right',
          icon:  status === true ? 'check_box' : 'error',
          title: status === true ? 'เปิดการเข้าใช้งานสำเร็จ' : 'ปิดการเข้าใช้งานสำเร็จ',
          text: status === true ? `ของคุณ ${name}` : `ของคุณ ${name}`
        })
        const text = status === true ? `เปิดสถานะ login พนักงานชื่อ : ${  name}` : `ปิดสถานะ login พนักงานชื่อ : ${  name}`
        await log.agent('', 'Status_Staff', 0, text)
      } else {
        this.$vs.notify({
          time:8000,
          color: 'danger',
          position:'top-right',
          icon:  'error',
          title: status === true ? 'เปิดแสดง wallet หน้าเว็บไม่สำเร็จ!!' : 'ปิดแสดง wallet หน้าเว็บไม่สำเร็จ!!',
          text: 'กรุณาติดต่อทีมงานโปรแกรมเมอร์'
        })
      }
    },
    async add_staff () {
      this.$validator.validateAll().then(async result => {
        if (result) {
          for (let i = 0; i < this.permission.length; i++) {
            this.permission[i] = (Number(this.permission[i]))
            this.new_permission[i] = (Number(this.permission[i]))
          }
          this.new_permission = this.new_permission.reverse().join('')
          this.new_permission = parseInt(this.new_permission, 2)
          // this.new_permission = this.new_permission.toString(2)
          // console.log('DEC TO BIN', this.new_permission)
          await axios
            .post('settingstaff/addstaff', {
              name: this.name,
              username: this.username,
              password: this.password,
              level: this.new_permission,
              groups: this.groups,
              status: this.status_staff
            }).then(response => (this.check_added = response.data))
          if (this.check_added.status === true) {
            this.$vs.notify({
              time: 5000,
              color: 'success',
              position: 'top-right',
              icon: 'checkbox',
              title: 'เพิ่มผู้ใช้เสร็จสิ้น',
              text: 'ทำรายการสำเร็จ'
            })
            await log.agent('', 'Add_Staff', 0, `เพิ่มผู้ใช้พนักงานชื่อ : ${  this.name  }ผู้ใช้พนักงาน : ${  this.username}`)
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          } else {
            this.$vs.notify({
              time: 5000,
              color: 'danger',
              position: 'top-right',
              icon: 'error',
              title: 'เพิ่มผู้ใช้ไม่สำเร็จ',
              text: 'กรุณาติดต่อทีมงานโปรแกรมเมอร์'
            })
          }

        } else {
          this.$vs.notify({
            time: 2000,
            color: 'danger',
            position: 'top-right',
            icon: 'error',
            title: 'ไม่สามารถเพิ่มผู้ใช้ได้',
            text: 'กรุณากรอกข้อมูลให้ครบ'
          })
        }
      })
    },
    async popup_delstaff (id, user) {
      this.delete_id = id
      this.delete_user = user
      this.popup_del_staff = true
      this.$nextTick(() => {
        this.$refs.inputPassword.$el.querySelector('input').focus()
      })
    },
    async del_staff () {
      await axios.post('settingstaff/deletestaff', {
        admin_user: this.admin_user.username,
        admin_pass: this.admin_pass,
        delete_id: this.delete_id
      })
        .then(response => (this.delete_status = response.data))
      this.popup_del_staff = false
      if (this.delete_status.status === true) {
        this.$vs.notify({
          time:3000,
          color: 'success',
          position:'top-right',
          icon:'check_box',
          title: this.delete_status.info,
          text: `ลบผู้ใช้ : ${  this.delete_user  }สำเร็จ`
        })
        await log.agent('', 'Del_Staff', 0, `ลบผู้ใช้พนักงาน ${  this.delete_user}`)
        this.refreshdata_staff()
        // setTimeout(() => {
        //   window.location.reload()
        // }, 1350)
      } else {
        this.$vs.notify({
          time:8000,
          color: 'danger',
          position:'top-right',
          icon:'error',
          title: this.delete_status.info,
          text: `ลบผู้ใช้ : ${  this.delete_user  }ไม่สำเร็จ`
        })
      }
      this.delete_user = ''
    },
    async refreshdata_staff () {
      await axios
        .get('settingstaff/getstaff')
        .then(response => (this.datastaff = response.data))
    },
    async timetowork (timetowork, statuswork) {
      await axios.post('settingstaff/timetowork', {
        time: timetowork,
        status: statuswork
      }).then(response => (this.infotimetowork = response.data))
      if (this.infotimetowork.status === true) {
        this.$vs.notify({
          time:3000,
          color: 'success',
          position:'top-right',
          icon:'check_box',
          title: 'ทำรายการสำเร็จ',
          text: this.infotimetowork.info
        })
        //await log.agent('', 'SetTimetoWork', 0, `ปรับเวลากะ  ${  this.delete_user}`)
        setTimeout(() => {
          window.location.reload()
        }, 1350)
      } else {
        this.$vs.notify({
          time:8000,
          color: 'danger',
          position:'top-right',
          icon:'error',
          title: 'ทำรายการไม่สำเร็จ',
          text: this.infotimetowork.info
        })
      }

    }
  },
  computed: {
    isSmallerScreen () {
      return this.$store.state.windowWidth < 768
    }
  }

}

</script>

<style>

</style>
