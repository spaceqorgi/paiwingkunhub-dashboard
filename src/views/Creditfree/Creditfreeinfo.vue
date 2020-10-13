<template>
  <div>
      <div class="vx-card p-6">
      <div class="flex flex-wrap items-center">
        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          <h4>แก้ไขลิงค์ Fanpage&Post</h4>
          
          <div class="mt-8">
            <vs-input class="w-full"  label-placeholder="ลิงค์ Fanpage"
              v-model="Fanpage" name="username" />           
          </div>
          <div class="mt-8">
            <vs-input class="w-full"  label-placeholder="ลิงค์ Post" v-model="post"
              name="post" />           
          </div>
          <vs-button color="success" type="relief" class="mt-8" @click="editlink()">แก้ไข</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../axios'
export default {
  data () {
    return {
      post:'',
      Fanpage:'',
      info:[],
      status:[]
      
    }
  },
  async mounted () {    
    await axios
      .get('creditfree/showinfo')
      .then(response => (this.info = response.data))
    this.post = this.info[0].post
    this.Fanpage = this.info[0].fanpage
  },
  methods:{
    async editlink () {
      await axios
        .post('creditfree/editinfo', {
          fanpage:this.Fanpage,
          post:this.post
        }).then(response => (this.status = response.data))
      if (this.status.status === true) {
        this.$vs.notify({
          time:4000,
          color: 'success',
          position:'top-right',
          icon:  'check_box',
          title: 'ทำรายการสำเร็จ',
          text: this.status.info
        })
      } else {
        this.$vs.notify({
          time:4000,
          color: 'danger',
          position:'top-right',
          icon:  'error',
          title: 'ทำรายการไม่สำเร็จ',
          text: this.status.info
        })
      }     
    } 
  } 
  

}
</script>

<style>

</style>