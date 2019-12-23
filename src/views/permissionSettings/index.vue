<template>
  <div class="ps_con">
    <el-dialog title="新增角色" :visible.sync="dialogVisible" width="45%" :before-close="add_canale">
      <el-steps :active="steps_active" align-center>
        <el-step title="基本设置"></el-step>
        <el-step title="选择权限"></el-step>
      </el-steps>
      <div class="step_1" v-show="steps_active === 1">
        <el-form :model="add_form" ref="add_form" :rules="rules" class="demo-dynamic">
          <el-form-item prop="name" label="角色名称：" :label-width="formLabelWidth">
            <el-input v-model="add_form.name" style="width: 70%" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="description" label="描述：" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              v-model="add_form.description"
              style="width: 70%"
              maxlength="120"
              show-word-limit
            ></el-input>
            <!-- <el-input type="textarea" v-model="ruleForm.desc"></el-input> -->
          </el-form-item>
        </el-form>
      </div>
      <div class="step_1" v-show="steps_active === 2">
        <div v-for="(item,parentIndex) in pesOptions" :key="parentIndex">
          <el-checkbox
            style="margin-left:2.8%;margin-top:30px"
            v-model="item.parent.ischeck"
            @change="all_check(parentIndex)"
          >
            <span style="font-size:16px">{{item.parent.name}}</span>
          </el-checkbox>

          <div class="checkbox_div">
            <div
              v-for="(data,childIndex) in item.child"
              :key="childIndex"
              :class="data.ischeck===true?'ischec blovck_sty':'isnochec blovck_sty'"
              @click="child_check(parentIndex,childIndex)"
            >{{ data.name }}</div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer" v-show="steps_active === 1">
        <el-button @click="add_canale()">取 消</el-button>
        <el-button type="primary" @click="next_tep('add_form')">下一步</el-button>
      </span>
      <span slot="footer" class="dialog-footer" v-show="steps_active === 2">
        <el-button @click="add_canale()">取 消</el-button>
        <el-button type="primary" @click="add_true()">确 定</el-button>
      </span>
    </el-dialog>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="角色" name="first">
        <div class="roles">
          <div>
            <el-button @click="add_roles()" type="primary">新增角色</el-button>
          </div>
          <div class="roles_search">
            <el-input v-model="search_value" placeholder="请输入角色身份进行搜索" class="input_style"></el-input>
            <div class="roles_search_button">
              <el-button @click="search_roles()" type="primary">搜索</el-button>
            </div>
          </div>
        </div>
        <div class="con_table">
          <el-table
            :data="table_data"
            border
            max-height="590"
            style="width: 100%;margin-bottom: 30px;margin-top: 40px"
            :header-cell-style="this.tableHeaderColor"
          >
            <el-table-column label="名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="描述" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.description }}</span>
              </template>
            </el-table-column>
            <el-table-column label="类型" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.editable===true?'用户自建':'系统默认' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="180">
              <template slot-scope="scope">
                <span class="operational_style" @click="roles_detailed(scope.row.id)">详情</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          background
          @current-change="currentPageChange"
          :current-page="currentPage"
          :page-size="pagesize"
          layout="total,prev, pager, next"
          :total="total"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="权限列表" name="second">
        <!-- permiss_list -->
        <div v-for="(city, index) in table_data_1" :key="index">
          <span style="font-size:16px">{{ city.parent.name }}</span>
          <div class="checkbox_div_1">
            <span
              class="per_block_style"
              v-for="(item, index) in city.child"
              :key="index"
            >{{ item.name }}</span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  byUser,
  roleList,
  permissionList,
  addRole,
  roleDetail
} from "../../apis/contract";
export default {
  name: "permissionSettings",
  components: {},
  data() {
    return {
      rules: {
        name: [
          {
            required: true,
            message: "请输入角色名称,角色名称至少4个字符至多32个字符",
            trigger: "blur"
          },
          {
            min: 4,
            max: 32,
            message: "角色名称至少4个字符至多32个字符",
            trigger: "blur"
          }
        ],
        description: [
          {
            required: true,
            message: "请填写角色描述，角色描述至少10个字符至多120个字符",
            trigger: "blur"
          },
          {
            min: 10,
            max: 120,
            message: "角色描述至少10个字符至多120个字符",
            trigger: "blur"
          }
        ]
      },
      currentPage: 1,
      pagesize: 10,
      total: 0,
      table_data: [],
      table_data_1: [],
      activeName: "first",
      search_value: "",
      dialogVisible: false,
      add_form: {
        description: "",
        name: ""
      },
      pesOptions: [],
      formLabelWidth: "200px",
      steps_active: 1
    };
  },

  created() {
    // this.get_data();
    this.init_data_1();
  },
  mounted() {},
  computed: {},
  methods: {
    // 初始化数据
    get_data() {
      permissionList().then(response => {
        this.table_data_1 = response.data.data;
        this.table_data_1 = this.permission_sort(this.table_data_1);
        // console.log(this.table_data_1);
      });
    },
    get_data_1(data) {
      roleList(data).then(response => {
        this.total = response.data.total;
        this.table_data = response.data.data;
        console.log(this.table_data);
      });
    },
    init_data_1() {
      this.search_value = "";
      this.currentPage = 1;
      let data = { page: this.currentPage, rows: 10, name: "" };
      this.get_data_1(data);
    },
    handleClick(tab, event) {
      if (this.activeName === "second") {
        this.get_data();
      } else {
        this.init_data_1();
      }
    },
    //分页切换
    currentPageChange(e) {
      this.currentPage = e;
      let data = { page: this.currentPage, rows: 10, name: this.search_value };
      this.get_data_1(data);
    },
    // 角色搜索
    search_roles() {
      this.currentPage = 1;
      let data = { page: this.currentPage, rows: 10, name: this.search_value };
      this.get_data_1(data);
    },
    // 角色详情
    roles_detailed(e) {
      this.$store.dispatch("utils/setroleId", e);
      this.$router.push("/permissionDetails");
    },

    // 下一步
    next_tep(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          permissionList().then(response => {
            this.pesOptions = this.permission_sort_choose(response.data.data);

            this.steps_active = 2;
          });
        } else {
          return false;
        }
      });
    },
    // 子选项选择
    child_check(e, q) {
      let judge = true;
      this.pesOptions[e].child[q].ischeck = !this.pesOptions[e].child[q]
        .ischeck;
      this.pesOptions[e].child.forEach((item, index, self) => {
        if (item.ischeck === false) {
          judge = false;
        }
      });
      if (judge === false) {
        this.pesOptions[e].parent.ischeck = false;
      } else {
        this.pesOptions[e].parent.ischeck = true;
      }
    },
    // 父选项选择
    all_check(e) {
      if (this.pesOptions[e].parent.ischeck === true) {
        this.pesOptions[e].child.forEach((item, index, self) => {
          item.ischeck = true;
        });
      } else {
        this.pesOptions[e].child.forEach((item, index, self) => {
          item.ischeck = false;
        });
      }
    },
    //添加角色弹框
    add_roles() {
      this.dialogVisible = true;
    },
    // 取消添加
    add_canale() {
      console.log("5545");
      this.steps_active = 1;
      this.add_form = {
        description: "",
        name: ""
      };
      this.dialogVisible = false;
    },
    // 确认添加
    add_true() {
      let permissionIdList = [];
      this.pesOptions.forEach((item, index, self) => {
        if (item.parent.ischeck === true) {
          permissionIdList.push(item.parent.id);
        }
        item.child.forEach((item_1, index_1, self_1) => {
          if (item_1.ischeck === true) {
            permissionIdList.push(item_1.id);
          }
        });
      });
      let data = {
        name: this.add_form.name,
        description: this.add_form.description,
        permissionIdList: permissionIdList
      };
      addRole(data).then(response => {
        this.$message.success("添加角色成功！");
        this.init_data_1();
        this.add_canale();
      });
    }
  }
};
</script>
<style>
.ps_con .el-tabs__item {
  font-size: 18px;
}
</style>
<style scoped>
.roles {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.roles_search {
  width: 50%;
  display: flex;
  justify-content: space-between;
}
.input_style {
  /* margin-right: 30px; */
  margin-left: 35%;
  width: 50%;
}
.roles_search_button {
  width: 15%;
  text-align: right;
}
.step_1 {
  margin-top: 50px;
}
.checkbox_div {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 30px;
  text-align: center;
  /* justify-content: space-between; */
}
.blovck_sty {
  user-select: none;
  width: 28%;
  margin-left: 1.5%;
  margin-top: 15px;
  padding: 7px 20px 7px 10px;
  border-radius: 4px;
  height: 36px;
  cursor: pointer;
}
.ischec {
  border: 1px solid purple;
}
.isnochec {
  border: 1px solid #dcdfe6;
}
.per_block_style {
  background-color: rgb(255, 255, 255);
  text-align: center;
  display: inline-block;
  padding: 0px 10px 9px 10px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  line-height: 50px;
  height: 50px;
  width: 20%;
  margin-left: 1.5%;
  margin-top: 15px;
}
.checkbox_div_1 {
  padding-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
}
.el-pagination {
  position: relative;
  float: right;
  margin-right: 3%;
  margin-bottom: 0px;
}
</style>
