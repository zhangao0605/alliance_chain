<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="200px" class="form center-row">
    <div class="tips tcw_auxiliary_text">
      <div>为了核实真实信息，保障您的账户安全，需要填写企业实名认证信息</div>
      <div>身份信息一经录入不可更改，隐私信息未经本人许可严格保密</div>
      <div>由于涉及建立测试链等操作，为防止服务器过载，注册时需对您的身份进行审核，审核完成后方可登陆</div>
    </div>
    <div>
      <el-form-item label="单位用户名">
        <span>{{form.account}}</span>
      </el-form-item>
    </div>
    <el-divider></el-divider>
    <div>
      <el-form-item label="选择单位类型" prop="companyType">
        <el-select v-model="form.companyType" placeholder="请选择">
          <el-option :label="item.name" :value="item.name" :key="item.name" v-for="item in companyTypeList"></el-option>
        </el-select>
      </el-form-item>
    </div>
    <el-divider></el-divider>
    <div>
      <div class="tcw_title">单位基本信息</div>
      <el-form-item label="单位名称" prop="companyName">
        <el-input v-model="form.companyName" class="input"></el-input>
      </el-form-item>
      <el-form-item label="社会信用代码(注册号)" prop="socialCreditCode">
        <el-input v-model="form.socialCreditCode" class="input"></el-input>
      </el-form-item>
      <el-form-item label="营业执照" prop="businessLicense">
        <span style="color: #999" class="tcw_auxiliary_text">请上传彩色原件或加盖公司公章的复印件</span>
        <ImgUpload style="width:255px; height:162px" @onGetFile="getImageFile" name="businessLicense"/>
      </el-form-item>
    </div>
    <el-divider></el-divider>
    <div>
      <div class="tcw_title">法定代表人证件</div>
      <el-form-item label="法定代表人归属地" prop="legalPersonLocation">
        <el-select v-model="form.legalPersonLocation" placeholder="请选择">
          <el-option :label="item.name" :value="item.name" :key="item.name" v-for="item in legalPersonLocationList"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="身份证" prop="legalPersonIdCardFront">
        <div class="img-group">
          <ImgUpload style="width:255px; height:162px" @onGetFile="getImageFile" name="legalPersonIdCardFront"/>
          <img alt="身份证" src="../../../assets/image/user/id-front.png" class="example" />
        </div>
        <div class="img-group">
          <ImgUpload style="width:255px; height:162px" @onGetFile="getImageFile" name="legalPersonIdCardBack"/>
          <img alt="身份证" src="../../../assets/image/user/id-back.png" class="example"/>
        </div>
      </el-form-item>
        <el-form-item label="填写人身份" prop="submitterIdentity">
          <el-radio-group v-model="form.submitterIdentity">
            <el-radio :label="item.name" :value="item.name" :key="item.name" v-for="item in submitterIdentityList" ></el-radio>
          </el-radio-group>
        </el-form-item>
    </div>
    <div :class="{show: form.submitterIdentity === '代理人'}" class="agent-info">
      <el-divider></el-divider>
      <div>
        <div class="tcw_title">代理人证件</div>
        <el-form-item label="身份证" prop="agentPersonIdCardFront">
          <div class="img-group">
            <ImgUpload style="width:255px; height:162px" @onGetFile="getImageFile" name="agentPersonIdCardFront"/>
            <img alt="身份证" src="../../../assets/image/user/id-front.png" class="example"/>
          </div>
          <div class="img-group">
            <ImgUpload style="width:255px; height:162px" @onGetFile="getImageFile" name="agentPersonIdCardBack"/>
            <img alt="身份证" src="../../../assets/image/user/id-back.png" class="example"/>
          </div>
        </el-form-item>
        <el-form-item label="代理委托书" prop="agentPersonProof">
          <span style="color: #999" class="tcw_auxiliary_text">委托书必须带有公司公章或财务公章</span>
          <ImgUpload style="width:255px; height:162px" @onGetFile="getImageFile" name="agentPersonProof"/>
        </el-form-item>
      </div>
    </div>
    <div class="__btn-group">
      <el-button class="previous" @click="goBack" round>上一步</el-button>
      <el-button type="primary" class="next" @click="submit"  v-loading.fullscreen.lock="nextBtnLoading" round>下一步</el-button>
    </div>
  </el-form>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  import { RegistrationInfoReviewResultEnum, RegistrationReviewResultForPageEnum } from '../../../utils/data/enum'
  import { isNullOrEmpty } from '../../../utils/tools'
  import { ruleOfSocialCreditCode } from '../../../utils/rules'
  import { validSocialCreditCode } from '../../../utils/validate'
  import userApi from '../../../apis/userApi'

  const { mapMutations } = createNamespacedHelpers('user')
  export default {
    name: 'InformationSetting',
    data () {
      const companyTypeList = [
        {name: '企业'},
        {name: '个体户'},
        {name: '事业单位'},
        {name: '社会团体'},
        {name: '民办非事业单位'},
        {name: '党政及国家机关'},
      ]
      const legalPersonLocationList = [
        {name: '中国大陆'}
      ]
      const submitterIdentityList = [
        {name: '法定代表人'},
        {name: '代理人'},
      ]
      return {
        companyTypeList: companyTypeList,
        legalPersonLocationList: legalPersonLocationList,
        submitterIdentityList: submitterIdentityList,
        form: {
          account: '晨星',
          companyType: '',         // 单位类型
          companyName: '',         // 单位名称
          socialCreditCode: '',    // 社会信用代码
          legalPersonLocation: '', // 法定代表人归属地
          submitterIdentity: '',   // 填写人身份
          businessLicense: '',     // 营业执照
          legalPersonIdCardFront: '', // 法定代表人身份证正面
          legalPersonIdCardBack: '',  // 法定代表人身份证反面
          agentPersonIdCardFront: '', // 代理人身份证正面
          agentPersonIdCardBack: '',  // 代理人身份证反面
          agentPersonProof: ''        // 代理委托书
        },
        rules: {
          companyType:[
            { required: true, message: this.$lan('请选择单位类型'), trigger: 'blur' },
          ],
          companyName:[
            { required: true, message: this.$lan('请填写单位名称'), trigger: 'blur' },
          ],
          socialCreditCode:[
            { required: true, message: this.$lan('请填写社会信用代码'), trigger: 'blur' },
            { pattern: ruleOfSocialCreditCode, message: this.$lan('请填写正确的社会信用代码'), trigger: 'blur' }
          ],
          legalPersonLocation:[
            { required: true, message: this.$lan('请选择法定代表人归属地'), trigger: 'blur' },
          ],
          submitterIdentity:[
            { required: true, message: this.$lan('请选择填写人身份'), trigger: 'blur' },
          ],
          businessLicense:[
            { required: true, message: this.$lan('请上传营业执照'), trigger: 'blur' },
          ],
          legalPersonIdCardFront:[
            { required: true, message: this.$lan('请上传身份证正面'), trigger: 'blur' },
          ],
          legalPersonIdCardBack:[
            { required: true, message: this.$lan('请上传身份证背面'), trigger: 'blur' },
          ],
          agentPersonIdCardFront:[
            { required: true, message: this.$lan('请上传身份证正面'), trigger: 'blur' },
          ],
          agentPersonIdCardBack:[
            { required: true, message: this.$lan('请上传身份证背面'), trigger: 'blur' },
          ],
          agentPersonProof:[
            { required: true, message: this.$lan('请上传代理委托书'), trigger: 'blur' },
          ]
        },
        type: '',
        imageUrl: '',
        nextBtnLoading: false
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        let query = this.$route.query || {}
        let token = query.token
        let account = query.account
        let reSubmit = query.reSubmit
        if(token && account){
          this.SET_TOKEN(token)
          this.SET_ACCOUNT(account)
          this.form.account = account
          if (!reSubmit) {
            setTimeout(() => {
              userApi.getAccountInfo().then((res) => {
                let data = res['data'] || {}
                // UserTypeEnum.COMPANY 为企业注册，企业用户需要检查注册资质有没有审核
                if (data.applyStatus === RegistrationInfoReviewResultEnum.APPROVED) {
                  this.$router.push({
                    path: '/login'
                  })
                } else if (data.applyStatus === RegistrationInfoReviewResultEnum.IN_REVIEWING) {
                  this.$router.push({
                    path: '/registerResult',
                    query: {
                      result: RegistrationReviewResultForPageEnum.REVIEWING,
                    }
                  })
                } else if (data.applyStatus === RegistrationInfoReviewResultEnum.REJECTED) {
                  this.$router.push({
                    path: '/registerResult',
                    query: {
                      result: RegistrationReviewResultForPageEnum.FAIL,
                      token: token,
                      account: data.email
                    }
                  })
                }

              }).catch(() => {

              })
            })
          }
        }else{
          this.$router.push({name: 'registerResult', query: {result: RegistrationReviewResultForPageEnum.INVALID}})
        }


      },
      ...mapMutations(['SET_TOKEN', 'SET_ACCOUNT', 'REMOVE_TOKEN']),
      goBack () {
        this.$emit('handleBack')
      },
      getImageFile(res){
        if (res) {
          this.form[res.name] = res.file;
        }
      },
      submit () {

        this.tipsBeforeSubmit().then(() => {
          this.nextBtnLoading = true;
          userApi.submitAccountInfo(this.form.companyName,
            this.form.companyType,
            this.form.socialCreditCode,
            this.form.legalPersonLocation,
            this.form.submitterIdentity,
            this.form.businessLicense,
            this.form.legalPersonIdCardFront,
            this.form.legalPersonIdCardBack,
            this.form.agentPersonIdCardFront,
            this.form.agentPersonIdCardBack,
            this.form.agentPersonProof).then((res) => {
            this.nextBtnLoading = false;
            this.$message({
              message: '上传成功',
              type: 'success'
            })
            let that = this
            setTimeout(() => {
              that.REMOVE_TOKEN()
              that.$emit('handleNext')
              that.nextBtnLoading = false;
            }, 1000)
          }).catch(() => {
            this.nextBtnLoading = false;
          })
        }).catch((err) => {
          console.log(err)
        })

      },
      tipsBeforeSubmit () {
        return new Promise((resolve, reject) => {
          if (!this.form.companyType) {
            this.warning('前选择单位类型')
            reject()
          } else if (!this.form.companyName) {
            this.warning('请填写单位名称')
            reject()
          } else if (!this.form.socialCreditCode) {
            this.warning('请填写社会信用代码')
            reject()
          } else if (!validSocialCreditCode(this.form.socialCreditCode)) {
            this.warning('请填写正确的社会信用代码')
            reject()
          } else if (!this.form.businessLicense) {
            this.warning('请上传营业执照')
            reject()
          } else if (!this.form.legalPersonLocation) {
            this.warning('请选择法定代表人归属地')
            reject()
          } else if (!this.form.legalPersonIdCardFront) {
            this.warning('请上传法定代表人证件')
            reject()
          } else if (!this.form.legalPersonIdCardBack) {
            this.warning('请上传法定代表人证件')
            reject()
          } else if (!this.form.submitterIdentity) {
            this.warning('请选择填写人身份')
            reject()
          }

          if ( this.form.submitterIdentity === '代理人') {
           if (!this.form.agentPersonIdCardFront) {
              this.warning('请上传代理人证件')
              reject()
            } else if (!this.form.agentPersonIdCardBack) {
              this.warning('请上传代理人证件')
              reject()
            } else if (!this.form.agentPersonProof) {
              this.warning('请上传代理委托书')
              reject()
            } else {
              resolve()
            }
          } else if ( this.form.submitterIdentity === '法定代表人'){
            resolve()
          }


        })
      },
      warning (text) {
        this.$message({
          message: text,
          type: 'warning'
        })
      },

    },
    beforeDestroy () {
      this.REMOVE_TOKEN()
    }
  }
</script>

<style scoped lang="scss">
  .form{
    width: 800px;
    padding: 0 0 60px;
    .tips{
      color: #666;
      margin-bottom:40px;
      padding: 20px  80px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      background: #fff;
    }
    .tcw_title{
      width: 200px;
      text-align: right;
      margin-bottom: 20px;
      padding-right: 10px;
    }
    .input{
      width: 350px;
    }
    .id-upload{
      width: 200px;
      height: 100px;
    }
    .__btn-group{
      width: 100%;
      margin: 30px 0;
      text-align: center;
       >button{
         width: 220px;
       }
    }
    .img-group{
      display: flex;
      .example{
        width: 255px;
        height: 162px;
        margin-left: 30px;
      }
    }
    .img-group+.img-group{
      margin-top: 40px;
    }
    .agent-info {
      height: 0;
      overflow: hidden;
      &.show {
        height: 700px;
      }
      transition: height 0.3s linear;
    }
    /deep/.id-uploader{
      display: inline-block;
      .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 255px;
        height: 162px;
        line-height: 162px;
        text-align: center;
        background: #fbfdff;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
    /deep/.id-uploader+.id-uploader{
      margin-left: 20px;
    }
    /deep/.normal-uploader{
      .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 255px;
        height: 162px;
        line-height: 162px;
        text-align: center;
        background: #fbfdff;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }


    }

  }

</style>
