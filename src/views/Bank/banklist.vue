<template>


  <div id="page-user-list">
    <div class="vx-row">

      <div class="vx-col w-full sm:w-1/10 md:w-1/10 lg:w-1/5 xl:w-1/5">
        <statistics-card-line hideChart class="mb-base" icon="UserIcon" icon-right statistic="ชื่อบัญชี"
          :statisticTitle="profile.full_name" color="success" />
      </div>

      <div class="vx-col w-full sm:w-1/5 md:w-1/5 lg:w-1/5 xl:w-1/5">
        <statistics-card-line hideChart class="mb-base" icon="ListIcon" icon-right statistic="เลขบัญชี"
          :statisticTitle="profile.bank_number" color="success" />
      </div>

      <div class="vx-col w-full sm:w-1/5 md:w-1/5 lg:w-1/5 xl:w-1/5">
        <statistics-card-line hideChart class="mb-base" icon="DollarSignIcon" icon-right statistic="ยอดเงินเข้า"
          :statisticTitle="currency(profile.sum_deposit)" color="warning" />
      </div>

      <div class="vx-col w-full sm:w-1/5 md:w-1/5 lg:w-1/5 xl:w-1/5">
        <statistics-card-line hideChart class="mb-base" icon="DollarSignIcon" icon-right statistic="ยอดเงินออก"
          :statisticTitle="currency(profile.sum_withdraw)" color="danger" />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/5">
        <statistics-card-line hideChart class="mb-base" icon="DollarSignIcon" icon-right statistic="ยอดคงเหลือ"
          :statisticTitle="currency(profile.balance)" color="success" />
      </div>
    </div>
    <div class="vx-card p-6">
      <div class="flex flex-wrap items-center">

        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          {{checkusebank}}
          <!-- COMPUTED STORE CHECK USE BANK  DO NOT DELETE BY LILSHARK-->
          <div class="vx-card__title">
            <h4>เลือกวันที่</h4>
            <br>
          </div>
          <flat-pickr v-model="date" />
          <p class="mt-4">Selected Date: {{ date }}</p>


        </div>
            <vs-button class="mr-6" type="border"  size="small" icon-pack="feather"  icon="icon-edit" color="warning" @click="white()"> ปุ่มแก้ยอดขาว</vs-button>
           <vs-button class="mr-20" size="small" icon-pack="feather"  icon="icon-edit" color="danger" @click="red()"> ปุ่มแก้ยอดแดง</vs-button>

      </div>
              <vs-table stripe  max-items="20" pagination :data="userData" search>
    <template slot="thead">
          <vs-th>วัน/เวลา</vs-th>
          <vs-th>ช่องทาง</vs-th>
          <vs-th>ยอดเงิน</vs-th>
          <vs-th>ข้อมูล</vs-th>
          <vs-th>USERNAME</vs-th>
          <vs-th>สถานะ</vs-th>
          
    </template>
        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="tr.trans_datetime">
              {{moment(tr.trans_datetime).format('YYYY-MM-DD HH:mm:ss')  }}
            </vs-td>
           
            <vs-td :data="tr.trans_type">
              {{tr.trans_type}}
            </vs-td>
            <vs-td  :data="tr.trans_amount" >
               {{currency(tr.trans_amount)}}
            </vs-td>
            <vs-td :data="tr.trans_info">
              {{tr.trans_info}}
            </vs-td>
            <vs-td class="text-danger"><router-link :to="`/user/${data[indextr].trans_used_username}`">{{ data[indextr].trans_used_username}}</router-link>
            </vs-td>
          <!-- Status -->
            <vs-td  :class="data[indextr].trans_status == 1?'text-success':data[indextr].trans_status == 2 || data[indextr].trans_status == 3 ?'text-warning':data[indextr].trans_status == 4?'text-danger':null">
           {{check_status(data[indextr].trans_status)}}
            </vs-td>

            <!-- Status END -->
            <!-- button -->
             <vs-td v-if="data[indextr].trans_status == 2"><vs-button size="small" color="success" type="filled" icon="description" @click="input_username(tr.trans_no,tr.trans_info,tr.trans_amount)">ยังไม่ใช้งาน
    </vs-button></vs-td>
             <vs-td v-else-if="data[indextr].trans_status==3"> <vs-button size="small" color="success" type="filled" icon="description" @click="input_username(tr.trans_no,tr.trans_info,tr.trans_amount)">ยังไม่ใช้งาน
    </vs-button></vs-td>
                 <vs-td v-else-if="data[indextr].trans_status==4"> <vs-button size="small" color="success" type="filled" icon="description" @click="input_username(tr.trans_no,tr.trans_info,tr.trans_amount)">ยังไม่ใช้งาน
    </vs-button></vs-td>
                 <vs-td v-else-if="data[indextr].trans_status==8"> <vs-button size="small" color="success" type="filled" icon="description" @click="input_username(tr.trans_no,tr.trans_info,tr.trans_amount)">ยังไม่ใช้งาน
    </vs-button></vs-td>
                <vs-td v-else></vs-td>
                <vs-td v-if="data[indextr].trans_status ==2 "><vs-button size="small" color="danger" type="filled" icon="description" @click="input_cancel(tr.trans_no,tr.trans_info,tr.trans_amount)">ยกเลิก
    </vs-button></vs-td>
                    <vs-td v-else-if="data[indextr].trans_status ==3 "><vs-button size="small" color="danger" type="filled" icon="description" @click="input_cancel(tr.trans_no,tr.trans_info,tr.trans_amount)">ยกเลิก
    </vs-button></vs-td>
                        <vs-td v-else-if="data[indextr].trans_status ==4 "><vs-button size="small" color="danger" type="filled" icon="description" @click="input_cancel(tr.trans_no,tr.trans_info,tr.trans_amount)">ยกเลิก
    </vs-button></vs-td>
                        <vs-td v-else-if="data[indextr].trans_status ==8 "><vs-button size="small" color="danger" type="filled" icon="description" @click="input_cancel(tr.trans_no,tr.trans_info,tr.trans_amount)">ยกเลิก
    </vs-button></vs-td>
             <vs-td v-else> </vs-td>
             <!-- button end-->
          </vs-tr>
        </template>
      </vs-table>
      
    </div>
    <!-- popup_usebank -->
    <vs-popup classContent="popup-example" title="Username" :active.sync="popup_usebank">
      <br>
      <vx-input-group class="mb-base">
        <template slot="prepend">
          <div class="prepend-text bg-primary">
            <span>Username</span>
          </div>
        </template>
        <vs-input placeholder="Username" v-model="username" />
      </vx-input-group>
      <vx-input-group class="mb-base">
        <template slot="prepend">
          <div class="prepend-text bg-primary">
            <span><small>อัพสลิปธนาคาร COPY & PASTE</small></span>
          </div>
        </template>
        <vs-input class="inputx" placeholder="กรุณาวางรูป" :value="selectedFile.name" @paste="onPaste"/>
      </vx-input-group>
      <vs-checkbox disabled="true" class="mt-2" :color="chk_box.color" v-model="chk_box.data">{{chk_box.text}}</vs-checkbox>
      <canvas  style="border:1px solid grey;" id="mycanvas" width="100" height="100" hidden></canvas>
      <br>
      <p v-if="this.selectedFile.size > 0"><small class="text-success">- ใส่ภาพภาพสลิปสำเร็จ</small></p>
      <p v-else><small class="text-danger">- กรุณาใส่ภาพสลิปก่อนกดปุ่ม OK</small></p>
      <p v-if="this.username === ''"><small class="text-danger">- กรุณาใส่ Username ก่อนกดปุ่ม OK</small></p>
      <p v-else><small class="text-success">- ใส่ Username สำเร็จ </small></p>
      <br>
      <vs-button v-if="this.selectedFile.size > 0" @click="use_bank(trans_no,trans_info,trans_amount)" color="primary" type="filled">OK</vs-button>
      <vs-button v-else disabled="false" color="primary" type="filled">OK</vs-button>
    </vs-popup>
    <!-- popup_cancel -->
    <vs-popup classContent="popup-example" title="Username" :active.sync="popup_cancel">
      <br>
      <h3 class="text-center">ยกเลิกยอดฝาก {{trans_info}} <br> จำนวนเงิน {{trans_amount}}</h3>
      <br>
      <vs-button @click="use_cancel(trans_no, trans_info, trans_amount)" color="primary" type="filled">ยืนยัน</vs-button>
    </vs-popup>
    
  </div>

</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import vSelect from 'vue-select'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import log from '../../log'
import axios from '../../axios'
import moment from 'moment'
import store from '../../store/store'


export default {
  components: {
    vSelect,
    flatPickr,
    StatisticsCardLine
  },
  data () {
    return {
      date: moment.tz('Asia/Bangkok').format('YYYY-MM-DD'),
      listdata: [],
      status:'',
      trans_no:'',
      trans_info:'',
      trans_amount:'',
      username: '',
      profile: {
        full_name: '',
        bank_number: '',
        sum_deposit: '',
        sum_withdraw: '',
        balance: ''
      },
      popup_usebank: false,
      popup_cancel: false,
      events: ['onChange'],
      config: {},
      userData: [],
      components: '',
      status_usebank: [],
      selectedFile: [],
      chk_box: {text: 'กรุณาวางรูป', color: 'danger', data: false}
    }
  },
  computed: {
    // paginationPageSize () {
    //   if (this.gridApi) return this.gridApi.paginationGetPageSize()
    //   else return 10
    // },
    // totalPages () {
    //   if (this.gridApi) return this.gridApi.paginationGetTotalPages()
    //   else return 0
    // },
    // currentPage: {
    //   get () {
    //     if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
    //     else return 1
    //   },
    //   set (val) {
    //     this.gridApi.paginationGoToPage(val - 1)
    //   }
    // },
    checkusebank () {
      if (this.$store.state.StatusBank.status === true) {
        this.selectdate()
        store.commit('SET_STATUS_USEBANK', false)
      }
      return ''
    }
  },
  watch: {
    date (newValue) {
      this.date = newValue
      this.selectdate()
    },
    selectedFile () {
      if (this.selectedFile.name.length > 0) {
        this.chk_box.text = 'วางรูปสำเร็จ'
        this.chk_box.color = 'success'
        this.chk_box.data = true
      } else {
        this.chk_box.text = 'วางรูปไม่สำเร็จ'
        this.chk_box.color = 'danger'
        this.chk_box.data = false
      }
    }
  },
  async mounted () {
    // this.gridApi = this.gridOptions.api
    // if (window.innerWidth > 768) {
    //   this.gridApi.sizeColumnsToFit()
    // }
    await this.selectdate()
  },
  methods: {
    currency (amount) {
      //SET NULL OR NaN = 0
      if (!amount || amount === 'NaN') {
        amount = 0
      }
      if (amount >= 0) {
        if (typeof amount === 'number') {
          amount = String(Math.abs(amount))
        }
        return (amount).replace(/\d(?=(\d{3})+\.)/g, '$&,')
      } else {
        amount = String(Math.abs(amount))
        return `-${(amount).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
      }
    },
    status_color (params) {
      if (params.data.trans_status === 1) {
        return {
          color: 'green'
        }
      } else if (params.data.trans_status === 4) {
        return {
          color: 'red'
        }
      } else if (params.data.trans_status !== 0 && params.data.trans_status !== 1 && params.data.trans_status !== 4) {
        return {
          color: 'orange'
        }
      }
    },
    check_status (status) {
      if (status === 0) {
        return 'กำลังรอทำรายการ'
      } else if (status === 1) {
        return 'ทำรายการสำเร็จ'
      } else if (status === 2) {
        return 'ไม่สามารถแอดเครดิตได้'
      } else if (status === 3) {
        return 'หาผู้ใช้ไม่พบ'
      } else if (status === 4) {
        return 'ติดสถานะโบนัส'
      } else if (status === 5) {
        return 'กำลังทำรายการ'
      } else if (status === 6) {
        return 'ยกเลิกยอดฝาก'
      } else if (status === 8) {
        return 'ติดสถานะยิงปลา'
      }
    },
    
    updateSearchQuery (val) {
      this.gridApi.setQuickFilter(val)
    },
    async white () {
      await axios
        .post('bank/white', {
          bank: this.$route.params.bank,
          id: this.$route.params.id
        })
        .then(response => (this.status = response.data))
      if (this.status.status === true) {
        this.$vs.notify({
          time: 3000,
          color: 'success',
          position: 'top-right',
          icon: 'check_box',
          title: this.status.info
        })
      } else {
        this.$vs.notify({
          time: 8000,
          color: 'danger',
          position: 'top-right',
          icon: 'error',
          title: 'แก้ไขยอดขาวไม่สำเร็จ',
          text: this.status.info
        })
      }
    },
    async red () {
      await axios
        .post('bank/red', {
          bank: this.$route.params.bank,
          id: this.$route.params.id
        })
        .then(response => (this.status = response.data))
      if (this.status.status === true) {
        this.$vs.notify({
          time: 3000,
          color: 'success',
          position: 'top-right',
          icon: 'check_box',
          title: this.status.info
        })
      } else {
        this.$vs.notify({
          time: 8000,
          color: 'danger',
          position: 'top-right',
          icon: 'error',
          title: 'แก้ไขยอดแดงไม่สำเร็จ',
          text: this.status.info
        })
      }
    },
    async selectdate () {
      await axios
        .get(
          `bank/list/${this.$route.params.bank}/${this.$route.params.id}/${this.$route.params.bankfor}/${this.date}`
        )
        .then(response => (this.userData = response.data))
      await axios
        .get(
          `bank/list/profile/${this.$route.params.bank}/${this.$route.params.id}/${this.$route.params.bankfor}/${this.date}`
        )
        .then(response => (this.listdata = response.data))
      this.profile.full_name = this.listdata.fullname
      this.profile.bank_number = this.listdata.bank_number
      this.profile.sum_deposit = this.listdata.sum_deposit
      this.profile.sum_withdraw = this.listdata.sum_withdraw
      this.profile.balance = this.listdata.balance
    },
    input_username (trans_no, trans_info, trans_amount) {
      this.username = ''
      this.trans_no = trans_no
      this.trans_info = trans_info
      this.trans_amount = trans_amount
      this.popup_usebank = true
    },
    async use_bank (trans_no, trans_info, trans_amount) {
      this.popup_usebank = false
      await axios
        .post('bank/usebank', {
          bank: this.$route.params.bank,
          bankfor: this.$route.params.id,
          username: this.username,
          bankname: this.$route.params.bankfor,
          trans_no
        })
        .then(response => (this.status_usebank = response.data))
      this.$vs.notify({
        time: this.status_usebank.status === true ? 3000 : 8000,
        color: this.status_usebank.status === true ? 'success' : 'danger',
        position: 'top-right',
        icon:  this.status_usebank.status === true ? 'check_box' : 'error',
        title: this.status_usebank.status === true ? 'ใช้ยอดสำเร็จ' : 'ใช้ยอดไม่สำเร็จ',
        text: this.status_usebank.status === true ? `${this.status_usebank.info}` : `${this.status_usebank.info}`
      })
      if (this.status_usebank.status === true) {
        await axios.post('/line/bank', {
          username: this.username,
          balance: trans_amount,
          info: trans_info,
          admin:this.$store.state.AppActiveUser.username
        })
        // setTimeout(() => {
        //   window.location.reload()
        // }, 1500)
        await this.onUploadFile()
        await store.commit('SET_STATUS_USEBANK', true)
      }
    },
    input_cancel (trans_no, trans_info, trans_amount) {
      this.username = ''
      this.trans_no = trans_no
      this.trans_info = trans_info
      this.trans_amount = trans_amount
      this.popup_cancel = true
    },
    async use_cancel (trans_no, trans_info, trans_amount) {
      this.popup_cancel = false
      await axios
        .post('bank/canceldeposit', {
          bank: this.$route.params.bank,
          bankfor: this.$route.params.id,
          username: this.username,
          trans_no
        })
        .then(response => (this.status_usecancel = response.data))
      this.$vs.notify({
        time: this.status_usecancel.status === true ? 3000 : 8000,
        color: this.status_usecancel.status === true ? 'success' : 'danger',
        position: 'top-right',
        icon:  this.status_usecancel.status === true ? 'check_box' : 'error',
        title: this.status_usecancel.status === true ? 'ใช้ยอดสำเร็จ' : 'ใช้ยอดไม่สำเร็จ',
        text: this.status_usecancel.status === true ? `${this.status_usecancel.info}` : `${this.status_usecancel.info}`
      })
      if (this.status_usecancel.status === true) {
        await log.agent('', 'Cancel_Deposit', 0, `ยกเลิกยอดฝาก: ${  trans_info  } จำนวนเงิน: ${  trans_amount}`)
      }
      await store.commit('SET_STATUS_USEBANK', true)
    },
    onFileChange (e) {
      const selectedFile = e.target.files[0]
      this.selectedFile = selectedFile
    },
    async  onUploadFile () {
      const formData = new FormData()
      formData.append('file', this.selectedFile)
      formData.append('topupid', this.status_usebank.data)  // appending file

      // sending file to the backend
      await axios
        .post('upload/upload', formData)
        .then(
        //   res => {
        //   console.log(res)
        // }
        )
        .catch(
        //   err => {
        //   console.log(err)
        // }
        )
    },
    retrieveImageFromClipboardAsBlob (pasteEvent, callback) {
      if (pasteEvent.clipboardData === false) {
        if (typeof (callback) === 'function') {
          callback(undefined)
        }
      }

      const items = pasteEvent.clipboardData.items

      if (items === undefined) {
        if (typeof (callback) === 'function') {
          callback(undefined)
        }
      }

      for (let i = 0; i < items.length; i++) {
        // Skip content if not image
        if (items[i].type.indexOf('image') === -1) continue
        // Retrieve image on clipboard as blob
        const blob = items[i].getAsFile()

        if (typeof (callback) === 'function') {
          callback(blob)
          this.selectedFile = blob
        }
      }
    },
    onPaste (evt) {
      // console.log('on paste', evt)
      // Handle the event
      this.retrieveImageFromClipboardAsBlob(evt, function (imageBlob) {
        // If there's an image, display it in the canvas
        if (imageBlob) {
          const canvas = document.getElementById('mycanvas')
          const ctx = canvas.getContext('2d')
            
          // Create an image to render the blob on the canvas
          const img = new Image()

          // Once the image loads, render the img on the canvas
          img.onload = function () {
            // Update dimensions of the canvas with the dimensions of the image
            canvas.width = 300
            canvas.height = 300

            // Draw the image
            ctx.drawImage(img, 0, 0)
          }

          // Crossbrowser support for URL
          const URLObj = window.URL || window.webkitURL

          // Creates a DOMString containing a URL representing the object given in the parameter
          // namely the original Blob
          img.src = URLObj.createObjectURL(imageBlob)
        }
      })
    }

  }
}

</script>
