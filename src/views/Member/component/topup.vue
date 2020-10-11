 <template>
  <div id="page-user-list">
    
      <div class="flex flex-wrap items-center">

  
        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          <div class="vx-row">
            <div class="vx-col w-full">
            </div>
          </div>
          <br>

          <vx-card>

            <div class="export-table">
              <vs-table stripe pagination max-items="20" :data="memberData" search>

                <template slot="header">
                 <h3>ประวัติฝากเงิน 2 เดือนล่าสุด</h3>

                </template>

                <template slot="thead">
              
                   <vs-th >วัน/เวลา</vs-th>
                  <vs-th> ช่องทาง</vs-th>
                  <vs-th> จำนวนเงิน </vs-th>
                  <vs-th> ก่อนรับ </vs-th>
                  <vs-th> เครดิตที่ได้รับ </vs-th>
                  <vs-th> หลังรับ </vs-th>
                  <vs-th> รายละเอียด </vs-th>
         

                </template>

                <template slot-scope="{data}">
                 
                  <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
                    <!-- <vs-button radius color="primary" type="flat"   @click="gotomember(data[indextr].member_username)">{{ data[indextr].member_username}}</vs-button> -->
                    <vs-td>{{ data[indextr].topup_datetime}}</vs-td>
                    <vs-td>{{ data[indextr].topup_type}}</vs-td>
                    <vs-td>{{ data[indextr].topup_amount }}</vs-td>
                    <vs-td>{{ data[indextr].topup_before}}</vs-td>
                    <vs-td>{{ data[indextr].topup_credit}}</vs-td>
                    <vs-td>{{ data[indextr].topup_after}}</vs-td>
                    <vs-td>{{ data[indextr].topup_info}}</vs-td>
                      
                  </vs-tr>
                  
                </template>

              </vs-table>
            </div>
          </vx-card>

        </div>
      </div>
    
  </div>

</template>
<script>
import vSelect from 'vue-select'
import axios from '../../../axios'
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    vSelect
  },
  data () {
    return {
      
      memberData: []
    }
  },
  mounted () {
    axios
      .get(`/member/${  this.$route.params.username}/topup`)
      .then(response => (this.memberData = response.data))
  }
}


</script>

<style lang="scss" scooped>
  #page-user-list {
    .user-list-filters {
      .vs__actions {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-58%);
      }
    }
  }
</style>
