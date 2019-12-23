<template>
  <div>
    <el-dialog width="30%" title="取消授权" :visible.sync="dialogVisible" center>
      <div class="dialog_text tcw_subtitle">您确定取消当前用户授权吗？</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">暂不取消</el-button>
        <el-button type="primary" @click="canale_user()">确认取消</el-button>
      </div>
    </el-dialog>

    <div class="da_title">
      <div>
        <el-button type="primary" @click="return_setting()">返回</el-button>
      </div>
      <div class="tcw_title da_tit">
        <span>名称：</span>
        <span>{{header_data.name}}</span>
      </div>
      <div class="tcw_title da_tit">
        <span>描述：</span>
        <span>{{header_data.desc}}</span>
      </div>
      <div class="tcw_title da_tit">
        <span>创建时间：</span>
        <span>{{header_data.time}}</span>
      </div>
    </div>
    <div>
      <div class="table_title tcw_title">拥有权限</div>
      <div class="con_table">
        <el-table
          :data="table_data"
          border
          max-height="300"
          style="width: 100%;margin-bottom: 30px;margin-top: 40px"
          :header-cell-style="this.tableHeaderColor"
        >
          <el-table-column label="权限名称" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="权限描述" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.description }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="操作" align="center" width="180">
            <template slot-scope="scope">
              <span class="operational_style" @click="roles_detailed(scope.row.name)">详情</span>
            </template>
          </el-table-column>-->
        </el-table>
        <!-- <el-pagination
          background
          @current-change="currentPageChange"
          :current-page="currentPage"
          :page-size="pagesize"
          layout="total,prev, pager, next"
          :total="totla"
        ></el-pagination>-->
      </div>
    </div>
    <div>
      <div class="table_title tcw_title">权限拥有者</div>
      <div class="con_table">
        <el-table
          :data="table_data_1"
          border
          max-height="590"
          style="width: 100%;margin-bottom: 30px;margin-top: 40px"
          :header-cell-style="this.tableHeaderColor"
        >
          <el-table-column label="用户名" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.email }}</span>
            </template>
          </el-table-column>
          <el-table-column label="手机号" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.phone }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center">
            <template slot-scope="scope">
              <span>{{ timestampToTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="180">
            <template slot-scope="scope">
              <span class="operational_style" @click="cancel_authorization(scope.row.id)">取消授权</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-pagination
          background
          @current-change="currentPageChange_1"
          :current-page="currentPage_1"
          :page-size="pagesize_1"
          layout="total,prev, pager, next"
          :total="totla_1"
        ></el-pagination>-->
      </div>
    </div>
  </div>
</template>

<script>
import { roleDetail, cancelRole } from "../../apis/contract";
export default {
  name: "",
  components: {},
  data() {
    return {
      header_data: {
        name: "",
        desc: "",
        time: ""
      },
      table_data: [],
      table_data_1: [],
      dialogVisible: false,
      // currentPage: 1,
      // pagesize: 4,
      // totla: 0,
      // currentPage_1: 1,
      // pagesize_1: 4,
      // totla_1: 0,
      roleId: "",
      cancle_user_id: ""
    };
  },

  created() {
    this.roleId = this.$store.getters.roleId;
    this.get_data();
  },
  mounted() {},
  computed: {},
  methods: {
    get_data() {
      let data = { roleId: this.roleId };
      roleDetail(data).then(response => {
        this.header_data.name = response.data.name;
        this.header_data.desc = response.data.description;
        this.header_data.time = this.timestampToTime(response.data.createTime);
        this.table_data = response.data.permissions;
        this.table_data_1 = response.data.users;
      });
    },
    //   返回上一页
    return_setting() {
      this.$router.push("/permissionSettings");
    },
    //   取消授权
    cancel_authorization(e) {
      this.cancle_user_id = e;
      this.dialogVisible = true;
    },
    //拥有权限分页
    currentPageChange(e) {
      this.currentPage = e;
    },
    //使用情况分页
    currentPageChange_1(e) {
      this.currentPage_1 = e;
    },
    // 确认取消授权
    canale_user() {
      let data = { userRoleId: this.cancle_user_id };
      cancelRole(data).then(response => {
        this.get_data();
        this.$message.success("取消用户授权成功！");
        this.dialogVisible = false;
      });
    }
  }
};
</script>
<style>
</style>
<style  scoped>
.da_title {
  display: flex;
}
.da_tit {
  line-height: 40px;
  margin-left: 4%;
}
.table_title {
  margin-top: 30px;
  /* font-size: 18px; */
}
.el-pagination {
  position: relative;
  float: right;
  margin-right: 3%;
  margin-bottom: 0px;
}
.dialog_text {
  margin: 20px 0;
  text-align: center;
}
</style>
