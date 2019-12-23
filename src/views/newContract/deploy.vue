<template>
  <div class="dp_all">
    <div class="dp_all_nav">
      <span class="active_back" @click="go_back()">合约设置</span> > 合约部署
    </div>
    <div class="dp_con">
      <!-- <div class="tcw_title">合约部署</div> -->
      <!-- <div class="tcw_subtitle margin_top">
      请选择合约：
      <el-select
        v-model="options_value"
        placeholder="请选择"
        class="option_style"
        @change="option_change"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      </div>-->

      <!-- <div class="show_con" v-show="is_show"> -->
      <!-- <div class="up_edit" v-show="is_complete"> -->
      <div class="up_edit">
        <el-form label-position="right" label-width="80px" :model="con_form">
          <el-form-item label="合约名称：" :label-width="formLabelWidth">{{con_form.name}}</el-form-item>
          <el-form-item label="合约版本：" :label-width="formLabelWidth">
            <span class="nomal_font">{{con_form.version}}</span>
          </el-form-item>
          <el-form-item label="部署位置：" :label-width="formLabelWidth">
            <span class="nomal_font">{{con_form.position}}</span>
          </el-form-item>
          <el-form-item label="上传方式：" :label-width="formLabelWidth">
            <span class="nomal_font">{{con_form.upload_method}}</span>
          </el-form-item>
          <el-form-item label="合约描述：" :label-width="formLabelWidth">
            <span class="nomal_font">{{con_form.desc}}</span>
          </el-form-item>
          <!-- <el-form-item label="部署合约位置：" :label-width="formLabelWidth">
            <el-select v-model="posions_value" placeholder="请选择">
              <el-option v-for="item in posions" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item style="margin-top:60px" label :label-width="formLabelWidth">
            <el-button
              style="font-size: 14px;width:200px"
              type="primary"
              @click="deploy_contract_sure()"
            >部署</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- <div class="up_complete" v-show="!is_complete">
        您的合约升级已提交，盟主审批完成后，合约将进行升级。审批进度
        <br />可在
        <span class="active_font_1">工单</span>系统中查看。
      </div>-->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { contractDeploy } from "../../apis/contract";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("utils");
export default {
  name: "deploy",
  components: {},
  data() {
    return {
      con_form: {
        name: "",
        version: "",
        position: "",
        upload_method: "在线编辑",
        desc: "",
        contractVersionId: ""
      },
      formLabelWidth: "200px"
    };
  },

  created() {
    this.init_data = this.deploy_contract;
    this.con_form.name = this.init_data.contractName;
    this.con_form.version = this.init_data.version;
    this.con_form.position = this.init_data.chainName;
    this.con_form.desc = this.init_data.contractDescription;
    this.con_form.contractVersionId = this.init_data.contractVersionId;
  },
  mounted() {},
  computed: {
    ...mapState(["deploy_contract"])
  },
  methods: {
    go_back() {
      this.$router.push("/contractSetting");
    },
    // 确认部署合约
    deploy_contract_sure() {
      let data = { contractVersionId: this.con_form.contractVersionId };
      contractDeploy(data).then(response => {
        this.$message.success("合约部署成功！");
      });
    }
  }
};
</script>
<style>
</style>
<style  scoped>
.margin_top {
  margin-top: 20px;
}
.option_style {
  width: 400px;
  margin-top: 20px;
}
.show_con {
  margin-top: 50px;
  width: 60%;
}
.active_font {
  font-size: 16px;
  cursor: pointer;
  color: rgb(108, 0, 236);
  margin-right: 20px;
}
.active_font_1 {
  font-size: 18px;
  cursor: pointer;
  color: rgb(108, 0, 236);
  margin: 0 10px;
}
.active_back {
  cursor: pointer;
}
.dp_complete {
  font-size: 16px;
  line-height: 2;
}
.dp_con {
  background-color: #ffffff;
  padding: 3%;
  width: 100%;
  height: 100%;
}
.dp_all_nav {
  font-size: 18px;
  margin-bottom: 20px;
}
.nomal_font {
  font-size: 15px;
}
</style>