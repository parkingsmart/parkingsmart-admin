<template>
  <div>
    <el-button @click="dialogFormVisible = true">Add</el-button>
    <el-dialog title="添加信息" :visible.sync="dialogFormVisible">
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
      :data="users.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe
      style="width: 100%"
    >
      <el-button>Add</el-button>
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="email" prop="email"></el-table-column>
      <el-table-column label="电话号码" prop="phone"></el-table-column>
      <el-table-column label="职业" prop="career"></el-table-column>
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
      :total= "users.length"
      @current-change="current_change"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      dialogFormVisible: false,

      name: "",
      email: "",
      phone: "",
      career: "停车员",
      total: 1,
      pagesize: 10,
      currentPage: 1,

      formLabelWidth: "120px"
    };
  },
  computed: {
    users() {
      return this.$store.getters.getUsers;
    }
  },

  async created () {
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
      let user = {
        id: this.users.length + 1,
        name: this.name,
        email: this.email,
        phone: this.phone,
        career: "停车员"
      };
      await this.$store.dispatch('addUser', user);
      this.name = "",
        this.email = "",
        this.phone = "",
        this.dialogFormVisible = false;
    },
    async fetchAll () {
      await this.$store.dispatch('fetchAllUsers');
    }
  }
};
</script>

<style scoped>
</style>
