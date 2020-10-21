<template>
  <div>
    <div class="vx-card p-6">
      <div class="flex flex-wrap items-center">
        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          <!-- START SECTION -->
          <h4 class="my-10">ข้อมูลงานวิ่ง</h4>
          <!-- INPUT GROUP -->
          <div class="mt-10">
            <vs-input
              class="w-full"
              v-validate="'required'"
              label-placeholder="ชื่องาน"
              v-model="name"
              name="name"
            />
            <span class="text-danger text-sm" v-show="errors.has('name')">{{
                errors.first('name')
              }}</span>
          </div>
          <!-- END INPUT GROUP -->
          <!-- INPUT GROUP -->
          <div class="mt-10">
            <vs-textarea
              class="w-full"
              v-validate="'required'"
              label="คำอธิบาย"
              v-model="description"
              name="description"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('description')"
            >{{ errors.first('description') }}</span
            >
          </div>
          <!-- END INPUT GROUP -->
          <!-- INPUT GROUP -->
          <div class="mt-10">
            <vs-input
              class="w-full"
              v-validate="'required'"
              label-placeholder="เว็บไซต์งานวิ่ง"
              v-model="website"
              name="website"
            />
            <span class="text-danger text-sm" v-show="errors.has('website')">{{
                errors.first('website')
              }}</span>
          </div>
          <!-- END INPUT GROUP -->
          <!-- INPUT GROUP -->
          <div class="mt-10 mb-5">
            <vs-input
              class="w-full"
              v-validate="'required'"
              label-placeholder="สถานที่จัด"
              v-model="location"
              name="location"
            />
            <span class="text-danger text-sm" v-show="errors.has('location')">{{
                errors.first('location')
              }}</span>
          </div>
          <!-- END INPUT GROUP -->
          <!-- INPUT GROUP -->
          <div class="mt-2">
            <label>อัพโหลดรูปภาพ</label>
            <vs-input
              class="inputx"
              placeholder="คัดลอกรูป และวางที่นี่"
              :value="selectedFile.name"
              @paste="onPaste"
            />
            <vs-checkbox
              class="my-5"
              disabled="true"
              :color="chk_box.color"
              v-model="chk_box.data"
            >{{ chk_box.text }}
            </vs-checkbox>
            <canvas
              style="border: 1px solid grey"
              id="mycanvas"
              width="200"
              height="200"
            ></canvas>
          </div>
          <!-- END INPUT GROUP -->
          <!-- END SECTION -->
          <vs-divider/>
          <!-- START SECTION -->
          <!--TODO: Continue here-->
          <h4 class="my-10">ข้อมูลตั๋ว</h4>
          <!-- END SECTION -->
          <vs-divider/>
          <!-- START SECTION -->
          <h4 class="my-10">ข้อมูลผู้จัด</h4>
          <!-- INPUT GROUP -->
          <div class="mt-10">
            <vs-input
              class="w-full"
              v-validate="'required'"
              label-placeholder="ไอดีผู้จัด"
              v-model="organizer_id"
              name="organizer_id"
            />
            <span class="text-danger text-sm"
                  v-show="errors.has('organizer_id')">{{ errors.first('organizer_id') }}</span>
          </div>
          <!-- END INPUT GROUP -->
          <!-- INPUT GROUP -->
          <div class="mt-6 flex flex-wrap items-center justify-end">
            <vs-button
              color="success"
              type="relief"
              class="mt-8"
              @click="addNewEvent"
            >เพิ่มงานวิ่ง
            </vs-button
            >
          </div>
          <!-- END INPUT GROUP -->
          <!-- END SECTION -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Validator} from 'vee-validate'
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
// register custom messages
Validator.localize('en', dict)

export default {
  data () {
    return {
      name: '',
      description: '',
      website: '',
      location: '',
      event_start_date: '',
      event_end_date: '',
      register_start_date: '',
      register_end_date: '',
      ticket: '',
      organizer_id: '',
      selectedFile: [],
      chk_box: {text: 'กรุณาวางรูป', color: 'danger', data: false}
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
  methods: {
    async addNewEvent () {
      this.$validator.validateAll().then(async result => {
        if (result) {
          const formData = new FormData()
          formData.append('name', this.name)
          formData.append('description', this.description)
          formData.append('website', this.website)
          formData.append('location', this.location)
          formData.append('event_start_date', this.event_start_date)
          formData.append('event_end_date', this.event_end_date)
          formData.append('register_start_date', this.register_start_date)
          formData.append('register_end_date', this.register_end_date)
          formData.append('tickets', this.ticket)
          formData.append('organizer_id', this.organizer_id)
          if (this.selectedFile) formData.append('file', this.selectedFile)

          await axios
            .post('/event', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then((response) => {
              this.$vs.notify({
                time: 10000,
                color: 'success',
                position: 'top-right',
                icon: 'success',
                title: 'บันทึกข้อมูลสำเร็จ',
                text: `เพิ่มงานวิ่ง ${response.data.id}:${response.data.name} สำเร็จ`
              })
            })
            .catch(() => {
              this.$vs.notify({
                time: 10000,
                color: 'error',
                position: 'top-right',
                icon: 'error',
                title: 'บันทึกข้อมูลไม่สำเร็จ',
                text: 'ไม่สามารถเพิ่มงานวิ่งได้'
              })
            })
        }
      }).catch((error) => {
        this.$vs.notify({
          time: 10000,
          color: 'success',
          position: 'top-right',
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: error
        })
      })
    },
    onFileChange (e) {
      const selectedFile = e.target.files[0]
      this.selectedFile = selectedFile
    },
    async onUploadFile () {
      const formData = new FormData()
      formData.append('file', this.selectedFile)
      // sending file to the backend
      await axios.post('upload/upload', formData).then().catch()
    },
    retrieveImageFromClipboardAsBlob (pasteEvent, callback) {
      if (pasteEvent.clipboardData === false) {
        if (typeof callback === 'function') {
          callback(undefined)
        }
      }

      const items = pasteEvent.clipboardData.items

      if (items === undefined) {
        if (typeof callback === 'function') {
          callback(undefined)
        }
      }

      for (let i = 0; i < items.length; i++) {
        // Skip content if not image
        if (items[i].type.indexOf('image') === -1) continue
        // Retrieve image on clipboard as blob
        const blob = items[i].getAsFile()

        if (typeof callback === 'function') {
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
