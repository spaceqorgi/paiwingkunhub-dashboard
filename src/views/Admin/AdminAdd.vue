<template>
  <div>
    <vs-row vs-align="center">
      <vs-col vs-w="12">
        <div class="vx-card p-6">
          <div class="flex flex-wrap items-center">
            <!-- ITEMS PER PAGE -->
            <div class="flex-grow">
              <!-- START SECTION -->
              <h4 class="my-10">ข้อมูลแอดมิน</h4>
              <!-- INPUT GROUP -->
              <div class="mt-10">
                <vs-input
                  class="w-full"
                  v-validate="'required'"
                  label-placeholder="อีเมล"
                  v-model="username"
                  name="username"
                />
                <span class="text-danger text-sm" v-show="errors.has('username')">{{ errors.first('username') }}</span>
              </div>
              <!-- END INPUT GROUP -->

              <vs-divider />
              <!-- INPUT GROUP -->
              <div class="mt-10">
                <p>โปรดกรอกรหัสผ่านให้ตรงกัน</p>
                <vs-input
                  class="w-full"
                  v-validate="'required'"
                  label-placeholder="รหัสผ่าน"
                  v-model="password"
                  name="password"
                  type="password"
                />
                <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>
              </div>
              <!-- END INPUT GROUP -->
              <!-- INPUT GROUP -->
              <div class="mt-10">
                <vs-input
                  class="w-full"
                  v-validate="'required'"
                  label-placeholder="ยืนยันรหัสผ่าน"
                  v-model="confirmPassword"
                  name="confirmPassword"
                  type="password"
                />
                <span class="text-danger text-sm" v-show="errors.has('confirmPassword')">{{
                  errors.first('confirmPassword')
                }}</span>
              </div>
              <!-- END INPUT GROUP -->
              <vs-divider />

              <!-- INPUT GROUP -->
              <div class="mt-10">
                <vs-input
                  v-validate="'required'"
                  class="w-full"
                  label-placeholder="ชื่อ"
                  v-model="first_name"
                  name="first_name"
                />
                <span class="text-danger text-sm" v-show="errors.has('first_name')">{{
                  errors.first('first_name')
                }}</span>
              </div>
              <!-- END INPUT GROUP -->

              <!-- INPUT GROUP -->
              <div class="mt-10">
                <vs-input
                  v-validate="'required'"
                  class="w-full"
                  label-placeholder="นามสกุล"
                  v-model="last_name"
                  name="last_name"
                />
                <span class="text-danger text-sm" v-show="errors.has('last_name')">{{
                  errors.first('last_name')
                }}</span>
              </div>
              <!-- END INPUT GROUP -->

              <!-- INPUT GROUP -->
              <div class="mt-10">
                <vs-input
                  v-validate="'required'"
                  class="w-full"
                  label-placeholder="โทรศัพท์"
                  v-model="phone"
                  name="phone"
                />
                <span class="text-danger text-sm" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
              </div>
              <!-- END INPUT GROUP -->

              <!-- INPUT GROUP -->
              <div class="mt-10">
                <label>กรุณาเลือกประเภทแอดมิน</label>
                <v-select
                  v-model="selectedRole"
                  label="label"
                  :options="role_options"
                  :dir="$vs.rtl ? 'rtl' : 'ltr'"
                  v-validate="'required'"
                  name="role"
                  class="mt-5"
                />
                <span class="text-danger text-sm" v-show="errors.has('role')">{{ errors.first('role') }}</span>
              </div>
              <!-- END INPUT GROUP -->
              <!-- INPUT GROUP -->
              <div class="mt-6 flex flex-wrap items-center justify-end">
                <vs-button :disabled="!validateForm" color="success" type="relief" class="mt-8" @click="addNewAdmin"
                  >เพิ่มแอดมิน</vs-button
                >
              </div>
              <!-- END INPUT GROUP -->
            </div>
          </div>
        </div>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import axios from '../../axios'
import vSelect from 'vue-select'
import store from '@/store/store'

export default {
  components: {
    'v-select': vSelect,
  },
  data() {
    return {
      // Admin data
      username: '',
      password: '',
      confirmPassword: '',
      role: '',
      selectedRole: {},
      phone: '',
      first_name: '',
      last_name: '',
      AppActiveUser: store.state.AppActiveUser,
    }
  },
  computed: {
    role_options() {
      return [
        { id: 1, label: 'ผู้จัด' },
        { id: 3, label: 'แอดมิน' },
      ]
    },
    validateForm() {
      return (
        this.password === this.confirmPassword &&
        this.password !== '' &&
        this.username &&
        this.selectedRole !== {} &&
        this.phone &&
        this.first_name &&
        this.last_name
      )
    },
  },
  mounted() {
    if (this.AppActiveUser.role < 3) this.window.location.href = '/'
  },
  methods: {
    async addNewAdmin() {
      const formData = new FormData()
      formData.append('username', this.username)
      formData.append('password', this.password)
      formData.append('role', this.selectedRole.id)
      formData.append('phone', this.phone)
      formData.append('first_name', this.first_name)
      formData.append('last_name', this.last_name)
      formData.append('is_verified', 'true')

      await axios
        .post('/user', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          this.$vs.notify({
            time: 10000,
            color: 'success',
            position: 'top-right',
            icon: 'check',
            title: 'บันทึกข้อมูลสำเร็จ',
            text: `เพิ่มแอดมินสำเร็จ: '${response.data.data.username}'`,
          })
          this.$router.push(`/admin/${response.data.data.id}`)
        })
        .catch(() => {
          this.$vs.notify({
            time: 10000,
            color: 'danger',
            position: 'top-right',
            icon: 'error',
            title: 'บันทึกข้อมูลไม่สำเร็จ',
            text: 'ไม่สามารถเพิ่มแอดมินได้',
          })
        })
    },
  },
}
</script>
