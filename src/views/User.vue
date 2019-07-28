<template>
  <div>
    <div>
      <el-button @click="dialogFormVisible = true" class="userBtn">Add</el-button>
    </div>
    <el-dialog title="添加信息" :visible.sync="dialogFormVisible" width="30%">
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

    <el-dialog title="修改职位" :visible.sync="dialogFormVisible1" width="30%">
      <template>
        <span>请选择职位：</span>
        <el-select
          v-model="officeId"
          placeholder="请选择"
          size="medium"
          style="width:60%"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>

    <el-input class="searchUser" v-model="search" size="medium" placeholder="输入关键字搜索" />
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
      <el-table-column label="操作" align="left">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修 改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">注 销</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="margin-top:20px"
      background
      layout="prev, pager, next"
      :total="users.length"
      @current-change="current_change"
    ></el-pagination>
  </div>
</template>
<script>
import RequestHadler from "../utils/requestHandler";
import userApi from "../../src/apis/userApi";
export default {
  data() {
    return {
      options: [
        {
          value: "停车员",
          label: "停车员"
        },
        {
          value: "经理",
          label: "经理"
        },
        {
          value: "管理员",
          label: "管理员"
        }
      ],
      search: "",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      name: "",
      email: "",
      phone: "",
      officeId: "",
      total: 1,
      pagesize: 10,
      currentPage: 1,
      id: "",
      formLabelWidth: "80px"
    };
  },
  computed: {
    users() {
      let users = this.$store.getters.getUsers;
      for (let user of users) {
        if (user.officeId === 0) {
          user.officeId = "停车员";
        } else if (user.officeId === 1) {
          user.officeId = "经理";
        } else {
          user.officeId = "管理员";
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
      this.dialogFormVisible1 = true;
      this.officeId = row.officeId;
      this.name = row.name;
      this.email = row.email;
      this.phone = row.phone;
      this.id = row.id;
    },

    async edit() {
      console.log(this.id);
      let office;
      if (this.officeId === "停车员") {
        office = 0;
      }
      if (this.officeId === "经理") {
        office = 1;
      }

      if (this.officeId === "管理员") {
        office = 2;
      }

      let user = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        officeId: office
      };
      await userApi.editCareer(this.id, user);
      this.$store.dispatch("fetchAllUsers");
      this.dialogFormVisible1 = false;
    },

    handleDelete(index, row) {
      console.log(index, row);
    },

    current_change(currentPage) {
      this.currentPage = currentPage;
    },
    async add() {
      if (
        this.name.trim() === "" ||
        this.email.trim() === "" ||
        this.phone.trim() === ""
      ) {
        this.$message({
          message: "请把信息填写完整",
          type: "warning"
        });
      } else {
        let user = {
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
      }
    },
    async fetchAll() {
      await this.$store.dispatch("fetchAllUsers");
    }
  }
};
</script>

<style scoped>
.searchUser {
  width: 300px;
  margin-top: 20px;
  margin-right: 100px;
  float: right;
}
.userBtn {
  float: left;
  background-color: #409eff;
  color: white;
  margin: 20px;
}
</style>