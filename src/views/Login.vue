<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
========================================================================================== -->


<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
    <div class="vx-col sm:w-1/4 md:w-1/4 lg:w-2/4 xl:w-2/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">

          <div class="vx-row no-gutter justify-center items-center">


            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="p-8 login-tabs-container">

                <div class="vx-card__title mb-5">
                  <h4 class="mb-4">เข้าสู่ระบบ</h4>
                  <p>ยินดีต้อนรับ, โปรดเข้าสู่ระบบ</p>
                </div>

                <div class="mt-3">
                  <vs-input name="username" icon-no-border icon="icon icon-user" icon-pack="feather"
                    label-placeholder="Username" v-model="username" @keyup.enter="login" class="w-full" />

                  <vs-input type="password" name="password" icon-no-border icon="icon icon-lock" icon-pack="feather"
                    label-placeholder="Password" v-model="password" @keyup.enter="login" class="w-full mt-6" />
                  <br />

                  <vs-button class="float-right" @click="login">เข้าสู่ระบบ</vs-button>
                  <br>

                </div>

              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login () {
      this.$vs.loading()
      const {
        username,
        password
      } = this
      const {
        dispatch
      } = this.$store
      dispatch('auth/login', {
        username,
        password
      }).then(() => {
        this.$vs.loading.close()
      })
        .catch(error => {
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Error',
            text: error.message,
            position: 'top-right',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        })
    }
  }
}

</script>

<style lang="scss">
  #page-login {
    .social-login-buttons {
      .bg-facebook {
        background-color: #1551b1
      }

      .bg-twitter {
        background-color: #00aaff
      }

      .bg-google {
        background-color: #4285F4
      }

      .bg-github {
        background-color: #333
      }
    }
  }

</style>
