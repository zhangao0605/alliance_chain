<template>
  <div class="mem_con">
    <el-dialog
      width="40%"
      title="新增成员"
      :visible.sync="dialogFormVisible"
      :before-close="dialogFormcancle"
    >
      <el-form :model="add_from">
        <el-form-item label="登录名（邮箱）：" :label-width="formLabelWidth">
          <el-input v-model="add_from.email" style="width: 70%" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名：" :label-width="formLabelWidth">
          <el-input v-model="add_from.name" style="width: 70%" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="初始密码：" :label-width="formLabelWidth">
          <el-input v-model="add_from.password" style="width: 70%" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          style="height:15px;line-height:15px;margin-top:-15px;margin-bottom:30px"
        >
          <span class="tcw_auxiliary_text">密码由8-15位数字、字母、特殊符号至少两种组合组成</span>
        </el-form-item>
        <el-form-item label="用户权限：" :label-width="formLabelWidth">
          <el-select v-model="add_from.user_rights" placeholder>
            <el-option
              v-for="item in rights_options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="description" label="选择将成员加入的联盟：" :label-width="formLabelWidth">
          <el-checkbox-group v-model="add_from.allianceCheckList">
            <el-checkbox
              v-for="item in accessibleAllianceList"
              :label="item.id"
              :key="item.id"
            >{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="手机号：" :label-width="formLabelWidth">
          <el-input v-model="add_from.phone" style="width: 70%" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormcancle()">取消新增</el-button>
        <el-button type="primary" @click="dialogFormsure()">确认新增</el-button>
      </div>
    </el-dialog>
    <el-dialog
      width="35%"
      title="成员信息设置"
      :visible.sync="dialogFormVisible_1"
      :before-close="edit_cancle"
    >
      <el-form :model="edit_from">
        <el-form-item label="登录名（邮箱）：" :label-width="formLabelWidth">{{ edit_from.email }}</el-form-item>
        <el-form-item label="用户名：" :label-width="formLabelWidth">
          <el-input v-model="edit_from.name" style="width: 70%" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户权限：" :label-width="formLabelWidth">
          <el-select v-model="edit_from.user_rights" placeholder>
            <el-option
              v-for="item in rights_options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号：" :label-width="formLabelWidth">
          <el-input v-model="edit_from.phone" style="width: 70%" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edit_cancle()">取消编辑</el-button>
        <el-button type="primary" @click="edit_sure()">确认编辑</el-button>
      </div>
    </el-dialog>

    <el-dialog
      width="30%"
      title="密码重置"
      :visible.sync="dialogFormVisible_2"
      :before-close="paw_cancle"
      center
    >
      <div class="dialog_ti_1">请正确输入该成员的新密码，修改成功后，原密码将失效，该成员需使用新密码进行登录！</div>
      <el-form :model="pas_form">
        <el-form-item label="新密码：" :label-width="formLabelWidth">
          <el-input v-model="pas_form.new_paw" style="width: 70%" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          style="height:15px;line-height:15px;margin-top:-15px;margin-bottom:30px"
        >
          <span class="tcw_auxiliary_text">密码由8-15位数字、字母、特殊符号至少两种组成</span>
        </el-form-item>
        <el-form-item label="确认密码：" :label-width="formLabelWidth">
          <el-input v-model="pas_form.sure_paw" style="width: 70%" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="paw_cancle()">取消重置</el-button>
        <el-button type="primary" @click="paw_sure()">确认重置</el-button>
      </div>
    </el-dialog>

    <el-dialog width="30%" title="停用账户" :visible.sync="dialogFormVisible_3" center>
      <div class="dialog_ti_1">
        您正操作停用
        <span class="pop_up_prompt">{{ admins }}</span>账户，账户停用后该用户将无法登录，不能进行操作，请务必确认后再进行操作！
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="disable_cancle()">暂不停用</el-button>
        <el-button type="primary" @click="disable_sure()">确认停用</el-button>
      </div>
    </el-dialog>
    <div class="am_con_title">
      <div class="tcw_main_title">成员管理</div>
      <el-button type="primary" @click="add_member()">新增成员</el-button>
    </div>
    <div class="con_table">
      <el-table
        :data="table_data"
        border
        max-height="590"
        style="width: 100%;margin-bottom: 30px;margin-top: 40px"
        :header-cell-style="this.tableHeaderColor"
      >
        <el-table-column label="用户名" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="成员角色" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.roles.length===0?'':scope.row.roles[0].name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属联盟" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.consortiumNames}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            <span>{{ timestampToTime(scope.row.createTime )}}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否禁用" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.status==0?'是':'否'}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="table_edit">
              <span class="operational_style" @click="table_edit(scope.row)">编辑</span>
              <span class="operational_style" @click="table_reset_password(scope.row.id)">重置密码</span>
              <span class="operational_style" @click="table_disable(scope.row.id)">停用</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import {
  validEmail,
  validPassword,
  validPhoneNumber
} from "../../utils/validate";
import md5 from "js-md5";
import {
  memberList,
  roleList,
  memberAdd,
  memberResetPassword,
  memberDisableUser,
  roleUserEdit
} from "../../apis/contract";

const { mapState } = createNamespacedHelpers("user");

export default {
  name: "memberManagement",
  components: {},
  data() {
    return {
      table_data: [],
      rights_options: [],
      admins: "aaaaaaaaa",
      dialogFormVisible: false,
      dialogFormVisible_1: false,
      dialogFormVisible_2: false,
      dialogFormVisible_3: false,
      formLabelWidth: "200px",
      add_from: {
        name: "",
        email: "",
        password: "",
        user_rights: 1,
        phone: "",
        allianceCheckList: []
      },
      edit_from: {
        id: "",
        name: "",
        email: "",
        user_rights: 1,
        phone: ""
      },
      pas_form: {
        new_paw: "",
        sure_paw: ""
      },
      rest_pas_id: ""
    };
  },
  created() {
    this.get_data();
  },
  mounted() {},
  computed: {
    ...mapState(["accessibleAllianceList"])
  },
  methods: {
    get_data() {
      let data = {
        page: 1,
        rows: 10
      };
      memberList(data).then(response => {
        this.table_data = response.data;
      });
    },
    add_member() {
      let data = {
        page: 1,
        rows: 10000
      };
      roleList(data).then(response => {
        this.rights_options = response.data.data;
        this.dialogFormVisible = true;
      });
    },
    // 确认新增成员
    dialogFormsure() {
      console.log(this.add_from.allianceCheckList.length);
      if (
        this.add_from.email === "" ||
        this.add_from.name === "" ||
        this.add_from.password === "" ||
        this.add_from.phone === "" ||
        !this.add_from.allianceCheckList ||
        !this.add_from.allianceCheckList.length
      ) {
        this.$message.error("表格内容为必填项，不可为空请正确填写后重试！");
      } else {
        console.log(this.add_from.allianceCheckList);
        if (validEmail(this.add_from.email) === true) {
          if (validPassword(this.add_from.password) === true) {
            if (validPhoneNumber(this.add_from.phone) === true) {
              let data = {
                email: this.add_from.email,
                password: md5(this.add_from.password),
                username: this.add_from.name,
                phone: this.add_from.phone,
                roleId: this.add_from.user_rights,
                consortiumIdList: this.add_from.allianceCheckList
              };
              memberAdd(data).then(response => {
                this.$message.success("成员新增成功！");
                this.get_data();
                this.dialogFormcancle();
              });
            } else {
              this.$message.error("手机号格式错误，请检查正确填写后重试！");
            }
          } else {
            this.$message.error("密码格式错误，请检查正确填写后重试！");
          }
        } else {
          this.$message.error("登录名为邮箱格式，请检查正确填写后重试！");
        }
      }
    },
    // 取消新增成员
    dialogFormcancle() {
      this.dialogFormVisible = false;
      this.add_from = {
        name: "",
        email: "",
        password: "",
        user_rights: 1,
        username: "",
        phone: "",
        allianceCheckList: []
      };
    },
    // 编辑角色信息
    table_edit(e) {
      let data = {
        page: 1,
        rows: 10000
      };
      roleList(data).then(response => {
        this.edit_from = {
          id: e.id,
          name: e.username,
          email: e.email,
          user_rights: e.roles.length === 0 ? 1 : e.roles[0].id,
          phone: e.phone
        };
        this.rights_options = response.data.data;
        this.dialogFormVisible_1 = true;
      });
    },
    // 取消编辑
    edit_cancle() {
      this.edit_from = {
        name: "",
        email: "",
        user_rights: "",
        username: "",
        phone: ""
      };
      this.dialogFormVisible_1 = false;
    },
    // 确认编辑
    edit_sure() {
      if (
        this.edit_from.name === "" ||
        this.edit_from.username === "" ||
        this.edit_from.phone === ""
      ) {
        this.$message.error("表格内容为必填项，不可为空请正确填写后重试！");
      } else {
        if (validPhoneNumber(this.edit_from.phone) === true) {
          let data = {
            userId: this.edit_from.id,
            username: this.edit_from.name,
            phone: this.edit_from.phone,
            roleId: this.edit_from.user_rights
          };
          // console.log(data);
          roleUserEdit(data).then(response => {
            this.get_data();
            this.$message.success("用户信息编辑成功！");
            this.edit_cancle();
          });
        } else {
          this.$message.error("手机号格式错误，请检查正确填写后重试！");
        }
      }
    },
    // 修改密码
    table_reset_password(e) {
      this.rest_pas_id = e;
      this.dialogFormVisible_2 = true;
    },

    // 修改密码取消
    paw_cancle() {
      this.dialogFormVisible_2 = false;
      this.pas_form = {
        new_paw: "",
        sure_paw: ""
      };
    },
    // 修改密码确认
    paw_sure() {
      if (this.pas_form.new_paw === "" || this.pas_form.sure_paw === "") {
        this.$message.error("新密码与确认密码为必填项，请正确填写后重试！");
      } else {
        if (validPassword(this.pas_form.new_paw) != true) {
          this.$message.error("新密码不符合设定要求，请正确填写后重试！");
        } else {
          if (this.pas_form.new_paw != this.pas_form.sure_paw) {
            this.$message.error("密码与确认密码须保持一致，请正确填写后重试！");
          } else {
            let data = {
              userId: this.rest_pas_id,
              newPassword: md5(this.pas_form.new_paw)
            };
            memberResetPassword(data).then(response => {
              this.$message.success("密码重置成功！");
              this.get_data();
              this.paw_cancle();
            });
          }
        }
      }
    }, // 修改是否停用
    table_disable(e) {
      this.memberDisableUser = e;
      this.dialogFormVisible_3 = true;
    },
    // 取消停用
    disable_cancle() {
      this.dialogFormVisible_3 = false;
    },
    // 确认停用
    disable_sure() {
      let data = {
        userId: this.memberDisableUser,
        type: "2"
      };
      memberDisableUser(data).then(response => {
        this.$message.success("停用该成员成功！");
        this.get_data();
        this.disable_cancle();
      });
    }
  }
};
</script>
<style></style>
<style scoped>
.am_con_title {
  display: flex;
  justify-content: space-between;
}
.table_edit {
  justify-content: space-evenly;
  display: flex;
}
.dialog_ti_1 {
  text-indent: 20px;
  margin-left: 10%;
  width: 80%;
  text-align: center;
  margin-bottom: 20px;
}
.am_con_title {
  display: flex;
  justify-content: space-between;
}
</style>
