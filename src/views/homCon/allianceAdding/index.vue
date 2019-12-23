<template>
  <div id="allianceAdding">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>新建联盟</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :rules="rules" :model="form" label-width="150px" class="form">
      <el-form-item label="申请单位名称：">
        <span>{{companyName}}</span>
      </el-form-item>
      <el-form-item label="联盟名称：" prop="name">
        <el-input v-model="form.name" ></el-input>
      </el-form-item>
      <el-form-item label="所属行业：" prop="vocation">
        <el-input v-model="form.vocation"></el-input>
      </el-form-item>
      <el-form-item label="联盟用途：" prop="description">
        <el-input v-model="form.description"
                  type="textarea"
                  :rows="3"></el-input>
      </el-form-item>
      <el-form-item label="联系电话：" prop="phone">
        <el-input v-model="form.phone" ></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button class="btn-submit" @click="addAlliance" :loading="btnLoading">提交</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import allianceManagementApi from '../../../apis/allianceManagementApi'

  const { addAlliance } = allianceManagementApi
  export default {
    data () {
      return {
        form: {
          name: '',
          vocation: '',
          description: '',
          phone: ''
        },
        rules:{
          name: [
            { required: true, message: this.$lan('请输入联盟名称'), trigger: 'blur' },
          ],
          vocation: [
            { required: true, message: this.$lan('请输入所属行业'), trigger: 'blur' },
          ],
          description: [
            { required: true, message: this.$lan('请输入用途'), trigger: 'blur' },
          ],
          phone: [
            { required: true, message: this.$lan('请输入联系电话'), trigger: 'blur' },
          ]
        },
        btnLoading: false
      }
    },
    computed: {
      companyName () {
        return this.$store.getters.userInfo.companyName
      }
    },
    methods: {
      clear(){
        this.form.name = '';
        this.form.vocation = '';
        this.form.description = '';
        this.form.phone = '';
      },
      addAlliance () {
        let {name, description, phone, vocation} = this.form
        if(name && description && phone && vocation){
          this.btnLoading = true
          addAlliance(name, description, phone, vocation ).then(() => {
            this.$confirm('创建成功，请等待审核！', '提示', {
              distinguishCancelAndClose: true,
              confirmButtonText: '继续创建',
              cancelButtonText: '返回上一页'
            })
              .then(() => {
                this.clear()
              })
              .catch(() => {
                history.back()
              });
            this.btnLoading = false
            this.$router.push('')
          }).catch(() => {
            this.btnLoading = false
          })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  #allianceAdding{
    .form{
      margin-top: 40px;
      width: 500px;
      .input{
        width: 400px;
      }
      .btn-submit{
        margin-top: 20px;
        width: 150px;
      }
    }
  }

</style>
