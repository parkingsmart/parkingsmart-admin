<template>
  <div>
    <el-button @click="dialogFormVisible = true" class="userBtn">Add</el-button>

    <el-dialog title="添加信息" :visible.sync="dialogFormVisible" width='30%' center="true">
      <el-form>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="email" :label-width="formLabelWidth">
          <el-input v-model="email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" :label-width="formLabelWidth">
          <el-input v-model="phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>

    <el-table
      :data="users.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      stripe
      style="width: 100%"
    >
      <el-button>Add</el-button>
      <el-table-column label="id" width="200px">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="email" prop="email"></el-table-column>
      <el-table-column label="电话号码" prop="phone"></el-table-column>
      <el-table-column label="职业" prop="officeId"></el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修 改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">注 销</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="users.length"
      @current-change="current_change"
    ></el-pagination>
  </div>
</template>
<script>
import RequestHadler from "../utils/requestHandler";
export default {
  data() {
    return {
      search: "",
      dialogFormVisible: false,
      name: "",
      email: "",
      phone: "",
      officeId: "",
      total: 1,
      pagesize: 10,
      currentPage: 1,

      formLabelWidth: "80px"
    };
  },
  computed: {
    users() {
      var users = this.$store.getters.getUsers;
      for (var user of users) {
        if (user.officeId === 0) {
          user.officeId = "停车员";
        } else {
          user.officeId = "经理";
        }
      }
      return users;
    }
  },
  async created() {
    await this.fetchAll();
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    current_change(currentPage) {
      this.currentPage = currentPage;
    },
    async add() {
      var user = {
        name: this.name,
        email: this.email,
        phone: this.phone
      };
      await RequestHadler.invoke(this.$store.dispatch("addUser", user))
        .msg("添加成功", "添加失败")
        .loading()
        .exec();
      (this.name = ""),
        (this.email = ""),
        (this.phone = ""),
        (this.dialogFormVisible = false);
    },
    async fetchAll() {
      await this.$store.dispatch("fetchAllUsers");
    }
  }
};
</script>

<style scoped>
.userBtn {
  float: left;
  background-color: #409eff;
  color: white;
  margin: 20px;
}
</style>