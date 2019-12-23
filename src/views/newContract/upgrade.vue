<template>
  <div class="ua_all">
    <div class="ua_all_nav">
      <span class="active_back" @click="go_back()">合约设置</span> > 合约升级
    </div>
    <div class="ua_con">
      <div class="up_edit">
        <el-form label-position="right" label-width="80px" size="medium " :model="con_form">
          <el-form-item label="合约名称：" :label-width="formLabelWidth">
            <span class="nomal_font">{{con_form.name}}</span>
          </el-form-item>
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
          <el-form-item v-show="!is_again" label="升级合约：" :label-width="formLabelWidth">
            <span @click="edit_up()" class="active_font">编辑</span>
            <span class="nomal_font">该合约</span>
          </el-form-item>
          <el-form-item v-show="is_again" label="升级合约：" :label-width="formLabelWidth">
            <span @click="edit_up_again()" class="active_font">再次编辑</span>
            <span class="nomal_font">该合约</span>
          </el-form-item>
          <el-form-item label="合约描述（选填）：" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="con_form.new_desc"
              maxlength="200"
              show-word-limit
              style="width:30%"
              :autosize="{ minRows: 2, maxRows: 4 }"
            ></el-input>
          </el-form-item>
          <el-form-item style="margin-top:60px" label :label-width="formLabelWidth">
            <el-button style="font-size: 14px;width:200px" type="primary" @click="up_contract()">升级</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { contractUpgrade, contractDetail } from "../../apis/contract";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("utils");
export default {
  name: "upgrade",
  components: {},
  data() {
    return {
      init_data: "",
      con_form: {
        name: "",
        version: "",
        position: "",
        upload_method: "在线编辑",
        desc: "",
        new_desc: "",
        file_path: "",
        contract_version_id: ""
      },
      formLabelWidth: "200px",
      is_again: false
    };
  },

  created() {
    this.init_data = this.upgrade_contract;
    this.con_form.name = this.init_data.contractName;
    this.con_form.version = this.init_data.version;
    this.con_form.position = this.init_data.chainName;
    this.con_form.desc = this.init_data.contractDescription;
    this.con_form.file_path = this.init_data.contractFolder;
    this.con_form.contract_version_id = this.init_data.contractVersionId;
    this.get_contract_con().is_edit === 0
      ? (this.is_again = false)
      : (this.is_again = true);
    this.is_again === false && this.get_code(this.con_form.contract_version_id);
  },
  mounted() {},
  computed: {
    ...mapState(["upgrade_contract"])
  },
  methods: {
    go_back() {
      this.$router.push("/contractSetting");
    },
    get_code(e) {
      let data = { contractVersionId: e };
      contractDetail(data).then(response => {
        this.set_conTract_list(JSON.parse(response.data.code));
      });
    },
    // 编辑升级合约
    edit_up() {
      let data = {
        name: "",
        description: "",
        is_edit: 0,
        deployment_chain: 1,
        open_url: "upgrade",
        file_path: this.con_form.file_path
      };
      this.contract_con(0, data);
      this.$router.push("/contractEditor");
    },
    // 二次编辑合约
    edit_up_again() {
      let data = {
        name: "",
        description: "",
        is_edit: 1,
        deployment_chain: 1,
        open_url: "upgrade",
        file_path: this.con_form.file_path
      };
      this.contract_con(0, data);
      this.$router.push("/contractEditor");
    },
    // 确认升级合约
    up_contract() {
      let data = new FormData();
      data.append("type", 3);
      data.append("versionDescription", this.con_form.new_desc);
      data.append("contractDoc", "");
      data.append("contractFolder", this.con_form.file_path);
      data.append("contractVersionId", this.con_form.contract_version_id);
      if (this.get_contract_con().is_edit === 0) {
        let keys = Object.keys(this.get_conTract_list());
        let codes = Object.values(this.get_conTract_list());
        keys.forEach((item, index, self) => {
          data.append("codeList[" + index + "].key", item);
          data.append("codeList[" + index + "].code", codes[index]);
        });
      } else {
        this.get_conTract_list().save_all_name.forEach((item, index, self) => {
          data.append("codeList[" + index + "].key", item);
          data.append(
            "codeList[" + index + "].code",
            this.get_conTract_list().save_all_code[index]
          );
        });
      }

      contractUpgrade(data).then(response => {
        this.$message.success("合约升级成功！");
        this.$router.push("/contractSetting");
      });
    }
  }
};
</script>
<style>
</style>
<style  scoped>
.ua_con {
  background-color: #ffffff;
  padding: 3%;
  width: 100%;
  height: 100%;
}
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
.active_back {
  cursor: pointer;
}
.active_font_1 {
  font-size: 18px;
  cursor: pointer;
  color: rgb(108, 0, 236);
  margin: 0 10px;
}
.up_complete {
  font-size: 16px;
  line-height: 2;
}
.ua_all_nav {
  font-size: 18px;
  margin-bottom: 20px;
}
.nomal_font {
  font-size: 15px;
}
</style>