<template>
  <div>
    <div>
      <ParkingLotsHeader :tableData=tableData @refreshTableData="handleAddChange"></ParkingLotsHeader>
      <el-table :data="tableData" :row-class-name="tableRowClassName" :highlight-current-row="true">
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="name" label="名字"></el-table-column>
        <el-table-column prop="size" label="大小">
          <template slot-scope="scope">
            <input v-if="scope.$index===currIndex" v-model="sizeInput" style="width:100px" />
            <span v-else>{{ tableData[scope.$index].size }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :disabled="!scope.row.active"
              @click="editParkingLot(scope.$index, scope.row)"
            >{{ (scope.$index===currIndex)? '完成':'修改' }}</el-button>
            <el-button
              size="mini"
              :disabled="!scope.row.active"
              @click="logoutParkingLot(scope.$index, scope.row)"
            >注销</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          background
          :page-size="pageSize"
          :total="totalItem"
          @current-change="handleCurrentChange"
          :current-page="currPage"
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
    this.totalItem = tableData.AllParkingLotsNum;
  },
  data() {
    return {
      tableData: [],
      isEdit: false,
      sizeInput: "",
      editBtn: "修改",
      totalItem: 0,
      pageSize: 10,
      currIndex: -1,
      currPage: 0
    };
  },
  methods: {
    tableRowClassName({ row }) {
      if (row.active === false) {
        return "log-out-parking-lot";
      }
      return "";
    },
    editParkingLot(index, data) {
      if (!this.isEdit) {
        this.isEdit = true;
        this.currIndex = index;
        this.sizeInput = this.tableData[index].size;
      } else {
        this.isEdit = false;
        this.currIndex = -1;
        this.tableData[index].size = 0;
        if (Number.isInteger(Number(this.sizeInput))) {
          this.tableData[index].size = Number(this.sizeInput);
        }
        this.putAParkingLotInfo(data);
        this.sizeInput = "";
      }
    },
    logoutParkingLot(index, data) {
      data.active = false;
      this.putAParkingLotInfo(data);
    },
    async putAParkingLotInfo(data) {
      await requestHandler
        .invoke(parkingLotApi.putAParkingLot(data.id, data))
        .loading()
        .exec();
    },

    async handleCurrentChange(page) {
      this.currPage = page;
      const tableData = await requestHandler
        .invoke(parkingLotApi.getAll(page))
        .loading()
        .exec();
      this.tableData = tableData.AllParkingLot;
      this.totalItem = tableData.AllParkingLotsNum;
    },
    async handleAddChange() {
      const tableData = await requestHandler
        .invoke(
          parkingLotApi.getAll(Math.ceil((this.totalItem + 1) / this.pageSize))
        )
        .loading()
        .exec();
      this.currPage = Math.ceil((this.totalItem + 1) / this.pageSize);
      this.tableData = tableData.AllParkingLot;
      this.totalItem = tableData.AllParkingLotsNum;
    }
  }
};
</script>
<style>
.el-table .log-out-parking-lot {
  color:#999;
}
</style>` `