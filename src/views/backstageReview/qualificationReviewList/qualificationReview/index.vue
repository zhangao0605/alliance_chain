<template>
  <div id="qualification-review">
    <el-form ref="form"  label-width="200px" class="form center-row">
      <div>
        <el-form-item label="单位用户名">
          <span>{{reviewDetail.email}}</span>
        </el-form-item>
        <el-form-item label="验证手机号">
          <span>{{reviewDetail.phone}}</span>
        </el-form-item>
      </div>
      <el-divider></el-divider>
      <div>
        <el-form-item label="单位类型">
          <span>{{reviewDetail.companyType}}</span>
        </el-form-item>
      </div>
      <el-divider></el-divider>
      <div>
        <div class="tcw_title">单位基本信息</div>
        <el-form-item label="单位名称">
          <span>{{reviewDetail.companyName}}</span>
        </el-form-item>
        <el-form-item label="社会信用代码(注册号)">
          <span>{{reviewDetail.socialCreditCode}}</span>
        </el-form-item>
        <el-form-item label="营业执照">
          <el-image
            style="width: 200px; height: 100px"
            :src="reviewDetail.businessLicenseUrl"
            :preview-src-list="[reviewDetail.businessLicenseUrl]">
          </el-image>
        </el-form-item>
      </div>
      <el-divider></el-divider>
      <div>
        <div class="tcw_title">法定代表人证件</div>
        <el-form-item label="法定代表人归属地">
          <span>{{reviewDetail.legalPersonLocation}}</span>
        </el-form-item>
        <el-form-item label="身份证">
          <el-image
            class="identity-card"
            :src="reviewDetail.legalPersonIdCardFrontUrl"
            :preview-src-list="[reviewDetail.legalPersonIdCardFrontUrl]">
          </el-image>
          <el-image
            class="identity-card"
            :src="reviewDetail.legalPersonIdCardBackUrl"
            :preview-src-list="[reviewDetail.legalPersonIdCardBackUrl]">
          </el-image>
        </el-form-item>
        <el-form-item label="填写人身份">
          <span>{{reviewDetail.submitterIdentity}}</span>
        </el-form-item>
      </div>
      <div v-if="reviewDetail.submitterIdentity === '代理人'">
        <el-divider></el-divider>
        <div>
          <div class="tcw_title">代理人证件</div>
          <el-form-item label="身份证">
            <el-image
              class="identity-card"
              :src="reviewDetail.agentPersonIdCardBackUrl"
              :preview-src-list="[reviewDetail.agentPersonIdCardBackUrl]">
            </el-image>
            <el-image
              class="identity-card"
              :src="reviewDetail.agentPersonIdCardBackUrl"
              :preview-src-list="[reviewDetail.agentPersonIdCardBackUrl]">
            </el-image>
          </el-form-item>
          <el-form-item label="代理委托书">
            <el-image
              class="identity-card"
              :src="reviewDetail.agentPersonProofUrl"
              :preview-src-list="[reviewDetail.agentPersonProofUrl]">
            </el-image>
          </el-form-item>
        </div>
      </div>
      <div class="__btn-group">
        <el-button class="previous" round @click="approve">同意加入</el-button>
        <el-button type="primary" class="next" round @click="toReject">驳回申请</el-button>
      </div>
    </el-form>

    <el-dialog
      title="请选择驳回理由"
      :visible.sync="showRejectDialog"
      :before-close="handleDialogClose"
      width="30%"
      center>
      <ul class="reject-reason-list">
        <li v-for="item in rejectReasonList" :class="{tcw_color_primary: rejectReasonSelected === item.content}" @click="rejectReasonSelected = item.content">{{item.content}}</li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmRejected">确认驳回</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import backstageReviewApi from '../../../../apis/backstageReviewApi'
  const { reviewGetQualification, getQualificationReviewDetail } = backstageReviewApi
  import { QualificationReviewStatusEnum } from '../../../../utils/data/enum'
  export default {
    data () {
      let rejectReasonList = [
        {value: 1, content: '基本信息有误'},
        {value: 2, content: '法定代表人信息有误'},
        {value: 3, content: '代理人信息有误'},
      ]
      return {
        id: '',
        form: {},
        status: 0,
        rejectReason: "",
        checkTime: 0,
        createTime: 1576032569,
        email: null,
        reviewDetail: {},
        type: '',
        showRejectDialog: false,
        url: '',
        srcList: [],
        rejectReasonList:rejectReasonList,
        rejectReasonSelected: ''
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        this.id = this.$route.params.id
        if(this.id){
          this.getDetail(this.id)
        } else {
          history.back()
        }
      },
      getDetail (id) {
        getQualificationReviewDetail(id).then((res) => {
          this.reviewDetail = res['data'] || {}
        }).catch(() => {
          // TODO
        })
      },
      approve () {
        this.review(QualificationReviewStatusEnum.APPROVED)
      },
      toReject () {
        this.showRejectDialog = true
      },
      confirmRejected () {
        this.review(QualificationReviewStatusEnum.REJECTED)
      },
      review (status) {
        reviewGetQualification(this.id ,status, this.rejectReasonSelected ).then(() => {
          this.$alert(`账号<span class="tcw_color_primary">"${this.reviewDetail.email}"</span>${status === QualificationReviewStatusEnum.APPROVED? '已通过审核': '已被驳回 '}`, '提示', {
            showClose: false,
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确定',
          }).then(() => {
            this.$router.replace('/qualificationReviewList')
          })
        }).catch(() => {
          this.showRejectDialog = false
        })
      },
      handleDialogClose () {
        this.rejectReasonSelected = ''
        this.showRejectDialog = false
      }

    }
  }
</script>

<style scoped lang="scss">
  #qualification-review {
    background: #fff;
    padding: 50px;
    .form {
      width: 800px;
      margin: 0 auto;
      padding: 0 0 60px;

      .tcw_title {
        width: 200px;
        text-align: right;
        margin-bottom: 20px;
        padding-right: 10px;
      }

      .id-upload {
        width: 200px;
        height: 100px;
      }

      .__btn-group {
        width: 100%;
        text-align: center;
        margin-top: 40px;

        > button {
          width: 200px;
        }
      }

      .identity-card {
        font-size: 28px;
        width: 255px;
        height: 162px;
        line-height: 162px;
        text-align: center;
      }

      .identity-card + .identity-card {
        margin-left: 20px;
      }
    }

    .reject-reason-list {
      display: flex;
      justify-content: space-between;

      > li {
        width: 30%;
        height: 50px;
        line-height: 50px;
        background: #ececec;
        text-align: center;
        border-radius: 2px;
        cursor: pointer;

        &:hover {
          box-shadow: 0 2px 4px rgba(0, 0, 0, .12)
        }
      }
    }
  }

</style>
