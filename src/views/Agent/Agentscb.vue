<template>


  <div>
    <div class="vx-card p-6">
      <div class="flex flex-wrap items-center">
        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          <h4>เติม-ถอน เครดิต <small>หากต้องการลบเครดิต ให้เติม - ข้างหน้ายอดเงิน</small></h4>
          
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
            
            <vs-input class="w-full" v-validate="'required'" label-placeholder="กรอกเลขบัญชี 4 ตัวท้าย" v-model="bankno" name="bankno" />
            <span class="text-danger text-sm" v-show="errors.has('bankno')">{{ errors.first('bankno') }}</span>
          </div>
          <div class="mt-8">
           
            <vs-input class="w-full" v-validate="'required'" label-placeholder="คำนำหน้า (นาย,นาง,นางสาว)" v-model="prefix" name="prefix" />
            <span class="text-danger text-sm" v-show="errors.has('prefix')">{{ errors.first('prefix') }}</span>
          </div>
          <div class="mt-8">
            
            <vs-input class="w-full" v-validate="'required'" label-placeholder="ชื่อ" v-model="firstname" name="firstname" />
            <span class="text-danger text-sm" v-show="errors.has('firstname')">{{ errors.first('firstname') }}</span>
          </div>
          <div class="mt-8">
            <vs-input class="w-full" v-validate="'required'" label-placeholder="นามสกุล" v-model="lastname" name="lastname" />
            <span class="text-danger text-sm" v-show="errors.has('lastname')">{{ errors.first('lastname') }}</span>
          </div>
        <div class="mt-4">
          <label class="vs-input--label">ธนาคาร</label>
          <vs-select class="w-full" v-model="banktype" >
            <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in options_bank"/>
          </vs-select>
        </div>
          <div class="mt-8">
               <h4>กรอกเวลา <small class="text-danger">กรุณากรอกข้อมูลให้ตรงตามตัวอย่าง (2020-09-01 21:35:00)  (2020-12-25 17:41:00) ไม่ต้องใส่วงเล็บ</small></h4>
            <vs-input class="w-full" v-validate="'required'" v-model="time" name="time" />
            <span class="text-danger text-sm" v-show="errors.has('time')">{{ errors.first('time') }}</span>
          </div>
           <div class="mt-8">
             <label class="vs-input--label">เลือกชื่อบัญชี</label>
         <vs-select  class="w-full mt-4" v-model="bankfor" >
           <vs-select-item  :key="index" :value="item.bank_id" :text="item.bank_fullname" v-for="(item,index) in bankscb" />
                
        </vs-select>
           </div>
          <!-- <label> อัพสลิปธนาคาร </label>
          <div class="mt-2">
          <input type="file"  @change="onFileChange" />
              <button @click="onUploadFile" class="upload-button" :disabled="!this.selectedFile">Upload file</button>  
          </div> -->
          
          <label> อัพสลิปธนาคาร COPY & PASTE </label>
          <div class="mt-2">
          <vs-input class="inputx" placeholder="กรุณาวางรูป" :value="selectedFile.name" @paste="onPaste"/>
          <vs-checkbox disabled="true" class="mt-2" :color="chk_box.color" v-model="chk_box.data">{{chk_box.text}}</vs-checkbox>
          <canvas  style="border:1px solid grey;" id="mycanvas" width="100" height="100" hidden></canvas>
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
import axios from '../../axios'
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
import log from '../../log'
// register custom messages
Validator.localize('en', dict)

export default {
  data () {
    return {
      username: '',
      bankfor:'กรุณาเลือกบัญชีที่ลูกค้าโอน',
      amount: '',
      time:0,
      bankno:'',
      prefix:'',
      banktype:'',
      firstname:'',
      lastname:'',
      bankscb:'',
      agent_error: {},
      selectedFile: [],
      chk_box: {text: 'กรุณาวางรูป', color: 'danger', data: false},
      options_bank: [
        {
          text: 'ไทยพาณิชย์',
          value: 'ไทยพาณิชย์'
        }, {
          text: 'กรุงเทพ',
          value: 'กรุงเทพ'
        }, {
          text: 'กสิกรไทย',
          value: 'กสิกรไทย'
        }, {
          text: 'กรุงไทย',
          value: 'กรุงไทย'
        },
        {
          text: 'ธกส',
          value: 'ธกส'
        }, {
          text: 'ทหารไทย',
          value: 'ทหารไทย'
        }, {
          text: 'ไอซีบีซี',
          value: 'ไอซีบีซี'
        }, {
          text: 'ไทยเครดิต',
          value: 'ไทยเครดิต'
        },
        {
          text: 'ซิตี้แบงก์',
          value: 'ซิตี้แบงก์'
        }, {
          text: 'ซูมิโตโม มิตซุย',
          value: 'ซูมิโตโม มิตซุย'
        }, {
          text: 'สแตนดาร์ดชาร์เต',
          value: 'สแตนดาร์ดชาร์เต'
        }, {
          text: 'ซีไอเอ็มบี',
          value: 'ซีไอเอ็มบี'
        },
        {
          text: 'ยูโอบี',
          value: 'ยูโอบี'
        }, {
          text: 'กรุงศรีฯ',
          value: 'กรุงศรีฯ'
        }, {
          text: 'ออมสิน',
          value: 'ออมสิน'
        }, {
          text: 'เอชเอสบีซี',
          value: 'เอชเอสบีซี'
        },
        {
          text: 'มิซูโฮ',
          value: 'มิซูโฮ'
        }, {
          text: 'ธอส.',
          value: 'ธอส'
        }, {
          text: 'แลนด์แอนด์เฮ้าส',
          value: 'แลนด์แอนด์เฮ้าส'
        }, {
          text: 'ธนชาต',
          value: 'ธนชาต'
        },
        {
          text: 'ทิสโก้',
          value: 'ทิสโก้'
        }, {
          text: 'เกียรตินาคิน',
          value: 'เกียรตินาคิน'
        }, {
          text: 'อิสลาม',
          value: 'อิสลาม'
        }
      ]
    }
  },
  computed: {},
  watch: {
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
    await axios
      .get('bank/bank/scb')
      .then(response => (this.bankscb = response.data))
  },
  methods: {
    async submit_credit () {
      this.$validator.validateAll().then(async result => {
        if (result) {
          if (this.amount !== '0') {
            if (this.amount > '0') {
              if (this.selectedFile.size > 0) {
                await axios.post('/agent/addcreditscb', {
                  username: this.username,
                  balance: this.amount,
                  info: this.info,
                  bankno:this.bankno,
                  prefix:this.prefix,
                  firstname:this.firstname,
                  lastname:this.lastname,
                  time:this.time,
                  bankfor:this.bankfor,
                  banktype:this.banktype
                })
                  .then(response => (this.agent_error = response.data))
                if (this.agent_error.status === true) {
                  await log.agent(this.username, 'Add_credit', this.amount, 'Add_credit Bank-Scb')
                  setTimeout(() => {
                    window.location.reload()
                  }, 1500)
                  await this.$vs.notify({
                    time: 10000,
                    color: 'success',
                    position: 'top-right',
                    icon: 'error',
                    title: this.agent_error.info.title,
                    text: this.agent_error.info.info
                  })
                  await this.onUploadFile()
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
              } else {
                this.$vs.notify({
                  time: 10000,
                  color: 'danger',
                  position: 'top-right',
                  icon: 'error',
                  title: 'ทำรายการไม่สำเร็จ',
                  text: 'กรุณาอัพสลิปหรือภาพที่เกี่ยวข้องกับการเพิ่มเครดิต'
                })
              }
            } else {
              this.$vs.notify({
                time: 10000,
                color: 'danger',
                position: 'top-right',
                icon: 'error',
                title: 'Error',
                text: 'ไม่สามารถทำรายการได้เนื่องจากจำนวนเงิน ติดลบ '
              })
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
              admin: this.$store.state.AppActiveUser.username
            })
          }

        } else {
          this.$vs.notify({
            time: 3000,
            color: 'danger',
            position: 'top-right',
            icon: 'error',
            title: this.banktype,
            text: 'กรุณากรอกข่อมูลให้ครบ'
          })

        }


      })
    },
    onFileChange (e) {
      const selectedFile = e.target.files[0]
      this.selectedFile = selectedFile
    },
    async  onUploadFile () {
      const formData = new FormData()
      formData.append('file', this.selectedFile)
      formData.append('topupid', this.agent_error.data)  // appending file

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
