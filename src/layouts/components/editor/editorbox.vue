<template>
  <div>
    <h6 class="mb-4">{{ name }}</h6>

    <quill-editor v-model="current_text" :options="editorOption" />
    <!-- {{ current_text }} -->
    <vs-input class="w-full mb-base" label-placeholder="Link รูป (ex. http//xxx.com//yyy.jpg)" v-model="current_url" />
    <p>สถานะ Popup</p>

    <vs-switch v-model="current_status">
      <span slot="on">เปิด</span>
      <span slot="off">ปิด</span>
    </vs-switch>

    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button color="success" class="ml-auto mt-2" @click="Save">บันทึกข้อมูล</vs-button>
    </div>
  </div>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import axios from '../../../axios'
import log from '../../../log'
import { quillEditor } from 'vue-quill-editor'
import store from '../../../store/store'

export default {
  name: 'editor',
  props: ['content', 'name', 'status', 'url'],
  data () {
    return {
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'link'],
            [
              {
                color: ['purple', 'deepskyblue', 'blue', 'green', 'yellow', 'orange', 'red']
              }
            ],
            [
              {
                header: [1, 2, 3, 4, 5, 6, false]
              }
            ]
          ]
        }
      },
      current_text: this.content,
      current_status: this.status,
      current_url: this.url,
      status_popup: '',
      log_info: ''
    }
  },
  components: {
    quillEditor
  },
  methods: {
    async Save () {
      await axios
        .post('settingpopup/settingpopup', {
          name: this.name,
          current_text: this.current_text,
          current_url: this.current_url,
          current_status: this.current_status
        })
        .then(response => (this.status_popup = response.data))
      if (this.status_popup.status === true) {
        this.$vs.notify({
          time: 3000,
          color: 'success',
          position: 'top-right',
          icon: 'check_box',
          title: 'ทำรายการแก้ไข Popup สำเร็จ',
          text: `หน้า : ${this.name}`
        })
        await this.comparedata()
        await log.data('', 'Edit_Popup', 0, `แก้ไขป๊อบอัพหน้า ${this.name} : ${this.log_info}`)
        store.commit('SET_STATUS_POPUP', true)
        // setTimeout(() => {
        //   window.location.reload()
        // }, 1500)
      } else {
        this.$vs.notify({
          time: 8000,
          color: 'warning',
          position: 'top-right',
          icon: 'error',
          title: 'ทำรายการแก้ไข Popup ไม่สำเร็จ',
          text: `หน้า : ${this.name}`
        })
      }
      if (this.status_popup.status === false && this.status_popup.error !== 0) {
        this.$vs.notify({
          time: 8000,
          color: 'danger',
          position: 'top-right',
          icon: 'error',
          title: 'ทำรายการแก้ไข Popup ไม่สำเร็จ',
          text: this.status_popup.info
        })
      }
    },
    comparedata () {
      if (this.content !== this.current_text) {
        this.log_info += `ข้อความ : ${this.content} => ${this.current_text}`
      }
      if (this.url !== this.current_url) {
        this.log_info += `ลิ้งค์รูป : ${this.url} => ${this.current_url}`
      }
      if (this.status !== this.current_status) {
        this.log_info += `สถานะป๊อบอัพ : ${this.status} => ${this.current_status}`
      }
    }
  }
}
</script>
