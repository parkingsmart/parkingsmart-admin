<template>
  <div>
    <div>
      <ParkingLotsHeader @refreshTableData="refreshTableData"></ParkingLotsHeader>
        <el-table :data="tableData" :row-class-name="tableRowClassName">
          <el-table-column prop="id" label="id"></el-table-column>
          <el-table-column prop="name" label="名字"></el-table-column>
          <el-table-column prop="size" label="大小">
            <input v-if="isEdit" v-model="sizeInput" style="width:100px" />
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="editParkingLot(scope.$index, scope.row)">{{editBtn}}</el-button>
              <el-button size="mini" @click="logoutParkingLot(scope.$index, scope.row)">注销</el-button>
            </template>
          </el-table-column>
        </el-table>
      <div class="block">
        <el-pagination
          background
          :page-size="pageSize"
          :total="totalPage"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import parkingLotApi from "../../apis/parkingLot.js";
import requestHandler from "../../utils/requestHandler.js";
import ParkingLotsHeader from "./components/ParkingLotsHeader.vue";
export default {
  name: "parking-lots-management",
  components: {
    ParkingLotsHeader
  },
  async created() {
    const tableData = await requestHandler
      .invoke(parkingLotApi.getAll())
      .loading()
      .exec();
    this.tableData = tableData.AllParkingLot;
    this.totalPage = tableData.AllParkingLotsNum;
  },
  data() {
    return {
      tableData: [],
      isEdit: false,
      sizeInput: "",
      editBtn: "修改",
      totalPage: 0,
      pageSize: 10
    };
  },
  methods: {
    tableRowClassName({rowIndex}) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    editParkingLot(index, data) {
      if (this.isEdit) {
        this.isEdit = false;
        this.tableData[index].size = this.sizeInput;
        this.editBtn = "修改";
        this.putAParkingLotInfo(data);
      } else {
        this.isEdit = true;
        this.editBtn = "完成";
      }
    },
    logoutParkingLot(index, data) {
      data.active = true;
      this.putAParkingLotInfo(data);
    },
    async putAParkingLotInfo(data) {
      await requestHandler
        .invoke(parkingLotApi.putAParkingLot(data.id, data))
        .loading()
        .exec();
    },
    async refreshTableData() {
      const tableData = await requestHandler
        .invoke(parkingLotApi.getAll())
        .loading()
        .exec();
      this.tableData = tableData.AllParkingLot;
    },
    async handleCurrentChange(page) {
      const tableData = await requestHandler
        .invoke(parkingLotApi.getAll(page))
        .loading()
        .exec();
      this.tableData = tableData.AllParkingLot;
    }
  }
};
</script>
<style>
.warning-row {
    background:  blue;
  }

.success-row {
    background: #f0f9eb;
  }
.parking-lot-logout-status {
  width: 100%;
  color: #999;
  background-color: blue;
}
.block {
  float: right;
  margin: 20px;
}
</style>
