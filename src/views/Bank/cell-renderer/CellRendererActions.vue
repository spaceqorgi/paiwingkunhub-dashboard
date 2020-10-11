<template>
<div>
  <!-- <div :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}">
      <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" />
      <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
    </div> -->
  <div class="my-2 inline-flex" v-if="params.data.trans_status !== 1 && params.data.trans_status !== 5 && params.data.trans_amount > 0">
    <vs-button size="small" color="success" type="filled" icon="description" @click="input_username()">ยังไม่ใช้งาน
    </vs-button>
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
      <!-- <vx-input-group class="mb-base">
        <template slot="prepend">
          <div class="prepend-text bg-primary">
            <span><small>อัพสลิปธนาคาร</small></span>
          </div>
        </template>
        <vs-input type="file" @change="onFileChange" />
      </vx-input-group> -->
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
      <vs-button v-if="this.selectedFile.size > 0" @click="use_bank(params.data.trans_no,params.data.trans_info,params.data.trans_amount)" color="primary" type="filled">OK</vs-button>
      <vs-button v-else disabled="false" color="primary" type="filled">OK</vs-button>
      
    </vs-popup>
  </div>

  <div :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}" v-else>
    <span class="text-success"></span>
  </div>
  </div>
</template>

<script>
import axios from '../../../axios'
import store from '../../../store/store'
export default {
  name: 'CellRendererActions',
  data () {
    return {
      popup_usebank: false,
      username: '',
      status_usebank: [],
      selectedFile: [],
      chk_box: {text: 'กรุณาวางรูป', color: 'danger', data: false}
    }
  },
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
  methods: {
    input_username () {
      this.username = ''
      this.popup_usebank = true
    },
    async use_bank (trans_no, trans_infom, trans_amount) {
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
          info: trans_infom,
          admin:this.$store.state.AppActiveUser.username
        })
        await this.onUploadFile()
        // setTimeout(() => {
        //   window.location.reload()
        // }, 1500)
        store.commit('SET_STATUS_USEBANK', true)
      }
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
