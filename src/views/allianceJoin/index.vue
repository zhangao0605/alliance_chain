<template>
 <div id="allianceJoin">
    <p class="tips">点击按钮 确认加入<span class="tcw_color_primary">{{name}}</span>联盟</p>
    <el-button type="primary" class="join-btn" @click="joinAlliance">确认加入</el-button>
 </div>
</template>

<script>
  import allianceManagementApi from '../../apis/allianceManagementApi'
  const { joinAlliance } = allianceManagementApi
  export default {
    data(){
      return {
        name: '',
        companyConsortiumId: '',
      }
    },
    created () {
       this.name = this.$route.query.name || '';
       this.companyConsortiumId = Number(this.$route.query.id || '');
       let isLogin = this.$store.getters.isLogin
       if (!isLogin) {
         this.$router.push({
           name: 'login',
           query: {
             consortiumName: this.name,
             companyConsortiumId: this.companyConsortiumId
           }
         })
       }
    },
    methods: {
      joinAlliance () {
        joinAlliance(this.companyConsortiumId).then(() => {
          this.$message({
            message: '加入联盟成功',
            type: 'success',
          })
          let that = this
          setTimeout(() => {
            that.$router.replace('/home')
          },500)
        }).catch((err) => {
          let code = err['code']
          if(code == 801) {
            let that = this
            setTimeout(() => {
              that.$router.replace('/')
            },500)
          }
          //TODO
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  #allianceJoin {
    height: 100%;
    position: relative;
    .tips{
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 20px;
    }
    .join-btn{
      position: absolute;
      top: 42%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
