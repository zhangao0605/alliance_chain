<template>
  <div class="nc_con">
    <div class="tcw_main_title">新建合约</div>
    <div class="nc_all">
      <el-form label-position="right" label-width="80px" :model="con_form">
        <el-form-item label="合约名称：" :label-width="formLabelWidth">
          <el-input style="width:80%" placeholder="请设置合约名称" v-model="con_form.name"></el-input>
        </el-form-item>

        <el-form-item label="上传方式：" :label-width="formLabelWidth">
          <span class="active_font" @click="edit_con()">在线编辑</span>
        </el-form-item>
        <el-form-item label="编译状态：" :label-width="formLabelWidth">
          <div v-show="contract_edit.is_edit === 1">
            <span class="nomal_font">已保存，可</span>
            <span class="active_font" @click="modify_again()">修改</span>
          </div>
          <div v-show="contract_edit.is_edit === 0">
            <span class="nomal_font">未编译</span>
          </div>
        </el-form-item>
        <!-- <el-form-item label="接口文档：" :label-width="formLabelWidth">
          <el-upload
            style="width: 60%;height: 100px"
            class="upload-demo"
            ref="upload"
            action
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :limit="1"
            :on-change="up_file"
            :auto-upload="false"
          >
            <el-button
              style="font-size: 14px"
              slot="trigger"
              size="small"
              type="primary"
              >选取文件</el-button
            >
            <el-button
              style="margin-left: 30px;font-size: 14px"
              size="small"
              type="success"
              @click="submitUpload"
              >上传到服务器</el-button
            >
          </el-upload>
        </el-form-item>-->
        <!--<el-form-item label="合约部署位置：" :label-width="formLabelWidth">
          <el-select v-model="options_value" placeholder="请选择" class="option_style">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="合约描述（选填）：" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="con_form.desc"
            maxlength="200"
            show-word-limit
            style="width:80%"
            :autosize="{ minRows: 2, maxRows: 4 }"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-top:120px" label :label-width="formLabelWidth">
          <el-button
            style="font-size: 14px;width:200px"
            type="primary"
            @click="save_contract()"
          >保存合约</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { contractAdd, chainList } from "../../apis/contract";
export default {
  name: "newContract",
  components: {},
  data() {
    return {
      options: [],
      options_value: 1,
      con_form: {
        name: "",
        desc: ""
      },
      formLabelWidth: "200px",
      textarea_value: "",
      contract_edit: {}
    };
  },

  created() {
    this.get_deployment_chain();
    if (this.$route.params.type === 1) {
      this.contract_edit = this.get_contract_con();
      this.con_form.name = this.contract_edit.name;
      this.con_form.desc = this.contract_edit.description;
    } else {
      this.set_conTract_list("");
      let data = {
        name: "",
        description: "",
        is_edit: 0,
        deployment_chain: 1,
        open_url: "",
        file_path: ""
      };
      this.contract_con(0, data);
      this.contract_edit = this.get_contract_con();
    }
  },
  mounted() {},
  computed: {},
  methods: {
    // 获取链列表
    get_deployment_chain() {
      chainList().then(response => {
        this.options = response.data.data;

        // this.options_value = this.get_contract_con().deployment_chain;
      });
    },
    // 在线编辑
    edit_con() {
      let data = {
        name: this.con_form.name,
        description: this.con_form.desc,
        is_edit: 0,
        open_url: "newContract",
        deployment_chain: this.options_value,
        file_path: ""
      };
      this.contract_con(0, data);
      this.$router.push("/contractEditor");
    },
    //  二次修改
    modify_again() {
      let data = {
        name: this.con_form.name,
        description: this.con_form.desc,
        deployment_chain: this.options_value,
        is_edit: 1,
        open_url: "newContract",
        file_path: ""
      };

      data.file_path = this.get_contract_con().file_path;
      this.contract_con(0, data);
      this.$router.push("/contractEditor");
    },
    // 保存合约
    save_contract() {
      if (this.con_form.name === "") {
        this.$message.error("合约名称不能为空！");
      } else {
        if (
          this.get_conTract_list() === undefined ||
          this.get_conTract_list() === null ||
          this.get_conTract_list() === ""
        ) {
          this.$message.error("请正确编写合约后再次保存！");
        } else {
          let data = new FormData();
          data.append("type", 3);
          data.append("contractDescription", this.con_form.desc);
          data.append("name", this.con_form.name);
          data.append("versionDescription", "");
          data.append("contractDoc", "");
          data.append("chainId", this.options_value);
          data.append("contractFolder", this.get_contract_con().file_path);
          this.get_conTract_list().save_all_name.forEach(
            (item, index, self) => {
              data.append("codeList[" + index + "].key", item);
              data.append(
                "codeList[" + index + "].code",
                this.get_conTract_list().save_all_code[index]
              );
            }
          );

          contractAdd(data).then(response => {
            this.clean_all();
            this.$message.success("合约保存成功！");
            let that = this;
            setTimeout(() => {
              that.$router.push("/contractSetting");
            }, 500);
          });
        }
      }
    },
    clean_all() {
      this.set_conTract_list("");
      let data = {
        name: "",
        description: "",
        is_edit: 0,
        open_url: "",
        file_path: ""
      };
      this.contract_con(0, data);
      this.contract_edit = this.get_contract_con();
      this.con_form = {
        name: "",
        desc: ""
      };
      this.options_value = 1;
    }
    // 文件上传
    // up_file(file, fileList) {
    //   this.fileList = fileList;
    // },
    // submitUpload() {
    //   console.log(this.fileList);
    //   if (this.fileList.length == 0) {
    //     this.$message.error("请先上传文件！");
    //   } else {
    //     let data = new FormData();
    //     data.append("file", this.fileList[0].raw);
    //     uploadSendtxFile(data).then(response => {
    //       if (response.eCode == 200) {
    //         this.timestamp = response.data.timestamp;
    //         this.$message.success("上传文件成功！");
    //         this.fileList = [];
    //       } else {
    //         this.$message.error("上传文件失败，请确认文件类型后稍后重试！");
    //       }
    //     });
    //   }
    // },
    // handleRemove(file, fileList) {
    //   this.fileList = fileList;
    // },
    // handlePreview(file) {
    //   console.log(file, "1111");
    // },
  }
};
</script>

<style>
.nc_con {
  background-color: #ffffff;
  padding: 3%;
  width: 100%;
  margin-bottom: 30px;
}
.nc_con .el-form-item__label {
  font-size: 16px;
}
</style>
<style scoped>
.nc_all {
  width: 60%;
}
.nomal_font {
  font-size: 16px;
}
.active_font {
  font-size: 16px;
  cursor: pointer;
  color: rgb(108, 0, 236);
}
</style>
